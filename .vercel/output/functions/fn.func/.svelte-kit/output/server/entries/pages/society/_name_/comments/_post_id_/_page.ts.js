import "../../../../../../chunks/index.js";
const load = async ({ params, data, parent, fetch }) => {
  let is_author = false;
  let joined = false;
  let vote = 0;
  let username = null;
  let votes_count = 0;
  let comments_promise = null;
  return {
    title: data.title,
    content: data.content,
    post_created_at: data.created_at,
    is_author,
    joined,
    vote,
    username,
    votes_count,
    post_image_url: data.post_image_url,
    post_id: params.post_id,
    comments_count: data.comments_count,
    comments_promise
  };
};
export {
  load
};
