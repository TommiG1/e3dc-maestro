var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:f,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,h=globalThis,g=h.trustedTypes,_=g?g.emptyScript:``,v=h.reactiveElementPolyfillSupport,y=(e,t)=>e,ee={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},te=(e,t)=>!l(e,t),ne={attribute:!0,type:String,converter:ee,reflect:!1,useDefault:!1,hasChanged:te};Symbol.metadata??=Symbol(`metadata`),h.litPropertyMetadata??=new WeakMap;var b=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ne){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ne}static _$Ei(){if(this.hasOwnProperty(y(`elementProperties`)))return;let e=m(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y(`properties`))){let e=this.properties,t=[...f(e),...p(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?ee:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?ee:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??te)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};b.elementStyles=[],b.shadowRootOptions={mode:`open`},b[y(`elementProperties`)]=new Map,b[y(`finalized`)]=new Map,v?.({ReactiveElement:b}),(h.reactiveElementVersions??=[]).push(`2.1.2`);var x=globalThis,re=e=>e,ie=x.trustedTypes,ae=ie?ie.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,oe=`$lit$`,S=`lit$${Math.random().toFixed(9).slice(2)}$`,se=`?`+S,ce=`<${se}>`,le=document,ue=()=>le.createComment(``),de=e=>e===null||typeof e!=`object`&&typeof e!=`function`,fe=Array.isArray,pe=e=>fe(e)||typeof e?.[Symbol.iterator]==`function`,me=`[ 	
\f\r]`,he=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,_e=/>/g,ve=RegExp(`>|${me}(?:([^\\s"'>=/]+)(${me}*=${me}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),ye=/'/g,be=/"/g,xe=/^(?:script|style|textarea|title)$/i,Se=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),C=Se(1),w=Se(2),Ce=Symbol.for(`lit-noChange`),T=Symbol.for(`lit-nothing`),we=new WeakMap,Te=le.createTreeWalker(le,129);function Ee(e,t){if(!fe(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ae===void 0?t:ae.createHTML(t)}var De=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=he;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===he?c[1]===`!--`?o=ge:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=ve):(xe.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=ve):o=_e:o===ve?c[0]===`>`?(o=i??he,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?ve:c[3]===`"`?be:ye):o===be||o===ye?o=ve:o===ge||o===_e?o=he:(o=ve,i=void 0);let d=o===ve&&e[t+1].startsWith(`/>`)?` `:``;a+=o===he?n+ce:l>=0?(r.push(s),n.slice(0,l)+oe+n.slice(l)+S+d):n+S+(l===-2?t:d)}return[Ee(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},Oe=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=De(t,n);if(this.el=e.createElement(l,r),Te.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=Te.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(oe)){let t=u[o++],n=i.getAttribute(e).split(S),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Ne:r[1]===`?`?Pe:r[1]===`@`?Fe:Me}),i.removeAttribute(e)}else e.startsWith(S)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(xe.test(i.tagName)){let e=i.textContent.split(S),t=e.length-1;if(t>0){i.textContent=ie?ie.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],ue()),Te.nextNode(),c.push({type:2,index:++a});i.append(e[t],ue())}}}else if(i.nodeType===8){if(i.data===se)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(S,e+1))!==-1;)c.push({type:7,index:a}),e+=S.length-1}}a++}}static createElement(e,t){let n=le.createElement(`template`);return n.innerHTML=e,n}};function ke(e,t,n=e,r){if(t===Ce)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=de(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=ke(e,i._$AS(e,t.values),i,r)),t}var Ae=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??le).importNode(t,!0);Te.currentNode=r;let i=Te.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new je(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Ie(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=Te.nextNode(),a++)}return Te.currentNode=le,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},je=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ke(this,e,t),de(e)?e===T||e==null||e===``?(this._$AH!==T&&this._$AR(),this._$AH=T):e!==this._$AH&&e!==Ce&&this._(e):e._$litType$===void 0?e.nodeType===void 0?pe(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==T&&de(this._$AH)?this._$AA.nextSibling.data=e:this.T(le.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Oe.createElement(Ee(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Ae(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=we.get(e.strings);return t===void 0&&we.set(e.strings,t=new Oe(e)),t}k(t){fe(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(ue()),this.O(ue()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=re(e).nextSibling;re(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Me=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=T,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=T}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=ke(this,e,t,0),a=!de(e)||e!==this._$AH&&e!==Ce,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=ke(this,r[n+o],t,o),s===Ce&&(s=this._$AH[o]),a||=!de(s)||s!==this._$AH[o],s===T?e=T:e!==T&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Ne=class extends Me{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===T?void 0:e}},Pe=class extends Me{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==T)}},Fe=class extends Me{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=ke(this,e,t,0)??T)===Ce)return;let n=this._$AH,r=e===T&&n!==T||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==T&&(n===T||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ie=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){ke(this,e)}},Le={M:oe,P:S,A:se,C:1,L:De,R:Ae,D:pe,V:ke,I:je,H:Me,N:Pe,U:Fe,B:Ne,F:Ie},Re=x.litHtmlPolyfillSupport;Re?.(Oe,je),(x.litHtmlVersions??=[]).push(`3.3.3`);var ze=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new je(t.insertBefore(ue(),e),e,void 0,n??{})}return i._$AI(e),i},Be=globalThis,Ve=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ze(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ce}};Ve._$litElement$=!0,Ve.finalized=!0,Be.litElementHydrateSupport?.({LitElement:Ve});var He=Be.litElementPolyfillSupport;He?.({LitElement:Ve}),(Be.litElementVersions??=[]).push(`4.2.2`);var Ue=(function(){let e=typeof document<`u`&&document.createElement(`link`).relList;return e&&e.supports&&e.supports(`modulepreload`)?`modulepreload`:`preload`})(),We=function(e,t){return new URL(e,t).href},Ge={},Ke=function(e){return e.pathname.endsWith(`.css`)},qe=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},Je=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=We(t,n);let r=s(t),i=Ke(r);return qe(Ge,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Ue,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Ye,Xe=new WeakMap,Ze,Qe=0;async function $e(){return Ze??=await Je(()=>import(`./apex-DvHPYsi2.js`),[],import.meta.url),Ze}var et=class extends Ve{constructor(...e){super(...e),this._run=0}createRenderRoot(){return this}updated(e){e.has(`options`)&&this._apply().catch(e=>{this.dispatchEvent(new CustomEvent(`chart-error`,{detail:e instanceof Error?`${e.name}: ${e.message}`:String(e),bubbles:!0,composed:!0}))})}connectedCallback(){super.connectedCallback(),Qe++,Ze?.claimSVG(),this.hasUpdated&&this.options&&!this._chart&&this.requestUpdate(`options`)}disconnectedCallback(){super.disconnectedCallback(),--Qe===0&&Ze?.releaseSVG(),this._run++;try{this._chart?.destroy()}catch{}this._chart=void 0,this.replaceChildren()}_scoped(e){let t=e.chart?.id,n=e.chart?.brush?.target,r=this.getRootNode(),i=Xe.get(r);i||Xe.set(r,i=Math.random().toString(36).slice(2,8));let a=i;return{...e,chart:{...e.chart,...t?{id:`${t}-${a}`}:{},...n?{brush:{...e.chart?.brush,target:`${n}-${a}`}}:{}}}}zoomX(e,t){this._zoom=[e,t],this._chart?.zoomX(e,t)}async _apply(){let e=this.options;if(!e)return;let t=this._scoped(e),n=++this._run,r=await $e(),i=r.default;if(n!==this._run||!this.isConnected)return;r.claimSVG();let a=t.chart?.brush?.target;if(a){for(let e=0;e<120&&!i.getChartByID(a);e++)if(await new Promise(e=>requestAnimationFrame(e)),n!==this._run)return}this._chart?(await this._chart.updateOptions(t,!1,!1),t.series&&await this._chart.updateSeries(t.series,!1)):(this._chart=new i(this,t),await this._chart.render()),n===this._run&&this._zoom&&this._chart.zoomX(...this._zoom)}};Ye=et,Ye.properties={options:{attribute:!1}},customElements.get(`maestro-chart`)||customElements.define(`maestro-chart`,et);var E=e=>`sensor.e3dc_maestro_${e}`,D=e=>`binary_sensor.e3dc_maestro_${e}`,tt=e=>`switch.e3dc_maestro_${e}`,nt={phase:E(`regelphase`),lastAction:E(`letzte_aktion`),explanation:E(`entscheidungserklarung`),trajectory:E(`forecast_soc_trajektorie_24h`),plan:E(`preisplan`),soc:E(`aktueller_soc`),targetSoc:E(`ziel_soc`),pv:E(`pv_power`),house:E(`house_power`),grid:E(`grid_power`),battery:E(`battery_power`),autonomy:E(`autonomiezeit`),costNet:E(`netto_stromkosten_heute`),costToday:E(`stromkosten_heute`),feedRevenue:E(`einspeise_erlos_heute`),wear:E(`akku_verschleiss_heute`),balance:E(`energiebilanz_heute`),gridToBattery:E(`netz_akku_heute`),unjustified:D(`netzladung_ohne_rechtfertigung`),wallboxEnergy:E(`wallbox_energie_heute`),feedInInterventions:E(`einspeise_eingriffe_heute`),feedInAvoided:E(`dc_abregelung_verhindert_heute`),curtailAvoided:E(`abregelung_verhindert_heute`),feedInLimit:D(`einspeisedrosselung_aktiv`),gridCharge:D(`netzladung_aktiv`),batteryPriority:D(`akku_prioritat_aktiv`),lowYield:D(`schwacher_pv_tag`),forecastQuality:E(`forecast_datenqualitat`),p10:E(`pv_restprognose_p10`),yieldToday:E(`pv_tagesprognose`),yieldRef:E(`pv_referenz_ertrag`),yieldRatio:E(`pv_tag_quote`),deficit:E(`morgen_energiedefizit`),seasonalReserve:E(`notstromreserve_aktuell`),adaptiveReserve:E(`notstromreserve_adaptiv`),htReserve:E(`ht_reserve_adaptiv`),forwardTarget:E(`vorausschauendes_ladeziel`),astroStart:E(`astro_ladestart_uhrzeit`),seasonalEnd:E(`saisonales_ladeende_uhrzeit`),pvDelayStart:E(`verzogerter_ladestart_heute`),tomorrowStart:E(`ladestart_morgen_prognose`),tomorrowEnd:E(`ladeende_morgen_prognose`),autoStrategy:E(`auto_aktive_strategie`),autoSaving:E(`auto_geschatzte_einsparung`),targetCharge:E(`ziel_ladeleistung`),sizingStatus:E(`advisor_status`),sizingMatrix:E(`advisor_sizing_matrix`),sizingScenario:E(`advisor_szenario`),sizingInverter:D(`advisor_wr_upgrade_empfohlen`),btnSizing:`button.e3dc_maestro_sizing_analyse_starten`,saving:E(`pv_ersparnis_heute`),selfUse:E(`pv_eigenverbrauch_heute`),importToday:E(`netzbezug_heute`),feedToday:E(`netzeinspeisung_heute`),chargedToday:E(`geladen_heute`),dischargedToday:E(`entladen_heute`),pvTomorrow:E(`morgen_pv_prognose`),reachable:D(`e3dc_erreichbar`),chargeLock:D(`ladesperre_aktiv`),dischargeLock:D(`entladesperre_aktiv`),htProtect:D(`ht_schutz_aktiv`),curtail:D(`abregelschutz_aktiv`),emergency:D(`notfallladung_aktiv`),chargeLimit:E(`soll_lade_limit`),dischargeLimit:E(`soll_entlade_limit`),sentChargeLimit:E(`gesendetes_lade_limit`),sentDischargeLimit:E(`gesendetes_entlade_limit`),forceDischargePower:`number.e3dc_maestro_erzwungene_entladungsleistung`,fixedReserveSoc:`number.e3dc_maestro_notstromreserve_prozent`,ctrlActive:tt(`regelung_aktiv`),ctrlPredictive:tt(`vorausschauende_ladung`),ctrlPvDelay:tt(`pv_prognose_verzogerung`),ctrlPlanControls:tt(`preisplan_steuert_akku`),ctrlPlanShadow:tt(`preisplan_schattenmodus`),forceDischarge:tt(`erzwungene_entladung`),fixedReserve:tt(`notstromreserve`),debug:tt(`debug_logging`),debugLog:E(`debug_log`),btnClear:`button.e3dc_maestro_limits_jetzt_freigeben`,btnCharge:`button.e3dc_maestro_manuell_laden_3_kwh`,selWallbox:`select.e3dc_maestro_wallbox_typ`,selMorning:`select.e3dc_maestro_vorentladungs_modus`,selAuto:`select.e3dc_maestro_auto_optimierung_ziel`,selTariff:`select.e3dc_maestro_tarif_modus`},O={...nt},rt=()=>({entities:{},packs:[],wallboxes:[],controls:{general:{},wallbox:{}},identity:{}}),k=rt();function it(e){for(let t of Object.keys(nt))O[t]=e.entities[t]??nt[t]}var at={},ot=new Set;function st(e){for(let e of Object.keys(at))delete at[e];Object.assign(at,e.settings??{}),ot.clear();for(let t of e.settings_disabled??[])ot.add(t)}function ct(e){k=e.plant??rt()}var lt=e=>ot.has(e),ut=[`ctrlActive`,`ctrlPredictive`,`ctrlPvDelay`,`ctrlPlanControls`,`ctrlPlanShadow`],A=e=>Object.values(e??{}),dt=()=>[...A(k.entities),...A(k.controls?.general),...A(k.controls?.wallbox),...k.packs.flatMap(e=>[...A(e.entities),...A(e.controls),...(e.modules??[]).flatMap(e=>A(e.entities))]),...k.wallboxes.flatMap(e=>[...A(e.entities),...A(e.controls)])],ft=()=>[...Object.values(O),...Object.values(at),...dt()],j=e=>{let t=e?Number.parseFloat(e.state):NaN;return Number.isFinite(t)?t:void 0},M=e=>e?.state===`on`,pt=`sensor.e3dc_maestro_wallbox_leistung`,mt=`e3dc-maestro.consumers.v1`,ht=50,gt=1e4,_t=[`wallbox`,`heater`,`climate`,`heatpump`,`meter`],vt={wallbox:`M6 8h12v7H6zM9 8V5M15 8V5M12 15v4M9 19h6`,heater:`M10 3v18M15 7c1.4 1 1.4 2 0 3s-1.4 2 0 3 1.4 2 0 3`,climate:`M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9`,heatpump:`M4 7h16v11H4zM12 9.5a2.5 2.5 0 1 0 .01 0`,meter:`M6 16a6 6 0 1 1 12 0M12 16l3.5-3.5`},yt=e=>typeof e==`string`&&_t.includes(e);function bt(e){return/wallbox|evcc|easee|go-?e/i.test(e)?`wallbox`:`meter`}function xt(e){return!e||e.state===`unavailable`}function St(e){let t=j(e);if(t!==void 0)return e?.attributes.unit_of_measurement===`kW`?t*1e3:t}function Ct(e){if(!e?.entity_id.startsWith(`sensor.`))return!1;let t=e.attributes.unit_of_measurement;return e.attributes.device_class===`power`||t===`W`||t===`kW`}function wt(e,t){let n=e?.attributes.friendly_name;return typeof n==`string`&&n.trim()?n.trim():t}function Tt(e){if(!Array.isArray(e))return[];let t=[],n=new Set;for(let r of e){if(!r||typeof r!=`object`)continue;let e=r,i=e.entityId,a=e.mode;if(typeof i!=`string`||!i.startsWith(`sensor.`)||n.has(i)||a!==`included`&&a!==`separate`)continue;let o=typeof e.name==`string`&&e.name.trim()?e.name.trim().slice(0,40):i,s=typeof e.id==`string`&&e.id?e.id:i;if(t.push({id:s,entityId:i,name:o,mode:a,icon:yt(e.icon)?e.icon:bt(i)}),n.add(i),t.length>=6)break}return t}function Et(){let e=new Uint8Array(8);return crypto.getRandomValues(e),[...e].map(e=>e.toString(16).padStart(2,`0`)).join(``)}function Dt(e,t){return Array.isArray(e)?{list:Tt(e),publishLocal:!1}:t.length?{list:t,publishLocal:!0}:{list:[],publishLocal:!1}}function Ot(){try{return Tt(JSON.parse(localStorage.getItem(mt)??`null`))}catch{return[]}}function kt(e){try{localStorage.setItem(mt,JSON.stringify(Tt(e)))}catch{}}function At(e,t){return e.map(e=>{let n=t.states[e.entityId],r=St(n);return{id:e.id,name:e.name,mode:e.mode,icon:e.icon,watts:r??0,missing:xt(n)}})}function jt(e,t){return e!==void 0&&t.filter(e=>e.mode===`included`).reduce((e,t)=>e+Math.max(0,t.watts),0)>e+ht}function Mt(e,t,n,r=gt){if(!e)return{show:!1,since:void 0};let i=t??n;return{show:n-i>=r,since:i}}function Nt(e,t,n){let r=n.trim().toLowerCase();return Object.values(e.states).filter(e=>Ct(e)&&!t.has(e.entity_id)).map(e=>({id:e.entity_id,name:wt(e,e.entity_id)})).filter(e=>!r||e.name.toLowerCase().includes(r)||e.id.toLowerCase().includes(r)).sort((e,t)=>e.name.localeCompare(t.name)).slice(0,12)}var{I:Pt}=Le,Ft=e=>e.strings===void 0,It={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Lt=e=>(...t)=>({_$litDirective$:e,values:t}),Rt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},zt=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),zt(e,t);return!0},Bt=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},Vt=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Wt(t)}};function Ht(e){this._$AN===void 0?this._$AM=e:(Bt(this),this._$AM=e,Vt(this))}function Ut(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0){if(t){if(Array.isArray(r))for(let e=n;e<r.length;e++)zt(r[e],!1),Bt(r[e]);else r!=null&&(zt(r,!1),Bt(r))}else zt(this,e)}}var Wt=e=>{e.type==It.CHILD&&(e._$AP??=Ut,e._$AQ??=Ht)},Gt=class extends Rt{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),Vt(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(zt(this,e),Bt(this))}setValue(e){if(Ft(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}},Kt=new WeakMap,qt=Lt(class extends Gt{render(e){return T}update(e,[t]){let n=t!==this.G;return n&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),T}rt(e){if(this.G!==void 0){if(this.isConnected||(e=void 0),typeof this.G==`function`){let t=this.ht??globalThis,n=Kt.get(t);n===void 0&&(n=new WeakMap,Kt.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}}get lt(){return typeof this.G==`function`?Kt.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Jt={wallbox:`iconWallbox`,heater:`iconHeater`,climate:`iconClimate`,heatpump:`iconHeatpump`,meter:`iconMeter`},Yt=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},Xt={ctrlActive:`ctrlActiveSub`,ctrlPredictive:`ctrlPredictiveSub`,ctrlPvDelay:`ctrlPvDelaySub`,ctrlPlanControls:`ctrlPlanControlsSub`,ctrlPlanShadow:`ctrlPlanShadowSub`};function Zt(e){let{t}=e.i18n,n=e.hass.states[O.forceDischargePower],r=n?.attributes??{},i=typeof r.min==`number`?r.min:100,a=typeof r.max==`number`?r.max:1e4,o=typeof r.step==`number`?r.step:100,s=e.forcePowerDraft??j(n)??i,c=e.hass.states[O.fixedReserveSoc],l=c?.attributes??{},u=typeof l.min==`number`?l.min:0,d=typeof l.max==`number`?l.max:100,f=typeof l.step==`number`?l.step:1,p=e.reserveDraft??j(c)??u,m=(t,n)=>{let r=e.hass.states[t],i=M(r),a=!r||r.state===`unavailable`;return C`<button
      class="switch ${i?`on`:``}"
      role="switch"
      aria-checked=${i}
      aria-label=${n}
      ?disabled=${a||e.pending.has(t)}
      @click=${()=>e.onToggle(t)}
    ></button>`};return C`
    <div class="scrim ${e.open?`open`:``}" @click=${e.onClose}></div>
    <aside class="sheet ${e.open?`open`:``}" role="dialog" aria-modal="true" aria-label=${t(`controlsTitle`)} ?inert=${!e.open}>
      <div class="sheet-head">
        <div class="grow"><h2>${t(`controlsTitle`)}</h2><div class="sub">${t(`controlsSub`)}</div></div>
        <button class="btn" @click=${e.onClose}>${t(`close`)}</button>
      </div>
      ${e.error?C`<p class="err">${e.error}</p>`:T}
      <div class="release">
        <button
          class="btn action"
          ?disabled=${!e.hass.states[O.btnClear]||e.pending.has(O.btnClear)}
          @click=${()=>e.onPress(O.btnClear)}
        >${t(`btnClear`)}</button>
        <p class="sub">${t(`btnClearSub`)}</p>
      </div>
      ${ut.map(e=>C`<div class="ctrl">
          <div class="txt"><b>${t(e)}</b><span>${t(Xt[e])}</span></div>
          ${m(O[e],t(e))}
        </div>`)}
      <div class="ctrl wrap">
        <div class="txt"><b>${t(`ctrlForce`)}</b><span>${t(`ctrlForcePower`,{v:e.fmt.w(s)})}</span></div>
        ${m(O.forceDischarge,t(`ctrlForce`))}
        <input
          type="range"
          min=${i}
          max=${a}
          step=${o}
          .value=${String(s)}
          aria-label=${t(`ctrlForcePower`,{v:``})}
          ?disabled=${!n||n.state===`unavailable`}
          @input=${t=>e.onPowerDraft(Number(t.target.value))}
          @change=${t=>e.onPowerCommit(Number(t.target.value))}
        />
      </div>
      <div class="ctrl wrap">
        <div class="txt"><b>${t(`fixedReserve`)}</b><span>${t(`ctrlReserveSoc`,{v:Math.round(p)})}</span></div>
        ${m(O.fixedReserve,t(`fixedReserve`))}
        <input
          type="range"
          min=${u}
          max=${d}
          step=${f}
          .value=${String(p)}
          aria-label=${t(`fixedReserve`)}
          ?disabled=${!c||c.state===`unavailable`}
          @input=${t=>e.onReserveDraft(Number(t.target.value))}
          @change=${t=>e.onReserveCommit(Number(t.target.value))}
        />
      </div>
      <div class="sheet-section">
        <h3>${t(`actionsTitle`)}</h3>
        ${[`selWallbox`,`selMorning`,`selAuto`,`selTariff`].map(n=>{let r=e.hass.states[O[n]],i=Array.isArray(r?.attributes.options)?r.attributes.options:[];return C`<label class="ctrl">
            <span class="txt"><b>${t(n)}</b></span>
            <select
              .value=${r?.state??``}
              ?disabled=${!r||r.state===`unavailable`||e.pending.has(O[n])}
              @change=${t=>e.onSelect(O[n],t.target.value)}
            >
              ${i.map(t=>C`<option value=${t} ?selected=${t===r?.state}>${e.i18n.option(t)}</option>`)}
            </select>
          </label>`})}
        ${[`btnCharge`].map(n=>{let r=n===`btnCharge`?[t(`confirmCharge`)]:[];return C`<button
            class="btn action"
            ?disabled=${!e.hass.states[O[n]]||e.pending.has(O[n])}
            @click=${()=>{r.some(e=>!window.confirm(e))||e.onPress(O[n])}}
          >${t(n)}</button>`})}
      </div>
      <div class="sheet-section" id="display-consumers">
        <h3>${t(`displayTitle`)}</h3>
        <div class="sub">${t(`consumersSub`)}</div>
        ${e.consumers.length?e.consumers.map(n=>{let r=e.hass.states[n.entityId],i=xt(r);return C`<div class="consumer">
                <label class="txt">
                  <span class="lbl">${t(`consumerName`)}</span>
                  <input
                    ${qt(e=>{e instanceof HTMLInputElement&&!Yt(e)&&e.value!==n.name&&(e.value=n.name)})}
                    maxlength="40"
                    aria-label=${t(`consumerName`)}
                    @input=${t=>e.onRenameConsumer(n.id,t.target.value)}
                  />
                  <span>${i?t(`consumerMissing`):n.entityId}</span>
                </label>
                <div class="icon-pick" role="group" aria-label=${t(`consumerIcon`)}>
                  ${_t.map(r=>C`<button
                      type="button"
                      class=${n.icon===r?`on`:``}
                      aria-pressed=${n.icon===r}
                      aria-label=${t(Jt[r])}
                      @click=${()=>e.onConsumerIcon(n.id,r)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${vt[r]} /></svg>
                    </button>`)}
                </div>
                <div class="seg" role="group" aria-label=${n.name}>
                  <button type="button" class=${n.mode===`included`?`on`:``} aria-pressed=${n.mode===`included`} @click=${()=>e.onConsumerMode(n.id,`included`)}>${t(`modeIncluded`)}</button>
                  <button type="button" class=${n.mode===`separate`?`on`:``} aria-pressed=${n.mode===`separate`} @click=${()=>e.onConsumerMode(n.id,`separate`)}>${t(`modeSeparate`)}</button>
                </div>
                <button type="button" class="btn ghost" @click=${()=>e.onRemoveConsumer(n.id)}>${t(`removeConsumer`)}</button>
              </div>`}):C`<p class="hint">${t(`consumersEmpty`)}</p>`}
        ${e.wallbox?C`<button type="button" class="btn add" @click=${e.onUseWallbox}>${t(`useWallbox`)}</button>`:T}
        ${e.consumers.length<6?C`<button type="button" class="btn add" @click=${()=>e.onPick(!e.picking)}>${t(`addConsumer`)}</button>`:T}
        ${e.picking?C`<div class="picker">
              <input
                type="search"
                placeholder=${t(`consumerSearch`)}
                aria-label=${t(`consumerSearch`)}
                .value=${e.pickQuery}
                @input=${t=>e.onPickQuery(t.target.value)}
              />
              ${e.choices.length?e.choices.map(t=>C`<button type="button" class="pick" @click=${()=>e.onAddConsumer(t.id,t.name)}>
                      <b>${t.name}</b><span>${t.id}</span>
                    </button>`):C`<p class="hint">${t(`noPowerSensors`)}</p>`}
            </div>`:T}
      </div>
      <a class="link" href="#settings" @click=${t=>{t.preventDefault(),e.onAllSettings()}}>${t(`allSettings`)}</a>
    </aside>`}var Qt=e=>Array.isArray(e)&&e.every(e=>Array.isArray(e)&&e.length===2&&Number.isFinite(e[0]));function $t(e){if(!e)return;let t=e;if(!(!Qt(t.trajectory_points)||!Qt(t.pv_points)||!Qt(t.house_points)||!Qt(t.grid_points)||!Array.isArray(t.trajectory_phases)||t.trajectory_points.length<2))return t}var N=e=>e.map(([e,t])=>[e,t/1e3]);function en(e){return{imp:e.map(([e,t])=>[e,Math.max(0,-t)/1e3]),exp:e.map(([e,t])=>[e,Math.max(0,t)/1e3])}}function tn(e,t){let n=[],r=0;for(let i=1;i<=e.length;i++)(i===e.length||e[i]!==e[r])&&(n.push({phase:e[r],x:t[r][0],x2:t[Math.min(i,t.length)-1][0]}),r=i);return n}var nn=e=>e.grid_charge_kwh>0?`charge`:e.hold?`hold`:`release`;function rn(e){return Array.isArray(e)?e.filter(e=>!!e&&typeof e.start==`string`&&Number.isFinite(Date.parse(e.start))&&Number.isFinite(e.price)):[]}function an(e){if(e.length<3)return e;let t=e.map(e=>Date.parse(e.start)),n=t.slice(1).map((e,n)=>e-t[n]).sort((e,t)=>e-t),r=n[Math.floor(n.length/2)];return e.filter((n,i)=>i===e.length-1||t[i+1]-t[i]>=r*.5)}function on(e){if(e.length)return{min:e.reduce((e,t)=>t.price<e.price?t:e),max:e.reduce((e,t)=>t.price>e.price?t:e)}}function sn(e){return(e??[]).map(e=>{let t=e.lc??e.lu,n=t===void 0?Date.parse(e.last_changed??e.last_updated??``):t*1e3;return{state:e.s??e.state??``,attrs:e.a??e.attributes??{},ts:n}}).filter(e=>Number.isFinite(e.ts))}function cn(e){return e.map(e=>[e.ts,Number.parseFloat(e.state)]).filter(([,e])=>Number.isFinite(e))}function ln(e,t,n){let r=new Map;for(let[n,i]of e){let e=Math.floor(n/t)*t,a=r.get(e);a?a.push(i):r.set(e,[i])}return[...r.entries()].sort(([e],[t])=>e-t).map(([e,t])=>[e,n===`last`?t[t.length-1]:t.reduce((e,t)=>e+t,0)/t.length])}function un(e,t,n=12){let r=(e,t,n)=>{let r=typeof e.timestamp==`string`?Date.parse(e.timestamp):NaN;return{phase:typeof e.phase==`string`?e.phase:t,reason:typeof e.reason==`string`?e.reason:``,ts:Number.isFinite(r)?r:n}},i=e=>e===`unavailable`||e===`unknown`||e===``,a=e.filter(e=>!i(e.state)||typeof e.attrs.phase==`string`).map(e=>r(e.attrs,e.state,e.ts));if(Array.isArray(t))for(let e of t)e&&typeof e==`object`&&a.push(r(e,``,Date.now()));a.sort((e,t)=>t.ts-e.ts);let o=[];for(let e of a){if(!e.phase)continue;let t=o[o.length-1];t&&t.phase===e.phase?o[o.length-1]=e:o.push(e)}return o.slice(0,n)}var dn={dark:{text:`#e8edf7`,muted:`#8b96ad`,faint:`#5a6580`,bg:`#070b14`,grid:`rgba(255,255,255,0.06)`,series:`#ffffff`,track:`rgba(255,255,255,0.06)`,mode:`dark`},classic:{text:`#152033`,muted:`#5b6b80`,faint:`#8b97a8`,bg:`#eef2f6`,grid:`rgba(21,32,51,0.08)`,series:`#152033`,track:`rgba(21,32,51,0.08)`,mode:`light`},e3dc:{text:`#4a4a4a`,muted:`#6e767c`,faint:`#a4aaae`,bg:`#f7f7f7`,grid:`rgba(30,37,43,0.08)`,series:`#4a4a4a`,track:`rgba(30,37,43,0.08)`,mode:`light`}},P=dn.dark;function fn(e){P=dn[e]}var F={pv:`#fbbf24`,house:`#a78bfa`,gridIn:`#f87171`,gridOut:`#34d399`,bat:`#22d3ee`,accent:`#38bdf8`,accent2:`#818cf8`,get text(){return P.text},get muted(){return P.muted},get faint(){return P.faint},get bg(){return P.bg},get grid(){return P.grid},get series(){return P.series},get track(){return P.track},get mode(){return P.mode}},pn={charge:F.gridOut,hold:F.pv,release:F.bat},mn=()=>({chart:{background:`transparent`,foreColor:F.muted,fontFamily:`Inter, system-ui, sans-serif`,toolbar:{show:!1},animations:{enabled:!1}},theme:{mode:F.mode},grid:{borderColor:F.grid,strokeDashArray:4},dataLabels:{enabled:!1},legend:{show:!1},tooltip:{theme:F.mode}}),hn=e=>!!e&&typeof e==`object`&&!Array.isArray(e),gn=(e,t)=>{let n={...e};for(let[e,r]of Object.entries(t))n[e]=hn(r)&&hn(n[e])?gn(n[e],r):r;return n},I=e=>gn(mn(),e),_n=e=>({x:Date.now(),borderColor:F.text,opacity:.6,label:{text:e,orientation:`horizontal`,borderWidth:0,style:{background:F.text,color:F.bg,fontWeight:700}}});function vn(e){if(!Array.isArray(e)||e.length!==12)return;let t=e.map(e=>typeof e==`number`&&Number.isFinite(e)?e:NaN);return t.some(e=>Number.isNaN(e))?void 0:t}function yn(e,t,n,r,i){let a=Array.from({length:12},(t,n)=>new Intl.DateTimeFormat(e||`de`,{month:`short`}).format(new Date(2024,n,1)));return I({chart:{type:`line`,height:260},series:[{name:r,type:`area`,data:t},{name:i,type:`line`,data:n}],colors:[F.bat,F.gridIn],stroke:{curve:`smooth`,width:[2.5,1.5]},fill:{type:[`gradient`,`solid`],gradient:{shadeIntensity:.2,opacityFrom:.45,opacityTo:.02,stops:[0,100]}},xaxis:{categories:a,axisBorder:{show:!1},axisTicks:{show:!1}},yaxis:{min:0,title:{text:`kWh`},labels:{formatter:e=>String(Math.round(e))}}})}var bn=(e={})=>({type:`datetime`,labels:{datetimeUTC:!1,format:`HH:mm`},axisBorder:{show:!1},axisTicks:{show:!1},...e});function xn({traj:e,targetSoc:t,ist:n,showIst:r,fmt:i,i18n:a}){let{imp:o,exp:s}=en(e.grid_points),c=tn(e.trajectory_phases,e.trajectory_points).map(e=>{let t={x:e.x,x2:e.x2,fillColor:F.accent,opacity:.05};return e.x2-e.x>=18e5&&(t.label={text:a.phase(e.phase),borderWidth:0,orientation:`vertical`,position:`top`,offsetX:10,offsetY:10,style:{background:`transparent`,color:F.muted,fontSize:`11px`}}),t}),l=[{name:a.t(`legendPv`),type:`area`,data:N(e.pv_points)},{name:a.t(`legendHouse`),type:`line`,data:N(e.house_points)},{name:a.t(`legendImport`),type:`area`,data:o},{name:a.t(`legendFeed`),type:`area`,data:s},{name:a.t(`legendSoc`),type:`line`,data:e.trajectory_points}],u=[F.pv,F.house,F.gridIn,F.gridOut,F.bat],d=[2,2,1.5,1.5,3.5],f=[0,4,0,0,0],p=[`gradient`,`solid`,`gradient`,`gradient`,`solid`],m=[{seriesName:a.t(`legendPv`),min:0,title:{text:`kW`},labels:{formatter:e=>i.n(e,1)}},{seriesName:a.t(`legendPv`),show:!1},{seriesName:a.t(`legendPv`),show:!1},{seriesName:a.t(`legendPv`),show:!1},{seriesName:a.t(`legendSoc`),opposite:!0,min:0,max:100,tickAmount:5,title:{text:`SoC %`},labels:{formatter:e=>`${Math.round(e)}%`}}],h=-1;return r&&n&&(n.pv.length>1||n.house.length>1)&&(h=l.length,l.push({name:`${a.t(`legendPv`)} ${a.t(`legendActual`)}`,type:`line`,data:N(n.pv)},{name:`${a.t(`legendHouse`)} ${a.t(`legendActual`)}`,type:`line`,data:N(n.house)},{name:`${a.t(`legendSoc`)} ${a.t(`legendActual`)}`,type:`line`,data:n.soc}),u.push(F.pv,F.house,F.bat),d.push(1.5,1.5,1.5),f.push(0,0,0),p.push(`solid`,`solid`,`solid`),m.push({seriesName:a.t(`legendPv`),show:!1},{seriesName:a.t(`legendPv`),show:!1},{seriesName:a.t(`legendSoc`),opposite:!0,min:0,max:100,show:!1})),I({chart:{id:`fc`,type:`line`,height:420,zoom:{enabled:!0,type:`x`},toolbar:{show:!1,autoSelected:`zoom`}},grid:{padding:{top:t!==void 0&&t>=90?28:8}},series:l,colors:u,stroke:{width:d,curve:`smooth`,dashArray:f},fill:{type:p,gradient:{opacityFrom:.45,opacityTo:.02},opacity:l.map((e,t)=>h>=0&&t>=h?.55:1)},xaxis:bn({tooltip:{enabled:!1}}),yaxis:m,tooltip:{shared:!0,intersect:!1,x:{format:`HH:mm`},y:{formatter:(e,t)=>e==null?`–`:t?.seriesIndex===4||h>=0&&t?.seriesIndex===h+2?`${i.n(e)} %`:`${i.n(e,2)} kW`}},markers:{size:0,hover:{size:5}},annotations:{xaxis:[...c,_n(a.t(`now`))],yaxis:t===void 0?[]:[{y:t,yAxisIndex:4,borderColor:F.accent2,strokeDashArray:6,label:{text:a.t(`targetLabel`,{v:Math.round(t)}),position:`right`,textAnchor:`end`,offsetX:-8,offsetY:-16,borderWidth:0,style:{background:`rgba(7,11,20,.85)`,color:`#c7d2fe`,fontSize:`12px`,padding:{left:6,right:6,top:3,bottom:3}}}}]}})}function Sn(e){let t=e.trajectory_points[0][0],n=e.trajectory_points[e.trajectory_points.length-1][0];return I({chart:{id:`fc-brush`,type:`area`,height:90,brush:{enabled:!0,target:`fc`},selection:{enabled:!0,xaxis:{min:t,max:n},fill:{color:F.accent,opacity:.12},stroke:{color:F.accent}}},series:[{name:`PV`,data:N(e.pv_points)},{name:`House`,data:N(e.house_points)}],colors:[F.pv,F.house],stroke:{width:1.5,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.35,opacityTo:0}},xaxis:bn(),yaxis:{show:!1,min:0},grid:{show:!1},tooltip:{enabled:!1}})}function Cn({slots:e,fmt:t,i18n:n}){let r=an(e),i=e=>Date.parse(e.start),a=e=>{let r=nn(e);return r===`charge`?n.t(`slotCharge`,{kwh:t.n(e.grid_charge_kwh,2)}):r===`hold`?n.t(`slotHold`):n.t(`slotRelease`)},o=(e,t)=>`<div style="display:flex;justify-content:space-between;gap:16px;color:${F.muted}"><span>${e}</span><b style="color:${F.text}">${t}</b></div>`;return I({chart:{type:`line`,height:360,zoom:{enabled:!0,type:`x`},toolbar:{show:!1,autoSelected:`zoom`}},series:[{name:n.t(`slotPrice`),type:`column`,data:r.map(e=>({x:i(e),y:+(e.price*100).toFixed(1),fillColor:pn[nn(e)]}))},{name:n.t(`legendPlanSoc`),type:`line`,data:r.map(e=>({x:i(e),y:e.soc_pct}))}],colors:[F.bat,F.series],stroke:{width:[0,2.5],curve:`stepline`},plotOptions:{bar:{columnWidth:`78%`,borderRadius:4,borderRadiusApplication:`end`}},fill:{opacity:[.85,1]},xaxis:bn(),yaxis:[{title:{text:`ct/kWh`},labels:{formatter:e=>t.n(e,0)}},{opposite:!0,min:0,max:100,title:{text:`SoC %`},labels:{formatter:e=>`${Math.round(e)}%`}}],tooltip:{shared:!0,intersect:!1,custom:({dataPointIndex:e})=>{let i=r[e];return i?`<div style="padding:12px 14px;min-width:190px">
          <div style="font-weight:700;margin-bottom:8px">${t.dayTime(i.start)}</div>
          ${o(n.t(`slotPrice`),`${t.n(i.price*100)} ct`)}
          ${o(n.t(`slotSoc`),`${t.n(i.soc_pct)} %`)}
          ${o(n.t(`slotConsumption`),`${t.n(i.consumption_kwh,2)} kWh`)}
          <div style="margin-top:8px;color:${pn[nn(i)]};font-weight:600">${a(i)}</div></div>`:``}},annotations:{xaxis:[_n(n.t(`now`))]}})}function wn(e,t){return I({chart:{type:`radialBar`,height:270,sparkline:{enabled:!0}},series:[e],colors:[F.bat],fill:{type:`gradient`,gradient:{shade:F.mode,type:`horizontal`,gradientToColors:[F.accent2],stops:[0,100]}},plotOptions:{radialBar:{hollow:{size:`68%`},startAngle:-135,endAngle:135,track:{background:F.track,strokeWidth:`100%`},dataLabels:{name:{show:!0,offsetY:26,color:F.muted,fontSize:`13px`},value:{offsetY:-14,fontSize:`46px`,fontWeight:800,color:F.text,formatter:e=>`${Math.round(e)}%`}}}},stroke:{lineCap:`round`},labels:[t]})}function Tn(e,t){return I({chart:{type:`line`,height:220},series:e.map(e=>({name:e.name,data:N(e.points)})),colors:[F.accent,F.house,F.pv],stroke:{width:2,curve:`smooth`},legend:{show:!1},xaxis:bn(),yaxis:{decimalsInFloat:1,title:{text:`kW`},labels:{formatter:e=>t.n(e,1)}},tooltip:{shared:!0,intersect:!1,x:{format:`dd.MM. HH:mm`},y:{formatter:e=>`${t.n(e,2)} kW`}}})}function En(e,t,n){return I({chart:{type:`area`,height:280},series:[{data:N(e)}],colors:[t],stroke:{width:2,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.32,opacityTo:.02}},xaxis:bn(),yaxis:{decimalsInFloat:1,title:{text:`kW`},labels:{formatter:e=>n.n(e,1)}},tooltip:{x:{format:`dd.MM. HH:mm`},y:{formatter:e=>`${n.n(e,2)} kW`}}})}function Dn(e,t){return I({chart:{type:`area`,height:56,sparkline:{enabled:!0}},series:[{data:e}],colors:[t],stroke:{width:2,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.35,opacityTo:0}},xaxis:{type:`datetime`},tooltip:{enabled:!1}})}var On=`data:image/png;base64,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`,kn={pv:`M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z`,grid:`M12 2 7 22M12 2l5 20M5 9h14M4 15h16`,house:`M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6`,bat:`M7 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM10 3h4`},An=24,jn=2.15;function Mn(e){let t=e*2;return(t-Math.max(3,t*.05)*2)/An}var Nn=1.08;function Pn(e){return(Nn+Mn(e))/2}function Fn(e,t,n){let r=An/2*n;return`translate(${e-r} ${t-r}) scale(${n})`}var L={x:6.6,y:7.6,w:10.8,h:10.8};function In(e){if(typeof e!=`number`||!Number.isFinite(e)||e<=0)return;let t=Math.min(100,e)/100,n=L.h*t;return{x:L.x,y:L.y+L.h-n,width:L.w,height:n}}var Ln={wide:{box:[600,420],hub:{x:300,y:215},pv:{x:300,y:100,labelDy:-72},grid:{x:90,y:215,labelDy:70},house:{x:510,y:215,labelDy:70},bat:{x:300,y:320,labelDy:70}},compact:{box:[360,520],hub:{x:180,y:250},pv:{x:180,y:95,labelDy:-72},grid:{x:62,y:250,labelDy:70},house:{x:298,y:250,labelDy:70},bat:{x:180,y:405,labelDy:70}}},Rn=30,zn=42,Bn=26,Vn=46,Hn=16;function Un(e,t,n,r){let i=t.x-e.x,a=t.y-e.y,o=Math.hypot(i,a)||1,s=Math.min(n,o/2),c=Math.min(r,o/2);return{x1:e.x+i/o*s,y1:e.y+a/o*s,x2:t.x-i/o*c,y2:t.y-a/o*c}}function Wn(e,t,n,r){let i=Un(e,t,n,r);return`M${i.x1} ${i.y1} L${i.x2} ${i.y2}`}var Gn=.22,Kn=6e3;function qn(e){let t=Math.abs(e);return t<Rn?0:t<600?2:t<2e3?3:t<4500?4:5}function Jn(e){return Gn+Math.min(Math.abs(e),Kn)/Kn*1.1300000000000001}function Yn(e,t){let n=t/1e3;for(let t of e){let e=Number(t.getAttribute(`data-x1`)),r=Number(t.getAttribute(`data-y1`)),i=Number(t.getAttribute(`data-x2`)),a=Number(t.getAttribute(`data-y2`)),o=Number(t.getAttribute(`data-speed`)),s=Number(t.getAttribute(`data-phase`));if(!Number.isFinite(o))continue;let c=((n*o+s)%1+1)%1,l=Math.sin(c*Math.PI),u=e+(i-e)*c,d=r+(a-r)*c;t.setAttribute(`transform`,`translate(${u.toFixed(1)} ${d.toFixed(1)})`),t.setAttribute(`opacity`,(.2+.8*l).toFixed(3))}}var Xn=(e,t=16)=>e.length<=t?e:`${e.slice(0,t-1)}…`;function Zn(e,t){let n=In(e);return w`<clipPath id="batbody"><rect x=${L.x} y=${L.y} width=${L.w} height=${L.h} rx="1.3"/></clipPath>
    ${n?w`<rect clip-path="url(#batbody)" x=${n.x} y=${n.y} width=${n.width} height=${n.height+1} fill=${t} stroke="none" opacity="0.78"/>`:w``}
    <path d=${kn.bat} vector-effect="non-scaling-stroke"/>`}var Qn={"var(--pv)":`#9a3412`,"var(--house)":`#5b21b6`,"var(--grid-in)":`#b91c1c`,"var(--grid-out)":`#047857`,"var(--bat)":`#0e7490`,"var(--accent)":`#075985`},$n=(e,t)=>t?Qn[e]??`#152033`:e;function er(e,t,n,r,i,a,o){let s=o?qn(i):0;if(!s)return w``;let c=Un(e,t,n,r),l=Jn(i).toFixed(3);return w`${Array.from({length:s},(e,t)=>w`<g class="electron" fill=${a} data-x1=${c.x1} data-y1=${c.y1} data-x2=${c.x2} data-y2=${c.y2} data-speed=${l} data-phase=${t/s}><circle class="halo" r="3.4"/><circle r="1.5"/><circle r="0.75" fill="#fff"/></g>`)}`}function tr(e,t){let n=Ln.compact.bat.y+Ln.compact.bat.labelDy+52;return Array.from({length:e},(e,r)=>({x:t-40,y:n+r*Vn,labelDy:5}))}function nr(e){if(!e)return Ln.compact.box[1];let t=tr(e,Ln.compact.box[0]).at(-1);return t.y+t.labelDy+36}function rr(e,t){if(t)return Math.round(e?nr(t)*.94:380*Math.max(420,48+t*96)/420)}function ir(e,t,n,r){if(!e.length)return w``;let i=n-14,a=Math.max(...e.map(({p:e})=>e.y));return w`<path class="flow-line" d="M${t.x+zn} ${t.y} L${i} ${t.y} L${i} ${a}" stroke="var(--house)"/>
    ${e.map(({c:e,p:t})=>{let n=e.mode===`included`?`var(--house)`:`var(--accent)`,a=Un({x:i,y:t.y},t,0,Hn);return w`<path class="flow-line" d="M${i} ${t.y} L${a.x2} ${t.y}" stroke=${n}/>
        ${er({x:i,y:t.y},t,0,Hn,e.watts,n,r)}`})}`}function ar(e){let t=(e.consumers??[]).slice(0,6),n=e.compact?Ln.compact:Ln.wide,r=n.box[0]+(!e.compact&&t.length?160:0),i=e.compact?nr(t.length):Math.max(n.box[1],48+t.length*96),a=e.compact?tr(t.length,r):[],o=r=>e.compact?a[r]:{x:n.box[0]+78,y:i*((r+1)/(t.length+1)),labelDy:44},{pv:s=0,house:c=0,grid:l=0,battery:u=0}=e,d=e.motion!==!1,f=e.outline===!0,p=e=>$n(e,f),m=e.i18n.t,h={pv:{color:`var(--pv)`,label:m(`nodePv`),value:s,icon:kn.pv},grid:{color:l<0?`var(--grid-in)`:`var(--grid-out)`,label:m(l<0?`nodeImport`:`nodeFeed`),value:l,icon:kn.grid},house:{color:`var(--house)`,label:m(`nodeHouse`),value:c,icon:kn.house},bat:{color:`var(--bat)`,label:m(u<0?`nodeBatDischarge`:`nodeBatCharge`),value:u,icon:kn.bat}},g=[];s>Rn&&g.push({node:`pv`,toHub:!0}),u<-30&&g.push({node:`bat`,toHub:!0}),u>Rn&&g.push({node:`bat`,toHub:!1}),l<-30&&g.push({node:`grid`,toHub:!0}),l>Rn&&g.push({node:`grid`,toHub:!1}),c>Rn&&g.push({node:`house`,toHub:!1});let _=e.compact?Hn:Bn,v=[`pv`,`grid`,`house`,`bat`],y=t.map((e,t)=>({c:e,p:o(t)}));return w`<svg viewBox="0 0 ${r} ${i}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${[...v.map(t=>`${h[t].label} ${e.fmt.w(h[t].value)}`),...y.map(({c:t})=>`${t.name} ${e.fmt.w(t.watts)}`)].join(`, `)}>
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="hubg"><stop offset="0" stop-color="rgba(56,189,248,.5)"/><stop offset="1" stop-color="rgba(56,189,248,0)"/></radialGradient>
    </defs>
    ${v.map(e=>w`<path class="flow-line" d=${Wn(n[e],n.hub,zn,_)} stroke=${h[e].color}/>`)}
    ${e.compact?ir(y,n.house,r,d):y.map(({c:e,p:t})=>{let r=e.mode===`included`?n.house:n.hub,i=e.mode===`included`?zn:_,a=e.mode===`included`?`var(--house)`:`var(--accent)`;return w`<path class="flow-line" d=${Wn(r,t,i,Bn)} stroke=${a}/>
        ${er(r,t,i,Bn,e.watts,a,d)}`})}
    ${g.map(e=>er(e.toHub?n[e.node]:n.hub,e.toHub?n.hub:n[e.node],e.toHub?zn:_,e.toHub?_:zn,h[e.node].value,h[e.node].color,d))}
    <image href=${On} x=${n.hub.x-_} y=${n.hub.y-_} width=${_*2} height=${_*2} aria-label="Maestro"/>
    ${v.map(t=>{let r=h[t],i=n[t],a=Math.abs(r.value)<Rn,o=i.labelDy<0;return w`<g class="flow-node" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${r.label} @click=${()=>e.onSelect?.(t)} @keydown=${n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),e.onSelect?.(t))}}>
        <circle cx=${i.x} cy=${i.y} r="42" fill=${f?`none`:`rgba(10,16,30,.9)`} stroke=${p(r.color)} stroke-width=${f?`2.4`:`2`} filter=${a||f?`none`:`url(#glow)`}/>
        <g transform=${Fn(i.x,i.y,Pn(zn))} fill="none" stroke=${p(r.color)} stroke-width=${jn} stroke-linecap="round" stroke-linejoin="round">
          ${t===`bat`?Zn(e.soc,p(r.color)):w`<path d=${r.icon} vector-effect="non-scaling-stroke"/>`}
        </g>
        <text class="node-val" x=${i.x} y=${i.y+i.labelDy} text-anchor="middle">${e.fmt.w(r.value)}</text>
        <text class="node-lbl" x=${i.x} y=${i.y+i.labelDy+(o?19:18)} text-anchor="middle">${r.label}</text>
      </g>`})}
    ${y.map(({c:t,p:n})=>{let r=p(t.mode===`included`?`var(--house)`:`var(--accent)`),i=t.missing||Math.abs(t.watts)<Rn,a=()=>e.onSelect?.(t.id),o=e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),a())};return e.compact?w`<g class="flow-node" opacity=${i?.55:1} role="button" tabindex="0" aria-label=${t.name} @click=${a} @keydown=${o}>
          <circle cx=${n.x} cy=${n.y} r=${Hn} fill=${f?`none`:`rgba(10,16,30,.9)`} stroke=${r} stroke-width=${f?`2.2`:`2`}/>
          <g transform=${Fn(n.x,n.y,Mn(Hn))} fill="none" stroke=${r} stroke-width=${jn} stroke-linecap="round" stroke-linejoin="round"><path d=${vt[t.icon]} vector-effect="non-scaling-stroke"/></g>
          <text font-size="14" font-weight="700" fill="var(--text)" x=${n.x-26} y=${n.y+5} text-anchor="end">${e.fmt.w(t.watts)}  ${Xn(t.name,24)}</text>
        </g>`:w`<g class="flow-node" opacity=${i?.55:1} role="button" tabindex="0" aria-label=${t.name} @click=${a} @keydown=${o}>
        <circle cx=${n.x} cy=${n.y} r="26" fill=${f?`none`:`rgba(10,16,30,.9)`} stroke=${r} stroke-width=${f?`2.4`:`2`} filter=${i||f?`none`:`url(#glow)`}/>
        <g transform=${Fn(n.x,n.y,Mn(Bn))} fill="none" stroke=${r} stroke-width=${jn} stroke-linecap="round" stroke-linejoin="round"><path d=${vt[t.icon]} vector-effect="non-scaling-stroke"/></g>
        <text class="node-val-sm" x=${n.x} y=${n.y+n.labelDy} text-anchor="middle">${e.fmt.w(t.watts)}</text>
        <text class="node-lbl-sm" x=${n.x} y=${n.y+n.labelDy+14} text-anchor="middle">${Xn(t.name)}</text>
      </g>`})}
  </svg>`}var or=e=>{let t=e||`de`,n=(e,n=1)=>e===void 0||!Number.isFinite(e)?`–`:e.toLocaleString(t,{minimumFractionDigits:n,maximumFractionDigits:n});return{loc:t,n,w:e=>e===void 0||!Number.isFinite(e)?`–`:Math.abs(e)>=1e3?`${n(Math.abs(e)/1e3,1)} kW`:`${Math.round(Math.abs(e))} W`,time:e=>new Date(e).toLocaleTimeString(t,{hour:`2-digit`,minute:`2-digit`}),dayTime:e=>new Date(e).toLocaleString(t,{weekday:`short`,hour:`2-digit`,minute:`2-digit`})}},sr=[`today`,`balance`,`plant-operation`,`plant-storage`,`plant-phases`,`plant-wallbox`],cr=`e3dc-maestro.groups.v1`;function lr(e){return Array.isArray(e)?new Set(e.filter(e=>typeof e==`string`&&sr.includes(e))):new Set}function ur(){try{return lr(JSON.parse(localStorage.getItem(cr)??`null`))}catch{return new Set}}function dr(e){try{localStorage.setItem(cr,JSON.stringify([...e]))}catch{}}function fr(e,t,n,r){return e.callWS({type:`history/history_during_period`,start_time:new Date(n).toISOString(),end_time:new Date().toISOString(),entity_ids:t,include_start_time_state:!0,...r})}var pr=()=>{let e=new Date;return e.setHours(0,0,0,0),e.getTime()},mr=[`costNet`,`saving`,`selfUse`,`chargedToday`,`costToday`,`feedRevenue`,`wear`,`balance`,`gridToBattery`,`wallboxEnergy`,`curtailAvoided`];function hr(e){if(!e?.length)return;let t=!1,n=0;for(let r of e)typeof r.change==`number`&&Number.isFinite(r.change)&&(t=!0,n+=r.change);return t?n:void 0}var gr=[`costNet`,`costToday`,`feedRevenue`,`wear`,`saving`,`selfUse`,`importToday`,`feedToday`,`chargedToday`,`dischargedToday`,`gridToBattery`,`wallboxEnergy`,`curtailAvoided`,`feedInAvoided`,`feedInInterventions`].filter(e=>e!==`costNet`),_r=e=>{let t=new Date;return e===`week`?t.setDate(t.getDate()-(t.getDay()+6)%7):t.setDate(1),t.setHours(0,0,0,0),t.getTime()};async function vr(e,t){let n=await e.callWS({type:`recorder/statistics_during_period`,start_time:new Date(_r(t)).toISOString(),end_time:new Date().toISOString(),statistic_ids:gr.map(e=>O[e]),period:`day`,types:[`change`]}),r={};for(let e of gr){let t=hr(n[O[e]]);t!==void 0&&(r[e]=t)}return r.costToday!==void 0&&r.feedRevenue!==void 0&&(r.costNet=r.costToday-r.feedRevenue),r}async function yr(e){let t=await fr(e,mr.map(e=>O[e]),pr(),{minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),n={};for(let e of mr)n[e]=ln(cn(sn(t[O[e]])),18e5,`last`);return n}var br=864e5,xr={minimal_response:!0,no_attributes:!0,significant_changes_only:!1},Sr=(e,t,n)=>{let r=e.states[t]?.attributes.unit_of_measurement===`kW`?1e3:1;return ln(cn(sn(n)).map(([e,t])=>[e,t*r]),3e5,`mean`)};async function Cr(e,t,n=1){return ln(cn(sn((await fr(e,[t],Date.now()-br,xr))[t])).map(([e,t])=>[e,t*n]),3e5,`mean`)}async function wr(e,t){let n=[...new Set(t)],r={};if(!n.length)return r;let i=await fr(e,n,Date.now()-br,xr);for(let t of n)r[t]=Sr(e,t,i[t]);return r}async function Tr(e,t=6){let n=await fr(e,[O.pv,O.house,O.soc],Date.now()-t*36e5,{minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),r=e=>ln(cn(sn(n[e])),3e5,`mean`);return{pv:r(O.pv),house:r(O.house),soc:r(O.soc)}}async function Er(e){let t=await fr(e,[O.lastAction],Date.now()-864e5,{minimal_response:!1,no_attributes:!1,significant_changes_only:!0}),n=e.states[O.lastAction]?.attributes.history;return un(sn(t[O.lastAction]),n)}var Dr=new Map;function R(e,t,n){let r=Dr.get(e);if(r&&r.deps.length===t.length&&r.deps.every((e,n)=>Object.is(e,t[n])))return r.value;let i=n();return Dr.set(e,{deps:t,value:i}),i}var Or={navLive:`Live`,navForecast:`Prognose`,navPlan:`Preisplan`,navDecision:`Entscheidung`,navSettings:`Einstellungen`,navPlant:`Anlage`,settingHelp:`Hilfe`,navControls:`Steuerung`,menu:`Menü`,subLive:`Energiefluss und Akku in Echtzeit`,subForecast:`Was Maestro für die nächsten 24 Stunden erwartet`,subPlan:`Netzladung nach dynamischem Tarif`,subDecision:`Warum Maestro gerade so regelt`,subSettings:`Von der Anlage über Schutz und Tarif bis zum PV-Laden`,subPlant:`Betriebszustand, Speicher und Phasen vom E3DC`,regulationOn:`Regelung aktiv`,regulationOff:`Regelung aus`,flowTitle:`Energiefluss`,flowSub:`Jetzt · aktualisiert live`,nodePv:`PV`,nodeHouse:`Haus`,nodeImport:`Netzbezug`,nodeFeed:`Einspeisung`,nodeBatDischarge:`Akku entlädt`,nodeBatCharge:`Akku lädt`,battery:`Akku`,stateOfCharge:`Ladezustand`,targetSoc:`Ziel-SoC`,autonomy:`Autonomie`,discharging:`Entladung`,charging:`Ladung`,chipReachable:`E3DC erreichbar`,chipChargeLock:`Ladesperre`,chipDischargeLock:`Entladesperre`,chipHt:`HT-Schutz`,chipCurtail:`Abregelschutz`,chipEmergency:`Notladung`,chipFeedIn:`Einspeisedrosselung`,chipGridCharge:`Netzladung`,chipBatteryPriority:`Akku-Priorität`,chipLowYield:`Schwacher PV-Tag`,chipPredictive:`Vorausschauende Ladung`,chipShadow:`Preisplan · Schatten`,groupToday:`Heute`,groupWeek:`Woche`,groupMonth:`Monat`,groupNet:`netto`,periodToday:`Heute`,periodWeek:`Woche`,periodMonth:`Monat`,forceTitle:`Erzwungene Entladung`,fixedReserve:`Notstromreserve`,ctrlReserveSoc:`{v} %`,exportCsv:`CSV`,actionsTitle:`Aktionen`,btnClear:`Limits freigeben`,btnClearSub:`Hebt Lade- und Entladegrenzen sofort auf und setzt den Wechselrichter auf Normal.`,btnCharge:`Manuell laden (3 kWh)`,confirmCharge:`3 kWh aus dem Netz laden?`,selWallbox:`Wallbox-Typ`,selMorning:`Vorentladung`,selAuto:`Auto-Ziel`,selTariff:`Tarif`,debugTitle:`Debug-Log`,debugEmpty:`Noch keine Debug-Zeilen. Der Schalter startet das Logging.`,debugSwitch:`Debug-Logging`,balanceTitle:`Tagesbilanz`,balanceWeek:`Wochenbilanz`,balanceMonth:`Monatsbilanz`,whenToday:`heute`,whenWeek:`diese Woche`,whenMonth:`diesen Monat`,kpiCostGross:`Stromkosten`,kpiCostGrossSub:`Netzbezug brutto`,kpiRevenue:`Einspeise-Erlös`,kpiRevenueSub:`Vergütung {when}`,kpiWear:`Akku-Verschleiß`,kpiWearSub:`anteilige Zyklenkosten`,kpiBalance:`Energiebilanz`,kpiBalanceSub:`Erlös + Ersparnis − Kosten − Verschleiß`,kpiGridBat:`Netz → Akku`,kpiGridBatSub:`aus dem Netz geladen`,kpiGridBatWarn:`Netzladung ohne Rechtfertigung`,kpiWallbox:`Wallbox {when}`,kpiWallboxSub:`geladene Energie`,kpiFeedLimit:`Einspeisebegrenzung`,kpiFeedLimitSub:`{n} Eingriffe · {dc} kWh DC-Abregelung`,kpiCost:`Stromkosten {when}`,kpiCostSub:`netto nach Einspeisung`,kpiSaving:`PV-Ersparnis {when}`,kpiSavingSub:`gegenüber reinem Netzbezug`,kpiSelf:`Eigenverbrauch {when}`,kpiSelfSub:`Netzbezug {imp} kWh · Einspeisung {feed} kWh`,kpiBattery:`Akku {when}`,kpiBatterySub:`geladen · {out} kWh entladen`,chartTitle:`SoC-Trajektorie & Leistungen · nächste 24 h`,legendSoc:`SoC`,legendPv:`PV`,legendHouse:`Haus`,legendImport:`Netzbezug`,legendFeed:`Einspeisung`,legendActual:`Ist`,actualOverlay:`Ist-Verlauf`,now:`Jetzt`,targetLabel:`Ziel-SoC {v}%`,hoursShort:`{h} h`,statMinMax:`SoC Min / Max`,statImport:`Netzbezug`,statFeed:`Einspeisung`,statAutarky:`Autarkie`,statPvTomorrow:`PV morgen`,statP10:`PV-Rest (P10)`,statDeficit:`Defizit morgen`,statYield:`PV-Tag`,statYieldSub:`{today} / {ref} kWh Referenz`,qualityLabel:`Datenqualität`,qualityOk:`vollständig`,qualityPv:`PV-Profil fehlt`,qualityConsumption:`Verbrauchsprofil fehlt`,qualityBoth:`Profile fehlen`,qualityUnknown:`unbekannt`,reserveTitle:`Ziel-SoC`,reserveSeasonal:`Notstromreserve`,reserveAdaptive:`Reserve adaptiv`,reserveHt:`HT-Reserve`,reserveForward:`Vorausschau`,windowsTitle:`Ladefenster`,windowAstro:`Astro-Start`,windowSeasonalEnd:`Saison-Ende`,windowPvDelay:`PV-Verzögerung`,windowTomorrow:`Morgen`,autoTitle:`Auto-Strategie`,autoSaving:`Geschätzte Einsparung`,alertUnreachable:`E3DC ist nicht erreichbar`,alertChargeLock:`Ladesperre aktiv`,alertDischargeLock:`Entladesperre aktiv`,alertUnjustified:`Netzladung ohne Rechtfertigung`,noForecast:`Noch keine Prognose verfügbar. Maestro braucht mindestens 7 Tage Verlauf.`,priceTitle:`Strompreis & geplanter SoC`,legendCharge:`Netzladung`,legendHold:`Akku halten`,legendRelease:`Akku frei`,legendPlanSoc:`SoC geplant`,planShadow:`Schattenmodus · steuert nicht`,planActive:`Aktiv · steuert den Akku`,planTitle:`Plan`,planGridCharge:`Netzladung geplant`,planSaving:`Erwartete Ersparnis`,planCheapest:`Günstigster Slot`,planMostExpensive:`Teuerster Slot`,planKnownUntil:`Preise bekannt bis`,noPlan:`Es liegt kein Preisplan vor. Er braucht einen dynamischen Tarif.`,planTune:`Schwellwerte`,planTuneHint:`Diese Werte entscheiden, wann aus dem Netz geladen wird.`,planTuneTariff:`Tarif`,planTuneTariffHint:`Bei dynamischem Tarif gilt ein Preis bis zur Günstig-Schwelle als günstig.`,planTuneGrid:`Netzladung im günstigen Fenster`,planTuneGridHint:`Im günstigen Slot wird bis zum Ziel geladen, höchstens das Tagesbudget.`,planTunePlan:`Preisplan`,planTunePlanHint:`Netzladung nur, wenn die Preisspanne Wirkungsgrad und Verschleiß deckt, und nur bis zur SoC-Obergrenze.`,slotPrice:`Preis`,slotSoc:`SoC`,slotConsumption:`Verbrauch`,slotCharge:`Netzladung {kwh} kWh`,slotHold:`Akku halten`,slotRelease:`Akku frei`,decisionPhase:`Aktuelle Regelphase`,tagTargetSoc:`Ziel-SoC {v} %`,tagTargetPower:`Ziel-Ladeleistung {v}`,tagBatteryPriority:`Akku-Priorität`,tagSince:`seit {t}`,limitsTitle:`Limits · Soll vs. gesendet`,limitsSub:`Was Maestro will und was am E3DC ankommt`,limitCharge:`Ladelimit`,limitDischarge:`Entladelimit`,limitTarget:`Soll {a} · gesendet {b}`,limitNone:`kein Limit`,entitiesMissing:`Nicht verfügbar: {list}. Diese Maestro-Entities fehlen oder sind deaktiviert – bitte unter Einstellungen › Entitäten prüfen.`,entityDisabled:`deaktiviert`,notSetUp:`E3DC Maestro ist nicht eingerichtet oder noch nicht gestartet.`,limitSoc:`aktuell {a} % → {b} %`,timelineTitle:`Verlauf der Entscheidungen`,timelineEmpty:`Noch keine Entscheidungen aufgezeichnet.`,noDecision:`Noch keine Entscheidung vorhanden.`,controlsTitle:`Schnellsteuerung`,controlsSub:`Wirkt sofort auf die Regelung`,close:`Schließen`,historySub:`Letzte 24 Stunden`,historyEmpty:`Keine Verlaufsdaten in den letzten 24 Stunden.`,historyFailed:`Der Verlauf konnte nicht geladen werden.`,ctrlActive:`Regelung aktiv`,ctrlActiveSub:`Maestro steuert die Lade- und Entladelimits`,ctrlPredictive:`Vorausschauende Ladung`,ctrlPredictiveSub:`Ladeziel aus Prognose und Verbrauch`,ctrlPvDelay:`PV-Prognose-Verzögerung`,ctrlPvDelaySub:`Ladestart verschieben, wenn PV reicht`,ctrlPlanControls:`Preisplan steuert Akku`,ctrlPlanControlsSub:`Aus = nur Schattenmodus`,ctrlPlanShadow:`Preisplan Schattenmodus`,ctrlPlanShadowSub:`Plan berechnen, aber nichts senden`,ctrlForce:`Erzwungene Entladung`,ctrlForcePower:`Leistung {v}`,allSettings:`Alle Einstellungen öffnen →`,displayTitle:`Anzeige`,consumersSub:`Verbraucher im Energiefluss. Gilt für jedes Gerät, das dieses Cockpit öffnet.`,addConsumer:`Verbraucher hinzufügen`,consumerSearch:`Leistungssensor suchen`,consumerName:`Name im Energiefluss`,consumerIcon:`Symbol`,iconWallbox:`Wallbox`,iconHeater:`Heizstab`,iconClimate:`Klimaanlage`,iconHeatpump:`Wärmepumpe`,iconMeter:`Leistungsmesser`,modeIncluded:`Im Hausverbrauch`,modeSeparate:`Separat gemessen`,useWallbox:`Wallbox übernehmen`,removeConsumer:`Entfernen`,editConsumers:`Verbraucher bearbeiten`,consumersEmpty:`Noch keine Verbraucher. Wallbox, Wärmepumpe und weitere Lasten kannst du hier ergänzen.`,consumersOverflow:`Die enthaltenen Verbraucher liegen über der Hausleistung. Prüfe, ob sie wirklich im Hauszähler stecken.`,noPowerSensors:`Keine passenden Leistungssensoren gefunden.`,consumerMissing:`Sensor nicht verfügbar`,unavailable:`nicht verfügbar`,callFailed:`Aktion fehlgeschlagen: {err}`,chartError:`Chart konnte nicht geladen werden: {err}`,loading:`Lädt …`,demoHint:`Keine Daten`,setHardware:`Anlage`,setHardwareHint:`Anlagendaten, mit denen Maestro Leistungen und Grenzen rechnet.`,setCorridor:`Ziel-SoC und Ladekorridor`,setCorridorHint:`Wohin der Akku am Tag soll: Schwelle, Korridor, Ladeende und harte Deckel.`,setWindows:`Vorausschau und Zeitfenster`,setWindowsHint:`Wann geladen wird: Prognose, Sonne, Morgen-Deckel und Verteilung über den Tag.`,setYield:`Wenig PV und Abregelung`,setYieldHint:`Akku vor Einspeisung füllen, Abregelung abfangen und spät nachladen.`,setTariff:`Netz und Tarif`,setTariffHint:`Dieselben Schwellwerte stehen im Preisplan. Tarif-Slots bleiben unter Integration konfigurieren.`,setReserve:`Hochtarif und Reserve`,setReserveHint:`HT-Fenster und Notstromreserve. Lookback der adaptiven Reserve bleibt unter Integration konfigurieren.`,setFlex:`Wallbox, Wärmepumpe, Vorentladung`,setFlexHint:`Zusätzliche Lasten und das morgendliche Entladen vor dem Ladestart.`,setControl:`Steuerverhalten`,setControlHint:`Hauptschalter, erzwungene Entladung und wie ruhig die Regelung nachregelt.`,setDiag:`Diagnose und Aktionen`,setDiagHint:`Debug-Protokoll und einmalige Aktionen.`,setPlant:`Anlage`,setPlantHint:`Wechselrichter, PV-Leistung und die Grenzen, mit denen Maestro rechnet.`,setSafety:`Schutz`,setSafetyHint:`Notladung, Notstromreserve, Akku-Deckel und Watchdog.`,setPv:`PV-Laden`,setPvHint:`Tagesziel, Zeitfenster, Ladeform und was bei wenig Sonne oder Abregelung passiert.`,setLoads:`Verbraucher`,setLoadsHint:`Wallbox, EVCC, Wärmepumpe und das morgendliche Entladen vor dem Ladestart.`,setAuto:`Automatik`,setAutoHint:`Maestro sucht einmal am Tag eine bessere Einstellung für Morning-Cap und Schonladung.`,setSystem:`System`,setSystemHint:`Hauptschalter, erzwungene Entladung, Regeltempo und Diagnose.`,secPlantPower:`Leistung und Grenzen`,secPlantPowerHint:`Nennwerte der Anlage.`,secEmergency:`Notladung`,secEmergencyHint:`Unter dieser Schwelle lädt Maestro sofort, bevor jede andere Regel greift.`,secReserve:`Notstromreserve`,secReserveHint:`Eine feste Reserve ersetzt die saisonale und die adaptive.`,secHard:`Akku-Deckel`,secHardHint:`Oberhalb dieses SoC stoppt die Ladung. Der Abregelschutz darf den Deckel übersteuern.`,secWatchdog:`Watchdog`,secWatchdogHint:`Nach dieser Zeit ohne Kontakt gibt Maestro die Limits frei.`,secPrices:`Preise`,secPricesHint:`Tarifmodus und die Preise für Kosten, Erlös und Verschleiß.`,secGridCharge:`Netzladung`,secGridChargeHint:`Aktives Laden im günstigen Fenster, begrenzt durch das Tagesbudget.`,secPlan:`Preisplan`,secPlanHint:`Dieselben Werte stehen auch auf der Preisplan-Seite.`,secHt:`Hochtarif`,secHtHint:`Im HT-Fenster hält Maestro eine Mindestreserve.`,secCorridor:`Tagesziel`,secCorridorHint:`Saisonale Rampe vom Morgen bis zum Ladeende.`,secForecast:`Prognose`,secForecastHint:`Ladung verzögern oder das Ziel anheben, wenn die Sonne reicht.`,secWindows:`Startfenster`,secWindowsHint:`Astro wartet auf die Sonne, Morning-Cap deckelt den frühen SoC.`,secShape:`Ladeform`,secShapeHint:`Schnell bis zum Boden, dann verteilen, schonen oder spät nachladen.`,secYield:`Wenig PV und Abregelung`,secYieldHint:`An schwachen Tagen den Akku zuerst füllen und Abregelung abfangen.`,secWallbox:`Wallbox`,secWallboxHint:`Überschussladen und Netzschutz, solange das Auto Leistung zieht.`,secEvcc:`EVCC`,secEvccHint:`Sperrt die Akku-Entladung, während das Auto sofort lädt.`,secHp:`Wärmepumpe`,secHpHint:`Überschuss und Preisgrenze.`,secMorning:`Morgen-Vorentladung`,secMorningHint:`Akku vor dem Ladestart absenken, damit PV-Überschuss hineinpasst.`,secAuto:`Ziel`,secAutoHint:`Die gefundene Strategie steht auf der Entscheidungsseite.`,secRun:`Betrieb`,secRunHint:`Dieselben Schalter liegen im Schnellmenü.`,secPace:`Tempo`,secPaceHint:`Wie oft geregelt wird und wie stark sich die Ladeleistung pro Takt ändern darf.`,secDiag:`Diagnose`,secDiagHint:`Debug-Protokoll und einmalige Aktionen.`,ladderTitle:`Regelungsleiter`,ladderHint:`Maestro prüft von oben nach unten und nimmt die erste passende Regel. Die aktive Regel ist markiert.`,ladderBandSafety:`Sicherheit`,ladderBandTariff:`Netz und Tarif`,ladderBandBlocks:`Ladesperren`,ladderBandPv:`PV-Laden`,ladderBandRest:`Danach`,ladderOff:`Regelung aus`,ladderForce:`Entladung erzwungen`,ladderEmergency:`Notladung`,ladderFeed:`Einspeisegrenze`,ladderReserve:`Notstromreserve`,ladderEvcc:`EVCC Sofortladen`,ladderPrice:`Preisplan`,ladderHt:`Hochtarif`,ladderHold:`Günstigen Slot halten`,ladderMorning:`Morgen-Vorentladung`,ladderCap:`Morning-Cap`,ladderAstro:`Warten auf Sonne`,ladderHard:`Akku-Deckel`,ladderFloor:`Schnelllade-Boden`,ladderLow:`Schwacher PV-Tag`,ladderGrid:`Netzladung im Slot`,ladderCorridor:`Korridor und PV-Verzögerung`,ladderSpread:`Ladeverteilung`,ladderCurtail:`Abregelschutz`,ladderIdle:`Leerlauf`,confirmReset:`Tagesstatistik auf 0 setzen?`,settingsPending:`Einstellungen werden geladen …`,settingsBack:`Alle Bereiche`,setClassic:`Classic-Dashboard`,setClassicHint:`Mit einem Klick anlegen`,classicLead:`Das Classic-Dashboard ist die Lovelace-Ansicht mit allen Tabs, auch Auto-Optimierung, Sizing-Berater und Hilfe. Maestro legt es hier direkt an.`,classicDepsTitle:`Benötigte Karten`,classicDepMushroom:`Mushroom Cards`,classicDepApex:`ApexCharts Card`,classicDepVia:`HACS → Frontend`,classicInstalled:`installiert`,classicMissing:`fehlt – über HACS → Frontend installieren`,classicDepsMissing:`Ohne diese Karten zeigt das Dashboard Fehlerkacheln. Erst installieren, dann den Browser neu laden.`,classicActionTitle:`Dashboard`,classicChecking:`Prüfe, ob das Dashboard schon angelegt ist …`,classicCreate:`Dashboard anlegen`,classicSetup:`Inhalt einrichten`,classicCreating:`Wird angelegt …`,classicReady:`Das Dashboard E3DC Maestro ist angelegt und steht in der Seitenleiste.`,classicEmpty:`Unter dem Pfad e3dc-maestro gibt es ein leeres Dashboard. Maestro richtet den Inhalt dort ein.`,classicForeign:`Unter dem Pfad e3dc-maestro liegt schon ein Dashboard mit anderem Inhalt. Maestro überschreibt es nicht. Zum Neuanlegen dieses Dashboard unter Einstellungen → Dashboards löschen.`,classicAdminOnly:`Anlegen können nur Administratoren.`,classicFailed:`Das hat nicht geklappt: {err}`,classicRetry:`Erneut prüfen`,classicManual:`Manuell anlegen`,classicHa:`Der Eintrag unter Community dashboards erscheint ab Home Assistant 2026.5. In älteren Versionen das Dashboard leer anlegen (Titel E3DC Maestro, Pfad e3dc-maestro) und den Inhalt von maestro_dashboard.yaml im YAML-Editor einfügen.`,classicStep1:`Integration E3DC Maestro einrichten. Läuft sie schon, Home Assistant einmal neu starten.`,classicStep2:`Den Browser hart neu laden, damit das Dashboard-Modul geladen ist.`,classicStep3:`Einstellungen → Dashboards → Dashboard hinzufügen.`,classicStep4:`Unter Community dashboards E3DC Maestro wählen.`,classicStep5:`Titel E3DC Maestro und das vorgeschlagene Icon bestätigen, dann anlegen.`,classicPath:`Der Pfad muss e3dc-maestro bleiben. Den vorgeschlagenen Titel nicht umbenennen, bevor der Slug feststeht. Sonst zeigen die Hilfe-Links ins Leere.`,classicAfter:`Das Dashboard baut sich bei jedem Öffnen aus der aktuellen Maestro-Vorlage auf. Updates kommen damit automatisch an, solange du es nicht im Editor übernimmst.`,classicTimeout:`Kommt „Timeout waiting for strategy element ll-strategy-dashboard-e3dc-maestro“: Home Assistant neu starten, den Browser hart neu laden und unter Einstellungen → Dashboards → Ressourcen prüfen, ob ganz oben /local/e3dc_maestro/e3dc-maestro-strategy.js als JavaScript-Modul steht (direkt nach dem ersten Einrichten noch /e3dc_maestro/frontend/e3dc-maestro-strategy.js).`,classicOpen:`Dashboard öffnen`,setLook:`Darstellung`,setLookHint:`Wähle den Look, der sich für dich richtig anfühlt.`,themeDark:`Dunkel`,themeDarkHint:`Ruhig am Abend. Die Energieflüsse leuchten auf dunklem Grund.`,themeClassic:`Classic`,themeClassicHint:`Hell und klar, angenehm zum Lesen am Tag.`,themeE3dc:`myE3DC`,themeE3dcHint:`Der vertraute myE3DC-Look.`,plantEmpty:`Keine Daten der E3DC-Integration. Sobald E3DC RSCP eingerichtet ist, stehen hier Betriebszustand, Speicher und Phasen.`,plantOperation:`Betrieb`,plantStorage:`Speicher`,plantPhases:`Phasen`,plantWallbox:`Wallbox`,plantRoomGrid:`Netz`,plantRoomGridHint:`Haus- und Netzphasen, zusätzlicher Verbrauch.`,plantRoomBattery:`Akku`,plantRoomBatteryHint:`Packs, Zellzustand und Ladegrenzen.`,plantRoomPv:`PV`,plantRoomPvHint:`Wechselrichter, Leistung und Einspeisegrenze.`,plantRoomWallbox:`Wallbox`,plantRoomWallboxHint:`Ladestatus und schaltbare Wallbox-Einstellungen.`,plantRoomControls:`Einstellungen`,plantRoomControlsHint:`Werte, die der E3DC über RSCP annimmt.`,plantCells:`Zellzustand`,plantCell:`Modul`,plantSend:`Diese Einstellung an den E3DC senden?`,plantModel:`Modell`,plantSerial:`Seriennummer`,plantFirmware:`Firmware`,plantFault:`Aktuelle Meldung`,plantPack:`Speicher`,plantMode:`Modus`,plantAutarky:`Autarkie`,plantSelf:`Eigenverbrauch`,plantPower:`Sollleistung`,plantLimits:`Leistungsgrenzen`,plantLimitCharge:`Max. Ladung`,plantLimitDischarge:`Max. Entladung`,plantLimitMin:`Mindestentladung`,plantManual:`Manuelle Netzladung`,plantManualEnergy:`Dabei geladen`,plantDerated:`PV abgeregelt`,plantEmergency:`Notstrom`,plantReserveHit:`Notstromreserve erreicht`,plantReserveOn:`Notstromreserve`,plantWeather:`Wetterregelung`,plantWeatherWait:`Warten auf Wetterdurchbruch`,plantOn:`an`,plantOff:`aus`,plantMode0:`Normal`,plantMode1:`Leerlauf`,plantMode2:`Entladen`,plantMode3:`Laden`,plantMode4:`Netzladung`,plantSoh:`State of Health`,plantCycles:`Zyklen`,plantEnergy:`Nutzbare Restenergie`,plantShare:`Anteil an der Anlagenkapazität`,plantCurrent:`Strom`,plantVoltage:`Spannung`,plantTemp:`Zelltemperatur`,plantHouse:`Haus`,plantGrid:`Netz`,plantInverter:`Wechselrichter`,plantPeak:`Installierte PV-Leistung`,plantCapacity:`Batteriekapazität`,plantAc:`Max. AC-Leistung`,plantSysCharge:`Max. Systemladung`,plantSysDischarge:`Max. Systementladung`,plantDeratePct:`Einspeisegrenze`,plantDeratePower:`Einspeisegrenze Leistung`,plantExtraPv:`Zusätzliche Erzeugung`,plantExtraUse:`Zusätzlicher Verbrauch`,plantPlug:`Stecker`,plantCharging:`Laden`,plantPhaseCount:`Phasen`,plantSun:`Solaranteil`,plantNet:`Netzanteil`,plantCarSoc:`Fahrzeug-SoC`,plantMaxCurrent:`Max. Ladestrom`,secSources:`Quellen`,secSourcesHint:`Sensoren für SoC, Leistung und Tageszähler. Ein Wechsel lädt die Integration neu.`,secAdaptive:`Adaptive Reserve`,secAdaptiveHint:`Wie weit Maestro zurückschaut und wie hoch die Reserve steigen darf.`,secPriceSensor:`Preis-Sensor`,secPriceSensorHint:`Aktueller Bezugspreis für den dynamischen Tarif.`,secSlots:`Tarif-Slots`,secSlotsHint:`Wiederkehrende Fenster. Montag ist der erste Tag.`,secForecastSensors:`Prognose-Sensoren`,secForecastSensorsHint:`Rest heute, Tagessumme, morgen und übermorgen.`,secWallboxWire:`Wallbox-Anbindung`,secWallboxWireHint:`Leistungssensor, Phasen und die Dienste zum Schalten.`,secEvccWire:`EVCC`,secEvccWireHint:`Welche Entität das Laden meldet und welcher Wert Sofortladen heißt.`,secHpWire:`Wärmepumpe`,secHpWireHint:`Schalter, Dienste und das Zeitfenster, in dem sie laufen darf.`,secSizingInputs:`Zähler`,secSizingInputsHint:`Energiezähler und der Zeitraum der Rechnung. Ein Sensorwechsel lädt die Integration neu.`,setSizingTile:`Mehr Akku oder PV?`,setSizingTileHint:`Was sich an Zubau rechnet`,setSetup:`Einrichtung`,setSetupHint:`Was die Regelung zum Arbeiten braucht`,setupTitle:`Erste Schritte`,setupLead:`Diese Punkte braucht Maestro, damit die Regelung dein Haus steuert.`,setupProgress:`{done} von {total} Pflichtschritten erledigt`,setupDone:`Einrichtung vollständig`,setupDoneHint:`Alle Pflichtschritte sind erledigt. Die Liste bleibt unter Einstellungen.`,setupAck:`Verstanden`,setupOpen:`Öffnen`,setupStatusDone:`erledigt`,setupStatusTodo:`fehlt`,setupStatusOptional:`optional`,setupStatusWait:`wird gelesen`,setupOptionsError:`Die Einstellungen konnten nicht gelesen werden: {err}`,setupPlant:`Anlage verbunden`,setupPlantHint:`SoC, PV, Netz, Haus und Akku brauchen je einen Sensor, der Werte liefert.`,setupPlantOk:`Alle Pflichsensoren liefern Werte.`,setupPlantMissing:`Noch ohne Wert: {names}.`,setupTariff:`Tarif`,setupTariffHint:`Fester Preis, Preis-Sensor oder Zeitfenster. Ohne Preis kann Maestro nicht nach Preis laden.`,setupTariffOk:`Ein Preis oder Zeitfenster ist hinterlegt.`,setupTariffMissing:`Beim dynamischen Tarif fehlt der Preis-Sensor, beim festen der Bezugspreis.`,setupForecast:`PV-Prognose`,setupForecastHint:`Empfohlen, damit Maestro das Laden an den erwarteten Ertrag anpasst.`,setupForecastOk:`Ein Prognose-Sensor ist gewählt.`,setupForecastOpen:`Noch keiner gewählt. Die Regelung läuft auch ohne, nur ohne Vorausschau.`,setupSafety:`Notstromreserve`,setupSafetyHint:`Kein Muss. Sinnvoll, damit der Akku eine Reserve behält.`,setupSafetyOk:`Eine Reserve ist eingeschaltet.`,setupSafetyOpen:`Noch keine Reserve aktiv. Fest, saisonal oder adaptiv stellst du unter Sicherheit ein.`,setupLoads:`Verbraucher`,setupLoadsHint:`Optional, wenn Maestro Wallbox, Wärmepumpe oder EVCC mitregeln soll.`,setupLoadsOk:`Mindestens ein Verbraucher ist angebunden.`,setupLoadsOpen:`Keiner angebunden. Nur nötig, wenn Maestro einen Verbraucher steuern soll.`,setupRegulation:`Regelung einschalten`,setupRegulationHint:`Solange sie aus ist, beobachtet Maestro nur und schickt keine Limits.`,setupRegulationOk:`Maestro regelt.`,setupRegulationOff:`Die Regelung ist aus.`,setupRun:`Erste Entscheidung`,setupRunHint:`Maestro hat mindestens einmal gerechnet und sagt, warum.`,setupRunOk:`Es gibt eine Entscheidung.`,setupRunOff:`Schalte die Regelung ein. Danach erscheint hier die Entscheidung.`,setupRunWait:`Die Regelung ist an. Die erste Entscheidung kommt mit dem nächsten Lauf.`,setSizing:`Lohnt sich der Zubau?`,setSizingHint:`Wie viel Zubau sich mit deinem Verbrauch rechnet`,sizingLead:`Hier prüfst du, ob ein größerer Akku oder mehr PV sich für dein Haus lohnt. Du gibst an, wie viel du dazubauen willst. Maestro rechnet aus deinem bisherigen Verbrauch, was das an Autarkie, Kosten und Amortisation ändert.`,sizingAdd:`Dein Zubau`,sizingAddHint:`Zusätzlicher Akku in kWh und zusätzliche PV in kWp, auf dem, was schon steht. 0 heißt: nichts dazukaufen.`,sizingRun:`Aus deiner Historie rechnen`,sizingScenario:`Für diesen Zubau`,sizingNeedRun:`Stell den Zubau ein und starte die Rechnung. Danach steht hier, was er bringt.`,sizingChartAvoided:`Vermiedener Netzbezug`,sizingChartBaseline:`Bisheriger Netzbezug`,sizingChartCaption:`Fläche: vermiedener Netzbezug. Linie: bisheriger Netzbezug.`,sizingStory:`{bat} kWh Akku und {pv} kWp PV: etwa {aut} % Autarkie, {save} € im Jahr, amortisiert in {years} Jahren.`,sizingStoryOpen:`{bat} kWh Akku und {pv} kWp PV: etwa {aut} % Autarkie und {save} € im Jahr. Eine Amortisation lässt sich daraus nicht ableiten.`,sizingBasis:`Grundlagen`,sizingBasisHint:`Preise, mit denen Investition und Amortisation gerechnet werden.`,sizingRecsHint:`Wirtschaftlich sucht die kürzeste Amortisation, technisch die höchste Autarkie, ausgewogen den Kompromiss.`,sizingRecs:`Drei Vorschläge`,recEconomicHint:`Kürzeste Amortisation`,recTechnicalHint:`Höchste Autarkie`,recBalancedHint:`Kompromiss aus beidem`,sizingBattery:`Akku`,sizingPv:`PV-Zubau`,sizingAutarky:`Autarkie`,sizingAvoided:`Vermiedener Netzbezug`,sizingSavings:`Ersparnis im Jahr`,sizingInvestment:`Investition`,sizingPayback:`Amortisation`,sizingInverter:`Wechselrichter-Upgrade`,sizingBaseline:`Netzbezug heute hochgerechnet`,sizingNotRun:`Noch nicht gerechnet`,sizingRunning:`Rechnet …`,sizingReady:`Fertig`,recEconomic:`Wirtschaftlich`,recTechnical:`Technisch`,recBalanced:`Ausgewogen`,matrixDays:`Analysetage`,matrixRecords:`Stundenwerte`,matrixAnomaly:`Anomalien`,optReload:`Gespeichert. Die Integration lädt neu, damit die neuen Sensoren gelten.`,optSaved:`Gespeichert. Der Wert gilt sofort.`,optAdmin:`Nur Admins können diese Werte ändern.`,optClear:`Leeren`,optSearch:`Entität suchen`,optService:`Dienst, zum Beispiel switch.turn_on`,optTarget:`Ziel-Entität`,optWeekdays:`Wochentage`,optFrom:`Von`,optTo:`Bis`,optClass:`Klasse`,optReserve:`Mindest-Reserve %`,optAddSlot:`Slot hinzufügen`,optRemove:`Entfernen`,optSaveSlots:`Slots speichern`,optYes:`Ja`,optNo:`Nein`,classHigh:`Hoch`,classLow:`Niedrig`,classNormal:`Normal`,wd0:`Mo`,wd1:`Di`,wd2:`Mi`,wd3:`Do`,wd4:`Fr`,wd5:`Sa`,wd6:`So`,targetPower:`Ziel-Ladeleistung`,autoObjective:`Ziel`,autoLastRun:`Letzter Lauf`,autoFallback:`Daten-Fallback`,autoReason:`Grund`,autoOverrides:`Anpassungen`,autoNone:`Keine Anpassung. Die bisherige Einstellung war bereits die beste.`,autoGrid:`Raster`,autoDeltaDraw:`Netzbezug gegenüber Basis`,autoDeltaFeed:`Einspeisung gegenüber Basis`,autoDeltaCurtail:`Abregelung gegenüber Basis`,autoDeltaSelf:`Autarkie gegenüber Basis`},kr={navLive:`Live`,navForecast:`Forecast`,navPlan:`Price plan`,navDecision:`Decision`,navSettings:`Settings`,navPlant:`System`,settingHelp:`Help`,navControls:`Controls`,menu:`Menu`,subLive:`Energy flow and battery in real time`,subForecast:`What Maestro expects for the next 24 hours`,subPlan:`Grid charging by dynamic tariff`,subDecision:`Why Maestro regulates the way it does`,subSettings:`From the plant through safety and tariff to PV charging`,subPlant:`Operating state, storage and phases from the E3DC`,regulationOn:`Regulation active`,regulationOff:`Regulation off`,flowTitle:`Energy flow`,flowSub:`Now · live`,nodePv:`PV`,nodeHouse:`House`,nodeImport:`Grid import`,nodeFeed:`Feed-in`,nodeBatDischarge:`Battery discharging`,nodeBatCharge:`Battery charging`,battery:`Battery`,stateOfCharge:`State of charge`,targetSoc:`Target SoC`,autonomy:`Autonomy`,discharging:`Discharging`,charging:`Charging`,chipReachable:`E3DC reachable`,chipChargeLock:`Charge lock`,chipDischargeLock:`Discharge lock`,chipHt:`HT protection`,chipCurtail:`Curtailment guard`,chipEmergency:`Emergency charge`,chipFeedIn:`Feed-in curtailment`,chipGridCharge:`Grid charge`,chipBatteryPriority:`Battery priority`,chipLowYield:`Low-yield day`,chipPredictive:`Predictive charging`,chipShadow:`Price plan · shadow`,groupToday:`Today`,groupWeek:`Week`,groupMonth:`Month`,groupNet:`net`,periodToday:`Today`,periodWeek:`Week`,periodMonth:`Month`,forceTitle:`Forced discharge`,fixedReserve:`Emergency reserve`,ctrlReserveSoc:`{v}%`,exportCsv:`CSV`,actionsTitle:`Actions`,btnClear:`Release limits`,btnClearSub:`Clears charge and discharge limits immediately and sets the inverter to normal.`,btnCharge:`Manual charge (3 kWh)`,confirmCharge:`Charge 3 kWh from the grid?`,selWallbox:`Wallbox type`,selMorning:`Pre-discharge`,selAuto:`Auto objective`,selTariff:`Tariff`,debugTitle:`Debug log`,debugEmpty:`No debug lines yet. The switch starts logging.`,debugSwitch:`Debug logging`,balanceTitle:`Daily balance`,balanceWeek:`Weekly balance`,balanceMonth:`Monthly balance`,whenToday:`today`,whenWeek:`this week`,whenMonth:`this month`,kpiCostGross:`Electricity cost`,kpiCostGrossSub:`grid import, gross`,kpiRevenue:`Feed-in revenue`,kpiRevenueSub:`remuneration {when}`,kpiWear:`Battery wear`,kpiWearSub:`share of cycle cost`,kpiBalance:`Energy balance`,kpiBalanceSub:`revenue + savings − cost − wear`,kpiGridBat:`Grid → battery`,kpiGridBatSub:`charged from the grid`,kpiGridBatWarn:`Grid charge without justification`,kpiWallbox:`Wallbox {when}`,kpiWallboxSub:`energy charged`,kpiFeedLimit:`Feed-in limit`,kpiFeedLimitSub:`{n} interventions · {dc} kWh DC curtailment`,kpiCost:`Electricity cost {when}`,kpiCostSub:`net of feed-in`,kpiSaving:`PV savings {when}`,kpiSavingSub:`vs. grid-only supply`,kpiSelf:`Self-consumption {when}`,kpiSelfSub:`Import {imp} kWh · feed-in {feed} kWh`,kpiBattery:`Battery {when}`,kpiBatterySub:`charged · {out} kWh discharged`,chartTitle:`SoC trajectory & power · next 24 h`,legendSoc:`SoC`,legendPv:`PV`,legendHouse:`House`,legendImport:`Import`,legendFeed:`Feed-in`,legendActual:`Actual`,actualOverlay:`Actuals`,now:`Now`,targetLabel:`Target SoC {v}%`,hoursShort:`{h} h`,statMinMax:`SoC min / max`,statImport:`Grid import`,statFeed:`Feed-in`,statAutarky:`Self-sufficiency`,statPvTomorrow:`PV tomorrow`,statP10:`PV remaining (P10)`,statDeficit:`Deficit tomorrow`,statYield:`PV day`,statYieldSub:`{today} / {ref} kWh reference`,qualityLabel:`Data quality`,qualityOk:`complete`,qualityPv:`PV profile missing`,qualityConsumption:`Consumption profile missing`,qualityBoth:`Profiles missing`,qualityUnknown:`unknown`,reserveTitle:`Target SoC`,reserveSeasonal:`Emergency reserve`,reserveAdaptive:`Reserve, adaptive`,reserveHt:`HT reserve`,reserveForward:`Look-ahead`,windowsTitle:`Charge window`,windowAstro:`Astro start`,windowSeasonalEnd:`Season end`,windowPvDelay:`PV delay`,windowTomorrow:`Tomorrow`,autoTitle:`Auto strategy`,autoSaving:`Estimated saving`,alertUnreachable:`E3DC is not reachable`,alertChargeLock:`Charge lock active`,alertDischargeLock:`Discharge lock active`,alertUnjustified:`Grid charge without justification`,noForecast:`No forecast yet. Maestro needs at least 7 days of history.`,priceTitle:`Electricity price & planned SoC`,legendCharge:`Grid charge`,legendHold:`Hold battery`,legendRelease:`Battery free`,legendPlanSoc:`Planned SoC`,planShadow:`Shadow mode · not controlling`,planActive:`Active · controls the battery`,planTitle:`Plan`,planGridCharge:`Planned grid charging`,planSaving:`Expected saving`,planCheapest:`Cheapest slot`,planMostExpensive:`Most expensive slot`,planKnownUntil:`Prices known until`,noPlan:`There is no price plan. It needs a dynamic tariff.`,planTune:`Thresholds`,planTuneHint:`These values decide when the battery charges from the grid.`,planTuneTariff:`Tariff`,planTuneTariffHint:`With a dynamic tariff, a price up to the cheap threshold counts as cheap.`,planTuneGrid:`Grid charging in the cheap window`,planTuneGridHint:`In a cheap slot Maestro charges up to the target, limited by the daily budget.`,planTunePlan:`Price plan`,planTunePlanHint:`Grid charging only when the price spread covers efficiency and wear, and only up to the SoC cap.`,slotPrice:`Price`,slotSoc:`SoC`,slotConsumption:`Consumption`,slotCharge:`Grid charge {kwh} kWh`,slotHold:`Hold battery`,slotRelease:`Battery free`,decisionPhase:`Current control phase`,tagTargetSoc:`Target SoC {v} %`,tagTargetPower:`Target charge power {v}`,tagBatteryPriority:`Battery priority`,tagSince:`since {t}`,limitsTitle:`Limits · target vs. sent`,limitsSub:`What Maestro wants and what reaches the E3DC`,limitCharge:`Charge limit`,limitDischarge:`Discharge limit`,limitTarget:`Target {a} · sent {b}`,limitNone:`no limit`,entitiesMissing:`Not available: {list}. These Maestro entities are missing or disabled – please check Settings › Entities.`,entityDisabled:`disabled`,notSetUp:`E3DC Maestro is not set up or has not started yet.`,limitSoc:`now {a} % → {b} %`,timelineTitle:`Decision history`,timelineEmpty:`No decisions recorded yet.`,noDecision:`No decision available yet.`,controlsTitle:`Quick controls`,controlsSub:`Takes effect immediately`,close:`Close`,historySub:`Last 24 hours`,historyEmpty:`No history for the last 24 hours.`,historyFailed:`The history could not be loaded.`,ctrlActive:`Regulation active`,ctrlActiveSub:`Maestro controls charge and discharge limits`,ctrlPredictive:`Predictive charging`,ctrlPredictiveSub:`Charge target from forecast and consumption`,ctrlPvDelay:`PV forecast delay`,ctrlPvDelaySub:`Postpone charging when PV is enough`,ctrlPlanControls:`Price plan controls battery`,ctrlPlanControlsSub:`Off = shadow mode only`,ctrlPlanShadow:`Price plan shadow mode`,ctrlPlanShadowSub:`Compute the plan but send nothing`,ctrlForce:`Forced discharge`,ctrlForcePower:`Power {v}`,allSettings:`Open all settings →`,displayTitle:`Display`,consumersSub:`Consumers in the live energy flow. Applies on every device that opens this cockpit.`,addConsumer:`Add consumer`,consumerSearch:`Search power sensors`,consumerName:`Name in the energy flow`,consumerIcon:`Icon`,iconWallbox:`Wallbox`,iconHeater:`Heating rod`,iconClimate:`Air conditioning`,iconHeatpump:`Heat pump`,iconMeter:`Power meter`,modeIncluded:`In house load`,modeSeparate:`Measured separately`,useWallbox:`Add wallbox`,removeConsumer:`Remove`,editConsumers:`Edit consumers`,consumersEmpty:`No consumers yet. Add a wallbox, heat pump or other loads here.`,consumersOverflow:`Included consumers exceed the house load. Check whether they are really part of the house meter.`,noPowerSensors:`No matching power sensors found.`,consumerMissing:`Sensor unavailable`,unavailable:`unavailable`,callFailed:`Action failed: {err}`,chartError:`Chart failed to load: {err}`,loading:`Loading …`,demoHint:`No data`,setHardware:`System`,setHardwareHint:`Plant data Maestro uses to calculate power and limits.`,setCorridor:`Target SoC and charge corridor`,setCorridorHint:`Where the battery should be today: threshold, corridor, charge end and hard caps.`,setWindows:`Look-ahead and time windows`,setWindowsHint:`When to charge: forecast, sun, morning cap and spreading across the day.`,setYield:`Low PV and curtailment`,setYieldHint:`Fill the battery before feed-in, catch curtailment and top up late.`,setTariff:`Grid and tariff`,setTariffHint:`The same thresholds are on the price plan screen. Tariff slots stay in the integration options.`,setReserve:`High tariff and reserve`,setReserveHint:`HT window and emergency reserve. Adaptive-reserve lookback stays in the integration options.`,setFlex:`Wallbox, heat pump, pre-discharge`,setFlexHint:`Extra loads and the morning discharge before charging starts.`,setControl:`Control behaviour`,setControlHint:`Master switch, forced discharge and how calmly the control follows.`,setDiag:`Diagnostics and actions`,setDiagHint:`Debug log and one-off actions.`,setPlant:`Plant`,setPlantHint:`Inverter, PV size and the limits Maestro calculates with.`,setSafety:`Protection`,setSafetyHint:`Emergency charge, backup reserve, battery cap and watchdog.`,setPv:`PV charging`,setPvHint:`Daily target, time windows, charge shape and what happens on a weak or curtailed day.`,setLoads:`Loads`,setLoadsHint:`Wallbox, EVCC, heat pump and the morning discharge before charging starts.`,setAuto:`Automation`,setAutoHint:`Once a day Maestro looks for a better morning-cap and gentle-charge setting.`,setSystem:`System`,setSystemHint:`Master switch, forced discharge, control pace and diagnostics.`,secPlantPower:`Power and limits`,secPlantPowerHint:`Nameplate values of the plant.`,secEmergency:`Emergency charge`,secEmergencyHint:`Below this threshold Maestro charges immediately, before every other rule.`,secReserve:`Backup reserve`,secReserveHint:`A fixed reserve replaces the seasonal and the adaptive one.`,secHard:`Battery cap`,secHardHint:`Charging stops above this SoC. Curtailment protection may override the cap.`,secWatchdog:`Watchdog`,secWatchdogHint:`After this long without contact Maestro releases the limits.`,secPrices:`Prices`,secPricesHint:`Tariff mode and the prices used for cost, revenue and wear.`,secGridCharge:`Grid charge`,secGridChargeHint:`Active charging in a cheap window, limited by the daily budget.`,secPlan:`Price plan`,secPlanHint:`The same values are also on the price-plan screen.`,secHt:`High tariff`,secHtHint:`During the high-tariff window Maestro keeps a minimum reserve.`,secCorridor:`Daily target`,secCorridorHint:`Seasonal ramp from morning until charge end.`,secForecast:`Forecast`,secForecastHint:`Delay charging or raise the target when the sun is enough.`,secWindows:`Start window`,secWindowsHint:`Astro waits for the sun, morning cap limits the early SoC.`,secShape:`Charge shape`,secShapeHint:`Fast up to the floor, then spread, ease off or top up late.`,secYield:`Low PV and curtailment`,secYieldHint:`On weak days fill the battery first and catch curtailment.`,secWallbox:`Wallbox`,secWallboxHint:`Surplus charging and grid protection while the car draws power.`,secEvcc:`EVCC`,secEvccHint:`Blocks battery discharge while the car charges immediately.`,secHp:`Heat pump`,secHpHint:`Surplus and price limit.`,secMorning:`Morning discharge`,secMorningHint:`Lower the battery before charging starts so PV surplus fits.`,secAuto:`Objective`,secAutoHint:`The chosen strategy is shown on the decision screen.`,secRun:`Operation`,secRunHint:`The same switches are in the quick menu.`,secPace:`Pace`,secPaceHint:`How often the control runs and how far charge power may step each cycle.`,secDiag:`Diagnostics`,secDiagHint:`Debug log and one-off actions.`,ladderTitle:`Control ladder`,ladderHint:`Maestro checks from top to bottom and takes the first matching rule. The active rule is marked.`,ladderBandSafety:`Safety`,ladderBandTariff:`Grid and tariff`,ladderBandBlocks:`Charge blocks`,ladderBandPv:`PV charging`,ladderBandRest:`After that`,ladderOff:`Control off`,ladderForce:`Forced discharge`,ladderEmergency:`Emergency charge`,ladderFeed:`Feed-in limit`,ladderReserve:`Backup reserve`,ladderEvcc:`EVCC immediate charge`,ladderPrice:`Price plan`,ladderHt:`High tariff`,ladderHold:`Hold the cheap slot`,ladderMorning:`Morning discharge`,ladderCap:`Morning cap`,ladderAstro:`Wait for the sun`,ladderHard:`Battery cap`,ladderFloor:`Fast-charge floor`,ladderLow:`Weak PV day`,ladderGrid:`Grid charge in the slot`,ladderCorridor:`Corridor and PV delay`,ladderSpread:`Spreading`,ladderCurtail:`Curtailment guard`,ladderIdle:`Idle`,confirmReset:`Reset today's statistics to 0?`,settingsPending:`Loading settings …`,settingsBack:`All areas`,setClassic:`Classic dashboard`,setClassicHint:`Add it with one click`,classicLead:`The classic dashboard is the Lovelace view with every tab, including auto-optimisation, sizing advisor and help. Maestro creates it right here.`,classicDepsTitle:`Required cards`,classicDepMushroom:`Mushroom Cards`,classicDepApex:`ApexCharts Card`,classicDepVia:`HACS → Frontend`,classicInstalled:`installed`,classicMissing:`missing – install via HACS → Frontend`,classicDepsMissing:`Without these cards the dashboard shows error tiles. Install them first, then reload the browser.`,classicActionTitle:`Dashboard`,classicChecking:`Checking whether the dashboard already exists …`,classicCreate:`Create dashboard`,classicSetup:`Set up content`,classicCreating:`Creating …`,classicReady:`The E3DC Maestro dashboard exists and is in the sidebar.`,classicEmpty:`There is an empty dashboard at the path e3dc-maestro. Maestro sets up its content there.`,classicForeign:`A dashboard with other content already uses the path e3dc-maestro. Maestro does not overwrite it. To start over, delete it under Settings → Dashboards.`,classicAdminOnly:`Only administrators can create it.`,classicFailed:`That did not work: {err}`,classicRetry:`Check again`,classicManual:`Add it manually`,classicHa:`The Community dashboards entry appears from Home Assistant 2026.5. On older versions, create an empty dashboard (title E3DC Maestro, path e3dc-maestro) and paste maestro_dashboard.yaml into the YAML editor.`,classicStep1:`Set up the E3DC Maestro integration. If it is already running, restart Home Assistant once.`,classicStep2:`Hard-reload the browser so the dashboard module is loaded.`,classicStep3:`Settings → Dashboards → Add dashboard.`,classicStep4:`Under Community dashboards, choose E3DC Maestro.`,classicStep5:`Confirm the title E3DC Maestro and the suggested icon, then create it.`,classicPath:`The path must stay e3dc-maestro. Do not rename the suggested title before the slug is set, or the help links inside the dashboard point nowhere.`,classicAfter:`The dashboard is built from the current Maestro template every time it opens, so updates arrive automatically as long as you do not take control of it in the editor.`,classicTimeout:`If you see “Timeout waiting for strategy element ll-strategy-dashboard-e3dc-maestro”: restart Home Assistant, hard-reload the browser, and under Settings → Dashboards → Resources check that /local/e3dc_maestro/e3dc-maestro-strategy.js is the first JavaScript module (right after first setup it is still /e3dc_maestro/frontend/e3dc-maestro-strategy.js).`,classicOpen:`Open dashboard`,setLook:`Appearance`,setLookHint:`Choose the look that feels right.`,themeDark:`Dark`,themeDarkHint:`Calm in the evening. Energy flows glow on a dark ground.`,themeClassic:`Classic`,themeClassicHint:`Light and clear, easy to read during the day.`,themeE3dc:`myE3DC`,themeE3dcHint:`The familiar myE3DC look.`,plantEmpty:`No data from the E3DC integration. Once E3DC RSCP is set up, operating state, storage and phases show up here.`,plantOperation:`Operation`,plantStorage:`Storage`,plantPhases:`Phases`,plantWallbox:`Wallbox`,plantRoomGrid:`Grid`,plantRoomGridHint:`House and grid phases, additional consumption.`,plantRoomBattery:`Battery`,plantRoomBatteryHint:`Packs, cell health and charge limits.`,plantRoomPv:`PV`,plantRoomPvHint:`Inverter, power and the feed-in limit.`,plantRoomWallbox:`Wallbox`,plantRoomWallboxHint:`Charge status and wallbox settings that can be changed.`,plantRoomControls:`Settings`,plantRoomControlsHint:`Values the E3DC accepts over RSCP.`,plantCells:`Cell health`,plantCell:`Module`,plantSend:`Send this setting to the E3DC?`,plantModel:`Model`,plantSerial:`Serial number`,plantFirmware:`Firmware`,plantFault:`Current message`,plantPack:`Storage`,plantMode:`Mode`,plantAutarky:`Autarky`,plantSelf:`Self-consumption`,plantPower:`Power setpoint`,plantLimits:`Power limits`,plantLimitCharge:`Max. charge`,plantLimitDischarge:`Max. discharge`,plantLimitMin:`Minimum discharge`,plantManual:`Manual grid charge`,plantManualEnergy:`Charged that way`,plantDerated:`PV derated`,plantEmergency:`Emergency power`,plantReserveHit:`Emergency reserve reached`,plantReserveOn:`Emergency reserve`,plantWeather:`Weather regulation`,plantWeatherWait:`Waiting for weather breakthrough`,plantOn:`on`,plantOff:`off`,plantMode0:`Normal`,plantMode1:`Idle`,plantMode2:`Discharging`,plantMode3:`Charging`,plantMode4:`Grid charge`,plantSoh:`State of health`,plantCycles:`Cycles`,plantEnergy:`Usable energy left`,plantShare:`Share of installed capacity`,plantCurrent:`Current`,plantVoltage:`Voltage`,plantTemp:`Cell temperature`,plantHouse:`House`,plantGrid:`Grid`,plantInverter:`Inverter`,plantPeak:`Installed PV power`,plantCapacity:`Battery capacity`,plantAc:`Max. AC power`,plantSysCharge:`Max. system charge`,plantSysDischarge:`Max. system discharge`,plantDeratePct:`Feed-in limit`,plantDeratePower:`Feed-in limit power`,plantExtraPv:`Additional production`,plantExtraUse:`Additional consumption`,plantPlug:`Plug`,plantCharging:`Charging`,plantPhaseCount:`Phases`,plantSun:`Solar share`,plantNet:`Grid share`,plantCarSoc:`Vehicle SoC`,plantMaxCurrent:`Max. charge current`,secSources:`Sources`,secSourcesHint:`Sensors for state of charge, power and daily counters. Changing one reloads the integration.`,secAdaptive:`Adaptive reserve`,secAdaptiveHint:`How far back Maestro looks and how high the reserve may rise.`,secPriceSensor:`Price sensor`,secPriceSensorHint:`Current import price for the dynamic tariff.`,secSlots:`Tariff slots`,secSlotsHint:`Repeating windows. Monday is the first day.`,secForecastSensors:`Forecast sensors`,secForecastSensorsHint:`Remaining today, today's total, tomorrow and the day after.`,secWallboxWire:`Wallbox wiring`,secWallboxWireHint:`Power sensor, phases and the services that switch it.`,secEvccWire:`EVCC`,secEvccWireHint:`Which entity reports charging and which value means charge now.`,secHpWire:`Heat pump`,secHpWireHint:`Switch, services and the window in which it may run.`,secSizingInputs:`Meters`,secSizingInputsHint:`Energy meters and the period used for the calculation. Changing a sensor reloads the integration.`,setSizingTile:`More battery or PV?`,setSizingTileHint:`Which expansion pays off`,setSetup:`Setup`,setSetupHint:`What the control needs in order to run`,setupTitle:`First steps`,setupLead:`Maestro needs these points before it can control your home.`,setupProgress:`{done} of {total} required steps done`,setupDone:`Setup complete`,setupDoneHint:`Every required step is done. The list stays under Settings.`,setupAck:`Got it`,setupOpen:`Open`,setupStatusDone:`done`,setupStatusTodo:`missing`,setupStatusOptional:`optional`,setupStatusWait:`reading`,setupOptionsError:`The settings could not be read: {err}`,setupPlant:`Plant connected`,setupPlantHint:`State of charge, PV, grid, house and battery each need a sensor that reports values.`,setupPlantOk:`Every required sensor is reporting.`,setupPlantMissing:`Still without a value: {names}.`,setupTariff:`Tariff`,setupTariffHint:`A fixed price, a price sensor or time windows. Without a price Maestro cannot charge by price.`,setupTariffOk:`A price or a time window is set.`,setupTariffMissing:`The dynamic tariff has no price sensor, or the fixed tariff has no import price.`,setupForecast:`PV forecast`,setupForecastHint:`Recommended, so Maestro can match charging to the expected yield.`,setupForecastOk:`A forecast sensor is selected.`,setupForecastOpen:`None selected yet. Control still runs, only without looking ahead.`,setupSafety:`Emergency reserve`,setupSafetyHint:`Not required. Useful so the battery keeps a reserve.`,setupSafetyOk:`A reserve is switched on.`,setupSafetyOpen:`No reserve is active yet. Fixed, seasonal or adaptive lives under Safety.`,setupLoads:`Loads`,setupLoadsHint:`Optional, when Maestro should also control a wallbox, heat pump or EVCC.`,setupLoadsOk:`At least one load is connected.`,setupLoadsOpen:`None connected. Only needed when Maestro should control a load.`,setupRegulation:`Switch control on`,setupRegulationHint:`While it is off, Maestro only watches and sends no limits.`,setupRegulationOk:`Maestro is controlling.`,setupRegulationOff:`Control is off.`,setupRun:`First decision`,setupRunHint:`Maestro has calculated at least once and says why.`,setupRunOk:`There is a decision.`,setupRunOff:`Switch control on. The decision shows up here afterwards.`,setupRunWait:`Control is on. The first decision arrives with the next cycle.`,setSizing:`Does the expansion pay off?`,setSizingHint:`How much extra capacity fits your consumption`,sizingLead:`Check whether a larger battery or more PV is worth it for your home. You set how much you want to add. Maestro uses your past consumption to estimate what that changes in autarky, cost and payback.`,sizingAdd:`Your expansion`,sizingAddHint:`Extra battery in kWh and extra PV in kWp, on top of what is already installed. 0 means buy nothing.`,sizingRun:`Calculate from your history`,sizingScenario:`For this expansion`,sizingNeedRun:`Set the expansion and start the calculation. The result then shows what it is worth.`,sizingChartAvoided:`Avoided grid import`,sizingChartBaseline:`Current grid import`,sizingChartCaption:`Area: avoided grid import. Line: current grid import.`,sizingStory:`{bat} kWh of battery and {pv} kWp of PV: about {aut}% autarky, {save} € a year, paid back in {years} years.`,sizingStoryOpen:`{bat} kWh of battery and {pv} kWp of PV: about {aut}% autarky and {save} € a year. Payback cannot be derived from this.`,sizingBasis:`Assumptions`,sizingBasisHint:`Prices used for investment and payback.`,sizingRecsHint:`Economic looks for the shortest payback, technical for the highest autarky, balanced for a compromise.`,sizingRecs:`Three suggestions`,recEconomicHint:`Shortest payback`,recTechnicalHint:`Highest autarky`,recBalancedHint:`A compromise of both`,sizingBattery:`Battery`,sizingPv:`PV added`,sizingAutarky:`Autarky`,sizingAvoided:`Avoided grid import`,sizingSavings:`Savings per year`,sizingInvestment:`Investment`,sizingPayback:`Payback`,sizingInverter:`Inverter upgrade`,sizingBaseline:`Baseline grid import`,sizingNotRun:`Not calculated yet`,sizingRunning:`Calculating …`,sizingReady:`Ready`,recEconomic:`Economic`,recTechnical:`Technical`,recBalanced:`Balanced`,matrixDays:`Analysis days`,matrixRecords:`Hourly records`,matrixAnomaly:`Anomalies`,optReload:`Saved. The integration reloads so the new sensors take effect.`,optSaved:`Saved. The value applies immediately.`,optAdmin:`Only admins can change these values.`,optClear:`Clear`,optSearch:`Search entities`,optService:`Service, for example switch.turn_on`,optTarget:`Target entity`,optWeekdays:`Weekdays`,optFrom:`From`,optTo:`Until`,optClass:`Class`,optReserve:`Minimum reserve %`,optAddSlot:`Add slot`,optRemove:`Remove`,optSaveSlots:`Save slots`,optYes:`Yes`,optNo:`No`,classHigh:`High`,classLow:`Low`,classNormal:`Normal`,wd0:`Mon`,wd1:`Tue`,wd2:`Wed`,wd3:`Thu`,wd4:`Fri`,wd5:`Sat`,wd6:`Sun`,targetPower:`Target charge power`,autoObjective:`Objective`,autoLastRun:`Last run`,autoFallback:`Data fallback`,autoReason:`Reason`,autoOverrides:`Adjustments`,autoNone:`No adjustment. The previous setup was already the best.`,autoGrid:`Grid size`,autoDeltaDraw:`Grid import versus baseline`,autoDeltaFeed:`Feed-in versus baseline`,autoDeltaCurtail:`Curtailment versus baseline`,autoDeltaSelf:`Autarky versus baseline`},Ar={e3dc:`E3DC`,generic:`Generisch`,off:`Aus`,passive:`Passiv`,active_house:`Aktiv Haus`,active_grid:`Aktiv Netz`,self_consumption:`Eigenverbrauch`,cost:`Kosten`,co2:`CO₂`,fixed:`Fest`,dynamic:`Dynamisch`},jr={e3dc:`E3DC`,generic:`Generic`,off:`Off`,passive:`Passive`,active_house:`Active, house`,active_grid:`Active, grid`,self_consumption:`Self-consumption`,cost:`Cost`,co2:`CO₂`,fixed:`Fixed`,dynamic:`Dynamic`},Mr={off:`Aus`,manual:`Manuell`,emergency:`Notladung`,feed_in_limit:`Einspeisebegrenzung`,reserve_protection:`Reserveschutz`,evcc_pause:`EVCC-Pause`,ht_protection:`HT-Schutz`,force_discharge:`Erzwungene Entladung`,morning_discharge:`Morgen-Entladung`,astro_wait:`Astro-Wartezeit`,morning_cap:`Morgen-Deckel`,hard_soc_limit:`SoC-Deckel`,fast_floor:`Schnell-Boden`,grid_charge:`Netzladung`,grid_hold:`Akku halten`,corridor:`Ladekorridor`,pv_delay:`PV-Verzögerung`,spreading:`Spreading`,curtailment_guard:`Abregelschutz`,idle:`Leerlauf`},Nr={off:`Off`,manual:`Manual`,emergency:`Emergency charge`,feed_in_limit:`Feed-in limit`,reserve_protection:`Reserve protection`,evcc_pause:`EVCC pause`,ht_protection:`HT protection`,force_discharge:`Forced discharge`,morning_discharge:`Morning discharge`,astro_wait:`Astro wait`,morning_cap:`Morning cap`,hard_soc_limit:`SoC cap`,fast_floor:`Fast floor`,grid_charge:`Grid charge`,grid_hold:`Hold battery`,corridor:`Charge corridor`,pv_delay:`PV delay`,spreading:`Spreading`,curtailment_guard:`Curtailment guard`,idle:`Idle`};function Pr(e){let t=!e||e.toLowerCase().startsWith(`de`),n=t?Or:kr,r=t?Mr:Nr,i=t?Ar:jr;return{t:(e,t)=>{let r=n[e];if(t)for(let[e,n]of Object.entries(t))r=r.replace(`{${e}}`,String(n));return r},phase:e=>r[e]??e,option:e=>i[e]??e}}var Fr=o`
  :host {
    --bg: #070b14;
    --glass: rgba(255, 255, 255, 0.045);
    --glass-strong: rgba(255, 255, 255, 0.08);
    --stroke: rgba(255, 255, 255, 0.08);
    --stroke-strong: rgba(255, 255, 255, 0.16);
    --text: #e8edf7;
    --muted: #8b96ad;
    --faint: #5a6580;
    --pv: #fbbf24;
    --house: #a78bfa;
    --grid-in: #f87171;
    --grid-out: #34d399;
    --bat: #22d3ee;
    --accent: #38bdf8;
    --accent-2: #818cf8;
    --accent-line: rgba(56, 189, 248, 0.6);
    --accent-wash: rgba(56, 189, 248, 0.16);
    --accent-glow: rgba(56, 189, 248, 0.35);
    --btn-primary-bg: linear-gradient(180deg, rgba(56, 189, 248, 0.35), rgba(56, 189, 248, 0.15));
    --btn-primary-border: rgba(56, 189, 248, 0.7);
    --btn-primary-color: var(--text);
    --ok: #34d399;
    --warn: #fbbf24;
    --radius: 20px;
    --radius-sm: 12px;
    --rail: rgba(7, 11, 20, 0.55);
    --rail-solid: rgba(7, 11, 20, 0.88);
    --btn: linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04));
    --card-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.025));
    --card-highlight: rgba(255, 255, 255, 0.05);
    --card-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
    --fill: rgba(255, 255, 255, 0.04);
    --field: rgba(0, 0, 0, 0.25);
    --switch-track: rgba(255, 255, 255, 0.12);
    --tip-bg: #0c1424;
    --float: linear-gradient(180deg, rgba(20, 28, 48, 0.94), rgba(12, 18, 32, 0.97));
    --float-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
    --scrim: rgba(3, 6, 12, 0.55);
    --tooltip: rgba(14, 20, 36, 0.95);
    color-scheme: dark;
    display: block;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    box-sizing: border-box;
    color: var(--text);
    font-family: Inter, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    background:
      radial-gradient(1200px 600px at 10% -10%, rgba(56, 189, 248, 0.14), transparent 60%),
      radial-gradient(900px 500px at 100% 0%, rgba(129, 140, 248, 0.14), transparent 60%),
      radial-gradient(800px 600px at 50% 120%, rgba(34, 211, 238, 0.08), transparent 60%),
      var(--bg);
  }
  :host([theme="classic"]) {
    color-scheme: light;
    --bg: #e7eef5;
    --glass: rgba(21, 36, 56, 0.045);
    --glass-strong: rgba(21, 36, 56, 0.08);
    --stroke: rgba(21, 36, 56, 0.1);
    --stroke-strong: rgba(21, 36, 56, 0.16);
    --text: #152033;
    --muted: #526277;
    --faint: #8493a6;
    --rail: rgba(255, 255, 255, 0.82);
    --rail-solid: rgba(255, 255, 255, 0.94);
    --btn: linear-gradient(180deg, #ffffff, #f3f7fb);
    --card-bg: linear-gradient(180deg, #ffffff, #f6f9fc);
    --card-highlight: rgba(255, 255, 255, 0.9);
    --card-shadow: 0 14px 34px rgba(21, 32, 51, 0.08);
    --fill: rgba(21, 36, 56, 0.045);
    --field: #ffffff;
    --switch-track: rgba(21, 36, 56, 0.14);
    --tip-bg: #ffffff;
    --float: linear-gradient(180deg, #ffffff, #f4f7fb);
    --float-shadow: 0 24px 60px rgba(21, 32, 51, 0.16);
    --scrim: rgba(21, 32, 51, 0.32);
    --tooltip: rgba(255, 255, 255, 0.98);
    background:
      radial-gradient(1100px 560px at 8% -12%, rgba(2, 132, 199, 0.16), transparent 58%),
      radial-gradient(860px 480px at 100% 0%, rgba(14, 165, 164, 0.12), transparent 56%),
      radial-gradient(700px 520px at 50% 120%, rgba(217, 119, 6, 0.08), transparent 60%),
      var(--bg);
  }
  :host([theme="e3dc"]) {
    color-scheme: light;
    --bg: #f7f7f7;
    --glass: rgba(30, 37, 43, 0.04);
    --glass-strong: rgba(30, 37, 43, 0.07);
    --stroke: rgba(30, 37, 43, 0.1);
    --stroke-strong: rgba(30, 37, 43, 0.16);
    --text: #4a4a4a;
    --muted: #6e767c;
    --faint: #a4aaae;
    --accent: #5cc244;
    --accent-2: #3f9a32;
    --ok: #5cc244;
    --accent-line: rgba(92, 194, 68, 0.7);
    --accent-wash: rgba(92, 194, 68, 0.16);
    --accent-glow: rgba(92, 194, 68, 0.28);
    --btn-primary-bg: #5cc244;
    --btn-primary-border: #5cc244;
    --btn-primary-color: #ffffff;
    --radius: 12px;
    --radius-sm: 8px;
    --rail: #1e252b;
    --rail-solid: #1e252b;
    --btn: #ffffff;
    --card-bg: #ffffff;
    --card-highlight: #ffffff;
    --card-shadow: 0 1px 2px rgba(30, 37, 43, 0.08);
    --fill: #f3f4f5;
    --field: #ffffff;
    --switch-track: rgba(30, 37, 43, 0.16);
    --tip-bg: #ffffff;
    --float: #ffffff;
    --float-shadow: 0 16px 40px rgba(30, 37, 43, 0.14);
    --scrim: rgba(30, 37, 43, 0.4);
    --tooltip: #ffffff;
    font-family: Roboto, Inter, system-ui, sans-serif;
    background: var(--bg);
  }
  * {
    box-sizing: border-box;
  }
  button {
    font-family: inherit;
  }
  button:focus-visible,
  a:focus-visible,
  input:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  maestro-chart {
    display: block;
  }

  .app {
    display: grid;
    grid-template-columns: 84px 1fr;
    height: 100%;
    min-height: 0;
    overflow: hidden;
  }

  /* Navigation */
  .rail {
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 20px 0;
    border-right: 1px solid var(--stroke);
    background: var(--rail);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  .logo {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin-bottom: 18px;
    overflow: hidden;
    background: none;
    box-shadow: none;
  }
  .logo img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
  .nav-btn {
    width: 68px;
    padding: 10px 2px 8px;
    text-align: center;
    line-height: 1.15;
    border-radius: 14px;
    border: 0;
    cursor: pointer;
    background: transparent;
    color: var(--muted);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font: 500 10.5px Inter, system-ui, sans-serif;
    transition: all 0.2s ease;
  }
  .nav-btn svg {
    width: 22px;
    height: 22px;
  }
  .nav-btn:hover {
    color: var(--text);
    background: var(--glass);
  }
  .nav-btn.active {
    color: var(--text);
    background: var(--glass-strong);
    box-shadow: inset 0 0 0 1px var(--stroke-strong);
  }
  .nav-btn.active svg {
    color: var(--accent);
  }
  :host([theme="e3dc"]) .rail {
    color: #d7dee3;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  :host([theme="e3dc"]) .nav-btn {
    color: #c5ced4;
  }
  :host([theme="e3dc"]) .nav-btn:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.06);
  }
  :host([theme="e3dc"]) .nav-btn.active {
    color: #5cc244;
    background: transparent;
    box-shadow: inset 3px 0 0 #5cc244;
  }
  :host([theme="e3dc"]) .logo {
    border-radius: 50%;
    background: none;
    box-shadow: none;
  }
  .spacer {
    flex: 1;
  }

  main {
    padding: max(22px, env(safe-area-inset-top)) 28px 40px;
    max-width: 1480px;
    width: 100%;
    min-width: 0;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  .topbar {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 22px;
  }
  .topbar h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.4px;
  }
  .topbar .title p {
    margin: 2px 0 0;
    color: var(--muted);
    font-size: 13px;
  }
  .grow {
    flex: 1;
    min-width: 0;
  }
  .menu {
    width: 40px;
    height: 40px;
    flex: none;
    border: 1px solid var(--stroke);
    border-radius: 12px;
    background: var(--glass);
    color: var(--text);
    cursor: pointer;
    display: grid;
    place-items: center;
  }
  .menu svg {
    width: 22px;
    height: 22px;
    fill: currentColor;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-radius: 999px;
    background: var(--glass);
    border: 1px solid var(--stroke);
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--ok);
    box-shadow: 0 0 12px var(--ok);
    animation: pulse 2s infinite;
  }
  .dot.off {
    background: var(--faint);
    box-shadow: none;
    animation: none;
  }
  @keyframes pulse {
    50% {
      opacity: 0.35;
    }
  }
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 9px 16px;
    border-radius: 12px;
    border: 1px solid var(--stroke-strong);
    background: var(--btn);
    color: var(--text);
    font: 600 13px Inter, system-ui, sans-serif;
  }
  .btn:hover {
    border-color: var(--accent-line);
  }
  .btn svg {
    width: 16px;
    height: 16px;
  }
  .btn.primary {
    border-color: var(--btn-primary-border);
    background: var(--btn-primary-bg);
    color: var(--btn-primary-color);
  }
  .btn:disabled {
    opacity: 0.6;
    cursor: default;
  }

  .card {
    position: relative;
    background: var(--card-bg);
    border: 1px solid var(--stroke);
    border-radius: var(--radius);
    padding: 20px;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow:
      0 1px 0 var(--card-highlight) inset,
      var(--card-shadow);
    min-width: 0;
  }
  .card h3 {
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 600;
    color: var(--muted);
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }
  .sub {
    color: var(--faint);
    font-size: 12px;
  }
  .grid {
    display: grid;
    gap: 18px;
  }
  .screen {
    animation: fade 0.35s ease;
  }
  @keyframes fade {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  .empty {
    color: var(--muted);
    padding: 40px 0;
    text-align: center;
    margin: 0;
  }
  .err {
    color: #f87171;
    font-size: 13px;
    word-break: break-word;
  }
  .self-start {
    align-self: flex-start;
  }

  /* Live */
  .live-top {
    grid-template-columns: 1.55fr 1fr;
  }
  .flow-wrap {
    height: 380px;
  }
  .flow-wrap svg {
    width: 100%;
    height: 100%;
  }
  .node-val {
    font: 700 22px Inter, system-ui, sans-serif;
    fill: var(--text);
    letter-spacing: -0.3px;
  }
  .node-lbl {
    font: 500 12px Inter, system-ui, sans-serif;
    fill: var(--muted);
  }
  .node-val-sm {
    font: 700 14px Inter, system-ui, sans-serif;
    fill: var(--text);
  }
  .node-lbl-sm {
    font: 500 11px Inter, system-ui, sans-serif;
    fill: var(--muted);
  }
  .card-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }
  .icon-btn {
    width: 36px;
    height: 36px;
    border-radius: 12px;
    border: 1px solid var(--stroke-strong);
    background: var(--fill);
    color: var(--muted);
    display: grid;
    place-items: center;
    cursor: pointer;
    flex: none;
  }
  .icon-btn svg {
    width: 16px;
    height: 16px;
  }
  .icon-btn:hover {
    color: var(--text);
    border-color: var(--accent-line);
  }
  .flow-node {
    cursor: pointer;
  }
  .flow-node:focus {
    outline: none;
  }
  .flow-node:focus-visible circle {
    stroke-width: 3;
  }
  .flow-line {
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    opacity: 0.22;
  }
  .electron {
    pointer-events: none;
  }
  .electron .halo {
    opacity: 0.22;
  }
  .soc-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .ring {
    width: 100%;
  }
  .soc-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 100%;
    margin-top: 8px;
  }
  .meta {
    text-align: center;
    padding: 10px 6px;
    border-radius: var(--radius-sm);
    background: var(--fill);
    border: 1px solid var(--stroke);
  }
  .meta b {
    display: block;
    font-size: 17px;
    font-weight: 700;
  }
  .meta span {
    font-size: 11px;
    color: var(--muted);
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 18px 0;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 12px;
    border-radius: 999px;
    font-size: 12.5px;
    font-weight: 500;
    color: var(--muted);
    background: var(--fill);
    border: 1px solid var(--stroke);
  }
  .chip i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--faint);
  }
  .chip.on {
    color: var(--text);
    border-color: rgba(52, 211, 153, 0.35);
    background: rgba(52, 211, 153, 0.08);
  }
  .chip.on i {
    background: var(--ok);
    box-shadow: 0 0 10px var(--ok);
  }
  .chip.warn {
    color: var(--text);
    border-color: rgba(251, 191, 36, 0.4);
    background: rgba(251, 191, 36, 0.08);
  }
  .chip.warn i {
    background: var(--warn);
    box-shadow: 0 0 10px var(--warn);
  }
  .group {
    margin-top: 18px;
  }
  .group-head {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;
    margin: 0 0 10px;
    padding: 6px 8px 6px 2px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--muted);
    font: 650 12px Inter, system-ui, sans-serif;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
  }
  .group-head:hover {
    color: var(--text);
  }
  .group-head:focus-visible {
    outline: 2px solid var(--accent, #38bdf8);
    outline-offset: 2px;
  }
  .group-head > span {
    flex: 1;
    text-align: left;
  }
  .group-sum {
    font-size: 13px;
    font-weight: 750;
    letter-spacing: 0;
    text-transform: none;
    color: var(--text);
  }
  .group-sum small {
    margin-left: 6px;
    font-size: 11px;
    font-weight: 650;
    color: var(--muted);
  }
  .group-sum.pos {
    color: var(--ok);
  }
  .group-sum.neg {
    color: var(--grid-in);
  }
  .group-head svg {
    width: 16px;
    height: 16px;
    transition: transform 0.15s ease;
  }
  .group-head.open svg {
    transform: rotate(90deg);
  }
  @media (prefers-reduced-motion: reduce) {
    .group-head svg,
    .gauge-arc {
      transition: none;
    }
  }
  .kpis {
    grid-template-columns: repeat(4, 1fr);
  }
  .plant-body {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .hero {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 18px 18px 16px;
  }
  .hero-main {
    display: grid;
    grid-template-columns: minmax(160px, 0.7fr) 1.3fr;
    gap: 8px;
    align-items: center;
  }
  .hero-mode span,
  .hero-meta span {
    display: block;
    color: var(--muted);
    font-size: 12px;
    font-weight: 650;
  }
  .hero-mode b {
    display: block;
    margin-top: 4px;
    font-size: 40px;
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1;
  }
  .hero-mode[data-mode="2"] b {
    color: var(--warn);
  }
  .hero-mode[data-mode="3"] b {
    color: var(--bat);
  }
  .hero-mode[data-mode="4"] b {
    color: var(--grid-in);
  }
  .hero-gauges {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }
  .hero-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 22px;
    padding-top: 12px;
    border-top: 1px solid var(--stroke);
  }
  .hero-meta b {
    font-size: 14px;
  }
  .hero-fault {
    margin: 0;
    padding: 10px 12px;
    border-radius: 12px;
    color: var(--text);
    background: rgba(248, 113, 113, 0.12);
    border: 1px solid rgba(248, 113, 113, 0.35);
    font-size: 13px;
    font-weight: 650;
  }
  .phase-gauges h3 {
    margin: 0 0 4px;
  }
  .phase-gauge-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .phase-history {
    margin-top: 12px;
  }
  .phase-history .sub {
    margin-bottom: 4px;
  }
  .phase-legend {
    display: flex;
    gap: 14px;
    margin: 2px 0 6px;
    color: var(--muted);
    font-size: 12px;
    font-weight: 650;
  }
  .phase-legend i {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 6px;
    border-radius: 99px;
    background: var(--swatch);
  }
  .phase-chart {
    height: 220px;
  }
  .gauge.house .gauge-arc {
    stroke: var(--house);
  }
  .gauge.grid .gauge-arc {
    stroke: var(--grid-in);
  }
  .gauge.pvi .gauge-arc {
    stroke: var(--pv);
  }
  .gauge.grid.neg .gauge-arc,
  .gauge.pvi.neg .gauge-arc,
  .gauge.house.neg .gauge-arc {
    stroke: var(--grid-out);
  }
  .gauge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    min-height: 0;
    min-width: 0;
    padding: 0;
    background: transparent;
    border: 0;
    box-shadow: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  .gauge-face {
    position: relative;
    width: min(124px, 100%);
    aspect-ratio: 1;
    display: grid;
    place-items: center;
  }
  .gauge-face svg {
    width: 100%;
    height: 100%;
  }
  .gauge-face b {
    position: absolute;
    max-width: 62%;
    text-align: center;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: -0.4px;
    line-height: 1.05;
    font-variant-numeric: tabular-nums;
  }
  .gauge > span {
    color: var(--muted);
    font-size: 12px;
    font-weight: 650;
    text-align: center;
  }
  .gauge-track,
  .gauge-arc {
    fill: none;
    stroke-width: 8;
  }
  .gauge-track {
    stroke: var(--stroke-strong);
  }
  .gauge-arc {
    stroke: var(--ok);
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: 60px 60px;
    transition: stroke-dasharray 0.5s ease;
  }
  .gauge.self .gauge-arc {
    stroke: var(--pv);
  }
  .plant-flags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .plant-packs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 14px;
  }
  .pack {
    display: grid;
    grid-template-columns: 108px 1fr;
    gap: 16px;
    align-items: center;
  }
  .pack-visual {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    text-align: center;
  }
  .pack-visual > span {
    color: var(--muted);
    font-size: 11px;
  }
  .pack-soh {
    font-size: 16px;
    font-weight: 800;
    letter-spacing: -0.3px;
  }
  .batt {
    width: 78px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .batt-nub {
    width: 26px;
    height: 7px;
    border-radius: 4px 4px 1px 1px;
    background: var(--stroke-strong);
  }
  .batt-body {
    width: 78px;
    height: 118px;
    margin-top: -1px;
    border-radius: 14px;
    border: 2px solid var(--stroke-strong);
    background:
      linear-gradient(180deg, var(--card-highlight), transparent 28%),
      var(--field);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    box-shadow: inset 0 0 0 1px var(--stroke);
  }
  .batt-fill {
    width: 100%;
    background: linear-gradient(180deg, color-mix(in srgb, var(--bat) 55%, white), var(--bat) 42%, color-mix(in srgb, var(--bat) 70%, black));
    box-shadow: 0 0 18px color-mix(in srgb, var(--bat) 45%, transparent);
  }
  .batt.discharge .batt-fill {
    background: linear-gradient(180deg, color-mix(in srgb, var(--warn) 60%, white), var(--warn) 46%, color-mix(in srgb, var(--warn) 72%, black));
    box-shadow: 0 0 18px color-mix(in srgb, var(--warn) 40%, transparent);
  }
  .batt.idle .batt-fill {
    background: linear-gradient(180deg, color-mix(in srgb, var(--bat) 35%, var(--muted)), var(--bat));
    box-shadow: none;
  }
  .batt-cells {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(to top, transparent 0 26px, color-mix(in srgb, var(--bg) 55%, transparent) 26px 28px);
    pointer-events: none;
  }
  .pack-energy {
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.6px;
    margin-top: 2px;
  }
  .pack-share {
    color: var(--muted);
    font-size: 12px;
    margin-bottom: 10px;
  }
  .pack-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .pack-meta span,
  .temp-top span {
    display: block;
    color: var(--muted);
    font-size: 11px;
  }
  .pack-meta b {
    font-size: 14px;
  }
  .pack-meta b.charge {
    color: var(--bat);
  }
  .pack-meta b.discharge {
    color: var(--warn);
  }
  .temp {
    margin-top: 12px;
  }
  .temp-top {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 6px;
  }
  .temp-top b {
    font-size: 12px;
  }
  .temp-track,
  .mix {
    height: 8px;
    border-radius: 99px;
    background: var(--fill);
    position: relative;
    overflow: hidden;
  }
  .temp-track i {
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: 99px;
    background: linear-gradient(90deg, var(--bat), var(--warn));
  }
  .budget {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .budget-row {
    display: grid;
    grid-template-columns: minmax(120px, 180px) 1fr auto;
    gap: 12px;
    align-items: center;
  }
  .budget-row span {
    color: var(--muted);
    font-size: 13px;
  }
  .budget-row .track {
    height: 8px;
    border-radius: 99px;
    background: var(--fill);
    overflow: hidden;
  }
  .budget-row i {
    display: block;
    height: 100%;
    border-radius: 99px;
    background: var(--accent);
  }
  .budget-row i.pv,
  .phase-bars i.pvi,
  .phase-legend i.pvi {
    background: var(--pv);
  }
  .budget-row i.house,
  .phase-bars i.house,
  .phase-legend i.house {
    background: var(--house);
  }
  .budget-row i.bat {
    background: var(--bat);
  }
  .budget-row i.warn {
    background: var(--warn);
  }
  .budget-row i.muted {
    background: var(--faint);
  }
  .budget-row b {
    font-size: 13px;
    min-width: 72px;
    text-align: right;
  }
  .phase-plot {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    height: 168px;
    align-items: end;
  }
  .phase-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    gap: 8px;
  }
  .phase-bars {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 7px;
  }
  .phase-bars i {
    width: 16px;
    min-height: 3px;
    border-radius: 6px 6px 2px 2px;
    background: var(--house);
  }
  .phase-bars i.grid,
  .phase-legend i.grid {
    background: var(--grid-in);
  }
  .phase-bars i.grid.neg {
    background: var(--grid-out);
  }
  .phase-col > span {
    color: var(--muted);
    font-size: 12px;
    font-weight: 650;
  }
  .phase-col > b {
    font-size: 13px;
    font-weight: 700;
    margin-top: -4px;
  }
  .phase-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 14px;
    color: var(--muted);
    font-size: 12px;
  }
  .phase-legend span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .phase-legend i {
    width: 8px;
    height: 8px;
    border-radius: 99px;
  }
  .mix {
    display: flex;
    margin-top: 8px;
  }
  .mix i {
    display: block;
    height: 100%;
  }
  .mix i.sun {
    background: var(--pv);
  }
  .mix i.net {
    background: var(--grid-in);
  }
  .pack.wall .rows {
    margin-top: 8px;
  }
  .cells {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    padding-top: 4px;
    border-top: 1px solid var(--stroke);
  }
  .cells-label {
    flex: 1 0 100%;
    color: var(--muted);
    font-size: 12px;
    font-weight: 650;
  }
  .cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 92px;
    text-align: center;
  }
  .cell b {
    font-size: 13px;
  }
  .cell span {
    color: var(--muted);
    font-size: 11px;
    line-height: 1.25;
  }
  .batt.mini {
    width: 46px;
  }
  .batt.mini .batt-nub {
    width: 16px;
    height: 5px;
  }
  .batt.mini .batt-body {
    width: 46px;
    height: 68px;
    border-radius: 10px;
  }
  .batt.soh-good .batt-fill {
    background: linear-gradient(180deg, color-mix(in srgb, var(--ok) 55%, white), var(--ok));
    box-shadow: 0 0 14px color-mix(in srgb, var(--ok) 40%, transparent);
  }
  .batt.soh-mid .batt-fill {
    background: linear-gradient(180deg, color-mix(in srgb, var(--warn) 60%, white), var(--warn));
    box-shadow: 0 0 14px color-mix(in srgb, var(--warn) 35%, transparent);
  }
  .batt.soh-low .batt-fill {
    background: linear-gradient(180deg, color-mix(in srgb, var(--grid-in) 60%, white), var(--grid-in));
    box-shadow: 0 0 14px color-mix(in srgb, var(--grid-in) 35%, transparent);
  }
  .wall-stack {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .kpi.alert {
    border-color: rgba(251, 191, 36, 0.5);
    background: rgba(251, 191, 36, 0.06);
  }
  .kpi.alert .delta {
    color: var(--warn);
  }
  .kpi .v {
    font-size: 30px;
    font-weight: 800;
    letter-spacing: -0.8px;
    margin-top: 8px;
  }
  .v small {
    font-size: 15px;
    font-weight: 600;
    color: var(--muted);
    margin-left: 3px;
  }
  .kpi .delta {
    margin-top: 6px;
    font-size: 12px;
    color: var(--muted);
  }
  .kpi .spark {
    margin: 8px -8px -12px;
  }

  /* Forecast + plan */
  .chart-head {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 6px;
    flex-wrap: wrap;
  }
  .seg {
    display: inline-flex;
    padding: 3px;
    border-radius: 12px;
    background: var(--fill);
    border: 1px solid var(--stroke);
  }
  .seg button,
  .toggle {
    border: 0;
    background: transparent;
    color: var(--muted);
    font: 600 12px Inter, system-ui, sans-serif;
    padding: 7px 12px;
    border-radius: 9px;
    cursor: pointer;
  }
  .seg button.active,
  .toggle.active {
    background: var(--glass-strong);
    color: var(--text);
  }
  .toggle {
    border: 1px solid var(--stroke);
    border-radius: 12px;
    padding: 9px 12px;
  }
  .stat-row {
    grid-template-columns: repeat(5, 1fr);
    margin-top: 18px;
  }
  .stat {
    padding: 14px 16px;
  }
  .stat .v {
    font-size: 22px;
    font-weight: 700;
    margin-top: 4px;
    letter-spacing: -0.4px;
  }
  .force {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px 16px;
    align-items: center;
    margin-bottom: 14px;
  }
  .force .txt {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .force .txt span {
    color: var(--muted);
    font-size: 12px;
    font-weight: 500;
  }
  .force input[type="range"] {
    grid-column: 1 / -1;
  }
  .period {
    margin: 0 0 4px;
  }
  .debug-card {
    margin-top: 0;
  }
  .debug-log {
    margin: 12px 0 0;
    white-space: pre-wrap;
    font: 12px ui-monospace, monospace;
    color: var(--muted);
  }
  .sheet select,
  .btn.action {
    border: 1px solid var(--stroke-strong);
    background: var(--fill);
    color: var(--text);
    border-radius: 10px;
    padding: 8px 10px;
    font: 600 13px Inter, system-ui, sans-serif;
  }
  .btn.action {
    cursor: pointer;
    text-align: left;
  }
  .btn.action:disabled,
  .sheet select:disabled {
    opacity: 0.45;
    cursor: default;
  }
  .release {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
  }
  .release .btn.action {
    width: 100%;
  }
  .banner {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 16px;
    margin: 0 0 16px;
    padding: 10px 14px;
    border-radius: 12px;
    border: 1px solid rgba(251, 191, 36, 0.45);
    background: rgba(251, 191, 36, 0.1);
    color: var(--text);
    font-size: 13px;
    font-weight: 650;
  }
  .banner.bad {
    border-color: rgba(248, 113, 113, 0.5);
    background: rgba(248, 113, 113, 0.1);
  }
  .dec-extra {
    grid-template-columns: repeat(3, 1fr);
  }
  .rows {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
  }
  .legend {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--muted);
    margin-top: 6px;
  }
  .legend span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .legend i {
    width: 10px;
    height: 10px;
    border-radius: 3px;
  }
  .plan-top {
    grid-template-columns: 2fr 1fr;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 999px;
    font-size: 11.5px;
    font-weight: 600;
    background: rgba(129, 140, 248, 0.14);
    color: #c7d2fe;
    border: 1px solid rgba(129, 140, 248, 0.35);
  }
  .plan-kpi {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .plan-tune {
    margin-top: 14px;
  }
  .plan-tune h4 {
    margin: 18px 0 0;
    font-size: 15px;
  }
  .plan-tune .sub {
    margin: 4px 0 2px;
  }
  .plan-tune .hint {
    margin: 6px 0 0;
  }
  .plan-state {
    font-size: 22px;
    font-weight: 700;
    margin-top: 6px;
  }
  .msg {
    margin-top: 6px;
    line-height: 1.5;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--stroke);
  }
  .row:last-child {
    border-bottom: 0;
  }
  .row span {
    color: var(--muted);
    font-size: 13px;
  }
  .row b {
    font-size: 16px;
    text-align: right;
  }
  .strip {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: 3px;
    margin-top: 14px;
  }
  .slot {
    height: 34px;
    border-radius: 6px;
    background: var(--fill);
  }
  .slot.charge {
    background: linear-gradient(180deg, rgba(52, 211, 153, 0.9), rgba(52, 211, 153, 0.45));
  }
  .slot.hold {
    background: linear-gradient(180deg, rgba(251, 191, 36, 0.85), rgba(251, 191, 36, 0.4));
  }
  .slot.release {
    background: linear-gradient(180deg, rgba(34, 211, 238, 0.45), rgba(34, 211, 238, 0.15));
  }
  .strip-axis {
    display: flex;
    justify-content: space-between;
    font: 500 11px ui-monospace, monospace;
    color: var(--faint);
    margin-top: 6px;
  }

  /* Decision */
  .dec-top {
    grid-template-columns: 1.4fr 1fr;
  }
  .phase-hero {
    overflow: hidden;
  }
  .phase-hero::before {
    content: "";
    position: absolute;
    inset: -40% -20% auto auto;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--accent-glow), transparent 65%);
    pointer-events: none;
  }
  .phase-name {
    font-size: 34px;
    font-weight: 800;
    letter-spacing: -1px;
    margin: 10px 0 6px;
  }
  .phase-reason {
    font-size: 15px;
    line-height: 1.55;
    color: #c9d2e3;
    max-width: 640px;
  }
  .lim-sub {
    margin-bottom: 18px;
  }
  .limits {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .limit-row .lbl {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    font-size: 13px;
    color: var(--muted);
    margin-bottom: 8px;
    flex-wrap: wrap;
  }
  .bar {
    height: 10px;
    border-radius: 999px;
    background: var(--fill);
    position: relative;
    overflow: hidden;
  }
  .bar > div {
    position: absolute;
    inset: 0 auto 0 0;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
  }
  .bar .soll {
    opacity: 0.45;
  }
  .bar .sent {
    height: 4px;
    top: 3px;
    bottom: auto;
  }
  .tl-card {
    margin-top: 18px;
  }
  .timeline {
    position: relative;
    padding-left: 26px;
    margin-top: 8px;
  }
  .timeline::before {
    content: "";
    position: absolute;
    left: 8px;
    top: 6px;
    bottom: 6px;
    width: 2px;
    background: linear-gradient(var(--accent), transparent);
    opacity: 0.5;
  }
  .tl-item {
    position: relative;
    padding: 10px 0 18px;
  }
  .tl-item::before {
    content: "";
    position: absolute;
    left: -23px;
    top: 15px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--bg);
    border: 2px solid var(--accent);
  }
  .tl-time {
    font: 500 12px ui-monospace, monospace;
    color: var(--faint);
  }
  .tl-phase {
    font-weight: 700;
    margin: 3px 0;
  }
  .tl-reason {
    color: var(--muted);
    font-size: 13.5px;
    line-height: 1.5;
  }

  /* Controls sheet */
  .scrim {
    position: fixed;
    inset: 0;
    background: var(--scrim);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s;
    z-index: 20;
  }
  .scrim.open {
    opacity: 1;
    pointer-events: auto;
  }
  .sheet {
    position: fixed;
    top: 12px;
    right: 12px;
    bottom: 12px;
    width: 400px;
    z-index: 21;
    border-radius: 24px;
    padding: 22px;
    background: var(--float);
    border: 1px solid var(--stroke-strong);
    box-shadow: var(--float-shadow);
    transform: translateX(110%);
    transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
    overflow-y: auto;
  }
  .sheet.open {
    transform: none;
  }
  .hist-scrim {
    z-index: 30;
  }
  .overlay {
    position: fixed;
    z-index: 31;
    left: 50%;
    top: 50%;
    width: min(760px, calc(100% - 24px));
    max-height: min(560px, calc(100% - 24px));
    overflow: auto;
    transform: translate(-50%, -48%);
    border-radius: 24px;
    padding: 22px;
    background: var(--float);
    border: 1px solid var(--stroke-strong);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
  }
  .overlay maestro-chart {
    height: 280px;
    margin-top: 8px;
  }
  .sheet-head {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .sheet h2,
  .overlay h2 {
    margin: 0 0 4px;
    font-size: 20px;
  }
  .ctrl {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px;
    border-radius: 16px;
    background: var(--fill);
    border: 1px solid var(--stroke);
    margin-top: 10px;
  }
  .ctrl.wrap {
    flex-wrap: wrap;
  }
  .ctrl .txt {
    flex: 1;
    min-width: 0;
  }
  .ctrl .txt b {
    display: block;
    font-size: 14px;
    font-weight: 600;
  }
  .ctrl .txt span {
    font-size: 12px;
    color: var(--muted);
  }
  .ladder {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 18px;
    padding: 16px 16px 8px;
    border: 1px solid var(--stroke);
    border-radius: var(--radius);
    background: var(--glass);
  }
  .ladder-head h3 {
    margin: 0;
    font-size: 15px;
  }
  .ladder-head p {
    margin: 4px 0 0;
    color: var(--muted);
    font-size: 13px;
  }
  .ladder-band h4 {
    margin: 0 0 6px;
    font-size: 11px;
    font-weight: 650;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .ladder-steps {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .ladder-step {
    border: 1px solid var(--stroke);
    background: transparent;
    color: var(--text);
    border-radius: 999px;
    padding: 6px 10px;
    font-size: 13px;
    cursor: pointer;
  }
  .ladder-step.on {
    border-color: var(--accent);
    background: var(--glass-strong);
  }
  .settings-section h3 {
    margin: 16px 0 2px;
    font-size: 15px;
  }
  .settings-section .sub {
    margin: 0 0 8px;
  }
  .setup-card {
    margin-bottom: 18px;
  }
  .setup-card h2 {
    margin: 0 0 4px;
    font-size: 18px;
  }
  .setup-progress {
    margin: 12px 0;
    color: var(--muted);
    font-size: 13px;
  }
  .setup-steps {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .setup-step {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 12px;
    align-items: center;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1px solid var(--stroke);
    background: var(--glass);
  }
  .setup-step b {
    font-size: 15px;
  }
  .setup-step .tag {
    margin-left: 8px;
    color: var(--muted);
    font-size: 12px;
    font-weight: 600;
  }
  .setup-step p {
    margin: 4px 0 0;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.4;
  }
  .setup-step .sub {
    color: var(--text);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .setup-mark {
    width: 28px;
    height: 28px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    font-weight: 700;
    font-size: 14px;
    color: var(--muted);
    border: 1px solid var(--stroke);
  }
  .setup-mark.done {
    color: var(--ok);
    border-color: color-mix(in srgb, var(--ok) 45%, transparent);
    background: color-mix(in srgb, var(--ok) 16%, transparent);
  }
  .setup-mark.todo {
    color: var(--warn);
    border-color: color-mix(in srgb, var(--warn) 50%, transparent);
    background: color-mix(in srgb, var(--warn) 16%, transparent);
  }
  .setup-done {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    margin: 0 0 18px;
    padding: 8px 12px 8px 8px;
    border-radius: 14px;
    border: 1px solid var(--stroke);
    background: var(--glass);
    color: var(--text);
  }
  .setup-done-open {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
    padding: 4px 6px;
    border: 0;
    background: transparent;
    color: inherit;
    text-align: left;
    cursor: pointer;
  }
  .setup-done .btn {
    flex: none;
  }
  .setup-done b,
  .setup-done span span {
    display: block;
  }
  .setup-done span span {
    color: var(--muted);
    font-size: 13px;
    margin-top: 2px;
  }
  .settings-tiles {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 14px;
  }
  .settings-tile {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    min-height: 148px;
    padding: 18px 18px 16px;
    border-radius: var(--radius);
    border: 1px solid var(--stroke);
    background: var(--glass);
    color: var(--text);
    text-align: left;
    cursor: pointer;
  }
  .settings-tile:hover {
    background: var(--glass-strong);
    border-color: var(--stroke-strong);
  }
  .settings-tile svg {
    width: 28px;
    height: 28px;
    color: var(--accent);
  }
  .settings-tile b {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.2px;
  }
  .settings-tile span {
    color: var(--muted);
    font-size: 13px;
    line-height: 1.4;
  }
  .settings-detail {
    display: flex;
    flex-direction: column;
  }
  .settings-tiles .hint {
    grid-column: 1 / -1;
    margin: 0;
  }
  .theme-choices {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 14px;
  }
  .theme-choice {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px;
    border-radius: 16px;
    border: 1px solid var(--stroke);
    background: var(--card-bg);
    color: var(--text);
    text-align: left;
    cursor: pointer;
    box-shadow: var(--card-shadow);
  }
  .theme-choice.on {
    border-color: var(--accent);
    box-shadow: inset 0 0 0 1px var(--accent), var(--card-shadow);
  }
  .theme-choice .swatch {
    width: 64px;
    height: 44px;
    border-radius: 12px;
    flex: none;
    border: 1px solid rgba(21, 36, 56, 0.12);
  }
  .theme-choice .swatch.dark {
    background: linear-gradient(145deg, #070b14, #1a3a52 70%, #38bdf8);
  }
  .theme-choice .swatch.classic {
    background: linear-gradient(145deg, #f7fbff, #d5e4f2 68%, #0284c7);
  }
  .theme-choice .swatch.e3dc {
    background: linear-gradient(145deg, #1e252b 0 38%, #f7f7f7 38% 72%, #5cc244 72%);
  }
  .theme-choice .txt {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }
  .theme-choice .txt b {
    font-size: 15px;
  }
  .theme-choice .txt span {
    color: var(--muted);
    font-size: 12.5px;
    line-height: 1.35;
  }
  .guide p {
    margin: 0 0 14px;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.5;
  }
  .guide h3 {
    margin: 22px 0 10px;
    font-size: 13px;
    font-weight: 650;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text);
  }
  .guide ol {
    margin: 0 0 16px;
    padding-left: 1.2rem;
    color: var(--text);
    font-size: 14px;
    line-height: 1.5;
  }
  .guide li + li {
    margin-top: 8px;
  }
  .dep {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px;
    margin-top: 8px;
    border-radius: 16px;
    border: 1px solid var(--stroke);
    background: var(--glass);
  }
  .dep b {
    font-size: 14px;
  }
  .dep span {
    color: var(--muted);
    font-size: 13px;
  }
  .guide .btn {
    margin-top: 8px;
  }
  .guide .ok,
  .dep .ok {
    color: var(--ok);
  }
  .guide .bad,
  .dep .bad {
    color: #f87171;
  }
  .classic-action {
    margin-bottom: 18px;
  }
  .classic-action p {
    margin-bottom: 6px;
  }
  .guide details {
    margin-top: 18px;
    padding: 12px 16px;
    border-radius: 16px;
    border: 1px solid var(--stroke);
    background: var(--glass);
  }
  .guide summary {
    cursor: pointer;
    font-weight: 650;
    color: var(--text);
  }
  .guide details[open] summary {
    margin-bottom: 12px;
  }
  .setting-row select,
  .setting-num input {
    border-radius: 10px;
    border: 1px solid var(--stroke-strong);
    background: var(--field);
    color: var(--text);
    font: 600 14px Inter, system-ui, sans-serif;
    padding: 8px 10px;
  }
  .setting-row select {
    max-width: 220px;
  }
  .setting-num {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: none;
  }
  .setting-num input {
    width: 7.5rem;
  }
  .setting-row {
    flex-wrap: wrap;
  }
  .setting-num.range {
    flex: 1 1 180px;
    min-width: 180px;
  }
  .setting-num.range input[type="range"] {
    width: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    accent-color: var(--accent);
  }
  .setting-num.range b {
    min-width: 5.5rem;
    text-align: right;
    font-size: 13px;
    font-weight: 650;
  }
  .setting-num span {
    color: var(--muted);
    font-size: 12px;
  }
  .setting-row .name {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  maestro-setting-tip {
    position: relative;
    display: inline-flex;
    flex: none;
  }
  .info {
    flex: none;
    width: 18px;
    height: 18px;
    padding: 0;
    border-radius: 50%;
    border: 1px solid var(--stroke-strong);
    background: transparent;
    color: var(--muted);
    font: 600 11px/16px Inter, system-ui, sans-serif;
    cursor: pointer;
  }
  .info[aria-expanded="true"] {
    color: var(--accent);
    border-color: var(--accent);
  }
  .tip {
    position: absolute;
    z-index: 30;
    left: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
    width: min(280px, 70vw);
    box-sizing: border-box;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--tip-bg);
    border: 1px solid var(--stroke-strong);
    color: var(--text);
    font: 500 13px/1.45 Inter, system-ui, sans-serif;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
    pointer-events: none;
  }
  .setting-row.locked {
    opacity: 0.7;
  }
  .switch {
    width: 46px;
    height: 28px;
    border-radius: 999px;
    background: var(--switch-track);
    border: 0;
    padding: 0;
    position: relative;
    cursor: pointer;
    transition: background 0.2s;
    flex: none;
  }
  .switch::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fff;
    transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
  .switch.on {
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
  }
  .switch.on::after {
    transform: translateX(18px);
  }
  .switch:disabled {
    opacity: 0.5;
    cursor: default;
  }
  input[type="range"] {
    width: 100%;
    accent-color: var(--accent);
    margin-top: 6px;
  }
  .link {
    display: block;
    margin-top: 18px;
    color: var(--accent);
    font-size: 13px;
    text-decoration: none;
  }
  .sheet-section {
    margin-top: 22px;
    padding-top: 16px;
    border-top: 1px solid var(--stroke);
  }
  .sheet-section h3 {
    margin: 0 0 4px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    color: var(--muted);
  }
  .hint {
    color: var(--muted);
    font-size: 13px;
    line-height: 1.45;
    margin: 12px 0 0;
  }
  .consumer {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    border-radius: 16px;
    background: var(--fill);
    border: 1px solid var(--stroke);
    margin-top: 10px;
  }
  .consumer input,
  .picker input {
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid var(--stroke-strong);
    background: var(--field);
    color: var(--text);
    font: 600 14px Inter, system-ui, sans-serif;
    padding: 8px 10px;
  }
  .consumer .lbl {
    display: block;
    margin-bottom: 4px;
    color: var(--muted);
    font: 600 11px Inter, system-ui, sans-serif;
    letter-spacing: 0.2px;
  }
  .consumer .txt span:not(.lbl),
  .pick span {
    display: block;
    margin-top: 4px;
    color: var(--faint);
    font: 11px ui-monospace, monospace;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .icon-pick {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 4px;
  }
  .icon-pick button {
    height: 36px;
    border-radius: 10px;
    border: 1px solid var(--stroke);
    background: transparent;
    color: var(--muted);
    display: grid;
    place-items: center;
    cursor: pointer;
    padding: 0;
  }
  .icon-pick button.on {
    color: var(--text);
    border-color: var(--accent-line);
    background: var(--accent-wash);
  }
  .icon-pick svg {
    width: 18px;
    height: 18px;
  }
  .seg {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    padding: 3px;
    border-radius: 12px;
    background: var(--field);
  }
  .seg button {
    border: 0;
    border-radius: 9px;
    background: transparent;
    color: var(--muted);
    font: 600 12px Inter, system-ui, sans-serif;
    padding: 8px 6px;
    cursor: pointer;
  }
  .seg button.on {
    background: var(--accent-wash);
    color: var(--text);
  }
  :host([theme="e3dc"]) .seg button.on {
    background: #5cc244;
    color: #ffffff;
  }
  .btn.add,
  .btn.ghost {
    margin-top: 10px;
    width: 100%;
  }
  .btn.ghost {
    background: transparent;
  }
  .picker {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .pick {
    text-align: left;
    border-radius: 12px;
    border: 1px solid var(--stroke);
    background: var(--fill);
    color: var(--text);
    padding: 8px 10px;
    cursor: pointer;
  }
  .pick b {
    display: block;
    font-size: 13px;
    font-weight: 600;
  }

  /* ApexCharts overrides */
  .apexcharts-tooltip.apexcharts-theme-dark,
  .apexcharts-tooltip.apexcharts-theme-light {
    background: var(--tooltip) !important;
    border: 1px solid var(--stroke-strong) !important;
    border-radius: 12px !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4) !important;
  }
  .apexcharts-tooltip-title {
    background: transparent !important;
    border-bottom: 1px solid var(--stroke) !important;
  }
  .apexcharts-xaxistooltip {
    background: var(--tooltip) !important;
    border-color: var(--stroke-strong) !important;
    color: var(--text) !important;
  }

  footer.debug {
    margin-top: 16px;
    color: var(--faint);
    font: 12px ui-monospace, monospace;
  }

  @media (max-width: 960px) {
    .app {
      grid-template-columns: 1fr;
    }
    .rail {
      position: fixed;
      top: auto;
      bottom: 0;
      left: 0;
      right: 0;
      height: auto;
      z-index: 10;
      flex-direction: row;
      justify-content: space-around;
      padding: 8px 6px calc(8px + env(safe-area-inset-bottom));
      border-right: 0;
      border-top: 1px solid var(--stroke);
      background: var(--rail-solid);
    }
    .rail .logo,
    .rail .spacer {
      display: none;
    }
    .nav-btn {
      flex: 1;
      max-width: 84px;
      width: auto;
    }
    main {
      padding: max(16px, env(safe-area-inset-top)) 14px 110px;
    }
    .live-top,
    .plan-top,
    .dec-top {
      grid-template-columns: 1fr;
    }
    .kpis,
    .plant-kpis,
    .stat-row,
    .dec-extra {
      grid-template-columns: repeat(2, 1fr);
    }
    .hero-main {
      grid-template-columns: 1fr;
    }
    .hero-mode b {
      font-size: 32px;
    }
    .pack-meta,
    .budget-row {
      grid-template-columns: 1fr;
    }
    .budget-row b {
      text-align: left;
    }
    .flow-wrap {
      height: auto;
      max-width: 420px;
      margin: 0 auto;
    }
    .pill.hide-sm,
    .topbar .btn span {
      display: none;
    }
    .sheet {
      left: 8px;
      right: 8px;
      width: auto;
      top: auto;
      max-height: 85vh;
      transform: translateY(110%);
    }
    .sheet.open {
      transform: none;
    }
    .phase-name {
      font-size: 28px;
    }
  }
  .opt-entity,
  .opt-action,
  .opt-slot-fields,
  .opt-actions,
  .opt-top {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }
  .opt-choices {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 180px;
    overflow: auto;
    width: 100%;
  }
  .opt-choices button,
  .opt-days button {
    text-align: left;
    border: 1px solid var(--stroke);
    background: var(--glass);
    color: var(--text);
    border-radius: 10px;
    padding: 6px 8px;
    cursor: pointer;
  }
  .opt-days {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .opt-days button.on {
    border-color: var(--accent);
  }
  .opt-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .slot-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    border: 1px solid var(--stroke);
    border-radius: 16px;
    margin-bottom: 10px;
  }
  .opt-slot-fields label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
    color: var(--muted);
  }
  .opt-entity input,
  .opt-action input,
  .opt-slot-fields input,
  .opt-slot-fields select {
    min-width: 0;
  }
`,Ir=[`dark`,`classic`,`e3dc`],Lr=`e3dc-maestro.theme.v1`;function Rr(e){return e===`classic`||e===`e3dc`?e:`dark`}function zr(){try{return Rr(localStorage.getItem(Lr))}catch{return`dark`}}function Br(e){try{localStorage.setItem(Lr,e)}catch{}}var Vr=`e3dc-maestro`,Hr=`custom:e3dc-maestro`,Ur=e=>e instanceof Error?e.message:typeof e==`object`&&e&&`message`in e?String(e.message):String(e),Wr=e=>typeof e==`object`&&e&&`code`in e?String(e.code):void 0,Gr=(e,t)=>e.some(e=>e.toLowerCase().includes(t));function Kr(e){if(!e||typeof e!=`object`)return`empty`;let t=e.strategy;if(t?.type===`custom:e3dc-maestro`)return`ours`;let n=e.views;return Object.keys(e).length===0||Array.isArray(n)&&n.length===0&&!t?`empty`:`foreign`}async function qr(e){try{let t=(await e.callWS({type:`lovelace/resources`})).map(e=>e.url??``);return{mushroom:Gr(t,`mushroom`),apex:Gr(t,`apexcharts-card`)}}catch{return{}}}async function Jr(e){if(!(await e.callWS({type:`lovelace/dashboards/list`})).some(e=>e.url_path===`e3dc-maestro`))return`missing`;try{return Kr(await e.callWS({type:`lovelace/config`,url_path:Vr,force:!1}))}catch(e){if(Wr(e)===`config_not_found`)return`empty`;throw e}}async function Yr(e){let t=await qr(e);try{return{state:await Jr(e),...t}}catch(e){return{state:`error`,error:Ur(e),...t}}}async function Xr(e,t){if(t===`missing`)await e.callWS({type:`lovelace/dashboards/create`,url_path:Vr,title:`E3DC Maestro`,icon:`mdi:battery-charging`,require_admin:!1,show_in_sidebar:!0,mode:`storage`});else if(t!==`empty`)return;await e.callWS({type:`lovelace/config/save`,url_path:Vr,config:{strategy:{type:Hr}}})}var Zr=[`soc_sensor`,`pv_power_sensor`,`house_power_sensor`,`grid_power_sensor`,`battery_power_sensor`],Qr=[`pv_forecast_sensor`,`pv_forecast_today_sensor`,`tomorrow_pv_sensor`],$r=[`wallbox_power_sensor`,`evcc_charging_entity`,`hp_switch_entity`],ei=[`fixed_reserve_enabled`,`seasonal_reserve_enabled`,`adaptive_reserve_enabled`],ti=[`wallbox_enabled`,`evcc_enabled`,`hp_enabled`],ni=e=>!e||e===`unknown`||e===`unavailable`||e===`none`,ri=(e,t)=>{let n=e[t];return typeof n==`string`&&n.includes(`.`)?n:void 0},ii=(e,t)=>{let n=ri(e.options,t);return!!n&&!ni(e.state(n))},ai=e=>{let t=Zr.filter(t=>!ii(e,t)),n=e.options.battery_capacity_kwh;return(typeof n!=`number`||!(n>0))&&t.push(`battery_capacity_kwh`),t},oi=e=>{let t=e.select(`tariff_mode`),n=Number.isFinite(e.number(`fixed_buy_price`)??NaN),r=ii(e,`price_sensor`),i=e.slots>0;return t===`dynamic`?!e.ready&&!r&&!i?`wait`:r||i?`done`:`todo`:t===`fixed`&&n||r||i?`done`:e.ready?`todo`:`wait`},si=(e,t)=>{let n=t.map(t=>e.on(t));if(n.some(e=>e===!0))return!0;if(!n.every(e=>e===void 0))return!1};function ci(e){let t=e.ready?ai(e):[],n=Qr.some(t=>ii(e,t)),r=$r.some(t=>ii(e,t)),i=si(e,ti),a=si(e,ei),o=!ni(e.phase);return[{id:`plant`,status:e.ready?t.length?`todo`:`done`:`wait`,required:!0,area:`plant`,missing:t},{id:`tariff`,status:oi(e),required:!0,area:`tariff`,missing:[]},{id:`forecast`,status:e.ready?n?`done`:`optional`:`wait`,required:!1,area:`pv`,missing:[]},{id:`safety`,status:a===void 0?`wait`:a?`done`:`optional`,required:!1,area:`safety`,missing:[]},{id:`loads`,status:i===!0||r?`done`:!e.ready||i===void 0?`wait`:`optional`,required:!1,area:`loads`,missing:[]},{id:`regulation`,status:e.regulation===void 0?`wait`:e.regulation?`done`:`todo`,required:!0,missing:[]},{id:`run`,status:o?`done`:e.regulation===!1?`todo`:`wait`,required:!0,missing:[],note:o&&e.explanation&&!ni(e.explanation)?e.explanation:void 0}]}var li=e=>e.filter(e=>e.required).every(e=>e.status===`done`),ui=`e3dc-maestro.setup.ack`,di=e=>e===`1`;function fi(){try{return di(localStorage.getItem(ui))}catch{return!1}}function pi(){try{localStorage.setItem(ui,`1`)}catch{}}var z=[`sensor`],B=[`sensor`],V=(e,t,n,r=1)=>({key:e,kind:`number`,min:t,max:n,step:r}),H=(e,t,n=!1)=>({key:e,kind:`entity`,domains:t,required:n}),mi=[{area:`plant`,title:`secSources`,hint:`secSourcesHint`,fields:[V(`battery_capacity_kwh`,1,100,.1),H(`soc_sensor`,z,!0),H(`pv_power_sensor`,z,!0),H(`additional_generation_sensor`,z),H(`house_power_sensor`,z,!0),H(`grid_power_sensor`,z,!0),{key:`grid_power_invert`,kind:`bool`},H(`battery_power_sensor`,z,!0),H(`battery_charged_today_sensor`,B),H(`battery_discharged_today_sensor`,B)]},{area:`safety`,title:`secAdaptive`,hint:`secAdaptiveHint`,fields:[V(`adaptive_reserve_lookback_days`,1,60),V(`adaptive_reserve_min_days`,1,30),V(`adaptive_reserve_safety_factor`,1,3,.1),V(`adaptive_reserve_max_soc`,5,90)]},{area:`tariff`,title:`secPriceSensor`,hint:`secPriceSensorHint`,fields:[H(`price_sensor`,z)]},{area:`pv`,title:`secForecastSensors`,hint:`secForecastSensorsHint`,fields:[H(`pv_forecast_sensor`,z),H(`pv_forecast_today_sensor`,z),H(`tomorrow_pv_sensor`,z),H(`pv_forecast_sensor_day2`,z)]},{area:`loads`,title:`secWallboxWire`,hint:`secWallboxWireHint`,fields:[H(`wallbox_power_sensor`,z),{key:`wallbox_included_in_house`,kind:`bool`},{key:`wallbox_phases`,kind:`select`,choices:[`1`,`3`]},{key:`wallbox_service_on`,kind:`action`},{key:`wallbox_service_off`,kind:`action`}]},{area:`loads`,title:`secEvccWire`,hint:`secEvccWireHint`,fields:[H(`evcc_charging_entity`,[`sensor`,`binary_sensor`,`switch`,`input_boolean`]),H(`evcc_mode_entity`,[`select`,`input_select`,`sensor`]),{key:`evcc_now_value`,kind:`text`}]},{area:`loads`,title:`secHpWire`,hint:`secHpWireHint`,fields:[H(`hp_switch_entity`,[`switch`,`input_boolean`]),{key:`hp_service_on`,kind:`action`},{key:`hp_service_off`,kind:`action`},{key:`hp_time_start`,kind:`time`},{key:`hp_time_end`,kind:`time`}]},{area:`sizing`,title:`secSizingInputs`,hint:`secSizingInputsHint`,fields:[{key:`sizing_pv_energy_sensor`,kind:`entities`,domains:B},H(`sizing_house_energy_sensor`,B),{key:`sizing_house_from_balance`,kind:`bool`},H(`sizing_grid_import_energy_sensor`,B),H(`sizing_grid_export_energy_sensor`,B),H(`sizing_battery_charge_energy_sensor`,B),H(`sizing_battery_discharge_energy_sensor`,B),H(`sizing_wallbox_energy_sensor`,B),H(`sizing_heat_pump_energy_sensor`,B),V(`sizing_analysis_days`,30,730),V(`sizing_electricity_price_eur_kwh`,.05,2,.01),V(`sizing_feed_in_price_eur_kwh`,0,1,.01),V(`sizing_battery_price_eur_kwh`,100,5e3),V(`sizing_pv_price_eur_per_kwp`,200,5e3),V(`sizing_inverter_upgrade_price_eur`,0,2e4),V(`sizing_round_trip_efficiency`,.5,1,.01),V(`sizing_max_battery_sweep_kwh`,5,200,.5),V(`sizing_battery_step_kwh`,.5,10,.5),V(`sizing_max_pv_expansion_kwp`,0,200,.5),V(`sizing_pv_step_kwp`,.5,10,.5)]}],hi={battery_capacity_kwh:{de:`Nutzbare Akkukapazität`,en:`Usable battery capacity`},soc_sensor:{de:`SoC-Sensor`,en:`State-of-charge sensor`},pv_power_sensor:{de:`PV-Leistung`,en:`PV power`},additional_generation_sensor:{de:`Zusätzliche Erzeugung`,en:`Additional generation`},house_power_sensor:{de:`Hausverbrauch`,en:`House power`},grid_power_sensor:{de:`Netzleistung`,en:`Grid power`},grid_power_invert:{de:`Netzleistung invertieren`,en:`Invert grid power`},battery_power_sensor:{de:`Akkuleistung`,en:`Battery power`},battery_charged_today_sensor:{de:`Heute geladen`,en:`Charged today`},battery_discharged_today_sensor:{de:`Heute entladen`,en:`Discharged today`},adaptive_reserve_lookback_days:{de:`Rückblick in Tagen`,en:`Lookback in days`},adaptive_reserve_min_days:{de:`Mindestens Tage mit Daten`,en:`Minimum days of data`},adaptive_reserve_safety_factor:{de:`Sicherheitsfaktor`,en:`Safety factor`},adaptive_reserve_max_soc:{de:`Obergrenze der Reserve`,en:`Reserve ceiling`},price_sensor:{de:`Preis-Sensor`,en:`Price sensor`},pv_forecast_sensor:{de:`Restprognose heute`,en:`Remaining forecast today`},pv_forecast_today_sensor:{de:`Tagesprognose`,en:`Today's forecast`},tomorrow_pv_sensor:{de:`Prognose morgen`,en:`Tomorrow's forecast`},pv_forecast_sensor_day2:{de:`Prognose übermorgen`,en:`Day-after forecast`},wallbox_power_sensor:{de:`Wallbox-Leistung`,en:`Wallbox power`},wallbox_included_in_house:{de:`In der Hauslast enthalten`,en:`Included in house load`},wallbox_phases:{de:`Phasen`,en:`Phases`},wallbox_service_on:{de:`Wallbox einschalten`,en:`Turn wallbox on`},wallbox_service_off:{de:`Wallbox ausschalten`,en:`Turn wallbox off`},evcc_charging_entity:{de:`Lade-Entität`,en:`Charging entity`},evcc_mode_entity:{de:`Modus-Entität`,en:`Mode entity`},evcc_now_value:{de:`Wert für Sofortladen`,en:`Now-mode value`},hp_switch_entity:{de:`Schalter der Wärmepumpe`,en:`Heat-pump switch`},hp_service_on:{de:`Wärmepumpe einschalten`,en:`Turn heat pump on`},hp_service_off:{de:`Wärmepumpe ausschalten`,en:`Turn heat pump off`},hp_time_start:{de:`Frühester Start`,en:`Earliest start`},hp_time_end:{de:`Spätestes Ende`,en:`Latest end`},sizing_pv_energy_sensor:{de:`PV-Energie`,en:`PV energy`},sizing_house_energy_sensor:{de:`Hausenergie`,en:`House energy`},sizing_house_from_balance:{de:`Haus aus der Bilanz rechnen`,en:`Derive house from the balance`},sizing_grid_import_energy_sensor:{de:`Netzbezug`,en:`Grid import`},sizing_grid_export_energy_sensor:{de:`Einspeisung`,en:`Grid export`},sizing_battery_charge_energy_sensor:{de:`Akku geladen`,en:`Battery charged`},sizing_battery_discharge_energy_sensor:{de:`Akku entladen`,en:`Battery discharged`},sizing_wallbox_energy_sensor:{de:`Wallbox-Energie`,en:`Wallbox energy`},sizing_heat_pump_energy_sensor:{de:`Wärmepumpen-Energie`,en:`Heat-pump energy`},sizing_analysis_days:{de:`Analysetage`,en:`Analysis days`},sizing_electricity_price_eur_kwh:{de:`Bezugspreis`,en:`Import price`},sizing_feed_in_price_eur_kwh:{de:`Einspeisepreis`,en:`Feed-in price`},sizing_battery_price_eur_kwh:{de:`Akkupreis`,en:`Battery price`},sizing_pv_price_eur_per_kwp:{de:`PV-Preis`,en:`PV price`},sizing_inverter_upgrade_price_eur:{de:`Wechselrichter-Upgrade`,en:`Inverter upgrade`},sizing_round_trip_efficiency:{de:`Wirkungsgrad`,en:`Round-trip efficiency`},sizing_max_battery_sweep_kwh:{de:`Akku bis`,en:`Battery sweep up to`},sizing_battery_step_kwh:{de:`Akku-Schritt`,en:`Battery step`},sizing_max_pv_expansion_kwp:{de:`PV-Zubau bis`,en:`PV expansion up to`},sizing_pv_step_kwp:{de:`PV-Schritt`,en:`PV step`}},gi=(e,t)=>{let n=hi[t];return n?e.toLowerCase().startsWith(`de`)||!e?n.de:n.en:t},_i=e=>mi.filter(t=>t.area===e);function vi(e,t,n,r=40){let i=new Set(t??[]),a=n.trim().toLowerCase(),o=[];for(let t of e){let e=t.split(`.`)[0];if((!i.size||i.has(e))&&(!a||t.toLowerCase().includes(a))&&(o.push(t),o.length>=r))break}return o}function yi(e){if(!Array.isArray(e))return[];let t=[];for(let n of e){if(!n||typeof n!=`object`)continue;let e=n,r=Array.isArray(e.weekdays)?e.weekdays.filter(e=>typeof e==`number`&&e>=0&&e<=6):[],i=e.class_===`high`||e.class_===`low`||e.class_===`normal`?e.class_:`normal`,a={weekdays:r,start_h:typeof e.start_h==`number`?e.start_h:0,end_h:typeof e.end_h==`number`?e.end_h:24,class_:i};typeof e.min_reserve_soc==`number`&&(a.min_reserve_soc=e.min_reserve_soc),t.push(a)}return t}var bi=()=>({weekdays:[0,1,2,3,4],start_h:6,end_h:22,class_:`high`});function xi(e){if(!e||typeof e!=`object`||Array.isArray(e))return{service:``,entity:``};let t=e,n=typeof t.action==`string`?t.action:typeof t.service==`string`?t.service:``,r=t.target,i=r&&typeof r==`object`&&!Array.isArray(r)?r.entity_id:void 0;return{service:n,entity:typeof i==`string`?i:``}}function Si(e,t){let n=e.trim();if(!n)return null;let r=t.trim();return r?{action:n,target:{entity_id:r}}:{action:n}}function Ci(e,t){return typeof e==`string`&&t.includes(e)?e:typeof e==`number`&&t.includes(String(e))?String(e):t[0]??``}function wi(e){return typeof e==`string`&&/^\d{2}:\d{2}/.test(e)?e.slice(0,5):``}var Ti=[{id:`off`,phases:[`off`],group:`system`,label:`ladderOff`},{id:`force`,phases:[`force_discharge`],group:`system`,label:`ladderForce`},{id:`emergency`,phases:[`emergency`],group:`safety`,label:`ladderEmergency`},{id:`feed`,phases:[`feed_in_limit`],group:`plant`,label:`ladderFeed`},{id:`reserve`,phases:[`reserve_protection`],group:`safety`,label:`ladderReserve`},{id:`evcc`,phases:[`evcc_pause`],group:`loads`,label:`ladderEvcc`},{id:`price`,phases:[`grid_charge`,`grid_hold`],group:`tariff`,label:`ladderPrice`},{id:`ht`,phases:[`ht_protection`],group:`tariff`,label:`ladderHt`},{id:`hold`,phases:[`grid_hold`],group:`tariff`,label:`ladderHold`},{id:`morning`,phases:[`morning_discharge`],group:`loads`,label:`ladderMorning`},{id:`cap`,phases:[`morning_cap`],group:`pv`,label:`ladderCap`},{id:`astro`,phases:[`astro_wait`],group:`pv`,label:`ladderAstro`},{id:`hard`,phases:[`hard_soc_limit`],group:`safety`,label:`ladderHard`},{id:`floor`,phases:[`fast_floor`],group:`pv`,label:`ladderFloor`},{id:`low`,phases:[`corridor`],group:`pv`,label:`ladderLow`},{id:`grid`,phases:[`grid_charge`],group:`tariff`,label:`ladderGrid`},{id:`corridor`,phases:[`corridor`,`pv_delay`],group:`pv`,label:`ladderCorridor`},{id:`spread`,phases:[`spreading`],group:`pv`,label:`ladderSpread`},{id:`curtail`,phases:[`curtailment_guard`],group:`pv`,label:`ladderCurtail`},{id:`idle`,phases:[`idle`],group:`pv`,label:`ladderIdle`}],Ei=[{id:`safety`,label:`ladderBandSafety`,steps:[`off`,`force`,`emergency`,`feed`,`reserve`]},{id:`tariff`,label:`ladderBandTariff`,steps:[`evcc`,`price`,`ht`,`hold`]},{id:`blocks`,label:`ladderBandBlocks`,steps:[`morning`,`cap`,`astro`,`hard`]},{id:`pv`,label:`ladderBandPv`,steps:[`floor`,`low`,`grid`,`corridor`,`spread`]},{id:`rest`,label:`ladderBandRest`,steps:[`curtail`,`idle`]}],Di=new Map(Ti.map(e=>[e.id,e]));function Oi(e,t=!1,n=!1){if(e)return e===`grid_charge`?t?`price`:`grid`:e===`grid_hold`?t?`price`:`hold`:e===`corridor`?n?`low`:`corridor`:Ti.find(t=>t.phases.includes(e))?.id}function ki(e,t,n,r,i){let{t:a}=e,o=Oi(t,n,r);return C`<section class="ladder" aria-label=${a(`ladderTitle`)}>
    <div class="ladder-head">
      <h3>${a(`ladderTitle`)}</h3>
      <p>${a(`ladderHint`)}</p>
    </div>
    ${Ei.map(e=>C`<div class="ladder-band">
      <h4>${a(e.label)}</h4>
      <div class="ladder-steps">
        ${e.steps.map(e=>{let t=Di.get(e);if(!t)return C``;let n=e===o;return C`<button
            type="button"
            class="ladder-step ${n?`on`:``}"
            aria-current=${n?`true`:`false`}
            @click=${()=>i(t.group)}
          >${a(t.label)}</button>`})}
      </div>
    </div>`)}
  </section>`}var Ai=e=>!e||e===`unknown`||e===`unavailable`||e===`none`,ji=e=>{let t=t=>{let n=at[t];return n?e.hass.states[n]:void 0},n=e.hass.states[O.ctrlActive],r=e.hass.states[O.phase]?.state,i=e.hass.states[O.explanation]?.state;return{ready:e.options.ready,options:e.options.options,slots:e.options.slots.length,state:t=>e.hass.states[t]?.state,on:e=>{let n=t(e);if(n&&n.state!==`unavailable`&&n.state!==`unknown`)return M(n)},number:e=>j(t(e)),select:e=>{let n=t(e)?.state;return Ai(n)?void 0:n},phase:Ai(r)?void 0:r,explanation:Ai(i)?void 0:i,regulation:!n||Ai(n.state)?void 0:n.state===`on`}},Mi={plant:{title:`setupPlant`,hint:`setupPlantHint`,done:`setupPlantOk`,open:`setupPlantMissing`},tariff:{title:`setupTariff`,hint:`setupTariffHint`,done:`setupTariffOk`,open:`setupTariffMissing`},forecast:{title:`setupForecast`,hint:`setupForecastHint`,done:`setupForecastOk`,open:`setupForecastOpen`},safety:{title:`setupSafety`,hint:`setupSafetyHint`,done:`setupSafetyOk`,open:`setupSafetyOpen`},loads:{title:`setupLoads`,hint:`setupLoadsHint`,done:`setupLoadsOk`,open:`setupLoadsOpen`},regulation:{title:`setupRegulation`,hint:`setupRegulationHint`,done:`setupRegulationOk`,open:`setupRegulationOff`},run:{title:`setupRun`,hint:`setupRunHint`,done:`setupRunOk`,open:`setupRunOff`}},Ni={done:`✓`,todo:`!`,optional:`·`,wait:`…`},Pi=(e,t)=>{let{t:n}=e.i18n;return t.status===`wait`?t.id===`run`?n(`setupRunWait`):n(`setupStatusWait`):t.status===`done`?t.note??n(Mi[t.id].done):t.id===`plant`&&t.missing.length?n(`setupPlantMissing`,{names:t.missing.map(t=>gi(e.hass.language,t)).join(`, `)}):n(Mi[t.id].open)},Fi=(e,t)=>{let{t:n}=e.i18n,r=Mi[t.id],i=O.ctrlActive,a=e.hass.states[i]?.state===`on`,o=t.id===`regulation`?C`<button
          class="switch ${a?`on`:``}"
          role="switch"
          aria-checked=${a}
          aria-label=${n(r.title)}
          ?disabled=${e.pending.has(i)||!e.hass.states[i]}
          @click=${()=>e.onToggle(i)}
        ></button>`:t.area?C`<button type="button" class="btn" @click=${()=>e.onOpenGroup(t.area)}>${n(`setupOpen`)}</button>`:T;return C`<li class="setup-step ${t.status}">
    <span class="setup-mark ${t.status}" aria-hidden="true">${Ni[t.status]}</span>
    <div>
      <b>${n(r.title)}</b>
      <span class="tag">${n(t.status===`done`?`setupStatusDone`:t.status===`todo`?`setupStatusTodo`:t.status===`optional`?`setupStatusOptional`:`setupStatusWait`)}</span>
      <p>${n(r.hint)}</p>
      <p class="sub">${Pi(e,t)}</p>
    </div>
    ${o}
  </li>`},Ii=(e,t)=>{let{t:n}=e.i18n,r=t.filter(e=>e.required),i=r.filter(e=>e.status===`done`).length;return C`<p class="setup-progress">${n(`setupProgress`,{done:i,total:r.length})}</p>
    ${e.options.error?C`<p class="err">${n(`setupOptionsError`,{err:e.options.error})}</p>`:T}
    <ol class="setup-steps">
      ${t.map(t=>Fi(e,t))}
    </ol>`};function Li(e){return C`<div class="settings-detail">${Ii(e,ci(ji(e)))}</div>`}function Ri(e){let{t}=e.i18n,n=ci(ji(e));return li(n)?e.setupAck?C``:C`<div class="setup-done">
      <button type="button" class="setup-done-open" @click=${()=>e.onOpenGroup(`setup`)}>
        <span class="setup-mark done" aria-hidden="true">✓</span>
        <span><b>${t(`setupDone`)}</b><span>${t(`setupDoneHint`)}</span></span>
      </button>
      <button type="button" class="btn" @click=${()=>e.onAckSetup?.()}>${t(`setupAck`)}</button>
    </div>`:C`<section class="card setup-card" aria-label=${t(`setupTitle`)}>
    <h2>${t(`setupTitle`)}</h2>
    <p class="sub">${t(`setupLead`)}</p>
    ${Ii(e,n)}
  </section>`}var zi=e=>Object.keys(e.states).sort(),Bi=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},Vi=(e,t,n)=>C`<div class="ctrl setting-row ${n?`locked`:``}">
    <div class="txt"><span class="name"><b>${e}</b></span></div>
    ${t}
  </div>`;function Hi(e,t,n){let r=e.options[t.key],i=typeof r==`number`?String(r):``;return C`<label class="setting-num">
    <input
      type="number"
      inputmode="decimal"
      aria-label=${n}
      min=${t.min??T}
      max=${t.max??T}
      step=${t.step??`any`}
      ?disabled=${!e.isAdmin||e.pending.has(t.key)}
      ${qt(e=>{e instanceof HTMLInputElement&&!Bi(e)&&e.value!==i&&(e.value=i)})}
      @change=${n=>{let r=Number.parseFloat(n.target.value);Number.isFinite(r)&&e.onChange(t.key,r)}}
    />
  </label>`}function Ui(e,t,n,r){let i=e.query[t.key]??``,a=i.trim()?vi(zi(e.hass),t.domains,i):[],o=e.options[t.key],s=r&&Array.isArray(o)?o.filter(e=>typeof e==`string`):[],c=!r&&typeof o==`string`?o:``;return C`<div class="opt-entity">
    ${r?C`<div class="opt-chips">
          ${s.map(n=>C`<button type="button" class="chip" ?disabled=${!e.isAdmin} @click=${()=>e.onChange(t.key,s.filter(e=>e!==n))}>${n}</button>`)}
        </div>`:T}
    <input
      type="search"
      aria-label=${n}
      placeholder=${e.i18n.t(`optSearch`)}
      .value=${i||c}
      ?disabled=${!e.isAdmin}
      @input=${n=>e.onQuery(t.key,n.target.value)}
      @change=${n=>{let i=n.target.value.trim();r?(i&&!s.includes(i)&&e.onChange(t.key,[...s,i]),e.onQuery(t.key,``)):(i||!t.required)&&e.onChange(t.key,i||null)}}
    />
    ${a.length?C`<div class="opt-choices">
          ${a.map(n=>C`<button
              type="button"
              ?disabled=${!e.isAdmin}
              @click=${()=>{r?e.onChange(t.key,s.includes(n)?s:[...s,n]):e.onChange(t.key,n),e.onQuery(t.key,``)}}
            >${n}</button>`)}
        </div>`:T}
    ${!t.required&&!r&&c?C`<button type="button" class="btn" ?disabled=${!e.isAdmin} @click=${()=>e.onChange(t.key,null)}>${e.i18n.t(`optClear`)}</button>`:T}
  </div>`}function Wi(e,t){let n=xi(e.options[t.key]),r=(n,r)=>e.onChange(t.key,Si(n,r));return C`<div class="opt-action">
    <input
      aria-label=${e.i18n.t(`optService`)}
      placeholder=${e.i18n.t(`optService`)}
      .value=${n.service}
      ?disabled=${!e.isAdmin}
      @change=${e=>r(e.target.value,n.entity)}
    />
    <input
      aria-label=${e.i18n.t(`optTarget`)}
      placeholder=${e.i18n.t(`optTarget`)}
      .value=${n.entity}
      ?disabled=${!e.isAdmin}
      @change=${e=>r(n.service,e.target.value)}
    />
    <button type="button" class="btn" ?disabled=${!e.isAdmin} @click=${()=>e.onChange(t.key,null)}>${e.i18n.t(`optClear`)}</button>
  </div>`}var Gi=[`wd0`,`wd1`,`wd2`,`wd3`,`wd4`,`wd5`,`wd6`];function Ki(e){let{t}=e.i18n,n=(t,n)=>e.onSlots(e.slots.map((e,r)=>r===t?n:e));return C`<section class="settings-section">
    <h3>${t(`secSlots`)}</h3>
    <p class="sub">${t(`secSlotsHint`)}</p>
    ${e.slots.map((r,i)=>C`<div class="slot-card">
        <div class="opt-days" role="group" aria-label=${t(`optWeekdays`)}>
          ${Gi.map((a,o)=>C`<button
              type="button"
              class=${r.weekdays.includes(o)?`on`:``}
              aria-pressed=${r.weekdays.includes(o)}
              ?disabled=${!e.isAdmin}
              @click=${()=>{let e=r.weekdays.includes(o)?r.weekdays.filter(e=>e!==o):[...r.weekdays,o].sort();n(i,{...r,weekdays:e})}}
            >${t(a)}</button>`)}
        </div>
        <div class="opt-slot-fields">
          <label>${t(`optFrom`)}<input type="number" min="0" max="24" .value=${String(r.start_h)} ?disabled=${!e.isAdmin} @change=${e=>n(i,{...r,start_h:Number(e.target.value)})} /></label>
          <label>${t(`optTo`)}<input type="number" min="0" max="24" .value=${String(r.end_h)} ?disabled=${!e.isAdmin} @change=${e=>n(i,{...r,end_h:Number(e.target.value)})} /></label>
          <label>${t(`optClass`)}
            <select .value=${r.class_} ?disabled=${!e.isAdmin} @change=${e=>n(i,{...r,class_:e.target.value})}>
              <option value="high">${t(`classHigh`)}</option>
              <option value="low">${t(`classLow`)}</option>
              <option value="normal">${t(`classNormal`)}</option>
            </select>
          </label>
          <label>${t(`optReserve`)}
            <input
              type="number"
              min="0"
              max="100"
              .value=${r.min_reserve_soc===void 0?``:String(r.min_reserve_soc)}
              ?disabled=${!e.isAdmin}
              @change=${e=>{let t=e.target.value.trim(),a={...r};t?a.min_reserve_soc=Number(t):delete a.min_reserve_soc,n(i,a)}}
            />
          </label>
          <button type="button" class="btn" ?disabled=${!e.isAdmin} @click=${()=>e.onSlots(e.slots.filter((e,t)=>t!==i))}>${t(`optRemove`)}</button>
        </div>
      </div>`)}
    <div class="opt-actions">
      <button type="button" class="btn" ?disabled=${!e.isAdmin} @click=${()=>e.onSlots([...e.slots,bi()])}>${t(`optAddSlot`)}</button>
      <button type="button" class="btn" ?disabled=${!e.isAdmin||e.pending.has(`tariff_slots`)} @click=${()=>e.onSaveSlots()}>${t(`optSaveSlots`)}</button>
    </div>
  </section>`}function qi(e,t){let n=gi(e.hass.language,t.key),r=!e.isAdmin;if(t.kind===`bool`){let i=e.options[t.key]===!0;return Vi(n,C`<button class="switch ${i?`on`:``}" role="switch" aria-checked=${i} aria-label=${n} ?disabled=${r||e.pending.has(t.key)} @click=${()=>e.onChange(t.key,!i)}></button>`,r)}if(t.kind===`number`)return Vi(n,Hi(e,t,n),r);if(t.kind===`select`){let i=t.choices??[],a=Ci(e.options[t.key],i);return Vi(n,C`<select aria-label=${n} .value=${a} ?disabled=${r} @change=${n=>e.onChange(t.key,n.target.value)}>
        ${i.map(e=>C`<option value=${e} ?selected=${e===a}>${e}</option>`)}
      </select>`,r)}return t.kind===`time`?Vi(n,C`<input type="time" aria-label=${n} .value=${wi(e.options[t.key])} ?disabled=${r} @change=${n=>e.onChange(t.key,n.target.value)} />`,r):t.kind===`text`?Vi(n,C`<input aria-label=${n} .value=${typeof e.options[t.key]==`string`?e.options[t.key]:``} maxlength="64" ?disabled=${r} @change=${n=>e.onChange(t.key,n.target.value)} />`,r):t.kind===`action`?Vi(n,Wi(e,t),r):Vi(n,Ui(e,t,n,t.kind===`entities`),r)}var Ji=e=>!e||e.state===`unknown`||e.state===`unavailable`?`–`:e.state,Yi={recommended_economic:`recEconomicHint`,recommended_technical:`recTechnicalHint`,recommended_balanced:`recBalancedHint`},Xi=(e,t,n)=>typeof t==`number`&&Number.isFinite(t)?t.toLocaleString(e||`de`,{minimumFractionDigits:n,maximumFractionDigits:n}):void 0,Zi=(e,t,n)=>{let r=e.hass.states[O.sizingMatrix]?.attributes[t];if(!r||typeof r!=`object`)return C``;let i=r,a=(t,n,r)=>C`<div class="row"><span>${e.i18n.t(t)}</span><b>${n??`–`}${r}</b></div>`;return C`<div class="card">
    <h3>${e.i18n.t(n)}</h3>
    <p class="sub">${e.i18n.t(Yi[t])}</p>
    <div class="rows">
      ${a(`sizingBattery`,i.battery_kwh,` kWh`)}
      ${a(`sizingPv`,i.pv_kwp,` kWp`)}
      ${a(`sizingAutarky`,i.self_sufficiency_pct,` %`)}
      ${a(`sizingSavings`,i.savings_eur_per_year,` €`)}
      ${a(`sizingPayback`,i.payback_years,` a`)}
    </div>
    ${typeof i.reason==`string`?C`<p class="sub">${i.reason}</p>`:T}
  </div>`},Qi=(e,t)=>{let n=e.hass.language,r=Xi(n,t.slider_battery_kwh,1),i=Xi(n,t.slider_pv_kwp,1),a=Xi(n,t.scenario_self_sufficiency_pct,0),o=Xi(n,t.scenario_savings_eur,0);if(!r||!i||!a||!o)return;let s=Xi(n,t.scenario_payback_years,1);return s?e.i18n.t(`sizingStory`,{bat:r,pv:i,aut:a,save:o,years:s}):e.i18n.t(`sizingStoryOpen`,{bat:r,pv:i,aut:a,save:o})};function $i(e,t,n){let{t:r}=e.i18n,i=e.hass.states[O.sizingStatus]?.state,a=r(i===`running`?`sizingRunning`:i===`ready`?`sizingReady`:`sizingNotRun`),o=e.hass.states[O.sizingScenario]?.attributes??{},s=e.hass.states[O.sizingMatrix]?.attributes??{},c=Array.isArray(s.top_savings_scenarios)?s.top_savings_scenarios:[],l=e=>typeof e==`number`&&Number.isFinite(e)?String(e):`–`,u=Qi(e,o);return C`<div class="settings-detail">
    <section class="settings-section">
      <p class="sub">${r(`sizingLead`)}</p>
    </section>
    <section class="settings-section">
      <h3>${r(`sizingAdd`)}</h3>
      <p class="sub">${r(`sizingAddHint`)}</p>
      ${t}
    </section>
    <section class="settings-section">
      <div class="opt-actions">
        <button type="button" class="btn" ?disabled=${!e.hass.states[O.btnSizing]||i===`running`} @click=${()=>e.onRunSizing()}>${r(`sizingRun`)}</button>
        <span class="hint">${a}</span>
      </div>
    </section>
    <section class="settings-section">
      <h3>${r(`sizingScenario`)}</h3>
      <p class="sub">${u??r(`sizingNeedRun`)}</p>
      ${(()=>{let t=vn(o.scenario_monthly_avoided_kwh),n=vn(o.scenario_monthly_baseline_grid_in);return!t||!n?T:C`<maestro-chart .options=${R(`sizing-year`,[e.hass.language,t.join(`,`),n.join(`,`)],()=>yn(e.hass.language,t,n,r(`sizingChartAvoided`),r(`sizingChartBaseline`)))}></maestro-chart>
          <p class="hint">${r(`sizingChartCaption`)}</p>`})()}
      ${u?C`<div class="rows">
            <div class="row"><span>${r(`sizingAutarky`)}</span><b>${l(o.scenario_self_sufficiency_pct)} %</b></div>
            <div class="row"><span>${r(`sizingAvoided`)}</span><b>${l(o.scenario_avoided_kwh)} kWh</b></div>
            <div class="row"><span>${r(`sizingSavings`)}</span><b>${l(o.scenario_savings_eur)} €</b></div>
            <div class="row"><span>${r(`sizingInvestment`)}</span><b>${l(o.scenario_investment_eur)} €</b></div>
            <div class="row"><span>${r(`sizingPayback`)}</span><b>${l(o.scenario_payback_years)} a</b></div>
            <div class="row"><span>${r(`sizingInverter`)}</span><b>${Ji(e.hass.states[O.sizingInverter])}</b></div>
          </div>`:T}
    </section>
    <section class="settings-section">
      <h3>${r(`sizingRecs`)}</h3>
      <p class="sub">${r(`sizingRecsHint`)}</p>
      <div class="grid">${Zi(e,`recommended_economic`,`recEconomic`)}${Zi(e,`recommended_technical`,`recTechnical`)}${Zi(e,`recommended_balanced`,`recBalanced`)}</div>
      <div class="rows">
        <div class="row"><span>${r(`matrixDays`)}</span><b>${l(s.analysis_days)}</b></div>
        <div class="row"><span>${r(`matrixRecords`)}</span><b>${l(s.records_count)}</b></div>
        <div class="row"><span>${r(`matrixAnomaly`)}</span><b>${l(s.anomaly_rate_pct)} %</b></div>
        <div class="row"><span>${r(`sizingBaseline`)}</span><b>${l(s.baseline_grid_import_kwh)} kWh</b></div>
      </div>
      ${c.length?C`<div class="opt-top">
            ${c.map(e=>C`<div class="row"><span>${l(e.b)} kWh · ${l(e.p)} kWp</span><b>${l(e.savings)} €</b></div>`)}
          </div>`:T}
    </section>
    <section class="settings-section">
      <h3>${r(`sizingBasis`)}</h3>
      <p class="sub">${r(`sizingBasisHint`)}</p>
      ${n}
    </section>
    ${ea(e,`sizing`)}
  </div>`}function ea(e,t){let n=_i(t);if(!n.length&&t!==`tariff`)return C``;let{t:r}=e.i18n;return C`${e.notice?C`<p class="hint">${e.notice===`reload`?r(`optReload`):r(`optSaved`)}</p>`:T}
    ${e.error?C`<p class="err">${e.error}</p>`:T}
    ${e.isAdmin?T:C`<p class="hint">${r(`optAdmin`)}</p>`}
    ${n.map(t=>C`<section class="settings-section">
        <h3>${r(t.title)}</h3>
        <p class="sub">${r(t.hint)}</p>
        ${t.fields.map(t=>qi(e,t))}
      </section>`)}
    ${t===`tariff`?Ki(e):T}`}var ta={inverter_power:{de:`Leistung des Wechselrichters. Begrenzt, wie stark Maestro den Akku entladen darf.`,en:`Inverter power. Caps how hard Maestro may discharge the battery.`},installed_kwp:{de:`Installierte PV-Leistung. Daraus vergleicht Maestro den Tagesertrag.`,en:`Installed PV power. Maestro compares the day's yield against this.`},max_charge_power:{de:`Höchste Ladeleistung, die Maestro anfordern darf.`,en:`Highest charge power Maestro may request.`},min_charge_power:{de:`Unter dieser Leistung startet Maestro keine Ladung.`,en:`Maestro does not start charging below this power.`},feed_in_limit_percent:{de:`Anteil der Wechselrichterleistung, der höchstens ins Netz gehen darf.`,en:`Share of inverter power that may be exported at most.`},charge_threshold:{de:`Ab diesem SoC beginnt das gezielte Laden zum Tagesziel.`,en:`Targeted charging towards the daily goal starts at this SoC.`},advanced_corridor:{de:`Statt einer Schwelle gilt ein SoC-Band zwischen unterem und oberem Korridor.`,en:`A SoC band between the lower and upper corridor replaces a single threshold.`},lower_corridor:{de:`Untergrenze des Ladebands. Darunter wird nachgeladen.`,en:`Bottom of the charge band. Below it, Maestro charges again.`},upper_corridor:{de:`Obergrenze des Ladebands. Darüber stoppt die gezielte Ladung.`,en:`Top of the charge band. Targeted charging stops above it.`},charge_target:{de:`SoC, den der Akku bis zum Ladeende erreichen soll.`,en:`SoC the battery should reach by the end of charging.`},winter_minimum_hour:{de:`Früheste Stunde, zu der das Ladeende im Winter liegen darf.`,en:`Earliest hour the charge window may end in winter.`},summer_maximum_hour:{de:`Späteste Stunde, zu der das Ladeende im Sommer liegen darf.`,en:`Latest hour the charge window may end in summer.`},summer_charge_end:{de:`SoC-Ziel für das Sommer-Ladeende.`,en:`SoC target for the summer end of charging.`},hard_soc_limit_enabled:{de:`Harter Deckel: darüber lädt Maestro den Akku nicht weiter.`,en:`Hard cap: Maestro will not charge the battery above it.`},hard_soc_limit:{de:`SoC, der mit dem harten Deckel nicht überschritten wird.`,en:`SoC the hard cap will not go past.`},fast_charge_floor_enabled:{de:`Unter dem Boden lädt Maestro mit voller Leistung, unabhängig vom Korridor.`,en:`Below the floor Maestro charges at full power, ignoring the corridor.`},fast_charge_floor_soc:{de:`SoC, unter dem die Schnellladung greift.`,en:`SoC below which fast charging applies.`},forward_looking_enabled:{de:`Plant die Ladung aus dem erwarteten Verbrauch der nächsten Stunden.`,en:`Plans charging from the expected consumption of the next hours.`},forward_looking_max_soc:{de:`Obergrenze für die vorausschauende Ladung.`,en:`Cap for look-ahead charging.`},pv_forecast_enabled:{de:`Verschiebt die Ladung, wenn die PV-Prognose den Bedarf deckt.`,en:`Delays charging when the PV forecast covers the need.`},delay_min_soc:{de:`Nur oberhalb dieses SoC darf die Prognose die Ladung verzögern.`,en:`The forecast may delay charging only above this SoC.`},pv_forecast_threshold_kwh:{de:`Ab dieser prognostizierten Energiemenge gilt der Tag als ergiebig genug.`,en:`From this forecast energy the day counts as productive enough.`},pv_forecast_safety_factor:{de:`Die Prognose wird um diesen Faktor vorsichtiger gerechnet.`,en:`The forecast is treated this much more cautiously.`},astro_enabled:{de:`Richtet Ladestart und Ladeende an Sonnenauf- und Untergang aus.`,en:`Aligns charge start and end with sunrise and sunset.`},charge_start_sunrise_offset_h:{de:`Stunden nach Sonnenaufgang, ab denen geladen werden darf.`,en:`Hours after sunrise before charging may start.`},charge_end_sunset_offset_h:{de:`Stunden vor Sonnenuntergang, zu denen das Ladeende liegen soll.`,en:`Hours before sunset when charging should finish.`},morning_cap_enabled:{de:`Hält den SoC am Morgen unter einer Grenze, damit PV-Ertrag noch hineinpasst.`,en:`Keeps the morning SoC under a limit so PV yield still fits.`},morning_cap_soc:{de:`SoC, den der Morning-Cap am Morgen nicht überschreitet.`,en:`SoC the morning cap will not exceed.`},morning_cap_until_h:{de:`Lokale Stunde, bis zu der der Morning-Cap gilt.`,en:`Local hour until which the morning cap applies.`},gentle_charge_enabled:{de:`Lädt mit einem Bruchteil der möglichen Leistung, schonender für den Akku.`,en:`Charges at a fraction of the possible power, easier on the battery.`},gentle_charge_factor:{de:`Anteil der Ladeleistung im Schonmodus. 0,5 ist die Hälfte.`,en:`Share of charge power in gentle mode. 0.5 is half.`},spreading_enabled:{de:`Verteilt die Ladung über das Fenster, statt in einem Rutsch voll zu laden.`,en:`Spreads charging across the window instead of one full burst.`},spreading_target_soc:{de:`SoC, auf den die verteilte Ladung hinsteuert.`,en:`SoC the spread charging aims for.`},low_yield_priority_enabled:{de:`An ertragsarmen Tagen wird der Akku früher und höher geladen.`,en:`On low-yield days the battery is charged earlier and higher.`},low_yield_threshold:{de:`Unter diesem Anteil der Referenz gilt der Tag als ertragsarm.`,en:`Below this share of the reference the day counts as low yield.`},low_yield_reference_kwh:{de:`Feste Tagesreferenz in kWh. 0 übernimmt den automatischen Wert.`,en:`Fixed daily reference in kWh. 0 uses the automatic value.`},low_yield_reference_kwh_per_kwp:{de:`Erwartete kWh pro installiertem kWp für die automatische Referenz.`,en:`Expected kWh per installed kWp for the automatic reference.`},curtailment_guard_enabled:{de:`Lädt den Akku, sobald die Einspeisung an der Abregelgrenze kratzt.`,en:`Charges the battery once export nears the curtailment limit.`},curtailment_activation_w:{de:`Einspeiseleistung, ab der der Abregelschutz die Ladung startet.`,en:`Export power at which curtailment protection starts charging.`},curtailment_release_w:{de:`Unter dieser Einspeisung lässt der Abregelschutz wieder los.`,en:`Below this export, curtailment protection lets go again.`},two_tier_enabled:{de:`Lädt erst auf ein frühes Ziel und hebt es später am Tag an.`,en:`Charges to an early target first and raises it later in the day.`},charge_target_late:{de:`Höheres SoC-Ziel für den späteren Teil des Tages.`,en:`Higher SoC target for the later part of the day.`},late_charge_end_h:{de:`Stunde, ab der das spätere Ziel gilt.`,en:`Hour from which the later target applies.`},lower_corridor_pause_enabled:{de:`Pausiert die Mindestladung, solange der SoC im unteren Korridor liegt.`,en:`Pauses minimum charging while the SoC sits in the lower corridor.`},tariff_mode:{de:`Fest rechnet mit dem Bezugspreis. Dynamisch nutzt den Preis-Sensor.`,en:`Fixed uses the buy price. Dynamic uses the price sensor.`},dynamic_tariff_enabled:{de:`Schaltet die Auswertung des dynamischen Preises ein.`,en:`Turns evaluation of the dynamic price on.`},fixed_buy_price:{de:`Bezugspreis bei festem Tarif, in Euro pro kWh.`,en:`Buy price on a fixed tariff, in euros per kWh.`},feed_in_price:{de:`Vergütung pro eingespeister kWh. Der Preisplan rechnet sie gegen den Bezug.`,en:`Payment per exported kWh. The price plan weighs it against buying.`},battery_capex_eur:{de:`Anschaffungskosten des Akkus. Daraus rechnet der Preisplan den Verschleiß pro kWh.`,en:`Battery purchase cost. The price plan turns it into wear per kWh.`},battery_total_cycles:{de:`Erwartete Lebensdauer in Zyklen. Mehr Zyklen bedeuten weniger Verschleiß pro kWh.`,en:`Expected lifetime in cycles. More cycles mean less wear per kWh.`},cheap_threshold:{de:`Bis zu diesem Preis pro kWh gilt der Strom als günstig.`,en:`Up to this price per kWh the electricity counts as cheap.`},max_grid_charge_kwh:{de:`Höchstens so viele kWh darf Maestro an einem Tag aus dem Netz laden.`,en:`Maestro may charge at most this many kWh from the grid in one day.`},low_slot_grid_charge_enabled:{de:`Lädt im günstigen Zeitfenster aktiv aus dem Netz, nicht nur per Preisplan.`,en:`Actively charges from the grid in the cheap window, not only via the price plan.`},low_slot_target_soc:{de:`SoC, bis zu dem im günstigen Fenster aus dem Netz geladen wird.`,en:`SoC up to which the cheap window charges from the grid.`},low_slot_forecast_based:{de:`Die Lademenge folgt der Prognose. Das Ziel ist dann nur die Obergrenze.`,en:`The amount follows the forecast. The target is then only a cap.`},low_slot_hold_discharge:{de:`Sperrt die Entladung, sobald das Ziel im günstigen Fenster erreicht ist.`,en:`Blocks discharge once the cheap-window target is reached.`},price_plan_enabled:{de:`Berechnet den Plan und zeigt ihn. Der Akku wird davon noch nicht gesteuert.`,en:`Calculates the plan and shows it. It does not control the battery yet.`},price_plan_active:{de:`Setzt den Plan um: Netzladung in günstigen Slots und Halten der Entladung.`,en:`Executes the plan: grid charging in cheap slots and holding discharge.`},price_plan_max_soc:{de:`Der Plan lädt aus dem Netz höchstens bis zu diesem SoC.`,en:`The plan charges from the grid only up to this SoC.`},price_plan_min_spread:{de:`Mindestabstand zwischen günstigem und teurem Preis, damit sich Netzladung lohnt.`,en:`Minimum gap between cheap and expensive price for grid charging to pay off.`},price_plan_efficiency:{de:`Wirkungsgrad des Umwegs über den Akku. 0,9 heißt: 10 Prozent gehen verloren.`,en:`Round-trip efficiency. 0.9 means 10 percent is lost.`},price_plan_safety_factor:{de:`Der Plan rechnet den Verbrauch um diesen Faktor höher, damit der Akku nicht leerläuft.`,en:`The plan assumes consumption this much higher so the battery does not run empty.`},ht_enabled:{de:`Schützt den SoC im Hochtarif-Fenster vor Entladung.`,en:`Protects the SoC from discharge during the high-tariff window.`},ht_sat:{de:`Der Hochtarif-Schutz gilt auch am Samstag.`,en:`High-tariff protection also applies on Saturday.`},ht_sun:{de:`Der Hochtarif-Schutz gilt auch am Sonntag.`,en:`High-tariff protection also applies on Sunday.`},ht_on:{de:`Stunde, ab der das Hochtarif-Fenster gilt.`,en:`Hour when the high-tariff window starts.`},ht_off:{de:`Stunde, ab der das Hochtarif-Fenster endet.`,en:`Hour when the high-tariff window ends.`},ht_min:{de:`SoC, der im Hochtarif im Winter nicht unterschritten wird.`,en:`SoC that winter high-tariff hours will not go below.`},ht_sockel:{de:`SoC-Sockel zur Tag-und-Nacht-Gleiche, zwischen Winter- und Sommerwert.`,en:`SoC floor at the equinox, between the winter and summer values.`},seasonal_reserve_enabled:{de:`Die Notstromreserve folgt der Jahreszeit, höher im Winter, niedriger im Sommer.`,en:`The backup reserve follows the season, higher in winter, lower in summer.`},reserve_winter_percent:{de:`Notstromreserve zur Wintersonnenwende.`,en:`Backup reserve at the winter solstice.`},reserve_equinox_percent:{de:`Notstromreserve zur Tag-und-Nacht-Gleiche.`,en:`Backup reserve at the equinox.`},fixed_reserve_enabled:{de:`Ersetzt die saisonale Reserve durch einen festen SoC und lädt darunter aus dem Netz.`,en:`Replaces the seasonal reserve with a fixed SoC and charges from the grid below it.`},fixed_reserve_soc:{de:`Fester SoC der Notstromreserve. Darunter ist die Entladung gesperrt.`,en:`Fixed backup SoC. Discharge is blocked below it.`},adaptive_reserve_enabled:{de:`Hebt die Reserve anhand des Verbrauchs der letzten Tage an.`,en:`Raises the reserve from the consumption of recent days.`},evcc_enabled:{de:`Begrenzt die Entladung, während EVCC das Auto im Now-Modus lädt.`,en:`Limits discharge while EVCC charges the car in now mode.`},evcc_discharge_limit_w:{de:`Höchste Entladung in Watt, solange EVCC im Now-Modus lädt.`,en:`Highest discharge in watts while EVCC charges in now mode.`},wallbox_enabled:{de:`Maestro steuert den Ladestrom der Wallbox nach Überschuss.`,en:`Maestro controls the wallbox current from surplus.`},wallbox_type:{de:`Welche Wallbox Maestro anspricht. Die Leistungswerte hängen davon ab.`,en:`Which wallbox Maestro talks to. The power figures depend on it.`},wallbox_min_current:{de:`Niedrigster Ladestrom. Darunter schaltet Maestro die Wallbox aus.`,en:`Lowest charge current. Below it Maestro switches the wallbox off.`},wallbox_max_current:{de:`Höchster Ladestrom, den Maestro der Wallbox gibt.`,en:`Highest charge current Maestro gives the wallbox.`},wallbox_min_surplus:{de:`Überschuss, ab dem die Wallbox laden darf.`,en:`Surplus from which the wallbox may charge.`},wallbox_discharge_guard_enabled:{de:`Stoppt die Wallbox, wenn der Akku dafür zu stark entladen würde.`,en:`Stops the wallbox when it would discharge the battery too hard.`},wallbox_discharge_guard_threshold_w:{de:`Ab dieser Akku-Entladung greift der Netzschutz der Wallbox.`,en:`Wallbox grid protection starts at this battery discharge.`},hp_enabled:{de:`Gibt die Wärmepumpe nur bei Überschuss und passendem Preis frei.`,en:`Releases the heat pump only with surplus and a suitable price.`},hp_min_surplus:{de:`Überschuss, ab dem die Wärmepumpe laufen darf.`,en:`Surplus from which the heat pump may run.`},hp_max_price:{de:`Über diesem Strompreis bleibt die Wärmepumpe aus.`,en:`Above this electricity price the heat pump stays off.`},hp_min_run_minutes:{de:`Mindestlaufzeit, damit die Wärmepumpe nicht taktet.`,en:`Minimum runtime so the heat pump does not short-cycle.`},hp_min_pause_minutes:{de:`Mindestpause zwischen zwei Läufen der Wärmepumpe.`,en:`Minimum pause between two heat-pump runs.`},morning_discharge_mode:{de:`Wie der Akku vor dem PV-Tag geleert wird: aus, fest oder nach Preis.`,en:`How the battery is emptied before the PV day: off, fixed, or by price.`},morning_unload_soc:{de:`SoC, auf den die Vorentladung am Morgen hinuntergeht.`,en:`SoC the morning pre-discharge goes down to.`},morning_unload_start_soc:{de:`Erst oberhalb dieses SoC startet die Vorentladung.`,en:`Pre-discharge starts only above this SoC.`},pre_discharge_offset_h:{de:`Stunden vor dem Ladestart, ab denen vorentladen wird.`,en:`Hours before charge start when pre-discharge may begin.`},pre_discharge_max_power_w:{de:`Höchste Leistung der Vorentladung.`,en:`Highest power of the pre-discharge.`},pre_discharge_tibber_auto:{de:`Entlädt morgens nur, wenn der Strompreis unter der Tibber-Schwelle liegt.`,en:`Discharges in the morning only when the price is under the Tibber threshold.`},morning_grid_export_threshold:{de:`Unter diesem Preis darf die Vorentladung ins Netz gehen.`,en:`Below this price the pre-discharge may export to the grid.`},regelung_aktiv:{de:`Hauptschalter. Aus heißt: Maestro sendet keine Limits mehr.`,en:`Master switch. Off means Maestro stops sending limits.`},auto_mode_enabled:{de:`Rechnet einmal täglich passende Regelparameter aus dem Verbrauchs- und PV-Verlauf aus. Braucht mindestens 7 Tage Daten.`,en:`Works out fitting control parameters once a day from consumption and PV history. Needs at least 7 days of data.`},auto_mode_objective:{de:`Worauf die Auto-Optimierung achtet: Eigenverbrauch, Kosten oder CO₂.`,en:`What the auto optimisation aims for: self-consumption, cost or CO₂.`},force_discharge:{de:`Entlädt den Akku mit der eingestellten Leistung, unabhängig vom Plan.`,en:`Discharges the battery at the set power, ignoring the plan.`},force_discharge_power_w:{de:`Leistung der erzwungenen Entladung in Watt.`,en:`Power of the forced discharge in watts.`},soc_hysteresis_percent:{de:`SoC-Änderung, die Maestro ignoriert, damit die Regelung nicht pendelt.`,en:`SoC change Maestro ignores so control does not hunt.`},charge_ramp_w_per_cycle:{de:`Wie schnell die Ladeleistung pro Takt ansteigen darf.`,en:`How fast charge power may rise per cycle.`},update_interval:{de:`Sekunden zwischen zwei Regel-Durchläufen.`,en:`Seconds between two control cycles.`},watchdog_timeout:{de:`Nach diesen Sekunden ohne Kontakt hebt der Wechselrichter die Limits auf.`,en:`After these seconds without contact the inverter clears the limits.`},debug:{de:`Schreibt ausführliche Regelentscheidungen ins Log.`,en:`Writes detailed control decisions to the log.`},reset_stats:{de:`Setzt die Tageszähler zurück. Die Regelung selbst bleibt, wie sie ist.`,en:`Resets the daily counters. Control itself stays as it is.`},clear_limits:{de:`Hebt die gesetzten Lade- und Entladelimits am Wechselrichter sofort auf.`,en:`Clears the charge and discharge limits on the inverter immediately.`}},na=(e,t)=>{let n=ta[t];if(n)return e.toLowerCase().startsWith(`de`)?n.de:n.en},ra,ia=new Set,aa=class extends Ve{constructor(...e){super(...e),this.text=``,this.label=`Hilfe`,this.open=!1,this.onOutside=e=>{e.composedPath().includes(this)||this.close()},this.onKey=e=>{e.key===`Escape`&&this.close()}}createRenderRoot(){return this}disconnectedCallback(){super.disconnectedCallback(),this.close()}toggle(e){if(e.preventDefault(),e.stopPropagation(),this.open)this.close();else{for(let e of ia)e!==this&&e.close();this.open=!0,ia.add(this),this.requestUpdate(),window.addEventListener(`pointerdown`,this.onOutside,!0),window.addEventListener(`keydown`,this.onKey)}}close(){window.removeEventListener(`pointerdown`,this.onOutside,!0),window.removeEventListener(`keydown`,this.onKey),ia.delete(this),this.open&&(this.open=!1,this.requestUpdate())}updated(){let e=this.querySelector(`.tip`);if(!(e instanceof HTMLElement))return;let t=this.getRootNode(),n=t instanceof ShadowRoot?t.host.getBoundingClientRect():{left:0,right:window.innerWidth,width:window.innerWidth};e.style.width=`${Math.min(280,n.width-24)}px`,e.style.transform=`translateY(-50%)`;let r=e.getBoundingClientRect(),i=0;r.right>n.right-12&&(i=n.right-12-r.right),r.left+i<n.left+12&&(i=n.left+12-r.left),e.style.transform=`translate(${i}px, -50%)`}render(){return C`<button
        type="button"
        class="info"
        aria-label=${this.label}
        aria-expanded=${this.open}
        @click=${this.toggle}
      >i</button>
      ${this.open?C`<div class="tip" role="tooltip">${this.text}</div>`:T}`}};ra=aa,ra.properties={text:{type:String},label:{type:String}},customElements.get(`maestro-setting-tip`)||customElements.define(`maestro-setting-tip`,aa);var oa=(e,t,n,r,i)=>({id:e,title:t,hint:n,icon:r,sections:i,rows:i.flatMap(e=>e.rows)}),U=(e,t,n)=>({title:e,hint:t,rows:n}),sa=[oa(`plant`,`setPlant`,`setPlantHint`,`<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/>`,[U(`secPlantPower`,`secPlantPowerHint`,[`inverter_power`,`installed_kwp`,`max_charge_power`,`min_charge_power`,`feed_in_limit_percent`])]),oa(`safety`,`setSafety`,`setSafetyHint`,`<path d="M12 3 5 6v6c0 4.5 3 7 7 9 4-2 7-4.5 7-9V6z"/>`,[U(`secEmergency`,`secEmergencyHint`,[`charge_threshold`]),U(`secReserve`,`secReserveHint`,[`fixed_reserve_enabled`,`fixed_reserve_soc`,`seasonal_reserve_enabled`,`reserve_winter_percent`,`reserve_equinox_percent`,`adaptive_reserve_enabled`]),U(`secHard`,`secHardHint`,[`hard_soc_limit_enabled`,`hard_soc_limit`]),U(`secWatchdog`,`secWatchdogHint`,[`watchdog_timeout`])]),oa(`tariff`,`setTariff`,`setTariffHint`,`<path d="M12 3v18"/><path d="M16 7.5A3.2 3.2 0 0 0 12.8 5H10a2.8 2.8 0 0 0 0 5.6h4a2.8 2.8 0 0 1 0 5.6H9.5A3.2 3.2 0 0 1 7 13.5"/>`,[U(`secPrices`,`secPricesHint`,[`tariff_mode`,`dynamic_tariff_enabled`,`fixed_buy_price`,`feed_in_price`,`battery_capex_eur`,`battery_total_cycles`,`cheap_threshold`]),U(`secGridCharge`,`secGridChargeHint`,[`max_grid_charge_kwh`,`low_slot_grid_charge_enabled`,`low_slot_target_soc`,`low_slot_forecast_based`,`low_slot_hold_discharge`]),U(`secPlan`,`secPlanHint`,[`price_plan_enabled`,`price_plan_active`,`price_plan_max_soc`,`price_plan_min_spread`,`price_plan_efficiency`,`price_plan_safety_factor`]),U(`secHt`,`secHtHint`,[`ht_enabled`,`ht_on`,`ht_off`,`ht_min`,`ht_sockel`,`ht_sat`,`ht_sun`])]),oa(`pv`,`setPv`,`setPvHint`,`<circle cx="12" cy="12" r="3.5"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>`,[U(`secCorridor`,`secCorridorHint`,[`charge_target`,`advanced_corridor`,`lower_corridor`,`upper_corridor`,`winter_minimum_hour`,`summer_maximum_hour`,`summer_charge_end`,`lower_corridor_pause_enabled`]),U(`secForecast`,`secForecastHint`,[`pv_forecast_enabled`,`delay_min_soc`,`pv_forecast_threshold_kwh`,`pv_forecast_safety_factor`,`forward_looking_enabled`,`forward_looking_max_soc`]),U(`secWindows`,`secWindowsHint`,[`astro_enabled`,`charge_start_sunrise_offset_h`,`charge_end_sunset_offset_h`,`morning_cap_enabled`,`morning_cap_soc`,`morning_cap_until_h`]),U(`secShape`,`secShapeHint`,[`fast_charge_floor_enabled`,`fast_charge_floor_soc`,`spreading_enabled`,`spreading_target_soc`,`gentle_charge_enabled`,`gentle_charge_factor`,`two_tier_enabled`,`charge_target_late`,`late_charge_end_h`]),U(`secYield`,`secYieldHint`,[`low_yield_priority_enabled`,`low_yield_threshold`,`low_yield_reference_kwh`,`low_yield_reference_kwh_per_kwp`,`curtailment_guard_enabled`,`curtailment_activation_w`,`curtailment_release_w`])]),oa(`loads`,`setLoads`,`setLoadsHint`,`<path d="M9 7v4M15 7v4"/><path d="M8 11h8v2a4 4 0 0 1-8 0z"/><path d="M12 17v3"/>`,[U(`secWallbox`,`secWallboxHint`,[`wallbox_enabled`,`wallbox_type`,`wallbox_min_current`,`wallbox_max_current`,`wallbox_min_surplus`,`wallbox_discharge_guard_enabled`,`wallbox_discharge_guard_threshold_w`]),U(`secEvcc`,`secEvccHint`,[`evcc_enabled`,`evcc_discharge_limit_w`]),U(`secHp`,`secHpHint`,[`hp_enabled`,`hp_min_surplus`,`hp_max_price`,`hp_min_run_minutes`,`hp_min_pause_minutes`]),U(`secMorning`,`secMorningHint`,[`morning_discharge_mode`,`morning_unload_soc`,`morning_unload_start_soc`,`pre_discharge_offset_h`,`pre_discharge_max_power_w`,`pre_discharge_tibber_auto`,`morning_grid_export_threshold`])]),oa(`auto`,`setAuto`,`setAutoHint`,`<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="3"/>`,[U(`secAuto`,`secAutoHint`,[`auto_mode_enabled`,`auto_mode_objective`])]),oa(`system`,`setSystem`,`setSystemHint`,`<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>`,[U(`secRun`,`secRunHint`,[`regelung_aktiv`,`force_discharge`,`force_discharge_power_w`]),U(`secPace`,`secPaceHint`,[`soc_hysteresis_percent`,`charge_ramp_w_per_cycle`,`update_interval`]),U(`secDiag`,`secDiagHint`,[`debug`,`reset_stats`,`clear_limits`])])],ca={hardware:`plant`,corridor:`pv`,windows:`pv`,yield:`pv`,reserve:`safety`,flex:`loads`,control:`system`,diag:`system`},la={reset_stats:`confirmReset`},W={id:`classic`,title:`setClassic`,hint:`setClassicHint`,icon:`<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>`},G={id:`look`,title:`setLook`,hint:`setLookHint`,icon:`<circle cx="12" cy="12" r="4"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6"/>`},K={id:`setup`,title:`setSetup`,hint:`setSetupHint`,icon:`<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>`},ua={id:`sizing`,title:`setSizing`,hint:`setSizingHint`,icon:`<path d="M4 19V5M4 19h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>`},da=[`sizing_hypothetical_battery_kwh`,`sizing_hypothetical_pv_kwp`],fa=[`sizing_price_battery_kwh`,`sizing_price_pv_kwp`,`sizing_price_inverter`,`sizing_price_extra`],pa=e=>e===W.id||e===G.id||e===ua.id||e===K.id||sa.some(t=>t.id===e);function ma(e){if(!e)return;let t=ca[e]??e;return pa(t)?t:void 0}var ha=e=>e===W.id?W:e===G.id?G:e===ua.id?ua:e===K.id?K:sa.find(t=>t.id===e),ga=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},_a=(e,t)=>{let n=e?.attributes.friendly_name;return typeof n==`string`&&n.trim()?n.trim():t},va=e=>{let t=e?.attributes.unit_of_measurement;return typeof t==`string`?t:``},ya=(e,t)=>{let n=e?.attributes[t];return typeof n==`number`&&Number.isFinite(n)?n:void 0};function ba(e,t,n,r){let i=e.hass.states[t],a=M(i);return C`<button
    class="switch ${a?`on`:``}"
    role="switch"
    aria-checked=${a}
    aria-label=${n}
    ?disabled=${r||e.pending.has(t)}
    @click=${()=>e.onToggle(t)}
  ></button>`}function xa(e,t,n,r,i){let a=j(n),o=a===void 0?``:String(a),s=ya(n,`min`),c=ya(n,`max`),l=ya(n,`step`),u=va(n),d=n=>{let r=Number.parseFloat(n);Number.isFinite(r)&&e.onNumber(t,r)};return n?.attributes.mode===`slider`&&s!==void 0&&c!==void 0?C`<label class="setting-num range">
      <input
        type="range"
        aria-label=${r}
        min=${s}
        max=${c}
        step=${l??1}
        ?disabled=${i||e.pending.has(t)}
        ${qt(e=>{e instanceof HTMLInputElement&&!ga(e)&&e.value!==o&&(e.value=o)})}
        @input=${e=>{let t=e.target,n=t.parentElement?.querySelector(`b`);n&&(n.textContent=u?`${t.value} ${u}`:t.value),window.clearTimeout(t._commit),t._commit=window.setTimeout(()=>d(t.value),200)}}
        @change=${e=>{let t=e.target;window.clearTimeout(t._commit),d(t.value)}}
      />
      <b .textContent=${u?`${o} ${u}`:o}></b>
    </label>`:C`<label class="setting-num">
    <input
      type="number"
      inputmode="decimal"
      aria-label=${r}
      min=${s??T}
      max=${c??T}
      step=${l??`any`}
      ?disabled=${i||e.pending.has(t)}
      ${qt(e=>{e instanceof HTMLInputElement&&!ga(e)&&e.value!==o&&(e.value=o)})}
      @change=${n=>{let r=Number.parseFloat(n.target.value);Number.isFinite(r)&&e.onNumber(t,r)}}
    />
    ${u?C`<span>${u}</span>`:T}
  </label>`}function Sa(e,t,n,r){let i=Array.isArray(n?.attributes.options)?n.attributes.options:[];return C`<select
    .value=${n?.state??``}
    aria-label=${_a(n,t)}
    ?disabled=${r||!i.length||e.pending.has(t)}
    @change=${n=>e.onSelect(t,n.target.value)}
  >
    ${i.map(t=>C`<option value=${t} ?selected=${t===n?.state}>${e.i18n.option(t)}</option>`)}
  </select>`}function Ca(e,t){let n=at[t];if(!n)return T;let r=e.hass.states[n],i=lt(t);if(!r&&!i)return T;let a=i||!r||r.state===`unavailable`,o=_a(r,t),s=n.split(`.`,1)[0],c=s===`switch`?ba(e,n,o,a):s===`number`?xa(e,n,r,o,a):s===`select`?Sa(e,n,r,a):s===`button`?C`<button
                class="btn"
                ?disabled=${a||e.pending.has(n)}
                @click=${()=>{let r=la[t];(!r||window.confirm(e.i18n.t(r)))&&e.onPress(n)}}
              >${o}</button>`:T,l=na(e.hass.language,t);return C`<div class="ctrl setting-row ${a?`locked`:``}">
    <div class="txt">
      <span class="name"><b>${o}</b>${l?C`<maestro-setting-tip .text=${l} .label=${e.i18n.t(`settingHelp`)}></maestro-setting-tip>`:T}</span>
      ${i?C`<span>${e.i18n.t(`entityDisabled`)}</span>`:T}
    </div>
    ${c}
  </div>`}var wa=(e,t)=>t.rows.some(t=>{let n=at[t];return!!n&&(!!e.hass.states[n]||lt(t))}),Ta=(e,t,n,r,i)=>C`<button type="button" class="settings-tile" @click=${()=>e.onOpenGroup(t)}>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${n}></svg>
  <b>${e.i18n.t(r)}</b>
  <span>${e.i18n.t(i)}</span>
</button>`;function Ea(e,t,n){let{t:r}=e.i18n,i=r(n===void 0?`classicDepVia`:n?`classicInstalled`:`classicMissing`);return C`<div class="dep"><b>${r(t)}</b><span class=${n===void 0?``:n?`ok`:`bad`}>${i}</span></div>`}function Da(e){let{t}=e.i18n,n=e.classic,r=n?.state??`checking`,i=C`<button type="button" class="btn primary" @click=${()=>e.onOpenClassic()}>${t(`classicOpen`)}</button>`;if(r===`checking`)return C`<p>${t(`classicChecking`)}</p>`;if(r===`ours`)return C`<p class="ok">${t(`classicReady`)}</p>${i}`;if(r===`foreign`)return C`<p class="bad">${t(`classicForeign`)}</p>`;if(r===`error`)return C`<p class="bad">${t(`classicFailed`,{err:n?.error??``})}</p>
      <button type="button" class="btn" @click=${()=>e.onCheckClassic()}>${t(`classicRetry`)}</button>`;if(!e.isAdmin)return C`<p>${t(`classicAdminOnly`)}</p>`;let a=r===`creating`;return C`${r===`empty`?C`<p>${t(`classicEmpty`)}</p>`:T}
    <button type="button" class="btn primary" ?disabled=${a} @click=${()=>e.onCreateClassic()}>
      ${t(a?`classicCreating`:r===`empty`?`classicSetup`:`classicCreate`)}
    </button>`}function Oa(e){let{t}=e.i18n,n=[`classicStep1`,`classicStep2`,`classicStep3`,`classicStep4`,`classicStep5`],r=e.classic?.mushroom===!1||e.classic?.apex===!1;return C`<div class="guide">
    <p>${t(`classicLead`)}</p>
    <h3>${t(`classicDepsTitle`)}</h3>
    ${Ea(e,`classicDepMushroom`,e.classic?.mushroom)}
    ${Ea(e,`classicDepApex`,e.classic?.apex)}
    ${r?C`<p class="bad">${t(`classicDepsMissing`)}</p>`:T}
    <h3>${t(`classicActionTitle`)}</h3>
    <div class="classic-action">${Da(e)}</div>
    <p>${t(`classicAfter`)}</p>
    <details>
      <summary>${t(`classicManual`)}</summary>
      <ol>${n.map(e=>C`<li>${t(e)}</li>`)}</ol>
      <p>${t(`classicHa`)}</p>
      <p>${t(`classicPath`)}</p>
      <p>${t(`classicTimeout`)}</p>
    </details>
  </div>`}var ka=[{title:`planTuneTariff`,hint:`planTuneTariffHint`,rows:[`tariff_mode`,`dynamic_tariff_enabled`,`cheap_threshold`,`fixed_buy_price`,`feed_in_price`]},{title:`planTuneGrid`,hint:`planTuneGridHint`,rows:[`low_slot_grid_charge_enabled`,`low_slot_target_soc`,`max_grid_charge_kwh`,`low_slot_forecast_based`,`low_slot_hold_discharge`]},{title:`planTunePlan`,hint:`planTunePlanHint`,rows:[`price_plan_enabled`,`price_plan_active`,`price_plan_max_soc`,`price_plan_min_spread`,`price_plan_efficiency`,`price_plan_safety_factor`,`battery_capex_eur`,`battery_total_cycles`]}];function Aa(e){let{t}=e.i18n;return C`<div class="card plan-tune">
    <h3>${t(`planTune`)}</h3>
    <p class="hint">${t(`planTuneHint`)}</p>
    ${ka.map(n=>C`<h4>${t(n.title)}</h4>
        <p class="sub">${t(n.hint)}</p>
        ${n.rows.map(t=>Ca(e,t))}`)}
  </div>`}function ja(e){let{t}=e.i18n,n={dark:{title:`themeDark`,hint:`themeDarkHint`},classic:{title:`themeClassic`,hint:`themeClassicHint`},e3dc:{title:`themeE3dc`,hint:`themeE3dcHint`}};return C`<div class="theme-choices" role="radiogroup" aria-label=${t(`setLook`)}>
    ${Ir.map(r=>C`<button
        type="button"
        class="theme-choice ${e.theme===r?`on`:``}"
        role="radio"
        aria-checked=${e.theme===r}
        @click=${()=>e.onTheme(r)}
      >
        <span class="swatch ${r}" aria-hidden="true"></span>
        <span class="txt"><b>${t(n[r].title)}</b><span>${t(n[r].hint)}</span></span>
      </button>`)}
  </div>`}function Ma(e){let{t}=e.i18n;if(e.groupId===K.id)return Li(e);if(e.groupId===G.id)return ja(e);if(e.groupId===W.id)return Oa(e);if(e.groupId===ua.id)return $i(e.options,C`${da.map(t=>Ca(e,t))}`,C`${fa.map(t=>Ca(e,t))}`);let n=sa.find(t=>t.id===e.groupId);if(n)return C`<div class="settings-detail">
      ${n.sections.map(r=>C`<section class="settings-section">
          ${n.sections.length>1?C`<h3>${t(r.title)}</h3><p class="sub">${t(r.hint)}</p>`:T}
          ${r.rows.map(t=>Ca(e,t))}
        </section>`)}
      ${ea(e.options,n.id)}
    </div>`;let r=Object.keys(at).length>0,i=e.hass.states[O.phase]?.state;return C`${ki(e.i18n,i,M(e.hass.states[O.ctrlPlanControls]),M(e.hass.states[O.lowYield]),e.onOpenGroup)}
    <div class="settings-tiles">
    ${Ta(e,K.id,K.icon,K.title,K.hint)}
    ${Ta(e,G.id,G.icon,G.title,G.hint)}
    ${Ta(e,ua.id,ua.icon,`setSizingTile`,`setSizingTileHint`)}
    ${Ta(e,W.id,W.icon,W.title,W.hint)}
    ${r?sa.map(t=>wa(e,t)?Ta(e,t.id,t.icon,t.title,t.hint):T):C`<p class="hint">${t(`settingsPending`)}</p>`}
  </div>`}var Na=e=>!e||e===`unknown`||e===`unavailable`;function Pa(e,t){if(!e||Na(e.state))return`–`;let n=Number.parseFloat(e.state);if(!Number.isFinite(n))return e.state;let r=typeof e.attributes.unit_of_measurement==`string`?e.attributes.unit_of_measurement:``;if(r===`%`)return`${t.n(Math.abs(n)<.05?0:n,0)} %`;if(r===`W`)return(n<0?`−`:``)+t.w(n);let i=+(r===`kW`||r===`kWh`||r===`A`||r===`V`||r===`°C`);return r?`${t.n(n,i)} ${r}`:t.n(n,0)}function Fa(e){if(!e||Na(e.state))return;let t=Number.parseFloat(e.state);if(Number.isFinite(t))return(typeof e.attributes.unit_of_measurement==`string`?e.attributes.unit_of_measurement:``)===`%`&&Math.abs(t)<.05?0:t}function Ia(e){let t=Fa(e);if(t!==void 0)return(typeof e?.attributes.unit_of_measurement==`string`?e.attributes.unit_of_measurement:``)===`W`?t/1e3:t}var La=864e5;function Ra(e,t=Date.now()){let n=e?.attributes.items;if(!Array.isArray(n)||n.length===0)return;let r=n[0];if(!r||typeof r!=`object`)return;let i=r.time;if(typeof i!=`number`||t-i>La)return;let a=e?.attributes.latest_message;return typeof a==`string`&&a.trim()?a.trim():void 0}function za(e){return e===void 0||!Number.isFinite(e)?`idle`:e>=90?`soh-good`:e>=70?`soh-mid`:`soh-low`}function Ba(e,t,n){if(!(e===void 0||!Number.isFinite(e)||e<0)&&!(t===void 0||!(t>0)||n<1))return Math.min(100,e/(t/n)*100)}var Va={0:`plantMode0`,1:`plantMode1`,2:`plantMode2`,3:`plantMode3`,4:`plantMode4`};function Ha(e,t){if(!e||e===`unknown`||e===`unavailable`)return`–`;let n=Va[e];return n?t(n):e}var Ua=(e,t)=>!e||Na(e.state)?`–`:e.state===`on`?t(`plantOn`):e.state===`off`?t(`plantOff`):e.state,Wa=46,Ga=2*Math.PI*Wa,Ka=e=>e.length?C`<div class="card"><div class="rows">${e.map(e=>C`<div class="row"><span>${e.label}</span><b>${e.value}</b></div>`)}</div></div>`:T,qa=[`grid`,`battery`,`pv`,`wallbox`,`controls`],Ja={grid:{title:`plantRoomGrid`,hint:`plantRoomGridHint`,icon:`<path d="M4 8h16M4 16h16"/><path d="M8 4v16M16 4v16"/>`},battery:{title:`plantRoomBattery`,hint:`plantRoomBatteryHint`,icon:`<rect x="7" y="6" width="10" height="15" rx="2"/><path d="M10 4h4"/>`},pv:{title:`plantRoomPv`,hint:`plantRoomPvHint`,icon:`<circle cx="12" cy="12" r="4"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21"/>`},wallbox:{title:`plantRoomWallbox`,hint:`plantRoomWallboxHint`,icon:`<path d="M7 17V7a2 2 0 0 1 2-2h4l2 3h2a2 2 0 0 1 2 2v7"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>`},controls:{title:`plantRoomControls`,hint:`plantRoomControlsHint`,icon:`<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>`}},Ya=e=>!!e&&qa.includes(e),Xa=e=>Ya(e)?Ja[e]:void 0,q=(e,t)=>t?e.hass.states[t]:void 0,J=(e,t)=>Pa(q(e,k.entities[t]),e.fmt),Y=e=>e in k.entities,Za=(e,t,n,r)=>C`<div class="gauge ${r}">
    <div class="gauge-face">
      <svg viewBox="0 0 120 120" role="img" aria-label="${e}: ${t}">
        <circle class="gauge-track" cx="60" cy="60" r="${Wa}"></circle>
        <circle class="gauge-arc" cx="60" cy="60" r="${Wa}" stroke-dasharray="${(n===void 0?0:Math.max(0,Math.min(100,n)))/100*Ga} ${Ga}"></circle>
      </svg>
      <b>${t}</b>
    </div>
    <span>${e}</span>
  </div>`,Qa=e=>e===void 0||Math.abs(e)<.25?`idle`:e<0?`discharge`:`charge`,$a=(e,t,n,r=!1)=>C`<div
  class="batt ${n} ${r?`mini`:``}"
  role="img"
  aria-label="${e}"
>
  <div class="batt-nub"></div>
  <div class="batt-body">
    ${t===void 0?T:C`<div class="batt-fill" style="height:${Math.max(0,Math.min(100,t))}%"></div>`}
    <div class="batt-cells" aria-hidden="true"></div>
  </div>
</div>`,eo=e=>e.length?C`<div class="card budget">${e.map(e=>C`<div class="budget-row">
          <span>${e.label}</span>
          <div class="track"><i class="${e.cls}" style="width:${Math.max(0,Math.min(100,e.pct))}%"></i></div>
          <b>${e.value}</b>
        </div>`)}</div>`:T;function to(e){let{t}=e.i18n;if(!(Object.keys(k.entities).length>0||k.packs.length>0||k.wallboxes.length>0))return C`<p class="empty">${t(`plantEmpty`)}</p>`;let n=[Y(`powerValue`)?{label:t(`plantPower`),value:J(e,`powerValue`)}:null,Y(`manualEnergy`)?{label:t(`plantManualEnergy`),value:J(e,`manualEnergy`)}:null].filter(e=>e!==null),r=[{key:`limitCharge`,label:t(`plantLimitCharge`),cls:`bat`},{key:`limitDischarge`,label:t(`plantLimitDischarge`),cls:`warn`},{key:`limitDischargeMin`,label:t(`plantLimitMin`),cls:`muted`}].map(t=>({...t,kw:Y(t.key)?Ia(q(e,k.entities[t.key])):void 0})),i=Math.max(0,...r.map(e=>Math.abs(e.kw??0))),a=eo(r.filter(e=>e.kw!==void 0).map(t=>({label:t.label,value:J(e,t.key),pct:i>0?Math.abs(t.kw)/i*100:0,cls:t.cls}))),o=[{key:`limitsOn`,label:`plantLimits`},{key:`manualCharge`,label:`plantManual`},{key:`pvDerated`,label:`plantDerated`,warn:!0},{key:`emergencyPower`,label:`plantEmergency`,warn:!0},{key:`emergencyReserve`,label:`plantReserveHit`},{key:`rescueBattery`,label:`plantReserveOn`},{key:`weather`,label:`plantWeather`},{key:`weatherWait`,label:`plantWeatherWait`}].filter(e=>Y(e.key)),s=t=>Y(t)?Ia(q(e,k.entities[t])):void 0,c=n=>{let r=n.map(e=>k.entities[e]).filter(e=>!!e);if(!r.length)return T;let i=n.flatMap((t,n)=>{let r=k.entities[t],i=r?e.phasePoints?.[r]:void 0;return i?.length?[{name:`L${n+1}`,points:i}]:[]}),a=e.phaseHistory??`idle`;if(!i.length&&a===`error`)return C`<p class="err">${t(`historyFailed`)}</p>`;if(!i.length&&a!==`ready`)return C`<p class="hint">${t(`loading`)}</p>`;if(!i.length)return C`<p class="hint">${t(`historyEmpty`)}</p>`;let o=i.map(e=>e.points[e.points.length-1]?.[0]??0).join(`,`),s=[`var(--accent)`,`var(--house)`,`var(--pv)`];return C`<div class="phase-legend">
        ${i.map((e,t)=>C`<span style="--swatch:${s[t]??s[0]}"><i></i>${e.name}</span>`)}
      </div>
      <maestro-chart
        class="phase-chart"
        .options=${R(`phase-${r.join(`,`)}`,[e.theme,e.fmt.loc,o],()=>Tn(i,e.fmt))}
      ></maestro-chart>`},l=(n,r,i)=>{if(!i.some(Y))return T;let a=Math.max(.001,...i.map(e=>Math.abs(s(e)??0)));return C`<div class="card phase-gauges">
      <h3>${r}</h3>
      <div class="phase-gauge-row">
        ${i.map((t,r)=>{let i=s(t),o=i===void 0?void 0:Math.abs(i)/a*100,c=`${n}${i!==void 0&&i<0?` neg`:``}`;return Za(`L${r+1}`,Y(t)?J(e,t):`–`,o,c)})}
      </div>
      <div class="phase-history">
        <div class="sub">${t(`historySub`)}</div>
        ${c(i)}
      </div>
    </div>`},u=l(`house`,t(`plantHouse`),[`houseL1`,`houseL2`,`houseL3`]),d=l(`grid`,t(`plantGrid`),[`gridL1`,`gridL2`,`gridL3`]),f=l(`pvi`,t(`plantInverter`),[`pviL1`,`pviL2`,`pviL3`]),p=[{key:`installedPeak`,label:t(`plantPeak`),cls:`pv`},{key:`acMax`,label:t(`plantAc`),cls:`house`},{key:`chargeMax`,label:t(`plantSysCharge`),cls:`bat`},{key:`dischargeMax`,label:t(`plantSysDischarge`),cls:`warn`},{key:`deratePower`,label:t(`plantDeratePower`),cls:`pv`},{key:`extraProduction`,label:t(`plantExtraPv`),cls:`pv`},{key:`extraConsumption`,label:t(`plantExtraUse`),cls:`house`}].map(t=>({...t,kw:Y(t.key)?Ia(q(e,k.entities[t.key])):void 0})),m=t=>{let n=p.filter(e=>t.includes(e.key)&&e.kw!==void 0),r=Math.max(0,...n.map(e=>Math.abs(e.kw)));return eo(n.map(t=>({label:t.label,value:J(e,t.key),pct:r>0?Math.abs(t.kw)/r*100:0,cls:t.cls})))},h=Y(`batteryCapacity`)?Fa(q(e,k.entities.batteryCapacity)):void 0,g=(n,r,i)=>{let a=t=>Pa(q(e,r[t]),e.fmt),o=t=>Fa(q(e,r[t])),s=Ba(r.energy?o(`energy`):void 0,h,k.packs.length),c=Qa(r.current?o(`current`):void 0),l=r.tempMin?o(`tempMin`):void 0,u=r.tempMax?o(`tempMax`):void 0,d=r.tempMin&&r.tempMax?`${a(`tempMin`)} – ${a(`tempMax`)}`:r.tempMin?a(`tempMin`):r.tempMax?a(`tempMax`):``,f=l??u,p=u??l,m=e=>Math.max(0,Math.min(100,e/50*100)),g=r.soh?o(`soh`):void 0,_=n||t(`plantPack`);return C`<article class="card pack">
      <div class="pack-visual">
        ${$a(`${_}, ${r.energy?a(`energy`):``}`,s,c)}
        ${g===void 0?T:C`<b class="pack-soh">${a(`soh`)}</b><span>${t(`plantSoh`)}</span>`}
      </div>
      <div class="pack-stats">
        <h3>${_}</h3>
        ${r.energy?C`<div class="pack-energy">${a(`energy`)}</div><div class="pack-share">${t(s===void 0?`plantEnergy`:`plantShare`)}</div>`:T}
        <div class="pack-meta">
          ${r.current?C`<div><span>${t(`plantCurrent`)}</span><b class="${c}">${a(`current`)}</b></div>`:T}
          ${r.voltage?C`<div><span>${t(`plantVoltage`)}</span><b>${a(`voltage`)}</b></div>`:T}
          ${r.cycles?C`<div><span>${t(`plantCycles`)}</span><b>${a(`cycles`)}</b></div>`:T}
        </div>
        ${d?C`<div class="temp">
              <div class="temp-top"><span>${t(`plantTemp`)}</span><b>${d}</b></div>
              ${f!==void 0&&p!==void 0?C`<div class="temp-track"><i style="left:${m(Math.min(f,p))}%;width:${Math.max(4,m(Math.max(f,p))-m(Math.min(f,p)))}%"></i></div>`:T}
            </div>`:T}
      </div>
      ${i.length?C`<div class="cells">
            <span class="cells-label">${t(`plantCells`)}</span>
            ${i.map(n=>{let r=Fa(q(e,n.entities.sohReported)),i=Pa(q(e,n.entities.sohReported),e.fmt);return C`<div class="cell">
                ${$a(`${n.name}, ${i}`,r,za(r),!0)}
                <b>${i}</b>
                <span>${n.name||t(`plantCell`)}</span>
              </div>`})}
          </div>`:T}
    </article>`},_=(n,r)=>{let i=t=>Pa(q(e,r[t]),e.fmt),a=n=>Ua(q(e,r[n]),t),o=r.soc?Fa(q(e,r.soc)):void 0,s=r.sun?Ia(q(e,r.sun)):void 0,c=r.net?Ia(q(e,r.net)):void 0,l=(s??0)+(c??0),u=[r.phases?{label:t(`plantPhaseCount`),value:i(`phases`)}:null,r.current?{label:t(`plantMaxCurrent`),value:i(`current`)}:null].filter(e=>e!==null);return C`<article class="card pack wall">
      ${o===void 0?T:C`<div class="pack-visual">${$a(`${n||t(`plantWallbox`)}, ${i(`soc`)}`,o,r.charging&&q(e,r.charging)?.state===`on`?`charge`:`idle`)}<b class="pack-soh">${i(`soc`)}</b><span>${t(`plantCarSoc`)}</span></div>`}
      <div class="pack-stats">
        ${k.wallboxes.length>1?C`<h3>${n||t(`plantWallbox`)}</h3>`:T}
        <div class="plant-flags">
          ${r.plug?C`<span class="chip ${q(e,r.plug)?.state===`on`?`on`:``}"><i></i>${t(`plantPlug`)} ${a(`plug`)}</span>`:T}
          ${r.charging?C`<span class="chip ${q(e,r.charging)?.state===`on`?`on`:``}"><i></i>${t(`plantCharging`)} ${a(`charging`)}</span>`:T}
        </div>
        ${s!==void 0||c!==void 0?C`<div class="mix" title="${t(`plantSun`)} ${r.sun?i(`sun`):``} · ${t(`plantNet`)} ${r.net?i(`net`):``}">
              ${s===void 0?T:C`<i class="sun" style="width:${l>0?Math.abs(s)/l*100:0}%"></i>`}
              ${c===void 0?T:C`<i class="net" style="width:${l>0?Math.abs(c)/l*100:0}%"></i>`}
            </div>
            <div class="phase-legend">
              ${r.sun?C`<span><i class="pvi"></i>${t(`plantSun`)} ${i(`sun`)}</span>`:T}
              ${r.net?C`<span><i class="grid"></i>${t(`plantNet`)} ${i(`net`)}</span>`:T}
            </div>`:T}
        ${u.length?C`<div class="rows">${u.map(e=>C`<div class="row"><span>${e.label}</span><b>${e.value}</b></div>`)}</div>`:T}
      </div>
    </article>`},v=q(e,k.entities.mode)?.state,y=n=>{let r=o.filter(e=>n.includes(e.key));return r.length?C`<div class="plant-flags">${r.map(n=>C`<span class="chip ${q(e,k.entities[n.key])?.state===`on`?n.warn?`warn`:`on`:``}"><i></i>${t(n.label)}</span>`)}</div>`:T},ee=(e,t)=>{let n=e?.attributes.friendly_name;return typeof n==`string`&&n.trim()?n.trim():t},te=n=>{let r=q(e,n);if(!r)return T;let i=ee(r,n),a=n.split(`.`,1)[0],o=r.state===`unavailable`||e.pending.has(n);return C`<div class="ctrl setting-row"><div class="txt"><span class="name"><b>${i}</b></span></div>${a===`switch`?C`<button class="switch ${M(r)?`on`:``}" role="switch" aria-checked=${M(r)} aria-label=${i} ?disabled=${o} @click=${()=>e.onToggle(n)}></button>`:a===`number`?C`<label class="setting-num">
              <input
                type="number"
                inputmode="decimal"
                aria-label=${i}
                step=${typeof r.attributes.step==`number`?r.attributes.step:`any`}
                ?disabled=${o}
                ${qt(e=>{let t=e?.getRootNode(),n=t instanceof ShadowRoot?t.activeElement:null;if(!(e instanceof HTMLInputElement)||e===n)return;let i=j(r),a=i===void 0?``:String(i);e.value!==a&&(e.value=a)})}
                @change=${t=>{let r=Number.parseFloat(t.target.value);Number.isFinite(r)&&e.onNumber(n,r)}}
              />
              ${typeof r.attributes.unit_of_measurement==`string`?C`<span>${r.attributes.unit_of_measurement}</span>`:T}
            </label>`:a===`button`?C`<button class="btn" ?disabled=${o} @click=${()=>{window.confirm(t(`plantSend`))&&e.onPress(n)}}>${i}</button>`:T}</div>`},ne=e=>{let t=Object.values(e??{}).map(e=>te(e));return t.some(e=>e!==T)?C`<div class="card">${t}</div>`:T},b=k.identity??{},x=[b.model?{label:t(`plantModel`),value:b.model}:null,b.serial?{label:t(`plantSerial`),value:b.serial}:null,b.firmware?{label:t(`plantFirmware`),value:b.firmware}:null].filter(e=>e!==null),re=Ra(q(e,k.entities.errors)),ie=C`<section class="card hero">
    <div class="hero-main">
      <div class="hero-mode" data-mode=${v??``}>
        <span>${t(`plantMode`)}</span>
        <b>${Y(`mode`)?Ha(v,t):`–`}</b>
      </div>
      <div class="hero-gauges">
        ${Za(t(`plantAutarky`),Y(`autarky`)?J(e,`autarky`):`–`,Y(`autarky`)?Fa(q(e,k.entities.autarky)):void 0,`autarky`)}
        ${Za(t(`plantSelf`),Y(`selfConsumption`)?J(e,`selfConsumption`):`–`,Y(`selfConsumption`)?Fa(q(e,k.entities.selfConsumption)):void 0,`self`)}
      </div>
    </div>
    ${x.length?C`<div class="hero-meta">${x.map(e=>C`<div><span>${e.label}</span><b>${e.value}</b></div>`)}</div>`:T}
    ${re?C`<p class="hero-fault" role="status">${t(`plantFault`)}: ${re}</p>`:T}
  </section>`,ae=Y(`batteryCapacity`)?[{label:t(`plantCapacity`),value:J(e,`batteryCapacity`)}]:[],oe=Y(`deratePercent`)?[{label:t(`plantDeratePct`),value:J(e,`deratePercent`)}]:[],S={grid:{show:u!==T||d!==T||Y(`extraConsumption`),body:C`${u}${d}${m([`extraConsumption`])}`},battery:{show:k.packs.length>0||a!==T||Y(`chargeMax`)||Y(`dischargeMax`)||Y(`batteryCapacity`),body:C`${k.packs.length?C`<div class="plant-packs">${k.packs.map(e=>g(e.name,e.entities,e.modules??[]))}</div>`:T}${y([`manualCharge`,`emergencyPower`,`emergencyReserve`,`rescueBattery`])}${a}${m([`chargeMax`,`dischargeMax`])}${Ka(ae)}`},pv:{show:f!==T||Y(`installedPeak`)||Y(`acMax`)||Y(`deratePower`)||Y(`deratePercent`)||Y(`extraProduction`)||Y(`pvDerated`),body:C`${f}${y([`pvDerated`])}${m([`installedPeak`,`acMax`,`deratePower`,`extraProduction`])}${Ka(oe)}`},wallbox:{show:k.wallboxes.length>0||Object.keys(k.controls?.wallbox??{}).length>0,body:C`${k.wallboxes.length?C`<div class="plant-packs">${k.wallboxes.map(e=>C`<div class="wall-stack">${_(e.name,e.entities)}${ne(e.controls)}</div>`)}</div>`:T}${ne(k.controls?.wallbox)}`},controls:{show:Object.keys(k.controls?.general??{}).length>0||Y(`mode`)||n.length>0||Y(`limitsOn`)||Y(`weatherWait`),body:C`${ne(k.controls?.general)}${y([`limitsOn`,`weatherWait`])}${Ka(n)}`}},se=Ya(e.groupId)?e.groupId:void 0;return se&&S[se].show?C`<div class="plant-body">${S[se].body}</div>`:C`${ie}
    <div class="settings-tiles">
      ${Object.keys(S).filter(e=>S[e].show).map(n=>{let r=Ja[n];return C`<button type="button" class="settings-tile" @click=${()=>e.onOpenRoom(n)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${r.icon}></svg>
          <b>${t(r.title)}</b>
          <span>${t(r.hint)}</span>
        </button>`})}
    </div>`}function no(e){return/[",\n\r]/.test(e)?`"${e.replace(/"/g,`""`)}"`:e}function ro(e){return e.map(e=>e.map(no).join(`,`)).join(`
`)}function io(e,t){let n=new Blob([`\uFEFF${ro(t)}`],{type:`text/csv;charset=utf-8`}),r=document.createElement(`a`);r.href=URL.createObjectURL(n),r.download=e,r.click(),URL.revokeObjectURL(r.href)}var ao=e=>!e||e.state===`unknown`||e.state===`unavailable`?`–`:e.state,X=(e,t)=>e.hass.states[t],oo=(e,t)=>X(e,t)?.attributes??{},Z=e=>typeof e==`number`&&Number.isFinite(e)?e:void 0,Q=(e,t)=>C`${e}<small>${t}</small>`,$=(e,t)=>C`<div class="row"><span>${e}</span><b>${t}</b></div>`,so=e=>[[`time`,`soc_pct`,`pv_w`,`house_w`,`grid_w`,`phase`],...e.trajectory_points.map((t,n)=>[new Date(t[0]).toISOString(),String(t[1]),String(e.pv_points[n]?.[1]??``),String(e.house_points[n]?.[1]??``),String(e.grid_points[n]?.[1]??``),e.trajectory_phases[n]??``])],co=e=>[[`time`,`phase`,`reason`],...(e.timeline??[]).map(e=>[new Date(e.ts).toISOString(),e.phase,e.reason])],lo=e=>M(X(e,O.debug)),uo=e=>{let t=X(e,O.debugLog)?.state;return!t||t===`unknown`||t===`unavailable`?e.i18n.t(`debugEmpty`):t};function fo(e){let{t}=e.i18n,n=j(X(e,O.soc)),r=j(X(e,O.targetSoc)),i=j(X(e,O.battery)),a=t=>M(X(e,t)),o=[[t(`chipReachable`),a(O.reachable),`on`],[t(`chipChargeLock`),a(O.chargeLock),`warn`],[t(`chipDischargeLock`),a(O.dischargeLock),`warn`],[t(`chipHt`),a(O.htProtect),`warn`],[t(`chipCurtail`),a(O.curtail),`warn`],[t(`chipEmergency`),a(O.emergency),`warn`],[t(`chipFeedIn`),a(O.feedInLimit),`warn`],[t(`chipGridCharge`),a(O.gridCharge),`on`],[t(`chipBatteryPriority`),a(O.batteryPriority),`warn`],[t(`chipLowYield`),a(O.lowYield),`warn`],[t(`chipPredictive`),a(O.ctrlPredictive),`on`],[t(`chipShadow`),a(O.ctrlPlanShadow),`on`]],s=(t,n)=>e.period!==`today`||!e.sparks?.[t]?.length?T:C`<maestro-chart class="spark" .options=${R(`spark-${t}`,[e.theme,e.sparks[t]],()=>Dn(e.sparks[t],n))}></maestro-chart>`,c=rr(e.mobile,e.consumers.length),l=t=>e.period===`today`?j(X(e,O[t])):e.periodSums?.[t],u=[l(`feedRevenue`),l(`saving`),l(`costToday`),l(`wear`)],d=e.period===`today`?j(X(e,O.balance)):u.some(e=>e===void 0)?void 0:u[0]+u[1]-u[2]-u[3],f=t=>`${e.fmt.n(t,2)} €`,p=t(e.period===`today`?`whenToday`:e.period===`week`?`whenWeek`:`whenMonth`),m=t(e.period===`today`?`groupToday`:e.period===`week`?`groupWeek`:`groupMonth`),h=t(e.period===`today`?`balanceTitle`:e.period===`week`?`balanceWeek`:`balanceMonth`),g=d===void 0||d===0?``:d>0?`pos`:`neg`,_=X(e,O.forceDischargePower),v=_?.attributes??{},y=typeof v.min==`number`?v.min:100,ee=typeof v.max==`number`?v.max:1e4,te=typeof v.step==`number`?v.step:100,ne=e.forcePowerDraft??j(_)??y,b=X(e,O.fixedReserveSoc),x=b?.attributes??{},re=typeof x.min==`number`?x.min:0,ie=typeof x.max==`number`?x.max:100,ae=typeof x.step==`number`?x.step:1,oe=e.reserveDraft??j(b)??re,S=(t,n,r,i)=>{let a=!e.collapsed.has(t);return C`<section class="group">
      <button type="button" class="group-head ${a?`open`:``}" aria-expanded=${a} @click=${()=>e.onToggleGroup(t)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        <span>${n}</span>
        ${a?T:r}
      </button>
      ${a?C`<div class="grid kpis">${i}</div>`:T}
    </section>`};return C`
    ${Ri(e)}
    <div class="grid live-top">
      <div class="card">
        <div class="card-head">
          <div>
            <h3>${t(`flowTitle`)}</h3>
            <div class="sub">${t(`flowSub`)}</div>
          </div>
          <button type="button" class="icon-btn" aria-label=${t(`editConsumers`)} @click=${e.onEditConsumers}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
          </button>
        </div>
        <div class="flow-wrap" style=${c?`height:${c}px`:T}>
          ${ar({pv:j(X(e,O.pv)),house:j(X(e,O.house)),grid:j(X(e,O.grid)),battery:i,soc:n,consumers:e.consumers,motion:e.motion,onSelect:e.onFlowNode,compact:e.mobile,outline:e.theme!==`dark`,fmt:e.fmt,i18n:e.i18n})}
        </div>
        ${e.consumerOverflow?C`<p class="err">${t(`consumersOverflow`)}</p>`:T}
      </div>
      <div class="card soc-card">
        <h3 class="self-start">${t(`battery`)}</h3>
        ${n===void 0?C`<p class="empty">${t(`unavailable`)}</p>`:C`<maestro-chart class="ring" .options=${R(`ring`,[e.theme,n,e.fmt.loc],()=>wn(n,t(`stateOfCharge`)))}></maestro-chart>`}
        <div class="soc-meta">
          <div class="meta"><b>${r===void 0?`–`:`${Math.round(r)}%`}</b><span>${t(`targetSoc`)}</span></div>
          <div class="meta"><b>${ao(X(e,O.autonomy))}</b><span>${t(`autonomy`)}</span></div>
          <div class="meta"><b>${e.fmt.w(i)}</b><span>${t(i!==void 0&&i<0?`discharging`:`charging`)}</span></div>
        </div>
      </div>
    </div>
    <div class="chips">
      ${o.map(([e,t,n])=>C`<span class="chip ${t?n:``}"><i></i>${e}</span>`)}
    </div>
    <div class="card force">
      <div class="txt"><b>${t(`forceTitle`)}</b><span>${t(`ctrlForcePower`,{v:e.fmt.w(ne)})}</span></div>
      <button
        class="switch ${a(O.forceDischarge)?`on`:``}"
        role="switch"
        aria-checked=${a(O.forceDischarge)}
        aria-label=${t(`forceTitle`)}
        ?disabled=${!X(e,O.forceDischarge)||e.pending.has(O.forceDischarge)}
        @click=${()=>e.onToggle(O.forceDischarge)}
      ></button>
      <input
        type="range"
        min=${y}
        max=${ee}
        step=${te}
        .value=${String(ne)}
        aria-label=${t(`ctrlForcePower`,{v:``})}
        ?disabled=${!_||_.state===`unavailable`}
        @input=${t=>e.onPowerDraft(Number(t.target.value))}
        @change=${t=>e.onPowerCommit(Number(t.target.value))}
      />
    </div>
    <div class="card force">
      <div class="txt"><b>${t(`fixedReserve`)}</b><span>${t(`ctrlReserveSoc`,{v:Math.round(oe)})}</span></div>
      <button
        class="switch ${a(O.fixedReserve)?`on`:``}"
        role="switch"
        aria-checked=${a(O.fixedReserve)}
        aria-label=${t(`fixedReserve`)}
        ?disabled=${!X(e,O.fixedReserve)||e.pending.has(O.fixedReserve)}
        @click=${()=>e.onToggle(O.fixedReserve)}
      ></button>
      <input
        type="range"
        min=${re}
        max=${ie}
        step=${ae}
        .value=${String(oe)}
        aria-label=${t(`fixedReserve`)}
        ?disabled=${!b||b.state===`unavailable`}
        @input=${t=>e.onReserveDraft(Number(t.target.value))}
        @change=${t=>e.onReserveCommit(Number(t.target.value))}
      />
    </div>
    <div class="seg period" role="group" aria-label=${t(`periodToday`)}>
      ${[`today`,`week`,`month`].map(n=>C`<button class=${e.period===n?`active`:``} aria-pressed=${e.period===n} @click=${()=>e.onPeriod(n)}>${t(n===`today`?`periodToday`:n===`week`?`periodWeek`:`periodMonth`)}</button>`)}
    </div>
    ${S(`today`,m,C`<b class="group-sum">${f(l(`costNet`))}<small>${t(`groupNet`)}</small></b>`,C`
      <div class="card kpi">
        <h3>${t(`kpiCost`,{when:p})}</h3>
        <div class="v">${Q(e.fmt.n(l(`costNet`),2),`€`)}</div>
        <div class="delta">${t(`kpiCostSub`)}</div>
        ${s(`costNet`,F.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiSaving`,{when:p})}</h3>
        <div class="v">${Q(e.fmt.n(l(`saving`),2),`€`)}</div>
        <div class="delta">${t(`kpiSavingSub`)}</div>
        ${s(`saving`,F.gridOut)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiSelf`,{when:p})}</h3>
        <div class="v">${Q(e.fmt.n(l(`selfUse`)),`kWh`)}</div>
        <div class="delta">${t(`kpiSelfSub`,{imp:e.fmt.n(l(`importToday`)),feed:e.fmt.n(l(`feedToday`))})}</div>
        ${s(`selfUse`,F.pv)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiBattery`,{when:p})}</h3>
        <div class="v">${Q(e.fmt.n(l(`chargedToday`)),`kWh`)}</div>
        <div class="delta">${t(`kpiBatterySub`,{out:e.fmt.n(l(`dischargedToday`))})}</div>
        ${s(`chargedToday`,F.bat)}
      </div>
    `)}
    ${S(`balance`,h,C`<b class="group-sum ${g}">${f(d)}</b>`,C`
      <div class="card kpi">
        <h3>${t(`kpiCostGross`)}</h3>
        <div class="v">${Q(e.fmt.n(l(`costToday`),2),`€`)}</div>
        <div class="delta">${t(`kpiCostGrossSub`)}</div>
        ${s(`costToday`,F.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiRevenue`)}</h3>
        <div class="v">${Q(e.fmt.n(l(`feedRevenue`),2),`€`)}</div>
        <div class="delta">${t(`kpiRevenueSub`,{when:p})}</div>
        ${s(`feedRevenue`,F.gridOut)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiWear`)}</h3>
        <div class="v">${Q(e.fmt.n(l(`wear`),2),`€`)}</div>
        <div class="delta">${t(`kpiWearSub`)}</div>
        ${s(`wear`,F.accent2)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiBalance`)}</h3>
        <div class="v">${Q(e.fmt.n(d,2),`€`)}</div>
        <div class="delta">${t(`kpiBalanceSub`)}</div>
        ${s(`balance`,F.accent)}
      </div>
      <div class="card kpi ${a(O.unjustified)?`alert`:``}">
        <h3>${t(`kpiGridBat`)}</h3>
        <div class="v">${Q(e.fmt.n(l(`gridToBattery`)),`kWh`)}</div>
        <div class="delta">${a(O.unjustified)?t(`kpiGridBatWarn`):t(`kpiGridBatSub`)}</div>
        ${s(`gridToBattery`,F.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiWallbox`,{when:p})}</h3>
        <div class="v">${Q(e.fmt.n(l(`wallboxEnergy`)),`kWh`)}</div>
        <div class="delta">${t(`kpiWallboxSub`)}</div>
        ${s(`wallboxEnergy`,F.house)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiFeedLimit`)}</h3>
        <div class="v">${Q(e.fmt.n(l(`curtailAvoided`)),`kWh`)}</div>
        <div class="delta">${t(`kpiFeedLimitSub`,{n:e.fmt.n(l(`feedInInterventions`),0),dc:e.fmt.n(l(`feedInAvoided`))})}</div>
        ${s(`curtailAvoided`,F.pv)}
      </div>
    `)}`}var po=(e,t)=>e(t===`ok`?`qualityOk`:t===`pv_fallback`?`qualityPv`:t===`consumption_fallback`?`qualityConsumption`:t===`both_fallback`?`qualityBoth`:`qualityUnknown`),mo=(e,t)=>{let n=j(X(e,t));return n===void 0?`–`:`${Math.round(n)} %`};function ho(e){let{t}=e.i18n,n=oo(e,O.trajectory),r=$t(n);if(!r)return C`<div class="card"><p class="empty">${t(`noForecast`)}</p></div>`;let i=[[F.bat,t(`legendSoc`)],[F.pv,t(`legendPv`)],[F.house,t(`legendHouse`)],[F.gridIn,t(`legendImport`)],[F.gridOut,t(`legendFeed`)]],a=(e,t)=>C`<div class="card stat"><h3>${e}</h3><div class="v">${t}</div></div>`;return C`
    <div class="card">
      <div class="chart-head">
        <div class="grow">
          <h3>${t(`chartTitle`)}</h3>
          <div class="legend">${i.map(([e,t])=>C`<span><i style="background:${e}"></i>${t}</span>`)}</div>
        </div>
        <button class="toggle ${e.showIst?`active`:``}" aria-pressed=${e.showIst} @click=${e.onToggleIst}>${t(`actualOverlay`)}</button>
        <button class="toggle" @click=${()=>io(`maestro-prognose.csv`,so(r))}>${t(`exportCsv`)}</button>
        <div class="seg" role="group">
          ${[6,12,24].map(n=>C`<button class=${e.range===n?`active`:``} aria-pressed=${e.range===n} @click=${()=>e.onRange(n)}>${t(`hoursShort`,{h:n})}</button>`)}
        </div>
      </div>
      <maestro-chart
        id="fc-main"
        .options=${R(`forecast`,[e.theme,X(e,O.trajectory),X(e,O.targetSoc)?.state,e.ist,e.showIst,e.fmt.loc],()=>xn({traj:r,targetSoc:j(X(e,O.targetSoc)),ist:e.ist,showIst:e.showIst,fmt:e.fmt,i18n:e.i18n}))}
      ></maestro-chart>
      <maestro-chart id="fc-brush" .options=${R(`brush`,[e.theme,X(e,O.trajectory)],()=>Sn(r))}></maestro-chart>
    </div>
    <div class="grid stat-row">
      ${a(t(`statMinMax`),C`${Math.round(Z(n.min_soc)??0)}<small>%</small> / ${Math.round(Z(n.max_soc)??0)}<small>%</small>`)}
      ${a(t(`statImport`),Q(e.fmt.n(Z(n.grid_draw_kwh)),`kWh`))}
      ${a(t(`statFeed`),Q(e.fmt.n(Z(n.grid_feed_in_kwh)),`kWh`))}
      ${a(t(`statAutarky`),Q(e.fmt.n(Z(n.self_sufficiency_pct)),`%`))}
      ${a(t(`statPvTomorrow`),Q(e.fmt.n(j(X(e,O.pvTomorrow))),`kWh`))}
    </div>
    <div class="grid stat-row">
      ${a(t(`qualityLabel`),po(t,X(e,O.forecastQuality)?.state))}
      ${a(t(`statP10`),Q(e.fmt.n(j(X(e,O.p10))),`kWh`))}
      ${a(t(`statDeficit`),Q(e.fmt.n(j(X(e,O.deficit))),`kWh`))}
      ${a(t(`statYield`),C`${e.fmt.n((()=>{let t=j(X(e,O.yieldRatio));return t===void 0?void 0:t*100})())}<small>%</small>`)}
    </div>
    <p class="sub yield-note">${t(`statYieldSub`,{today:e.fmt.n(j(X(e,O.yieldToday))),ref:e.fmt.n(j(X(e,O.yieldRef)))})}</p>`}function go(e){let{t}=e.i18n,n=oo(e,O.plan),r=rn(n.plan_slots);if(!r.length)return C`<div class="card"><p class="empty">${t(`noPlan`)}</p></div>${Aa(e)}`;let i=on(r),a=[[F.gridOut,t(`legendCharge`)],[F.pv,t(`legendHold`)],[F.bat,t(`legendRelease`)]],o=typeof n.known_until==`string`?e.fmt.dayTime(n.known_until):`–`,s=(e,t,n)=>C`<div class="row"><span>${e}</span><b style=${n?`color:${n}`:``}>${t}</b></div>`,c=t=>`${e.fmt.n(t.price*100)} ct · ${t.start_local}`;return C`
    <div class="grid plan-top">
      <div class="card">
        <div class="chart-head">
          <div class="grow">
            <h3>${t(`priceTitle`)}</h3>
            <div class="legend">
              ${a.map(([e,t])=>C`<span><i style="background:${e}"></i>${t}</span>`)}
              <span><i style="background:#fff;height:2px;border-radius:0"></i>${t(`legendPlanSoc`)}</span>
            </div>
          </div>
          <span class="badge">${n.shadow_mode?t(`planShadow`):t(`planActive`)}</span>
        </div>
        <maestro-chart .options=${R(`plan`,[e.theme,X(e,O.plan),e.fmt.loc],()=>Cn({slots:r,fmt:e.fmt,i18n:e.i18n}))}></maestro-chart>
        <div class="strip">
          ${r.map(t=>C`<div class="slot ${nn(t)}" title="${t.start_local} · ${e.fmt.n(t.price*100)} ct"></div>`)}
        </div>
        <div class="strip-axis">${r.filter((e,t)=>t%4==0).map(e=>C`<span>${e.start_local}</span>`)}</div>
      </div>
      <div class="card plan-kpi">
        <div>
          <h3>${t(`planTitle`)}</h3>
          <div class="plan-state">${ao(X(e,O.plan))}</div>
          <div class="sub msg">${typeof n.message==`string`?n.message:``}</div>
        </div>
        <div>
          ${s(t(`planGridCharge`),`${e.fmt.n(Z(n.total_grid_charge_kwh),2)} kWh`)}
          ${s(t(`planSaving`),`${e.fmt.n(Z(n.expected_saving_eur),2)} €`,`var(--ok)`)}
          ${i?s(t(`planCheapest`),c(i.min)):T}
          ${i?s(t(`planMostExpensive`),c(i.max)):T}
          ${s(t(`planKnownUntil`),o)}
        </div>
      </div>
    </div>
    ${Aa(e)}`}var _o=e=>typeof e==`string`&&e?e:typeof e==`number`&&Number.isFinite(e)?String(e):typeof e==`boolean`?e?`1`:`0`:`–`;function vo(e){let{t}=e.i18n,n=oo(e,O.autoStrategy),r=n.overrides&&typeof n.overrides==`object`?n.overrides:{},i=Object.keys(r),a=(t,n,r,i)=>$(t,`${e.fmt.n(Z(n),r)} ${i}`);return C`
    ${$(t(`autoTitle`),ao(X(e,O.autoStrategy)))}
    ${$(t(`autoObjective`),_o(n.objective))}
    ${$(t(`autoLastRun`),typeof n.last_run==`string`?e.fmt.dayTime(n.last_run):`–`)}
    ${$(t(`autoFallback`),n.fallback===!0?t(`optYes`):n.fallback===!1?t(`optNo`):`–`)}
    ${typeof n.fallback_reason==`string`&&n.fallback_reason?$(t(`autoReason`),n.fallback_reason):T}
    ${$(t(`autoGrid`),_o(n.grid_size))}
    ${$(t(`autoSaving`),`${e.fmt.n(j(X(e,O.autoSaving)),2)} €`)}
    ${a(t(`autoDeltaDraw`),n.delta_grid_draw_kwh,2,`kWh`)}
    ${a(t(`autoDeltaFeed`),n.delta_grid_feed_in_kwh,2,`kWh`)}
    ${a(t(`autoDeltaCurtail`),n.delta_curtailed_kwh,2,`kWh`)}
    ${a(t(`autoDeltaSelf`),Z(n.delta_self_sufficiency)===void 0?void 0:Z(n.delta_self_sufficiency)*100,1,`%`)}
    ${i.length?C`<div class="sub">${t(`autoOverrides`)}</div>${i.map(e=>$(e,_o(r[e])))}`:n.fallback===!1&&typeof n.last_run==`string`?C`<p class="sub">${t(`autoNone`)}</p>`:T}`}function yo(e){let{t,phase:n}=e.i18n,r=oo(e,O.explanation);if(typeof r.phase!=`string`)return C`<div class="card"><p class="empty">${t(`noDecision`)}</p></div>`;let i=j(X(e,O.soc)),a=Z(r.target_soc),o=typeof r.timestamp==`string`?e.fmt.time(r.timestamp):void 0,s=[a===void 0?null:t(`tagTargetSoc`,{v:Math.round(a)}),t(`tagTargetPower`,{v:e.fmt.w(Z(r.target_charge_power)??j(X(e,O.targetCharge))??0)}),r.battery_priority===!0?t(`tagBatteryPriority`):null,o?t(`tagSince`,{t:o}):null].filter(e=>!!e),c=(t,n)=>Z(t)??j(X(e,n)),l=c(r.charge_power_limit,O.chargeLimit),u=c(r.sent_charge_power_limit,O.sentChargeLimit),d=c(r.discharge_power_limit,O.dischargeLimit),f=c(r.sent_discharge_power_limit,O.sentDischargeLimit),p=Math.max(9e3,l??0,u??0,d??0,f??0),m=(n,r,i)=>C`
    <div class="limit-row">
      <div class="lbl"><span>${n}</span><span>${t(`limitTarget`,{a:r===void 0?t(`limitNone`):e.fmt.w(r),b:i===void 0?t(`limitNone`):e.fmt.w(i)})}</span></div>
      <div class="bar"><div class="soll" style="width:${(r??0)/p*100}%"></div><div class="sent" style="width:${(i??0)/p*100}%"></div></div>
    </div>`;return C`
    <div class="grid dec-top">
      <div class="card phase-hero">
        <h3>${t(`decisionPhase`)}</h3>
        <div class="phase-name">${n(r.phase)}</div>
        <div class="phase-reason">${typeof r.reason==`string`?r.reason:``}</div>
        <div class="chips">${s.map(e=>C`<span class="chip on"><i></i>${e}</span>`)}</div>
      </div>
      <div class="card">
        <h3>${t(`limitsTitle`)}</h3>
        <div class="sub lim-sub">${t(`limitsSub`)}</div>
        <div class="limits">
          ${m(t(`limitCharge`),l,u)}
          <div class="limit-row">
            <div class="lbl"><span>${t(`targetPower`)}</span><span>${e.fmt.w(Z(r.target_charge_power)??j(X(e,O.targetCharge))??0)}</span></div>
          </div>
          ${m(t(`limitDischarge`),d,f)}
          ${a===void 0?T:C`<div class="limit-row">
                <div class="lbl"><span>${t(`targetSoc`)}</span><span>${t(`limitSoc`,{a:Math.round(i??0),b:Math.round(a)})}</span></div>
                <div class="bar"><div class="soll" style="width:${a}%"></div><div class="sent" style="width:${i??0}%"></div></div>
              </div>`}
        </div>
      </div>
    </div>
    <div class="card tl-card">
      <div class="card-head">
        <h3>${t(`timelineTitle`)}</h3>
        <button class="toggle" ?disabled=${!e.timeline?.length} @click=${()=>e.timeline&&io(`maestro-entscheidungen.csv`,co(e))}>${t(`exportCsv`)}</button>
      </div>
      ${e.timeline?.length?C`<div class="timeline">
            ${e.timeline.map(t=>C`<div class="tl-item">
                <div class="tl-time">${e.fmt.dayTime(t.ts)}</div>
                <div class="tl-phase">${n(t.phase)}</div>
                <div class="tl-reason">${t.reason}</div>
              </div>`)}
          </div>`:C`<p class="empty">${e.timeline?t(`timelineEmpty`):t(`loading`)}</p>`}
    </div>
    <div class="grid stat-row dec-extra">
      <div class="card">
        <h3>${t(`reserveTitle`)}</h3>
        <div class="rows">
          ${$(t(`reserveSeasonal`),mo(e,O.seasonalReserve))}
          ${$(t(`reserveAdaptive`),mo(e,O.adaptiveReserve))}
          ${$(t(`reserveHt`),mo(e,O.htReserve))}
          ${$(t(`reserveForward`),mo(e,O.forwardTarget))}
          ${$(t(`targetSoc`),mo(e,O.targetSoc))}
        </div>
      </div>
      <div class="card">
        <h3>${t(`windowsTitle`)}</h3>
        <div class="rows">
          ${$(t(`windowAstro`),ao(X(e,O.astroStart)))}
          ${$(t(`windowSeasonalEnd`),ao(X(e,O.seasonalEnd)))}
          ${$(t(`windowPvDelay`),ao(X(e,O.pvDelayStart)))}
          ${$(t(`windowTomorrow`),`${ao(X(e,O.tomorrowStart))} – ${ao(X(e,O.tomorrowEnd))}`)}
        </div>
      </div>
      <div class="card">
        <h3>${t(`autoTitle`)}</h3>
        <div class="rows">${vo(e)}</div>
      </div>
    </div>
    <section class="group">
      <button type="button" class="group-head ${e.debugOpen?`open`:``}" aria-expanded=${e.debugOpen} @click=${e.onToggleDebug}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        <span>${t(`debugTitle`)}</span>
      </button>
      ${e.debugOpen?C`<div class="card debug-card">
            <div class="force">
              <div class="txt"><b>${t(`debugSwitch`)}</b></div>
              <button
                class="switch ${lo(e)?`on`:``}"
                role="switch"
                aria-checked=${lo(e)}
                aria-label=${t(`debugSwitch`)}
                ?disabled=${!X(e,O.debug)||e.pending.has(O.debug)}
                @click=${()=>e.onToggle(O.debug)}
              ></button>
            </div>
            <pre class="debug-log">${uo(e)}</pre>
          </div>`:T}
    </section>`}var bo,xo={pv:{entity:`pv`,color:`#fbbf24`,label:`nodePv`},grid:{entity:`grid`,color:`#f87171`,label:`nodeImport`},house:{entity:`house`,color:`#a78bfa`,label:`nodeHouse`},bat:{entity:`battery`,color:`#22d3ee`,label:`nodeBatCharge`}},So=new URLSearchParams(location.search).has(`debug`),Co=[{id:`live`,label:`navLive`,sub:`subLive`,icon:`<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>`},{id:`forecast`,label:`navForecast`,sub:`subForecast`,icon:`<path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/>`},{id:`plan`,label:`navPlan`,sub:`subPlan`,icon:`<rect x="3" y="10" width="4" height="11" rx="1"/><rect x="10" y="5" width="4" height="16" rx="1"/><rect x="17" y="13" width="4" height="8" rx="1"/>`},{id:`decision`,label:`navDecision`,sub:`subDecision`,icon:`<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>`},{id:`plant`,label:`navPlant`,sub:`subPlant`,icon:`<path d="M4 21V10l8-7 8 7v11"/><path d="M9 21v-6h6v6"/>`},{id:`settings`,label:`navSettings`,sub:`subSettings`,icon:`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`}],wo=`<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>`,To=`(max-width: 960px)`,Eo=3e5,Do=6e4,Oo=6,ko=3e4,Ao=6,jo=(e,t=``)=>C`<svg class=${t} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${e}></svg>`,Mo=()=>{let[e,t]=location.hash.slice(1).split(`/`),n=Co.some(t=>t.id===e)?e:`live`;return{screen:n,settingsGroup:n===`settings`?ma(t):void 0,plantGroup:n===`plant`&&Ya(t)?t:void 0}},No=Mo(),Po=class extends Ve{constructor(...e){super(...e),this._narrow=!1,this._screen=No.screen,this._settingsGroup=No.settingsGroup,this._plantGroup=No.plantGroup,this._theme=zr(),this._sheet=!1,this._mobile=window.matchMedia(To).matches,this._mq=window.matchMedia(To),this._range=24,this._showIst=!0,this._loadedAt=new Map,this._pending=new Set,this._flowRaf=0,this._motion=!0,this._histState=`loading`,this._stats={hassUpdates:0,renders:0},this._resolvedAt=0,this._consumers=Ot(),this._collapsed=ur(),this._setupAck=fi(),this._period=`today`,this._debugOpen=!1,this._picking=!1,this._pickQuery=``,this._focusConsumers=!1,this._storedOptions={},this._optionsLoaded=!1,this._optionsReady=!1,this._optionQuery={},this._slots=[],this._slotsDirty=!1,this._phasePoints={},this._phaseHistory=`idle`,this._phaseTicket=0,this._watchSig=``,this._onMq=e=>{this._mobile=e.matches,this.requestUpdate()},this._onPop=()=>{let e=Mo();this._screen=e.screen,this._settingsGroup=e.settingsGroup,this._plantGroup=e.plantGroup,this.requestUpdate(),this._loadPhaseHistory()},this._animateFlows=e=>{Yn(this.renderRoot.querySelectorAll(`.electron`),e),this._flowRaf=requestAnimationFrame(this._animateFlows)},this._onKey=e=>{e.key===`Escape`&&(this._hist?this._closeHistory():this._sheet&&this._setSheet(!1))},this._onChartError=e=>{this._chartError=e.detail,this.requestUpdate()},this._scrollKey=``}set hass(e){this._stats.hassUpdates++;let t=this._hass;this._hass=e,(!t||this._missingKeys(e).length)&&this._resolveEntities();let n=this._watchSignature(e);!t||t.language!==e.language||n!==this._watchSig?(this._watchSig=n,this.requestUpdate()):So&&this.requestUpdate()}_watchSignature(e){let t=``;for(let n of ft()){let r=e.states[n],i=r?r.last_updated??r.last_changed:``;t+=`${n}:${r?.state??``}:${i};`}let n=e.states[O.sizingScenario]?.attributes;return n&&(t+=JSON.stringify(n.slider_battery_kwh)+JSON.stringify(n.slider_pv_kwp)+JSON.stringify(n.scenario_monthly_avoided_kwh)),t}get hass(){return this._hass}set narrow(e){e!==this._narrow&&(this._narrow=e,this.requestUpdate())}get narrow(){return this._narrow}connectedCallback(){super.connectedCallback(),fn(this._theme),this._mq.addEventListener(`change`,this._onMq),this._mobile=this._mq.matches,this._timer=window.setInterval(()=>void this._ensureHistory(),Do),this.addEventListener(`chart-error`,this._onChartError),window.addEventListener(`keydown`,this._onKey),window.addEventListener(`popstate`,this._onPop);let e=location.hash.slice(1).split(`/`)[1];this._screen===`settings`&&e&&this._settingsGroup&&e!==this._settingsGroup&&history.replaceState(null,``,`#settings/${this._settingsGroup}`),this._motion=!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,this._motion&&(this._flowRaf=requestAnimationFrame(this._animateFlows))}disconnectedCallback(){super.disconnectedCallback(),this._mq.removeEventListener(`change`,this._onMq),window.clearInterval(this._timer),window.clearTimeout(this._overflowTimer),cancelAnimationFrame(this._flowRaf),this.removeEventListener(`chart-error`,this._onChartError),window.removeEventListener(`keydown`,this._onKey),window.removeEventListener(`popstate`,this._onPop)}_closeHistory(){this._hist=void 0,this._histPoints=void 0,this.requestUpdate()}_openFlow(e){let t=this._hass;if(!t)return;let n=Pr(t.language),r=xo[e],i=this._consumers.find(t=>t.id===e),a=r?O[r.entity]:i?.entityId;if(!a)return;let o=t.states[a],s=j(o),c=e===`grid`&&s!==void 0&&s>=0,l=e===`grid`?n.t(c?`nodeFeed`:`nodeImport`):r?n.t(r.label):i?.name??a,u=c?`#34d399`:r?.color??`#38bdf8`,d=o?.attributes.unit_of_measurement;this._hist={name:l,color:u,entityId:a},this._histPoints=void 0,this._histState=`loading`,this.requestUpdate(),Cr(t,a,d===`kW`?1e3:1).then(e=>{this._hist?.entityId===a&&(this._histPoints=e,this._histState=e.length?`ready`:`empty`,this.requestUpdate())}).catch(()=>{this._hist?.entityId===a&&(this._histState=`error`,this.requestUpdate())})}async _resolveEntities(){let e=this._hass;if(!(!e||Date.now()-this._resolvedAt<ko)){this._resolvedAt=Date.now();try{let t=await e.callWS({type:`e3dc_maestro/panel_entities`}),n=JSON.stringify(O);it(t),st(t);let r=JSON.stringify(k.entities);ct(t),JSON.stringify(k.entities)!==r&&(this._phasePoints={},this._loadedAt.delete(`plant-grid`),this._loadedAt.delete(`plant-pv`)),this._entityMap=t,JSON.stringify(O)!==n&&this._loadedAt.clear(),this.requestUpdate(),this._ensureHistory()}catch{}}}_missingKeys(e){return Object.keys(nt).filter(t=>!e.states[O[t]])}_entityNotice(e,t){let n=this._entityMap;if(n&&n.entry_id===null)return C`<p class="err">${t(`notSetUp`)}</p>`;let r=this._missingKeys(e);if(!r.length)return T;let i=new Set(n?.disabled??[]),a=r.slice(0,Ao).map(e=>i.has(e)?`${O[e]} (${t(`entityDisabled`)})`:O[e]),o=r.length>Ao?` +${r.length-Ao}`:``;return C`<p class="err">${t(`entitiesMissing`,{list:a.join(`, `)+o})}</p>`}_alerts(e,t){let n=t=>e.states[t]?.state,r=n(O.reachable)===`off`,i=[r?t(`alertUnreachable`):null,n(O.chargeLock)===`on`?t(`alertChargeLock`):null,n(O.dischargeLock)===`on`?t(`alertDischargeLock`):null,n(O.unjustified)===`on`?t(`alertUnjustified`):null].filter(e=>!!e);return i.length?C`<div class="banner ${r?`bad`:``}" role="status">${i.map(e=>C`<span>${e}</span>`)}</div>`:T}async _ensureHistory(){let e=this._hass;if(!e||document.hidden)return;let t=e=>Date.now()-(this._loadedAt.get(e)??0)>Eo,n=async(e,n)=>{if(t(e)){this._loadedAt.set(e,Date.now()-Eo+Do);try{await n(),this._loadedAt.set(e,Date.now()),this.requestUpdate()}catch{}}};if(this._screen===`live`&&await n(`sparks`,async()=>void(this._sparks=await yr(e))),this._screen===`live`&&this._period!==`today`){let t=this._period;await n(`period-${t}`,async()=>void(this._periodSums=await vr(e,t)))}this._screen===`forecast`&&this._showIst&&await n(`ist`,async()=>void(this._ist=await Tr(e,Oo))),this._screen===`decision`&&await n(`timeline`,async()=>void(this._timeline=await Er(e))),await this._loadPhaseHistory()}async _loadPhaseHistory(){let e=this._hass,t=this._plantGroup;if(!e||document.hidden||this._screen!==`plant`||t!==`grid`&&t!==`pv`)return;let n=(t===`grid`?[`houseL1`,`houseL2`,`houseL3`,`gridL1`,`gridL2`,`gridL3`]:[`pviL1`,`pviL2`,`pviL3`]).map(e=>k.entities[e]).filter(e=>!!e);if(!n.length)return;let r=`plant-${t}`;if(n.every(e=>e in this._phasePoints)&&Date.now()-(this._loadedAt.get(r)??0)<=Eo){this._phaseHistory!==`ready`&&(this._phaseHistory=`ready`,this.requestUpdate());return}let i=++this._phaseTicket;n.every(e=>e in this._phasePoints)||(this._phaseHistory=`loading`,this.requestUpdate());try{let t=await wr(e,n);if(this._phasePoints={...this._phasePoints,...Object.fromEntries(n.map(e=>[e,t[e]??[]]))},this._loadedAt.set(r,Date.now()),i!==this._phaseTicket)return;this._phaseHistory=`ready`}catch{if(i!==this._phaseTicket)return;this._loadedAt.set(r,Date.now()-Eo+Do),this._phaseHistory=`error`}this.requestUpdate()}_setTheme(e){this._theme=e,fn(e),Br(e),this.requestUpdate()}_go(e){this._screen=e,this._settingsGroup=void 0,this._plantGroup=void 0,this._zoomKey=void 0,this._error=void 0,history.replaceState(null,``,`#${e}`),this.requestUpdate(),this._ensureHistory()}_openSettingsGroup(e){this._screen=`settings`,this._settingsGroup=e,e===W.id&&(this._classic=void 0),history.pushState({maestroGroup:!0},``,`#settings/${e}`),this.requestUpdate()}_openPlantRoom(e){this._screen=`plant`,this._plantGroup=e,history.pushState({maestroGroup:!0},``,`#plant/${e}`),this.requestUpdate(),this._loadPhaseHistory()}_closeArea(){history.state?.maestroGroup?history.back():(this._screen===`plant`?(this._plantGroup=void 0,history.replaceState(null,``,`#plant`)):(this._settingsGroup=void 0,history.replaceState(null,``,`#settings`)),this.requestUpdate())}_setSheet(e){this._sheet=e,e||(this._error=void 0,this._picking=!1),this.requestUpdate()}_openConsumers(){this._sheet=!0,this._focusConsumers=!0,this.requestUpdate()}_heldOverflow(e){let t=Date.now(),n=Mt(e,this._overflowSince,t);if(this._overflowSince=n.since,window.clearTimeout(this._overflowTimer),this._overflowTimer=void 0,n.since!==void 0&&!n.show){let e=Math.max(0,gt-(t-n.since));this._overflowTimer=window.setTimeout(()=>this.requestUpdate(),e)}return n.show}_setConsumers(e,t=!1){this._consumers=e.slice(0,6),kt(this._consumers),this._setOption(`flow_consumers`,this._consumers,!0),t&&(this._picking=!1,this._pickQuery=``),this.requestUpdate()}async _call(e,t,n,r){let i=this._hass;if(i){this._pending.add(e),this._error=void 0,this.requestUpdate();try{await i.callService(t,n,r)}catch(e){let t=e instanceof Error?e.message:typeof e==`object`&&e&&`message`in e?String(e.message):String(e);this._error=Pr(i.language).t(`callFailed`,{err:t})}finally{this._pending.delete(e),this.requestUpdate()}}}_toggle(e){let t=M(this._hass?.states[e]);this._call(e,`switch`,t?`turn_off`:`turn_on`,{entity_id:e})}_press(e){this._call(e,`button`,`press`,{entity_id:e})}_select(e,t){this._call(e,`select`,`select_option`,{entity_id:e,option:t})}_commitPower(e){this._commitNumber(O.forceDischargePower,e).then(()=>{this._powerDraft=void 0,this.requestUpdate()})}_commitReserve(e){this._commitNumber(O.fixedReserveSoc,e).then(()=>{this._reserveDraft=void 0,this.requestUpdate()})}_commitNumber(e,t){return this._call(e,`number`,`set_value`,{entity_id:e,value:t})}async _checkClassic(){let e=this._hass;e&&(this._classic={...this._classic,state:`checking`},this.requestUpdate(),this._classic=await Yr(e),this.requestUpdate())}async _createClassic(){let e=this._hass,t=this._classic;if(e&&t){this._classic={...t,state:`creating`},this.requestUpdate();try{await Xr(e,t.state),await this._checkClassic()}catch(e){this._classic={...t,state:`error`,error:Ur(e)},this.requestUpdate()}}}_openClassic(){history.pushState(null,``,`/e3dc-maestro`),window.dispatchEvent(new CustomEvent(`location-changed`,{detail:{replace:!1}}))}_toggleMenu(){this.dispatchEvent(new Event(`hass-toggle-menu`,{bubbles:!0,composed:!0}))}_fault(e){if(e instanceof Error)return e.message;if(e&&typeof e==`object`&&`message`in e){let t=e.message;if(typeof t==`string`&&t)return t}return String(e)}async _loadOptions(){let e=this._hass;if(e&&!this._optionsLoaded){this._optionsLoaded=!0;try{let t=await e.callWS({type:`e3dc_maestro/panel_options`});this._storedOptions=t.options??{},this._optionsReady=!0,this._slotsDirty||(this._slots=yi(this._storedOptions.tariff_slots));let n=Dt(this._storedOptions.flow_consumers,this._consumers);this._consumers=n.list,kt(n.list),n.publishLocal&&this._setOption(`flow_consumers`,n.list,!0)}catch(e){this._optionError=this._fault(e)}this.requestUpdate()}}async _setOption(e,t,n=!1){let r=this._hass;if(r){this._pending.add(e),this._optionError=void 0,this.requestUpdate();try{let i=await r.callWS({type:`e3dc_maestro/panel_options/set`,values:{[e]:t}}),a={...this._storedOptions};t===null?delete a[e]:a[e]=t,this._storedOptions=a,n||(this._optionNotice=i.reloaded?`reload`:`saved`),e===`tariff_slots`&&(this._slotsDirty=!1),i.reloaded&&(this._resolvedAt=0,this._resolveEntities())}catch(e){this._optionError=this._fault(e)}finally{this._pending.delete(e),this.requestUpdate()}}}render(){this._stats.renders++;let e=this._hass;if(!e)return C``;let t=Pr(e.language),n=or(e.language),{t:r}=t,i={hass:e,i18n:t,isAdmin:e.user?.is_admin===!0,options:this._storedOptions,ready:this._optionsReady,error:this._optionError,notice:this._optionNotice,query:this._optionQuery,pending:this._pending,slots:this._slots,onQuery:(e,t)=>{this._optionQuery={...this._optionQuery,[e]:t},this.requestUpdate()},onChange:(e,t)=>void this._setOption(e,t),onSlots:e=>{this._slots=e,this._slotsDirty=!0,this.requestUpdate()},onSaveSlots:()=>void this._setOption(`tariff_slots`,this._slots),onRunSizing:()=>this._press(O.btnSizing)},a={hass:e,i18n:t,fmt:n,mobile:this._mobile,sparks:this._sparks,ist:this._ist,timeline:this._timeline,range:this._range,showIst:this._showIst,onRange:e=>{this._range=e,this.requestUpdate()},onToggleIst:()=>{this._showIst=!this._showIst,this.requestUpdate(),this._ensureHistory()},consumers:At(this._consumers,e),consumerOverflow:this._heldOverflow(jt(j(e.states[O.house]),At(this._consumers,e))),onEditConsumers:()=>this._openConsumers(),onFlowNode:e=>this._openFlow(e),motion:this._motion,collapsed:this._collapsed,onToggleGroup:e=>{let t=new Set(this._collapsed);t.delete(e)||t.add(e),this._collapsed=t,dr(t),this.requestUpdate()},period:this._period,periodSums:this._periodSums,onPeriod:e=>{this._period=e,this.requestUpdate(),this._ensureHistory()},pending:this._pending,groupId:this._screen===`plant`?this._plantGroup:this._settingsGroup,onOpenGroup:e=>this._openSettingsGroup(e),setupAck:this._setupAck,onAckSetup:()=>{this._setupAck=!0,pi(),this.requestUpdate()},onOpenRoom:e=>this._openPlantRoom(e),onOpenClassic:()=>this._openClassic(),classic:this._classic,isAdmin:e.user?.is_admin===!0,onCreateClassic:()=>void this._createClassic(),onCheckClassic:()=>void this._checkClassic(),onToggle:e=>this._toggle(e),onPress:e=>this._press(e),onSelect:(e,t)=>this._select(e,t),onNumber:(e,t)=>void this._commitNumber(e,t),forcePowerDraft:this._powerDraft,onPowerDraft:e=>{this._powerDraft=e,this.requestUpdate()},onPowerCommit:e=>this._commitPower(e),reserveDraft:this._reserveDraft,onReserveDraft:e=>{this._reserveDraft=e,this.requestUpdate()},onReserveCommit:e=>this._commitReserve(e),debugOpen:this._debugOpen,onToggleDebug:()=>{this._debugOpen=!this._debugOpen,this.requestUpdate()},theme:this._theme,onTheme:e=>this._setTheme(e),phasePoints:this._phasePoints,phaseHistory:this._phaseHistory,options:i},o=Co.find(e=>e.id===this._screen)??Co[0],s=this._screen===`settings`?ha(this._settingsGroup):void 0,c=this._screen===`plant`?Xa(this._plantGroup):void 0,l=s??c,u=M(e.states[O.ctrlActive]),d=e.states[O.phase]?.state,f={live:fo,forecast:ho,plan:go,decision:yo,plant:to,settings:Ma}[o.id](a);return C`
      <div class="app">
        <nav class="rail" aria-label="Maestro">
          <div class="logo">
            <img src=${On} alt="Maestro" />
          </div>
          ${Co.map(e=>C`<button
      class="nav-btn ${e.id===o.id?`active`:``}"
      aria-current=${e.id===o.id?`page`:`false`}
      @click=${()=>this._go(e.id)}
    >
      ${jo(e.icon)}${r(e.label)}
    </button>`)}
          <div class="spacer"></div>
          <button class="nav-btn" @click=${()=>this._setSheet(!0)}>${jo(wo)}${r(`navControls`)}</button>
        </nav>
        <main>
          <header class="topbar">
            ${this._narrow?C`<button class="menu" aria-label=${r(`menu`)} @click=${this._toggleMenu}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" /></svg>
                </button>`:T}
            ${l?C`<button class="menu" aria-label=${r(`settingsBack`)} @click=${()=>this._closeArea()}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.4 5.4 9.8 11H21v2H9.8l5.6 5.6L14 20l-8-8 8-8z"/></svg>
                </button>`:T}
            <div class="title grow">
              <h1>${r(l?l.title:o.label)}</h1>
              <p>${r(l?l.hint:o.sub)}</p>
            </div>
            <span class="pill hide-sm"><span class="dot ${u?``:`off`}"></span>${r(u?`regulationOn`:`regulationOff`)}${d?` · ${t.phase(d)}`:``}</span>
          </header>
          ${this._entityNotice(e,r)}
          ${this._alerts(e,r)}
          ${this._error&&!this._sheet?C`<p class="err" role="alert">${this._error}</p>`:T}
          ${this._chartError?C`<p class="err">${r(`chartError`,{err:this._chartError})}</p>`:T}
          <section class="screen" id=${`screen-${o.id}`}>${f}</section>
          ${So?C`<footer class="debug">hass-Updates ${this._stats.hassUpdates} · Renders ${this._stats.renders}</footer>`:T}
        </main>
      </div>
      ${Zt({hass:e,i18n:t,fmt:n,open:this._sheet,pending:this._pending,error:this._error,forcePowerDraft:this._powerDraft,onClose:()=>this._setSheet(!1),onToggle:e=>this._toggle(e),onPowerDraft:e=>{this._powerDraft=e,this.requestUpdate()},onPowerCommit:e=>this._commitPower(e),reserveDraft:this._reserveDraft,onReserveDraft:e=>{this._reserveDraft=e,this.requestUpdate()},onReserveCommit:e=>this._commitReserve(e),onPress:e=>this._press(e),onSelect:(e,t)=>this._select(e,t),onAllSettings:()=>{this._setSheet(!1),this._go(`settings`)},consumers:this._consumers,picking:this._picking,pickQuery:this._pickQuery,choices:Nt(e,new Set(this._consumers.map(e=>e.entityId)),this._pickQuery),wallbox:e.states[`sensor.e3dc_maestro_wallbox_leistung`]&&!this._consumers.some(e=>e.entityId===`sensor.e3dc_maestro_wallbox_leistung`)?{id:pt,name:wt(e.states[pt],t.t(`useWallbox`))}:void 0,onPick:e=>{this._picking=e,this.requestUpdate()},onPickQuery:e=>{this._pickQuery=e,this.requestUpdate()},onAddConsumer:(e,t)=>{this._consumers.some(t=>t.entityId===e)||this._setConsumers([...this._consumers,{id:Et(),entityId:e,name:t,mode:`included`,icon:bt(e)}],!0)},onUseWallbox:()=>{let n=wt(e.states[pt],t.t(`useWallbox`));this._setConsumers([...this._consumers,{id:Et(),entityId:pt,name:n,mode:`separate`,icon:`wallbox`}],!0)},onRenameConsumer:(e,t)=>{let n=t.slice(0,40);n.trim()&&this._setConsumers(this._consumers.map(t=>t.id===e?{...t,name:n}:t))},onConsumerMode:(e,t)=>{this._setConsumers(this._consumers.map(n=>n.id===e?{...n,mode:t}:n))},onConsumerIcon:(e,t)=>{this._setConsumers(this._consumers.map(n=>n.id===e?{...n,icon:t}:n))},onRemoveConsumer:e=>this._setConsumers(this._consumers.filter(t=>t.id!==e))})}
      ${this._hist?C`<div class="scrim open hist-scrim" @click=${()=>this._closeHistory()}></div>
            <aside class="overlay" role="dialog" aria-modal="true" aria-label=${this._hist.name}>
              <div class="sheet-head">
                <div class="grow"><h2>${this._hist.name}</h2><div class="sub">${r(`historySub`)}</div></div>
                <button class="btn" @click=${()=>this._closeHistory()}>${r(`close`)}</button>
              </div>
              ${this._histState===`loading`?C`<p class="hint">${r(`loading`)}</p>`:T}
              ${this._histState===`empty`?C`<p class="hint">${r(`historyEmpty`)}</p>`:T}
              ${this._histState===`error`?C`<p class="err">${r(`historyFailed`)}</p>`:T}
              ${this._histState===`ready`&&this._histPoints?C`<maestro-chart .options=${R(`hist-${this._hist.entityId}`,[this._theme,this._histPoints,this._hist.color,n.loc],()=>En(this._histPoints,this._hist.color,n))}></maestro-chart>`:T}
            </aside>`:T}
    `}firstUpdated(){this._ensureHistory()}willUpdate(){this.getAttribute(`theme`)!==this._theme&&this.setAttribute(`theme`,this._theme)}updated(){let e=`${this._screen}/${this._settingsGroup??``}/${this._plantGroup??``}`;if(e!==this._scrollKey){this._scrollKey=e;let t=this.renderRoot.querySelector(`main`);t&&!this._focusConsumers&&(t.scrollTop=0)}if(this._loadOptions(),this._screen===`settings`&&this._settingsGroup===W.id&&!this._classic&&this._checkClassic(),this._focusConsumers&&(this._focusConsumers=!1,this.renderRoot.querySelector(`#display-consumers`)?.scrollIntoView({block:`start`})),this._screen!==`forecast`||!this._hass)return;let t=$t(this._hass.states[O.trajectory]?.attributes),n=this.renderRoot.querySelector(`#fc-main`);if(!t||!n)return;let r=t.trajectory_points[0][0],i=t.trajectory_points[t.trajectory_points.length-1][0],a=this._showIst&&this._ist?.pv.length?Math.min(r,this._ist.pv[0][0]):r,o=`${this._range}|${a}|${r}`;o!==this._zoomKey&&(this._zoomKey=o,n.zoomX(a,Math.min(i,r+this._range*36e5)))}};bo=Po,bo.styles=Fr,customElements.get(`e3dc-maestro-panel`)||customElements.define(`e3dc-maestro-panel`,Po);