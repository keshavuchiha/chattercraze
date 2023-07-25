import { c as create_ssr_component, d as add_attribute, a as subscribe, v as validate_component, e as escape } from "../../../../../chunks/ssr.js";
import { p as page } from "../../../../../chunks/stores.js";
import "../../../../../chunks/index.js";
const Image_Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path></svg>`;
});
const Link_Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"></path></svg>`;
});
const Post_Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".selectedTab.svelte-1e0h5fu{--tw-border-opacity:1;border-color:rgb(28 100 242 / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgb(235 245 255 / var(--tw-bg-opacity));--tw-text-opacity:1;color:rgb(28 100 242 / var(--tw-text-opacity))\n}.disabled.svelte-1e0h5fu{cursor:not-allowed;--tw-bg-opacity:1;background-color:rgb(156 163 175 / var(--tw-bg-opacity))\n}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let title = "";
  let content = "";
  $$result.css.add(css);
  {
    if (title.length > 200) {
      title = title.slice(0, 200);
    }
  }
  {
    if (content.length > 1e3) {
      content = content.slice(0, 1e3);
      alert("Content is too long");
    }
  }
  $$unsubscribe_page();
  return `<div class="mx-6 my-2 space-y-2"><div class="text-xl font-semibold" data-svelte-h="svelte-132e1oh">Create a post</div> <div class="grid grid-cols-12"><form class="col-span-8 mr-2"><div class="grid grid-cols-4 text-lg font-semibold text-gray-400 text-center "><button class="${["border-b-2 svelte-1e0h5fu", "selectedTab"].join(" ").trim()}">${validate_component(Post_Icon, "Post_Icon").$$render($$result, { className: "inline-block h-5 w-5" }, {}, {})}
                    Post</button> <button class="${["border-b-2 svelte-1e0h5fu", ""].join(" ").trim()}">${validate_component(Image_Icon, "ImageIcon").$$render($$result, { className: "inline-block h-5 w-5" }, {}, {})}
                    Image</button> <button class="${["border-b-2 svelte-1e0h5fu", ""].join(" ").trim()}">${validate_component(Link_Icon, "LinkIcon").$$render($$result, { className: "inline-block h-5 w-5" }, {}, {})}
                    Link</button> <button disabled class="${["border-b-2 svelte-1e0h5fu", ""].join(" ").trim()}" data-svelte-h="svelte-1rr6c5d">Poll</button></div> <div class="col-span-full my-2">${`<div class="flex border-2 border-gray-400 items-center"><textarea class="w-full h-10 border-0 ring-0 outline-none resize-none focus:outline-none focus:ring-0 focus" placeholder="Title">${escape(title || "")}</textarea> <div class="text-xs text-zinc-400 align-middle w-14 text-center">${escape(title.length)}/200</div></div> <textarea class="w-full h-32 border-2 resize-none border-gray-400 my-2">${escape(content || "")}</textarea>`}</div> <div class="col-span-full flex flex-row-reverse space-x-2"><button class="${[
    "bg-emerald-600 text-white px-2 py-1 rounded-3xl ml-2 svelte-1e0h5fu",
    title.length < 7 ? "disabled" : ""
  ].join(" ").trim()}" ${title.length < 7 ? "disabled" : ""}>Post</button> <button type="reset" class="border-2 rounded-3xl px-2 py-1 text-red-500 border-red-500" data-svelte-h="svelte-rwa0a">Cancel</button></div></form> <div class="col-span-4" data-svelte-h="svelte-3bl5i0">Right Content</div></div> </div>`;
});
export {
  Page as default
};
