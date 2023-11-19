export async function GET(context) {
    const runtime = context.locals.runtime;

    const { SAMLAND_USERS: storage } = runtime.env as {
        SAMLAND_USERS: KVNamespace;
    };
    const c = runtime.env;

    let data = await storage.list();
    return new Response(JSON.stringify({
            env: c,
            storage: storage,
            keys: data.keys
        }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
  