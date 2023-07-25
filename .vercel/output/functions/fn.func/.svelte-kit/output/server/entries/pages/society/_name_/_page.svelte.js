import { c as create_ssr_component, d as add_attribute, e as escape, i as is_promise, n as noop, b as each, v as validate_component } from "../../../../chunks/ssr.js";
import { I as Icon } from "../../../../chunks/Upvote_Icon.js";
import dayjs from "dayjs";
import relatimeTime from "dayjs/plugin/relativeTime.js";
import { A as AboutCommunity } from "../../../../chunks/AboutCommunity.js";
import { P as Post } from "../../../../chunks/Post.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let joined = "Joined";
  dayjs.extend(relatimeTime);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="h-20 bg-emerald-400"></div> <div class="h-30 flex flex-row"><img${add_attribute("src", data.image_url || Icon, 0)} alt="icon" class="relative rounded-[50%] bg-emerald-700 border-4 border-white -mt-5 ml-6 mr-4 h-14 w-14"> <div class="font-semibold text-2xl">${escape(data.name)} <div class="text-sm text-zinc-400 font-normal">society/${escape(data.name)}</div></div> <div class="space-x-2 my-1 mx-6">${data.joined ? `<button class="px-8 border-2 w-28 rounded-3xl text-emerald-600 py-0.5 hover:text-red-500">${escape(joined)}</button>` : `<button class="bg-emerald-600 w-28 text-white px-8 py-0.5 rounded-3xl hover:bg-emerald-500" data-svelte-h="svelte-9lwx90">Join</button>`}</div></div> <div class="grid grid-cols-12 mx-4"><div class="col-span-9">${data.posts_promise ? `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
				Loading
			`;
    }
    return function(result) {
      return ` <div class="space-y-3 mx-4">${each(result, (row) => {
        return `${validate_component(Post, "Post").$$render($$result, Object.assign({}, row), {}, {})}`;
      })}</div> `;
    }(__value);
  }(data.posts_promise)}` : ``}</div> ${validate_component(AboutCommunity, "AboutCommunity").$$render($$result, Object.assign({}, data), {}, {})} </div>`;
});
export {
  Page as default
};
