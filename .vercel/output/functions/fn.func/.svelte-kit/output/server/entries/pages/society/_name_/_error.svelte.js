import { c as create_ssr_component, a as subscribe, e as escape } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<div class="text-center align-middle h-1/2 items-center mt-32 space-y-4"><div class="text-6xl text-purple-500">${escape($page.status)}</div> <div class="text-4xl font-semibold text-red-500">${escape($page.error?.message)}</div> </div>`;
});
export {
  Error as default
};
