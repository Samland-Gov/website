/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type AdvancedRuntime = import('@astrojs/cloudflare').AdvancedRuntime;
type KVNamespace = import('@cloudflare/workers-types').KVNamespace;

declare namespace App {
    interface Locals extends AdvancedRuntime {
        runtime: AdvancedRuntime & { env: { 
            SAMLAND_USERS: KVNamespace 
        } };
    }
}
