if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>l(s,r),a={module:{uri:r},exports:u,require:t};e[r]=Promise.all(i.map((s=>a[s]||t(s)))).then((s=>(n(...s),u)))}}define(["./workbox-fa446783"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/focus-visible-9c13edeb.js",revision:null},{url:"assets/focus-visible-legacy-b3e947fe.js",revision:null},{url:"assets/hardware-back-button-77fd2980.js",revision:null},{url:"assets/hardware-back-button-legacy-7391e573.js",revision:null},{url:"assets/index-ba6d037d.js",revision:null},{url:"assets/index-f823302a.css",revision:null},{url:"assets/index-legacy-cbff18c6.js",revision:null},{url:"assets/index9-c3c23aba.js",revision:null},{url:"assets/index9-legacy-4877612d.js",revision:null},{url:"assets/input-shims-6f61a3e5.js",revision:null},{url:"assets/input-shims-legacy-07867d80.js",revision:null},{url:"assets/ios.transition-8f2bccc8.js",revision:null},{url:"assets/ios.transition-legacy-bb5389d5.js",revision:null},{url:"assets/keyboard2-88123c0a.js",revision:null},{url:"assets/keyboard2-legacy-cff24e33.js",revision:null},{url:"assets/md.transition-97774965.js",revision:null},{url:"assets/md.transition-legacy-dbc23d8d.js",revision:null},{url:"assets/polyfills-legacy-a51acb07.js",revision:null},{url:"assets/status-tap-b6e3624d.js",revision:null},{url:"assets/status-tap-legacy-0f48bbe2.js",revision:null},{url:"assets/swipe-back-ba38943c.js",revision:null},{url:"assets/swipe-back-legacy-bde01378.js",revision:null},{url:"assets/web-1e67a120.js",revision:null},{url:"assets/web-46148ec4.js",revision:null},{url:"assets/web-466b2180.js",revision:null},{url:"assets/web-6e73380b.js",revision:null},{url:"assets/web-legacy-18380c56.js",revision:null},{url:"assets/web-legacy-23cd6a98.js",revision:null},{url:"assets/web-legacy-46159f53.js",revision:null},{url:"assets/web-legacy-8c864cea.js",revision:null},{url:"index.html",revision:"885a40e574404715d0ef11f113637fb0"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"025802405221653609315f47d520050b"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
