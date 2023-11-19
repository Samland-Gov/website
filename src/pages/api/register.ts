import type { APIContext } from 'astro';
import getRepository, { UserResource } from "../../lib/server/repositories/UserRepository";
import bcrypt from 'bcryptjs';
import jwt from '@tsndr/cloudflare-worker-jwt'

const { ENCRYPTION_KEY, AUTH_TOKEN_KEY } = process.env;

type RequestData = {
    email: string,
    password: string,
    full_name: string
};

export async function POST(context: APIContext) {
    const runtime = context.locals.runtime;

    const { SAMLAND_USERS: storage } = runtime.env as {
        SAMLAND_USERS: KVNamespace;
    };
    const userRepository = getRepository(storage);

    try {
        const { email, password, full_name } = await context.request.json() as RequestData;
        if (email != undefined && password != undefined && full_name != undefined) {
            const userExist = await userRepository.getUserBy({id: email, matchField: 'email'});
            if (userExist) {
                return new Response(JSON.stringify({
                        error: "User already exists!",
                        status: 409
                    }),{
                        status: 409,
                        headers: {'Content-Type': 'application/json'}
                    }
                );
            }
      
            const date = new Date().toISOString();
      
            // Hash user password
            const passwordHash = await bcrypt.hash(password, ENCRYPTION_KEY!);
      
            // Create auth token with user info and expiry date
            const userData = {
                full_name: full_name,
                email: email,
                password: passwordHash,
                createdAt: date,
                updatedAt: date,
            };
            const newUser = new UserResource(userData);
      
            // Persist user data
            await userRepository.createUser(newUser);
      
            const authToken = await jwt.sign(newUser.data, AUTH_TOKEN_KEY!);

            return new Response(JSON.stringify({
                    user: {
                        user_id: newUser.id,
                        full_name: newUser.data.full_name,
                        email: newUser.data.email,
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
                    error: "Invalid parameters. You must supply, `email`, `password`, and `full_name`!",
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
