

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.1feb003f.js","_app/immutable/chunks/scheduler.b9ed97e5.js","_app/immutable/chunks/index.90fc35b1.js","_app/immutable/chunks/stores.eed80331.js","_app/immutable/chunks/singletons.8eba1ed1.js"];
export const stylesheets = [];
export const fonts = [];
