import { c as create_ssr_component, b as each, v as validate_component } from "../../chunks/ssr.js";
import { P as Post } from "../../chunks/Post.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="flex"><div class="space-y-3 mx-4">${each(data.rows, (row) => {
    return `${validate_component(Post, "Post").$$render($$result, Object.assign({}, row), {}, {})}`;
  })}</div> <div class="min-w-[192px]" data-svelte-h="svelte-1ueylka"></div></div>`;
});
export {
  Page as default
};
