var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:f,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,h=globalThis,g=h.trustedTypes,_=g?g.emptyScript:``,v=h.reactiveElementPolyfillSupport,y=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},ee=(e,t)=>!l(e,t),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:ee};Symbol.metadata??=Symbol(`metadata`),h.litPropertyMetadata??=new WeakMap;var S=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(y(`elementProperties`)))return;let e=m(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y(`properties`))){let e=this.properties,t=[...f(e),...p(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?b:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?b:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??ee)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};S.elementStyles=[],S.shadowRootOptions={mode:`open`},S[y(`elementProperties`)]=new Map,S[y(`finalized`)]=new Map,v?.({ReactiveElement:S}),(h.reactiveElementVersions??=[]).push(`2.1.2`);var te=globalThis,C=e=>e,w=te.trustedTypes,T=w?w.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,ne=`$lit$`,E=`lit$${Math.random().toFixed(9).slice(2)}$`,D=`?`+E,O=`<${D}>`,k=document,A=()=>k.createComment(``),re=e=>e===null||typeof e!=`object`&&typeof e!=`function`,j=Array.isArray,M=e=>j(e)||typeof e?.[Symbol.iterator]==`function`,N=`[ 	
\f\r]`,ie=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ae=/-->/g,P=/>/g,F=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),oe=/'/g,I=/"/g,se=/^(?:script|style|textarea|title)$/i,L=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),R=L(1),z=L(2),ce=Symbol.for(`lit-noChange`),B=Symbol.for(`lit-nothing`),le=new WeakMap,V=k.createTreeWalker(k,129);function H(e,t){if(!j(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return T===void 0?t:T.createHTML(t)}var ue=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=ie;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===ie?c[1]===`!--`?o=ae:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=F):(se.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=F):o=P:o===F?c[0]===`>`?(o=i??ie,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?F:c[3]===`"`?I:oe):o===I||o===oe?o=F:o===ae||o===P?o=ie:(o=F,i=void 0);let d=o===F&&e[t+1].startsWith(`/>`)?` `:``;a+=o===ie?n+O:l>=0?(r.push(s),n.slice(0,l)+ne+n.slice(l)+E+d):n+E+(l===-2?t:d)}return[H(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},de=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=ue(t,n);if(this.el=e.createElement(l,r),V.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=V.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(ne)){let t=u[o++],n=i.getAttribute(e).split(E),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?ge:r[1]===`?`?_e:r[1]===`@`?ve:he}),i.removeAttribute(e)}else e.startsWith(E)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(se.test(i.tagName)){let e=i.textContent.split(E),t=e.length-1;if(t>0){i.textContent=w?w.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],A()),V.nextNode(),c.push({type:2,index:++a});i.append(e[t],A())}}}else if(i.nodeType===8){if(i.data===D)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(E,e+1))!==-1;)c.push({type:7,index:a}),e+=E.length-1}}a++}}static createElement(e,t){let n=k.createElement(`template`);return n.innerHTML=e,n}};function fe(e,t,n=e,r){if(t===ce)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=re(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=fe(e,i._$AS(e,t.values),i,r)),t}var pe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??k).importNode(t,!0);V.currentNode=r;let i=V.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new me(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new ye(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=V.nextNode(),a++)}return V.currentNode=k,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},me=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=fe(this,e,t),re(e)?e===B||e==null||e===``?(this._$AH!==B&&this._$AR(),this._$AH=B):e!==this._$AH&&e!==ce&&this._(e):e._$litType$===void 0?e.nodeType===void 0?M(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==B&&re(this._$AH)?this._$AA.nextSibling.data=e:this.T(k.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=de.createElement(H(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new pe(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=le.get(e.strings);return t===void 0&&le.set(e.strings,t=new de(e)),t}k(t){j(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(A()),this.O(A()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=C(e).nextSibling;C(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},he=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=B,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=B}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=fe(this,e,t,0),a=!re(e)||e!==this._$AH&&e!==ce,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=fe(this,r[n+o],t,o),s===ce&&(s=this._$AH[o]),a||=!re(s)||s!==this._$AH[o],s===B?e=B:e!==B&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},ge=class extends he{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===B?void 0:e}},_e=class extends he{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==B)}},ve=class extends he{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=fe(this,e,t,0)??B)===ce)return;let n=this._$AH,r=e===B&&n!==B||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==B&&(n===B||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ye=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){fe(this,e)}},be={M:ne,P:E,A:D,C:1,L:ue,R:pe,D:M,V:fe,I:me,H:he,N:_e,U:ve,B:ge,F:ye},xe=te.litHtmlPolyfillSupport;xe?.(de,me),(te.litHtmlVersions??=[]).push(`3.3.3`);var Se=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new me(t.insertBefore(A(),e),e,void 0,n??{})}return i._$AI(e),i},Ce=globalThis,we=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Se(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ce}};we._$litElement$=!0,we.finalized=!0,Ce.litElementHydrateSupport?.({LitElement:we});var Te=Ce.litElementPolyfillSupport;Te?.({LitElement:we}),(Ce.litElementVersions??=[]).push(`4.2.2`);var Ee=(function(){let e=typeof document<`u`&&document.createElement(`link`).relList;return e&&e.supports&&e.supports(`modulepreload`)?`modulepreload`:`preload`})(),De=function(e,t){return new URL(e,t).href},Oe={},ke=function(e){return e.pathname.endsWith(`.css`)},Ae=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},je=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=De(t,n);let r=s(t),i=ke(r);return Ae(Oe,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Ee,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Me,Ne=new WeakMap,Pe,Fe=0;async function Ie(){return Pe??=await je(()=>import(`./apex-DvHPYsi2.js`),[],import.meta.url),Pe}var Le=class extends we{constructor(...e){super(...e),this._run=0,this._shape=``,this._onRebuilt=e=>{let t=this.options?.chart?.brush?.target;if(t&&e.detail===t&&this._chart){try{this._chart.destroy()}catch{}this._chart=void 0,this.replaceChildren(),this.requestUpdate(`options`)}}}createRenderRoot(){return this}updated(e){e.has(`options`)&&this._apply().catch(e=>{this.dispatchEvent(new CustomEvent(`chart-error`,{detail:e instanceof Error?`${e.name}: ${e.message}`:String(e),bubbles:!0,composed:!0}))})}connectedCallback(){super.connectedCallback(),Fe++,Pe?.claimSVG(),this.hasUpdated&&this.options&&!this._chart&&this.requestUpdate(`options`),window.addEventListener(`maestro-chart-rebuilt`,this._onRebuilt)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(`maestro-chart-rebuilt`,this._onRebuilt),--Fe===0&&Pe?.releaseSVG(),this._run++;try{this._chart?.destroy()}catch{}this._chart=void 0,this.replaceChildren()}_scoped(e){let t=e.chart?.id,n=e.chart?.brush?.target,r=this.getRootNode(),i=Ne.get(r);i||Ne.set(r,i=Math.random().toString(36).slice(2,8));let a=i;return{...e,chart:{...e.chart,...t?{id:`${t}-${a}`}:{},...n?{brush:{...e.chart?.brush,target:`${n}-${a}`}}:{}}}}zoomX(e,t){this._zoom=[e,t],this._chart?.zoomX(e,t)}plotMetrics(){let e=this._chart?.w?.globals;if(!e)return;let t=e.minX,n=e.maxX;if(typeof t!=`number`||typeof n!=`number`||!(n>t))return;let r=this.getBoundingClientRect(),i=this.querySelector(`.apexcharts-grid`)?.getBoundingClientRect();if(i&&r.width>0&&i.width>0)return{left:i.left-r.left,width:i.width,minX:t,maxX:n};let a=e.translateX,o=e.gridWidth;if(typeof a==`number`&&typeof o==`number`&&o>0)return{left:a,width:o,minX:t,maxX:n}}setPlotPadding(e,t){let n=Math.max(0,Math.round(e)),r=Math.max(0,Math.round(t)),i=this._plotPad;i&&i[0]===n&&i[1]===r||(this._plotPad=[n,r],this._chart&&this._chart.updateOptions({grid:{padding:{left:n,right:r}}},!1,!1))}async _apply(){let e=this.options;if(!e)return;let t=this._scoped(e);if(this._plotPad){let[e,n]=this._plotPad;t={...t,grid:{...t.grid,padding:{...t.grid?.padding,left:e,right:n}}}}let n=++this._run,r=await Ie(),i=r.default;if(n!==this._run||!this.isConnected)return;r.claimSVG();let a=t.chart?.brush?.target;if(a){for(let e=0;e<120&&!i.getChartByID(a);e++)if(await new Promise(e=>requestAnimationFrame(e)),n!==this._run)return}let o=`${Array.isArray(t.series)?t.series.length:0}|${Array.isArray(t.yaxis)?t.yaxis.length:1}|${t.chart?.type}`;if(this._chart&&o!==this._shape){try{this._chart.destroy()}catch{}this._chart=void 0,this.replaceChildren(),t.chart?.id&&window.dispatchEvent(new CustomEvent(`maestro-chart-rebuilt`,{detail:e.chart?.id}))}this._shape=o,this._chart?(await this._chart.updateOptions(t,!1,!1),t.series&&await this._chart.updateSeries(t.series,!1)):(this._chart=new i(this,t),await this._chart.render()),n===this._run&&this._zoom&&this._chart.zoomX(...this._zoom)}};Me=Le,Me.properties={options:{attribute:!1}},customElements.get(`maestro-chart`)||customElements.define(`maestro-chart`,Le);var U=e=>`sensor.e3dc_maestro_${e}`,Re=e=>`binary_sensor.e3dc_maestro_${e}`,ze=e=>`switch.e3dc_maestro_${e}`,Be={phase:U(`regelphase`),lastAction:U(`letzte_aktion`),explanation:U(`entscheidungserklarung`),trajectory:U(`forecast_soc_trajektorie_24h`),plan:U(`preisplan`),soc:U(`aktueller_soc`),targetSoc:U(`ziel_soc`),pv:U(`pv_power`),additionalPv:U(`additional_pv_power`),house:U(`house_power`),grid:U(`grid_power`),battery:U(`battery_power`),autonomy:U(`autonomiezeit`),costNet:U(`netto_stromkosten_heute`),costToday:U(`stromkosten_heute`),feedRevenue:U(`einspeise_erlos_heute`),wear:U(`akku_verschleiss_heute`),balance:U(`energiebilanz_heute`),gridToBattery:U(`netz_akku_heute`),unjustified:Re(`netzladung_ohne_rechtfertigung`),wallboxEnergy:U(`wallbox_energie_heute`),feedInInterventions:U(`einspeise_eingriffe_heute`),feedInAvoided:U(`dc_abregelung_verhindert_heute`),curtailAvoided:U(`abregelung_verhindert_heute`),feedInLimit:Re(`einspeisedrosselung_aktiv`),gridCharge:Re(`netzladung_aktiv`),batteryPriority:Re(`akku_prioritat_aktiv`),lowYield:Re(`schwacher_pv_tag`),forecastQuality:U(`forecast_datenqualitat`),p10:U(`pv_restprognose_p10`),yieldToday:U(`pv_tagesprognose`),yieldRef:U(`pv_referenz_ertrag`),yieldRatio:U(`pv_tag_quote`),deficit:U(`morgen_energiedefizit`),seasonalReserve:U(`notstromreserve_aktuell`),adaptiveReserve:U(`notstromreserve_adaptiv`),htReserve:U(`ht_reserve_adaptiv`),forwardTarget:U(`vorausschauendes_ladeziel`),astroStart:U(`astro_ladestart_uhrzeit`),seasonalEnd:U(`saisonales_ladeende_uhrzeit`),pvDelayStart:U(`verzogerter_ladestart_heute`),tomorrowStart:U(`ladestart_morgen_prognose`),tomorrowEnd:U(`ladeende_morgen_prognose`),autoStrategy:U(`auto_aktive_strategie`),autoSaving:U(`auto_geschatzte_einsparung`),targetCharge:U(`ziel_ladeleistung`),sizingStatus:U(`advisor_status`),sizingMatrix:U(`advisor_sizing_matrix`),sizingScenario:U(`advisor_szenario`),sizingInverter:Re(`advisor_wr_upgrade_empfohlen`),btnSizing:`button.e3dc_maestro_sizing_analyse_starten`,saving:U(`pv_ersparnis_heute`),selfUse:U(`pv_eigenverbrauch_heute`),importToday:U(`netzbezug_heute`),feedToday:U(`netzeinspeisung_heute`),pvToday:U(`pv_ertrag_heute`),pvExtraToday:U(`pv_zusatz_heute`),houseToday:U(`hausverbrauch_heute`),chargedToday:U(`geladen_heute`),dischargedToday:U(`entladen_heute`),pvTomorrow:U(`morgen_pv_prognose`),reachable:Re(`e3dc_erreichbar`),chargeLock:Re(`ladesperre_aktiv`),dischargeLock:Re(`entladesperre_aktiv`),htProtect:Re(`ht_schutz_aktiv`),curtail:Re(`abregelschutz_aktiv`),emergency:Re(`notfallladung_aktiv`),chargeLimit:U(`soll_lade_limit`),dischargeLimit:U(`soll_entlade_limit`),sentChargeLimit:U(`gesendetes_lade_limit`),sentDischargeLimit:U(`gesendetes_entlade_limit`),forceDischargePower:`number.e3dc_maestro_erzwungene_entladungsleistung`,fixedReserveSoc:`number.e3dc_maestro_notstromreserve_prozent`,inverterPower:`number.e3dc_maestro_wr_leistung`,ctrlActive:ze(`regelung_aktiv`),ctrlPredictive:ze(`vorausschauende_ladung`),ctrlPvDelay:ze(`pv_prognose_verzogerung`),ctrlPlanControls:ze(`preisplan_steuert_akku`),ctrlPlanShadow:ze(`preisplan_schattenmodus`),ctrlAuto:ze(`auto_optimierung`),forceDischarge:ze(`erzwungene_entladung`),fixedReserve:ze(`notstromreserve`),debug:ze(`debug_logging`),debugLog:U(`debug_log`),btnClear:`button.e3dc_maestro_limits_jetzt_freigeben`,btnCharge:`button.e3dc_maestro_manuell_laden_3_kwh`,selWallbox:`select.e3dc_maestro_wallbox_typ`,selMorning:`select.e3dc_maestro_vorentladungs_modus`,selAuto:`select.e3dc_maestro_auto_optimierung_ziel`,selTariff:`select.e3dc_maestro_tarif_modus`,selStrategy:`select.e3dc_maestro_netzladung_strategie`},W={...Be},Ve=()=>({entities:{},packs:[],wallboxes:[],controls:{general:{},wallbox:{}},identity:{}}),G=Ve();function He(e){for(let t of Object.keys(Be))W[t]=e.entities[t]??Be[t]}var Ue={},We=new Set;function Ge(e){for(let e of Object.keys(Ue))delete Ue[e];Object.assign(Ue,e.settings??{}),We.clear();for(let t of e.settings_disabled??[])We.add(t)}function Ke(e){G=e.plant??Ve()}var qe=e=>We.has(e),Je=[`ctrlActive`,`ctrlPredictive`,`ctrlPvDelay`,`ctrlPlanControls`,`ctrlPlanShadow`],Ye=e=>Object.values(e??{}),Xe=()=>[...Ye(G.entities),...Ye(G.controls?.general),...Ye(G.controls?.wallbox),...G.packs.flatMap(e=>[...Ye(e.entities),...Ye(e.controls),...(e.modules??[]).flatMap(e=>Ye(e.entities))]),...G.wallboxes.flatMap(e=>[...Ye(e.entities),...Ye(e.controls)])],Ze=()=>[...Object.values(W),...Object.values(Ue),...Xe()],K=e=>{let t=e?Number.parseFloat(e.state):NaN;return Number.isFinite(t)?t:void 0},q=e=>e?.state===`on`,Qe=`sensor.e3dc_maestro_wallbox_leistung`,$e=`e3dc-maestro.consumers.v1`,et=50,tt=25e3,nt=[`wallbox`,`heater`,`climate`,`heatpump`,`meter`],rt={wallbox:`M6 8h12v7H6zM9 8V5M15 8V5M12 15v4M9 19h6`,heater:`M10 3v18M15 7c1.4 1 1.4 2 0 3s-1.4 2 0 3 1.4 2 0 3`,climate:`M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9`,heatpump:`M4 7h16v11H4zM12 9.5a2.5 2.5 0 1 0 .01 0`,meter:`M6 16a6 6 0 1 1 12 0M12 16l3.5-3.5`},it=`M6 8h12v7H6z`,at=`M9 8V5M15 8V5M12 15v4M9 19h6`,ot=e=>typeof e==`string`&&nt.includes(e);function st(e){return/wallbox|evcc|easee|go-?e/i.test(e)?`wallbox`:`meter`}function ct(e){return!e||e.state===`unavailable`}function lt(e){let t=K(e);if(t!==void 0)return e?.attributes.unit_of_measurement===`kW`?t*1e3:t}function ut(e){let t=K(e);if(t===void 0)return;let n=e?.attributes.unit_of_measurement===`%`&&Math.abs(t)<.05?0:t;if(Number.isFinite(n))return Math.max(0,Math.min(100,n))}function dt(e,t,n){let r=e.w(t);return n===void 0||!Number.isFinite(n)?r:`${r} · ${Math.round(n)} %`}function ft(e){if(!e)return;let t=e.state;if(t!==`unavailable`&&t!==`unknown`){if(t===`on`||t===`true`||t===`1`||t===`connected`)return!0;if(t===`off`||t===`false`||t===`0`||t===`disconnected`)return!1}}function pt(e,t,n){if(!n.length)return e;let r=new Set(n);return e.map(e=>r.has(e.entityId)?{...e,keepVisible:!0,...t.soc===void 0?{}:{soc:t.soc},...t.plugged===void 0?{}:{plugged:t.plugged}}:e)}function mt(e){return e?[Qe,e]:[Qe]}function ht(e){if(!e?.entity_id.startsWith(`sensor.`))return!1;let t=e.attributes.unit_of_measurement;return e.attributes.device_class===`power`||t===`W`||t===`kW`}function gt(e,t){let n=e?.attributes.friendly_name;return typeof n==`string`&&n.trim()?n.trim():t}function _t(e){if(!Array.isArray(e))return[];let t=[],n=new Set;for(let r of e){if(!r||typeof r!=`object`)continue;let e=r,i=e.entityId,a=e.mode;if(typeof i!=`string`||!i.startsWith(`sensor.`)||n.has(i)||a!==`included`&&a!==`separate`)continue;let o=typeof e.name==`string`&&e.name.trim()?e.name.trim().slice(0,40):i,s=typeof e.id==`string`&&e.id?e.id:i;if(t.push({id:s,entityId:i,name:o,mode:a,icon:ot(e.icon)?e.icon:st(i)}),n.add(i),t.length>=6)break}return t}function vt(){let e=new Uint8Array(8);return crypto.getRandomValues(e),[...e].map(e=>e.toString(16).padStart(2,`0`)).join(``)}function yt(e,t){return Array.isArray(e)?{list:_t(e),publishLocal:!1}:t.length?{list:t,publishLocal:!0}:{list:[],publishLocal:!1}}function bt(){try{return _t(JSON.parse(localStorage.getItem($e)??`null`))}catch{return[]}}function xt(e){try{localStorage.setItem($e,JSON.stringify(_t(e)))}catch{}}function St(e,t){return e.map(e=>{let n=t.states[e.entityId],r=lt(n);return{id:e.id,name:e.name,entityId:e.entityId,mode:e.mode,icon:e.icon,watts:r??0,missing:ct(n)}})}function Ct(e,t){if(t?.arrange)return e;let n=t?.minW??10;return e.filter(e=>e.keepVisible||Math.abs(e.watts)>n)}function wt(e,t){return t===void 0||!Number.isFinite(t)||t<=0?[]:e.filter(e=>e.mode===`separate`&&e.entityId===`sensor.e3dc_maestro_wallbox_leistung`).map(e=>({name:e.name,kwh:t}))}function Tt(e,t,n){let r=n?.meterHouse??e;if(r===void 0)return!1;let i=new Set(n?.wallboxEntityIds?.length?n.wallboxEntityIds:[Qe]),a=n?.meterHouse===void 0&&n?.wallboxInHouse===!0,o=n?.skewMs??15e3,s=n?.houseUpdatedAt,c=0;for(let e of t)if(e.mode===`included`&&!(a&&i.has(e.entityId))){if(s!==void 0&&n?.itemUpdatedAt){let t=n.itemUpdatedAt.get(e.entityId);if(t!==void 0&&Number.isFinite(t)&&t-s>o)continue}c+=Math.max(0,e.watts)}return c>r+et}function Et(e,t,n,r=tt){if(!e)return{show:!1,since:void 0};let i=t??n;return{show:n-i>=r,since:i}}function Dt(e,t,n){let r=n.trim().toLowerCase();return Object.values(e.states).filter(e=>ht(e)&&!t.has(e.entity_id)).map(e=>({id:e.entity_id,name:gt(e,e.entity_id)})).filter(e=>!r||e.name.toLowerCase().includes(r)||e.id.toLowerCase().includes(r)).sort((e,t)=>e.name.localeCompare(t.name)).slice(0,12)}var{I:Ot}=be,kt=e=>e.strings===void 0,At={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},jt=e=>(...t)=>({_$litDirective$:e,values:t}),Mt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},Nt=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),Nt(e,t);return!0},Pt=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},Ft=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Rt(t)}};function It(e){this._$AN===void 0?this._$AM=e:(Pt(this),this._$AM=e,Ft(this))}function Lt(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0){if(t){if(Array.isArray(r))for(let e=n;e<r.length;e++)Nt(r[e],!1),Pt(r[e]);else r!=null&&(Nt(r,!1),Pt(r))}else Nt(this,e)}}var Rt=e=>{e.type==At.CHILD&&(e._$AP??=Lt,e._$AQ??=It)},zt=class extends Mt{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),Ft(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Nt(this,e),Pt(this))}setValue(e){if(kt(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}},Bt=new WeakMap,Vt=jt(class extends zt{render(e){return B}update(e,[t]){let n=t!==this.G;return n&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),B}rt(e){if(this.G!==void 0){if(this.isConnected||(e=void 0),typeof this.G==`function`){let t=this.ht??globalThis,n=Bt.get(t);n===void 0&&(n=new WeakMap,Bt.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}}get lt(){return typeof this.G==`function`?Bt.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Ht=[1,3,6,12,24];function Ut(e){let t=e?.attributes?.pause_until;return typeof t==`number`&&Number.isFinite(t)?t:void 0}function Wt(e,t=Date.now()){let n=e*1e3-t;if(n<=0)return;let r=Math.max(1,Math.ceil(n/6e4));return{h:Math.floor(r/60),m:r%60}}function Gt(e,t,n=Date.now()){let r=Ut(t);if(r===void 0)return;let i=Wt(r,n);if(i)return i.h>0&&i.m>0?e(`pauseLeftHours`,{h:i.h,m:i.m}):i.h>0?e(`pauseLeftHour`,{h:i.h}):e(`pauseLeftMin`,{m:i.m})}function Kt(e,t,n,r,i){let a=(e,t)=>R`<button
    type="button"
    class="pause-choice"
    role="option"
    @click=${()=>n(e)}
  >${t}</button>`;return R`<div class="scrim open" @click=${i}></div>
    <div class="pause-menu" role="dialog" aria-modal="true" aria-label=${e(t?`pauseTitle`:`pauseOffTitle`)}>
      <h2>${e(t?`pauseTitle`:`pauseOffTitle`)}</h2>
      <p class="sub">${e(t?`pauseHint`:`pauseOffHint`)}</p>
      ${t?B:R`<button type="button" class="pause-choice resume" @click=${r}>${e(`pauseResume`)}</button>`}
      <div class="pause-options" role="listbox" aria-label=${e(`pauseTitle`)}>
        ${Ht.map(t=>a(t,t===1?e(`pauseOneHour`):e(`pauseHours`,{h:t})))}
        ${a(null,e(`pausePermanent`))}
      </div>
      <button type="button" class="btn" @click=${i}>${e(`close`)}</button>
    </div>`}var qt=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},Jt=e=>{let t=e.closest(`.slider-field`),n=e.type===`range`?`number`:`range`,r=t?.querySelector(`input[type="${n}"]`);r instanceof HTMLInputElement&&(r.value=e.value)},Yt=(e,t)=>Math.abs(e/t-Math.round(e/t))<1e-6;function Xt(e,t,n){let r=t-e;if(!(r>0))return n>0?n:1;if(n>0&&n>=r/10&&Number.isInteger(n))return n;let i=[1,2,5,10,20,25].filter(e=>Yt(r,e)&&r/e>=4&&r/e<=20);return i.length===0?1:i.reduce((e,t)=>Math.abs(r/t-10)<Math.abs(r/e-10)?t:e)}function Zt(e,t,n){let r=Math.max(1,Math.round((t-e)/n));return Array.from({length:r+1},(n,i)=>Math.round(e+(t-e)*i/r))}function Qt(e){let t=String(e.value),n=e.unit===`%`,r=n?Xt(e.min,e.max,e.step):e.step,i=n?Zt(e.min,e.max,r):[],a=t=>{let n=Number.parseFloat(t);Number.isFinite(n)&&e.onCommit(Math.min(e.max,Math.max(e.min,n)))},o=t=>{let n=Number.parseFloat(t);Number.isFinite(n)&&e.onPreview?.(n)};return R`<div class="slider-field">
    <div class="slider-track ${n?`raster`:``}">
    <input
      type="range"
      aria-label=${e.label}
      min=${e.min}
      max=${e.max}
      step=${r}
      ?disabled=${e.disabled}
      ${Vt(e=>{e instanceof HTMLInputElement&&!qt(e)&&e.value!==t&&(e.value=t)})}
      @input=${e=>{let t=e.target;Jt(t),o(t.value),window.clearTimeout(t._commit),t._commit=window.setTimeout(()=>a(t.value),200)}}
      @change=${e=>{let t=e.target;window.clearTimeout(t._commit),a(t.value)}}
    />
    ${n?R`<div class="slider-scale" aria-hidden="true">
          ${i.map(t=>R`<span style="left: ${(t-e.min)/(e.max-e.min)*100}%">${t}</span>`)}
        </div>`:B}
    </div>
    <input
      type="number"
      inputmode="decimal"
      aria-label=${e.label}
      min=${e.min}
      max=${e.max}
      step=${e.step}
      ?disabled=${e.disabled}
      ${Vt(e=>{e instanceof HTMLInputElement&&!qt(e)&&e.value!==t&&(e.value=t)})}
      @input=${e=>{let t=e.target;Jt(t),o(t.value)}}
      @change=${e=>a(e.target.value)}
    />
    ${e.unit?R`<span>${e.unit}</span>`:B}
  </div>`}var $t={wallbox:`iconWallbox`,heater:`iconHeater`,climate:`iconClimate`,heatpump:`iconHeatpump`,meter:`iconMeter`},en=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},tn={ctrlActive:`ctrlActiveSub`,ctrlPredictive:`ctrlPredictiveSub`,ctrlPvDelay:`ctrlPvDelaySub`,ctrlPlanControls:`ctrlPlanControlsSub`,ctrlPlanShadow:`ctrlPlanShadowSub`};function nn(e){let{t}=e.i18n,n=e.hass.states[W.forceDischargePower],r=n?.attributes??{},i=typeof r.min==`number`?r.min:100,a=typeof r.max==`number`?r.max:1e4,o=typeof r.step==`number`?r.step:100,s=e.forcePowerDraft??K(n)??i,c=e.hass.states[W.fixedReserveSoc],l=c?.attributes??{},u=typeof l.min==`number`?l.min:0,d=typeof l.max==`number`?l.max:100,f=typeof l.step==`number`?l.step:1,p=e.reserveDraft??K(c)??u,m=(t,n)=>{let r=e.hass.states[t],i=q(r),a=!r||r.state===`unavailable`;return R`<button
      class="switch ${i?`on`:``}"
      role="switch"
      aria-checked=${i}
      aria-label=${n}
      ?disabled=${a||e.pending.has(t)}
      @click=${()=>e.onToggle(t)}
    ></button>`};return R`
    <div class="scrim ${e.open?`open`:``}" @click=${e.onClose}></div>
    <aside class="sheet ${e.open?`open`:``}" role="dialog" aria-modal="true" aria-label=${t(`controlsTitle`)} ?inert=${!e.open}>
      <div class="sheet-head">
        <div class="grow">
          <h2>${e.consumersSheet?t(`editConsumers`):t(`controlsTitle`)}</h2>
          <div class="sub">${e.consumersSheet?t(`consumersSub`):t(`controlsSub`)}</div>
        </div>
        <button class="btn ${e.consumersSheet?`primary`:``}" @click=${e.onClose}>${e.consumersSheet?t(`arrangeDone`):t(`close`)}</button>
      </div>
      ${e.error?R`<p class="err">${e.error}</p>`:B}
      ${e.consumersSheet?B:R`      <div class="release">
        <button
          class="btn action"
          ?disabled=${!e.hass.states[W.btnClear]||e.pending.has(W.btnClear)}
          @click=${()=>e.onPress(W.btnClear)}
        >${t(`btnClear`)}</button>
        <p class="sub">${t(`btnClearSub`)}</p>
      </div>
      ${Je.map(n=>{let r=n===`ctrlActive`?Gt(t,e.hass.states[W.ctrlActive]):void 0;return R`<div class="ctrl">
          <div class="txt"><b>${t(n)}</b><span>${r??t(tn[n])}</span></div>
          ${m(W[n],t(n))}
        </div>`})}
      <div class="ctrl wrap">
        <div class="txt"><b>${t(`ctrlForce`)}</b><span>${t(`ctrlForcePower`,{v:e.fmt.w(s)})}</span></div>
        ${m(W.forceDischarge,t(`ctrlForce`))}
        ${Qt({label:t(`ctrlForcePower`,{v:``}),min:i,max:a,step:o,value:s,disabled:!n||n.state===`unavailable`,onPreview:e.onPowerDraft,onCommit:e.onPowerCommit})}
      </div>
      <div class="ctrl wrap">
        <div class="txt"><b>${t(`fixedReserve`)}</b><span>${t(`ctrlReserveSoc`,{v:Math.round(p)})}</span></div>
        ${m(W.fixedReserve,t(`fixedReserve`))}
        ${Qt({label:t(`fixedReserve`),min:u,max:d,step:f,value:p,unit:`%`,disabled:!c||c.state===`unavailable`,onPreview:e.onReserveDraft,onCommit:e.onReserveCommit})}
      </div>
      <div class="sheet-section">
        <h3>${t(`actionsTitle`)}</h3>
        ${[`selWallbox`,`selMorning`,`selAuto`,`selStrategy`].map(n=>{let r=e.hass.states[W[n]],i=Array.isArray(r?.attributes.options)?r.attributes.options:[];return R`<label class="ctrl">
            <span class="txt"><b>${t(n)}</b></span>
            <select
              .value=${r?.state??``}
              ?disabled=${!r||r.state===`unavailable`||e.pending.has(W[n])}
              @change=${t=>e.onSelect(W[n],t.target.value)}
            >
              ${i.map(t=>R`<option value=${t} ?selected=${t===r?.state}>${e.i18n.option(t)}</option>`)}
            </select>
          </label>`})}
        ${[`btnCharge`].map(n=>{let r=n===`btnCharge`?[t(`confirmCharge`)]:[];return R`<button
            class="btn action"
            ?disabled=${!e.hass.states[W[n]]||e.pending.has(W[n])}
            @click=${()=>{r.some(e=>!window.confirm(e))||e.onPress(W[n])}}
          >${t(n)}</button>`})}
      </div>`}
      <div class="sheet-section" id="display-consumers">
        <h3>${t(`displayTitle`)}</h3>
        <div class="sub">${t(`consumersSub`)}</div>
        ${e.consumers.length?e.consumers.map(n=>{let r=e.hass.states[n.entityId],i=ct(r);return R`<div class="consumer">
                <label class="txt">
                  <span class="lbl">${t(`consumerName`)}</span>
                  <input
                    ${Vt(e=>{e instanceof HTMLInputElement&&!en(e)&&e.value!==n.name&&(e.value=n.name)})}
                    maxlength="40"
                    aria-label=${t(`consumerName`)}
                    @input=${t=>e.onRenameConsumer(n.id,t.target.value)}
                  />
                  <span>${i?t(`consumerMissing`):n.entityId}</span>
                </label>
                <div class="icon-pick" role="group" aria-label=${t(`consumerIcon`)}>
                  ${nt.map(r=>R`<button
                      type="button"
                      class=${n.icon===r?`on`:``}
                      aria-pressed=${n.icon===r}
                      aria-label=${t($t[r])}
                      @click=${()=>e.onConsumerIcon(n.id,r)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${rt[r]} /></svg>
                    </button>`)}
                </div>
                <div class="seg" role="group" aria-label=${n.name}>
                  <button type="button" class=${n.mode===`included`?`on`:``} aria-pressed=${n.mode===`included`} @click=${()=>e.onConsumerMode(n.id,`included`)}>${t(`modeIncluded`)}</button>
                  <button type="button" class=${n.mode===`separate`?`on`:``} aria-pressed=${n.mode===`separate`} @click=${()=>e.onConsumerMode(n.id,`separate`)}>${t(`modeSeparate`)}</button>
                </div>
                <button type="button" class="btn ghost" @click=${()=>e.onRemoveConsumer(n.id)}>${t(`removeConsumer`)}</button>
              </div>`}):R`<p class="hint">${t(`consumersEmpty`)}</p>`}
        ${e.wallbox?R`<button type="button" class="btn add" @click=${e.onUseWallbox}>${t(`useWallbox`)}</button>`:B}
        ${e.consumers.length<6?R`<button type="button" class="btn add" @click=${()=>e.onPick(!e.picking)}>${t(`addConsumer`)}</button>`:B}
        ${e.picking?R`<div class="picker">
              <input
                type="search"
                placeholder=${t(`consumerSearch`)}
                aria-label=${t(`consumerSearch`)}
                .value=${e.pickQuery}
                @input=${t=>e.onPickQuery(t.target.value)}
              />
              ${e.choices.length?e.choices.map(t=>R`<button type="button" class="pick" @click=${()=>e.onAddConsumer(t.id,t.name)}>
                      <b>${t.name}</b><span>${t.id}</span>
                    </button>`):R`<p class="hint">${t(`noPowerSensors`)}</p>`}
            </div>`:B}
        ${e.consumersSheet?R`<button type="button" class="btn primary flow-consumers-done" @click=${e.onClose}>${t(`arrangeDone`)}</button>`:B}
      </div>
      ${e.consumersSheet?B:R`<a class="link" href="#settings" @click=${t=>{t.preventDefault(),e.onAllSettings()}}>${t(`allSettings`)}</a>`}
    </aside>`}var rn=e=>Array.isArray(e)&&e.every(e=>Array.isArray(e)&&e.length===2&&Number.isFinite(e[0]));function an(e){if(!e)return;let t=e;if(!(!rn(t.trajectory_points)||!rn(t.pv_points)||!rn(t.house_points)||!rn(t.grid_points)||!Array.isArray(t.trajectory_phases)||t.trajectory_points.length<2))return t}var on=e=>e.map(([e,t])=>[e,t/1e3]);function sn(e){if(!e||e===`unknown`||e===`unavailable`||e===`–`)return;let t=e.match(/(\d+)\s*h/i),n=e.match(/(\d+)\s*min/i);if(t||n)return(t?Number(t[1]):0)+(n?Number(n[1]):0)/60}function cn(e,t){let n=new Intl.DateTimeFormat(`en-US`,{timeZone:t,hour12:!1,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`}),r=(e,t)=>Number(t.find(t=>t.type===e)?.value??0),i=n.formatToParts(new Date(e)),a=r(`hour`,i)%24;return Date.UTC(r(`year`,i),r(`month`,i)-1,r(`day`,i),a,r(`minute`,i),r(`second`,i))-e}function ln(e,t){if(!t){let t=new Date(e);return t.setHours(24,0,0,0),t.getTime()}let n=new Intl.DateTimeFormat(`en-CA`,{timeZone:t,year:`numeric`,month:`2-digit`,day:`2-digit`}).formatToParts(new Date(e)),r=e=>Number(n.find(t=>t.type===e)?.value),i=Date.UTC(r(`year`),r(`month`)-1,r(`day`)+1,0,0,0);return i-cn(i,t)}var un=-30,dn=e=>e<un;function fn(e,t,n={}){let r=n.now??Date.now(),i=e.filter(([e])=>e>r);if(!i.length)return;let a=ln(r,n.timeZone),o=0;for(;o<i.length-1&&i[o+1][1]<=i[o][1]+.2;)o++;let s=o<i.length-1?i.slice(o).reduce((e,t)=>t[1]>e[1]?t:e):void 0,c=s?s[0]<=a?`today`:`tomorrow`:void 0,l=n.reserve!==void 0&&n.reserve>0?n.reserve:.5,u=n.currentSoc!==void 0&&Number.isFinite(n.currentSoc)?n.currentSoc:i[0][1],d,f;u>l+.5?(d=i.find(([,e])=>e<=l)?.[0],d!==void 0&&(f=`down`)):u<l-.5&&(d=i.find(([,e])=>e>=l)?.[0],d!==void 0&&(f=`up`));let p=new Map(rn(n.battery)?n.battery:[]),m=t.filter(([e])=>e>r).map(([e,t])=>[e,dn(t)&&-t>Math.max(0,-(p.get(e)??0))]),h=n.currentGrid!==void 0&&Number.isFinite(n.currentGrid)?dn(n.currentGrid):m[0]?.[1],g,_;if(m.length){if(h&&m[0][1]){let e=0;for(;e<m.length&&m[e][1];)e++;e>=m.length?_=`ongoing`:(g=m[e][0],_=`until`)}else for(let e=0;e<m.length;e++){if(!m[e][1])continue;let t=m[e+1];if(!t||t[1]){g=m[e][0],_=`starts`;break}}}return{peakSoc:s?.[1],peakAt:s?.[0],peakDay:c,floorAt:d,floorKind:f,gridImportAt:g,gridImportKind:_}}function pn(e){return{imp:e.map(([e,t])=>[e,Math.max(0,-t)/1e3]),exp:e.map(([e,t])=>[e,Math.max(0,t)/1e3])}}function mn(e,t){let n=[],r=0;for(let i=1;i<=e.length;i++)(i===e.length||e[i]!==e[r])&&(n.push({phase:e[r],x:t[r][0],x2:t[Math.min(i,t.length)-1][0]}),r=i);return n}function hn(e,t=Date.now(),n=864e5){if(!e.length||!(n>0))return[];let r=t-n,i=[...e].filter(e=>e.phase&&Number.isFinite(e.ts)).sort((e,t)=>e.ts-t.ts);if(!i.length)return[];let a=[];for(let e=0;e<i.length;e++){let n=Math.max(i[e].ts,r),o=Math.min(e+1<i.length?i[e+1].ts:t,t);o<=r||n>=t||o<=n||a.push({phase:i[e].phase,x:n,x2:o})}return a}function gn(e){let t={off:`#64748b`,manual:`#64748b`,emergency:`#f87171`,feed_in_limit:`#e879f9`,reserve_protection:`#fb923c`,evcc_pause:`#94a3b8`,ht_protection:`#a78bfa`,force_discharge:`#22d3ee`,morning_discharge:`#67e8f9`,astro_wait:`#94a3b8`,morning_cap:`#818cf8`,hard_soc_limit:`#c084fc`,fast_floor:`#4ade80`,grid_charge:`#34d399`,grid_hold:`#fbbf24`,corridor:`#38bdf8`,pv_delay:`#60a5fa`,spreading:`#2dd4bf`,curtailment_guard:`#f87171`,idle:`#94a3b8`};if(t[e])return t[e];let n=0;for(let t=0;t<e.length;t++)n=n*31+e.charCodeAt(t)>>>0;return`hsl(${n%360} 55% 55%)`}var _n=e=>Number.isFinite(e.soc_expected_pct)?e.soc_expected_pct:e.soc_pct,vn=e=>e.grid_charge_kwh>0?`charge`:e.hold?`hold`:`release`;function yn(e){return Array.isArray(e)?e.filter(e=>!!e&&typeof e.start==`string`&&Number.isFinite(Date.parse(e.start))&&Number.isFinite(e.price)):[]}function bn(e){let t=[],n;for(let r=0;r<e.length;r++){let i=e[r],a=_n(i);if(!Number.isFinite(a))continue;let o=Date.parse(i.start);if(!Number.isFinite(o))continue;let s=xn(e,r),c=r+1<e.length?Date.parse(e[r+1].start):o+s*36e5;if(n===void 0)t.push([o,a]);else{let e=t[t.length-1];(!e||e[0]!==o||e[1]!==n)&&t.push([o,n])}Number.isFinite(c)&&c>o&&t.push([c,a]),n=a}return t}function xn(e,t){let n=e[t];if(typeof n.hours==`number`&&Number.isFinite(n.hours)&&n.hours>0)return n.hours;if(t+1<e.length){let r=(Date.parse(e[t+1].start)-Date.parse(n.start))/36e5;if(r>0)return r}return 1}function Sn(e){let t=[];for(let n=0;n<e.length;n++){let r=e[n],i=xn(e,n),a=((typeof r.import_kwh==`number`&&Number.isFinite(r.import_kwh)?r.import_kwh:0)+(typeof r.grid_charge_kwh==`number`&&Number.isFinite(r.grid_charge_kwh)?r.grid_charge_kwh:0))/i;if(!Number.isFinite(a))continue;let o=Date.parse(r.start);if(!Number.isFinite(o))continue;let s=n+1<e.length?Date.parse(e[n+1].start):o+i*36e5;!Number.isFinite(s)||s<=o?t.push([o,a]):t.push([o,a],[s,a])}return t}function Cn(e,t,n){let r=e.trajectory_points,i=r[0][0],a=r[r.length-1][0],o=n?.showIst&&n.istStart!==void 0?Math.min(i,n.istStart):i,s=Math.min(a,i+Math.max(1,t)*36e5);return{from:o,to:Math.max(s,o+6e4)}}function wn(e){if(e.length<1)return{from:0,to:1};let t=Date.parse(e[0].start);if(!Number.isFinite(t))return{from:0,to:1};let n=e.length-1,r=Date.parse(e[n].start),i=xn(e,n),a=Number.isFinite(r)?r+i*36e5:t+36e5;return{from:t,to:Math.max(a,t+6e4)}}function Tn(e,t,n){let r=n-t;if(!(r>0)||e.length<1)return[];let i=[];for(let a=0;a<e.length;a++){let o=e[a],s=Date.parse(o.start);if(!Number.isFinite(s))continue;let c=xn(e,a),l=a+1<e.length?Date.parse(e[a+1].start):s+c*36e5,u=Number.isFinite(l)&&l>s?l:s+c*36e5,d=Math.max(s,t),f=Math.min(u,n);f>d&&i.push({leftPct:(d-t)/r*100,widthPct:(f-d)/r*100,action:vn(o),startLocal:o.start_local,price:o.price,forecast:!!o.forecast})}return i}function En(e){if(e.length<3)return e;let t=e.map(e=>Date.parse(e.start)),n=t.slice(1).map((e,n)=>e-t[n]).sort((e,t)=>e-t),r=n[Math.floor(n.length/2)];return e.filter((n,i)=>i===e.length-1||t[i+1]-t[i]>=r*.5)}var Dn=36e5,On=27e5,kn=48;function An(e){let t=En(e);if(t.length<3)return t;let n=t.map(e=>Date.parse(e.start)),r=n.slice(1).map((e,t)=>e-n[t]).sort((e,t)=>e-t);return(r[Math.floor(r.length/2)]??Dn)>=On&&t.length<=kn?t:jn(t,Dn)}function jn(e,t){if(!e.length||t<=0)return e;let n=[],r=[],i=NaN,a=()=>{if(!r.length)return;let e=r[0],t=r[r.length-1],i=r.reduce((e,t)=>e+t.price,0)/r.length,a=r.reduce((e,t)=>e+t.grid_charge_kwh,0),o=r.reduce((e,t)=>e+(t.consumption_kwh||0),0),s=a<=0&&r.some(e=>e.hold);n.push({start:e.start,start_local:e.start_local,price:i,grid_charge_kwh:a,hold:s,release:!s&&a<=0,soc_pct:t.soc_pct,soc_expected_pct:t.soc_expected_pct,consumption_kwh:o,forecast:r.every(e=>!!e.forecast)}),r=[]};for(let n of e){let e=Math.floor(Date.parse(n.start)/t);r.length&&e!==i&&a(),r.length||(i=e),r.push(n)}return a(),n}function Mn(e){if(e.length)return{min:e.reduce((e,t)=>t.price<e.price?t:e),max:e.reduce((e,t)=>t.price>e.price?t:e)}}function Nn(e,t){if(e===`off`)return`off`;if(e===`slots`)return`slots`;if(e===`threshold`)return`threshold`;let n=typeof t.status==`string`?t.status:void 0;return n===`no_prices`?`no_prices`:n===`no_profile`?`no_profile`:n===`no_room`?`no_room`:(e===`dynamic_auto`||e===`dynamic_expert`)&&(t.enabled!==!0||n===void 0)?`computing`:`no_plan`}function Pn(e){return(e??[]).map(e=>{let t=e.lc??e.lu,n=t===void 0?Date.parse(e.last_changed??e.last_updated??``):t*1e3;return{state:e.s??e.state??``,attrs:e.a??e.attributes??{},ts:n}}).filter(e=>Number.isFinite(e.ts))}function Fn(e){return e.map(e=>[e.ts,Number.parseFloat(e.state)]).filter(([,e])=>Number.isFinite(e))}function In(e,t,n){let r=new Map;for(let[n,i]of e){let e=Math.floor(n/t)*t,a=r.get(e);a?a.push(i):r.set(e,[i])}return[...r.entries()].sort(([e],[t])=>e-t).map(([e,t])=>[e,n===`last`?t[t.length-1]:t.reduce((e,t)=>e+t,0)/t.length])}function Ln(e,t,n=12){let r=(e,t,n)=>{let r=typeof e.timestamp==`string`?Date.parse(e.timestamp):NaN;return{phase:typeof e.phase==`string`?e.phase:t,reason:typeof e.reason==`string`?e.reason:``,ts:Number.isFinite(r)?r:n}},i=e=>e===`unavailable`||e===`unknown`||e===``,a=e.filter(e=>!i(e.state)||typeof e.attrs.phase==`string`).map(e=>r(e.attrs,e.state,e.ts));if(Array.isArray(t))for(let e of t)e&&typeof e==`object`&&a.push(r(e,``,Date.now()));a.sort((e,t)=>t.ts-e.ts);let o=[];for(let e of a){if(!e.phase)continue;let t=o[o.length-1];t&&t.phase===e.phase?o[o.length-1]=e:o.push(e)}return o.slice(0,n)}function Rn(e,t,n,r,i=Date.now()){return e.callWS({type:`history/history_during_period`,start_time:new Date(n).toISOString(),end_time:new Date(i).toISOString(),entity_ids:t,include_start_time_state:!0,...r})}var zn=()=>{let e=new Date;return e.setHours(0,0,0,0),e.getTime()},Bn=[`costNet`,`saving`,`selfUse`,`chargedToday`,`costToday`,`feedRevenue`,`wear`,`balance`,`gridToBattery`,`wallboxEnergy`,`curtailAvoided`];function Vn(e){if(!e?.length)return;let t=!1,n=0;for(let r of e)typeof r.change==`number`&&Number.isFinite(r.change)&&(t=!0,n+=r.change);return t?n:void 0}var Hn=[`costNet`,`costToday`,`feedRevenue`,`wear`,`saving`,`selfUse`,`importToday`,`feedToday`,`chargedToday`,`dischargedToday`,`gridToBattery`,`wallboxEnergy`,`curtailAvoided`,`feedInAvoided`,`feedInInterventions`].filter(e=>e!==`costNet`),Un=(e=new Date)=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`,Wn=e=>{let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t){let e=new Date;return e.setHours(0,0,0,0),e}return new Date(Number(t[1]),Number(t[2])-1,Number(t[3]))},Gn=e=>e===Un();function Kn(e,t,n,r=14){for(e.delete(t),e.set(t,n);e.size>r;){let t=e.keys().next().value;if(t===void 0)break;e.delete(t)}}function qn(e,t){let n=e.get(t);if(n!==void 0)return e.delete(t),e.set(t,n),n}var Jn=(e,t=Date.now())=>{let n=new Date(t);return e===`week`?n.setDate(n.getDate()-(n.getDay()+6)%7):e===`year`?n.setMonth(0,1):n.setDate(1),n.setHours(0,0,0,0),n.getTime()};function Yn(e){let t=Wn(e);return t.setDate(t.getDate()-(t.getDay()+6)%7),t}function Xn(e,t=Date.now()){let n=Un(new Date(t));return e>n?n:e}function Zn(e,t,n=Date.now()){let r=Un(new Date(n)),i=Xn(t,n),a,o;if(e===`day`)a=Wn(i),o=new Date(a),o.setDate(o.getDate()+1);else if(e===`week`)a=Yn(i),o=new Date(a),o.setDate(o.getDate()+7);else if(e===`month`){let e=Wn(i);a=new Date(e.getFullYear(),e.getMonth(),1),o=new Date(e.getFullYear(),e.getMonth()+1,1)}else{let e=Wn(i);a=new Date(e.getFullYear(),0,1),o=new Date(e.getFullYear()+1,0,1)}let s=Un(a),c=Un(o),l=s<=r&&r<c;return{grain:e,anchor:i,start:s,end:c,startMs:a.getTime(),endMs:l?n:o.getTime(),live:l,cacheKey:`${e}:${s}`}}function Qn(e,t,n,r=Date.now()){let i=Wn(Xn(t,r));return e===`day`?i.setDate(i.getDate()+n):e===`week`?i.setDate(i.getDate()+7*n):e===`month`?i.setMonth(i.getMonth()+n):i.setFullYear(i.getFullYear()+n),Xn(Un(i),r)}function $n(e,t=Date.now()){if(e.live)return!1;let n=Zn(e.grain,Qn(e.grain,e.anchor,1,t),t);return n.cacheKey!==e.cacheKey||n.live}function er(e,t,n){if(e.grain===`day`&&e.live)return n;let r=Wn(e.start);if(e.grain===`day`)return r.toLocaleDateString(t,{weekday:`short`,day:`numeric`,month:`short`});if(e.grain===`week`){let n=Wn(e.end);return n.setDate(n.getDate()-1),`${r.toLocaleDateString(t,{weekday:`short`,day:`numeric`,month:`short`})} – ${n.toLocaleDateString(t,{weekday:`short`,day:`numeric`,month:`short`})}`}return e.grain===`month`?r.toLocaleDateString(t,{month:`long`,year:`numeric`}):String(r.getFullYear())}var tr=[`costToday`,`feedRevenue`,`saving`,`wear`];function nr(e){let{feedRevenue:t,saving:n,costToday:r,wear:i}=e;if(t!==void 0||n!==void 0||r!==void 0||i!==void 0)return(t??0)+(n??0)-(r??0)-(i??0)}function rr(e){let t=e.start;if(typeof t==`number`&&Number.isFinite(t))return t>0xe8d4a51000?t:t*1e3;if(typeof t==`string`){let e=Date.parse(t);return Number.isFinite(e)?e:void 0}}function ir(e){let t=new Map;for(let n of e??[]){let e=rr(n);e!==void 0&&typeof n.change==`number`&&Number.isFinite(n.change)&&t.set(Un(new Date(e)),n.change)}return t}function ar(e){let t=new Map;for(let n of e){let e=n.day.slice(0,7),r=`${e}-01`,i=t.get(e)??{day:r,ts:Wn(r).getTime(),costToday:void 0,feedRevenue:void 0,saving:void 0,wear:void 0,balance:void 0},a=e=>{let t=n[e];t!==void 0&&(i[e]=(i[e]??0)+t)};a(`costToday`),a(`feedRevenue`),a(`saving`),a(`wear`),i.balance=nr(i),t.set(e,i)}return[...t.values()].sort((e,t)=>e.ts-t.ts)}function or(e,t,n=Date.now()){let r=Object.fromEntries(tr.map(t=>[t,ir(e[W[t]])])),i=Jn(t,n),a=Un(new Date(n)),o=[],s=new Date(i);for(;Un(s)<=a;){let e=Un(s),t={costToday:r.costToday.get(e),feedRevenue:r.feedRevenue.get(e),saving:r.saving.get(e),wear:r.wear.get(e)};o.push({day:e,ts:s.getTime(),...t,balance:nr(t)}),s.setDate(s.getDate()+1)}return o}async function sr(e,t,n,r){return e.callWS({type:`recorder/statistics_during_period`,start_time:new Date(t).toISOString(),end_time:new Date(n).toISOString(),statistic_ids:r.map(e=>W[e]),period:`day`,types:[`change`]})}async function cr(e,t,n){let r=await sr(e,t,n,Hn),i={};for(let e of Hn){let t=Vn(r[W[e]]);t!==void 0&&(i[e]=t)}return i.costToday!==void 0&&i.feedRevenue!==void 0&&(i.costNet=i.costToday-i.feedRevenue),i}async function lr(e,t){let n=Date.now();return or(await sr(e,Jn(t,n),n,tr),t,n)}async function ur(e,t){return cr(e,t.startMs,t.endMs)}async function dr(e,t){let n=!!t&&!Gn(t),r=n?Wn(t).getTime():zn(),i=n?(()=>{let e=Wn(t);return e.setDate(e.getDate()+1),e.getTime()})():Date.now(),a=await Rn(e,Bn.map(e=>W[e]),r,{minimal_response:!0,no_attributes:!0,significant_changes_only:!1},i),o={};for(let e of Bn)o[e]=In(Fn(Pn(a[W[e]])),18e5,`last`);return o}var fr=864e5,pr={minimal_response:!0,no_attributes:!0,significant_changes_only:!1},mr=(e,t,n)=>{let r=e.states[t]?.attributes.unit_of_measurement===`kW`?1e3:1;return In(Fn(Pn(n)).map(([e,t])=>[e,t*r]),3e5,`mean`)};async function hr(e,t,n=1){return In(Fn(Pn((await Rn(e,[t],Date.now()-fr,pr))[t])).map(([e,t])=>[e,t*n]),3e5,`mean`)}async function gr(e,t){let n=[...new Set(t)],r={};if(!n.length)return r;let i=await Rn(e,n,Date.now()-fr,pr);for(let t of n)r[t]=mr(e,t,i[t]);return r}async function _r(e,t){let n=[...new Set(t.filter(Boolean))];if(!n.length)return[];if(n.length===1){let t=n[0],r=e.states[t]?.attributes.unit_of_measurement;return hr(e,t,r===`kW`?1e3:1)}let r=await gr(e,n),i=new Map;for(let e of n)for(let[t,n]of r[e]??[])i.set(t,(i.get(t)??0)+n);return[...i.entries()].sort((e,t)=>e[0]-t[0])}async function vr(e,t=6){let n=await Rn(e,[W.pv,W.house,W.soc],Date.now()-t*36e5,{minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),r=e=>In(Fn(Pn(n[e])),3e5,`mean`);return{pv:r(W.pv),house:r(W.house),soc:r(W.soc)}}async function yr(e){let t=await Rn(e,[W.lastAction],Date.now()-864e5,{minimal_response:!1,no_attributes:!1,significant_changes_only:!0}),n=e.states[W.lastAction]?.attributes.history;return Ln(Pn(t[W.lastAction]),n,48)}var br={dark:{text:`#e8edf7`,muted:`#8b96ad`,faint:`#5a6580`,bg:`#070b14`,grid:`rgba(255,255,255,0.06)`,series:`#ffffff`,track:`rgba(255,255,255,0.06)`,mode:`dark`},classic:{text:`#152033`,muted:`#5b6b80`,faint:`#8b97a8`,bg:`#eef2f6`,grid:`rgba(21,32,51,0.08)`,series:`#152033`,track:`rgba(21,32,51,0.08)`,mode:`light`},e3dc:{text:`#4a4a4a`,muted:`#6e767c`,faint:`#a4aaae`,bg:`#f7f7f7`,grid:`rgba(30,37,43,0.08)`,series:`#4a4a4a`,track:`rgba(30,37,43,0.08)`,mode:`light`},oled:{text:`#e8e8e8`,muted:`#9a9a9a`,faint:`#5c5c5c`,bg:`#000000`,grid:`rgba(255,255,255,0.08)`,series:`#ffffff`,track:`rgba(255,255,255,0.08)`,mode:`dark`},amber:{text:`#f3e7d8`,muted:`#b39a80`,faint:`#7a6450`,bg:`#140e0a`,grid:`rgba(243,231,216,0.08)`,series:`#f3e7d8`,track:`rgba(243,231,216,0.08)`,mode:`dark`},leitstand:{text:`#d7e0e6`,muted:`#8a9aa6`,faint:`#556570`,bg:`#0a0e12`,grid:`rgba(215,224,230,0.1)`,series:`#d7e0e6`,track:`rgba(215,224,230,0.1)`,mode:`dark`},tibber:{text:`#e6eef8`,muted:`#8b9bb8`,faint:`#5a6a88`,bg:`#0b1020`,grid:`rgba(230,238,248,0.08)`,series:`#e6eef8`,track:`rgba(230,238,248,0.08)`,mode:`dark`}},xr=br.dark;function Sr(e){xr=br[e]}var J={pv:`#fbbf24`,house:`#a78bfa`,gridIn:`#f87171`,gridOut:`#34d399`,bat:`#22d3ee`,accent:`#38bdf8`,accent2:`#818cf8`,get text(){return xr.text},get muted(){return xr.muted},get faint(){return xr.faint},get bg(){return xr.bg},get grid(){return xr.grid},get series(){return xr.series},get track(){return xr.track},get mode(){return xr.mode}},Cr={charge:J.gridOut,hold:J.pv,release:J.bat},wr=e=>{let t=Cr[vn(e)];if(!e.forecast)return t;let n=t.replace(`#`,``);return n.length===6?`rgba(${parseInt(n.slice(0,2),16)},${parseInt(n.slice(2,4),16)},${parseInt(n.slice(4,6),16)},0.38)`:t},Tr=()=>({chart:{background:`transparent`,foreColor:J.muted,fontFamily:`Inter, system-ui, sans-serif`,toolbar:{show:!1},animations:{enabled:!1}},theme:{mode:J.mode},grid:{borderColor:J.grid,strokeDashArray:4},dataLabels:{enabled:!1},legend:{show:!1},tooltip:{theme:J.mode}}),Er=e=>!!e&&typeof e==`object`&&!Array.isArray(e),Dr=(e,t)=>{let n={...e};for(let[e,r]of Object.entries(t))n[e]=Er(r)&&Er(n[e])?Dr(n[e],r):r;return n},Or=e=>Dr(Tr(),e),kr=(e,t=!1)=>({x:Date.now(),borderColor:J.text,opacity:.6,label:{text:e,orientation:`horizontal`,borderWidth:0,style:{background:J.text,color:J.bg,fontWeight:700,fontSize:t?`10px`:`12px`,padding:t?{left:4,right:4,top:2,bottom:2}:void 0}}});function Ar(e){if(!Array.isArray(e)||e.length!==12)return;let t=e.map(e=>typeof e==`number`&&Number.isFinite(e)?e:NaN);return t.some(e=>Number.isNaN(e))?void 0:t}function jr(e,t,n,r,i){let a=Array.from({length:12},(t,n)=>new Intl.DateTimeFormat(e||`de`,{month:`short`}).format(new Date(2024,n,1)));return Or({chart:{type:`line`,height:260},series:[{name:r,type:`area`,data:t},{name:i,type:`line`,data:n}],colors:[J.bat,J.gridIn],stroke:{curve:`smooth`,width:[2.5,1.5]},fill:{type:[`gradient`,`solid`],gradient:{shadeIntensity:.2,opacityFrom:.45,opacityTo:.02,stops:[0,100]}},xaxis:{categories:a,axisBorder:{show:!1},axisTicks:{show:!1}},yaxis:{min:0,title:{text:`kWh`},labels:{formatter:e=>String(Math.round(e))}}})}var Mr=(e={})=>({type:`datetime`,labels:{datetimeUTC:!1,format:`HH:mm`},axisBorder:{show:!1},axisTicks:{show:!1},...e}),Nr=[`pv`,`house`,`import`,`feed`],Pr=`e3dc-maestro.forecast-hidden.v1`;function Fr(e){if(!Array.isArray(e))return new Set;let t=new Set(Nr);return new Set(e.filter(e=>typeof e==`string`&&t.has(e)))}function Ir(){try{return Fr(JSON.parse(localStorage.getItem(Pr)??`null`))}catch{return new Set}}function Lr(e){localStorage.setItem(Pr,JSON.stringify([...e]))}var Rr=`e3dc-maestro.shadow-soc-hidden.v1`;function zr(){try{return localStorage.getItem(Rr)===`1`}catch{return!1}}function Br(e){localStorage.setItem(Rr,e?`1`:`0`)}var Vr=`e3dc-maestro.expected-soc-hidden.v1`;function Hr(){try{return localStorage.getItem(Vr)===`1`}catch{return!1}}function Ur(e){localStorage.setItem(Vr,e?`1`:`0`)}var Wr=`e3dc-maestro.shadow-import-hidden.v1`;function Gr(){try{return localStorage.getItem(Wr)===`1`}catch{return!1}}function Kr(e){localStorage.setItem(Wr,e?`1`:`0`)}function qr({traj:e,targetSoc:t,planSoc:n,planShadow:r,hideShadowSoc:i,hideExpectedSoc:a,hideShadowImport:o,planImport:s,ist:c,showIst:l,hiddenPower:u,compact:d,onZoom:f,onLayout:p,fmt:m,i18n:h}){let{imp:g,exp:_}=pn(e.grid_points),v=!!n&&n.length>=2,y=v&&!!r,b=y&&!i&&!!n,ee=!a,x=b,S=y||!v?e.trajectory_points:n,te=y?h.t(`legendSocExpected`):v?h.t(`legendPlanSoc`):h.t(`legendSoc`),C=u??new Set,w=mn(e.trajectory_phases,e.trajectory_points).map(e=>{let t={x:e.x,x2:e.x2,fillColor:J.accent,opacity:d?.08:.05};return!d&&e.x2-e.x>=18e5&&(t.label={text:h.phase(e.phase),borderWidth:0,orientation:`vertical`,position:`top`,offsetX:10,offsetY:10,style:{background:`transparent`,color:J.muted,fontSize:`11px`}}),t}),T=[{key:`pv`,name:h.t(`legendPv`),type:`area`,data:on(e.pv_points),color:J.pv,width:2,dash:0,fill:`gradient`},{key:`house`,name:h.t(`legendHouse`),type:`line`,data:on(e.house_points),color:J.house,width:2,dash:4,fill:`solid`},{key:`import`,name:h.t(`legendImport`),type:`area`,data:g,color:J.gridIn,width:1.5,dash:0,fill:`gradient`},{key:`feed`,name:h.t(`legendFeed`),type:`area`,data:_,color:J.gridOut,width:1.5,dash:0,fill:`gradient`}].filter(e=>!C.has(e.key)),ne=y&&!o&&!!s&&s.length>=2,E=h.t(`legendImportShadow`),D=T[0]?.name??(ne?E:h.t(`legendPv`)),O=T.map(e=>({name:e.name,type:e.type,data:e.data})),k=T.map(e=>e.color),A=T.map(e=>e.width),re=T.map(e=>e.dash),j=T.map(()=>`smooth`),M=T.map(e=>e.fill),N={formatter:e=>m.n(e,+!d),style:d?{fontSize:`10px`}:void 0,offsetX:d?-2:0},ie=T.map((e,t)=>t===0?{seriesName:D,min:0,tickAmount:d?4:void 0,title:d?{text:void 0}:{text:`kW`},labels:N}:{seriesName:D,show:!1});if(ne&&s){let e=T.length===0;O.push({name:E,type:`line`,data:s}),k.push(J.gridIn),A.push(d?1.75:2),re.push(6),j.push(`stepline`),M.push(`solid`),ie.push(e?{seriesName:D,min:0,tickAmount:d?4:void 0,title:d?{text:void 0}:{text:`kW`},labels:N}:{seriesName:D,show:!1})}let ae=ee?te:x?h.t(`legendPlanSocShadow`):te,P=new Set,F=-1,oe=(e,t,n,r,i,a)=>{let o=O.length;O.push({name:e,type:`line`,data:t}),k.push(n),A.push(r),re.push(i),j.push(`smooth`),M.push(`solid`),P.add(o),a?(F=o,ie.push({seriesName:ae,opposite:T.length>0||ne,min:0,max:100,tickAmount:d?4:5,title:d?{text:void 0}:{text:`SoC %`},labels:{formatter:e=>`${Math.round(e)}%`,style:d?{fontSize:`10px`}:void 0,offsetX:d?2:0}})):ie.push({seriesName:ae,opposite:!0,min:0,max:100,show:!1})};ee&&oe(te,S,J.bat,d?2.75:3.5,0,!0),b&&n&&oe(h.t(`legendPlanSocShadow`),n,J.accent2,d?2:2.5,6,!ee);let I=-1;if(l&&c&&(c.pv.length>1||c.house.length>1||c.soc.length>1)){I=O.length;let t=(e,t)=>{let n=e[e.length-1],r=t[0];return n&&r&&r[0]>n[0]?[...e,r]:e},r=(e,t,n,r)=>{O.push({name:e,type:`line`,data:t}),k.push(n),A.push(1.5),re.push(0),j.push(`smooth`),M.push(`solid`),r&&F>=0?(P.add(O.length-1),ie.push({seriesName:ae,opposite:!0,min:0,max:100,show:!1})):r?(F=O.length-1,P.add(F),ie.push({seriesName:e,opposite:T.length>0||ne,min:0,max:100,tickAmount:d?4:5,title:d?{text:void 0}:{text:`SoC %`},labels:{formatter:e=>`${Math.round(e)}%`,style:d?{fontSize:`10px`}:void 0,offsetX:d?2:0}})):ie.push({seriesName:D,show:!1})};if(!C.has(`pv`)&&c.pv.length>1&&r(`${h.t(`legendPv`)} ${h.t(`legendActual`)}`,on(t(c.pv,e.pv_points)),J.pv,!1),!C.has(`house`)&&c.house.length>1&&r(`${h.t(`legendHouse`)} ${h.t(`legendActual`)}`,on(t(c.house,e.house_points)),J.house,!1),c.soc.length>1){let e=ee?S:x&&n?n:S;r(`${h.t(`legendSoc`)} ${h.t(`legendActual`)}`,t(c.soc,e),J.bat,!0)}}let se=t!==void 0&&t>=90;return Or({chart:{id:`fc`,type:`line`,height:d?300:420,zoom:{enabled:!0,type:`x`},toolbar:{show:!1,autoSelected:`zoom`},parentHeightOffset:d?0:void 0,events:{zoomed:(e,t)=>{let n=t?.xaxis?.min,r=t?.xaxis?.max;typeof n==`number`&&typeof r==`number`&&r>n&&f?.(n,r),p?.()},mounted:()=>p?.(),updated:()=>p?.()}},grid:{padding:d?{top:se?22:4,left:4,right:4,bottom:0}:{top:se?28:8}},series:O,colors:k,stroke:{width:A,curve:j,dashArray:re},fill:{type:M,gradient:{opacityFrom:.45,opacityTo:.02},opacity:O.map((e,t)=>I>=0&&t>=I?.55:1)},xaxis:Mr({tooltip:{enabled:!1},...d?{labels:{datetimeUTC:!1,format:`HH:mm`,style:{fontSize:`10px`}},tickAmount:4}:{}}),yaxis:ie,tooltip:{shared:!0,intersect:!1,x:{format:`HH:mm`},y:{formatter:(e,t)=>e==null?`–`:P.has(t?.seriesIndex??-1)?`${m.n(e)} %`:`${m.n(e,2)} kW`}},markers:{size:0,hover:{size:d?4:5}},annotations:{xaxis:[...w,kr(h.t(`now`),d)],yaxis:t===void 0||F<0?[]:[{y:t,yAxisIndex:F,borderColor:J.accent2,strokeDashArray:6,label:{text:d?`${Math.round(t)}%`:h.t(`targetLabel`,{v:Math.round(t)}),position:`right`,textAnchor:`end`,offsetX:d?-4:-8,offsetY:d?-12:-16,borderWidth:0,style:{background:`rgba(7,11,20,.85)`,color:`#c7d2fe`,fontSize:d?`10px`:`12px`,padding:{left:d?4:6,right:d?4:6,top:2,bottom:2}}}}]}})}function Jr(e){let t=e.trajectory_points[0][0],n=e.trajectory_points[e.trajectory_points.length-1][0];return Or({chart:{id:`fc-brush`,type:`area`,height:90,brush:{enabled:!0,target:`fc`},selection:{enabled:!0,xaxis:{min:t,max:n},fill:{color:J.accent,opacity:.12},stroke:{color:J.accent}}},series:[{name:`PV`,data:on(e.pv_points)},{name:`House`,data:on(e.house_points)}],colors:[J.pv,J.house],stroke:{width:1.5,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.35,opacityTo:0}},xaxis:Mr(),yaxis:{show:!1,min:0},grid:{show:!1},tooltip:{enabled:!1}})}function Yr({slots:e,fmt:t,i18n:n,compact:r,onZoom:i,onLayout:a}){let o=An(e),s=e=>Date.parse(e.start),c=e=>{let t=s(o[e]);if(e+1<o.length){let n=s(o[e+1]);if(Number.isFinite(n)&&n>t)return n}return t+(typeof o[e].hours==`number`&&o[e].hours>0?o[e].hours:1)*36e5},l=e=>{let r=vn(e);return r===`charge`?n.t(`slotCharge`,{kwh:t.n(e.grid_charge_kwh,2)}):r===`hold`?n.t(`slotHold`):n.t(`slotRelease`)},u=(e,t)=>`<div style="display:flex;justify-content:space-between;gap:12px;color:${J.muted}"><span>${e}</span><b style="color:${J.text}">${t}</b></div>`,d=r?{fontSize:`10px`}:void 0,f=wn(o);return Or({chart:{type:`line`,height:r?280:360,zoom:{enabled:!0,type:`x`},toolbar:{show:!1,autoSelected:`zoom`},parentHeightOffset:r?0:void 0,events:{zoomed:(e,t)=>{let n=t?.xaxis?.min,r=t?.xaxis?.max;typeof n==`number`&&typeof r==`number`&&r>n&&i?.(n,r),a?.()},mounted:()=>a?.(),updated:()=>a?.()}},grid:r?{padding:{top:4,left:4,right:4,bottom:0}}:void 0,series:[{name:n.t(`slotPrice`),type:`column`,data:o.map((e,t)=>({x:(s(e)+c(t))/2,y:+(e.price*100).toFixed(1),fillColor:wr(e)}))},{name:n.t(`legendPlanSoc`),type:`line`,data:bn(o)}],colors:[J.bat,J.series],stroke:{width:[0,r?2:2.5],curve:[`straight`,`straight`]},plotOptions:{bar:{columnWidth:r?`96%`:`100%`,borderRadius:r?2:3,borderRadiusApplication:`end`}},fill:{opacity:[.85,1]},xaxis:Mr({min:f.from,max:f.to,...r?{labels:{datetimeUTC:!1,format:`HH:mm`,style:{fontSize:`10px`}},tickAmount:4}:{}}),yaxis:[{tickAmount:r?4:void 0,title:r?{text:void 0}:{text:`ct/kWh`},labels:{formatter:e=>t.n(e,0),style:d,offsetX:r?-2:0}},{opposite:!0,min:0,max:100,tickAmount:r?4:void 0,title:r?{text:void 0}:{text:`SoC %`},labels:{formatter:e=>`${Math.round(e)}%`,style:d,offsetX:r?2:0}}],tooltip:{shared:!0,intersect:!1,custom:({dataPointIndex:e})=>{let i=o[e];return i?`<div style="padding:${r?`10px 12px`:`12px 14px`};min-width:${r?`160px`:`190px`};max-width:min(280px,90vw)">
          <div style="font-weight:700;margin-bottom:8px">${t.dayTime(i.start)}</div>
          ${u(n.t(`slotPrice`),`${t.n(i.price*100)} ct`)}
          ${u(n.t(`slotSoc`),`${t.n(_n(i))} %`)}
          ${u(n.t(`slotConsumption`),`${t.n(i.consumption_kwh,2)} kWh`)}
          <div style="margin-top:8px;color:${Cr[vn(i)]};font-weight:600">${l(i)}${i.forecast?` · ${n.t(`legendForecast`)}`:``}</div></div>`:``}},annotations:{xaxis:[kr(n.t(`now`),r)]}})}function Xr(e,t){let n=e=>Math.min(1,Math.max(0,e/100)),r=n(e),i=t===void 0?void 0:n(t),a=e=>`${+(e*270).toFixed(2)}deg`,o=[],s=(e,t,n)=>{n-t<.001||o.push(`${e} ${a(t)}`,`${e} ${a(n)}`)},c=i===void 0?0:Math.min(r,i);i!==void 0&&i>0&&(s(`var(--warn)`,0,c),s(`color-mix(in srgb, var(--warn) 40%, transparent)`,c,i));let l=i===void 0?0:c;return r>l&&o.push(`var(--bat) ${a(l)}`,`color-mix(in srgb, var(--bat) 55%, white) ${a(r)}`),s(`var(--switch-track)`,Math.max(r,i??0),1),o.push(`transparent ${a(1)}`,`transparent 360deg`),`conic-gradient(from 225deg, ${o.join(`, `)})`}function Zr(e,t){return Or({chart:{type:`line`,height:220},series:e.map(e=>({name:e.name,data:on(e.points)})),colors:[J.accent,J.house,J.pv],stroke:{width:2,curve:`smooth`},legend:{show:!1},xaxis:Mr(),yaxis:{decimalsInFloat:1,title:{text:`kW`},labels:{formatter:e=>t.n(e,1)}},tooltip:{shared:!0,intersect:!1,x:{format:`dd.MM. HH:mm`},y:{formatter:e=>`${t.n(e,2)} kW`}}})}function Qr(e,t,n){return Or({chart:{type:`area`,height:280},series:[{data:on(e)}],colors:[t],stroke:{width:2,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.32,opacityTo:.02}},xaxis:Mr(),yaxis:{decimalsInFloat:1,title:{text:`kW`},labels:{formatter:e=>n.n(e,1)}},tooltip:{x:{format:`dd.MM. HH:mm`},y:{formatter:e=>`${n.n(e,2)} kW`}}})}function $r(e,t){return Or({chart:{type:`area`,height:56,sparkline:{enabled:!0}},series:[{data:e}],colors:[t],stroke:{width:2,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.35,opacityTo:0}},xaxis:{type:`datetime`},tooltip:{enabled:!1}})}var ei=(e,t)=>e>=0?t?`#6ee7b7`:`rgba(52, 211, 153, 0.78)`:t?`#fca5a5`:`rgba(248, 113, 113, 0.78)`,ti=(e,t,n,r=!1)=>{let i=new Date(e);return r?i.toLocaleDateString(t,{month:`short`}):n?i.toLocaleDateString(t,{day:`numeric`}):i.toLocaleDateString(t,{weekday:`short`,day:`numeric`})},ni=e=>{if(!Number.isFinite(e)||e===0)return 0;let t=e<0?-1:1,n=Math.abs(e),r=Math.floor(Math.log10(n)),i=n/10**r;return t*(i<=1?1:i<=2?2:i<=5?5:10)*10**r},ri=e=>!Number.isFinite(e)||e===0?0:-ni(-e);function ii(e,t,n=.1){let r=e.filter(e=>Number.isFinite(e)),i=t.filter(e=>Number.isFinite(e)),a=r.length?Math.min(...r,0):0,o=r.length?Math.max(...r,0):1,s=o-a||1;a-=s*n,o+=s*n,a>0&&(a=0),o<0&&(o=0),a=ri(a),o=ni(o),a===o&&(a=Math.min(0,a-1),o=Math.max(0,o+1));let c=i.length?Math.min(...i):0,l=i.length?Math.max(...i):1,u=o-a,d=(0-a)/u;if(d<=1e-6){let e=ni(Math.max(l,0)*(1+n)||1);return{primary:{min:a,max:o},secondary:{min:0,max:Math.max(e,1)}}}if(d>=1-1e-6){let e=ri(Math.min(c,0)*(1+n)||-1);return{primary:{min:a,max:o},secondary:{min:Math.min(e,-1),max:0}}}let f=Math.max(0,-Math.min(c,0)),p=Math.max(0,Math.max(l,0)),m=Math.max(f/d,p/(1-d),2**-52)*(1+n),h=ni((1-d)*m),g=h===0?ri(-d*m):-(d/(1-d))*h;return{primary:{min:a,max:o},secondary:{min:g,max:Math.max(h,1e-6)}}}function ai({days:e,fmt:t,i18n:n,monthly:r,onDay:i}){let a=Un(),o=a.slice(0,7),s=!r&&e.length>14,c=(e,t,n)=>`<div style="display:flex;justify-content:space-between;gap:18px;color:${J.muted}"><span>${e}</span><b style="color:${n??J.text};font-variant-numeric:tabular-nums">${t}</b></div>`,l=0,u=e=>ti(e,t.loc,s,r),d=e.map(e=>u(e.ts)),f=e.map(e=>{let t=r?e.day.startsWith(o):e.day===a;return{x:u(e.ts),y:e.balance===void 0?null:+e.balance.toFixed(2),fillColor:e.balance===void 0?J.faint:ei(e.balance,t)}}),p=e.map(e=>(e.balance!==void 0&&(l+=e.balance),{x:u(e.ts),y:+l.toFixed(2)})),m=ii(f.map(e=>e.y).filter(e=>e!==null),p.map(e=>e.y)),h=e.findIndex(e=>r?e.day.startsWith(o):e.day===a),g=n.t(r?`pulseMonthly`:`pulseDaily`),_=n.t(`pulseCumulative`),v=(e,t)=>({text:e,offsetX:0,offsetY:0,style:{color:t,fontSize:`12px`,fontWeight:700,fontFamily:`Inter, system-ui, sans-serif`}});return Or({chart:{type:`line`,height:268,parentHeightOffset:0,animations:{enabled:!0,speed:480,animateGradually:{enabled:!0,delay:24},dynamicAnimation:{enabled:!1}},events:{click:(t,n,r)=>{let a=r.dataPointIndex;if(a===void 0||a<0||(r.seriesIndex??0)>0)return;let o=e[a];o&&i?.(o.day)}}},series:[{name:g,type:`column`,data:f},{name:_,type:`area`,data:p}],colors:[J.gridOut,J.accent],stroke:{width:[0,2.5],curve:[`smooth`,`straight`],lineCap:`round`},plotOptions:{bar:{columnWidth:s?`42%`:`46%`,borderRadius:4,borderRadiusApplication:`end`,borderRadiusWhenStacked:`last`}},fill:{type:[`solid`,`gradient`],opacity:[.9,1],gradient:{type:`vertical`,shadeIntensity:.15,gradientToColors:[J.accent],inverseColors:!1,opacityFrom:.28,opacityTo:.02,stops:[0,95]}},markers:{size:[0,0],hover:{size:5,sizeOffset:1},strokeWidth:0,colors:[J.accent]},legend:{show:!0,position:`top`,horizontalAlign:`left`,fontSize:`12px`,fontWeight:600,markers:{size:5,shape:`circle`,offsetX:-2},itemMargin:{horizontal:14,vertical:0},labels:{colors:J.text},onItemClick:{toggleDataSeries:!1},onItemHover:{highlightDataSeries:!0}},grid:{borderColor:J.grid,strokeDashArray:3,padding:{left:8,right:8,top:4,bottom:0},xaxis:{lines:{show:!1}},yaxis:{lines:{show:!0}}},xaxis:{type:`category`,categories:d,tickPlacement:`on`,tickAmount:s?Math.min(10,e.length):e.length,labels:{rotate:0,hideOverlappingLabels:!0,style:{colors:J.muted,fontSize:s?`10px`:`11px`,fontWeight:550}},axisBorder:{show:!1},axisTicks:{show:!1},crosshairs:{show:!0,width:1,stroke:{color:J.accent,width:1,dashArray:4}}},yaxis:[{seriesName:g,min:m.primary.min,max:m.primary.max,tickAmount:5,forceNiceScale:!1,decimalsInFloat:0,title:v(n.t(r?`pulseMonthlyAxis`:`pulseDailyAxis`),J.muted),labels:{style:{colors:J.muted,fontSize:`11px`,fontWeight:550},formatter:e=>`${t.n(e,0)} €`}},{seriesName:_,opposite:!0,min:m.secondary.min,max:m.secondary.max,tickAmount:5,forceNiceScale:!1,decimalsInFloat:0,title:v(n.t(`pulseSumAxis`),J.accent),labels:{style:{colors:J.accent,fontSize:`11px`,fontWeight:600},formatter:e=>e<-1e-9?``:`${t.n(e,0)} €`}}],annotations:{yaxis:[{y:0,yAxisIndex:0,borderColor:`rgba(148,163,184,0.55)`,strokeDashArray:0,opacity:.9}],...h>=0?{xaxis:[{x:d[h],borderColor:J.accent,strokeDashArray:5,opacity:.55,label:{text:n.t(r?`periodMonth`:`periodToday`),orientation:`horizontal`,borderWidth:0,offsetY:-2,style:{background:J.accent,color:J.bg,fontSize:`10px`,fontWeight:700,padding:{left:6,right:6,top:2,bottom:2}}}}]}:{}},tooltip:{shared:!0,intersect:!1,custom:({dataPointIndex:i})=>{let a=e[i];if(!a)return``;let o=p[i]?.y,s=r?new Date(a.ts).toLocaleDateString(t.loc,{month:`long`,year:`numeric`}):t.day(a.ts);return`<div style="padding:12px 14px;min-width:212px">
          <div style="font-weight:700;margin-bottom:8px;color:${J.text}">${s}</div>
          ${c(g,`${t.n(a.balance,2)} €`,a.balance!==void 0&&a.balance<0?J.gridIn:J.gridOut)}
          ${c(_,`${t.n(o,2)} €`,J.accent)}
          <div style="height:1px;background:${J.grid};margin:8px 0"></div>
          ${c(n.t(`kpiRevenue`),`${t.n(a.feedRevenue,2)} €`)}
          ${c(n.t(`kpiSaving`,{when:``}).trim(),`${t.n(a.saving,2)} €`)}
          ${c(n.t(`kpiCostGross`),`${t.n(a.costToday,2)} €`)}
          ${c(n.t(`kpiWear`),`${t.n(a.wear,2)} €`)}
          <div style="margin-top:8px;color:${J.muted};font-size:11px">${n.t(r?`pulseClickMonth`:`pulseClickDay`)}</div>
        </div>`}}})}var oi=[`nodes`,`blob`,`city`],si=`e3dc-maestro.flow-style.v1`;function ci(e){return e===`blob`||e===`city`?e:`nodes`}function li(){try{return ci(localStorage.getItem(si))}catch{return`nodes`}}function ui(e){try{localStorage.setItem(si,e)}catch{}}var di=`e3dc-maestro.consumer-places.v3`,fi=`e3dc-maestro.consumer-places.v2`,pi=`e3dc-maestro.consumer-places.v1`,mi=.55,hi=36,gi=160,_i=e=>typeof e.dx==`number`&&Number.isFinite(e.dx)&&typeof e.dy==`number`&&Number.isFinite(e.dy),vi=e=>typeof e.t==`number`&&Number.isFinite(e.t)&&typeof e.r==`number`&&Number.isFinite(e.r);function yi(){return{nodes:{},blob:{},city:{}}}function bi(e){if(!e||typeof e!=`object`)return{};let t={};for(let[n,r]of Object.entries(e)){if(!n||!r||typeof r!=`object`)continue;let e=r;_i(e)?t[n]={dx:e.dx,dy:e.dy}:vi(e)&&(t[n]={t:Math.min(1,Math.max(0,e.t)),r:Math.min(1.35,Math.max(.35,e.r))})}return t}function xi(e){if(!e||typeof e!=`object`||Array.isArray(e))return null;let t=e;if(!oi.some(e=>e in t&&t[e]!==null&&typeof t[e]==`object`&&!Array.isArray(t[e])))return null;let n=yi();for(let e of oi)n[e]=bi(t[e]);return n}function Si(e){try{return JSON.parse(localStorage.getItem(e)??`null`)}catch{return null}}function Ci(e){let t={};for(let[n,r]of Object.entries(e))r&&`dx`in r&&(t[n]=r);return t}function wi(){let e=xi(Si(di));if(e)return e;let t=bi(Si(fi)),n=Object.keys(t).length?t:bi(Si(pi)),r=yi();if(!Object.keys(n).length)return r;for(let e of oi)r[e]={...n};return Ti(r),r}function Ti(e){try{let t={};for(let n of oi)t[n]=Ci(e[n]??{});localStorage.setItem(di,JSON.stringify(t))}catch{}}function Ei(e,t){return t<=1?.5:e/(t-1)}function Di(e,t,n){let r=Math.min(1,Math.max(0,e)),i=n.radius*Math.min(1.35,Math.max(.35,t)),a=n.startAngle+r*(n.endAngle-n.startAngle);return{x:n.origin.x+Math.cos(a)*i,y:n.origin.y+Math.sin(a)*i}}function Oi(e,t){return{origin:e,radius:112+Math.min(t,6)*8,startAngle:-.95,endAngle:.95}}function ki(e,t,n,r){let i=r===`separate`?mi:1,a=Di(Ei(e,t),i,n);return{dx:a.x-n.origin.x,dy:a.y-n.origin.y}}function Ai(e,t,n,r,i){if(!e)return ki(t,n,r,i);if(`dx`in e)return e;let a=Di(e.t,e.r,r);return{dx:a.x-r.origin.x,dy:a.y-r.origin.y}}function ji(e,t,n,r){return e.map((i,a)=>{let o=r?.[a],s=Ai(t[i],a,e.length,n,o);return{x:n.origin.x+s.dx,y:n.origin.y+s.dy,labelSide:`right`,labelDy:0}})}function Mi(e,t){return e?t.some(t=>{let n=e[t];return!!(n&&`dx`in n)}):!1}function Ni(e,t,n,r){let i=e,a=t;return r&&(i=Math.min(r.maxX,Math.max(r.minX,i)),a=Math.min(r.maxY,Math.max(r.minY,a))),{dx:i-n.x,dy:a-n.y}}function Pi(e){return e?200:0}function Fi(e,t,n){let r=Di(0,1.35,t).y-36,i=Di(1,1.35,t).y+36,a=r>=0?e+(e-r)+24:i+24;return Math.max(n,Math.ceil(i+24),Math.ceil(a))}function Ii(e,t,n){if(!e.length)return{w:t,h:n};let r=t,i=n,a=0;for(let t of e)r=Math.max(r,t.x+gi),i=Math.max(i,t.y+44),a=Math.min(a,t.y-36);return{w:Math.ceil(r+16),h:Math.ceil(i-Math.min(0,a)+16)}}function Li(e,t,n){return{minX:Math.min(e.origin.x-120,hi),maxX:Math.max(t-hi,e.origin.x+e.radius*1.5),minY:hi,maxY:Math.max(n-hi,e.origin.y+e.radius*1.5)}}function Ri(e,t,n){let r=e.getScreenCTM();if(!r)return;let i=e.createSVGPoint();i.x=t,i.y=n;let a=i.matrixTransform(r.inverse());return{x:a.x,y:a.y}}function zi(e,t,n,r,i,a){if(!r||!i)return;let o=e.currentTarget;if(!(o instanceof SVGElement))return;let s=o.ownerSVGElement;if(!s)return;e.preventDefault(),e.stopPropagation(),o.setPointerCapture(e.pointerId);let c=e=>{let r=Ri(s,e.clientX,e.clientY);r&&i(t,Ni(r.x,r.y,n,a))},l=e=>{try{o.releasePointerCapture(e.pointerId)}catch{}window.removeEventListener(`pointermove`,c),window.removeEventListener(`pointerup`,l)};window.addEventListener(`pointermove`,c),window.addEventListener(`pointerup`,l),c(e)}var Bi=`data:image/png;base64,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`;function Vi(e,t){let n=Math.max(0,t??0),r=Math.max(0,e??0);return n<=0?{pv:r,pvExtra:0}:{pv:Math.max(0,r-n),pvExtra:n}}var Hi={pv:`M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z`,grid:`M12 2 7 22M12 2l5 20M5 9h14M4 15h16`,house:`M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6`,bat:`M7 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM10 3h4`},Ui=24,Wi=2.15;function Gi(e){let t=e*2;return(t-Math.max(3,t*.05)*2)/Ui}var Ki=1.08;function qi(e){return(Ki+Gi(e))/2}function Ji(e,t,n){let r=Ui/2*n;return`translate(${e-r} ${t-r}) scale(${n})`}var Yi={x:6.6,y:7.6,w:10.8,h:10.8};function Xi(e){if(typeof e!=`number`||!Number.isFinite(e)||e<=0)return;let t=Math.min(100,e)/100,n=Yi.h*t;return{x:Yi.x,y:Yi.y+Yi.h-n,width:Yi.w,height:n}}var Zi={wide:{box:[600,420],hub:{x:300,y:215},pv:{x:300,y:100,labelDy:-72},grid:{x:90,y:215,labelDy:70},house:{x:510,y:215,labelDy:70},bat:{x:300,y:320,labelDy:70}},compact:{box:[360,520],hub:{x:180,y:250},pv:{x:180,y:95,labelDy:-72},grid:{x:62,y:250,labelDy:70},house:{x:298,y:250,labelDy:70},bat:{x:180,y:405,labelDy:70}}},Qi=42;function $i(e){return e>30||!1}function ea(e,t){return Math.max(0,e)+Math.max(0,t)}function ta(e,t,n=Qi,r=22){let i=t?8:10,a=n+r+i;return{x:e.x-a,y:e.y,labelDy:-38}}function na(e,t,n){return`${e} ${n.extra} · ${t} ${n.main}`}function ra(e,t=Qi){return e+t+14}var ia=26,aa=46,oa=16;function sa(e,t,n,r){let i=t.x-e.x,a=t.y-e.y,o=Math.hypot(i,a)||1,s=Math.min(n,o/2),c=Math.min(r,o/2);return{x1:e.x+i/o*s,y1:e.y+a/o*s,x2:t.x-i/o*c,y2:t.y-a/o*c}}function ca(e,t,n,r){let i=sa(e,t,n,r);return`M${i.x1} ${i.y1} L${i.x2} ${i.y2}`}var la=.22,ua=6e3;function da(e){let t=Math.abs(e);return t<30?0:t<600?2:t<2e3?3:t<4500?4:5}function fa(e){return la+Math.min(Math.abs(e),ua)/ua*1.1300000000000001}function pa(e,t){let n=t/1e3;for(let t of e){let e=Number(t.getAttribute(`data-x1`)),r=Number(t.getAttribute(`data-y1`)),i=Number(t.getAttribute(`data-x2`)),a=Number(t.getAttribute(`data-y2`)),o=Number(t.getAttribute(`data-speed`)),s=Number(t.getAttribute(`data-phase`));if(!Number.isFinite(o))continue;let c=((n*o+s)%1+1)%1,l=Math.sin(c*Math.PI),u=e+(i-e)*c,d=r+(a-r)*c;t.setAttribute(`transform`,`translate(${u.toFixed(1)} ${d.toFixed(1)})`),t.setAttribute(`opacity`,(.2+.8*l).toFixed(3))}}var ma=(e,t=16)=>e.length<=t?e:`${e.slice(0,t-1)}…`;function ha(e,t){let n=Xi(e);return z`<clipPath id="batbody"><rect x=${Yi.x} y=${Yi.y} width=${Yi.w} height=${Yi.h} rx="1.3"/></clipPath>
    ${n?z`<rect clip-path="url(#batbody)" x=${n.x} y=${n.y} width=${n.width} height=${n.height+1} fill=${t} stroke="none" opacity="0.78"/>`:z``}
    <path d=${Hi.bat} vector-effect="non-scaling-stroke"/>`}var ga={"var(--pv)":`#9a3412`,"var(--pv-extra)":`#b45309`,"var(--house)":`#5b21b6`,"var(--grid-in)":`#b91c1c`,"var(--grid-out)":`#047857`,"var(--bat)":`#0e7490`,"var(--accent)":`#075985`,"var(--ok)":`#047857`,"var(--muted)":`#64748b`},_a=(e,t)=>t?ga[e]??`#152033`:e;function va(e,t,n=!1){return e.icon!==`wallbox`||e.plugged===void 0?z`<path d=${rt[e.icon]} vector-effect="non-scaling-stroke"/>`:z`<path d=${it} vector-effect="non-scaling-stroke"/>
    <path d=${at} stroke=${_a(e.plugged?`var(--ok)`:`var(--muted)`,n)} vector-effect="non-scaling-stroke"/>`}function ya(e,t){return e.missing?!0:e.plugged!==!0&&Math.abs(e.watts)<t}function ba(e,t,n,r,i,a,o){let s=o?da(i):0;if(!s)return z``;let c=sa(e,t,n,r),l=fa(i).toFixed(3);return z`${Array.from({length:s},(e,t)=>z`<g class="electron" fill=${a} data-x1=${c.x1} data-y1=${c.y1} data-x2=${c.x2} data-y2=${c.y2} data-speed=${l} data-phase=${t/s}><circle class="halo" r="3.4"/><circle r="1.5"/><circle r="0.75" fill="#fff"/></g>`)}`}function xa(e,t){let n=Zi.compact.bat.y+Zi.compact.bat.labelDy+52;return Array.from({length:e},(e,r)=>({x:t-40,y:n+r*aa,labelDy:5}))}function Sa(e){if(!e)return Zi.compact.box[1];let t=xa(e,Zi.compact.box[0]).at(-1);return t.y+t.labelDy+36}function Ca(e,t){if(!t)return;if(e)return Math.round(Sa(t)*.94);let n=Oi(Zi.wide.house,t),r=Fi(Zi.wide.house.y,n,Zi.wide.box[1]);return Math.round(380*r/420)}function wa(e,t,n,r,i=0){if(!e.length)return z``;let a=n-14,o=Math.max(...e.map(({p:e})=>e.y));return z`<path class="flow-line" d="M${t.x+i} ${t.y} L${a} ${t.y} L${a} ${o}" stroke="var(--house)"/>
    ${e.map(({c:e,p:t})=>{let n=e.mode===`included`?`var(--house)`:`var(--accent)`,i=sa({x:a,y:t.y},t,0,oa);return z`<path class="flow-line" d="M${a} ${t.y} L${i.x2} ${t.y}" stroke=${n}/>
        ${ba({x:a,y:t.y},t,0,oa,e.watts,n,r)}`})}`}function Ta(e){let t=(e.consumers??[]).slice(0,6),n=e.compact?Zi.compact:Zi.wide,r=Oi(n.house,t.length),i=e.consumerPlaces??{},a=Mi(i,t.map(e=>e.id)),o=e.compact&&!a&&!e.arrange,s=n.box[0]+(e.compact?0:Pi(t.length)),c=e.compact?Sa(t.length):Fi(n.house.y,r,n.box[1]),l=ji(t.map(e=>e.id),i,r,t.map(e=>e.mode)),u=e.compact?xa(t.length,n.box[0]):[],d=t.map((t,r)=>{let a=i[t.id];return a&&`dx`in a?{x:n.house.x+a.dx,y:n.house.y+a.dy,labelDy:0}:o||e.compact?u[r]:{x:l[r].x,y:l[r].y,labelDy:0}}),f=o?{w:s,h:c}:Ii(d,s,c),p=f.w,m=f.h,h=Li(r,Math.max(p,e.compact?420:920),Math.max(m,e.compact?720:640)),g=e=>d[e],{pv:_=0,house:v=0,grid:y=0,battery:b=0}=e,ee=Math.max(0,_),x=Math.max(0,e.pvExtra??0),S=$i(x),te=S?ea(ee,x):ee,C=ta(n.pv,e.compact),w=e.motion!==!1,T=e.outline===!0,ne=e=>_a(e,T),E=e.i18n.t,D={pv:{color:`var(--pv)`,label:E(`nodePv`),value:te,icon:Hi.pv},grid:{color:y<0?`var(--grid-in)`:`var(--grid-out)`,label:E(y<0?`nodeImport`:`nodeFeed`),value:y,icon:Hi.grid},house:{color:`var(--house)`,label:E(`nodeHouse`),value:v,icon:Hi.house},bat:{color:`var(--bat)`,label:E(b<0?`nodeBatDischarge`:`nodeBatCharge`),value:b,icon:Hi.bat}},O=[];te>30&&O.push({node:`pv`,toHub:!0}),b<-30&&O.push({node:`bat`,toHub:!0}),b>30&&O.push({node:`bat`,toHub:!1}),y<-30&&O.push({node:`grid`,toHub:!0}),y>30&&O.push({node:`grid`,toHub:!1}),v>30&&O.push({node:`house`,toHub:!1});let k=e.compact?oa:ia,A=[`pv`,`grid`,`house`,`bat`],re=t.map((e,t)=>({c:e,p:g(t)})),j=S?e.fmt.wParts(ee,x):void 0;return z`<svg viewBox="0 0 ${p} ${m}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${[...A.map(t=>`${D[t].label} ${e.fmt.w(D[t].value)}`),...j?[`${E(`nodePvExtra`)} ${j.extra}`,`${E(`nodePvMain`)} ${j.main}`]:[],...re.map(({c:t})=>`${t.name} ${e.fmt.w(t.watts)}`)].join(`, `)}>
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="hubg"><stop offset="0" stop-color="rgba(56,189,248,.5)"/><stop offset="1" stop-color="rgba(56,189,248,0)"/></radialGradient>
    </defs>
    ${A.map(e=>z`<path class="flow-line" d=${ca(n[e],n.hub,Qi,k)} stroke=${D[e].color}/>`)}
    ${S?z`<path class="flow-line" d=${ca(C,n.pv,22,Qi)} stroke="var(--pv-extra)" opacity="0.55"/>`:z``}
    ${o?wa(re,n.house,p,w,Qi):re.map(({c:t,p:r})=>{let i=t.mode===`included`?n.house:n.hub,a=t.mode===`included`?Qi:k,o=e.compact?oa:ia,s=t.mode===`included`?`var(--house)`:`var(--accent)`;return z`<path class="flow-line" d=${ca(i,r,a,o)} stroke=${s}/>
            ${ba(i,r,a,o,t.watts,s,w)}`})}
    ${O.map(e=>ba(e.toHub?n[e.node]:n.hub,e.toHub?n.hub:n[e.node],e.toHub?Qi:k,e.toHub?k:Qi,D[e.node].value,D[e.node].color,w))}
    ${S?ba(C,n.pv,22,Qi,x,`var(--pv-extra)`,w):z``}
    <image href=${Bi} x=${n.hub.x-k} y=${n.hub.y-k} width=${k*2} height=${k*2} aria-label="Maestro"/>
    ${A.map(t=>{let r=D[t],i=n[t],a=Math.abs(r.value)<30,o=i.labelDy<0,s=t===`pv`&&j?na(E(`nodePvExtra`),E(`nodePvMain`),j):void 0,c=t===`pv`&&j?j.total:e.fmt.w(r.value);return z`<g class="flow-node" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${r.label} @click=${()=>e.onSelect?.(t)} @keydown=${n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),e.onSelect?.(t))}}>
        <circle cx=${i.x} cy=${i.y} r="42" fill=${T?`none`:`rgba(10,16,30,.9)`} stroke=${ne(r.color)} stroke-width=${T?`2.4`:`2`} filter=${a||T?`none`:`url(#glow)`}/>
        <g transform=${Ji(i.x,i.y,qi(Qi))} fill="none" stroke=${ne(r.color)} stroke-width=${Wi} stroke-linecap="round" stroke-linejoin="round">
          ${t===`bat`?ha(e.soc,ne(r.color)):z`<path d=${r.icon} vector-effect="non-scaling-stroke"/>`}
        </g>
        <text class="node-val" x=${i.x} y=${i.y+i.labelDy} text-anchor="middle">${c}</text>
        <text class="node-lbl" x=${i.x} y=${i.y+i.labelDy+(o?19:18)} text-anchor="middle">${r.label}</text>
        ${s?z`<text class="node-lbl-sm" x=${i.x} y=${ra(i.y)} text-anchor="middle">${s}</text>`:z``}
      </g>`})}
    ${S?z`<g class="flow-node" opacity=${x>30?1:.55} role="button" tabindex="0" aria-label=${E(`nodePvExtra`)} @click=${()=>e.onSelect?.(`pvExtra`)} @keydown=${t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),e.onSelect?.(`pvExtra`))}}>
          <circle cx=${C.x} cy=${C.y} r=${22} fill=${T?`none`:`rgba(10,16,30,.9)`} stroke=${ne(`var(--pv-extra)`)} stroke-width=${T?`2.4`:`2`} filter=${x>30&&!T?`url(#glow)`:`none`}/>
          <g transform=${Ji(C.x,C.y,qi(22))} fill="none" stroke=${ne(`var(--pv-extra)`)} stroke-width=${Wi} stroke-linecap="round" stroke-linejoin="round">
            <path d=${Hi.pv} vector-effect="non-scaling-stroke"/>
          </g>
        </g>`:z``}
    ${re.map(({c:t,p:n})=>{let i=ne(t.mode===`included`?`var(--house)`:`var(--accent)`),a=ya(t,30),o=()=>{e.arrange||e.onSelect?.(t.id)},s=e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),o())},c=n=>zi(n,t.id,r.origin,e.arrange,e.onPlaceConsumer,h),l=dt(e.fmt,t.watts,t.soc),u=[t.name,l,t.plugged===!0?E(`plantPlug`):void 0].filter(Boolean).join(`, `);return e.compact?z`<g class="flow-node ${e.arrange?`arrange`:``}" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${u} @click=${o} @keydown=${s} @pointerdown=${c}>
          <circle cx=${n.x} cy=${n.y} r=${oa} fill=${T?`none`:`rgba(10,16,30,.9)`} stroke=${i} stroke-width=${T?`2.2`:`2`}/>
          <g transform=${Ji(n.x,n.y,Gi(oa))} fill="none" stroke=${i} stroke-width=${Wi} stroke-linecap="round" stroke-linejoin="round">${va(t,t.mode===`included`?`var(--house)`:`var(--accent)`,T)}</g>
          <text font-size="14" font-weight="700" fill="var(--text)" x=${n.x-26} y=${n.y+5} text-anchor="end">${l}  ${ma(t.name,24)}</text>
        </g>`:z`<g class="flow-node ${e.arrange?`arrange`:``}" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${u} @click=${o} @keydown=${s} @pointerdown=${c}>
        <circle cx=${n.x} cy=${n.y} r="26" fill=${T?`none`:`rgba(10,16,30,.9)`} stroke=${i} stroke-width=${T?`2.4`:`2`} filter=${a||T?`none`:`url(#glow)`}/>
        <g transform=${Ji(n.x,n.y,Gi(ia))} fill="none" stroke=${i} stroke-width=${Wi} stroke-linecap="round" stroke-linejoin="round">${va(t,t.mode===`included`?`var(--house)`:`var(--accent)`,T)}</g>
        <text class="node-val-sm" x=${n.x+34} y=${n.y-2} text-anchor="start">${l}</text>
        <text class="node-lbl-sm" x=${n.x+34} y=${n.y+14} text-anchor="start">${ma(t.name,18)}</text>
      </g>`})}
  </svg>`}function Ea(e){let t=Math.abs(e);return t>=1e3?{kind:`kW`,tenths:Math.round(t/100)}:{kind:`W`,watts:Math.round(t)}}function Da(e,t,n,r){let i=Math.max(0,e),a=Math.max(0,t),o=Ea(i+a),s=Ea(a);if(o.kind===`kW`){let e=s.kind===`kW`?s.tenths:Math.round(a/100),t=Math.max(0,o.tenths-e);return{total:n(o.tenths),main:n(t),extra:n(e)}}let c=s.kind===`W`?s.watts:s.tenths*100,l=Math.max(0,o.watts-c);return{total:r(o.watts),main:r(l),extra:r(c)}}function Oa(e,t,n){if(e===void 0||!Number.isFinite(e))return;let r=Math.round(Math.max(0,e)*10),i=Math.round(Math.max(0,t)*10),a=Math.max(0,r-i);return{total:n(r/10),main:n(a/10),extra:n(i/10)}}var ka=e=>{let t=e||`de`,n=(e,n=1)=>e===void 0||!Number.isFinite(e)?`–`:e.toLocaleString(t,{minimumFractionDigits:n,maximumFractionDigits:n});return{loc:t,n,w:e=>e===void 0||!Number.isFinite(e)?`–`:Math.abs(e)>=1e3?`${n(Math.abs(e)/1e3,1)} kW`:`${Math.round(Math.abs(e))} W`,wParts:(e,t)=>Da(e,t,e=>`${n(e/10,1)} kW`,e=>`${e} W`),kwhParts:(e,t)=>Oa(e,t,e=>n(e,1)),time:e=>new Date(e).toLocaleTimeString(t,{hour:`2-digit`,minute:`2-digit`}),dayTime:e=>new Date(e).toLocaleString(t,{weekday:`short`,hour:`2-digit`,minute:`2-digit`}),day:e=>new Date(e).toLocaleDateString(t,{weekday:`short`,day:`numeric`,month:`short`})}},Aa=[`today`,`balance`,`balancePulse`,`plant-operation`,`plant-storage`,`plant-phases`,`plant-wallbox`],ja=`e3dc-maestro.groups.v3`,Ma=`e3dc-maestro.groups.v2`,Na=[`today`,`balance`,`balancePulse`];function Pa(e){return Array.isArray(e)?new Set(e.filter(e=>typeof e==`string`&&Aa.includes(e))):new Set}function Fa(e,t){if(e!==null)try{return Pa(JSON.parse(e))}catch{return new Set(Na)}let n=new Set;if(t!==null)try{for(let e of Pa(JSON.parse(t)))n.add(e)}catch{}for(let e of Na)n.add(e);return n}function Ia(){try{return Fa(localStorage.getItem(ja),localStorage.getItem(Ma))}catch{return new Set(Na)}}function La(e){try{localStorage.setItem(ja,JSON.stringify([...e]))}catch{}}var Ra=new Map;function za(e,t,n){let r=Ra.get(e);if(r&&r.deps.length===t.length&&r.deps.every((e,n)=>Object.is(e,t[n])))return r.value;let i=n();return Ra.set(e,{deps:t,value:i}),i}var Ba={navHelp:`Hilfe`,helpTitle:`Hilfe`,helpSub:`Panel und Regelung`,helpSearch:`Suche in der Hilfe`,helpEmpty:`Dazu steht hier nichts. Versuch ein anderes Wort, zum Beispiel Reserve oder Preisplan.`,helpToc:`Inhalt`,helpTop:`Nach oben`,helpToToc:`Zum Inhalt`,helpActive:`Gerade aktiv: {rule}`,helpNoPhase:`Keine Phase gemeldet. Die Regelung ist aus oder der erste Lauf steht noch aus.`,helpOpenSettings:`In den Einstellungen öffnen`,helpOpenControls:`Steuerung öffnen`,helpChStart:`Schnellstart`,helpChLive:`Live`,helpChForecast:`Prognose`,helpChPlan:`Preisplan`,helpChDecision:`Entscheidung`,helpChPlant:`Anlage`,helpChSettings:`Einstellungen`,helpChControls:`Steuerung`,helpChRules:`Regellogik`,helpChConcepts:`Konzepte`,helpChTrouble:`Fragen und Antworten`,helpChGlossary:`Glossar`,helpStartLead:`Was Maestro tut`,helpStartLeadBody:`Maestro entscheidet in jedem Takt, ob der Hausakku lädt, entlädt oder wartet. Das Panel zeigt den Zustand und die Schalter. Die Entscheidung trifft die Integration, nicht die Ansicht.`,helpStartSteps:`Erste Schritte`,helpStartStepsBody:`Prüfe unter Einstellungen die Einrichtung: Sensoren, Regelung und, wenn du sie nutzt, die PV-Prognose.
Schalte die Regelung ein, im Menü Steuerung oder unter System.
Sieh auf Entscheidung nach, welche Regel gerade greift und warum.
Ändere eine Schwelle erst, wenn die Begründung dazu passt.`,helpSeeRules:`Zur Regellogik`,helpOpenSetup:`Einrichtung öffnen`,helpLiveBody:`Energiefluss. PV, Netz, Haus und Akku mit der Richtung des Stroms. Oben umschalten zwischen Knoten, Blob und Haus. Zusätzliche Verbraucher stehen im Fächer am Haus; mit Anordnen lassen sie sich verschieben. Wirkung: Ein Klick auf einen Knoten öffnet den Leistungsverlauf dieses Punktes. Ohne Recorder-Daten bleibt das Diagramm leer, der Live-Wert bleibt stehen.
Zusatz-PV. Ein optionaler zweiter Erzeuger (Fremd-WR) erscheint als eigener Knoten „Zusatz“ neben der Haupt-PV, sobald Leistung anliegt. Die Tages-kWh darunter trennen Haupt und Zusatz. Wirkung: Der Verlauf kommt vom konfigurierten Leistungssensor, nicht vom Maestro-Spiegel.
Tageswerte unter dem Fluss. PV, Haus, Bezug und Einspeisung in kWh. Separat gemessene Verbraucher stehen darunter, sobald sie heute Energie haben. Wirkung: Ein Tippen öffnet die Gruppe Heute. Die Live-Leistung bleibt die Hauptzahl an den Knoten.
Kopfzeile. Restliche PV-Prognose heute, morgen und, wenn ein Sensor dafür gewählt ist, übermorgen. Die Pille zeigt, ob die Regelung an ist, und die aktuelle Phase. Wirkung: Das ist der Zustand des letzten Takts, kein Schalter.
Heute und Tagesbilanz. Starten zugeklappt. Der Kalender wählt Tag, Woche, Monat oder Jahr — auch zurückliegend. Wirkung: Aufklappen zeigt die Summen. Es ändert die Regelung nicht.
Bilanzpuls darunter. Zugeklappt mit Mini-Verlauf, aufgeklappt Tag, Woche, Monat oder Jahr als Balken plus kumulierte Linie. Wirkung: Ein Tippen auf einen Tag übernimmt ihn in die Tagesbilanz. Ohne Recorder-Daten bleibt die Gruppe leer.
Akku-Karte. Unter dem Ladezustand öffnet „Akku steuern“ Entladung, Notstromreserve und Auto-Strategie in einem Overlay. Wirkung: Dieselben Eingriffe wie zuvor auf der Live-Seite, gebündelt am Akku. Die Zahl bei Auto ist kein bereits gespartes Geld.
Vorausschau und Schattenmodus stehen als Satz unter dem Fluss. Wirkung: Du erkennst, ob der Preisplan nur rechnet oder den Akku steuert.
Verbraucher im Fluss kommen aus der Steuerung. Ein Klick auf Bearbeiten öffnet sie. Die Wallbox bleibt sichtbar, auch ohne Ladeleistung.`,helpForecastBody:`Die Prognose ist die Strategie-Vorschau über bis zu 48 Stunden: PV, Verbrauch, Phasen und den geplanten Akkuverlauf. Zoom 6 / 12 / 24 / 48 Stunden; auf dem Desktop oft 48. Die Sensoren Min-/Max-SoC, Netzbezug und Autarkie bleiben bei den nächsten 24 Stunden.
Steuert der Preisplan den Akku, ersetzt sein SoC die generische Trajektorie. Im Schattenmodus bleiben beide SoC-Kurven und ein zusätzlicher Netzbezug: cyan die erwartete Trajektorie (ohne Plan-Eingriff), violett gestrichelt der simulierte Plan-SoC, rot gestrichelt der geplante Netzbezug inkl. Netzladung. Die angezeigte Plan-Kurve folgt dem erwarteten Verbrauch und der erwarteten PV; der Planer selbst rechnet vorsichtiger (Sicherheitsfaktor, PV-Abschläge). Die Phasenbänder im Chart sind die Regelphasen (z. B. Ladekorridor). Der Streifen darunter ist nur der Preisplan-Eingriff: Netzladung, Halten oder kein Plan-Eingriff — letzteres heißt nicht Leerlauf, sondern dass der Tarif den Akku freigibt und Phasen wie der Korridor weiterlaufen. Legenden-Klicks blenden Leistungskurven aus. Den Ist-Verlauf kannst du einblenden. Ziehen im Diagramm zoomt, ein Live-Update setzt diesen Zoom nicht zurück.`,helpPlanBody:`Hier siehst du, wann der Preisplan Netzladung oder Halten vorsieht. Oben steht die Strategie: Aus, Zeitfenster, unter Preisschwelle, automatisch oder Experte.
Automatisch rechnet mit festen Werten für Wirkungsgrad, Mindestspanne und Sicherheitsfaktor. Experte nutzt deine Feinabstimmung. Ein Wechsel in den Plan startet im Schattenmodus. Der Akku folgt dem Plan erst, wenn „Preisplan steuert Akku“ an ist.
Am Ende der bekannten Preiskurve zählt ein Restwert: Nachtbedarf bis zur ersten PV (höchstens 24 Stunden) zum günstigsten Preis der letzten vier Stunden. Attribute am Preissensor: terminal_need_kwh und terminal_price. Sobald Preise für morgen da sind, verlängert sich der Horizont.
Slots hinter dem letzten echten Tarifpreis (Energyforecast) erscheinen blasser und sind im Tooltip als Prognose gekennzeichnet. Tibber und aWATTar bleiben Quelle der Wahrheit.
Dieselben Blöcke liegen auf dieser Seite unter Netzladung einstellen, anfangs zugeklappt.`,helpDecisionBody:`Die Seite nennt die aktuelle Phase, die Begründung in Klartext und den Verlauf der letzten Phasen. Oben im Verlauf liegt ein 24-Stunden-Gantt der Regelphasen — Flapping und lange Fenster sind sofort sichtbar; die Liste darunter nennt die Begründung. Die Regelungsleiter zeigt die Prüf-Reihenfolge. Die aktive Stufe ist markiert. Ein Klick darauf öffnet die passende Einstellungsgruppe.`,helpSeeLadder:`Alle Regeln im Einzelnen`,helpPlantBody:`Anlage zeigt, was der Wechselrichter meldet: Netz, Batterie, PV, Wallbox und die Steuerung am Gerät. Jeder Raum öffnet sich als eigene Ansicht. Ist die Notstromreserve an, liegt ihr Sockel gelb im Akku-Ring.`,helpSetIntro:`Überblick`,helpSetIntroBody:`Einstellungen sind nach der Aufgabe sortiert, nicht nach einzelnen Schaltern. Oben suchst du nach Namen oder Stichworten — ein Treffer öffnet den passenden Bereich. Ein Bereich öffnet sich als eigene Seite, der Pfeil führt zurück zur Übersicht. Die Expertenansicht gilt nur für diesen Browser und blendet zusätzliche Blöcke ein.`,helpSetSetup:`Einrichtung`,helpSetSetupBody:`Die Checkliste nennt, was die Regelung zum Arbeiten braucht. Dieselben Punkte stehen auf Live, solange etwas fehlt. Ohne Prognose läuft die Regelung, nur ohne Vorausschau.`,helpSetPlant:`Anlage`,helpSetPlantBody:`Wechselrichterleistung. Nennleistung des Geräts in Watt. Wirkung: Maestro fordert keine Entladung an, die darüber liegt. Zu niedrig drosselt die Hausversorgung aus dem Akku. Zu hoch ändert am Gerät nichts, der Wechselrichter begrenzt selbst.
Installierte Modulleistung. Die kWp auf dem Dach. Wirkung: Schwachertrag und die Auslegung vergleichen den Tagesertrag damit. Ein falscher Wert stuft normale Tage als schwach ein oder übersieht echte Schwachtage.
Maximale Ladeleistung. Obergrenze für jedes Ladelimit, das Maestro schickt. Wirkung: Notladung, Preisplan, Netzladung im Slot und der Schnelllade-Boden gehen nicht darüber. Mehr PV lädt den Akku nicht schneller.
Minimale Ladeleistung. Unter diesem Wert startet Maestro keine Ladung. Wirkung: Liegt der rechnerische Bedarf darunter, sendet Maestro kein Limit. Dann gilt die eigene Logik des Wechselrichters, oft eine interne Untergrenze um 100 W. Die Zahl in der Einstellung bleibt. Sehr kleine Werte wirken nur, solange Maestro selbst ein Limit sendet.
Einspeisegrenze. Anteil der Wechselrichterleistung, der höchstens ins Netz darf. Wirkung: Darüber lädt die Regel Einspeisegrenze den Überschuss in den Akku. Zu niedrig hält Energie im Akku, obwohl du einspeisen willst. Zu hoch lässt mehr ins Netz, bevor Maestro gegensteuert.`,helpSetSafety:`Sicherheit`,helpSetSafetyBody:`Ladeschwelle. Unter diesem Ladestand lädt Maestro sofort mit maximaler Leistung aus dem Netz, vor fast jeder anderen Regel. 0 schaltet die Notladung aus, das ist der Standard. Wirkung: Der Akku fällt nicht weiter. Haus und Auto bekommen in dieser Phase keinen Strom aus dem Akku. Leg sie nicht aus Versehen hoch, sonst lädt Maestro oft aus dem Netz.
Notstromreserve fest. Ein fester Sockel ersetzt die saisonale Reserve. Wirkung: Darunter ist die Entladung gesperrt und Maestro lädt bis zum Sockel nach, bei Bedarf aus dem Netz. Eine gewollte Netzladung im günstigen Fenster darf darüber hinaus.
Notstromreserve saisonal. Der Sockel ist im Winter höher und im Sommer niedriger, mit Werten für Wintersonnenwende und Tag-und-Nacht-Gleiche. Wirkung: Dieselbe Sperre wie bei der festen Reserve, nur der Sockel wandert mit dem Jahr.
Reserve aus dem Verbrauch. Hebt den Sockel anhand der letzten Tage an. Wirkung: Nach verbrauchsstarken Tagen bleibt mehr im Akku. Die Entladung stoppt früher.
Harter Ladestand-Deckel. Schalter und Prozentwert. Wirkung: Darüber blockiert Maestro weiteres Laden, die Entladung bleibt frei. Netzladung und Preisplan stoppen an dieser Grenze. Der Abregelschutz darf sie ausnehmen, damit PV nicht abgeregelt wird.
Watchdog. Sekunden ohne Kontakt, nach denen der Wechselrichter die Limits verwirft. Wirkung: Hängt Home Assistant, fällt das Gerät auf seinen Eigenverbrauch zurück und bleibt nicht auf einem alten Ladebefehl stehen. Zu kurz löscht Limits bei kurzen Aussetzern.`,helpSetTariff:`Netz und Tarif`,helpSetTariffBody:`Netzladung-Strategie. Eine Auswahl statt vieler Einzelschalter. Aus: nie aus dem Netz, nur PV. Zeitfenster: lädt in Tarif-Slots der Klasse Niedrig bis zum Ziel. Unter Preisschwelle: lädt, sobald der Preis höchstens die Schwelle ist. Automatisch: der Preisplan sucht die günstigsten Stunden, mit festem Wirkungsgrad 0,90, Mindestspanne 0,03 €/kWh und Sicherheitsfaktor 1,15, ohne Verschleiß. Experte: dieselben Rechnungen mit deinen Werten. Wirkung: Die Strategie entscheidet, ob und wann Netzstrom in den Akku darf. Ein Wechsel in den Plan startet im Schattenmodus.
Preisplan steuert Akku. Aus ist Schattenmodus: der Plan rechnet und ist auf der Seite Preisplan sichtbar, schickt aber keine Limits. An setzt Laden und Halten um. Wirkung: Erst dieser Schalter ändert den Akku.
Max. Netzladung/Tag. Eine Sicherheitsgrenze, 0 heißt keine Grenze. Wirkung: Nach so vielen kWh aus dem Netz an einem Tag stoppt die Netzladung, auch wenn der Preis noch günstig ist. Wie viel geladen wird, bestimmen Ziel, Prognose und Preisplan, nicht diese Zahl.
Preisschwelle. Bis zu diesem Preis gilt Strom als günstig. Wirkung: Nur die Strategie unter Preisschwelle liest sie. Automatisch und Experte vergleichen Stunden untereinander, nicht mit dieser Zahl.
Ziel im günstigen Fenster und SoC-Obergrenze des Plans. Bis hierhin wird geladen. Wirkung: Der Akku stoppt an dieser Grenze. Prognosebasiert macht das Ziel zur Obergrenze und lädt nur, was der Akku nach dem Fenster bis zum nächsten günstigen Fenster braucht, plus Reserve.
Entladung halten. Im günstigen Fenster ohne steuernden Preisplan bleibt der Akku stehen, sobald das Ziel erreicht ist. Wirkung: Kein Laden und Entladen im Minutentakt, solange der günstige Strom noch anliegt.
Feinabstimmung, nur bei Experte. Mindestspanne: unter dieser Preisdifferenz lohnt Netzladung nicht, der Plan lädt nicht. Wirkungsgrad: 0,9 heißt, ein Zehntel geht auf dem Umweg über den Akku verloren, der Plan verlangt eine größere Spanne. Sicherheitsfaktor: Maestro rechnet den Verbrauch höher, damit der Akku nicht leerläuft. Er gilt auch für die prognosebasierte Netzladung in Zeitfenstern und unter Preisschwelle, dort steht er in der Expertenansicht unter Grenzen. Zu hoch lädt mehr aus dem Netz als nötig.
Hochtarif. Fenster mit Start, Ende, Samstag und Sonntag, plus Mindestreserve im Winter und zur Tag-und-Nacht-Gleiche. Ein Slot kann die Reserve überschreiben. Wirkung: Im Fenster deckt der Akku das Haus, bis die Reserve erreicht ist. Erst dann sperrt Maestro die Entladung. Oberhalb der Reserve läuft normaler Eigenverbrauch. Der Schutz legt keine Niedertarif-Fenster an.
Kosten und Auswertung. Bezugspreis, Einspeisevergütung, Akkopreis und Zyklen. Wirkung: Sie steuern nicht, wann geladen wird. Statistik, Erlös und, im Modus Experte, der Verschleiß des Preisplans lesen sie. Ein zu hoher Verschleiß lässt den Plan seltener aus dem Netz laden.
Energyforecast. Optionaler API-Token und Marktzone unter dem Preis-Sensor. Wirkung: Hinter dem letzten echten Tibber-/aWATTar-Preis hängt Maestro die Prognose von energyforecast.de an. Freier Plan etwa zwei Tage, Pro etwa sechs. Netzentgelte und MwSt. im Energyforecast-Profil wie bei deinem Tarif setzen. Ohne Token endet die Kurve am Provider. Prognose-Slots erscheinen im Preisplan blasser.
Einzelschalter. Tarifmodus, dynamischer Tarif, Laden im günstigen Fenster und Preisplan berechnet. Wirkung: Die Strategie setzt sie selbst. Wer einen einzeln dreht, ändert die angezeigte Strategie. Die Expertenansicht gilt nur in diesem Browser.`,helpSetPv:`PV-Laden`,helpSetPvBody:`Ladeende-Ziel. Ladestand, den der Akku bis zum Ende des Ladefensters erreichen soll. Wirkung: Der Korridor steuert darauf hin. Zu hoch will Maestro mehr, als die PV hergibt, und greift eher zum Netz, wenn eine Netzladung erlaubt ist. Zu niedrig bleibt abends Luft im Akku.
Zwei Ziele. Frühes Ziel und später ein höheres, ab einer Stunde. Wirkung: Der Vormittag bleibt freier, der Nachmittag füllt nach.
Astro. Ladestart und Ladeende an Sonnenauf- und Untergang, plus Versatz in Stunden, früheste Stunde im Winter und Sommer-Ladeende. Wirkung: Vor Sonnenaufgang plus Versatz lädt Maestro nicht aus PV. Die Entladung fürs Haus bleibt frei. Eine gewollte Netzladung im günstigen Fenster überspringt diese Sperre.
Morning-Cap. Bis zu einer Stunde nicht über einen Ladestand hinaus laden. Wirkung: Vormittags bleibt Platz für die PV-Spitze. An einem schwachen Tag und wenn die Restprognose den Akku nicht füllt, weicht die Kappe, sonst würde mittags Überschuss ins Netz gehen und abends der Akku leer sein.
Schnelllade-Boden. Unter diesem Ladestand nimmt der Akku den vollen PV-Überschuss, ohne Korridor-Drossel. Wirkung: Ein leerer Akku füllt sich, sobald PV da ist. Netzladung im günstigen Fenster und der Abregelschutz haben Vorrang.
Ladeverteilung. Zieht die Ladung über den Tag bis zu einem Ziel, statt den Akku am Vormittag vollzumachen. Wirkung: Überschuss am Morgen geht eher ins Netz, der Akku hat mittags noch Platz. Aus, solange der Akku Vorrang hat. Ist das Ziel erreicht, blockiert Maestro weiteres Laden.
Schonladung. Nur ein Anteil der möglichen Leistung, 0,5 ist die Hälfte. Wirkung: Der Akku lädt langsamer und schont die Zellen. An einem knappen Tag kann das Ziel verfehlt werden.
Erweiterter Korridor. Untere und obere Leistung in Watt, plus Pause im unteren Korridor. Wirkung: Maestro übersetzt den Abstand zum Tagesziel in eine Ladeleistung zwischen den beiden Werten. Unter der unteren Leistung pausiert die Ladung, wenn die Pause an ist, und setzt dabei ein Limit von 0 W. Ist die Ladeverteilung aus, bringt diese Sperre keinen Glätt-Effekt: der Wechselrichter würde den Überschuss sonst sofort nehmen. Die Pause schickt ihn dann ins Netz, obwohl der Akku leer ist.
PV-Prognose und Verzögerung. Verschiebt die Ladung, wenn die restliche Prognose das Ziel schon deckt, aber nicht unter einem Mindest-Ladestand. Sicherheitfaktor rechnet die Prognose vorsichtiger. Wirkung: Der Akku lädt später, die Entladung fürs Haus bleibt frei. Ohne Prognose entfällt das.
Vorausschau. Plant aus dem Verbrauch der nächsten Stunden, mit einer Obergrenze. Wirkung: Maestro lädt nicht auf Vorrat über diesen Stand, wenn der Verbrauch das nicht hergibt.
Schwacher Tag. Unter einem Anteil der Referenz, fest in kWh oder automatisch je kWp, gilt der Tag als schwach. 0 bei der festen Referenz übernimmt den automatischen Wert. Wirkung: Der Akku nimmt den Überschuss, Ladeverteilung und Morning-Cap weichen. Die Markierung löst sich, wenn die Restprognose den Bedarf deutlich deckt. Eine eingeschaltete Netzladung im günstigen Fenster hat Vorrang.
Abregelschutz. Schaltet ein ab einer PV-Leistung und lässt unter einer kleineren wieder los. Wirkung: Maestro hält eine Mindestladung, bevor der Wechselrichter die Anlage drosselt. Ist der Akku voll, bleibt die Anforderung aus.`,helpSetLoads:`Verbraucher`,helpSetLoadsBody:`Wallbox an. Maestro setzt den Ladestrom nach dem PV-Überschuss. Typ, Mindeststrom, Höchststrom und Mindest-Überschuss bestimmen, wann und wie stark das Auto lädt. Wirkung: Unter dem Mindeststrom schaltet Maestro die Wallbox aus. Über dem Höchststrom geht sie nicht. Ohne genug Überschuss bleibt sie aus, damit sie nicht aus dem Netz oder aus dem Akku zieht.
Fahrzeug-SoC. Optionaler Sensor für den Ladestand des Autos. Wirkung: Im Energiefluss steht der SoC neben der Wallbox-Leistung (z. B. 4,2 kW · 72 %). Ohne Sensor nutzt Maestro den RSCP-Wert wallbox-soc, falls vorhanden. Speichern ohne Integrations-Neustart. Die Regelung ändert sich nicht.
Stecker angesteckt. Optionaler binary_sensor (openWB oft …_ladekabel, E3DC wallbox-plug). Wirkung: Die Stecker-Pins im Symbol werden grün. Ohne Sensor gilt „lädt“ als angesteckt. Die Wallbox bleibt im Fluss sichtbar, auch ohne Ladeleistung. Speichern ohne Neustart.
Wallbox-Netzschutz. Stoppt die Wallbox, wenn der Hausakku dafür stärker entladen würde als die Schwelle. Wirkung: Das Auto bekommt keinen Strom, der den Akku unter die Schwelle zieht. Das prüft Maestro nach der eigentlichen Akku-Entscheidung und kann die Entladegrenze dafür öffnen, damit das Auto den Akku nutzt statt das Netz, solange die Schwelle das erlaubt.
EVCC. Begrenzt die Entladung, während EVCC das Auto sofort lädt, auf eine Wattzahl. Wirkung: Der Hausakku läuft nicht ins Auto. PV-Ladung bleibt möglich. Diese Stufe steht weit oben in der Leiter.
Wärmepumpe. Läuft nur ab einem Überschuss und nur bis zu einem Strompreis, mit Mindestlaufzeit und Mindestpause. Wirkung: Sie taktet nicht bei jeder Wolke. Die Entscheidung hängt nicht an der Akku-Stufe. Zu lange Mindestlaufzeit lässt sie auch bei wegfallendem Überschuss weiterlaufen.
Morgen-Vorentladung. Modus aus, fest oder nach Preis. Ziel-Ladestand, Start erst oberhalb eines Stands, Stunden vor dem Ladestart, Höchstleistung, nur unter einer Tibber-Schwelle, und ein Preis, unter dem die Entladung ins Netz darf. Wirkung: Der Akku ist vor Sonnenaufgang leerer, der mittägliche Überschuss passt hinein. Zu tief entladen fehlt abends die Reserve. Ins Netz geht nur unter dem genannten Preis.`,helpSetAuto:`Ziel`,helpSetAutoBody:`Auto-Optimierung. Einmal am Tag sucht Maestro Parameter aus dem Verlauf von Verbrauch und PV. Sie braucht mindestens sieben Tage Daten. Wirkung: Sie schreibt Vorschläge in die Regelung. Ohne genug Historie läuft sie nicht und lässt die Werte stehen.
Ziel. Eigenverbrauch, Kosten oder CO₂. Wirkung: Dieselbe Suche bewertet andere Ergebnisse. Kosten bevorzugt günstige Netzladung, Eigenverbrauch hält mehr PV im Haus, CO₂ folgt der hinterlegten Bewertung.
Die angezeigte Zahl ist die erwartete Differenz zur bisherigen Einstellung, kein bereits gespartes Geld. Letzter Lauf, Grund und die einzelnen Anpassungen stehen daneben. Keine Anpassung heißt: die bisherige Einstellung war schon die beste. Dieselben Angaben stehen auf Live.`,helpSetSystem:`System`,helpSetSystemBody:`Regelung aktiv. Hauptschalter. Wirkung: Aus hebt die Limits auf und gibt dem Wechselrichter seinen Eigenverbrauch zurück. Keine andere Stufe läuft. An entscheidet ab dem nächsten Takt wieder. Beim Ausschalten fragt Maestro, wie lange: 1, 3, 6, 12 oder 24 Stunden, oder dauerhaft. Die Ablaufzeit bleibt über einen Neustart erhalten. Danach geht die Regelung von allein wieder an. Dauerhaft aus bleibt aus.
Entladung erzwungen und ihre Leistung. Wirkung: Der Akku entlädt mit dieser Leistung bis zum höheren Wert aus Ladeschwelle und Reserve, unabhängig von Tarif und PV. Darunter pausiert die Entladung. Die Stufe steht direkt unter dem Hauptschalter.
SoC-Hysterese. Änderung des Ladestands, die Maestro ignoriert. Wirkung: Die Phase springt nicht bei jedem Prozent. Zu groß werden Schwellen ungenau.
Ladeleistungs-Anlauf. Watt, um die das Ladelimit pro Takt höchstens steigen darf. Wirkung: Keine Sprünge, die den Wechselrichter stoßen. Zu klein erreicht ein neues Ziel erst nach vielen Takten. Zu groß ist wieder ein Sprung.
Aktualisierungsintervall. Sekunden zwischen zwei Durchläufen, üblich 30, möglich 10 bis 120. Wirkung: Kürzer reagiert schneller und schreibt öfter ans Gerät. Länger glättet, lässt aber Überschuss länger unbeantwortet.
Debug. Schreibt die Entscheidung ausführlich ins Protokoll. Wirkung: Nur das Log wird länger, der Akku ändert sich nicht.
Tageszähler zurücksetzen. Setzt die Statistik des Tages auf null. Wirkung: Die Regelung und ihre Schwellen bleiben.
Limits löschen. Hebt Lade- und Entladegrenze am Wechselrichter sofort auf. Wirkung: Bis zum nächsten Takt gilt die Geräte-Logik. Die Einstellungen bleiben gespeichert.`,helpSetLook:`Darstellung`,helpSetLookBody:`Helligkeit und Farbstimmung des Cockpits. Bewegung, Dichte und Ecken steuern Animation, Abstände und Rundungen. Name in der Seitenleiste: leer lässt „E3DC Maestro Cockpit“, sonst dein Text (höchstens 40 Zeichen). Der Name gilt für alle Nutzer; nur Administratoren ändern ihn. Darunter die Darstellung des Energieflusses: Knoten, Blob oder Haus. Look und Fluss gelten nur in diesem Browser.`,helpSetClassic:`Classic-Dashboard`,helpSetClassicBody:`Legt die Lovelace-Ansicht E3DC Maestro an, inklusive Auto-Optimierung, Sizing und der klassischen Hilfe. Dafür müssen Mushroom Cards und ApexCharts Card installiert sein. Den Pfad e3dc-maestro nicht umbenennen.`,helpSetEnergy:`Energie-Dashboard`,helpSetEnergyBody:`Trägt PV, Netzbezug/-einspeisung und Akku als Quellen in das Home-Assistant-Energie-Dashboard ein. Bevorzugt Lebensdauer-Zähler von e3dc_rscp, sonst Maestro-Tageszähler. Optional die Wallbox als Gerät (kWh, z. B. openWB — E3DC liefert oft nur Wallbox-Leistung). Gas und Wasser bleiben. Fremd-Wechselrichter und einzelne Verbrauchszähler manuell prüfen; zusätzliche Solar-Quellen und andere Geräte bleiben beim Übernehmen erhalten. Nur Administratoren.`,helpSetSizing:`Auslegung`,helpSetSizingBody:`Rechnet, wie sich ein größerer Akku oder mehr PV ausgewirkt hätte. Werte ohne eigene Entität, etwa angenommene Größe und Preise, trägst du hier ein.`,helpControlsBody:`Die Steuerung liegt unten in der Navigation und wirkt sofort: Regelung an oder aus, erzwungene Entladung, Leistung, Reserve und die Verbraucher. Alle Einstellungen führt in den Einstellungsbereich. Escape oder ein Klick daneben schließt das Menü.`,helpRulesHow:`So entscheidet Maestro`,helpRulesHowBody:`Maestro geht die Regeln von oben nach unten durch und nimmt die erste, deren Bedingung zutrifft. Die übrigen Regeln kommen in diesem Takt nicht dran. Ist die Regelung aus, passiert nichts anderes. Die erzwungene Entladung kommt direkt danach, noch vor Notladung und Einspeisegrenze.
Die Bänder gruppieren die Stufen nur zur Übersicht. Geprüft wird weiterhin jede Stufe einzeln, in der angezeigten Reihenfolge.`,helpRuleOff:`Der Hauptschalter ist aus. Maestro setzt keine Lade- oder Entladegrenze und gibt die Steuerung an das Gerät zurück.`,helpRuleForce:`Entladung erzwungen ist an. Der Akku entlädt mit der eingestellten Leistung bis zum höheren Wert aus Ladeschwelle und Reserve. Liegt der Stand schon darunter, pausiert die Entladung. Diese Regel steht über Notladung, Tarif und PV.`,helpRuleEmergency:`Der Ladestand liegt unter der Ladeschwelle. Maestro lädt mit der maximalen Ladeleistung, bevor Einspeisegrenze, Reserve oder Tarif geprüft werden.`,helpRuleFeed:`Die Einspeisung liegt über der eingestellten Grenze. Maestro lädt den Überschuss in den Akku. Die Phase bleibt kurz aktiv, auch wenn die Einspeisung danach knapp unter die Grenze fällt, damit sie nicht bei jedem Takt springt. Ist der Akku praktisch voll, setzt Maestro keine zusätzliche Ladeanforderung.`,helpRuleReserve:`Der Ladestand liegt unter der Notstromreserve, fest oder saisonal. Maestro sperrt die Entladung und lädt bis zur Reserve nach. Eine bewusst eingeschaltete Netzladung im günstigen Fenster darf diese Stufe überspringen, damit der Akku über die Reserve hinaus kommen kann.`,helpRuleEvcc:`EVCC lädt das Auto im Sofort-Modus. Maestro sperrt die Akku-Entladung, damit das Auto den Hausakku nicht leert. Die Ladung aus PV bleibt möglich.`,helpRulePrice:`Der Preisplan steuert den Akku und die Kurve ist frisch. In einer günstigen Stunde lädt Maestro bis zum Planziel und nicht über den harten Deckel. In einer teuren Stunde hält er die Entladung an, damit die Energie später mehr wert ist. Der Abregelschutz schaltet den Plan für diesen Takt aus. Im Schattenmodus rechnet der Plan nur und diese Stufe greift nicht.`,helpRuleHt:`Im Hochtarif-Fenster deckt der Akku das Haus, bis er die HT-Reserve erreicht. Erst dann sperrt Maestro die Entladung, damit für den Rest des Fensters ein Sockel bleibt. Die Reserve kommt aus dem Slot, aus dem Verbrauch oder aus der Jahreszeit. Läuft die prognosebasierte Netzladung, gilt statt dessen der Planungsboden (Ladeschwelle/Notstrom) – sonst würde derselbe Sockel hinter die teure Phase geschoben.`,helpRuleHold:`Ein günstiges Tarif-Fenster ist aktiv, Entladung halten ist an, und der Preisplan steuert den Akku nicht. Maestro entlädt in diesem Fenster nicht, damit der günstige Strom im Akku bleibt.`,helpRuleMorning:`Vor dem PV-Ladestart senkt Maestro den Akku ab, damit der mittägliche Überschuss hineinpasst. Modus, Startstand und Leistung stellst du bei den Verbrauchern ein.`,helpRuleCap:`Bis zur eingestellten Stunde lädt Maestro nicht über die Morning-Cap. So bleibt vormittags Platz für die PV. An einem schwachen PV-Tag und wenn die Restprognose den Akku nicht füllt, weicht diese Stufe. Eine anstehende Netzladung im günstigen Fenster ebenfalls.`,helpRuleAstro:`Vor Sonnenaufgang plus Versatz startet Maestro die PV-Ladung nicht. Die Entladung für das Haus bleibt frei. Im Winter gilt zusätzlich die früheste Stunde. Eine anstehende Netzladung im günstigen Fenster überspringt diese Sperre.`,helpRuleHard:`Der harte Ladestand-Deckel ist erreicht. Maestro blockiert weiteres Laden, die Entladung bleibt frei. Der Abregelschutz ist ausgenommen, damit sonst abgeregelte PV noch in den Akku kann.`,helpRuleFloor:`Unter dem Schnelllade-Boden nimmt der Akku den vollen PV-Überschuss auf, ohne Korridor-Drossel. Eine anstehende Netzladung im günstigen Fenster und der Abregelschutz haben Vorrang.`,helpRuleLow:`Der Tag ist als schwach markiert oder die konservative Restprognose reicht nicht bis zum Ziel. Solange PV anliegt und der Ladeende-Stand nicht erreicht ist, nimmt der Akku den Überschuss auf. Die Ladeverteilung und die Morning-Cap weichen. Eine eingeschaltete Netzladung im günstigen Fenster hat Vorrang, sie ist genau für solche Tage gedacht.`,helpRuleGrid:`Im günstigen Tarif-Fenster lädt Maestro aktiv aus dem Netz, bis zum Ziel dieses Fensters. Das Ziel ist fest oder kommt aus der Prognose. Der Abregelschutz hat Vorrang.`,helpRuleCorridor:`Im Ladekorridor folgt der Akku dem Tagesziel. Reicht die Restprognose schon für das Ziel, verzögert Maestro die Ladung und lässt die Entladung für das Haus frei. Ein unterer Korridor kann die Ladung pausieren, wenn wenig Überschuss da ist. Bei aktiver Ladeverteilung gilt deren Rate.`,helpRuleSpread:`Die Ladeverteilung zieht die PV-Ladung über den Tag, statt den Akku am Vormittag vollzumachen. Sie ist aus, solange der Akku Vorrang hat, also an einem schwachen Tag oder bei zu knapper Restprognose. Ist das Verteilungsziel erreicht, blockiert Maestro weiteres Laden, der Überschuss geht ins Netz.`,helpRuleCurtail:`Der Abregelschutz ist aktiv, weil die PV sonst am Einspeiselimit verloren ginge. Maestro setzt eine Mindest-Ladeleistung, damit der Überschuss in den Akku geht. Diese Stufe steht bewusst hinter den übrigen PV-Regeln und gewinnt dort, wo andere Stufen ihretwegen ausweichen. Ist der Akku voll, bleibt die Anforderung aus.`,helpRuleIdle:`Keine vorherige Regel trifft zu. Maestro setzt keine eigene Grenze. Der Wechselrichter arbeitet in seinem normalen Eigenverbrauch.`,helpWhyGrid:`Warum lädt Maestro aus dem Netz?`,helpWhyGridBody:`Netzladung kommt von zwei Stufen, und nur von denen. Entweder steuert der Preisplan und die aktuelle Stunde ist günstig. Oder die Strategie lädt im günstigen Fenster und der Zielstand lässt es zu. Notladung und das Nachladen der Reserve kommen aus dem Netz, wenn PV nicht reicht. Siehst du Netzbezug ohne eine dieser Phasen, liegt das an der Hauslast, nicht an einem Ladebefehl.`,helpConceptPlan:`Preisplan und günstige Fenster`,helpConceptPlanBody:`Der Preisplan sucht Stunden, in denen Laden und späteres Nutzen sich lohnt, und Stunden, in denen der Akku halten soll. Er braucht eine Preiskurve und eine frische Berechnung. Günstige Fenster ohne Plan sind die Tarif-Slots der Klasse Niedrig oder die Stunden unter der Preisschwelle. Die HT-Einstellungen legen nur Hochtarif-Fenster an, keine Niedertarif-Fenster.`,helpConceptPv:`Prognose und Korridor`,helpConceptPvBody:`Die PV-Prognose sagt, wie viel Energie bis zum Abend noch kommt. Davon hängt ab, ob Maestro sofort lädt, die Ladung verzögert oder dem Akku Vorrang gibt. Der Korridor ist das Tagesziel über die Stunden: nicht am Morgen schon voll, am Abend aber auf dem gewünschten Stand. Ohne Prognose entfällt die Vorausschau, die übrigen Regeln bleiben.`,helpConceptLow:`Schwacher PV-Tag`,helpConceptLowBody:`Liegt die Tagesprognose unter der Schwelle, merkt sich Maestro den Tag als schwach. Dann soll der Akku den Überschuss nehmen, statt ihn zu verteilen oder am Vormittag zu deckeln. Die Markierung löst sich, wenn die restliche Prognose den Bedarf bis zum Ladeende-Ziel deutlich deckt.`,helpConceptFeed:`Einspeisegrenze und Abregelung`,helpConceptFeedBody:`Die Einspeisegrenze reagiert, sobald messbar zu viel ins Netz fließt, und lädt genau diesen Überschuss. Der Abregelschutz wird früher aktiv, anhand der PV-Leistung, und hält eine Mindestladung, bevor der Wechselrichter die Anlage drosselt. Beide schonen die PV. Die Grenze ist die Reaktion, der Schutz die Vorsorge.`,helpConceptLoads:`Auto, Wärmepumpe, Morgen`,helpConceptLoadsBody:`EVCC Sofortladen ist eine eigene Stufe und stoppt die Entladung. Die Wallbox-Sperre gegen Netzbezug kommt nach der Entscheidung dazu und kann die Entladegrenze öffnen. Die Wärmepumpe schaltet Maestro nach Überschuss und Preis, unabhängig von der Akku-Stufe. Die Morgen-Vorentladung macht vor Sonnenaufgang Platz im Akku.`,helpTroubleOff:`Die Regelung greift nicht`,helpTroubleOffBody:`Prüfe die Pille in der Kopfzeile. Steht dort Regelung aus, ist der Hauptschalter aus und jede Stufe außer diesem Zustand bleibt stumm. Steht eine Phase, lies die Begründung auf Entscheidung. Oft blockiert eine höhere Stufe, zum Beispiel Reserve, Hochtarif oder Morning-Cap, genau das, was du weiter unten eingestellt hast.`,helpTroubleEntities:`Entitäten fehlen`,helpTroubleEntitiesBody:`Ein roter Hinweis nennt die Sensoren, die Maestro erwartet und nicht findet. Deaktivierte Entitäten sind gekennzeichnet. Lege sie in der Integration an oder aktiviere sie wieder. Solange der Hinweis steht, fehlen der Ansicht oder der Regelung Werte.`,helpTroubleAlerts:`Warnungen`,helpTroubleAlertsBody:`Das Band unter der Kopfzeile meldet, wenn der Wechselrichter nicht erreichbar ist oder eine Lade- oder Entladesperre am Gerät anliegt. Mit Bestätigen blendest du es aus, bis ein neuer Hinweis kommt. Unter Darstellung lässt sich das Banner dauerhaft ausschalten – die Chips unter dem Energiefluss bleiben. Eine Sperre am Gerät setzt Maestro nicht aus den Regeln heraus. Zusätzlich kann eine Meldung auf ungerechtfertigten Netzbezug oder Netzladung wegen Notstromreserve hinweisen.`,helpTroubleHistory:`Verlauf und Diagramme`,helpTroubleHistoryBody:`Verläufe kommen aus dem Recorder. Ist er für eine Entität ausgeschlossen oder noch nicht bereit, bleibt das Diagramm leer. Die Live-Werte darüber bleiben davon unberührt. Nach einem Update lädt das Panel das Skript neu. Siehst du die alte Ansicht, die Integration neu laden.`,helpFaqNoGrid:`Es wird nicht aus dem Netz geladen`,helpFaqNoGridBody:`Sieh auf Entscheidung die Phase. Netzladung läuft nur, wenn die Strategie nicht auf Aus steht, der Preisplan den Akku steuert oder ein günstiges Fenster aktiv ist, und der Ladestand unter dem Ziel liegt.
Häufige Gründe, warum trotzdem nichts passiert: Schattenmodus, der Plan ist nicht frisch, die Sicherheitsgrenze Max. Netzladung/Tag ist erreicht, die Prognose sieht bis zum nächsten günstigen Fenster keinen Bedarf, der harte Deckel ist erreicht, oder ein schwacher PV-Tag hat Vorrang, solange die Netzladung im günstigen Fenster nicht extra eingeschaltet ist. Liegt der Stand unter der Notstromreserve, lädt Maestro bis zur Reserve nach. Eine gewollte Ladung darüber hinaus braucht die Netzladung im günstigen Fenster, sonst endet der Takt an der Reserve.
Plant der Preisplan bewusst 0 kWh und hält nur Energie für teure Stunden, ist das ein anderer Fall – siehe den FAQ-Eintrag „Preisplan plant keine Netzladung“.`,helpFaqSwing:`Der Akku lädt und entlädt im Minutentakt`,helpFaqSwingBody:`Das passiert, wenn im günstigen Fenster bis zu einem Ziel geladen wird und die Entladung danach frei bleibt. Der Stand fällt, zwei Minuten später lädt Maestro wieder nach.
Wirkung von Entladung halten: Ist das Ziel erreicht, sperrt Maestro die Entladung, solange das günstige Fenster noch läuft. Beim Preisplan übernimmt das die Halten-Stunde. Die SoC-Hysterese dämpft zusätzlich kleine Sprünge, sie ersetzt das Halten nicht.`,helpFaqHt:`Im Hochtarif kommt Strom aus dem Netz`,helpFaqHtBody:`Der Hochtarif-Schutz sperrt die Entladung erst, wenn der Ladestand die HT-Reserve erreicht hat. Darüber deckt der Akku das Haus. Siehst du Netzbezug bei hohem Stand, ist der Schutz aus, das Fenster gilt zu dieser Stunde nicht, oder eine höhere Stufe hat die Entladung schon gesperrt, zum Beispiel die Notstromreserve oder EVCC.
Ein Slot der Klasse Hoch kann eine eigene Mindestreserve setzen. Die HT-Uhrzeiten legen kein Niedertarif-Fenster an. Niedertarif trägst du als Slot der Klasse Niedrig ein.`,helpFaqPause:`Überschuss geht ins Netz, der Akku bleibt leer`,helpFaqPauseBody:`Die Korridor-Pause setzt ein Ladelimit von 0 W, wenn der nutzbare Überschuss unter der unteren Korridorleistung liegt. Das Limit bleibt bis zum nächsten Takt. In der Zeit speist der Wechselrichter ein, obwohl der Akku Platz hat. Die Pause verhindert keinen Netzbezug. Sie verzögert nur das Laden, sobald wieder Überschuss da ist.
Ist die Ladeverteilung aus, gibt es nichts zu glätten. Schalte die Pause im unteren Korridor aus, oder den Schnelllade-Boden ein, solange der Akku leer ist. Ein schwacher Tag hebt die Drossel ebenfalls auf und nimmt den Überschuss.`,helpFaqMin:`Die kleine Mindest-Ladeleistung wirkt nicht`,helpFaqMinBody:`Die Mindest-Ladeleistung ist die Untergrenze, ab der Maestro überhaupt ein Limit schickt. Darunter gibt Maestro die Limits frei. Der Wechselrichter lädt dann nach seiner eigenen Vorgabe, oft erst ab etwa 100 W. Die Einstellung in Maestro springt dadurch nicht auf 100 W zurück.
Limits löschen macht dasselbe sofort, bis zum nächsten Takt. Wer eine sehr niedrige Schwelle will, braucht ein Limit, das Maestro auch sendet, also einen Bedarf über dieser Schwelle.`,helpFaqRestart:`Der Hauptschalter nach dem Neustart`,helpFaqRestartBody:`Der Hauptschalter merkt sich An, Aus und eine laufende Pause. Nach einem Neustart von Home Assistant steht er wieder so, wie er vorher stand, inklusive der restlichen Zeit. War er dauerhaft aus, geht Maestro nicht von allein an. Ist die Pause abgelaufen, geht er wieder an. In der Kopfzeile steht die restliche Zeit.`,helpFaqTibber:`Tibber zeigt keine Preise`,helpFaqTibberBody:`Ist der Strompreis-Sensor der Tibber-Integration gewählt, holt Maestro die Stundenkurve selbst über tibber.get_prices. Der aktuelle Preis bleibt der Sensor. Bei mehreren Wohnungen gilt der App-Spitzname. Ein Abruf läuft höchstens alle 15 Minuten. Schlägt er fehl, bleibt die letzte Kurve liegen.
15-Minuten-Preise der Börse ersetzt Maestro nicht durch eine eigene Kurve, solange Tibber sie nicht in dieser Abfrage liefert. Ohne Preis-Sensor rechnet ein dynamischer Plan nicht. Das steht dann im Satz unter der Strategie.
Endet die Tibber-Kurve um Mitternacht und der Plan soll weiterblicken, setze unter Netz und Tarif einen Energyforecast-Token – siehe „Energyforecast anbinden“.`,helpFaqEnergyforecast:`Energyforecast anbinden`,helpFaqEnergyforecastBody:`Unter Einstellungen → Netz und Tarif → Energyforecast trägst du den API-Token von energyforecast.de ein und wählst die Marktzone (meist DE-LU). Maestro hängt die Prognose nur hinter dem letzten echten Tibber-/aWATTar-Preis an; echte Preise bleiben Quelle der Wahrheit.
Im Energyforecast-Konto Netzentgelte und MwSt. wie bei deinem Tarif setzen – Maestro liest total_ct_kwh. Freier Plan liefert etwa zwei volle Tage, Pro etwa sechs. Abruf höchstens alle sechs Stunden. Leer lassen schaltet die Verlängerung aus.
Im Preisplan erscheinen Prognose-Slots blasser und im Tooltip als Prognose. Ohne Token endet die Kurve am Provider; der Restwert am Horizontende bleibt dann die einzige Vorausschau über Mitternacht hinaus.`,helpFaqPlan:`Feste Schwelle oder Preisplan?`,helpFaqPlanBody:`Eine feste Preisschwelle lädt, sobald der Preis darunter liegt, auch wenn er später am Tag nicht teurer wird. Der Preisplan lädt nur, wenn die Spanne zur späteren teuren Stunde den Umweg über den Akku lohnt, abzüglich Wirkungsgrad und, bei Experte, Verschleiß.
Zeitfenster laden nur in Slots der Klasse Niedrig, nicht in der billigsten Stunde außerhalb dieses Fensters. Automatisch sucht die Stunden selbst. Dafür muss der Preisplan den Akku steuern. Im Schattenmodus siehst du den Plan, der Akku folgt ihm nicht.
Im Modus Automatisch gelten fest Wirkungsgrad 0,90, Mindestspanne 0,03 €/kWh und Sicherheitsfaktor 1,15. Der Akku-Verschleiß zählt dort nicht, auch wenn Anschaffungskosten eingetragen sind. Experte nutzt deine Werte; bei Anschaffungskosten 0 € ist der Verschleiß 0 €/kWh. Zum leichteren Laden die Mindestspanne senken und den Wirkungsgrad etwas höher setzen. Nach dem Wechsel auf Experte den Schalter „Preisplan steuert Akku“ wieder einschalten.
Steuert der Plan den Akku, zeigt die Prognose denselben geplanten SoC wie die Preisplan-Seite.`,helpFaqPlanHold:`Preisplan plant keine Netzladung`,helpFaqPlanHoldBody:`Der Plan kann 0 kWh Netzladung planen und trotzdem sparen: Er hält vorhandene Energie für teure Stunden und lässt mittlere Preise aus dem Netz decken. Die Meldung „Entladung zeitweise gesperrt“ meint spätere Slots, nicht unbedingt den aktuellen. „Jetzt halten“ kann aus sein und die Meldung trotzdem stimmen.
Typisch, wenn die Preisspanne nach Mindestspanne und Wirkungsgrad zu klein ist, oder der Ladestand für die teuren Fenster schon reicht. Die Obergrenze ist dann oft nicht der Bremsklotz. Auf der Preisplan-Seite stehen Boden, Obergrenze und Mindestspanne; in den Plan-Slots siehst du, ob irgendwo Netzladung geplant ist.
Plant er umgekehrt Netzladung obwohl die PV-Prognose den Tag deckt, siehe „Netzladung trotz guter PV-Prognose“.`,helpFaqPlanPv:`Netzladung trotz guter PV-Prognose`,helpFaqPlanPvBody:`Der Preisplan kauft in den günstigsten Stunden nach, auch wenn die Kopfzeile genug PV für den Tag zeigt. Er rechnet den Abend konservativ: in der Entscheidung zählt die PV nur zu 80 Prozent, der Verbrauch mit dem Sicherheitsfaktor (Automatisch 1,15; Experte dein Wert). Im Diagramm stehen die ungekürzten kWh — deshalb wirkt eine geplante Netzladung oft überflüssig, obwohl die Rechnung den Akku für den Abend noch nicht voll genug sieht.
Reicht die pessimistische Bilanz nicht bis in die teuren Stunden, plant er zusätzliche kWh aus dem Netz. Oft in der billigsten Stunde des Horizonts — das kann mittags sein, wenn der Spot dort tiefer liegt als in der Nacht.
Der Plan ist kein fester Tagesfahrplan. Er wird etwa alle fünf Minuten neu gerechnet, früher wenn sich Ladestand oder Preise ändern. Steigt der SoC oder die Prognose, fällt die geplante Netzladung oft von allein weg. Weniger Netzladung bei sonnigen Tagen: Sicherheitsfaktor senken, oder Strategie Automatisch statt Experte mit hohem Faktor.`,helpFaqOld:`Das Panel zeigt noch die alte Ansicht`,helpFaqOldBody:`Die Adresse des Panels hängt am Dateiinhalt. Nach einem Neustart oder einem Reload der Integration lädt der Browser das neue Skript ohne geleerten Cache. Siehst du die alte Hilfe oder alte Schalter, die Integration E3DC Maestro neu laden und Maestro einmal schließen und wieder öffnen.`,helpFaqBalanceStats:`Wochen-, Monats- und Jahresbilanz fehlen weiter zurück`,helpFaqBalanceStatsBody:`Ja: Die Summen kommen aus den Long-term-Statistiken der Maestro-Sensoren (Kosten, Erlös, Ersparnis, Verschleiß). Die beginnen erst, wenn der jeweilige Sensor existiert und der Recorder ihn speichert — typisch ab Installation bzw. Update, das den Sensor angelegt hat. Tage und Monate davor kann Maestro nicht nachrechnen; das Energy-Dashboard liefert andere Werte (vor allem kWh), nicht dieselbe Euro-Bilanz. Ab Sensor-Existenz bleiben die Long-term-Statistiken dauerhaft; purge_keep_days betrifft nur die Kurzhistorie.`,helpGlossaryBody:`Phase: die Regel, die im letzten Takt gewonnen hat.
Ladestand: Füllung des Hausakkus in Prozent.
Reserve: Sockel, unter dem Maestro nicht entlädt.
Schattenmodus: der Preisplan rechnet, steuert den Akku aber nicht.
Max. Netzladung/Tag: Sicherheitsgrenze, nach der die Netzladung an diesem Tag stoppt (0 = keine).
Korridor: das über den Tag verteilte Ladestand-Ziel.
Abregelung: der Wechselrichter drosselt PV, weil das Netz sie nicht aufnimmt.`},Va={navHelp:`Help`,helpTitle:`Help`,helpSub:`Panel and control`,helpSearch:`Search the help`,helpEmpty:`Nothing matches. Try another word, for example reserve or price plan.`,helpToc:`Contents`,helpTop:`Back to top`,helpToToc:`Contents`,helpActive:`Active now: {rule}`,helpNoPhase:`No phase reported. Control is off, or the first cycle has not run yet.`,helpOpenSettings:`Open in settings`,helpOpenControls:`Open controls`,helpChStart:`Getting started`,helpChLive:`Live`,helpChForecast:`Forecast`,helpChPlan:`Price plan`,helpChDecision:`Decision`,helpChPlant:`System`,helpChSettings:`Settings`,helpChControls:`Controls`,helpChRules:`Control logic`,helpChConcepts:`Concepts`,helpChTrouble:`Questions and answers`,helpChGlossary:`Glossary`,helpStartLead:`What Maestro does`,helpStartLeadBody:`Each cycle Maestro decides whether the home battery charges, discharges, or waits. The panel shows the state and the switches. The integration makes the decision, not the view.`,helpStartSteps:`First steps`,helpStartStepsBody:`Under Settings, check setup: sensors, control, and the PV forecast if you use one.
Turn control on, from the Controls menu or under System.
On Decision, see which rule is active and why.
Change a threshold only when the reason points at it.`,helpSeeRules:`How the rules work`,helpOpenSetup:`Open setup`,helpLiveBody:`Energy flow. PV, grid, house, and battery, with the direction of the power. Switch above between nodes, blob and house. Extra consumers sit on a fan by the house; Arrange lets you move them. Effect: a click on a node opens that point's power history. Without recorder data the chart stays empty, and the live value remains.
Extra PV. An optional second producer (extra inverter) appears as its own “Extra” node beside main PV when it is producing. Day kWh under the flow split main and extra. Effect: history comes from the configured power sensor, not the Maestro mirror.
Day totals under the flow. PV, house, import and feed-in in kWh. Separately measured loads appear below once they have energy today. Effect: a tap opens the Today group. Live power stays the main figure on the nodes.
Header. Remaining PV forecast for today, tomorrow, and, when a sensor is selected, the day after. The pill shows whether control is on, and the current phase. Effect: that is the state of the last cycle, not a switch.
Today and the day balance. They start collapsed. The calendar picks day, week, month or year — including past ranges. Effect: opening them shows the sums. It does not change control.
Balance pulse below. Collapsed with a mini spark, open as day, week, month or year bars plus a cumulative line. Effect: tapping a day selects it in the day balance. Without recorder data the group stays empty.
Battery card. Under the state of charge, “Control battery” opens forced discharge, backup reserve and auto strategy in one overlay. Effect: the same live interventions as before, gathered on the battery. The Auto figure is not money already saved.
Look-ahead and shadow mode sit as a sentence under the flow. Effect: you can see whether the price plan is only calculating or controlling the battery.
Loads in the flow come from Controls. Edit opens them. The wallbox stays visible even without charge power.`,helpForecastBody:`Forecast is the strategy preview over up to 48 hours: PV, consumption, phases, and the planned battery path. Zoom 6 / 12 / 24 / 48 hours; desktop often defaults to 48. Min/max SoC, grid import and self-sufficiency sensors stay on the next 24 hours.
When the price plan controls the battery, its SoC replaces the generic trajectory. In shadow mode both SoC curves stay plus a grid-import overlay: cyan is the expected trajectory (no plan intervention), purple dashed is the simulated plan SoC, red dashed is planned grid import including grid charge. The chart’s plan curve follows expected consumption and PV; the planner itself stays cautious (safety factor, PV haircuts). Phase bands in the chart are control phases (e.g. charge corridor). The strip below is only the price-plan intervention: grid charge, hold, or no plan intervention — the last means the tariff leaves the battery alone so phases like the corridor can still run. Legend clicks hide power series. You can overlay measured history. Dragging the chart zooms, and a live update does not reset that zoom.`,helpPlanBody:`This page shows when the price plan wants grid charging or a hold. The strategy is at the top: off, time window, below a price threshold, automatic, or expert.
Automatic uses fixed efficiency, spread, and safety values. Expert uses your fine tuning. Switching into the plan starts in shadow mode. The battery follows the plan only after “price plan controls the battery” is on.
At the end of the known price curve a residual value counts: overnight need until first PV (at most 24 hours) at the cheapest of the last four hours. Attributes on the plan sensor: terminal_need_kwh and terminal_price. When tomorrow’s prices arrive, the horizon extends.
Slots past the last real tariff price (Energyforecast) appear paler and are marked as forecast in the tooltip. Tibber and aWATTar remain the source of truth.
The same blocks sit on this page under grid-charging settings, collapsed at first.`,helpDecisionBody:`The page shows the current phase, the reason in plain language, and the recent phase history. Above the list, a 24-hour Gantt of control phases makes flapping and long windows obvious; the list below has the reasons. The ladder shows the check order. The active rung is marked. Clicking it opens the matching settings group.`,helpSeeLadder:`Every rule in detail`,helpPlantBody:`System shows what the inverter reports: grid, battery, PV, wallbox, and the controls on the device. Each room opens as its own view. When the backup reserve is on, its floor is yellow in the battery ring.`,helpSetIntro:`Overview`,helpSetIntroBody:`Settings are grouped by job, not by individual switches. At the top you can search by name or keyword — a hit opens the matching area. An area opens as its own page, and the arrow returns to the list. Expert view applies only in this browser and reveals extra blocks.`,helpSetSetup:`Setup`,helpSetSetupBody:`The checklist is what control needs in order to run. The same items stay on Live while something is missing. Without a forecast, control still runs, just without lookahead.`,helpSetPlant:`Plant`,helpSetPlantBody:`Inverter power. The device rating in watts. Effect: Maestro will not request a discharge above it. Too low throttles the house supply from the battery. Too high changes nothing on the device, the inverter limits itself.
Installed module power. The kWp on the roof. Effect: weak-yield checks and sizing compare the day's energy with this. A wrong value marks ordinary days as weak, or misses real weak days.
Maximum charge power. The ceiling for every charge limit Maestro sends. Effect: emergency charge, the price plan, cheap-window grid charge, and the fast-charge floor stay under it. Extra PV does not charge the battery faster.
Minimum charge power. Maestro does not start a charge below this. Effect: when the calculated need is lower, Maestro sends no limit. The inverter's own logic applies again, often an internal floor around 100 W. The number in the setting stays. Very small values apply only while Maestro itself is sending a limit.
Feed-in limit. The share of inverter power that may be exported. Effect: above it, the feed-in rule charges the surplus into the battery. Too low keeps energy in the battery when you wanted to export. Too high lets more reach the grid before Maestro reacts.`,helpSetSafety:`Safety`,helpSetSafetyBody:`Charge threshold. Below this state of charge Maestro charges at once at maximum power from the grid, before almost every other rule. 0 turns emergency charging off, and that is the default. Effect: the battery stops falling. House and car get no battery power in this phase. Do not set it high by accident, or Maestro often charges from the grid.
Fixed backup reserve. A fixed floor replaces the seasonal reserve. Effect: discharge is blocked below it and Maestro charges back up to the floor, from the grid if PV is not enough. A deliberate cheap-window grid charge may go beyond it.
Seasonal backup reserve. The floor is higher in winter and lower in summer, with values for the winter solstice and the equinox. Effect: the same block as the fixed reserve, only the floor moves through the year.
Reserve from consumption. Raises the floor from recent days. Effect: after heavy days more stays in the battery. Discharge stops sooner.
Hard state-of-charge cap. A switch and a percent. Effect: above it Maestro blocks further charging, and discharge stays free. Grid charging and the price plan stop at this line. The curtailment guard may pass it so PV is not throttled.
Watchdog. Seconds without contact after which the inverter drops the limits. Effect: if Home Assistant hangs, the device returns to its own self-consumption and does not stay on an old charge command. Too short clears limits on a brief gap.`,helpSetTariff:`Grid and tariff`,helpSetTariffBody:`Grid-charging strategy. One choice instead of many switches. Off: never from the grid, PV only. Time window: charges in tariff slots of class low up to the target. Below a price threshold: charges once the price is at or under the threshold. Automatic: the price plan picks the cheapest hours, with fixed efficiency 0.90, minimum spread 0.03 €/kWh, and safety factor 1.15, ignoring wear. Expert: the same sums with your values. Effect: the strategy decides whether and when grid power may enter the battery. Switching into the plan starts in shadow mode.
Price plan controls the battery. Off is shadow mode: the plan calculates and shows on the price-plan page, but sends no limits. On applies charging and holding. Effect: only this switch changes the battery.
Max. grid charge/day. A safety cap, 0 means no cap. Effect: grid charging stops after this many kWh from the grid in one day, even if the price is still cheap. Target, forecast and price plan decide how much is charged, not this number.
Price threshold. Up to this price, electricity counts as cheap. Effect: only the below-threshold strategy reads it. Automatic and expert compare hours with each other, not with this number.
Cheap-window target and the plan's state-of-charge cap. Charging stops here. Effect: the battery stops at this line. Forecast-based makes the target a cap and charges only what the battery needs after the window until the next cheap window, plus reserve.
Hold discharge. In a cheap window, when the price plan is not in control, the battery stays put once the target is reached. Effect: no charge-and-discharge cycle every couple of minutes while the cheap power is still there.
Fine tuning, expert only. Minimum spread: below this price gap, grid charging does not pay, so the plan does not charge. Efficiency: 0.9 means a tenth is lost on the detour through the battery, so the plan demands a wider gap. Safety factor: Maestro assumes higher consumption so the battery does not run empty. It also applies to forecast-based grid charging in time windows and below the price threshold; there it sits under Limits in the expert view. Too high charges more from the grid than you need.
High tariff. A window with start, end, Saturday, and Sunday, plus a minimum reserve in winter and at the equinox. A slot can override the reserve. Effect: in the window the battery covers the house until the reserve is reached. Only then does Maestro block discharge. Above the reserve, normal self-consumption continues. The protection does not create low-tariff windows.
Costs and evaluation. Buy price, feed-in payment, battery price, and cycles. Effect: they do not decide when to charge. Statistics, revenue, and, in expert mode, the price plan's wear figure read them. Wear set too high makes the plan charge from the grid less often.
Energyforecast. Optional API token and market zone under the price sensor. Effect: past the last real Tibber/aWATTar price Maestro appends the forecast from energyforecast.de. Free plan about two days, Pro about six. Set grid fees and VAT in the Energyforecast profile to match your tariff. Without a token the curve ends at the provider. Forecast slots appear paler on the price-plan chart.
Individual switches. Tariff mode, dynamic tariff, cheap-window charging, and price plan calculated. Effect: the strategy sets them itself. Turning one by hand changes the strategy that is shown. Expert view applies only in this browser.`,helpSetPv:`PV charging`,helpSetPvBody:`End-of-charge target. The state of charge the battery should reach by the end of the charging window. Effect: the corridor steers toward it. Too high asks for more than PV can give, and reaches for the grid sooner if grid charging is allowed. Too low leaves the battery short in the evening.
Two targets. An early target, then a higher one from a chosen hour. Effect: the morning stays more open, the afternoon fills in.
Astro. Charge start and end follow sunrise and sunset, plus an offset in hours, an earliest hour in winter, and the summer end of charging. Effect: before sunrise plus the offset Maestro does not charge from PV. Discharge for the house stays free. A deliberate cheap-window grid charge skips this block.
Morning cap. Until a chosen hour, do not charge past a state of charge. Effect: the morning keeps room for the PV peak. On a weak day, and when the remaining forecast cannot fill the battery, the cap yields. Otherwise midday surplus would go to the grid and the battery would be short later.
Fast-charge floor. Below this state of charge the battery takes the full PV surplus, without the corridor throttle. Effect: an empty battery fills as soon as PV is there. Cheap-window grid charging and the curtailment guard take priority.
Spreading. Stretches charging across the day up to a target, instead of filling the battery in the morning. Effect: morning surplus tends to go to the grid, and the battery still has room at midday. It is off while the battery has priority. Once the target is reached, Maestro blocks further charging.
Gentle charge. Only a share of the possible power. 0.5 is half. Effect: the battery charges more slowly and the cells are stressed less. On a tight day the target can be missed.
Advanced corridor. Lower and upper power in watts, plus a pause in the lower corridor. Effect: Maestro turns the gap to the daily target into a charge power between the two values. Below the lower power, charging pauses while the pause is on, and Maestro sends a limit of 0 W. With spreading off, that block does not smooth anything: the inverter would otherwise take the surplus at once. The pause then sends it to the grid even though the battery is empty.
PV forecast and delay. Delays charging when the remaining forecast already covers the target, but not below a minimum state of charge. The safety factor treats the forecast more cautiously. Effect: the battery charges later, and discharge for the house stays free. Without a forecast this does not run.
Look-ahead. Plans from the consumption of the next hours, with a cap. Effect: Maestro does not charge a reserve above that level when consumption does not call for it.
Weak day. Below a share of the reference, fixed in kWh or automatic per kWp, the day counts as weak. 0 for the fixed reference uses the automatic value. Effect: the battery takes the surplus, and spreading and the morning cap yield. The latch releases when the remaining forecast clearly covers the need. An enabled cheap-window grid charge takes priority.
Curtailment guard. Turns on from a PV power and releases below a lower one. Effect: Maestro holds a minimum charge before the inverter throttles the plant. When the battery is full, the request stays off.`,helpSetLoads:`Loads`,helpSetLoadsBody:`Wallbox on. Maestro sets the charge current from the PV surplus. Type, minimum current, maximum current, and minimum surplus decide when and how hard the car charges. Effect: below the minimum current Maestro switches the wallbox off. It will not go above the maximum. Without enough surplus it stays off, so it does not draw from the grid or the battery.
Vehicle SoC. Optional sensor for the car's state of charge. Effect: the energy flow shows SoC next to wallbox power (e.g. 4.2 kW · 72 %). Without a sensor Maestro uses RSCP wallbox-soc when present. Saving does not reload the integration. Control does not change.
Plug connected. Optional binary_sensor (openWB often …_ladekabel, E3DC wallbox-plug). Effect: the plug pins in the icon turn green. Without a sensor, charging counts as plugged. The wallbox stays visible in the flow even without charge power. Saving does not reload.
Wallbox grid guard. Stops the wallbox when the home battery would be discharged harder than the threshold. Effect: the car does not take power that would pull the battery under the threshold. Maestro checks this after the battery decision and can open the discharge limit so the car uses the battery instead of the grid, as far as the threshold allows.
EVCC. Limits discharge to a watt figure while EVCC charges the car immediately. Effect: the home battery does not empty into the car. Charging from PV stays possible. This rung sits high on the ladder.
Heat pump. Runs only from a surplus and only up to an electricity price, with a minimum runtime and a minimum pause. Effect: it does not short-cycle on every cloud. The decision is independent of the battery rung. A long minimum runtime keeps it going after the surplus has gone.
Morning pre-discharge. Mode off, fixed, or by price. Target state of charge, start only above a level, hours before charge start, maximum power, only under a Tibber threshold, and a price below which discharge may export. Effect: the battery is emptier before sunrise, so the midday surplus fits. Too deep and the evening reserve is missing. Export happens only below the stated price.`,helpSetAuto:`Objective`,helpSetAutoBody:`Auto optimisation. Once a day Maestro searches for parameters from the history of consumption and PV. It needs at least seven days of data. Effect: it writes suggestions into the control settings. Without enough history it does not run and leaves the values as they are.
Objective. Self-consumption, cost, or CO₂. Effect: the same search scores different results. Cost prefers cheap grid charging, self-consumption keeps more PV in the house, CO₂ follows the stored rating.
The figure shown is the expected difference from the previous setup, not money already saved. Last run, reason, and the individual adjustments sit beside it. No adjustment means the previous setup was already the best. The same summary is on Live.`,helpSetSystem:`System`,helpSetSystemBody:`Control active. The master switch. Effect: off clears the limits and gives the inverter its own self-consumption back. No other rung runs. On decides again from the next cycle. Turning it off asks how long: 1, 3, 6, 12 or 24 hours, or until turned on. The end time survives a restart. Control comes back on by itself afterwards. Off until turned on stays off.
Forced discharge and its power. Effect: the battery discharges at this power down to the higher of the charge threshold and the reserve, regardless of tariff and PV. Below that, discharge pauses. The rung sits directly under the master switch.
State-of-charge hysteresis. A change Maestro ignores. Effect: the phase does not flip on every percent. Too large and the thresholds are met loosely.
Charge ramp. Watts the charge limit may rise at most per cycle. Effect: no jumps that kick the inverter. Too small and a new target takes many cycles. Too large is a jump again.
Update interval. Seconds between two cycles, usually 30, allowed from 10 to 120. Effect: shorter reacts faster and writes to the device more often. Longer smooths, but leaves surplus unanswered for longer.
Debug. Writes the decision in detail to the log. Effect: only the log gets longer. The battery does not change.
Reset daily counters. Sets the day's statistics to zero. Effect: control and its thresholds stay.
Clear limits. Lifts the charge and discharge limits on the inverter at once. Effect: until the next cycle the device logic applies. The settings stay saved.`,helpSetLook:`Appearance`,helpSetLookBody:`Brightness and colour of the cockpit. Motion, density and corners control animation, spacing and roundness. Sidebar name: leave empty for “E3DC Maestro Cockpit”, or enter your own (at most 40 characters). The name applies for every user; only administrators can change it. Below that, the energy-flow layout: nodes, blob or house. Look and flow apply only in this browser.`,helpSetClassic:`Classic dashboard`,helpSetClassicBody:`Creates the E3DC Maestro Lovelace view, including auto optimisation, sizing, and the classic help. Mushroom Cards and ApexCharts Card must be installed. Do not rename the path e3dc-maestro.`,helpSetEnergy:`Energy dashboard`,helpSetEnergyBody:`Writes PV, grid import/export and battery as sources into the Home Assistant Energy dashboard. Prefers lifetime meters from e3dc_rscp, otherwise Maestro daily meters. Optionally the wallbox as a device (kWh, e.g. openWB — E3DC often only exposes wallbox power). Gas and water stay. Check third-party inverters and individual consumption meters yourself; extra solar sources and other devices are kept when applying. Administrators only.`,helpSetSizing:`Sizing`,helpSetSizingBody:`Estimates the effect of a larger battery or more PV. Values without their own entity, such as assumed size and prices, are entered here.`,helpControlsBody:`Controls sits at the bottom of the navigation and applies at once: control on or off, forced discharge, power, reserve, and loads. All settings opens the settings area. Escape or a click beside the sheet closes it.`,helpRulesHow:`How Maestro decides`,helpRulesHowBody:`Maestro walks the rules from top to bottom and takes the first one whose condition matches. The remaining rules do not run in that cycle. If control is off, nothing else happens. Forced discharge comes immediately after that, before emergency charge and the feed-in limit.
The bands only group the rungs for reading. Each rung is still checked on its own, in the order shown.`,helpRuleOff:`The master switch is off. Maestro sets no charge or discharge limit and hands control back to the device.`,helpRuleForce:`Forced discharge is on. The battery discharges at the chosen power down to the higher of the charge threshold and the reserve. If the level is already below that, discharge pauses. This rule sits above emergency charge, tariff, and PV.`,helpRuleEmergency:`State of charge is below the charge threshold. Maestro charges at maximum power before the feed-in limit, reserve, or tariff are checked.`,helpRuleFeed:`Export is above the configured limit. Maestro charges the surplus into the battery. The phase stays briefly active even after export falls just under the limit, so it does not flicker every cycle. When the battery is practically full, Maestro does not add another charge request.`,helpRuleReserve:`State of charge is below the backup reserve, fixed or seasonal. Maestro blocks discharge and charges back up to the reserve. A deliberately enabled cheap-window grid charge may pass this rung, so the battery can rise above the reserve.`,helpRuleEvcc:`EVCC is charging the car in immediate mode. Maestro blocks battery discharge so the car does not empty the home battery. Charging from PV stays possible.`,helpRulePrice:`The price plan is controlling the battery and the curve is fresh. In a cheap hour Maestro charges toward the plan target and not past the hard cap. In an expensive hour it holds discharge so the energy is worth more later. The curtailment guard turns the plan off for that cycle. In shadow mode the plan only calculates, and this rung does not run.`,helpRuleHt:`During a high-tariff window the battery covers the house until it reaches the high-tariff reserve. Only then does Maestro block discharge, leaving a floor for the rest of the window. The reserve comes from the slot, from consumption, or from the season. With forecast-based grid charging the planning floor (charge threshold / backup reserve) is used instead — otherwise the same energy would be spent after the expensive window.`,helpRuleHold:`A cheap tariff window is active, hold discharge is on, and the price plan is not controlling the battery. Maestro does not discharge during that window, so the cheap energy stays in the battery.`,helpRuleMorning:`Before PV charging starts, Maestro lowers the battery so the midday surplus fits. Set the mode, starting level, and power under loads.`,helpRuleCap:`Until the configured hour Maestro does not charge above the morning cap, leaving room for PV. On a weak-PV day, and when the remaining forecast cannot fill the battery, this rung yields. A pending cheap-window grid charge does too.`,helpRuleAstro:`Before sunrise plus the offset, Maestro does not start PV charging. Discharge for the house stays free. In winter an earliest hour also applies. A pending cheap-window grid charge skips this block.`,helpRuleHard:`The hard state-of-charge cap is reached. Maestro blocks further charging, and discharge stays free. The curtailment guard is exempt, so PV that would otherwise be curtailed can still enter the battery.`,helpRuleFloor:`Below the fast-charge floor the battery takes the full PV surplus, without the corridor throttle. A pending cheap-window grid charge and the curtailment guard take priority.`,helpRuleLow:`The day is marked weak, or the conservative remaining forecast does not reach the target. While PV is producing and the end-of-charge level is not reached, the battery takes the surplus. Spreading and the morning cap yield. An enabled cheap-window grid charge takes priority. It exists for days like this.`,helpRuleGrid:`During a cheap tariff window Maestro charges from the grid, up to that window’s target. The target is fixed or comes from the forecast. The curtailment guard takes priority.`,helpRuleCorridor:`Inside the charge corridor the battery follows the daily target. When the remaining forecast already covers the target, Maestro delays charging and leaves discharge free for the house. A lower corridor can pause charging when there is little surplus. With spreading on, that rate applies.`,helpRuleSpread:`Spreading stretches PV charging across the day instead of filling the battery in the morning. It is off while the battery has priority: a weak day, or a remaining forecast that is too small. Once the spreading target is reached, Maestro blocks further charging and the surplus goes to the grid.`,helpRuleCurtail:`The curtailment guard is active because PV would otherwise be lost at the export limit. Maestro sets a minimum charge power so the surplus enters the battery. This rung sits after the other PV rules on purpose, and it wins where those rules yield because of it. When the battery is full, the request stays off.`,helpRuleIdle:`No earlier rule matches. Maestro sets no limit of its own. The inverter runs its normal self-consumption.`,helpWhyGrid:`Why is Maestro charging from the grid?`,helpWhyGridBody:`Grid charging comes from two rungs, and only those. Either the price plan is in control and the current hour is cheap. Or the strategy charges in a cheap window and the target allows it. Emergency charge and topping up the reserve also draw from the grid when PV is not enough. If you see grid import without one of these phases, that is house load, not a charge command.`,helpConceptPlan:`Price plan and cheap windows`,helpConceptPlanBody:`The price plan looks for hours where charging and later use pays off, and hours where the battery should hold. It needs a price curve and a fresh calculation. Cheap windows without the plan are tariff slots of class low, or hours below the price threshold. The high-tariff settings create only high-tariff windows, not low-tariff ones.`,helpConceptPv:`Forecast and corridor`,helpConceptPvBody:`The PV forecast says how much energy is still coming before evening. That decides whether Maestro charges now, delays charging, or gives the battery priority. The corridor is the state-of-charge target across the hours: not already full in the morning, but at the wanted level by evening. Without a forecast there is no lookahead. The other rules remain.`,helpConceptLow:`Weak PV day`,helpConceptLowBody:`When the daily forecast is below the threshold, Maestro latches the day as weak. The battery should then take the surplus instead of spreading it or capping the morning. The latch releases when the remaining forecast clearly covers the need up to the end-of-charge target.`,helpConceptFeed:`Feed-in limit and curtailment`,helpConceptFeedBody:`The feed-in limit reacts once measured export is too high, and charges exactly that surplus. The curtailment guard becomes active earlier, from PV power, and holds a minimum charge before the inverter throttles the plant. Both protect PV. The limit is the reaction, the guard is the precaution.`,helpConceptLoads:`Car, heat pump, morning`,helpConceptLoadsBody:`EVCC immediate charging is its own rung and stops discharge. The wallbox guard against grid import is applied after the decision and can open the discharge limit. Maestro switches the heat pump by surplus and price, independent of the battery rung. Morning pre-discharge makes room in the battery before sunrise.`,helpTroubleOff:`Control does nothing`,helpTroubleOffBody:`Check the pill in the header. If it says control is off, the master switch is off and every rung except that state stays silent. If a phase is shown, read the reason on Decision. A higher rung, such as reserve, high tariff, or the morning cap, often blocks exactly what you configured further down.`,helpTroubleEntities:`Entities are missing`,helpTroubleEntitiesBody:`A red note lists the sensors Maestro expects and cannot find. Disabled entities are marked. Create them in the integration or enable them again. While the note is shown, the view or the control logic is missing values.`,helpTroubleAlerts:`Warnings`,helpTroubleAlertsBody:`The band under the header reports when the inverter is unreachable or a charge or discharge lock is set on the device. Got it hides it until a new note appears. Under Appearance you can turn the banner off permanently — the chips under the energy flow stay. A lock on the device is not cleared by Maestro’s rules. A separate note can point at unjustified grid import or grid charge for the backup reserve.`,helpTroubleHistory:`History and charts`,helpTroubleHistoryBody:`History comes from the recorder. If an entity is excluded or the recorder is not ready, the chart stays empty. The live values above it are unaffected. After an update the panel loads the new script. If you still see the old view, reload the integration.`,helpFaqNoGrid:`It does not charge from the grid`,helpFaqNoGridBody:`Read the phase on Decision. Grid charging runs only when the strategy is not off, the price plan is controlling the battery or a cheap window is active, and the state of charge is under the target.
Common reasons nothing happens: shadow mode, the plan is not fresh, the max. grid charge/day safety cap is reached, the forecast sees no need until the next cheap window, the hard cap is reached, or a weak-PV day has priority while cheap-window grid charging is not switched on as well. Below the backup reserve Maestro charges back up to the reserve. Charging beyond that on purpose needs cheap-window grid charging, otherwise the cycle ends at the reserve.
If the price plan deliberately schedules 0 kWh and only holds energy for expensive hours, that is a different case — see the FAQ entry “Price plan schedules no grid charge”.`,helpFaqSwing:`The battery charges and discharges every couple of minutes`,helpFaqSwingBody:`This happens when a cheap window charges up to a target and discharge stays free afterwards. The level falls, and a couple of minutes later Maestro charges again.
Effect of hold discharge: once the target is reached, Maestro blocks discharge while the cheap window is still running. On the price plan, the hold hour does that. State-of-charge hysteresis damps small jumps. It does not replace the hold.`,helpFaqHt:`During high tariff, power comes from the grid`,helpFaqHtBody:`High-tariff protection blocks discharge only once the state of charge has reached the high-tariff reserve. Above that, the battery covers the house. If you see grid import at a high level, protection is off, the window does not apply this hour, or a higher rung already blocked discharge, for example the backup reserve or EVCC.
A slot of class high can set its own minimum reserve. The high-tariff clock does not create low-tariff windows. Enter low tariff as a slot of class low.`,helpFaqPause:`Surplus goes to the grid and the battery stays empty`,helpFaqPauseBody:`The corridor pause sends a charge limit of 0 W when the usable surplus is below the lower corridor power. The limit stays until the next cycle. In that time the inverter exports, even though the battery has room. The pause does not prevent grid import. It only delays charging once surplus returns.
With spreading off there is nothing to smooth. Turn off the pause in the lower corridor, or turn on the fast-charge floor while the battery is empty. A weak day also lifts the throttle and takes the surplus.`,helpFaqMin:`The small minimum charge power does nothing`,helpFaqMinBody:`Minimum charge power is the floor below which Maestro does not send a limit at all. Under it, Maestro releases the limits. The inverter then charges by its own rule, often only from about 100 W. The setting in Maestro does not jump back to 100 W because of that.
Clear limits does the same at once, until the next cycle. A very low threshold applies only when Maestro is actually sending a limit, so the need has to be above that threshold.`,helpFaqRestart:`The master switch after a restart`,helpFaqRestartBody:`The master switch remembers on, off, and a running pause. After a Home Assistant restart it comes back as it was, including the time still left. If it was off until turned on, Maestro does not turn itself on. Once the pause has ended, it turns on again. The header shows the time left.`,helpFaqTibber:`Tibber shows no prices`,helpFaqTibberBody:`When the electricity-price sensor from the Tibber integration is selected, Maestro fetches the hourly curve itself through tibber.get_prices. The current price stays the sensor. With several homes, the app nickname applies. A fetch runs at most every 15 minutes. If it fails, the last curve remains.
Maestro does not replace the exchange's 15-minute prices with a curve of its own unless Tibber returns them in that call. Without a price sensor a dynamic plan does not calculate. The line under the strategy says so.
If the Tibber curve ends at midnight and the plan should look further, set an Energyforecast token under Grid and tariff — see “Connect Energyforecast”.`,helpFaqEnergyforecast:`Connect Energyforecast`,helpFaqEnergyforecastBody:`Under Settings → Grid and tariff → Energyforecast enter the API token from energyforecast.de and pick the market zone (usually DE-LU). Maestro appends the forecast only past the last real Tibber/aWATTar price; real prices remain the source of truth.
In the Energyforecast account set grid fees and VAT like your tariff – Maestro reads total_ct_kwh. Free plan covers about two full days, Pro about six. Fetch at most every six hours. Leave empty to turn the extension off.
On the price-plan chart forecast slots appear paler and are marked as forecast in the tooltip. Without a token the curve ends at the provider; the residual value at the horizon end is then the only look-ahead past midnight.`,helpFaqPlan:`Fixed threshold or price plan?`,helpFaqPlanBody:`A fixed price threshold charges as soon as the price is below it, even if the price never rises later that day. The price plan charges only when the gap to a later expensive hour pays for the detour through the battery, after efficiency and, in expert mode, wear.
Time windows charge only in slots of class low, not in the cheapest hour outside that window. Automatic finds the hours itself. For that, the price plan has to control the battery. In shadow mode you see the plan, and the battery does not follow it.
In Automatic mode, efficiency 0.90, minimum spread 0.03 €/kWh and safety factor 1.15 are fixed. Battery wear does not count there, even if purchase cost is set. Expert uses your values; with purchase cost 0 €, wear is 0 €/kWh. To charge more readily, lower the minimum spread and raise efficiency a little. After switching to Expert, turn “Price plan controls battery” back on.
When the plan controls the battery, Forecast shows the same planned SoC as the price-plan page.`,helpFaqPlanHold:`Price plan schedules no grid charge`,helpFaqPlanHoldBody:`The plan can schedule 0 kWh of grid charge and still save money: it holds energy already in the battery for expensive hours and lets mid-price hours draw from the grid. The message “discharge blocked at times” means later slots, not necessarily the current one. “Hold now” can be off and that message can still be correct.
Typical when the price gap after minimum spread and efficiency is too small, or the state of charge already covers the expensive windows. The SoC ceiling is often not the blocker. On the price-plan page you see floor, ceiling and minimum spread; in the plan slots you see whether any grid charge is planned.
If it schedules grid charge even though the PV forecast covers the day, see “Grid charge despite a good PV forecast”.`,helpFaqPlanPv:`Grid charge despite a good PV forecast`,helpFaqPlanPvBody:`The price plan tops up in the cheapest hours even when the header shows enough PV for the day. It prices the evening cautiously: the decision counts PV at only 80 percent, and consumption with the safety factor (Automatic 1.15; Expert your value). The chart shows the unreduced kWh — so a planned grid charge often looks unnecessary while the sums still see the battery short for the expensive hours.
When that pessimistic balance does not reach the expensive hours, it schedules extra kWh from the grid. Often in the cheapest hour of the horizon — that can be midday if the spot is lower there than overnight.
The plan is not a fixed day schedule. It is recalculated about every five minutes, sooner when state of charge or prices change. If SoC or the forecast rises, the planned grid charge often drops on its own. Less grid charge on sunny days: lower the safety factor, or use Automatic instead of Expert with a high factor.`,helpFaqOld:`The panel still shows the old view`,helpFaqOldBody:`The panel address depends on the file content. After a restart or a reload of the integration the browser loads the new script without an emptied cache. If you still see the old help or old switches, reload the E3DC Maestro integration and close and open Maestro once.`,helpFaqBalanceStats:`Week, month and year balances are missing further back`,helpFaqBalanceStatsBody:`Yes: the totals come from long-term statistics of the Maestro sensors (cost, revenue, savings, wear). Those start only once each sensor exists and the recorder stores it — typically from install or from the update that created the sensor. Maestro cannot reconstruct days or months before that; the Energy dashboard holds different figures (mostly kWh), not the same euro balance. From the sensor’s first day, long-term statistics stay indefinitely; purge_keep_days only trims short-term history.`,helpGlossaryBody:`Phase: the rule that won the last cycle.
State of charge: how full the home battery is, in percent.
Reserve: the floor below which Maestro does not discharge.
Shadow mode: the price plan calculates but does not control the battery.
Max. grid charge/day: safety cap after which grid charging stops for that day (0 = none).
Corridor: the state-of-charge target spread across the day.
Curtailment: the inverter throttles PV because the grid will not take it.`},Ha={navLive:`Live`,navForecast:`Prognose`,navPlan:`Preisplan`,navDecision:`Entscheidung`,navSettings:`Einstellungen`,navPlant:`Anlage`,settingHelp:`Hilfe`,navControls:`Steuerung`,menu:`Menü`,subLive:`Energiefluss und Akku in Echtzeit`,factRest:`PV Prognose Rest heute`,factTomorrow:`Morgen`,factDayAfter:`Übermorgen`,subForecast:`Strategie-Vorschau: Leistung, SoC und Preisplan-Aktionen`,subPlan:`Netzladung nach dynamischem Tarif`,subDecision:`Warum Maestro gerade so regelt`,subSettings:`Von der Anlage über Schutz und Tarif bis zum PV-Laden`,subPlant:`Betriebszustand, Speicher und Phasen vom E3DC`,regulationOn:`Regelung aktiv`,regulationOff:`Regelung aus`,pauseTitle:`Wie lange aus?`,pauseHint:`Maestro bleibt so lange aus und schaltet sich danach wieder ein. Der Zähler bleibt über einen Neustart erhalten.`,pauseOffTitle:`Regelung`,pauseOffHint:`Wieder einschalten, oder für eine feste Zeit aus lassen.`,pauseResume:`Wieder einschalten`,pauseOneHour:`1 Stunde`,pauseHours:`{h} Stunden`,pausePermanent:`Dauerhaft`,pauseLeftHours:`noch {h} h {m} min`,pauseLeftHour:`noch {h} h`,pauseLeftMin:`noch {m} min`,flowTitle:`Energiefluss`,flowSub:`Jetzt · aktualisiert live`,flowDay:`Heute`,flowDaySeparate:`Separat`,flowDayImport:`Bezug`,flowDayFeed:`Einspeisung`,flowDayOpen:`Heute aufklappen`,flowStyleLabel:`Darstellung des Energieflusses`,flowOpts:`Darstellung`,flowOptsTitle:`Energiefluss darstellen`,flowOptsSub:`Ansicht wählen, Verbraucher anordnen oder bearbeiten`,flowOptsConsumers:`Verbraucher`,flowStyleTitle:`Energiefluss`,flowStyleHint:`Knoten, Blob oder Haus. Die Wahl gilt nur in diesem Browser.`,flowStyleNodes:`Knoten`,flowStyleNodesHint:`PV, Netz, Haus und Akku um den Hub. Mit separat gemessenen Verbrauchern erscheint ein Verbrauchskreis.`,flowStyleBlob:`Blob`,flowStyleBlobHint:`Weiche Form zur stärksten Quelle oder Senke. Mit separat gemessenen Verbrauchern erscheint Verbrauch → Haus.`,flowStyleCity:`Haus`,flowStyleCityHint:`Modernes Haus mit PV-Dach. Mit separat gemessenen Verbrauchern erscheint Verbrauch → Haus.`,nodeLoad:`Verbrauch`,flowCityLoad:`Last`,arrangeConsumers:`Anordnen`,arrangeDone:`Fertig`,arrangeHint:`Verbraucher ziehen und platzieren (auch mit dem Finger).`,arrangeReset:`Zurücksetzen`,nodePv:`PV`,nodePvMain:`Haupt`,nodePvExtra:`Zusatz`,nodeHouse:`Haus`,nodeImport:`Netzbezug`,nodeFeed:`Einspeisung`,nodeBatDischarge:`Akku entlädt`,nodeBatCharge:`Akku lädt`,battery:`Akku`,batteryPlantDetails:`Akku-Details`,gridPlantDetails:`Netz-Details`,pvPlantDetails:`PV-Details`,batteryStyleLabel:`Darstellung des Akkus`,batteryStyleRing:`Ring`,batteryStylePack:`Pack`,stateOfCharge:`Ladezustand`,targetSoc:`Ziel-SoC`,autonomy:`Autonomie`,forecastPeak:`Nächster SOC-Peak`,forecastPeakToday:`Peak heute {v}`,forecastPeakTomorrow:`Peak morgen {v}`,forecastNoPeak:`kein Anstieg in 48 h`,forecastFloor:`Sockel {v}`,forecastFloorReach:`Sockel erreicht {v}`,forecastEmpty:`Leer {v}`,forecastGrid:`Netz ab {v}`,forecastGridUntil:`Netz bis {v}`,forecastGridOngoing:`Netz durchgehend`,forecastNoGrid:`kein Netzbezug`,autonomyHint:`bei aktuellem Verbrauch`,discharging:`Entladung`,charging:`Ladung`,chipReachable:`E3DC erreichbar`,chipUnreachable:`E3DC nicht erreichbar`,chipChargeLock:`Ladesperre`,chipDischargeLock:`Entladesperre`,chipHt:`HT-Schutz`,chipCurtail:`Abregelschutz`,chipEmergency:`Notladung`,chipFeedIn:`Einspeisedrosselung`,chipGridCharge:`Netzladung`,chipReserveCharge:`Netzladung Notstromreserve`,chipBatteryPriority:`Akku-Priorität`,chipLowYield:`Schwacher PV-Tag`,chipPredictive:`Vorausschauende Ladung`,chipShadow:`Preisplan · Schatten`,modePredictive:`Vorausschauend`,modeShadow:`Preisplan im Schatten`,groupToday:`Heute`,groupWeek:`Woche`,groupMonth:`Monat`,groupYear:`Jahr`,groupNet:`netto`,periodToday:`Heute`,periodWeek:`Woche`,periodMonth:`Monat`,periodYear:`Jahr`,calGrainDay:`Tag`,calGrainWeek:`Woche`,calGrainMonth:`Monat`,calGrainYear:`Jahr`,forceTitle:`Erzwungene Entladung`,fixedReserve:`Notstromreserve`,controlsPair:`Entladung & Reserve`,batteryCtrl:`Akku steuern`,batteryCtrlTitle:`Akku-Steuerung`,batteryCtrlSub:`Entladung, Reserve und Auto-Strategie`,batteryCtrlIdle:`Entladung · Reserve · Auto`,controlsForceOn:`Erzwungene Entladung {v}`,controlsForceOff:`Erzwungene Entladung aus`,controlsReserveOn:`Notstromreserve {v} %`,controlsReserveOff:`Notstromreserve aus`,ctrlReserveSoc:`{v} %`,exportCsv:`CSV`,actionsTitle:`Aktionen`,btnClear:`Limits freigeben`,btnClearSub:`Hebt Lade- und Entladegrenzen sofort auf und setzt den Wechselrichter auf Normal.`,btnCharge:`Manuell laden (3 kWh)`,confirmCharge:`3 kWh aus dem Netz laden?`,selWallbox:`Wallbox-Typ`,selMorning:`Vorentladung`,selAuto:`Auto-Ziel`,selTariff:`Tarif`,debugTitle:`Debug-Log`,debugEmpty:`Noch keine Debug-Zeilen. Der Schalter startet das Logging.`,debugSwitch:`Debug-Logging`,balanceTitle:`Tagesbilanz`,balanceWeek:`Wochenbilanz`,balanceMonth:`Monatsbilanz`,balanceYear:`Jahresbilanz`,pulseTitle:`Bilanzpuls`,pulseDaily:`Tagesbilanz`,pulseMonthly:`Monatsbilanz`,pulseCumulative:`Laufende Summe`,pulseDailyAxis:`€ / Tag`,pulseMonthlyAxis:`€ / Monat`,pulseSumAxis:`Summe €`,pulseEmpty:`Keine Tagesbilanzen im Recorder.`,pulseClickDay:`Tippen wählt den Tag in der Bilanz.`,pulseClickMonth:`Tippen wählt den Monat in der Bilanz.`,dayPrev:`Zurück`,dayNext:`Vor`,dayPick:`Zeitraum wählen`,dayNav:`Zeitraum`,rangeEmpty:`Für diesen Zeitraum liegen keine Recorder-Statistiken vor.`,whenToday:`heute`,whenWeek:`diese Woche`,whenMonth:`diesen Monat`,whenYear:`dieses Jahr`,kpiCostGross:`Stromkosten`,kpiCostGrossSub:`Netzbezug brutto`,kpiRevenue:`Einspeise-Erlös`,kpiRevenueSub:`Vergütung {when}`,kpiWear:`Akku-Verschleiß`,kpiWearSub:`anteilige Zyklenkosten`,kpiBalance:`Energiebilanz`,kpiBalanceSub:`Erlös + Ersparnis − Kosten − Verschleiß`,kpiGridBat:`Netz → Akku`,kpiGridBatSub:`aus dem Netz geladen`,kpiGridBatWarn:`Netzladung ohne Rechtfertigung`,kpiGridBatReserve:`wegen Notstromreserve`,kpiGridBatEmergency:`wegen Notladung`,kpiGridBatJustified:`berechtigte Netzladung`,kpiWallbox:`Wallbox {when}`,kpiWallboxSub:`geladene Energie`,kpiFeedLimit:`Einspeisebegrenzung`,kpiFeedLimitSub:`{n} Eingriffe · {dc} kWh DC-Abregelung`,kpiCost:`Stromkosten {when}`,kpiCostSub:`netto nach Einspeisung`,kpiSaving:`PV-Ersparnis {when}`,kpiSavingSub:`gegenüber reinem Netzbezug`,kpiSimDynamic:`Simulation dynamisch {v} €`,kpiSimCostlier:`{v} € teurer`,kpiSimCheaper:`{v} € günstiger`,kpiSimMoreSaving:`{v} € mehr Ersparnis`,kpiSimLessSaving:`{v} € weniger Ersparnis`,kpiSimPending:`Vergleich ab Mitternacht`,kpiSelf:`Eigenverbrauch {when}`,kpiSelfSub:`Netzbezug {imp} kWh · Einspeisung {feed} kWh`,kpiBattery:`Akku {when}`,kpiBatterySub:`geladen · {out} kWh entladen`,chartTitle:`SoC-Trajektorie & Leistungen · nächste 48 h`,chartTitleStrategy:`Strategie-Vorschau · Preisplan-SoC, Phasen & Leistungen`,legendSoc:`SoC`,legendSocExpected:`SoC erwartet`,legendPv:`PV`,legendHouse:`Haus`,legendImport:`Netzbezug`,legendImportShadow:`Netzbezug · Schatten`,legendFeed:`Einspeisung`,legendActual:`Ist`,legendPlanSocShadow:`SoC geplant · Schatten`,legendToggleHint:`Serie ein- oder ausblenden`,strategyStrip:`Preisplan-Eingriff`,actualOverlay:`Ist-Verlauf`,now:`Jetzt`,targetLabel:`Ziel-SoC {v}%`,hoursShort:`{h} h`,statMinMax:`SoC Min / Max`,statImport:`Netzbezug`,statFeed:`Einspeisung`,statAutarky:`Autarkie`,statPvTomorrow:`PV morgen`,statP10:`PV-Rest (P10)`,statDeficit:`Defizit morgen`,statYield:`PV-Tag`,statYieldSub:`{today} / {ref} kWh Referenz`,qualityLabel:`Datenqualität`,qualityOk:`vollständig`,qualityPv:`PV-Profil fehlt`,qualityConsumption:`Verbrauchsprofil fehlt`,qualityBoth:`Profile fehlen`,qualityUnknown:`unbekannt`,reserveTitle:`Ziel-SoC`,reserveSeasonal:`Notstromreserve`,reserveAdaptive:`Reserve adaptiv`,reserveHt:`HT-Reserve`,reserveForward:`Vorausschau`,windowsTitle:`Ladefenster`,windowAstro:`Astro-Start`,windowSeasonalEnd:`Saison-Ende`,windowPvDelay:`PV-Verzögerung`,windowTomorrow:`Morgen`,autoTitle:`Auto-Strategie`,autoSaving:`Geschätzte Einsparung`,autoOff:`Aus`,autoOn:`{goal} · {eur}`,autoPending:`{goal} · noch kein Lauf`,autoData:`{goal} · zu wenig Verlauf`,autoCap:`Morgenkappe an, bis {soc} %, bis {hour} Uhr.`,autoLiveHint:`Auto stellt nur die Morgenkappe ein. Die Zahl ist die prognostizierte Ersparnis der nächsten 24 Stunden gegenüber deiner Einstellung, kein bereits gespartes Geld.`,alertUnreachable:`E3DC ist nicht erreichbar`,alertChargeLock:`Ladesperre aktiv`,alertDischargeLock:`Entladesperre aktiv`,alertUnjustified:`Netzladung ohne Rechtfertigung`,alertReserveCharge:`Netzladung wegen Notstromreserve`,alertEmergencyCharge:`Netzladung wegen Notladung`,alertDismiss:`Bestätigen`,alertBannerShow:`Alarm-Banner`,alertBannerShowHint:`Kurze Hinweise oben. Dieselben Infos stehen als Chips unter dem Energiefluss.`,noForecast:`Noch keine Prognose verfügbar. Maestro braucht mindestens 7 Tage Verlauf.`,priceTitle:`Strompreis & geplanter SoC`,legendCharge:`Netzladung`,legendHold:`Akku halten`,legendRelease:`Kein Plan-Eingriff`,legendPlanSoc:`SoC geplant`,planShadow:`Schattenmodus · steuert nicht`,planShadowMenuHint:`Schattenmodus-Anzeige`,planShadowHide:`Schattenmodus ausblenden`,planShadowShow:`Schattenmodus einblenden`,planActive:`Aktiv · steuert den Akku`,planTitle:`Plan`,planStrategy:`Netzladung`,planGridCharge:`Netzladung geplant`,planSaving:`Erwartete Ersparnis`,planCheapest:`Günstigster Slot`,planMostExpensive:`Teuerster Slot`,planKnownUntil:`Preise bekannt bis`,planDiag:`Rechenwerte`,planFloor:`Boden`,planCeiling:`Obergrenze`,planEfficiency:`Wirkungsgrad`,planMinSpread:`Mindestspanne`,planWear:`Verschleiß`,planSafety:`Verbrauchs-Sicherheitsfaktor`,noPlan:`Es liegt kein Preisplan vor. Er braucht einen dynamischen Tarif.`,noPlanOff:`Bei Strategie „Aus“ gibt es keinen Preisplan-Chart. Maestro lädt den Akku nicht aus dem Netz.`,noPlanSlots:`Bei Zeitfenster (HT/NT) gibt es keinen Preisplan-Chart. Die Ladezeiten kommen aus den Tarif-Slots der Klasse „Niedrig“.`,noPlanThreshold:`Bei „unter Preisschwelle“ gibt es keinen Preisplan-Chart. Maestro lädt, sobald der Preis unter der Schwelle liegt — die Zeiten stehen nicht als Plan-Kurve.`,planComputing:`Preisplan wird berechnet…`,noPlanPrices:`Kein Preisplan: Es fehlt eine gültige Preiskurve. Prüfe den Preis-Sensor.`,noPlanProfile:`Kein Preisplan: Noch keine Verbrauchsstatistik.`,noPlanRoom:`Kein Preisplan: Zwischen Ladeschwelle/Reserve und Ziel-SoC bleibt kein Spielraum.`,planTune:`Netzladung einstellen`,planTuneHint:`Dieselben Einstellungen wie unter Einstellungen › Netz und Tarif.`,slotPrice:`Preis`,slotSoc:`SoC`,slotConsumption:`Verbrauch`,slotCharge:`Netzladung {kwh} kWh`,slotHold:`Akku halten`,slotRelease:`Kein Plan-Eingriff`,decisionPhase:`Aktuelle Regelphase`,tagTargetSoc:`Ziel-SoC {v} %`,tagTargetPower:`Ziel-Ladeleistung {v}`,tagBatteryPriority:`Akku-Priorität`,tagSince:`seit {t}`,limitsTitle:`Limits · Soll vs. gesendet`,limitsSub:`Was Maestro will und was am E3DC ankommt`,limitCharge:`Ladelimit`,limitDischarge:`Entladelimit`,limitTarget:`Soll {a} · gesendet {b}`,limitNone:`kein Limit`,entitiesMissing:`Nicht verfügbar: {list}. Diese Maestro-Entities fehlen oder sind deaktiviert – bitte unter Einstellungen › Entitäten prüfen.`,entityDisabled:`deaktiviert`,notSetUp:`E3DC Maestro ist nicht eingerichtet oder noch nicht gestartet.`,limitSoc:`aktuell {a} % → {b} %`,timelineTitle:`Verlauf der Entscheidungen`,timelineEmpty:`Noch keine Entscheidungen aufgezeichnet.`,ganttTitle:`Phasen der letzten 24 Stunden`,ganttHint:`Farbe = aktive Regelphase`,noDecision:`Noch keine Entscheidung vorhanden.`,controlsTitle:`Schnellsteuerung`,controlsSub:`Wirkt sofort auf die Regelung`,close:`Schließen`,historySub:`Letzte 24 Stunden`,historyEmpty:`Keine Verlaufsdaten in den letzten 24 Stunden.`,historyFailed:`Der Verlauf konnte nicht geladen werden.`,ctrlActive:`Regelung aktiv`,ctrlActiveSub:`Maestro steuert die Lade- und Entladelimits`,ctrlPredictive:`Vorausschauende Ladung`,ctrlPredictiveSub:`Ladeziel aus Prognose und Verbrauch`,ctrlPvDelay:`PV-Prognose-Verzögerung`,ctrlPvDelaySub:`Ladestart verschieben, wenn PV reicht`,ctrlPlanControls:`Preisplan steuert Akku`,ctrlPlanControlsSub:`Aus = nur Schattenmodus`,ctrlPlanShadow:`Preisplan Schattenmodus`,ctrlPlanShadowSub:`Plan berechnen, aber nichts senden`,ctrlForce:`Erzwungene Entladung`,ctrlForcePower:`Leistung {v}`,allSettings:`Alle Einstellungen öffnen →`,displayTitle:`Anzeige`,consumersSub:`Verbraucher im Energiefluss. Gilt für jedes Gerät, das dieses Cockpit öffnet.`,addConsumer:`Verbraucher hinzufügen`,consumerSearch:`Leistungssensor suchen`,consumerName:`Name im Energiefluss`,consumerIcon:`Symbol`,iconWallbox:`Wallbox`,iconHeater:`Heizstab`,iconClimate:`Klimaanlage`,iconHeatpump:`Wärmepumpe`,iconMeter:`Leistungsmesser`,modeIncluded:`Im Hausverbrauch`,modeSeparate:`Separat gemessen`,useWallbox:`Wallbox übernehmen`,removeConsumer:`Entfernen`,editConsumers:`Verbraucher bearbeiten`,consumersEmpty:`Noch keine Verbraucher. Wallbox, Wärmepumpe und weitere Lasten kannst du hier ergänzen.`,consumersOverflow:`Die enthaltenen Verbraucher liegen über der Hausleistung. Prüfe, ob sie wirklich im Hauszähler stecken.`,noPowerSensors:`Keine passenden Leistungssensoren gefunden.`,consumerMissing:`Sensor nicht verfügbar`,unavailable:`nicht verfügbar`,callFailed:`Aktion fehlgeschlagen: {err}`,chartError:`Chart konnte nicht geladen werden: {err}`,loading:`Lädt …`,demoHint:`Keine Daten`,setHardware:`Anlage`,setHardwareHint:`Anlagendaten, mit denen Maestro Leistungen und Grenzen rechnet.`,setCorridor:`Ziel-SoC und Ladekorridor`,setCorridorHint:`Wohin der Akku am Tag soll: Schwelle, Korridor, Ladeende und harte Deckel.`,setWindows:`Vorausschau und Zeitfenster`,setWindowsHint:`Wann geladen wird: Prognose, Sonne, Morgen-Deckel und Verteilung über den Tag.`,setYield:`Wenig PV und Abregelung`,setYieldHint:`Akku vor Einspeisung füllen, Abregelung abfangen und spät nachladen.`,setTariff:`Netz und Tarif`,setTariffHint:`Netzladung, Hochtarif, Preise und Tarif-Slots.`,setReserve:`Hochtarif und Reserve`,setReserveHint:`HT-Fenster und Notstromreserve. Lookback der adaptiven Reserve bleibt unter Integration konfigurieren.`,setFlex:`Wallbox, Wärmepumpe, Vorentladung`,setFlexHint:`Zusätzliche Lasten und das morgendliche Entladen vor dem Ladestart.`,setControl:`Steuerverhalten`,setControlHint:`Hauptschalter, erzwungene Entladung und wie ruhig die Regelung nachregelt.`,setDiag:`Diagnose und Aktionen`,setDiagHint:`Debug-Protokoll und einmalige Aktionen.`,setPlant:`Anlage`,setPlantHint:`Wechselrichter, PV-Leistung und die Grenzen, mit denen Maestro rechnet.`,setSafety:`Schutz`,setSafetyHint:`Notladung, Notstromreserve, Akku-Deckel und Watchdog.`,setPv:`PV-Laden`,setPvHint:`Tagesziel und Zeitfenster. Ladeleistung und Sonderfälle liegen darunter.`,setLoads:`Verbraucher`,setLoadsHint:`Wallbox, EVCC, Wärmepumpe und das morgendliche Entladen vor dem Ladestart.`,setAuto:`Automatik`,setAutoHint:`Maestro sucht einmal am Tag eine bessere Einstellung für Morning-Cap und Schonladung.`,setSystem:`System`,setSystemHint:`Hauptschalter, erzwungene Entladung, Regeltempo und Diagnose.`,secPlantPower:`Leistung und Grenzen`,secPlantPowerHint:`Nennwerte der Anlage.`,secEmergency:`Notladung`,secEmergencyHint:`Unter dieser Schwelle lädt Maestro sofort aus dem Netz. 0 schaltet die Notladung aus.`,secReserve:`Notstromreserve`,secReserveHint:`Eine feste Reserve ersetzt die saisonale und die adaptive.`,secHard:`Akku-Deckel`,secHardHint:`Oberhalb dieses SoC stoppt die Ladung. Der Abregelschutz darf den Deckel übersteuern.`,secWatchdog:`Watchdog`,secWatchdogHint:`Nach dieser Zeit ohne Kontakt gibt Maestro die Limits frei.`,secStrategy:`Netzladung`,secStrategyHint:`Ob und wie Maestro den Akku aus dem Netz lädt. Die Strategie setzt alle nötigen Schalter selbst.`,secLimits:`Grenzen`,secLimitsHint:`Wie viel und bis zu welchem Ladestand aus dem Netz geladen wird.`,secPlanTune:`Feinabstimmung Preisplan`,secPlanTuneHint:`Nur bei „Dynamisch: Experte“. „Automatisch“ rechnet mit festen Werten.`,secCosts:`Kosten & Auswertung`,secCostsHint:`Diese Werte steuern nicht, wann geladen wird. Sie fließen in Kosten, Erlös und Verschleiß der Statistik ein. Der Preisplan nutzt zusätzlich den Einspeisepreis, im Modus Experte auch den Verschleiß.`,secSwitches:`Einzelschalter`,secSwitchesHint:`Die Schalter hinter der Strategie. Wer sie einzeln ändert, ändert damit auch die angezeigte Strategie.`,expertView:`Expertenansicht`,expertViewHint:`Zeigt zusätzliche Optionen und die Einzelschalter. Gilt nur für diesen Browser.`,sumOff:`Maestro lädt den Akku nie aus dem Netz, nur aus PV.`,sumSlots:`Maestro lädt in den Zeitfenstern der Klasse „Niedrig“ aus dem Netz bis {soc} %. Die Fenster legen Sie unten unter Tarif-Slots an.`,sumSlotsNone:`Es gibt noch kein Zeitfenster der Klasse „Niedrig“. Ohne ein solches Fenster lädt Maestro nicht aus dem Netz.`,sumThreshold:`Maestro lädt aus dem Netz, sobald der Preis höchstens {price} €/kWh beträgt, bis {soc} %.`,sumCap:`Sicherheitsgrenze: Nach {kwh} kWh an einem Tag stoppt die Netzladung.`,sumPlan:`Maestro sucht aus der Preiskurve die günstigsten Stunden. Er rechnet mit der Prognose für Verbrauch und PV und lädt nur so viel, wie bis zur nächsten günstigen Phase fehlt, bis {soc} %.`,sumAuto:`Wirkungsgrad, Mindestspanne und Sicherheitsfaktor sind fest eingestellt. Der Akku-Verschleiß zählt nicht.`,sumExpert:`Der Plan rechnet mit Ihren Werten für Wirkungsgrad, Mindestspanne, Sicherheitsfaktor und Akku-Verschleiß.`,sumShadow:`Schattenmodus: Der Plan wird nur berechnet und angezeigt. Damit er den Akku steuert, „Preisplan steuert Akku“ einschalten.`,sumActive:`Der Plan steuert den Akku.`,sumNoPrice:`Es ist kein Preis-Sensor hinterlegt. Ohne Preise lädt diese Strategie nicht.`,selStrategy:`Netzladung`,secHt:`Hochtarif`,secHtHint:`Im HT-Fenster hält Maestro eine Mindestreserve.`,secCorridor:`Tagesziel`,secCorridorHint:`SoC bis zum Ladeende. Das spätere Ziel gilt nur mit dem Schalter.`,secWindows:`Zeitfenster`,secWindowsHint:`Mit Astro folgen Start und Ende der Sonne. Sonst liegen Winter- und Sommer-Ladeende fest.`,secShape:`Ladeleistung`,secShapeHint:`Wie stark geladen wird. Ausgegraute Werte gelten erst, wenn ihr Schalter an ist. Der Korridor ist eine Leistung in Watt.`,secYield:`Wenn der Tag anders läuft`,secYieldHint:`Prognose, schwacher Tag und Abregelung. Schwellen und Referenzen stehen in der Expertenansicht.`,sumTarget:`Bis zum Ladeende auf {soc} %.`,sumTargetLate:`Bis zum Ladeende auf {soc} %, ab {hour} Uhr auf {late} %.`,sumWindowAstro:`Ladestart {start} h nach Sonnenaufgang, Ladeende {end} h vor Sonnenuntergang.`,sumWindowHours:`Ladeende im Winter um {winter} Uhr, im Sommer um {summer} Uhr.`,sumWindowCap:`Morgens höchstens {soc} % bis {hour} Uhr.`,sumPowerAuto:`Automatisch: die Leistung folgt dem Weg zum Tagesziel.`,sumPowerFloor:`Unter {soc} % volle Leistung.`,sumPowerSpread:`Verteilt bis {soc} %.`,sumPowerGentle:`Begrenzt auf Faktor {factor}.`,sumPowerCorridor:`Korridor {low}–{high} W.`,sumPowerPause:`Pause unter {low} W.`,sumPvNone:`Keine Sonderregel. Es gilt das Tagesziel.`,sumPvForecast:`Die Prognose darf die Ladung verzögern.`,sumPvForward:`Vorausschau bis {soc} %.`,sumPvLow:`An schwachen Tagen wird früher geladen.`,sumPvCurtail:`Abregelung wird abgefangen.`,secWallbox:`Wallbox`,secWallboxHint:`Überschussladen und Netzschutz, solange das Auto Leistung zieht.`,secEvcc:`EVCC`,secEvccHint:`Sperrt die Akku-Entladung, während das Auto sofort lädt.`,secHp:`Wärmepumpe`,secHpHint:`Überschuss und Preisgrenze.`,secMorning:`Morgen-Vorentladung`,secMorningHint:`Akku vor dem Ladestart absenken, damit PV-Überschuss hineinpasst.`,secAuto:`Ziel`,secAutoHint:`Die gefundene Strategie steht auf der Entscheidungsseite.`,secRun:`Betrieb`,secRunHint:`Dieselben Schalter liegen im Schnellmenü.`,secPace:`Tempo`,secPaceHint:`Wie oft geregelt wird und wie stark sich die Ladeleistung pro Takt ändern darf.`,secDiag:`Diagnose`,secDiagHint:`Debug-Protokoll und einmalige Aktionen.`,ladderTitle:`Regelungsleiter`,ladderHint:`Maestro prüft von oben nach unten und nimmt die erste passende Regel. Die aktive Regel ist markiert.`,showInLadder:`In der Regelungsleiter zeigen`,ladderBandSafety:`Sicherheit`,ladderBandTariff:`Netz und Tarif`,ladderBandBlocks:`Ladesperren`,ladderBandPv:`PV-Laden`,ladderBandRest:`Danach`,ladderOff:`Regelung aus`,ladderForce:`Entladung erzwungen`,ladderEmergency:`Notladung`,ladderFeed:`Einspeisegrenze`,ladderReserve:`Notstromreserve`,ladderEvcc:`EVCC Sofortladen`,ladderPrice:`Preisplan`,ladderHt:`Hochtarif`,ladderHold:`Günstigen Slot halten`,ladderMorning:`Morgen-Vorentladung`,ladderCap:`Morning-Cap`,ladderAstro:`Warten auf Sonne`,ladderHard:`Akku-Deckel`,ladderFloor:`Schnelllade-Boden`,ladderLow:`Schwacher PV-Tag`,ladderGrid:`Netzladung im Slot`,ladderCorridor:`Korridor und PV-Verzögerung`,ladderSpread:`Ladeverteilung`,ladderCurtail:`Abregelschutz`,ladderIdle:`Leerlauf`,confirmReset:`Tagesstatistik auf 0 setzen?`,settingsPending:`Einstellungen werden geladen …`,settingsSearch:`Einstellung suchen…`,settingsSearchEmpty:`Nichts gefunden. Anderes Stichwort versuchen.`,settingsBack:`Alle Bereiche`,setClassic:`Classic-Dashboard`,setClassicHint:`Mit einem Klick anlegen`,classicLead:`Das Classic-Dashboard ist die Lovelace-Ansicht mit allen Tabs, auch Auto-Optimierung, Sizing-Berater und Hilfe. Maestro legt es hier direkt an.`,classicDepsTitle:`Benötigte Karten`,classicDepMushroom:`Mushroom Cards`,classicDepApex:`ApexCharts Card`,classicDepVia:`HACS → Frontend`,classicInstalled:`installiert`,classicMissing:`fehlt – über HACS → Frontend installieren`,classicDepsMissing:`Ohne diese Karten zeigt das Dashboard Fehlerkacheln. Erst installieren, dann den Browser neu laden.`,classicActionTitle:`Dashboard`,classicChecking:`Prüfe, ob das Dashboard schon angelegt ist …`,classicCreate:`Dashboard anlegen`,classicSetup:`Inhalt einrichten`,classicCreating:`Wird angelegt …`,classicReady:`Das Dashboard E3DC Maestro ist angelegt und steht in der Seitenleiste.`,classicEmpty:`Unter dem Pfad e3dc-maestro gibt es ein leeres Dashboard. Maestro richtet den Inhalt dort ein.`,classicForeign:`Unter dem Pfad e3dc-maestro liegt schon ein Dashboard mit anderem Inhalt. Maestro überschreibt es nicht. Zum Neuanlegen dieses Dashboard unter Einstellungen → Dashboards löschen.`,classicAdminOnly:`Anlegen können nur Administratoren.`,classicFailed:`Das hat nicht geklappt: {err}`,classicRetry:`Erneut prüfen`,classicManual:`Manuell anlegen`,classicHa:`Der Eintrag unter Community dashboards erscheint ab Home Assistant 2026.5. In älteren Versionen das Dashboard leer anlegen (Titel E3DC Maestro, Pfad e3dc-maestro) und den Inhalt von maestro_dashboard.yaml im YAML-Editor einfügen.`,classicStep1:`Integration E3DC Maestro einrichten. Läuft sie schon, Home Assistant einmal neu starten.`,classicStep2:`Den Browser hart neu laden, damit das Dashboard-Modul geladen ist.`,classicStep3:`Einstellungen → Dashboards → Dashboard hinzufügen.`,classicStep4:`Unter Community dashboards E3DC Maestro wählen.`,classicStep5:`Titel E3DC Maestro und das vorgeschlagene Icon bestätigen, dann anlegen.`,classicPath:`Der Pfad muss e3dc-maestro bleiben. Den vorgeschlagenen Titel nicht umbenennen, bevor der Slug feststeht. Sonst zeigen die Hilfe-Links ins Leere.`,classicAfter:`Das Dashboard baut sich bei jedem Öffnen aus der aktuellen Maestro-Vorlage auf. Updates kommen damit automatisch an, solange du es nicht im Editor übernimmst.`,classicTimeout:`Kommt „Timeout waiting for strategy element ll-strategy-dashboard-e3dc-maestro“: Home Assistant neu starten, den Browser hart neu laden und unter Einstellungen → Dashboards → Ressourcen prüfen, ob ganz oben /local/e3dc_maestro/e3dc-maestro-strategy.js als JavaScript-Modul steht (direkt nach dem ersten Einrichten noch /e3dc_maestro/frontend/e3dc-maestro-strategy.js).`,classicOpen:`Dashboard öffnen`,setEnergy:`Energie-Dashboard`,setEnergyHint:`Quellen mit einem Klick setzen`,energyLead:`Maestro trägt PV, Netz und Akku in das Home-Assistant-Energie-Dashboard ein. Bevorzugt Lebensdauer-Zähler von e3dc_rscp, sonst die Maestro-Tageszähler. Gas und Wasser bleiben unberührt.`,energySensorsTitle:`Gefundene Zähler`,energyRoleSolar:`PV-Ertrag`,energyRoleGridFrom:`Netzbezug`,energyRoleGridTo:`Netzeinspeisung`,energyRoleBatteryFrom:`Akku entladen`,energyRoleBatteryTo:`Akku laden`,energyRoleWallbox:`Wallbox`,energyOriginOptions:`Sizing-Einstellung`,energyOriginRscp:`e3dc_rscp`,energyOriginMaestro:`Maestro (Tageszähler)`,energyMissing:`Fehlt noch`,energyActionTitle:`Übernehmen`,energyChecking:`Prüfe Energie-Dashboard und Zähler …`,energyApplying:`Wird eingetragen …`,energyReady:`Die Maestro-Quellen stehen schon im Energie-Dashboard.`,energyEmpty:`Noch keine PV-/Netz-/Akku-Quellen. Maestro trägt die gefundenen Zähler ein.`,energyPartial:`Einige Quellen fehlen noch. Maestro füllt die Lücken — oder ersetzt PV, Netz und Akku komplett.`,energyForeign:`Im Energie-Dashboard stehen schon andere PV-/Netz-/Akku-Quellen. Übernehmen ersetzt nur diese drei; Gas und Wasser bleiben.`,energyUnavailable:`Keine passenden Energiezähler gefunden. e3dc_rscp oder Maestro muss geladen sein.`,energyNoComponent:`Die Home-Assistant-Energie-Integration ist nicht geladen.`,energyAdminOnly:`Eintragen können nur Administratoren.`,energyFailed:`Das hat nicht geklappt: {err}`,energyAlready:`Die Quellen sind bereits gesetzt.`,energyRetry:`Erneut prüfen`,energyFill:`Lücken füllen`,energyReplace:`Quellen ersetzen`,energyApply:`Quellen eintragen`,energyOpen:`Energie-Dashboard öffnen`,energyAfter:`Danach unter Einstellungen → Energie die Preise prüfen. Der Sizing-Berater kann dieselben Quellen wieder auslesen.`,energyMaestroNote:`Tageszähler setzen um Mitternacht zurück. Für lange Auswertungen sind die RSCP-Lebensdauerzähler besser.`,energyExtraTitle:`Weitere Solar-Quellen`,energyFremdHint:`Fremd-Wechselrichter (z. B. Fronius) gehören als eigene Solar-Quelle ins Energie-Dashboard — parallel zum E3DC-PV-Zähler. Derselbe WR läuft bei E3DC oft zusätzlich als „Additional production“. Nicht beides doppelt zählen: entweder den direkten WR-Zähler oder den E3DC-Additional-Energiezähler, nicht beide. Maestro trägt nur den E3DC-Hauptzähler ein; zusätzliche Solar-Quellen prüfst du manuell und lässt sie stehen.`,energyExtraKeep:`Bereits eingetragen und bleiben erhalten:`,energyDevicesTitle:`Geräte / Wallbox`,energyDevicesHint:`Ins Energie-Dashboard gehören Energiezähler (kWh), keine reinen Leistungswerte (W/kW). hacs-e3dc liefert für die E3DC-Wallbox oft nur Leistung (wallbox-consumption); brauchbare kWh kommen von der Wallbox selbst (z. B. openWB), einem Utility-Meter oder Maestro „Wallbox-Energie heute“. Leistungsmesser (Shelly, Fritz, …) brauchst du als Energy-Sensor oder Riemann-Integration, bevor du sie als Gerät zuweist. Steckt die Wallbox schon im Hausverbrauch, im Dashboard „enthält“ setzen — sonst Doppelzählung.`,energyWallboxPowerMissing:`E3DC-Wallbox-Leistungsmesser ist vorhanden, liefert aber gerade keinen Wert (unavailable). Dann den Energiezähler der Wallbox-Integration nutzen — nicht den E3DC-Leistungssensor.`,energyWallboxPowerOk:`E3DC-Wallbox-Leistungsmesser ist aktiv — fürs Dashboard trotzdem einen kWh-Zähler brauchen (Integration oder Utility-Meter).`,energyExtraDevicesKeep:`Weitere Geräte bleiben unberührt:`,energyDeviceRow:`Gerät`,setLook:`Darstellung`,setLookHint:`Über einen Look fahren für die Vorschau, antippen zum Übernehmen.`,sidebarTitle:`Name in der Seitenleiste`,sidebarTitleHint:`Leer lassen für „E3DC Maestro Cockpit“. Gilt für alle Nutzer. Nur Administratoren können ändern.`,themeDark:`Dunkel`,themeDarkHint:`Ruhig am Abend. Die Energieflüsse leuchten auf dunklem Grund.`,themeClassic:`Classic`,themeClassicHint:`Hell und klar, angenehm zum Lesen am Tag.`,themeE3dc:`myE3DC`,themeE3dcHint:`Der vertraute myE3DC-Look.`,themeOled:`OLED`,themeOledHint:`Echtes Schwarz, flach und sparsam – für Wandtablets und Nacht.`,themeAmber:`Solar Amber`,themeAmberHint:`Warmes Abendlicht. Bernstein und Orange statt Cyan.`,themeLeitstand:`Leitstand`,themeLeitstandHint:`Scharf, monospaced, Ampelfarben – wie ein Industrie-Monitor.`,themeTibber:`Tibber Night`,themeTibberHint:`Dunkles Blau-Violett mit Tibber-Türkis für dynamische Tarife.`,themePreviewHint:`Vorschau — noch nicht gespeichert`,themeToggleToLight:`Heller Look (myE3DC)`,themeToggleToDark:`Dunkler Look`,lookMotion:`Bewegung`,lookMotionHint:`Partikel und Blob-Puls im Energiefluss.`,lookDensity:`Dichte`,lookDensityHint:`Abstände und Kartenpadding für Handy oder Wandtablet.`,lookDensityCompact:`Kompakt`,lookDensityNormal:`Normal`,lookDensityAiry:`Luftig`,lookCorners:`Ecken`,lookCornersHint:`Wie rund Karten und Knöpfe sind. „Theme“ behält die Vorgaben des Looks.`,lookCornersAuto:`Theme`,lookCornersSoft:`Weich`,lookCornersMedium:`Mittel`,lookCornersSharp:`Eckig`,plantEmpty:`Keine Daten der E3DC-Integration. Sobald E3DC RSCP eingerichtet ist, stehen hier Betriebszustand, Speicher und Phasen.`,plantOperation:`Betrieb`,plantStorage:`Speicher`,plantPhases:`Phasen`,plantWallbox:`Wallbox`,plantRoomGrid:`Netz`,plantRoomGridHint:`Haus- und Netzphasen, zusätzlicher Verbrauch.`,plantRoomBattery:`Akku`,plantRoomBatteryHint:`Packs, Zellzustand und Ladegrenzen.`,plantRoomPv:`PV`,plantRoomPvHint:`Wechselrichter, Leistung und Einspeisegrenze.`,plantRoomWallbox:`Wallbox`,plantRoomWallboxHint:`Ladestatus und schaltbare Wallbox-Einstellungen.`,plantRoomControls:`Einstellungen`,plantRoomControlsHint:`Werte, die der E3DC über RSCP annimmt.`,plantCells:`Zellzustand`,plantCell:`Modul`,plantSend:`Diese Einstellung an den E3DC senden?`,plantModel:`Modell`,plantSerial:`Seriennummer`,plantFirmware:`Firmware`,plantFault:`Aktuelle Meldung`,plantPack:`Speicher`,plantMode:`Modus`,plantAutarky:`Autarkie`,plantSelf:`Eigenverbrauch`,plantPower:`Sollleistung`,plantLimits:`Leistungsgrenzen`,plantLimitCharge:`Max. Ladung`,plantLimitDischarge:`Max. Entladung`,plantLimitMin:`Mindestentladung`,plantManual:`Manuelle Netzladung`,plantManualEnergy:`Dabei geladen`,plantDerated:`PV abgeregelt`,plantEmergency:`Notstrom`,plantReserveHit:`Notstromreserve erreicht`,plantReserveOn:`Notstromreserve`,plantWeather:`Wetterregelung`,plantWeatherWait:`Warten auf Wetterdurchbruch`,plantOn:`an`,plantOff:`aus`,plantMode0:`Normal`,plantMode1:`Leerlauf`,plantMode2:`Entladen`,plantMode3:`Laden`,plantMode4:`Netzladung`,plantSoh:`State of Health`,plantCycles:`Zyklen`,plantEnergy:`Nutzbare Restenergie`,plantShare:`Anteil an der Anlagenkapazität`,plantCurrent:`Strom`,plantVoltage:`Spannung`,plantTemp:`Zelltemperatur`,plantHouse:`Haus`,plantGrid:`Netz`,plantInverter:`Wechselrichter`,plantPeak:`Installierte PV-Leistung`,plantCapacity:`Batteriekapazität`,plantAc:`Max. AC-Leistung`,plantSysCharge:`Max. Systemladung`,plantSysDischarge:`Max. Systementladung`,plantDeratePct:`Einspeisegrenze`,plantDeratePower:`Einspeisegrenze Leistung`,plantExtraPv:`Zusätzliche Erzeugung`,plantExtraUse:`Zusätzlicher Verbrauch`,plantPlug:`Stecker`,plantCharging:`Laden`,plantPhaseCount:`Phasen`,plantSun:`Solaranteil`,plantNet:`Netzanteil`,plantCarSoc:`Fahrzeug-SoC`,plantMaxCurrent:`Max. Ladestrom`,secSources:`Quellen`,secSourcesHint:`Sensoren für SoC, Leistung und Tageszähler. Ein Wechsel lädt die Integration neu.`,secAdaptive:`Adaptive Reserve`,secAdaptiveHint:`Wie weit Maestro zurückschaut und wie hoch die Reserve steigen darf.`,secPriceSensor:`Preis-Sensor`,secPriceSensorHint:`Aktueller Bezugspreis (Tibber/aWATTar). Ohne Sensor rechnet ein dynamischer Preisplan nicht.`,secEnergyforecast:`Energyforecast`,secEnergyforecastHint:`Optional: API-Token von energyforecast.de verlängert die Preiskurve hinter dem letzten echten Tibber-/aWATTar-Preis. Freier Plan ≈ 2 Tage, Pro ≈ 6. Marktzone wählen (meist DE-LU). Netzentgelte und MwSt. im Energyforecast-Profil wie bei deinem Tarif setzen – Maestro nutzt total_ct_kwh. Leer = aus. Prognose-Slots erscheinen im Preisplan blasser.`,legendForecast:`Preisprognose`,planProviderUntil:`Echte Preise bis`,planForecastUntil:`Prognose bis`,secSlots:`Tarif-Slots`,secSlotsHint:`Wiederkehrende Fenster. Montag ist der erste Tag.`,secForecastSensors:`Prognose-Sensoren`,secForecastSensorsHint:`Rest heute, Tagessumme, morgen und übermorgen.`,secWallboxWire:`Wallbox-Anbindung`,secWallboxWireHint:`Leistung braucht einen Neustart der Integration. SoC und Stecker nur Anzeige — ohne Neustart.`,secEvccWire:`EVCC`,secEvccWireHint:`Welche Entität das Laden meldet und welcher Wert Sofortladen heißt.`,secHpWire:`Wärmepumpe`,secHpWireHint:`Schalter, Dienste und das Zeitfenster, in dem sie laufen darf.`,secSizingInputs:`Zähler`,secSizingInputsHint:`Energiezähler und der Zeitraum der Rechnung. Ein Sensorwechsel lädt die Integration neu.`,setSizingTile:`Mehr Akku oder PV?`,setSizingTileHint:`Was sich an Zubau rechnet`,setSetup:`Einrichtung`,setSetupHint:`Was die Regelung zum Arbeiten braucht`,setupTitle:`Erste Schritte`,setupLead:`Diese Punkte braucht Maestro, damit die Regelung dein Haus steuert.`,setupProgress:`{done} von {total} Pflichtschritten erledigt`,setupDone:`Einrichtung vollständig`,setupDoneHint:`Alle Pflichtschritte sind erledigt. Die Liste bleibt unter Einstellungen.`,setupAck:`Verstanden`,setupOpen:`Öffnen`,setupStatusDone:`erledigt`,setupStatusTodo:`fehlt`,setupStatusOptional:`optional`,setupStatusWait:`wird gelesen`,setupOptionsError:`Die Einstellungen konnten nicht gelesen werden: {err}`,setupPlant:`Anlage verbunden`,setupPlantHint:`SoC, PV, Netz, Haus und Akku brauchen je einen Sensor, der Werte liefert.`,setupPlantOk:`Alle Pflichsensoren liefern Werte.`,setupPlantMissing:`Noch ohne Wert: {names}.`,setupTariff:`Tarif`,setupTariffHint:`Fester Preis, Preis-Sensor oder Zeitfenster. Ohne Preis kann Maestro nicht nach Preis laden.`,setupTariffOk:`Ein Preis oder Zeitfenster ist hinterlegt.`,setupTariffMissing:`Beim dynamischen Tarif fehlt der Preis-Sensor, beim festen der Bezugspreis.`,setupForecast:`PV-Prognose`,setupForecastHint:`Empfohlen, damit Maestro das Laden an den erwarteten Ertrag anpasst.`,setupForecastOk:`Ein Prognose-Sensor ist gewählt.`,setupForecastOpen:`Noch keiner gewählt. Die Regelung läuft auch ohne, nur ohne Vorausschau.`,setupSafety:`Notstromreserve`,setupSafetyHint:`Kein Muss. Sinnvoll, damit der Akku eine Reserve behält.`,setupSafetyOk:`Eine Reserve ist eingeschaltet.`,setupSafetyOpen:`Noch keine Reserve aktiv. Fest, saisonal oder adaptiv stellst du unter Sicherheit ein.`,setupLoads:`Verbraucher`,setupLoadsHint:`Optional, wenn Maestro Wallbox, Wärmepumpe oder EVCC mitregeln soll.`,setupLoadsOk:`Mindestens ein Verbraucher ist angebunden.`,setupLoadsOpen:`Keiner angebunden. Nur nötig, wenn Maestro einen Verbraucher steuern soll.`,setupRegulation:`Regelung einschalten`,setupRegulationHint:`Solange sie aus ist, beobachtet Maestro nur und schickt keine Limits.`,setupRegulationOk:`Maestro regelt.`,setupRegulationOff:`Die Regelung ist aus.`,setupRun:`Erste Entscheidung`,setupRunHint:`Maestro hat mindestens einmal gerechnet und sagt, warum.`,setupRunOk:`Es gibt eine Entscheidung.`,setupRunOff:`Schalte die Regelung ein. Danach erscheint hier die Entscheidung.`,setupRunWait:`Die Regelung ist an. Die erste Entscheidung kommt mit dem nächsten Lauf.`,setSizing:`Lohnt sich der Zubau?`,setSizingHint:`Wie viel Zubau sich mit deinem Verbrauch rechnet`,sizingLead:`Hier prüfst du, ob ein größerer Akku oder mehr PV sich für dein Haus lohnt. Du gibst an, wie viel du dazubauen willst. Maestro rechnet aus deinem bisherigen Verbrauch, was das an Autarkie, Kosten und Amortisation ändert.`,sizingAdd:`Dein Zubau`,sizingAddHint:`Zusätzlicher Akku in kWh und zusätzliche PV in kWp, auf dem, was schon steht. 0 heißt: nichts dazukaufen.`,sizingRun:`Aus deiner Historie rechnen`,sizingScenario:`Für diesen Zubau`,sizingNeedRun:`Stell den Zubau ein und starte die Rechnung. Danach steht hier, was er bringt.`,sizingChartAvoided:`Vermiedener Netzbezug`,sizingChartBaseline:`Bisheriger Netzbezug`,sizingChartCaption:`Fläche: vermiedener Netzbezug. Linie: bisheriger Netzbezug.`,sizingStory:`{bat} kWh Akku und {pv} kWp PV: etwa {aut} % Autarkie, {save} € im Jahr, amortisiert in {years} Jahren.`,sizingStoryOpen:`{bat} kWh Akku und {pv} kWp PV: etwa {aut} % Autarkie und {save} € im Jahr. Eine Amortisation lässt sich daraus nicht ableiten.`,sizingBasis:`Grundlagen`,sizingBasisHint:`Preise, mit denen Investition und Amortisation gerechnet werden.`,sizingRecsHint:`Wirtschaftlich sucht die kürzeste Amortisation, technisch die höchste Autarkie, ausgewogen den Kompromiss.`,sizingRecs:`Drei Vorschläge`,recEconomicHint:`Kürzeste Amortisation`,recTechnicalHint:`Höchste Autarkie`,recBalancedHint:`Kompromiss aus beidem`,sizingBattery:`Akku`,sizingPv:`PV-Zubau`,sizingAutarky:`Autarkie`,sizingAvoided:`Vermiedener Netzbezug`,sizingSavings:`Ersparnis im Jahr`,sizingInvestment:`Investition`,sizingPayback:`Amortisation`,sizingInverter:`Wechselrichter-Upgrade`,sizingBaseline:`Netzbezug heute hochgerechnet`,sizingNotRun:`Noch nicht gerechnet`,sizingRunning:`Rechnet …`,sizingReady:`Fertig`,recEconomic:`Wirtschaftlich`,recTechnical:`Technisch`,recBalanced:`Ausgewogen`,matrixDays:`Analysetage`,matrixRecords:`Stundenwerte`,matrixAnomaly:`Anomalien`,optReload:`Gespeichert. Die Integration lädt neu, damit die neuen Sensoren gelten.`,optSaved:`Gespeichert. Der Wert gilt sofort.`,optAdmin:`Nur Admins können diese Werte ändern.`,optClear:`Leeren`,optSearch:`Entität suchen`,optService:`Dienst, zum Beispiel switch.turn_on`,optTarget:`Ziel-Entität`,optWeekdays:`Wochentage`,optFrom:`Von`,optTo:`Bis`,optClass:`Klasse`,optReserve:`Mindest-Reserve %`,optAddSlot:`Slot hinzufügen`,optRemove:`Entfernen`,optSaveSlots:`Slots speichern`,optYes:`Ja`,optNo:`Nein`,classHigh:`Hoch`,classLow:`Niedrig`,classNormal:`Normal`,wd0:`Mo`,wd1:`Di`,wd2:`Mi`,wd3:`Do`,wd4:`Fr`,wd5:`Sa`,wd6:`So`,targetPower:`Ziel-Ladeleistung`,autoObjective:`Ziel`,autoLastRun:`Letzter Lauf`,autoFallback:`Daten-Fallback`,autoReason:`Grund`,autoOverrides:`Anpassungen`,autoNone:`Keine Anpassung. Die bisherige Einstellung war bereits die beste.`,autoGrid:`Raster`,autoDeltaDraw:`Netzbezug gegenüber Basis`,autoDeltaFeed:`Einspeisung gegenüber Basis`,autoDeltaCurtail:`Abregelung gegenüber Basis`,autoDeltaSelf:`Autarkie gegenüber Basis`,...Ba},Ua={navLive:`Live`,navForecast:`Forecast`,navPlan:`Price plan`,navDecision:`Decision`,navSettings:`Settings`,navPlant:`System`,settingHelp:`Help`,navControls:`Controls`,menu:`Menu`,subLive:`Energy flow and battery in real time`,factRest:`PV forecast remaining today`,factTomorrow:`Tomorrow`,factDayAfter:`Day after`,subForecast:`Strategy preview: power, SoC, and price-plan actions`,subPlan:`Grid charging by dynamic tariff`,subDecision:`Why Maestro regulates the way it does`,subSettings:`From the plant through safety and tariff to PV charging`,subPlant:`Operating state, storage and phases from the E3DC`,regulationOn:`Regulation active`,regulationOff:`Regulation off`,pauseTitle:`How long off?`,pauseHint:`Maestro stays off for this long and turns itself back on. The countdown survives a restart.`,pauseOffTitle:`Regulation`,pauseOffHint:`Turn it back on, or leave it off for a fixed time.`,pauseResume:`Turn back on`,pauseOneHour:`1 hour`,pauseHours:`{h} hours`,pausePermanent:`Until turned on`,pauseLeftHours:`{h} h {m} min left`,pauseLeftHour:`{h} h left`,pauseLeftMin:`{m} min left`,flowTitle:`Energy flow`,flowSub:`Now · live`,flowDay:`Today`,flowDaySeparate:`Separate`,flowDayImport:`Import`,flowDayFeed:`Feed-in`,flowDayOpen:`Open today`,flowStyleLabel:`Energy flow layout`,flowOpts:`Layout`,flowOptsTitle:`Energy flow layout`,flowOptsSub:`Choose the view, arrange consumers, or edit them`,flowOptsConsumers:`Consumers`,flowStyleTitle:`Energy flow`,flowStyleHint:`Nodes, blob or house. The choice applies only in this browser.`,flowStyleNodes:`Nodes`,flowStyleNodesHint:`PV, grid, house and battery around the hub. With separately metered loads, a consumption node appears.`,flowStyleBlob:`Blob`,flowStyleBlobHint:`A soft shape toward the strongest source or sink. With separately metered loads, Verbrauch → House appears.`,flowStyleCity:`House`,flowStyleCityHint:`Modern house with PV canopy. With separately metered loads, Verbrauch → House appears.`,nodeLoad:`Load`,flowCityLoad:`Load`,arrangeConsumers:`Arrange`,arrangeDone:`Done`,arrangeHint:`Drag consumers freely to place them.`,arrangeReset:`Reset`,nodePv:`PV`,nodePvMain:`Main`,nodePvExtra:`Extra PV`,nodeHouse:`House`,nodeImport:`Grid import`,nodeFeed:`Feed-in`,nodeBatDischarge:`Battery discharging`,nodeBatCharge:`Battery charging`,battery:`Battery`,batteryPlantDetails:`Battery details`,gridPlantDetails:`Grid details`,pvPlantDetails:`PV details`,batteryStyleLabel:`Battery layout`,batteryStyleRing:`Ring`,batteryStylePack:`Pack`,stateOfCharge:`State of charge`,targetSoc:`Target SoC`,autonomy:`Autonomy`,forecastPeak:`Next SoC peak`,forecastPeakToday:`Peak today {v}`,forecastPeakTomorrow:`Peak tomorrow {v}`,forecastNoPeak:`no rise in 48 h`,forecastFloor:`Reserve floor {v}`,forecastFloorReach:`Floor reached {v}`,forecastEmpty:`Empty {v}`,forecastGrid:`Grid import from {v}`,forecastGridUntil:`Grid import until {v}`,forecastGridOngoing:`Grid import ongoing`,forecastNoGrid:`no grid import`,autonomyHint:`at current load`,discharging:`Discharging`,charging:`Charging`,chipReachable:`E3DC reachable`,chipUnreachable:`E3DC unreachable`,chipChargeLock:`Charge lock`,chipDischargeLock:`Discharge lock`,chipHt:`HT protection`,chipCurtail:`Curtailment guard`,chipEmergency:`Emergency charge`,chipFeedIn:`Feed-in curtailment`,chipGridCharge:`Grid charge`,chipReserveCharge:`Backup-reserve grid charge`,chipBatteryPriority:`Battery priority`,chipLowYield:`Low-yield day`,chipPredictive:`Predictive charging`,chipShadow:`Price plan · shadow`,modePredictive:`Looking ahead`,modeShadow:`Price plan in shadow`,groupToday:`Today`,groupWeek:`Week`,groupMonth:`Month`,groupYear:`Year`,groupNet:`net`,periodToday:`Today`,periodWeek:`Week`,periodMonth:`Month`,periodYear:`Year`,calGrainDay:`Day`,calGrainWeek:`Week`,calGrainMonth:`Month`,calGrainYear:`Year`,forceTitle:`Forced discharge`,fixedReserve:`Emergency reserve`,controlsPair:`Discharge & reserve`,batteryCtrl:`Control battery`,batteryCtrlTitle:`Battery controls`,batteryCtrlSub:`Discharge, reserve and auto strategy`,batteryCtrlIdle:`Discharge · Reserve · Auto`,controlsForceOn:`Forced discharge {v}`,controlsForceOff:`Forced discharge off`,controlsReserveOn:`Emergency reserve {v}%`,controlsReserveOff:`Emergency reserve off`,ctrlReserveSoc:`{v}%`,exportCsv:`CSV`,actionsTitle:`Actions`,btnClear:`Release limits`,btnClearSub:`Clears charge and discharge limits immediately and sets the inverter to normal.`,btnCharge:`Manual charge (3 kWh)`,confirmCharge:`Charge 3 kWh from the grid?`,selWallbox:`Wallbox type`,selMorning:`Pre-discharge`,selAuto:`Auto objective`,selTariff:`Tariff`,debugTitle:`Debug log`,debugEmpty:`No debug lines yet. The switch starts logging.`,debugSwitch:`Debug logging`,balanceTitle:`Daily balance`,balanceWeek:`Weekly balance`,balanceMonth:`Monthly balance`,balanceYear:`Yearly balance`,pulseTitle:`Balance pulse`,pulseDaily:`Daily balance`,pulseMonthly:`Monthly balance`,pulseCumulative:`Running total`,pulseDailyAxis:`€ / day`,pulseMonthlyAxis:`€ / month`,pulseSumAxis:`Total €`,pulseEmpty:`No daily balances in the recorder.`,pulseClickDay:`Tap to select that day in the balance.`,pulseClickMonth:`Tap to select that month in the balance.`,dayPrev:`Back`,dayNext:`Forward`,dayPick:`Choose period`,dayNav:`Period`,rangeEmpty:`No recorder statistics for this period.`,whenToday:`today`,whenWeek:`this week`,whenMonth:`this month`,whenYear:`this year`,kpiCostGross:`Electricity cost`,kpiCostGrossSub:`grid import, gross`,kpiRevenue:`Feed-in revenue`,kpiRevenueSub:`remuneration {when}`,kpiWear:`Battery wear`,kpiWearSub:`share of cycle cost`,kpiBalance:`Energy balance`,kpiBalanceSub:`revenue + savings − cost − wear`,kpiGridBat:`Grid → battery`,kpiGridBatSub:`charged from the grid`,kpiGridBatWarn:`Grid charge without justification`,kpiGridBatReserve:`due to backup reserve`,kpiGridBatEmergency:`due to emergency charge`,kpiGridBatJustified:`justified grid charge`,kpiWallbox:`Wallbox {when}`,kpiWallboxSub:`energy charged`,kpiFeedLimit:`Feed-in limit`,kpiFeedLimitSub:`{n} interventions · {dc} kWh DC curtailment`,kpiCost:`Electricity cost {when}`,kpiCostSub:`net of feed-in`,kpiSaving:`PV savings {when}`,kpiSavingSub:`vs. grid-only supply`,kpiSimDynamic:`Simulation dynamic {v} €`,kpiSimCostlier:`{v} € more expensive`,kpiSimCheaper:`{v} € cheaper`,kpiSimMoreSaving:`{v} € more savings`,kpiSimLessSaving:`{v} € less savings`,kpiSimPending:`Compare from midnight`,kpiSelf:`Self-consumption {when}`,kpiSelfSub:`Import {imp} kWh · feed-in {feed} kWh`,kpiBattery:`Battery {when}`,kpiBatterySub:`charged · {out} kWh discharged`,chartTitle:`SoC trajectory & power · next 48 h`,chartTitleStrategy:`Strategy preview · plan SoC, phases & power`,legendSoc:`SoC`,legendSocExpected:`Expected SoC`,legendPv:`PV`,legendHouse:`House`,legendImport:`Import`,legendImportShadow:`Import · shadow`,legendFeed:`Feed-in`,legendActual:`Actual`,legendPlanSocShadow:`Planned SoC · shadow`,legendToggleHint:`Show or hide series`,strategyStrip:`Price-plan intervention`,actualOverlay:`Actuals`,now:`Now`,targetLabel:`Target SoC {v}%`,hoursShort:`{h} h`,statMinMax:`SoC min / max`,statImport:`Grid import`,statFeed:`Feed-in`,statAutarky:`Self-sufficiency`,statPvTomorrow:`PV tomorrow`,statP10:`PV remaining (P10)`,statDeficit:`Deficit tomorrow`,statYield:`PV day`,statYieldSub:`{today} / {ref} kWh reference`,qualityLabel:`Data quality`,qualityOk:`complete`,qualityPv:`PV profile missing`,qualityConsumption:`Consumption profile missing`,qualityBoth:`Profiles missing`,qualityUnknown:`unknown`,reserveTitle:`Target SoC`,reserveSeasonal:`Emergency reserve`,reserveAdaptive:`Reserve, adaptive`,reserveHt:`HT reserve`,reserveForward:`Look-ahead`,windowsTitle:`Charge window`,windowAstro:`Astro start`,windowSeasonalEnd:`Season end`,windowPvDelay:`PV delay`,windowTomorrow:`Tomorrow`,autoTitle:`Auto strategy`,autoSaving:`Estimated saving`,autoOff:`Off`,autoOn:`{goal} · {eur}`,autoPending:`{goal} · no run yet`,autoData:`{goal} · not enough history`,autoCap:`Morning cap on, up to {soc} %, until {hour}.`,autoLiveHint:`Auto only adjusts the morning cap. The amount is the forecast saving over the next 24 hours versus your own setting, not money already saved.`,alertUnreachable:`E3DC is not reachable`,alertChargeLock:`Charge lock active`,alertDischargeLock:`Discharge lock active`,alertUnjustified:`Grid charge without justification`,alertReserveCharge:`Grid charge due to backup reserve`,alertEmergencyCharge:`Grid charge due to emergency charge`,alertDismiss:`Got it`,alertBannerShow:`Alert banner`,alertBannerShowHint:`Short notes at the top. The same info appears as chips under the energy flow.`,noForecast:`No forecast yet. Maestro needs at least 7 days of history.`,priceTitle:`Electricity price & planned SoC`,legendCharge:`Grid charge`,legendHold:`Hold battery`,legendRelease:`No plan intervention`,legendPlanSoc:`Planned SoC`,planShadow:`Shadow mode · not controlling`,planShadowMenuHint:`Shadow mode display`,planShadowHide:`Hide shadow mode`,planShadowShow:`Show shadow mode`,planActive:`Active · controls the battery`,planTitle:`Plan`,planStrategy:`Grid charging`,planGridCharge:`Planned grid charging`,planSaving:`Expected saving`,planCheapest:`Cheapest slot`,planMostExpensive:`Most expensive slot`,planKnownUntil:`Prices known until`,planDiag:`Inputs`,planFloor:`Floor`,planCeiling:`Ceiling`,planEfficiency:`Efficiency`,planMinSpread:`Minimum spread`,planWear:`Wear`,planSafety:`Consumption safety factor`,noPlan:`There is no price plan. It needs a dynamic tariff.`,noPlanOff:`With strategy “Off” there is no price-plan chart. Maestro does not charge the battery from the grid.`,noPlanSlots:`With time windows (HT/NT) there is no price-plan chart. Charge times come from tariff slots of class “Low”.`,noPlanThreshold:`With “below price threshold” there is no price-plan chart. Maestro charges while the price is under the threshold — those times are not shown as a plan curve.`,planComputing:`Computing the price plan…`,noPlanPrices:`No price plan: there is no valid price curve. Check the price sensor.`,noPlanProfile:`No price plan: consumption statistics are not ready yet.`,noPlanRoom:`No price plan: there is no room between charge threshold/reserve and the target SoC.`,planTune:`Grid charging`,planTuneHint:`The same settings as under Settings › Grid and tariff.`,slotPrice:`Price`,slotSoc:`SoC`,slotConsumption:`Consumption`,slotCharge:`Grid charge {kwh} kWh`,slotHold:`Hold battery`,slotRelease:`No plan intervention`,decisionPhase:`Current control phase`,tagTargetSoc:`Target SoC {v} %`,tagTargetPower:`Target charge power {v}`,tagBatteryPriority:`Battery priority`,tagSince:`since {t}`,limitsTitle:`Limits · target vs. sent`,limitsSub:`What Maestro wants and what reaches the E3DC`,limitCharge:`Charge limit`,limitDischarge:`Discharge limit`,limitTarget:`Target {a} · sent {b}`,limitNone:`no limit`,entitiesMissing:`Not available: {list}. These Maestro entities are missing or disabled – please check Settings › Entities.`,entityDisabled:`disabled`,notSetUp:`E3DC Maestro is not set up or has not started yet.`,limitSoc:`now {a} % → {b} %`,timelineTitle:`Decision history`,timelineEmpty:`No decisions recorded yet.`,ganttTitle:`Phases of the last 24 hours`,ganttHint:`Color = active control phase`,noDecision:`No decision available yet.`,controlsTitle:`Quick controls`,controlsSub:`Takes effect immediately`,close:`Close`,historySub:`Last 24 hours`,historyEmpty:`No history for the last 24 hours.`,historyFailed:`The history could not be loaded.`,ctrlActive:`Regulation active`,ctrlActiveSub:`Maestro controls charge and discharge limits`,ctrlPredictive:`Predictive charging`,ctrlPredictiveSub:`Charge target from forecast and consumption`,ctrlPvDelay:`PV forecast delay`,ctrlPvDelaySub:`Postpone charging when PV is enough`,ctrlPlanControls:`Price plan controls battery`,ctrlPlanControlsSub:`Off = shadow mode only`,ctrlPlanShadow:`Price plan shadow mode`,ctrlPlanShadowSub:`Compute the plan but send nothing`,ctrlForce:`Forced discharge`,ctrlForcePower:`Power {v}`,allSettings:`Open all settings →`,displayTitle:`Display`,consumersSub:`Consumers in the live energy flow. Applies on every device that opens this cockpit.`,addConsumer:`Add consumer`,consumerSearch:`Search power sensors`,consumerName:`Name in the energy flow`,consumerIcon:`Icon`,iconWallbox:`Wallbox`,iconHeater:`Heating rod`,iconClimate:`Air conditioning`,iconHeatpump:`Heat pump`,iconMeter:`Power meter`,modeIncluded:`In house load`,modeSeparate:`Measured separately`,useWallbox:`Add wallbox`,removeConsumer:`Remove`,editConsumers:`Edit consumers`,consumersEmpty:`No consumers yet. Add a wallbox, heat pump or other loads here.`,consumersOverflow:`Included consumers exceed the house load. Check whether they are really part of the house meter.`,noPowerSensors:`No matching power sensors found.`,consumerMissing:`Sensor unavailable`,unavailable:`unavailable`,callFailed:`Action failed: {err}`,chartError:`Chart failed to load: {err}`,loading:`Loading …`,demoHint:`No data`,setHardware:`System`,setHardwareHint:`Plant data Maestro uses to calculate power and limits.`,setCorridor:`Target SoC and charge corridor`,setCorridorHint:`Where the battery should be today: threshold, corridor, charge end and hard caps.`,setWindows:`Look-ahead and time windows`,setWindowsHint:`When to charge: forecast, sun, morning cap and spreading across the day.`,setYield:`Low PV and curtailment`,setYieldHint:`Fill the battery before feed-in, catch curtailment and top up late.`,setTariff:`Grid and tariff`,setTariffHint:`Grid charging, high tariff, prices and tariff slots.`,setReserve:`High tariff and reserve`,setReserveHint:`HT window and emergency reserve. Adaptive-reserve lookback stays in the integration options.`,setFlex:`Wallbox, heat pump, pre-discharge`,setFlexHint:`Extra loads and the morning discharge before charging starts.`,setControl:`Control behaviour`,setControlHint:`Master switch, forced discharge and how calmly the control follows.`,setDiag:`Diagnostics and actions`,setDiagHint:`Debug log and one-off actions.`,setPlant:`Plant`,setPlantHint:`Inverter, PV size and the limits Maestro calculates with.`,setSafety:`Protection`,setSafetyHint:`Emergency charge, backup reserve, battery cap and watchdog.`,setPv:`PV charging`,setPvHint:`Daily target and time window. Charge power and special cases sit below.`,setLoads:`Loads`,setLoadsHint:`Wallbox, EVCC, heat pump and the morning discharge before charging starts.`,setAuto:`Automation`,setAutoHint:`Once a day Maestro looks for a better morning-cap and gentle-charge setting.`,setSystem:`System`,setSystemHint:`Master switch, forced discharge, control pace and diagnostics.`,secPlantPower:`Power and limits`,secPlantPowerHint:`Nameplate values of the plant.`,secEmergency:`Emergency charge`,secEmergencyHint:`Below this threshold Maestro charges from the grid at once. 0 turns emergency charging off.`,secReserve:`Backup reserve`,secReserveHint:`A fixed reserve replaces the seasonal and the adaptive one.`,secHard:`Battery cap`,secHardHint:`Charging stops above this SoC. Curtailment protection may override the cap.`,secWatchdog:`Watchdog`,secWatchdogHint:`After this long without contact Maestro releases the limits.`,secStrategy:`Grid charging`,secStrategyHint:`Whether and how Maestro charges the battery from the grid. The strategy sets every switch it needs.`,secLimits:`Limits`,secLimitsHint:`How much and up to which charge level the battery charges from the grid.`,secPlanTune:`Price plan fine-tuning`,secPlanTuneHint:`Only for “Dynamic: expert”. “Automatic” uses fixed values.`,secCosts:`Costs & statistics`,secCostsHint:`These values do not decide when to charge. They feed cost, revenue and wear in the statistics. The price plan also uses the feed-in price, and in expert mode the wear.`,secSwitches:`Individual switches`,secSwitchesHint:`The switches behind the strategy. Changing one of them also changes the strategy shown.`,expertView:`Expert view`,expertViewHint:`Shows extra options and the individual switches. Applies to this browser only.`,sumOff:`Maestro never charges the battery from the grid, only from PV.`,sumSlots:`Maestro charges from the grid in time windows of class “Low”, up to {soc} %. Add the windows below under tariff slots.`,sumSlotsNone:`There is no time window of class “Low” yet. Without one, Maestro does not charge from the grid.`,sumThreshold:`Maestro charges from the grid while the price is at most {price} €/kWh, up to {soc} %.`,sumCap:`Safety cap: grid charging stops after {kwh} kWh in one day.`,sumPlan:`Maestro picks the cheapest hours from the price curve. It uses the consumption and PV forecast and charges only what is missing until the next cheap phase, up to {soc} %.`,sumAuto:`Efficiency, minimum spread and safety factor are fixed. Battery wear does not count.`,sumExpert:`The plan uses your values for efficiency, minimum spread, safety factor and battery wear.`,sumShadow:`Shadow mode: the plan is only computed and shown. Turn on “Price plan controls battery” to let it control the battery.`,sumActive:`The plan controls the battery.`,sumNoPrice:`No price sensor is set. Without prices this strategy does not charge.`,selStrategy:`Grid charging`,secHt:`High tariff`,secHtHint:`During the high-tariff window Maestro keeps a minimum reserve.`,secCorridor:`Daily target`,secCorridorHint:`State of charge by the end of charging. The later target applies only while its switch is on.`,secWindows:`Time window`,secWindowsHint:`With astro, start and end follow the sun. Otherwise the winter and summer end times are fixed.`,secShape:`Charge power`,secShapeHint:`How hard the battery is charged. Grey values apply only while their switch is on. The corridor is a power in watts.`,secYield:`When the day runs differently`,secYieldHint:`Forecast, a weak day and curtailment. Thresholds and references sit in the expert view.`,sumTarget:`Up to {soc} % by the end of charging.`,sumTargetLate:`Up to {soc} % by the end of charging, then {late} % from {hour}.`,sumWindowAstro:`Charging starts {start} h after sunrise and ends {end} h before sunset.`,sumWindowHours:`Charging ends at {winter} in winter and at {summer} in summer.`,sumWindowCap:`Mornings stay at {soc} % until {hour}.`,sumPowerAuto:`Automatic: power follows the path to the daily target.`,sumPowerFloor:`Full power below {soc} %.`,sumPowerSpread:`Spread up to {soc} %.`,sumPowerGentle:`Limited to factor {factor}.`,sumPowerCorridor:`Corridor {low}–{high} W.`,sumPowerPause:`Pause below {low} W.`,sumPvNone:`No special rule. The daily target applies.`,sumPvForecast:`The forecast may delay charging.`,sumPvForward:`Look-ahead up to {soc} %.`,sumPvLow:`Weak days charge earlier.`,sumPvCurtail:`Curtailment is caught.`,secWallbox:`Wallbox`,secWallboxHint:`Surplus charging and grid protection while the car draws power.`,secEvcc:`EVCC`,secEvccHint:`Blocks battery discharge while the car charges immediately.`,secHp:`Heat pump`,secHpHint:`Surplus and price limit.`,secMorning:`Morning discharge`,secMorningHint:`Lower the battery before charging starts so PV surplus fits.`,secAuto:`Objective`,secAutoHint:`The chosen strategy is shown on the decision screen.`,secRun:`Operation`,secRunHint:`The same switches are in the quick menu.`,secPace:`Pace`,secPaceHint:`How often the control runs and how far charge power may step each cycle.`,secDiag:`Diagnostics`,secDiagHint:`Debug log and one-off actions.`,ladderTitle:`Control ladder`,ladderHint:`Maestro checks from top to bottom and takes the first matching rule. The active rule is marked.`,showInLadder:`Show in the control ladder`,ladderBandSafety:`Safety`,ladderBandTariff:`Grid and tariff`,ladderBandBlocks:`Charge blocks`,ladderBandPv:`PV charging`,ladderBandRest:`After that`,ladderOff:`Control off`,ladderForce:`Forced discharge`,ladderEmergency:`Emergency charge`,ladderFeed:`Feed-in limit`,ladderReserve:`Backup reserve`,ladderEvcc:`EVCC immediate charge`,ladderPrice:`Price plan`,ladderHt:`High tariff`,ladderHold:`Hold the cheap slot`,ladderMorning:`Morning discharge`,ladderCap:`Morning cap`,ladderAstro:`Wait for the sun`,ladderHard:`Battery cap`,ladderFloor:`Fast-charge floor`,ladderLow:`Weak PV day`,ladderGrid:`Grid charge in the slot`,ladderCorridor:`Corridor and PV delay`,ladderSpread:`Spreading`,ladderCurtail:`Curtailment guard`,ladderIdle:`Idle`,confirmReset:`Reset today's statistics to 0?`,settingsPending:`Loading settings …`,settingsSearch:`Search settings…`,settingsSearchEmpty:`Nothing found. Try another word.`,settingsBack:`All areas`,setClassic:`Classic dashboard`,setClassicHint:`Add it with one click`,classicLead:`The classic dashboard is the Lovelace view with every tab, including auto-optimisation, sizing advisor and help. Maestro creates it right here.`,classicDepsTitle:`Required cards`,classicDepMushroom:`Mushroom Cards`,classicDepApex:`ApexCharts Card`,classicDepVia:`HACS → Frontend`,classicInstalled:`installed`,classicMissing:`missing – install via HACS → Frontend`,classicDepsMissing:`Without these cards the dashboard shows error tiles. Install them first, then reload the browser.`,classicActionTitle:`Dashboard`,classicChecking:`Checking whether the dashboard already exists …`,classicCreate:`Create dashboard`,classicSetup:`Set up content`,classicCreating:`Creating …`,classicReady:`The E3DC Maestro dashboard exists and is in the sidebar.`,classicEmpty:`There is an empty dashboard at the path e3dc-maestro. Maestro sets up its content there.`,classicForeign:`A dashboard with other content already uses the path e3dc-maestro. Maestro does not overwrite it. To start over, delete it under Settings → Dashboards.`,classicAdminOnly:`Only administrators can create it.`,classicFailed:`That did not work: {err}`,classicRetry:`Check again`,classicManual:`Add it manually`,classicHa:`The Community dashboards entry appears from Home Assistant 2026.5. On older versions, create an empty dashboard (title E3DC Maestro, path e3dc-maestro) and paste maestro_dashboard.yaml into the YAML editor.`,classicStep1:`Set up the E3DC Maestro integration. If it is already running, restart Home Assistant once.`,classicStep2:`Hard-reload the browser so the dashboard module is loaded.`,classicStep3:`Settings → Dashboards → Add dashboard.`,classicStep4:`Under Community dashboards, choose E3DC Maestro.`,classicStep5:`Confirm the title E3DC Maestro and the suggested icon, then create it.`,classicPath:`The path must stay e3dc-maestro. Do not rename the suggested title before the slug is set, or the help links inside the dashboard point nowhere.`,classicAfter:`The dashboard is built from the current Maestro template every time it opens, so updates arrive automatically as long as you do not take control of it in the editor.`,classicTimeout:`If you see “Timeout waiting for strategy element ll-strategy-dashboard-e3dc-maestro”: restart Home Assistant, hard-reload the browser, and under Settings → Dashboards → Resources check that /local/e3dc_maestro/e3dc-maestro-strategy.js is the first JavaScript module (right after first setup it is still /e3dc_maestro/frontend/e3dc-maestro-strategy.js).`,classicOpen:`Open dashboard`,setEnergy:`Energy dashboard`,setEnergyHint:`Set sources with one click`,energyLead:`Maestro writes PV, grid and battery into the Home Assistant Energy dashboard. It prefers lifetime meters from e3dc_rscp, otherwise Maestro’s daily meters. Gas and water stay untouched.`,energySensorsTitle:`Meters found`,energyRoleSolar:`PV production`,energyRoleGridFrom:`Grid import`,energyRoleGridTo:`Grid export`,energyRoleBatteryFrom:`Battery discharge`,energyRoleBatteryTo:`Battery charge`,energyRoleWallbox:`Wallbox`,energyOriginOptions:`Sizing setting`,energyOriginRscp:`e3dc_rscp`,energyOriginMaestro:`Maestro (daily meters)`,energyMissing:`Still missing`,energyActionTitle:`Apply`,energyChecking:`Checking Energy dashboard and meters …`,energyApplying:`Writing …`,energyReady:`Maestro sources are already in the Energy dashboard.`,energyEmpty:`No PV/grid/battery sources yet. Maestro will add the meters it found.`,energyPartial:`Some sources are still missing. Maestro can fill the gaps — or replace PV, grid and battery entirely.`,energyForeign:`Other PV/grid/battery sources are already configured. Applying replaces only those three; gas and water stay.`,energyUnavailable:`No matching energy meters found. e3dc_rscp or Maestro must be loaded.`,energyNoComponent:`The Home Assistant Energy integration is not loaded.`,energyAdminOnly:`Only administrators can apply sources.`,energyFailed:`That did not work: {err}`,energyAlready:`Sources are already set.`,energyRetry:`Check again`,energyFill:`Fill gaps`,energyReplace:`Replace sources`,energyApply:`Apply sources`,energyOpen:`Open Energy dashboard`,energyAfter:`Afterwards check prices under Settings → Energy. The sizing advisor can read the same sources again.`,energyMaestroNote:`Daily meters reset at midnight. For long-term stats, RSCP lifetime meters are better.`,energyExtraTitle:`Other solar sources`,energyFremdHint:`Third-party inverters (e.g. Fronius) belong as their own solar source in the Energy dashboard — next to the E3DC PV meter. E3DC often also exposes the same inverter as “Additional production”. Do not count both: use either the inverter’s own meter or the E3DC additional energy meter, not both. Maestro only writes the main E3DC meter; check extra solar sources yourself and leave them in place.`,energyExtraKeep:`Already configured and kept:`,energyDevicesTitle:`Devices / wallbox`,energyDevicesHint:`The Energy dashboard needs energy meters (kWh), not raw power (W/kW). hacs-e3dc often only exposes wallbox power (wallbox-consumption); usable kWh come from the wallbox itself (e.g. openWB), a utility meter, or Maestro “Wallbox energy today”. Power meters (Shelly, Fritz, …) need an energy sensor or Riemann integration before you assign them as a device. If the wallbox is already inside house consumption, mark it as included in the dashboard — otherwise you double-count.`,energyWallboxPowerMissing:`The E3DC wallbox power meter exists but is unavailable. Use the wallbox integration’s energy meter — not the E3DC power sensor.`,energyWallboxPowerOk:`The E3DC wallbox power meter is live — you still need a kWh meter for the dashboard (integration or utility meter).`,energyExtraDevicesKeep:`Other devices are left untouched:`,energyDeviceRow:`Device`,setLook:`Appearance`,setLookHint:`Hover a look to preview, tap to keep it.`,sidebarTitle:`Sidebar name`,sidebarTitleHint:`Leave empty for “E3DC Maestro Cockpit”. Applies for every user. Only administrators can change it.`,themeDark:`Dark`,themeDarkHint:`Calm in the evening. Energy flows glow on a dark ground.`,themeClassic:`Classic`,themeClassicHint:`Light and clear, easy to read during the day.`,themeE3dc:`myE3DC`,themeE3dcHint:`The familiar myE3DC look.`,themeOled:`OLED`,themeOledHint:`True black, flat and frugal — for wall tablets and night use.`,themeAmber:`Solar Amber`,themeAmberHint:`Warm evening light. Amber and orange instead of cyan.`,themeLeitstand:`Control room`,themeLeitstandHint:`Sharp, monospaced, traffic-light colours — like an industrial monitor.`,themeTibber:`Tibber Night`,themeTibberHint:`Deep blue-violet with Tibber teal for dynamic tariffs.`,themePreviewHint:`Preview — not saved yet`,themeToggleToLight:`Light look (myE3DC)`,themeToggleToDark:`Dark look`,lookMotion:`Motion`,lookMotionHint:`Particles and blob pulse in the energy flow.`,lookDensity:`Density`,lookDensityHint:`Spacing and card padding for phone or wall tablet.`,lookDensityCompact:`Compact`,lookDensityNormal:`Normal`,lookDensityAiry:`Airy`,lookCorners:`Corners`,lookCornersHint:`How round cards and buttons are. “Theme” keeps each look’s own radii.`,lookCornersAuto:`Theme`,lookCornersSoft:`Soft`,lookCornersMedium:`Medium`,lookCornersSharp:`Sharp`,plantEmpty:`No data from the E3DC integration. Once E3DC RSCP is set up, operating state, storage and phases show up here.`,plantOperation:`Operation`,plantStorage:`Storage`,plantPhases:`Phases`,plantWallbox:`Wallbox`,plantRoomGrid:`Grid`,plantRoomGridHint:`House and grid phases, additional consumption.`,plantRoomBattery:`Battery`,plantRoomBatteryHint:`Packs, cell health and charge limits.`,plantRoomPv:`PV`,plantRoomPvHint:`Inverter, power and the feed-in limit.`,plantRoomWallbox:`Wallbox`,plantRoomWallboxHint:`Charge status and wallbox settings that can be changed.`,plantRoomControls:`Settings`,plantRoomControlsHint:`Values the E3DC accepts over RSCP.`,plantCells:`Cell health`,plantCell:`Module`,plantSend:`Send this setting to the E3DC?`,plantModel:`Model`,plantSerial:`Serial number`,plantFirmware:`Firmware`,plantFault:`Current message`,plantPack:`Storage`,plantMode:`Mode`,plantAutarky:`Autarky`,plantSelf:`Self-consumption`,plantPower:`Power setpoint`,plantLimits:`Power limits`,plantLimitCharge:`Max. charge`,plantLimitDischarge:`Max. discharge`,plantLimitMin:`Minimum discharge`,plantManual:`Manual grid charge`,plantManualEnergy:`Charged that way`,plantDerated:`PV derated`,plantEmergency:`Emergency power`,plantReserveHit:`Emergency reserve reached`,plantReserveOn:`Emergency reserve`,plantWeather:`Weather regulation`,plantWeatherWait:`Waiting for weather breakthrough`,plantOn:`on`,plantOff:`off`,plantMode0:`Normal`,plantMode1:`Idle`,plantMode2:`Discharging`,plantMode3:`Charging`,plantMode4:`Grid charge`,plantSoh:`State of health`,plantCycles:`Cycles`,plantEnergy:`Usable energy left`,plantShare:`Share of installed capacity`,plantCurrent:`Current`,plantVoltage:`Voltage`,plantTemp:`Cell temperature`,plantHouse:`House`,plantGrid:`Grid`,plantInverter:`Inverter`,plantPeak:`Installed PV power`,plantCapacity:`Battery capacity`,plantAc:`Max. AC power`,plantSysCharge:`Max. system charge`,plantSysDischarge:`Max. system discharge`,plantDeratePct:`Feed-in limit`,plantDeratePower:`Feed-in limit power`,plantExtraPv:`Additional production`,plantExtraUse:`Additional consumption`,plantPlug:`Plug`,plantCharging:`Charging`,plantPhaseCount:`Phases`,plantSun:`Solar share`,plantNet:`Grid share`,plantCarSoc:`Vehicle SoC`,plantMaxCurrent:`Max. charge current`,secSources:`Sources`,secSourcesHint:`Sensors for state of charge, power and daily counters. Changing one reloads the integration.`,secAdaptive:`Adaptive reserve`,secAdaptiveHint:`How far back Maestro looks and how high the reserve may rise.`,secPriceSensor:`Price sensor`,secPriceSensorHint:`Current import price (Tibber/aWATTar). Without a sensor a dynamic price plan does not calculate.`,secEnergyforecast:`Energyforecast`,secEnergyforecastHint:`Optional: an API token from energyforecast.de extends the price curve past the last real Tibber/aWATTar price. Free plan ≈ 2 days, Pro ≈ 6. Pick the market zone (usually DE-LU). Set grid fees and VAT in the Energyforecast profile to match your tariff – Maestro uses total_ct_kwh. Empty = off. Forecast slots appear paler on the price-plan chart.`,legendForecast:`Price forecast`,planProviderUntil:`Real prices until`,planForecastUntil:`Forecast until`,secSlots:`Tariff slots`,secSlotsHint:`Repeating windows. Monday is the first day.`,secForecastSensors:`Forecast sensors`,secForecastSensorsHint:`Remaining today, today's total, tomorrow and the day after.`,secWallboxWire:`Wallbox wiring`,secWallboxWireHint:`Power needs an integration reload. SoC and plug are display-only — no reload.`,secEvccWire:`EVCC`,secEvccWireHint:`Which entity reports charging and which value means charge now.`,secHpWire:`Heat pump`,secHpWireHint:`Switch, services and the window in which it may run.`,secSizingInputs:`Meters`,secSizingInputsHint:`Energy meters and the period used for the calculation. Changing a sensor reloads the integration.`,setSizingTile:`More battery or PV?`,setSizingTileHint:`Which expansion pays off`,setSetup:`Setup`,setSetupHint:`What the control needs in order to run`,setupTitle:`First steps`,setupLead:`Maestro needs these points before it can control your home.`,setupProgress:`{done} of {total} required steps done`,setupDone:`Setup complete`,setupDoneHint:`Every required step is done. The list stays under Settings.`,setupAck:`Got it`,setupOpen:`Open`,setupStatusDone:`done`,setupStatusTodo:`missing`,setupStatusOptional:`optional`,setupStatusWait:`reading`,setupOptionsError:`The settings could not be read: {err}`,setupPlant:`Plant connected`,setupPlantHint:`State of charge, PV, grid, house and battery each need a sensor that reports values.`,setupPlantOk:`Every required sensor is reporting.`,setupPlantMissing:`Still without a value: {names}.`,setupTariff:`Tariff`,setupTariffHint:`A fixed price, a price sensor or time windows. Without a price Maestro cannot charge by price.`,setupTariffOk:`A price or a time window is set.`,setupTariffMissing:`The dynamic tariff has no price sensor, or the fixed tariff has no import price.`,setupForecast:`PV forecast`,setupForecastHint:`Recommended, so Maestro can match charging to the expected yield.`,setupForecastOk:`A forecast sensor is selected.`,setupForecastOpen:`None selected yet. Control still runs, only without looking ahead.`,setupSafety:`Emergency reserve`,setupSafetyHint:`Not required. Useful so the battery keeps a reserve.`,setupSafetyOk:`A reserve is switched on.`,setupSafetyOpen:`No reserve is active yet. Fixed, seasonal or adaptive lives under Safety.`,setupLoads:`Loads`,setupLoadsHint:`Optional, when Maestro should also control a wallbox, heat pump or EVCC.`,setupLoadsOk:`At least one load is connected.`,setupLoadsOpen:`None connected. Only needed when Maestro should control a load.`,setupRegulation:`Switch control on`,setupRegulationHint:`While it is off, Maestro only watches and sends no limits.`,setupRegulationOk:`Maestro is controlling.`,setupRegulationOff:`Control is off.`,setupRun:`First decision`,setupRunHint:`Maestro has calculated at least once and says why.`,setupRunOk:`There is a decision.`,setupRunOff:`Switch control on. The decision shows up here afterwards.`,setupRunWait:`Control is on. The first decision arrives with the next cycle.`,setSizing:`Does the expansion pay off?`,setSizingHint:`How much extra capacity fits your consumption`,sizingLead:`Check whether a larger battery or more PV is worth it for your home. You set how much you want to add. Maestro uses your past consumption to estimate what that changes in autarky, cost and payback.`,sizingAdd:`Your expansion`,sizingAddHint:`Extra battery in kWh and extra PV in kWp, on top of what is already installed. 0 means buy nothing.`,sizingRun:`Calculate from your history`,sizingScenario:`For this expansion`,sizingNeedRun:`Set the expansion and start the calculation. The result then shows what it is worth.`,sizingChartAvoided:`Avoided grid import`,sizingChartBaseline:`Current grid import`,sizingChartCaption:`Area: avoided grid import. Line: current grid import.`,sizingStory:`{bat} kWh of battery and {pv} kWp of PV: about {aut}% autarky, {save} € a year, paid back in {years} years.`,sizingStoryOpen:`{bat} kWh of battery and {pv} kWp of PV: about {aut}% autarky and {save} € a year. Payback cannot be derived from this.`,sizingBasis:`Assumptions`,sizingBasisHint:`Prices used for investment and payback.`,sizingRecsHint:`Economic looks for the shortest payback, technical for the highest autarky, balanced for a compromise.`,sizingRecs:`Three suggestions`,recEconomicHint:`Shortest payback`,recTechnicalHint:`Highest autarky`,recBalancedHint:`A compromise of both`,sizingBattery:`Battery`,sizingPv:`PV added`,sizingAutarky:`Autarky`,sizingAvoided:`Avoided grid import`,sizingSavings:`Savings per year`,sizingInvestment:`Investment`,sizingPayback:`Payback`,sizingInverter:`Inverter upgrade`,sizingBaseline:`Baseline grid import`,sizingNotRun:`Not calculated yet`,sizingRunning:`Calculating …`,sizingReady:`Ready`,recEconomic:`Economic`,recTechnical:`Technical`,recBalanced:`Balanced`,matrixDays:`Analysis days`,matrixRecords:`Hourly records`,matrixAnomaly:`Anomalies`,optReload:`Saved. The integration reloads so the new sensors take effect.`,optSaved:`Saved. The value applies immediately.`,optAdmin:`Only admins can change these values.`,optClear:`Clear`,optSearch:`Search entities`,optService:`Service, for example switch.turn_on`,optTarget:`Target entity`,optWeekdays:`Weekdays`,optFrom:`From`,optTo:`Until`,optClass:`Class`,optReserve:`Minimum reserve %`,optAddSlot:`Add slot`,optRemove:`Remove`,optSaveSlots:`Save slots`,optYes:`Yes`,optNo:`No`,classHigh:`High`,classLow:`Low`,classNormal:`Normal`,wd0:`Mon`,wd1:`Tue`,wd2:`Wed`,wd3:`Thu`,wd4:`Fri`,wd5:`Sat`,wd6:`Sun`,targetPower:`Target charge power`,autoObjective:`Objective`,autoLastRun:`Last run`,autoFallback:`Data fallback`,autoReason:`Reason`,autoOverrides:`Adjustments`,autoNone:`No adjustment. The previous setup was already the best.`,autoGrid:`Grid size`,autoDeltaDraw:`Grid import versus baseline`,autoDeltaFeed:`Feed-in versus baseline`,autoDeltaCurtail:`Curtailment versus baseline`,autoDeltaSelf:`Autarky versus baseline`,...Va},Wa={e3dc:`E3DC`,generic:`Generisch`,off:`Aus`,passive:`Passiv`,active_house:`Aktiv Haus`,active_grid:`Aktiv Netz`,self_consumption:`Eigenverbrauch`,cost:`Kosten`,co2:`CO₂`,fixed:`Fest`,dynamic:`Dynamisch`,slots:`Zeitfenster (HT/NT)`,threshold:`Dynamisch: unter Preisschwelle`,dynamic_auto:`Dynamisch: automatisch`,dynamic_expert:`Dynamisch: Experte`},Ga={e3dc:`E3DC`,generic:`Generic`,off:`Off`,passive:`Passive`,active_house:`Active, house`,active_grid:`Active, grid`,self_consumption:`Self-consumption`,cost:`Cost`,co2:`CO₂`,fixed:`Fixed`,dynamic:`Dynamic`,slots:`Time windows (peak/off-peak)`,threshold:`Dynamic: below price threshold`,dynamic_auto:`Dynamic: automatic`,dynamic_expert:`Dynamic: expert`},Ka={off:`Aus`,manual:`Manuell`,emergency:`Notladung`,feed_in_limit:`Einspeisebegrenzung`,reserve_protection:`Notstromreserve`,evcc_pause:`EVCC-Pause`,ht_protection:`HT-Schutz`,force_discharge:`Erzwungene Entladung`,morning_discharge:`Morgen-Entladung`,astro_wait:`Astro-Wartezeit`,morning_cap:`Morgen-Deckel`,hard_soc_limit:`SoC-Deckel`,fast_floor:`Schnell-Boden`,grid_charge:`Netzladung`,grid_hold:`Akku halten`,corridor:`Ladekorridor`,pv_delay:`PV-Verzögerung`,spreading:`Spreading`,curtailment_guard:`Abregelschutz`,idle:`Leerlauf`},qa={off:`Off`,manual:`Manual`,emergency:`Emergency charge`,feed_in_limit:`Feed-in limit`,reserve_protection:`Backup reserve`,evcc_pause:`EVCC pause`,ht_protection:`HT protection`,force_discharge:`Forced discharge`,morning_discharge:`Morning discharge`,astro_wait:`Astro wait`,morning_cap:`Morning cap`,hard_soc_limit:`SoC cap`,fast_floor:`Fast floor`,grid_charge:`Grid charge`,grid_hold:`Hold battery`,corridor:`Charge corridor`,pv_delay:`PV delay`,spreading:`Spreading`,curtailment_guard:`Curtailment guard`,idle:`Idle`};function Ja(e){let t=!e||e.toLowerCase().startsWith(`de`),n=t?Ha:Ua,r=t?Ka:qa,i=t?Wa:Ga;return{t:(e,t)=>{let r=n[e];if(t)for(let[e,n]of Object.entries(t))r=r.replace(`{${e}}`,String(n));return r},phase:e=>r[e]??e,option:e=>i[e]??e}}var Ya=o`
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
    --pv-extra: #f59e0b;
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
    --pad-card: 20px;
    --pad-main-y: 22px;
    --pad-main-x: 28px;
    --gap-block: 14px;
    --gap-topbar: 22px;
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
  :host([theme="oled"]) {
    color-scheme: dark;
    --bg: #000000;
    --glass: rgba(255, 255, 255, 0.04);
    --glass-strong: rgba(255, 255, 255, 0.07);
    --stroke: rgba(255, 255, 255, 0.1);
    --stroke-strong: rgba(255, 255, 255, 0.18);
    --text: #e8e8e8;
    --muted: #9a9a9a;
    --faint: #5c5c5c;
    --accent: #38bdf8;
    --accent-2: #818cf8;
    --accent-line: rgba(56, 189, 248, 0.55);
    --accent-wash: rgba(56, 189, 248, 0.14);
    --accent-glow: rgba(56, 189, 248, 0.22);
    --btn-primary-bg: linear-gradient(180deg, rgba(56, 189, 248, 0.28), rgba(56, 189, 248, 0.12));
    --btn-primary-border: rgba(56, 189, 248, 0.65);
    --btn-primary-color: var(--text);
    --radius: 14px;
    --radius-sm: 8px;
    --rail: #000000;
    --rail-solid: #000000;
    --btn: #0a0a0a;
    --card-bg: #0a0a0a;
    --card-highlight: #111111;
    --card-shadow: none;
    --fill: rgba(255, 255, 255, 0.04);
    --field: #0a0a0a;
    --switch-track: rgba(255, 255, 255, 0.14);
    --tip-bg: #0a0a0a;
    --float: #0a0a0a;
    --float-shadow: 0 16px 40px rgba(0, 0, 0, 0.7);
    --scrim: rgba(0, 0, 0, 0.72);
    --tooltip: #111111;
    background: var(--bg);
  }
  :host([theme="amber"]) {
    color-scheme: dark;
    --bg: #140e0a;
    --glass: rgba(243, 231, 216, 0.05);
    --glass-strong: rgba(243, 231, 216, 0.09);
    --stroke: rgba(243, 231, 216, 0.1);
    --stroke-strong: rgba(243, 231, 216, 0.18);
    --text: #f3e7d8;
    --muted: #b39a80;
    --faint: #7a6450;
    --pv: #fbbf24;
    --pv-extra: #f59e0b;
    --house: #d4a574;
    --grid-in: #f87171;
    --grid-out: #86efac;
    --bat: #fcd34d;
    --accent: #f59e0b;
    --accent-2: #ea580c;
    --accent-line: rgba(245, 158, 11, 0.65);
    --accent-wash: rgba(245, 158, 11, 0.16);
    --accent-glow: rgba(245, 158, 11, 0.32);
    --btn-primary-bg: linear-gradient(180deg, rgba(245, 158, 11, 0.4), rgba(234, 88, 12, 0.18));
    --btn-primary-border: rgba(245, 158, 11, 0.75);
    --btn-primary-color: var(--text);
    --ok: #86efac;
    --warn: #fbbf24;
    --rail: rgba(20, 14, 10, 0.72);
    --rail-solid: rgba(20, 14, 10, 0.92);
    --btn: linear-gradient(180deg, rgba(243, 231, 216, 0.1), rgba(243, 231, 216, 0.04));
    --card-bg: linear-gradient(180deg, rgba(243, 231, 216, 0.07), rgba(243, 231, 216, 0.03));
    --card-highlight: rgba(243, 231, 216, 0.06);
    --card-shadow: 0 18px 44px rgba(0, 0, 0, 0.35);
    --fill: rgba(243, 231, 216, 0.05);
    --field: rgba(0, 0, 0, 0.28);
    --switch-track: rgba(243, 231, 216, 0.14);
    --tip-bg: #1c140f;
    --float: linear-gradient(180deg, rgba(36, 26, 18, 0.96), rgba(20, 14, 10, 0.98));
    --float-shadow: 0 28px 70px rgba(0, 0, 0, 0.55);
    --scrim: rgba(10, 6, 4, 0.6);
    --tooltip: rgba(28, 20, 15, 0.96);
    background:
      radial-gradient(1100px 560px at 8% -12%, rgba(245, 158, 11, 0.18), transparent 58%),
      radial-gradient(860px 480px at 100% 0%, rgba(234, 88, 12, 0.12), transparent 56%),
      radial-gradient(700px 520px at 50% 120%, rgba(252, 211, 77, 0.08), transparent 60%),
      var(--bg);
  }
  :host([theme="leitstand"]) {
    color-scheme: dark;
    --bg: #0a0e12;
    --glass: rgba(215, 224, 230, 0.04);
    --glass-strong: rgba(215, 224, 230, 0.08);
    --stroke: rgba(215, 224, 230, 0.14);
    --stroke-strong: rgba(215, 224, 230, 0.28);
    --text: #d7e0e6;
    --muted: #8a9aa6;
    --faint: #556570;
    --pv: #eab308;
    --pv-extra: #ca8a04;
    --house: #94a3b8;
    --grid-in: #ef4444;
    --grid-out: #22c55e;
    --bat: #38bdf8;
    --accent: #22c55e;
    --accent-2: #eab308;
    --accent-line: rgba(34, 197, 94, 0.7);
    --accent-wash: rgba(34, 197, 94, 0.14);
    --accent-glow: rgba(34, 197, 94, 0.28);
    --btn-primary-bg: #166534;
    --btn-primary-border: #22c55e;
    --btn-primary-color: #ecfdf5;
    --ok: #22c55e;
    --warn: #eab308;
    --radius: 4px;
    --radius-sm: 2px;
    --rail: #070a0d;
    --rail-solid: #070a0d;
    --btn: #11171c;
    --card-bg: #11171c;
    --card-highlight: #161d24;
    --card-shadow: none;
    --fill: rgba(215, 224, 230, 0.05);
    --field: #0e1318;
    --switch-track: rgba(215, 224, 230, 0.16);
    --tip-bg: #11171c;
    --float: #11171c;
    --float-shadow: 0 12px 32px rgba(0, 0, 0, 0.55);
    --scrim: rgba(0, 0, 0, 0.7);
    --tooltip: #161d24;
    font-family: "IBM Plex Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace;
    background:
      linear-gradient(180deg, rgba(34, 197, 94, 0.03), transparent 28%),
      var(--bg);
  }
  :host([theme="tibber"]) {
    color-scheme: dark;
    --bg: #0b1020;
    --glass: rgba(230, 238, 248, 0.045);
    --glass-strong: rgba(230, 238, 248, 0.08);
    --stroke: rgba(230, 238, 248, 0.09);
    --stroke-strong: rgba(230, 238, 248, 0.18);
    --text: #e6eef8;
    --muted: #8b9bb8;
    --faint: #5a6a88;
    --pv: #fbbf24;
    --pv-extra: #f59e0b;
    --house: #a78bfa;
    --grid-in: #f87171;
    --grid-out: #34d399;
    --bat: #24ccbf;
    --accent: #24ccbf;
    --accent-2: #6366f1;
    --accent-line: rgba(36, 204, 191, 0.65);
    --accent-wash: rgba(36, 204, 191, 0.16);
    --accent-glow: rgba(36, 204, 191, 0.35);
    --btn-primary-bg: linear-gradient(180deg, rgba(36, 204, 191, 0.38), rgba(36, 204, 191, 0.14));
    --btn-primary-border: rgba(36, 204, 191, 0.75);
    --btn-primary-color: var(--text);
    --ok: #24ccbf;
    --warn: #fbbf24;
    --rail: rgba(11, 16, 32, 0.62);
    --rail-solid: rgba(11, 16, 32, 0.9);
    --btn: linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04));
    --card-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.025));
    --card-highlight: rgba(255, 255, 255, 0.05);
    --card-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    --fill: rgba(255, 255, 255, 0.04);
    --field: rgba(0, 0, 0, 0.28);
    --switch-track: rgba(255, 255, 255, 0.12);
    --tip-bg: #12182c;
    --float: linear-gradient(180deg, rgba(22, 28, 52, 0.96), rgba(12, 16, 34, 0.98));
    --float-shadow: 0 30px 80px rgba(0, 0, 0, 0.55);
    --scrim: rgba(4, 6, 14, 0.6);
    --tooltip: rgba(18, 24, 44, 0.96);
    background:
      radial-gradient(1100px 560px at 10% -10%, rgba(36, 204, 191, 0.16), transparent 58%),
      radial-gradient(900px 500px at 100% 0%, rgba(99, 102, 241, 0.16), transparent 58%),
      radial-gradient(800px 600px at 50% 120%, rgba(36, 204, 191, 0.08), transparent 60%),
      var(--bg);
  }
  :host([density="compact"]) {
    --pad-card: 12px;
    --pad-main-y: 12px;
    --pad-main-x: 14px;
    --gap-block: 8px;
    --gap-topbar: 12px;
  }
  :host([density="airy"]) {
    --pad-card: 28px;
    --pad-main-y: 30px;
    --pad-main-x: 36px;
    --gap-block: 20px;
    --gap-topbar: 28px;
  }
  /* Force radii after theme tokens so the look page can override leitstand/e3dc defaults. */
  :host([corners="soft"]) {
    --radius: 24px;
    --radius-sm: 14px;
  }
  :host([corners="medium"]) {
    --radius: 14px;
    --radius-sm: 8px;
  }
  :host([corners="sharp"]) {
    --radius: 4px;
    --radius-sm: 2px;
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
    padding: max(var(--pad-main-y), env(safe-area-inset-top)) var(--pad-main-x) calc(var(--pad-main-y) + 18px);
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
    margin-bottom: var(--gap-topbar);
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
  .facts {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 2px 14px;
    margin: 6px 0 0;
    color: var(--muted);
    font-size: 12.5px;
    line-height: 1.35;
  }
  .facts b {
    color: var(--text);
    font-weight: 650;
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
  .help-menu svg,
  .help-menu svg * {
    fill: none;
    stroke: currentColor;
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
    color: inherit;
    font-family: inherit;
    cursor: pointer;
  }
  button.pill:hover,
  button.pill:focus-visible {
    border-color: var(--accent);
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
    padding: var(--pad-card);
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
  .live-state {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .live-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex: none;
  }
  .live-dot.ok {
    background: var(--ok);
    box-shadow: 0 0 8px 2px color-mix(in srgb, var(--ok) 55%, transparent);
  }
  .live-dot.bad {
    background: var(--grid-in);
    box-shadow: 0 0 8px 2px color-mix(in srgb, var(--grid-in) 55%, transparent);
  }
  .mode-line {
    margin-top: 2px;
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
  .plan-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 48px 20px;
  }
  .plan-empty p {
    margin: 0;
    max-width: 36em;
  }
  .plan-empty .sub {
    font-size: 13px;
    opacity: 0.85;
  }
  .spinner {
    width: 28px;
    height: 28px;
    border: 2px solid var(--stroke-strong);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
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
    overflow: visible;
  }
  .flow-wrap svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  /* Haus: size to the SVG viewBox — no letterboxed band under the foundation. */
  .flow-wrap.city {
    height: auto;
  }
  .flow-wrap.city svg {
    height: auto;
    display: block;
  }
  .flow-day {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 6px;
    margin: 10px 0 0;
    padding: 0;
    border: 0;
    background: none;
    color: var(--faint);
    font: inherit;
    font-size: 12px;
    line-height: 1.35;
    text-align: left;
    cursor: pointer;
  }
  .flow-day:hover,
  .flow-day:focus-visible {
    color: var(--muted);
  }
  .flow-day:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: 4px;
  }
  .flow-day-extra {
    margin-top: 4px;
    cursor: default;
  }
  .flow-day-label {
    font-weight: 700;
    letter-spacing: 0.02em;
    margin-right: 2px;
  }
  .flow-day-sep {
    opacity: 0.55;
  }
  .flow-day-unit {
    margin-left: 2px;
    opacity: 0.8;
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
  .flow-head-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: none;
  }
  .flow-style {
    display: inline-flex;
    padding: 2px;
    border-radius: 10px;
    border: 1px solid var(--stroke-strong);
    background: var(--fill);
  }
  .flow-style-btn {
    border: 0;
    background: transparent;
    color: var(--muted);
    font: 600 11px Inter, system-ui, sans-serif;
    padding: 5px 8px;
    border-radius: 8px;
    cursor: pointer;
  }
  .flow-node:focus-visible .flow-city-roof,
  .flow-node:focus-visible .flow-city-body,
  .flow-node:focus-visible .flow-city-cellar {
    stroke-width: 3.2;
  }
  .flow-node:focus-visible .flow-city-mast line {
    stroke-width: 3.2;
  }
  .flow-style-btn.on {
    background: var(--accent-soft, rgba(56, 189, 248, 0.16));
    color: var(--text);
  }
  .flow-style-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 1px;
  }
  .arrange-btn {
    border: 1px solid var(--stroke-strong);
    background: var(--fill);
  }
  .flow-arrange-hint {
    margin: 0 0 8px;
    font-size: 12px;
    color: var(--muted);
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }
  .flow-arrange-hint .linkish {
    border: 0;
    background: none;
    padding: 0;
    color: var(--accent);
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
  }
  .flow-wrap.arrange .flow-node.arrange {
    cursor: grab;
    touch-action: none;
  }
  .flow-wrap.arrange .flow-node.arrange:active {
    cursor: grabbing;
  }
  .flow-blob.motion .flow-blob-shape {
    transform-box: fill-box;
    transform-origin: center;
    animation: blob-breathe var(--blob-period, 2.6s) ease-in-out infinite;
  }
  .flow-blob.motion .flow-blob-core {
    transform-box: fill-box;
    transform-origin: center;
    animation: blob-core-pulse var(--blob-period, 2.6s) ease-in-out infinite;
  }
  .flow-blob.motion .flow-blob-halo {
    transform-box: fill-box;
    transform-origin: center;
    animation: blob-halo-spin calc(var(--blob-period, 2.6s) * 2.4) linear infinite;
  }
  @keyframes blob-breathe {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.055);
    }
  }
  @keyframes blob-core-pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.12);
      opacity: 1;
    }
  }
  @keyframes blob-halo-spin {
    to {
      transform: rotate(360deg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .flow-blob.motion .flow-blob-shape,
    .flow-blob.motion .flow-blob-core,
    .flow-blob.motion .flow-blob-halo {
      animation: none;
    }
  }
  .look-flow-title {
    margin: 22px 0 6px;
  }
  .theme-choice .swatch.flow-nodes {
    background:
      radial-gradient(circle at 50% 22%, #38bdf8 0 18%, transparent 19%),
      radial-gradient(circle at 18% 55%, #f97316 0 14%, transparent 15%),
      radial-gradient(circle at 82% 55%, #a78bfa 0 14%, transparent 15%),
      radial-gradient(circle at 50% 82%, #22d3ee 0 14%, transparent 15%),
      #0f172a;
  }
  .theme-choice .swatch.flow-blob {
    background:
      radial-gradient(ellipse 58% 48% at 50% 42%, rgba(249, 115, 22, 0.85), rgba(34, 211, 238, 0.35) 55%, transparent 70%),
      #0f172a;
  }
  .theme-choice .swatch.flow-city {
    background:
      linear-gradient(180deg, rgba(249, 115, 22, 0.7) 18% 28%, transparent 29%),
      repeating-linear-gradient(
        90deg,
        transparent 0 10px,
        rgba(167, 139, 250, 0.55) 10px 14px,
        transparent 14px 18px
      ),
      linear-gradient(180deg, transparent 32%, rgba(15, 23, 42, 0.2) 33% 72%, transparent 73%),
      linear-gradient(180deg, transparent 74%, rgba(34, 211, 238, 0.65) 75% 82%, transparent 83%),
      linear-gradient(90deg, transparent 12%, rgba(52, 211, 153, 0.75) 13% 15%, transparent 16%),
      #0f172a;
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
    align-items: stretch;
  }
  .soc-head {
    width: 100%;
    flex: none;
    align-items: center;
  }
  .soc-head h3 {
    margin: 0;
  }
  .soc-ctrl-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    margin-top: 14px;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1px solid var(--stroke-strong);
    background: color-mix(in srgb, var(--fill) 88%, transparent);
    color: var(--text);
    cursor: pointer;
    text-align: left;
    transition: border-color 0.15s ease, background 0.15s ease;
  }
  .soc-ctrl-btn:hover {
    border-color: color-mix(in srgb, var(--accent) 45%, var(--stroke-strong));
    background: color-mix(in srgb, var(--accent-wash) 55%, var(--fill));
  }
  .soc-ctrl-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .soc-ctrl-copy {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }
  .soc-ctrl-label {
    font: 700 13px/1.2 Inter, system-ui, sans-serif;
    letter-spacing: 0.01em;
  }
  .soc-ctrl-meta {
    color: var(--muted);
    font: 550 11px/1.3 Inter, system-ui, sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .soc-ctrl-btn svg {
    width: 16px;
    height: 16px;
    flex: none;
    color: var(--muted);
  }
  .overlay.battery-ctrl {
    width: min(440px, calc(100% - 24px));
    max-height: min(720px, calc(100% - 24px));
  }
  .flow-opts-wrap {
    position: relative;
    flex: none;
  }
  .flow-opts-scrim {
    position: fixed;
    inset: 0;
    z-index: 30;
    background: transparent;
  }
  .flow-opts-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    z-index: 31;
    width: min(340px, calc(100vw - 28px));
    max-height: min(70vh, 520px);
    overflow: auto;
    padding: 12px;
    border-radius: 16px;
    border: 1px solid var(--stroke-strong);
    /* Solid panel — --card-bg is translucent and lets the flow bleed through. */
    background: var(--bg);
    box-shadow: var(--card-shadow), 0 0 0 1px color-mix(in srgb, var(--bg) 80%, transparent);
  }
  .flow-opts-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .flow-opts-block {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .flow-opts-section {
    font-size: 12px;
    font-weight: 700;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .flow-opts-choices {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .flow-opts-choices .theme-choice {
    padding: 10px;
    gap: 12px;
  }
  .flow-opts-choices .theme-choice .swatch {
    width: 48px;
    height: 34px;
  }
  .flow-opts-action {
    width: 100%;
    justify-content: center;
  }
  .flow-opts-action + .flow-opts-action {
    margin-top: 6px;
  }
  .flow-arrange-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin: 0 0 10px;
  }
  .flow-arrange-bar .flow-arrange-hint {
    margin: 0;
  }
  .flow-consumers-done {
    width: 100%;
    justify-content: center;
    margin-top: 14px;
  }
  .icon-btn.on {
    color: var(--accent);
    border-color: color-mix(in srgb, var(--accent) 45%, var(--stroke-strong));
  }
  .battery-ctrl-body {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: 16px;
  }
  .battery-ctrl-block {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px;
    border-radius: 16px;
    border: 1px solid var(--stroke);
    background: color-mix(in srgb, var(--fill) 70%, transparent);
  }
  .battery-ctrl-block .force {
    margin: 0;
  }
  .battery-ctrl-block .grip-state {
    display: inline-flex;
    align-self: flex-start;
    margin-top: 4px;
  }
  .soc-visual {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 0;
  }
  .soc-pack {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    align-items: center;
    column-gap: 18px;
    row-gap: 10px;
  }
  .soc-pack .batt {
    grid-column: 1;
    grid-row: 1;
  }
  .soc-pack-readout {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }
  .soc-pack .reserve-hint {
    grid-column: 1;
    grid-row: 2;
    justify-self: center;
    margin: 0;
  }
  .soc-pack-readout b {
    color: var(--text);
    font-size: 36px;
    font-weight: 800;
    letter-spacing: -0.5px;
    line-height: 1;
  }
  .soc-pack-readout span {
    color: var(--muted);
    font-size: 13px;
  }
  .ring {
    width: 100%;
  }
  .soc-gauge {
    position: relative;
    width: min(100%, 250px);
  }
  .soc-disc {
    box-sizing: border-box;
    width: 100%;
    aspect-ratio: 1;
    padding: 8%;
    border-radius: 50%;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }
  .soc-readout {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-58%);
    pointer-events: none;
  }
  .soc-readout b {
    color: var(--text);
    font-family: inherit;
    font-size: 40px;
    font-weight: 800;
    line-height: 1;
  }
  .soc-readout span {
    margin-top: 4px;
    color: var(--muted);
    font-family: inherit;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.2;
  }
  .reserve-hint {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 12px;
    color: var(--text);
    font: 650 13px/1.2 Inter, system-ui, sans-serif;
  }
  .reserve-hint i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--warn);
    box-shadow: 0 0 8px var(--warn);
  }
  .soc-metrics {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    margin-top: auto;
    padding-top: 10px;
  }
  .soc-metric-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 6px;
  }
  .soc-metric-head span {
    color: var(--muted);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }
  .soc-metric-head b {
    color: var(--text);
    font-size: 18px;
    font-weight: 750;
    letter-spacing: -0.3px;
    line-height: 1;
  }
  .soc-track {
    position: relative;
    height: 8px;
    border-radius: 999px;
    background: var(--switch-track, var(--fill));
    border: 1px solid var(--stroke);
  }
  .soc-track-fill,
  .soc-track-reserve {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    max-width: 100%;
    border-radius: inherit;
  }
  .soc-track-fill {
    background: linear-gradient(90deg, color-mix(in srgb, var(--bat) 70%, black), var(--bat));
    box-shadow: 0 0 10px color-mix(in srgb, var(--bat) 40%, transparent);
  }
  .soc-track-reserve {
    background: color-mix(in srgb, var(--warn) 40%, transparent);
  }
  .soc-track-mark {
    position: absolute;
    top: -3px;
    bottom: -3px;
    width: 2px;
    border-radius: 1px;
    background: var(--text);
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--bg) 55%, transparent);
    transform: translateX(-50%);
    z-index: 1;
  }
  .soc-metric-sub {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    column-gap: 5px;
    row-gap: 2px;
    margin-top: 6px;
    color: var(--muted);
    font-size: 11px;
    line-height: 1.35;
  }
  .soc-metric-sep {
    opacity: 0.6;
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
  .range-bar {
    display: flex;
    justify-content: flex-end;
    margin: 18px 0 0;
  }
  .range-bar .day-nav {
    margin: 0;
  }
  .range-empty {
    margin: 8px 0 0;
    text-align: right;
  }
  .group-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 0 0 10px;
  }
  .group-bar .group-head {
    flex: 1;
    width: auto;
    min-width: 0;
    margin: 0;
  }
  .group-bar .seg.period {
    flex: none;
    margin: 0;
  }
  .group-bar .day-nav {
    flex: none;
    margin: 0;
  }
  .day-nav {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 2px;
    border-radius: 10px;
    background: var(--fill);
    border: 1px solid var(--stroke);
  }
  .day-nav-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
  }
  .day-nav-btn svg {
    width: 14px;
    height: 14px;
  }
  .day-nav-btn:hover:not(:disabled) {
    color: var(--text);
    background: var(--fill-strong, var(--stroke));
  }
  .day-nav-btn:disabled {
    opacity: 0.35;
    cursor: default;
  }
  .day-nav-btn:focus-visible,
  .day-nav-date:focus-visible,
  .day-nav-today:focus-visible {
    outline: 2px solid var(--accent, #38bdf8);
    outline-offset: 1px;
  }
  .day-nav-pick {
    position: relative;
    display: inline-flex;
    align-items: center;
  }
  .cal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 40;
    background: transparent;
  }
  .cal-pop {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    z-index: 41;
    width: min(320px, calc(100vw - 32px));
    padding: 12px;
    border-radius: 14px;
    border: 1px solid var(--stroke);
    background: var(--card, var(--fill-strong, #0f1522));
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  }
  .cal-grains {
    width: 100%;
    margin-bottom: 10px;
  }
  .cal-grains button {
    flex: 1;
  }
  .cal-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    margin-bottom: 8px;
  }
  .cal-title {
    flex: 1;
    text-align: center;
    font: 650 13px Inter, system-ui, sans-serif;
    color: var(--text);
  }
  .cal-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    margin-bottom: 4px;
  }
  .cal-weekdays span {
    text-align: center;
    font-size: 11px;
    font-weight: 650;
    color: var(--muted);
  }
  .cal-grid {
    display: grid;
    gap: 2px;
  }
  .cal-grid.days {
    grid-template-columns: repeat(7, 1fr);
  }
  .cal-grid.months,
  .cal-grid.years {
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
  .cal-cell {
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--text);
    font: 600 12px Inter, system-ui, sans-serif;
    min-height: 32px;
    cursor: pointer;
  }
  .cal-grid.months .cal-cell,
  .cal-grid.years .cal-cell {
    min-height: 40px;
    background: var(--fill);
  }
  .cal-cell.muted {
    color: var(--faint, var(--muted));
    opacity: 0.55;
  }
  .cal-cell.today {
    box-shadow: inset 0 0 0 1px var(--accent, #38bdf8);
  }
  .cal-cell.in-week {
    background: color-mix(in srgb, var(--accent, #38bdf8) 14%, transparent);
  }
  .cal-cell.sel {
    background: var(--accent, #38bdf8);
    color: #041018;
  }
  .cal-cell:hover:not(:disabled):not(.sel) {
    background: var(--fill-strong, var(--stroke));
  }
  .cal-cell:disabled {
    opacity: 0.3;
    cursor: default;
  }
  .cal-today {
    display: block;
    width: 100%;
    margin-top: 10px;
    border: 1px solid var(--stroke);
    border-radius: 10px;
    background: var(--fill);
    color: var(--text);
    font: 650 12px Inter, system-ui, sans-serif;
    padding: 8px;
    cursor: pointer;
  }
  .cal-today:hover {
    border-color: var(--accent, #38bdf8);
  }
  .day-nav-date {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 7.5rem;
    height: 28px;
    padding: 0 10px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--text);
    font: 650 12px Inter, system-ui, sans-serif;
    letter-spacing: 0.02em;
    cursor: pointer;
  }
  .day-nav-date svg {
    width: 14px;
    height: 14px;
    flex: none;
    color: var(--muted);
  }
  .day-nav-date:hover {
    background: var(--fill-strong, var(--stroke));
  }
  .day-nav-date:hover svg {
    color: var(--text);
  }
  .day-nav-label {
    white-space: nowrap;
  }
  /* Native picker host — kept for showPicker(), not for hit-testing. */
  .day-nav-pick input[type="date"] {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
    border: 0;
    font-size: 16px;
  }
  .day-nav-today {
    height: 28px;
    margin-right: 2px;
    padding: 0 10px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--accent, #38bdf8);
    font: 650 11px Inter, system-ui, sans-serif;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
  }
  .day-nav-today:hover {
    background: var(--fill-strong, var(--stroke));
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
  .pulse-body {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 2px 0 0;
  }
  .pulse-chart {
    width: 100%;
    min-height: 268px;
  }
  .pulse-chart .apexcharts-legend-series {
    display: inline-flex !important;
    align-items: center;
  }
  .pulse-chart .apexcharts-yaxis-title-text {
    letter-spacing: 0.02em;
  }
  .pulse-sum {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .pulse-spark {
    width: 72px;
    height: 28px;
    flex: none;
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
    .grip-head svg,
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
    margin-bottom: 18px;
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
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    /* Same --bat as the energy-flow battery, charge and discharge. */
    background: linear-gradient(180deg, color-mix(in srgb, var(--bat) 55%, white), var(--bat) 42%, color-mix(in srgb, var(--bat) 70%, black));
    box-shadow: 0 0 18px color-mix(in srgb, var(--bat) 45%, transparent);
  }
  .batt.idle .batt-fill:not(.batt-fill-reserve) {
    background: linear-gradient(180deg, color-mix(in srgb, var(--bat) 35%, var(--muted)), var(--bat));
    box-shadow: none;
  }
  .batt-fill-reserve {
    /* Same Notstrom-Sockel as the ring: filled warn, zone is translucent warn. */
    background: linear-gradient(180deg, color-mix(in srgb, var(--warn) 55%, white), var(--warn) 46%, color-mix(in srgb, var(--warn) 72%, black));
    box-shadow: 0 0 18px color-mix(in srgb, var(--warn) 40%, transparent);
    z-index: 1;
  }
  .batt-reserve-zone {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: color-mix(in srgb, var(--warn) 40%, transparent);
    box-shadow: inset 0 1px 0 color-mix(in srgb, var(--warn) 55%, transparent);
    pointer-events: none;
  }
  .batt-cells {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(to top, transparent 0 26px, color-mix(in srgb, var(--bg) 55%, transparent) 26px 28px);
    pointer-events: none;
    z-index: 2;
  }
  .batt.live {
    width: 112px;
  }
  .batt.live .batt-nub {
    width: 38px;
    height: 10px;
  }
  .batt.live .batt-body {
    width: 112px;
    height: 168px;
    border-radius: 18px;
  }
  .batt.live .batt-cells {
    background: repeating-linear-gradient(to top, transparent 0 36px, color-mix(in srgb, var(--bg) 55%, transparent) 36px 39px);
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
  .kpi .v .sim-dyn {
    display: block;
    margin-top: 4px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.01em;
    color: var(--muted);
    line-height: 1.35;
  }
  .kpi .v .sim-dyn .sim-delta {
    display: inline;
    margin-left: 0.35em;
    font-weight: 700;
  }
  .kpi .v .sim-dyn .sim-delta.pos {
    color: var(--ok);
  }
  .kpi .v .sim-dyn .sim-delta.neg {
    color: var(--grid-in);
  }
  .kpi .v .sim-dyn .sim-delta.muted {
    font-weight: 600;
    color: var(--muted);
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
  .chart-tools {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }
  .forecast-badge {
    margin-top: 6px;
  }
  .forecast-badge-wrap {
    position: relative;
    display: inline-flex;
    margin-top: 6px;
  }
  .forecast-badge-wrap .forecast-badge {
    margin-top: 0;
    cursor: pointer;
    font: inherit;
  }
  .forecast-badge.dim {
    opacity: 0.55;
  }
  .forecast-badge-scrim {
    position: fixed;
    inset: 0;
    z-index: 40;
  }
  .forecast-badge-menu {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 41;
    min-width: 220px;
    padding: 6px;
    border-radius: 12px;
    background: var(--glass-strong);
    border: 1px solid var(--stroke);
    box-shadow: var(--float-shadow);
  }
  .forecast-badge-menu button {
    display: block;
    width: 100%;
    border: 0;
    background: transparent;
    color: var(--text);
    text-align: left;
    font: 600 13px Inter, system-ui, sans-serif;
    padding: 10px 12px;
    border-radius: 9px;
    cursor: pointer;
  }
  .forecast-badge-menu button:hover,
  .forecast-badge-menu button:focus-visible {
    background: var(--fill);
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
  .force .slider-field {
    grid-column: 1 / -1;
  }
  .grip {
    padding: 0;
    margin-bottom: 14px;
  }
  .live-top + .grip {
    margin-top: 18px;
  }
  .grip-head {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
    padding: 14px 16px;
    border: 0;
    background: transparent;
    color: var(--text);
    cursor: pointer;
    text-align: left;
  }
  .grip-head svg {
    width: 16px;
    height: 16px;
    flex: none;
    color: var(--muted);
    transition: transform 0.15s ease;
  }
  .grip-head.open svg {
    transform: rotate(90deg);
  }
  .grip-title {
    flex: none;
    font: 700 15px Inter, system-ui, sans-serif;
  }
  .grip-state {
    padding: 4px 10px;
    border-radius: 999px;
    background: var(--fill);
    color: var(--muted);
    font: 650 13px/1.2 Inter, system-ui, sans-serif;
  }
  .grip-state.on {
    color: var(--text);
    background: var(--accent-wash);
  }
  .grip-state.warn {
    color: var(--text);
    background: rgba(251, 191, 36, 0.16);
  }
  .auto-bar {
    display: flex;
    align-items: center;
  }
  .auto-bar .grip-head {
    flex: 1;
    min-width: 0;
  }
  .auto-bar .switch {
    flex: none;
    margin-right: 16px;
  }
  .grip-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 4px 16px 16px;
    border-top: 1px solid var(--stroke);
  }
  .grip-body .force {
    margin: 0;
    padding-top: 12px;
  }
  .seg.period {
    display: inline-flex;
    width: auto;
    max-width: 100%;
    grid-template-columns: none;
    gap: 0;
    margin: 22px 0 0;
    padding: 2px;
    border-radius: 10px;
  }
  .seg.period button {
    flex: none;
    padding: 5px 12px;
    white-space: nowrap;
  }
  .seg.period + .group {
    margin-top: 8px;
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
    align-items: center;
    gap: 8px 12px;
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
  .banner-notes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 16px;
    flex: 1 1 auto;
    min-width: 0;
  }
  .banner-ack {
    appearance: none;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.08);
    color: var(--text);
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 999px;
    cursor: pointer;
    flex: 0 0 auto;
    margin-left: auto;
  }
  .banner-ack:hover {
    background: rgba(255, 255, 255, 0.14);
  }
  .banner-ack:focus-visible {
    outline: 2px solid var(--accent, #38bdf8);
    outline-offset: 2px;
  }
  .look-banner {
    margin-top: 20px;
  }
  .look-sidebar {
    margin-top: 4px;
  }
  .look-sidebar input {
    width: 100%;
    max-width: 28rem;
    box-sizing: border-box;
    padding: 8px 10px;
    border-radius: 10px;
    border: 1px solid var(--stroke-strong);
    background: var(--field);
    color: var(--text);
    font: 600 14px Inter, system-ui, sans-serif;
  }
  .look-sidebar input:disabled {
    opacity: 0.55;
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
    align-items: center;
    font-size: 12px;
    color: var(--muted);
    margin-top: 6px;
  }
  .legend span,
  .legend-toggle,
  .legend-fixed {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .legend-toggle {
    border: 0;
    background: transparent;
    color: var(--muted);
    font: inherit;
    padding: 0;
    cursor: pointer;
  }
  .legend-toggle:hover {
    color: var(--text);
  }
  .legend-toggle.off {
    opacity: 0.38;
    text-decoration: line-through;
  }
  .legend-toggle.off i {
    filter: grayscale(0.7);
  }
  .legend i {
    width: 10px;
    height: 10px;
    border-radius: 3px;
  }
  .strategy-strip {
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid var(--stroke);
  }
  .strategy-strip .strip-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .strategy-strip h4 {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
  }
  .strategy-strip .legend {
    margin-top: 0;
  }
  .strategy-strip .strip-track {
    margin-top: 10px;
    box-sizing: border-box;
  }
  .strategy-strip .strip.timed {
    position: relative;
    display: block;
    height: 34px;
    margin-top: 0;
    width: 100%;
  }
  .strategy-strip .strip.timed .slot {
    position: absolute;
    top: 0;
    box-sizing: border-box;
    min-width: 2px;
  }
  .strategy-strip .strip-axis.timed {
    position: relative;
    display: block;
    height: 16px;
    margin-top: 6px;
    width: 100%;
  }
  .strategy-strip .strip-axis.timed span {
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    white-space: nowrap;
    font: 500 11px ui-monospace, monospace;
    color: var(--faint);
  }
  /* Price-plan page: slot strip under the chart, no title row. */
  .plan-slots-strip {
    padding-top: 0;
    border-top: 0;
  }
  .plan-slots-strip .strip-track {
    margin-top: 0;
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
  .plan-diag {
    margin-top: 4px;
    padding-top: 12px;
    border-top: 1px solid var(--stroke);
  }
  .plan-diag h4 {
    margin: 0 0 8px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .plan-empty + .plan-diag {
    margin: 0 16px 16px;
    padding-top: 12px;
    border-top: 1px solid var(--stroke);
  }
  .plan-tune {
    margin-top: 14px;
  }
  .plan-tune > .group-head {
    margin: 0;
  }
  .plan-tune h4 {
    margin: 18px 0 0;
    font-size: 15px;
  }
  .plan-tune > .settings-section > h3 {
    margin-top: 18px;
  }
  .strategy-summary {
    margin: 10px 0 4px;
    padding: 10px 12px;
    border-radius: 10px;
    border-left: 3px solid var(--accent);
    background: var(--accent-wash);
    font-size: 13px;
    line-height: 1.45;
  }
  .strategy-summary p {
    margin: 0;
  }
  .strategy-summary p + p {
    margin-top: 6px;
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
  .slot.forecast {
    opacity: 0.55;
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
  .phase-gantt {
    margin: 4px 0 18px;
  }
  .gantt-head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 8px 14px;
    margin-bottom: 10px;
  }
  .gantt-head h4 {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
  }
  .gantt-head .sub {
    margin: 0;
    font-size: 12px;
  }
  .gantt-track {
    position: relative;
    height: 36px;
    border-radius: 10px;
    background: var(--fill);
    border: 1px solid var(--stroke);
    overflow: hidden;
  }
  .gantt-seg {
    position: absolute;
    top: 5px;
    bottom: 5px;
    border-radius: 6px;
    opacity: 0.92;
    min-width: 2px;
  }
  .gantt-now {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    margin-left: -1px;
    background: var(--text);
    opacity: 0.75;
    z-index: 2;
    pointer-events: none;
  }
  .gantt-axis {
    display: flex;
    justify-content: space-between;
    font: 500 11px ui-monospace, monospace;
    color: var(--faint);
    margin-top: 6px;
  }
  .gantt-legend {
    margin-top: 10px;
  }
  .tl-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
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
    display: flex;
    align-items: center;
    gap: 8px;
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
  .overlay h2,
  .pause-menu h2 {
    margin: 0 0 4px;
    font-size: 20px;
  }
  .pause-menu {
    position: fixed;
    z-index: 40;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: min(360px, calc(100% - 24px));
    padding: 18px;
    border-radius: 20px;
    background: var(--float);
    border: 1px solid var(--stroke-strong);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
  }
  .pause-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 14px 0;
  }
  .pause-choice {
    text-align: left;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid var(--stroke);
    background: var(--fill);
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  .pause-choice:hover,
  .pause-choice:focus-visible {
    border-color: var(--accent);
  }
  .pause-choice.resume {
    margin-top: 14px;
    border-color: var(--accent);
    font-weight: 600;
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
  .phase-ladder-link {
    margin-top: 12px;
    border: 0;
    background: none;
    padding: 0;
    color: var(--accent);
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .ladder {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 18px 0;
    padding: 16px 16px 8px;
    border: 1px solid var(--stroke);
    border-radius: var(--radius);
    background: var(--glass);
    scroll-margin-top: 12px;
  }
  .ladder.ladder-flash {
    animation: ladder-flash 1.1s ease;
  }
  @keyframes ladder-flash {
    0%,
    100% {
      box-shadow: none;
    }
    35% {
      box-shadow: 0 0 0 2px var(--accent-glow), 0 0 24px var(--accent-wash);
    }
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
  .settings-fold > .group-head {
    margin: 8px 0 0;
    font-size: 15px;
    letter-spacing: 0;
    text-transform: none;
    color: var(--text);
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
  .settings-search {
    display: block;
    margin: 0 0 14px;
  }
  .settings-query {
    width: 100%;
    box-sizing: border-box;
    border-radius: 12px;
    border: 1px solid var(--stroke-strong);
    background: var(--field);
    color: var(--text);
    font: 500 14px inherit;
    padding: 10px 12px;
  }
  .settings-hits {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .settings-hit {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    width: 100%;
    text-align: left;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1px solid var(--stroke);
    background: var(--glass);
    color: var(--text);
    cursor: pointer;
  }
  .settings-hit:hover {
    background: var(--glass-strong);
    border-color: var(--stroke-strong);
  }
  .settings-hit b {
    font-size: 15px;
    font-weight: 700;
  }
  .settings-hit span {
    color: var(--muted);
    font-size: 12.5px;
    line-height: 1.35;
  }
  .settings-tiles {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: var(--gap-block);
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
    gap: var(--gap-block);
  }
  .look-seg {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    gap: 4px;
    padding: 3px;
    border-radius: var(--radius-sm);
    background: var(--field);
    border: 1px solid var(--stroke);
  }
  .look-seg button {
    border: 0;
    border-radius: calc(var(--radius-sm) - 2px);
    background: transparent;
    color: var(--muted);
    font: 600 12.5px inherit;
    padding: 10px 8px;
    cursor: pointer;
  }
  .look-seg button.on {
    background: var(--accent-wash);
    color: var(--text);
    box-shadow: inset 0 0 0 1px var(--accent-line);
  }
  .look-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 0 4px;
  }
  .look-row .txt {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }
  .look-row .txt b {
    font-size: 15px;
  }
  .look-row .txt span {
    color: var(--muted);
    font-size: 12.5px;
    line-height: 1.35;
  }
  :host([corners="soft"]) .nav-btn,
  :host([corners="medium"]) .nav-btn,
  :host([corners="sharp"]) .nav-btn,
  :host([corners="soft"]) .theme-choice,
  :host([corners="medium"]) .theme-choice,
  :host([corners="sharp"]) .theme-choice,
  :host([corners="soft"]) .btn,
  :host([corners="medium"]) .btn,
  :host([corners="sharp"]) .btn,
  :host([corners="soft"]) .pill,
  :host([corners="medium"]) .pill,
  :host([corners="sharp"]) .pill,
  :host([corners="soft"]) .ctrl,
  :host([corners="medium"]) .ctrl,
  :host([corners="sharp"]) .ctrl,
  :host([corners="soft"]) .settings-hit,
  :host([corners="medium"]) .settings-hit,
  :host([corners="sharp"]) .settings-hit {
    border-radius: var(--radius-sm);
  }
  :host([corners="soft"]) .card,
  :host([corners="medium"]) .card,
  :host([corners="sharp"]) .card,
  :host([corners="soft"]) .settings-tile,
  :host([corners="medium"]) .settings-tile,
  :host([corners="sharp"]) .settings-tile,
  :host([corners="soft"]) .overlay,
  :host([corners="medium"]) .overlay,
  :host([corners="sharp"]) .overlay {
    border-radius: var(--radius);
  }
  :host([corners="sharp"]) .look-seg,
  :host([corners="sharp"]) .seg {
    border-radius: 4px;
  }
  :host([corners="sharp"]) .look-seg button,
  :host([corners="sharp"]) .seg button {
    border-radius: 2px;
  }
  :host([density="compact"]) .settings-tile {
    min-height: 120px;
    padding: 12px;
  }
  :host([density="airy"]) .settings-tile {
    min-height: 168px;
    padding: 22px;
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
  .theme-preview-banner {
    min-height: 1.35em;
    margin: 0 0 10px;
    color: var(--accent);
    font-weight: 600;
    visibility: hidden;
  }
  .theme-preview-banner.on {
    visibility: visible;
  }
  .theme-choice .swatch {
    width: 72px;
    height: 48px;
    border-radius: 12px;
    flex: none;
    border: 1px solid rgba(21, 36, 56, 0.12);
    display: flex;
    overflow: hidden;
    position: relative;
  }
  .theme-choice .swatch-rail {
    width: 14px;
    flex: none;
  }
  .theme-choice .swatch-stage {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 6px 6px 6px 5px;
  }
  .theme-choice .swatch-card {
    flex: 1;
    border-radius: 5px;
    min-height: 0;
  }
  .theme-choice .swatch-bar {
    height: 5px;
    border-radius: 999px;
    width: 62%;
  }
  .theme-choice .swatch.dark {
    background: #070b14;
    border-color: rgba(148, 163, 184, 0.2);
  }
  .theme-choice .swatch.dark .swatch-rail {
    background: linear-gradient(180deg, #0f172a, #1e293b);
  }
  .theme-choice .swatch.dark .swatch-card {
    background: linear-gradient(180deg, #152033, #0f172a);
    box-shadow: inset 0 0 0 1px rgba(56, 189, 248, 0.18);
  }
  .theme-choice .swatch.dark .swatch-bar {
    background: #38bdf8;
  }
  .theme-choice .swatch.classic {
    background: #e7eef5;
    border-color: rgba(21, 36, 56, 0.12);
  }
  .theme-choice .swatch.classic .swatch-rail {
    background: rgba(255, 255, 255, 0.92);
  }
  .theme-choice .swatch.classic .swatch-card {
    background: #ffffff;
    box-shadow: 0 1px 2px rgba(21, 32, 51, 0.08);
  }
  .theme-choice .swatch.classic .swatch-bar {
    background: #0284c7;
  }
  .theme-choice .swatch.e3dc {
    background: #f7f7f7;
    border-color: rgba(30, 37, 43, 0.12);
  }
  .theme-choice .swatch.e3dc .swatch-rail {
    background: #1e252b;
  }
  .theme-choice .swatch.e3dc .swatch-card {
    background: #ffffff;
    box-shadow: 0 1px 2px rgba(30, 37, 43, 0.08);
  }
  .theme-choice .swatch.e3dc .swatch-bar {
    background: #5cc244;
  }
  .theme-choice .swatch.oled {
    background: #000000;
    border-color: rgba(255, 255, 255, 0.18);
  }
  .theme-choice .swatch.oled .swatch-rail {
    background: #000000;
  }
  .theme-choice .swatch.oled .swatch-card {
    background: #0a0a0a;
    box-shadow: inset 0 0 0 1px rgba(56, 189, 248, 0.22);
  }
  .theme-choice .swatch.oled .swatch-bar {
    background: #38bdf8;
  }
  .theme-choice .swatch.amber {
    background: #140e0a;
    border-color: rgba(243, 231, 216, 0.16);
  }
  .theme-choice .swatch.amber .swatch-rail {
    background: linear-gradient(180deg, #1c140f, #2a1c12);
  }
  .theme-choice .swatch.amber .swatch-card {
    background: linear-gradient(180deg, #2a1c12, #1c140f);
    box-shadow: inset 0 0 0 1px rgba(245, 158, 11, 0.22);
  }
  .theme-choice .swatch.amber .swatch-bar {
    background: #f59e0b;
  }
  .theme-choice .swatch.leitstand {
    background: #0a0e12;
    border-color: rgba(215, 224, 230, 0.2);
    border-radius: 4px;
  }
  .theme-choice .swatch.leitstand .swatch-rail {
    background: #070a0d;
  }
  .theme-choice .swatch.leitstand .swatch-card {
    background: #11171c;
    border-radius: 2px;
    box-shadow: inset 0 0 0 1px rgba(34, 197, 94, 0.28);
  }
  .theme-choice .swatch.leitstand .swatch-bar {
    background: #22c55e;
    border-radius: 1px;
  }
  .theme-choice .swatch.tibber {
    background: #0b1020;
    border-color: rgba(230, 238, 248, 0.16);
  }
  .theme-choice .swatch.tibber .swatch-rail {
    background: linear-gradient(180deg, #12182c, #1a2240);
  }
  .theme-choice .swatch.tibber .swatch-card {
    background: linear-gradient(180deg, #1a2240, #12182c);
    box-shadow: inset 0 0 0 1px rgba(36, 204, 191, 0.24);
  }
  .theme-choice .swatch.tibber .swatch-bar {
    background: #24ccbf;
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
  .grip-body select,
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
  .setting-row.locked,
  .setting-line.locked {
    opacity: 0.7;
  }
  .setting-bundle {
    flex-direction: column;
    align-items: stretch;
  }
  .setting-line {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    width: 100%;
  }
  .setting-line.stack {
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }
  .bundle-fields {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--stroke);
  }
  .bundle-fields.quiet {
    opacity: 0.55;
  }
  .bundle-fields .slider-field,
  .bundle-fields .setting-num,
  .bundle-fields select {
    width: 100%;
    max-width: none;
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
  .sheet .ctrl .slider-field {
    flex: 1 1 100%;
  }
  .slider-field {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-width: 0;
  }
  .slider-track {
    position: relative;
    flex: 1;
    min-width: 0;
  }
  .slider-field input[type="range"] {
    width: 100%;
    height: 44px;
    margin: 0;
    appearance: none;
    -webkit-appearance: none;
    background: transparent;
    accent-color: var(--accent);
  }
  .slider-scale {
    position: relative;
    height: 30px;
    margin: 2px 14px 0;
    pointer-events: none;
  }
  .slider-scale span {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateX(-50%);
    white-space: nowrap;
    color: var(--text);
    font: 650 11px/1.1 Inter, system-ui, sans-serif;
  }
  .slider-scale span::before {
    content: "";
    display: block;
    width: 2px;
    height: 8px;
    margin-bottom: 3px;
    border-radius: 1px;
    background: var(--accent);
  }
  .slider-field input[type="range"]::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: 999px;
    background: var(--switch-track);
  }
  .slider-field input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 28px;
    height: 28px;
    margin-top: -10px;
    border-radius: 50%;
    background: var(--accent);
    border: 2px solid var(--surface, #fff);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
  }
  .slider-field input[type="range"]::-moz-range-track {
    height: 8px;
    border: 0;
    border-radius: 999px;
    background: var(--switch-track);
  }
  .slider-field input[type="range"]::-moz-range-thumb {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--accent);
    border: 2px solid var(--surface, #fff);
  }
  .slider-field input[type="number"] {
    width: 6.5rem;
    flex: none;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid var(--stroke-strong);
    background: var(--field);
    color: var(--text);
    font: 600 14px Inter, system-ui, sans-serif;
    padding: 8px 10px;
  }
  .slider-field span {
    color: var(--muted);
    font-size: 12px;
    flex: none;
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
  :host([theme="leitstand"]) .nav-btn {
    border-radius: 4px;
    font-family: inherit;
  }
  :host([theme="leitstand"]) .nav-btn.active {
    color: #22c55e;
    background: transparent;
    box-shadow: inset 3px 0 0 #22c55e;
  }
  :host([theme="leitstand"]) .seg {
    border-radius: 4px;
  }
  :host([theme="leitstand"]) .seg button {
    border-radius: 2px;
    font-family: inherit;
  }
  :host([theme="leitstand"]) .seg button.on {
    background: #166534;
    color: #ecfdf5;
  }
  :host([theme="oled"]) .rail,
  :host([theme="oled"]) .nav-btn.active {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
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
      padding: max(16px, env(safe-area-inset-top)) 14px calc(148px + env(safe-area-inset-bottom));
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
      overflow: visible;
    }
    .flow-wrap.blob {
      /* Keep PV watts / Haus captions inside the phone card. */
      padding: 6px 2px 2px;
    }
    .topbar {
      flex-wrap: wrap;
      row-gap: 10px;
    }
    .pill.hide-sm {
      display: inline-flex;
      flex-basis: 100%;
      width: max-content;
      max-width: 100%;
      white-space: normal;
    }
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
    .forecast-card,
    .plan-card {
      padding: 14px 12px;
    }
    .forecast-card .chart-head,
    .plan-card .chart-head {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }
    .forecast-card .chart-head h3,
    .plan-card .chart-head h3 {
      font-size: 15px;
      line-height: 1.3;
    }
    .forecast-card .chart-tools {
      width: 100%;
    }
    .forecast-card .chart-tools .toggle {
      padding: 8px 10px;
      font-size: 11px;
    }
    .forecast-card .legend,
    .plan-card .legend {
      flex-wrap: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      gap: 12px;
      padding-bottom: 2px;
      scrollbar-width: none;
    }
    .forecast-card .legend::-webkit-scrollbar,
    .plan-card .legend::-webkit-scrollbar {
      display: none;
    }
    .forecast-card .legend-toggle,
    .forecast-card .legend-fixed,
    .plan-card .legend span {
      flex-shrink: 0;
    }
    .plan-kpi {
      gap: 10px;
    }
    .plan-kpi .plan-state {
      font-size: 18px;
    }
    .plan-kpi .row b {
      font-size: 14px;
    }
    .strategy-strip .strip-head .legend {
      display: none;
    }
    .strategy-strip .slot {
      height: 28px;
    }
    .strategy-strip .strip-axis {
      font-size: 10px;
    }
    #fc-main,
    #plan-main {
      margin: 0 -2px;
    }
    .gantt-track {
      height: 32px;
    }
    .gantt-legend {
      flex-wrap: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .gantt-legend::-webkit-scrollbar {
      display: none;
    }
    .gantt-legend span {
      flex-shrink: 0;
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
  .setting-row.wide {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  .setting-row.wide .txt {
    flex: none;
  }
  .setting-bundle > .setting-line + .setting-line {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--stroke);
  }
  .setting-row.wide .opt-entity,
  .setting-row.wide .opt-action,
  .setting-bundle > .setting-line .opt-entity,
  .setting-bundle > .setting-line .opt-action {
    width: 100%;
  }
  .setting-row.wide .opt-entity input,
  .setting-row.wide .opt-action input,
  .setting-bundle > .setting-line .opt-entity input,
  .setting-bundle > .setting-line .opt-action input {
    flex: 1 1 100%;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid var(--stroke-strong);
    background: var(--field);
    color: var(--text);
    font: 600 13px Inter, system-ui, sans-serif;
    padding: 8px 10px;
  }
  .setting-row.wide .opt-action input {
    flex: 1 1 14rem;
  }
  .opt-choices button,
  .opt-chips .chip {
    overflow-wrap: anywhere;
  }

  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  .help-menu {
    display: none;
  }
  .help-scrim {
    z-index: 40;
  }
  .help {
    position: fixed;
    z-index: 41;
    inset: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 22px;
    border-radius: 24px;
    background: var(--float);
    border: 1px solid var(--stroke-strong);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
    min-height: 0;
    overflow: hidden;
  }
  .help-search {
    display: block;
  }
  .help-query {
    width: 100%;
    box-sizing: border-box;
    border-radius: 12px;
    border: 1px solid var(--stroke-strong);
    background: var(--field);
    color: var(--text);
    font: 500 14px inherit;
    padding: 10px 12px;
  }
  .help-body {
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    gap: 18px;
    min-height: 0;
    flex: 1;
    overflow: hidden;
  }
  .help-toc,
  .help-doc {
    overflow: auto;
    min-height: 0;
    overscroll-behavior: contain;
  }
  .help-toc-ch {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 2px;
    margin-bottom: 12px;
  }
  .help-toc button {
    text-align: left;
    background: transparent;
    border: 0;
    color: var(--muted);
    font: 500 13px inherit;
    padding: 4px 8px;
    border-radius: 8px;
    cursor: pointer;
  }
  .help-toc-ch > button:first-child {
    color: var(--text);
    font-weight: 700;
  }
  .help-toc button.on,
  .help-toc button[aria-current="true"] {
    background: var(--accent-wash);
    color: var(--text);
  }
  .help-fold {
    display: none;
  }
  .help-doc article + article {
    margin-top: 22px;
  }
  .help-doc h3 {
    margin: 0 0 8px;
    font-size: 18px;
  }
  .help-doc h4 {
    margin: 14px 0 4px;
    font-size: 15px;
  }
  .help-doc p {
    margin: 0 0 8px;
    color: var(--muted);
    line-height: 1.5;
  }
  .help-doc mark {
    background: var(--accent-wash);
    color: inherit;
    border-radius: 3px;
  }
  .help-link,
  .help-action {
    margin: 4px 8px 4px 0;
  }
  .help-link {
    background: transparent;
    border: 0;
    padding: 0;
    color: var(--accent-2, var(--accent));
    font: 600 14px inherit;
    cursor: pointer;
    text-decoration: underline;
  }
  .help-live {
    margin: 8px 0 12px;
    padding: 12px;
    border: 1px solid var(--stroke);
    border-radius: var(--radius);
    background: var(--glass);
  }
  .help-now {
    margin: 0 0 8px;
    color: var(--text);
    font-weight: 650;
  }
  .help-top {
    margin-top: 16px;
  }
  @media (max-width: 960px) {
    .help {
      inset: 8px;
      padding: 16px;
    }
    .help-body {
      grid-template-columns: 1fr;
    }
    .help-body > .help-toc {
      display: none;
    }
    .help-menu {
      display: grid;
    }
    .help-fold {
      display: block;
    }
    .help-fold nav {
      max-height: 40vh;
      overflow: auto;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .help,
    .help-scrim {
      transition: none;
    }
  }
`,Xa=[`unreachable`,`charge_lock`,`discharge_lock`,`unjustified`,`reserve_charge`,`emergency_charge`],Za=`e3dc-maestro.alerts-dismissed.v1`,Qa=`e3dc-maestro.alerts-banner-hidden.v1`,$a={unreachable:`alertUnreachable`,charge_lock:`alertChargeLock`,discharge_lock:`alertDischargeLock`,unjustified:`alertUnjustified`,reserve_charge:`alertReserveCharge`,emergency_charge:`alertEmergencyCharge`},eo=e=>$a[e];function to(e){let t=t=>e.states[t]?.state,n=t(W.phase),r=[];return t(W.reachable)===`off`&&r.push(`unreachable`),t(W.chargeLock)===`on`&&r.push(`charge_lock`),t(W.dischargeLock)===`on`&&r.push(`discharge_lock`),t(W.unjustified)===`on`&&r.push(`unjustified`),n===`reserve_protection`&&r.push(`reserve_charge`),n===`emergency`&&r.push(`emergency_charge`),r}function no(e,t){let n=new Set(t),r=new Set;for(let t of e)n.has(t)&&r.add(t);return r}function ro(e,t,n){return n||!e.length?!1:e.some(e=>!t.has(e))}function io(e){let t=new Set(Xa),n=new Set;if(!Array.isArray(e))return n;for(let r of e)typeof r==`string`&&t.has(r)&&n.add(r);return n}function ao(){try{return io(JSON.parse(localStorage.getItem(Za)??`null`))}catch{return new Set}}function oo(e){try{localStorage.setItem(Za,JSON.stringify([...e]))}catch{}}function so(e){return e===`1`}function co(){try{return so(localStorage.getItem(Qa))}catch{return!1}}function lo(e){try{localStorage.setItem(Qa,e?`1`:`0`)}catch{}}var uo=[`ring`,`pack`],fo=`e3dc-maestro.battery-style.v1`;function po(e){return e===`ring`?`ring`:`pack`}function mo(){try{return po(localStorage.getItem(fo))}catch{return`pack`}}function ho(e){try{localStorage.setItem(fo,e)}catch{}}var go=[`compact`,`normal`,`airy`],_o=[`auto`,`soft`,`medium`,`sharp`],vo=`e3dc-maestro.look-prefs.v1`,yo=new Set(go),bo=new Set(_o);function xo(e){return typeof e==`string`&&yo.has(e)?e:`normal`}function So(e){return typeof e==`string`&&bo.has(e)?e:`auto`}function Co(){try{return!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}catch{return!0}}function wo(){try{let e=localStorage.getItem(vo);if(!e)return{motion:Co(),density:`normal`,corners:`auto`};let t=JSON.parse(e);return{motion:typeof t.motion==`boolean`?t.motion:Co(),density:xo(t.density),corners:So(t.corners)}}catch{return{motion:Co(),density:`normal`,corners:`auto`}}}function To(e){try{localStorage.setItem(vo,JSON.stringify(e))}catch{}}var Eo=[`dark`,`classic`,`e3dc`,`oled`,`amber`,`leitstand`,`tibber`],Do=`e3dc-maestro.theme.v1`,Oo=new Set(Eo);function ko(e){return e!==`classic`&&e!==`e3dc`}function Ao(e){return!ko(e)}function jo(e){return typeof e==`string`&&Oo.has(e)?e:`dark`}function Mo(){try{return jo(localStorage.getItem(Do))}catch{return`dark`}}function No(e){try{localStorage.setItem(Do,e)}catch{}}var Po=`e3dc-maestro`,Fo=`custom:e3dc-maestro`,Io=e=>e instanceof Error?e.message:typeof e==`object`&&e&&`message`in e?String(e.message):String(e),Lo=e=>typeof e==`object`&&e&&`code`in e?String(e.code):void 0,Ro=(e,t)=>e.some(e=>e.toLowerCase().includes(t));function zo(e){if(!e||typeof e!=`object`)return`empty`;let t=e.strategy;if(t?.type===`custom:e3dc-maestro`)return`ours`;let n=e.views;return Object.keys(e).length===0||Array.isArray(n)&&n.length===0&&!t?`empty`:`foreign`}async function Bo(e){try{let t=(await e.callWS({type:`lovelace/resources`})).map(e=>e.url??``);return{mushroom:Ro(t,`mushroom`),apex:Ro(t,`apexcharts-card`)}}catch{return{}}}async function Vo(e){if(!(await e.callWS({type:`lovelace/dashboards/list`})).some(e=>e.url_path===`e3dc-maestro`))return`missing`;try{return zo(await e.callWS({type:`lovelace/config`,url_path:Po,force:!1}))}catch(e){if(Lo(e)===`config_not_found`)return`empty`;throw e}}async function Ho(e){let t=await Bo(e);try{return{state:await Vo(e),...t}}catch(e){return{state:`error`,error:Io(e),...t}}}async function Uo(e,t){if(t===`missing`)await e.callWS({type:`lovelace/dashboards/create`,url_path:Po,title:`E3DC Maestro`,icon:`mdi:battery-charging`,require_admin:!1,show_in_sidebar:!0,mode:`storage`});else if(t!==`empty`)return;await e.callWS({type:`lovelace/config/save`,url_path:Po,config:{strategy:{type:Fo}}})}var Wo=e=>{let t=typeof e==`object`&&e&&`code`in e?String(e.code):``,n=e instanceof Error?e.message:typeof e==`object`&&e&&`message`in e?String(e.message):String(e);return t===`unknown_command`||/unknown command/i.test(n)?`Befehl fehlt — Home Assistant einmal neu starten, danach Panel hart neu laden.`:n};function Go(e){let t=e.status??`unavailable`,n={};for(let[t,r]of Object.entries(e.sensors??{}))r?.entity_id&&r.origin&&(n[t]={entity_id:r.entity_id,origin:r.origin});return{state:t,energyReady:e.energy_ready===!0,ready:e.ready===!0,status:t,sensors:n,missing:e.missing??[],hasSolar:e.has_solar===!0,hasGrid:e.has_grid===!0,hasBattery:e.has_battery===!0,otherSources:e.other_sources??0,extraSolar:e.extra_solar??[],extraDevices:e.extra_devices??[],wallboxPower:e.wallbox_power?.entity_id?{entity_id:e.wallbox_power.entity_id,available:e.wallbox_power.available===!0}:void 0,proposedCount:e.proposed_count??0,error:e.error}}async function Ko(e){try{return Go(await e.callWS({type:`e3dc_maestro/energy_dashboard/preview`}))}catch(e){return{state:`error`,error:Wo(e)}}}async function qo(e,t){let n=await e.callWS({type:`e3dc_maestro/energy_dashboard/apply`,mode:t});return n.ok===!1?{...Go(n),state:`error`,error:n.error??`apply_failed`}:Go(n)}var Jo=[`soc_sensor`,`pv_power_sensor`,`house_power_sensor`,`grid_power_sensor`,`battery_power_sensor`],Yo=[`pv_forecast_sensor`,`pv_forecast_today_sensor`,`tomorrow_pv_sensor`],Xo=[`wallbox_power_sensor`,`evcc_charging_entity`,`hp_switch_entity`],Zo=[`fixed_reserve_enabled`,`seasonal_reserve_enabled`,`adaptive_reserve_enabled`],Qo=[`wallbox_enabled`,`evcc_enabled`,`hp_enabled`],$o=e=>!e||e===`unknown`||e===`unavailable`||e===`none`,es=(e,t)=>{let n=e[t];return typeof n==`string`&&n.includes(`.`)?n:void 0},ts=(e,t)=>{let n=es(e.options,t);return!!n&&!$o(e.state(n))},ns=e=>{let t=Jo.filter(t=>!ts(e,t)),n=e.options.battery_capacity_kwh;return(typeof n!=`number`||!(n>0))&&t.push(`battery_capacity_kwh`),t},rs=e=>{let t=e.select(`tariff_mode`),n=Number.isFinite(e.number(`fixed_buy_price`)??NaN),r=ts(e,`price_sensor`),i=e.slots>0;return t===`dynamic`?!e.ready&&!r&&!i?`wait`:r||i?`done`:`todo`:t===`fixed`&&n||r||i?`done`:e.ready?`todo`:`wait`},is=(e,t)=>{let n=t.map(t=>e.on(t));if(n.some(e=>e===!0))return!0;if(!n.every(e=>e===void 0))return!1};function as(e){let t=e.ready?ns(e):[],n=Yo.some(t=>ts(e,t)),r=Xo.some(t=>ts(e,t)),i=is(e,Qo),a=is(e,Zo),o=!$o(e.phase);return[{id:`plant`,status:e.ready?t.length?`todo`:`done`:`wait`,required:!0,area:`plant`,missing:t},{id:`tariff`,status:rs(e),required:!0,area:`tariff`,missing:[]},{id:`forecast`,status:e.ready?n?`done`:`optional`:`wait`,required:!1,area:`pv`,missing:[]},{id:`safety`,status:a===void 0?`wait`:a?`done`:`optional`,required:!1,area:`safety`,missing:[]},{id:`loads`,status:i===!0||r?`done`:!e.ready||i===void 0?`wait`:`optional`,required:!1,area:`loads`,missing:[]},{id:`regulation`,status:e.regulation===void 0?`wait`:e.regulation?`done`:`todo`,required:!0,missing:[]},{id:`run`,status:o?`done`:e.regulation===!1?`todo`:`wait`,required:!0,missing:[],note:o&&e.explanation&&!$o(e.explanation)?e.explanation:void 0}]}var os=e=>e.filter(e=>e.required).every(e=>e.status===`done`),ss=`e3dc-maestro.setup.ack`,cs=e=>e===`1`;function ls(){try{return cs(localStorage.getItem(ss))}catch{return!1}}function us(){try{localStorage.setItem(ss,`1`)}catch{}}var ds=[`sensor`],fs=[`sensor`],ps=(e,t,n,r=1,i)=>({key:e,kind:`number`,min:t,max:n,step:r,unit:i}),Y=(e,t,n=!1)=>({key:e,kind:`entity`,domains:t,required:n}),ms=(e,t)=>({key:e,kind:`entities`,domains:t}),hs=[{area:`plant`,title:`secSources`,hint:`secSourcesHint`,fields:[ps(`battery_capacity_kwh`,1,100,.1),Y(`soc_sensor`,ds,!0),Y(`pv_power_sensor`,ds,!0),ms(`additional_generation_sensor`,ds),ms(`additional_energy_total_sensor`,fs),Y(`house_power_sensor`,ds,!0),Y(`grid_power_sensor`,ds,!0),{key:`grid_power_invert`,kind:`bool`},Y(`battery_power_sensor`,ds,!0),Y(`battery_charged_today_sensor`,fs),Y(`battery_discharged_today_sensor`,fs),Y(`pv_production_today_sensor`,fs),Y(`house_consumption_today_sensor`,fs)]},{area:`safety`,title:`secAdaptive`,hint:`secAdaptiveHint`,fields:[ps(`adaptive_reserve_lookback_days`,1,60),ps(`adaptive_reserve_min_days`,1,30),ps(`adaptive_reserve_safety_factor`,1,3,.1),ps(`adaptive_reserve_max_soc`,5,90,1,`%`)]},{area:`tariff`,title:`secPriceSensor`,hint:`secPriceSensorHint`,fields:[Y(`price_sensor`,ds)],bundle:!0},{area:`tariff`,title:`secEnergyforecast`,hint:`secEnergyforecastHint`,fields:[{key:`energyforecast_token`,kind:`text`,maxLength:128,secret:!0},{key:`energyforecast_market_zone`,kind:`select`,choices:[`DE-LU`,`AT`,`FR`,`NL`,`BE`,`PL`,`DK1`,`DK2`,`CH`,`CZ`,`HU`,`SI`]}],bundle:!0},{area:`pv`,title:`secForecastSensors`,hint:`secForecastSensorsHint`,fields:[Y(`pv_forecast_sensor`,ds),Y(`pv_forecast_today_sensor`,ds),Y(`tomorrow_pv_sensor`,ds),Y(`pv_forecast_sensor_day2`,ds)],bundle:!0},{area:`loads`,title:`secWallboxWire`,hint:`secWallboxWireHint`,fields:[Y(`wallbox_power_sensor`,ds),Y(`wallbox_soc_sensor`,ds),Y(`wallbox_plug_entity`,[`binary_sensor`,`sensor`]),{key:`wallbox_included_in_house`,kind:`bool`},{key:`wallbox_phases`,kind:`select`,choices:[`1`,`3`]},{key:`wallbox_service_on`,kind:`action`},{key:`wallbox_service_off`,kind:`action`}]},{area:`loads`,title:`secEvccWire`,hint:`secEvccWireHint`,fields:[Y(`evcc_charging_entity`,[`sensor`,`binary_sensor`,`switch`,`input_boolean`]),Y(`evcc_mode_entity`,[`select`,`input_select`,`sensor`]),{key:`evcc_now_value`,kind:`text`}]},{area:`loads`,title:`secHpWire`,hint:`secHpWireHint`,fields:[Y(`hp_switch_entity`,[`switch`,`input_boolean`]),{key:`hp_service_on`,kind:`action`},{key:`hp_service_off`,kind:`action`},{key:`hp_time_start`,kind:`time`},{key:`hp_time_end`,kind:`time`}]},{area:`sizing`,title:`secSizingInputs`,hint:`secSizingInputsHint`,fields:[{key:`sizing_pv_energy_sensor`,kind:`entities`,domains:fs},Y(`sizing_house_energy_sensor`,fs),{key:`sizing_house_from_balance`,kind:`bool`},Y(`sizing_grid_import_energy_sensor`,fs),Y(`sizing_grid_export_energy_sensor`,fs),Y(`sizing_battery_charge_energy_sensor`,fs),Y(`sizing_battery_discharge_energy_sensor`,fs),Y(`sizing_wallbox_energy_sensor`,fs),Y(`sizing_heat_pump_energy_sensor`,fs),ps(`sizing_analysis_days`,30,730),ps(`sizing_electricity_price_eur_kwh`,.05,2,.01),ps(`sizing_feed_in_price_eur_kwh`,0,1,.01),ps(`sizing_battery_price_eur_kwh`,100,5e3),ps(`sizing_pv_price_eur_per_kwp`,200,5e3),ps(`sizing_inverter_upgrade_price_eur`,0,2e4),ps(`sizing_round_trip_efficiency`,.5,1,.01),ps(`sizing_max_battery_sweep_kwh`,5,200,.5),ps(`sizing_battery_step_kwh`,.5,10,.5),ps(`sizing_max_pv_expansion_kwp`,0,200,.5),ps(`sizing_pv_step_kwp`,.5,10,.5)]}],gs={battery_capacity_kwh:{de:`Nutzbare Akkukapazität`,en:`Usable battery capacity`},soc_sensor:{de:`SoC-Sensor`,en:`State-of-charge sensor`},pv_power_sensor:{de:`PV-Leistung`,en:`PV power`},additional_generation_sensor:{de:`Zusätzliche Erzeuger (Leistung)`,en:`Additional producers (power)`},additional_energy_total_sensor:{de:`Zusatz-Energiezähler (gesamt)`,en:`Additional energy totals`},house_power_sensor:{de:`Hausverbrauch`,en:`House power`},grid_power_sensor:{de:`Netzleistung`,en:`Grid power`},grid_power_invert:{de:`Netzleistung invertieren`,en:`Invert grid power`},battery_power_sensor:{de:`Akkuleistung`,en:`Battery power`},battery_charged_today_sensor:{de:`Heute geladen`,en:`Charged today`},battery_discharged_today_sensor:{de:`Heute entladen`,en:`Discharged today`},pv_production_today_sensor:{de:`PV-Ertrag heute`,en:`PV yield today`},house_consumption_today_sensor:{de:`Hausverbrauch heute`,en:`House consumption today`},adaptive_reserve_lookback_days:{de:`Rückblick in Tagen`,en:`Lookback in days`},adaptive_reserve_min_days:{de:`Mindestens Tage mit Daten`,en:`Minimum days of data`},adaptive_reserve_safety_factor:{de:`Sicherheitsfaktor`,en:`Safety factor`},adaptive_reserve_max_soc:{de:`Obergrenze der Reserve`,en:`Reserve ceiling`},price_sensor:{de:`Preis-Sensor`,en:`Price sensor`},energyforecast_token:{de:`Energyforecast API-Token`,en:`Energyforecast API token`},energyforecast_market_zone:{de:`Energyforecast Marktzone`,en:`Energyforecast market zone`},pv_forecast_sensor:{de:`Restprognose heute`,en:`Remaining forecast today`},pv_forecast_today_sensor:{de:`Tagesprognose`,en:`Today's forecast`},tomorrow_pv_sensor:{de:`Prognose morgen`,en:`Tomorrow's forecast`},pv_forecast_sensor_day2:{de:`Prognose übermorgen`,en:`Day-after forecast`},wallbox_power_sensor:{de:`Wallbox-Leistung`,en:`Wallbox power`},wallbox_soc_sensor:{de:`Fahrzeug-SoC`,en:`Vehicle SoC`},wallbox_plug_entity:{de:`Stecker angesteckt`,en:`Plug connected`},wallbox_included_in_house:{de:`In der Hauslast enthalten`,en:`Included in house load`},wallbox_phases:{de:`Phasen`,en:`Phases`},wallbox_service_on:{de:`Wallbox einschalten`,en:`Turn wallbox on`},wallbox_service_off:{de:`Wallbox ausschalten`,en:`Turn wallbox off`},evcc_charging_entity:{de:`Lade-Entität`,en:`Charging entity`},evcc_mode_entity:{de:`Modus-Entität`,en:`Mode entity`},evcc_now_value:{de:`Wert für Sofortladen`,en:`Now-mode value`},hp_switch_entity:{de:`Schalter der Wärmepumpe`,en:`Heat-pump switch`},hp_service_on:{de:`Wärmepumpe einschalten`,en:`Turn heat pump on`},hp_service_off:{de:`Wärmepumpe ausschalten`,en:`Turn heat pump off`},hp_time_start:{de:`Frühester Start`,en:`Earliest start`},hp_time_end:{de:`Spätestes Ende`,en:`Latest end`},sizing_pv_energy_sensor:{de:`PV-Energie`,en:`PV energy`},sizing_house_energy_sensor:{de:`Hausenergie`,en:`House energy`},sizing_house_from_balance:{de:`Haus aus der Bilanz rechnen`,en:`Derive house from the balance`},sizing_grid_import_energy_sensor:{de:`Netzbezug`,en:`Grid import`},sizing_grid_export_energy_sensor:{de:`Einspeisung`,en:`Grid export`},sizing_battery_charge_energy_sensor:{de:`Akku geladen`,en:`Battery charged`},sizing_battery_discharge_energy_sensor:{de:`Akku entladen`,en:`Battery discharged`},sizing_wallbox_energy_sensor:{de:`Wallbox-Energie`,en:`Wallbox energy`},sizing_heat_pump_energy_sensor:{de:`Wärmepumpen-Energie`,en:`Heat-pump energy`},sizing_analysis_days:{de:`Analysetage`,en:`Analysis days`},sizing_electricity_price_eur_kwh:{de:`Bezugspreis`,en:`Import price`},sizing_feed_in_price_eur_kwh:{de:`Einspeisepreis`,en:`Feed-in price`},sizing_battery_price_eur_kwh:{de:`Akkupreis`,en:`Battery price`},sizing_pv_price_eur_per_kwp:{de:`PV-Preis`,en:`PV price`},sizing_inverter_upgrade_price_eur:{de:`Wechselrichter-Upgrade`,en:`Inverter upgrade`},sizing_round_trip_efficiency:{de:`Wirkungsgrad`,en:`Round-trip efficiency`},sizing_max_battery_sweep_kwh:{de:`Akku bis`,en:`Battery sweep up to`},sizing_battery_step_kwh:{de:`Akku-Schritt`,en:`Battery step`},sizing_max_pv_expansion_kwp:{de:`PV-Zubau bis`,en:`PV expansion up to`},sizing_pv_step_kwp:{de:`PV-Schritt`,en:`PV step`}},_s=(e,t)=>{let n=gs[t];return n?e.toLowerCase().startsWith(`de`)||!e?n.de:n.en:t},vs=e=>hs.filter(t=>t.area===e);function ys(e,t,n,r=40){let i=new Set(t??[]),a=n.trim().toLowerCase(),o=[];for(let t of e){let e=t.split(`.`)[0];if((!i.size||i.has(e))&&(!a||t.toLowerCase().includes(a))&&(o.push(t),o.length>=r))break}return o}function bs(e){if(!Array.isArray(e))return[];let t=[];for(let n of e){if(!n||typeof n!=`object`)continue;let e=n,r=Array.isArray(e.weekdays)?e.weekdays.filter(e=>typeof e==`number`&&e>=0&&e<=6):[],i=e.class_===`high`||e.class_===`low`||e.class_===`normal`?e.class_:`normal`,a={weekdays:r,start_h:typeof e.start_h==`number`?e.start_h:0,end_h:typeof e.end_h==`number`?e.end_h:24,class_:i};typeof e.min_reserve_soc==`number`&&(a.min_reserve_soc=e.min_reserve_soc),t.push(a)}return t}var xs=()=>({weekdays:[0,1,2,3,4],start_h:6,end_h:22,class_:`high`});function Ss(e){if(!e||typeof e!=`object`||Array.isArray(e))return{service:``,entity:``};let t=e,n=typeof t.action==`string`?t.action:typeof t.service==`string`?t.service:``,r=t.target,i=r&&typeof r==`object`&&!Array.isArray(r)?r.entity_id:void 0;return{service:n,entity:typeof i==`string`?i:``}}function Cs(e,t){let n=e.trim();if(!n)return null;let r=t.trim();return r?{action:n,target:{entity_id:r}}:{action:n}}function ws(e,t){return typeof e==`string`&&t.includes(e)?e:typeof e==`number`&&t.includes(String(e))?String(e):t[0]??``}function Ts(e){return typeof e==`string`&&/^\d{2}:\d{2}/.test(e)?e.slice(0,5):``}var Es=[{id:`off`,phases:[`off`],group:`system`,label:`ladderOff`},{id:`force`,phases:[`force_discharge`],group:`system`,label:`ladderForce`},{id:`emergency`,phases:[`emergency`],group:`safety`,label:`ladderEmergency`},{id:`feed`,phases:[`feed_in_limit`],group:`plant`,label:`ladderFeed`},{id:`reserve`,phases:[`reserve_protection`],group:`safety`,label:`ladderReserve`},{id:`evcc`,phases:[`evcc_pause`],group:`loads`,label:`ladderEvcc`},{id:`price`,phases:[`grid_charge`,`grid_hold`],group:`tariff`,label:`ladderPrice`},{id:`ht`,phases:[`ht_protection`],group:`tariff`,label:`ladderHt`},{id:`hold`,phases:[`grid_hold`],group:`tariff`,label:`ladderHold`},{id:`morning`,phases:[`morning_discharge`],group:`loads`,label:`ladderMorning`},{id:`cap`,phases:[`morning_cap`],group:`pv`,label:`ladderCap`},{id:`astro`,phases:[`astro_wait`],group:`pv`,label:`ladderAstro`},{id:`hard`,phases:[`hard_soc_limit`],group:`safety`,label:`ladderHard`},{id:`floor`,phases:[`fast_floor`],group:`pv`,label:`ladderFloor`},{id:`low`,phases:[`corridor`],group:`pv`,label:`ladderLow`},{id:`grid`,phases:[`grid_charge`],group:`tariff`,label:`ladderGrid`},{id:`corridor`,phases:[`corridor`,`pv_delay`],group:`pv`,label:`ladderCorridor`},{id:`spread`,phases:[`spreading`],group:`pv`,label:`ladderSpread`},{id:`curtail`,phases:[`curtailment_guard`],group:`pv`,label:`ladderCurtail`},{id:`idle`,phases:[`idle`],group:`pv`,label:`ladderIdle`}],Ds=[{id:`safety`,label:`ladderBandSafety`,steps:[`off`,`force`,`emergency`,`feed`,`reserve`]},{id:`tariff`,label:`ladderBandTariff`,steps:[`evcc`,`price`,`ht`,`hold`]},{id:`blocks`,label:`ladderBandBlocks`,steps:[`morning`,`cap`,`astro`,`hard`]},{id:`pv`,label:`ladderBandPv`,steps:[`floor`,`low`,`grid`,`corridor`,`spread`]},{id:`rest`,label:`ladderBandRest`,steps:[`curtail`,`idle`]}],Os=new Map(Es.map(e=>[e.id,e]));function ks(e,t=!1,n=!1){if(e)return e===`grid_charge`?t?`price`:`grid`:e===`grid_hold`?t?`price`:`hold`:e===`corridor`?n?`low`:`corridor`:Es.find(t=>t.phases.includes(e))?.id}function As(e,t,n,r,i){let{t:a}=e,o=ks(t,n,r);return R`<section id="regelleiter" class="ladder" aria-label=${a(`ladderTitle`)}>
    <div class="ladder-head">
      <h3>${a(`ladderTitle`)}</h3>
      <p>${a(`ladderHint`)}</p>
    </div>
    ${Ds.map(e=>R`<div class="ladder-band">
      <h4>${a(e.label)}</h4>
      <div class="ladder-steps">
        ${e.steps.map(e=>{let t=Os.get(e);if(!t)return R``;let n=e===o;return R`<button
            type="button"
            class="ladder-step ${n?`on`:``}"
            aria-current=${n?`true`:`false`}
            @click=${()=>i(t.group)}
          >${a(t.label)}</button>`})}
      </div>
    </div>`)}
  </section>`}var js=e=>!e||e===`unknown`||e===`unavailable`||e===`none`,Ms=e=>{let t=t=>{let n=Ue[t];return n?e.hass.states[n]:void 0},n=e.hass.states[W.ctrlActive],r=e.hass.states[W.phase]?.state,i=e.hass.states[W.explanation]?.state;return{ready:e.options.ready,options:e.options.options,slots:e.options.slots.length,state:t=>e.hass.states[t]?.state,on:e=>{let n=t(e);if(n&&n.state!==`unavailable`&&n.state!==`unknown`)return q(n)},number:e=>K(t(e)),select:e=>{let n=t(e)?.state;return js(n)?void 0:n},phase:js(r)?void 0:r,explanation:js(i)?void 0:i,regulation:!n||js(n.state)?void 0:n.state===`on`}},Ns={plant:{title:`setupPlant`,hint:`setupPlantHint`,done:`setupPlantOk`,open:`setupPlantMissing`},tariff:{title:`setupTariff`,hint:`setupTariffHint`,done:`setupTariffOk`,open:`setupTariffMissing`},forecast:{title:`setupForecast`,hint:`setupForecastHint`,done:`setupForecastOk`,open:`setupForecastOpen`},safety:{title:`setupSafety`,hint:`setupSafetyHint`,done:`setupSafetyOk`,open:`setupSafetyOpen`},loads:{title:`setupLoads`,hint:`setupLoadsHint`,done:`setupLoadsOk`,open:`setupLoadsOpen`},regulation:{title:`setupRegulation`,hint:`setupRegulationHint`,done:`setupRegulationOk`,open:`setupRegulationOff`},run:{title:`setupRun`,hint:`setupRunHint`,done:`setupRunOk`,open:`setupRunOff`}},Ps={done:`✓`,todo:`!`,optional:`·`,wait:`…`},Fs=(e,t)=>{let{t:n}=e.i18n;return t.status===`wait`?t.id===`run`?n(`setupRunWait`):n(`setupStatusWait`):t.status===`done`?t.note??n(Ns[t.id].done):t.id===`plant`&&t.missing.length?n(`setupPlantMissing`,{names:t.missing.map(t=>_s(e.hass.language,t)).join(`, `)}):n(Ns[t.id].open)},Is=(e,t)=>{let{t:n}=e.i18n,r=Ns[t.id],i=W.ctrlActive,a=e.hass.states[i]?.state===`on`,o=t.id===`regulation`?R`<button
          class="switch ${a?`on`:``}"
          role="switch"
          aria-checked=${a}
          aria-label=${n(r.title)}
          ?disabled=${e.pending.has(i)||!e.hass.states[i]}
          @click=${()=>e.onToggle(i)}
        ></button>`:t.area?R`<button type="button" class="btn" @click=${()=>e.onOpenGroup(t.area)}>${n(`setupOpen`)}</button>`:B;return R`<li class="setup-step ${t.status}">
    <span class="setup-mark ${t.status}" aria-hidden="true">${Ps[t.status]}</span>
    <div>
      <b>${n(r.title)}</b>
      <span class="tag">${n(t.status===`done`?`setupStatusDone`:t.status===`todo`?`setupStatusTodo`:t.status===`optional`?`setupStatusOptional`:`setupStatusWait`)}</span>
      <p>${n(r.hint)}</p>
      <p class="sub">${Fs(e,t)}</p>
    </div>
    ${o}
  </li>`},Ls=(e,t)=>{let{t:n}=e.i18n,r=t.filter(e=>e.required),i=r.filter(e=>e.status===`done`).length;return R`<p class="setup-progress">${n(`setupProgress`,{done:i,total:r.length})}</p>
    ${e.options.error?R`<p class="err">${n(`setupOptionsError`,{err:e.options.error})}</p>`:B}
    <ol class="setup-steps">
      ${t.map(t=>Is(e,t))}
    </ol>`};function Rs(e){return R`<div class="settings-detail">${Ls(e,as(Ms(e)))}</div>`}function zs(e){let{t}=e.i18n,n=as(Ms(e));return os(n)?e.setupAck?R``:R`<div class="setup-done">
      <button type="button" class="setup-done-open" @click=${()=>e.onOpenGroup(`setup`)}>
        <span class="setup-mark done" aria-hidden="true">✓</span>
        <span><b>${t(`setupDone`)}</b><span>${t(`setupDoneHint`)}</span></span>
      </button>
      <button type="button" class="btn" @click=${()=>e.onAckSetup?.()}>${t(`setupAck`)}</button>
    </div>`:R`<section class="card setup-card" aria-label=${t(`setupTitle`)}>
    <h2>${t(`setupTitle`)}</h2>
    <p class="sub">${t(`setupLead`)}</p>
    ${Ls(e,n)}
  </section>`}var Bs=e=>Object.keys(e.states).sort(),Vs=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},Hs=(e,t,n,r=!1,i=!1)=>R`<div class="${i?`setting-line stack`:`ctrl setting-row`} ${n&&!i?`locked`:``} ${r&&!i?`wide`:``}">
    <div class="txt"><span class="name"><b>${e}</b></span></div>
    ${t}
  </div>`;function Us(e,t,n){let r=e.options[t.key],i=typeof r==`number`?String(r):``;return t.unit===`%`&&t.min!==void 0&&t.max!==void 0?Qt({label:n,min:t.min,max:t.max,step:t.step??1,value:typeof r==`number`?r:t.min,unit:`%`,disabled:!e.isAdmin||e.pending.has(t.key),onCommit:n=>e.onChange(t.key,n)}):R`<label class="setting-num">
    <input
      type="number"
      inputmode="decimal"
      aria-label=${n}
      min=${t.min??B}
      max=${t.max??B}
      step=${t.step??`any`}
      ?disabled=${!e.isAdmin||e.pending.has(t.key)}
      ${Vt(e=>{e instanceof HTMLInputElement&&!Vs(e)&&e.value!==i&&(e.value=i)})}
      @change=${n=>{let r=Number.parseFloat(n.target.value);Number.isFinite(r)&&e.onChange(t.key,r)}}
    />
  </label>`}function Ws(e,t,n,r){let i=e.query[t.key]??``,a=i.trim()?ys(Bs(e.hass),t.domains,i):[],o=e.options[t.key],s=r?Array.isArray(o)?o.filter(e=>typeof e==`string`):typeof o==`string`&&o?[o]:[]:[],c=!r&&typeof o==`string`?o:``;return R`<div class="opt-entity">
    ${r?R`<div class="opt-chips">
          ${s.map(n=>R`<button type="button" class="chip" ?disabled=${!e.isAdmin} @click=${()=>e.onChange(t.key,s.filter(e=>e!==n))}>${n}</button>`)}
        </div>`:B}
    <input
      type="search"
      aria-label=${n}
      placeholder=${e.i18n.t(`optSearch`)}
      .value=${i||c}
      ?disabled=${!e.isAdmin}
      @input=${n=>e.onQuery(t.key,n.target.value)}
      @change=${n=>{let i=n.target.value.trim();r?(i&&!s.includes(i)&&e.onChange(t.key,[...s,i]),e.onQuery(t.key,``)):(i||!t.required)&&e.onChange(t.key,i||null)}}
    />
    ${a.length?R`<div class="opt-choices">
          ${a.map(n=>R`<button
              type="button"
              ?disabled=${!e.isAdmin}
              @click=${()=>{r?e.onChange(t.key,s.includes(n)?s:[...s,n]):e.onChange(t.key,n),e.onQuery(t.key,``)}}
            >${n}</button>`)}
        </div>`:B}
    ${!t.required&&!r&&c?R`<button type="button" class="btn" ?disabled=${!e.isAdmin} @click=${()=>e.onChange(t.key,null)}>${e.i18n.t(`optClear`)}</button>`:B}
  </div>`}function Gs(e,t){let n=Ss(e.options[t.key]),r=(n,r)=>e.onChange(t.key,Cs(n,r));return R`<div class="opt-action">
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
  </div>`}var Ks=[`wd0`,`wd1`,`wd2`,`wd3`,`wd4`,`wd5`,`wd6`];function qs(e){let{t}=e.i18n,n=(t,n)=>e.onSlots(e.slots.map((e,r)=>r===t?n:e));return R`<section class="settings-section">
    <h3>${t(`secSlots`)}</h3>
    <p class="sub">${t(`secSlotsHint`)}</p>
    ${e.slots.map((r,i)=>R`<div class="slot-card">
        <div class="opt-days" role="group" aria-label=${t(`optWeekdays`)}>
          ${Ks.map((a,o)=>R`<button
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
      <button type="button" class="btn" ?disabled=${!e.isAdmin} @click=${()=>e.onSlots([...e.slots,xs()])}>${t(`optAddSlot`)}</button>
      <button type="button" class="btn" ?disabled=${!e.isAdmin||e.pending.has(`tariff_slots`)} @click=${()=>e.onSaveSlots()}>${t(`optSaveSlots`)}</button>
    </div>
  </section>`}function Js(e,t,n=!1){let r=_s(e.hass.language,t.key),i=!e.isAdmin;if(t.kind===`bool`){let a=e.options[t.key]===!0;return Hs(r,R`<button class="switch ${a?`on`:``}" role="switch" aria-checked=${a} aria-label=${r} ?disabled=${i||e.pending.has(t.key)} @click=${()=>e.onChange(t.key,!a)}></button>`,i,!1,n)}if(t.kind===`number`)return Hs(r,Us(e,t,r),i,t.unit===`%`,n);if(t.kind===`select`){let a=t.choices??[],o=ws(e.options[t.key],a);return Hs(r,R`<select aria-label=${r} .value=${o} ?disabled=${i} @change=${n=>e.onChange(t.key,n.target.value)}>
        ${a.map(e=>R`<option value=${e} ?selected=${e===o}>${e}</option>`)}
      </select>`,i,!1,n)}if(t.kind===`time`)return Hs(r,R`<input type="time" aria-label=${r} .value=${Ts(e.options[t.key])} ?disabled=${i} @change=${n=>e.onChange(t.key,n.target.value)} />`,i,!1,n);if(t.kind===`text`){let a=typeof e.options[t.key]==`string`?e.options[t.key]:``,o=t.maxLength??64;return Hs(r,R`<input
        aria-label=${r}
        type=${t.secret?`password`:`text`}
        autocomplete=${t.secret?`off`:`on`}
        .value=${a}
        maxlength=${o}
        ?disabled=${i}
        @change=${n=>e.onChange(t.key,n.target.value)}
      />`,i,!1,n)}return t.kind===`action`?Hs(r,Gs(e,t),i,!0,n):Hs(r,Ws(e,t,r,t.kind===`entities`),i,!0,n)}var Ys=e=>!e||e.state===`unknown`||e.state===`unavailable`?`–`:e.state,Xs={recommended_economic:`recEconomicHint`,recommended_technical:`recTechnicalHint`,recommended_balanced:`recBalancedHint`},Zs=(e,t,n)=>typeof t==`number`&&Number.isFinite(t)?t.toLocaleString(e||`de`,{minimumFractionDigits:n,maximumFractionDigits:n}):void 0,Qs=(e,t,n)=>{let r=e.hass.states[W.sizingMatrix]?.attributes[t];if(!r||typeof r!=`object`)return R``;let i=r,a=(t,n,r)=>R`<div class="row"><span>${e.i18n.t(t)}</span><b>${n??`–`}${r}</b></div>`;return R`<div class="card">
    <h3>${e.i18n.t(n)}</h3>
    <p class="sub">${e.i18n.t(Xs[t])}</p>
    <div class="rows">
      ${a(`sizingBattery`,i.battery_kwh,` kWh`)}
      ${a(`sizingPv`,i.pv_kwp,` kWp`)}
      ${a(`sizingAutarky`,i.self_sufficiency_pct,` %`)}
      ${a(`sizingSavings`,i.savings_eur_per_year,` €`)}
      ${a(`sizingPayback`,i.payback_years,` a`)}
    </div>
    ${typeof i.reason==`string`?R`<p class="sub">${i.reason}</p>`:B}
  </div>`},$s=(e,t)=>{let n=e.hass.language,r=Zs(n,t.slider_battery_kwh,1),i=Zs(n,t.slider_pv_kwp,1),a=Zs(n,t.scenario_self_sufficiency_pct,0),o=Zs(n,t.scenario_savings_eur,0);if(!r||!i||!a||!o)return;let s=Zs(n,t.scenario_payback_years,1);return s?e.i18n.t(`sizingStory`,{bat:r,pv:i,aut:a,save:o,years:s}):e.i18n.t(`sizingStoryOpen`,{bat:r,pv:i,aut:a,save:o})};function ec(e,t,n){let{t:r}=e.i18n,i=e.hass.states[W.sizingStatus]?.state,a=r(i===`running`?`sizingRunning`:i===`ready`?`sizingReady`:`sizingNotRun`),o=e.hass.states[W.sizingScenario]?.attributes??{},s=e.hass.states[W.sizingMatrix]?.attributes??{},c=Array.isArray(s.top_savings_scenarios)?s.top_savings_scenarios:[],l=e=>typeof e==`number`&&Number.isFinite(e)?String(e):`–`,u=$s(e,o);return R`<div class="settings-detail">
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
        <button type="button" class="btn" ?disabled=${!e.hass.states[W.btnSizing]||i===`running`} @click=${()=>e.onRunSizing()}>${r(`sizingRun`)}</button>
        <span class="hint">${a}</span>
      </div>
    </section>
    <section class="settings-section">
      <h3>${r(`sizingScenario`)}</h3>
      <p class="sub">${u??r(`sizingNeedRun`)}</p>
      ${(()=>{let t=Ar(o.scenario_monthly_avoided_kwh),n=Ar(o.scenario_monthly_baseline_grid_in);return!t||!n?B:R`<maestro-chart .options=${za(`sizing-year`,[e.hass.language,t.join(`,`),n.join(`,`)],()=>jr(e.hass.language,t,n,r(`sizingChartAvoided`),r(`sizingChartBaseline`)))}></maestro-chart>
          <p class="hint">${r(`sizingChartCaption`)}</p>`})()}
      ${u?R`<div class="rows">
            <div class="row"><span>${r(`sizingAutarky`)}</span><b>${l(o.scenario_self_sufficiency_pct)} %</b></div>
            <div class="row"><span>${r(`sizingAvoided`)}</span><b>${l(o.scenario_avoided_kwh)} kWh</b></div>
            <div class="row"><span>${r(`sizingSavings`)}</span><b>${l(o.scenario_savings_eur)} €</b></div>
            <div class="row"><span>${r(`sizingInvestment`)}</span><b>${l(o.scenario_investment_eur)} €</b></div>
            <div class="row"><span>${r(`sizingPayback`)}</span><b>${l(o.scenario_payback_years)} a</b></div>
            <div class="row"><span>${r(`sizingInverter`)}</span><b>${Ys(e.hass.states[W.sizingInverter])}</b></div>
          </div>`:B}
    </section>
    <section class="settings-section">
      <h3>${r(`sizingRecs`)}</h3>
      <p class="sub">${r(`sizingRecsHint`)}</p>
      <div class="grid">${Qs(e,`recommended_economic`,`recEconomic`)}${Qs(e,`recommended_technical`,`recTechnical`)}${Qs(e,`recommended_balanced`,`recBalanced`)}</div>
      <div class="rows">
        <div class="row"><span>${r(`matrixDays`)}</span><b>${l(s.analysis_days)}</b></div>
        <div class="row"><span>${r(`matrixRecords`)}</span><b>${l(s.records_count)}</b></div>
        <div class="row"><span>${r(`matrixAnomaly`)}</span><b>${l(s.anomaly_rate_pct)} %</b></div>
        <div class="row"><span>${r(`sizingBaseline`)}</span><b>${l(s.baseline_grid_import_kwh)} kWh</b></div>
      </div>
      ${c.length?R`<div class="opt-top">
            ${c.map(e=>R`<div class="row"><span>${l(e.b)} kWh · ${l(e.p)} kWp</span><b>${l(e.savings)} €</b></div>`)}
          </div>`:B}
    </section>
    <section class="settings-section">
      <h3>${r(`sizingBasis`)}</h3>
      <p class="sub">${r(`sizingBasisHint`)}</p>
      ${n}
    </section>
    ${tc(e,`sizing`)}
  </div>`}function tc(e,t){let n=vs(t);if(!n.length&&t!==`tariff`)return R``;let{t:r}=e.i18n;return R`${e.notice?R`<p class="hint">${e.notice===`reload`?r(`optReload`):r(`optSaved`)}</p>`:B}
    ${e.error?R`<p class="err">${e.error}</p>`:B}
    ${e.isAdmin?B:R`<p class="hint">${r(`optAdmin`)}</p>`}
    ${n.map(t=>R`<section class="settings-section">
        <h3>${r(t.title)}</h3>
        <p class="sub">${r(t.hint)}</p>
        ${t.bundle?R`<div class="ctrl setting-bundle">${t.fields.map(t=>Js(e,t,!0))}</div>`:t.fields.map(t=>Js(e,t))}
      </section>`)}
    ${t===`tariff`?qs(e):B}`}var nc={grid_charge_strategy:{de:`Aus: nie aus dem Netz. Zeitfenster: in NT-Fenstern. Preisschwelle: unter einem festen Preis. Automatisch: der Preisplan wählt die günstigsten Stunden. Experte: wie automatisch, mit eigenen Werten.`,en:`Off: never from the grid. Time windows: in off-peak windows. Price threshold: below a fixed price. Automatic: the price plan picks the cheapest hours. Expert: like automatic, with your own values.`},inverter_power:{de:`Gesamte WR-Leistung der Anlage inkl. zusätzlicher Erzeuger. Begrenzt die Entladung und skaliert die Last-Balken im Haus-Fluss.`,en:`Total plant inverter power including additional producers. Caps discharge and scales the house-flow load bars.`},installed_kwp:{de:`Installierte PV-Leistung. Daraus vergleicht Maestro den Tagesertrag.`,en:`Installed PV power. Maestro compares the day's yield against this.`},max_charge_power:{de:`Höchste Ladeleistung, die Maestro anfordern darf.`,en:`Highest charge power Maestro may request.`},min_charge_power:{de:`Unter dieser Leistung startet Maestro keine Ladung.`,en:`Maestro does not start charging below this power.`},feed_in_limit_percent:{de:`Anteil der Wechselrichterleistung, der höchstens ins Netz gehen darf.`,en:`Share of inverter power that may be exported at most.`},charge_threshold:{de:`Unter diesem SoC lädt Maestro sofort aus dem Netz. 0 schaltet die Notladung aus.`,en:`Below this SoC Maestro charges from the grid at once. 0 turns emergency charging off.`},advanced_corridor:{de:`Übersetzt die fehlende Strecke zum Ziel in eine Ladeleistung zwischen unterem und oberem Korridor, in Watt.`,en:`Turns the gap to the target into a charge power between the lower and upper corridor, in watts.`},lower_corridor:{de:`Kleinste Ladeleistung im Korridor, in Watt. Darunter pausiert die Ladung, wenn die Pause an ist.`,en:`Lowest charge power in the corridor, in watts. Charging pauses below it while the pause is on.`},upper_corridor:{de:`Größte Ladeleistung im erweiterten Korridor, in Watt.`,en:`Highest charge power in the advanced corridor, in watts.`},charge_target:{de:`SoC, den der Akku bis zum Ladeende erreichen soll.`,en:`SoC the battery should reach by the end of charging.`},winter_minimum_hour:{de:`Frist fürs Tagesziel am kürzesten Tag. Danach lädt Überschuss weiter.`,en:`Deadline for the daily target on the shortest day. Surplus keeps charging after that.`},summer_maximum_hour:{de:`Wird von der Regelung nicht gelesen. Das Sommer-Ladeende steht im anderen Feld.`,en:`The control logic does not read this. The summer end of charging is the other field.`},summer_charge_end:{de:`Frist fürs Tagesziel am längsten Tag. Dazwischen nach Tageslänge.`,en:`Deadline for the daily target on the longest day. Other days fall in between by day length.`},hard_soc_limit_enabled:{de:`Harter Deckel: darüber lädt Maestro den Akku nicht weiter.`,en:`Hard cap: Maestro will not charge the battery above it.`},hard_soc_limit:{de:`SoC, der mit dem harten Deckel nicht überschritten wird.`,en:`SoC the hard cap will not go past.`},fast_charge_floor_enabled:{de:`Unter dem Boden lädt Maestro mit voller Leistung, unabhängig vom Korridor.`,en:`Below the floor Maestro charges at full power, ignoring the corridor.`},fast_charge_floor_soc:{de:`SoC, unter dem die Schnellladung greift.`,en:`SoC below which fast charging applies.`},forward_looking_enabled:{de:`Plant die Ladung aus dem erwarteten Verbrauch der nächsten Stunden.`,en:`Plans charging from the expected consumption of the next hours.`},forward_looking_max_soc:{de:`Obergrenze für die vorausschauende Ladung.`,en:`Cap for look-ahead charging.`},pv_forecast_enabled:{de:`Verschiebt die Ladung, wenn die PV-Prognose den Bedarf deckt.`,en:`Delays charging when the PV forecast covers the need.`},delay_min_soc:{de:`Unter diesem SoC verzögert weder die Prognose noch das Warten auf die Sonne die Ladung.`,en:`Below this SoC neither the forecast nor waiting for the sun delays charging.`},pv_forecast_threshold_kwh:{de:`Ab dieser prognostizierten Energiemenge gilt der Tag als ergiebig genug.`,en:`From this forecast energy the day counts as productive enough.`},pv_forecast_safety_factor:{de:`Die Prognose wird um diesen Faktor vorsichtiger gerechnet.`,en:`The forecast is treated this much more cautiously.`},astro_enabled:{de:`Richtet Ladestart und Ladeende an Sonnenauf- und Untergang aus.`,en:`Aligns charge start and end with sunrise and sunset.`},charge_start_sunrise_offset_h:{de:`Stunden nach Sonnenaufgang, ab denen geladen werden darf.`,en:`Hours after sunrise before charging may start.`},charge_end_sunset_offset_h:{de:`Stunden vor Sonnenuntergang, zu denen das Ladeende liegen soll.`,en:`Hours before sunset when charging should finish.`},morning_cap_enabled:{de:`Hält den SoC am Morgen unter einer Grenze, damit PV-Ertrag noch hineinpasst.`,en:`Keeps the morning SoC under a limit so PV yield still fits.`},morning_cap_soc:{de:`SoC, den der Morning-Cap am Morgen nicht überschreitet.`,en:`SoC the morning cap will not exceed.`},morning_cap_until_h:{de:`Lokale Stunde, bis zu der der Morning-Cap gilt.`,en:`Local hour until which the morning cap applies.`},gentle_charge_enabled:{de:`Lädt mit einem Bruchteil der möglichen Leistung, schonender für den Akku.`,en:`Charges at a fraction of the possible power, easier on the battery.`},gentle_charge_factor:{de:`Anteil der Ladeleistung im Schonmodus. 0,5 ist die Hälfte.`,en:`Share of charge power in gentle mode. 0.5 is half.`},spreading_enabled:{de:`Verteilt die Ladung über das Fenster, statt in einem Rutsch voll zu laden.`,en:`Spreads charging across the window instead of one full burst.`},spreading_target_soc:{de:`SoC, auf den die verteilte Ladung hinsteuert.`,en:`SoC the spread charging aims for.`},low_yield_priority_enabled:{de:`An ertragsarmen Tagen wird der Akku früher und höher geladen.`,en:`On low-yield days the battery is charged earlier and higher.`},low_yield_threshold:{de:`Unter diesem Anteil der Referenz gilt der Tag als ertragsarm.`,en:`Below this share of the reference the day counts as low yield.`},low_yield_reference_kwh:{de:`Feste Tagesreferenz in kWh. 0 übernimmt den automatischen Wert.`,en:`Fixed daily reference in kWh. 0 uses the automatic value.`},low_yield_reference_kwh_per_kwp:{de:`Erwartete kWh pro installiertem kWp für die automatische Referenz.`,en:`Expected kWh per installed kWp for the automatic reference.`},curtailment_guard_enabled:{de:`Lädt den Akku, sobald die Einspeisung an der Abregelgrenze kratzt.`,en:`Charges the battery once export nears the curtailment limit.`},curtailment_activation_w:{de:`Einspeiseleistung, ab der der Abregelschutz die Ladung startet.`,en:`Export power at which curtailment protection starts charging.`},curtailment_release_w:{de:`Unter dieser Einspeisung lässt der Abregelschutz wieder los.`,en:`Below this export, curtailment protection lets go again.`},two_tier_enabled:{de:`Lädt erst auf ein frühes Ziel und hebt es später am Tag an.`,en:`Charges to an early target first and raises it later in the day.`},charge_target_late:{de:`Höheres SoC-Ziel für den späteren Teil des Tages.`,en:`Higher SoC target for the later part of the day.`},late_charge_end_h:{de:`Stunde, ab der das spätere Ziel gilt.`,en:`Hour from which the later target applies.`},lower_corridor_pause_enabled:{de:`Pausiert die Mindestladung, solange der SoC im unteren Korridor liegt.`,en:`Pauses minimum charging while the SoC sits in the lower corridor.`},tariff_mode:{de:`Dein echter Vertrag. Fest: Kosten und PV-Ersparnis mit dem Bezugspreis; ein dynamischer Preis-Sensor erscheint daneben als Simulation. Dynamisch: Kosten und Ersparnis mit dem Preis-Sensor.`,en:`Your real contract. Fixed: cost and PV savings use the buy price; a dynamic price sensor shows beside them as a simulation. Dynamic: cost and savings use the price sensor.`},dynamic_tariff_enabled:{de:`Schaltet die Auswertung des dynamischen Preises für Regelung und Simulation ein.`,en:`Turns evaluation of the dynamic price on for control and simulation.`},fixed_buy_price:{de:`Echter Bezugspreis bei festem Tarif, in Euro pro kWh. Daraus werden die Hauptzahlen für Kosten und Ersparnis gerechnet.`,en:`Real buy price on a fixed tariff, in euros per kWh. Main cost and savings figures use this.`},feed_in_price:{de:`Vergütung pro eingespeister kWh. Der Preisplan rechnet sie gegen den Bezug.`,en:`Payment per exported kWh. The price plan weighs it against buying.`},battery_capex_eur:{de:`Anschaffungskosten des Akkus. Daraus rechnet der Preisplan den Verschleiß pro kWh.`,en:`Battery purchase cost. The price plan turns it into wear per kWh.`},battery_total_cycles:{de:`Erwartete Lebensdauer in Zyklen. Mehr Zyklen bedeuten weniger Verschleiß pro kWh.`,en:`Expected lifetime in cycles. More cycles mean less wear per kWh.`},cheap_threshold:{de:`Bis zu diesem Preis pro kWh gilt der Strom als günstig.`,en:`Up to this price per kWh the electricity counts as cheap.`},max_grid_charge_kwh:{de:`Sicherheitsgrenze: Nach so vielen kWh aus dem Netz an einem Tag stoppt die Netzladung. Die Menge selbst bestimmen Ziel und Prognose. 0 = keine Grenze.`,en:`Safety cap: grid charging stops after this many kWh from the grid in one day. Target and forecast decide the amount. 0 = no cap.`},low_slot_grid_charge_enabled:{de:`Lädt im günstigen Zeitfenster aktiv aus dem Netz, nicht nur per Preisplan.`,en:`Actively charges from the grid in the cheap window, not only via the price plan.`},low_slot_target_soc:{de:`SoC, bis zu dem im günstigen Fenster aus dem Netz geladen wird.`,en:`SoC up to which the cheap window charges from the grid.`},low_slot_forecast_based:{de:`Lädt so viel, wie der Akku bis zum nächsten günstigen Fenster braucht (Verbrauchs- und PV-Prognose, plus Reserve). Das Ziel ist dann nur die Obergrenze.`,en:`Charges what the battery needs until the next cheap window (consumption and PV forecast, plus reserve). The target is then only a cap.`},low_slot_hold_discharge:{de:`Sperrt die Entladung, sobald das Ziel im günstigen Fenster erreicht ist.`,en:`Blocks discharge once the cheap-window target is reached.`},price_plan_enabled:{de:`Berechnet den Plan und zeigt ihn. Der Akku wird davon noch nicht gesteuert.`,en:`Calculates the plan and shows it. It does not control the battery yet.`},price_plan_active:{de:`Setzt den Plan um: Netzladung in günstigen Slots und Halten der Entladung.`,en:`Executes the plan: grid charging in cheap slots and holding discharge.`},price_plan_max_soc:{de:`Der Plan lädt aus dem Netz höchstens bis zu diesem SoC.`,en:`The plan charges from the grid only up to this SoC.`},price_plan_min_spread:{de:`Mindestabstand zwischen günstigem und teurem Preis, damit sich Netzladung lohnt.`,en:`Minimum gap between cheap and expensive price for grid charging to pay off.`},price_plan_efficiency:{de:`Wirkungsgrad des Umwegs über den Akku. 0,9 heißt: 10 Prozent gehen verloren.`,en:`Round-trip efficiency. 0.9 means 10 percent is lost.`},price_plan_safety_factor:{de:`Maestro rechnet den Verbrauch um diesen Faktor höher, damit der Akku nicht leerläuft. Gilt für den Preisplan (Experte) und für die prognosebasierte Netzladung in Zeitfenstern und unter Preisschwelle.`,en:`Maestro assumes consumption this much higher so the battery does not run empty. Applies to the price plan (expert) and to forecast-based grid charging in time windows and below the price threshold.`},ht_enabled:{de:`Schützt den SoC im Hochtarif-Fenster vor Entladung.`,en:`Protects the SoC from discharge during the high-tariff window.`},ht_sat:{de:`Der Hochtarif-Schutz gilt auch am Samstag.`,en:`High-tariff protection also applies on Saturday.`},ht_sun:{de:`Der Hochtarif-Schutz gilt auch am Sonntag.`,en:`High-tariff protection also applies on Sunday.`},ht_on:{de:`Stunde, ab der das Hochtarif-Fenster gilt.`,en:`Hour when the high-tariff window starts.`},ht_off:{de:`Stunde, ab der das Hochtarif-Fenster endet.`,en:`Hour when the high-tariff window ends.`},ht_min:{de:`SoC, der im Hochtarif im Winter nicht unterschritten wird.`,en:`SoC that winter high-tariff hours will not go below.`},ht_sockel:{de:`SoC-Sockel zur Tag-und-Nacht-Gleiche, zwischen Winter- und Sommerwert.`,en:`SoC floor at the equinox, between the winter and summer values.`},seasonal_reserve_enabled:{de:`Die Notstromreserve folgt der Jahreszeit, höher im Winter, niedriger im Sommer.`,en:`The backup reserve follows the season, higher in winter, lower in summer.`},reserve_winter_percent:{de:`Notstromreserve zur Wintersonnenwende.`,en:`Backup reserve at the winter solstice.`},reserve_equinox_percent:{de:`Notstromreserve zur Tag-und-Nacht-Gleiche.`,en:`Backup reserve at the equinox.`},fixed_reserve_enabled:{de:`Ersetzt die saisonale Reserve durch einen festen SoC und lädt darunter aus dem Netz.`,en:`Replaces the seasonal reserve with a fixed SoC and charges from the grid below it.`},fixed_reserve_soc:{de:`Fester SoC der Notstromreserve. Darunter ist die Entladung gesperrt.`,en:`Fixed backup SoC. Discharge is blocked below it.`},adaptive_reserve_enabled:{de:`Hebt die Reserve anhand des Verbrauchs der letzten Tage an.`,en:`Raises the reserve from the consumption of recent days.`},evcc_enabled:{de:`Begrenzt die Entladung, während EVCC das Auto im Now-Modus lädt.`,en:`Limits discharge while EVCC charges the car in now mode.`},evcc_discharge_limit_w:{de:`Höchste Entladung in Watt, solange EVCC im Now-Modus lädt.`,en:`Highest discharge in watts while EVCC charges in now mode.`},wallbox_enabled:{de:`Maestro steuert den Ladestrom der Wallbox nach Überschuss.`,en:`Maestro controls the wallbox current from surplus.`},wallbox_type:{de:`Welche Wallbox Maestro anspricht. Die Leistungswerte hängen davon ab.`,en:`Which wallbox Maestro talks to. The power figures depend on it.`},wallbox_min_current:{de:`Niedrigster Ladestrom. Darunter schaltet Maestro die Wallbox aus.`,en:`Lowest charge current. Below it Maestro switches the wallbox off.`},wallbox_max_current:{de:`Höchster Ladestrom, den Maestro der Wallbox gibt.`,en:`Highest charge current Maestro gives the wallbox.`},wallbox_min_surplus:{de:`Überschuss, ab dem die Wallbox laden darf.`,en:`Surplus from which the wallbox may charge.`},wallbox_discharge_guard_enabled:{de:`Stoppt die Wallbox, wenn der Akku dafür zu stark entladen würde.`,en:`Stops the wallbox when it would discharge the battery too hard.`},wallbox_discharge_guard_threshold_w:{de:`Ab dieser Akku-Entladung greift der Netzschutz der Wallbox.`,en:`Wallbox grid protection starts at this battery discharge.`},hp_enabled:{de:`Gibt die Wärmepumpe nur bei Überschuss und passendem Preis frei.`,en:`Releases the heat pump only with surplus and a suitable price.`},hp_min_surplus:{de:`Überschuss, ab dem die Wärmepumpe laufen darf.`,en:`Surplus from which the heat pump may run.`},hp_max_price:{de:`Über diesem Strompreis bleibt die Wärmepumpe aus.`,en:`Above this electricity price the heat pump stays off.`},hp_min_run_minutes:{de:`Mindestlaufzeit, damit die Wärmepumpe nicht taktet.`,en:`Minimum runtime so the heat pump does not short-cycle.`},hp_min_pause_minutes:{de:`Mindestpause zwischen zwei Läufen der Wärmepumpe.`,en:`Minimum pause between two heat-pump runs.`},morning_discharge_mode:{de:`Wie der Akku vor dem PV-Tag geleert wird: aus, fest oder nach Preis.`,en:`How the battery is emptied before the PV day: off, fixed, or by price.`},morning_unload_soc:{de:`SoC, auf den die Vorentladung am Morgen hinuntergeht.`,en:`SoC the morning pre-discharge goes down to.`},morning_unload_start_soc:{de:`Erst oberhalb dieses SoC startet die Vorentladung.`,en:`Pre-discharge starts only above this SoC.`},pre_discharge_offset_h:{de:`Stunden vor dem Ladestart, ab denen vorentladen wird.`,en:`Hours before charge start when pre-discharge may begin.`},pre_discharge_max_power_w:{de:`Höchste Leistung der Vorentladung.`,en:`Highest power of the pre-discharge.`},pre_discharge_tibber_auto:{de:`Entlädt morgens nur, wenn der Strompreis unter der Tibber-Schwelle liegt.`,en:`Discharges in the morning only when the price is under the Tibber threshold.`},morning_grid_export_threshold:{de:`Unter diesem Preis darf die Vorentladung ins Netz gehen.`,en:`Below this price the pre-discharge may export to the grid.`},regelung_aktiv:{de:`Hauptschalter. Aus heißt: Maestro sendet keine Limits mehr. Beim Ausschalten wählst du 1, 3, 6, 12 oder 24 Stunden oder dauerhaft. Die Stellung und die restliche Zeit bleiben nach einem Neustart.`,en:`Master switch. Off means Maestro stops sending limits. Turning it off offers 1, 3, 6, 12 or 24 hours, or until turned on. The position and the time left survive a restart.`},auto_mode_enabled:{de:`Rechnet einmal täglich passende Regelparameter aus dem Verbrauchs- und PV-Verlauf aus. Braucht mindestens 7 Tage Daten.`,en:`Works out fitting control parameters once a day from consumption and PV history. Needs at least 7 days of data.`},auto_mode_objective:{de:`Worauf die Auto-Optimierung achtet: Eigenverbrauch, Kosten oder CO₂.`,en:`What the auto optimisation aims for: self-consumption, cost or CO₂.`},force_discharge:{de:`Entlädt den Akku mit der eingestellten Leistung, unabhängig vom Plan.`,en:`Discharges the battery at the set power, ignoring the plan.`},force_discharge_power_w:{de:`Leistung der erzwungenen Entladung in Watt.`,en:`Power of the forced discharge in watts.`},soc_hysteresis_percent:{de:`SoC-Änderung, die Maestro ignoriert, damit die Regelung nicht pendelt.`,en:`SoC change Maestro ignores so control does not hunt.`},charge_ramp_w_per_cycle:{de:`Wie schnell die Ladeleistung pro Takt ansteigen darf.`,en:`How fast charge power may rise per cycle.`},update_interval:{de:`Sekunden zwischen zwei Regel-Durchläufen. Standard 30 s, möglich 10–120 s.`,en:`Seconds between two control cycles. Default 30 s, range 10–120 s.`},watchdog_timeout:{de:`Nach diesen Sekunden ohne Kontakt hebt der Wechselrichter die Limits auf.`,en:`After these seconds without contact the inverter clears the limits.`},debug:{de:`Schreibt ausführliche Regelentscheidungen ins Log.`,en:`Writes detailed control decisions to the log.`},reset_stats:{de:`Setzt die Tageszähler zurück. Die Regelung selbst bleibt, wie sie ist.`,en:`Resets the daily counters. Control itself stays as it is.`},clear_limits:{de:`Hebt die gesetzten Lade- und Entladelimits am Wechselrichter sofort auf.`,en:`Clears the charge and discharge limits on the inverter immediately.`}},rc=(e,t)=>{let n=nc[t];if(n)return e.toLowerCase().startsWith(`de`)?n.de:n.en},ic,ac=new Set,oc=class extends we{constructor(...e){super(...e),this.text=``,this.label=`Hilfe`,this.open=!1,this.onOutside=e=>{e.composedPath().includes(this)||this.close()},this.onKey=e=>{e.key===`Escape`&&this.close()}}createRenderRoot(){return this}disconnectedCallback(){super.disconnectedCallback(),this.close()}toggle(e){if(e.preventDefault(),e.stopPropagation(),this.open)this.close();else{for(let e of ac)e!==this&&e.close();this.open=!0,ac.add(this),this.requestUpdate(),window.addEventListener(`pointerdown`,this.onOutside,!0),window.addEventListener(`keydown`,this.onKey)}}close(){window.removeEventListener(`pointerdown`,this.onOutside,!0),window.removeEventListener(`keydown`,this.onKey),ac.delete(this),this.open&&(this.open=!1,this.requestUpdate())}updated(){let e=this.querySelector(`.tip`);if(!(e instanceof HTMLElement))return;let t=this.getRootNode(),n=t instanceof ShadowRoot?t.host.getBoundingClientRect():{left:0,right:window.innerWidth,width:window.innerWidth};e.style.width=`${Math.min(280,n.width-24)}px`,e.style.transform=`translateY(-50%)`;let r=e.getBoundingClientRect(),i=0;r.right>n.right-12&&(i=n.right-12-r.right),r.left+i<n.left+12&&(i=n.left+12-r.left),e.style.transform=`translate(${i}px, -50%)`}render(){return R`<button
        type="button"
        class="info"
        aria-label=${this.label}
        aria-expanded=${this.open}
        @click=${this.toggle}
      >i</button>
      ${this.open?R`<div class="tip" role="tooltip">${this.text}</div>`:B}`}};ic=oc,ic.properties={text:{type:String},label:{type:String}},customElements.get(`maestro-setting-tip`)||customElements.define(`maestro-setting-tip`,oc);var sc=(e,t,n,r,i)=>({id:e,title:t,hint:n,icon:r,sections:i,rows:i.flatMap(e=>e.rows)}),cc=(e,t,n,r=!1)=>({title:e,hint:t,rows:n,...r?{fold:!0}:{}}),lc=[sc(`plant`,`setPlant`,`setPlantHint`,`<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/>`,[cc(`secPlantPower`,`secPlantPowerHint`,[`inverter_power`,`installed_kwp`,`max_charge_power`,`min_charge_power`,`feed_in_limit_percent`])]),sc(`safety`,`setSafety`,`setSafetyHint`,`<path d="M12 3 5 6v6c0 4.5 3 7 7 9 4-2 7-4.5 7-9V6z"/>`,[cc(`secEmergency`,`secEmergencyHint`,[`charge_threshold`]),cc(`secReserve`,`secReserveHint`,[`fixed_reserve_enabled`,`fixed_reserve_soc`,`seasonal_reserve_enabled`,`reserve_winter_percent`,`reserve_equinox_percent`,`adaptive_reserve_enabled`]),cc(`secHard`,`secHardHint`,[`hard_soc_limit_enabled`,`hard_soc_limit`]),cc(`secWatchdog`,`secWatchdogHint`,[`watchdog_timeout`])]),sc(`tariff`,`setTariff`,`setTariffHint`,`<path d="M12 3v18"/><path d="M16 7.5A3.2 3.2 0 0 0 12.8 5H10a2.8 2.8 0 0 0 0 5.6h4a2.8 2.8 0 0 1 0 5.6H9.5A3.2 3.2 0 0 1 7 13.5"/>`,[cc(`secStrategy`,`secStrategyHint`,[`grid_charge_strategy`,`price_plan_active`]),cc(`secLimits`,`secLimitsHint`,[`max_grid_charge_kwh`,`cheap_threshold`,`low_slot_target_soc`,`price_plan_max_soc`,`low_slot_forecast_based`,`price_plan_safety_factor`,`low_slot_hold_discharge`]),cc(`secPlanTune`,`secPlanTuneHint`,[`price_plan_min_spread`,`price_plan_efficiency`]),cc(`secHt`,`secHtHint`,[`ht_enabled`,`ht_on`,`ht_off`,`ht_min`,`ht_sockel`,`ht_sat`,`ht_sun`]),cc(`secCosts`,`secCostsHint`,[`fixed_buy_price`,`feed_in_price`,`battery_capex_eur`,`battery_total_cycles`]),cc(`secSwitches`,`secSwitchesHint`,[`tariff_mode`,`dynamic_tariff_enabled`,`low_slot_grid_charge_enabled`,`price_plan_enabled`])]),sc(`pv`,`setPv`,`setPvHint`,`<circle cx="12" cy="12" r="3.5"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>`,[cc(`secCorridor`,`secCorridorHint`,[`charge_target`,`two_tier_enabled`,`charge_target_late`,`late_charge_end_h`]),cc(`secWindows`,`secWindowsHint`,[`astro_enabled`,`charge_start_sunrise_offset_h`,`charge_end_sunset_offset_h`,`winter_minimum_hour`,`summer_charge_end`,`morning_cap_enabled`,`morning_cap_soc`,`morning_cap_until_h`]),cc(`secShape`,`secShapeHint`,[`fast_charge_floor_enabled`,`fast_charge_floor_soc`,`spreading_enabled`,`spreading_target_soc`,`gentle_charge_enabled`,`gentle_charge_factor`,`advanced_corridor`,`lower_corridor`,`upper_corridor`,`lower_corridor_pause_enabled`],!0),cc(`secYield`,`secYieldHint`,[`pv_forecast_enabled`,`delay_min_soc`,`pv_forecast_threshold_kwh`,`pv_forecast_safety_factor`,`forward_looking_enabled`,`forward_looking_max_soc`,`low_yield_priority_enabled`,`low_yield_threshold`,`low_yield_reference_kwh`,`low_yield_reference_kwh_per_kwp`,`curtailment_guard_enabled`,`curtailment_activation_w`,`curtailment_release_w`],!0)]),sc(`loads`,`setLoads`,`setLoadsHint`,`<path d="M9 7v4M15 7v4"/><path d="M8 11h8v2a4 4 0 0 1-8 0z"/><path d="M12 17v3"/>`,[cc(`secWallbox`,`secWallboxHint`,[`wallbox_enabled`,`wallbox_type`,`wallbox_min_current`,`wallbox_max_current`,`wallbox_min_surplus`,`wallbox_discharge_guard_enabled`,`wallbox_discharge_guard_threshold_w`]),cc(`secEvcc`,`secEvccHint`,[`evcc_enabled`,`evcc_discharge_limit_w`]),cc(`secHp`,`secHpHint`,[`hp_enabled`,`hp_min_surplus`,`hp_max_price`,`hp_min_run_minutes`,`hp_min_pause_minutes`]),cc(`secMorning`,`secMorningHint`,[`morning_discharge_mode`,`morning_unload_soc`,`morning_unload_start_soc`,`pre_discharge_offset_h`,`pre_discharge_max_power_w`,`pre_discharge_tibber_auto`,`morning_grid_export_threshold`])]),sc(`auto`,`setAuto`,`setAutoHint`,`<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="3"/>`,[cc(`secAuto`,`secAutoHint`,[`auto_mode_enabled`,`auto_mode_objective`])]),sc(`system`,`setSystem`,`setSystemHint`,`<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>`,[cc(`secRun`,`secRunHint`,[`regelung_aktiv`,`force_discharge`,`force_discharge_power_w`]),cc(`secPace`,`secPaceHint`,[`soc_hysteresis_percent`,`charge_ramp_w_per_cycle`,`update_interval`]),cc(`secDiag`,`secDiagHint`,[`debug`,`reset_stats`,`clear_limits`])])],uc={hardware:`plant`,corridor:`pv`,windows:`pv`,yield:`pv`,reserve:`safety`,flex:`loads`,control:`system`,diag:`system`},dc={reset_stats:`confirmReset`},fc={id:`classic`,title:`setClassic`,hint:`setClassicHint`,icon:`<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>`},pc={id:`energy`,title:`setEnergy`,hint:`setEnergyHint`,icon:`<path d="M13 2 4 14h7l-1 8 10-14h-7l1-6z"/>`},mc={id:`look`,title:`setLook`,hint:`setLookHint`,icon:`<circle cx="12" cy="12" r="4"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6"/>`},hc={id:`setup`,title:`setSetup`,hint:`setSetupHint`,icon:`<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>`},gc={id:`sizing`,title:`setSizing`,hint:`setSizingHint`,icon:`<path d="M4 19V5M4 19h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>`},_c=[`sizing_hypothetical_battery_kwh`,`sizing_hypothetical_pv_kwp`],vc=[`sizing_price_battery_kwh`,`sizing_price_pv_kwp`,`sizing_price_inverter`,`sizing_price_extra`],yc=e=>e===fc.id||e===pc.id||e===mc.id||e===gc.id||e===hc.id||lc.some(t=>t.id===e);function bc(e){if(!e)return;let t=uc[e]??e;return yc(t)?t:void 0}var xc=e=>e===fc.id?fc:e===pc.id?pc:e===mc.id?mc:e===gc.id?gc:e===hc.id?hc:lc.find(t=>t.id===e);function Sc(e,t,n,r){let i=e.trim().toLowerCase();if(!i)return;let a=[],o=new Set,s=e=>{o.has(e.id)||(o.add(e.id),a.push(e))},c=(...e)=>e.some(e=>!!e&&e.toLowerCase().includes(i)),l=[{id:hc.id,title:hc.title,hint:hc.hint},{id:mc.id,title:mc.title,hint:mc.hint},{id:gc.id,title:`setSizingTile`,hint:`setSizingTileHint`},{id:fc.id,title:fc.title,hint:fc.hint},{id:pc.id,title:pc.title,hint:pc.hint}];for(let e of l){let n=t(e.title),r=t(e.hint);c(n,r)&&s({id:`extra:${e.id}`,groupId:e.id,title:n,path:r})}for(let e of lc){let i=t(e.title),a=t(e.hint);c(i,a)&&s({id:`group:${e.id}`,groupId:e.id,title:i,path:a});for(let a of e.sections){let o=t(a.title),l=t(a.hint);c(o,l)&&s({id:`section:${e.id}/${a.title}`,groupId:e.id,title:o,path:`${i} · ${l}`});for(let t of a.rows){let a=r(t)||t.replaceAll(`_`,` `);c(a,rc(n,t),t.replaceAll(`_`,` `),t)&&s({id:`row:${e.id}/${t}`,groupId:e.id,title:a,path:`${i} · ${o}`})}}}for(let e of hs){let r=t(lc.find(t=>t.id===e.area)?.title??`setSizing`),i=t(e.title),a=t(e.hint);c(i,a)&&s({id:`optsec:${e.area}/${e.title}`,groupId:e.area===`sizing`?gc.id:e.area,title:i,path:`${r} · ${a}`});for(let t of e.fields){let a=_s(n,t.key);c(a,t.key.replaceAll(`_`,` `),t.key)&&s({id:`opt:${e.area}/${t.key}`,groupId:e.area===`sizing`?gc.id:e.area,title:a,path:`${r} · ${i}`})}}for(let e of[..._c,...vc]){let i=r(e)||e.replaceAll(`_`,` `);c(i,rc(n,e),e.replaceAll(`_`,` `),e)&&s({id:`sizing:${e}`,groupId:gc.id,title:i,path:t(`setSizing`)})}return a}var Cc=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},wc=(e,t)=>{let n=e?.attributes.friendly_name;return typeof n==`string`&&n.trim()?n.trim():t},Tc=e=>{let t=e?.attributes.unit_of_measurement;return typeof t==`string`?t:``},Ec=(e,t)=>{let n=e?.attributes[t];return typeof n==`number`&&Number.isFinite(n)?n:void 0};function Dc(e,t,n,r){let i=e.hass.states[t],a=q(i);return R`<button
    class="switch ${a?`on`:``}"
    role="switch"
    aria-checked=${a}
    aria-label=${n}
    ?disabled=${r||e.pending.has(t)}
    @click=${()=>e.onToggle(t)}
  ></button>`}function Oc(e,t,n,r,i){let a=K(n),o=a===void 0?``:String(a),s=Ec(n,`min`),c=Ec(n,`max`),l=Ec(n,`step`),u=Tc(n),d=u===`%`;return(n?.attributes.mode===`slider`||d)&&s!==void 0&&c!==void 0?Qt({label:r,min:s,max:c,step:l??1,value:a??s,unit:u,disabled:i||e.pending.has(t),onCommit:n=>e.onNumber(t,n)}):R`<label class="setting-num">
    <input
      type="number"
      inputmode="decimal"
      aria-label=${r}
      min=${s??B}
      max=${c??B}
      step=${l??`any`}
      ?disabled=${i||e.pending.has(t)}
      ${Vt(e=>{e instanceof HTMLInputElement&&!Cc(e)&&e.value!==o&&(e.value=o)})}
      @change=${n=>{let r=Number.parseFloat(n.target.value);Number.isFinite(r)&&e.onNumber(t,r)}}
    />
    ${u?R`<span>${u}</span>`:B}
  </label>`}function kc(e,t,n,r){let i=Array.isArray(n?.attributes.options)?n.attributes.options:[];return R`<select
    .value=${n?.state??``}
    aria-label=${wc(n,t)}
    ?disabled=${r||!i.length||e.pending.has(t)}
    @change=${n=>e.onSelect(t,n.target.value)}
  >
    ${i.map(t=>R`<option value=${t} ?selected=${t===n?.state}>${e.i18n.option(t)}</option>`)}
  </select>`}function Ac(e,t,n=!1,r=!1){let i=Ue[t];if(!i)return B;let a=e.hass.states[i],o=qe(t);if(!a&&!o)return B;let s=o||!a||a.state===`unavailable`,c=s||n,l=wc(a,t),u=i.split(`.`,1)[0],d=u===`switch`?Dc(e,i,l,c):u===`number`?Oc(e,i,a,l,c):u===`select`?kc(e,i,a,c):u===`button`?R`<button
                class="btn"
                ?disabled=${c||e.pending.has(i)}
                @click=${()=>{let n=dc[t];(!n||window.confirm(e.i18n.t(n)))&&e.onPress(i)}}
              >${l}</button>`:B,f=rc(e.hass.language,t),p=t===`regelung_aktiv`?Gt(e.i18n.t,a):void 0;return R`<div class="${r?`setting-line`:`ctrl setting-row`} ${r&&u===`number`?`stack`:``} ${s||n&&!r?`locked`:``}">
    <div class="txt">
      <span class="name"><b>${l}</b>${f?R`<maestro-setting-tip .text=${f} .label=${e.i18n.t(`settingHelp`)}></maestro-setting-tip>`:B}</span>
      ${p?R`<span>${p}</span>`:B}
      ${o?R`<span>${e.i18n.t(`entityDisabled`)}</span>`:B}
    </div>
    ${d}
  </div>`}var jc=(e,t)=>t.rows.some(t=>{let n=Ue[t];return!!n&&(!!e.hass.states[n]||qe(t))}),Mc=(e,t,n,r,i)=>R`<button type="button" class="settings-tile" @click=${()=>e.onOpenGroup(t)}>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${n}></svg>
  <b>${e.i18n.t(r)}</b>
  <span>${e.i18n.t(i)}</span>
</button>`;function Nc(e,t,n){let{t:r}=e.i18n,i=r(n===void 0?`classicDepVia`:n?`classicInstalled`:`classicMissing`);return R`<div class="dep"><b>${r(t)}</b><span class=${n===void 0?``:n?`ok`:`bad`}>${i}</span></div>`}function Pc(e){let{t}=e.i18n,n=e.classic,r=n?.state??`checking`,i=R`<button type="button" class="btn primary" @click=${()=>e.onOpenClassic()}>${t(`classicOpen`)}</button>`;if(r===`checking`)return R`<p>${t(`classicChecking`)}</p>`;if(r===`ours`)return R`<p class="ok">${t(`classicReady`)}</p>${i}`;if(r===`foreign`)return R`<p class="bad">${t(`classicForeign`)}</p>`;if(r===`error`)return R`<p class="bad">${t(`classicFailed`,{err:n?.error??``})}</p>
      <button type="button" class="btn" @click=${()=>e.onCheckClassic()}>${t(`classicRetry`)}</button>`;if(!e.isAdmin)return R`<p>${t(`classicAdminOnly`)}</p>`;let a=r===`creating`;return R`${r===`empty`?R`<p>${t(`classicEmpty`)}</p>`:B}
    <button type="button" class="btn primary" ?disabled=${a} @click=${()=>e.onCreateClassic()}>
      ${t(a?`classicCreating`:r===`empty`?`classicSetup`:`classicCreate`)}
    </button>`}function Fc(e){let{t}=e.i18n,n=[`classicStep1`,`classicStep2`,`classicStep3`,`classicStep4`,`classicStep5`],r=e.classic?.mushroom===!1||e.classic?.apex===!1;return R`<div class="guide">
    <p>${t(`classicLead`)}</p>
    <h3>${t(`classicDepsTitle`)}</h3>
    ${Nc(e,`classicDepMushroom`,e.classic?.mushroom)}
    ${Nc(e,`classicDepApex`,e.classic?.apex)}
    ${r?R`<p class="bad">${t(`classicDepsMissing`)}</p>`:B}
    <h3>${t(`classicActionTitle`)}</h3>
    <div class="classic-action">${Pc(e)}</div>
    <p>${t(`classicAfter`)}</p>
    <details>
      <summary>${t(`classicManual`)}</summary>
      <ol>${n.map(e=>R`<li>${t(e)}</li>`)}</ol>
      <p>${t(`classicHa`)}</p>
      <p>${t(`classicPath`)}</p>
      <p>${t(`classicTimeout`)}</p>
    </details>
  </div>`}var Ic=[{role:`solar`,label:`energyRoleSolar`},{role:`grid_from`,label:`energyRoleGridFrom`},{role:`grid_to`,label:`energyRoleGridTo`},{role:`battery_from`,label:`energyRoleBatteryFrom`},{role:`battery_to`,label:`energyRoleBatteryTo`},{role:`wallbox`,label:`energyRoleWallbox`}],Lc={options:`energyOriginOptions`,rscp:`energyOriginRscp`,maestro:`energyOriginMaestro`};function Rc(e){if(e===`ours`)return`energyReady`;if(e===`empty`)return`energyEmpty`;if(e===`partial`)return`energyPartial`;if(e===`foreign`)return`energyForeign`;if(e===`unavailable`)return`energyUnavailable`}function zc(e){let{t}=e.i18n,n=e.energy,r=n?.state??`checking`,i=R`<button type="button" class="btn primary" @click=${()=>e.onOpenEnergy()}>${t(`energyOpen`)}</button>`;if(r===`checking`)return R`<p>${t(`energyChecking`)}</p>`;if(r===`applying`)return R`<p>${t(`energyApplying`)}</p>`;if(r===`error`)return R`<p class="bad">${t(`energyFailed`,{err:n?.error??``})}</p>
      <button type="button" class="btn" @click=${()=>e.onCheckEnergy()}>${t(`energyRetry`)}</button>`;if(n?.energyReady===!1)return R`<p class="bad">${t(`energyNoComponent`)}</p>`;if(r===`ours`)return R`<p class="ok">${t(`energyReady`)}</p>${i}`;if(r===`unavailable`||!n?.ready)return R`<p class="bad">${t(`energyUnavailable`)}</p>
      <button type="button" class="btn" @click=${()=>e.onCheckEnergy()}>${t(`energyRetry`)}</button>`;if(!e.isAdmin)return R`<p>${t(`energyAdminOnly`)}</p>`;let a=Rc(r);return r===`empty`?R`${a?R`<p>${t(a)}</p>`:B}
      <button type="button" class="btn primary" @click=${()=>e.onApplyEnergy(`fill`)}>${t(`energyApply`)}</button>`:r===`partial`?R`${a?R`<p>${t(a)}</p>`:B}
      <div class="classic-action">
        <button type="button" class="btn primary" @click=${()=>e.onApplyEnergy(`fill`)}>${t(`energyFill`)}</button>
        <button type="button" class="btn" @click=${()=>e.onApplyEnergy(`replace`)}>${t(`energyReplace`)}</button>
      </div>`:R`${a?R`<p>${t(a)}</p>`:B}
    <button type="button" class="btn primary" @click=${()=>e.onApplyEnergy(`replace`)}>${t(`energyReplace`)}</button>`}function Bc(e){let{t}=e.i18n,n=e.energy?.sensors??{},r=e.energy?.missing??[],i=e.energy?.extraSolar??[],a=Object.values(n).some(e=>e.origin===`maestro`);return R`<div class="guide">
    <p>${t(`energyLead`)}</p>
    <h3>${t(`energySensorsTitle`)}</h3>
    ${Ic.map(({role:e,label:i})=>{let a=n[e];return a?R`<div class="dep"><b>${t(i)}</b><span class="ok">${a.entity_id} · ${t(Lc[a.origin])}</span></div>`:r.includes(e)?R`<div class="dep"><b>${t(i)}</b><span class="bad">${t(`energyMissing`)}</span></div>`:B})}
    ${a?R`<p class="hint">${t(`energyMaestroNote`)}</p>`:B}
    <h3>${t(`energyExtraTitle`)}</h3>
    <p class="hint">${t(`energyFremdHint`)}</p>
    ${i.length?R`<p>${t(`energyExtraKeep`)}</p>
          ${i.map(e=>R`<div class="dep"><b>Solar</b><span class="ok">${e}</span></div>`)}`:B}
    <h3>${t(`energyDevicesTitle`)}</h3>
    <p class="hint">${t(`energyDevicesHint`)}</p>
    ${e.energy?.wallboxPower?R`<p class=${e.energy.wallboxPower.available?`hint`:`bad`}>${t(e.energy.wallboxPower.available?`energyWallboxPowerOk`:`energyWallboxPowerMissing`)}
          <span class="ok"> ${e.energy.wallboxPower.entity_id}</span></p>`:B}
    ${(e.energy?.extraDevices??[]).length?R`<p>${t(`energyExtraDevicesKeep`)}</p>
          ${(e.energy?.extraDevices??[]).map(e=>R`<div class="dep"><b>${t(`energyDeviceRow`)}</b><span class="ok">${e}</span></div>`)}`:B}
    <h3>${t(`energyActionTitle`)}</h3>
    <div class="classic-action">${zc(e)}</div>
    <p>${t(`energyAfter`)}</p>
  </div>`}var Vc=[`off`,`slots`,`threshold`,`dynamic_auto`,`dynamic_expert`],Hc=e=>{let t=Ue.grid_charge_strategy,n=t?e.states[t]?.state:void 0;return Vc.find(e=>e===n)},Uc=e=>e===`dynamic_auto`||e===`dynamic_expert`,Wc=e=>e===`slots`||e===`threshold`,Gc={price_plan_active:e=>Uc(e.strategy),max_grid_charge_kwh:e=>e.strategy!==`off`,cheap_threshold:e=>e.strategy===`threshold`,low_slot_target_soc:e=>Wc(e.strategy),price_plan_max_soc:e=>Uc(e.strategy),low_slot_forecast_based:e=>Wc(e.strategy)&&e.expert,low_slot_hold_discharge:e=>Wc(e.strategy)&&e.expert,price_plan_min_spread:e=>e.strategy===`dynamic_expert`,price_plan_efficiency:e=>e.strategy===`dynamic_expert`,price_plan_safety_factor:e=>e.strategy===`dynamic_expert`||Wc(e.strategy)&&e.expert,tariff_mode:e=>e.expert,dynamic_tariff_enabled:e=>e.expert,low_slot_grid_charge_enabled:e=>e.expert,price_plan_enabled:e=>e.expert};function Kc(e,t){if(!t.strategy)return!0;let n=Gc[e];return!n||n({strategy:t.strategy,expert:t.expert})}var qc={charge_start_sunrise_offset_h:e=>e.astro!==!1,charge_end_sunset_offset_h:e=>e.astro!==!1,winter_minimum_hour:e=>e.astro!==!0,summer_charge_end:e=>e.astro!==!0,pv_forecast_threshold_kwh:e=>e.expert,pv_forecast_safety_factor:e=>e.expert,low_yield_threshold:e=>e.expert,low_yield_reference_kwh:e=>e.expert,low_yield_reference_kwh_per_kwp:e=>e.expert};function Jc(e,t){let n=qc[e];return!n||n(t)}var Yc={charge_target_late:[`two_tier_enabled`],late_charge_end_h:[`two_tier_enabled`],morning_cap_soc:[`morning_cap_enabled`],morning_cap_until_h:[`morning_cap_enabled`],fast_charge_floor_soc:[`fast_charge_floor_enabled`],spreading_target_soc:[`spreading_enabled`],gentle_charge_factor:[`gentle_charge_enabled`],upper_corridor:[`advanced_corridor`],lower_corridor:[`advanced_corridor`,`lower_corridor_pause_enabled`],delay_min_soc:[`pv_forecast_enabled`,`astro_enabled`],pv_forecast_threshold_kwh:[`pv_forecast_enabled`],pv_forecast_safety_factor:[`pv_forecast_enabled`],forward_looking_max_soc:[`forward_looking_enabled`],low_yield_threshold:[`low_yield_priority_enabled`],low_yield_reference_kwh:[`low_yield_priority_enabled`],low_yield_reference_kwh_per_kwp:[`low_yield_priority_enabled`],curtailment_activation_w:[`curtailment_guard_enabled`],curtailment_release_w:[`curtailment_guard_enabled`]};function Xc(e,t){let n=Yc[e];if(!n)return!1;let r=n.map(t);return!r.some(e=>e===void 0)&&r.every(e=>!e)}var Zc={fixed_reserve_enabled:[`fixed_reserve_soc`],seasonal_reserve_enabled:[`reserve_winter_percent`,`reserve_equinox_percent`],hard_soc_limit_enabled:[`hard_soc_limit`],ht_enabled:[`ht_on`,`ht_off`,`ht_min`,`ht_sockel`,`ht_sat`,`ht_sun`],two_tier_enabled:[`charge_target_late`,`late_charge_end_h`],astro_enabled:[`charge_start_sunrise_offset_h`,`charge_end_sunset_offset_h`],morning_cap_enabled:[`morning_cap_soc`,`morning_cap_until_h`],fast_charge_floor_enabled:[`fast_charge_floor_soc`],spreading_enabled:[`spreading_target_soc`],gentle_charge_enabled:[`gentle_charge_factor`],advanced_corridor:[`upper_corridor`],pv_forecast_enabled:[`delay_min_soc`,`pv_forecast_threshold_kwh`,`pv_forecast_safety_factor`],forward_looking_enabled:[`forward_looking_max_soc`],low_yield_priority_enabled:[`low_yield_threshold`,`low_yield_reference_kwh`,`low_yield_reference_kwh_per_kwp`],curtailment_guard_enabled:[`curtailment_activation_w`,`curtailment_release_w`],wallbox_enabled:[`wallbox_type`,`wallbox_min_current`,`wallbox_max_current`,`wallbox_min_surplus`],wallbox_discharge_guard_enabled:[`wallbox_discharge_guard_threshold_w`],evcc_enabled:[`evcc_discharge_limit_w`],hp_enabled:[`hp_min_surplus`,`hp_max_price`,`hp_min_run_minutes`,`hp_min_pause_minutes`],auto_mode_enabled:[`auto_mode_objective`],force_discharge:[`force_discharge_power_w`]};function Qc(e){let t=new Set(e),n=new Set;for(let[e,r]of Object.entries(Zc))if(t.has(e))for(let e of r)t.has(e)&&n.add(e);return e.filter(e=>!n.has(e)).map(e=>({key:e,children:(Zc[e]??[]).filter(e=>t.has(e))}))}var $c=(e,t)=>{let n=Ue[t],r=n?e.states[n]?.state:void 0;if(r===`on`)return!0;if(r===`off`)return!1};function el(e,t,n=()=>!1){return Qc(t).map(({key:t,children:r})=>{if(!r.length)return Ac(e,t,n(t));let i=$c(e.hass,t)===!1,a=e=>{let r=Yc[e];return r&&(r.length>1||r[0]!==t)?n(e):i||n(e)},o=r.every(a);return R`<div class="ctrl setting-bundle">
      ${Ac(e,t,!1,!0)}
      <div class="bundle-fields ${o?`quiet`:``}">
        ${r.map(t=>Ac(e,t,a(t),!0))}
      </div>
    </div>`})}var tl=(e,t)=>{let n=Ue[t],r=n?K(e.states[n]):void 0;if(r===void 0)return`–`;let i=Math.round(r*60),a=Math.floor(i/60)%24,o=(i%60+60)%60;return`${String(a).padStart(2,`0`)}:${String(o).padStart(2,`0`)}`},nl=(lc.find(e=>e.id===`tariff`)?.sections??[]).filter(e=>[`secStrategy`,`secLimits`,`secPlanTune`,`secSwitches`].includes(e.title)),rl=`e3dc-maestro.settings-expert`,il=`e3dc-maestro.plan-tune`;function al(){try{return localStorage.getItem(il)===`1`}catch{return!1}}function ol(e){try{localStorage.setItem(il,e?`1`:`0`)}catch{}}function sl(){try{return localStorage.getItem(rl)===`1`}catch{return!1}}function cl(e){try{localStorage.setItem(rl,e?`1`:`0`)}catch{}}var ll=`e3dc-maestro.pv-open`;function ul(){try{let e=localStorage.getItem(ll);if(!e)return new Set;let t=JSON.parse(e);return Array.isArray(t)?new Set(t.filter(e=>typeof e==`string`)):new Set}catch{return new Set}}function dl(e){try{localStorage.setItem(ll,JSON.stringify([...e]))}catch{}}var fl=(e,t,n=0)=>{let r=Ue[t],i=r?K(e.states[r]):void 0;return i===void 0?`–`:i.toLocaleString(e.language,{maximumFractionDigits:n})};function pl(e,t,n){let{t:r}=t,i=t=>$c(e,t)===!0;if(n===`secCorridor`){let t=fl(e,`charge_target`);return i(`two_tier_enabled`)?r(`sumTargetLate`,{soc:t,late:fl(e,`charge_target_late`),hour:tl(e,`late_charge_end_h`)}):r(`sumTarget`,{soc:t})}if(n===`secWindows`){let t=$c(e,`astro_enabled`)===!0?r(`sumWindowAstro`,{start:fl(e,`charge_start_sunrise_offset_h`,1),end:fl(e,`charge_end_sunset_offset_h`,1)}):r(`sumWindowHours`,{winter:tl(e,`winter_minimum_hour`),summer:tl(e,`summer_charge_end`)});return i(`morning_cap_enabled`)?`${t} ${r(`sumWindowCap`,{soc:fl(e,`morning_cap_soc`),hour:tl(e,`morning_cap_until_h`)})}`:t}if(n===`secShape`){let t=[];return i(`fast_charge_floor_enabled`)&&t.push(r(`sumPowerFloor`,{soc:fl(e,`fast_charge_floor_soc`)})),i(`spreading_enabled`)&&t.push(r(`sumPowerSpread`,{soc:fl(e,`spreading_target_soc`)})),i(`gentle_charge_enabled`)&&t.push(r(`sumPowerGentle`,{factor:fl(e,`gentle_charge_factor`,2)})),i(`advanced_corridor`)?t.push(r(`sumPowerCorridor`,{low:fl(e,`lower_corridor`),high:fl(e,`upper_corridor`)})):i(`lower_corridor_pause_enabled`)&&t.push(r(`sumPowerPause`,{low:fl(e,`lower_corridor`)})),t.length?t.join(` `):r(`sumPowerAuto`)}let a=[];return i(`pv_forecast_enabled`)&&a.push(r(`sumPvForecast`)),i(`forward_looking_enabled`)&&a.push(r(`sumPvForward`,{soc:fl(e,`forward_looking_max_soc`)})),i(`low_yield_priority_enabled`)&&a.push(r(`sumPvLow`)),i(`curtailment_guard_enabled`)&&a.push(r(`sumPvCurtail`)),a.length?a.join(` `):r(`sumPvNone`)}var ml=R`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>`;function hl(e,t){let{t:n}=e.i18n,r={astro:$c(e.hass,`astro_enabled`),expert:e.expert},i=t=>Xc(t,t=>$c(e.hass,t));return R`${_l(e)}
    ${t.map(t=>{let a=t.rows.filter(e=>Jc(e,r)),o=R`<div class="strategy-summary"><p>${pl(e.hass,e.i18n,t.title)}</p></div>`;if(!t.fold)return R`<section class="settings-section">
          <h3>${n(t.title)}</h3>
          <p class="sub">${n(t.hint)}</p>
          ${el(e,a,i)}
          ${o}
        </section>`;let s=e.pvOpen.has(t.title);return R`<section class="settings-section settings-fold">
        <button type="button" class="group-head ${s?`open`:``}" aria-expanded=${s} @click=${()=>e.onTogglePv(t.title)}>
          ${ml}
          <span>${n(t.title)}</span>
        </button>
        ${o}
        ${s?R`<p class="sub">${n(t.hint)}</p>${el(e,a,i)}`:B}
      </section>`})}`}function gl(e,t){let{t:n}=e.i18n,r=Ue.max_grid_charge_kwh,i=r?K(e.hass.states[r]):void 0,a=[];if(t===`off`&&a.push(n(`sumOff`)),t===`slots`&&(a.push(n(`sumSlots`,{soc:fl(e.hass,`low_slot_target_soc`)})),e.lowSlots===0&&a.push(n(`sumSlotsNone`))),t===`threshold`&&a.push(n(`sumThreshold`,{price:fl(e.hass,`cheap_threshold`,3),soc:fl(e.hass,`low_slot_target_soc`)})),t!==`off`&&i!==void 0&&i>0&&a.push(n(`sumCap`,{kwh:fl(e.hass,`max_grid_charge_kwh`,1)})),Uc(t)){a.push(n(`sumPlan`,{soc:fl(e.hass,`price_plan_max_soc`)})),a.push(n(t===`dynamic_auto`?`sumAuto`:`sumExpert`));let r=Ue.price_plan_active?q(e.hass.states[Ue.price_plan_active]):!1;a.push(n(r?`sumActive`:`sumShadow`))}return(t===`threshold`||Uc(t))&&e.priceSensor===!1&&a.push(n(`sumNoPrice`)),R`<div class="strategy-summary">${a.map(e=>R`<p>${e}</p>`)}</div>`}function _l(e){let{t}=e.i18n;return R`<div class="ctrl setting-row">
    <div class="txt"><span class="name"><b>${t(`expertView`)}</b></span><span>${t(`expertViewHint`)}</span></div>
    <button
      class="switch ${e.expert?`on`:``}"
      role="switch"
      aria-checked=${e.expert}
      aria-label=${t(`expertView`)}
      @click=${()=>e.onExpert(!e.expert)}
    ></button>
  </div>`}function vl(e,t,n){let{t:r}=e.i18n,i=Hc(e.hass),a={strategy:i,expert:e.expert};return t.flatMap(t=>{let o=t.rows.filter(e=>Kc(e,a)),s=t.title===`secStrategy`;return!o.length&&!s?[]:[R`<section class="settings-section">
        ${n?R`<h3>${r(t.title)}</h3><p class="sub">${r(t.hint)}</p>`:B}
        ${el(e,o)}
        ${s&&i?gl(e,i):B}
        ${s?_l(e):B}
      </section>`]})}function yl(e){let{t}=e.i18n,n=Hc(e.hass),r=e.planTuneOpen;return R`<div class="card plan-tune">
    <button
      type="button"
      class="group-head ${r?`open`:``}"
      aria-expanded=${r}
      @click=${()=>e.onTogglePlanTune()}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
      <span>${t(`planTune`)}</span>
      ${r||!n?B:R`<b class="group-sum">${e.i18n.option(n)}</b>`}
    </button>
    ${r?R`<p class="hint">${t(`planTuneHint`)}</p>
        ${vl(e,nl,!0)}`:B}
  </div>`}var bl=`E3DC Maestro Cockpit`;function xl(e){let{t}=e.i18n,n={dark:{title:`themeDark`,hint:`themeDarkHint`},classic:{title:`themeClassic`,hint:`themeClassicHint`},e3dc:{title:`themeE3dc`,hint:`themeE3dcHint`},oled:{title:`themeOled`,hint:`themeOledHint`},amber:{title:`themeAmber`,hint:`themeAmberHint`},leitstand:{title:`themeLeitstand`,hint:`themeLeitstandHint`},tibber:{title:`themeTibber`,hint:`themeTibberHint`}},r={nodes:{title:`flowStyleNodes`,hint:`flowStyleNodesHint`},blob:{title:`flowStyleBlob`,hint:`flowStyleBlobHint`},city:{title:`flowStyleCity`,hint:`flowStyleCityHint`}},i=!e.alertBannerHidden,a=typeof e.options.options.sidebar_title==`string`?e.options.options.sidebar_title:``,o=!e.options.isAdmin;return R`<p class="hint">${t(`setLookHint`)}</p>
  <p class="hint theme-preview-banner ${e.themePreviewing?`on`:``}" aria-live="polite">${e.themePreviewing?t(`themePreviewHint`):``}</p>
  <div class="theme-choices" role="radiogroup" aria-label=${t(`setLook`)}>
    ${Eo.map(r=>R`<button
        type="button"
        class="theme-choice ${e.theme===r?`on`:``}"
        role="radio"
        aria-checked=${e.theme===r}
        @pointerenter=${()=>e.onThemePreview(r)}
        @pointerleave=${()=>e.onThemePreview(void 0)}
        @focus=${()=>e.onThemePreview(r)}
        @blur=${()=>e.onThemePreview(void 0)}
        @click=${()=>e.onTheme(r)}
      >
        <span class="swatch ${r}" aria-hidden="true">
          <span class="swatch-rail"></span>
          <span class="swatch-stage">
            <span class="swatch-card"></span>
            <span class="swatch-bar"></span>
          </span>
        </span>
        <span class="txt"><b>${t(n[r].title)}</b><span>${t(n[r].hint)}</span></span>
      </button>`)}
  </div>
  <div class="look-row">
    <div class="txt"><b>${t(`lookMotion`)}</b><span>${t(`lookMotionHint`)}</span></div>
    <button
      class="switch ${e.motion?`on`:``}"
      role="switch"
      aria-checked=${e.motion}
      aria-label=${t(`lookMotion`)}
      @click=${()=>e.onMotion(!e.motion)}
    ></button>
  </div>
  <h3 class="look-flow-title">${t(`lookDensity`)}</h3>
  <p class="hint">${t(`lookDensityHint`)}</p>
  <div class="look-seg" role="radiogroup" aria-label=${t(`lookDensity`)}>
    ${go.map(n=>R`<button
        type="button"
        class=${e.density===n?`on`:``}
        role="radio"
        aria-checked=${e.density===n}
        @click=${()=>e.onDensity(n)}
      >${t({compact:`lookDensityCompact`,normal:`lookDensityNormal`,airy:`lookDensityAiry`}[n])}</button>`)}
  </div>
  <h3 class="look-flow-title">${t(`lookCorners`)}</h3>
  <p class="hint">${t(`lookCornersHint`)}</p>
  <div class="look-seg" role="radiogroup" aria-label=${t(`lookCorners`)}>
    ${_o.map(n=>R`<button
        type="button"
        class=${e.corners===n?`on`:``}
        role="radio"
        aria-checked=${e.corners===n}
        @click=${()=>e.onCorners(n)}
      >${t({auto:`lookCornersAuto`,soft:`lookCornersSoft`,medium:`lookCornersMedium`,sharp:`lookCornersSharp`}[n])}</button>`)}
  </div>
  <h3 class="look-flow-title">${t(`sidebarTitle`)}</h3>
  <p class="hint">${t(`sidebarTitleHint`)}</p>
  <div class="ctrl setting-row look-sidebar">
    <input
      type="text"
      aria-label=${t(`sidebarTitle`)}
      maxlength="40"
      placeholder=${bl}
      .value=${a}
      ?disabled=${o||e.pending.has(`sidebar_title`)}
      @change=${t=>{let n=t.target.value.trim();e.options.onChange(`sidebar_title`,n||null)}}
    />
  </div>
  <h3 class="look-flow-title">${t(`flowStyleTitle`)}</h3>
  <p class="hint">${t(`flowStyleHint`)}</p>
  <div class="theme-choices" role="radiogroup" aria-label=${t(`flowStyleLabel`)}>
    ${oi.map(n=>R`<button
        type="button"
        class="theme-choice ${e.flowStyle===n?`on`:``}"
        role="radio"
        aria-checked=${e.flowStyle===n}
        @click=${()=>e.onFlowStyle(n)}
      >
        <span class="swatch flow-${n}" aria-hidden="true"></span>
        <span class="txt"><b>${t(r[n].title)}</b><span>${t(r[n].hint)}</span></span>
      </button>`)}
  </div>
  <div class="ctrl setting-row look-banner">
    <div class="txt"><span class="name"><b>${t(`alertBannerShow`)}</b></span><span>${t(`alertBannerShowHint`)}</span></div>
    <button
      class="switch ${i?`on`:``}"
      role="switch"
      aria-checked=${i}
      aria-label=${t(`alertBannerShow`)}
      @click=${()=>e.onAlertBannerHidden(i)}
    ></button>
  </div>`}function Sl(e){let{t}=e.i18n;if(e.groupId===hc.id)return Rs(e);if(e.groupId===mc.id)return xl(e);if(e.groupId===fc.id)return Fc(e);if(e.groupId===pc.id)return Bc(e);if(e.groupId===gc.id)return ec(e.options,R`${_c.map(t=>Ac(e,t))}`,R`${vc.map(t=>Ac(e,t))}`);let n=lc.find(t=>t.id===e.groupId);if(n?.id===`pv`)return R`<div class="settings-detail">
      ${hl(e,n.sections)}
      ${tc(e.options,n.id)}
    </div>`;if(n?.id===`tariff`)return R`<div class="settings-detail">
      ${vl({...e,lowSlots:e.options.ready?e.options.slots.filter(e=>e.class_===`low`).length:void 0,priceSensor:e.options.ready?!!e.options.options.price_sensor:void 0},n.sections,!0)}
      ${tc(e.options,n.id)}
    </div>`;if(n)return R`<div class="settings-detail">
      ${n.sections.map(r=>R`<section class="settings-section">
          ${n.sections.length>1?R`<h3>${t(r.title)}</h3><p class="sub">${t(r.hint)}</p>`:B}
          ${el(e,r.rows)}
        </section>`)}
      ${tc(e.options,n.id)}
    </div>`;let r=Object.keys(Ue).length>0,i=e.hass.states[W.phase]?.state,a=Sc(e.settingsQuery,t,e.hass.language??`de`,t=>{let n=e.hass.states[Ue[t]];return n?wc(n,t):void 0}),o=t=>{e.onSettingsQuery(``),e.onOpenGroup(t)};return R`${As(e.i18n,i,q(e.hass.states[W.ctrlPlanControls]),q(e.hass.states[W.lowYield]),e.onOpenGroup)}
    <label class="settings-search">
      <span class="sr">${t(`settingsSearch`)}</span>
      <input
        class="settings-query"
        type="search"
        placeholder=${t(`settingsSearch`)}
        .value=${e.settingsQuery}
        @input=${t=>e.onSettingsQuery(t.target.value)}
      />
    </label>
    ${a?a.length?R`<div class="settings-hits" role="list">
            ${a.map(e=>R`<button type="button" class="settings-hit" role="listitem" @click=${()=>o(e.groupId)}>
                <b>${e.title}</b>
                <span>${e.path}</span>
              </button>`)}
          </div>`:R`<p class="hint">${t(`settingsSearchEmpty`)}</p>`:R`<div class="settings-tiles">
    ${Mc(e,hc.id,hc.icon,hc.title,hc.hint)}
    ${Mc(e,mc.id,mc.icon,mc.title,mc.hint)}
    ${Mc(e,gc.id,gc.icon,`setSizingTile`,`setSizingTileHint`)}
    ${Mc(e,fc.id,fc.icon,fc.title,fc.hint)}
    ${Mc(e,pc.id,pc.icon,pc.title,pc.hint)}
    ${r?lc.map(t=>jc(e,t)?Mc(e,t.id,t.icon,t.title,t.hint):B):R`<p class="hint">${t(`settingsPending`)}</p>`}
  </div>`}`}function Cl(e){return e===void 0||Math.abs(e)<.25?`idle`:e<0?`discharge`:`charge`}function wl(e,t=30){return e===void 0||Math.abs(e)<t?`idle`:e<0?`discharge`:`charge`}var Tl=e=>Math.max(0,Math.min(100,e));function El(e,t,n,r){let i=r?.mini?`mini`:r?.live?`live`:``,a=r?.reserve!==void 0&&Number.isFinite(r.reserve)?Tl(r.reserve):void 0,o=t===void 0?void 0:Tl(t),s=B;if(o!==void 0){if(a!==void 0&&a>0){let e=Math.min(o,a),t=Math.max(0,o-a);s=R`${t>.05?R`<div class="batt-fill" style="height:${t}%; bottom:${e}%"></div>`:B}
        ${e>.05?R`<div class="batt-fill batt-fill-reserve" style="height:${e}%"></div>`:B}`}else s=R`<div class="batt-fill" style="height:${o}%"></div>`}return R`<div class="batt ${n} ${i}" role="img" aria-label=${e}>
    <div class="batt-nub"></div>
    <div class="batt-body">
      ${a!==void 0&&a>0?R`<div class="batt-reserve-zone" style="height:${a}%" aria-hidden="true"></div>`:B}
      ${s}
      <div class="batt-cells" aria-hidden="true"></div>
    </div>
  </div>`}var Dl=e=>!e||e===`unknown`||e===`unavailable`;function Ol(e,t){if(!e||Dl(e.state))return`–`;let n=Number.parseFloat(e.state);if(!Number.isFinite(n))return e.state;let r=typeof e.attributes.unit_of_measurement==`string`?e.attributes.unit_of_measurement:``;if(r===`%`)return`${t.n(Math.abs(n)<.05?0:n,0)} %`;if(r===`W`)return(n<0?`−`:``)+t.w(n);let i=+(r===`kW`||r===`kWh`||r===`A`||r===`V`||r===`°C`);return r?`${t.n(n,i)} ${r}`:t.n(n,0)}function kl(e){if(!e||Dl(e.state))return;let t=Number.parseFloat(e.state);if(Number.isFinite(t))return(typeof e.attributes.unit_of_measurement==`string`?e.attributes.unit_of_measurement:``)===`%`&&Math.abs(t)<.05?0:t}function Al(e){let t=kl(e);if(t!==void 0)return(typeof e?.attributes.unit_of_measurement==`string`?e.attributes.unit_of_measurement:``)===`W`?t/1e3:t}var jl=864e5;function Ml(e,t=Date.now()){let n=e?.attributes.items;if(!Array.isArray(n)||n.length===0)return;let r=n[0];if(!r||typeof r!=`object`)return;let i=r.time;if(typeof i!=`number`||t-i>jl)return;let a=e?.attributes.latest_message;return typeof a==`string`&&a.trim()?a.trim():void 0}function Nl(e){return e===void 0||!Number.isFinite(e)?`idle`:e>=90?`soh-good`:e>=70?`soh-mid`:`soh-low`}function Pl(e,t,n){if(!(e===void 0||!Number.isFinite(e)||e<0)&&!(t===void 0||!(t>0)||n<1))return Math.min(100,e/(t/n)*100)}var Fl={0:`plantMode0`,1:`plantMode1`,2:`plantMode2`,3:`plantMode3`,4:`plantMode4`};function Il(e,t){if(!e||e===`unknown`||e===`unavailable`)return`–`;let n=Fl[e];return n?t(n):e}var Ll=(e,t)=>!e||Dl(e.state)?`–`:e.state===`on`?t(`plantOn`):e.state===`off`?t(`plantOff`):e.state,Rl=46,zl=2*Math.PI*Rl,Bl=e=>e.length?R`<div class="card"><div class="rows">${e.map(e=>R`<div class="row"><span>${e.label}</span><b>${e.value}</b></div>`)}</div></div>`:B,Vl=[`grid`,`battery`,`pv`,`wallbox`,`controls`],Hl={grid:{title:`plantRoomGrid`,hint:`plantRoomGridHint`,icon:`<path d="M4 8h16M4 16h16"/><path d="M8 4v16M16 4v16"/>`},battery:{title:`plantRoomBattery`,hint:`plantRoomBatteryHint`,icon:`<rect x="7" y="6" width="10" height="15" rx="2"/><path d="M10 4h4"/>`},pv:{title:`plantRoomPv`,hint:`plantRoomPvHint`,icon:`<circle cx="12" cy="12" r="4"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21"/>`},wallbox:{title:`plantRoomWallbox`,hint:`plantRoomWallboxHint`,icon:`<path d="M7 17V7a2 2 0 0 1 2-2h4l2 3h2a2 2 0 0 1 2 2v7"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>`},controls:{title:`plantRoomControls`,hint:`plantRoomControlsHint`,icon:`<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>`}},Ul=e=>!!e&&Vl.includes(e),Wl=e=>Ul(e)?Hl[e]:void 0,Gl=(e,t)=>t?e.hass.states[t]:void 0,Kl=(e,t)=>Ol(Gl(e,G.entities[t]),e.fmt),X=e=>e in G.entities,ql=(e,t,n,r)=>R`<div class="gauge ${r}">
    <div class="gauge-face">
      <svg viewBox="0 0 120 120" role="img" aria-label="${e}: ${t}">
        <circle class="gauge-track" cx="60" cy="60" r="${Rl}"></circle>
        <circle class="gauge-arc" cx="60" cy="60" r="${Rl}" stroke-dasharray="${(n===void 0?0:Math.max(0,Math.min(100,n)))/100*zl} ${zl}"></circle>
      </svg>
      <b>${t}</b>
    </div>
    <span>${e}</span>
  </div>`,Jl=Cl,Yl=(e,t,n,r=!1)=>El(e,t,n,{mini:r}),Xl=e=>e.length?R`<div class="card budget">${e.map(e=>R`<div class="budget-row">
          <span>${e.label}</span>
          <div class="track"><i class="${e.cls}" style="width:${Math.max(0,Math.min(100,e.pct))}%"></i></div>
          <b>${e.value}</b>
        </div>`)}</div>`:B;function Zl(e){let{t}=e.i18n;if(!(Object.keys(G.entities).length>0||G.packs.length>0||G.wallboxes.length>0))return R`<p class="empty">${t(`plantEmpty`)}</p>`;let n=[X(`powerValue`)?{label:t(`plantPower`),value:Kl(e,`powerValue`)}:null,X(`manualEnergy`)?{label:t(`plantManualEnergy`),value:Kl(e,`manualEnergy`)}:null].filter(e=>e!==null),r=[{key:`limitCharge`,label:t(`plantLimitCharge`),cls:`bat`},{key:`limitDischarge`,label:t(`plantLimitDischarge`),cls:`warn`},{key:`limitDischargeMin`,label:t(`plantLimitMin`),cls:`muted`}].map(t=>({...t,kw:X(t.key)?Al(Gl(e,G.entities[t.key])):void 0})),i=Math.max(0,...r.map(e=>Math.abs(e.kw??0))),a=Xl(r.filter(e=>e.kw!==void 0).map(t=>({label:t.label,value:Kl(e,t.key),pct:i>0?Math.abs(t.kw)/i*100:0,cls:t.cls}))),o=[{key:`limitsOn`,label:`plantLimits`},{key:`manualCharge`,label:`plantManual`},{key:`pvDerated`,label:`plantDerated`,warn:!0},{key:`emergencyPower`,label:`plantEmergency`,warn:!0},{key:`emergencyReserve`,label:`plantReserveHit`},{key:`rescueBattery`,label:`plantReserveOn`},{key:`weather`,label:`plantWeather`},{key:`weatherWait`,label:`plantWeatherWait`}].filter(e=>X(e.key)),s=t=>X(t)?Al(Gl(e,G.entities[t])):void 0,c=n=>{let r=n.map(e=>G.entities[e]).filter(e=>!!e);if(!r.length)return B;let i=n.flatMap((t,n)=>{let r=G.entities[t],i=r?e.phasePoints?.[r]:void 0;return i?.length?[{name:`L${n+1}`,points:i}]:[]}),a=e.phaseHistory??`idle`;if(!i.length&&a===`error`)return R`<p class="err">${t(`historyFailed`)}</p>`;if(!i.length&&a!==`ready`)return R`<p class="hint">${t(`loading`)}</p>`;if(!i.length)return R`<p class="hint">${t(`historyEmpty`)}</p>`;let o=i.map(e=>e.points[e.points.length-1]?.[0]??0).join(`,`),s=[`var(--accent)`,`var(--house)`,`var(--pv)`];return R`<div class="phase-legend">
        ${i.map((e,t)=>R`<span style="--swatch:${s[t]??s[0]}"><i></i>${e.name}</span>`)}
      </div>
      <maestro-chart
        class="phase-chart"
        .options=${za(`phase-${r.join(`,`)}`,[e.theme,e.fmt.loc,o],()=>Zr(i,e.fmt))}
      ></maestro-chart>`},l=(n,r,i)=>{if(!i.some(X))return B;let a=Math.max(.001,...i.map(e=>Math.abs(s(e)??0)));return R`<div class="card phase-gauges">
      <h3>${r}</h3>
      <div class="phase-gauge-row">
        ${i.map((t,r)=>{let i=s(t),o=i===void 0?void 0:Math.abs(i)/a*100,c=`${n}${i!==void 0&&i<0?` neg`:``}`;return ql(`L${r+1}`,X(t)?Kl(e,t):`–`,o,c)})}
      </div>
      <div class="phase-history">
        <div class="sub">${t(`historySub`)}</div>
        ${c(i)}
      </div>
    </div>`},u=l(`house`,t(`plantHouse`),[`houseL1`,`houseL2`,`houseL3`]),d=l(`grid`,t(`plantGrid`),[`gridL1`,`gridL2`,`gridL3`]),f=l(`pvi`,t(`plantInverter`),[`pviL1`,`pviL2`,`pviL3`]),p=[{key:`installedPeak`,label:t(`plantPeak`),cls:`pv`},{key:`acMax`,label:t(`plantAc`),cls:`house`},{key:`chargeMax`,label:t(`plantSysCharge`),cls:`bat`},{key:`dischargeMax`,label:t(`plantSysDischarge`),cls:`warn`},{key:`deratePower`,label:t(`plantDeratePower`),cls:`pv`},{key:`extraProduction`,label:t(`plantExtraPv`),cls:`pv`},{key:`extraConsumption`,label:t(`plantExtraUse`),cls:`house`}].map(t=>({...t,kw:X(t.key)?Al(Gl(e,G.entities[t.key])):void 0})),m=t=>{let n=p.filter(e=>t.includes(e.key)&&e.kw!==void 0),r=Math.max(0,...n.map(e=>Math.abs(e.kw)));return Xl(n.map(t=>({label:t.label,value:Kl(e,t.key),pct:r>0?Math.abs(t.kw)/r*100:0,cls:t.cls})))},h=X(`batteryCapacity`)?kl(Gl(e,G.entities.batteryCapacity)):void 0,g=(n,r,i)=>{let a=t=>Ol(Gl(e,r[t]),e.fmt),o=t=>kl(Gl(e,r[t])),s=Pl(r.energy?o(`energy`):void 0,h,G.packs.length),c=Jl(r.current?o(`current`):void 0),l=r.tempMin?o(`tempMin`):void 0,u=r.tempMax?o(`tempMax`):void 0,d=r.tempMin&&r.tempMax?`${a(`tempMin`)} – ${a(`tempMax`)}`:r.tempMin?a(`tempMin`):r.tempMax?a(`tempMax`):``,f=l??u,p=u??l,m=e=>Math.max(0,Math.min(100,e/50*100)),g=r.soh?o(`soh`):void 0,_=n||t(`plantPack`);return R`<article class="card pack">
      <div class="pack-visual">
        ${Yl(`${_}, ${r.energy?a(`energy`):``}`,s,c)}
        ${g===void 0?B:R`<b class="pack-soh">${a(`soh`)}</b><span>${t(`plantSoh`)}</span>`}
      </div>
      <div class="pack-stats">
        <h3>${_}</h3>
        ${r.energy?R`<div class="pack-energy">${a(`energy`)}</div><div class="pack-share">${t(s===void 0?`plantEnergy`:`plantShare`)}</div>`:B}
        <div class="pack-meta">
          ${r.current?R`<div><span>${t(`plantCurrent`)}</span><b class="${c}">${a(`current`)}</b></div>`:B}
          ${r.voltage?R`<div><span>${t(`plantVoltage`)}</span><b>${a(`voltage`)}</b></div>`:B}
          ${r.cycles?R`<div><span>${t(`plantCycles`)}</span><b>${a(`cycles`)}</b></div>`:B}
        </div>
        ${d?R`<div class="temp">
              <div class="temp-top"><span>${t(`plantTemp`)}</span><b>${d}</b></div>
              ${f!==void 0&&p!==void 0?R`<div class="temp-track"><i style="left:${m(Math.min(f,p))}%;width:${Math.max(4,m(Math.max(f,p))-m(Math.min(f,p)))}%"></i></div>`:B}
            </div>`:B}
      </div>
      ${i.length?R`<div class="cells">
            <span class="cells-label">${t(`plantCells`)}</span>
            ${i.map(n=>{let r=kl(Gl(e,n.entities.sohReported)),i=Ol(Gl(e,n.entities.sohReported),e.fmt);return R`<div class="cell">
                ${Yl(`${n.name}, ${i}`,r,Nl(r),!0)}
                <b>${i}</b>
                <span>${n.name||t(`plantCell`)}</span>
              </div>`})}
          </div>`:B}
    </article>`},_=(n,r)=>{let i=t=>Ol(Gl(e,r[t]),e.fmt),a=n=>Ll(Gl(e,r[n]),t),o=r.soc?kl(Gl(e,r.soc)):void 0,s=r.sun?Al(Gl(e,r.sun)):void 0,c=r.net?Al(Gl(e,r.net)):void 0,l=(s??0)+(c??0),u=[r.phases?{label:t(`plantPhaseCount`),value:i(`phases`)}:null,r.current?{label:t(`plantMaxCurrent`),value:i(`current`)}:null].filter(e=>e!==null);return R`<article class="card pack wall">
      ${o===void 0?B:R`<div class="pack-visual">${Yl(`${n||t(`plantWallbox`)}, ${i(`soc`)}`,o,r.charging&&Gl(e,r.charging)?.state===`on`?`charge`:`idle`)}<b class="pack-soh">${i(`soc`)}</b><span>${t(`plantCarSoc`)}</span></div>`}
      <div class="pack-stats">
        ${G.wallboxes.length>1?R`<h3>${n||t(`plantWallbox`)}</h3>`:B}
        <div class="plant-flags">
          ${r.plug?R`<span class="chip ${Gl(e,r.plug)?.state===`on`?`on`:``}"><i></i>${t(`plantPlug`)} ${a(`plug`)}</span>`:B}
          ${r.charging?R`<span class="chip ${Gl(e,r.charging)?.state===`on`?`on`:``}"><i></i>${t(`plantCharging`)} ${a(`charging`)}</span>`:B}
        </div>
        ${s!==void 0||c!==void 0?R`<div class="mix" title="${t(`plantSun`)} ${r.sun?i(`sun`):``} · ${t(`plantNet`)} ${r.net?i(`net`):``}">
              ${s===void 0?B:R`<i class="sun" style="width:${l>0?Math.abs(s)/l*100:0}%"></i>`}
              ${c===void 0?B:R`<i class="net" style="width:${l>0?Math.abs(c)/l*100:0}%"></i>`}
            </div>
            <div class="phase-legend">
              ${r.sun?R`<span><i class="pvi"></i>${t(`plantSun`)} ${i(`sun`)}</span>`:B}
              ${r.net?R`<span><i class="grid"></i>${t(`plantNet`)} ${i(`net`)}</span>`:B}
            </div>`:B}
        ${u.length?R`<div class="rows">${u.map(e=>R`<div class="row"><span>${e.label}</span><b>${e.value}</b></div>`)}</div>`:B}
      </div>
    </article>`},v=Gl(e,G.entities.mode)?.state,y=n=>{let r=o.filter(e=>n.includes(e.key));return r.length?R`<div class="plant-flags">${r.map(n=>R`<span class="chip ${Gl(e,G.entities[n.key])?.state===`on`?n.warn?`warn`:`on`:``}"><i></i>${t(n.label)}</span>`)}</div>`:B},b=(e,t)=>{let n=e?.attributes.friendly_name;return typeof n==`string`&&n.trim()?n.trim():t},ee=n=>{let r=Gl(e,n);if(!r)return B;let i=b(r,n),a=n.split(`.`,1)[0],o=r.state===`unavailable`||e.pending.has(n),s=typeof r.attributes.unit_of_measurement==`string`?r.attributes.unit_of_measurement:``,c=typeof r.attributes.min==`number`?r.attributes.min:void 0,l=typeof r.attributes.max==`number`?r.attributes.max:void 0,u=typeof r.attributes.step==`number`?r.attributes.step:1,d=s===`%`||r.attributes.mode===`slider`,f=a===`switch`?R`<button class="switch ${q(r)?`on`:``}" role="switch" aria-checked=${q(r)} aria-label=${i} ?disabled=${o} @click=${()=>e.onToggle(n)}></button>`:a===`number`&&d&&c!==void 0&&l!==void 0?Qt({label:i,min:c,max:l,step:u,value:K(r)??c,unit:s,disabled:o,onCommit:t=>e.onNumber(n,t)}):a===`number`?R`<label class="setting-num">
              <input
                type="number"
                inputmode="decimal"
                aria-label=${i}
                step=${typeof r.attributes.step==`number`?r.attributes.step:`any`}
                ?disabled=${o}
                ${Vt(e=>{let t=e?.getRootNode(),n=t instanceof ShadowRoot?t.activeElement:null;if(!(e instanceof HTMLInputElement)||e===n)return;let i=K(r),a=i===void 0?``:String(i);e.value!==a&&(e.value=a)})}
                @change=${t=>{let r=Number.parseFloat(t.target.value);Number.isFinite(r)&&e.onNumber(n,r)}}
              />
              ${typeof r.attributes.unit_of_measurement==`string`?R`<span>${r.attributes.unit_of_measurement}</span>`:B}
            </label>`:a===`button`?R`<button class="btn" ?disabled=${o} @click=${()=>{window.confirm(t(`plantSend`))&&e.onPress(n)}}>${i}</button>`:B;return R`<div class="ctrl setting-row ${d&&a===`number`?`wide`:``}"><div class="txt"><span class="name"><b>${i}</b></span></div>${f}</div>`},x=e=>{let t=Object.values(e??{}).map(e=>ee(e));return t.some(e=>e!==B)?R`<div class="card">${t}</div>`:B},S=G.identity??{},te=[S.model?{label:t(`plantModel`),value:S.model}:null,S.serial?{label:t(`plantSerial`),value:S.serial}:null,S.firmware?{label:t(`plantFirmware`),value:S.firmware}:null].filter(e=>e!==null),C=Ml(Gl(e,G.entities.errors)),w=R`<section class="card hero">
    <div class="hero-main">
      <div class="hero-mode" data-mode=${v??``}>
        <span>${t(`plantMode`)}</span>
        <b>${X(`mode`)?Il(v,t):`–`}</b>
      </div>
      <div class="hero-gauges">
        ${ql(t(`plantAutarky`),X(`autarky`)?Kl(e,`autarky`):`–`,X(`autarky`)?kl(Gl(e,G.entities.autarky)):void 0,`autarky`)}
        ${ql(t(`plantSelf`),X(`selfConsumption`)?Kl(e,`selfConsumption`):`–`,X(`selfConsumption`)?kl(Gl(e,G.entities.selfConsumption)):void 0,`self`)}
      </div>
    </div>
    ${te.length?R`<div class="hero-meta">${te.map(e=>R`<div><span>${e.label}</span><b>${e.value}</b></div>`)}</div>`:B}
    ${C?R`<p class="hero-fault" role="status">${t(`plantFault`)}: ${C}</p>`:B}
  </section>`,T=X(`batteryCapacity`)?[{label:t(`plantCapacity`),value:Kl(e,`batteryCapacity`)}]:[],ne=X(`deratePercent`)?[{label:t(`plantDeratePct`),value:Kl(e,`deratePercent`)}]:[],E={grid:{show:u!==B||d!==B||X(`extraConsumption`),body:R`${u}${d}${m([`extraConsumption`])}`},battery:{show:G.packs.length>0||a!==B||X(`chargeMax`)||X(`dischargeMax`)||X(`batteryCapacity`),body:R`${G.packs.length?R`<div class="plant-packs">${G.packs.map(e=>g(e.name,e.entities,e.modules??[]))}</div>`:B}${y([`manualCharge`,`emergencyPower`,`emergencyReserve`,`rescueBattery`])}${a}${m([`chargeMax`,`dischargeMax`])}${Bl(T)}`},pv:{show:f!==B||X(`installedPeak`)||X(`acMax`)||X(`deratePower`)||X(`deratePercent`)||X(`extraProduction`)||X(`pvDerated`),body:R`${f}${y([`pvDerated`])}${m([`installedPeak`,`acMax`,`deratePower`,`extraProduction`])}${Bl(ne)}`},wallbox:{show:G.wallboxes.length>0||Object.keys(G.controls?.wallbox??{}).length>0,body:R`${G.wallboxes.length?R`<div class="plant-packs">${G.wallboxes.map(e=>R`<div class="wall-stack">${_(e.name,e.entities)}${x(e.controls)}</div>`)}</div>`:B}${x(G.controls?.wallbox)}`},controls:{show:Object.keys(G.controls?.general??{}).length>0||X(`mode`)||n.length>0||X(`limitsOn`)||X(`weatherWait`),body:R`${x(G.controls?.general)}${y([`limitsOn`,`weatherWait`])}${Bl(n)}`}},D=Ul(e.groupId)?e.groupId:void 0;return D&&E[D].show?R`<div class="plant-body">${E[D].body}</div>`:R`${w}
    <div class="settings-tiles">
      ${Object.keys(E).filter(e=>E[e].show).map(n=>{let r=Hl[n];return R`<button type="button" class="settings-tile" @click=${()=>e.onOpenRoom(n)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${r.icon}></svg>
          <b>${t(r.title)}</b>
          <span>${t(r.hint)}</span>
        </button>`})}
    </div>`}var Ql=42,$l=34,eu=22,tu=20,nu=Ql,ru=$l,iu=34,au=26,ou=2.15,su={pv:`M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z`,grid:`M12 2 7 22M12 2l5 20M5 9h14M4 15h16`,house:`M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6`,bat:`M7 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM10 3h4`,load:`M4 12h16M12 4v16M7 7l10 10M17 7 7 17`},cu={"var(--pv)":`#9a3412`,"var(--pv-extra)":`#b45309`,"var(--house)":`#5b21b6`,"var(--grid-in)":`#b91c1c`,"var(--grid-out)":`#047857`,"var(--bat)":`#0e7490`,"var(--accent)":`#075985`},lu=(e,t)=>t?cu[e]??`#152033`:e,uu=(e,t=16)=>e.length<=t?e:`${e.slice(0,t-1)}…`;function du(e,t,n){let r=12*n;return`translate(${e-r} ${t-r}) scale(${n})`}var fu=(e,t)=>e.filter(e=>e.mode===t).reduce((e,t)=>e+Math.max(0,t.watts),0);function pu(e,t){return Math.max(0,e??0)+fu(t,`separate`)}function mu(e){return{included:e.filter(e=>e.mode===`included`),separate:e.filter(e=>e.mode===`separate`)}}function hu(e,t,n=120){if(t<=0)return[];if(t===1)return[{x:e.x+n,y:e.y}];let r=Math.min(200,36+t*34),i=e.y-r/2;return Array.from({length:t},(a,o)=>({x:e.x+n,y:i+o/(t-1)*r}))}function gu(e,t,n,r,i,a){let o=i[e];return o&&`dx`in o?{x:r.x+o.dx,y:r.y+o.dy}:a[t]??{x:r.x+120,y:r.y}}function _u(e,t,n){let r={x:e.x,y:e.y+88},i={x:e.x-98,y:e.y+195},a=Math.min(318,e.x+70),o=e.y+158,s=Array.from({length:t},(e,t)=>({x:a,y:o+t*46})),c=i.y+26+48,l=Array.from({length:n},(e,t)=>({x:a,y:c+t*46}));return{fork:r,house:i,separate:s,included:l,boxBottom:Math.max(i.y+26+56,s.at(-1)?.y??0,l.at(-1)?.y??0)+36}}function vu(e,t){let n={x:248,y:160},r=_u(n,e,t);return{load:n,...r,boxH:r.boxBottom}}function yu(e){let{load:t,loadR:n,fork:r,house:i,houseR:a,houseW:o,total:s,separate:c,included:l,boxW:u,motion:d,strokeOf:f}=e,p=u-14;return z`<path class="flow-line" d=${ca(t,r,n,4)} stroke="var(--house)"/>
    ${ba(t,r,n,4,s,`var(--house)`,d)}
    <circle cx=${r.x} cy=${r.y} r="4" fill=${f(`var(--house)`)} opacity="0.9"/>
    <path class="flow-line" d=${ca(r,i,4,a)} stroke="var(--house)"/>
    ${ba(r,i,4,a,o,`var(--house)`,d)}
    ${c.length?z`<path class="flow-line" d="M${r.x} ${r.y} L${p} ${r.y} L${p} ${c.at(-1).p.y}" stroke="var(--accent)"/>
        ${c.map(({c:e,p:t})=>{let n={x:t.x-16,y:t.y};return z`<path class="flow-line" d="M${p} ${t.y} L${n.x} ${n.y}" stroke="var(--accent)"/>
            ${ba({x:p,y:t.y},t,0,16,e.watts,`var(--accent)`,d)}`})}`:z``}
    ${wa(l,i,u,d,a)}`}function bu(e,t){return e?vu(0,t).boxH:t?Math.round(420+Math.max(0,t-3)*28):420}function xu(e){let{pv:t=0,house:n=0,grid:r=0,battery:i=0}=e,a=Math.max(0,t),o=Math.max(0,e.pvExtra??0),s=$i(o),c=e.motion!==!1,l=e.outline===!0,u=e=>lu(e,l),d=e.i18n.t,f=(e.consumers??[]).slice(0,6),{included:p,separate:m}=mu(f),h=pu(n,f),g=Math.max(0,n),_=e.compact,v=_?vu(m.length,p.length):null,y=_?$l:Ql,b=_?tu:eu,ee=s?ea(a,o):a,x=_?ru:nu,S=_?26:iu,te=_?16:au,C=_?{x:125,y:160}:{x:240,y:215},w=_?{x:125,y:55}:{x:240,y:95},T=ta(w,_,y,b),ne=_?{x:42,y:160}:{x:80,y:215},E=_?{x:125,y:275}:{x:240,y:335},D=v?v.load:{x:420,y:215},O=v?v.fork:null,k=_?360:760,A=e.consumerPlaces??{},re=Mi(A,[`__house__`,...f.map(e=>e.id)]),j=!(!v||re||e.arrange),M=v?v.house:{x:D.x+140,y:D.y-70},N=A.__house__&&`dx`in A.__house__?{x:D.x+A.__house__.dx,y:D.y+A.__house__.dy}:M,ie=v?v.separate:hu(D,m.length,140).map(e=>({x:e.x,y:e.y+55})),ae=v?v.included:hu(N,p.length,110),P=m.map((e,t)=>({c:e,p:gu(e.id,t,m.length,D,A,ie),from:D})),F=p.map((e,t)=>({c:e,p:gu(e.id,t,p.length,N,A,ae),from:N})),oe=[N,...P.map(({p:e})=>e),...F.map(({p:e})=>e)],I=k,se=v?v.boxH:bu(!1,f.length)??420,L=_&&j?{w:I,h:se}:Ii(oe,I,se),R=L.w,ce=L.h,B=Li({origin:D,radius:180,startAngle:-1,endAngle:1},Math.max(R,_?420:960),Math.max(ce,_?720:680)),le=Li({origin:N,radius:140,startAngle:-1,endAngle:1},Math.max(R,_?420:960),Math.max(ce,_?720:680)),V=[{key:`pv`,pos:w,color:`var(--pv)`,label:d(`nodePv`),value:ee,icon:su.pv},{key:`grid`,pos:ne,color:r<0?`var(--grid-in)`:`var(--grid-out)`,label:d(r<0?`nodeImport`:`nodeFeed`),value:r,icon:su.grid},{key:`bat`,pos:E,color:`var(--bat)`,label:d(i<0?`nodeBatDischarge`:`nodeBatCharge`),value:i,icon:su.bat}],H=x,ue=_?-52:70,de=_?48:70,fe=s?e.fmt.wParts(a,o):void 0,pe=[...V.map(t=>`${t.label} ${e.fmt.w(t.value)}`),...fe?[`${d(`nodePvExtra`)} ${fe.extra}`,`${d(`nodePvMain`)} ${fe.main}`]:[],`${d(`nodeLoad`)} ${e.fmt.w(h)}`,`${d(`nodeHouse`)} ${e.fmt.w(g)}`,...f.map(t=>`${t.name} ${e.fmt.w(t.watts)}`)].join(`, `),me=(t,n,r,i,a,o,s,c,d,f,p)=>{let m=Math.abs(a)<30,h=c<0,g=()=>{e.arrange||e.onSelect?.(t)},_=s>=iu?`node-val`:`node-val-sm`,v=s>=iu?`node-lbl`:`node-lbl-sm`;return z`<g class="flow-node ${d&&e.arrange?`arrange`:``}" opacity=${m?.55:1} role="button" tabindex="0" aria-label=${i}
      @click=${g}
      @keydown=${e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),g())}}
      @pointerdown=${d}
    >
      <circle cx=${n.x} cy=${n.y} r=${s} fill=${l?`none`:`rgba(10,16,30,.9)`} stroke=${u(r)} stroke-width=${l?`2.4`:`2`} filter=${m||l?`none`:`url(#glow)`}/>
      <g transform=${du(n.x,n.y,s>=$l?qi(s):Gi(s))} fill="none" stroke=${u(r)} stroke-width=${ou} stroke-linecap="round" stroke-linejoin="round">
        <path d=${o} vector-effect="non-scaling-stroke"/>
      </g>
      <text class=${_} x=${n.x} y=${n.y+c} text-anchor="middle">${p??e.fmt.w(a)}</text>
      <text class=${v} x=${n.x} y=${n.y+c+(h?19:16)} text-anchor="middle">${uu(i,18)}</text>
      ${f?z`<text class="node-lbl-sm" x=${n.x} y=${ra(n.y,s)} text-anchor="middle">${f}</text>`:z``}
    </g>`},he=(t,n,r,i)=>{let a=ya(t,30),o=dt(e.fmt,t.watts,t.soc),s=[t.name,o,t.plugged===!0?e.i18n.t(`plantPlug`):void 0].filter(Boolean).join(`, `),c=()=>{e.arrange||e.onSelect?.(t.id)};return z`<g class="flow-node ${i&&e.arrange?`arrange`:``}" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${s}
      @click=${c}
      @keydown=${e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),c())}}
      @pointerdown=${i}
    >
      <circle cx=${n.x} cy=${n.y} r=${16} fill=${l?`none`:`rgba(10,16,30,.9)`} stroke=${u(r)} stroke-width=${l?`2.2`:`2`}/>
      <g transform=${du(n.x,n.y,Gi(16))} fill="none" stroke=${u(r)} stroke-width=${ou} stroke-linecap="round" stroke-linejoin="round">
        ${va(t,r,l)}
      </g>
      <text font-size="14" font-weight="700" fill="var(--text)" x=${n.x-26} y=${n.y+5} text-anchor="end">${o}  ${uu(t.name,24)}</text>
    </g>`},ge=(t,n,r,i,a,o)=>{let s=ya(t,30),d=dt(e.fmt,t.watts,t.soc),f=[t.name,d,t.plugged===!0?e.i18n.t(`plantPlug`):void 0].filter(Boolean).join(`, `),p=()=>{e.arrange||e.onSelect?.(t.id)},m=n=>zi(n,t.id,a,e.arrange,e.onPlaceConsumer,o);return _?he(t,n,i,e.arrange?m:void 0):z`<path class="flow-line" d=${ca(r,n,r===D?x:S,te)} stroke=${i}/>
      ${ba(r,n,r===D?x:S,te,t.watts,i,c)}
      <g class="flow-node ${e.arrange?`arrange`:``}" opacity=${s?.55:1} role="button" tabindex="0" aria-label=${f}
        @click=${p}
        @keydown=${e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),p())}}
        @pointerdown=${m}
      >
        <circle cx=${n.x} cy=${n.y} r=${au} fill=${l?`none`:`rgba(10,16,30,.9)`} stroke=${u(i)} stroke-width=${l?`2.4`:`2`} filter=${s||l?`none`:`url(#glow)`}/>
        <g transform=${du(n.x,n.y,Gi(au))} fill="none" stroke=${u(i)} stroke-width=${ou} stroke-linecap="round" stroke-linejoin="round">
          ${va(t,i,l)}
        </g>
        <text class="node-val-sm" x=${n.x+34} y=${n.y-2} text-anchor="start">${d}</text>
        <text class="node-lbl-sm" x=${n.x+34} y=${n.y+14} text-anchor="start">${uu(t.name,18)}</text>
      </g>`},_e=e.arrange?t=>zi(t,`__house__`,D,e.arrange,e.onPlaceConsumer,B):void 0,ve=j&&O?yu({load:D,loadR:x,fork:O,house:N,houseR:S,houseW:g,total:h,separate:P,included:F,boxW:R,motion:c,strokeOf:u}):z``,ye=z`<path class="flow-line" d=${ca(D,N,x,S)} stroke="var(--house)"/>
    ${ba(D,N,x,S,g,`var(--house)`,c)}
    ${P.map(({c:e,p:t})=>z`<path class="flow-line" d=${ca(D,t,x,te)} stroke="var(--accent)"/>
        ${ba(D,t,x,te,e.watts,`var(--accent)`,c)}`)}
    ${F.map(({c:e,p:t})=>z`<path class="flow-line" d=${ca(N,t,S,te)} stroke="var(--house)"/>
        ${ba(N,t,S,te,e.watts,`var(--house)`,c)}`)}`;return z`<svg viewBox="0 0 ${R} ${ce}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${pe}>
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    ${V.map(e=>z`<path class="flow-line" d=${ca(e.pos,C,e.r??y,H)} stroke=${e.color}/>`)}
    ${s?z`<path class="flow-line" d=${ca({x:T.x,y:T.y},w,b,y)} stroke="var(--pv-extra)" opacity="0.55"/>`:z``}
    <path class="flow-line" d=${ca(C,D,H,x)} stroke="var(--house)"/>
    ${j?ve:_?ye:z`<path class="flow-line" d=${ca(D,N,x,S)} stroke="var(--house)"/>
          ${ba(D,N,x,S,g,`var(--house)`,c)}`}

    ${V.map(e=>{let t=e.r??y,n=e.key===`pv`&&ee>30||e.key===`bat`&&i<-30||e.key===`grid`&&r<-30,a=e.key===`bat`&&i>30||e.key===`grid`&&r>30;return n?ba(e.pos,C,t,H,e.value,e.color,c):a?ba(C,e.pos,H,t,e.value,e.color,c):z``})}
    ${s?ba({x:T.x,y:T.y},w,b,y,o,`var(--pv-extra)`,c):z``}
    ${ba(C,D,H,x,h,`var(--house)`,c)}

    <image href=${Bi} x=${C.x-H} y=${C.y-H} width=${H*2} height=${H*2} aria-label="Maestro"/>
    ${V.map(e=>me(e.key,e.pos,e.color,e.label,e.value,e.icon,e.r??y,e.key===`pv`?_?-52:-72:de,void 0,e.key===`pv`&&fe?na(d(`nodePvExtra`),d(`nodePvMain`),fe):void 0,e.key===`pv`?fe?.total:void 0))}
    ${s?z`<g class="flow-node" opacity=${o>30?1:.55} role="button" tabindex="0" aria-label=${d(`nodePvExtra`)}
          @click=${()=>{e.arrange||e.onSelect?.(`pvExtra`)}}
          @keydown=${t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),e.arrange||e.onSelect?.(`pvExtra`))}}
        >
          <circle cx=${T.x} cy=${T.y} r=${b} fill=${l?`none`:`rgba(10,16,30,.9)`} stroke=${u(`var(--pv-extra)`)} stroke-width=${l?`2.4`:`2`} filter=${o>30&&!l?`url(#glow)`:`none`}/>
          <g transform=${du(T.x,T.y,qi(b))} fill="none" stroke=${u(`var(--pv-extra)`)} stroke-width=${ou} stroke-linecap="round" stroke-linejoin="round">
            <path d=${su.pv} vector-effect="non-scaling-stroke"/>
          </g>
        </g>`:z``}
    ${me(`load`,D,`var(--house)`,d(`nodeLoad`),h,su.load,x,ue)}
    ${me(`house`,N,`var(--house)`,d(`nodeHouse`),g,su.house,S,_?42:58,_e)}
    ${P.map(({c:e,p:t})=>ge(e,t,D,`var(--accent)`,D,B))}
    ${F.map(({c:e,p:t})=>ge(e,t,N,`var(--house)`,N,le))}
  </svg>`}var Su={pv:`M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z`,grid:`M12 2 7 22M12 2l5 20M5 9h14M4 15h16`,house:`M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6`,bat:`M7 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM10 3h4`,load:`M4 12h16M12 4v16M7 7l10 10M17 7 7 17`},Cu=24,wu=2.15,Tu=30,Eu=26,Du=16,Ou=5500,ku=72,Au=52,ju=48,Mu=72,Nu={wide:{box:[600,420],hub:{x:300,y:215},pv:{x:300,y:88,labelDy:-58},grid:{x:78,y:215,labelDy:70},house:{x:522,y:215,labelDy:70},bat:{x:300,y:342,labelDy:58}},compact:{box:[360,600],hub:{x:180,y:255},pv:{x:180,y:100,labelDy:-56},grid:{x:72,y:255,labelDy:58},house:{x:288,y:255,labelDy:58},bat:{x:180,y:430,labelDy:52}}},Pu={"var(--pv)":`#9a3412`,"var(--pv-extra)":`#b45309`,"var(--house)":`#5b21b6`,"var(--grid-in)":`#b91c1c`,"var(--grid-out)":`#047857`,"var(--bat)":`#0e7490`,"var(--accent)":`#075985`},Fu=(e,t)=>t?Pu[e]??`#152033`:e;function Iu(e,t,n){let r=Cu/2*n;return`translate(${e-r} ${t-r}) scale(${n})`}function Lu(e,t){let n=Xi(e);return z`<clipPath id="blob-batbody"><rect x="6.6" y="7.6" width="10.8" height="10.8" rx="1.3"/></clipPath>
    ${n?z`<rect clip-path="url(#blob-batbody)" x=${n.x} y=${n.y} width=${n.width} height=${n.height+1} fill=${t} stroke="none" opacity="0.78"/>`:z``}
    <path d=${Su.bat} vector-effect="non-scaling-stroke"/>`}var Ru=(e,t=16)=>e.length<=t?e:`${e.slice(0,t-1)}…`;function zu(e,t){return e>0?1-Math.min(1,Math.max(0,-t)/e):+(t>=0)}function Bu(e,t){return(t?Au:ku)*(.88+.22*Math.min(1,Math.abs(e)/Ou))}function Vu(e){let t=e=>Math.min(1,Math.abs(e)/Ou),n=[{angle:-Math.PI/2,strength:t(e.pv+Math.max(0,e.pvExtra??0))},{angle:Math.PI,strength:t(e.grid)},{angle:0,strength:t(e.house)},{angle:Math.PI/2,strength:t(e.battery)}];for(let r of e.consumers??[])Math.abs(r.watts)<30||n.push({angle:r.angle,strength:t(r.watts)*.55});return n.filter(e=>e.strength>.02)}function Hu(e,t,n){let r=t;for(let t of n){let n=Math.abs(e-t.angle);n>Math.PI&&(n=2*Math.PI-n);let i=Math.max(0,Math.cos(n));r+=t.strength*ju*i*i*i}return r}function Uu(e,t,n=Mu){let r=[];for(let i=0;i<n;i++){let a=i/n*Math.PI*2-Math.PI/2,o=Hu(a,e,t),s=Math.cos(a)*o,c=Math.sin(a)*o;r.push(`${i?`L`:`M`}${s.toFixed(1)} ${c.toFixed(1)}`)}return`${r.join(` `)} Z`}function Wu(e,t){return Math.atan2(t.y-e.y,t.x-e.x)}var Gu=46;function Ku(e,t){let n=Nu.compact.bat,r=n.y+n.labelDy+44;return Array.from({length:e},(e,n)=>({x:t-40,y:r+n*Gu,labelDy:5}))}function qu(e,t,n=!1){if(!e){if(!t&&!n)return;let e=Nu.wide,r=n?{x:e.house.x+140,y:e.house.y-70}:{x:e.house.x,y:e.house.y},i=Oi(r,Math.max(1,t));return Math.round(Fi(r.y,i,e.box[1])*.95)}if(n)return Math.round(_u({x:255,y:165},0,t).boxBottom*.94);let r=Nu.compact;if(!t)return Math.round(r.box[1]*.94);let i=Ku(t,r.box[0]).at(-1);return Math.round((i.y+36)*.94)}var Ju={hub:{x:140,y:165},pv:{x:140,y:60,labelDy:-52},grid:{x:48,y:165,labelDy:48},house:{x:255,y:165,labelDy:-52},bat:{x:140,y:285,labelDy:48}};function Yu(e){let t=(e.consumers??[]).slice(0,6),{included:n,separate:r}=mu(t),i=r.length>0,a=e.consumerPlaces??{},o=Mi(a,[...i?[`__house__`]:[],...t.map(e=>e.id)]),s=!(!e.compact||!i||o||e.arrange),c=e.compact&&!i&&!o&&!e.arrange,l=e.compact?Nu.compact:Nu.wide,u=s?{...l,...Ju,box:l.box}:l,d={x:u.house.x,y:u.house.y},f=s?_u(d,r.length,n.length):null,p=u.box[0]+(e.compact?0:Pi(t.length+ +!!i)),m=e.compact&&!s?Ku(t.length,p):[],h=f?f.house:e.compact?{x:d.x,y:d.y}:{x:d.x+140,y:d.y-70},g=i&&a.__house__&&`dx`in a.__house__?{x:d.x+a.__house__.dx,y:d.y+a.__house__.dy}:h,_=Oi(d,i?r.length:t.length),v=Oi(g,n.length),y=ji((i?r:t).map(e=>e.id),a,_,(i?r:t).map(e=>e.mode)),b=i?ji(n.map(e=>e.id),a,v,n.map(e=>e.mode)):[],ee=(n,r,i,o)=>{let s=a[n.id];if(s&&`dx`in s)return{x:i.x+s.dx,y:i.y+s.dy,labelDy:0};if(o)return{x:o.x,y:o.y,labelDy:0};if(e.compact){let e=m[t.indexOf(n)]??m[0];return{x:e.x,y:e.y,labelDy:0}}return{x:r.x,y:r.y,labelDy:0}},x=f?f.boxBottom:e.compact?t.length?m.at(-1).y+36:u.box[1]:i?Math.max(Fi(d.y,_,u.box[1]),Fi(g.y,v,u.box[1])):Fi(d.y,_,u.box[1]),S=i?[...r.map((e,t)=>({c:e,p:ee(e,y[t],d,f?.separate[t]),from:d,fromR:36,dragOrigin:d,bounds:null})),...n.map((t,n)=>({c:t,p:ee(t,b[n],g,f?.included[n]),from:g,fromR:s||e.compact?s?26:Du:Tu,dragOrigin:g,bounds:null}))]:t.map((t,n)=>({c:t,p:ee(t,y[n],_.origin,void 0),from:t.mode===`included`?d:u.hub,fromR:t.mode===`included`?36:e.compact?22:28,dragOrigin:_.origin,bounds:null})),te=i?[g,...S.map(({p:e})=>e)]:S.map(({p:e})=>e),C=s||c?{w:p,h:x}:Ii(te,p,x),w=C.w,T=C.h,ne=Li(_,Math.max(w,e.compact?420:920),Math.max(T,e.compact?720:640)),E=Li(v,Math.max(w,e.compact?420:920),Math.max(T,e.compact?720:640));for(let e of S)e.bounds=e.dragOrigin===g?E:ne;let{pv:D=0,house:O=0,grid:k=0,battery:A=0}=e,re=Math.max(0,D),j=Math.max(0,e.pvExtra??0),M=$i(j),N=e.compact?32:36,ie=e.compact?20:22,ae=M?ea(re,j):re,P=ta(u.pv,e.compact,N,ie),F=Math.max(0,O),oe=i?pu(O,t):F,I=e.outline===!0,se=e.motion!==!1,L=e=>Fu(e,I),R=e.i18n.t,ce=Math.abs(ae)+Math.abs(oe)+Math.abs(k)+Math.abs(A),B=Bu(ce,e.compact),le=Uu(B,Vu({pv:ae,pvExtra:0,house:oe,grid:k,battery:A,consumers:S.map(({c:e,p:t})=>({angle:Wu(u.hub,t),watts:e.watts}))})),V=zu(oe,k),H=e.compact?22:28,ue=typeof e.soc==`number`&&Number.isFinite(e.soc)?Math.min(100,Math.max(0,e.soc)):void 0,de=ue===void 0?H*.9:H*.55+H*.55*(ue/100),fe={pv:{color:`var(--pv)`,label:R(`nodePv`),value:ae,icon:Su.pv},grid:{color:k<0?`var(--grid-in)`:`var(--grid-out)`,label:R(k<0?`nodeImport`:`nodeFeed`),value:k,icon:Su.grid},house:{color:`var(--house)`,label:R(i?`nodeLoad`:`nodeHouse`),value:oe,icon:i?Su.load:Su.house},bat:{color:`var(--bat)`,label:R(A<0?`nodeBatDischarge`:`nodeBatCharge`),value:A,icon:Su.bat}},pe=[`pv`,`grid`,`house`,`bat`],me=M?e.fmt.wParts(re,j):void 0,he=[...pe.map(t=>`${fe[t].label} ${e.fmt.w(fe[t].value)}`),...me?[`${R(`nodePvExtra`)} ${me.extra}`,`${R(`nodePvMain`)} ${me.main}`]:[],...i?[`${R(`nodeHouse`)} ${e.fmt.w(F)}`]:[],...S.map(({c:t})=>`${t.name} ${e.fmt.w(t.watts)}`)].join(`, `),ge=V>.55?`var(--pv)`:V>.25?`var(--bat)`:`var(--grid-in)`,_e=V>.55?`var(--bat)`:V>.25?`var(--house)`:`var(--grid-in)`,ve=Math.min(1,ce/Ou),ye=`${(3.2-1.4*ve).toFixed(2)}s`,be=s?26:e.compact?Du:Tu,xe=S.filter(({c:e})=>e.mode===`separate`),Se=S.filter(({c:e})=>e.mode===`included`),Ce=[];ae>30&&Ce.push({node:`pv`,toHub:!0}),A<-30&&Ce.push({node:`bat`,toHub:!0}),A>30&&Ce.push({node:`bat`,toHub:!1}),k<-30&&Ce.push({node:`grid`,toHub:!0}),k>30&&Ce.push({node:`grid`,toHub:!1}),oe>30&&Ce.push({node:`house`,toHub:!1});let we=B*(.72+.18*ve);return z`<svg viewBox="0 0 ${w} ${T}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${he}>
    <defs>
      <filter id="blob-glow"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="blob-fill" cx="50%" cy="45%" r="70%">
        <stop offset="0%" stop-color=${ge} stop-opacity="0.55"/>
        <stop offset="55%" stop-color=${_e} stop-opacity="0.32"/>
        <stop offset="100%" stop-color=${_e} stop-opacity="0.08"/>
      </radialGradient>
      <radialGradient id="blob-core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--bat)" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="var(--bat)" stop-opacity="0.08"/>
      </radialGradient>
    </defs>
    ${pe.map(e=>z`<path class="flow-line" d=${ca(u[e],u.hub,N,H)} stroke=${fe[e].color} opacity=${Math.abs(fe[e].value)>30?.4:.16}/>`)}
    ${M?z`<path class="flow-line" d=${ca(P,u.pv,ie,N)} stroke="var(--pv-extra)" opacity="0.5"/>`:z``}
    ${s&&f?yu({load:d,loadR:N,fork:f.fork,house:g,houseR:be,houseW:F,total:oe,separate:xe,included:Se,boxW:w,motion:se,strokeOf:L}):i?z`<path class="flow-line" d=${ca(d,g,N,be)} stroke="var(--house)" opacity=${F>30?.4:.16}/>
          ${ba(d,g,N,be,F,`var(--house)`,se)}`:z``}
    ${Ce.map(e=>ba(e.toHub?u[e.node]:u.hub,e.toHub?u.hub:u[e.node],e.toHub?N:H,e.toHub?H:N,fe[e.node].value,fe[e.node].color,se))}
    ${M?ba(P,u.pv,ie,N,j,`var(--pv-extra)`,se):z``}
    <g class="flow-blob ${se?`motion`:``}" style=${`--blob-period:${ye}`} transform=${`translate(${u.hub.x} ${u.hub.y})`}>
      <ellipse class="flow-blob-halo" cx="0" cy="0" rx=${(we*1.15).toFixed(1)} ry=${(we*.92).toFixed(1)} fill="none" stroke=${L(ge)} stroke-width="1.2" stroke-dasharray="6 10" opacity=${(.2+.35*ve).toFixed(2)}/>
      <path class="flow-blob-shape" d=${le} fill="url(#blob-fill)" stroke=${L(ge)} stroke-width=${I?`2.2`:`1.4`} filter=${I?`none`:`url(#blob-glow)`} opacity="0.95"/>
      <circle class="flow-blob-core" r=${de.toFixed(1)} fill="url(#blob-core)" opacity=${ue===void 0?.35:.75}/>
      <image href=${Bi} x=${-H} y=${-H} width=${H*2} height=${H*2} aria-label="Maestro"/>
    </g>
    ${pe.map(t=>{let n=fe[t],r=u[t],a=Math.abs(n.value)<30,o=r.labelDy<0,s=r.y+r.labelDy,c=t===`pv`&&me?na(R(`nodePvExtra`),R(`nodePvMain`),me):void 0,l=t===`pv`&&me?me.total:e.fmt.w(n.value);return z`<g class="flow-node" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${n.label} @click=${()=>e.onSelect?.(t===`house`&&i?`load`:t)} @keydown=${n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),e.onSelect?.(t===`house`&&i?`load`:t))}}>
        <circle cx=${r.x} cy=${r.y} r=${N} fill=${I?`none`:`rgba(10,16,30,.88)`} stroke=${L(n.color)} stroke-width=${I?`2.4`:`2`} filter=${a||I?`none`:`url(#blob-glow)`}/>
        <g transform=${Iu(r.x,r.y,qi(N))} fill="none" stroke=${L(n.color)} stroke-width=${wu} stroke-linecap="round" stroke-linejoin="round">
          ${t===`bat`?Lu(e.soc,L(n.color)):z`<path d=${n.icon} vector-effect="non-scaling-stroke"/>`}
        </g>
        <text class="node-val" x=${r.x} y=${s} text-anchor="middle">${l}</text>
        <text class="node-lbl" x=${r.x} y=${s+(o?19:18)} text-anchor="middle">${n.label}</text>
        ${c?z`<text class="node-lbl-sm" x=${r.x} y=${ra(r.y,N)} text-anchor="middle">${c}</text>`:z``}
      </g>`})}
    ${M?z`<g class="flow-node" opacity=${j>30?1:.55} role="button" tabindex="0" aria-label=${R(`nodePvExtra`)} @click=${()=>e.onSelect?.(`pvExtra`)} @keydown=${t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),e.onSelect?.(`pvExtra`))}}>
          <circle cx=${P.x} cy=${P.y} r=${ie} fill=${I?`none`:`rgba(10,16,30,.88)`} stroke=${L(`var(--pv-extra)`)} stroke-width=${I?`2.4`:`2`} filter=${j>30&&!I?`url(#blob-glow)`:`none`}/>
          <g transform=${Iu(P.x,P.y,qi(ie))} fill="none" stroke=${L(`var(--pv-extra)`)} stroke-width=${wu} stroke-linecap="round" stroke-linejoin="round">
            <path d=${Su.pv} vector-effect="non-scaling-stroke"/>
          </g>
        </g>`:z``}
    ${i?z`<g class="flow-node ${e.arrange?`arrange`:``}" opacity=${F<30?.55:1} role="button" tabindex="0" aria-label=${R(`nodeHouse`)}
          @click=${()=>{e.arrange||e.onSelect?.(`house`)}}
          @keydown=${t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),e.arrange||e.onSelect?.(`house`))}}
          @pointerdown=${t=>zi(t,`__house__`,d,e.arrange,e.onPlaceConsumer,ne)}
        >
          <circle cx=${g.x} cy=${g.y} r=${be} fill=${I?`none`:`rgba(10,16,30,.88)`} stroke=${L(`var(--house)`)} stroke-width=${I?s||e.compact?`2.2`:`2.4`:`2`} filter=${F<30||I||e.compact&&!s?`none`:`url(#blob-glow)`}/>
          <g transform=${Iu(g.x,g.y,s||e.compact?Gi(be):qi(Tu))} fill="none" stroke=${L(`var(--house)`)} stroke-width=${wu} stroke-linecap="round" stroke-linejoin="round">
            <path d=${Su.house} vector-effect="non-scaling-stroke"/>
          </g>
          ${s?z`<text class="node-val-sm" x=${g.x} y=${g.y+42} text-anchor="middle">${e.fmt.w(F)}</text>
              <text class="node-lbl-sm" x=${g.x} y=${g.y+58} text-anchor="middle">${R(`nodeHouse`)}</text>`:e.compact?z`<text font-size="14" font-weight="700" fill="var(--text)" x=${g.x-26} y=${g.y+5} text-anchor="end">${e.fmt.w(F)}  ${R(`nodeHouse`)}</text>`:z`<text class="node-val-sm" x=${g.x} y=${g.y+52} text-anchor="middle">${e.fmt.w(F)}</text>
                <text class="node-lbl-sm" x=${g.x} y=${g.y+68} text-anchor="middle">${R(`nodeHouse`)}</text>`}
        </g>`:z``}
    ${s?z``:c?wa(S,d,w,se,N):S.map(({c:t,p:n,from:r,fromR:i})=>{let a=t.mode===`included`?`var(--house)`:`var(--accent)`,o=e.compact?Du:Eu;return z`<path class="flow-line" d=${ca(r,n,i,o)} stroke=${a} opacity=${Math.abs(t.watts)>30?.4:.16}/>
              ${ba(r,n,i,o,t.watts,a,se)}`})}
    ${S.map(({c:t,p:n,dragOrigin:r,bounds:i})=>{let a=t.mode===`included`?`var(--house)`:`var(--accent)`,o=L(a),s=ya(t,30),c=dt(e.fmt,t.watts,t.soc),l=[t.name,c,t.plugged===!0?e.i18n.t(`plantPlug`):void 0].filter(Boolean).join(`, `),u=()=>{e.arrange||e.onSelect?.(t.id)},d=e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),u())},f=n=>zi(n,t.id,r,e.arrange,e.onPlaceConsumer,i??void 0);return e.compact?z`<g class="flow-node ${e.arrange?`arrange`:``}" opacity=${s?.55:1} role="button" tabindex="0" aria-label=${l} @click=${u} @keydown=${d} @pointerdown=${f}>
          <circle cx=${n.x} cy=${n.y} r=${Du} fill=${I?`none`:`rgba(10,16,30,.9)`} stroke=${o} stroke-width=${I?`2.2`:`2`}/>
          <g transform=${Iu(n.x,n.y,Gi(Du))} fill="none" stroke=${o} stroke-width=${wu} stroke-linecap="round" stroke-linejoin="round">${va(t,a,I)}</g>
          <text font-size="14" font-weight="700" fill="var(--text)" x=${n.x-26} y=${n.y+5} text-anchor="end">${c}  ${Ru(t.name,24)}</text>
        </g>`:z`<g class="flow-node ${e.arrange?`arrange`:``}" opacity=${s?.55:1} role="button" tabindex="0" aria-label=${l} @click=${u} @keydown=${d} @pointerdown=${f}>
        <circle cx=${n.x} cy=${n.y} r="26" fill=${I?`none`:`rgba(10,16,30,.9)`} stroke=${o} stroke-width=${I?`2.4`:`2`} filter=${s||I?`none`:`url(#blob-glow)`}/>
        <g transform=${Iu(n.x,n.y,Gi(Eu))} fill="none" stroke=${o} stroke-width=${wu} stroke-linecap="round" stroke-linejoin="round">${va(t,a,I)}</g>
        <text class="node-val-sm" x=${n.x+34} y=${n.y-2} text-anchor="start">${c}</text>
        <text class="node-lbl-sm" x=${n.x+34} y=${n.y+14} text-anchor="start">${Ru(t.name,18)}</text>
      </g>`})}
  </svg>`}var Xu=30,Zu=22,Qu=26,$u=16,ed=`M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6`,td=24,nd=2.15,rd=12e3,id=6,ad=6e3,od={"var(--pv)":`#9a3412`,"var(--pv-extra)":`#b45309`,"var(--house)":`#5b21b6`,"var(--grid-in)":`#b91c1c`,"var(--grid-out)":`#047857`,"var(--bat)":`#0e7490`,"var(--accent)":`#075985`},sd=(e,t)=>t?od[e]??`#152033`:e;function cd(e,t,n){let r=td/2*n;return`translate(${e-r} ${t-r}) scale(${n})`}var ld=(e,t=16)=>e.length<=t?e:`${e.slice(0,t-1)}…`;function ud(e,t=rd){let n=Math.max(1e3,Number.isFinite(t)?t:rd);if(!(e>30))return Array.from({length:id},()=>0);let r=Math.min(1,e/n)*id;return Array.from({length:id},(e,t)=>Math.min(1,Math.max(0,r-t)))}function dd(e){return e>30?.22+.7*Math.min(1,e/ad):.1}function fd(e,t){return typeof e!=`number`||!Number.isFinite(e)||e<=0?0:Math.min(100,e)/100*t}function pd(e,t,n,r,i,a,o){let s=o?da(i):0;if(!s)return z``;let c=sa(e,t,n,r),l=fa(i).toFixed(3);return z`${Array.from({length:s},(e,t)=>z`<g class="electron" fill=${a} data-x1=${c.x1} data-y1=${c.y1} data-x2=${c.x2} data-y2=${c.y2} data-speed=${l} data-phase=${t/s}><circle class="halo" r="3.4"/><circle r="1.5"/><circle r="0.75" fill="#fff"/></g>`)}`}function md(e,t){if(e){let e=t?66+t*46:54;return{boxW:360,boxH:Math.max(520,222+e),roof:{x:108,y:72,w:192,h:26},soffit:{x:110,y:98,w:188,h:5},facade:{x:126,y:103,w:156,h:148},plinth:{x:128,y:251,w:152,h:18},mast:{x:34,y:182,h:71},logo:{x:136,y:221,s:20},groundY:272}}return{boxW:600+(t?Pi(t):0),boxH:297,roof:{x:184,y:52,w:240,h:28},soffit:{x:186,y:80,w:236,h:6},facade:{x:206,y:86,w:196,h:168},plinth:{x:209,y:254,w:190,h:20},mast:{x:76,y:175,h:81},logo:{x:216,y:222,s:22},groundY:277}}function hd(e,t,n,r){let i=e.y-e.h,a=i+14,o=r?3.6:3.2,s=r?2.2:2;return z`<g class="flow-city-mast" filter=${n&&!r?`url(#city-glow)`:`none`}>
    <line x1=${e.x} y1=${e.y} x2=${e.x} y2=${i} stroke=${t} stroke-width=${o} stroke-linecap="round"/>
    <line x1=${e.x-20} y1=${a} x2=${e.x+20} y2=${a} stroke=${t} stroke-width=${o} stroke-linecap="round"/>
    <line x1=${e.x-20+5} y1=${a} x2=${e.x-20+5} y2=${a+11} stroke=${t} stroke-width=${s} stroke-linecap="round"/>
    <line x1=${e.x+20-5} y1=${a} x2=${e.x+20-5} y2=${a+11} stroke=${t} stroke-width=${s} stroke-linecap="round"/>
    <circle cx=${e.x-20+5} cy=${a+13} r="2.8" fill=${t} opacity=${n?.95:.5}/>
    <circle cx=${e.x+20-5} cy=${a+13} r="2.8" fill=${t} opacity=${n?.95:.5}/>
    <path d=${`M${e.x-12} ${e.y} L${e.x} ${e.y-9} L${e.x+12} ${e.y} Z`} fill=${t} opacity="0.4"/>
  </g>`}function gd(e){let t=e.x+e.w*.1,n=e.w*.8,r=e.y+e.h*.12,i=e.h*.42,a=n-10-25,o=Math.max(7,a/id),s=i-10;return Array.from({length:id},(e,n)=>({x:t+5+n*(o+5),y:r+5,w:o,h:s}))}function _d(e,t,n,r){let i=()=>n?.(e);return z`<g class="flow-node flow-city-zone" role="button" tabindex="0" aria-label=${t} @click=${i} @keydown=${e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),i())}}>${r}</g>`}function vd(e){let t=(e.consumers??[]).slice(0,6),{included:n,separate:r}=mu(t),i=r.length>0,a=md(e.compact,t.length+(i&&!e.compact?1:0)),{pv:o=0,house:s=0,grid:c=0,battery:l=0}=e,u=Math.max(0,o),d=Math.max(0,e.pvExtra??0),f=$i(d),p=f?ea(u,d):u,m=Math.max(0,s),h=i?pu(s,t):m,g=e.motion!==!1,_=e.outline===!0,v=e=>sd(e,_),y=e.i18n.t,b=dd(p),ee=ud(h,e.loadMax??rd),x=gd(a.facade),S=fd(e.soc,a.plinth.w-6),te=c<0?`var(--grid-in)`:`var(--grid-out)`,C=y(c<0?`nodeImport`:`nodeFeed`),w=y(l<0?`nodeBatDischarge`:`nodeBatCharge`),T={x:a.roof.x+a.roof.w/2,y:a.roof.y+a.roof.h/2},ne={x:a.facade.x+a.facade.w/2,y:a.facade.y+a.facade.h*.45},E={x:a.plinth.x+a.plinth.w/2,y:a.plinth.y+a.plinth.h/2},D=a.facade.x+a.facade.w-9,O={x:D,y:a.facade.y+14},k={x:D,y:a.facade.y+a.facade.h*.36},A={x:D,y:E.y},re=Math.abs(l)>30,j={x:a.mast.x+16,y:a.mast.y-a.mast.h+14},M={x:a.roof.x+8,y:a.soffit.y+a.soffit.h/2},N=(j.y+M.y)/2-8,ie=`M${j.x} ${j.y} C${j.x+24} ${N}, ${M.x-28} ${M.y-4}, ${M.x} ${M.y}`,ae={x:a.facade.x+a.facade.w*.1,y:a.facade.y+a.facade.h*.12,w:a.facade.w*.8,h:a.facade.h*.42},P={x:a.facade.x+a.facade.w,y:ne.y},F=e.consumerPlaces??{},oe=Mi(F,[...i?[`__house__`]:[],...t.map(e=>e.id)]),I=!(!e.compact||!i||oe||e.arrange),se=e.compact&&!i&&!oe&&!e.arrange,L=I?_u(P,r.length,n.length):null,R=a.plinth.y+a.plinth.h+18,ce=R+52,B=e=>({x:a.boxW-40,y:ce+e*46,labelDy:5}),le=L?L.house:e.compact?{x:P.x+90,y:P.y-36}:{x:P.x+120,y:P.y-56},V=i&&F.__house__&&`dx`in F.__house__?{x:P.x+F.__house__.dx,y:P.y+F.__house__.dy}:le,H=I?26:e.compact?$u:Xu,ue=Oi(P,i?r.length:t.length),de=Oi(V,n.length),fe=ji((i?r:t).map(e=>e.id),F,ue,(i?r:t).map(e=>e.mode)),pe=i?ji(n.map(e=>e.id),F,de,n.map(e=>e.mode)):[],me=(n,r,i,a)=>{let o=F[n.id];return o&&`dx`in o?{x:i.x+o.dx,y:i.y+o.dy,labelDy:0}:a?{x:a.x,y:a.y,labelDy:0}:e.compact?B(t.indexOf(n)):{x:r.x,y:r.y,labelDy:0}},he=i?[...r.map((e,t)=>({c:e,p:me(e,fe[t],P,L?.separate[t]),joinFrom:P,dragOrigin:P})),...n.map((e,t)=>({c:e,p:me(e,pe[t],V,L?.included[t]),joinFrom:V,dragOrigin:V}))]:t.map((e,t)=>({c:e,p:me(e,fe[t],P,void 0),joinFrom:P,dragOrigin:P})),ge=he.filter(({c:e})=>e.mode===`separate`),_e=he.filter(({c:e})=>e.mode===`included`),ve=L?L.boxBottom:i?Math.max(r.length?Fi(P.y,ue,a.boxH):a.boxH,n.length?Fi(V.y,de,a.boxH):a.boxH):t.length?Fi(ne.y,ue,a.boxH):a.boxH,ye=Ii(i?[V,...he.map(({p:e})=>e)]:he.map(({p:e})=>e),a.boxW+(e.compact?0:t.length||i?Pi(t.length+ +!!i):0),ve),be=he.length||i?Math.max(a.groundY+20,V.y+(i?H+40:0),...he.map(({p:e})=>e.y+44)):a.boxH,xe=e.compact?4:6,Se=f?{x:a.roof.x+a.roof.w+Zu+xe,y:a.roof.y+a.roof.h/2}:{x:0,y:0},Ce={x:a.roof.x+a.roof.w,y:T.y},we=f?Se.x+Zu+28:0,Te=Math.max(I||se?a.boxW:e.compact?Math.max(a.boxW,ye.w):ye.w,we),Ee=I?Math.max(a.mast.y+56,L.boxBottom):se?he.length?Math.max(a.mast.y+56,he.at(-1).p.y+40):a.mast.y+56:Math.max(a.boxH,be,ye.h),De=Li(ue,Math.max(Te,e.compact?420:920),Math.max(Ee,e.compact?720:640)),Oe=Li(de,Math.max(Te,e.compact?420:920),Math.max(Ee,e.compact?720:640)),ke=y(i?`nodeLoad`:`nodeHouse`),Ae=e.compact?a.facade.x+a.facade.w+10:ne.x,je=e.compact?`start`:`middle`,Me=e.compact?ne.y-4:x[0].y+x[0].h+34,Ne=e.compact?ne.y+14:x[0].y+x[0].h+50,Pe=f?e.fmt.wParts(u,d):void 0,Fe=[`${y(`nodePv`)} ${Pe?.total??e.fmt.w(p)}`,...Pe?[`${y(`nodePvExtra`)} ${Pe.extra}`,`${y(`nodePvMain`)} ${Pe.main}`]:[],`${ke} ${e.fmt.w(h)}`,...i?[`${y(`nodeHouse`)} ${e.fmt.w(m)}`]:[],`${C} ${e.fmt.w(c)}`,`${w} ${e.fmt.w(l)}`,...he.map(({c:t})=>`${t.name} ${e.fmt.w(t.watts)}`)].join(`, `),Ie=_?`none`:`rgba(16,22,36,.9)`,Le=_?1.8:1.4;return z`<svg viewBox="0 0 ${Te} ${Ee}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${Fe}>
    <defs>
      <filter id="city-glow"><feGaussianBlur stdDeviation="4.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="city-soft"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/></feMerge></filter>
      <linearGradient id="city-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--pv)" stop-opacity=${(b*.2).toFixed(2)}/>
        <stop offset="70%" stop-color="var(--fill, #0a101e)" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="city-roof" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--pv)" stop-opacity=${(b*.85).toFixed(2)}/>
        <stop offset="100%" stop-color="var(--pv)" stop-opacity=${(b*.5).toFixed(2)}/>
      </linearGradient>
      <linearGradient id="city-glass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--house)" stop-opacity="0.14"/>
        <stop offset="55%" stop-color="rgba(148,163,184,.06)"/>
        <stop offset="100%" stop-color="var(--house)" stop-opacity="0.08"/>
      </linearGradient>
      <linearGradient id="city-plinth" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="var(--bat)" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="var(--bat)" stop-opacity="0.35"/>
      </linearGradient>
      <clipPath id="city-roof-clip">
        <rect x=${a.roof.x+2} y=${a.roof.y+2} width=${a.roof.w-4} height=${a.roof.h-4} rx="3"/>
      </clipPath>
      <clipPath id="city-plinth-clip">
        <rect x=${a.plinth.x+2} y=${a.plinth.y+2} width=${a.plinth.w-4} height=${a.plinth.h-4} rx="1.5"/>
      </clipPath>
      ${x.map((e,t)=>z`<clipPath id=${`city-bar-${t}`}><rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx="2"/></clipPath>`)}
    </defs>

    <rect x="0" y="0" width=${a.boxW} height=${a.roof.y+36} fill="url(#city-sky)"/>
    <ellipse cx=${T.x} cy=${a.roof.y+6} rx=${a.roof.w*.34} ry="18" fill="var(--pv)" opacity=${(b*.14).toFixed(2)} filter="url(#city-soft)"/>
    <line x1=${a.mast.x-18} y1=${a.groundY} x2=${a.plinth.x+a.plinth.w+28} y2=${a.groundY} stroke="rgba(148,163,184,.3)" stroke-width="1.6" stroke-linecap="round"/>

    <path
      class="flow-line"
      d=${ie}
      stroke=${v(te)}
      opacity=${Math.abs(c)>30?.45:.22}
    />

    ${_d(`pv`,y(`nodePv`),e.onSelect,z`<rect class="flow-city-roof" x=${a.roof.x} y=${a.roof.y} width=${a.roof.w} height=${a.roof.h} rx="4" fill=${_?`none`:`rgba(10,16,28,.92)`} stroke=${v(`var(--pv)`)} stroke-width=${Le} stroke-opacity=${o>30||_?1:.45} filter=${o>30&&!_?`url(#city-glow)`:`none`}/>
        <rect x=${a.roof.x+2} y=${a.roof.y+2} width=${a.roof.w-4} height=${a.roof.h-4} rx="3" fill="url(#city-roof)"/>
        <g clip-path="url(#city-roof-clip)">
          ${Array.from({length:6},(e,t)=>{let n=a.roof.x+6+(a.roof.w-12)*t/5;return z`<line x1=${n} y1=${a.roof.y+4} x2=${n} y2=${a.roof.y+a.roof.h-4} stroke="rgba(255,255,255,.18)" stroke-width="1"/>`})}
          ${Array.from({length:3},(e,t)=>{let n=a.roof.y+5+(a.roof.h-10)*t/2;return z`<line x1=${a.roof.x+5} y1=${n} x2=${a.roof.x+a.roof.w-5} y2=${n} stroke="rgba(255,255,255,.14)" stroke-width="1"/>`})}
        </g>
        <rect x=${a.soffit.x} y=${a.soffit.y} width=${a.soffit.w} height=${a.soffit.h} fill=${_?`none`:`rgba(8,12,22,.85)`} stroke=${v(`var(--pv)`)} stroke-width="1" opacity="0.85"/>
        <text class="node-val" x=${T.x} y=${a.roof.y-18} text-anchor="middle">${Pe?.total??e.fmt.w(p)}</text>
        <text class="node-lbl" x=${T.x} y=${a.roof.y-2} text-anchor="middle">${y(`nodePv`)}</text>
        ${Pe?z`<text class="node-lbl" x=${T.x} y=${a.roof.y+a.roof.h+14} text-anchor="middle">${Pe.main} · ${Pe.extra}</text>`:z``}`)}
    ${f&&Pe?z`<path class="flow-line" d=${`M${Se.x-Zu} ${Se.y} L${Ce.x} ${Ce.y}`} stroke="var(--pv-extra)" opacity=${d>30?.55:.28} fill="none"/>
        ${pd(Se,Ce,Zu,0,d,`var(--pv-extra)`,g)}
        ${_d(`pvExtra`,y(`nodePvExtra`),e.onSelect,z`<g opacity=${d>30?1:.55}>
            <circle cx=${Se.x} cy=${Se.y} r=${Zu} fill=${_?`none`:`rgba(10,16,28,.92)`} stroke=${v(`var(--pv-extra)`)} stroke-width=${Le} filter=${d>30&&!_?`url(#city-glow)`:`none`}/>
            <text class="node-val" x=${Se.x+Zu+8} y=${Se.y-4} text-anchor="start">${Pe.extra}</text>
            <text class="node-lbl" x=${Se.x+Zu+8} y=${Se.y+14} text-anchor="start">${y(`nodePvExtra`)}</text>
          </g>`)}`:z``}
    <circle cx=${M.x} cy=${M.y} r="3" fill=${v(te)} opacity=${Math.abs(c)>30?.9:.45}/>

    ${_d(i?`load`:`house`,ke,e.onSelect,z`<rect class="flow-city-body" x=${a.facade.x} y=${a.facade.y} width=${a.facade.w} height=${a.facade.h} rx="2" fill=${Ie} stroke=${v(`var(--house)`)} stroke-width=${Le}/>
        <rect x=${a.facade.x+1} y=${a.facade.y+1} width=${a.facade.w-2} height=${a.facade.h-2} rx="1.5" fill="url(#city-glass)"/>
        <rect x=${ae.x} y=${ae.y} width=${ae.w} height=${ae.h} rx="2" fill="rgba(8,12,22,.55)" stroke="rgba(148,163,184,.28)" stroke-width="1.2"/>
        ${x.map((e,t)=>{let n=ee[t]??0,r=e.h*n,i=e.y+e.h-r;return z`<g>
            <rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx="2" fill="rgba(148,163,184,.2)" opacity="0.35"/>
            ${n>.005?z`<rect clip-path=${`url(#city-bar-${t})`} x=${e.x} y=${i} width=${e.w} height=${r} fill="var(--house)" opacity=${(.55+.4*n).toFixed(2)} filter=${_?`none`:`url(#city-glow)`}/>`:z``}
            ${t<5?z`<line x1=${e.x+e.w+2.5} y1=${ae.y+3} x2=${e.x+e.w+2.5} y2=${ae.y+ae.h-3} stroke="rgba(148,163,184,.22)" stroke-width="1"/>`:z``}
          </g>`})}`)}

    <image href=${Bi} x=${a.logo.x} y=${a.logo.y} width=${a.logo.s} height=${a.logo.s} opacity="0.65" style="pointer-events:none" aria-label="Maestro"/>

    ${_d(`bat`,w,e.onSelect,z`<rect class="flow-city-cellar" x=${a.plinth.x} y=${a.plinth.y} width=${a.plinth.w} height=${a.plinth.h} rx="1.5" fill=${_?`none`:`rgba(8,12,20,.94)`} stroke=${v(`var(--bat)`)} stroke-width=${Le} filter=${Math.abs(l)>30&&!_?`url(#city-glow)`:`none`}/>
        <rect clip-path="url(#city-plinth-clip)" x=${a.plinth.x+2} y=${a.plinth.y+2} width=${S} height=${a.plinth.h-4} fill="url(#city-plinth)"/>
        ${e.compact?z`<text class="node-val-sm" x=${E.x} y=${R} text-anchor="middle">${e.fmt.w(l)}</text>
            <text class="node-lbl-sm" x=${E.x} y=${R+14} text-anchor="middle">${w}</text>`:z`<text class="node-val-sm" x=${a.plinth.x-14} y=${E.y-12} text-anchor="end">${e.fmt.w(l)}</text>
            <text class="node-lbl-sm" x=${a.plinth.x-14} y=${E.y+3} text-anchor="end">${w}</text>`}`)}

    ${_d(`grid`,C,e.onSelect,z`<rect x=${a.mast.x-28} y=${a.mast.y-a.mast.h-4} width="56" height=${a.mast.h+44} fill="transparent"/>
        ${hd(a.mast,v(te),Math.abs(c)>30,_)}
        <text class="node-val-sm" x=${a.mast.x} y=${e.compact?R:a.mast.y+20} text-anchor="middle">${e.fmt.w(c)}</text>
        <text class="node-lbl-sm" x=${a.mast.x} y=${e.compact?R+14:a.mast.y+34} text-anchor="middle">${C}</text>`)}

    <path
      class="flow-line"
      d=${`M${A.x} ${A.y} L${k.x} ${k.y}`}
      stroke=${v(`var(--bat)`)}
      opacity=${re?.5:.18}
    />
    ${o>30?z`<path class="flow-line" d=${`M${T.x} ${T.y} L${O.x} ${O.y}`} stroke=${v(`var(--pv)`)} opacity="0.45"/>
          ${pd(T,O,2,2,p,v(`var(--pv)`),g)}`:z``}
    ${h>30&&l>30?pd(k,A,2,2,Math.min(h,l),v(`var(--bat)`),g):z``}
    ${l<-30?pd(A,k,2,2,Math.abs(l),v(`var(--bat)`),g):z``}
    ${c<-30?pd(j,M,4,4,Math.abs(c),v(`var(--grid-in)`),g):z``}
    ${c>30?pd(M,j,4,4,c,v(`var(--grid-out)`),g):z``}

    ${I&&L?yu({load:P,loadR:4,fork:L.fork,house:V,houseR:H,houseW:m,total:h,separate:ge,included:_e,boxW:Te,motion:g,strokeOf:v}):i?z`<path class="flow-line" d=${ca(P,V,4,H)} stroke=${v(`var(--house)`)} opacity=${m>30?.45:.22}/>
          ${pd(P,V,4,H,m,v(`var(--house)`),g)}`:z``}

    ${i?z`<g class="flow-node ${e.arrange?`arrange`:``}" opacity=${m<30?.55:1} role="button" tabindex="0" aria-label=${y(`nodeHouse`)}
            @click=${()=>{e.arrange||e.onSelect?.(`house`)}}
            @keydown=${t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),e.arrange||e.onSelect?.(`house`))}}
            @pointerdown=${t=>zi(t,`__house__`,P,e.arrange,e.onPlaceConsumer,De)}
          >
            <circle cx=${V.x} cy=${V.y} r=${H} fill=${_?`none`:`rgba(10,16,30,.9)`} stroke=${v(`var(--house)`)} stroke-width=${_?I||e.compact?`2.2`:`2.4`:`2`} filter=${m<30||_||e.compact&&!I?`none`:`url(#city-glow)`}/>
            <g transform=${cd(V.x,V.y,Gi(H))} fill="none" stroke=${v(`var(--house)`)} stroke-width=${nd} stroke-linecap="round" stroke-linejoin="round">
              <path d=${ed} vector-effect="non-scaling-stroke"/>
            </g>
            ${I?z`<text class="node-val-sm" x=${V.x} y=${V.y+42} text-anchor="middle">${e.fmt.w(m)}</text>
                <text class="node-lbl-sm" x=${V.x} y=${V.y+58} text-anchor="middle">${y(`nodeHouse`)}</text>`:e.compact?z`<text font-size="14" font-weight="700" fill="var(--text)" x=${V.x-26} y=${V.y+5} text-anchor="end">${e.fmt.w(m)}  ${y(`nodeHouse`)}</text>`:z`<text class="node-val-sm" x=${V.x} y=${V.y+48} text-anchor="middle">${e.fmt.w(m)}</text>
                  <text class="node-lbl-sm" x=${V.x} y=${V.y+64} text-anchor="middle">${y(`nodeHouse`)}</text>`}
          </g>`:z``}

    ${se?wa(he,P,Te,g):z``}

    <g style="pointer-events:none">
      <text class=${e.compact?`node-val-sm`:`node-val`} x=${Ae} y=${Me} text-anchor=${je}>${e.fmt.w(h)}</text>
      <text class="node-lbl-sm" x=${Ae} y=${Ne} text-anchor=${je}>${ke}</text>
    </g>

    ${he.map(({c:t,p:n,joinFrom:r,dragOrigin:o})=>{let s=t.mode===`included`?`var(--house)`:`var(--accent)`,c=v(s),l=ya(t,30),u=()=>{e.arrange||e.onSelect?.(t.id)},d=e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),u())},f=t.mode===`included`&&i?Oe:De,p=n=>zi(n,t.id,o,e.arrange,e.onPlaceConsumer,f),m=i&&t.mode===`included`?r:{x:r.x,y:Math.min(Math.max(n.y,a.facade.y+24),a.facade.y+a.facade.h-24)},h=dt(e.fmt,t.watts,t.soc),y=[t.name,h,t.plugged===!0?e.i18n.t(`plantPlug`):void 0].filter(Boolean).join(`, `);return e.compact?z`<g class="flow-node ${e.arrange?`arrange`:``}" opacity=${l?.55:1} role="button" tabindex="0" aria-label=${y} @click=${u} @keydown=${d} @pointerdown=${p}>
          ${se||I?z``:z`<path class="flow-line" d=${ca(r,n,0,$u)} stroke=${c}/>
              ${pd(r,n,0,$u,t.watts,c,g)}`}
          <circle cx=${n.x} cy=${n.y} r=${$u} fill=${_?`none`:`rgba(10,16,30,.9)`} stroke=${c} stroke-width=${_?`2.2`:`2`}/>
          <g transform=${cd(n.x,n.y,Gi($u))} fill="none" stroke=${c} stroke-width=${nd} stroke-linecap="round" stroke-linejoin="round">${va(t,s,_)}</g>
          <text font-size="14" font-weight="700" fill="var(--text)" x=${n.x-26} y=${n.y+5} text-anchor="end">${h}  ${ld(t.name,24)}</text>
        </g>`:z`<g class="flow-node ${e.arrange?`arrange`:``}" opacity=${l?.55:1} role="button" tabindex="0" aria-label=${y} @click=${u} @keydown=${d} @pointerdown=${p}>
        <path class="flow-line" d=${`M${m.x} ${m.y} C${m.x+28} ${m.y}, ${n.x-36} ${n.y}, ${n.x-Qu} ${n.y}`} stroke=${c}/>
        ${pd(m,n,0,Qu,t.watts,c,g)}
        <circle cx=${n.x} cy=${n.y} r="26" fill=${_?`none`:`rgba(10,16,30,.9)`} stroke=${c} stroke-width=${_?`2.4`:`2`} filter=${l||_?`none`:`url(#city-glow)`}/>
        <g transform=${cd(n.x,n.y,Gi(Qu))} fill="none" stroke=${c} stroke-width=${nd} stroke-linecap="round" stroke-linejoin="round">${va(t,s,_)}</g>
        <text class="node-val-sm" x=${n.x+36} y=${n.y-2} text-anchor="start">${h}</text>
        <text class="node-lbl-sm" x=${n.x+36} y=${n.y+14} text-anchor="start">${ld(t.name,18)}</text>
      </g>`})}
  </svg>`}var yd=[`day`,`week`,`month`,`year`],bd=(e,t)=>e(t===`day`?`calGrainDay`:t===`week`?`calGrainWeek`:t===`month`?`calGrainMonth`:`calGrainYear`),xd=e=>Array.from({length:7},(t,n)=>new Date(2024,0,1+n).toLocaleDateString(e,{weekday:`narrow`}));function Sd(e){let t=new Date(e.getFullYear(),e.getMonth(),1),n=(t.getDay()+6)%7,r=new Date(t);r.setDate(1-n);let i=[];for(let t=0;t<42;t++){let n=new Date(r);n.setDate(r.getDate()+t),i.push({day:Un(n),inMonth:n.getMonth()===e.getMonth()})}return i}function Cd(e,t,n){let r=Wn(e);return t===`year`?r.setFullYear(r.getFullYear()+n*12):t===`month`?r.setFullYear(r.getFullYear()+n):r.setMonth(r.getMonth()+n),Un(r)}function wd(e,t,n){let r=Wn(e);if(t===`year`){let e=r.getFullYear();return`${e-5} – ${e+1}`}return t===`month`?String(r.getFullYear()):r.toLocaleDateString(n,{month:`long`,year:`numeric`})}function Td(e){if(!e.open)return B;let{t}=e.i18n,n=Un(),r=Wn(e.viewAnchor),i=e.selected,a=xd(e.loc),o=(t,n)=>{let r=Xn(n);e.onPick(t,r)},s=e.grain===`month`?(()=>{let t=r.getFullYear(),a=Wn(n);return R`<div class="cal-grid months">
      ${Array.from({length:12},(n,r)=>{let s=new Date(t,r,1),c=Un(s),l=s>a;return R`<button
          type="button"
          class="cal-cell ${i.grain===`month`&&i.start===`${t}-${String(r+1).padStart(2,`0`)}-01`?`sel`:``}"
          ?disabled=${l}
          @click=${()=>o(`month`,Xn(c))}
        >${s.toLocaleDateString(e.loc,{month:`short`})}</button>`})}
    </div>`})():e.grain===`year`?(()=>{let e=r.getFullYear(),t=Array.from({length:12},(t,n)=>e-5+n),a=Wn(n).getFullYear();return R`<div class="cal-grid years">
      ${t.map(e=>{let t=`${e}-01-01`;return R`<button
          type="button"
          class="cal-cell ${i.grain===`year`&&Wn(i.start).getFullYear()===e?`sel`:``}"
          ?disabled=${e>a}
          @click=${()=>o(`year`,Xn(t))}
        >${e}</button>`})}
    </div>`})():(()=>{let t=Sd(r);return R`<div class="cal-weekdays">${a.map(e=>R`<span>${e}</span>`)}</div>
      <div class="cal-grid days" role="grid">
        ${t.map(({day:t,inMonth:r})=>{let a=t>n,s=i.grain===`day`&&i.start===t,c=t===n,l=i.grain===`week`&&t>=i.start&&t<i.end;return R`<button
            type="button"
            class="cal-cell ${r?``:`muted`} ${s?`sel`:``} ${l?`in-week`:``} ${c?`today`:``}"
            ?disabled=${a}
            @click=${()=>o(e.grain===`week`?`week`:`day`,t)}
          >${Wn(t).getDate()}</button>`})}
      </div>`})();return R`<div class="cal-backdrop" @click=${e.onClose}></div>
    <div class="cal-pop" role="dialog" aria-label=${t(`dayPick`)} @click=${e=>e.stopPropagation()}>
      <div class="seg cal-grains" role="group">
        ${yd.map(n=>R`<button
              type="button"
              class=${e.grain===n?`active`:``}
              aria-pressed=${e.grain===n}
              @click=${()=>e.onGrain(n)}
            >${bd(t,n)}</button>`)}
      </div>
      <div class="cal-head">
        <button type="button" class="day-nav-btn" aria-label=${t(`dayPrev`)} @click=${()=>e.onViewAnchor(Cd(e.viewAnchor,e.grain,-1))}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
        <span class="cal-title">${wd(e.viewAnchor,e.grain,e.loc)}</span>
        <button type="button" class="day-nav-btn" aria-label=${t(`dayNext`)} @click=${()=>e.onViewAnchor(Cd(e.viewAnchor,e.grain,1))}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        </button>
      </div>
      ${s}
      <button type="button" class="cal-today" @click=${()=>o(e.grain,n)}>${t(`periodToday`)}</button>
    </div>`}function Ed(e){return/[",\n\r]/.test(e)?`"${e.replace(/"/g,`""`)}"`:e}function Dd(e){return e.map(e=>e.map(Ed).join(`,`)).join(`
`)}function Od(e,t){let n=new Blob([`\uFEFF${Dd(t)}`],{type:`text/csv;charset=utf-8`}),r=document.createElement(`a`);r.href=URL.createObjectURL(n),r.download=e,r.click(),URL.revokeObjectURL(r.href)}var kd=e=>!e||e.state===`unknown`||e.state===`unavailable`?`–`:e.state,Ad={off:`noPlanOff`,slots:`noPlanSlots`,threshold:`noPlanThreshold`,computing:`planComputing`,no_prices:`noPlanPrices`,no_profile:`noPlanProfile`,no_room:`noPlanRoom`,no_plan:`noPlan`},Z=(e,t)=>e.hass.states[t],jd=(e,t)=>Z(e,t)?.attributes??{},Q=e=>typeof e==`number`&&Number.isFinite(e)?e:void 0,Md=(e,t)=>R`${e}<small>${t}</small>`,Nd=(e,t)=>{let n=jd(e,t);if(n.simulation!==`dynamic_buy_price`)return;let r=Q(n.simulation_dynamic_eur);if(r===void 0)return;let i=n.simulation_kind===`saving`?`saving`:`cost`,a=n.simulation_comparable===!0;return{sim:r,delta:a?Q(n.simulation_delta_eur):void 0,kind:i,comparable:a}},Pd=(e,t)=>R`<div class="row"><span>${e}</span><b>${t}</b></div>`,Fd=e=>[[`time`,`soc_pct`,`pv_w`,`house_w`,`grid_w`,`phase`],...e.trajectory_points.map((t,n)=>[new Date(t[0]).toISOString(),String(t[1]),String(e.pv_points[n]?.[1]??``),String(e.house_points[n]?.[1]??``),String(e.grid_points[n]?.[1]??``),e.trajectory_phases[n]??``])],Id=e=>[[`time`,`phase`,`reason`],...(e.timeline??[]).map(e=>[new Date(e.ts).toISOString(),e.phase,e.reason])],Ld=e=>q(Z(e,W.debug)),Rd=e=>{let t=Z(e,W.debugLog),n=t?.attributes?.lines;if(Array.isArray(n)&&n.length>0)return n.map(String).join(`
`);let r=t?.state;return!r||r===`unknown`||r===`unavailable`?e.i18n.t(`debugEmpty`):r};function zd(e,t,n){return R`<div class="soc-gauge" role="img" aria-label=${`${Math.round(e)}% ${t}`}>
    <div class="soc-disc" style=${`background:${Xr(e,n)}`}></div>
    <div class="soc-readout">
      <b>${Math.round(e)}%</b>
      <span>${t}</span>
    </div>
  </div>`}function Bd(e){return R`<p class="reserve-hint"><i></i>${e}</p>`}function Vd(e,t,n,r,i){let a=wl(n);return R`<div class="soc-pack">
    ${El(`${Math.round(e)}% ${t}`,e,a,{live:!0,reserve:r})}
    <div class="soc-pack-readout">
      <b>${Math.round(e)}%</b>
      <span>${t}</span>
    </div>
    ${i?Bd(i):B}
  </div>`}function Hd(e,t,n,r){let{t:i}=e.i18n,a=kd(Z(e,W.autonomy)),o=sn(a===`–`?void 0:a),s=o===void 0?t??0:Math.min(100,o/12*100),c=an(jd(e,W.trajectory)),l=c?fn(c.trajectory_points,c.grid_points,{reserve:r,currentSoc:t,currentGrid:K(Z(e,W.grid)),battery:c.battery_points}):void 0,u=l?.peakSoc,d=Math.max(0,Math.min(100,u??t??0)),f=Math.max(0,Math.min(100,t??0)),p=r!==void 0&&Number.isFinite(r)?Math.max(0,Math.min(100,r)):void 0,m=[l?l.peakAt===void 0?i(`forecastNoPeak`):i(l.peakDay===`today`?`forecastPeakToday`:`forecastPeakTomorrow`,{v:e.fmt.time(l.peakAt)}):void 0,l?.floorAt===void 0?void 0:i(l.floorKind===`up`?`forecastFloorReach`:p?`forecastFloor`:`forecastEmpty`,{v:e.fmt.time(l.floorAt)}),l?l.gridImportKind===`ongoing`?i(`forecastGridOngoing`):l.gridImportKind===`until`&&l.gridImportAt!==void 0?i(`forecastGridUntil`,{v:e.fmt.time(l.gridImportAt)}):l.gridImportKind===`starts`&&l.gridImportAt!==void 0?i(`forecastGrid`,{v:e.fmt.time(l.gridImportAt)}):i(`forecastNoGrid`):void 0,n!==void 0&&(u===void 0||Math.round(n)!==Math.round(u))?i(`tagTargetSoc`,{v:Math.round(n)}):void 0].filter(Boolean);return R`<div class="soc-metrics">
    <div class="soc-metric">
      <div class="soc-metric-head">
        <span>${i(`forecastPeak`)}</span>
        <b>${u===void 0?`–`:`${Math.round(u)}%`}</b>
      </div>
      <div class="soc-track" role="img" aria-label=${`${i(`forecastPeak`)} ${u===void 0?`–`:`${Math.round(u)}%`}`}>
        ${p===void 0?B:R`<i class="soc-track-reserve" style="width:${p}%"></i>`}
        <i class="soc-track-fill" style="width:${f}%"></i>
        ${u===void 0?B:R`<i class="soc-track-mark" style="left:${d}%"></i>`}
      </div>
      ${m.length?R`<div class="soc-metric-sub">
            ${m.map((e,t)=>R`${t?R`<span class="soc-metric-sep" aria-hidden="true">·</span>`:B}<span>${e}</span>`)}
          </div>`:B}
    </div>
    <div class="soc-metric">
      <div class="soc-metric-head">
        <span>${i(`autonomy`)}</span>
        <b>${a}</b>
      </div>
      <div class="soc-track" role="img" aria-label=${`${i(`autonomy`)} ${a}`}>
        <i class="soc-track-fill" style="width:${s}%"></i>
      </div>
      <div class="soc-metric-sub">${i(`autonomyHint`)}</div>
    </div>
  </div>`}var Ud=(e,t,n)=>{if(n(W.unjustified))return t(`kpiGridBatWarn`);let r=Z(e,W.phase)?.state;if(r===`reserve_protection`)return t(`kpiGridBatReserve`);if(r===`emergency`)return t(`kpiGridBatEmergency`);let i=String(Z(e,W.gridToBattery)?.attributes?.charge_reason??``);return i===`reserve`?t(`kpiGridBatReserve`):i===`emergency`?t(`kpiGridBatEmergency`):i===`justified`&&n(W.fixedReserve)?t(`kpiGridBatReserve`):t(i===`justified`||i===`curtailment`||i===`feed_in_limit`||i===`grid_charge`?`kpiGridBatJustified`:`kpiGridBatSub`)};function Wd(e){let{t}=e.i18n,n=K(Z(e,W.soc)),r=K(Z(e,W.targetSoc)),i=K(Z(e,W.battery)),a=t=>q(Z(e,t)),o=a(W.reachable),s=[[t(`chipUnreachable`),!o,`warn`],[t(`chipChargeLock`),a(W.chargeLock),`warn`],[t(`chipDischargeLock`),a(W.dischargeLock),`warn`],[t(`chipHt`),a(W.htProtect),`warn`],[t(`chipCurtail`),a(W.curtail),`warn`],[t(`chipEmergency`),a(W.emergency),`warn`],[t(`chipFeedIn`),a(W.feedInLimit),`warn`],[t(`chipReserveCharge`),Z(e,W.phase)?.state===`reserve_protection`,`on`],[t(`chipGridCharge`),a(W.gridCharge),`on`],[t(`chipBatteryPriority`),a(W.batteryPriority),`warn`],[t(`chipLowYield`),a(W.lowYield),`warn`]].filter(([,e])=>e),c=e.balanceRange,l=c.grain===`day`&&c.live,u=(t,n,r=l?!0:c.grain===`day`&&`day`)=>{let i=r===`day`?e.daySparks?.[t]:r?e.sparks?.[t]:void 0;return i?.length?R`<maestro-chart
      class="spark"
      .options=${za(`spark-${t}-${r===`day`?c.start:`live`}`,[e.theme,i],()=>$r(i,n))}
    ></maestro-chart>`:B},d=(e,t)=>u(e,t,l?!0:c.grain===`day`&&`day`),f=Ct(e.consumers,{arrange:e.arrangeConsumers}),p=e.consumers.some(e=>e.mode===`separate`),m=e.flowStyle===`nodes`&&p,h=e.flowStyle===`city`?void 0:e.flowStyle===`blob`?qu(e.mobile,f.length,p):m?bu(e.mobile,f.length):Ca(e.mobile,f.length),g=e.flowStyle===`blob`?Yu:e.flowStyle===`city`?vd:m?xu:Ta,_=t=>l?K(Z(e,W[t])):e.rangeSums?.[t],v=_,y=l?K(Z(e,W.balance)):nr({feedRevenue:v(`feedRevenue`),saving:v(`saving`),costToday:v(`costToday`),wear:v(`wear`)}),b=!l&&e.rangeSums!==void 0&&y===void 0&&_(`costNet`)===void 0&&_(`saving`)===void 0,ee=t=>`${e.fmt.n(t,2)} €`,x=c.grain===`day`?(c.live,`whenToday`):c.grain===`week`?`whenWeek`:c.grain===`month`?`whenMonth`:`whenYear`,S=c.grain===`day`&&!c.live?e.fmt.day(Wn(c.start)):c.live?t(x):er(c,e.fmt.loc,t(`periodToday`)),te=S,C=t(c.grain===`day`?`groupToday`:c.grain===`week`?`groupWeek`:c.grain===`month`?`groupMonth`:`groupYear`),w=t(c.grain===`day`?`balanceTitle`:c.grain===`week`?`balanceWeek`:c.grain===`month`?`balanceMonth`:`balanceYear`),T=y===void 0||y===0?``:y>0?`pos`:`neg`,ne=Un(),E=(n,r=l)=>{if(!r)return B;let i=Nd(e,n);if(!i)return B;let a=B;if(!i.comparable)a=R`<span class="sim-delta muted">${t(`kpiSimPending`)}</span>`;else if(i.delta!==void 0&&Math.abs(i.delta)>=.005){let n=e.fmt.n(Math.abs(i.delta),2),r=i.kind===`cost`?i.delta<0:i.delta>0,o=i.kind===`cost`?t(i.delta>0?`kpiSimCostlier`:`kpiSimCheaper`,{v:n}):t(i.delta>0?`kpiSimMoreSaving`:`kpiSimLessSaving`,{v:n});a=R`<span class="sim-delta ${r?`pos`:`neg`}">${o}</span>`}return R`<div class="sim-dyn">${t(`kpiSimDynamic`,{v:e.fmt.n(i.sim,2)})} ${a}</div>`},D=er(c,e.fmt.loc,t(`periodToday`)),O=$n(c),k=R`<div class="day-nav cal-nav" role="group" aria-label=${t(`dayNav`)}>
      <button
        type="button"
        class="day-nav-btn"
        aria-label=${t(`dayPrev`)}
        @click=${()=>e.onBalanceSelect(c.grain,Qn(c.grain,c.anchor,-1))}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>
      </button>
      <div class="day-nav-pick">
        <button type="button" class="day-nav-date" aria-label=${t(`dayPick`)} aria-expanded=${e.calOpen} @click=${()=>e.onCalOpen(!e.calOpen)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>
          <span class="day-nav-label">${D}</span>
        </button>
        ${Td({open:e.calOpen,grain:c.grain,selected:c,viewAnchor:e.calViewAnchor,i18n:e.i18n,loc:e.fmt.loc,onClose:()=>e.onCalOpen(!1),onGrain:t=>{e.onCalViewAnchor(c.anchor),e.onBalanceSelect(t,c.anchor)},onViewAnchor:e.onCalViewAnchor,onPick:(t,n)=>{e.onBalanceSelect(t,n),e.onCalOpen(!1)}})}
      </div>
      <button
        type="button"
        class="day-nav-btn"
        aria-label=${t(`dayNext`)}
        ?disabled=${!O}
        @click=${()=>e.onBalanceSelect(c.grain,Qn(c.grain,c.anchor,1))}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
      </button>
      ${c.live&&c.grain===`day`?B:R`<button type="button" class="day-nav-today" @click=${()=>e.onBalanceSelect(`day`,ne)}>${t(`periodToday`)}</button>`}
    </div>`,A=e.forcePowerDraft??K(Z(e,W.forceDischargePower))??100,re=e.reserveDraft??K(Z(e,W.fixedReserveSoc))??0,j=a(W.fixedReserve),M=j?`${t(`fixedReserve`)} ${t(`ctrlReserveSoc`,{v:Math.round(re)})}`:void 0,N=[a(W.ctrlPredictive)?t(`modePredictive`):``,a(W.ctrlPlanShadow)?t(`modeShadow`):``].filter(Boolean).join(` · `),ie=t=>e.fmt.n(K(Z(e,W[t]))),ae=K(Z(e,W.pvToday)),P=Math.max(0,K(Z(e,W.pvExtraToday))??0),F=P>=.05?e.fmt.kwhParts(ae,P):void 0,oe=Vi(K(Z(e,W.pv)),K(Z(e,W.additionalPv))),I=wt(e.consumers,K(Z(e,W.wallboxEnergy))),se=()=>{e.collapsed.has(`today`)&&e.onToggleGroup(`today`)},L=(t,n,r,i,a,o=`grid kpis`)=>{let s=!e.collapsed.has(t);return R`<section class="group">
      <div class="group-bar">
        <button type="button" class="group-head ${s?`open`:``}" aria-expanded=${s} @click=${()=>e.onToggleGroup(t)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
          <span>${n}</span>
          ${s?B:r}
        </button>
        ${a??B}
      </div>
      ${s?R`<div class=${o}>${i}</div>`:B}
    </section>`};return R`
    ${zs(e)}
    <div class="grid live-top">
      <div class="card">
        <div class="card-head">
          <div>
            <h3>${t(`flowTitle`)}</h3>
            <div class="sub live-state">${t(`flowSub`)}<i class="live-dot ${o?`ok`:`bad`}" role="img" aria-label=${t(o?`chipReachable`:`chipUnreachable`)}></i></div>
            ${N?R`<div class="sub mode-line">${N}</div>`:B}
          </div>
          <div class="flow-head-actions">
            <button
              type="button"
              class="icon-btn"
              aria-label=${t(`pvPlantDetails`)}
              title=${t(`pvPlantDetails`)}
              @click=${()=>e.onOpenRoom(`pv`)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21"/></svg>
            </button>
            <button
              type="button"
              class="icon-btn"
              aria-label=${t(`gridPlantDetails`)}
              title=${t(`gridPlantDetails`)}
              @click=${()=>e.onOpenRoom(`grid`)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h16M4 16h16"/><path d="M8 4v16M16 4v16"/></svg>
            </button>
            <div class="flow-opts-wrap">
              <button
                type="button"
                class="icon-btn ${e.flowOptsOpen?`on`:``}"
                aria-label=${t(`flowOpts`)}
                title=${t(`flowOpts`)}
                aria-expanded=${e.flowOptsOpen}
                aria-haspopup="dialog"
                @click=${()=>e.onOpenFlowOpts()}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2.2"/><circle cx="8" cy="17" r="2.2"/></svg>
              </button>
              ${e.flowOptsOpen?rf(e):B}
            </div>
          </div>
        </div>
        ${e.arrangeConsumers?R`<div class="flow-arrange-bar">
              <p class="flow-arrange-hint">${t(`arrangeHint`)}
                <button type="button" class="linkish" @click=${e.onResetConsumerPlaces}>${t(`arrangeReset`)}</button>
              </p>
              <button type="button" class="btn primary" @click=${e.onToggleArrange}>${t(`arrangeDone`)}</button>
            </div>`:B}
        <div class="flow-wrap ${e.flowStyle} ${e.arrangeConsumers?`arrange`:``}" style=${h?`height:${h}px`:B}>
          ${g({pv:oe.pv,pvExtra:oe.pvExtra,house:K(Z(e,W.house)),grid:K(Z(e,W.grid)),battery:i,loadMax:K(Z(e,W.inverterPower)),soc:n,consumers:f,consumerPlaces:e.consumerPlaces,arrange:e.arrangeConsumers,onPlaceConsumer:e.onPlaceConsumer,motion:e.motion,onSelect:e.onFlowNode,compact:e.mobile,outline:Ao(e.theme),fmt:e.fmt,i18n:e.i18n})}
        </div>
        <button type="button" class="flow-day" @click=${se} aria-label=${t(`flowDayOpen`)}>
          <span class="flow-day-label">${t(`flowDay`)}</span>
          ${F?R`<span>${t(`nodePv`)} ${F.total}</span>
                <span class="flow-day-sep" aria-hidden="true">·</span>
                <span>${t(`nodePvExtra`)} ${F.extra} · ${t(`nodePvMain`)} ${F.main}</span>`:R`<span>${t(`nodePv`)} ${e.fmt.n(ae)}</span>`}
          <span class="flow-day-sep" aria-hidden="true">·</span>
          <span>${t(`nodeHouse`)} ${ie(`houseToday`)}</span>
          <span class="flow-day-sep" aria-hidden="true">·</span>
          <span>${t(`flowDayImport`)} ${ie(`importToday`)}</span>
          <span class="flow-day-sep" aria-hidden="true">·</span>
          <span>${t(`flowDayFeed`)} ${ie(`feedToday`)}</span>
          <span class="flow-day-unit">kWh</span>
        </button>
        ${I.length?R`<div class="flow-day flow-day-extra">
              <span class="flow-day-label">${t(`flowDaySeparate`)}</span>
              ${I.map((t,n)=>R`${n?R`<span class="flow-day-sep" aria-hidden="true">·</span>`:B}
                  <span>${t.name} ${e.fmt.n(t.kwh)}</span>`)}
              <span class="flow-day-unit">kWh</span>
            </div>`:B}
        ${e.consumerOverflow?R`<p class="err">${t(`consumersOverflow`)}</p>`:B}
      </div>
      <div class="card soc-card">
        <div class="card-head soc-head">
          <h3>${t(`battery`)}</h3>
          <div class="flow-head-actions">
            <button
              type="button"
              class="icon-btn"
              aria-label=${t(`batteryPlantDetails`)}
              title=${t(`batteryPlantDetails`)}
              @click=${()=>e.onOpenRoom(`battery`)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="6" width="10" height="15" rx="2"/><path d="M10 4h4"/></svg>
            </button>
            <div class="flow-style" role="radiogroup" aria-label=${t(`batteryStyleLabel`)}>
              ${uo.map(n=>R`<button
                  type="button"
                  class="flow-style-btn ${e.batteryStyle===n?`on`:``}"
                  role="radio"
                  aria-checked=${e.batteryStyle===n}
                  @click=${()=>e.onBatteryStyle(n)}
                >${t(n===`pack`?`batteryStylePack`:`batteryStyleRing`)}</button>`)}
            </div>
          </div>
        </div>
        <div class="soc-visual">
          ${n===void 0?R`<p class="empty">${t(`unavailable`)}</p>`:e.batteryStyle===`pack`?Vd(n,t(`stateOfCharge`),i,j?re:void 0,M):R`${zd(n,t(`stateOfCharge`),j?re:void 0)}
                ${M?Bd(M):B}`}
        </div>
        ${Hd(e,n,r,j?re:void 0)}
        <button type="button" class="soc-ctrl-btn" @click=${()=>e.onOpenBatteryCtrl()}>
          <span class="soc-ctrl-copy">
            <span class="soc-ctrl-label">${t(`batteryCtrl`)}</span>
            <span class="soc-ctrl-meta">${nf(e,A,re)}</span>
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        </button>
      </div>
    </div>
    ${s.length?R`<div class="chips">
          ${s.map(([e,,t])=>R`<span class="chip ${t}"><i></i>${e}</span>`)}
        </div>`:B}
    <div class="range-bar">${k}</div>
    ${b?R`<p class="hint range-empty">${t(`rangeEmpty`)}</p>`:B}
    ${L(`today`,C,R`<b class="group-sum">${ee(_(`costNet`))}<small>${t(`groupNet`)}</small></b>`,R`
      <div class="card kpi">
        <h3>${t(`kpiCost`,{when:S})}</h3>
        <div class="v">${Md(e.fmt.n(_(`costNet`),2),`€`)}${E(W.costNet)}</div>
        <div class="delta">${t(`kpiCostSub`)}</div>
        ${u(`costNet`,J.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiSaving`,{when:S})}</h3>
        <div class="v">${Md(e.fmt.n(_(`saving`),2),`€`)}${E(W.saving)}</div>
        <div class="delta">${t(`kpiSavingSub`)}</div>
        ${u(`saving`,J.gridOut)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiSelf`,{when:S})}</h3>
        <div class="v">${Md(e.fmt.n(_(`selfUse`)),`kWh`)}</div>
        <div class="delta">${t(`kpiSelfSub`,{imp:e.fmt.n(_(`importToday`)),feed:e.fmt.n(_(`feedToday`))})}</div>
        ${u(`selfUse`,J.pv)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiBattery`,{when:S})}</h3>
        <div class="v">${Md(e.fmt.n(_(`chargedToday`)),`kWh`)}</div>
        <div class="delta">${t(`kpiBatterySub`,{out:e.fmt.n(_(`dischargedToday`))})}</div>
        ${u(`chargedToday`,J.bat)}
      </div>
    `)}
    ${L(`balance`,w,R`<b class="group-sum ${T}">${ee(y)}</b>`,R`
      <div class="card kpi">
        <h3>${t(`kpiCostGross`)}</h3>
        <div class="v">${Md(e.fmt.n(v(`costToday`),2),`€`)}${E(W.costToday,l)}</div>
        <div class="delta">${t(`kpiCostGrossSub`)}</div>
        ${d(`costToday`,J.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiRevenue`)}</h3>
        <div class="v">${Md(e.fmt.n(v(`feedRevenue`),2),`€`)}</div>
        <div class="delta">${t(`kpiRevenueSub`,{when:te})}</div>
        ${d(`feedRevenue`,J.gridOut)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiWear`)}</h3>
        <div class="v">${Md(e.fmt.n(v(`wear`),2),`€`)}</div>
        <div class="delta">${t(`kpiWearSub`)}</div>
        ${d(`wear`,J.accent2)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiBalance`)}</h3>
        <div class="v">${Md(e.fmt.n(y,2),`€`)}</div>
        <div class="delta">${t(`kpiBalanceSub`)}</div>
        ${d(`balance`,J.accent)}
      </div>
      <div class="card kpi ${l&&a(W.unjustified)?`alert`:``}">
        <h3>${t(`kpiGridBat`)}</h3>
        <div class="v">${Md(e.fmt.n(v(`gridToBattery`)),`kWh`)}</div>
        <div class="delta">${l?Ud(e,t,a):t(`kpiGridBatSub`)}</div>
        ${d(`gridToBattery`,J.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiWallbox`,{when:te})}</h3>
        <div class="v">${Md(e.fmt.n(v(`wallboxEnergy`)),`kWh`)}</div>
        <div class="delta">${t(`kpiWallboxSub`)}</div>
        ${d(`wallboxEnergy`,J.house)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiFeedLimit`)}</h3>
        <div class="v">${Md(e.fmt.n(v(`curtailAvoided`)),`kWh`)}</div>
        <div class="delta">${t(`kpiFeedLimitSub`,{n:e.fmt.n(v(`feedInInterventions`),0),dc:e.fmt.n(v(`feedInAvoided`))})}</div>
        ${d(`curtailAvoided`,J.pv)}
      </div>
    `)}
    ${(()=>{let n=e.pulseDays??[],r=e.pulseRange===`year`,i=r?ar(n):n,a=i.filter(e=>e.balance!==void 0),o=a.length?a.reduce((e,t)=>e+t.balance,0):void 0,s=o===void 0||o===0?``:o>0?`pos`:`neg`,c=a.map(e=>[e.ts,e.balance]),l=s===`neg`?J.gridIn:J.gridOut,u=e.pulseState??`idle`,d=u===`error`?R`<p class="err">${t(`historyFailed`)}</p>`:u===`loading`&&!n.length?R`<p class="hint">${t(`loading`)}</p>`:a.length?R`<maestro-chart
                  class="pulse-chart"
                  .options=${za(`pulse-${e.pulseRange}`,[e.theme,e.fmt.loc,i,r],()=>ai({days:i,monthly:r,fmt:e.fmt,i18n:e.i18n,onDay:t=>e.onBalanceSelect(r?`month`:`day`,t)}))}
                ></maestro-chart>`:R`<p class="hint">${t(`pulseEmpty`)}</p>`,f=e=>e===`week`?`periodWeek`:e===`month`?`periodMonth`:`periodYear`;return L(`balancePulse`,t(`pulseTitle`),R`<span class="pulse-sum">
          ${c.length?R`<maestro-chart class="pulse-spark" .options=${za(`pulse-spark-${e.pulseRange}`,[e.theme,c],()=>$r(c,l))}></maestro-chart>`:B}
          <b class="group-sum ${s}">${ee(o)}</b>
        </span>`,d,R`<div class="seg period" role="group" aria-label=${t(`pulseTitle`)}>
          ${[`week`,`month`,`year`].map(n=>R`<button class=${e.pulseRange===n?`active`:``} aria-pressed=${e.pulseRange===n} @click=${()=>e.onPulseRange(n)}>${t(f(n))}</button>`)}
        </div>`,`pulse-body`)})()}`}var Gd=(e,t)=>e(t===`ok`?`qualityOk`:t===`pv_fallback`?`qualityPv`:t===`consumption_fallback`?`qualityConsumption`:t===`both_fallback`?`qualityBoth`:`qualityUnknown`),Kd=(e,t)=>{let n=K(Z(e,t));return n===void 0?`–`:`${Math.round(n)} %`},qd=[{key:`pv`,color:J.pv,label:`legendPv`},{key:`house`,color:J.house,label:`legendHouse`},{key:`import`,color:J.gridIn,label:`legendImport`},{key:`feed`,color:J.gridOut,label:`legendFeed`}];function Jd(e){let{t}=e.i18n,n=jd(e,W.trajectory),r=an(n);if(!r)return R`<div class="card"><p class="empty">${t(`noForecast`)}</p></div>`;let i=jd(e,W.plan),a=yn(i.plan_slots),o=bn(a),s=Sn(a),c=o.length>=2,l=i.controlling===!0,u=c&&!l,d=c?`chartTitleStrategy`:`chartTitle`,f=c&&l?Math.min(...o.map(e=>e[1])):Q(n.min_soc),p=c&&l?Math.max(...o.map(e=>e[1])):Q(n.max_soc),m=(e,t)=>R`<div class="card stat"><h3>${e}</h3><div class="v">${t}</div></div>`,h=[...e.forecastHidden].sort().join(`,`),g=t(u?`legendSocExpected`:c?`legendPlanSoc`:`legendSoc`),_=e.forecastZoom?{from:e.forecastZoom[0],to:e.forecastZoom[1]}:Cn(r,e.range,{showIst:e.showIst,istStart:e.ist?.pv[0]?.[0]??e.ist?.soc[0]?.[0]}),v=a.length?Tn(a,_.from,_.to):[];return R`
    <div class="card forecast-card">
      <div class="chart-head">
        <div class="grow">
          <h3>${t(d)}</h3>
          ${c?R`<span class="badge forecast-badge">${t(l?`planActive`:`planShadow`)}</span>`:B}
          <div class="legend" role="group" aria-label=${t(`legendToggleHint`)}>
            <button
              type="button"
              class="legend-toggle ${e.hideExpectedSoc?`off`:``}"
              aria-pressed=${!e.hideExpectedSoc}
              title=${t(`legendToggleHint`)}
              @click=${()=>e.onToggleHideExpectedSoc()}
            ><i style="background:${J.bat}"></i>${g}</button>
            ${u?R`<button
                    type="button"
                    class="legend-toggle ${e.hideShadowSoc?`off`:``}"
                    aria-pressed=${!e.hideShadowSoc}
                    title=${t(`legendToggleHint`)}
                    @click=${()=>e.onToggleHideShadowSoc()}
                  ><i style="background:${J.accent2};height:2px;border-radius:0"></i>${t(`legendPlanSocShadow`)}</button>
                  ${s.length>=2?R`<button
                        type="button"
                        class="legend-toggle ${e.hideShadowImport?`off`:``}"
                        aria-pressed=${!e.hideShadowImport}
                        title=${t(`legendToggleHint`)}
                        @click=${()=>e.onToggleHideShadowImport()}
                      ><i style="background:${J.gridIn};height:2px;border-radius:0;opacity:0.85"></i>${t(`legendImportShadow`)}</button>`:B}`:B}
            ${qd.map(({key:n,color:r,label:i})=>R`<button
                type="button"
                class="legend-toggle ${e.forecastHidden.has(n)?`off`:``}"
                aria-pressed=${!e.forecastHidden.has(n)}
                title=${t(`legendToggleHint`)}
                @click=${()=>e.onToggleForecastSeries(n)}
              ><i style="background:${r}"></i>${t(i)}</button>`)}
          </div>
        </div>
        <div class="chart-tools">
          <button class="toggle ${e.showIst?`active`:``}" aria-pressed=${e.showIst} @click=${e.onToggleIst}>${t(`actualOverlay`)}</button>
          ${e.mobile?B:R`<button class="toggle" @click=${()=>Od(`maestro-prognose.csv`,Fd(r))}>${t(`exportCsv`)}</button>`}
          <div class="seg" role="group">
            ${[6,12,24,48].map(n=>R`<button class=${e.range===n?`active`:``} aria-pressed=${e.range===n} @click=${()=>e.onRange(n)}>${t(`hoursShort`,{h:n})}</button>`)}
          </div>
        </div>
      </div>
      <maestro-chart
        id="fc-main"
        .options=${za(`forecast`,[e.theme,Z(e,W.trajectory),Z(e,W.plan),Z(e,W.targetSoc)?.state,e.ist,e.showIst,h,e.hideShadowSoc,e.hideExpectedSoc,e.hideShadowImport,e.mobile,e.fmt.loc],()=>qr({traj:r,targetSoc:K(Z(e,W.targetSoc)),planSoc:c?o:void 0,planShadow:u,hideShadowSoc:e.hideShadowSoc,hideExpectedSoc:e.hideExpectedSoc,hideShadowImport:e.hideShadowImport,planImport:u&&s.length>=2?s:void 0,ist:e.ist,showIst:e.showIst,hiddenPower:e.forecastHidden,compact:e.mobile,fmt:e.fmt,i18n:e.i18n,onZoom:e.onForecastZoom,onLayout:e.onForecastLayout}))}
      ></maestro-chart>
      ${v.length?R`<div class="strategy-strip" aria-label=${t(`strategyStrip`)}>
            <div class="strip-head">
              <h4>${t(`strategyStrip`)}</h4>
              <div class="legend">
                <span><i style="background:${J.gridOut}"></i>${t(`legendCharge`)}</span>
                <span><i style="background:${J.pv}"></i>${t(`legendHold`)}</span>
                <span><i style="background:${J.bat}"></i>${t(`legendRelease`)}</span>
              </div>
            </div>
            <div class="strip-track">
              <div class="strip timed">
                ${v.map(n=>{let r=n.action===`charge`?t(`legendCharge`):n.action===`hold`?t(`legendHold`):t(`legendRelease`);return R`<div
                    class="slot ${n.action}"
                    style="left:${n.leftPct}%;width:${Math.max(n.widthPct,.15)}%"
                    title="${n.startLocal} · ${e.fmt.n(n.price*100)} ct · ${r}"
                  ></div>`})}
              </div>
            </div>
          </div>`:B}
      ${e.mobile?B:R`<maestro-chart id="fc-brush" .options=${za(`brush`,[e.theme,Z(e,W.trajectory)],()=>Jr(r))}></maestro-chart>`}
    </div>
    <div class="grid stat-row">
      ${m(t(`statMinMax`),R`${Math.round(f??0)}<small>%</small> / ${Math.round(p??0)}<small>%</small>`)}
      ${m(t(`statImport`),Md(e.fmt.n(Q(n.grid_draw_kwh)),`kWh`))}
      ${m(t(`statFeed`),Md(e.fmt.n(Q(n.grid_feed_in_kwh)),`kWh`))}
      ${m(t(`statAutarky`),Md(e.fmt.n(Q(n.self_sufficiency_pct)),`%`))}
      ${m(t(`statPvTomorrow`),Md(e.fmt.n(K(Z(e,W.pvTomorrow))),`kWh`))}
    </div>
    <div class="grid stat-row">
      ${m(t(`qualityLabel`),Gd(t,Z(e,W.forecastQuality)?.state))}
      ${m(t(`statP10`),Md(e.fmt.n(K(Z(e,W.p10))),`kWh`))}
      ${m(t(`statDeficit`),Md(e.fmt.n(K(Z(e,W.deficit))),`kWh`))}
      ${m(t(`statYield`),R`${e.fmt.n((()=>{let t=K(Z(e,W.yieldRatio));return t===void 0?void 0:t*100})())}<small>%</small>`)}
    </div>
    <p class="sub yield-note">${t(`statYieldSub`,{today:e.fmt.n(K(Z(e,W.yieldToday))),ref:e.fmt.n(K(Z(e,W.yieldRef)))})}</p>`}var Yd=(e,t,n)=>R`<div class="row"><span>${e}</span><b style=${n?`color:${n}`:``}>${t}</b></div>`;function Xd(e,t){let{t:n}=e.i18n,{fmt:r}=e,i=Q(t.floor_pct),a=Q(t.ceiling_pct),o=Q(t.efficiency),s=Q(t.min_spread),c=Q(t.wear_eur_per_kwh),l=Q(t.safety_factor),u=typeof t.provider_until==`string`?e.fmt.dayTime(t.provider_until):void 0,d=typeof t.known_until==`string`?e.fmt.dayTime(t.known_until):void 0;return i===void 0&&a===void 0&&o===void 0&&s===void 0?B:R`<div class="plan-diag">
    <h4>${n(`planDiag`)}</h4>
    ${i===void 0?B:Yd(n(`planFloor`),`${r.n(i,0)} %`)}
    ${a===void 0?B:Yd(n(`planCeiling`),`${r.n(a,0)} %`)}
    ${o===void 0?B:Yd(n(`planEfficiency`),r.n(o,2))}
    ${s===void 0?B:Yd(n(`planMinSpread`),`${r.n(s*100,1)} ct/kWh`)}
    ${c===void 0?B:Yd(n(`planWear`),`${r.n(c,3)} €/kWh`)}
    ${l===void 0?B:Yd(n(`planSafety`),r.n(l,2))}
    ${u?Yd(n(`planProviderUntil`),u):B}
    ${u&&d?Yd(n(`planForecastUntil`),d):B}
  </div>`}function Zd(e){let{t}=e.i18n,n=jd(e,W.plan),r=yn(n.plan_slots),i=Hc(e.hass),a=yl({...e,priceSensor:e.options.ready?!!e.options.options.price_sensor:void 0}),o=Xd(e,n);if(!r.length){let e=Nn(i,n),r=typeof n.message==`string`&&n.message&&e!==`computing`?n.message:``;return R`<div class="card">
      <div class="empty plan-empty ${e===`computing`?`busy`:``}" role="status">
        ${e===`computing`?R`<span class="spinner" aria-hidden="true"></span>`:B}
        <p>${t(Ad[e])}</p>
        ${r?R`<p class="sub">${r}</p>`:B}
      </div>
      ${o}
    </div>${a}`}let s=An(r),c=Mn(r),l=r.some(e=>e.forecast),u=[[J.gridOut,t(`legendCharge`)],[J.pv,t(`legendHold`)],[J.bat,t(`legendRelease`)]],d=typeof n.known_until==`string`?e.fmt.dayTime(n.known_until):`–`,f=t=>`${e.fmt.n(t.price*100)} ct · ${t.start_local}`,p=e.planZoom?{from:e.planZoom[0],to:e.planZoom[1]}:wn(s),m=s.length?Tn(s,p.from,p.to):[];return R`
    <div class="grid plan-top">
      <div class="card plan-card">
        <div class="chart-head">
          <div class="grow">
            <h3>${t(`priceTitle`)}</h3>
            <span class="badge forecast-badge">${n.shadow_mode?t(`planShadow`):t(`planActive`)}</span>
            <div class="legend">
              ${u.map(([e,t])=>R`<span><i style="background:${e}"></i>${t}</span>`)}
              ${l?R`<span><i style="background:rgba(34,211,238,0.38)"></i>${t(`legendForecast`)}</span>`:B}
              <span><i style="background:#fff;height:2px;border-radius:0"></i>${t(`legendPlanSoc`)}</span>
            </div>
          </div>
        </div>
        <maestro-chart
          id="plan-main"
          .options=${za(`plan`,[e.theme,Z(e,W.plan),e.mobile,e.fmt.loc],()=>Yr({slots:r,fmt:e.fmt,i18n:e.i18n,compact:e.mobile,onZoom:e.onPlanZoom,onLayout:e.onPlanLayout}))}
        ></maestro-chart>
        ${e.mobile||!m.length?B:R`<div class="strategy-strip plan-slots-strip" aria-hidden="true">
              <div class="strip-track">
                <div class="strip timed">
                  ${m.map(t=>R`<div
                        class="slot ${t.action}${t.forecast?` forecast`:``}"
                        style="left:${t.leftPct}%;width:${Math.max(t.widthPct,.15)}%"
                        title="${t.startLocal} · ${e.fmt.n(t.price*100)} ct"
                      ></div>`)}
                </div>
              </div>
            </div>`}
      </div>
      <div class="card plan-kpi">
        <div>
          <h3>${t(`planTitle`)}</h3>
          <div class="plan-state">${kd(Z(e,W.plan))}</div>
          <div class="sub msg">${typeof n.message==`string`?n.message:``}</div>
        </div>
        <div>
          ${Yd(t(`planStrategy`),i?e.i18n.option(i):`–`)}
          ${Yd(t(`planGridCharge`),`${e.fmt.n(Q(n.total_grid_charge_kwh),2)} kWh`)}
          ${Yd(t(`planSaving`),`${e.fmt.n(Q(n.expected_saving_eur),2)} €`,`var(--ok)`)}
          ${c?Yd(t(`planCheapest`),f(c.min)):B}
          ${c?Yd(t(`planMostExpensive`),f(c.max)):B}
          ${Yd(t(`planKnownUntil`),d)}
        </div>
        ${o}
      </div>
    </div>
    ${a}`}var Qd=e=>{let t=Math.floor(e),n=Math.round((e-t)*60);return n?`${t}:${String(n).padStart(2,`0`)}`:String(t)};function $d(e){let t=jd(e,W.autoStrategy).overrides;return t&&typeof t==`object`?t:{}}function ef(e){let t=$d(e),n=Q(t.morning_cap_soc),r=Q(t.morning_cap_until_h);if(n!==void 0&&r!==void 0)return e.i18n.t(`autoCap`,{soc:Math.round(n),hour:Qd(r)})}function tf(e){let{t}=e.i18n;if(!q(Z(e,W.ctrlAuto)))return{text:t(`autoOff`),tone:``};let n=jd(e,W.autoStrategy),r=typeof n.objective==`string`&&n.objective?e.i18n.option(n.objective):`–`;if(n.fallback===!0)return{text:t(`autoData`,{goal:r}),tone:`warn`};if(typeof n.last_run!=`string`)return{text:t(`autoPending`,{goal:r}),tone:``};let i=K(Z(e,W.autoSaving));return{text:t(`autoOn`,{goal:r,eur:i===void 0?`–`:`${i>0?`+`:``}${e.fmt.n(i,2)} €`}),tone:`on`}}function nf(e,t,n){let{t:r}=e.i18n,i=[];return q(Z(e,W.forceDischarge))&&i.push(r(`controlsForceOn`,{v:e.fmt.w(t)})),q(Z(e,W.fixedReserve))&&i.push(r(`controlsReserveOn`,{v:Math.round(n)})),q(Z(e,W.ctrlAuto))&&i.push(tf(e).text),i.length?i.join(` · `):r(`batteryCtrlIdle`)}function rf(e){let{t}=e.i18n,n={nodes:{title:`flowStyleNodes`,hint:`flowStyleNodesHint`},blob:{title:`flowStyleBlob`,hint:`flowStyleBlobHint`},city:{title:`flowStyleCity`,hint:`flowStyleCityHint`}},r=e.consumers.length>0;return R`
    <div class="flow-opts-scrim" @click=${()=>e.onCloseFlowOpts()}></div>
    <div class="flow-opts-menu" role="dialog" aria-label=${t(`flowOptsTitle`)}>
      <div class="flow-opts-body">
        <section class="flow-opts-block">
          <b class="flow-opts-section">${t(`flowStyleLabel`)}</b>
          <div class="theme-choices flow-opts-choices" role="radiogroup" aria-label=${t(`flowStyleLabel`)}>
            ${oi.map(r=>R`<button
                type="button"
                class="theme-choice ${e.flowStyle===r?`on`:``}"
                role="radio"
                aria-checked=${e.flowStyle===r}
                @click=${()=>e.onFlowStyle(r)}
              >
                <span class="swatch flow-${r}" aria-hidden="true"></span>
                <span class="txt"><b>${t(n[r].title)}</b><span>${t(n[r].hint)}</span></span>
              </button>`)}
          </div>
        </section>
        <section class="flow-opts-block">
          <b class="flow-opts-section">${t(`flowOptsConsumers`)}</b>
          ${r?R`<button
                type="button"
                class="btn flow-opts-action ${e.arrangeConsumers?`primary`:``}"
                aria-pressed=${e.arrangeConsumers}
                @click=${()=>{e.onToggleArrange(),e.onCloseFlowOpts()}}
              >${e.arrangeConsumers?t(`arrangeDone`):t(`arrangeConsumers`)}</button>`:B}
          <button
            type="button"
            class="btn flow-opts-action"
            @click=${()=>{e.onCloseFlowOpts(),e.onEditConsumers()}}
          >${t(`editConsumers`)}</button>
        </section>
      </div>
    </div>
  `}function af(e){let{t}=e.i18n,n=Z(e,W.forceDischargePower),r=n?.attributes??{},i=typeof r.min==`number`?r.min:100,a=typeof r.max==`number`?r.max:1e4,o=typeof r.step==`number`?r.step:100,s=e.forcePowerDraft??K(n)??i,c=Z(e,W.fixedReserveSoc),l=c?.attributes??{},u=typeof l.min==`number`?l.min:0,d=typeof l.max==`number`?l.max:100,f=typeof l.step==`number`?l.step:1,p=e.reserveDraft??K(c)??u,m=q(Z(e,W.ctrlAuto)),h=jd(e,W.autoStrategy),g=Z(e,W.selAuto),_=Array.isArray(g?.attributes.options)?g.attributes.options:[],v=K(Z(e,W.autoSaving)),y=typeof h.last_run==`string`,b=ef(e),ee=tf(e),x=m?h.fallback===!0?R`<p class="sub">${t(`autoFallback`)}</p>`:y?R`<p class="sub">${b??t(`autoNone`)}</p>`:B:B,S=(t,n)=>R`<button
    class="switch ${q(Z(e,t))?`on`:``}"
    role="switch"
    aria-checked=${q(Z(e,t))}
    aria-label=${n}
    ?disabled=${!Z(e,t)||e.pending.has(t)}
    @click=${()=>e.onToggle(t)}
  ></button>`;return R`
    <div class="scrim open hist-scrim" @click=${()=>e.onCloseBatteryCtrl()}></div>
    <aside class="overlay battery-ctrl" role="dialog" aria-modal="true" aria-label=${t(`batteryCtrlTitle`)} ?inert=${!e.batteryCtrlOpen}>
      <div class="sheet-head">
        <div class="grow">
          <h2>${t(`batteryCtrlTitle`)}</h2>
          <div class="sub">${t(`batteryCtrlSub`)}</div>
        </div>
        <button class="btn" @click=${()=>e.onCloseBatteryCtrl()}>${t(`close`)}</button>
      </div>
      <div class="battery-ctrl-body">
        <section class="battery-ctrl-block">
          <div class="force">
            <div class="txt"><b>${t(`forceTitle`)}</b><span>${t(`ctrlForcePower`,{v:e.fmt.w(s)})}</span></div>
            ${S(W.forceDischarge,t(`forceTitle`))}
            ${Qt({label:t(`ctrlForcePower`,{v:``}),min:i,max:a,step:o,value:s,disabled:!n||n.state===`unavailable`,onPreview:e.onPowerDraft,onCommit:e.onPowerCommit})}
          </div>
        </section>
        <section class="battery-ctrl-block">
          <div class="force">
            <div class="txt"><b>${t(`fixedReserve`)}</b><span>${t(`ctrlReserveSoc`,{v:Math.round(p)})}</span></div>
            ${S(W.fixedReserve,t(`fixedReserve`))}
            ${Qt({label:t(`fixedReserve`),min:u,max:d,step:f,value:p,unit:`%`,disabled:!c||c.state===`unavailable`,onPreview:e.onReserveDraft,onCommit:e.onReserveCommit})}
          </div>
        </section>
        <section class="battery-ctrl-block">
          <div class="force">
            <div class="txt"><b>${t(`autoTitle`)}</b><span class="grip-state ${ee.tone}">${ee.text}</span></div>
            ${S(W.ctrlAuto,t(`autoTitle`))}
          </div>
          <div class="force">
            <div class="txt"><b>${t(`autoObjective`)}</b></div>
            <select
              aria-label=${t(`autoObjective`)}
              .value=${g?.state??``}
              ?disabled=${!g||g.state===`unavailable`||e.pending.has(W.selAuto)}
              @change=${t=>e.onSelect(W.selAuto,t.target.value)}
            >
              ${_.map(t=>R`<option value=${t} ?selected=${t===g?.state}>${e.i18n.option(t)}</option>`)}
            </select>
          </div>
          ${m&&h.fallback!==!0&&v!==void 0?R`<div class="row"><span>${t(`autoSaving`)}</span><b>${v>0?`+`:``}${e.fmt.n(v,2)} €</b></div>`:B}
          ${x}
          <p class="sub">${t(`autoLiveHint`)}</p>
        </section>
      </div>
    </aside>
  `}var of=e=>typeof e==`string`&&e?e:typeof e==`number`&&Number.isFinite(e)?String(e):typeof e==`boolean`?e?`1`:`0`:`–`;function sf(e){let{t}=e.i18n,n=jd(e,W.autoStrategy),r=(t,n,r,i)=>Pd(t,`${e.fmt.n(Q(n),r)} ${i}`);return R`
    ${Pd(t(`autoTitle`),kd(Z(e,W.autoStrategy)))}
    ${Pd(t(`autoObjective`),of(n.objective))}
    ${Pd(t(`autoLastRun`),typeof n.last_run==`string`?e.fmt.dayTime(n.last_run):`–`)}
    ${Pd(t(`autoFallback`),n.fallback===!0?t(`optYes`):n.fallback===!1?t(`optNo`):`–`)}
    ${typeof n.fallback_reason==`string`&&n.fallback_reason?Pd(t(`autoReason`),n.fallback_reason):B}
    ${Pd(t(`autoGrid`),of(n.grid_size))}
    ${Pd(t(`autoSaving`),`${e.fmt.n(K(Z(e,W.autoSaving)),2)} €`)}
    ${r(t(`autoDeltaDraw`),n.delta_grid_draw_kwh,2,`kWh`)}
    ${r(t(`autoDeltaFeed`),n.delta_grid_feed_in_kwh,2,`kWh`)}
    ${r(t(`autoDeltaCurtail`),n.delta_curtailed_kwh,2,`kWh`)}
    ${r(t(`autoDeltaSelf`),Q(n.delta_self_sufficiency)===void 0?void 0:Q(n.delta_self_sufficiency)*100,1,`%`)}
    ${ef(e)?R`<p class="sub">${ef(e)}</p>`:n.fallback===!1&&typeof n.last_run==`string`?R`<p class="sub">${t(`autoNone`)}</p>`:B}`}function cf(e){let{t,phase:n}=e.i18n,r=jd(e,W.explanation);if(typeof r.phase!=`string`)return R`<div class="card"><p class="empty">${t(`noDecision`)}</p></div>`;let i=K(Z(e,W.soc)),a=Q(r.target_soc),o=typeof r.timestamp==`string`?e.fmt.time(r.timestamp):void 0,s=[a===void 0?null:t(`tagTargetSoc`,{v:Math.round(a)}),t(`tagTargetPower`,{v:e.fmt.w(Q(r.target_charge_power)??K(Z(e,W.targetCharge))??0)}),r.battery_priority===!0?t(`tagBatteryPriority`):null,o?t(`tagSince`,{t:o}):null].filter(e=>!!e),c=(t,n)=>Q(t)??K(Z(e,n)),l=c(r.charge_power_limit,W.chargeLimit),u=c(r.sent_charge_power_limit,W.sentChargeLimit),d=c(r.discharge_power_limit,W.dischargeLimit),f=c(r.sent_discharge_power_limit,W.sentDischargeLimit),p=Math.max(9e3,l??0,u??0,d??0,f??0),m=(n,r,i)=>R`
    <div class="limit-row">
      <div class="lbl"><span>${n}</span><span>${t(`limitTarget`,{a:r===void 0?t(`limitNone`):e.fmt.w(r),b:i===void 0?t(`limitNone`):e.fmt.w(i)})}</span></div>
      <div class="bar"><div class="soll" style="width:${(r??0)/p*100}%"></div><div class="sent" style="width:${(i??0)/p*100}%"></div></div>
    </div>`,h=Date.now(),g=864e5,_=h-g,v=e.timeline?.length?hn(e.timeline,h,g):[],y=[...new Set(v.map(e=>e.phase))],b=e=>Math.max(0,Math.min(100,(e-_)/g*100)),ee=(e,t)=>Math.max(.2,Math.min(100,(t-e)/g*100)),x=(e.timeline??[]).slice(0,12);return R`
    <div class="grid dec-top">
      <div class="card phase-hero">
        <h3>${t(`decisionPhase`)}</h3>
        <div class="phase-name">${n(r.phase)}</div>
        <div class="phase-reason">${typeof r.reason==`string`?r.reason:``}</div>
        <div class="chips">${s.map(e=>R`<span class="chip on"><i></i>${e}</span>`)}</div>
        <button type="button" class="linkish phase-ladder-link" @click=${e.onShowLadder}>${t(`showInLadder`)}</button>
      </div>
      <div class="card">
        <h3>${t(`limitsTitle`)}</h3>
        <div class="sub lim-sub">${t(`limitsSub`)}</div>
        <div class="limits">
          ${m(t(`limitCharge`),l,u)}
          <div class="limit-row">
            <div class="lbl"><span>${t(`targetPower`)}</span><span>${e.fmt.w(Q(r.target_charge_power)??K(Z(e,W.targetCharge))??0)}</span></div>
          </div>
          ${m(t(`limitDischarge`),d,f)}
          ${a===void 0?B:R`<div class="limit-row">
                <div class="lbl"><span>${t(`targetSoc`)}</span><span>${t(`limitSoc`,{a:Math.round(i??0),b:Math.round(a)})}</span></div>
                <div class="bar"><div class="soll" style="width:${a}%"></div><div class="sent" style="width:${i??0}%"></div></div>
              </div>`}
        </div>
      </div>
    </div>
    ${As(e.i18n,r.phase,q(Z(e,W.ctrlPlanControls)),q(Z(e,W.lowYield)),e.onOpenGroup)}
    <div class="card tl-card">
      <div class="card-head">
        <h3>${t(`timelineTitle`)}</h3>
        <button class="toggle" ?disabled=${!e.timeline?.length} @click=${()=>e.timeline&&Od(`maestro-entscheidungen.csv`,Id(e))}>${t(`exportCsv`)}</button>
      </div>
      ${v.length?R`<div class="phase-gantt" aria-label=${t(`ganttTitle`)}>
            <div class="gantt-head">
              <h4>${t(`ganttTitle`)}</h4>
              <span class="sub">${t(`ganttHint`)}</span>
            </div>
            <div class="gantt-track">
              ${v.map(t=>R`<div
                  class="gantt-seg"
                  style="left:${b(t.x)}%;width:${ee(t.x,t.x2)}%;background:${gn(t.phase)}"
                  title="${n(t.phase)} · ${e.fmt.time(t.x)}–${e.fmt.time(t.x2)}"
                ></div>`)}
              <div class="gantt-now" style="left:${b(h)}%" title=${t(`now`)}></div>
            </div>
            <div class="gantt-axis">
              <span>${e.fmt.dayTime(_)}</span>
              <span>${e.fmt.time(_+g/2)}</span>
              <span>${t(`now`)}</span>
            </div>
            <div class="legend gantt-legend">
              ${y.map(e=>R`<span><i style="background:${gn(e)}"></i>${n(e)}</span>`)}
            </div>
          </div>`:B}
      ${x.length?R`<div class="timeline">
            ${x.map(t=>R`<div class="tl-item">
                <div class="tl-time">${e.fmt.dayTime(t.ts)}</div>
                <div class="tl-phase"><i class="tl-dot" style="background:${gn(t.phase)}"></i>${n(t.phase)}</div>
                <div class="tl-reason">${t.reason}</div>
              </div>`)}
          </div>`:R`<p class="empty">${e.timeline?t(`timelineEmpty`):t(`loading`)}</p>`}
    </div>
    <div class="grid stat-row dec-extra">
      <div class="card">
        <h3>${t(`reserveTitle`)}</h3>
        <div class="rows">
          ${Pd(t(`reserveSeasonal`),Kd(e,W.seasonalReserve))}
          ${Pd(t(`reserveAdaptive`),Kd(e,W.adaptiveReserve))}
          ${Pd(t(`reserveHt`),Kd(e,W.htReserve))}
          ${Pd(t(`reserveForward`),Kd(e,W.forwardTarget))}
          ${Pd(t(`targetSoc`),Kd(e,W.targetSoc))}
        </div>
      </div>
      <div class="card">
        <h3>${t(`windowsTitle`)}</h3>
        <div class="rows">
          ${Pd(t(`windowAstro`),kd(Z(e,W.astroStart)))}
          ${Pd(t(`windowSeasonalEnd`),kd(Z(e,W.seasonalEnd)))}
          ${Pd(t(`windowPvDelay`),kd(Z(e,W.pvDelayStart)))}
          ${Pd(t(`windowTomorrow`),`${kd(Z(e,W.tomorrowStart))} – ${kd(Z(e,W.tomorrowEnd))}`)}
        </div>
      </div>
      <div class="card">
        <h3>${t(`autoTitle`)}</h3>
        <div class="rows">${sf(e)}</div>
      </div>
    </div>
    <section class="group">
      <button type="button" class="group-head ${e.debugOpen?`open`:``}" aria-expanded=${e.debugOpen} @click=${e.onToggleDebug}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        <span>${t(`debugTitle`)}</span>
      </button>
      ${e.debugOpen?R`<div class="card debug-card">
            <div class="force">
              <div class="txt"><b>${t(`debugSwitch`)}</b></div>
              <button
                class="switch ${Ld(e)?`on`:``}"
                role="switch"
                aria-checked=${Ld(e)}
                aria-label=${t(`debugSwitch`)}
                ?disabled=${!Z(e,W.debug)||e.pending.has(W.debug)}
                @click=${()=>e.onToggle(W.debug)}
              ></button>
            </div>
            <pre class="debug-log">${Rd(e)}</pre>
          </div>`:B}
    </section>`}var lf={off:`helpRuleOff`,force:`helpRuleForce`,emergency:`helpRuleEmergency`,feed:`helpRuleFeed`,reserve:`helpRuleReserve`,evcc:`helpRuleEvcc`,price:`helpRulePrice`,ht:`helpRuleHt`,hold:`helpRuleHold`,morning:`helpRuleMorning`,cap:`helpRuleCap`,astro:`helpRuleAstro`,hard:`helpRuleHard`,floor:`helpRuleFloor`,low:`helpRuleLow`,grid:`helpRuleGrid`,corridor:`helpRuleCorridor`,spread:`helpRuleSpread`,curtail:`helpRuleCurtail`,idle:`helpRuleIdle`},uf=()=>Es.map(e=>({id:e.id,title:e.label,body:lf[e.id]??`helpRuleIdle`,actions:[{label:`helpOpenSettings`,action:{kind:`screen`,screen:`settings`,group:e.group}}]})),$=(e,t,n,r)=>({id:e,title:t,body:n,...r}),df=[{id:`start`,title:`helpChStart`,sections:[$(`start-lead`,`helpStartLead`,`helpStartLeadBody`,{links:[{id:`rules`,label:`helpSeeRules`}],actions:[{label:`helpOpenSetup`,action:{kind:`screen`,screen:`settings`,group:`setup`}}]}),$(`start-steps`,`helpStartSteps`,`helpStartStepsBody`)]},{id:`live`,title:`helpChLive`,sections:[$(`live-page`,`helpChLive`,`helpLiveBody`)]},{id:`forecast`,title:`helpChForecast`,sections:[$(`forecast-page`,`helpChForecast`,`helpForecastBody`)]},{id:`plan`,title:`helpChPlan`,sections:[$(`plan-page`,`helpChPlan`,`helpPlanBody`,{actions:[{label:`helpOpenSettings`,action:{kind:`screen`,screen:`settings`,group:`tariff`}}]})]},{id:`decision`,title:`helpChDecision`,sections:[$(`decision-page`,`helpChDecision`,`helpDecisionBody`,{links:[{id:`rules`,label:`helpSeeLadder`}]})]},{id:`plant`,title:`helpChPlant`,sections:[$(`plant-page`,`helpChPlant`,`helpPlantBody`)]},{id:`settings`,title:`helpChSettings`,sections:[$(`set-intro`,`helpSetIntro`,`helpSetIntroBody`),$(`set-setup`,`helpSetSetup`,`helpSetSetupBody`),$(`set-plant`,`helpSetPlant`,`helpSetPlantBody`),$(`set-safety`,`helpSetSafety`,`helpSetSafetyBody`),$(`set-tariff`,`helpSetTariff`,`helpSetTariffBody`),$(`set-pv`,`helpSetPv`,`helpSetPvBody`),$(`set-loads`,`helpSetLoads`,`helpSetLoadsBody`),$(`set-auto`,`helpSetAuto`,`helpSetAutoBody`),$(`set-system`,`helpSetSystem`,`helpSetSystemBody`),$(`set-look`,`helpSetLook`,`helpSetLookBody`),$(`set-classic`,`helpSetClassic`,`helpSetClassicBody`),$(`set-energy`,`helpSetEnergy`,`helpSetEnergyBody`),$(`set-sizing`,`helpSetSizing`,`helpSetSizingBody`)]},{id:`controls`,title:`helpChControls`,sections:[$(`controls-page`,`helpChControls`,`helpControlsBody`,{actions:[{label:`helpOpenControls`,action:{kind:`controls`}}]})]},{id:`rules`,title:`helpChRules`,sections:[$(`rules-how`,`helpRulesHow`,`helpRulesHowBody`,{ladder:!0}),...uf(),$(`why-grid`,`helpWhyGrid`,`helpWhyGridBody`)]},{id:`concepts`,title:`helpChConcepts`,sections:[$(`concept-plan`,`helpConceptPlan`,`helpConceptPlanBody`),$(`concept-pv`,`helpConceptPv`,`helpConceptPvBody`),$(`concept-low`,`helpConceptLow`,`helpConceptLowBody`),$(`concept-feed`,`helpConceptFeed`,`helpConceptFeedBody`),$(`concept-loads`,`helpConceptLoads`,`helpConceptLoadsBody`)]},{id:`trouble`,title:`helpChTrouble`,sections:[$(`trouble-off`,`helpTroubleOff`,`helpTroubleOffBody`,{links:[{id:`decision`,label:`helpChDecision`}]}),$(`trouble-entities`,`helpTroubleEntities`,`helpTroubleEntitiesBody`),$(`trouble-alerts`,`helpTroubleAlerts`,`helpTroubleAlertsBody`),$(`trouble-history`,`helpTroubleHistory`,`helpTroubleHistoryBody`),$(`faq-nogrid`,`helpFaqNoGrid`,`helpFaqNoGridBody`,{links:[{id:`why-grid`,label:`helpWhyGrid`}]}),$(`faq-swing`,`helpFaqSwing`,`helpFaqSwingBody`),$(`faq-ht`,`helpFaqHt`,`helpFaqHtBody`),$(`faq-pause`,`helpFaqPause`,`helpFaqPauseBody`),$(`faq-min`,`helpFaqMin`,`helpFaqMinBody`),$(`faq-restart`,`helpFaqRestart`,`helpFaqRestartBody`),$(`faq-tibber`,`helpFaqTibber`,`helpFaqTibberBody`,{links:[{id:`faq-energyforecast`,label:`helpFaqEnergyforecast`}]}),$(`faq-energyforecast`,`helpFaqEnergyforecast`,`helpFaqEnergyforecastBody`,{links:[{id:`set-tariff`,label:`helpSetTariff`}]}),$(`faq-plan`,`helpFaqPlan`,`helpFaqPlanBody`),$(`faq-plan-hold`,`helpFaqPlanHold`,`helpFaqPlanHoldBody`,{links:[{id:`faq-plan`,label:`helpFaqPlan`}]}),$(`faq-plan-pv`,`helpFaqPlanPv`,`helpFaqPlanPvBody`,{links:[{id:`faq-plan`,label:`helpFaqPlan`},{id:`set-tariff`,label:`helpSetTariff`}]}),$(`faq-old`,`helpFaqOld`,`helpFaqOldBody`),$(`faq-balance-stats`,`helpFaqBalanceStats`,`helpFaqBalanceStatsBody`,{links:[{id:`trouble-history`,label:`helpTroubleHistory`}]})]},{id:`glossary`,title:`helpChGlossary`,sections:[$(`glossary-page`,`helpChGlossary`,`helpGlossaryBody`)]}],ff=new Set(df.map(e=>e.id)),pf=new Set(df.flatMap(e=>e.sections.map(e=>e.id)));function mf(e,t){return e===`settings`?t&&pf.has(`set-${t}`)?`set-${t}`:`ch-settings`:ff.has(e)?`ch-${e}`:`ch-start`}function hf(e,t){let n=e.trim().toLowerCase();if(!n)return;let r=new Set;for(let e of df){let i=t(e.title).toLowerCase().includes(n);for(let a of e.sections){let e=`${t(a.title)}\n${t(a.body)}`.toLowerCase();(i||e.includes(n))&&r.add(a.id)}}return r}var gf=new Map(Es.map(e=>[e.id,e])),_f=e=>{if(e.key!==`Tab`)return;let t=e.currentTarget;if(!(t instanceof HTMLElement))return;let n=[...t.querySelectorAll(`button, input, summary`)].filter(e=>!e.hidden&&e.offsetParent!==null),r=n[0],i=n[n.length-1];if(!r||!i)return;let a=t.getRootNode().activeElement;e.shiftKey&&a===r?(e.preventDefault(),i.focus()):!e.shiftKey&&a===i&&(e.preventDefault(),r.focus())},vf=(e,t)=>{let n=t.trim(),r=e=>{if(!n)return e;let t=e.toLowerCase().indexOf(n.toLowerCase());return t<0?e:R`${e.slice(0,t)}<mark>${e.slice(t,t+n.length)}</mark>${e.slice(t+n.length)}`};return R`${e.split(`
`).map(e=>R`<p>${r(e)}</p>`)}`},yf=(e,t)=>{let{t:n}=e.i18n;return df.map(r=>{let i=r.sections.filter(e=>!t||t.has(e.id));if(!i.length)return B;let a=r.id===e.current||i.some(t=>t.id===e.current),o=i.filter(e=>e.title!==r.title);return R`<div class="help-toc-ch">
      <button type="button" class=${a?`on`:``} aria-current=${a?`true`:`false`} @click=${()=>e.onJump(r.id)}>${n(r.title)}</button>
      ${o.map(t=>R`<button
        type="button"
        class=${e.current===t.id?`on`:``}
        aria-current=${e.current===t.id?`true`:`false`}
        @click=${()=>e.onJump(t.id)}
      >${n(t.title)}</button>`)}
    </div>`})},bf=e=>{let{t}=e.i18n,n=ks(e.phase,e.planActive,e.lowYield),r=n?gf.get(n):void 0;return R`<div class="help-live">
    <p class="help-now">${r?t(`helpActive`,{rule:t(r.label)}):t(`helpNoPhase`)}</p>
    ${Ds.map(r=>R`<div class="ladder-band">
      <h4>${t(r.label)}</h4>
      <div class="ladder-steps">
        ${r.steps.map(r=>{let i=gf.get(r);return i?R`<button type="button" class="ladder-step ${r===n?`on`:``}" @click=${()=>e.onJump(r)}>${t(i.label)}</button>`:B})}
      </div>
    </div>`)}
  </div>`},xf=e=>{let{t}=e.i18n,n=hf(e.query,t),r=df.flatMap(e=>e.sections).filter(e=>!n||n.has(e.id));return R`<div class="scrim open help-scrim" @click=${e.onClose}></div>
    <aside class="help" role="dialog" aria-modal="true" aria-labelledby="help-title" @keydown=${_f}>
      <div class="sheet-head">
        <div class="grow">
          <h2 id="help-title">${t(`helpTitle`)}</h2>
          <div class="sub">${t(`helpSub`)}</div>
        </div>
        <button class="btn" @click=${e.onClose}>${t(`close`)}</button>
      </div>
      <label class="help-search">
        <span class="sr">${t(`helpSearch`)}</span>
        <input
          class="help-query"
          type="search"
          placeholder=${t(`helpSearch`)}
          .value=${e.query}
          @input=${t=>e.onQuery(t.target.value)}
        />
      </label>
      <details class="help-fold">
        <summary>${t(`helpToc`)}</summary>
        <nav class="help-toc" aria-label=${t(`helpToc`)}>${yf(e,n)}</nav>
      </details>
      <div class="help-body">
        <nav class="help-toc" aria-label=${t(`helpToc`)}>${yf(e,n)}</nav>
        <div class="help-doc">
          ${r.length?df.map(r=>{let i=r.sections.filter(e=>!n||n.has(e.id));return i.length?R`<article id=${`help-ch-${r.id}`} data-chapter=${r.id}>
                  <h3>${t(r.title)}</h3>
                  ${i.map(n=>R`<section id=${`help-${n.id}`} data-help=${n.id}>
                    ${n.title===r.title?B:R`<h4>${t(n.title)}</h4>`}
                    ${vf(t(n.body),e.query)}
                    ${n.ladder?bf(e):B}
                    ${n.links?.map(n=>R`<button type="button" class="help-link" @click=${()=>e.onJump(n.id)}>${t(n.label)}</button>`)}
                    ${n.actions?.map(n=>R`<button type="button" class="btn help-action" @click=${()=>e.onAction(n.action)}>${t(n.label)}</button>`)}
                  </section>`)}
                </article>`:B}):R`<p class="hint">${t(`helpEmpty`)}</p>`}
          <button type="button" class="btn help-top" @click=${e.onTop}>${t(`helpTop`)}</button>
        </div>
      </div>
    </aside>`},Sf,Cf={pv:{entity:`pv`,color:`#fbbf24`,label:`nodePv`},pvExtra:{entity:`additionalPv`,color:`#f59e0b`,label:`nodePvExtra`},grid:{entity:`grid`,color:`#f87171`,label:`nodeImport`},house:{entity:`house`,color:`#a78bfa`,label:`nodeHouse`},bat:{entity:`battery`,color:`#22d3ee`,label:`nodeBatCharge`}},wf=new URLSearchParams(location.search).has(`debug`),Tf=[{id:`live`,label:`navLive`,sub:`subLive`,icon:`<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>`},{id:`forecast`,label:`navForecast`,sub:`subForecast`,icon:`<path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/>`},{id:`plan`,label:`navPlan`,sub:`subPlan`,icon:`<rect x="3" y="10" width="4" height="11" rx="1"/><rect x="10" y="5" width="4" height="16" rx="1"/><rect x="17" y="13" width="4" height="8" rx="1"/>`},{id:`decision`,label:`navDecision`,sub:`subDecision`,icon:`<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>`},{id:`plant`,label:`navPlant`,sub:`subPlant`,icon:`<path d="M4 21V10l8-7 8 7v11"/><path d="M9 21v-6h6v6"/>`},{id:`settings`,label:`navSettings`,sub:`subSettings`,icon:`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`}],Ef=`<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>`,Df=`<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 1 1 4.2 2.7c-.8.4-1.3 1-1.3 1.8V14"/><path d="M12 17h.01"/>`,Of=`<circle cx="12" cy="12" r="4"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6"/>`,kf=`<path d="M20.2 14.2A7.5 7.5 0 0 1 9.8 3.8 8.5 8.5 0 1 0 20.2 14.2z"/>`,Af=`(max-width: 960px)`,jf=3e5,Mf=6e4,Nf=6,Pf=3e4,Ff=6,If=(e,t=``)=>R`<svg class=${t} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${e}></svg>`,Lf=()=>{let[e,t]=location.hash.slice(1).split(`/`),n=Tf.some(t=>t.id===e)?e:`live`;return{screen:n,settingsGroup:n===`settings`?bc(t):void 0,plantGroup:n===`plant`&&Ul(t)?t:void 0}},Rf=Lf(),zf=class extends we{constructor(...e){super(...e),this._narrow=!1,this._screen=Rf.screen,this._settingsGroup=Rf.settingsGroup,this._plantGroup=Rf.plantGroup,this._theme=Mo(),this._scrollToLadder=!1,this._flowStyle=li(),this._batteryStyle=mo(),this._bannerHidden=co(),this._alertDismissed=ao(),this._consumerPlacesByStyle=wi(),this._arrangeConsumers=!1,this._sheet=!1,this._pauseOpen=!1,this._help=!1,this._helpQuery=``,this._helpCurrent=``,this._helpListening=!1,this._mobile=window.matchMedia(Af).matches,this._mq=window.matchMedia(Af),this._range=window.matchMedia(Af).matches?12:48,this._showIst=!0,this._forecastHidden=Ir(),this._hideShadowSoc=zr(),this._hideExpectedSoc=Hr(),this._hideShadowImport=Gr(),this._settingsQuery=``,this._loadedAt=new Map,this._pending=new Set,this._flowRaf=0,this._lookPrefs=wo(),this._motion=this._lookPrefs.motion,this._histState=`loading`,this._stats={hassUpdates:0,renders:0},this._resolvedAt=0,this._consumers=bt(),this._collapsed=Ia(),this._batteryCtrlOpen=!1,this._flowOptsOpen=!1,this._expert=sl(),this._planTuneOpen=al(),this._pvOpen=ul(),this._setupAck=ls(),this._grain=`day`,this._rangeSumsCache=new Map,this._daySparksCache=new Map,this._rangePrefetch=new Set,this._calOpen=!1,this._calViewAnchor=Un(),this._pulseRange=`month`,this._pulseState=`idle`,this._debugOpen=!1,this._picking=!1,this._pickQuery=``,this._focusConsumers=!1,this._consumersSheet=!1,this._storedOptions={},this._optionsReady=!1,this._optionsLoading=!1,this._optionQuery={},this._slots=[],this._slotsDirty=!1,this._phasePoints={},this._phaseHistory=`idle`,this._phaseTicket=0,this._watchSig=``,this._onMq=e=>{this._mobile=e.matches,this.requestUpdate()},this._onPop=()=>{let e=Lf();this._screen=e.screen,this._settingsGroup=e.settingsGroup,this._plantGroup=e.plantGroup,this.requestUpdate(),this._loadPhaseHistory()},this._animateFlows=e=>{this._motion?(pa(this.renderRoot.querySelectorAll(`.electron`),e),this._flowRaf=requestAnimationFrame(this._animateFlows)):this._flowRaf=0},this._onKey=e=>{e.key===`Escape`?this._pauseOpen?(this._pauseOpen=!1,this.requestUpdate()):this._help?this._closeHelp():this._batteryCtrlOpen?(this._batteryCtrlOpen=!1,this.requestUpdate()):this._flowOptsOpen?(this._flowOptsOpen=!1,this.requestUpdate()):this._hist?this._closeHistory():this._sheet&&this._setSheet(!1):e.key!==`?`||e.metaKey||e.ctrlKey||e.altKey||this._help||e.composedPath().some(e=>e instanceof HTMLElement&&(e.tagName===`INPUT`||e.tagName===`TEXTAREA`||e.tagName===`SELECT`||e.isContentEditable))||(e.preventDefault(),this._openHelp())},this._onHelpScroll=()=>{let e=this.renderRoot.querySelector(`.help-doc`);if(!(e instanceof HTMLElement))return;let t=e.getBoundingClientRect().top+12,n=``;for(let r of e.querySelectorAll(`[data-help]`))r.getBoundingClientRect().top<=t&&(n=r.dataset.help??n);n&&n!==this._helpCurrent&&(this._helpCurrent=n,this.requestUpdate())},this._onChartError=e=>{this._chartError=e.detail,this.requestUpdate()},this._scrollKey=``}set hass(e){this._stats.hassUpdates++;let t=this._hass;this._hass=e,(!t||this._missingKeys(e).length)&&this._resolveEntities();let n=this._watchSignature(e);!t||t.language!==e.language||n!==this._watchSig?(this._watchSig=n,this.requestUpdate()):wf&&this.requestUpdate()}_watchSignature(e){let t=``;for(let n of Ze()){let r=e.states[n],i=r?r.last_updated??r.last_changed:``;t+=`${n}:${r?.state??``}:${i};`}let n=e.states[W.sizingScenario]?.attributes;return n&&(t+=JSON.stringify(n.slider_battery_kwh)+JSON.stringify(n.slider_pv_kwp)+JSON.stringify(n.scenario_monthly_avoided_kwh)),t}get hass(){return this._hass}set narrow(e){e!==this._narrow&&(this._narrow=e,this.requestUpdate())}get narrow(){return this._narrow}connectedCallback(){super.connectedCallback(),Sr(this._theme),this._mq.addEventListener(`change`,this._onMq),this._mobile=this._mq.matches,this._timer=window.setInterval(()=>void this._ensureHistory(),Mf),this.addEventListener(`chart-error`,this._onChartError),window.addEventListener(`keydown`,this._onKey),window.addEventListener(`popstate`,this._onPop);let e=location.hash.slice(1).split(`/`)[1];this._screen===`settings`&&e&&this._settingsGroup&&e!==this._settingsGroup&&history.replaceState(null,``,`#settings/${this._settingsGroup}`),this._motion&&(this._flowRaf=requestAnimationFrame(this._animateFlows))}disconnectedCallback(){super.disconnectedCallback(),this._mq.removeEventListener(`change`,this._onMq),window.clearInterval(this._timer),window.clearInterval(this._pauseClock),window.clearTimeout(this._overflowTimer),window.clearTimeout(this._optionsRetry),this._optionsRetry=void 0,cancelAnimationFrame(this._flowRaf),this.removeEventListener(`chart-error`,this._onChartError),window.removeEventListener(`keydown`,this._onKey),this._unbindHelpScroll(),window.removeEventListener(`popstate`,this._onPop)}_openHelp(){this._help=!0,this._helpAnchor=mf(this._screen,this._settingsGroup),this._helpCurrent=this._helpAnchor.startsWith(`ch-`)?this._helpAnchor.slice(3):this._helpAnchor,this.requestUpdate()}_closeHelp(){this._help=!1,this._helpQuery=``,this._helpAnchor=void 0,this._unbindHelpScroll(),this.requestUpdate()}_jumpHelp(e){if(this._helpCurrent=e,this._helpQuery){this._helpQuery=``,this._helpAnchor=e,this.requestUpdate();return}let t=this.renderRoot.querySelector(`.help-fold`);t instanceof HTMLDetailsElement&&(t.open=!1),this._scrollHelp(e)}_scrollHelp(e){let t=()=>{let t=this.renderRoot.querySelector(`.help-doc`);if(!(t instanceof HTMLElement))return;let n=e.startsWith(`ch-`)?e.slice(3):e,r=t.querySelector(`[data-help="${n}"]`)??t.querySelector(`[data-chapter="${n}"]`);if(!(r instanceof HTMLElement))return;let i=r.getBoundingClientRect().top-t.getBoundingClientRect().top+t.scrollTop;t.scrollTop=Math.max(0,i-4)};t(),requestAnimationFrame(t)}_helpAction(e){this._closeHelp(),e.kind===`controls`?this._setSheet(!0):e.group&&e.screen===`settings`?this._openSettingsGroup(e.group):e.group&&e.screen===`plant`?this._openPlantRoom(e.group):this._go(e.screen)}_bindHelpScroll(){let e=this.renderRoot.querySelector(`.help-doc`);e instanceof HTMLElement&&!this._helpListening&&(e.addEventListener(`scroll`,this._onHelpScroll,{passive:!0}),this._helpListening=!0)}_unbindHelpScroll(){this.renderRoot.querySelector(`.help-doc`)?.removeEventListener(`scroll`,this._onHelpScroll),this._helpListening=!1}_closeHistory(){this._hist=void 0,this._histPoints=void 0,this.requestUpdate()}_additionalPvHistoryIds(){let e=this._storedOptions.additional_generation_sensor,t=Array.isArray(e)?e.filter(e=>typeof e==`string`&&!!e):typeof e==`string`&&e?[e]:[];if(t.length)return t;let n=G.entities.extraProduction;return n?[n]:W.additionalPv?[W.additionalPv]:[]}_openFlow(e){let t=this._hass;if(!t)return;let n=Ja(t.language),r=Cf[e],i=this._consumers.find(t=>t.id===e),a=r?W[r.entity]:i?.entityId;if(!a)return;let o=t.states[a],s=K(o),c=e===`grid`&&s!==void 0&&s>=0,l=e===`grid`?n.t(c?`nodeFeed`:`nodeImport`):r?n.t(r.label):i?.name??a,u=c?`#34d399`:r?.color??`#38bdf8`,d=o?.attributes.unit_of_measurement,f=e===`pvExtra`?`pvExtra:${this._additionalPvHistoryIds().join(`,`)}`:a;this._hist={name:l,color:u,entityId:f},this._histPoints=void 0,this._histState=`loading`,this.requestUpdate(),(e===`pvExtra`?_r(t,this._additionalPvHistoryIds()):hr(t,a,d===`kW`?1e3:1)).then(e=>{this._hist?.entityId===f&&(this._histPoints=e,this._histState=e.length?`ready`:`empty`,this.requestUpdate())}).catch(()=>{this._hist?.entityId===f&&(this._histState=`error`,this.requestUpdate())})}async _resolveEntities(){let e=this._hass;if(!(!e||Date.now()-this._resolvedAt<Pf)){this._resolvedAt=Date.now();try{let t=await e.callWS({type:`e3dc_maestro/panel_entities`}),n=JSON.stringify(W);He(t),Ge(t);let r=JSON.stringify(G.entities);Ke(t),JSON.stringify(G.entities)!==r&&(this._phasePoints={},this._loadedAt.delete(`plant-grid`),this._loadedAt.delete(`plant-pv`)),this._entityMap=t,JSON.stringify(W)!==n&&this._loadedAt.clear(),this.requestUpdate(),this._ensureHistory()}catch{}}}_missingKeys(e){return Object.keys(Be).filter(t=>!e.states[W[t]])}_entityNotice(e,t){let n=this._entityMap;if(n&&n.entry_id===null)return R`<p class="err">${t(`notSetUp`)}</p>`;let r=this._missingKeys(e);if(!r.length)return B;let i=new Set(n?.disabled??[]),a=r.slice(0,Ff).map(e=>i.has(e)?`${W[e]} (${t(`entityDisabled`)})`:W[e]),o=r.length>Ff?` +${r.length-Ff}`:``;return R`<p class="err">${t(`entitiesMissing`,{list:a.join(`, `)+o})}</p>`}_liveFacts(e,t,n){if(this._screen!==`live`)return B;let r=e=>e===void 0?`–`:`${t.n(e)} kWh`,i=t=>{let n=this._storedOptions[t];return typeof n==`string`?K(e.states[n]):void 0},a=e.states[W.p10],o=a?.attributes.p50_remaining_kwh,s=i(`pv_forecast_sensor`)??(typeof o==`number`?o:K(a)),c=i(`pv_forecast_sensor_day2`);return R`<p class="facts">
      <span>${n(`factRest`)} <b>${r(s)}</b></span>
      <span>${n(`factTomorrow`)} <b>${r(K(e.states[W.pvTomorrow]))}</b></span>
      ${c===void 0?B:R`<span>${n(`factDayAfter`)} <b>${r(c)}</b></span>`}
    </p>`}_syncAlertDismissed(e){let t=no(this._alertDismissed,e);t.size===this._alertDismissed.size&&[...t].every(e=>this._alertDismissed.has(e))||(this._alertDismissed=t,oo(t))}_dismissAlerts(e){let t=new Set(e);this._alertDismissed=t,oo(t),this.requestUpdate()}_setBannerHidden(e){this._bannerHidden=e,lo(e),this.requestUpdate()}_alerts(e,t){let n=to(e);return ro(n,this._alertDismissed,this._bannerHidden)?R`<div class="banner ${n.includes(`unreachable`)?`bad`:``}" role="status">
      <div class="banner-notes">${n.map(e=>R`<span>${t(eo(e))}</span>`)}</div>
      <button type="button" class="banner-ack" @click=${()=>this._dismissAlerts(n)}>${t(`alertDismiss`)}</button>
    </div>`:B}_balanceRange(){return Zn(this._grain,this._anchor??Un())}async _ensureBalanceRange(e){let t=this._balanceRange();if(t.grain===`day`&&t.live){this._rangeSums=void 0,this._daySparks=void 0;return}let n=qn(this._rangeSumsCache,t.cacheKey);n&&(this._rangeSums=n);let r;t.grain===`day`?(r=qn(this._daySparksCache,t.start),r&&(this._daySparks=r)):this._daySparks=void 0;let i=!n,a=t.grain===`day`&&!r;if(!i&&!a){this.requestUpdate(),this._prefetchNeighborRanges(e,t.grain,t.anchor);return}let o=[];i&&o.push(ur(e,t).then(e=>{Kn(this._rangeSumsCache,t.cacheKey,e),this._balanceRange().cacheKey===t.cacheKey&&(this._rangeSums=e)})),a&&o.push(dr(e,t.start).then(e=>{Kn(this._daySparksCache,t.start,e),this._balanceRange().cacheKey===t.cacheKey&&(this._daySparks=e)}));try{await Promise.all(o)}catch{this._balanceRange().cacheKey===t.cacheKey&&this._rangeSums===void 0&&(this._rangeSums={},Kn(this._rangeSumsCache,t.cacheKey,{}))}this.requestUpdate(),this._prefetchNeighborRanges(e,t.grain,t.anchor)}_prefetchNeighborRanges(e,t,n){for(let r of[-1,1]){let i=Zn(t,Qn(t,n,r));i.live&&i.grain===`day`||(!this._rangeSumsCache.has(i.cacheKey)||t===`day`&&!this._daySparksCache.has(i.start))&&(this._rangePrefetch.has(i.cacheKey)||(this._rangePrefetch.add(i.cacheKey),(async()=>{try{let n=!this._rangeSumsCache.has(i.cacheKey),r=t===`day`&&!this._daySparksCache.has(i.start),[a,o]=await Promise.all([n?ur(e,i):Promise.resolve(void 0),r?dr(e,i.start):Promise.resolve(void 0)]);a&&Kn(this._rangeSumsCache,i.cacheKey,a),o&&Kn(this._daySparksCache,i.start,o)}catch{}finally{this._rangePrefetch.delete(i.cacheKey)}})()))}}async _ensureHistory(){let e=this._hass;if(!e||document.hidden)return;let t=e=>Date.now()-(this._loadedAt.get(e)??0)>jf,n=async(e,n)=>{if(t(e)){this._loadedAt.set(e,Date.now()-jf+Mf);try{await n(),this._loadedAt.set(e,Date.now()),this.requestUpdate()}catch{}}};if(this._screen===`live`&&await n(`sparks`,async()=>void(this._sparks=await dr(e))),this._screen===`live`&&await this._ensureBalanceRange(e),this._screen===`live`&&!this._collapsed.has(`balancePulse`)){let n=this._pulseRange,r=`pulse-${n}`;if(t(r)){this._pulseDays||(this._pulseState=`loading`,this.requestUpdate()),this._loadedAt.set(r,Date.now()-jf+Mf);try{this._pulseDays=await lr(e,n),this._pulseState=`ready`,this._loadedAt.set(r,Date.now()),this.requestUpdate()}catch{this._pulseState=`error`,this.requestUpdate()}}}this._screen===`forecast`&&this._showIst&&await n(`ist`,async()=>void(this._ist=await vr(e,Nf))),this._screen===`decision`&&await n(`timeline`,async()=>void(this._timeline=await yr(e))),await this._loadPhaseHistory()}async _loadPhaseHistory(){let e=this._hass,t=this._plantGroup;if(!e||document.hidden||this._screen!==`plant`||t!==`grid`&&t!==`pv`)return;let n=(t===`grid`?[`houseL1`,`houseL2`,`houseL3`,`gridL1`,`gridL2`,`gridL3`]:[`pviL1`,`pviL2`,`pviL3`]).map(e=>G.entities[e]).filter(e=>!!e);if(!n.length)return;let r=`plant-${t}`;if(n.every(e=>e in this._phasePoints)&&Date.now()-(this._loadedAt.get(r)??0)<=jf){this._phaseHistory!==`ready`&&(this._phaseHistory=`ready`,this.requestUpdate());return}let i=++this._phaseTicket;n.every(e=>e in this._phasePoints)||(this._phaseHistory=`loading`,this.requestUpdate());try{let t=await gr(e,n);if(this._phasePoints={...this._phasePoints,...Object.fromEntries(n.map(e=>[e,t[e]??[]]))},this._loadedAt.set(r,Date.now()),i!==this._phaseTicket)return;this._phaseHistory=`ready`}catch{if(i!==this._phaseTicket)return;this._loadedAt.set(r,Date.now()-jf+Mf),this._phaseHistory=`error`}this.requestUpdate()}_setTheme(e){this._theme=e,this._themePreview=void 0,Sr(e),No(e),this.requestUpdate()}_persistLookPrefs(e){this._lookPrefs={...this._lookPrefs,...e},To(this._lookPrefs),this.requestUpdate()}_setMotion(e){this._motion=e,this._persistLookPrefs({motion:e}),e?this._flowRaf||=requestAnimationFrame(this._animateFlows):(cancelAnimationFrame(this._flowRaf),this._flowRaf=0)}_setDensity(e){this._persistLookPrefs({density:e})}_setCorners(e){this._persistLookPrefs({corners:e})}_toggleLightDark(){this._setTheme(ko(this._theme)?`e3dc`:`dark`)}_previewTheme(e){e!==this._themePreview&&(this._themePreview=e,this.requestUpdate())}_showLadder(){this._screen!==`decision`&&this._go(`decision`),this._scrollToLadder=!0,this.requestUpdate()}_setFlowStyle(e){this._flowStyle=e,ui(e),this.requestUpdate()}_setBatteryStyle(e){this._batteryStyle=e,ho(e),this.requestUpdate()}_placeConsumer(e,t){let n=this._flowStyle,r={...this._consumerPlacesByStyle[n],[e]:t};this._consumerPlacesByStyle={...this._consumerPlacesByStyle,[n]:r},Ti(this._consumerPlacesByStyle),this.requestUpdate()}_resetConsumerPlaces(){let e=this._flowStyle;this._consumerPlacesByStyle={...this._consumerPlacesByStyle,[e]:{}},Ti(this._consumerPlacesByStyle),this.requestUpdate()}_go(e){this._screen=e,this._settingsGroup=void 0,this._plantGroup=void 0,this._zoomKey=void 0,this._planZoom=void 0,this._error=void 0,history.replaceState(null,``,`#${e}`),this.requestUpdate(),this._ensureHistory()}_openSettingsGroup(e){this._screen=`settings`,this._settingsGroup=e,this._settingsQuery=``,e===fc.id&&(this._classic=void 0),e===pc.id&&(this._energy=void 0),history.pushState({maestroGroup:!0},``,`#settings/${e}`),this.requestUpdate()}_openPlantRoom(e){this._screen=`plant`,this._plantGroup=e,history.pushState({maestroGroup:!0},``,`#plant/${e}`),this.requestUpdate(),this._loadPhaseHistory()}_closeArea(){history.state?.maestroGroup?history.back():(this._screen===`plant`?(this._plantGroup=void 0,history.replaceState(null,``,`#plant`)):(this._settingsGroup=void 0,history.replaceState(null,``,`#settings`)),this.requestUpdate())}_setSheet(e){this._sheet=e,e||(this._error=void 0,this._picking=!1,this._consumersSheet=!1),this.requestUpdate()}_openConsumers(){this._sheet=!0,this._focusConsumers=!0,this._consumersSheet=!0,this.requestUpdate()}_heldOverflow(e){let t=Date.now(),n=Et(e,this._overflowSince,t);if(this._overflowSince=n.since,window.clearTimeout(this._overflowTimer),this._overflowTimer=void 0,n.since!==void 0&&!n.show){let e=Math.max(0,tt-(t-n.since));this._overflowTimer=window.setTimeout(()=>this.requestUpdate(),e)}return n.show}_wallboxIds(){return mt(typeof this._storedOptions.wallbox_power_sensor==`string`?this._storedOptions.wallbox_power_sensor:void 0)}_wallboxSoc(e){let t=typeof this._storedOptions.wallbox_soc_sensor==`string`?this._storedOptions.wallbox_soc_sensor:void 0;if(t)return ut(e.states[t]);for(let t of G.wallboxes){let n=t.entities.soc;if(typeof n!=`string`)continue;let r=ut(e.states[n]);if(r!==void 0)return r}}_wallboxPlugged(e){let t=typeof this._storedOptions.wallbox_plug_entity==`string`?this._storedOptions.wallbox_plug_entity:void 0;if(t)return ft(e.states[t]);for(let t of G.wallboxes){let n=t.entities.plug;if(typeof n!=`string`)continue;let r=ft(e.states[n]);if(r!==void 0)return r}let n=(typeof this._storedOptions.wallbox_power_sensor==`string`?this._storedOptions.wallbox_power_sensor:void 0)?.match(/^sensor\.(openwb_chargepoint_\d+)_ladeleistung$/);if(n){let t=ft(e.states[`binary_sensor.${n[1]}_ladekabel`]);if(t!==void 0)return t}}_flowConsumers(e){let t=this._wallboxIds(),n=St(this._consumers,e),r=this._wallboxPlugged(e);return r===void 0&&n.some(e=>t.includes(e.entityId)&&Math.abs(e.watts)>10)&&(r=!0),pt(n,{soc:this._wallboxSoc(e),plugged:r},t)}_consumerOverflow(e){let t=St(this._consumers,e),n=this._wallboxIds(),r=typeof this._storedOptions.wallbox_power_sensor==`string`?this._storedOptions.wallbox_power_sensor:void 0,i=r?lt(e.states[r]):void 0,a=i===void 0?t:t.map(e=>n.includes(e.entityId)?{...e,watts:Math.max(0,i)}:e),o=typeof this._storedOptions.house_power_sensor==`string`?this._storedOptions.house_power_sensor:void 0,s=o?e.states[o]:void 0,c=lt(s),l=s??e.states[W.house],u=new Map;for(let t of a){let i=e.states[t.entityId]?.last_updated;if(!i)continue;let a=Date.parse(i);if(Number.isFinite(a)&&u.set(t.entityId,a),r&&n.includes(t.entityId)){let n=e.states[r]?.last_updated,i=n?Date.parse(n):NaN;Number.isFinite(i)&&u.set(t.entityId,i)}}let d=l?.last_updated?Date.parse(l.last_updated):void 0;return Tt(K(e.states[W.house]),a,{wallboxInHouse:this._storedOptions.wallbox_included_in_house===!0,wallboxEntityIds:n,meterHouse:c,houseUpdatedAt:Number.isFinite(d)?d:void 0,itemUpdatedAt:u})}_setConsumers(e,t=!1){this._consumers=e.slice(0,6),xt(this._consumers),this._setOption(`flow_consumers`,this._consumers,!0),t&&(this._picking=!1,this._pickQuery=``),this.requestUpdate()}async _call(e,t,n,r){let i=this._hass;if(i){this._pending.add(e),this._error=void 0,this.requestUpdate();try{await i.callService(t,n,r)}catch(e){let t=e instanceof Error?e.message:typeof e==`object`&&e&&`message`in e?String(e.message):String(e);this._error=Ja(i.language).t(`callFailed`,{err:t})}finally{this._pending.delete(e),this.requestUpdate()}}}_openPause(){this._pauseOpen=!0,this.requestUpdate()}_resumeRegulation(){this._pauseOpen=!1,this._call(W.ctrlActive,`switch`,`turn_on`,{entity_id:W.ctrlActive})}_toggle(e){let t=q(this._hass?.states[e]);e===W.ctrlActive&&t?this._openPause():this._call(e,`switch`,t?`turn_off`:`turn_on`,{entity_id:e})}async _pause(e){let t=this._hass;if(this._pauseOpen=!1,t){this._pending.add(W.ctrlActive),this._error=void 0,this.requestUpdate();try{await t.callWS({type:`e3dc_maestro/pause`,hours:e})}catch(e){let n=e instanceof Error?e.message:typeof e==`object`&&e&&`message`in e?String(e.message):String(e);this._error=Ja(t.language).t(`callFailed`,{err:n})}finally{this._pending.delete(W.ctrlActive),this.requestUpdate()}}}_syncPauseClock(e){let t=e!==void 0&&e*1e3>Date.now();t&&this._pauseClock===void 0?this._pauseClock=window.setInterval(()=>this.requestUpdate(),3e4):!t&&this._pauseClock!==void 0&&(window.clearInterval(this._pauseClock),this._pauseClock=void 0)}_press(e){this._call(e,`button`,`press`,{entity_id:e})}_select(e,t){this._call(e,`select`,`select_option`,{entity_id:e,option:t})}_commitPower(e){this._commitNumber(W.forceDischargePower,e).then(()=>{this._powerDraft=void 0,this.requestUpdate()})}_commitReserve(e){this._commitNumber(W.fixedReserveSoc,e).then(()=>{this._reserveDraft=void 0,this.requestUpdate()})}_commitNumber(e,t){return this._call(e,`number`,`set_value`,{entity_id:e,value:t})}async _checkClassic(){let e=this._hass;e&&(this._classic={...this._classic,state:`checking`},this.requestUpdate(),this._classic=await Ho(e),this.requestUpdate())}async _createClassic(){let e=this._hass,t=this._classic;if(e&&t){this._classic={...t,state:`creating`},this.requestUpdate();try{await Uo(e,t.state),await this._checkClassic()}catch(e){this._classic={...t,state:`error`,error:Io(e)},this.requestUpdate()}}}_openClassic(){history.pushState(null,``,`/e3dc-maestro`),window.dispatchEvent(new CustomEvent(`location-changed`,{detail:{replace:!1}}))}async _checkEnergy(){let e=this._hass;e&&(this._energy={...this._energy,state:`checking`},this.requestUpdate(),this._energy=await Ko(e),this.requestUpdate())}async _applyEnergy(e){let t=this._hass,n=this._energy;if(t&&n){this._energy={...n,state:`applying`},this.requestUpdate();try{this._energy=await qo(t,e)}catch(e){this._energy={...n,state:`error`,error:Wo(e)}}this.requestUpdate()}}_openEnergy(){history.pushState(null,``,`/config/energy`),window.dispatchEvent(new CustomEvent(`location-changed`,{detail:{replace:!1}}))}_toggleMenu(){this.dispatchEvent(new Event(`hass-toggle-menu`,{bubbles:!0,composed:!0}))}_fault(e){if(e===3)return`Connection lost`;if(typeof e==`number`)return String(e);if(e instanceof Error)return e.message;if(e&&typeof e==`object`){let t=e;if(typeof t.message==`string`&&t.message)return t.message;let n=t.error;if(n&&typeof n==`object`){if(typeof n.message==`string`&&n.message)return n.message;if(n.code===3)return`Connection lost`}if(t.code===3)return`Connection lost`}return String(e)}async _loadOptions(){let e=this._hass;if(!(!e||this._optionsReady||this._optionsLoading)){this._optionsLoading=!0;try{let t=await e.callWS({type:`e3dc_maestro/panel_options`});this._storedOptions=t.options??{},this._optionsReady=!0,this._optionError=void 0,window.clearTimeout(this._optionsRetry),this._optionsRetry=void 0,this._slotsDirty||(this._slots=bs(this._storedOptions.tariff_slots));let n=yt(this._storedOptions.flow_consumers,this._consumers);this._consumers=n.list,xt(n.list),n.publishLocal&&this._setOption(`flow_consumers`,n.list,!0)}catch(e){this._optionError=this._fault(e),this._isConnectionLost(e)&&this._optionsRetry===void 0&&(this._optionsRetry=window.setTimeout(()=>{this._optionsRetry=void 0,this._loadOptions()},1500))}finally{this._optionsLoading=!1,this.requestUpdate()}}}_isConnectionLost(e){if(e===3)return!0;if(!e||typeof e!=`object`)return!1;let t=e;return t.code===3||t.error&&typeof t.error==`object`&&t.error.code===3?!0:typeof t.message==`string`&&/connection lost/i.test(t.message)}async _setOption(e,t,n=!1){let r=this._hass;if(r){this._pending.add(e),this._optionError=void 0,this.requestUpdate();try{let i=await r.callWS({type:`e3dc_maestro/panel_options/set`,values:{[e]:t}}),a={...this._storedOptions};t===null?delete a[e]:a[e]=t,this._storedOptions=a,n||(this._optionNotice=i.reloaded?`reload`:`saved`),e===`tariff_slots`&&(this._slotsDirty=!1),i.reloaded&&(this._resolvedAt=0,this._resolveEntities())}catch(e){this._optionError=this._fault(e)}finally{this._pending.delete(e),this.requestUpdate()}}}render(){this._stats.renders++;let e=this._hass;if(!e)return R``;let t=Ja(e.language),n=ka(e.language),{t:r}=t,i={hass:e,i18n:t,isAdmin:e.user?.is_admin===!0,options:this._storedOptions,ready:this._optionsReady,error:this._optionError,notice:this._optionNotice,query:this._optionQuery,pending:this._pending,slots:this._slots,onQuery:(e,t)=>{this._optionQuery={...this._optionQuery,[e]:t},this.requestUpdate()},onChange:(e,t)=>void this._setOption(e,t),onSlots:e=>{this._slots=e,this._slotsDirty=!0,this.requestUpdate()},onSaveSlots:()=>void this._setOption(`tariff_slots`,this._slots),onRunSizing:()=>this._press(W.btnSizing)},a={hass:e,i18n:t,fmt:n,mobile:this._mobile,sparks:this._sparks,daySparks:this._daySparks,ist:this._ist,timeline:this._timeline,range:this._range,showIst:this._showIst,forecastZoom:this._forecastZoom,forecastHidden:this._forecastHidden,hideShadowSoc:this._hideShadowSoc,hideExpectedSoc:this._hideExpectedSoc,hideShadowImport:this._hideShadowImport,planZoom:this._planZoom,onRange:e=>{this._range=e,this._zoomKey=void 0,this._forecastZoom=void 0,this.requestUpdate()},onToggleIst:()=>{this._showIst=!this._showIst,this._zoomKey=void 0,this._forecastZoom=void 0,this.requestUpdate(),this._ensureHistory()},onForecastZoom:(e,t)=>{let n=this._forecastZoom;n&&Math.abs(n[0]-e)<1&&Math.abs(n[1]-t)<1||(this._forecastZoom=[e,t],this.requestUpdate())},onForecastLayout:()=>this._syncPlotStrips(),onPlanZoom:(e,t)=>{let n=this._planZoom;n&&Math.abs(n[0]-e)<1&&Math.abs(n[1]-t)<1||(this._planZoom=[e,t],this.requestUpdate())},onPlanLayout:()=>this._syncPlotStrips(),onToggleForecastSeries:e=>{let t=new Set(this._forecastHidden);t.has(e)?t.delete(e):t.add(e),this._forecastHidden=t,Lr(t),this.requestUpdate()},onToggleHideShadowSoc:()=>{this._hideShadowSoc=!this._hideShadowSoc,Br(this._hideShadowSoc),this.requestUpdate()},onToggleHideExpectedSoc:()=>{this._hideExpectedSoc=!this._hideExpectedSoc,Ur(this._hideExpectedSoc),this.requestUpdate()},onToggleHideShadowImport:()=>{this._hideShadowImport=!this._hideShadowImport,Kr(this._hideShadowImport),this.requestUpdate()},consumers:this._flowConsumers(e),consumerOverflow:this._heldOverflow(this._consumerOverflow(e)),onEditConsumers:()=>this._openConsumers(),arrangeConsumers:this._arrangeConsumers,onToggleArrange:()=>{this._arrangeConsumers=!this._arrangeConsumers,this.requestUpdate()},onResetConsumerPlaces:()=>this._resetConsumerPlaces(),consumerPlaces:this._consumerPlacesByStyle[this._flowStyle]??{},onPlaceConsumer:(e,t)=>this._placeConsumer(e,t),onFlowNode:e=>this._openFlow(e),motion:this._motion,onMotion:e=>this._setMotion(e),collapsed:this._collapsed,onToggleGroup:e=>{let t=new Set(this._collapsed);t.delete(e)||t.add(e),this._collapsed=t,La(t),this.requestUpdate(),e===`balancePulse`&&!t.has(`balancePulse`)&&this._ensureHistory()},batteryCtrlOpen:this._batteryCtrlOpen,onOpenBatteryCtrl:()=>{this._batteryCtrlOpen=!0,this.requestUpdate()},onCloseBatteryCtrl:()=>{this._batteryCtrlOpen=!1,this.requestUpdate()},flowOptsOpen:this._flowOptsOpen,onOpenFlowOpts:()=>{this._flowOptsOpen=!this._flowOptsOpen,this.requestUpdate()},onCloseFlowOpts:()=>{this._flowOptsOpen=!1,this.requestUpdate()},balanceRange:this._balanceRange(),rangeSums:this._rangeSums,onBalanceSelect:(e,t)=>{let n=Zn(e,t),r=n.grain===`day`&&n.live?void 0:n.anchor;(e!==this._grain||r!==this._anchor)&&(this._grain=e,this._anchor=r,this._calViewAnchor=n.anchor,n.grain===`day`&&n.live?(this._rangeSums=void 0,this._daySparks=void 0):(this._rangeSums=qn(this._rangeSumsCache,n.cacheKey),this._daySparks=n.grain===`day`?qn(this._daySparksCache,n.start):void 0),this.requestUpdate(),this._ensureHistory())},calOpen:this._calOpen,calViewAnchor:this._calViewAnchor,onCalOpen:e=>{this._calOpen=e,e&&(this._calViewAnchor=this._balanceRange().anchor),this.requestUpdate()},onCalViewAnchor:e=>{this._calViewAnchor=e,this.requestUpdate()},pulseRange:this._pulseRange,onPulseRange:e=>{e!==this._pulseRange&&(this._pulseRange=e,this._pulseDays=void 0,this._pulseState=`idle`,this._loadedAt.delete(`pulse-${e}`),this.requestUpdate(),this._ensureHistory())},pulseDays:this._pulseDays,pulseState:this._pulseState,pending:this._pending,groupId:this._screen===`plant`?this._plantGroup:this._settingsGroup,onOpenGroup:e=>this._openSettingsGroup(e),setupAck:this._setupAck,onAckSetup:()=>{this._setupAck=!0,us(),this.requestUpdate()},onOpenRoom:e=>this._openPlantRoom(e),onOpenClassic:()=>this._openClassic(),classic:this._classic,energy:this._energy,isAdmin:e.user?.is_admin===!0,onCreateClassic:()=>void this._createClassic(),onCheckClassic:()=>void this._checkClassic(),onCheckEnergy:()=>void this._checkEnergy(),onApplyEnergy:e=>void this._applyEnergy(e),onOpenEnergy:()=>this._openEnergy(),onToggle:e=>this._toggle(e),onPress:e=>this._press(e),onSelect:(e,t)=>this._select(e,t),onNumber:(e,t)=>void this._commitNumber(e,t),forcePowerDraft:this._powerDraft,onPowerDraft:e=>{this._powerDraft=e,this.requestUpdate()},onPowerCommit:e=>this._commitPower(e),reserveDraft:this._reserveDraft,onReserveDraft:e=>{this._reserveDraft=e,this.requestUpdate()},onReserveCommit:e=>this._commitReserve(e),debugOpen:this._debugOpen,onToggleDebug:()=>{this._debugOpen=!this._debugOpen,this.requestUpdate()},theme:this._theme,onTheme:e=>this._setTheme(e),onThemePreview:e=>this._previewTheme(e),themePreviewing:this._themePreview!==void 0&&this._themePreview!==this._theme,onShowLadder:()=>this._showLadder(),flowStyle:this._flowStyle,onFlowStyle:e=>this._setFlowStyle(e),density:this._lookPrefs.density,onDensity:e=>this._setDensity(e),corners:this._lookPrefs.corners,onCorners:e=>this._setCorners(e),alertBannerHidden:this._bannerHidden,onAlertBannerHidden:e=>this._setBannerHidden(e),batteryStyle:this._batteryStyle,onBatteryStyle:e=>this._setBatteryStyle(e),phasePoints:this._phasePoints,phaseHistory:this._phaseHistory,options:i,expert:this._expert,onExpert:e=>{this._expert=e,cl(e),this.requestUpdate()},planTuneOpen:this._planTuneOpen,onTogglePlanTune:()=>{this._planTuneOpen=!this._planTuneOpen,ol(this._planTuneOpen),this.requestUpdate()},pvOpen:this._pvOpen,onTogglePv:e=>{let t=new Set(this._pvOpen);t.delete(e)||t.add(e),this._pvOpen=t,dl(t),this.requestUpdate()},settingsQuery:this._settingsQuery,onSettingsQuery:e=>{this._settingsQuery=e,this.requestUpdate()}},o=Tf.find(e=>e.id===this._screen)??Tf[0],s=this._screen===`settings`?xc(this._settingsGroup):void 0,c=this._screen===`plant`?Wl(this._plantGroup):void 0,l=s??c,u=q(e.states[W.ctrlActive]),d=Ut(e.states[W.ctrlActive]);this._syncPauseClock(d);let f=Gt(r,e.states[W.ctrlActive]),p=e.states[W.phase]?.state,m={live:Wd,forecast:Jd,plan:Zd,decision:cf,plant:Zl,settings:Sl}[o.id](a);return R`
      <div class="app">
        <nav class="rail" aria-label="Maestro">
          <div class="logo">
            <img src=${Bi} alt="Maestro" />
          </div>
          ${Tf.map(e=>R`<button
      class="nav-btn ${e.id===o.id?`active`:``}"
      aria-current=${e.id===o.id?`page`:`false`}
      @click=${()=>this._go(e.id)}
    >
      ${If(e.icon)}${r(e.label)}
    </button>`)}
          <div class="spacer"></div>
          <button class="nav-btn" @click=${()=>this._setSheet(!0)}>${If(Ef)}${r(`navControls`)}</button>
          <button class="nav-btn ${this._help?`active`:``}" aria-expanded=${this._help?`true`:`false`} @click=${()=>this._help?this._closeHelp():this._openHelp()}>${If(Df)}${r(`navHelp`)}</button>
        </nav>
        <main>
          <header class="topbar">
            ${this._narrow?R`<button class="menu" aria-label=${r(`menu`)} @click=${this._toggleMenu}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" /></svg>
                </button>`:B}
            ${l?R`<button class="menu" aria-label=${r(`settingsBack`)} @click=${()=>this._closeArea()}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.4 5.4 9.8 11H21v2H9.8l5.6 5.6L14 20l-8-8 8-8z"/></svg>
                </button>`:B}
            <div class="title grow">
              <h1>${r(l?l.title:o.label)}</h1>
              <p>${r(l?l.hint:o.sub)}</p>
              ${f?R`<p class="sub">${f}</p>`:B}
              ${l?B:this._liveFacts(e,n,r)}
            </div>
            <button
              type="button"
              class="menu theme-toggle"
              aria-label=${ko(this._theme)?r(`themeToggleToLight`):r(`themeToggleToDark`)}
              title=${ko(this._theme)?r(`themeToggleToLight`):r(`themeToggleToDark`)}
              @click=${()=>this._toggleLightDark()}
            >${If(ko(this._theme)?Of:kf)}</button>
            <button class="menu help-menu" aria-label=${r(`navHelp`)} @click=${()=>this._help?this._closeHelp():this._openHelp()}>${If(Df)}</button>
            <button type="button" class="pill hide-sm" @click=${()=>this._openPause()}>
              <span class="dot ${u?``:`off`}"></span>${u?r(`regulationOn`):f??r(`regulationOff`)}${p?` · ${t.phase(p)}`:``}
            </button>
          </header>
          ${this._entityNotice(e,r)}
          ${this._alerts(e,r)}
          ${this._error&&!this._sheet?R`<p class="err" role="alert">${this._error}</p>`:B}
          ${this._chartError?R`<p class="err">${r(`chartError`,{err:this._chartError})}</p>`:B}
          <section class="screen" id=${`screen-${o.id}`}>${m}</section>
          ${wf?R`<footer class="debug">hass-Updates ${this._stats.hassUpdates} · Renders ${this._stats.renders}</footer>`:B}
        </main>
      </div>
      ${nn({hass:e,i18n:t,fmt:n,open:this._sheet,pending:this._pending,error:this._error,forcePowerDraft:this._powerDraft,onClose:()=>this._setSheet(!1),onToggle:e=>this._toggle(e),onPowerDraft:e=>{this._powerDraft=e,this.requestUpdate()},onPowerCommit:e=>this._commitPower(e),reserveDraft:this._reserveDraft,onReserveDraft:e=>{this._reserveDraft=e,this.requestUpdate()},onReserveCommit:e=>this._commitReserve(e),onPress:e=>this._press(e),onSelect:(e,t)=>this._select(e,t),onAllSettings:()=>{this._setSheet(!1),this._go(`settings`)},consumers:this._consumers,consumersSheet:this._consumersSheet,picking:this._picking,pickQuery:this._pickQuery,choices:Dt(e,new Set(this._consumers.map(e=>e.entityId)),this._pickQuery),wallbox:e.states[`sensor.e3dc_maestro_wallbox_leistung`]&&!this._consumers.some(e=>e.entityId===`sensor.e3dc_maestro_wallbox_leistung`)?{id:Qe,name:gt(e.states[Qe],t.t(`useWallbox`))}:void 0,onPick:e=>{this._picking=e,this.requestUpdate()},onPickQuery:e=>{this._pickQuery=e,this.requestUpdate()},onAddConsumer:(e,t)=>{this._consumers.some(t=>t.entityId===e)||this._setConsumers([...this._consumers,{id:vt(),entityId:e,name:t,mode:`included`,icon:st(e)}],!0)},onUseWallbox:()=>{let n=gt(e.states[Qe],t.t(`useWallbox`));this._setConsumers([...this._consumers,{id:vt(),entityId:Qe,name:n,mode:`separate`,icon:`wallbox`}],!0)},onRenameConsumer:(e,t)=>{let n=t.slice(0,40);n.trim()&&this._setConsumers(this._consumers.map(t=>t.id===e?{...t,name:n}:t))},onConsumerMode:(e,t)=>{this._setConsumers(this._consumers.map(n=>n.id===e?{...n,mode:t}:n))},onConsumerIcon:(e,t)=>{this._setConsumers(this._consumers.map(n=>n.id===e?{...n,icon:t}:n))},onRemoveConsumer:e=>this._setConsumers(this._consumers.filter(t=>t.id!==e))})}
      ${this._help?xf({i18n:t,query:this._helpQuery,phase:p,planActive:q(e.states[W.ctrlPlanControls]),lowYield:q(e.states[W.lowYield]),current:this._helpCurrent,onQuery:e=>{this._helpQuery=e,this.requestUpdate()},onClose:()=>this._closeHelp(),onJump:e=>this._jumpHelp(e),onAction:e=>this._helpAction(e),onTop:()=>{let e=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;this.renderRoot.querySelector(`.help-doc`)?.scrollTo({top:0,behavior:e?`auto`:`smooth`})}}):B}
      ${this._pauseOpen?Kt(r,u,e=>void this._pause(e),()=>this._resumeRegulation(),()=>{this._pauseOpen=!1,this.requestUpdate()}):B}
      ${this._batteryCtrlOpen?af(a):B}
      ${this._hist?R`<div class="scrim open hist-scrim" @click=${()=>this._closeHistory()}></div>
            <aside class="overlay" role="dialog" aria-modal="true" aria-label=${this._hist.name}>
              <div class="sheet-head">
                <div class="grow"><h2>${this._hist.name}</h2><div class="sub">${r(`historySub`)}</div></div>
                <button class="btn" @click=${()=>this._closeHistory()}>${r(`close`)}</button>
              </div>
              ${this._histState===`loading`?R`<p class="hint">${r(`loading`)}</p>`:B}
              ${this._histState===`empty`?R`<p class="hint">${r(`historyEmpty`)}</p>`:B}
              ${this._histState===`error`?R`<p class="err">${r(`historyFailed`)}</p>`:B}
              ${this._histState===`ready`&&this._histPoints?R`<maestro-chart .options=${za(`hist-${this._hist.entityId}`,[this._theme,this._histPoints,this._hist.color,n.loc],()=>Qr(this._histPoints,this._hist.color,n))}></maestro-chart>`:B}
            </aside>`:B}
    `}firstUpdated(){this._ensureHistory()}willUpdate(){let e=this._themePreview??this._theme;this.getAttribute(`theme`)!==e&&this.setAttribute(`theme`,e);let{density:t,corners:n}=this._lookPrefs;this.getAttribute(`density`)!==t&&this.setAttribute(`density`,t),n===`auto`?this.removeAttribute(`corners`):this.getAttribute(`corners`)!==n&&this.setAttribute(`corners`,n),this._hass&&this._syncAlertDismissed(to(this._hass))}updated(){let e=`${this._screen}/${this._settingsGroup??``}/${this._plantGroup??``}`;if(e!==this._scrollKey){this._scrollKey=e;let t=this.renderRoot.querySelector(`main`);t&&!this._focusConsumers&&!this._scrollToLadder&&(t.scrollTop=0)}if(this._scrollToLadder){this._scrollToLadder=!1;let e=this.renderRoot.querySelector(`#regelleiter`);e&&(e.scrollIntoView({behavior:`smooth`,block:`start`}),e.classList.remove(`ladder-flash`),e.offsetWidth,e.classList.add(`ladder-flash`))}if(this._loadOptions(),this._screen===`settings`&&this._settingsGroup===fc.id&&!this._classic&&this._checkClassic(),this._screen===`settings`&&this._settingsGroup===pc.id&&!this._energy&&this._checkEnergy(),this._focusConsumers&&(this._focusConsumers=!1,this.renderRoot.querySelector(`#display-consumers`)?.scrollIntoView({block:`start`})),this._help?this._bindHelpScroll():this._unbindHelpScroll(),this._helpAnchor){let e=this._helpAnchor;this._helpAnchor=void 0,this._helpCurrent=e.startsWith(`ch-`)?e.slice(3):e,this._scrollHelp(e),this.renderRoot.querySelector(`.help-query`)?.focus({preventScroll:!0})}if(this._hass){if(this._screen===`forecast`){let e=an(this._hass.states[W.trajectory]?.attributes),t=this.renderRoot.querySelector(`#fc-main`);if(e&&t){let n=Cn(e,this._range,{showIst:this._showIst,istStart:this._ist?.pv[0]?.[0]??this._ist?.soc[0]?.[0]}),r=`${this._range}|${n.from}|${n.to}`;r!==this._zoomKey&&(this._zoomKey=r,this._forecastZoom=[n.from,n.to],t.zoomX(n.from,n.to))}}this._syncPlotStrips()}}_syncPlotStrips(){let e=()=>{this._syncOnePlotStrip(`#fc-main`,`.strategy-strip .strip-track`,`forecast`),this._syncOnePlotStrip(`#plan-main`,`.plan-slots-strip .strip-track`,`plan`)};requestAnimationFrame(()=>requestAnimationFrame(e))}_syncOnePlotStrip(e,t,n){let r=this.renderRoot.querySelector(e);if(!r)return;let i=r.plotMetrics();if(!i)return;let a=Math.round(i.left),o=Math.round(i.width),s=this.renderRoot.querySelector(t);if(s&&(s.style.marginLeft=`${a}px`,s.style.width=`${o}px`,s.style.maxWidth=`${o}px`,s.style.marginRight=`auto`),n===`forecast`){let e=this.renderRoot.querySelector(`#fc-brush`);if(e){let t=Math.max(0,Math.round(r.getBoundingClientRect().width-i.left-i.width));e.setPlotPadding(a,t)}let t=this._forecastZoom;(!t||Math.abs(t[0]-i.minX)>1||Math.abs(t[1]-i.maxX)>1)&&(this._forecastZoom=[i.minX,i.maxX],this.requestUpdate())}else{s&&this._syncPlanStripToBars(r,s);let e=this._planZoom;(!e||Math.abs(e[0]-i.minX)>1||Math.abs(e[1]-i.maxX)>1)&&(this._planZoom=[i.minX,i.maxX],this.requestUpdate())}}_syncPlanStripToBars(e,t){let n=[...e.querySelectorAll(`.apexcharts-bar-series path`)].filter(e=>e.getBoundingClientRect().width>1),r=[...t.querySelectorAll(`.strip.timed .slot`)];if(!n.length||n.length!==r.length)return;let i=t.getBoundingClientRect().left,a=t.getBoundingClientRect().width;if(a>0)for(let e=0;e<r.length;e++){let t=n[e].getBoundingClientRect(),o=(t.left-i)/a*100,s=t.width/a*100;Number.isFinite(o)&&Number.isFinite(s)&&(r[e].style.left=`${o}%`,r[e].style.width=`${Math.max(s,.15)}%`)}}};Sf=zf,Sf.styles=Ya,customElements.get(`e3dc-maestro-panel`)||customElements.define(`e3dc-maestro-panel`,zf);