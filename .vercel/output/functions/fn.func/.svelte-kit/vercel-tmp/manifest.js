export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.33f182d1.js","app":"_app/immutable/entry/app.f5f1ff70.js","imports":["_app/immutable/entry/start.33f182d1.js","_app/immutable/chunks/scheduler.b9ed97e5.js","_app/immutable/chunks/singletons.8eba1ed1.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/entry/app.f5f1ff70.js","_app/immutable/chunks/scheduler.b9ed97e5.js","_app/immutable/chunks/index.90fc35b1.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/api/login",
				pattern: /^\/api\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/login/_server.ts.js'))
			},
			{
				id: "/api/logout",
				pattern: /^\/api\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/logout/_server.ts.js'))
			},
			{
				id: "/api/register",
				pattern: /^\/api\/register\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/register/_server.ts.js'))
			},
			{
				id: "/api/user",
				pattern: /^\/api\/user\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/user/_server.ts.js'))
			},
			{
				id: "/society",
				pattern: /^\/society\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/society/_server.ts.js'))
			},
			{
				id: "/society/comments",
				pattern: /^\/society\/comments\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/society/comments/_server.ts.js'))
			},
			{
				id: "/society/comment",
				pattern: /^\/society\/comment\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/society/comment/_server.ts.js'))
			},
			{
				id: "/society/comment/vote",
				pattern: /^\/society\/comment\/vote\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/society/comment/vote/_server.ts.js'))
			},
			{
				id: "/society/create",
				pattern: /^\/society\/create\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/society/create/_server.ts.js'))
			},
			{
				id: "/society/create/post",
				pattern: /^\/society\/create\/post\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/society/create/post/_server.ts.js'))
			},
			{
				id: "/society/edit",
				pattern: /^\/society\/edit\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/society/edit/_server.ts.js'))
			},
			{
				id: "/society/join",
				pattern: /^\/society\/join\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/society/join/_server.ts.js'))
			},
			{
				id: "/society/leave",
				pattern: /^\/society\/leave\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/society/leave/_server.ts.js'))
			},
			{
				id: "/society/posts",
				pattern: /^\/society\/posts\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/society/posts/_server.ts.js'))
			},
			{
				id: "/society/post",
				pattern: /^\/society\/post\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/society/post/_server.ts.js'))
			},
			{
				id: "/society/post/vote",
				pattern: /^\/society\/post\/vote\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/society/post/vote/_server.ts.js'))
			},
			{
				id: "/society/user",
				pattern: /^\/society\/user\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/society/user/_server.ts.js'))
			},
			{
				id: "/society/[name]",
				pattern: /^\/society\/([^/]+?)\/?$/,
				params: [{"name":"name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,3,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/society/[name]/comments/[post_id]",
				pattern: /^\/society\/([^/]+?)\/comments\/([^/]+?)\/?$/,
				params: [{"name":"name","optional":false,"rest":false,"chained":false},{"name":"post_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,3,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/society/[name]/post",
				pattern: /^\/society\/([^/]+?)\/post\/?$/,
				params: [{"name":"name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,3,], leaf: 7 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
