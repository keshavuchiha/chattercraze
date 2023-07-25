import * as server from '../entries/pages/society/_name_/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/society/[name]/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.aa24b8bb.js","_app/immutable/chunks/scheduler.b9ed97e5.js","_app/immutable/chunks/index.90fc35b1.js"];
export const stylesheets = [];
export const fonts = [];
