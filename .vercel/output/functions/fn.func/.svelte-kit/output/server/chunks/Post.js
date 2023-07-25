import { c as create_ssr_component, a as subscribe, d as add_attribute, v as validate_component, e as escape } from "./ssr.js";
import { U as Upvote_Icon, D as DownVote_Icon, I as Icon, C as Comments_Icon, S as Share_Icon, a as Save_Icon, b as Delete_Post_Icon } from "./Upvote_Icon.js";
import { p as page } from "./stores.js";
import dayjs from "dayjs";
import { marked } from "marked";
import relatimeTime from "dayjs/plugin/relativeTime.js";
const Post = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { post_id } = $$props;
  let { count = 0 } = $$props;
  let { vote } = $$props;
  let { username } = $$props;
  let { post_created_at } = $$props;
  let { title } = $$props;
  let { content } = $$props;
  let { post_image_url } = $$props;
  let { society_image_url } = $$props;
  let { comments_count } = $$props;
  let { is_author } = $$props;
  let { name } = $$props;
  dayjs.extend(relatimeTime);
  if ($$props.post_id === void 0 && $$bindings.post_id && post_id !== void 0)
    $$bindings.post_id(post_id);
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  if ($$props.vote === void 0 && $$bindings.vote && vote !== void 0)
    $$bindings.vote(vote);
  if ($$props.username === void 0 && $$bindings.username && username !== void 0)
    $$bindings.username(username);
  if ($$props.post_created_at === void 0 && $$bindings.post_created_at && post_created_at !== void 0)
    $$bindings.post_created_at(post_created_at);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.content === void 0 && $$bindings.content && content !== void 0)
    $$bindings.content(content);
  if ($$props.post_image_url === void 0 && $$bindings.post_image_url && post_image_url !== void 0)
    $$bindings.post_image_url(post_image_url);
  if ($$props.society_image_url === void 0 && $$bindings.society_image_url && society_image_url !== void 0)
    $$bindings.society_image_url(society_image_url);
  if ($$props.comments_count === void 0 && $$bindings.comments_count && comments_count !== void 0)
    $$bindings.comments_count(comments_count);
  if ($$props.is_author === void 0 && $$bindings.is_author && is_author !== void 0)
    $$bindings.is_author(is_author);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $$unsubscribe_page();
  return `<a${add_attribute("href", `/society/${name}/comments/${post_id}`, 0)} class="flex space-x-2 border-2 rounded-2xl shadow-lg"> <div class="min-w-[48px] bg-gray-200 rounded-s-xl text-center text-zinc-500 justify-center align-middle"><button>${validate_component(Upvote_Icon, "UpvoteIcon").$$render(
    $$result,
    {
      className: `h-7 mx-auto ${vote == "1" && "text-emerald-500"}`
    },
    {},
    {}
  )}</button> <div>${escape(count)}</div> <button>${validate_component(DownVote_Icon, "DownVoteIcon").$$render(
    $$result,
    {
      className: `h-7 mx-auto ${vote == "-1" && "text-red-400"}`
    },
    {},
    {}
  )}</button></div> <div class="flex-grow "><div class="text-zinc-400">${$page.url.pathname === "/" ? `<a${add_attribute("href", `/society/${name}`, 0)} class="hover:underline text-black font-semibold"><img${add_attribute("src", society_image_url || Icon, 0)}${add_attribute("alt", name, 0)} class="h-6 inline-flex rounded-[50%] bg-emerald-500"> ${escape(name)}</a>` : ``}
            Post by <span class="hover:underline">${escape(username)}</span>${escape(" ")}<span>${escape(dayjs(post_created_at).fromNow())}</span></div> <div class="font-semibold text-md">${escape(title)}</div> <div>${content ? `<!-- HTML_TAG_START -->${marked(content)}<!-- HTML_TAG_END -->` : ``}</div> <div>${post_image_url ? `<img${add_attribute("src", post_image_url, 0)} alt="" class="h-64">` : ``}</div> <div class="flex space-x-3 text-zinc-400"><div class="hover:bg-gray-300 rounded px-2 py-1 hover:text-gray-500">${validate_component(Comments_Icon, "CommentsIcon").$$render($$result, { className: "inline h-5 " }, {}, {})} <span>${escape(comments_count)} Comments</span></div> <div class="hover:bg-gray-300 rounded px-2 py-1 hover:text-gray-500">${validate_component(Share_Icon, "ShareIcon").$$render($$result, { className: "inline h-5 " }, {}, {})} <span data-svelte-h="svelte-1ahaqi7">Share</span></div> <div class="hover:bg-gray-300 rounded px-2 py-1 hover:text-gray-500">${validate_component(Save_Icon, "SaveIcon").$$render($$result, { className: "inline h-5 " }, {}, {})} <span data-svelte-h="svelte-l126tb">Save</span></div> ${is_author ? `<button class="hover:bg-gray-300 rounded px-2 py-1 hover:text-red-500">${validate_component(Delete_Post_Icon, "DeletePostIcon").$$render($$result, { className: "inline h-5" }, {}, {})} <span data-svelte-h="svelte-gz26bx">Delete</span></button>` : ``}</div></div> </a>`;
});
export {
  Post as P
};
