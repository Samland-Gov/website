import type { APIContext } from 'astro';
import getRepository from "../../lib/server/repositories/UserRepository";
import bcrypt from 'bcryptjs';
import jwt from '@tsndr/cloudflare-worker-jwt'

const { AUTH_TOKEN_KEY } = process.env;

type RequestData = {
    email: string,
    password: string
};

export async function POST(context: APIContext) {
    const runtime = context.locals.runtime;

    const { SAMLAND_USERS: storage } = runtime.env as {
        SAMLAND_USERS: KVNamespace;
    };
    const userRepository = getRepository(storage);

    try {
        const body = (await context.request.text())
        
        if (body.length > 0) {
            const { email, password } = JSON.parse(body) as RequestData;
            if (email != undefined && password != undefined ) {
                const userExist = await userRepository.getUserBy({id: email, matchField: 'email'});
                if (!userExist) {
                    return new Response(JSON.stringify({
                            error: "User does not exist! Please register your account before logging in!",
                            status: 409
                        }),{
                            status: 409,
                            headers: {'Content-Type': 'application/json'}
                        }
                    );
                }

                // Compare user passwords
                const passwordCorrect = userExist && (await bcrypt.compare(password, userExist.data.password));
                if (passwordCorrect) {
                    const authToken = await jwt.sign(userExist.data, AUTH_TOKEN_KEY!);

                    return new Response(JSON.stringify({
                            user: {
                                user_id: userExist.id,
                                full_name: userExist.data.full_name,
                                email: userExist.data.email,
                                auth_token: authToken,
                            },
                            status: 200
                        }),{
                            status: 200,
                            headers: {'Content-Type': 'application/json'}
                        }
                    );
                } else {
                    return new Response(JSON.stringify({
                            error: "Invalid credentials!",
                            status: 400
                        }),{
                            status: 400,
                            headers: {'Content-Type': 'application/json'}
                        }
                    );
                }
            } else {
                return new Response(JSON.stringify({
                        error: "Invalid parameters. You must supply, `email`, and `password`!",
                        status: 409
                    }),{
                        status: 409,
                        headers: {'Content-Type': 'application/json'}
                    }
                );
            }
        } else {
            return new Response(JSON.stringify({
                    error: "Invalid parameters. You must supply, `email`, and `password`!",
                    status: 409
                }),{
                    status: 409,
                    headers: {'Content-Type': 'application/json'}
                }
            );
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({
                error: "Internal Server Error",
                status: 500
            }),{
                status: 500,
                headers: { 'Content-Type': 'application/json'}
            }
        );
    }
}
