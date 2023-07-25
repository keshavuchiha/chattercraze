import * as universal from '../entries/pages/society/_name_/comments/_post_id_/_page.ts.js';
import * as server from '../entries/pages/society/_name_/comments/_post_id_/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/society/_name_/comments/_post_id_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/society/[name]/comments/[post_id]/+page.ts";
export { server };
export const server_id = "src/routes/society/[name]/comments/[post_id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.4ca40182.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/scheduler.b9ed97e5.js","_app/immutable/chunks/index.90fc35b1.js","_app/immutable/chunks/AboutCommunity.0b9ede6d.js","_app/immutable/chunks/relativeTime.a2fa3610.js","_app/immutable/chunks/navigation.f999d11e.js","_app/immutable/chunks/singletons.8eba1ed1.js","_app/immutable/chunks/spread.c6c0f159.js","_app/immutable/chunks/stores.eed80331.js"];
export const stylesheets = [];
export const fonts = [];
