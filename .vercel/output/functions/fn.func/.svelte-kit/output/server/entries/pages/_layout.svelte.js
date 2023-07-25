import { c as create_ssr_component, h as compute_rest_props, f as setContext, j as spread, k as escape_object, l as escape_attribute_value, d as add_attribute, o as get_current_component, v as validate_component, p as compute_slots, a as subscribe, e as escape, b as each } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index2.js";
import { twMerge } from "tailwind-merge";
import { createPopper } from "@popperjs/core";
import { p as page } from "../../chunks/stores.js";
const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
const app = "";
const society = writable({
  open: false
});
const Frame = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "tag",
    "color",
    "rounded",
    "border",
    "shadow",
    "transition",
    "params",
    "node",
    "use",
    "options",
    "role"
  ]);
  const null_transition = () => ({ duration: 0 });
  const noop = () => {
  };
  setContext("background", true);
  let { tag = $$restProps.href ? "a" : "div" } = $$props;
  let { color = "default" } = $$props;
  let { rounded = false } = $$props;
  let { border = false } = $$props;
  let { shadow = false } = $$props;
  let { transition = null_transition } = $$props;
  let { params = {} } = $$props;
  let { node = void 0 } = $$props;
  let { use = noop } = $$props;
  let { options = {} } = $$props;
  let { role = void 0 } = $$props;
  const bgColors = {
    gray: "bg-gray-50 dark:bg-gray-800",
    red: "bg-red-50 dark:bg-gray-800",
    yellow: "bg-yellow-50 dark:bg-gray-800 ",
    green: "bg-green-50 dark:bg-gray-800 ",
    indigo: "bg-indigo-50 dark:bg-gray-800 ",
    purple: "bg-purple-50 dark:bg-gray-800 ",
    pink: "bg-pink-50 dark:bg-gray-800 ",
    blue: "bg-blue-50 dark:bg-gray-800 ",
    light: "bg-gray-50 dark:bg-gray-700",
    dark: "bg-gray-50 dark:bg-gray-800",
    default: "bg-white dark:bg-gray-800",
    dropdown: "bg-white dark:bg-gray-700",
    navbar: "bg-white dark:bg-gray-900",
    navbarUl: "bg-gray-50 dark:bg-gray-800",
    form: "bg-gray-50 dark:bg-gray-700",
    primary: "bg-primary-50 dark:bg-gray-800 ",
    orange: "bg-orange-50 dark:bg-orange-800",
    none: ""
  };
  const textColors = {
    gray: "text-gray-800 dark:text-gray-300",
    red: "text-red-800 dark:text-red-400",
    yellow: "text-yellow-800 dark:text-yellow-300",
    green: "text-green-800 dark:text-green-400",
    indigo: "text-indigo-800 dark:text-indigo-400",
    purple: "text-purple-800 dark:text-purple-400",
    pink: "text-pink-800 dark:text-pink-400",
    blue: "text-blue-800 dark:text-blue-400",
    light: "text-gray-700 dark:text-gray-300",
    dark: "text-gray-700 dark:text-gray-300",
    default: "text-gray-500 dark:text-gray-400",
    dropdown: "text-gray-700 dark:text-gray-200",
    navbar: "text-gray-700 dark:text-gray-200",
    navbarUl: "text-gray-700 dark:text-gray-400",
    form: "text-gray-900 dark:text-white",
    primary: "text-primary-800 dark:text-primary-400",
    orange: "text-orange-800 dark:text-orange-400",
    none: ""
  };
  const borderColors = {
    gray: "border-gray-300 dark:border-gray-800",
    red: "border-red-300 dark:border-red-800",
    yellow: "border-yellow-300 dark:border-yellow-800",
    green: "border-green-300 dark:border-green-800",
    indigo: "border-indigo-300 dark:border-indigo-800",
    purple: "border-purple-300 dark:border-purple-800",
    pink: "border-pink-300 dark:border-pink-800",
    blue: "border-blue-300 dark:border-blue-800",
    light: "border-gray-500",
    dark: "border-gray-500",
    default: "border-gray-200 dark:border-gray-700",
    dropdown: "border-gray-100 dark:border-gray-700",
    navbar: "border-gray-100 dark:border-gray-700",
    navbarUl: "border-gray-100 dark:border-gray-700",
    form: "border-gray-300 dark:border-gray-700",
    primary: "border-primary-500 dark:border-primary-200 ",
    orange: "border-orange-300 dark:border-orange-800",
    none: ""
  };
  let divClass;
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
    $$bindings.shadow(shadow);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.params === void 0 && $$bindings.params && params !== void 0)
    $$bindings.params(params);
  if ($$props.node === void 0 && $$bindings.node && node !== void 0)
    $$bindings.node(node);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  color = color ?? "default";
  {
    setContext("color", color);
  }
  divClass = twMerge(bgColors[color], textColors[color], rounded && "rounded-lg", border && "border", borderColors[color], shadow && "shadow-md", $$props.class);
  return `${((tag$1) => {
    return tag$1 ? `<${tag}${spread(
      [
        escape_object($$restProps),
        { class: escape_attribute_value(divClass) },
        { role: escape_attribute_value(role) }
      ],
      {}
    )}${add_attribute("this", node, 0)}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)} `;
});
const Thumbnail_svelte_svelte_type_style_lang = "";
const Indicator_svelte_svelte_type_style_lang = "";
function createEventDispatcher() {
  const component = get_current_component();
  return (type, target, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = new CustomEvent(type, { detail });
      target.dispatchEvent(event);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
const { Object: Object_1 } = globals;
const Popper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "activeContent",
    "arrow",
    "offset",
    "placement",
    "trigger",
    "triggeredBy",
    "strategy",
    "open",
    "yOnly"
  ]);
  let { activeContent = false } = $$props;
  let { arrow = true } = $$props;
  let { offset = 8 } = $$props;
  let { placement = "top" } = $$props;
  let { trigger = "hover" } = $$props;
  let { triggeredBy = void 0 } = $$props;
  let { strategy = "absolute" } = $$props;
  let { open = false } = $$props;
  let { yOnly = false } = $$props;
  const dispatch = createEventDispatcher();
  let triggerEl;
  let contentEl;
  let popper;
  function init(node, _triggerEl) {
    const arrowEl = arrow ? node.lastElementChild : void 0;
    popper = createPopper(_triggerEl, node, {
      placement,
      strategy,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: ({ reference, popper: popper2 }) => {
              return [
                yOnly ? popper2.width / 2 - reference.width / 2 - reference.x : 0,
                offset
              ];
            }
          }
        },
        { name: "eventListeners", enabled: open },
        { name: "flip", enabled: false },
        {
          name: "arrow",
          enabled: arrow,
          options: { element: arrowEl, padding: 10 }
        }
      ]
    });
    return {
      update(_triggerEl2) {
        popper.state.elements.reference = _triggerEl2;
        popper.update();
      },
      destroy() {
        popper.destroy();
      }
    };
  }
  let position = "bottom";
  let arrowClass;
  if ($$props.activeContent === void 0 && $$bindings.activeContent && activeContent !== void 0)
    $$bindings.activeContent(activeContent);
  if ($$props.arrow === void 0 && $$bindings.arrow && arrow !== void 0)
    $$bindings.arrow(arrow);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
    $$bindings.offset(offset);
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
    $$bindings.placement(placement);
  if ($$props.trigger === void 0 && $$bindings.trigger && trigger !== void 0)
    $$bindings.trigger(trigger);
  if ($$props.triggeredBy === void 0 && $$bindings.triggeredBy && triggeredBy !== void 0)
    $$bindings.triggeredBy(triggeredBy);
  if ($$props.strategy === void 0 && $$bindings.strategy && strategy !== void 0)
    $$bindings.strategy(strategy);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.yOnly === void 0 && $$bindings.yOnly && yOnly !== void 0)
    $$bindings.yOnly(yOnly);
  {
    dispatch("show", triggerEl, open);
  }
  popper && popper.setOptions({ placement });
  position = placement.split("-", 1)[0];
  arrowClass = twMerge(
    "after:w-[9px] after:h-[9px] after:rotate-45 bg-inherit after:bg-inherit invisible after:visible after:block border-inherit after:border-inherit",
    position === "top" && ($$props.border ? "after:border-b after:border-r -bottom-[5px]" : "-bottom-[4px]"),
    position === "bottom" && ($$props.border ? "after:border-t after:border-l -top-[5px]" : "-top-[4px]"),
    position === "left" && ($$props.border ? "after:border-t after:border-r -right-[5px]" : "-right-[4px]"),
    position === "right" && ($$props.border ? "after:border-b after:border-l -left-[5px]" : "-left-[4px]")
  );
  return `${`<div${add_attribute("this", contentEl, 0)}></div>`} ${open && triggerEl ? `${validate_component(Frame, "Frame").$$render(
    $$result,
    Object_1.assign({}, { use: init }, { options: triggerEl }, { role: "tooltip" }, { tabindex: activeContent ? -1 : void 0 }, $$restProps, {
      class: twMerge("outline-none", $$props.class)
    }),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``} ${arrow ? `<div${add_attribute("class", arrowClass, 0)}></div>` : ``}`;
      }
    }
  )}` : ``} `;
});
const Dropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["open", "headerClass", "ulClass", "footerClass"]);
  let $$slots = compute_slots(slots);
  let { open = false } = $$props;
  let { headerClass = "py-1 overflow-hidden rounded-t-lg" } = $$props;
  let { ulClass = "py-1 w-44" } = $$props;
  let { footerClass = "py-1 overflow-hidden rounded-b-lg" } = $$props;
  let headerCls = twMerge(headerClass, $$props.classHeader);
  let ulCls = twMerge(ulClass, $$props.classUl);
  let footerCls = twMerge(footerClass, $$props.classFooter);
  let popoverClass;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.headerClass === void 0 && $$bindings.headerClass && headerClass !== void 0)
    $$bindings.headerClass(headerClass);
  if ($$props.ulClass === void 0 && $$bindings.ulClass && ulClass !== void 0)
    $$bindings.ulClass(ulClass);
  if ($$props.footerClass === void 0 && $$bindings.footerClass && footerClass !== void 0)
    $$bindings.footerClass(footerClass);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        $$restProps.arrow = $$restProps.arrow ?? false;
        $$restProps.trigger = $$restProps.trigger ?? "click";
        $$restProps.placement = $$restProps.placement ?? "bottom";
        $$restProps.color = $$restProps.color ?? "dropdown";
        $$restProps.shadow = $$restProps.shadow ?? true;
        $$restProps.rounded = $$restProps.rounded ?? true;
      }
    }
    popoverClass = twMerge("divide-y divide-gray-100 dark:divide-gray-600", $$props.class);
    $$rendered = `${validate_component(Popper, "Popper").$$render(
      $$result,
      Object.assign({}, { activeContent: true }, $$restProps, { class: popoverClass }, { open }),
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${$$slots.header ? `<div${add_attribute("class", headerCls, 0)}>${slots.header ? slots.header({}) : ``}</div>` : ``} <ul${add_attribute("class", $$props.class ?? ulCls, 0)}>${slots.default ? slots.default({}) : ``}</ul> ${$$slots.footer ? `<div${add_attribute("class", footerCls, 0)}>${slots.footer ? slots.footer({}) : ``}</div>` : ``}`;
        }
      }
    )} `;
  } while (!$$settled);
  return $$rendered;
});
const Wrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["tag", "show", "use"]);
  let { tag = "div" } = $$props;
  let { show } = $$props;
  let { use = () => {
  } } = $$props;
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  return `${show ? `${((tag$1) => {
    return tag$1 ? `<${tag}${spread([escape_object($$restProps)], {})}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}` : `${slots.default ? slots.default({}) : ``}`} `;
});
const DropdownItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["defaultClass", "href"]);
  let { defaultClass = "font-medium py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600" } = $$props;
  let { href = void 0 } = $$props;
  let liClass;
  let wrap = true;
  function init(node) {
    wrap = node.parentElement?.tagName === "UL";
  }
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  liClass = twMerge(defaultClass, href ? "block" : "w-full text-left", $$props.class);
  return `${validate_component(Wrapper, "Wrapper").$$render($$result, { tag: "li", show: wrap, use: init }, {}, {
    default: () => {
      return `${((tag) => {
        return tag ? `<${href ? "a" : "button"}${spread(
          [
            { href: escape_attribute_value(href) },
            {
              type: escape_attribute_value(href ? void 0 : "button")
            },
            escape_object($$restProps),
            { class: escape_attribute_value(liClass) },
            {
              role: escape_attribute_value(href ? void 0 : "button")
            }
          ],
          {}
        )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
      })(href ? "a" : "button")}`;
    }
  })} `;
});
const auth = writable({
  isLoggedIn: false,
  type: "log in",
  open: false
});
const user = writable(null);
const Close = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${add_attribute("class", className, 0)}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>`;
});
const AuthModal_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "label.svelte-l12h15.svelte-l12h15{position:absolute;top:0.5rem;left:0.25rem;z-index:10;transform-origin:0;--tw-translate-y:-1rem;--tw-scale-x:.75;--tw-scale-y:.75;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity));padding-left:0.5rem;padding-right:0.5rem;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(107 114 128 / var(--tw-text-opacity));transition-duration:300ms\n}.peer.svelte-l12h15:-moz-placeholder-shown~label.svelte-l12h15{top:50%;--tw-translate-y:-50%;--tw-scale-x:1;--tw-scale-y:1;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))\n}.peer.svelte-l12h15:placeholder-shown~label.svelte-l12h15{top:50%;--tw-translate-y:-50%;--tw-scale-x:1;--tw-scale-y:1;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))\n}.peer.svelte-l12h15:focus~label.svelte-l12h15{top:0.5rem;--tw-translate-y:-1rem;--tw-scale-x:.75;--tw-scale-y:.75;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));padding-left:0.5rem;padding-right:0.5rem;--tw-text-opacity:1;color:rgb(5 150 105 / var(--tw-text-opacity))\n}input.svelte-l12h15.svelte-l12h15{display:block;width:100%;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:0.5rem;border-width:2px;--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity));background-color:transparent;padding-left:0.625rem;padding-right:0.625rem;padding-bottom:0.625rem;padding-top:1rem;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(17 24 39 / var(--tw-text-opacity))\n}input.svelte-l12h15.svelte-l12h15:focus{--tw-border-opacity:1;border-color:rgb(5 150 105 / var(--tw-border-opacity));outline:2px solid transparent;outline-offset:2px;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)\n}",
  map: null
};
const AuthModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $auth, $$unsubscribe_auth;
  $$unsubscribe_auth = subscribe(auth, (value) => $auth = value);
  let username = "";
  let password = "";
  let confirmPassword = "";
  let email = "";
  $$result.css.add(css$1);
  $$unsubscribe_auth();
  return `<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true"><div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> <div class="fixed inset-0 z-10 overflow-y-auto"><div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"><form class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"><div class="bg-white px-4 pb-4 pt-5 sm:p-4 sm:pb-4"><div class="text-center text-3xl font-semibold text-emerald-500">${$auth.type === "log in" ? `Account Login` : `${$auth.type === "register" ? `Create Your Account` : ``}`} <button class="text-3xl float-right align-middle text-center items-center text-red-500">${validate_component(Close, "Close").$$render($$result, { className: "h-6 align-middle" }, {}, {})}</button></div> <br> <div class="space-y-4"><div class="relative"><input required type="text" id="user_name" class="peer svelte-l12h15" placeholder=" "${add_attribute("value", username, 0)}> <label for="user_name" class=" svelte-l12h15">${$auth.type === "register" ? `Username` : `${$auth.type === "log in" ? `Email or Username` : ``}`}</label></div> ${$auth.type === "register" ? `<div class="relative"><input required type="email" id="email" class="peer svelte-l12h15" placeholder=" "${add_attribute("value", email, 0)}> <label for="email" class=" svelte-l12h15" data-svelte-h="svelte-1m89ak7">Email</label></div>` : ``} <div class="relative"><input required type="password" id="password" class="peer svelte-l12h15" placeholder=" "${add_attribute("value", password, 0)}> <label for="password" class=" svelte-l12h15" data-svelte-h="svelte-136jeaf">Password</label></div> ${$auth.type === "register" ? `<div class="relative"><input required type="password" id="confirm_password" class="peer svelte-l12h15" placeholder=" "${add_attribute("value", confirmPassword, 0)}> <label for="confirm_password" class=" svelte-l12h15" data-svelte-h="svelte-gbqrcu">Confirm Password</label></div>` : ``} <button type="submit" class="text-center w-full bg-emerald-500 rounded px-2 py-1 text-white font-semibold">${$auth.type === "log in" ? `Login` : `${$auth.type === "register" ? `Register` : ``}`}</button> ${$auth.type === "log in" ? `<div>Doesn&#39;t Have a Accout <button class="text-blue-500" data-svelte-h="svelte-oaj2jy">Register</button></div>` : `${$auth.type === "register" ? `Already a user <button class="text-blue-500" data-svelte-h="svelte-xescwk">Login</button>` : ``}`}</div></div></form></div></div> </div>`;
});
const logo = "/_app/immutable/assets/Logo.8a5a5c82.png";
const User_sign_Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline-block"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`;
});
const User_register = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline-block"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path></svg>`;
});
const Private_Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "h-6 w-6 inline" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${add_attribute("class", className, 0)}><path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd"></path></svg>`;
});
const Public_icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "h-6 w-6 inline" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${add_attribute("class", className, 0)}><path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z"></path></svg>`;
});
const Restricted_Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "h-6 w-6 inline" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${add_attribute("class", className, 0)}><path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clip-rule="evenodd"></path><path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z"></path></svg>`;
});
const CreateSocietyModal_svelte_svelte_type_style_lang = "";
const css = {
  code: "label.floating.svelte-1800g4a.svelte-1800g4a{position:absolute;top:0.5rem;left:0.25rem;z-index:10;transform-origin:0;--tw-translate-y:-1rem;--tw-scale-x:.75;--tw-scale-y:.75;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity));padding-left:0.5rem;padding-right:0.5rem;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(107 114 128 / var(--tw-text-opacity));transition-duration:300ms\n}.peer.svelte-1800g4a:-moz-placeholder-shown~label.floating.svelte-1800g4a{top:50%;--tw-translate-y:-50%;--tw-scale-x:1;--tw-scale-y:1;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))\n}.peer.svelte-1800g4a:placeholder-shown~label.floating.svelte-1800g4a{top:50%;--tw-translate-y:-50%;--tw-scale-x:1;--tw-scale-y:1;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))\n}.peer.svelte-1800g4a:focus~label.floating.svelte-1800g4a{top:0.5rem;--tw-translate-y:-1rem;--tw-scale-x:.75;--tw-scale-y:.75;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));padding-left:0.5rem;padding-right:0.5rem;--tw-text-opacity:1;color:rgb(5 150 105 / var(--tw-text-opacity))\n}input.floating.svelte-1800g4a.svelte-1800g4a{display:block;width:100%;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:0.5rem;border-width:2px;--tw-border-opacity:1;border-color:rgb(209 213 219 / var(--tw-border-opacity));background-color:transparent;padding-left:0.625rem;padding-right:0.625rem;padding-bottom:0.625rem;padding-top:1rem;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(17 24 39 / var(--tw-text-opacity))\n}input.floating.svelte-1800g4a.svelte-1800g4a:focus{--tw-border-opacity:1;border-color:rgb(5 150 105 / var(--tw-border-opacity));outline:2px solid transparent;outline-offset:2px;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)\n}input[type='radio'].svelte-1800g4a.svelte-1800g4a{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)\n}",
  map: null
};
const totallength = 25;
const CreateSocietyModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_society;
  $$unsubscribe_society = subscribe(society, (value) => value);
  let name = "";
  $$result.css.add(css);
  {
    if (name.length >= totallength) {
      name = name.slice(0, totallength);
    }
  }
  $$unsubscribe_society();
  return `<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true"><div class="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"></div> <div class="fixed inset-0 z-10 overflow-y-auto"><div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"><form class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"><div class="w-full px-4 py-4 space-y-1"><div class="text-xl font-semibold">Create Society
						<button class="float-right text-red-500">${validate_component(Close, "Close").$$render($$result, { className: "h-5" }, {}, {})}</button></div> <div><div class="text-xs my-1 mx-1 text-zinc-400" data-svelte-h="svelte-1ts500t"><span class="text-red-500">*</span>Note: Society name can&#39;t be changed later</div> <div class="relative"><input required type="text" id="name" class="floating peer svelte-1800g4a" placeholder=" "${add_attribute("value", name, 0)}> <label for="name" class="floating svelte-1800g4a" data-svelte-h="svelte-rs2a8d">Name</label></div> <div class="text-sm text-zinc-500">${escape(totallength - name.length)} remaining characters</div></div> <div class="text-lg font-semibold" data-svelte-h="svelte-hmeyep">Society Type</div> <div class="space-y-1"><div class="flex space-x-2 items-center align-middle"><input type="radio" id="public" name="society_type"${add_attribute("value", "public", 0)} class="svelte-1800g4a"${add_attribute("checked", true, 1)}> <label for="public">${validate_component(Public_icon, "PublicIcon").$$render(
    $$result,
    {
      className: "h-4 inline-block text-zinc-400 align-middle text-center mb-1"
    },
    {},
    {}
  )} <span data-svelte-h="svelte-sduc53">Public</span>${escape(" ")}<span class="text-sm text-slate-400" data-svelte-h="svelte-1h0pcoo">Anyone can view, post, and comment to this society</span></label></div> <div class="flex space-x-2 items-center align-middle"><input type="radio" id="restricted" name="society_type"${add_attribute("value", "restricted", 0)} class="svelte-1800g4a"${""}> <label for="restricted">${validate_component(Restricted_Icon, "RestrictedIcon").$$render(
    $$result,
    {
      className: "h-4 inline-block text-zinc-400 align-middle text-center mb-1"
    },
    {},
    {}
  )} <span data-svelte-h="svelte-y837e3">Restricted</span>${escape(" ")}<span class="text-sm text-slate-400" data-svelte-h="svelte-kdhwgv">Anyone can view, but only approved users can post</span></label></div> <div class="flex space-x-2 items-center align-middle"><input type="radio" id="private" name="society_type"${add_attribute("value", "private", 0)} class="svelte-1800g4a"${""}> <label for="private">${validate_component(Private_Icon, "PrivateIcon").$$render(
    $$result,
    {
      className: "h-4 inline-block text-zinc-400 align-middle text-center mb-1"
    },
    {},
    {}
  )} <span data-svelte-h="svelte-v95jor">Private</span>${escape(" ")}<span class="text-sm text-slate-400" data-svelte-h="svelte-tcdbum">Only approved users can view and submit to this society</span></label></div></div></div> <div class="bg-zinc-300 flex flex-row-reverse py-1 space-x-2" data-svelte-h="svelte-14qw8bp"><div><button type="submit" class="rounded-lg bg-emerald-400 text-white px-2 py-1 mr-2">Create Society</button></div> <div><button type="reset" class="rounded-lg bg-red-500 text-white px-2 py-1 mx-2">Cancel</button></div></div></form></div></div> </div>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $auth, $$unsubscribe_auth;
  let $society, $$unsubscribe_society;
  let $page, $$unsubscribe_page;
  let $$unsubscribe_user;
  $$unsubscribe_auth = subscribe(auth, (value) => $auth = value);
  $$unsubscribe_society = subscribe(society, (value) => $society = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_auth();
  $$unsubscribe_society();
  $$unsubscribe_page();
  $$unsubscribe_user();
  return `${$auth.open ? `${validate_component(AuthModal, "AuthModal").$$render($$result, {}, {}, {})}` : ``} ${$society.open ? `${validate_component(CreateSocietyModal, "CreateSocietyModal").$$render($$result, {}, {}, {})}` : ``} <header class="flex items-center justify-between h-16 px-4 text-center align-middle gap-4"><div class="flex"><a href="/"><img${add_attribute("src", logo, 0)} alt="logo" class="h-10"></a></div> <div class="flex space-x-2 flex-row"><button class="outline-none w-24 ring-0 bg-emerald-500 rounded px-2 py-1 text-white border-b-4 border-emerald-700" data-svelte-h="svelte-1fbpben">Home</button> ${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
        default: () => {
          return `Create Society`;
        }
      })} <hr> ${$page.data.logged_in ? `${each($page.data.creator_list, (item) => {
        return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
          default: () => {
            return `${escape(item.name)}`;
          }
        })}`;
      })} <hr> ${each($page.data.member_list, (item) => {
        return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
          default: () => {
            return `${escape(item.name)}`;
          }
        })}`;
      })} <hr> ${each($page.data.other_list, (item) => {
        return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
          default: () => {
            return `${escape(item.name)}`;
          }
        })}`;
      })}` : `${each($page.data.society_list, (item) => {
        return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
          default: () => {
            return `${escape(item.name)}`;
          }
        })}`;
      })}`}`;
    }
  })} <input type="text" id="Search" placeholder="Search..." class="px-2 py-1 rounded border-2 outline-none focus:border-emerald-400 bg-zinc-200"></div> <div class="space-x-2 flex">${$auth.isLoggedIn ? `<button class="bg-emerald-500 px-3 py-1 rounded border-b-4 border-emerald-700 text-white hover:bg-emerald-400" data-svelte-h="svelte-1u7xcg7">Logout</button>` : `<button class="bg-emerald-500 px-3 py-1 rounded border-b-4 border-emerald-700 text-white hover:bg-emerald-400">${validate_component(User_sign_Icon, "UserSignIcon").$$render($$result, {}, {}, {})}
				Sign In</button> <button class="bg-orange-500 px-3 py-1 rounded border-b-4 border-orange-700 text-white hover:bg-orange-400">${validate_component(User_register, "UserRegister").$$render($$result, {}, {}, {})}
				Register</button>`}</div></header>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col min-h-screen">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}  <div class="grow">${slots.default ? slots.default({}) : ``}</div> <footer data-svelte-h="svelte-1qua9px">This is footer</footer></div>`;
});
export {
  Layout as default
};
