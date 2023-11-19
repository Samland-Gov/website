export async function GET(context) {
    const runtime = context.locals.runtime;

    const { SAMLAND_USERS: storage } = runtime.env as {
        SAMLAND_USERS: KVNamespace;
    };

    let data = await storage.list();
    return new Response(JSON.stringify(data.keys), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
  