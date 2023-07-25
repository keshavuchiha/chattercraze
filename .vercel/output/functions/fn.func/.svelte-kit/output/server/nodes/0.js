import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.8005d288.js","_app/immutable/chunks/scheduler.b9ed97e5.js","_app/immutable/chunks/index.90fc35b1.js","_app/immutable/chunks/spread.c6c0f159.js","_app/immutable/chunks/singletons.8eba1ed1.js","_app/immutable/chunks/navigation.f999d11e.js","_app/immutable/chunks/stores.eed80331.js"];
export const stylesheets = ["_app/immutable/assets/0.0b6c80b8.css"];
export const fonts = [];
