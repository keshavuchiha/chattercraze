import{t as A,d as q}from"./index.90fc35b1.js";import{r as v}from"./scheduler.b9ed97e5.js";function C(e){return e?.length!==void 0?e:Array.from(e)}function D(e,r){A(e,1,1,()=>{r.delete(e.key)})}function E(e,r,u,_,h,a,s,d,t,b,g,x){let c=e.length,l=a.length,f=c;const k={};for(;f--;)k[e[f].key]=f;const w=[],m=new Map,p=new Map,j=[];for(f=l;f--;){const n=x(h,a,f),i=u(n);let o=s.get(i);o?_&&j.push(()=>o.p(n,r)):(o=b(i,n),o.c()),m.set(i,w[f]=o),i in k&&p.set(i,Math.abs(f-k[i]))}const S=new Set,$=new Set;function M(n){q(n,1),n.m(d,g),s.set(n.key,n),g=n.first,l--}for(;c&&l;){const n=w[l-1],i=e[c-1],o=n.key,y=i.key;n===i?(g=n.first,c--,l--):m.has(y)?!s.has(o)||S.has(o)?M(n):$.has(y)?c--:p.get(o)>p.get(y)?($.add(o),M(n)):(S.add(y),c--):(t(i,s),c--)}for(;c--;){const n=e[c];m.has(n.key)||t(n,s)}for(;l;)M(w[l-1]);return v(j),w}function F(e,r){const u={},_={},h={$$scope:1};let a=e.length;for(;a--;){const s=e[a],d=r[a];if(d){for(const t in s)t in d||(_[t]=1);for(const t in d)h[t]||(u[t]=d[t],h[t]=1);e[a]=d}else for(const t in s)h[t]=1}for(const s in _)s in u||(u[s]=void 0);return u}function G(e){return typeof e=="object"&&e!==null?e:{}}export{G as a,C as e,F as g,D as o,E as u};
