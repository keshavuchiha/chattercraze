import { c as create_ssr_component, d as add_attribute, e as escape, v as validate_component } from "./ssr.js";
import { I as Icon } from "./Upvote_Icon.js";
import dayjs from "dayjs";
const Created_Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z"></path></svg>`;
});
const AboutCommunity = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { description = "" } = $$props;
  let { created_at } = $$props;
  let { count = 0 } = $$props;
  let { name = "" } = $$props;
  let { role = null } = $$props;
  let { image_url = null } = $$props;
  let tempImageUrl = null;
  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result;
        if (typeof data === "string") {
          tempImageUrl = data;
        }
      };
      reader.readAsDataURL(file);
    }
  };
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.created_at === void 0 && $$bindings.created_at && created_at !== void 0)
    $$bindings.created_at(created_at);
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.image_url === void 0 && $$bindings.image_url && image_url !== void 0)
    $$bindings.image_url(image_url);
  if ($$props.handleImageChange === void 0 && $$bindings.handleImageChange && handleImageChange !== void 0)
    $$bindings.handleImageChange(handleImageChange);
  return `<div class="ml-4 col-span-3"><div class="bg-emerald-500 px-2 py-2 text-white font-semibold" data-svelte-h="svelte-5lp6lg">About Community</div> <div class="px-2 py-1">${escape(description || "")}</div> <div class="px-2 text-sm text-gray-400">${validate_component(Created_Icon, "CreatedIcon").$$render($$result, { className: "inline-block h-6" }, {}, {})}
        Created ${escape(dayjs(created_at).fromNow())}</div> <div class="px-2 py-1 my-2 border-y-2 font-semibold">${escape(count)} members</div> <div class="w-full items-center text-center"><button class="text-center mx-auto hover:bg-emerald-400 bg-emerald-500 text-white px-20 py-1 rounded-2xl font-semibold" data-svelte-h="svelte-wa8tip">Create Post</button></div> ${role === "creator" ? `<div class="flex"><div class="flex-grow"><div class="font-semibold" data-svelte-h="svelte-1uwcowt">Admin</div> <input type="file" hidden accept="image/*"> <button class="text-emerald-400 hover:text-emerald-500" data-svelte-h="svelte-1qvha8b">Change Image</button></div> <div><img${add_attribute("src", tempImageUrl || image_url || Icon, 0)} alt="icon" class="rounded-[50%] bg-emerald-700 border-4 border-white h-12 w-12"></div></div> ${`<button class="border-2 border-emerald-500 hover:bg-emerald-500 hover:text-white rounded-3xl my-1 text-emerald-600 px-2 py-1" data-svelte-h="svelte-13qxana">Submit</button>`}` : ``}</div>`;
});
export {
  AboutCommunity as A
};
