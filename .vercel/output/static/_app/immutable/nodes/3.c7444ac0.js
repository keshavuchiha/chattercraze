import{s as I,p as g,w as V}from"../chunks/scheduler.b9ed97e5.js";import{S as $,i as y,g as u,m as D,s as S,h as f,j as h,n as E,f as m,c as j,k as v,a as k,D as c,o as b}from"../chunks/index.90fc35b1.js";import{p as q}from"../chunks/stores.eed80331.js";function w(n){let e,s,a=n[0].status+"",i,p,o,l=n[0].error?.message+"",d;return{c(){e=u("div"),s=u("div"),i=D(a),p=S(),o=u("div"),d=D(l),this.h()},l(r){e=f(r,"DIV",{class:!0});var t=h(e);s=f(t,"DIV",{class:!0});var _=h(s);i=E(_,a),_.forEach(m),p=j(t),o=f(t,"DIV",{class:!0});var x=h(o);d=E(x,l),x.forEach(m),t.forEach(m),this.h()},h(){v(s,"class","text-6xl text-purple-500"),v(o,"class","text-4xl font-semibold text-red-500"),v(e,"class","text-center align-middle h-1/2 items-center mt-32 space-y-4")},m(r,t){k(r,e,t),c(e,s),c(s,i),c(e,p),c(e,o),c(o,d)},p(r,[t]){t&1&&a!==(a=r[0].status+"")&&b(i,a),t&1&&l!==(l=r[0].error?.message+"")&&b(d,l)},i:g,o:g,d(r){r&&m(e)}}}function C(n,e,s){let a;return V(n,q,i=>s(0,a=i)),[a]}class F extends ${constructor(e){super(),y(this,e,C,w,I,{})}}export{F as component};
