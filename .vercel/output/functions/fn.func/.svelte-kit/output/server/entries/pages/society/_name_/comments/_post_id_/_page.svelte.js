import { c as create_ssr_component, a as subscribe, e as escape, d as add_attribute, v as validate_component, b as each, i as is_promise, n as noop } from "../../../../../../chunks/ssr.js";
import { b as Delete_Post_Icon, U as Upvote_Icon, D as DownVote_Icon, C as Comments_Icon, S as Share_Icon, a as Save_Icon } from "../../../../../../chunks/Upvote_Icon.js";
import dayjs from "dayjs";
import { marked } from "marked";
import relatimeTime from "dayjs/plugin/relativeTime.js";
import { A as AboutCommunity } from "../../../../../../chunks/AboutCommunity.js";
import { p as page } from "../../../../../../chunks/stores.js";
import "postcss";
const CommentBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { parent_id = null } = $$props;
  let { open = true } = $$props;
  if ($$props.parent_id === void 0 && $$bindings.parent_id && parent_id !== void 0)
    $$bindings.parent_id(parent_id);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  $$unsubscribe_page();
  return `${open ? `<div><textarea class="w-full h-24 border-2 resize-none border-gray-400 my-2" placeholder="What are you Comments...">${escape("")}</textarea> <div class="flex"><div class="flex-grow"></div> <button class="bg-emerald-500 px-2 py-1 text-white rounded-xl">${`Comment`}</button></div></div>` : ``}`;
});
const Comment_Downvote = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"${add_attribute("class", className, 0)}><path fill-rule="evenodd" d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z" clip-rule="evenodd"></path></svg>`;
});
const Comment_Reply = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"></path></svg>`;
});
const Comment_Upvote = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"${add_attribute("class", className, 0)}><path fill-rule="evenodd" d="M11.47 4.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5zm.53 7.59l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 12.31z" clip-rule="evenodd"></path></svg>`;
});
const Comment = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { comment } = $$props;
  if ($$props.comment === void 0 && $$bindings.comment && comment !== void 0)
    $$bindings.comment(comment);
  return `<div class=""><span class="hover:underline">${escape(comment.username)}</span>${escape(" ")} <span class="text-zinc-400">${escape(dayjs(comment.created_at).fromNow())}</span></div> <div><!-- HTML_TAG_START -->${marked(comment.content)}<!-- HTML_TAG_END --></div> <div class="flex text-gray-400 space-x-2"><button${add_attribute("class", comment.vote && comment.vote === 1 && `text-emerald-600` || "", 0)}>${validate_component(Comment_Upvote, "CommentUpvote").$$render($$result, { className: "h-6" }, {}, {})}</button> <div class="text-black">${escape(comment.votes_count)}</div> <button${add_attribute("class", comment.vote && comment.vote === -1 && `text-red-600` || "", 0)}>${validate_component(Comment_Downvote, "CommentDownvote").$$render($$result, { className: "h-6" }, {}, {})}</button> <button>${validate_component(Comment_Reply, "CommentReply").$$render($$result, { className: "inline h-6" }, {}, {})}
		Reply</button> <button class="hover:text-red-500">${validate_component(Delete_Post_Icon, "DeletePostIcon").$$render($$result, { className: "inline h-6" }, {}, {})}
		Delete</button></div> ${``}`;
});
const CommentTree = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { comment_parents } = $$props;
  let { parent_id = "" } = $$props;
  if ($$props.comment_parents === void 0 && $$bindings.comment_parents && comment_parents !== void 0)
    $$bindings.comment_parents(comment_parents);
  if ($$props.parent_id === void 0 && $$bindings.parent_id && parent_id !== void 0)
    $$bindings.parent_id(parent_id);
  return `${comment_parents.has(parent_id) ? `${each(comment_parents.get(parent_id), (comment) => {
    return `<div class="m-4 ">${validate_component(Comment, "Comment").$$render($$result, { comment }, {}, {})} ${comment_parents.has(comment.comment_id) ? `${validate_component(CommentTree, "svelte:self").$$render(
      $$result,
      {
        comment_parents,
        parent_id: comment.comment_id
      },
      {},
      {}
    )}` : ``} </div>`;
  })}` : ``}   `;
});
const Comments = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { comments } = $$props;
  let comment_parents = /* @__PURE__ */ new Map();
  if ($$props.comments === void 0 && $$bindings.comments && comments !== void 0)
    $$bindings.comments(comments);
  {
    {
      comment_parents = /* @__PURE__ */ new Map();
      comments.forEach((comment2) => {
        const p = comment2.parent_id || "";
        if (comment_parents.has(p)) {
          comment_parents.get(p)?.push(comment2);
        } else {
          comment_parents.set(p, [comment2]);
        }
      });
      console.log("cp", comment_parents);
    }
  }
  return `<div>${validate_component(CommentTree, "CommentTree").$$render($$result, { parent_id: "", comment_parents }, {}, {})} </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  dayjs.extend(relatimeTime);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="flex mx-4 my-2"><div class="flex flex-col flex-grow"><div class="flex space-x-2 flex-grow border-2 rounded-2xl shadow-lg"><div class="w-[48px] bg-gray-100 rounded-s-xl text-center text-zinc-500 justify-center align-middle"><button>${validate_component(Upvote_Icon, "UpvoteIcon").$$render(
    $$result,
    {
      className: `h-7 mx-auto ${data.vote == 1 && "text-emerald-500"}`
    },
    {},
    {}
  )}</button> <div>${escape(data.votes_count)}</div> <button>${validate_component(DownVote_Icon, "DownVoteIcon").$$render(
    $$result,
    {
      className: `h-7 mx-auto ${data.vote == -1 && "text-red-400"}`
    },
    {},
    {}
  )}</button></div> <div class=""><div class="text-zinc-400">Post by <span class="hover:underline">${escape(data.username)}</span>${escape(" ")}<span>${escape(dayjs(data.post_created_at).fromNow())}</span></div> <div class="font-semibold text-md">${escape(data.title)}</div> <div>${data.content ? ` <!-- HTML_TAG_START -->${marked(data.content)}<!-- HTML_TAG_END -->` : ``}</div> <div>${data.post_image_url ? `<img${add_attribute("src", data.post_image_url, 0)} alt="" class="h-64">` : ``}</div> <div class="flex space-x-3 text-zinc-400"><div class="hover:bg-gray-300 rounded px-2 py-1 hover:text-gray-500">${validate_component(Comments_Icon, "CommentsIcon").$$render($$result, { className: "inline h-5 " }, {}, {})} <span>${escape(data.comments_count)} Comments</span></div> <div class="hover:bg-gray-300 rounded px-2 py-1 hover:text-gray-500">${validate_component(Share_Icon, "ShareIcon").$$render($$result, { className: "inline h-5 " }, {}, {})} <span data-svelte-h="svelte-1ahaqi7">Share</span></div> <div class="hover:bg-gray-300 rounded px-2 py-1 hover:text-gray-500">${validate_component(Save_Icon, "SaveIcon").$$render($$result, { className: "inline h-5 " }, {}, {})} <span data-svelte-h="svelte-l126tb">Save</span></div> ${data.is_author ? `<button class="hover:bg-gray-300 rounded px-2 py-1 hover:text-red-500">${validate_component(Delete_Post_Icon, "DeletePostIcon").$$render($$result, { className: "inline h-5" }, {}, {})} <span data-svelte-h="svelte-gz26bx">Delete</span></button>` : ``}</div></div></div> <div class="">Comments
			${validate_component(CommentBox, "CommentBox").$$render($$result, {}, {}, {})} ${data.comments_promise ? `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` <p data-svelte-h="svelte-n63tw6">Fetching Comments</p> `;
    }
    return function(comments) {
      return ` ${validate_component(Comments, "Comments").$$render($$result, { comments }, {}, {})} `;
    }(__value);
  }(data.comments_promise)}` : ``}</div></div> ${validate_component(AboutCommunity, "AboutCommunity").$$render($$result, Object.assign({}, data), {}, {})}</div>  `;
});
export {
  Page as default
};
