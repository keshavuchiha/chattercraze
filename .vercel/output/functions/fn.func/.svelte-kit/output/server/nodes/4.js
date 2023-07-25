import * as server from '../entries/pages/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.dd3066a2.js","_app/immutable/chunks/scheduler.b9ed97e5.js","_app/immutable/chunks/index.90fc35b1.js","_app/immutable/chunks/spread.c6c0f159.js","_app/immutable/chunks/Post.ffa1c614.js","_app/immutable/chunks/relativeTime.a2fa3610.js","_app/immutable/chunks/navigation.f999d11e.js","_app/immutable/chunks/singletons.8eba1ed1.js","_app/immutable/chunks/stores.eed80331.js"];
export const stylesheets = [];
export const fonts = [];
