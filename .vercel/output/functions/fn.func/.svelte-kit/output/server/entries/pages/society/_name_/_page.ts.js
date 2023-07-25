import "../../../../chunks/index.js";
const load = async ({ params, parent, fetch }) => {
  const { description, created_at, count, image_url } = await parent();
  let joined = false;
  let posts_promise = null;
  let role = null;
  return {
    name: params.name,
    joined,
    posts_promise,
    description,
    created_at,
    count,
    image_url,
    role
  };
};
export {
  load
};
