var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:f,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,h=globalThis,g=h.trustedTypes,_=g?g.emptyScript:``,v=h.reactiveElementPolyfillSupport,y=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},x=(e,t)=>!l(e,t),S={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol(`metadata`),h.litPropertyMetadata??=new WeakMap;var C=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=S){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??S}static _$Ei(){if(this.hasOwnProperty(y(`elementProperties`)))return;let e=m(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y(`properties`))){let e=this.properties,t=[...f(e),...p(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?b:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?b:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??x)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};C.elementStyles=[],C.shadowRootOptions={mode:`open`},C[y(`elementProperties`)]=new Map,C[y(`finalized`)]=new Map,v?.({ReactiveElement:C}),(h.reactiveElementVersions??=[]).push(`2.1.2`);var w=globalThis,T=e=>e,E=w.trustedTypes,D=E?E.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,O=`$lit$`,k=`lit$${Math.random().toFixed(9).slice(2)}$`,ee=`?`+k,te=`<${ee}>`,A=document,j=()=>A.createComment(``),ne=e=>e===null||typeof e!=`object`&&typeof e!=`function`,re=Array.isArray,ie=e=>re(e)||typeof e?.[Symbol.iterator]==`function`,ae=`[ 	
\f\r]`,oe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,se=/-->/g,ce=/>/g,le=RegExp(`>|${ae}(?:([^\\s"'>=/]+)(${ae}*=${ae}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),ue=/'/g,de=/"/g,fe=/^(?:script|style|textarea|title)$/i,pe=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),M=pe(1),N=pe(2),me=Symbol.for(`lit-noChange`),P=Symbol.for(`lit-nothing`),he=new WeakMap,ge=A.createTreeWalker(A,129);function _e(e,t){if(!re(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return D===void 0?t:D.createHTML(t)}var ve=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=oe;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===oe?c[1]===`!--`?o=se:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=le):(fe.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=le):o=ce:o===le?c[0]===`>`?(o=i??oe,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?le:c[3]===`"`?de:ue):o===de||o===ue?o=le:o===se||o===ce?o=oe:(o=le,i=void 0);let d=o===le&&e[t+1].startsWith(`/>`)?` `:``;a+=o===oe?n+te:l>=0?(r.push(s),n.slice(0,l)+O+n.slice(l)+k+d):n+k+(l===-2?t:d)}return[_e(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},ye=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=ve(t,n);if(this.el=e.createElement(l,r),ge.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=ge.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(O)){let t=u[o++],n=i.getAttribute(e).split(k),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?we:r[1]===`?`?Te:r[1]===`@`?Ee:Ce}),i.removeAttribute(e)}else e.startsWith(k)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(fe.test(i.tagName)){let e=i.textContent.split(k),t=e.length-1;if(t>0){i.textContent=E?E.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],j()),ge.nextNode(),c.push({type:2,index:++a});i.append(e[t],j())}}}else if(i.nodeType===8){if(i.data===ee)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(k,e+1))!==-1;)c.push({type:7,index:a}),e+=k.length-1}}a++}}static createElement(e,t){let n=A.createElement(`template`);return n.innerHTML=e,n}};function be(e,t,n=e,r){if(t===me)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=ne(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=be(e,i._$AS(e,t.values),i,r)),t}var xe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??A).importNode(t,!0);ge.currentNode=r;let i=ge.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Se(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new De(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=ge.nextNode(),a++)}return ge.currentNode=A,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Se=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=P,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=be(this,e,t),ne(e)?e===P||e==null||e===``?(this._$AH!==P&&this._$AR(),this._$AH=P):e!==this._$AH&&e!==me&&this._(e):e._$litType$===void 0?e.nodeType===void 0?ie(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==P&&ne(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=ye.createElement(_e(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new xe(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=he.get(e.strings);return t===void 0&&he.set(e.strings,t=new ye(e)),t}k(t){re(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(j()),this.O(j()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=T(e).nextSibling;T(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ce=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=P,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=P}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=be(this,e,t,0),a=!ne(e)||e!==this._$AH&&e!==me,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=be(this,r[n+o],t,o),s===me&&(s=this._$AH[o]),a||=!ne(s)||s!==this._$AH[o],s===P?e=P:e!==P&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},we=class extends Ce{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===P?void 0:e}},Te=class extends Ce{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==P)}},Ee=class extends Ce{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=be(this,e,t,0)??P)===me)return;let n=this._$AH,r=e===P&&n!==P||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==P&&(n===P||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},De=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){be(this,e)}},Oe={M:O,P:k,A:ee,C:1,L:ve,R:xe,D:ie,V:be,I:Se,H:Ce,N:Te,U:Ee,B:we,F:De},ke=w.litHtmlPolyfillSupport;ke?.(ye,Se),(w.litHtmlVersions??=[]).push(`3.3.3`);var Ae=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Se(t.insertBefore(j(),e),e,void 0,n??{})}return i._$AI(e),i},je=globalThis,Me=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ae(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return me}};Me._$litElement$=!0,Me.finalized=!0,je.litElementHydrateSupport?.({LitElement:Me});var Ne=je.litElementPolyfillSupport;Ne?.({LitElement:Me}),(je.litElementVersions??=[]).push(`4.2.2`);var Pe=(function(){let e=typeof document<`u`&&document.createElement(`link`).relList;return e&&e.supports&&e.supports(`modulepreload`)?`modulepreload`:`preload`})(),Fe=function(e,t){return new URL(e,t).href},Ie={},Le=function(e){return e.pathname.endsWith(`.css`)},Re=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},ze=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Fe(t,n);let r=s(t),i=Le(r);return Re(Ie,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Pe,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Be,Ve=new WeakMap,He,Ue=0;async function We(){return He??=await ze(()=>import(`./apex-DvHPYsi2.js`),[],import.meta.url),He}var Ge=class extends Me{constructor(...e){super(...e),this._run=0}createRenderRoot(){return this}updated(e){e.has(`options`)&&this._apply().catch(e=>{this.dispatchEvent(new CustomEvent(`chart-error`,{detail:e instanceof Error?`${e.name}: ${e.message}`:String(e),bubbles:!0,composed:!0}))})}connectedCallback(){super.connectedCallback(),Ue++,He?.claimSVG(),this.hasUpdated&&this.options&&!this._chart&&this.requestUpdate(`options`)}disconnectedCallback(){super.disconnectedCallback(),--Ue===0&&He?.releaseSVG(),this._run++;try{this._chart?.destroy()}catch{}this._chart=void 0,this.replaceChildren()}_scoped(e){let t=e.chart?.id,n=e.chart?.brush?.target,r=this.getRootNode(),i=Ve.get(r);i||Ve.set(r,i=Math.random().toString(36).slice(2,8));let a=i;return{...e,chart:{...e.chart,...t?{id:`${t}-${a}`}:{},...n?{brush:{...e.chart?.brush,target:`${n}-${a}`}}:{}}}}zoomX(e,t){this._zoom=[e,t],this._chart?.zoomX(e,t)}async _apply(){let e=this.options;if(!e)return;let t=this._scoped(e),n=++this._run,r=await We(),i=r.default;if(n!==this._run||!this.isConnected)return;r.claimSVG();let a=t.chart?.brush?.target;if(a){for(let e=0;e<120&&!i.getChartByID(a);e++)if(await new Promise(e=>requestAnimationFrame(e)),n!==this._run)return}this._chart?(await this._chart.updateOptions(t,!1,!1),t.series&&await this._chart.updateSeries(t.series,!1)):(this._chart=new i(this,t),await this._chart.render()),n===this._run&&this._zoom&&this._chart.zoomX(...this._zoom)}};Be=Ge,Be.properties={options:{attribute:!1}},customElements.get(`maestro-chart`)||customElements.define(`maestro-chart`,Ge);var F=e=>`sensor.e3dc_maestro_${e}`,Ke=e=>`binary_sensor.e3dc_maestro_${e}`,qe=e=>`switch.e3dc_maestro_${e}`,Je={phase:F(`regelphase`),lastAction:F(`letzte_aktion`),explanation:F(`entscheidungserklarung`),trajectory:F(`forecast_soc_trajektorie_24h`),plan:F(`preisplan`),soc:F(`aktueller_soc`),targetSoc:F(`ziel_soc`),pv:F(`pv_power`),house:F(`house_power`),grid:F(`grid_power`),battery:F(`battery_power`),autonomy:F(`autonomiezeit`),costNet:F(`netto_stromkosten_heute`),costToday:F(`stromkosten_heute`),feedRevenue:F(`einspeise_erlos_heute`),wear:F(`akku_verschleiss_heute`),balance:F(`energiebilanz_heute`),gridToBattery:F(`netz_akku_heute`),unjustified:Ke(`netzladung_ohne_rechtfertigung`),wallboxEnergy:F(`wallbox_energie_heute`),feedInInterventions:F(`einspeise_eingriffe_heute`),feedInAvoided:F(`dc_abregelung_verhindert_heute`),curtailAvoided:F(`abregelung_verhindert_heute`),feedInLimit:Ke(`einspeisedrosselung_aktiv`),gridCharge:Ke(`netzladung_aktiv`),batteryPriority:Ke(`akku_prioritat_aktiv`),lowYield:Ke(`schwacher_pv_tag`),forecastQuality:F(`forecast_datenqualitat`),p10:F(`pv_restprognose_p10`),yieldToday:F(`pv_tagesprognose`),yieldRef:F(`pv_referenz_ertrag`),yieldRatio:F(`pv_tag_quote`),deficit:F(`morgen_energiedefizit`),seasonalReserve:F(`notstromreserve_aktuell`),adaptiveReserve:F(`notstromreserve_adaptiv`),htReserve:F(`ht_reserve_adaptiv`),forwardTarget:F(`vorausschauendes_ladeziel`),astroStart:F(`astro_ladestart_uhrzeit`),seasonalEnd:F(`saisonales_ladeende_uhrzeit`),pvDelayStart:F(`verzogerter_ladestart_heute`),tomorrowStart:F(`ladestart_morgen_prognose`),tomorrowEnd:F(`ladeende_morgen_prognose`),autoStrategy:F(`auto_aktive_strategie`),autoSaving:F(`auto_geschatzte_einsparung`),targetCharge:F(`ziel_ladeleistung`),sizingStatus:F(`advisor_status`),sizingMatrix:F(`advisor_sizing_matrix`),sizingScenario:F(`advisor_szenario`),sizingInverter:Ke(`advisor_wr_upgrade_empfohlen`),btnSizing:`button.e3dc_maestro_sizing_analyse_starten`,saving:F(`pv_ersparnis_heute`),selfUse:F(`pv_eigenverbrauch_heute`),importToday:F(`netzbezug_heute`),feedToday:F(`netzeinspeisung_heute`),pvToday:F(`pv_ertrag_heute`),houseToday:F(`hausverbrauch_heute`),chargedToday:F(`geladen_heute`),dischargedToday:F(`entladen_heute`),pvTomorrow:F(`morgen_pv_prognose`),reachable:Ke(`e3dc_erreichbar`),chargeLock:Ke(`ladesperre_aktiv`),dischargeLock:Ke(`entladesperre_aktiv`),htProtect:Ke(`ht_schutz_aktiv`),curtail:Ke(`abregelschutz_aktiv`),emergency:Ke(`notfallladung_aktiv`),chargeLimit:F(`soll_lade_limit`),dischargeLimit:F(`soll_entlade_limit`),sentChargeLimit:F(`gesendetes_lade_limit`),sentDischargeLimit:F(`gesendetes_entlade_limit`),forceDischargePower:`number.e3dc_maestro_erzwungene_entladungsleistung`,fixedReserveSoc:`number.e3dc_maestro_notstromreserve_prozent`,inverterPower:`number.e3dc_maestro_wr_leistung`,ctrlActive:qe(`regelung_aktiv`),ctrlPredictive:qe(`vorausschauende_ladung`),ctrlPvDelay:qe(`pv_prognose_verzogerung`),ctrlPlanControls:qe(`preisplan_steuert_akku`),ctrlPlanShadow:qe(`preisplan_schattenmodus`),ctrlAuto:qe(`auto_optimierung`),forceDischarge:qe(`erzwungene_entladung`),fixedReserve:qe(`notstromreserve`),debug:qe(`debug_logging`),debugLog:F(`debug_log`),btnClear:`button.e3dc_maestro_limits_jetzt_freigeben`,btnCharge:`button.e3dc_maestro_manuell_laden_3_kwh`,selWallbox:`select.e3dc_maestro_wallbox_typ`,selMorning:`select.e3dc_maestro_vorentladungs_modus`,selAuto:`select.e3dc_maestro_auto_optimierung_ziel`,selTariff:`select.e3dc_maestro_tarif_modus`,selStrategy:`select.e3dc_maestro_netzladung_strategie`},I={...Je},Ye=()=>({entities:{},packs:[],wallboxes:[],controls:{general:{},wallbox:{}},identity:{}}),L=Ye();function Xe(e){for(let t of Object.keys(Je))I[t]=e.entities[t]??Je[t]}var R={},Ze=new Set;function Qe(e){for(let e of Object.keys(R))delete R[e];Object.assign(R,e.settings??{}),Ze.clear();for(let t of e.settings_disabled??[])Ze.add(t)}function $e(e){L=e.plant??Ye()}var et=e=>Ze.has(e),tt=[`ctrlActive`,`ctrlPredictive`,`ctrlPvDelay`,`ctrlPlanControls`,`ctrlPlanShadow`],nt=e=>Object.values(e??{}),rt=()=>[...nt(L.entities),...nt(L.controls?.general),...nt(L.controls?.wallbox),...L.packs.flatMap(e=>[...nt(e.entities),...nt(e.controls),...(e.modules??[]).flatMap(e=>nt(e.entities))]),...L.wallboxes.flatMap(e=>[...nt(e.entities),...nt(e.controls)])],it=()=>[...Object.values(I),...Object.values(R),...rt()],z=e=>{let t=e?Number.parseFloat(e.state):NaN;return Number.isFinite(t)?t:void 0},B=e=>e?.state===`on`,at=`sensor.e3dc_maestro_wallbox_leistung`,ot=`e3dc-maestro.consumers.v1`,st=50,ct=1e4,lt=[`wallbox`,`heater`,`climate`,`heatpump`,`meter`],ut={wallbox:`M6 8h12v7H6zM9 8V5M15 8V5M12 15v4M9 19h6`,heater:`M10 3v18M15 7c1.4 1 1.4 2 0 3s-1.4 2 0 3 1.4 2 0 3`,climate:`M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9`,heatpump:`M4 7h16v11H4zM12 9.5a2.5 2.5 0 1 0 .01 0`,meter:`M6 16a6 6 0 1 1 12 0M12 16l3.5-3.5`},dt=e=>typeof e==`string`&&lt.includes(e);function ft(e){return/wallbox|evcc|easee|go-?e/i.test(e)?`wallbox`:`meter`}function pt(e){return!e||e.state===`unavailable`}function mt(e){let t=z(e);if(t!==void 0)return e?.attributes.unit_of_measurement===`kW`?t*1e3:t}function ht(e){if(!e?.entity_id.startsWith(`sensor.`))return!1;let t=e.attributes.unit_of_measurement;return e.attributes.device_class===`power`||t===`W`||t===`kW`}function gt(e,t){let n=e?.attributes.friendly_name;return typeof n==`string`&&n.trim()?n.trim():t}function _t(e){if(!Array.isArray(e))return[];let t=[],n=new Set;for(let r of e){if(!r||typeof r!=`object`)continue;let e=r,i=e.entityId,a=e.mode;if(typeof i!=`string`||!i.startsWith(`sensor.`)||n.has(i)||a!==`included`&&a!==`separate`)continue;let o=typeof e.name==`string`&&e.name.trim()?e.name.trim().slice(0,40):i,s=typeof e.id==`string`&&e.id?e.id:i;if(t.push({id:s,entityId:i,name:o,mode:a,icon:dt(e.icon)?e.icon:ft(i)}),n.add(i),t.length>=6)break}return t}function vt(){let e=new Uint8Array(8);return crypto.getRandomValues(e),[...e].map(e=>e.toString(16).padStart(2,`0`)).join(``)}function yt(e,t){return Array.isArray(e)?{list:_t(e),publishLocal:!1}:t.length?{list:t,publishLocal:!0}:{list:[],publishLocal:!1}}function bt(){try{return _t(JSON.parse(localStorage.getItem(ot)??`null`))}catch{return[]}}function xt(e){try{localStorage.setItem(ot,JSON.stringify(_t(e)))}catch{}}function St(e,t){return e.map(e=>{let n=t.states[e.entityId],r=mt(n);return{id:e.id,name:e.name,entityId:e.entityId,mode:e.mode,icon:e.icon,watts:r??0,missing:pt(n)}})}function Ct(e,t){return t===void 0||!Number.isFinite(t)||t<=0?[]:e.filter(e=>e.mode===`separate`&&e.entityId===`sensor.e3dc_maestro_wallbox_leistung`).map(e=>({name:e.name,kwh:t}))}function wt(e,t){return e!==void 0&&t.filter(e=>e.mode===`included`).reduce((e,t)=>e+Math.max(0,t.watts),0)>e+st}function Tt(e,t,n,r=ct){if(!e)return{show:!1,since:void 0};let i=t??n;return{show:n-i>=r,since:i}}function Et(e,t,n){let r=n.trim().toLowerCase();return Object.values(e.states).filter(e=>ht(e)&&!t.has(e.entity_id)).map(e=>({id:e.entity_id,name:gt(e,e.entity_id)})).filter(e=>!r||e.name.toLowerCase().includes(r)||e.id.toLowerCase().includes(r)).sort((e,t)=>e.name.localeCompare(t.name)).slice(0,12)}var{I:Dt}=Oe,Ot=e=>e.strings===void 0,kt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},At=e=>(...t)=>({_$litDirective$:e,values:t}),jt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},Mt=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),Mt(e,t);return!0},Nt=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},Pt=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Lt(t)}};function Ft(e){this._$AN===void 0?this._$AM=e:(Nt(this),this._$AM=e,Pt(this))}function It(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0){if(t){if(Array.isArray(r))for(let e=n;e<r.length;e++)Mt(r[e],!1),Nt(r[e]);else r!=null&&(Mt(r,!1),Nt(r))}else Mt(this,e)}}var Lt=e=>{e.type==kt.CHILD&&(e._$AP??=It,e._$AQ??=Ft)},Rt=class extends jt{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),Pt(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Mt(this,e),Nt(this))}setValue(e){if(Ot(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}},zt=new WeakMap,Bt=At(class extends Rt{render(e){return P}update(e,[t]){let n=t!==this.G;return n&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),P}rt(e){if(this.G!==void 0){if(this.isConnected||(e=void 0),typeof this.G==`function`){let t=this.ht??globalThis,n=zt.get(t);n===void 0&&(n=new WeakMap,zt.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}}get lt(){return typeof this.G==`function`?zt.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Vt=[1,3,6,12,24];function Ht(e){let t=e?.attributes?.pause_until;return typeof t==`number`&&Number.isFinite(t)?t:void 0}function Ut(e,t=Date.now()){let n=e*1e3-t;if(n<=0)return;let r=Math.max(1,Math.ceil(n/6e4));return{h:Math.floor(r/60),m:r%60}}function Wt(e,t,n=Date.now()){let r=Ht(t);if(r===void 0)return;let i=Ut(r,n);if(i)return i.h>0&&i.m>0?e(`pauseLeftHours`,{h:i.h,m:i.m}):i.h>0?e(`pauseLeftHour`,{h:i.h}):e(`pauseLeftMin`,{m:i.m})}function Gt(e,t,n,r,i){let a=(e,t)=>M`<button
    type="button"
    class="pause-choice"
    role="option"
    @click=${()=>n(e)}
  >${t}</button>`;return M`<div class="scrim open" @click=${i}></div>
    <div class="pause-menu" role="dialog" aria-modal="true" aria-label=${e(t?`pauseTitle`:`pauseOffTitle`)}>
      <h2>${e(t?`pauseTitle`:`pauseOffTitle`)}</h2>
      <p class="sub">${e(t?`pauseHint`:`pauseOffHint`)}</p>
      ${t?P:M`<button type="button" class="pause-choice resume" @click=${r}>${e(`pauseResume`)}</button>`}
      <div class="pause-options" role="listbox" aria-label=${e(`pauseTitle`)}>
        ${Vt.map(t=>a(t,t===1?e(`pauseOneHour`):e(`pauseHours`,{h:t})))}
        ${a(null,e(`pausePermanent`))}
      </div>
      <button type="button" class="btn" @click=${i}>${e(`close`)}</button>
    </div>`}var Kt=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},qt=e=>{let t=e.closest(`.slider-field`),n=e.type===`range`?`number`:`range`,r=t?.querySelector(`input[type="${n}"]`);r instanceof HTMLInputElement&&(r.value=e.value)},Jt=(e,t)=>Math.abs(e/t-Math.round(e/t))<1e-6;function Yt(e,t,n){let r=t-e;if(!(r>0))return n>0?n:1;if(n>0&&n>=r/10&&Number.isInteger(n))return n;let i=[1,2,5,10,20,25].filter(e=>Jt(r,e)&&r/e>=4&&r/e<=20);return i.length===0?1:i.reduce((e,t)=>Math.abs(r/t-10)<Math.abs(r/e-10)?t:e)}function Xt(e,t,n){let r=Math.max(1,Math.round((t-e)/n));return Array.from({length:r+1},(n,i)=>Math.round(e+(t-e)*i/r))}function Zt(e){let t=String(e.value),n=e.unit===`%`,r=n?Yt(e.min,e.max,e.step):e.step,i=n?Xt(e.min,e.max,r):[],a=t=>{let n=Number.parseFloat(t);Number.isFinite(n)&&e.onCommit(Math.min(e.max,Math.max(e.min,n)))},o=t=>{let n=Number.parseFloat(t);Number.isFinite(n)&&e.onPreview?.(n)};return M`<div class="slider-field">
    <div class="slider-track ${n?`raster`:``}">
    <input
      type="range"
      aria-label=${e.label}
      min=${e.min}
      max=${e.max}
      step=${r}
      ?disabled=${e.disabled}
      ${Bt(e=>{e instanceof HTMLInputElement&&!Kt(e)&&e.value!==t&&(e.value=t)})}
      @input=${e=>{let t=e.target;qt(t),o(t.value),window.clearTimeout(t._commit),t._commit=window.setTimeout(()=>a(t.value),200)}}
      @change=${e=>{let t=e.target;window.clearTimeout(t._commit),a(t.value)}}
    />
    ${n?M`<div class="slider-scale" aria-hidden="true">
          ${i.map(t=>M`<span style="left: ${(t-e.min)/(e.max-e.min)*100}%">${t}</span>`)}
        </div>`:P}
    </div>
    <input
      type="number"
      inputmode="decimal"
      aria-label=${e.label}
      min=${e.min}
      max=${e.max}
      step=${e.step}
      ?disabled=${e.disabled}
      ${Bt(e=>{e instanceof HTMLInputElement&&!Kt(e)&&e.value!==t&&(e.value=t)})}
      @input=${e=>{let t=e.target;qt(t),o(t.value)}}
      @change=${e=>a(e.target.value)}
    />
    ${e.unit?M`<span>${e.unit}</span>`:P}
  </div>`}var Qt={wallbox:`iconWallbox`,heater:`iconHeater`,climate:`iconClimate`,heatpump:`iconHeatpump`,meter:`iconMeter`},$t=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},en={ctrlActive:`ctrlActiveSub`,ctrlPredictive:`ctrlPredictiveSub`,ctrlPvDelay:`ctrlPvDelaySub`,ctrlPlanControls:`ctrlPlanControlsSub`,ctrlPlanShadow:`ctrlPlanShadowSub`};function tn(e){let{t}=e.i18n,n=e.hass.states[I.forceDischargePower],r=n?.attributes??{},i=typeof r.min==`number`?r.min:100,a=typeof r.max==`number`?r.max:1e4,o=typeof r.step==`number`?r.step:100,s=e.forcePowerDraft??z(n)??i,c=e.hass.states[I.fixedReserveSoc],l=c?.attributes??{},u=typeof l.min==`number`?l.min:0,d=typeof l.max==`number`?l.max:100,f=typeof l.step==`number`?l.step:1,p=e.reserveDraft??z(c)??u,m=(t,n)=>{let r=e.hass.states[t],i=B(r),a=!r||r.state===`unavailable`;return M`<button
      class="switch ${i?`on`:``}"
      role="switch"
      aria-checked=${i}
      aria-label=${n}
      ?disabled=${a||e.pending.has(t)}
      @click=${()=>e.onToggle(t)}
    ></button>`};return M`
    <div class="scrim ${e.open?`open`:``}" @click=${e.onClose}></div>
    <aside class="sheet ${e.open?`open`:``}" role="dialog" aria-modal="true" aria-label=${t(`controlsTitle`)} ?inert=${!e.open}>
      <div class="sheet-head">
        <div class="grow"><h2>${t(`controlsTitle`)}</h2><div class="sub">${t(`controlsSub`)}</div></div>
        <button class="btn" @click=${e.onClose}>${t(`close`)}</button>
      </div>
      ${e.error?M`<p class="err">${e.error}</p>`:P}
      <div class="release">
        <button
          class="btn action"
          ?disabled=${!e.hass.states[I.btnClear]||e.pending.has(I.btnClear)}
          @click=${()=>e.onPress(I.btnClear)}
        >${t(`btnClear`)}</button>
        <p class="sub">${t(`btnClearSub`)}</p>
      </div>
      ${tt.map(n=>{let r=n===`ctrlActive`?Wt(t,e.hass.states[I.ctrlActive]):void 0;return M`<div class="ctrl">
          <div class="txt"><b>${t(n)}</b><span>${r??t(en[n])}</span></div>
          ${m(I[n],t(n))}
        </div>`})}
      <div class="ctrl wrap">
        <div class="txt"><b>${t(`ctrlForce`)}</b><span>${t(`ctrlForcePower`,{v:e.fmt.w(s)})}</span></div>
        ${m(I.forceDischarge,t(`ctrlForce`))}
        ${Zt({label:t(`ctrlForcePower`,{v:``}),min:i,max:a,step:o,value:s,disabled:!n||n.state===`unavailable`,onPreview:e.onPowerDraft,onCommit:e.onPowerCommit})}
      </div>
      <div class="ctrl wrap">
        <div class="txt"><b>${t(`fixedReserve`)}</b><span>${t(`ctrlReserveSoc`,{v:Math.round(p)})}</span></div>
        ${m(I.fixedReserve,t(`fixedReserve`))}
        ${Zt({label:t(`fixedReserve`),min:u,max:d,step:f,value:p,unit:`%`,disabled:!c||c.state===`unavailable`,onPreview:e.onReserveDraft,onCommit:e.onReserveCommit})}
      </div>
      <div class="sheet-section">
        <h3>${t(`actionsTitle`)}</h3>
        ${[`selWallbox`,`selMorning`,`selAuto`,`selStrategy`].map(n=>{let r=e.hass.states[I[n]],i=Array.isArray(r?.attributes.options)?r.attributes.options:[];return M`<label class="ctrl">
            <span class="txt"><b>${t(n)}</b></span>
            <select
              .value=${r?.state??``}
              ?disabled=${!r||r.state===`unavailable`||e.pending.has(I[n])}
              @change=${t=>e.onSelect(I[n],t.target.value)}
            >
              ${i.map(t=>M`<option value=${t} ?selected=${t===r?.state}>${e.i18n.option(t)}</option>`)}
            </select>
          </label>`})}
        ${[`btnCharge`].map(n=>{let r=n===`btnCharge`?[t(`confirmCharge`)]:[];return M`<button
            class="btn action"
            ?disabled=${!e.hass.states[I[n]]||e.pending.has(I[n])}
            @click=${()=>{r.some(e=>!window.confirm(e))||e.onPress(I[n])}}
          >${t(n)}</button>`})}
      </div>
      <div class="sheet-section" id="display-consumers">
        <h3>${t(`displayTitle`)}</h3>
        <div class="sub">${t(`consumersSub`)}</div>
        ${e.consumers.length?e.consumers.map(n=>{let r=e.hass.states[n.entityId],i=pt(r);return M`<div class="consumer">
                <label class="txt">
                  <span class="lbl">${t(`consumerName`)}</span>
                  <input
                    ${Bt(e=>{e instanceof HTMLInputElement&&!$t(e)&&e.value!==n.name&&(e.value=n.name)})}
                    maxlength="40"
                    aria-label=${t(`consumerName`)}
                    @input=${t=>e.onRenameConsumer(n.id,t.target.value)}
                  />
                  <span>${i?t(`consumerMissing`):n.entityId}</span>
                </label>
                <div class="icon-pick" role="group" aria-label=${t(`consumerIcon`)}>
                  ${lt.map(r=>M`<button
                      type="button"
                      class=${n.icon===r?`on`:``}
                      aria-pressed=${n.icon===r}
                      aria-label=${t(Qt[r])}
                      @click=${()=>e.onConsumerIcon(n.id,r)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${ut[r]} /></svg>
                    </button>`)}
                </div>
                <div class="seg" role="group" aria-label=${n.name}>
                  <button type="button" class=${n.mode===`included`?`on`:``} aria-pressed=${n.mode===`included`} @click=${()=>e.onConsumerMode(n.id,`included`)}>${t(`modeIncluded`)}</button>
                  <button type="button" class=${n.mode===`separate`?`on`:``} aria-pressed=${n.mode===`separate`} @click=${()=>e.onConsumerMode(n.id,`separate`)}>${t(`modeSeparate`)}</button>
                </div>
                <button type="button" class="btn ghost" @click=${()=>e.onRemoveConsumer(n.id)}>${t(`removeConsumer`)}</button>
              </div>`}):M`<p class="hint">${t(`consumersEmpty`)}</p>`}
        ${e.wallbox?M`<button type="button" class="btn add" @click=${e.onUseWallbox}>${t(`useWallbox`)}</button>`:P}
        ${e.consumers.length<6?M`<button type="button" class="btn add" @click=${()=>e.onPick(!e.picking)}>${t(`addConsumer`)}</button>`:P}
        ${e.picking?M`<div class="picker">
              <input
                type="search"
                placeholder=${t(`consumerSearch`)}
                aria-label=${t(`consumerSearch`)}
                .value=${e.pickQuery}
                @input=${t=>e.onPickQuery(t.target.value)}
              />
              ${e.choices.length?e.choices.map(t=>M`<button type="button" class="pick" @click=${()=>e.onAddConsumer(t.id,t.name)}>
                      <b>${t.name}</b><span>${t.id}</span>
                    </button>`):M`<p class="hint">${t(`noPowerSensors`)}</p>`}
            </div>`:P}
      </div>
      <a class="link" href="#settings" @click=${t=>{t.preventDefault(),e.onAllSettings()}}>${t(`allSettings`)}</a>
    </aside>`}var nn=e=>Array.isArray(e)&&e.every(e=>Array.isArray(e)&&e.length===2&&Number.isFinite(e[0]));function rn(e){if(!e)return;let t=e;if(!(!nn(t.trajectory_points)||!nn(t.pv_points)||!nn(t.house_points)||!nn(t.grid_points)||!Array.isArray(t.trajectory_phases)||t.trajectory_points.length<2))return t}var an=e=>e.map(([e,t])=>[e,t/1e3]);function on(e){if(!e||e===`unknown`||e===`unavailable`||e===`–`)return;let t=e.match(/(\d+)\s*h/i),n=e.match(/(\d+)\s*min/i);if(t||n)return(t?Number(t[1]):0)+(n?Number(n[1]):0)/60}function sn(e,t){let n=new Intl.DateTimeFormat(`en-US`,{timeZone:t,hour12:!1,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`}),r=(e,t)=>Number(t.find(t=>t.type===e)?.value??0),i=n.formatToParts(new Date(e)),a=r(`hour`,i)%24;return Date.UTC(r(`year`,i),r(`month`,i)-1,r(`day`,i),a,r(`minute`,i),r(`second`,i))-e}function cn(e,t){if(!t){let t=new Date(e);return t.setHours(24,0,0,0),t.getTime()}let n=new Intl.DateTimeFormat(`en-CA`,{timeZone:t,year:`numeric`,month:`2-digit`,day:`2-digit`}).formatToParts(new Date(e)),r=e=>Number(n.find(t=>t.type===e)?.value),i=Date.UTC(r(`year`),r(`month`)-1,r(`day`)+1,0,0,0);return i-sn(i,t)}var ln=-30,un=e=>e<ln;function dn(e,t,n={}){let r=n.now??Date.now(),i=e.filter(([e])=>e>r);if(!i.length)return;let a=cn(r,n.timeZone),o=0;for(;o<i.length-1&&i[o+1][1]<=i[o][1]+.2;)o++;let s=o<i.length-1?i.slice(o).reduce((e,t)=>t[1]>e[1]?t:e):void 0,c=s?s[0]<=a?`today`:`tomorrow`:void 0,l=n.reserve!==void 0&&n.reserve>0?n.reserve:.5,u=n.currentSoc!==void 0&&Number.isFinite(n.currentSoc)?n.currentSoc:i[0][1],d,f;u>l+.5?(d=i.find(([,e])=>e<=l)?.[0],d!==void 0&&(f=`down`)):u<l-.5&&(d=i.find(([,e])=>e>=l)?.[0],d!==void 0&&(f=`up`));let p=new Map(nn(n.battery)?n.battery:[]),m=t.filter(([e])=>e>r).map(([e,t])=>[e,un(t)&&-t>Math.max(0,-(p.get(e)??0))]),h=n.currentGrid!==void 0&&Number.isFinite(n.currentGrid)?un(n.currentGrid):m[0]?.[1],g,_;if(m.length){if(h&&m[0][1]){let e=0;for(;e<m.length&&m[e][1];)e++;e>=m.length?_=`ongoing`:(g=m[e][0],_=`until`)}else for(let e=0;e<m.length;e++){if(!m[e][1])continue;let t=m[e+1];if(!t||t[1]){g=m[e][0],_=`starts`;break}}}return{peakSoc:s?.[1],peakAt:s?.[0],peakDay:c,floorAt:d,floorKind:f,gridImportAt:g,gridImportKind:_}}function fn(e){return{imp:e.map(([e,t])=>[e,Math.max(0,-t)/1e3]),exp:e.map(([e,t])=>[e,Math.max(0,t)/1e3])}}function pn(e,t){let n=[],r=0;for(let i=1;i<=e.length;i++)(i===e.length||e[i]!==e[r])&&(n.push({phase:e[r],x:t[r][0],x2:t[Math.min(i,t.length)-1][0]}),r=i);return n}var mn=e=>e.grid_charge_kwh>0?`charge`:e.hold?`hold`:`release`;function hn(e){return Array.isArray(e)?e.filter(e=>!!e&&typeof e.start==`string`&&Number.isFinite(Date.parse(e.start))&&Number.isFinite(e.price)):[]}function gn(e){return e.filter(e=>Number.isFinite(e.soc_pct)).map(e=>[Date.parse(e.start),e.soc_pct])}function _n(e){if(e.length<3)return e;let t=e.map(e=>Date.parse(e.start)),n=t.slice(1).map((e,n)=>e-t[n]).sort((e,t)=>e-t),r=n[Math.floor(n.length/2)];return e.filter((n,i)=>i===e.length-1||t[i+1]-t[i]>=r*.5)}function vn(e){if(e.length)return{min:e.reduce((e,t)=>t.price<e.price?t:e),max:e.reduce((e,t)=>t.price>e.price?t:e)}}function yn(e,t){if(e===`off`)return`off`;if(e===`slots`)return`slots`;if(e===`threshold`)return`threshold`;let n=typeof t.status==`string`?t.status:void 0;return n===`no_prices`?`no_prices`:n===`no_profile`?`no_profile`:n===`no_room`?`no_room`:(e===`dynamic_auto`||e===`dynamic_expert`)&&(t.enabled!==!0||n===void 0)?`computing`:`no_plan`}function bn(e){return(e??[]).map(e=>{let t=e.lc??e.lu,n=t===void 0?Date.parse(e.last_changed??e.last_updated??``):t*1e3;return{state:e.s??e.state??``,attrs:e.a??e.attributes??{},ts:n}}).filter(e=>Number.isFinite(e.ts))}function xn(e){return e.map(e=>[e.ts,Number.parseFloat(e.state)]).filter(([,e])=>Number.isFinite(e))}function Sn(e,t,n){let r=new Map;for(let[n,i]of e){let e=Math.floor(n/t)*t,a=r.get(e);a?a.push(i):r.set(e,[i])}return[...r.entries()].sort(([e],[t])=>e-t).map(([e,t])=>[e,n===`last`?t[t.length-1]:t.reduce((e,t)=>e+t,0)/t.length])}function Cn(e,t,n=12){let r=(e,t,n)=>{let r=typeof e.timestamp==`string`?Date.parse(e.timestamp):NaN;return{phase:typeof e.phase==`string`?e.phase:t,reason:typeof e.reason==`string`?e.reason:``,ts:Number.isFinite(r)?r:n}},i=e=>e===`unavailable`||e===`unknown`||e===``,a=e.filter(e=>!i(e.state)||typeof e.attrs.phase==`string`).map(e=>r(e.attrs,e.state,e.ts));if(Array.isArray(t))for(let e of t)e&&typeof e==`object`&&a.push(r(e,``,Date.now()));a.sort((e,t)=>t.ts-e.ts);let o=[];for(let e of a){if(!e.phase)continue;let t=o[o.length-1];t&&t.phase===e.phase?o[o.length-1]=e:o.push(e)}return o.slice(0,n)}function wn(e,t,n,r){return e.callWS({type:`history/history_during_period`,start_time:new Date(n).toISOString(),end_time:new Date().toISOString(),entity_ids:t,include_start_time_state:!0,...r})}var Tn=()=>{let e=new Date;return e.setHours(0,0,0,0),e.getTime()},En=[`costNet`,`saving`,`selfUse`,`chargedToday`,`costToday`,`feedRevenue`,`wear`,`balance`,`gridToBattery`,`wallboxEnergy`,`curtailAvoided`];function Dn(e){if(!e?.length)return;let t=!1,n=0;for(let r of e)typeof r.change==`number`&&Number.isFinite(r.change)&&(t=!0,n+=r.change);return t?n:void 0}var On=[`costNet`,`costToday`,`feedRevenue`,`wear`,`saving`,`selfUse`,`importToday`,`feedToday`,`chargedToday`,`dischargedToday`,`gridToBattery`,`wallboxEnergy`,`curtailAvoided`,`feedInAvoided`,`feedInInterventions`].filter(e=>e!==`costNet`),kn=(e=new Date)=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`,An=e=>{let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t){let e=new Date;return e.setHours(0,0,0,0),e}return new Date(Number(t[1]),Number(t[2])-1,Number(t[3]))},jn=e=>e===kn(),Mn=(e,t)=>{let n=An(e);return n.setDate(n.getDate()+t),kn(n)},Nn=(e,t=Date.now())=>{let n=new Date(t);return e===`week`?n.setDate(n.getDate()-(n.getDay()+6)%7):n.setDate(1),n.setHours(0,0,0,0),n.getTime()},Pn=[`costToday`,`feedRevenue`,`saving`,`wear`];function Fn(e){let{feedRevenue:t,saving:n,costToday:r,wear:i}=e;if(t!==void 0&&n!==void 0&&r!==void 0&&i!==void 0)return t+n-r-i}function In(e){let t=e.start;if(typeof t==`number`&&Number.isFinite(t))return t>0xe8d4a51000?t:t*1e3;if(typeof t==`string`){let e=Date.parse(t);return Number.isFinite(e)?e:void 0}}function Ln(e){let t=new Map;for(let n of e??[]){let e=In(n);e!==void 0&&typeof n.change==`number`&&Number.isFinite(n.change)&&t.set(kn(new Date(e)),n.change)}return t}function Rn(e,t,n=Date.now()){let r=Object.fromEntries(Pn.map(t=>[t,Ln(e[I[t]])])),i=Nn(t,n),a=kn(new Date(n)),o=[],s=new Date(i);for(;kn(s)<=a;){let e=kn(s),t={costToday:r.costToday.get(e),feedRevenue:r.feedRevenue.get(e),saving:r.saving.get(e),wear:r.wear.get(e)};o.push({day:e,ts:s.getTime(),...t,balance:Fn(t)}),s.setDate(s.getDate()+1)}return o}async function zn(e,t,n,r){return e.callWS({type:`recorder/statistics_during_period`,start_time:new Date(t).toISOString(),end_time:new Date(n).toISOString(),statistic_ids:r.map(e=>I[e]),period:`day`,types:[`change`]})}async function Bn(e,t,n){let r=await zn(e,t,n,On),i={};for(let e of On){let t=Dn(r[I[e]]);t!==void 0&&(i[e]=t)}return i.costToday!==void 0&&i.feedRevenue!==void 0&&(i.costNet=i.costToday-i.feedRevenue),i}async function Vn(e,t){let n=Date.now();return Rn(await zn(e,Nn(t,n),n,Pn),t,n)}async function Hn(e,t){return Bn(e,Nn(t),Date.now())}async function Un(e,t){let n=An(t),r=new Date(n);return r.setDate(r.getDate()+1),Bn(e,n.getTime(),r.getTime())}async function Wn(e){let t=await wn(e,En.map(e=>I[e]),Tn(),{minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),n={};for(let e of En)n[e]=Sn(xn(bn(t[I[e]])),18e5,`last`);return n}var Gn=864e5,Kn={minimal_response:!0,no_attributes:!0,significant_changes_only:!1},qn=(e,t,n)=>{let r=e.states[t]?.attributes.unit_of_measurement===`kW`?1e3:1;return Sn(xn(bn(n)).map(([e,t])=>[e,t*r]),3e5,`mean`)};async function Jn(e,t,n=1){return Sn(xn(bn((await wn(e,[t],Date.now()-Gn,Kn))[t])).map(([e,t])=>[e,t*n]),3e5,`mean`)}async function Yn(e,t){let n=[...new Set(t)],r={};if(!n.length)return r;let i=await wn(e,n,Date.now()-Gn,Kn);for(let t of n)r[t]=qn(e,t,i[t]);return r}async function Xn(e,t=6){let n=await wn(e,[I.pv,I.house,I.soc],Date.now()-t*36e5,{minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),r=e=>Sn(xn(bn(n[e])),3e5,`mean`);return{pv:r(I.pv),house:r(I.house),soc:r(I.soc)}}async function Zn(e){let t=await wn(e,[I.lastAction],Date.now()-864e5,{minimal_response:!1,no_attributes:!1,significant_changes_only:!0}),n=e.states[I.lastAction]?.attributes.history;return Cn(bn(t[I.lastAction]),n)}var Qn={dark:{text:`#e8edf7`,muted:`#8b96ad`,faint:`#5a6580`,bg:`#070b14`,grid:`rgba(255,255,255,0.06)`,series:`#ffffff`,track:`rgba(255,255,255,0.06)`,mode:`dark`},classic:{text:`#152033`,muted:`#5b6b80`,faint:`#8b97a8`,bg:`#eef2f6`,grid:`rgba(21,32,51,0.08)`,series:`#152033`,track:`rgba(21,32,51,0.08)`,mode:`light`},e3dc:{text:`#4a4a4a`,muted:`#6e767c`,faint:`#a4aaae`,bg:`#f7f7f7`,grid:`rgba(30,37,43,0.08)`,series:`#4a4a4a`,track:`rgba(30,37,43,0.08)`,mode:`light`}},$n=Qn.dark;function er(e){$n=Qn[e]}var V={pv:`#fbbf24`,house:`#a78bfa`,gridIn:`#f87171`,gridOut:`#34d399`,bat:`#22d3ee`,accent:`#38bdf8`,accent2:`#818cf8`,get text(){return $n.text},get muted(){return $n.muted},get faint(){return $n.faint},get bg(){return $n.bg},get grid(){return $n.grid},get series(){return $n.series},get track(){return $n.track},get mode(){return $n.mode}},tr={charge:V.gridOut,hold:V.pv,release:V.bat},nr=()=>({chart:{background:`transparent`,foreColor:V.muted,fontFamily:`Inter, system-ui, sans-serif`,toolbar:{show:!1},animations:{enabled:!1}},theme:{mode:V.mode},grid:{borderColor:V.grid,strokeDashArray:4},dataLabels:{enabled:!1},legend:{show:!1},tooltip:{theme:V.mode}}),rr=e=>!!e&&typeof e==`object`&&!Array.isArray(e),ir=(e,t)=>{let n={...e};for(let[e,r]of Object.entries(t))n[e]=rr(r)&&rr(n[e])?ir(n[e],r):r;return n},ar=e=>ir(nr(),e),or=e=>({x:Date.now(),borderColor:V.text,opacity:.6,label:{text:e,orientation:`horizontal`,borderWidth:0,style:{background:V.text,color:V.bg,fontWeight:700}}});function sr(e){if(!Array.isArray(e)||e.length!==12)return;let t=e.map(e=>typeof e==`number`&&Number.isFinite(e)?e:NaN);return t.some(e=>Number.isNaN(e))?void 0:t}function cr(e,t,n,r,i){let a=Array.from({length:12},(t,n)=>new Intl.DateTimeFormat(e||`de`,{month:`short`}).format(new Date(2024,n,1)));return ar({chart:{type:`line`,height:260},series:[{name:r,type:`area`,data:t},{name:i,type:`line`,data:n}],colors:[V.bat,V.gridIn],stroke:{curve:`smooth`,width:[2.5,1.5]},fill:{type:[`gradient`,`solid`],gradient:{shadeIntensity:.2,opacityFrom:.45,opacityTo:.02,stops:[0,100]}},xaxis:{categories:a,axisBorder:{show:!1},axisTicks:{show:!1}},yaxis:{min:0,title:{text:`kWh`},labels:{formatter:e=>String(Math.round(e))}}})}var lr=(e={})=>({type:`datetime`,labels:{datetimeUTC:!1,format:`HH:mm`},axisBorder:{show:!1},axisTicks:{show:!1},...e});function ur({traj:e,targetSoc:t,planSoc:n,ist:r,showIst:i,fmt:a,i18n:o}){let{imp:s,exp:c}=fn(e.grid_points),l=!!n&&n.length>=2,u=l?n:e.trajectory_points,d=l?o.t(`legendPlanSoc`):o.t(`legendSoc`),f=pn(e.trajectory_phases,e.trajectory_points).map(e=>{let t={x:e.x,x2:e.x2,fillColor:V.accent,opacity:.05};return e.x2-e.x>=18e5&&(t.label={text:o.phase(e.phase),borderWidth:0,orientation:`vertical`,position:`top`,offsetX:10,offsetY:10,style:{background:`transparent`,color:V.muted,fontSize:`11px`}}),t}),p=[{name:o.t(`legendPv`),type:`area`,data:an(e.pv_points)},{name:o.t(`legendHouse`),type:`line`,data:an(e.house_points)},{name:o.t(`legendImport`),type:`area`,data:s},{name:o.t(`legendFeed`),type:`area`,data:c},{name:d,type:`line`,data:u}],m=[V.pv,V.house,V.gridIn,V.gridOut,V.bat],h=[2,2,1.5,1.5,3.5],g=[0,4,0,0,0],_=[`gradient`,`solid`,`gradient`,`gradient`,`solid`],v=[{seriesName:o.t(`legendPv`),min:0,title:{text:`kW`},labels:{formatter:e=>a.n(e,1)}},{seriesName:o.t(`legendPv`),show:!1},{seriesName:o.t(`legendPv`),show:!1},{seriesName:o.t(`legendPv`),show:!1},{seriesName:d,opposite:!0,min:0,max:100,tickAmount:5,title:{text:`SoC %`},labels:{formatter:e=>`${Math.round(e)}%`}}],y=-1;return i&&r&&(r.pv.length>1||r.house.length>1)&&(y=p.length,p.push({name:`${o.t(`legendPv`)} ${o.t(`legendActual`)}`,type:`line`,data:an(r.pv)},{name:`${o.t(`legendHouse`)} ${o.t(`legendActual`)}`,type:`line`,data:an(r.house)},{name:`${o.t(`legendSoc`)} ${o.t(`legendActual`)}`,type:`line`,data:r.soc}),m.push(V.pv,V.house,V.bat),h.push(1.5,1.5,1.5),g.push(0,0,0),_.push(`solid`,`solid`,`solid`),v.push({seriesName:o.t(`legendPv`),show:!1},{seriesName:o.t(`legendPv`),show:!1},{seriesName:d,opposite:!0,min:0,max:100,show:!1})),ar({chart:{id:`fc`,type:`line`,height:420,zoom:{enabled:!0,type:`x`},toolbar:{show:!1,autoSelected:`zoom`}},grid:{padding:{top:t!==void 0&&t>=90?28:8}},series:p,colors:m,stroke:{width:h,curve:`smooth`,dashArray:g},fill:{type:_,gradient:{opacityFrom:.45,opacityTo:.02},opacity:p.map((e,t)=>y>=0&&t>=y?.55:1)},xaxis:lr({tooltip:{enabled:!1}}),yaxis:v,tooltip:{shared:!0,intersect:!1,x:{format:`HH:mm`},y:{formatter:(e,t)=>e==null?`–`:t?.seriesIndex===4||y>=0&&t?.seriesIndex===y+2?`${a.n(e)} %`:`${a.n(e,2)} kW`}},markers:{size:0,hover:{size:5}},annotations:{xaxis:[...f,or(o.t(`now`))],yaxis:t===void 0?[]:[{y:t,yAxisIndex:4,borderColor:V.accent2,strokeDashArray:6,label:{text:o.t(`targetLabel`,{v:Math.round(t)}),position:`right`,textAnchor:`end`,offsetX:-8,offsetY:-16,borderWidth:0,style:{background:`rgba(7,11,20,.85)`,color:`#c7d2fe`,fontSize:`12px`,padding:{left:6,right:6,top:3,bottom:3}}}}]}})}function dr(e){let t=e.trajectory_points[0][0],n=e.trajectory_points[e.trajectory_points.length-1][0];return ar({chart:{id:`fc-brush`,type:`area`,height:90,brush:{enabled:!0,target:`fc`},selection:{enabled:!0,xaxis:{min:t,max:n},fill:{color:V.accent,opacity:.12},stroke:{color:V.accent}}},series:[{name:`PV`,data:an(e.pv_points)},{name:`House`,data:an(e.house_points)}],colors:[V.pv,V.house],stroke:{width:1.5,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.35,opacityTo:0}},xaxis:lr(),yaxis:{show:!1,min:0},grid:{show:!1},tooltip:{enabled:!1}})}function fr({slots:e,fmt:t,i18n:n}){let r=_n(e),i=e=>Date.parse(e.start),a=e=>{let r=mn(e);return r===`charge`?n.t(`slotCharge`,{kwh:t.n(e.grid_charge_kwh,2)}):r===`hold`?n.t(`slotHold`):n.t(`slotRelease`)},o=(e,t)=>`<div style="display:flex;justify-content:space-between;gap:16px;color:${V.muted}"><span>${e}</span><b style="color:${V.text}">${t}</b></div>`;return ar({chart:{type:`line`,height:360,zoom:{enabled:!0,type:`x`},toolbar:{show:!1,autoSelected:`zoom`}},series:[{name:n.t(`slotPrice`),type:`column`,data:r.map(e=>({x:i(e),y:+(e.price*100).toFixed(1),fillColor:tr[mn(e)]}))},{name:n.t(`legendPlanSoc`),type:`line`,data:r.map(e=>({x:i(e),y:e.soc_pct}))}],colors:[V.bat,V.series],stroke:{width:[0,2.5],curve:`stepline`},plotOptions:{bar:{columnWidth:`78%`,borderRadius:4,borderRadiusApplication:`end`}},fill:{opacity:[.85,1]},xaxis:lr(),yaxis:[{title:{text:`ct/kWh`},labels:{formatter:e=>t.n(e,0)}},{opposite:!0,min:0,max:100,title:{text:`SoC %`},labels:{formatter:e=>`${Math.round(e)}%`}}],tooltip:{shared:!0,intersect:!1,custom:({dataPointIndex:e})=>{let i=r[e];return i?`<div style="padding:12px 14px;min-width:190px">
          <div style="font-weight:700;margin-bottom:8px">${t.dayTime(i.start)}</div>
          ${o(n.t(`slotPrice`),`${t.n(i.price*100)} ct`)}
          ${o(n.t(`slotSoc`),`${t.n(i.soc_pct)} %`)}
          ${o(n.t(`slotConsumption`),`${t.n(i.consumption_kwh,2)} kWh`)}
          <div style="margin-top:8px;color:${tr[mn(i)]};font-weight:600">${a(i)}</div></div>`:``}},annotations:{xaxis:[or(n.t(`now`))]}})}function pr(e,t){let n=e=>Math.min(1,Math.max(0,e/100)),r=n(e),i=t===void 0?void 0:n(t),a=e=>`${+(e*270).toFixed(2)}deg`,o=[],s=(e,t,n)=>{n-t<.001||o.push(`${e} ${a(t)}`,`${e} ${a(n)}`)},c=i===void 0?0:Math.min(r,i);i!==void 0&&i>0&&(s(`var(--warn)`,0,c),s(`color-mix(in srgb, var(--warn) 40%, transparent)`,c,i));let l=i===void 0?0:c;return r>l&&o.push(`var(--bat) ${a(l)}`,`color-mix(in srgb, var(--bat) 55%, white) ${a(r)}`),s(`var(--switch-track)`,Math.max(r,i??0),1),o.push(`transparent ${a(1)}`,`transparent 360deg`),`conic-gradient(from 225deg, ${o.join(`, `)})`}function mr(e,t){return ar({chart:{type:`line`,height:220},series:e.map(e=>({name:e.name,data:an(e.points)})),colors:[V.accent,V.house,V.pv],stroke:{width:2,curve:`smooth`},legend:{show:!1},xaxis:lr(),yaxis:{decimalsInFloat:1,title:{text:`kW`},labels:{formatter:e=>t.n(e,1)}},tooltip:{shared:!0,intersect:!1,x:{format:`dd.MM. HH:mm`},y:{formatter:e=>`${t.n(e,2)} kW`}}})}function hr(e,t,n){return ar({chart:{type:`area`,height:280},series:[{data:an(e)}],colors:[t],stroke:{width:2,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.32,opacityTo:.02}},xaxis:lr(),yaxis:{decimalsInFloat:1,title:{text:`kW`},labels:{formatter:e=>n.n(e,1)}},tooltip:{x:{format:`dd.MM. HH:mm`},y:{formatter:e=>`${n.n(e,2)} kW`}}})}function gr(e,t){return ar({chart:{type:`area`,height:56,sparkline:{enabled:!0}},series:[{data:e}],colors:[t],stroke:{width:2,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.35,opacityTo:0}},xaxis:{type:`datetime`},tooltip:{enabled:!1}})}var _r=(e,t)=>e>=0?t?`#6ee7b7`:V.gridOut:t?`#fca5a5`:V.gridIn;function vr({days:e,fmt:t,i18n:n,onDay:r}){let i=kn(),a=(e,t)=>`<div style="display:flex;justify-content:space-between;gap:16px;color:${V.muted}"><span>${e}</span><b style="color:${V.text}">${t}</b></div>`,o=0,s=e.map(e=>{let t=e.day===i;return{x:e.ts,y:e.balance===void 0?null:+e.balance.toFixed(2),fillColor:e.balance===void 0?V.faint:_r(e.balance,t)}}),c=e.map(e=>(e.balance!==void 0&&(o+=e.balance),{x:e.ts,y:+o.toFixed(2)})),l=e.find(e=>e.day===i)?.ts;return ar({chart:{type:`line`,height:240,animations:{enabled:!0,speed:520,animateGradually:{enabled:!0,delay:28},dynamicAnimation:{enabled:!1}},events:{click:(t,n,i)=>{let a=i.dataPointIndex;if(a===void 0||a<0||(i.seriesIndex??0)>0)return;let o=e[a];o&&r?.(o.day)}}},series:[{name:n.t(`kpiBalance`),type:`column`,data:s},{name:n.t(`pulseCumulative`),type:`line`,data:c}],colors:[V.gridOut,V.accent],stroke:{width:[0,2.4],curve:[`smooth`,`stepline`]},plotOptions:{bar:{columnWidth:e.length>14?`58%`:`68%`,borderRadius:5,borderRadiusApplication:`around`,borderRadiusWhenStacked:`all`}},fill:{opacity:[.92,1]},xaxis:{type:`datetime`,labels:{datetimeUTC:!1,format:e.length>14?`dd.`:`ddd dd.`},axisBorder:{show:!1},axisTicks:{show:!1}},yaxis:{decimalsInFloat:1,labels:{formatter:e=>t.n(e,0)},title:{text:`€`}},annotations:{yaxis:[{y:0,borderColor:V.muted,strokeDashArray:0,opacity:.45}],...l===void 0?{}:{xaxis:[{x:l,borderColor:V.accent,opacity:.35,label:{text:n.t(`periodToday`),borderWidth:0,style:{background:`transparent`,color:V.accent,fontSize:`11px`,fontWeight:700}}}]}},tooltip:{shared:!0,intersect:!1,custom:({dataPointIndex:r})=>{let i=e[r];return i?`<div style="padding:12px 14px;min-width:200px">
          <div style="font-weight:700;margin-bottom:8px">${t.day(i.ts)}</div>
          ${a(n.t(`kpiBalance`),`${t.n(i.balance,2)} €`)}
          ${a(n.t(`kpiRevenue`),`${t.n(i.feedRevenue,2)} €`)}
          ${a(n.t(`kpiSaving`,{when:``}).trim(),`${t.n(i.saving,2)} €`)}
          ${a(n.t(`kpiCostGross`),`${t.n(i.costToday,2)} €`)}
          ${a(n.t(`kpiWear`),`${t.n(i.wear,2)} €`)}
          <div style="margin-top:8px;color:${V.muted};font-size:11px">${n.t(`pulseClickDay`)}</div>
        </div>`:``}}})}var yr=`e3dc-maestro.consumer-places.v1`;function br(e){if(!e||typeof e!=`object`)return{};let t={};for(let[n,r]of Object.entries(e)){if(!n||!r||typeof r!=`object`)continue;let e=r,i=typeof e.t==`number`&&Number.isFinite(e.t)?Math.min(1,Math.max(0,e.t)):void 0,a=typeof e.r==`number`&&Number.isFinite(e.r)?Math.min(1.35,Math.max(.75,e.r)):1;i!==void 0&&(t[n]={t:i,r:a})}return t}function xr(){try{return br(JSON.parse(localStorage.getItem(yr)??`null`))}catch{return{}}}function Sr(e){try{localStorage.setItem(yr,JSON.stringify(e))}catch{}}function Cr(){try{localStorage.removeItem(yr)}catch{}}function wr(e,t){return t<=1?.5:e/(t-1)}function Tr(e,t,n){let r=Math.min(1,Math.max(0,e)),i=n.radius*Math.min(1.35,Math.max(.75,t)),a=n.startAngle+r*(n.endAngle-n.startAngle);return{x:n.origin.x+Math.cos(a)*i,y:n.origin.y+Math.sin(a)*i}}function Er(e,t,n){let r=e-n.origin.x,i=t-n.origin.y,a=Math.atan2(i,r),o=n.startAngle,s=n.endAngle,c=Math.min(o,s),l=Math.max(o,s);a<c&&(a=c),a>l&&(a=l);let u=s-o||1,d=Math.min(1,Math.max(0,(a-o)/u)),f=Math.hypot(r,i),p=n.radius>0?f/n.radius:1;return{t:d,r:Math.min(1.35,Math.max(.75,p))}}function Dr(e,t){return{origin:e,radius:112+Math.min(t,6)*8,startAngle:-.95,endAngle:.95}}function Or(e,t,n){return e.map((r,i)=>{let a=t[r],o=Tr(a?.t??wr(i,e.length),a?.r??1,n);return{x:o.x,y:o.y,labelSide:`right`,labelDy:0}})}function kr(e){return e?200:0}function Ar(e,t,n){let r=Tr(0,1.35,t).y-36,i=Tr(1,1.35,t).y+36,a=r>=0?e+(e-r)+24:i+24;return Math.max(n,Math.ceil(i+24),Math.ceil(a))}function jr(e,t,n){let r=e.getScreenCTM();if(!r)return;let i=e.createSVGPoint();i.x=t,i.y=n;let a=i.matrixTransform(r.inverse());return{x:a.x,y:a.y}}function Mr(e,t,n,r,i){if(!r||!i)return;let a=e.currentTarget;if(!(a instanceof SVGElement))return;let o=a.ownerSVGElement;if(!o)return;e.preventDefault(),e.stopPropagation(),a.setPointerCapture(e.pointerId);let s=e=>{let r=jr(o,e.clientX,e.clientY);r&&i(t,Er(r.x,r.y,n))},c=e=>{try{a.releasePointerCapture(e.pointerId)}catch{}window.removeEventListener(`pointermove`,s),window.removeEventListener(`pointerup`,c)};window.addEventListener(`pointermove`,s),window.addEventListener(`pointerup`,c),s(e)}var Nr=`data:image/png;base64,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`,Pr={pv:`M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z`,grid:`M12 2 7 22M12 2l5 20M5 9h14M4 15h16`,house:`M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6`,bat:`M7 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM10 3h4`},Fr=24,Ir=2.15;function Lr(e){let t=e*2;return(t-Math.max(3,t*.05)*2)/Fr}var Rr=1.08;function zr(e){return(Rr+Lr(e))/2}function Br(e,t,n){let r=Fr/2*n;return`translate(${e-r} ${t-r}) scale(${n})`}var Vr={x:6.6,y:7.6,w:10.8,h:10.8};function Hr(e){if(typeof e!=`number`||!Number.isFinite(e)||e<=0)return;let t=Math.min(100,e)/100,n=Vr.h*t;return{x:Vr.x,y:Vr.y+Vr.h-n,width:Vr.w,height:n}}var Ur={wide:{box:[600,420],hub:{x:300,y:215},pv:{x:300,y:100,labelDy:-72},grid:{x:90,y:215,labelDy:70},house:{x:510,y:215,labelDy:70},bat:{x:300,y:320,labelDy:70}},compact:{box:[360,520],hub:{x:180,y:250},pv:{x:180,y:95,labelDy:-72},grid:{x:62,y:250,labelDy:70},house:{x:298,y:250,labelDy:70},bat:{x:180,y:405,labelDy:70}}},Wr=30,Gr=42,Kr=26,qr=46,Jr=16;function Yr(e,t,n,r){let i=t.x-e.x,a=t.y-e.y,o=Math.hypot(i,a)||1,s=Math.min(n,o/2),c=Math.min(r,o/2);return{x1:e.x+i/o*s,y1:e.y+a/o*s,x2:t.x-i/o*c,y2:t.y-a/o*c}}function Xr(e,t,n,r){let i=Yr(e,t,n,r);return`M${i.x1} ${i.y1} L${i.x2} ${i.y2}`}var Zr=.22,Qr=6e3;function $r(e){let t=Math.abs(e);return t<Wr?0:t<600?2:t<2e3?3:t<4500?4:5}function ei(e){return Zr+Math.min(Math.abs(e),Qr)/Qr*1.1300000000000001}function ti(e,t){let n=t/1e3;for(let t of e){let e=Number(t.getAttribute(`data-x1`)),r=Number(t.getAttribute(`data-y1`)),i=Number(t.getAttribute(`data-x2`)),a=Number(t.getAttribute(`data-y2`)),o=Number(t.getAttribute(`data-speed`)),s=Number(t.getAttribute(`data-phase`));if(!Number.isFinite(o))continue;let c=((n*o+s)%1+1)%1,l=Math.sin(c*Math.PI),u=e+(i-e)*c,d=r+(a-r)*c;t.setAttribute(`transform`,`translate(${u.toFixed(1)} ${d.toFixed(1)})`),t.setAttribute(`opacity`,(.2+.8*l).toFixed(3))}}var ni=(e,t=16)=>e.length<=t?e:`${e.slice(0,t-1)}…`;function ri(e,t){let n=Hr(e);return N`<clipPath id="batbody"><rect x=${Vr.x} y=${Vr.y} width=${Vr.w} height=${Vr.h} rx="1.3"/></clipPath>
    ${n?N`<rect clip-path="url(#batbody)" x=${n.x} y=${n.y} width=${n.width} height=${n.height+1} fill=${t} stroke="none" opacity="0.78"/>`:N``}
    <path d=${Pr.bat} vector-effect="non-scaling-stroke"/>`}var ii={"var(--pv)":`#9a3412`,"var(--house)":`#5b21b6`,"var(--grid-in)":`#b91c1c`,"var(--grid-out)":`#047857`,"var(--bat)":`#0e7490`,"var(--accent)":`#075985`},ai=(e,t)=>t?ii[e]??`#152033`:e;function oi(e,t,n,r,i,a,o){let s=o?$r(i):0;if(!s)return N``;let c=Yr(e,t,n,r),l=ei(i).toFixed(3);return N`${Array.from({length:s},(e,t)=>N`<g class="electron" fill=${a} data-x1=${c.x1} data-y1=${c.y1} data-x2=${c.x2} data-y2=${c.y2} data-speed=${l} data-phase=${t/s}><circle class="halo" r="3.4"/><circle r="1.5"/><circle r="0.75" fill="#fff"/></g>`)}`}function si(e,t){let n=Ur.compact.bat.y+Ur.compact.bat.labelDy+52;return Array.from({length:e},(e,r)=>({x:t-40,y:n+r*qr,labelDy:5}))}function ci(e){if(!e)return Ur.compact.box[1];let t=si(e,Ur.compact.box[0]).at(-1);return t.y+t.labelDy+36}function li(e,t){if(!t)return;if(e)return Math.round(ci(t)*.94);let n=Dr(Ur.wide.house,t),r=Ar(Ur.wide.house.y,n,Ur.wide.box[1]);return Math.round(380*r/420)}function ui(e,t,n,r,i=0){if(!e.length)return N``;let a=n-14,o=Math.max(...e.map(({p:e})=>e.y));return N`<path class="flow-line" d="M${t.x+i} ${t.y} L${a} ${t.y} L${a} ${o}" stroke="var(--house)"/>
    ${e.map(({c:e,p:t})=>{let n=e.mode===`included`?`var(--house)`:`var(--accent)`,i=Yr({x:a,y:t.y},t,0,Jr);return N`<path class="flow-line" d="M${a} ${t.y} L${i.x2} ${t.y}" stroke=${n}/>
        ${oi({x:a,y:t.y},t,0,Jr,e.watts,n,r)}`})}`}function di(e){let t=(e.consumers??[]).slice(0,6),n=e.compact?Ur.compact:Ur.wide,r=Dr(n.house,t.length),i=n.box[0]+(e.compact?0:kr(t.length)),a=e.compact?ci(t.length):Ar(n.house.y,r,n.box[1]),o=e.compact?si(t.length,i):[],s=e.compact?[]:Or(t.map(e=>e.id),e.consumerPlaces??{},r),c=t=>e.compact?o[t]:{x:s[t].x,y:s[t].y,labelDy:0},{pv:l=0,house:u=0,grid:d=0,battery:f=0}=e,p=e.motion!==!1,m=e.outline===!0,h=e=>ai(e,m),g=e.i18n.t,_={pv:{color:`var(--pv)`,label:g(`nodePv`),value:l,icon:Pr.pv},grid:{color:d<0?`var(--grid-in)`:`var(--grid-out)`,label:g(d<0?`nodeImport`:`nodeFeed`),value:d,icon:Pr.grid},house:{color:`var(--house)`,label:g(`nodeHouse`),value:u,icon:Pr.house},bat:{color:`var(--bat)`,label:g(f<0?`nodeBatDischarge`:`nodeBatCharge`),value:f,icon:Pr.bat}},v=[];l>Wr&&v.push({node:`pv`,toHub:!0}),f<-30&&v.push({node:`bat`,toHub:!0}),f>Wr&&v.push({node:`bat`,toHub:!1}),d<-30&&v.push({node:`grid`,toHub:!0}),d>Wr&&v.push({node:`grid`,toHub:!1}),u>Wr&&v.push({node:`house`,toHub:!1});let y=e.compact?Jr:Kr,b=[`pv`,`grid`,`house`,`bat`],x=t.map((e,t)=>({c:e,p:c(t)}));return N`<svg viewBox="0 0 ${i} ${a}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${[...b.map(t=>`${_[t].label} ${e.fmt.w(_[t].value)}`),...x.map(({c:t})=>`${t.name} ${e.fmt.w(t.watts)}`)].join(`, `)}>
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="hubg"><stop offset="0" stop-color="rgba(56,189,248,.5)"/><stop offset="1" stop-color="rgba(56,189,248,0)"/></radialGradient>
    </defs>
    ${b.map(e=>N`<path class="flow-line" d=${Xr(n[e],n.hub,Gr,y)} stroke=${_[e].color}/>`)}
    ${e.compact?ui(x,n.house,i,p,Gr):x.map(({c:e,p:t})=>{let r=e.mode===`included`?n.house:n.hub,i=e.mode===`included`?Gr:y,a=e.mode===`included`?`var(--house)`:`var(--accent)`;return N`<path class="flow-line" d=${Xr(r,t,i,Kr)} stroke=${a}/>
        ${oi(r,t,i,Kr,e.watts,a,p)}`})}
    ${v.map(e=>oi(e.toHub?n[e.node]:n.hub,e.toHub?n.hub:n[e.node],e.toHub?Gr:y,e.toHub?y:Gr,_[e.node].value,_[e.node].color,p))}
    <image href=${Nr} x=${n.hub.x-y} y=${n.hub.y-y} width=${y*2} height=${y*2} aria-label="Maestro"/>
    ${b.map(t=>{let r=_[t],i=n[t],a=Math.abs(r.value)<Wr,o=i.labelDy<0;return N`<g class="flow-node" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${r.label} @click=${()=>e.onSelect?.(t)} @keydown=${n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),e.onSelect?.(t))}}>
        <circle cx=${i.x} cy=${i.y} r="42" fill=${m?`none`:`rgba(10,16,30,.9)`} stroke=${h(r.color)} stroke-width=${m?`2.4`:`2`} filter=${a||m?`none`:`url(#glow)`}/>
        <g transform=${Br(i.x,i.y,zr(Gr))} fill="none" stroke=${h(r.color)} stroke-width=${Ir} stroke-linecap="round" stroke-linejoin="round">
          ${t===`bat`?ri(e.soc,h(r.color)):N`<path d=${r.icon} vector-effect="non-scaling-stroke"/>`}
        </g>
        <text class="node-val" x=${i.x} y=${i.y+i.labelDy} text-anchor="middle">${e.fmt.w(r.value)}</text>
        <text class="node-lbl" x=${i.x} y=${i.y+i.labelDy+(o?19:18)} text-anchor="middle">${r.label}</text>
      </g>`})}
    ${x.map(({c:t,p:n})=>{let i=h(t.mode===`included`?`var(--house)`:`var(--accent)`),a=t.missing||Math.abs(t.watts)<Wr,o=()=>{e.arrange||e.onSelect?.(t.id)},s=e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),o())};return e.compact?N`<g class="flow-node" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${t.name} @click=${o} @keydown=${s}>
          <circle cx=${n.x} cy=${n.y} r=${Jr} fill=${m?`none`:`rgba(10,16,30,.9)`} stroke=${i} stroke-width=${m?`2.2`:`2`}/>
          <g transform=${Br(n.x,n.y,Lr(Jr))} fill="none" stroke=${i} stroke-width=${Ir} stroke-linecap="round" stroke-linejoin="round"><path d=${ut[t.icon]} vector-effect="non-scaling-stroke"/></g>
          <text font-size="14" font-weight="700" fill="var(--text)" x=${n.x-26} y=${n.y+5} text-anchor="end">${e.fmt.w(t.watts)}  ${ni(t.name,24)}</text>
        </g>`:N`<g class="flow-node ${e.arrange?`arrange`:``}" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${t.name} @click=${o} @keydown=${s} @pointerdown=${n=>Mr(n,t.id,r,e.arrange,e.onPlaceConsumer)}>
        <circle cx=${n.x} cy=${n.y} r="26" fill=${m?`none`:`rgba(10,16,30,.9)`} stroke=${i} stroke-width=${m?`2.4`:`2`} filter=${a||m?`none`:`url(#glow)`}/>
        <g transform=${Br(n.x,n.y,Lr(Kr))} fill="none" stroke=${i} stroke-width=${Ir} stroke-linecap="round" stroke-linejoin="round"><path d=${ut[t.icon]} vector-effect="non-scaling-stroke"/></g>
        <text class="node-val-sm" x=${n.x+34} y=${n.y-2} text-anchor="start">${e.fmt.w(t.watts)}</text>
        <text class="node-lbl-sm" x=${n.x+34} y=${n.y+14} text-anchor="start">${ni(t.name,18)}</text>
      </g>`})}
  </svg>`}var fi=e=>{let t=e||`de`,n=(e,n=1)=>e===void 0||!Number.isFinite(e)?`–`:e.toLocaleString(t,{minimumFractionDigits:n,maximumFractionDigits:n});return{loc:t,n,w:e=>e===void 0||!Number.isFinite(e)?`–`:Math.abs(e)>=1e3?`${n(Math.abs(e)/1e3,1)} kW`:`${Math.round(Math.abs(e))} W`,time:e=>new Date(e).toLocaleTimeString(t,{hour:`2-digit`,minute:`2-digit`}),dayTime:e=>new Date(e).toLocaleString(t,{weekday:`short`,hour:`2-digit`,minute:`2-digit`}),day:e=>new Date(e).toLocaleDateString(t,{weekday:`short`,day:`numeric`,month:`short`})}},pi=[`today`,`balance`,`balancePulse`,`plant-operation`,`plant-storage`,`plant-phases`,`plant-wallbox`],mi=`e3dc-maestro.groups.v3`,hi=`e3dc-maestro.groups.v2`,gi=[`today`,`balance`,`balancePulse`];function _i(e){return Array.isArray(e)?new Set(e.filter(e=>typeof e==`string`&&pi.includes(e))):new Set}function vi(e,t){if(e!==null)try{return _i(JSON.parse(e))}catch{return new Set(gi)}let n=new Set;if(t!==null)try{for(let e of _i(JSON.parse(t)))n.add(e)}catch{}for(let e of gi)n.add(e);return n}function yi(){try{return vi(localStorage.getItem(mi),localStorage.getItem(hi))}catch{return new Set(gi)}}var bi=`e3dc-maestro.live-controls`;function xi(){try{return localStorage.getItem(bi)===`1`}catch{return!1}}var Si=`e3dc-maestro.live-auto`;function Ci(){try{return localStorage.getItem(Si)===`1`}catch{return!1}}function wi(e){try{localStorage.setItem(Si,e?`1`:`0`)}catch{}}function Ti(e){try{localStorage.setItem(bi,e?`1`:`0`)}catch{}}function Ei(e){try{localStorage.setItem(mi,JSON.stringify([...e]))}catch{}}var Di=new Map;function Oi(e,t,n){let r=Di.get(e);if(r&&r.deps.length===t.length&&r.deps.every((e,n)=>Object.is(e,t[n])))return r.value;let i=n();return Di.set(e,{deps:t,value:i}),i}var ki={navHelp:`Hilfe`,helpTitle:`Hilfe`,helpSub:`Panel und Regelung`,helpSearch:`Suche in der Hilfe`,helpEmpty:`Dazu steht hier nichts. Versuch ein anderes Wort, zum Beispiel Reserve oder Preisplan.`,helpToc:`Inhalt`,helpTop:`Nach oben`,helpToToc:`Zum Inhalt`,helpActive:`Gerade aktiv: {rule}`,helpNoPhase:`Keine Phase gemeldet. Die Regelung ist aus oder der erste Lauf steht noch aus.`,helpOpenSettings:`In den Einstellungen öffnen`,helpOpenControls:`Steuerung öffnen`,helpChStart:`Schnellstart`,helpChLive:`Live`,helpChForecast:`Prognose`,helpChPlan:`Preisplan`,helpChDecision:`Entscheidung`,helpChPlant:`Anlage`,helpChSettings:`Einstellungen`,helpChControls:`Steuerung`,helpChRules:`Regellogik`,helpChConcepts:`Konzepte`,helpChTrouble:`Fragen und Antworten`,helpChGlossary:`Glossar`,helpStartLead:`Was Maestro tut`,helpStartLeadBody:`Maestro entscheidet in jedem Takt, ob der Hausakku lädt, entlädt oder wartet. Das Panel zeigt den Zustand und die Schalter. Die Entscheidung trifft die Integration, nicht die Ansicht.`,helpStartSteps:`Erste Schritte`,helpStartStepsBody:`Prüfe unter Einstellungen die Einrichtung: Sensoren, Regelung und, wenn du sie nutzt, die PV-Prognose.
Schalte die Regelung ein, im Menü Steuerung oder unter System.
Sieh auf Entscheidung nach, welche Regel gerade greift und warum.
Ändere eine Schwelle erst, wenn die Begründung dazu passt.`,helpSeeRules:`Zur Regellogik`,helpOpenSetup:`Einrichtung öffnen`,helpLiveBody:`Energiefluss. PV, Netz, Haus und Akku mit der Richtung des Stroms. Oben umschalten zwischen Knoten, Blob und Haus. Zusätzliche Verbraucher stehen im Fächer am Haus; mit Anordnen lassen sie sich verschieben. Wirkung: Ein Klick auf einen Knoten öffnet den Leistungsverlauf dieses Punktes. Ohne Recorder-Daten bleibt das Diagramm leer, der Live-Wert bleibt stehen.
Tageswerte unter dem Fluss. PV, Haus, Bezug und Einspeisung in kWh. Separat gemessene Verbraucher stehen darunter, sobald sie heute Energie haben. Wirkung: Ein Tippen öffnet die Gruppe Heute. Die Live-Leistung bleibt die Hauptzahl an den Knoten.
Kopfzeile. Restliche PV-Prognose heute, morgen und, wenn ein Sensor dafür gewählt ist, übermorgen. Die Pille zeigt, ob die Regelung an ist, und die aktuelle Phase. Wirkung: Das ist der Zustand des letzten Takts, kein Schalter.
Heute und Tagesbilanz. Starten zugeklappt. Der Zeitraum sitzt in der Heute-Zeile. Wirkung: Aufklappen zeigt die Summen. Es ändert die Regelung nicht.
Bilanzpuls darunter. Zugeklappt mit Mini-Verlauf, aufgeklappt Woche oder Monat als Tagesbalken plus kumulierte Linie. Wirkung: Ein Tippen auf einen Tag übernimmt ihn in die Tagesbilanz. Ohne Recorder-Daten bleibt die Gruppe leer.
Entladung und Reserve. Die Pillen erscheinen nur, wenn etwas an ist. Wirkung: Hier siehst du erzwungene Entladung und den Notstrom-Sockel, ohne die Seite zu wechseln.
Vorausschau und Schattenmodus stehen als Satz unter dem Fluss. Wirkung: Du erkennst, ob der Preisplan nur rechnet oder den Akku steuert.
Auto-Strategie. Schalter, Ziel und die prognostizierte Differenz zur bisherigen Einstellung. Wirkung: Die Zahl ist kein bereits gespartes Geld. Dieselben Felder liegen unter Einstellungen, Ziel.
Verbraucher im Fluss kommen aus der Steuerung. Ein Klick auf Bearbeiten öffnet sie.`,helpForecastBody:`Die Prognose zeigt, was Maestro für die nächsten Stunden erwartet: PV, Verbrauch und den geplanten Akkuverlauf. Den Ist-Verlauf kannst du einblenden. Ziehen im Diagramm zoomt, ein Live-Update setzt diesen Zoom nicht zurück.`,helpPlanBody:`Hier siehst du, wann der Preisplan Netzladung oder Halten vorsieht. Oben steht die Strategie: Aus, Zeitfenster, unter Preisschwelle, automatisch oder Experte.
Automatisch rechnet mit festen Werten für Wirkungsgrad, Mindestspanne und Sicherheitsfaktor. Experte nutzt deine Feinabstimmung. Ein Wechsel in den Plan startet im Schattenmodus. Der Akku folgt dem Plan erst, wenn „Preisplan steuert Akku“ an ist.
Dieselben Blöcke liegen auf dieser Seite unter Netzladung einstellen, anfangs zugeklappt.`,helpDecisionBody:`Die Seite nennt die aktuelle Phase, die Begründung in Klartext und den Verlauf der letzten Phasen. Die Regelungsleiter zeigt die Prüf-Reihenfolge. Die aktive Stufe ist markiert. Ein Klick darauf öffnet die passende Einstellungsgruppe.`,helpSeeLadder:`Alle Regeln im Einzelnen`,helpPlantBody:`Anlage zeigt, was der Wechselrichter meldet: Netz, Batterie, PV, Wallbox und die Steuerung am Gerät. Jeder Raum öffnet sich als eigene Ansicht. Ist die Notstromreserve an, liegt ihr Sockel gelb im Akku-Ring.`,helpSetIntro:`Überblick`,helpSetIntroBody:`Einstellungen sind nach der Aufgabe sortiert, nicht nach einzelnen Schaltern. Ein Bereich öffnet sich als eigene Seite, der Pfeil führt zurück zur Übersicht. Die Expertenansicht gilt nur für diesen Browser und blendet zusätzliche Blöcke ein.`,helpSetSetup:`Einrichtung`,helpSetSetupBody:`Die Checkliste nennt, was die Regelung zum Arbeiten braucht. Dieselben Punkte stehen auf Live, solange etwas fehlt. Ohne Prognose läuft die Regelung, nur ohne Vorausschau.`,helpSetPlant:`Anlage`,helpSetPlantBody:`Wechselrichterleistung. Nennleistung des Geräts in Watt. Wirkung: Maestro fordert keine Entladung an, die darüber liegt. Zu niedrig drosselt die Hausversorgung aus dem Akku. Zu hoch ändert am Gerät nichts, der Wechselrichter begrenzt selbst.
Installierte Modulleistung. Die kWp auf dem Dach. Wirkung: Schwachertrag und die Auslegung vergleichen den Tagesertrag damit. Ein falscher Wert stuft normale Tage als schwach ein oder übersieht echte Schwachtage.
Maximale Ladeleistung. Obergrenze für jedes Ladelimit, das Maestro schickt. Wirkung: Notladung, Preisplan, Netzladung im Slot und der Schnelllade-Boden gehen nicht darüber. Mehr PV lädt den Akku nicht schneller.
Minimale Ladeleistung. Unter diesem Wert startet Maestro keine Ladung. Wirkung: Liegt der rechnerische Bedarf darunter, sendet Maestro kein Limit. Dann gilt die eigene Logik des Wechselrichters, oft eine interne Untergrenze um 100 W. Die Zahl in der Einstellung bleibt. Sehr kleine Werte wirken nur, solange Maestro selbst ein Limit sendet.
Einspeisegrenze. Anteil der Wechselrichterleistung, der höchstens ins Netz darf. Wirkung: Darüber lädt die Regel Einspeisegrenze den Überschuss in den Akku. Zu niedrig hält Energie im Akku, obwohl du einspeisen willst. Zu hoch lässt mehr ins Netz, bevor Maestro gegensteuert.`,helpSetSafety:`Sicherheit`,helpSetSafetyBody:`Ladeschwelle. Unter diesem Ladestand lädt Maestro sofort mit maximaler Leistung aus dem Netz, vor fast jeder anderen Regel. 0 schaltet die Notladung aus, das ist der Standard. Wirkung: Der Akku fällt nicht weiter. Haus und Auto bekommen in dieser Phase keinen Strom aus dem Akku. Leg sie nicht aus Versehen hoch, sonst lädt Maestro oft aus dem Netz.
Notstromreserve fest. Ein fester Sockel ersetzt die saisonale Reserve. Wirkung: Darunter ist die Entladung gesperrt und Maestro lädt bis zum Sockel nach, bei Bedarf aus dem Netz. Eine gewollte Netzladung im günstigen Fenster darf darüber hinaus.
Notstromreserve saisonal. Der Sockel ist im Winter höher und im Sommer niedriger, mit Werten für Wintersonnenwende und Tag-und-Nacht-Gleiche. Wirkung: Dieselbe Sperre wie bei der festen Reserve, nur der Sockel wandert mit dem Jahr.
Reserve aus dem Verbrauch. Hebt den Sockel anhand der letzten Tage an. Wirkung: Nach verbrauchsstarken Tagen bleibt mehr im Akku. Die Entladung stoppt früher.
Harter Ladestand-Deckel. Schalter und Prozentwert. Wirkung: Darüber blockiert Maestro weiteres Laden, die Entladung bleibt frei. Netzladung und Preisplan stoppen an dieser Grenze. Der Abregelschutz darf sie ausnehmen, damit PV nicht abgeregelt wird.
Watchdog. Sekunden ohne Kontakt, nach denen der Wechselrichter die Limits verwirft. Wirkung: Hängt Home Assistant, fällt das Gerät auf seinen Eigenverbrauch zurück und bleibt nicht auf einem alten Ladebefehl stehen. Zu kurz löscht Limits bei kurzen Aussetzern.`,helpSetTariff:`Netz und Tarif`,helpSetTariffBody:`Netzladung-Strategie. Eine Auswahl statt vieler Einzelschalter. Aus: nie aus dem Netz, nur PV. Zeitfenster: lädt in Tarif-Slots der Klasse Niedrig bis zum Ziel, höchstens das Tagesbudget. Unter Preisschwelle: lädt, sobald der Preis höchstens die Schwelle ist. Automatisch: der Preisplan sucht die günstigsten Stunden, mit festem Wirkungsgrad 0,90, Mindestspanne 0,03 €/kWh und Sicherheitsfaktor 1,15, ohne Verschleiß. Experte: dieselben Rechnungen mit deinen Werten. Wirkung: Die Strategie entscheidet, ob und wann Netzstrom in den Akku darf. Ein Wechsel in den Plan startet im Schattenmodus.
Preisplan steuert Akku. Aus ist Schattenmodus: der Plan rechnet und ist auf der Seite Preisplan sichtbar, schickt aber keine Limits. An setzt Laden und Halten um. Wirkung: Erst dieser Schalter ändert den Akku.
Tagesbudget. Höchstens so viele kWh aus dem Netz an einem Tag. Wirkung: Danach stoppt die Netzladung, auch wenn der Preis noch günstig ist.
Preisschwelle. Bis zu diesem Preis gilt Strom als günstig. Wirkung: Nur die Strategie unter Preisschwelle liest sie. Automatisch und Experte vergleichen Stunden untereinander, nicht mit dieser Zahl.
Ziel im günstigen Fenster und SoC-Obergrenze des Plans. Bis hierhin wird geladen. Wirkung: Der Akku stoppt an dieser Grenze. Prognosebasiert macht das Ziel zur Obergrenze und lädt nur, was bis zur nächsten teuren Phase fehlt.
Entladung halten. Im günstigen Fenster ohne steuernden Preisplan bleibt der Akku stehen, sobald das Ziel erreicht ist. Wirkung: Kein Laden und Entladen im Minutentakt, solange der günstige Strom noch anliegt.
Feinabstimmung, nur bei Experte. Mindestspanne: unter dieser Preisdifferenz lohnt Netzladung nicht, der Plan lädt nicht. Wirkungsgrad: 0,9 heißt, ein Zehntel geht auf dem Umweg über den Akku verloren, der Plan verlangt eine größere Spanne. Sicherheitsfaktor: der Plan rechnet den Verbrauch höher, damit der Akku nicht leerläuft. Zu hoch lädt mehr aus dem Netz als nötig.
Hochtarif. Fenster mit Start, Ende, Samstag und Sonntag, plus Mindestreserve im Winter und zur Tag-und-Nacht-Gleiche. Ein Slot kann die Reserve überschreiben. Wirkung: Im Fenster deckt der Akku das Haus, bis die Reserve erreicht ist. Erst dann sperrt Maestro die Entladung. Oberhalb der Reserve läuft normaler Eigenverbrauch. Der Schutz legt keine Niedertarif-Fenster an.
Kosten und Auswertung. Bezugspreis, Einspeisevergütung, Akkopreis und Zyklen. Wirkung: Sie steuern nicht, wann geladen wird. Statistik, Erlös und, im Modus Experte, der Verschleiß des Preisplans lesen sie. Ein zu hoher Verschleiß lässt den Plan seltener aus dem Netz laden.
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
Limits löschen. Hebt Lade- und Entladegrenze am Wechselrichter sofort auf. Wirkung: Bis zum nächsten Takt gilt die Geräte-Logik. Die Einstellungen bleiben gespeichert.`,helpSetLook:`Darstellung`,helpSetLookBody:`Helligkeit und Farbstimmung des Cockpits. Darunter die Darstellung des Energieflusses: Knoten, Blob oder Haus. Die Wahl gilt nur in diesem Browser.`,helpSetClassic:`Classic-Dashboard`,helpSetClassicBody:`Legt die Lovelace-Ansicht E3DC Maestro an, inklusive Auto-Optimierung, Sizing und der klassischen Hilfe. Dafür müssen Mushroom Cards und ApexCharts Card installiert sein. Den Pfad e3dc-maestro nicht umbenennen.`,helpSetSizing:`Auslegung`,helpSetSizingBody:`Rechnet, wie sich ein größerer Akku oder mehr PV ausgewirkt hätte. Werte ohne eigene Entität, etwa angenommene Größe und Preise, trägst du hier ein.`,helpControlsBody:`Die Steuerung liegt unten in der Navigation und wirkt sofort: Regelung an oder aus, erzwungene Entladung, Leistung, Reserve und die Verbraucher. Alle Einstellungen führt in den Einstellungsbereich. Escape oder ein Klick daneben schließt das Menü.`,helpRulesHow:`So entscheidet Maestro`,helpRulesHowBody:`Maestro geht die Regeln von oben nach unten durch und nimmt die erste, deren Bedingung zutrifft. Die übrigen Regeln kommen in diesem Takt nicht dran. Ist die Regelung aus, passiert nichts anderes. Die erzwungene Entladung kommt direkt danach, noch vor Notladung und Einspeisegrenze.
Die Bänder gruppieren die Stufen nur zur Übersicht. Geprüft wird weiterhin jede Stufe einzeln, in der angezeigten Reihenfolge.`,helpRuleOff:`Der Hauptschalter ist aus. Maestro setzt keine Lade- oder Entladegrenze und gibt die Steuerung an das Gerät zurück.`,helpRuleForce:`Entladung erzwungen ist an. Der Akku entlädt mit der eingestellten Leistung bis zum höheren Wert aus Ladeschwelle und Reserve. Liegt der Stand schon darunter, pausiert die Entladung. Diese Regel steht über Notladung, Tarif und PV.`,helpRuleEmergency:`Der Ladestand liegt unter der Ladeschwelle. Maestro lädt mit der maximalen Ladeleistung, bevor Einspeisegrenze, Reserve oder Tarif geprüft werden.`,helpRuleFeed:`Die Einspeisung liegt über der eingestellten Grenze. Maestro lädt den Überschuss in den Akku. Die Phase bleibt kurz aktiv, auch wenn die Einspeisung danach knapp unter die Grenze fällt, damit sie nicht bei jedem Takt springt. Ist der Akku praktisch voll, setzt Maestro keine zusätzliche Ladeanforderung.`,helpRuleReserve:`Der Ladestand liegt unter der Notstromreserve, fest oder saisonal. Maestro sperrt die Entladung und lädt bis zur Reserve nach. Eine bewusst eingeschaltete Netzladung im günstigen Fenster darf diese Stufe überspringen, damit der Akku über die Reserve hinaus kommen kann.`,helpRuleEvcc:`EVCC lädt das Auto im Sofort-Modus. Maestro sperrt die Akku-Entladung, damit das Auto den Hausakku nicht leert. Die Ladung aus PV bleibt möglich.`,helpRulePrice:`Der Preisplan steuert den Akku und die Kurve ist frisch. In einer günstigen Stunde lädt Maestro bis zum Planziel, höchstens das Tagesbudget, und nicht über den harten Deckel. In einer teuren Stunde hält er die Entladung an, damit die Energie später mehr wert ist. Der Abregelschutz schaltet den Plan für diesen Takt aus. Im Schattenmodus rechnet der Plan nur und diese Stufe greift nicht.`,helpRuleHt:`Im Hochtarif-Fenster deckt der Akku das Haus, bis er die HT-Reserve erreicht. Erst dann sperrt Maestro die Entladung, damit für den Rest des Fensters ein Sockel bleibt. Die Reserve kommt aus dem Slot, aus dem Verbrauch oder aus der Jahreszeit.`,helpRuleHold:`Ein günstiges Tarif-Fenster ist aktiv, Entladung halten ist an, und der Preisplan steuert den Akku nicht. Maestro entlädt in diesem Fenster nicht, damit der günstige Strom im Akku bleibt.`,helpRuleMorning:`Vor dem PV-Ladestart senkt Maestro den Akku ab, damit der mittägliche Überschuss hineinpasst. Modus, Startstand und Leistung stellst du bei den Verbrauchern ein.`,helpRuleCap:`Bis zur eingestellten Stunde lädt Maestro nicht über die Morning-Cap. So bleibt vormittags Platz für die PV. An einem schwachen PV-Tag und wenn die Restprognose den Akku nicht füllt, weicht diese Stufe. Eine anstehende Netzladung im günstigen Fenster ebenfalls.`,helpRuleAstro:`Vor Sonnenaufgang plus Versatz startet Maestro die PV-Ladung nicht. Die Entladung für das Haus bleibt frei. Im Winter gilt zusätzlich die früheste Stunde. Eine anstehende Netzladung im günstigen Fenster überspringt diese Sperre.`,helpRuleHard:`Der harte Ladestand-Deckel ist erreicht. Maestro blockiert weiteres Laden, die Entladung bleibt frei. Der Abregelschutz ist ausgenommen, damit sonst abgeregelte PV noch in den Akku kann.`,helpRuleFloor:`Unter dem Schnelllade-Boden nimmt der Akku den vollen PV-Überschuss auf, ohne Korridor-Drossel. Eine anstehende Netzladung im günstigen Fenster und der Abregelschutz haben Vorrang.`,helpRuleLow:`Der Tag ist als schwach markiert oder die konservative Restprognose reicht nicht bis zum Ziel. Solange PV anliegt und der Ladeende-Stand nicht erreicht ist, nimmt der Akku den Überschuss auf. Die Ladeverteilung und die Morning-Cap weichen. Eine eingeschaltete Netzladung im günstigen Fenster hat Vorrang, sie ist genau für solche Tage gedacht.`,helpRuleGrid:`Im günstigen Tarif-Fenster lädt Maestro aktiv aus dem Netz, bis zum Ziel dieses Fensters und höchstens bis zum Tagesbudget. Das Ziel ist fest oder kommt aus der Prognose. Der Abregelschutz hat Vorrang.`,helpRuleCorridor:`Im Ladekorridor folgt der Akku dem Tagesziel. Reicht die Restprognose schon für das Ziel, verzögert Maestro die Ladung und lässt die Entladung für das Haus frei. Ein unterer Korridor kann die Ladung pausieren, wenn wenig Überschuss da ist. Bei aktiver Ladeverteilung gilt deren Rate.`,helpRuleSpread:`Die Ladeverteilung zieht die PV-Ladung über den Tag, statt den Akku am Vormittag vollzumachen. Sie ist aus, solange der Akku Vorrang hat, also an einem schwachen Tag oder bei zu knapper Restprognose. Ist das Verteilungsziel erreicht, blockiert Maestro weiteres Laden, der Überschuss geht ins Netz.`,helpRuleCurtail:`Der Abregelschutz ist aktiv, weil die PV sonst am Einspeiselimit verloren ginge. Maestro setzt eine Mindest-Ladeleistung, damit der Überschuss in den Akku geht. Diese Stufe steht bewusst hinter den übrigen PV-Regeln und gewinnt dort, wo andere Stufen ihretwegen ausweichen. Ist der Akku voll, bleibt die Anforderung aus.`,helpRuleIdle:`Keine vorherige Regel trifft zu. Maestro setzt keine eigene Grenze. Der Wechselrichter arbeitet in seinem normalen Eigenverbrauch.`,helpWhyGrid:`Warum lädt Maestro aus dem Netz?`,helpWhyGridBody:`Netzladung kommt von zwei Stufen, und nur von denen. Entweder steuert der Preisplan und die aktuelle Stunde ist günstig. Oder die Strategie lädt im günstigen Fenster und Budget sowie Zielstand lassen es zu. Notladung und das Nachladen der Reserve kommen aus dem Netz, wenn PV nicht reicht. Siehst du Netzbezug ohne eine dieser Phasen, liegt das an der Hauslast, nicht an einem Ladebefehl.`,helpConceptPlan:`Preisplan und günstige Fenster`,helpConceptPlanBody:`Der Preisplan sucht Stunden, in denen Laden und späteres Nutzen sich lohnt, und Stunden, in denen der Akku halten soll. Er braucht eine Preiskurve und eine frische Berechnung. Günstige Fenster ohne Plan sind die Tarif-Slots der Klasse Niedrig oder die Stunden unter der Preisschwelle. Die HT-Einstellungen legen nur Hochtarif-Fenster an, keine Niedertarif-Fenster.`,helpConceptPv:`Prognose und Korridor`,helpConceptPvBody:`Die PV-Prognose sagt, wie viel Energie bis zum Abend noch kommt. Davon hängt ab, ob Maestro sofort lädt, die Ladung verzögert oder dem Akku Vorrang gibt. Der Korridor ist das Tagesziel über die Stunden: nicht am Morgen schon voll, am Abend aber auf dem gewünschten Stand. Ohne Prognose entfällt die Vorausschau, die übrigen Regeln bleiben.`,helpConceptLow:`Schwacher PV-Tag`,helpConceptLowBody:`Liegt die Tagesprognose unter der Schwelle, merkt sich Maestro den Tag als schwach. Dann soll der Akku den Überschuss nehmen, statt ihn zu verteilen oder am Vormittag zu deckeln. Die Markierung löst sich, wenn die restliche Prognose den Bedarf bis zum Ladeende-Ziel deutlich deckt.`,helpConceptFeed:`Einspeisegrenze und Abregelung`,helpConceptFeedBody:`Die Einspeisegrenze reagiert, sobald messbar zu viel ins Netz fließt, und lädt genau diesen Überschuss. Der Abregelschutz wird früher aktiv, anhand der PV-Leistung, und hält eine Mindestladung, bevor der Wechselrichter die Anlage drosselt. Beide schonen die PV. Die Grenze ist die Reaktion, der Schutz die Vorsorge.`,helpConceptLoads:`Auto, Wärmepumpe, Morgen`,helpConceptLoadsBody:`EVCC Sofortladen ist eine eigene Stufe und stoppt die Entladung. Die Wallbox-Sperre gegen Netzbezug kommt nach der Entscheidung dazu und kann die Entladegrenze öffnen. Die Wärmepumpe schaltet Maestro nach Überschuss und Preis, unabhängig von der Akku-Stufe. Die Morgen-Vorentladung macht vor Sonnenaufgang Platz im Akku.`,helpTroubleOff:`Die Regelung greift nicht`,helpTroubleOffBody:`Prüfe die Pille in der Kopfzeile. Steht dort Regelung aus, ist der Hauptschalter aus und jede Stufe außer diesem Zustand bleibt stumm. Steht eine Phase, lies die Begründung auf Entscheidung. Oft blockiert eine höhere Stufe, zum Beispiel Reserve, Hochtarif oder Morning-Cap, genau das, was du weiter unten eingestellt hast.`,helpTroubleEntities:`Entitäten fehlen`,helpTroubleEntitiesBody:`Ein roter Hinweis nennt die Sensoren, die Maestro erwartet und nicht findet. Deaktivierte Entitäten sind gekennzeichnet. Lege sie in der Integration an oder aktiviere sie wieder. Solange der Hinweis steht, fehlen der Ansicht oder der Regelung Werte.`,helpTroubleAlerts:`Warnungen`,helpTroubleAlertsBody:`Das Band unter der Kopfzeile meldet, wenn der Wechselrichter nicht erreichbar ist oder eine Lade- oder Entladesperre am Gerät anliegt. Mit Bestätigen blendest du es aus, bis ein neuer Hinweis kommt. Unter Darstellung lässt sich das Banner dauerhaft ausschalten – die Chips unter dem Energiefluss bleiben. Eine Sperre am Gerät setzt Maestro nicht aus den Regeln heraus. Zusätzlich kann eine Meldung auf ungerechtfertigten Netzbezug oder Netzladung wegen Notstromreserve hinweisen.`,helpTroubleHistory:`Verlauf und Diagramme`,helpTroubleHistoryBody:`Verläufe kommen aus dem Recorder. Ist er für eine Entität ausgeschlossen oder noch nicht bereit, bleibt das Diagramm leer. Die Live-Werte darüber bleiben davon unberührt. Nach einem Update lädt das Panel das Skript neu. Siehst du die alte Ansicht, die Integration neu laden.`,helpFaqNoGrid:`Es wird nicht aus dem Netz geladen`,helpFaqNoGridBody:`Sieh auf Entscheidung die Phase. Netzladung läuft nur, wenn die Strategie nicht auf Aus steht, der Preisplan den Akku steuert oder ein günstiges Fenster mit Restbudget aktiv ist, und der Ladestand unter dem Ziel liegt.
Häufige Gründe, warum trotzdem nichts passiert: Schattenmodus, der Plan ist nicht frisch, das Tagesbudget ist aufgebraucht, der harte Deckel ist erreicht, oder ein schwacher PV-Tag hat Vorrang, solange die Netzladung im günstigen Fenster nicht extra eingeschaltet ist. Liegt der Stand unter der Notstromreserve, lädt Maestro bis zur Reserve nach. Eine gewollte Ladung darüber hinaus braucht die Netzladung im günstigen Fenster, sonst endet der Takt an der Reserve.
Plant der Preisplan bewusst 0 kWh und hält nur Energie für teure Stunden, ist das ein anderer Fall – siehe den FAQ-Eintrag „Preisplan plant keine Netzladung“.`,helpFaqSwing:`Der Akku lädt und entlädt im Minutentakt`,helpFaqSwingBody:`Das passiert, wenn im günstigen Fenster bis zu einem Ziel geladen wird und die Entladung danach frei bleibt. Der Stand fällt, zwei Minuten später lädt Maestro wieder nach.
Wirkung von Entladung halten: Ist das Ziel erreicht, sperrt Maestro die Entladung, solange das günstige Fenster noch läuft. Beim Preisplan übernimmt das die Halten-Stunde. Die SoC-Hysterese dämpft zusätzlich kleine Sprünge, sie ersetzt das Halten nicht.`,helpFaqHt:`Im Hochtarif kommt Strom aus dem Netz`,helpFaqHtBody:`Der Hochtarif-Schutz sperrt die Entladung erst, wenn der Ladestand die HT-Reserve erreicht hat. Darüber deckt der Akku das Haus. Siehst du Netzbezug bei hohem Stand, ist der Schutz aus, das Fenster gilt zu dieser Stunde nicht, oder eine höhere Stufe hat die Entladung schon gesperrt, zum Beispiel die Notstromreserve oder EVCC.
Ein Slot der Klasse Hoch kann eine eigene Mindestreserve setzen. Die HT-Uhrzeiten legen kein Niedertarif-Fenster an. Niedertarif trägst du als Slot der Klasse Niedrig ein.`,helpFaqPause:`Überschuss geht ins Netz, der Akku bleibt leer`,helpFaqPauseBody:`Die Korridor-Pause setzt ein Ladelimit von 0 W, wenn der nutzbare Überschuss unter der unteren Korridorleistung liegt. Das Limit bleibt bis zum nächsten Takt. In der Zeit speist der Wechselrichter ein, obwohl der Akku Platz hat. Die Pause verhindert keinen Netzbezug. Sie verzögert nur das Laden, sobald wieder Überschuss da ist.
Ist die Ladeverteilung aus, gibt es nichts zu glätten. Schalte die Pause im unteren Korridor aus, oder den Schnelllade-Boden ein, solange der Akku leer ist. Ein schwacher Tag hebt die Drossel ebenfalls auf und nimmt den Überschuss.`,helpFaqMin:`Die kleine Mindest-Ladeleistung wirkt nicht`,helpFaqMinBody:`Die Mindest-Ladeleistung ist die Untergrenze, ab der Maestro überhaupt ein Limit schickt. Darunter gibt Maestro die Limits frei. Der Wechselrichter lädt dann nach seiner eigenen Vorgabe, oft erst ab etwa 100 W. Die Einstellung in Maestro springt dadurch nicht auf 100 W zurück.
Limits löschen macht dasselbe sofort, bis zum nächsten Takt. Wer eine sehr niedrige Schwelle will, braucht ein Limit, das Maestro auch sendet, also einen Bedarf über dieser Schwelle.`,helpFaqRestart:`Der Hauptschalter nach dem Neustart`,helpFaqRestartBody:`Der Hauptschalter merkt sich An, Aus und eine laufende Pause. Nach einem Neustart von Home Assistant steht er wieder so, wie er vorher stand, inklusive der restlichen Zeit. War er dauerhaft aus, geht Maestro nicht von allein an. Ist die Pause abgelaufen, geht er wieder an. In der Kopfzeile steht die restliche Zeit.`,helpFaqTibber:`Tibber zeigt keine Preise`,helpFaqTibberBody:`Ist der Strompreis-Sensor der Tibber-Integration gewählt, holt Maestro die Stundenkurve selbst über tibber.get_prices. Der aktuelle Preis bleibt der Sensor. Bei mehreren Wohnungen gilt der App-Spitzname. Ein Abruf läuft höchstens alle 15 Minuten. Schlägt er fehl, bleibt die letzte Kurve liegen.
15-Minuten-Preise der Börse ersetzt Maestro nicht durch eine eigene Kurve, solange Tibber sie nicht in dieser Abfrage liefert. Ohne Preis-Sensor rechnet ein dynamischer Plan nicht. Das steht dann im Satz unter der Strategie.`,helpFaqPlan:`Feste Schwelle oder Preisplan?`,helpFaqPlanBody:`Eine feste Preisschwelle lädt, sobald der Preis darunter liegt, auch wenn er später am Tag nicht teurer wird. Der Preisplan lädt nur, wenn die Spanne zur späteren teuren Stunde den Umweg über den Akku lohnt, abzüglich Wirkungsgrad und, bei Experte, Verschleiß.
Zeitfenster laden nur in Slots der Klasse Niedrig, nicht in der billigsten Stunde außerhalb dieses Fensters. Automatisch sucht die Stunden selbst. Dafür muss der Preisplan den Akku steuern. Im Schattenmodus siehst du den Plan, der Akku folgt ihm nicht.
Im Modus Automatisch gelten fest Wirkungsgrad 0,90, Mindestspanne 0,03 €/kWh und Sicherheitsfaktor 1,15. Der Akku-Verschleiß zählt dort nicht, auch wenn Anschaffungskosten eingetragen sind. Experte nutzt deine Werte; bei Anschaffungskosten 0 € ist der Verschleiß 0 €/kWh. Zum leichteren Laden die Mindestspanne senken und den Wirkungsgrad etwas höher setzen. Nach dem Wechsel auf Experte den Schalter „Preisplan steuert Akku“ wieder einschalten.
Steuert der Plan den Akku, zeigt die Prognose denselben geplanten SoC wie die Preisplan-Seite.`,helpFaqPlanHold:`Preisplan plant keine Netzladung`,helpFaqPlanHoldBody:`Der Plan kann 0 kWh Netzladung planen und trotzdem sparen: Er hält vorhandene Energie für teure Stunden und lässt mittlere Preise aus dem Netz decken. Die Meldung „Entladung zeitweise gesperrt“ meint spätere Slots, nicht unbedingt den aktuellen. „Jetzt halten“ kann aus sein und die Meldung trotzdem stimmen.
Typisch, wenn die Preisspanne nach Mindestspanne und Wirkungsgrad zu klein ist, oder der Ladestand für die teuren Fenster schon reicht. Tagesbudget und Obergrenze sind dann oft nicht der Bremsklotz. Auf der Preisplan-Seite stehen Restbudget, Boden, Obergrenze und Mindestspanne; in den Plan-Slots siehst du, ob irgendwo Netzladung geplant ist.`,helpFaqOld:`Das Panel zeigt noch die alte Ansicht`,helpFaqOldBody:`Die Adresse des Panels hängt am Dateiinhalt. Nach einem Neustart oder einem Reload der Integration lädt der Browser das neue Skript ohne geleerten Cache. Siehst du die alte Hilfe oder alte Schalter, die Integration E3DC Maestro neu laden und Maestro einmal schließen und wieder öffnen.`,helpGlossaryBody:`Phase: die Regel, die im letzten Takt gewonnen hat.
Ladestand: Füllung des Hausakkus in Prozent.
Reserve: Sockel, unter dem Maestro nicht entlädt.
Schattenmodus: der Preisplan rechnet, steuert den Akku aber nicht.
Tagesbudget: wie viel kWh Maestro an einem Tag höchstens aus dem Netz in den Akku lädt.
Korridor: das über den Tag verteilte Ladestand-Ziel.
Abregelung: der Wechselrichter drosselt PV, weil das Netz sie nicht aufnimmt.`},Ai={navHelp:`Help`,helpTitle:`Help`,helpSub:`Panel and control`,helpSearch:`Search the help`,helpEmpty:`Nothing matches. Try another word, for example reserve or price plan.`,helpToc:`Contents`,helpTop:`Back to top`,helpToToc:`Contents`,helpActive:`Active now: {rule}`,helpNoPhase:`No phase reported. Control is off, or the first cycle has not run yet.`,helpOpenSettings:`Open in settings`,helpOpenControls:`Open controls`,helpChStart:`Getting started`,helpChLive:`Live`,helpChForecast:`Forecast`,helpChPlan:`Price plan`,helpChDecision:`Decision`,helpChPlant:`System`,helpChSettings:`Settings`,helpChControls:`Controls`,helpChRules:`Control logic`,helpChConcepts:`Concepts`,helpChTrouble:`Questions and answers`,helpChGlossary:`Glossary`,helpStartLead:`What Maestro does`,helpStartLeadBody:`Each cycle Maestro decides whether the home battery charges, discharges, or waits. The panel shows the state and the switches. The integration makes the decision, not the view.`,helpStartSteps:`First steps`,helpStartStepsBody:`Under Settings, check setup: sensors, control, and the PV forecast if you use one.
Turn control on, from the Controls menu or under System.
On Decision, see which rule is active and why.
Change a threshold only when the reason points at it.`,helpSeeRules:`How the rules work`,helpOpenSetup:`Open setup`,helpLiveBody:`Energy flow. PV, grid, house, and battery, with the direction of the power. Switch above between nodes, blob and house. Extra consumers sit on a fan by the house; Arrange lets you move them. Effect: a click on a node opens that point's power history. Without recorder data the chart stays empty, and the live value remains.
Day totals under the flow. PV, house, import and feed-in in kWh. Separately measured loads appear below once they have energy today. Effect: a tap opens the Today group. Live power stays the main figure on the nodes.
Header. Remaining PV forecast for today, tomorrow, and, when a sensor is selected, the day after. The pill shows whether control is on, and the current phase. Effect: that is the state of the last cycle, not a switch.
Today and the day balance. They start collapsed. The period sits on the Today row. Effect: opening them shows the sums. It does not change control.
Balance pulse below. Collapsed with a mini spark, open as week or month bars plus a cumulative line. Effect: tapping a day selects it in the day balance. Without recorder data the group stays empty.
Discharge and reserve. The pills appear only while something is active. Effect: you see forced discharge and the backup floor without changing page.
Look-ahead and shadow mode sit as a sentence under the flow. Effect: you can see whether the price plan is only calculating or controlling the battery.
Auto strategy. Switch, objective, and the expected difference from the previous setup. Effect: the figure is not money already saved. The same fields sit under Settings, objective.
Loads in the flow come from Controls. Edit opens them.`,helpForecastBody:`The forecast shows what Maestro expects over the next hours: PV, consumption, and the planned battery path. You can overlay the measured history. Dragging the chart zooms, and a live update does not reset that zoom.`,helpPlanBody:`This page shows when the price plan wants grid charging or a hold. The strategy is at the top: off, time window, below a price threshold, automatic, or expert.
Automatic uses fixed efficiency, spread, and safety values. Expert uses your fine tuning. Switching into the plan starts in shadow mode. The battery follows the plan only after “price plan controls the battery” is on.
The same blocks sit on this page under grid-charging settings, collapsed at first.`,helpDecisionBody:`The page shows the current phase, the reason in plain language, and the recent phase history. The ladder shows the check order. The active rung is marked. Clicking it opens the matching settings group.`,helpSeeLadder:`Every rule in detail`,helpPlantBody:`System shows what the inverter reports: grid, battery, PV, wallbox, and the controls on the device. Each room opens as its own view. When the backup reserve is on, its floor is yellow in the battery ring.`,helpSetIntro:`Overview`,helpSetIntroBody:`Settings are grouped by job, not by individual switches. An area opens as its own page, and the arrow returns to the list. Expert view applies only in this browser and reveals extra blocks.`,helpSetSetup:`Setup`,helpSetSetupBody:`The checklist is what control needs in order to run. The same items stay on Live while something is missing. Without a forecast, control still runs, just without lookahead.`,helpSetPlant:`Plant`,helpSetPlantBody:`Inverter power. The device rating in watts. Effect: Maestro will not request a discharge above it. Too low throttles the house supply from the battery. Too high changes nothing on the device, the inverter limits itself.
Installed module power. The kWp on the roof. Effect: weak-yield checks and sizing compare the day's energy with this. A wrong value marks ordinary days as weak, or misses real weak days.
Maximum charge power. The ceiling for every charge limit Maestro sends. Effect: emergency charge, the price plan, cheap-window grid charge, and the fast-charge floor stay under it. Extra PV does not charge the battery faster.
Minimum charge power. Maestro does not start a charge below this. Effect: when the calculated need is lower, Maestro sends no limit. The inverter's own logic applies again, often an internal floor around 100 W. The number in the setting stays. Very small values apply only while Maestro itself is sending a limit.
Feed-in limit. The share of inverter power that may be exported. Effect: above it, the feed-in rule charges the surplus into the battery. Too low keeps energy in the battery when you wanted to export. Too high lets more reach the grid before Maestro reacts.`,helpSetSafety:`Safety`,helpSetSafetyBody:`Charge threshold. Below this state of charge Maestro charges at once at maximum power from the grid, before almost every other rule. 0 turns emergency charging off, and that is the default. Effect: the battery stops falling. House and car get no battery power in this phase. Do not set it high by accident, or Maestro often charges from the grid.
Fixed backup reserve. A fixed floor replaces the seasonal reserve. Effect: discharge is blocked below it and Maestro charges back up to the floor, from the grid if PV is not enough. A deliberate cheap-window grid charge may go beyond it.
Seasonal backup reserve. The floor is higher in winter and lower in summer, with values for the winter solstice and the equinox. Effect: the same block as the fixed reserve, only the floor moves through the year.
Reserve from consumption. Raises the floor from recent days. Effect: after heavy days more stays in the battery. Discharge stops sooner.
Hard state-of-charge cap. A switch and a percent. Effect: above it Maestro blocks further charging, and discharge stays free. Grid charging and the price plan stop at this line. The curtailment guard may pass it so PV is not throttled.
Watchdog. Seconds without contact after which the inverter drops the limits. Effect: if Home Assistant hangs, the device returns to its own self-consumption and does not stay on an old charge command. Too short clears limits on a brief gap.`,helpSetTariff:`Grid and tariff`,helpSetTariffBody:`Grid-charging strategy. One choice instead of many switches. Off: never from the grid, PV only. Time window: charges in tariff slots of class low up to the target, within the daily budget. Below a price threshold: charges once the price is at or under the threshold. Automatic: the price plan picks the cheapest hours, with fixed efficiency 0.90, minimum spread 0.03 €/kWh, and safety factor 1.15, ignoring wear. Expert: the same sums with your values. Effect: the strategy decides whether and when grid power may enter the battery. Switching into the plan starts in shadow mode.
Price plan controls the battery. Off is shadow mode: the plan calculates and shows on the price-plan page, but sends no limits. On applies charging and holding. Effect: only this switch changes the battery.
Daily budget. At most this many kWh from the grid in one day. Effect: grid charging stops after that, even if the price is still cheap.
Price threshold. Up to this price, electricity counts as cheap. Effect: only the below-threshold strategy reads it. Automatic and expert compare hours with each other, not with this number.
Cheap-window target and the plan's state-of-charge cap. Charging stops here. Effect: the battery stops at this line. Forecast-based makes the target a cap and charges only what is missing until the next expensive phase.
Hold discharge. In a cheap window, when the price plan is not in control, the battery stays put once the target is reached. Effect: no charge-and-discharge cycle every couple of minutes while the cheap power is still there.
Fine tuning, expert only. Minimum spread: below this price gap, grid charging does not pay, so the plan does not charge. Efficiency: 0.9 means a tenth is lost on the detour through the battery, so the plan demands a wider gap. Safety factor: the plan assumes higher consumption so the battery does not run empty. Too high charges more from the grid than you need.
High tariff. A window with start, end, Saturday, and Sunday, plus a minimum reserve in winter and at the equinox. A slot can override the reserve. Effect: in the window the battery covers the house until the reserve is reached. Only then does Maestro block discharge. Above the reserve, normal self-consumption continues. The protection does not create low-tariff windows.
Costs and evaluation. Buy price, feed-in payment, battery price, and cycles. Effect: they do not decide when to charge. Statistics, revenue, and, in expert mode, the price plan's wear figure read them. Wear set too high makes the plan charge from the grid less often.
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
Clear limits. Lifts the charge and discharge limits on the inverter at once. Effect: until the next cycle the device logic applies. The settings stay saved.`,helpSetLook:`Appearance`,helpSetLookBody:`Brightness and colour of the cockpit. Below that, the energy-flow layout: nodes, blob or house. The choice applies only in this browser.`,helpSetClassic:`Classic dashboard`,helpSetClassicBody:`Creates the E3DC Maestro Lovelace view, including auto optimisation, sizing, and the classic help. Mushroom Cards and ApexCharts Card must be installed. Do not rename the path e3dc-maestro.`,helpSetSizing:`Sizing`,helpSetSizingBody:`Estimates the effect of a larger battery or more PV. Values without their own entity, such as assumed size and prices, are entered here.`,helpControlsBody:`Controls sits at the bottom of the navigation and applies at once: control on or off, forced discharge, power, reserve, and loads. All settings opens the settings area. Escape or a click beside the sheet closes it.`,helpRulesHow:`How Maestro decides`,helpRulesHowBody:`Maestro walks the rules from top to bottom and takes the first one whose condition matches. The remaining rules do not run in that cycle. If control is off, nothing else happens. Forced discharge comes immediately after that, before emergency charge and the feed-in limit.
The bands only group the rungs for reading. Each rung is still checked on its own, in the order shown.`,helpRuleOff:`The master switch is off. Maestro sets no charge or discharge limit and hands control back to the device.`,helpRuleForce:`Forced discharge is on. The battery discharges at the chosen power down to the higher of the charge threshold and the reserve. If the level is already below that, discharge pauses. This rule sits above emergency charge, tariff, and PV.`,helpRuleEmergency:`State of charge is below the charge threshold. Maestro charges at maximum power before the feed-in limit, reserve, or tariff are checked.`,helpRuleFeed:`Export is above the configured limit. Maestro charges the surplus into the battery. The phase stays briefly active even after export falls just under the limit, so it does not flicker every cycle. When the battery is practically full, Maestro does not add another charge request.`,helpRuleReserve:`State of charge is below the backup reserve, fixed or seasonal. Maestro blocks discharge and charges back up to the reserve. A deliberately enabled cheap-window grid charge may pass this rung, so the battery can rise above the reserve.`,helpRuleEvcc:`EVCC is charging the car in immediate mode. Maestro blocks battery discharge so the car does not empty the home battery. Charging from PV stays possible.`,helpRulePrice:`The price plan is controlling the battery and the curve is fresh. In a cheap hour Maestro charges toward the plan target, within the daily budget, and not past the hard cap. In an expensive hour it holds discharge so the energy is worth more later. The curtailment guard turns the plan off for that cycle. In shadow mode the plan only calculates, and this rung does not run.`,helpRuleHt:`During a high-tariff window the battery covers the house until it reaches the high-tariff reserve. Only then does Maestro block discharge, leaving a floor for the rest of the window. The reserve comes from the slot, from consumption, or from the season.`,helpRuleHold:`A cheap tariff window is active, hold discharge is on, and the price plan is not controlling the battery. Maestro does not discharge during that window, so the cheap energy stays in the battery.`,helpRuleMorning:`Before PV charging starts, Maestro lowers the battery so the midday surplus fits. Set the mode, starting level, and power under loads.`,helpRuleCap:`Until the configured hour Maestro does not charge above the morning cap, leaving room for PV. On a weak-PV day, and when the remaining forecast cannot fill the battery, this rung yields. A pending cheap-window grid charge does too.`,helpRuleAstro:`Before sunrise plus the offset, Maestro does not start PV charging. Discharge for the house stays free. In winter an earliest hour also applies. A pending cheap-window grid charge skips this block.`,helpRuleHard:`The hard state-of-charge cap is reached. Maestro blocks further charging, and discharge stays free. The curtailment guard is exempt, so PV that would otherwise be curtailed can still enter the battery.`,helpRuleFloor:`Below the fast-charge floor the battery takes the full PV surplus, without the corridor throttle. A pending cheap-window grid charge and the curtailment guard take priority.`,helpRuleLow:`The day is marked weak, or the conservative remaining forecast does not reach the target. While PV is producing and the end-of-charge level is not reached, the battery takes the surplus. Spreading and the morning cap yield. An enabled cheap-window grid charge takes priority. It exists for days like this.`,helpRuleGrid:`During a cheap tariff window Maestro charges from the grid, up to that window’s target and within the daily budget. The target is fixed or comes from the forecast. The curtailment guard takes priority.`,helpRuleCorridor:`Inside the charge corridor the battery follows the daily target. When the remaining forecast already covers the target, Maestro delays charging and leaves discharge free for the house. A lower corridor can pause charging when there is little surplus. With spreading on, that rate applies.`,helpRuleSpread:`Spreading stretches PV charging across the day instead of filling the battery in the morning. It is off while the battery has priority: a weak day, or a remaining forecast that is too small. Once the spreading target is reached, Maestro blocks further charging and the surplus goes to the grid.`,helpRuleCurtail:`The curtailment guard is active because PV would otherwise be lost at the export limit. Maestro sets a minimum charge power so the surplus enters the battery. This rung sits after the other PV rules on purpose, and it wins where those rules yield because of it. When the battery is full, the request stays off.`,helpRuleIdle:`No earlier rule matches. Maestro sets no limit of its own. The inverter runs its normal self-consumption.`,helpWhyGrid:`Why is Maestro charging from the grid?`,helpWhyGridBody:`Grid charging comes from two rungs, and only those. Either the price plan is in control and the current hour is cheap. Or the strategy charges in a cheap window and both the budget and the target allow it. Emergency charge and topping up the reserve also draw from the grid when PV is not enough. If you see grid import without one of these phases, that is house load, not a charge command.`,helpConceptPlan:`Price plan and cheap windows`,helpConceptPlanBody:`The price plan looks for hours where charging and later use pays off, and hours where the battery should hold. It needs a price curve and a fresh calculation. Cheap windows without the plan are tariff slots of class low, or hours below the price threshold. The high-tariff settings create only high-tariff windows, not low-tariff ones.`,helpConceptPv:`Forecast and corridor`,helpConceptPvBody:`The PV forecast says how much energy is still coming before evening. That decides whether Maestro charges now, delays charging, or gives the battery priority. The corridor is the state-of-charge target across the hours: not already full in the morning, but at the wanted level by evening. Without a forecast there is no lookahead. The other rules remain.`,helpConceptLow:`Weak PV day`,helpConceptLowBody:`When the daily forecast is below the threshold, Maestro latches the day as weak. The battery should then take the surplus instead of spreading it or capping the morning. The latch releases when the remaining forecast clearly covers the need up to the end-of-charge target.`,helpConceptFeed:`Feed-in limit and curtailment`,helpConceptFeedBody:`The feed-in limit reacts once measured export is too high, and charges exactly that surplus. The curtailment guard becomes active earlier, from PV power, and holds a minimum charge before the inverter throttles the plant. Both protect PV. The limit is the reaction, the guard is the precaution.`,helpConceptLoads:`Car, heat pump, morning`,helpConceptLoadsBody:`EVCC immediate charging is its own rung and stops discharge. The wallbox guard against grid import is applied after the decision and can open the discharge limit. Maestro switches the heat pump by surplus and price, independent of the battery rung. Morning pre-discharge makes room in the battery before sunrise.`,helpTroubleOff:`Control does nothing`,helpTroubleOffBody:`Check the pill in the header. If it says control is off, the master switch is off and every rung except that state stays silent. If a phase is shown, read the reason on Decision. A higher rung, such as reserve, high tariff, or the morning cap, often blocks exactly what you configured further down.`,helpTroubleEntities:`Entities are missing`,helpTroubleEntitiesBody:`A red note lists the sensors Maestro expects and cannot find. Disabled entities are marked. Create them in the integration or enable them again. While the note is shown, the view or the control logic is missing values.`,helpTroubleAlerts:`Warnings`,helpTroubleAlertsBody:`The band under the header reports when the inverter is unreachable or a charge or discharge lock is set on the device. Got it hides it until a new note appears. Under Appearance you can turn the banner off permanently — the chips under the energy flow stay. A lock on the device is not cleared by Maestro’s rules. A separate note can point at unjustified grid import or grid charge for the backup reserve.`,helpTroubleHistory:`History and charts`,helpTroubleHistoryBody:`History comes from the recorder. If an entity is excluded or the recorder is not ready, the chart stays empty. The live values above it are unaffected. After an update the panel loads the new script. If you still see the old view, reload the integration.`,helpFaqNoGrid:`It does not charge from the grid`,helpFaqNoGridBody:`Read the phase on Decision. Grid charging runs only when the strategy is not off, the price plan is controlling the battery or a cheap window still has budget, and the state of charge is under the target.
Common reasons nothing happens: shadow mode, the plan is not fresh, the daily budget is used up, the hard cap is reached, or a weak-PV day has priority while cheap-window grid charging is not switched on as well. Below the backup reserve Maestro charges back up to the reserve. Charging beyond that on purpose needs cheap-window grid charging, otherwise the cycle ends at the reserve.
If the price plan deliberately schedules 0 kWh and only holds energy for expensive hours, that is a different case — see the FAQ entry “Price plan schedules no grid charge”.`,helpFaqSwing:`The battery charges and discharges every couple of minutes`,helpFaqSwingBody:`This happens when a cheap window charges up to a target and discharge stays free afterwards. The level falls, and a couple of minutes later Maestro charges again.
Effect of hold discharge: once the target is reached, Maestro blocks discharge while the cheap window is still running. On the price plan, the hold hour does that. State-of-charge hysteresis damps small jumps. It does not replace the hold.`,helpFaqHt:`During high tariff, power comes from the grid`,helpFaqHtBody:`High-tariff protection blocks discharge only once the state of charge has reached the high-tariff reserve. Above that, the battery covers the house. If you see grid import at a high level, protection is off, the window does not apply this hour, or a higher rung already blocked discharge, for example the backup reserve or EVCC.
A slot of class high can set its own minimum reserve. The high-tariff clock does not create low-tariff windows. Enter low tariff as a slot of class low.`,helpFaqPause:`Surplus goes to the grid and the battery stays empty`,helpFaqPauseBody:`The corridor pause sends a charge limit of 0 W when the usable surplus is below the lower corridor power. The limit stays until the next cycle. In that time the inverter exports, even though the battery has room. The pause does not prevent grid import. It only delays charging once surplus returns.
With spreading off there is nothing to smooth. Turn off the pause in the lower corridor, or turn on the fast-charge floor while the battery is empty. A weak day also lifts the throttle and takes the surplus.`,helpFaqMin:`The small minimum charge power does nothing`,helpFaqMinBody:`Minimum charge power is the floor below which Maestro does not send a limit at all. Under it, Maestro releases the limits. The inverter then charges by its own rule, often only from about 100 W. The setting in Maestro does not jump back to 100 W because of that.
Clear limits does the same at once, until the next cycle. A very low threshold applies only when Maestro is actually sending a limit, so the need has to be above that threshold.`,helpFaqRestart:`The master switch after a restart`,helpFaqRestartBody:`The master switch remembers on, off, and a running pause. After a Home Assistant restart it comes back as it was, including the time still left. If it was off until turned on, Maestro does not turn itself on. Once the pause has ended, it turns on again. The header shows the time left.`,helpFaqTibber:`Tibber shows no prices`,helpFaqTibberBody:`When the electricity-price sensor from the Tibber integration is selected, Maestro fetches the hourly curve itself through tibber.get_prices. The current price stays the sensor. With several homes, the app nickname applies. A fetch runs at most every 15 minutes. If it fails, the last curve remains.
Maestro does not replace the exchange's 15-minute prices with a curve of its own unless Tibber returns them in that call. Without a price sensor a dynamic plan does not calculate. The line under the strategy says so.`,helpFaqPlan:`Fixed threshold or price plan?`,helpFaqPlanBody:`A fixed price threshold charges as soon as the price is below it, even if the price never rises later that day. The price plan charges only when the gap to a later expensive hour pays for the detour through the battery, after efficiency and, in expert mode, wear.
Time windows charge only in slots of class low, not in the cheapest hour outside that window. Automatic finds the hours itself. For that, the price plan has to control the battery. In shadow mode you see the plan, and the battery does not follow it.
In Automatic mode, efficiency 0.90, minimum spread 0.03 €/kWh and safety factor 1.15 are fixed. Battery wear does not count there, even if purchase cost is set. Expert uses your values; with purchase cost 0 €, wear is 0 €/kWh. To charge more readily, lower the minimum spread and raise efficiency a little. After switching to Expert, turn “Price plan controls battery” back on.
When the plan controls the battery, Forecast shows the same planned SoC as the price-plan page.`,helpFaqPlanHold:`Price plan schedules no grid charge`,helpFaqPlanHoldBody:`The plan can schedule 0 kWh of grid charge and still save money: it holds energy already in the battery for expensive hours and lets mid-price hours draw from the grid. The message “discharge blocked at times” means later slots, not necessarily the current one. “Hold now” can be off and that message can still be correct.
Typical when the price gap after minimum spread and efficiency is too small, or the state of charge already covers the expensive windows. Daily budget and the SoC ceiling are often not the blocker. On the price-plan page you see remaining budget, floor, ceiling and minimum spread; in the plan slots you see whether any grid charge is planned.`,helpFaqOld:`The panel still shows the old view`,helpFaqOldBody:`The panel address depends on the file content. After a restart or a reload of the integration the browser loads the new script without an emptied cache. If you still see the old help or old switches, reload the E3DC Maestro integration and close and open Maestro once.`,helpGlossaryBody:`Phase: the rule that won the last cycle.
State of charge: how full the home battery is, in percent.
Reserve: the floor below which Maestro does not discharge.
Shadow mode: the price plan calculates but does not control the battery.
Daily budget: how many kWh Maestro may charge from the grid into the battery on one day.
Corridor: the state-of-charge target spread across the day.
Curtailment: the inverter throttles PV because the grid will not take it.`},ji={navLive:`Live`,navForecast:`Prognose`,navPlan:`Preisplan`,navDecision:`Entscheidung`,navSettings:`Einstellungen`,navPlant:`Anlage`,settingHelp:`Hilfe`,navControls:`Steuerung`,menu:`Menü`,subLive:`Energiefluss und Akku in Echtzeit`,factRest:`PV Prognose Rest heute`,factTomorrow:`Morgen`,factDayAfter:`Übermorgen`,subForecast:`Was Maestro für die nächsten 24 Stunden erwartet`,subPlan:`Netzladung nach dynamischem Tarif`,subDecision:`Warum Maestro gerade so regelt`,subSettings:`Von der Anlage über Schutz und Tarif bis zum PV-Laden`,subPlant:`Betriebszustand, Speicher und Phasen vom E3DC`,regulationOn:`Regelung aktiv`,regulationOff:`Regelung aus`,pauseTitle:`Wie lange aus?`,pauseHint:`Maestro bleibt so lange aus und schaltet sich danach wieder ein. Der Zähler bleibt über einen Neustart erhalten.`,pauseOffTitle:`Regelung`,pauseOffHint:`Wieder einschalten, oder für eine feste Zeit aus lassen.`,pauseResume:`Wieder einschalten`,pauseOneHour:`1 Stunde`,pauseHours:`{h} Stunden`,pausePermanent:`Dauerhaft`,pauseLeftHours:`noch {h} h {m} min`,pauseLeftHour:`noch {h} h`,pauseLeftMin:`noch {m} min`,flowTitle:`Energiefluss`,flowSub:`Jetzt · aktualisiert live`,flowDay:`Heute`,flowDaySeparate:`Separat`,flowDayImport:`Bezug`,flowDayFeed:`Einspeisung`,flowDayOpen:`Heute aufklappen`,flowStyleLabel:`Darstellung des Energieflusses`,flowStyleTitle:`Energiefluss`,flowStyleHint:`Knoten, Blob oder Haus. Die Wahl gilt nur in diesem Browser.`,flowStyleNodes:`Knoten`,flowStyleNodesHint:`PV, Netz, Haus und Akku um den Hub, mit leuchtenden Teilchen.`,flowStyleBlob:`Blob`,flowStyleBlobHint:`Eine weiche Form, die sich zur stärksten Quelle oder Senke streckt.`,flowStyleCity:`Haus`,flowStyleCityHint:`Modernes Haus: PV-Dach, Glasfassade, Akku-Sockel und Strommast.`,flowCityLoad:`Last`,arrangeConsumers:`Anordnen`,arrangeDone:`Fertig`,arrangeHint:`Verbraucher ziehen, um sie auf dem Fächer zu platzieren.`,arrangeReset:`Zurücksetzen`,nodePv:`PV`,nodeHouse:`Haus`,nodeImport:`Netzbezug`,nodeFeed:`Einspeisung`,nodeBatDischarge:`Akku entlädt`,nodeBatCharge:`Akku lädt`,battery:`Akku`,batteryStyleLabel:`Darstellung des Akkus`,batteryStyleRing:`Ring`,batteryStylePack:`Pack`,stateOfCharge:`Ladezustand`,targetSoc:`Ziel-SoC`,autonomy:`Autonomie`,forecastPeak:`Nächster SOC-Peak`,forecastPeakToday:`Peak heute {v}`,forecastPeakTomorrow:`Peak morgen {v}`,forecastNoPeak:`kein Anstieg in 24 h`,forecastFloor:`Sockel {v}`,forecastFloorReach:`Sockel erreicht {v}`,forecastEmpty:`Leer {v}`,forecastGrid:`Netz ab {v}`,forecastGridUntil:`Netz bis {v}`,forecastGridOngoing:`Netz durchgehend`,forecastNoGrid:`kein Netzbezug`,autonomyHint:`bei aktuellem Verbrauch`,discharging:`Entladung`,charging:`Ladung`,chipReachable:`E3DC erreichbar`,chipUnreachable:`E3DC nicht erreichbar`,chipChargeLock:`Ladesperre`,chipDischargeLock:`Entladesperre`,chipHt:`HT-Schutz`,chipCurtail:`Abregelschutz`,chipEmergency:`Notladung`,chipFeedIn:`Einspeisedrosselung`,chipGridCharge:`Netzladung`,chipReserveCharge:`Netzladung Notstromreserve`,chipBatteryPriority:`Akku-Priorität`,chipLowYield:`Schwacher PV-Tag`,chipPredictive:`Vorausschauende Ladung`,chipShadow:`Preisplan · Schatten`,modePredictive:`Vorausschauend`,modeShadow:`Preisplan im Schatten`,groupToday:`Heute`,groupWeek:`Woche`,groupMonth:`Monat`,groupNet:`netto`,periodToday:`Heute`,periodWeek:`Woche`,periodMonth:`Monat`,forceTitle:`Erzwungene Entladung`,fixedReserve:`Notstromreserve`,controlsPair:`Entladung & Reserve`,controlsForceOn:`Erzwungene Entladung {v}`,controlsForceOff:`Erzwungene Entladung aus`,controlsReserveOn:`Notstromreserve {v} %`,controlsReserveOff:`Notstromreserve aus`,ctrlReserveSoc:`{v} %`,exportCsv:`CSV`,actionsTitle:`Aktionen`,btnClear:`Limits freigeben`,btnClearSub:`Hebt Lade- und Entladegrenzen sofort auf und setzt den Wechselrichter auf Normal.`,btnCharge:`Manuell laden (3 kWh)`,confirmCharge:`3 kWh aus dem Netz laden?`,selWallbox:`Wallbox-Typ`,selMorning:`Vorentladung`,selAuto:`Auto-Ziel`,selTariff:`Tarif`,debugTitle:`Debug-Log`,debugEmpty:`Noch keine Debug-Zeilen. Der Schalter startet das Logging.`,debugSwitch:`Debug-Logging`,balanceTitle:`Tagesbilanz`,balanceWeek:`Wochenbilanz`,balanceMonth:`Monatsbilanz`,pulseTitle:`Bilanzpuls`,pulseCumulative:`Kumuliert`,pulseEmpty:`Keine Tagesbilanzen im Recorder.`,pulseClickDay:`Tippen wählt den Tag in der Bilanz.`,dayPrev:`Vorheriger Tag`,dayNext:`Nächster Tag`,dayPick:`Tag wählen`,dayNav:`Tagesauswahl`,whenToday:`heute`,whenWeek:`diese Woche`,whenMonth:`diesen Monat`,kpiCostGross:`Stromkosten`,kpiCostGrossSub:`Netzbezug brutto`,kpiRevenue:`Einspeise-Erlös`,kpiRevenueSub:`Vergütung {when}`,kpiWear:`Akku-Verschleiß`,kpiWearSub:`anteilige Zyklenkosten`,kpiBalance:`Energiebilanz`,kpiBalanceSub:`Erlös + Ersparnis − Kosten − Verschleiß`,kpiGridBat:`Netz → Akku`,kpiGridBatSub:`aus dem Netz geladen`,kpiGridBatWarn:`Netzladung ohne Rechtfertigung`,kpiGridBatReserve:`wegen Notstromreserve`,kpiGridBatEmergency:`wegen Notladung`,kpiGridBatJustified:`berechtigte Netzladung`,kpiWallbox:`Wallbox {when}`,kpiWallboxSub:`geladene Energie`,kpiFeedLimit:`Einspeisebegrenzung`,kpiFeedLimitSub:`{n} Eingriffe · {dc} kWh DC-Abregelung`,kpiCost:`Stromkosten {when}`,kpiCostSub:`netto nach Einspeisung`,kpiSaving:`PV-Ersparnis {when}`,kpiSavingSub:`gegenüber reinem Netzbezug`,kpiSimDynamic:`Simulation dynamisch {v} €`,kpiSimCostlier:`{v} € teurer`,kpiSimCheaper:`{v} € günstiger`,kpiSimMoreSaving:`{v} € mehr Ersparnis`,kpiSimLessSaving:`{v} € weniger Ersparnis`,kpiSimPending:`Vergleich ab Mitternacht`,kpiSelf:`Eigenverbrauch {when}`,kpiSelfSub:`Netzbezug {imp} kWh · Einspeisung {feed} kWh`,kpiBattery:`Akku {when}`,kpiBatterySub:`geladen · {out} kWh entladen`,chartTitle:`SoC-Trajektorie & Leistungen · nächste 24 h`,chartTitlePlan:`SoC laut Preisplan & Leistungen · nächste 24 h`,legendSoc:`SoC`,legendPv:`PV`,legendHouse:`Haus`,legendImport:`Netzbezug`,legendFeed:`Einspeisung`,legendActual:`Ist`,actualOverlay:`Ist-Verlauf`,now:`Jetzt`,targetLabel:`Ziel-SoC {v}%`,hoursShort:`{h} h`,statMinMax:`SoC Min / Max`,statImport:`Netzbezug`,statFeed:`Einspeisung`,statAutarky:`Autarkie`,statPvTomorrow:`PV morgen`,statP10:`PV-Rest (P10)`,statDeficit:`Defizit morgen`,statYield:`PV-Tag`,statYieldSub:`{today} / {ref} kWh Referenz`,qualityLabel:`Datenqualität`,qualityOk:`vollständig`,qualityPv:`PV-Profil fehlt`,qualityConsumption:`Verbrauchsprofil fehlt`,qualityBoth:`Profile fehlen`,qualityUnknown:`unbekannt`,reserveTitle:`Ziel-SoC`,reserveSeasonal:`Notstromreserve`,reserveAdaptive:`Reserve adaptiv`,reserveHt:`HT-Reserve`,reserveForward:`Vorausschau`,windowsTitle:`Ladefenster`,windowAstro:`Astro-Start`,windowSeasonalEnd:`Saison-Ende`,windowPvDelay:`PV-Verzögerung`,windowTomorrow:`Morgen`,autoTitle:`Auto-Strategie`,autoSaving:`Geschätzte Einsparung`,autoOff:`Aus`,autoOn:`{goal} · {eur}`,autoPending:`{goal} · noch kein Lauf`,autoData:`{goal} · zu wenig Verlauf`,autoCap:`Morgenkappe an, bis {soc} %, bis {hour} Uhr.`,autoLiveHint:`Auto stellt nur die Morgenkappe ein. Die Zahl ist die prognostizierte Ersparnis der nächsten 24 Stunden gegenüber deiner Einstellung, kein bereits gespartes Geld.`,alertUnreachable:`E3DC ist nicht erreichbar`,alertChargeLock:`Ladesperre aktiv`,alertDischargeLock:`Entladesperre aktiv`,alertUnjustified:`Netzladung ohne Rechtfertigung`,alertReserveCharge:`Netzladung wegen Notstromreserve`,alertEmergencyCharge:`Netzladung wegen Notladung`,alertDismiss:`Bestätigen`,alertBannerShow:`Alarm-Banner`,alertBannerShowHint:`Kurze Hinweise oben. Dieselben Infos stehen als Chips unter dem Energiefluss.`,noForecast:`Noch keine Prognose verfügbar. Maestro braucht mindestens 7 Tage Verlauf.`,priceTitle:`Strompreis & geplanter SoC`,legendCharge:`Netzladung`,legendHold:`Akku halten`,legendRelease:`Akku frei`,legendPlanSoc:`SoC geplant`,planShadow:`Schattenmodus · steuert nicht`,planActive:`Aktiv · steuert den Akku`,planTitle:`Plan`,planStrategy:`Netzladung`,planGridCharge:`Netzladung geplant`,planSaving:`Erwartete Ersparnis`,planCheapest:`Günstigster Slot`,planMostExpensive:`Teuerster Slot`,planKnownUntil:`Preise bekannt bis`,planDiag:`Rechenwerte`,planBudget:`Restbudget`,planFloor:`Boden`,planCeiling:`Obergrenze`,planEfficiency:`Wirkungsgrad`,planMinSpread:`Mindestspanne`,planWear:`Verschleiß`,planSafety:`Verbrauchs-Sicherheitsfaktor`,noPlan:`Es liegt kein Preisplan vor. Er braucht einen dynamischen Tarif.`,noPlanOff:`Bei Strategie „Aus“ gibt es keinen Preisplan-Chart. Maestro lädt den Akku nicht aus dem Netz.`,noPlanSlots:`Bei Zeitfenster (HT/NT) gibt es keinen Preisplan-Chart. Die Ladezeiten kommen aus den Tarif-Slots der Klasse „Niedrig“.`,noPlanThreshold:`Bei „unter Preisschwelle“ gibt es keinen Preisplan-Chart. Maestro lädt, sobald der Preis unter der Schwelle liegt — die Zeiten stehen nicht als Plan-Kurve.`,planComputing:`Preisplan wird berechnet…`,noPlanPrices:`Kein Preisplan: Es fehlt eine gültige Preiskurve. Prüfe den Preis-Sensor.`,noPlanProfile:`Kein Preisplan: Noch keine Verbrauchsstatistik.`,noPlanRoom:`Kein Preisplan: Zwischen Ladeschwelle/Reserve und Ziel-SoC bleibt kein Spielraum.`,planTune:`Netzladung einstellen`,planTuneHint:`Dieselben Einstellungen wie unter Einstellungen › Netz und Tarif.`,slotPrice:`Preis`,slotSoc:`SoC`,slotConsumption:`Verbrauch`,slotCharge:`Netzladung {kwh} kWh`,slotHold:`Akku halten`,slotRelease:`Akku frei`,decisionPhase:`Aktuelle Regelphase`,tagTargetSoc:`Ziel-SoC {v} %`,tagTargetPower:`Ziel-Ladeleistung {v}`,tagBatteryPriority:`Akku-Priorität`,tagSince:`seit {t}`,limitsTitle:`Limits · Soll vs. gesendet`,limitsSub:`Was Maestro will und was am E3DC ankommt`,limitCharge:`Ladelimit`,limitDischarge:`Entladelimit`,limitTarget:`Soll {a} · gesendet {b}`,limitNone:`kein Limit`,entitiesMissing:`Nicht verfügbar: {list}. Diese Maestro-Entities fehlen oder sind deaktiviert – bitte unter Einstellungen › Entitäten prüfen.`,entityDisabled:`deaktiviert`,notSetUp:`E3DC Maestro ist nicht eingerichtet oder noch nicht gestartet.`,limitSoc:`aktuell {a} % → {b} %`,timelineTitle:`Verlauf der Entscheidungen`,timelineEmpty:`Noch keine Entscheidungen aufgezeichnet.`,noDecision:`Noch keine Entscheidung vorhanden.`,controlsTitle:`Schnellsteuerung`,controlsSub:`Wirkt sofort auf die Regelung`,close:`Schließen`,historySub:`Letzte 24 Stunden`,historyEmpty:`Keine Verlaufsdaten in den letzten 24 Stunden.`,historyFailed:`Der Verlauf konnte nicht geladen werden.`,ctrlActive:`Regelung aktiv`,ctrlActiveSub:`Maestro steuert die Lade- und Entladelimits`,ctrlPredictive:`Vorausschauende Ladung`,ctrlPredictiveSub:`Ladeziel aus Prognose und Verbrauch`,ctrlPvDelay:`PV-Prognose-Verzögerung`,ctrlPvDelaySub:`Ladestart verschieben, wenn PV reicht`,ctrlPlanControls:`Preisplan steuert Akku`,ctrlPlanControlsSub:`Aus = nur Schattenmodus`,ctrlPlanShadow:`Preisplan Schattenmodus`,ctrlPlanShadowSub:`Plan berechnen, aber nichts senden`,ctrlForce:`Erzwungene Entladung`,ctrlForcePower:`Leistung {v}`,allSettings:`Alle Einstellungen öffnen →`,displayTitle:`Anzeige`,consumersSub:`Verbraucher im Energiefluss. Gilt für jedes Gerät, das dieses Cockpit öffnet.`,addConsumer:`Verbraucher hinzufügen`,consumerSearch:`Leistungssensor suchen`,consumerName:`Name im Energiefluss`,consumerIcon:`Symbol`,iconWallbox:`Wallbox`,iconHeater:`Heizstab`,iconClimate:`Klimaanlage`,iconHeatpump:`Wärmepumpe`,iconMeter:`Leistungsmesser`,modeIncluded:`Im Hausverbrauch`,modeSeparate:`Separat gemessen`,useWallbox:`Wallbox übernehmen`,removeConsumer:`Entfernen`,editConsumers:`Verbraucher bearbeiten`,consumersEmpty:`Noch keine Verbraucher. Wallbox, Wärmepumpe und weitere Lasten kannst du hier ergänzen.`,consumersOverflow:`Die enthaltenen Verbraucher liegen über der Hausleistung. Prüfe, ob sie wirklich im Hauszähler stecken.`,noPowerSensors:`Keine passenden Leistungssensoren gefunden.`,consumerMissing:`Sensor nicht verfügbar`,unavailable:`nicht verfügbar`,callFailed:`Aktion fehlgeschlagen: {err}`,chartError:`Chart konnte nicht geladen werden: {err}`,loading:`Lädt …`,demoHint:`Keine Daten`,setHardware:`Anlage`,setHardwareHint:`Anlagendaten, mit denen Maestro Leistungen und Grenzen rechnet.`,setCorridor:`Ziel-SoC und Ladekorridor`,setCorridorHint:`Wohin der Akku am Tag soll: Schwelle, Korridor, Ladeende und harte Deckel.`,setWindows:`Vorausschau und Zeitfenster`,setWindowsHint:`Wann geladen wird: Prognose, Sonne, Morgen-Deckel und Verteilung über den Tag.`,setYield:`Wenig PV und Abregelung`,setYieldHint:`Akku vor Einspeisung füllen, Abregelung abfangen und spät nachladen.`,setTariff:`Netz und Tarif`,setTariffHint:`Netzladung, Hochtarif, Preise und Tarif-Slots.`,setReserve:`Hochtarif und Reserve`,setReserveHint:`HT-Fenster und Notstromreserve. Lookback der adaptiven Reserve bleibt unter Integration konfigurieren.`,setFlex:`Wallbox, Wärmepumpe, Vorentladung`,setFlexHint:`Zusätzliche Lasten und das morgendliche Entladen vor dem Ladestart.`,setControl:`Steuerverhalten`,setControlHint:`Hauptschalter, erzwungene Entladung und wie ruhig die Regelung nachregelt.`,setDiag:`Diagnose und Aktionen`,setDiagHint:`Debug-Protokoll und einmalige Aktionen.`,setPlant:`Anlage`,setPlantHint:`Wechselrichter, PV-Leistung und die Grenzen, mit denen Maestro rechnet.`,setSafety:`Schutz`,setSafetyHint:`Notladung, Notstromreserve, Akku-Deckel und Watchdog.`,setPv:`PV-Laden`,setPvHint:`Tagesziel und Zeitfenster. Ladeleistung und Sonderfälle liegen darunter.`,setLoads:`Verbraucher`,setLoadsHint:`Wallbox, EVCC, Wärmepumpe und das morgendliche Entladen vor dem Ladestart.`,setAuto:`Automatik`,setAutoHint:`Maestro sucht einmal am Tag eine bessere Einstellung für Morning-Cap und Schonladung.`,setSystem:`System`,setSystemHint:`Hauptschalter, erzwungene Entladung, Regeltempo und Diagnose.`,secPlantPower:`Leistung und Grenzen`,secPlantPowerHint:`Nennwerte der Anlage.`,secEmergency:`Notladung`,secEmergencyHint:`Unter dieser Schwelle lädt Maestro sofort aus dem Netz. 0 schaltet die Notladung aus.`,secReserve:`Notstromreserve`,secReserveHint:`Eine feste Reserve ersetzt die saisonale und die adaptive.`,secHard:`Akku-Deckel`,secHardHint:`Oberhalb dieses SoC stoppt die Ladung. Der Abregelschutz darf den Deckel übersteuern.`,secWatchdog:`Watchdog`,secWatchdogHint:`Nach dieser Zeit ohne Kontakt gibt Maestro die Limits frei.`,secStrategy:`Netzladung`,secStrategyHint:`Ob und wie Maestro den Akku aus dem Netz lädt. Die Strategie setzt alle nötigen Schalter selbst.`,secLimits:`Grenzen`,secLimitsHint:`Wie viel und bis zu welchem Ladestand aus dem Netz geladen wird.`,secPlanTune:`Feinabstimmung Preisplan`,secPlanTuneHint:`Nur bei „Dynamisch: Experte“. „Automatisch“ rechnet mit festen Werten.`,secCosts:`Kosten & Auswertung`,secCostsHint:`Diese Werte steuern nicht, wann geladen wird. Sie fließen in Kosten, Erlös und Verschleiß der Statistik ein. Der Preisplan nutzt zusätzlich den Einspeisepreis, im Modus Experte auch den Verschleiß.`,secSwitches:`Einzelschalter`,secSwitchesHint:`Die Schalter hinter der Strategie. Wer sie einzeln ändert, ändert damit auch die angezeigte Strategie.`,expertView:`Expertenansicht`,expertViewHint:`Zeigt zusätzliche Optionen und die Einzelschalter. Gilt nur für diesen Browser.`,sumOff:`Maestro lädt den Akku nie aus dem Netz, nur aus PV.`,sumSlots:`Maestro lädt in den Zeitfenstern der Klasse „Niedrig“ aus dem Netz bis {soc} %, höchstens {kwh} kWh pro Tag. Die Fenster legen Sie unten unter Tarif-Slots an.`,sumSlotsNone:`Es gibt noch kein Zeitfenster der Klasse „Niedrig“. Ohne ein solches Fenster lädt Maestro nicht aus dem Netz.`,sumThreshold:`Maestro lädt aus dem Netz, sobald der Preis höchstens {price} €/kWh beträgt, bis {soc} %, höchstens {kwh} kWh pro Tag.`,sumPlan:`Maestro sucht aus der Preiskurve die günstigsten Stunden. Er rechnet mit der Prognose für Verbrauch und PV und lädt nur so viel, wie bis zur nächsten günstigen Phase fehlt, bis {soc} %, höchstens {kwh} kWh pro Tag.`,sumAuto:`Wirkungsgrad, Mindestspanne und Sicherheitsfaktor sind fest eingestellt. Der Akku-Verschleiß zählt nicht.`,sumExpert:`Der Plan rechnet mit Ihren Werten für Wirkungsgrad, Mindestspanne, Sicherheitsfaktor und Akku-Verschleiß.`,sumShadow:`Schattenmodus: Der Plan wird nur berechnet und angezeigt. Damit er den Akku steuert, „Preisplan steuert Akku“ einschalten.`,sumActive:`Der Plan steuert den Akku.`,sumNoPrice:`Es ist kein Preis-Sensor hinterlegt. Ohne Preise lädt diese Strategie nicht.`,selStrategy:`Netzladung`,secHt:`Hochtarif`,secHtHint:`Im HT-Fenster hält Maestro eine Mindestreserve.`,secCorridor:`Tagesziel`,secCorridorHint:`SoC bis zum Ladeende. Das spätere Ziel gilt nur mit dem Schalter.`,secWindows:`Zeitfenster`,secWindowsHint:`Mit Astro folgen Start und Ende der Sonne. Sonst liegen Winter- und Sommer-Ladeende fest.`,secShape:`Ladeleistung`,secShapeHint:`Wie stark geladen wird. Ausgegraute Werte gelten erst, wenn ihr Schalter an ist. Der Korridor ist eine Leistung in Watt.`,secYield:`Wenn der Tag anders läuft`,secYieldHint:`Prognose, schwacher Tag und Abregelung. Schwellen und Referenzen stehen in der Expertenansicht.`,sumTarget:`Bis zum Ladeende auf {soc} %.`,sumTargetLate:`Bis zum Ladeende auf {soc} %, ab {hour} Uhr auf {late} %.`,sumWindowAstro:`Ladestart {start} h nach Sonnenaufgang, Ladeende {end} h vor Sonnenuntergang.`,sumWindowHours:`Ladeende im Winter um {winter} Uhr, im Sommer um {summer} Uhr.`,sumWindowCap:`Morgens höchstens {soc} % bis {hour} Uhr.`,sumPowerAuto:`Automatisch: die Leistung folgt dem Weg zum Tagesziel.`,sumPowerFloor:`Unter {soc} % volle Leistung.`,sumPowerSpread:`Verteilt bis {soc} %.`,sumPowerGentle:`Begrenzt auf Faktor {factor}.`,sumPowerCorridor:`Korridor {low}–{high} W.`,sumPowerPause:`Pause unter {low} W.`,sumPvNone:`Keine Sonderregel. Es gilt das Tagesziel.`,sumPvForecast:`Die Prognose darf die Ladung verzögern.`,sumPvForward:`Vorausschau bis {soc} %.`,sumPvLow:`An schwachen Tagen wird früher geladen.`,sumPvCurtail:`Abregelung wird abgefangen.`,secWallbox:`Wallbox`,secWallboxHint:`Überschussladen und Netzschutz, solange das Auto Leistung zieht.`,secEvcc:`EVCC`,secEvccHint:`Sperrt die Akku-Entladung, während das Auto sofort lädt.`,secHp:`Wärmepumpe`,secHpHint:`Überschuss und Preisgrenze.`,secMorning:`Morgen-Vorentladung`,secMorningHint:`Akku vor dem Ladestart absenken, damit PV-Überschuss hineinpasst.`,secAuto:`Ziel`,secAutoHint:`Die gefundene Strategie steht auf der Entscheidungsseite.`,secRun:`Betrieb`,secRunHint:`Dieselben Schalter liegen im Schnellmenü.`,secPace:`Tempo`,secPaceHint:`Wie oft geregelt wird und wie stark sich die Ladeleistung pro Takt ändern darf.`,secDiag:`Diagnose`,secDiagHint:`Debug-Protokoll und einmalige Aktionen.`,ladderTitle:`Regelungsleiter`,ladderHint:`Maestro prüft von oben nach unten und nimmt die erste passende Regel. Die aktive Regel ist markiert.`,ladderBandSafety:`Sicherheit`,ladderBandTariff:`Netz und Tarif`,ladderBandBlocks:`Ladesperren`,ladderBandPv:`PV-Laden`,ladderBandRest:`Danach`,ladderOff:`Regelung aus`,ladderForce:`Entladung erzwungen`,ladderEmergency:`Notladung`,ladderFeed:`Einspeisegrenze`,ladderReserve:`Notstromreserve`,ladderEvcc:`EVCC Sofortladen`,ladderPrice:`Preisplan`,ladderHt:`Hochtarif`,ladderHold:`Günstigen Slot halten`,ladderMorning:`Morgen-Vorentladung`,ladderCap:`Morning-Cap`,ladderAstro:`Warten auf Sonne`,ladderHard:`Akku-Deckel`,ladderFloor:`Schnelllade-Boden`,ladderLow:`Schwacher PV-Tag`,ladderGrid:`Netzladung im Slot`,ladderCorridor:`Korridor und PV-Verzögerung`,ladderSpread:`Ladeverteilung`,ladderCurtail:`Abregelschutz`,ladderIdle:`Leerlauf`,confirmReset:`Tagesstatistik auf 0 setzen?`,settingsPending:`Einstellungen werden geladen …`,settingsBack:`Alle Bereiche`,setClassic:`Classic-Dashboard`,setClassicHint:`Mit einem Klick anlegen`,classicLead:`Das Classic-Dashboard ist die Lovelace-Ansicht mit allen Tabs, auch Auto-Optimierung, Sizing-Berater und Hilfe. Maestro legt es hier direkt an.`,classicDepsTitle:`Benötigte Karten`,classicDepMushroom:`Mushroom Cards`,classicDepApex:`ApexCharts Card`,classicDepVia:`HACS → Frontend`,classicInstalled:`installiert`,classicMissing:`fehlt – über HACS → Frontend installieren`,classicDepsMissing:`Ohne diese Karten zeigt das Dashboard Fehlerkacheln. Erst installieren, dann den Browser neu laden.`,classicActionTitle:`Dashboard`,classicChecking:`Prüfe, ob das Dashboard schon angelegt ist …`,classicCreate:`Dashboard anlegen`,classicSetup:`Inhalt einrichten`,classicCreating:`Wird angelegt …`,classicReady:`Das Dashboard E3DC Maestro ist angelegt und steht in der Seitenleiste.`,classicEmpty:`Unter dem Pfad e3dc-maestro gibt es ein leeres Dashboard. Maestro richtet den Inhalt dort ein.`,classicForeign:`Unter dem Pfad e3dc-maestro liegt schon ein Dashboard mit anderem Inhalt. Maestro überschreibt es nicht. Zum Neuanlegen dieses Dashboard unter Einstellungen → Dashboards löschen.`,classicAdminOnly:`Anlegen können nur Administratoren.`,classicFailed:`Das hat nicht geklappt: {err}`,classicRetry:`Erneut prüfen`,classicManual:`Manuell anlegen`,classicHa:`Der Eintrag unter Community dashboards erscheint ab Home Assistant 2026.5. In älteren Versionen das Dashboard leer anlegen (Titel E3DC Maestro, Pfad e3dc-maestro) und den Inhalt von maestro_dashboard.yaml im YAML-Editor einfügen.`,classicStep1:`Integration E3DC Maestro einrichten. Läuft sie schon, Home Assistant einmal neu starten.`,classicStep2:`Den Browser hart neu laden, damit das Dashboard-Modul geladen ist.`,classicStep3:`Einstellungen → Dashboards → Dashboard hinzufügen.`,classicStep4:`Unter Community dashboards E3DC Maestro wählen.`,classicStep5:`Titel E3DC Maestro und das vorgeschlagene Icon bestätigen, dann anlegen.`,classicPath:`Der Pfad muss e3dc-maestro bleiben. Den vorgeschlagenen Titel nicht umbenennen, bevor der Slug feststeht. Sonst zeigen die Hilfe-Links ins Leere.`,classicAfter:`Das Dashboard baut sich bei jedem Öffnen aus der aktuellen Maestro-Vorlage auf. Updates kommen damit automatisch an, solange du es nicht im Editor übernimmst.`,classicTimeout:`Kommt „Timeout waiting for strategy element ll-strategy-dashboard-e3dc-maestro“: Home Assistant neu starten, den Browser hart neu laden und unter Einstellungen → Dashboards → Ressourcen prüfen, ob ganz oben /local/e3dc_maestro/e3dc-maestro-strategy.js als JavaScript-Modul steht (direkt nach dem ersten Einrichten noch /e3dc_maestro/frontend/e3dc-maestro-strategy.js).`,classicOpen:`Dashboard öffnen`,setLook:`Darstellung`,setLookHint:`Wähle den Look, der sich für dich richtig anfühlt.`,themeDark:`Dunkel`,themeDarkHint:`Ruhig am Abend. Die Energieflüsse leuchten auf dunklem Grund.`,themeClassic:`Classic`,themeClassicHint:`Hell und klar, angenehm zum Lesen am Tag.`,themeE3dc:`myE3DC`,themeE3dcHint:`Der vertraute myE3DC-Look.`,plantEmpty:`Keine Daten der E3DC-Integration. Sobald E3DC RSCP eingerichtet ist, stehen hier Betriebszustand, Speicher und Phasen.`,plantOperation:`Betrieb`,plantStorage:`Speicher`,plantPhases:`Phasen`,plantWallbox:`Wallbox`,plantRoomGrid:`Netz`,plantRoomGridHint:`Haus- und Netzphasen, zusätzlicher Verbrauch.`,plantRoomBattery:`Akku`,plantRoomBatteryHint:`Packs, Zellzustand und Ladegrenzen.`,plantRoomPv:`PV`,plantRoomPvHint:`Wechselrichter, Leistung und Einspeisegrenze.`,plantRoomWallbox:`Wallbox`,plantRoomWallboxHint:`Ladestatus und schaltbare Wallbox-Einstellungen.`,plantRoomControls:`Einstellungen`,plantRoomControlsHint:`Werte, die der E3DC über RSCP annimmt.`,plantCells:`Zellzustand`,plantCell:`Modul`,plantSend:`Diese Einstellung an den E3DC senden?`,plantModel:`Modell`,plantSerial:`Seriennummer`,plantFirmware:`Firmware`,plantFault:`Aktuelle Meldung`,plantPack:`Speicher`,plantMode:`Modus`,plantAutarky:`Autarkie`,plantSelf:`Eigenverbrauch`,plantPower:`Sollleistung`,plantLimits:`Leistungsgrenzen`,plantLimitCharge:`Max. Ladung`,plantLimitDischarge:`Max. Entladung`,plantLimitMin:`Mindestentladung`,plantManual:`Manuelle Netzladung`,plantManualEnergy:`Dabei geladen`,plantDerated:`PV abgeregelt`,plantEmergency:`Notstrom`,plantReserveHit:`Notstromreserve erreicht`,plantReserveOn:`Notstromreserve`,plantWeather:`Wetterregelung`,plantWeatherWait:`Warten auf Wetterdurchbruch`,plantOn:`an`,plantOff:`aus`,plantMode0:`Normal`,plantMode1:`Leerlauf`,plantMode2:`Entladen`,plantMode3:`Laden`,plantMode4:`Netzladung`,plantSoh:`State of Health`,plantCycles:`Zyklen`,plantEnergy:`Nutzbare Restenergie`,plantShare:`Anteil an der Anlagenkapazität`,plantCurrent:`Strom`,plantVoltage:`Spannung`,plantTemp:`Zelltemperatur`,plantHouse:`Haus`,plantGrid:`Netz`,plantInverter:`Wechselrichter`,plantPeak:`Installierte PV-Leistung`,plantCapacity:`Batteriekapazität`,plantAc:`Max. AC-Leistung`,plantSysCharge:`Max. Systemladung`,plantSysDischarge:`Max. Systementladung`,plantDeratePct:`Einspeisegrenze`,plantDeratePower:`Einspeisegrenze Leistung`,plantExtraPv:`Zusätzliche Erzeugung`,plantExtraUse:`Zusätzlicher Verbrauch`,plantPlug:`Stecker`,plantCharging:`Laden`,plantPhaseCount:`Phasen`,plantSun:`Solaranteil`,plantNet:`Netzanteil`,plantCarSoc:`Fahrzeug-SoC`,plantMaxCurrent:`Max. Ladestrom`,secSources:`Quellen`,secSourcesHint:`Sensoren für SoC, Leistung und Tageszähler. Ein Wechsel lädt die Integration neu.`,secAdaptive:`Adaptive Reserve`,secAdaptiveHint:`Wie weit Maestro zurückschaut und wie hoch die Reserve steigen darf.`,secPriceSensor:`Preis-Sensor`,secPriceSensorHint:`Aktueller Bezugspreis für den dynamischen Tarif.`,secSlots:`Tarif-Slots`,secSlotsHint:`Wiederkehrende Fenster. Montag ist der erste Tag.`,secForecastSensors:`Prognose-Sensoren`,secForecastSensorsHint:`Rest heute, Tagessumme, morgen und übermorgen.`,secWallboxWire:`Wallbox-Anbindung`,secWallboxWireHint:`Leistungssensor, Phasen und die Dienste zum Schalten.`,secEvccWire:`EVCC`,secEvccWireHint:`Welche Entität das Laden meldet und welcher Wert Sofortladen heißt.`,secHpWire:`Wärmepumpe`,secHpWireHint:`Schalter, Dienste und das Zeitfenster, in dem sie laufen darf.`,secSizingInputs:`Zähler`,secSizingInputsHint:`Energiezähler und der Zeitraum der Rechnung. Ein Sensorwechsel lädt die Integration neu.`,setSizingTile:`Mehr Akku oder PV?`,setSizingTileHint:`Was sich an Zubau rechnet`,setSetup:`Einrichtung`,setSetupHint:`Was die Regelung zum Arbeiten braucht`,setupTitle:`Erste Schritte`,setupLead:`Diese Punkte braucht Maestro, damit die Regelung dein Haus steuert.`,setupProgress:`{done} von {total} Pflichtschritten erledigt`,setupDone:`Einrichtung vollständig`,setupDoneHint:`Alle Pflichtschritte sind erledigt. Die Liste bleibt unter Einstellungen.`,setupAck:`Verstanden`,setupOpen:`Öffnen`,setupStatusDone:`erledigt`,setupStatusTodo:`fehlt`,setupStatusOptional:`optional`,setupStatusWait:`wird gelesen`,setupOptionsError:`Die Einstellungen konnten nicht gelesen werden: {err}`,setupPlant:`Anlage verbunden`,setupPlantHint:`SoC, PV, Netz, Haus und Akku brauchen je einen Sensor, der Werte liefert.`,setupPlantOk:`Alle Pflichsensoren liefern Werte.`,setupPlantMissing:`Noch ohne Wert: {names}.`,setupTariff:`Tarif`,setupTariffHint:`Fester Preis, Preis-Sensor oder Zeitfenster. Ohne Preis kann Maestro nicht nach Preis laden.`,setupTariffOk:`Ein Preis oder Zeitfenster ist hinterlegt.`,setupTariffMissing:`Beim dynamischen Tarif fehlt der Preis-Sensor, beim festen der Bezugspreis.`,setupForecast:`PV-Prognose`,setupForecastHint:`Empfohlen, damit Maestro das Laden an den erwarteten Ertrag anpasst.`,setupForecastOk:`Ein Prognose-Sensor ist gewählt.`,setupForecastOpen:`Noch keiner gewählt. Die Regelung läuft auch ohne, nur ohne Vorausschau.`,setupSafety:`Notstromreserve`,setupSafetyHint:`Kein Muss. Sinnvoll, damit der Akku eine Reserve behält.`,setupSafetyOk:`Eine Reserve ist eingeschaltet.`,setupSafetyOpen:`Noch keine Reserve aktiv. Fest, saisonal oder adaptiv stellst du unter Sicherheit ein.`,setupLoads:`Verbraucher`,setupLoadsHint:`Optional, wenn Maestro Wallbox, Wärmepumpe oder EVCC mitregeln soll.`,setupLoadsOk:`Mindestens ein Verbraucher ist angebunden.`,setupLoadsOpen:`Keiner angebunden. Nur nötig, wenn Maestro einen Verbraucher steuern soll.`,setupRegulation:`Regelung einschalten`,setupRegulationHint:`Solange sie aus ist, beobachtet Maestro nur und schickt keine Limits.`,setupRegulationOk:`Maestro regelt.`,setupRegulationOff:`Die Regelung ist aus.`,setupRun:`Erste Entscheidung`,setupRunHint:`Maestro hat mindestens einmal gerechnet und sagt, warum.`,setupRunOk:`Es gibt eine Entscheidung.`,setupRunOff:`Schalte die Regelung ein. Danach erscheint hier die Entscheidung.`,setupRunWait:`Die Regelung ist an. Die erste Entscheidung kommt mit dem nächsten Lauf.`,setSizing:`Lohnt sich der Zubau?`,setSizingHint:`Wie viel Zubau sich mit deinem Verbrauch rechnet`,sizingLead:`Hier prüfst du, ob ein größerer Akku oder mehr PV sich für dein Haus lohnt. Du gibst an, wie viel du dazubauen willst. Maestro rechnet aus deinem bisherigen Verbrauch, was das an Autarkie, Kosten und Amortisation ändert.`,sizingAdd:`Dein Zubau`,sizingAddHint:`Zusätzlicher Akku in kWh und zusätzliche PV in kWp, auf dem, was schon steht. 0 heißt: nichts dazukaufen.`,sizingRun:`Aus deiner Historie rechnen`,sizingScenario:`Für diesen Zubau`,sizingNeedRun:`Stell den Zubau ein und starte die Rechnung. Danach steht hier, was er bringt.`,sizingChartAvoided:`Vermiedener Netzbezug`,sizingChartBaseline:`Bisheriger Netzbezug`,sizingChartCaption:`Fläche: vermiedener Netzbezug. Linie: bisheriger Netzbezug.`,sizingStory:`{bat} kWh Akku und {pv} kWp PV: etwa {aut} % Autarkie, {save} € im Jahr, amortisiert in {years} Jahren.`,sizingStoryOpen:`{bat} kWh Akku und {pv} kWp PV: etwa {aut} % Autarkie und {save} € im Jahr. Eine Amortisation lässt sich daraus nicht ableiten.`,sizingBasis:`Grundlagen`,sizingBasisHint:`Preise, mit denen Investition und Amortisation gerechnet werden.`,sizingRecsHint:`Wirtschaftlich sucht die kürzeste Amortisation, technisch die höchste Autarkie, ausgewogen den Kompromiss.`,sizingRecs:`Drei Vorschläge`,recEconomicHint:`Kürzeste Amortisation`,recTechnicalHint:`Höchste Autarkie`,recBalancedHint:`Kompromiss aus beidem`,sizingBattery:`Akku`,sizingPv:`PV-Zubau`,sizingAutarky:`Autarkie`,sizingAvoided:`Vermiedener Netzbezug`,sizingSavings:`Ersparnis im Jahr`,sizingInvestment:`Investition`,sizingPayback:`Amortisation`,sizingInverter:`Wechselrichter-Upgrade`,sizingBaseline:`Netzbezug heute hochgerechnet`,sizingNotRun:`Noch nicht gerechnet`,sizingRunning:`Rechnet …`,sizingReady:`Fertig`,recEconomic:`Wirtschaftlich`,recTechnical:`Technisch`,recBalanced:`Ausgewogen`,matrixDays:`Analysetage`,matrixRecords:`Stundenwerte`,matrixAnomaly:`Anomalien`,optReload:`Gespeichert. Die Integration lädt neu, damit die neuen Sensoren gelten.`,optSaved:`Gespeichert. Der Wert gilt sofort.`,optAdmin:`Nur Admins können diese Werte ändern.`,optClear:`Leeren`,optSearch:`Entität suchen`,optService:`Dienst, zum Beispiel switch.turn_on`,optTarget:`Ziel-Entität`,optWeekdays:`Wochentage`,optFrom:`Von`,optTo:`Bis`,optClass:`Klasse`,optReserve:`Mindest-Reserve %`,optAddSlot:`Slot hinzufügen`,optRemove:`Entfernen`,optSaveSlots:`Slots speichern`,optYes:`Ja`,optNo:`Nein`,classHigh:`Hoch`,classLow:`Niedrig`,classNormal:`Normal`,wd0:`Mo`,wd1:`Di`,wd2:`Mi`,wd3:`Do`,wd4:`Fr`,wd5:`Sa`,wd6:`So`,targetPower:`Ziel-Ladeleistung`,autoObjective:`Ziel`,autoLastRun:`Letzter Lauf`,autoFallback:`Daten-Fallback`,autoReason:`Grund`,autoOverrides:`Anpassungen`,autoNone:`Keine Anpassung. Die bisherige Einstellung war bereits die beste.`,autoGrid:`Raster`,autoDeltaDraw:`Netzbezug gegenüber Basis`,autoDeltaFeed:`Einspeisung gegenüber Basis`,autoDeltaCurtail:`Abregelung gegenüber Basis`,autoDeltaSelf:`Autarkie gegenüber Basis`,...ki},Mi={navLive:`Live`,navForecast:`Forecast`,navPlan:`Price plan`,navDecision:`Decision`,navSettings:`Settings`,navPlant:`System`,settingHelp:`Help`,navControls:`Controls`,menu:`Menu`,subLive:`Energy flow and battery in real time`,factRest:`PV forecast remaining today`,factTomorrow:`Tomorrow`,factDayAfter:`Day after`,subForecast:`What Maestro expects for the next 24 hours`,subPlan:`Grid charging by dynamic tariff`,subDecision:`Why Maestro regulates the way it does`,subSettings:`From the plant through safety and tariff to PV charging`,subPlant:`Operating state, storage and phases from the E3DC`,regulationOn:`Regulation active`,regulationOff:`Regulation off`,pauseTitle:`How long off?`,pauseHint:`Maestro stays off for this long and turns itself back on. The countdown survives a restart.`,pauseOffTitle:`Regulation`,pauseOffHint:`Turn it back on, or leave it off for a fixed time.`,pauseResume:`Turn back on`,pauseOneHour:`1 hour`,pauseHours:`{h} hours`,pausePermanent:`Until turned on`,pauseLeftHours:`{h} h {m} min left`,pauseLeftHour:`{h} h left`,pauseLeftMin:`{m} min left`,flowTitle:`Energy flow`,flowSub:`Now · live`,flowDay:`Today`,flowDaySeparate:`Separate`,flowDayImport:`Import`,flowDayFeed:`Feed-in`,flowDayOpen:`Open today`,flowStyleLabel:`Energy flow layout`,flowStyleTitle:`Energy flow`,flowStyleHint:`Nodes, blob or house. The choice applies only in this browser.`,flowStyleNodes:`Nodes`,flowStyleNodesHint:`PV, grid, house and battery around the hub, with glowing particles.`,flowStyleBlob:`Blob`,flowStyleBlobHint:`A soft shape that stretches toward the strongest source or sink.`,flowStyleCity:`House`,flowStyleCityHint:`Modern house: PV canopy, glass facade, battery plinth and utility pole.`,flowCityLoad:`Load`,arrangeConsumers:`Arrange`,arrangeDone:`Done`,arrangeHint:`Drag consumers to place them on the fan.`,arrangeReset:`Reset`,nodePv:`PV`,nodeHouse:`House`,nodeImport:`Grid import`,nodeFeed:`Feed-in`,nodeBatDischarge:`Battery discharging`,nodeBatCharge:`Battery charging`,battery:`Battery`,batteryStyleLabel:`Battery layout`,batteryStyleRing:`Ring`,batteryStylePack:`Pack`,stateOfCharge:`State of charge`,targetSoc:`Target SoC`,autonomy:`Autonomy`,forecastPeak:`Next SoC peak`,forecastPeakToday:`Peak today {v}`,forecastPeakTomorrow:`Peak tomorrow {v}`,forecastNoPeak:`no rise in 24 h`,forecastFloor:`Reserve floor {v}`,forecastFloorReach:`Floor reached {v}`,forecastEmpty:`Empty {v}`,forecastGrid:`Grid import from {v}`,forecastGridUntil:`Grid import until {v}`,forecastGridOngoing:`Grid import ongoing`,forecastNoGrid:`no grid import`,autonomyHint:`at current load`,discharging:`Discharging`,charging:`Charging`,chipReachable:`E3DC reachable`,chipUnreachable:`E3DC unreachable`,chipChargeLock:`Charge lock`,chipDischargeLock:`Discharge lock`,chipHt:`HT protection`,chipCurtail:`Curtailment guard`,chipEmergency:`Emergency charge`,chipFeedIn:`Feed-in curtailment`,chipGridCharge:`Grid charge`,chipReserveCharge:`Backup-reserve grid charge`,chipBatteryPriority:`Battery priority`,chipLowYield:`Low-yield day`,chipPredictive:`Predictive charging`,chipShadow:`Price plan · shadow`,modePredictive:`Looking ahead`,modeShadow:`Price plan in shadow`,groupToday:`Today`,groupWeek:`Week`,groupMonth:`Month`,groupNet:`net`,periodToday:`Today`,periodWeek:`Week`,periodMonth:`Month`,forceTitle:`Forced discharge`,fixedReserve:`Emergency reserve`,controlsPair:`Discharge & reserve`,controlsForceOn:`Forced discharge {v}`,controlsForceOff:`Forced discharge off`,controlsReserveOn:`Emergency reserve {v}%`,controlsReserveOff:`Emergency reserve off`,ctrlReserveSoc:`{v}%`,exportCsv:`CSV`,actionsTitle:`Actions`,btnClear:`Release limits`,btnClearSub:`Clears charge and discharge limits immediately and sets the inverter to normal.`,btnCharge:`Manual charge (3 kWh)`,confirmCharge:`Charge 3 kWh from the grid?`,selWallbox:`Wallbox type`,selMorning:`Pre-discharge`,selAuto:`Auto objective`,selTariff:`Tariff`,debugTitle:`Debug log`,debugEmpty:`No debug lines yet. The switch starts logging.`,debugSwitch:`Debug logging`,balanceTitle:`Daily balance`,balanceWeek:`Weekly balance`,balanceMonth:`Monthly balance`,pulseTitle:`Balance pulse`,pulseCumulative:`Cumulative`,pulseEmpty:`No daily balances in the recorder.`,pulseClickDay:`Tap to select that day in the balance.`,dayPrev:`Previous day`,dayNext:`Next day`,dayPick:`Choose day`,dayNav:`Day selection`,whenToday:`today`,whenWeek:`this week`,whenMonth:`this month`,kpiCostGross:`Electricity cost`,kpiCostGrossSub:`grid import, gross`,kpiRevenue:`Feed-in revenue`,kpiRevenueSub:`remuneration {when}`,kpiWear:`Battery wear`,kpiWearSub:`share of cycle cost`,kpiBalance:`Energy balance`,kpiBalanceSub:`revenue + savings − cost − wear`,kpiGridBat:`Grid → battery`,kpiGridBatSub:`charged from the grid`,kpiGridBatWarn:`Grid charge without justification`,kpiGridBatReserve:`due to backup reserve`,kpiGridBatEmergency:`due to emergency charge`,kpiGridBatJustified:`justified grid charge`,kpiWallbox:`Wallbox {when}`,kpiWallboxSub:`energy charged`,kpiFeedLimit:`Feed-in limit`,kpiFeedLimitSub:`{n} interventions · {dc} kWh DC curtailment`,kpiCost:`Electricity cost {when}`,kpiCostSub:`net of feed-in`,kpiSaving:`PV savings {when}`,kpiSavingSub:`vs. grid-only supply`,kpiSimDynamic:`Simulation dynamic {v} €`,kpiSimCostlier:`{v} € more expensive`,kpiSimCheaper:`{v} € cheaper`,kpiSimMoreSaving:`{v} € more savings`,kpiSimLessSaving:`{v} € less savings`,kpiSimPending:`Compare from midnight`,kpiSelf:`Self-consumption {when}`,kpiSelfSub:`Import {imp} kWh · feed-in {feed} kWh`,kpiBattery:`Battery {when}`,kpiBatterySub:`charged · {out} kWh discharged`,chartTitle:`SoC trajectory & power · next 24 h`,chartTitlePlan:`SoC from price plan & power · next 24 h`,legendSoc:`SoC`,legendPv:`PV`,legendHouse:`House`,legendImport:`Import`,legendFeed:`Feed-in`,legendActual:`Actual`,actualOverlay:`Actuals`,now:`Now`,targetLabel:`Target SoC {v}%`,hoursShort:`{h} h`,statMinMax:`SoC min / max`,statImport:`Grid import`,statFeed:`Feed-in`,statAutarky:`Self-sufficiency`,statPvTomorrow:`PV tomorrow`,statP10:`PV remaining (P10)`,statDeficit:`Deficit tomorrow`,statYield:`PV day`,statYieldSub:`{today} / {ref} kWh reference`,qualityLabel:`Data quality`,qualityOk:`complete`,qualityPv:`PV profile missing`,qualityConsumption:`Consumption profile missing`,qualityBoth:`Profiles missing`,qualityUnknown:`unknown`,reserveTitle:`Target SoC`,reserveSeasonal:`Emergency reserve`,reserveAdaptive:`Reserve, adaptive`,reserveHt:`HT reserve`,reserveForward:`Look-ahead`,windowsTitle:`Charge window`,windowAstro:`Astro start`,windowSeasonalEnd:`Season end`,windowPvDelay:`PV delay`,windowTomorrow:`Tomorrow`,autoTitle:`Auto strategy`,autoSaving:`Estimated saving`,autoOff:`Off`,autoOn:`{goal} · {eur}`,autoPending:`{goal} · no run yet`,autoData:`{goal} · not enough history`,autoCap:`Morning cap on, up to {soc} %, until {hour}.`,autoLiveHint:`Auto only adjusts the morning cap. The amount is the forecast saving over the next 24 hours versus your own setting, not money already saved.`,alertUnreachable:`E3DC is not reachable`,alertChargeLock:`Charge lock active`,alertDischargeLock:`Discharge lock active`,alertUnjustified:`Grid charge without justification`,alertReserveCharge:`Grid charge due to backup reserve`,alertEmergencyCharge:`Grid charge due to emergency charge`,alertDismiss:`Got it`,alertBannerShow:`Alert banner`,alertBannerShowHint:`Short notes at the top. The same info appears as chips under the energy flow.`,noForecast:`No forecast yet. Maestro needs at least 7 days of history.`,priceTitle:`Electricity price & planned SoC`,legendCharge:`Grid charge`,legendHold:`Hold battery`,legendRelease:`Battery free`,legendPlanSoc:`Planned SoC`,planShadow:`Shadow mode · not controlling`,planActive:`Active · controls the battery`,planTitle:`Plan`,planStrategy:`Grid charging`,planGridCharge:`Planned grid charging`,planSaving:`Expected saving`,planCheapest:`Cheapest slot`,planMostExpensive:`Most expensive slot`,planKnownUntil:`Prices known until`,planDiag:`Inputs`,planBudget:`Remaining budget`,planFloor:`Floor`,planCeiling:`Ceiling`,planEfficiency:`Efficiency`,planMinSpread:`Minimum spread`,planWear:`Wear`,planSafety:`Consumption safety factor`,noPlan:`There is no price plan. It needs a dynamic tariff.`,noPlanOff:`With strategy “Off” there is no price-plan chart. Maestro does not charge the battery from the grid.`,noPlanSlots:`With time windows (HT/NT) there is no price-plan chart. Charge times come from tariff slots of class “Low”.`,noPlanThreshold:`With “below price threshold” there is no price-plan chart. Maestro charges while the price is under the threshold — those times are not shown as a plan curve.`,planComputing:`Computing the price plan…`,noPlanPrices:`No price plan: there is no valid price curve. Check the price sensor.`,noPlanProfile:`No price plan: consumption statistics are not ready yet.`,noPlanRoom:`No price plan: there is no room between charge threshold/reserve and the target SoC.`,planTune:`Grid charging`,planTuneHint:`The same settings as under Settings › Grid and tariff.`,slotPrice:`Price`,slotSoc:`SoC`,slotConsumption:`Consumption`,slotCharge:`Grid charge {kwh} kWh`,slotHold:`Hold battery`,slotRelease:`Battery free`,decisionPhase:`Current control phase`,tagTargetSoc:`Target SoC {v} %`,tagTargetPower:`Target charge power {v}`,tagBatteryPriority:`Battery priority`,tagSince:`since {t}`,limitsTitle:`Limits · target vs. sent`,limitsSub:`What Maestro wants and what reaches the E3DC`,limitCharge:`Charge limit`,limitDischarge:`Discharge limit`,limitTarget:`Target {a} · sent {b}`,limitNone:`no limit`,entitiesMissing:`Not available: {list}. These Maestro entities are missing or disabled – please check Settings › Entities.`,entityDisabled:`disabled`,notSetUp:`E3DC Maestro is not set up or has not started yet.`,limitSoc:`now {a} % → {b} %`,timelineTitle:`Decision history`,timelineEmpty:`No decisions recorded yet.`,noDecision:`No decision available yet.`,controlsTitle:`Quick controls`,controlsSub:`Takes effect immediately`,close:`Close`,historySub:`Last 24 hours`,historyEmpty:`No history for the last 24 hours.`,historyFailed:`The history could not be loaded.`,ctrlActive:`Regulation active`,ctrlActiveSub:`Maestro controls charge and discharge limits`,ctrlPredictive:`Predictive charging`,ctrlPredictiveSub:`Charge target from forecast and consumption`,ctrlPvDelay:`PV forecast delay`,ctrlPvDelaySub:`Postpone charging when PV is enough`,ctrlPlanControls:`Price plan controls battery`,ctrlPlanControlsSub:`Off = shadow mode only`,ctrlPlanShadow:`Price plan shadow mode`,ctrlPlanShadowSub:`Compute the plan but send nothing`,ctrlForce:`Forced discharge`,ctrlForcePower:`Power {v}`,allSettings:`Open all settings →`,displayTitle:`Display`,consumersSub:`Consumers in the live energy flow. Applies on every device that opens this cockpit.`,addConsumer:`Add consumer`,consumerSearch:`Search power sensors`,consumerName:`Name in the energy flow`,consumerIcon:`Icon`,iconWallbox:`Wallbox`,iconHeater:`Heating rod`,iconClimate:`Air conditioning`,iconHeatpump:`Heat pump`,iconMeter:`Power meter`,modeIncluded:`In house load`,modeSeparate:`Measured separately`,useWallbox:`Add wallbox`,removeConsumer:`Remove`,editConsumers:`Edit consumers`,consumersEmpty:`No consumers yet. Add a wallbox, heat pump or other loads here.`,consumersOverflow:`Included consumers exceed the house load. Check whether they are really part of the house meter.`,noPowerSensors:`No matching power sensors found.`,consumerMissing:`Sensor unavailable`,unavailable:`unavailable`,callFailed:`Action failed: {err}`,chartError:`Chart failed to load: {err}`,loading:`Loading …`,demoHint:`No data`,setHardware:`System`,setHardwareHint:`Plant data Maestro uses to calculate power and limits.`,setCorridor:`Target SoC and charge corridor`,setCorridorHint:`Where the battery should be today: threshold, corridor, charge end and hard caps.`,setWindows:`Look-ahead and time windows`,setWindowsHint:`When to charge: forecast, sun, morning cap and spreading across the day.`,setYield:`Low PV and curtailment`,setYieldHint:`Fill the battery before feed-in, catch curtailment and top up late.`,setTariff:`Grid and tariff`,setTariffHint:`Grid charging, high tariff, prices and tariff slots.`,setReserve:`High tariff and reserve`,setReserveHint:`HT window and emergency reserve. Adaptive-reserve lookback stays in the integration options.`,setFlex:`Wallbox, heat pump, pre-discharge`,setFlexHint:`Extra loads and the morning discharge before charging starts.`,setControl:`Control behaviour`,setControlHint:`Master switch, forced discharge and how calmly the control follows.`,setDiag:`Diagnostics and actions`,setDiagHint:`Debug log and one-off actions.`,setPlant:`Plant`,setPlantHint:`Inverter, PV size and the limits Maestro calculates with.`,setSafety:`Protection`,setSafetyHint:`Emergency charge, backup reserve, battery cap and watchdog.`,setPv:`PV charging`,setPvHint:`Daily target and time window. Charge power and special cases sit below.`,setLoads:`Loads`,setLoadsHint:`Wallbox, EVCC, heat pump and the morning discharge before charging starts.`,setAuto:`Automation`,setAutoHint:`Once a day Maestro looks for a better morning-cap and gentle-charge setting.`,setSystem:`System`,setSystemHint:`Master switch, forced discharge, control pace and diagnostics.`,secPlantPower:`Power and limits`,secPlantPowerHint:`Nameplate values of the plant.`,secEmergency:`Emergency charge`,secEmergencyHint:`Below this threshold Maestro charges from the grid at once. 0 turns emergency charging off.`,secReserve:`Backup reserve`,secReserveHint:`A fixed reserve replaces the seasonal and the adaptive one.`,secHard:`Battery cap`,secHardHint:`Charging stops above this SoC. Curtailment protection may override the cap.`,secWatchdog:`Watchdog`,secWatchdogHint:`After this long without contact Maestro releases the limits.`,secStrategy:`Grid charging`,secStrategyHint:`Whether and how Maestro charges the battery from the grid. The strategy sets every switch it needs.`,secLimits:`Limits`,secLimitsHint:`How much and up to which charge level the battery charges from the grid.`,secPlanTune:`Price plan fine-tuning`,secPlanTuneHint:`Only for “Dynamic: expert”. “Automatic” uses fixed values.`,secCosts:`Costs & statistics`,secCostsHint:`These values do not decide when to charge. They feed cost, revenue and wear in the statistics. The price plan also uses the feed-in price, and in expert mode the wear.`,secSwitches:`Individual switches`,secSwitchesHint:`The switches behind the strategy. Changing one of them also changes the strategy shown.`,expertView:`Expert view`,expertViewHint:`Shows extra options and the individual switches. Applies to this browser only.`,sumOff:`Maestro never charges the battery from the grid, only from PV.`,sumSlots:`Maestro charges from the grid in time windows of class “Low”, up to {soc} %, at most {kwh} kWh per day. Add the windows below under tariff slots.`,sumSlotsNone:`There is no time window of class “Low” yet. Without one, Maestro does not charge from the grid.`,sumThreshold:`Maestro charges from the grid while the price is at most {price} €/kWh, up to {soc} %, at most {kwh} kWh per day.`,sumPlan:`Maestro picks the cheapest hours from the price curve. It uses the consumption and PV forecast and charges only what is missing until the next cheap phase, up to {soc} %, at most {kwh} kWh per day.`,sumAuto:`Efficiency, minimum spread and safety factor are fixed. Battery wear does not count.`,sumExpert:`The plan uses your values for efficiency, minimum spread, safety factor and battery wear.`,sumShadow:`Shadow mode: the plan is only computed and shown. Turn on “Price plan controls battery” to let it control the battery.`,sumActive:`The plan controls the battery.`,sumNoPrice:`No price sensor is set. Without prices this strategy does not charge.`,selStrategy:`Grid charging`,secHt:`High tariff`,secHtHint:`During the high-tariff window Maestro keeps a minimum reserve.`,secCorridor:`Daily target`,secCorridorHint:`State of charge by the end of charging. The later target applies only while its switch is on.`,secWindows:`Time window`,secWindowsHint:`With astro, start and end follow the sun. Otherwise the winter and summer end times are fixed.`,secShape:`Charge power`,secShapeHint:`How hard the battery is charged. Grey values apply only while their switch is on. The corridor is a power in watts.`,secYield:`When the day runs differently`,secYieldHint:`Forecast, a weak day and curtailment. Thresholds and references sit in the expert view.`,sumTarget:`Up to {soc} % by the end of charging.`,sumTargetLate:`Up to {soc} % by the end of charging, then {late} % from {hour}.`,sumWindowAstro:`Charging starts {start} h after sunrise and ends {end} h before sunset.`,sumWindowHours:`Charging ends at {winter} in winter and at {summer} in summer.`,sumWindowCap:`Mornings stay at {soc} % until {hour}.`,sumPowerAuto:`Automatic: power follows the path to the daily target.`,sumPowerFloor:`Full power below {soc} %.`,sumPowerSpread:`Spread up to {soc} %.`,sumPowerGentle:`Limited to factor {factor}.`,sumPowerCorridor:`Corridor {low}–{high} W.`,sumPowerPause:`Pause below {low} W.`,sumPvNone:`No special rule. The daily target applies.`,sumPvForecast:`The forecast may delay charging.`,sumPvForward:`Look-ahead up to {soc} %.`,sumPvLow:`Weak days charge earlier.`,sumPvCurtail:`Curtailment is caught.`,secWallbox:`Wallbox`,secWallboxHint:`Surplus charging and grid protection while the car draws power.`,secEvcc:`EVCC`,secEvccHint:`Blocks battery discharge while the car charges immediately.`,secHp:`Heat pump`,secHpHint:`Surplus and price limit.`,secMorning:`Morning discharge`,secMorningHint:`Lower the battery before charging starts so PV surplus fits.`,secAuto:`Objective`,secAutoHint:`The chosen strategy is shown on the decision screen.`,secRun:`Operation`,secRunHint:`The same switches are in the quick menu.`,secPace:`Pace`,secPaceHint:`How often the control runs and how far charge power may step each cycle.`,secDiag:`Diagnostics`,secDiagHint:`Debug log and one-off actions.`,ladderTitle:`Control ladder`,ladderHint:`Maestro checks from top to bottom and takes the first matching rule. The active rule is marked.`,ladderBandSafety:`Safety`,ladderBandTariff:`Grid and tariff`,ladderBandBlocks:`Charge blocks`,ladderBandPv:`PV charging`,ladderBandRest:`After that`,ladderOff:`Control off`,ladderForce:`Forced discharge`,ladderEmergency:`Emergency charge`,ladderFeed:`Feed-in limit`,ladderReserve:`Backup reserve`,ladderEvcc:`EVCC immediate charge`,ladderPrice:`Price plan`,ladderHt:`High tariff`,ladderHold:`Hold the cheap slot`,ladderMorning:`Morning discharge`,ladderCap:`Morning cap`,ladderAstro:`Wait for the sun`,ladderHard:`Battery cap`,ladderFloor:`Fast-charge floor`,ladderLow:`Weak PV day`,ladderGrid:`Grid charge in the slot`,ladderCorridor:`Corridor and PV delay`,ladderSpread:`Spreading`,ladderCurtail:`Curtailment guard`,ladderIdle:`Idle`,confirmReset:`Reset today's statistics to 0?`,settingsPending:`Loading settings …`,settingsBack:`All areas`,setClassic:`Classic dashboard`,setClassicHint:`Add it with one click`,classicLead:`The classic dashboard is the Lovelace view with every tab, including auto-optimisation, sizing advisor and help. Maestro creates it right here.`,classicDepsTitle:`Required cards`,classicDepMushroom:`Mushroom Cards`,classicDepApex:`ApexCharts Card`,classicDepVia:`HACS → Frontend`,classicInstalled:`installed`,classicMissing:`missing – install via HACS → Frontend`,classicDepsMissing:`Without these cards the dashboard shows error tiles. Install them first, then reload the browser.`,classicActionTitle:`Dashboard`,classicChecking:`Checking whether the dashboard already exists …`,classicCreate:`Create dashboard`,classicSetup:`Set up content`,classicCreating:`Creating …`,classicReady:`The E3DC Maestro dashboard exists and is in the sidebar.`,classicEmpty:`There is an empty dashboard at the path e3dc-maestro. Maestro sets up its content there.`,classicForeign:`A dashboard with other content already uses the path e3dc-maestro. Maestro does not overwrite it. To start over, delete it under Settings → Dashboards.`,classicAdminOnly:`Only administrators can create it.`,classicFailed:`That did not work: {err}`,classicRetry:`Check again`,classicManual:`Add it manually`,classicHa:`The Community dashboards entry appears from Home Assistant 2026.5. On older versions, create an empty dashboard (title E3DC Maestro, path e3dc-maestro) and paste maestro_dashboard.yaml into the YAML editor.`,classicStep1:`Set up the E3DC Maestro integration. If it is already running, restart Home Assistant once.`,classicStep2:`Hard-reload the browser so the dashboard module is loaded.`,classicStep3:`Settings → Dashboards → Add dashboard.`,classicStep4:`Under Community dashboards, choose E3DC Maestro.`,classicStep5:`Confirm the title E3DC Maestro and the suggested icon, then create it.`,classicPath:`The path must stay e3dc-maestro. Do not rename the suggested title before the slug is set, or the help links inside the dashboard point nowhere.`,classicAfter:`The dashboard is built from the current Maestro template every time it opens, so updates arrive automatically as long as you do not take control of it in the editor.`,classicTimeout:`If you see “Timeout waiting for strategy element ll-strategy-dashboard-e3dc-maestro”: restart Home Assistant, hard-reload the browser, and under Settings → Dashboards → Resources check that /local/e3dc_maestro/e3dc-maestro-strategy.js is the first JavaScript module (right after first setup it is still /e3dc_maestro/frontend/e3dc-maestro-strategy.js).`,classicOpen:`Open dashboard`,setLook:`Appearance`,setLookHint:`Choose the look that feels right.`,themeDark:`Dark`,themeDarkHint:`Calm in the evening. Energy flows glow on a dark ground.`,themeClassic:`Classic`,themeClassicHint:`Light and clear, easy to read during the day.`,themeE3dc:`myE3DC`,themeE3dcHint:`The familiar myE3DC look.`,plantEmpty:`No data from the E3DC integration. Once E3DC RSCP is set up, operating state, storage and phases show up here.`,plantOperation:`Operation`,plantStorage:`Storage`,plantPhases:`Phases`,plantWallbox:`Wallbox`,plantRoomGrid:`Grid`,plantRoomGridHint:`House and grid phases, additional consumption.`,plantRoomBattery:`Battery`,plantRoomBatteryHint:`Packs, cell health and charge limits.`,plantRoomPv:`PV`,plantRoomPvHint:`Inverter, power and the feed-in limit.`,plantRoomWallbox:`Wallbox`,plantRoomWallboxHint:`Charge status and wallbox settings that can be changed.`,plantRoomControls:`Settings`,plantRoomControlsHint:`Values the E3DC accepts over RSCP.`,plantCells:`Cell health`,plantCell:`Module`,plantSend:`Send this setting to the E3DC?`,plantModel:`Model`,plantSerial:`Serial number`,plantFirmware:`Firmware`,plantFault:`Current message`,plantPack:`Storage`,plantMode:`Mode`,plantAutarky:`Autarky`,plantSelf:`Self-consumption`,plantPower:`Power setpoint`,plantLimits:`Power limits`,plantLimitCharge:`Max. charge`,plantLimitDischarge:`Max. discharge`,plantLimitMin:`Minimum discharge`,plantManual:`Manual grid charge`,plantManualEnergy:`Charged that way`,plantDerated:`PV derated`,plantEmergency:`Emergency power`,plantReserveHit:`Emergency reserve reached`,plantReserveOn:`Emergency reserve`,plantWeather:`Weather regulation`,plantWeatherWait:`Waiting for weather breakthrough`,plantOn:`on`,plantOff:`off`,plantMode0:`Normal`,plantMode1:`Idle`,plantMode2:`Discharging`,plantMode3:`Charging`,plantMode4:`Grid charge`,plantSoh:`State of health`,plantCycles:`Cycles`,plantEnergy:`Usable energy left`,plantShare:`Share of installed capacity`,plantCurrent:`Current`,plantVoltage:`Voltage`,plantTemp:`Cell temperature`,plantHouse:`House`,plantGrid:`Grid`,plantInverter:`Inverter`,plantPeak:`Installed PV power`,plantCapacity:`Battery capacity`,plantAc:`Max. AC power`,plantSysCharge:`Max. system charge`,plantSysDischarge:`Max. system discharge`,plantDeratePct:`Feed-in limit`,plantDeratePower:`Feed-in limit power`,plantExtraPv:`Additional production`,plantExtraUse:`Additional consumption`,plantPlug:`Plug`,plantCharging:`Charging`,plantPhaseCount:`Phases`,plantSun:`Solar share`,plantNet:`Grid share`,plantCarSoc:`Vehicle SoC`,plantMaxCurrent:`Max. charge current`,secSources:`Sources`,secSourcesHint:`Sensors for state of charge, power and daily counters. Changing one reloads the integration.`,secAdaptive:`Adaptive reserve`,secAdaptiveHint:`How far back Maestro looks and how high the reserve may rise.`,secPriceSensor:`Price sensor`,secPriceSensorHint:`Current import price for the dynamic tariff.`,secSlots:`Tariff slots`,secSlotsHint:`Repeating windows. Monday is the first day.`,secForecastSensors:`Forecast sensors`,secForecastSensorsHint:`Remaining today, today's total, tomorrow and the day after.`,secWallboxWire:`Wallbox wiring`,secWallboxWireHint:`Power sensor, phases and the services that switch it.`,secEvccWire:`EVCC`,secEvccWireHint:`Which entity reports charging and which value means charge now.`,secHpWire:`Heat pump`,secHpWireHint:`Switch, services and the window in which it may run.`,secSizingInputs:`Meters`,secSizingInputsHint:`Energy meters and the period used for the calculation. Changing a sensor reloads the integration.`,setSizingTile:`More battery or PV?`,setSizingTileHint:`Which expansion pays off`,setSetup:`Setup`,setSetupHint:`What the control needs in order to run`,setupTitle:`First steps`,setupLead:`Maestro needs these points before it can control your home.`,setupProgress:`{done} of {total} required steps done`,setupDone:`Setup complete`,setupDoneHint:`Every required step is done. The list stays under Settings.`,setupAck:`Got it`,setupOpen:`Open`,setupStatusDone:`done`,setupStatusTodo:`missing`,setupStatusOptional:`optional`,setupStatusWait:`reading`,setupOptionsError:`The settings could not be read: {err}`,setupPlant:`Plant connected`,setupPlantHint:`State of charge, PV, grid, house and battery each need a sensor that reports values.`,setupPlantOk:`Every required sensor is reporting.`,setupPlantMissing:`Still without a value: {names}.`,setupTariff:`Tariff`,setupTariffHint:`A fixed price, a price sensor or time windows. Without a price Maestro cannot charge by price.`,setupTariffOk:`A price or a time window is set.`,setupTariffMissing:`The dynamic tariff has no price sensor, or the fixed tariff has no import price.`,setupForecast:`PV forecast`,setupForecastHint:`Recommended, so Maestro can match charging to the expected yield.`,setupForecastOk:`A forecast sensor is selected.`,setupForecastOpen:`None selected yet. Control still runs, only without looking ahead.`,setupSafety:`Emergency reserve`,setupSafetyHint:`Not required. Useful so the battery keeps a reserve.`,setupSafetyOk:`A reserve is switched on.`,setupSafetyOpen:`No reserve is active yet. Fixed, seasonal or adaptive lives under Safety.`,setupLoads:`Loads`,setupLoadsHint:`Optional, when Maestro should also control a wallbox, heat pump or EVCC.`,setupLoadsOk:`At least one load is connected.`,setupLoadsOpen:`None connected. Only needed when Maestro should control a load.`,setupRegulation:`Switch control on`,setupRegulationHint:`While it is off, Maestro only watches and sends no limits.`,setupRegulationOk:`Maestro is controlling.`,setupRegulationOff:`Control is off.`,setupRun:`First decision`,setupRunHint:`Maestro has calculated at least once and says why.`,setupRunOk:`There is a decision.`,setupRunOff:`Switch control on. The decision shows up here afterwards.`,setupRunWait:`Control is on. The first decision arrives with the next cycle.`,setSizing:`Does the expansion pay off?`,setSizingHint:`How much extra capacity fits your consumption`,sizingLead:`Check whether a larger battery or more PV is worth it for your home. You set how much you want to add. Maestro uses your past consumption to estimate what that changes in autarky, cost and payback.`,sizingAdd:`Your expansion`,sizingAddHint:`Extra battery in kWh and extra PV in kWp, on top of what is already installed. 0 means buy nothing.`,sizingRun:`Calculate from your history`,sizingScenario:`For this expansion`,sizingNeedRun:`Set the expansion and start the calculation. The result then shows what it is worth.`,sizingChartAvoided:`Avoided grid import`,sizingChartBaseline:`Current grid import`,sizingChartCaption:`Area: avoided grid import. Line: current grid import.`,sizingStory:`{bat} kWh of battery and {pv} kWp of PV: about {aut}% autarky, {save} € a year, paid back in {years} years.`,sizingStoryOpen:`{bat} kWh of battery and {pv} kWp of PV: about {aut}% autarky and {save} € a year. Payback cannot be derived from this.`,sizingBasis:`Assumptions`,sizingBasisHint:`Prices used for investment and payback.`,sizingRecsHint:`Economic looks for the shortest payback, technical for the highest autarky, balanced for a compromise.`,sizingRecs:`Three suggestions`,recEconomicHint:`Shortest payback`,recTechnicalHint:`Highest autarky`,recBalancedHint:`A compromise of both`,sizingBattery:`Battery`,sizingPv:`PV added`,sizingAutarky:`Autarky`,sizingAvoided:`Avoided grid import`,sizingSavings:`Savings per year`,sizingInvestment:`Investment`,sizingPayback:`Payback`,sizingInverter:`Inverter upgrade`,sizingBaseline:`Baseline grid import`,sizingNotRun:`Not calculated yet`,sizingRunning:`Calculating …`,sizingReady:`Ready`,recEconomic:`Economic`,recTechnical:`Technical`,recBalanced:`Balanced`,matrixDays:`Analysis days`,matrixRecords:`Hourly records`,matrixAnomaly:`Anomalies`,optReload:`Saved. The integration reloads so the new sensors take effect.`,optSaved:`Saved. The value applies immediately.`,optAdmin:`Only admins can change these values.`,optClear:`Clear`,optSearch:`Search entities`,optService:`Service, for example switch.turn_on`,optTarget:`Target entity`,optWeekdays:`Weekdays`,optFrom:`From`,optTo:`Until`,optClass:`Class`,optReserve:`Minimum reserve %`,optAddSlot:`Add slot`,optRemove:`Remove`,optSaveSlots:`Save slots`,optYes:`Yes`,optNo:`No`,classHigh:`High`,classLow:`Low`,classNormal:`Normal`,wd0:`Mon`,wd1:`Tue`,wd2:`Wed`,wd3:`Thu`,wd4:`Fri`,wd5:`Sat`,wd6:`Sun`,targetPower:`Target charge power`,autoObjective:`Objective`,autoLastRun:`Last run`,autoFallback:`Data fallback`,autoReason:`Reason`,autoOverrides:`Adjustments`,autoNone:`No adjustment. The previous setup was already the best.`,autoGrid:`Grid size`,autoDeltaDraw:`Grid import versus baseline`,autoDeltaFeed:`Feed-in versus baseline`,autoDeltaCurtail:`Curtailment versus baseline`,autoDeltaSelf:`Autarky versus baseline`,...Ai},Ni={e3dc:`E3DC`,generic:`Generisch`,off:`Aus`,passive:`Passiv`,active_house:`Aktiv Haus`,active_grid:`Aktiv Netz`,self_consumption:`Eigenverbrauch`,cost:`Kosten`,co2:`CO₂`,fixed:`Fest`,dynamic:`Dynamisch`,slots:`Zeitfenster (HT/NT)`,threshold:`Dynamisch: unter Preisschwelle`,dynamic_auto:`Dynamisch: automatisch`,dynamic_expert:`Dynamisch: Experte`},Pi={e3dc:`E3DC`,generic:`Generic`,off:`Off`,passive:`Passive`,active_house:`Active, house`,active_grid:`Active, grid`,self_consumption:`Self-consumption`,cost:`Cost`,co2:`CO₂`,fixed:`Fixed`,dynamic:`Dynamic`,slots:`Time windows (peak/off-peak)`,threshold:`Dynamic: below price threshold`,dynamic_auto:`Dynamic: automatic`,dynamic_expert:`Dynamic: expert`},Fi={off:`Aus`,manual:`Manuell`,emergency:`Notladung`,feed_in_limit:`Einspeisebegrenzung`,reserve_protection:`Notstromreserve`,evcc_pause:`EVCC-Pause`,ht_protection:`HT-Schutz`,force_discharge:`Erzwungene Entladung`,morning_discharge:`Morgen-Entladung`,astro_wait:`Astro-Wartezeit`,morning_cap:`Morgen-Deckel`,hard_soc_limit:`SoC-Deckel`,fast_floor:`Schnell-Boden`,grid_charge:`Netzladung`,grid_hold:`Akku halten`,corridor:`Ladekorridor`,pv_delay:`PV-Verzögerung`,spreading:`Spreading`,curtailment_guard:`Abregelschutz`,idle:`Leerlauf`},Ii={off:`Off`,manual:`Manual`,emergency:`Emergency charge`,feed_in_limit:`Feed-in limit`,reserve_protection:`Backup reserve`,evcc_pause:`EVCC pause`,ht_protection:`HT protection`,force_discharge:`Forced discharge`,morning_discharge:`Morning discharge`,astro_wait:`Astro wait`,morning_cap:`Morning cap`,hard_soc_limit:`SoC cap`,fast_floor:`Fast floor`,grid_charge:`Grid charge`,grid_hold:`Hold battery`,corridor:`Charge corridor`,pv_delay:`PV delay`,spreading:`Spreading`,curtailment_guard:`Curtailment guard`,idle:`Idle`};function Li(e){let t=!e||e.toLowerCase().startsWith(`de`),n=t?ji:Mi,r=t?Fi:Ii,i=t?Ni:Pi;return{t:(e,t)=>{let r=n[e];if(t)for(let[e,n]of Object.entries(t))r=r.replace(`{${e}}`,String(n));return r},phase:e=>r[e]??e,option:e=>i[e]??e}}var Ri=o`
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
  }
  .soc-head h3 {
    margin: 0;
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
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 18px;
  }
  .soc-pack-readout {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
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
    gap: 4px;
    padding: 4px 0 2px;
  }
  .pulse-chart {
    width: 100%;
    min-height: 240px;
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
`,zi=[`unreachable`,`charge_lock`,`discharge_lock`,`unjustified`,`reserve_charge`,`emergency_charge`],Bi=`e3dc-maestro.alerts-dismissed.v1`,Vi=`e3dc-maestro.alerts-banner-hidden.v1`,Hi={unreachable:`alertUnreachable`,charge_lock:`alertChargeLock`,discharge_lock:`alertDischargeLock`,unjustified:`alertUnjustified`,reserve_charge:`alertReserveCharge`,emergency_charge:`alertEmergencyCharge`},Ui=e=>Hi[e];function Wi(e){let t=t=>e.states[t]?.state,n=t(I.phase),r=[];return t(I.reachable)===`off`&&r.push(`unreachable`),t(I.chargeLock)===`on`&&r.push(`charge_lock`),t(I.dischargeLock)===`on`&&r.push(`discharge_lock`),t(I.unjustified)===`on`&&r.push(`unjustified`),n===`reserve_protection`&&r.push(`reserve_charge`),n===`emergency`&&r.push(`emergency_charge`),r}function Gi(e,t){let n=new Set(t),r=new Set;for(let t of e)n.has(t)&&r.add(t);return r}function Ki(e,t,n){return n||!e.length?!1:e.some(e=>!t.has(e))}function qi(e){let t=new Set(zi),n=new Set;if(!Array.isArray(e))return n;for(let r of e)typeof r==`string`&&t.has(r)&&n.add(r);return n}function Ji(){try{return qi(JSON.parse(localStorage.getItem(Bi)??`null`))}catch{return new Set}}function Yi(e){try{localStorage.setItem(Bi,JSON.stringify([...e]))}catch{}}function Xi(e){return e===`1`}function Zi(){try{return Xi(localStorage.getItem(Vi))}catch{return!1}}function Qi(e){try{localStorage.setItem(Vi,e?`1`:`0`)}catch{}}var $i=[`ring`,`pack`],ea=`e3dc-maestro.battery-style.v1`;function ta(e){return e===`pack`?`pack`:`ring`}function na(){try{return ta(localStorage.getItem(ea))}catch{return`ring`}}function ra(e){try{localStorage.setItem(ea,e)}catch{}}var ia=[`nodes`,`blob`,`city`],aa=`e3dc-maestro.flow-style.v1`;function oa(e){return e===`blob`||e===`city`?e:`nodes`}function sa(){try{return oa(localStorage.getItem(aa))}catch{return`nodes`}}function ca(e){try{localStorage.setItem(aa,e)}catch{}}var la=[`dark`,`classic`,`e3dc`],ua=`e3dc-maestro.theme.v1`;function da(e){return e===`classic`||e===`e3dc`?e:`dark`}function fa(){try{return da(localStorage.getItem(ua))}catch{return`dark`}}function pa(e){try{localStorage.setItem(ua,e)}catch{}}var ma=`e3dc-maestro`,ha=`custom:e3dc-maestro`,ga=e=>e instanceof Error?e.message:typeof e==`object`&&e&&`message`in e?String(e.message):String(e),_a=e=>typeof e==`object`&&e&&`code`in e?String(e.code):void 0,va=(e,t)=>e.some(e=>e.toLowerCase().includes(t));function ya(e){if(!e||typeof e!=`object`)return`empty`;let t=e.strategy;if(t?.type===`custom:e3dc-maestro`)return`ours`;let n=e.views;return Object.keys(e).length===0||Array.isArray(n)&&n.length===0&&!t?`empty`:`foreign`}async function ba(e){try{let t=(await e.callWS({type:`lovelace/resources`})).map(e=>e.url??``);return{mushroom:va(t,`mushroom`),apex:va(t,`apexcharts-card`)}}catch{return{}}}async function xa(e){if(!(await e.callWS({type:`lovelace/dashboards/list`})).some(e=>e.url_path===`e3dc-maestro`))return`missing`;try{return ya(await e.callWS({type:`lovelace/config`,url_path:ma,force:!1}))}catch(e){if(_a(e)===`config_not_found`)return`empty`;throw e}}async function Sa(e){let t=await ba(e);try{return{state:await xa(e),...t}}catch(e){return{state:`error`,error:ga(e),...t}}}async function Ca(e,t){if(t===`missing`)await e.callWS({type:`lovelace/dashboards/create`,url_path:ma,title:`E3DC Maestro`,icon:`mdi:battery-charging`,require_admin:!1,show_in_sidebar:!0,mode:`storage`});else if(t!==`empty`)return;await e.callWS({type:`lovelace/config/save`,url_path:ma,config:{strategy:{type:ha}}})}var wa=[`soc_sensor`,`pv_power_sensor`,`house_power_sensor`,`grid_power_sensor`,`battery_power_sensor`],Ta=[`pv_forecast_sensor`,`pv_forecast_today_sensor`,`tomorrow_pv_sensor`],Ea=[`wallbox_power_sensor`,`evcc_charging_entity`,`hp_switch_entity`],Da=[`fixed_reserve_enabled`,`seasonal_reserve_enabled`,`adaptive_reserve_enabled`],Oa=[`wallbox_enabled`,`evcc_enabled`,`hp_enabled`],ka=e=>!e||e===`unknown`||e===`unavailable`||e===`none`,Aa=(e,t)=>{let n=e[t];return typeof n==`string`&&n.includes(`.`)?n:void 0},ja=(e,t)=>{let n=Aa(e.options,t);return!!n&&!ka(e.state(n))},Ma=e=>{let t=wa.filter(t=>!ja(e,t)),n=e.options.battery_capacity_kwh;return(typeof n!=`number`||!(n>0))&&t.push(`battery_capacity_kwh`),t},Na=e=>{let t=e.select(`tariff_mode`),n=Number.isFinite(e.number(`fixed_buy_price`)??NaN),r=ja(e,`price_sensor`),i=e.slots>0;return t===`dynamic`?!e.ready&&!r&&!i?`wait`:r||i?`done`:`todo`:t===`fixed`&&n||r||i?`done`:e.ready?`todo`:`wait`},Pa=(e,t)=>{let n=t.map(t=>e.on(t));if(n.some(e=>e===!0))return!0;if(!n.every(e=>e===void 0))return!1};function Fa(e){let t=e.ready?Ma(e):[],n=Ta.some(t=>ja(e,t)),r=Ea.some(t=>ja(e,t)),i=Pa(e,Oa),a=Pa(e,Da),o=!ka(e.phase);return[{id:`plant`,status:e.ready?t.length?`todo`:`done`:`wait`,required:!0,area:`plant`,missing:t},{id:`tariff`,status:Na(e),required:!0,area:`tariff`,missing:[]},{id:`forecast`,status:e.ready?n?`done`:`optional`:`wait`,required:!1,area:`pv`,missing:[]},{id:`safety`,status:a===void 0?`wait`:a?`done`:`optional`,required:!1,area:`safety`,missing:[]},{id:`loads`,status:i===!0||r?`done`:!e.ready||i===void 0?`wait`:`optional`,required:!1,area:`loads`,missing:[]},{id:`regulation`,status:e.regulation===void 0?`wait`:e.regulation?`done`:`todo`,required:!0,missing:[]},{id:`run`,status:o?`done`:e.regulation===!1?`todo`:`wait`,required:!0,missing:[],note:o&&e.explanation&&!ka(e.explanation)?e.explanation:void 0}]}var Ia=e=>e.filter(e=>e.required).every(e=>e.status===`done`),La=`e3dc-maestro.setup.ack`,Ra=e=>e===`1`;function za(){try{return Ra(localStorage.getItem(La))}catch{return!1}}function Ba(){try{localStorage.setItem(La,`1`)}catch{}}var Va=[`sensor`],Ha=[`sensor`],H=(e,t,n,r=1,i)=>({key:e,kind:`number`,min:t,max:n,step:r,unit:i}),U=(e,t,n=!1)=>({key:e,kind:`entity`,domains:t,required:n}),Ua=(e,t)=>({key:e,kind:`entities`,domains:t}),Wa=[{area:`plant`,title:`secSources`,hint:`secSourcesHint`,fields:[H(`battery_capacity_kwh`,1,100,.1),U(`soc_sensor`,Va,!0),U(`pv_power_sensor`,Va,!0),Ua(`additional_generation_sensor`,Va),Ua(`additional_energy_total_sensor`,Ha),U(`house_power_sensor`,Va,!0),U(`grid_power_sensor`,Va,!0),{key:`grid_power_invert`,kind:`bool`},U(`battery_power_sensor`,Va,!0),U(`battery_charged_today_sensor`,Ha),U(`battery_discharged_today_sensor`,Ha),U(`pv_production_today_sensor`,Ha),U(`house_consumption_today_sensor`,Ha)]},{area:`safety`,title:`secAdaptive`,hint:`secAdaptiveHint`,fields:[H(`adaptive_reserve_lookback_days`,1,60),H(`adaptive_reserve_min_days`,1,30),H(`adaptive_reserve_safety_factor`,1,3,.1),H(`adaptive_reserve_max_soc`,5,90,1,`%`)]},{area:`tariff`,title:`secPriceSensor`,hint:`secPriceSensorHint`,fields:[U(`price_sensor`,Va)]},{area:`pv`,title:`secForecastSensors`,hint:`secForecastSensorsHint`,fields:[U(`pv_forecast_sensor`,Va),U(`pv_forecast_today_sensor`,Va),U(`tomorrow_pv_sensor`,Va),U(`pv_forecast_sensor_day2`,Va)],bundle:!0},{area:`loads`,title:`secWallboxWire`,hint:`secWallboxWireHint`,fields:[U(`wallbox_power_sensor`,Va),{key:`wallbox_included_in_house`,kind:`bool`},{key:`wallbox_phases`,kind:`select`,choices:[`1`,`3`]},{key:`wallbox_service_on`,kind:`action`},{key:`wallbox_service_off`,kind:`action`}]},{area:`loads`,title:`secEvccWire`,hint:`secEvccWireHint`,fields:[U(`evcc_charging_entity`,[`sensor`,`binary_sensor`,`switch`,`input_boolean`]),U(`evcc_mode_entity`,[`select`,`input_select`,`sensor`]),{key:`evcc_now_value`,kind:`text`}]},{area:`loads`,title:`secHpWire`,hint:`secHpWireHint`,fields:[U(`hp_switch_entity`,[`switch`,`input_boolean`]),{key:`hp_service_on`,kind:`action`},{key:`hp_service_off`,kind:`action`},{key:`hp_time_start`,kind:`time`},{key:`hp_time_end`,kind:`time`}]},{area:`sizing`,title:`secSizingInputs`,hint:`secSizingInputsHint`,fields:[{key:`sizing_pv_energy_sensor`,kind:`entities`,domains:Ha},U(`sizing_house_energy_sensor`,Ha),{key:`sizing_house_from_balance`,kind:`bool`},U(`sizing_grid_import_energy_sensor`,Ha),U(`sizing_grid_export_energy_sensor`,Ha),U(`sizing_battery_charge_energy_sensor`,Ha),U(`sizing_battery_discharge_energy_sensor`,Ha),U(`sizing_wallbox_energy_sensor`,Ha),U(`sizing_heat_pump_energy_sensor`,Ha),H(`sizing_analysis_days`,30,730),H(`sizing_electricity_price_eur_kwh`,.05,2,.01),H(`sizing_feed_in_price_eur_kwh`,0,1,.01),H(`sizing_battery_price_eur_kwh`,100,5e3),H(`sizing_pv_price_eur_per_kwp`,200,5e3),H(`sizing_inverter_upgrade_price_eur`,0,2e4),H(`sizing_round_trip_efficiency`,.5,1,.01),H(`sizing_max_battery_sweep_kwh`,5,200,.5),H(`sizing_battery_step_kwh`,.5,10,.5),H(`sizing_max_pv_expansion_kwp`,0,200,.5),H(`sizing_pv_step_kwp`,.5,10,.5)]}],Ga={battery_capacity_kwh:{de:`Nutzbare Akkukapazität`,en:`Usable battery capacity`},soc_sensor:{de:`SoC-Sensor`,en:`State-of-charge sensor`},pv_power_sensor:{de:`PV-Leistung`,en:`PV power`},additional_generation_sensor:{de:`Zusätzliche Erzeuger (Leistung)`,en:`Additional producers (power)`},additional_energy_total_sensor:{de:`Zusatz-Energiezähler (gesamt)`,en:`Additional energy totals`},house_power_sensor:{de:`Hausverbrauch`,en:`House power`},grid_power_sensor:{de:`Netzleistung`,en:`Grid power`},grid_power_invert:{de:`Netzleistung invertieren`,en:`Invert grid power`},battery_power_sensor:{de:`Akkuleistung`,en:`Battery power`},battery_charged_today_sensor:{de:`Heute geladen`,en:`Charged today`},battery_discharged_today_sensor:{de:`Heute entladen`,en:`Discharged today`},pv_production_today_sensor:{de:`PV-Ertrag heute`,en:`PV yield today`},house_consumption_today_sensor:{de:`Hausverbrauch heute`,en:`House consumption today`},adaptive_reserve_lookback_days:{de:`Rückblick in Tagen`,en:`Lookback in days`},adaptive_reserve_min_days:{de:`Mindestens Tage mit Daten`,en:`Minimum days of data`},adaptive_reserve_safety_factor:{de:`Sicherheitsfaktor`,en:`Safety factor`},adaptive_reserve_max_soc:{de:`Obergrenze der Reserve`,en:`Reserve ceiling`},price_sensor:{de:`Preis-Sensor`,en:`Price sensor`},pv_forecast_sensor:{de:`Restprognose heute`,en:`Remaining forecast today`},pv_forecast_today_sensor:{de:`Tagesprognose`,en:`Today's forecast`},tomorrow_pv_sensor:{de:`Prognose morgen`,en:`Tomorrow's forecast`},pv_forecast_sensor_day2:{de:`Prognose übermorgen`,en:`Day-after forecast`},wallbox_power_sensor:{de:`Wallbox-Leistung`,en:`Wallbox power`},wallbox_included_in_house:{de:`In der Hauslast enthalten`,en:`Included in house load`},wallbox_phases:{de:`Phasen`,en:`Phases`},wallbox_service_on:{de:`Wallbox einschalten`,en:`Turn wallbox on`},wallbox_service_off:{de:`Wallbox ausschalten`,en:`Turn wallbox off`},evcc_charging_entity:{de:`Lade-Entität`,en:`Charging entity`},evcc_mode_entity:{de:`Modus-Entität`,en:`Mode entity`},evcc_now_value:{de:`Wert für Sofortladen`,en:`Now-mode value`},hp_switch_entity:{de:`Schalter der Wärmepumpe`,en:`Heat-pump switch`},hp_service_on:{de:`Wärmepumpe einschalten`,en:`Turn heat pump on`},hp_service_off:{de:`Wärmepumpe ausschalten`,en:`Turn heat pump off`},hp_time_start:{de:`Frühester Start`,en:`Earliest start`},hp_time_end:{de:`Spätestes Ende`,en:`Latest end`},sizing_pv_energy_sensor:{de:`PV-Energie`,en:`PV energy`},sizing_house_energy_sensor:{de:`Hausenergie`,en:`House energy`},sizing_house_from_balance:{de:`Haus aus der Bilanz rechnen`,en:`Derive house from the balance`},sizing_grid_import_energy_sensor:{de:`Netzbezug`,en:`Grid import`},sizing_grid_export_energy_sensor:{de:`Einspeisung`,en:`Grid export`},sizing_battery_charge_energy_sensor:{de:`Akku geladen`,en:`Battery charged`},sizing_battery_discharge_energy_sensor:{de:`Akku entladen`,en:`Battery discharged`},sizing_wallbox_energy_sensor:{de:`Wallbox-Energie`,en:`Wallbox energy`},sizing_heat_pump_energy_sensor:{de:`Wärmepumpen-Energie`,en:`Heat-pump energy`},sizing_analysis_days:{de:`Analysetage`,en:`Analysis days`},sizing_electricity_price_eur_kwh:{de:`Bezugspreis`,en:`Import price`},sizing_feed_in_price_eur_kwh:{de:`Einspeisepreis`,en:`Feed-in price`},sizing_battery_price_eur_kwh:{de:`Akkupreis`,en:`Battery price`},sizing_pv_price_eur_per_kwp:{de:`PV-Preis`,en:`PV price`},sizing_inverter_upgrade_price_eur:{de:`Wechselrichter-Upgrade`,en:`Inverter upgrade`},sizing_round_trip_efficiency:{de:`Wirkungsgrad`,en:`Round-trip efficiency`},sizing_max_battery_sweep_kwh:{de:`Akku bis`,en:`Battery sweep up to`},sizing_battery_step_kwh:{de:`Akku-Schritt`,en:`Battery step`},sizing_max_pv_expansion_kwp:{de:`PV-Zubau bis`,en:`PV expansion up to`},sizing_pv_step_kwp:{de:`PV-Schritt`,en:`PV step`}},Ka=(e,t)=>{let n=Ga[t];return n?e.toLowerCase().startsWith(`de`)||!e?n.de:n.en:t},qa=e=>Wa.filter(t=>t.area===e);function Ja(e,t,n,r=40){let i=new Set(t??[]),a=n.trim().toLowerCase(),o=[];for(let t of e){let e=t.split(`.`)[0];if((!i.size||i.has(e))&&(!a||t.toLowerCase().includes(a))&&(o.push(t),o.length>=r))break}return o}function Ya(e){if(!Array.isArray(e))return[];let t=[];for(let n of e){if(!n||typeof n!=`object`)continue;let e=n,r=Array.isArray(e.weekdays)?e.weekdays.filter(e=>typeof e==`number`&&e>=0&&e<=6):[],i=e.class_===`high`||e.class_===`low`||e.class_===`normal`?e.class_:`normal`,a={weekdays:r,start_h:typeof e.start_h==`number`?e.start_h:0,end_h:typeof e.end_h==`number`?e.end_h:24,class_:i};typeof e.min_reserve_soc==`number`&&(a.min_reserve_soc=e.min_reserve_soc),t.push(a)}return t}var Xa=()=>({weekdays:[0,1,2,3,4],start_h:6,end_h:22,class_:`high`});function Za(e){if(!e||typeof e!=`object`||Array.isArray(e))return{service:``,entity:``};let t=e,n=typeof t.action==`string`?t.action:typeof t.service==`string`?t.service:``,r=t.target,i=r&&typeof r==`object`&&!Array.isArray(r)?r.entity_id:void 0;return{service:n,entity:typeof i==`string`?i:``}}function Qa(e,t){let n=e.trim();if(!n)return null;let r=t.trim();return r?{action:n,target:{entity_id:r}}:{action:n}}function $a(e,t){return typeof e==`string`&&t.includes(e)?e:typeof e==`number`&&t.includes(String(e))?String(e):t[0]??``}function eo(e){return typeof e==`string`&&/^\d{2}:\d{2}/.test(e)?e.slice(0,5):``}var to=[{id:`off`,phases:[`off`],group:`system`,label:`ladderOff`},{id:`force`,phases:[`force_discharge`],group:`system`,label:`ladderForce`},{id:`emergency`,phases:[`emergency`],group:`safety`,label:`ladderEmergency`},{id:`feed`,phases:[`feed_in_limit`],group:`plant`,label:`ladderFeed`},{id:`reserve`,phases:[`reserve_protection`],group:`safety`,label:`ladderReserve`},{id:`evcc`,phases:[`evcc_pause`],group:`loads`,label:`ladderEvcc`},{id:`price`,phases:[`grid_charge`,`grid_hold`],group:`tariff`,label:`ladderPrice`},{id:`ht`,phases:[`ht_protection`],group:`tariff`,label:`ladderHt`},{id:`hold`,phases:[`grid_hold`],group:`tariff`,label:`ladderHold`},{id:`morning`,phases:[`morning_discharge`],group:`loads`,label:`ladderMorning`},{id:`cap`,phases:[`morning_cap`],group:`pv`,label:`ladderCap`},{id:`astro`,phases:[`astro_wait`],group:`pv`,label:`ladderAstro`},{id:`hard`,phases:[`hard_soc_limit`],group:`safety`,label:`ladderHard`},{id:`floor`,phases:[`fast_floor`],group:`pv`,label:`ladderFloor`},{id:`low`,phases:[`corridor`],group:`pv`,label:`ladderLow`},{id:`grid`,phases:[`grid_charge`],group:`tariff`,label:`ladderGrid`},{id:`corridor`,phases:[`corridor`,`pv_delay`],group:`pv`,label:`ladderCorridor`},{id:`spread`,phases:[`spreading`],group:`pv`,label:`ladderSpread`},{id:`curtail`,phases:[`curtailment_guard`],group:`pv`,label:`ladderCurtail`},{id:`idle`,phases:[`idle`],group:`pv`,label:`ladderIdle`}],no=[{id:`safety`,label:`ladderBandSafety`,steps:[`off`,`force`,`emergency`,`feed`,`reserve`]},{id:`tariff`,label:`ladderBandTariff`,steps:[`evcc`,`price`,`ht`,`hold`]},{id:`blocks`,label:`ladderBandBlocks`,steps:[`morning`,`cap`,`astro`,`hard`]},{id:`pv`,label:`ladderBandPv`,steps:[`floor`,`low`,`grid`,`corridor`,`spread`]},{id:`rest`,label:`ladderBandRest`,steps:[`curtail`,`idle`]}],ro=new Map(to.map(e=>[e.id,e]));function io(e,t=!1,n=!1){if(e)return e===`grid_charge`?t?`price`:`grid`:e===`grid_hold`?t?`price`:`hold`:e===`corridor`?n?`low`:`corridor`:to.find(t=>t.phases.includes(e))?.id}function ao(e,t,n,r,i){let{t:a}=e,o=io(t,n,r);return M`<section class="ladder" aria-label=${a(`ladderTitle`)}>
    <div class="ladder-head">
      <h3>${a(`ladderTitle`)}</h3>
      <p>${a(`ladderHint`)}</p>
    </div>
    ${no.map(e=>M`<div class="ladder-band">
      <h4>${a(e.label)}</h4>
      <div class="ladder-steps">
        ${e.steps.map(e=>{let t=ro.get(e);if(!t)return M``;let n=e===o;return M`<button
            type="button"
            class="ladder-step ${n?`on`:``}"
            aria-current=${n?`true`:`false`}
            @click=${()=>i(t.group)}
          >${a(t.label)}</button>`})}
      </div>
    </div>`)}
  </section>`}var oo=e=>!e||e===`unknown`||e===`unavailable`||e===`none`,so=e=>{let t=t=>{let n=R[t];return n?e.hass.states[n]:void 0},n=e.hass.states[I.ctrlActive],r=e.hass.states[I.phase]?.state,i=e.hass.states[I.explanation]?.state;return{ready:e.options.ready,options:e.options.options,slots:e.options.slots.length,state:t=>e.hass.states[t]?.state,on:e=>{let n=t(e);if(n&&n.state!==`unavailable`&&n.state!==`unknown`)return B(n)},number:e=>z(t(e)),select:e=>{let n=t(e)?.state;return oo(n)?void 0:n},phase:oo(r)?void 0:r,explanation:oo(i)?void 0:i,regulation:!n||oo(n.state)?void 0:n.state===`on`}},co={plant:{title:`setupPlant`,hint:`setupPlantHint`,done:`setupPlantOk`,open:`setupPlantMissing`},tariff:{title:`setupTariff`,hint:`setupTariffHint`,done:`setupTariffOk`,open:`setupTariffMissing`},forecast:{title:`setupForecast`,hint:`setupForecastHint`,done:`setupForecastOk`,open:`setupForecastOpen`},safety:{title:`setupSafety`,hint:`setupSafetyHint`,done:`setupSafetyOk`,open:`setupSafetyOpen`},loads:{title:`setupLoads`,hint:`setupLoadsHint`,done:`setupLoadsOk`,open:`setupLoadsOpen`},regulation:{title:`setupRegulation`,hint:`setupRegulationHint`,done:`setupRegulationOk`,open:`setupRegulationOff`},run:{title:`setupRun`,hint:`setupRunHint`,done:`setupRunOk`,open:`setupRunOff`}},lo={done:`✓`,todo:`!`,optional:`·`,wait:`…`},uo=(e,t)=>{let{t:n}=e.i18n;return t.status===`wait`?t.id===`run`?n(`setupRunWait`):n(`setupStatusWait`):t.status===`done`?t.note??n(co[t.id].done):t.id===`plant`&&t.missing.length?n(`setupPlantMissing`,{names:t.missing.map(t=>Ka(e.hass.language,t)).join(`, `)}):n(co[t.id].open)},fo=(e,t)=>{let{t:n}=e.i18n,r=co[t.id],i=I.ctrlActive,a=e.hass.states[i]?.state===`on`,o=t.id===`regulation`?M`<button
          class="switch ${a?`on`:``}"
          role="switch"
          aria-checked=${a}
          aria-label=${n(r.title)}
          ?disabled=${e.pending.has(i)||!e.hass.states[i]}
          @click=${()=>e.onToggle(i)}
        ></button>`:t.area?M`<button type="button" class="btn" @click=${()=>e.onOpenGroup(t.area)}>${n(`setupOpen`)}</button>`:P;return M`<li class="setup-step ${t.status}">
    <span class="setup-mark ${t.status}" aria-hidden="true">${lo[t.status]}</span>
    <div>
      <b>${n(r.title)}</b>
      <span class="tag">${n(t.status===`done`?`setupStatusDone`:t.status===`todo`?`setupStatusTodo`:t.status===`optional`?`setupStatusOptional`:`setupStatusWait`)}</span>
      <p>${n(r.hint)}</p>
      <p class="sub">${uo(e,t)}</p>
    </div>
    ${o}
  </li>`},po=(e,t)=>{let{t:n}=e.i18n,r=t.filter(e=>e.required),i=r.filter(e=>e.status===`done`).length;return M`<p class="setup-progress">${n(`setupProgress`,{done:i,total:r.length})}</p>
    ${e.options.error?M`<p class="err">${n(`setupOptionsError`,{err:e.options.error})}</p>`:P}
    <ol class="setup-steps">
      ${t.map(t=>fo(e,t))}
    </ol>`};function mo(e){return M`<div class="settings-detail">${po(e,Fa(so(e)))}</div>`}function ho(e){let{t}=e.i18n,n=Fa(so(e));return Ia(n)?e.setupAck?M``:M`<div class="setup-done">
      <button type="button" class="setup-done-open" @click=${()=>e.onOpenGroup(`setup`)}>
        <span class="setup-mark done" aria-hidden="true">✓</span>
        <span><b>${t(`setupDone`)}</b><span>${t(`setupDoneHint`)}</span></span>
      </button>
      <button type="button" class="btn" @click=${()=>e.onAckSetup?.()}>${t(`setupAck`)}</button>
    </div>`:M`<section class="card setup-card" aria-label=${t(`setupTitle`)}>
    <h2>${t(`setupTitle`)}</h2>
    <p class="sub">${t(`setupLead`)}</p>
    ${po(e,n)}
  </section>`}var go=e=>Object.keys(e.states).sort(),_o=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},vo=(e,t,n,r=!1,i=!1)=>M`<div class="${i?`setting-line stack`:`ctrl setting-row`} ${n&&!i?`locked`:``} ${r&&!i?`wide`:``}">
    <div class="txt"><span class="name"><b>${e}</b></span></div>
    ${t}
  </div>`;function yo(e,t,n){let r=e.options[t.key],i=typeof r==`number`?String(r):``;return t.unit===`%`&&t.min!==void 0&&t.max!==void 0?Zt({label:n,min:t.min,max:t.max,step:t.step??1,value:typeof r==`number`?r:t.min,unit:`%`,disabled:!e.isAdmin||e.pending.has(t.key),onCommit:n=>e.onChange(t.key,n)}):M`<label class="setting-num">
    <input
      type="number"
      inputmode="decimal"
      aria-label=${n}
      min=${t.min??P}
      max=${t.max??P}
      step=${t.step??`any`}
      ?disabled=${!e.isAdmin||e.pending.has(t.key)}
      ${Bt(e=>{e instanceof HTMLInputElement&&!_o(e)&&e.value!==i&&(e.value=i)})}
      @change=${n=>{let r=Number.parseFloat(n.target.value);Number.isFinite(r)&&e.onChange(t.key,r)}}
    />
  </label>`}function bo(e,t,n,r){let i=e.query[t.key]??``,a=i.trim()?Ja(go(e.hass),t.domains,i):[],o=e.options[t.key],s=r?Array.isArray(o)?o.filter(e=>typeof e==`string`):typeof o==`string`&&o?[o]:[]:[],c=!r&&typeof o==`string`?o:``;return M`<div class="opt-entity">
    ${r?M`<div class="opt-chips">
          ${s.map(n=>M`<button type="button" class="chip" ?disabled=${!e.isAdmin} @click=${()=>e.onChange(t.key,s.filter(e=>e!==n))}>${n}</button>`)}
        </div>`:P}
    <input
      type="search"
      aria-label=${n}
      placeholder=${e.i18n.t(`optSearch`)}
      .value=${i||c}
      ?disabled=${!e.isAdmin}
      @input=${n=>e.onQuery(t.key,n.target.value)}
      @change=${n=>{let i=n.target.value.trim();r?(i&&!s.includes(i)&&e.onChange(t.key,[...s,i]),e.onQuery(t.key,``)):(i||!t.required)&&e.onChange(t.key,i||null)}}
    />
    ${a.length?M`<div class="opt-choices">
          ${a.map(n=>M`<button
              type="button"
              ?disabled=${!e.isAdmin}
              @click=${()=>{r?e.onChange(t.key,s.includes(n)?s:[...s,n]):e.onChange(t.key,n),e.onQuery(t.key,``)}}
            >${n}</button>`)}
        </div>`:P}
    ${!t.required&&!r&&c?M`<button type="button" class="btn" ?disabled=${!e.isAdmin} @click=${()=>e.onChange(t.key,null)}>${e.i18n.t(`optClear`)}</button>`:P}
  </div>`}function xo(e,t){let n=Za(e.options[t.key]),r=(n,r)=>e.onChange(t.key,Qa(n,r));return M`<div class="opt-action">
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
  </div>`}var So=[`wd0`,`wd1`,`wd2`,`wd3`,`wd4`,`wd5`,`wd6`];function Co(e){let{t}=e.i18n,n=(t,n)=>e.onSlots(e.slots.map((e,r)=>r===t?n:e));return M`<section class="settings-section">
    <h3>${t(`secSlots`)}</h3>
    <p class="sub">${t(`secSlotsHint`)}</p>
    ${e.slots.map((r,i)=>M`<div class="slot-card">
        <div class="opt-days" role="group" aria-label=${t(`optWeekdays`)}>
          ${So.map((a,o)=>M`<button
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
      <button type="button" class="btn" ?disabled=${!e.isAdmin} @click=${()=>e.onSlots([...e.slots,Xa()])}>${t(`optAddSlot`)}</button>
      <button type="button" class="btn" ?disabled=${!e.isAdmin||e.pending.has(`tariff_slots`)} @click=${()=>e.onSaveSlots()}>${t(`optSaveSlots`)}</button>
    </div>
  </section>`}function wo(e,t,n=!1){let r=Ka(e.hass.language,t.key),i=!e.isAdmin;if(t.kind===`bool`){let a=e.options[t.key]===!0;return vo(r,M`<button class="switch ${a?`on`:``}" role="switch" aria-checked=${a} aria-label=${r} ?disabled=${i||e.pending.has(t.key)} @click=${()=>e.onChange(t.key,!a)}></button>`,i,!1,n)}if(t.kind===`number`)return vo(r,yo(e,t,r),i,t.unit===`%`,n);if(t.kind===`select`){let a=t.choices??[],o=$a(e.options[t.key],a);return vo(r,M`<select aria-label=${r} .value=${o} ?disabled=${i} @change=${n=>e.onChange(t.key,n.target.value)}>
        ${a.map(e=>M`<option value=${e} ?selected=${e===o}>${e}</option>`)}
      </select>`,i,!1,n)}return t.kind===`time`?vo(r,M`<input type="time" aria-label=${r} .value=${eo(e.options[t.key])} ?disabled=${i} @change=${n=>e.onChange(t.key,n.target.value)} />`,i,!1,n):t.kind===`text`?vo(r,M`<input aria-label=${r} .value=${typeof e.options[t.key]==`string`?e.options[t.key]:``} maxlength="64" ?disabled=${i} @change=${n=>e.onChange(t.key,n.target.value)} />`,i,!1,n):t.kind===`action`?vo(r,xo(e,t),i,!0,n):vo(r,bo(e,t,r,t.kind===`entities`),i,!0,n)}var To=e=>!e||e.state===`unknown`||e.state===`unavailable`?`–`:e.state,Eo={recommended_economic:`recEconomicHint`,recommended_technical:`recTechnicalHint`,recommended_balanced:`recBalancedHint`},Do=(e,t,n)=>typeof t==`number`&&Number.isFinite(t)?t.toLocaleString(e||`de`,{minimumFractionDigits:n,maximumFractionDigits:n}):void 0,Oo=(e,t,n)=>{let r=e.hass.states[I.sizingMatrix]?.attributes[t];if(!r||typeof r!=`object`)return M``;let i=r,a=(t,n,r)=>M`<div class="row"><span>${e.i18n.t(t)}</span><b>${n??`–`}${r}</b></div>`;return M`<div class="card">
    <h3>${e.i18n.t(n)}</h3>
    <p class="sub">${e.i18n.t(Eo[t])}</p>
    <div class="rows">
      ${a(`sizingBattery`,i.battery_kwh,` kWh`)}
      ${a(`sizingPv`,i.pv_kwp,` kWp`)}
      ${a(`sizingAutarky`,i.self_sufficiency_pct,` %`)}
      ${a(`sizingSavings`,i.savings_eur_per_year,` €`)}
      ${a(`sizingPayback`,i.payback_years,` a`)}
    </div>
    ${typeof i.reason==`string`?M`<p class="sub">${i.reason}</p>`:P}
  </div>`},ko=(e,t)=>{let n=e.hass.language,r=Do(n,t.slider_battery_kwh,1),i=Do(n,t.slider_pv_kwp,1),a=Do(n,t.scenario_self_sufficiency_pct,0),o=Do(n,t.scenario_savings_eur,0);if(!r||!i||!a||!o)return;let s=Do(n,t.scenario_payback_years,1);return s?e.i18n.t(`sizingStory`,{bat:r,pv:i,aut:a,save:o,years:s}):e.i18n.t(`sizingStoryOpen`,{bat:r,pv:i,aut:a,save:o})};function Ao(e,t,n){let{t:r}=e.i18n,i=e.hass.states[I.sizingStatus]?.state,a=r(i===`running`?`sizingRunning`:i===`ready`?`sizingReady`:`sizingNotRun`),o=e.hass.states[I.sizingScenario]?.attributes??{},s=e.hass.states[I.sizingMatrix]?.attributes??{},c=Array.isArray(s.top_savings_scenarios)?s.top_savings_scenarios:[],l=e=>typeof e==`number`&&Number.isFinite(e)?String(e):`–`,u=ko(e,o);return M`<div class="settings-detail">
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
        <button type="button" class="btn" ?disabled=${!e.hass.states[I.btnSizing]||i===`running`} @click=${()=>e.onRunSizing()}>${r(`sizingRun`)}</button>
        <span class="hint">${a}</span>
      </div>
    </section>
    <section class="settings-section">
      <h3>${r(`sizingScenario`)}</h3>
      <p class="sub">${u??r(`sizingNeedRun`)}</p>
      ${(()=>{let t=sr(o.scenario_monthly_avoided_kwh),n=sr(o.scenario_monthly_baseline_grid_in);return!t||!n?P:M`<maestro-chart .options=${Oi(`sizing-year`,[e.hass.language,t.join(`,`),n.join(`,`)],()=>cr(e.hass.language,t,n,r(`sizingChartAvoided`),r(`sizingChartBaseline`)))}></maestro-chart>
          <p class="hint">${r(`sizingChartCaption`)}</p>`})()}
      ${u?M`<div class="rows">
            <div class="row"><span>${r(`sizingAutarky`)}</span><b>${l(o.scenario_self_sufficiency_pct)} %</b></div>
            <div class="row"><span>${r(`sizingAvoided`)}</span><b>${l(o.scenario_avoided_kwh)} kWh</b></div>
            <div class="row"><span>${r(`sizingSavings`)}</span><b>${l(o.scenario_savings_eur)} €</b></div>
            <div class="row"><span>${r(`sizingInvestment`)}</span><b>${l(o.scenario_investment_eur)} €</b></div>
            <div class="row"><span>${r(`sizingPayback`)}</span><b>${l(o.scenario_payback_years)} a</b></div>
            <div class="row"><span>${r(`sizingInverter`)}</span><b>${To(e.hass.states[I.sizingInverter])}</b></div>
          </div>`:P}
    </section>
    <section class="settings-section">
      <h3>${r(`sizingRecs`)}</h3>
      <p class="sub">${r(`sizingRecsHint`)}</p>
      <div class="grid">${Oo(e,`recommended_economic`,`recEconomic`)}${Oo(e,`recommended_technical`,`recTechnical`)}${Oo(e,`recommended_balanced`,`recBalanced`)}</div>
      <div class="rows">
        <div class="row"><span>${r(`matrixDays`)}</span><b>${l(s.analysis_days)}</b></div>
        <div class="row"><span>${r(`matrixRecords`)}</span><b>${l(s.records_count)}</b></div>
        <div class="row"><span>${r(`matrixAnomaly`)}</span><b>${l(s.anomaly_rate_pct)} %</b></div>
        <div class="row"><span>${r(`sizingBaseline`)}</span><b>${l(s.baseline_grid_import_kwh)} kWh</b></div>
      </div>
      ${c.length?M`<div class="opt-top">
            ${c.map(e=>M`<div class="row"><span>${l(e.b)} kWh · ${l(e.p)} kWp</span><b>${l(e.savings)} €</b></div>`)}
          </div>`:P}
    </section>
    <section class="settings-section">
      <h3>${r(`sizingBasis`)}</h3>
      <p class="sub">${r(`sizingBasisHint`)}</p>
      ${n}
    </section>
    ${jo(e,`sizing`)}
  </div>`}function jo(e,t){let n=qa(t);if(!n.length&&t!==`tariff`)return M``;let{t:r}=e.i18n;return M`${e.notice?M`<p class="hint">${e.notice===`reload`?r(`optReload`):r(`optSaved`)}</p>`:P}
    ${e.error?M`<p class="err">${e.error}</p>`:P}
    ${e.isAdmin?P:M`<p class="hint">${r(`optAdmin`)}</p>`}
    ${n.map(t=>M`<section class="settings-section">
        <h3>${r(t.title)}</h3>
        <p class="sub">${r(t.hint)}</p>
        ${t.bundle?M`<div class="ctrl setting-bundle">${t.fields.map(t=>wo(e,t,!0))}</div>`:t.fields.map(t=>wo(e,t))}
      </section>`)}
    ${t===`tariff`?Co(e):P}`}var Mo={grid_charge_strategy:{de:`Aus: nie aus dem Netz. Zeitfenster: in NT-Fenstern. Preisschwelle: unter einem festen Preis. Automatisch: der Preisplan wählt die günstigsten Stunden. Experte: wie automatisch, mit eigenen Werten.`,en:`Off: never from the grid. Time windows: in off-peak windows. Price threshold: below a fixed price. Automatic: the price plan picks the cheapest hours. Expert: like automatic, with your own values.`},inverter_power:{de:`Gesamte WR-Leistung der Anlage inkl. zusätzlicher Erzeuger. Begrenzt die Entladung und skaliert die Last-Balken im Haus-Fluss.`,en:`Total plant inverter power including additional producers. Caps discharge and scales the house-flow load bars.`},installed_kwp:{de:`Installierte PV-Leistung. Daraus vergleicht Maestro den Tagesertrag.`,en:`Installed PV power. Maestro compares the day's yield against this.`},max_charge_power:{de:`Höchste Ladeleistung, die Maestro anfordern darf.`,en:`Highest charge power Maestro may request.`},min_charge_power:{de:`Unter dieser Leistung startet Maestro keine Ladung.`,en:`Maestro does not start charging below this power.`},feed_in_limit_percent:{de:`Anteil der Wechselrichterleistung, der höchstens ins Netz gehen darf.`,en:`Share of inverter power that may be exported at most.`},charge_threshold:{de:`Unter diesem SoC lädt Maestro sofort aus dem Netz. 0 schaltet die Notladung aus.`,en:`Below this SoC Maestro charges from the grid at once. 0 turns emergency charging off.`},advanced_corridor:{de:`Übersetzt die fehlende Strecke zum Ziel in eine Ladeleistung zwischen unterem und oberem Korridor, in Watt.`,en:`Turns the gap to the target into a charge power between the lower and upper corridor, in watts.`},lower_corridor:{de:`Kleinste Ladeleistung im Korridor, in Watt. Darunter pausiert die Ladung, wenn die Pause an ist.`,en:`Lowest charge power in the corridor, in watts. Charging pauses below it while the pause is on.`},upper_corridor:{de:`Größte Ladeleistung im erweiterten Korridor, in Watt.`,en:`Highest charge power in the advanced corridor, in watts.`},charge_target:{de:`SoC, den der Akku bis zum Ladeende erreichen soll.`,en:`SoC the battery should reach by the end of charging.`},winter_minimum_hour:{de:`Frist fürs Tagesziel am kürzesten Tag. Danach lädt Überschuss weiter.`,en:`Deadline for the daily target on the shortest day. Surplus keeps charging after that.`},summer_maximum_hour:{de:`Wird von der Regelung nicht gelesen. Das Sommer-Ladeende steht im anderen Feld.`,en:`The control logic does not read this. The summer end of charging is the other field.`},summer_charge_end:{de:`Frist fürs Tagesziel am längsten Tag. Dazwischen nach Tageslänge.`,en:`Deadline for the daily target on the longest day. Other days fall in between by day length.`},hard_soc_limit_enabled:{de:`Harter Deckel: darüber lädt Maestro den Akku nicht weiter.`,en:`Hard cap: Maestro will not charge the battery above it.`},hard_soc_limit:{de:`SoC, der mit dem harten Deckel nicht überschritten wird.`,en:`SoC the hard cap will not go past.`},fast_charge_floor_enabled:{de:`Unter dem Boden lädt Maestro mit voller Leistung, unabhängig vom Korridor.`,en:`Below the floor Maestro charges at full power, ignoring the corridor.`},fast_charge_floor_soc:{de:`SoC, unter dem die Schnellladung greift.`,en:`SoC below which fast charging applies.`},forward_looking_enabled:{de:`Plant die Ladung aus dem erwarteten Verbrauch der nächsten Stunden.`,en:`Plans charging from the expected consumption of the next hours.`},forward_looking_max_soc:{de:`Obergrenze für die vorausschauende Ladung.`,en:`Cap for look-ahead charging.`},pv_forecast_enabled:{de:`Verschiebt die Ladung, wenn die PV-Prognose den Bedarf deckt.`,en:`Delays charging when the PV forecast covers the need.`},delay_min_soc:{de:`Unter diesem SoC verzögert weder die Prognose noch das Warten auf die Sonne die Ladung.`,en:`Below this SoC neither the forecast nor waiting for the sun delays charging.`},pv_forecast_threshold_kwh:{de:`Ab dieser prognostizierten Energiemenge gilt der Tag als ergiebig genug.`,en:`From this forecast energy the day counts as productive enough.`},pv_forecast_safety_factor:{de:`Die Prognose wird um diesen Faktor vorsichtiger gerechnet.`,en:`The forecast is treated this much more cautiously.`},astro_enabled:{de:`Richtet Ladestart und Ladeende an Sonnenauf- und Untergang aus.`,en:`Aligns charge start and end with sunrise and sunset.`},charge_start_sunrise_offset_h:{de:`Stunden nach Sonnenaufgang, ab denen geladen werden darf.`,en:`Hours after sunrise before charging may start.`},charge_end_sunset_offset_h:{de:`Stunden vor Sonnenuntergang, zu denen das Ladeende liegen soll.`,en:`Hours before sunset when charging should finish.`},morning_cap_enabled:{de:`Hält den SoC am Morgen unter einer Grenze, damit PV-Ertrag noch hineinpasst.`,en:`Keeps the morning SoC under a limit so PV yield still fits.`},morning_cap_soc:{de:`SoC, den der Morning-Cap am Morgen nicht überschreitet.`,en:`SoC the morning cap will not exceed.`},morning_cap_until_h:{de:`Lokale Stunde, bis zu der der Morning-Cap gilt.`,en:`Local hour until which the morning cap applies.`},gentle_charge_enabled:{de:`Lädt mit einem Bruchteil der möglichen Leistung, schonender für den Akku.`,en:`Charges at a fraction of the possible power, easier on the battery.`},gentle_charge_factor:{de:`Anteil der Ladeleistung im Schonmodus. 0,5 ist die Hälfte.`,en:`Share of charge power in gentle mode. 0.5 is half.`},spreading_enabled:{de:`Verteilt die Ladung über das Fenster, statt in einem Rutsch voll zu laden.`,en:`Spreads charging across the window instead of one full burst.`},spreading_target_soc:{de:`SoC, auf den die verteilte Ladung hinsteuert.`,en:`SoC the spread charging aims for.`},low_yield_priority_enabled:{de:`An ertragsarmen Tagen wird der Akku früher und höher geladen.`,en:`On low-yield days the battery is charged earlier and higher.`},low_yield_threshold:{de:`Unter diesem Anteil der Referenz gilt der Tag als ertragsarm.`,en:`Below this share of the reference the day counts as low yield.`},low_yield_reference_kwh:{de:`Feste Tagesreferenz in kWh. 0 übernimmt den automatischen Wert.`,en:`Fixed daily reference in kWh. 0 uses the automatic value.`},low_yield_reference_kwh_per_kwp:{de:`Erwartete kWh pro installiertem kWp für die automatische Referenz.`,en:`Expected kWh per installed kWp for the automatic reference.`},curtailment_guard_enabled:{de:`Lädt den Akku, sobald die Einspeisung an der Abregelgrenze kratzt.`,en:`Charges the battery once export nears the curtailment limit.`},curtailment_activation_w:{de:`Einspeiseleistung, ab der der Abregelschutz die Ladung startet.`,en:`Export power at which curtailment protection starts charging.`},curtailment_release_w:{de:`Unter dieser Einspeisung lässt der Abregelschutz wieder los.`,en:`Below this export, curtailment protection lets go again.`},two_tier_enabled:{de:`Lädt erst auf ein frühes Ziel und hebt es später am Tag an.`,en:`Charges to an early target first and raises it later in the day.`},charge_target_late:{de:`Höheres SoC-Ziel für den späteren Teil des Tages.`,en:`Higher SoC target for the later part of the day.`},late_charge_end_h:{de:`Stunde, ab der das spätere Ziel gilt.`,en:`Hour from which the later target applies.`},lower_corridor_pause_enabled:{de:`Pausiert die Mindestladung, solange der SoC im unteren Korridor liegt.`,en:`Pauses minimum charging while the SoC sits in the lower corridor.`},tariff_mode:{de:`Dein echter Vertrag. Fest: Kosten und PV-Ersparnis mit dem Bezugspreis; ein dynamischer Preis-Sensor erscheint daneben als Simulation. Dynamisch: Kosten und Ersparnis mit dem Preis-Sensor.`,en:`Your real contract. Fixed: cost and PV savings use the buy price; a dynamic price sensor shows beside them as a simulation. Dynamic: cost and savings use the price sensor.`},dynamic_tariff_enabled:{de:`Schaltet die Auswertung des dynamischen Preises für Regelung und Simulation ein.`,en:`Turns evaluation of the dynamic price on for control and simulation.`},fixed_buy_price:{de:`Echter Bezugspreis bei festem Tarif, in Euro pro kWh. Daraus werden die Hauptzahlen für Kosten und Ersparnis gerechnet.`,en:`Real buy price on a fixed tariff, in euros per kWh. Main cost and savings figures use this.`},feed_in_price:{de:`Vergütung pro eingespeister kWh. Der Preisplan rechnet sie gegen den Bezug.`,en:`Payment per exported kWh. The price plan weighs it against buying.`},battery_capex_eur:{de:`Anschaffungskosten des Akkus. Daraus rechnet der Preisplan den Verschleiß pro kWh.`,en:`Battery purchase cost. The price plan turns it into wear per kWh.`},battery_total_cycles:{de:`Erwartete Lebensdauer in Zyklen. Mehr Zyklen bedeuten weniger Verschleiß pro kWh.`,en:`Expected lifetime in cycles. More cycles mean less wear per kWh.`},cheap_threshold:{de:`Bis zu diesem Preis pro kWh gilt der Strom als günstig.`,en:`Up to this price per kWh the electricity counts as cheap.`},max_grid_charge_kwh:{de:`Höchstens so viele kWh darf Maestro an einem Tag aus dem Netz laden.`,en:`Maestro may charge at most this many kWh from the grid in one day.`},low_slot_grid_charge_enabled:{de:`Lädt im günstigen Zeitfenster aktiv aus dem Netz, nicht nur per Preisplan.`,en:`Actively charges from the grid in the cheap window, not only via the price plan.`},low_slot_target_soc:{de:`SoC, bis zu dem im günstigen Fenster aus dem Netz geladen wird.`,en:`SoC up to which the cheap window charges from the grid.`},low_slot_forecast_based:{de:`Die Lademenge folgt der Prognose. Das Ziel ist dann nur die Obergrenze.`,en:`The amount follows the forecast. The target is then only a cap.`},low_slot_hold_discharge:{de:`Sperrt die Entladung, sobald das Ziel im günstigen Fenster erreicht ist.`,en:`Blocks discharge once the cheap-window target is reached.`},price_plan_enabled:{de:`Berechnet den Plan und zeigt ihn. Der Akku wird davon noch nicht gesteuert.`,en:`Calculates the plan and shows it. It does not control the battery yet.`},price_plan_active:{de:`Setzt den Plan um: Netzladung in günstigen Slots und Halten der Entladung.`,en:`Executes the plan: grid charging in cheap slots and holding discharge.`},price_plan_max_soc:{de:`Der Plan lädt aus dem Netz höchstens bis zu diesem SoC.`,en:`The plan charges from the grid only up to this SoC.`},price_plan_min_spread:{de:`Mindestabstand zwischen günstigem und teurem Preis, damit sich Netzladung lohnt.`,en:`Minimum gap between cheap and expensive price for grid charging to pay off.`},price_plan_efficiency:{de:`Wirkungsgrad des Umwegs über den Akku. 0,9 heißt: 10 Prozent gehen verloren.`,en:`Round-trip efficiency. 0.9 means 10 percent is lost.`},price_plan_safety_factor:{de:`Der Plan rechnet den Verbrauch um diesen Faktor höher, damit der Akku nicht leerläuft.`,en:`The plan assumes consumption this much higher so the battery does not run empty.`},ht_enabled:{de:`Schützt den SoC im Hochtarif-Fenster vor Entladung.`,en:`Protects the SoC from discharge during the high-tariff window.`},ht_sat:{de:`Der Hochtarif-Schutz gilt auch am Samstag.`,en:`High-tariff protection also applies on Saturday.`},ht_sun:{de:`Der Hochtarif-Schutz gilt auch am Sonntag.`,en:`High-tariff protection also applies on Sunday.`},ht_on:{de:`Stunde, ab der das Hochtarif-Fenster gilt.`,en:`Hour when the high-tariff window starts.`},ht_off:{de:`Stunde, ab der das Hochtarif-Fenster endet.`,en:`Hour when the high-tariff window ends.`},ht_min:{de:`SoC, der im Hochtarif im Winter nicht unterschritten wird.`,en:`SoC that winter high-tariff hours will not go below.`},ht_sockel:{de:`SoC-Sockel zur Tag-und-Nacht-Gleiche, zwischen Winter- und Sommerwert.`,en:`SoC floor at the equinox, between the winter and summer values.`},seasonal_reserve_enabled:{de:`Die Notstromreserve folgt der Jahreszeit, höher im Winter, niedriger im Sommer.`,en:`The backup reserve follows the season, higher in winter, lower in summer.`},reserve_winter_percent:{de:`Notstromreserve zur Wintersonnenwende.`,en:`Backup reserve at the winter solstice.`},reserve_equinox_percent:{de:`Notstromreserve zur Tag-und-Nacht-Gleiche.`,en:`Backup reserve at the equinox.`},fixed_reserve_enabled:{de:`Ersetzt die saisonale Reserve durch einen festen SoC und lädt darunter aus dem Netz.`,en:`Replaces the seasonal reserve with a fixed SoC and charges from the grid below it.`},fixed_reserve_soc:{de:`Fester SoC der Notstromreserve. Darunter ist die Entladung gesperrt.`,en:`Fixed backup SoC. Discharge is blocked below it.`},adaptive_reserve_enabled:{de:`Hebt die Reserve anhand des Verbrauchs der letzten Tage an.`,en:`Raises the reserve from the consumption of recent days.`},evcc_enabled:{de:`Begrenzt die Entladung, während EVCC das Auto im Now-Modus lädt.`,en:`Limits discharge while EVCC charges the car in now mode.`},evcc_discharge_limit_w:{de:`Höchste Entladung in Watt, solange EVCC im Now-Modus lädt.`,en:`Highest discharge in watts while EVCC charges in now mode.`},wallbox_enabled:{de:`Maestro steuert den Ladestrom der Wallbox nach Überschuss.`,en:`Maestro controls the wallbox current from surplus.`},wallbox_type:{de:`Welche Wallbox Maestro anspricht. Die Leistungswerte hängen davon ab.`,en:`Which wallbox Maestro talks to. The power figures depend on it.`},wallbox_min_current:{de:`Niedrigster Ladestrom. Darunter schaltet Maestro die Wallbox aus.`,en:`Lowest charge current. Below it Maestro switches the wallbox off.`},wallbox_max_current:{de:`Höchster Ladestrom, den Maestro der Wallbox gibt.`,en:`Highest charge current Maestro gives the wallbox.`},wallbox_min_surplus:{de:`Überschuss, ab dem die Wallbox laden darf.`,en:`Surplus from which the wallbox may charge.`},wallbox_discharge_guard_enabled:{de:`Stoppt die Wallbox, wenn der Akku dafür zu stark entladen würde.`,en:`Stops the wallbox when it would discharge the battery too hard.`},wallbox_discharge_guard_threshold_w:{de:`Ab dieser Akku-Entladung greift der Netzschutz der Wallbox.`,en:`Wallbox grid protection starts at this battery discharge.`},hp_enabled:{de:`Gibt die Wärmepumpe nur bei Überschuss und passendem Preis frei.`,en:`Releases the heat pump only with surplus and a suitable price.`},hp_min_surplus:{de:`Überschuss, ab dem die Wärmepumpe laufen darf.`,en:`Surplus from which the heat pump may run.`},hp_max_price:{de:`Über diesem Strompreis bleibt die Wärmepumpe aus.`,en:`Above this electricity price the heat pump stays off.`},hp_min_run_minutes:{de:`Mindestlaufzeit, damit die Wärmepumpe nicht taktet.`,en:`Minimum runtime so the heat pump does not short-cycle.`},hp_min_pause_minutes:{de:`Mindestpause zwischen zwei Läufen der Wärmepumpe.`,en:`Minimum pause between two heat-pump runs.`},morning_discharge_mode:{de:`Wie der Akku vor dem PV-Tag geleert wird: aus, fest oder nach Preis.`,en:`How the battery is emptied before the PV day: off, fixed, or by price.`},morning_unload_soc:{de:`SoC, auf den die Vorentladung am Morgen hinuntergeht.`,en:`SoC the morning pre-discharge goes down to.`},morning_unload_start_soc:{de:`Erst oberhalb dieses SoC startet die Vorentladung.`,en:`Pre-discharge starts only above this SoC.`},pre_discharge_offset_h:{de:`Stunden vor dem Ladestart, ab denen vorentladen wird.`,en:`Hours before charge start when pre-discharge may begin.`},pre_discharge_max_power_w:{de:`Höchste Leistung der Vorentladung.`,en:`Highest power of the pre-discharge.`},pre_discharge_tibber_auto:{de:`Entlädt morgens nur, wenn der Strompreis unter der Tibber-Schwelle liegt.`,en:`Discharges in the morning only when the price is under the Tibber threshold.`},morning_grid_export_threshold:{de:`Unter diesem Preis darf die Vorentladung ins Netz gehen.`,en:`Below this price the pre-discharge may export to the grid.`},regelung_aktiv:{de:`Hauptschalter. Aus heißt: Maestro sendet keine Limits mehr. Beim Ausschalten wählst du 1, 3, 6, 12 oder 24 Stunden oder dauerhaft. Die Stellung und die restliche Zeit bleiben nach einem Neustart.`,en:`Master switch. Off means Maestro stops sending limits. Turning it off offers 1, 3, 6, 12 or 24 hours, or until turned on. The position and the time left survive a restart.`},auto_mode_enabled:{de:`Rechnet einmal täglich passende Regelparameter aus dem Verbrauchs- und PV-Verlauf aus. Braucht mindestens 7 Tage Daten.`,en:`Works out fitting control parameters once a day from consumption and PV history. Needs at least 7 days of data.`},auto_mode_objective:{de:`Worauf die Auto-Optimierung achtet: Eigenverbrauch, Kosten oder CO₂.`,en:`What the auto optimisation aims for: self-consumption, cost or CO₂.`},force_discharge:{de:`Entlädt den Akku mit der eingestellten Leistung, unabhängig vom Plan.`,en:`Discharges the battery at the set power, ignoring the plan.`},force_discharge_power_w:{de:`Leistung der erzwungenen Entladung in Watt.`,en:`Power of the forced discharge in watts.`},soc_hysteresis_percent:{de:`SoC-Änderung, die Maestro ignoriert, damit die Regelung nicht pendelt.`,en:`SoC change Maestro ignores so control does not hunt.`},charge_ramp_w_per_cycle:{de:`Wie schnell die Ladeleistung pro Takt ansteigen darf.`,en:`How fast charge power may rise per cycle.`},update_interval:{de:`Sekunden zwischen zwei Regel-Durchläufen. Standard 30 s, möglich 10–120 s.`,en:`Seconds between two control cycles. Default 30 s, range 10–120 s.`},watchdog_timeout:{de:`Nach diesen Sekunden ohne Kontakt hebt der Wechselrichter die Limits auf.`,en:`After these seconds without contact the inverter clears the limits.`},debug:{de:`Schreibt ausführliche Regelentscheidungen ins Log.`,en:`Writes detailed control decisions to the log.`},reset_stats:{de:`Setzt die Tageszähler zurück. Die Regelung selbst bleibt, wie sie ist.`,en:`Resets the daily counters. Control itself stays as it is.`},clear_limits:{de:`Hebt die gesetzten Lade- und Entladelimits am Wechselrichter sofort auf.`,en:`Clears the charge and discharge limits on the inverter immediately.`}},No=(e,t)=>{let n=Mo[t];if(n)return e.toLowerCase().startsWith(`de`)?n.de:n.en},Po,Fo=new Set,Io=class extends Me{constructor(...e){super(...e),this.text=``,this.label=`Hilfe`,this.open=!1,this.onOutside=e=>{e.composedPath().includes(this)||this.close()},this.onKey=e=>{e.key===`Escape`&&this.close()}}createRenderRoot(){return this}disconnectedCallback(){super.disconnectedCallback(),this.close()}toggle(e){if(e.preventDefault(),e.stopPropagation(),this.open)this.close();else{for(let e of Fo)e!==this&&e.close();this.open=!0,Fo.add(this),this.requestUpdate(),window.addEventListener(`pointerdown`,this.onOutside,!0),window.addEventListener(`keydown`,this.onKey)}}close(){window.removeEventListener(`pointerdown`,this.onOutside,!0),window.removeEventListener(`keydown`,this.onKey),Fo.delete(this),this.open&&(this.open=!1,this.requestUpdate())}updated(){let e=this.querySelector(`.tip`);if(!(e instanceof HTMLElement))return;let t=this.getRootNode(),n=t instanceof ShadowRoot?t.host.getBoundingClientRect():{left:0,right:window.innerWidth,width:window.innerWidth};e.style.width=`${Math.min(280,n.width-24)}px`,e.style.transform=`translateY(-50%)`;let r=e.getBoundingClientRect(),i=0;r.right>n.right-12&&(i=n.right-12-r.right),r.left+i<n.left+12&&(i=n.left+12-r.left),e.style.transform=`translate(${i}px, -50%)`}render(){return M`<button
        type="button"
        class="info"
        aria-label=${this.label}
        aria-expanded=${this.open}
        @click=${this.toggle}
      >i</button>
      ${this.open?M`<div class="tip" role="tooltip">${this.text}</div>`:P}`}};Po=Io,Po.properties={text:{type:String},label:{type:String}},customElements.get(`maestro-setting-tip`)||customElements.define(`maestro-setting-tip`,Io);var Lo=(e,t,n,r,i)=>({id:e,title:t,hint:n,icon:r,sections:i,rows:i.flatMap(e=>e.rows)}),W=(e,t,n,r=!1)=>({title:e,hint:t,rows:n,...r?{fold:!0}:{}}),Ro=[Lo(`plant`,`setPlant`,`setPlantHint`,`<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/>`,[W(`secPlantPower`,`secPlantPowerHint`,[`inverter_power`,`installed_kwp`,`max_charge_power`,`min_charge_power`,`feed_in_limit_percent`])]),Lo(`safety`,`setSafety`,`setSafetyHint`,`<path d="M12 3 5 6v6c0 4.5 3 7 7 9 4-2 7-4.5 7-9V6z"/>`,[W(`secEmergency`,`secEmergencyHint`,[`charge_threshold`]),W(`secReserve`,`secReserveHint`,[`fixed_reserve_enabled`,`fixed_reserve_soc`,`seasonal_reserve_enabled`,`reserve_winter_percent`,`reserve_equinox_percent`,`adaptive_reserve_enabled`]),W(`secHard`,`secHardHint`,[`hard_soc_limit_enabled`,`hard_soc_limit`]),W(`secWatchdog`,`secWatchdogHint`,[`watchdog_timeout`])]),Lo(`tariff`,`setTariff`,`setTariffHint`,`<path d="M12 3v18"/><path d="M16 7.5A3.2 3.2 0 0 0 12.8 5H10a2.8 2.8 0 0 0 0 5.6h4a2.8 2.8 0 0 1 0 5.6H9.5A3.2 3.2 0 0 1 7 13.5"/>`,[W(`secStrategy`,`secStrategyHint`,[`grid_charge_strategy`,`price_plan_active`]),W(`secLimits`,`secLimitsHint`,[`max_grid_charge_kwh`,`cheap_threshold`,`low_slot_target_soc`,`price_plan_max_soc`,`low_slot_forecast_based`,`low_slot_hold_discharge`]),W(`secPlanTune`,`secPlanTuneHint`,[`price_plan_min_spread`,`price_plan_efficiency`,`price_plan_safety_factor`]),W(`secHt`,`secHtHint`,[`ht_enabled`,`ht_on`,`ht_off`,`ht_min`,`ht_sockel`,`ht_sat`,`ht_sun`]),W(`secCosts`,`secCostsHint`,[`fixed_buy_price`,`feed_in_price`,`battery_capex_eur`,`battery_total_cycles`]),W(`secSwitches`,`secSwitchesHint`,[`tariff_mode`,`dynamic_tariff_enabled`,`low_slot_grid_charge_enabled`,`price_plan_enabled`])]),Lo(`pv`,`setPv`,`setPvHint`,`<circle cx="12" cy="12" r="3.5"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>`,[W(`secCorridor`,`secCorridorHint`,[`charge_target`,`two_tier_enabled`,`charge_target_late`,`late_charge_end_h`]),W(`secWindows`,`secWindowsHint`,[`astro_enabled`,`charge_start_sunrise_offset_h`,`charge_end_sunset_offset_h`,`winter_minimum_hour`,`summer_charge_end`,`morning_cap_enabled`,`morning_cap_soc`,`morning_cap_until_h`]),W(`secShape`,`secShapeHint`,[`fast_charge_floor_enabled`,`fast_charge_floor_soc`,`spreading_enabled`,`spreading_target_soc`,`gentle_charge_enabled`,`gentle_charge_factor`,`advanced_corridor`,`lower_corridor`,`upper_corridor`,`lower_corridor_pause_enabled`],!0),W(`secYield`,`secYieldHint`,[`pv_forecast_enabled`,`delay_min_soc`,`pv_forecast_threshold_kwh`,`pv_forecast_safety_factor`,`forward_looking_enabled`,`forward_looking_max_soc`,`low_yield_priority_enabled`,`low_yield_threshold`,`low_yield_reference_kwh`,`low_yield_reference_kwh_per_kwp`,`curtailment_guard_enabled`,`curtailment_activation_w`,`curtailment_release_w`],!0)]),Lo(`loads`,`setLoads`,`setLoadsHint`,`<path d="M9 7v4M15 7v4"/><path d="M8 11h8v2a4 4 0 0 1-8 0z"/><path d="M12 17v3"/>`,[W(`secWallbox`,`secWallboxHint`,[`wallbox_enabled`,`wallbox_type`,`wallbox_min_current`,`wallbox_max_current`,`wallbox_min_surplus`,`wallbox_discharge_guard_enabled`,`wallbox_discharge_guard_threshold_w`]),W(`secEvcc`,`secEvccHint`,[`evcc_enabled`,`evcc_discharge_limit_w`]),W(`secHp`,`secHpHint`,[`hp_enabled`,`hp_min_surplus`,`hp_max_price`,`hp_min_run_minutes`,`hp_min_pause_minutes`]),W(`secMorning`,`secMorningHint`,[`morning_discharge_mode`,`morning_unload_soc`,`morning_unload_start_soc`,`pre_discharge_offset_h`,`pre_discharge_max_power_w`,`pre_discharge_tibber_auto`,`morning_grid_export_threshold`])]),Lo(`auto`,`setAuto`,`setAutoHint`,`<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="3"/>`,[W(`secAuto`,`secAutoHint`,[`auto_mode_enabled`,`auto_mode_objective`])]),Lo(`system`,`setSystem`,`setSystemHint`,`<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>`,[W(`secRun`,`secRunHint`,[`regelung_aktiv`,`force_discharge`,`force_discharge_power_w`]),W(`secPace`,`secPaceHint`,[`soc_hysteresis_percent`,`charge_ramp_w_per_cycle`,`update_interval`]),W(`secDiag`,`secDiagHint`,[`debug`,`reset_stats`,`clear_limits`])])],zo={hardware:`plant`,corridor:`pv`,windows:`pv`,yield:`pv`,reserve:`safety`,flex:`loads`,control:`system`,diag:`system`},Bo={reset_stats:`confirmReset`},Vo={id:`classic`,title:`setClassic`,hint:`setClassicHint`,icon:`<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>`},Ho={id:`look`,title:`setLook`,hint:`setLookHint`,icon:`<circle cx="12" cy="12" r="4"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6"/>`},Uo={id:`setup`,title:`setSetup`,hint:`setSetupHint`,icon:`<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>`},Wo={id:`sizing`,title:`setSizing`,hint:`setSizingHint`,icon:`<path d="M4 19V5M4 19h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>`},Go=[`sizing_hypothetical_battery_kwh`,`sizing_hypothetical_pv_kwp`],Ko=[`sizing_price_battery_kwh`,`sizing_price_pv_kwp`,`sizing_price_inverter`,`sizing_price_extra`],qo=e=>e===Vo.id||e===Ho.id||e===Wo.id||e===Uo.id||Ro.some(t=>t.id===e);function Jo(e){if(!e)return;let t=zo[e]??e;return qo(t)?t:void 0}var Yo=e=>e===Vo.id?Vo:e===Ho.id?Ho:e===Wo.id?Wo:e===Uo.id?Uo:Ro.find(t=>t.id===e),Xo=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},Zo=(e,t)=>{let n=e?.attributes.friendly_name;return typeof n==`string`&&n.trim()?n.trim():t},Qo=e=>{let t=e?.attributes.unit_of_measurement;return typeof t==`string`?t:``},$o=(e,t)=>{let n=e?.attributes[t];return typeof n==`number`&&Number.isFinite(n)?n:void 0};function es(e,t,n,r){let i=e.hass.states[t],a=B(i);return M`<button
    class="switch ${a?`on`:``}"
    role="switch"
    aria-checked=${a}
    aria-label=${n}
    ?disabled=${r||e.pending.has(t)}
    @click=${()=>e.onToggle(t)}
  ></button>`}function ts(e,t,n,r,i){let a=z(n),o=a===void 0?``:String(a),s=$o(n,`min`),c=$o(n,`max`),l=$o(n,`step`),u=Qo(n),d=u===`%`;return(n?.attributes.mode===`slider`||d)&&s!==void 0&&c!==void 0?Zt({label:r,min:s,max:c,step:l??1,value:a??s,unit:u,disabled:i||e.pending.has(t),onCommit:n=>e.onNumber(t,n)}):M`<label class="setting-num">
    <input
      type="number"
      inputmode="decimal"
      aria-label=${r}
      min=${s??P}
      max=${c??P}
      step=${l??`any`}
      ?disabled=${i||e.pending.has(t)}
      ${Bt(e=>{e instanceof HTMLInputElement&&!Xo(e)&&e.value!==o&&(e.value=o)})}
      @change=${n=>{let r=Number.parseFloat(n.target.value);Number.isFinite(r)&&e.onNumber(t,r)}}
    />
    ${u?M`<span>${u}</span>`:P}
  </label>`}function ns(e,t,n,r){let i=Array.isArray(n?.attributes.options)?n.attributes.options:[];return M`<select
    .value=${n?.state??``}
    aria-label=${Zo(n,t)}
    ?disabled=${r||!i.length||e.pending.has(t)}
    @change=${n=>e.onSelect(t,n.target.value)}
  >
    ${i.map(t=>M`<option value=${t} ?selected=${t===n?.state}>${e.i18n.option(t)}</option>`)}
  </select>`}function rs(e,t,n=!1,r=!1){let i=R[t];if(!i)return P;let a=e.hass.states[i],o=et(t);if(!a&&!o)return P;let s=o||!a||a.state===`unavailable`,c=s||n,l=Zo(a,t),u=i.split(`.`,1)[0],d=u===`switch`?es(e,i,l,c):u===`number`?ts(e,i,a,l,c):u===`select`?ns(e,i,a,c):u===`button`?M`<button
                class="btn"
                ?disabled=${c||e.pending.has(i)}
                @click=${()=>{let n=Bo[t];(!n||window.confirm(e.i18n.t(n)))&&e.onPress(i)}}
              >${l}</button>`:P,f=No(e.hass.language,t),p=t===`regelung_aktiv`?Wt(e.i18n.t,a):void 0;return M`<div class="${r?`setting-line`:`ctrl setting-row`} ${r&&u===`number`?`stack`:``} ${s||n&&!r?`locked`:``}">
    <div class="txt">
      <span class="name"><b>${l}</b>${f?M`<maestro-setting-tip .text=${f} .label=${e.i18n.t(`settingHelp`)}></maestro-setting-tip>`:P}</span>
      ${p?M`<span>${p}</span>`:P}
      ${o?M`<span>${e.i18n.t(`entityDisabled`)}</span>`:P}
    </div>
    ${d}
  </div>`}var is=(e,t)=>t.rows.some(t=>{let n=R[t];return!!n&&(!!e.hass.states[n]||et(t))}),as=(e,t,n,r,i)=>M`<button type="button" class="settings-tile" @click=${()=>e.onOpenGroup(t)}>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${n}></svg>
  <b>${e.i18n.t(r)}</b>
  <span>${e.i18n.t(i)}</span>
</button>`;function os(e,t,n){let{t:r}=e.i18n,i=r(n===void 0?`classicDepVia`:n?`classicInstalled`:`classicMissing`);return M`<div class="dep"><b>${r(t)}</b><span class=${n===void 0?``:n?`ok`:`bad`}>${i}</span></div>`}function ss(e){let{t}=e.i18n,n=e.classic,r=n?.state??`checking`,i=M`<button type="button" class="btn primary" @click=${()=>e.onOpenClassic()}>${t(`classicOpen`)}</button>`;if(r===`checking`)return M`<p>${t(`classicChecking`)}</p>`;if(r===`ours`)return M`<p class="ok">${t(`classicReady`)}</p>${i}`;if(r===`foreign`)return M`<p class="bad">${t(`classicForeign`)}</p>`;if(r===`error`)return M`<p class="bad">${t(`classicFailed`,{err:n?.error??``})}</p>
      <button type="button" class="btn" @click=${()=>e.onCheckClassic()}>${t(`classicRetry`)}</button>`;if(!e.isAdmin)return M`<p>${t(`classicAdminOnly`)}</p>`;let a=r===`creating`;return M`${r===`empty`?M`<p>${t(`classicEmpty`)}</p>`:P}
    <button type="button" class="btn primary" ?disabled=${a} @click=${()=>e.onCreateClassic()}>
      ${t(a?`classicCreating`:r===`empty`?`classicSetup`:`classicCreate`)}
    </button>`}function cs(e){let{t}=e.i18n,n=[`classicStep1`,`classicStep2`,`classicStep3`,`classicStep4`,`classicStep5`],r=e.classic?.mushroom===!1||e.classic?.apex===!1;return M`<div class="guide">
    <p>${t(`classicLead`)}</p>
    <h3>${t(`classicDepsTitle`)}</h3>
    ${os(e,`classicDepMushroom`,e.classic?.mushroom)}
    ${os(e,`classicDepApex`,e.classic?.apex)}
    ${r?M`<p class="bad">${t(`classicDepsMissing`)}</p>`:P}
    <h3>${t(`classicActionTitle`)}</h3>
    <div class="classic-action">${ss(e)}</div>
    <p>${t(`classicAfter`)}</p>
    <details>
      <summary>${t(`classicManual`)}</summary>
      <ol>${n.map(e=>M`<li>${t(e)}</li>`)}</ol>
      <p>${t(`classicHa`)}</p>
      <p>${t(`classicPath`)}</p>
      <p>${t(`classicTimeout`)}</p>
    </details>
  </div>`}var ls=[`off`,`slots`,`threshold`,`dynamic_auto`,`dynamic_expert`],us=e=>{let t=R.grid_charge_strategy,n=t?e.states[t]?.state:void 0;return ls.find(e=>e===n)},ds=e=>e===`dynamic_auto`||e===`dynamic_expert`,fs=e=>e===`slots`||e===`threshold`,ps={price_plan_active:e=>ds(e.strategy),max_grid_charge_kwh:e=>e.strategy!==`off`,cheap_threshold:e=>e.strategy===`threshold`,low_slot_target_soc:e=>fs(e.strategy),price_plan_max_soc:e=>ds(e.strategy),low_slot_forecast_based:e=>fs(e.strategy)&&e.expert,low_slot_hold_discharge:e=>fs(e.strategy)&&e.expert,price_plan_min_spread:e=>e.strategy===`dynamic_expert`,price_plan_efficiency:e=>e.strategy===`dynamic_expert`,price_plan_safety_factor:e=>e.strategy===`dynamic_expert`,tariff_mode:e=>e.expert,dynamic_tariff_enabled:e=>e.expert,low_slot_grid_charge_enabled:e=>e.expert,price_plan_enabled:e=>e.expert};function ms(e,t){if(!t.strategy)return!0;let n=ps[e];return!n||n({strategy:t.strategy,expert:t.expert})}var hs={charge_start_sunrise_offset_h:e=>e.astro!==!1,charge_end_sunset_offset_h:e=>e.astro!==!1,winter_minimum_hour:e=>e.astro!==!0,summer_charge_end:e=>e.astro!==!0,pv_forecast_threshold_kwh:e=>e.expert,pv_forecast_safety_factor:e=>e.expert,low_yield_threshold:e=>e.expert,low_yield_reference_kwh:e=>e.expert,low_yield_reference_kwh_per_kwp:e=>e.expert};function gs(e,t){let n=hs[e];return!n||n(t)}var _s={charge_target_late:[`two_tier_enabled`],late_charge_end_h:[`two_tier_enabled`],morning_cap_soc:[`morning_cap_enabled`],morning_cap_until_h:[`morning_cap_enabled`],fast_charge_floor_soc:[`fast_charge_floor_enabled`],spreading_target_soc:[`spreading_enabled`],gentle_charge_factor:[`gentle_charge_enabled`],upper_corridor:[`advanced_corridor`],lower_corridor:[`advanced_corridor`,`lower_corridor_pause_enabled`],delay_min_soc:[`pv_forecast_enabled`,`astro_enabled`],pv_forecast_threshold_kwh:[`pv_forecast_enabled`],pv_forecast_safety_factor:[`pv_forecast_enabled`],forward_looking_max_soc:[`forward_looking_enabled`],low_yield_threshold:[`low_yield_priority_enabled`],low_yield_reference_kwh:[`low_yield_priority_enabled`],low_yield_reference_kwh_per_kwp:[`low_yield_priority_enabled`],curtailment_activation_w:[`curtailment_guard_enabled`],curtailment_release_w:[`curtailment_guard_enabled`]};function vs(e,t){let n=_s[e];if(!n)return!1;let r=n.map(t);return!r.some(e=>e===void 0)&&r.every(e=>!e)}var ys={fixed_reserve_enabled:[`fixed_reserve_soc`],seasonal_reserve_enabled:[`reserve_winter_percent`,`reserve_equinox_percent`],hard_soc_limit_enabled:[`hard_soc_limit`],ht_enabled:[`ht_on`,`ht_off`,`ht_min`,`ht_sockel`,`ht_sat`,`ht_sun`],two_tier_enabled:[`charge_target_late`,`late_charge_end_h`],astro_enabled:[`charge_start_sunrise_offset_h`,`charge_end_sunset_offset_h`],morning_cap_enabled:[`morning_cap_soc`,`morning_cap_until_h`],fast_charge_floor_enabled:[`fast_charge_floor_soc`],spreading_enabled:[`spreading_target_soc`],gentle_charge_enabled:[`gentle_charge_factor`],advanced_corridor:[`upper_corridor`],pv_forecast_enabled:[`delay_min_soc`,`pv_forecast_threshold_kwh`,`pv_forecast_safety_factor`],forward_looking_enabled:[`forward_looking_max_soc`],low_yield_priority_enabled:[`low_yield_threshold`,`low_yield_reference_kwh`,`low_yield_reference_kwh_per_kwp`],curtailment_guard_enabled:[`curtailment_activation_w`,`curtailment_release_w`],wallbox_enabled:[`wallbox_type`,`wallbox_min_current`,`wallbox_max_current`,`wallbox_min_surplus`],wallbox_discharge_guard_enabled:[`wallbox_discharge_guard_threshold_w`],evcc_enabled:[`evcc_discharge_limit_w`],hp_enabled:[`hp_min_surplus`,`hp_max_price`,`hp_min_run_minutes`,`hp_min_pause_minutes`],auto_mode_enabled:[`auto_mode_objective`],force_discharge:[`force_discharge_power_w`]};function bs(e){let t=new Set(e),n=new Set;for(let[e,r]of Object.entries(ys))if(t.has(e))for(let e of r)t.has(e)&&n.add(e);return e.filter(e=>!n.has(e)).map(e=>({key:e,children:(ys[e]??[]).filter(e=>t.has(e))}))}var xs=(e,t)=>{let n=R[t],r=n?e.states[n]?.state:void 0;if(r===`on`)return!0;if(r===`off`)return!1};function Ss(e,t,n=()=>!1){return bs(t).map(({key:t,children:r})=>{if(!r.length)return rs(e,t,n(t));let i=xs(e.hass,t)===!1,a=e=>{let r=_s[e];return r&&(r.length>1||r[0]!==t)?n(e):i||n(e)},o=r.every(a);return M`<div class="ctrl setting-bundle">
      ${rs(e,t,!1,!0)}
      <div class="bundle-fields ${o?`quiet`:``}">
        ${r.map(t=>rs(e,t,a(t),!0))}
      </div>
    </div>`})}var Cs=(e,t)=>{let n=R[t],r=n?z(e.states[n]):void 0;if(r===void 0)return`–`;let i=Math.round(r*60),a=Math.floor(i/60)%24,o=(i%60+60)%60;return`${String(a).padStart(2,`0`)}:${String(o).padStart(2,`0`)}`},ws=(Ro.find(e=>e.id===`tariff`)?.sections??[]).filter(e=>[`secStrategy`,`secLimits`,`secPlanTune`,`secSwitches`].includes(e.title)),Ts=`e3dc-maestro.settings-expert`,Es=`e3dc-maestro.plan-tune`;function Ds(){try{return localStorage.getItem(Es)===`1`}catch{return!1}}function Os(e){try{localStorage.setItem(Es,e?`1`:`0`)}catch{}}function ks(){try{return localStorage.getItem(Ts)===`1`}catch{return!1}}function As(e){try{localStorage.setItem(Ts,e?`1`:`0`)}catch{}}var js=`e3dc-maestro.pv-open`;function Ms(){try{let e=localStorage.getItem(js);if(!e)return new Set;let t=JSON.parse(e);return Array.isArray(t)?new Set(t.filter(e=>typeof e==`string`)):new Set}catch{return new Set}}function Ns(e){try{localStorage.setItem(js,JSON.stringify([...e]))}catch{}}var G=(e,t,n=0)=>{let r=R[t],i=r?z(e.states[r]):void 0;return i===void 0?`–`:i.toLocaleString(e.language,{maximumFractionDigits:n})};function Ps(e,t,n){let{t:r}=t,i=t=>xs(e,t)===!0;if(n===`secCorridor`){let t=G(e,`charge_target`);return i(`two_tier_enabled`)?r(`sumTargetLate`,{soc:t,late:G(e,`charge_target_late`),hour:Cs(e,`late_charge_end_h`)}):r(`sumTarget`,{soc:t})}if(n===`secWindows`){let t=xs(e,`astro_enabled`)===!0?r(`sumWindowAstro`,{start:G(e,`charge_start_sunrise_offset_h`,1),end:G(e,`charge_end_sunset_offset_h`,1)}):r(`sumWindowHours`,{winter:Cs(e,`winter_minimum_hour`),summer:Cs(e,`summer_charge_end`)});return i(`morning_cap_enabled`)?`${t} ${r(`sumWindowCap`,{soc:G(e,`morning_cap_soc`),hour:Cs(e,`morning_cap_until_h`)})}`:t}if(n===`secShape`){let t=[];return i(`fast_charge_floor_enabled`)&&t.push(r(`sumPowerFloor`,{soc:G(e,`fast_charge_floor_soc`)})),i(`spreading_enabled`)&&t.push(r(`sumPowerSpread`,{soc:G(e,`spreading_target_soc`)})),i(`gentle_charge_enabled`)&&t.push(r(`sumPowerGentle`,{factor:G(e,`gentle_charge_factor`,2)})),i(`advanced_corridor`)?t.push(r(`sumPowerCorridor`,{low:G(e,`lower_corridor`),high:G(e,`upper_corridor`)})):i(`lower_corridor_pause_enabled`)&&t.push(r(`sumPowerPause`,{low:G(e,`lower_corridor`)})),t.length?t.join(` `):r(`sumPowerAuto`)}let a=[];return i(`pv_forecast_enabled`)&&a.push(r(`sumPvForecast`)),i(`forward_looking_enabled`)&&a.push(r(`sumPvForward`,{soc:G(e,`forward_looking_max_soc`)})),i(`low_yield_priority_enabled`)&&a.push(r(`sumPvLow`)),i(`curtailment_guard_enabled`)&&a.push(r(`sumPvCurtail`)),a.length?a.join(` `):r(`sumPvNone`)}var Fs=M`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>`;function Is(e,t){let{t:n}=e.i18n,r={astro:xs(e.hass,`astro_enabled`),expert:e.expert},i=t=>vs(t,t=>xs(e.hass,t));return M`${Rs(e)}
    ${t.map(t=>{let a=t.rows.filter(e=>gs(e,r)),o=M`<div class="strategy-summary"><p>${Ps(e.hass,e.i18n,t.title)}</p></div>`;if(!t.fold)return M`<section class="settings-section">
          <h3>${n(t.title)}</h3>
          <p class="sub">${n(t.hint)}</p>
          ${Ss(e,a,i)}
          ${o}
        </section>`;let s=e.pvOpen.has(t.title);return M`<section class="settings-section settings-fold">
        <button type="button" class="group-head ${s?`open`:``}" aria-expanded=${s} @click=${()=>e.onTogglePv(t.title)}>
          ${Fs}
          <span>${n(t.title)}</span>
        </button>
        ${o}
        ${s?M`<p class="sub">${n(t.hint)}</p>${Ss(e,a,i)}`:P}
      </section>`})}`}function Ls(e,t){let{t:n}=e.i18n,r=G(e.hass,`max_grid_charge_kwh`,1),i=[];if(t===`off`&&i.push(n(`sumOff`)),t===`slots`&&(i.push(n(`sumSlots`,{soc:G(e.hass,`low_slot_target_soc`),kwh:r})),e.lowSlots===0&&i.push(n(`sumSlotsNone`))),t===`threshold`&&i.push(n(`sumThreshold`,{price:G(e.hass,`cheap_threshold`,3),soc:G(e.hass,`low_slot_target_soc`),kwh:r})),ds(t)){i.push(n(`sumPlan`,{soc:G(e.hass,`price_plan_max_soc`),kwh:r})),i.push(n(t===`dynamic_auto`?`sumAuto`:`sumExpert`));let a=R.price_plan_active?B(e.hass.states[R.price_plan_active]):!1;i.push(n(a?`sumActive`:`sumShadow`))}return(t===`threshold`||ds(t))&&e.priceSensor===!1&&i.push(n(`sumNoPrice`)),M`<div class="strategy-summary">${i.map(e=>M`<p>${e}</p>`)}</div>`}function Rs(e){let{t}=e.i18n;return M`<div class="ctrl setting-row">
    <div class="txt"><span class="name"><b>${t(`expertView`)}</b></span><span>${t(`expertViewHint`)}</span></div>
    <button
      class="switch ${e.expert?`on`:``}"
      role="switch"
      aria-checked=${e.expert}
      aria-label=${t(`expertView`)}
      @click=${()=>e.onExpert(!e.expert)}
    ></button>
  </div>`}function zs(e,t,n){let{t:r}=e.i18n,i=us(e.hass),a={strategy:i,expert:e.expert};return t.flatMap(t=>{let o=t.rows.filter(e=>ms(e,a)),s=t.title===`secStrategy`;return!o.length&&!s?[]:[M`<section class="settings-section">
        ${n?M`<h3>${r(t.title)}</h3><p class="sub">${r(t.hint)}</p>`:P}
        ${Ss(e,o)}
        ${s&&i?Ls(e,i):P}
        ${s?Rs(e):P}
      </section>`]})}function Bs(e){let{t}=e.i18n,n=us(e.hass),r=e.planTuneOpen;return M`<div class="card plan-tune">
    <button
      type="button"
      class="group-head ${r?`open`:``}"
      aria-expanded=${r}
      @click=${()=>e.onTogglePlanTune()}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
      <span>${t(`planTune`)}</span>
      ${r||!n?P:M`<b class="group-sum">${e.i18n.option(n)}</b>`}
    </button>
    ${r?M`<p class="hint">${t(`planTuneHint`)}</p>
        ${zs(e,ws,!0)}`:P}
  </div>`}function Vs(e){let{t}=e.i18n,n={dark:{title:`themeDark`,hint:`themeDarkHint`},classic:{title:`themeClassic`,hint:`themeClassicHint`},e3dc:{title:`themeE3dc`,hint:`themeE3dcHint`}},r={nodes:{title:`flowStyleNodes`,hint:`flowStyleNodesHint`},blob:{title:`flowStyleBlob`,hint:`flowStyleBlobHint`},city:{title:`flowStyleCity`,hint:`flowStyleCityHint`}},i=!e.alertBannerHidden;return M`<div class="theme-choices" role="radiogroup" aria-label=${t(`setLook`)}>
    ${la.map(r=>M`<button
        type="button"
        class="theme-choice ${e.theme===r?`on`:``}"
        role="radio"
        aria-checked=${e.theme===r}
        @click=${()=>e.onTheme(r)}
      >
        <span class="swatch ${r}" aria-hidden="true"></span>
        <span class="txt"><b>${t(n[r].title)}</b><span>${t(n[r].hint)}</span></span>
      </button>`)}
  </div>
  <h3 class="look-flow-title">${t(`flowStyleTitle`)}</h3>
  <p class="hint">${t(`flowStyleHint`)}</p>
  <div class="theme-choices" role="radiogroup" aria-label=${t(`flowStyleLabel`)}>
    ${ia.map(n=>M`<button
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
  </div>`}function Hs(e){let{t}=e.i18n;if(e.groupId===Uo.id)return mo(e);if(e.groupId===Ho.id)return Vs(e);if(e.groupId===Vo.id)return cs(e);if(e.groupId===Wo.id)return Ao(e.options,M`${Go.map(t=>rs(e,t))}`,M`${Ko.map(t=>rs(e,t))}`);let n=Ro.find(t=>t.id===e.groupId);if(n?.id===`pv`)return M`<div class="settings-detail">
      ${Is(e,n.sections)}
      ${jo(e.options,n.id)}
    </div>`;if(n?.id===`tariff`)return M`<div class="settings-detail">
      ${zs({...e,lowSlots:e.options.ready?e.options.slots.filter(e=>e.class_===`low`).length:void 0,priceSensor:e.options.ready?!!e.options.options.price_sensor:void 0},n.sections,!0)}
      ${jo(e.options,n.id)}
    </div>`;if(n)return M`<div class="settings-detail">
      ${n.sections.map(r=>M`<section class="settings-section">
          ${n.sections.length>1?M`<h3>${t(r.title)}</h3><p class="sub">${t(r.hint)}</p>`:P}
          ${Ss(e,r.rows)}
        </section>`)}
      ${jo(e.options,n.id)}
    </div>`;let r=Object.keys(R).length>0,i=e.hass.states[I.phase]?.state;return M`${ao(e.i18n,i,B(e.hass.states[I.ctrlPlanControls]),B(e.hass.states[I.lowYield]),e.onOpenGroup)}
    <div class="settings-tiles">
    ${as(e,Uo.id,Uo.icon,Uo.title,Uo.hint)}
    ${as(e,Ho.id,Ho.icon,Ho.title,Ho.hint)}
    ${as(e,Wo.id,Wo.icon,`setSizingTile`,`setSizingTileHint`)}
    ${as(e,Vo.id,Vo.icon,Vo.title,Vo.hint)}
    ${r?Ro.map(t=>is(e,t)?as(e,t.id,t.icon,t.title,t.hint):P):M`<p class="hint">${t(`settingsPending`)}</p>`}
  </div>`}function Us(e){return e===void 0||Math.abs(e)<.25?`idle`:e<0?`discharge`:`charge`}function Ws(e,t=30){return e===void 0||Math.abs(e)<t?`idle`:e<0?`discharge`:`charge`}var Gs=e=>Math.max(0,Math.min(100,e));function Ks(e,t,n,r){let i=r?.mini?`mini`:r?.live?`live`:``,a=r?.reserve!==void 0&&Number.isFinite(r.reserve)?Gs(r.reserve):void 0,o=t===void 0?void 0:Gs(t),s=P;if(o!==void 0){if(a!==void 0&&a>0){let e=Math.min(o,a),t=Math.max(0,o-a);s=M`${t>.05?M`<div class="batt-fill" style="height:${t}%; bottom:${e}%"></div>`:P}
        ${e>.05?M`<div class="batt-fill batt-fill-reserve" style="height:${e}%"></div>`:P}`}else s=M`<div class="batt-fill" style="height:${o}%"></div>`}return M`<div class="batt ${n} ${i}" role="img" aria-label=${e}>
    <div class="batt-nub"></div>
    <div class="batt-body">
      ${a!==void 0&&a>0?M`<div class="batt-reserve-zone" style="height:${a}%" aria-hidden="true"></div>`:P}
      ${s}
      <div class="batt-cells" aria-hidden="true"></div>
    </div>
  </div>`}var qs=e=>!e||e===`unknown`||e===`unavailable`;function Js(e,t){if(!e||qs(e.state))return`–`;let n=Number.parseFloat(e.state);if(!Number.isFinite(n))return e.state;let r=typeof e.attributes.unit_of_measurement==`string`?e.attributes.unit_of_measurement:``;if(r===`%`)return`${t.n(Math.abs(n)<.05?0:n,0)} %`;if(r===`W`)return(n<0?`−`:``)+t.w(n);let i=+(r===`kW`||r===`kWh`||r===`A`||r===`V`||r===`°C`);return r?`${t.n(n,i)} ${r}`:t.n(n,0)}function Ys(e){if(!e||qs(e.state))return;let t=Number.parseFloat(e.state);if(Number.isFinite(t))return(typeof e.attributes.unit_of_measurement==`string`?e.attributes.unit_of_measurement:``)===`%`&&Math.abs(t)<.05?0:t}function Xs(e){let t=Ys(e);if(t!==void 0)return(typeof e?.attributes.unit_of_measurement==`string`?e.attributes.unit_of_measurement:``)===`W`?t/1e3:t}var Zs=864e5;function Qs(e,t=Date.now()){let n=e?.attributes.items;if(!Array.isArray(n)||n.length===0)return;let r=n[0];if(!r||typeof r!=`object`)return;let i=r.time;if(typeof i!=`number`||t-i>Zs)return;let a=e?.attributes.latest_message;return typeof a==`string`&&a.trim()?a.trim():void 0}function $s(e){return e===void 0||!Number.isFinite(e)?`idle`:e>=90?`soh-good`:e>=70?`soh-mid`:`soh-low`}function ec(e,t,n){if(!(e===void 0||!Number.isFinite(e)||e<0)&&!(t===void 0||!(t>0)||n<1))return Math.min(100,e/(t/n)*100)}var tc={0:`plantMode0`,1:`plantMode1`,2:`plantMode2`,3:`plantMode3`,4:`plantMode4`};function nc(e,t){if(!e||e===`unknown`||e===`unavailable`)return`–`;let n=tc[e];return n?t(n):e}var rc=(e,t)=>!e||qs(e.state)?`–`:e.state===`on`?t(`plantOn`):e.state===`off`?t(`plantOff`):e.state,ic=46,ac=2*Math.PI*ic,oc=e=>e.length?M`<div class="card"><div class="rows">${e.map(e=>M`<div class="row"><span>${e.label}</span><b>${e.value}</b></div>`)}</div></div>`:P,sc=[`grid`,`battery`,`pv`,`wallbox`,`controls`],cc={grid:{title:`plantRoomGrid`,hint:`plantRoomGridHint`,icon:`<path d="M4 8h16M4 16h16"/><path d="M8 4v16M16 4v16"/>`},battery:{title:`plantRoomBattery`,hint:`plantRoomBatteryHint`,icon:`<rect x="7" y="6" width="10" height="15" rx="2"/><path d="M10 4h4"/>`},pv:{title:`plantRoomPv`,hint:`plantRoomPvHint`,icon:`<circle cx="12" cy="12" r="4"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21"/>`},wallbox:{title:`plantRoomWallbox`,hint:`plantRoomWallboxHint`,icon:`<path d="M7 17V7a2 2 0 0 1 2-2h4l2 3h2a2 2 0 0 1 2 2v7"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>`},controls:{title:`plantRoomControls`,hint:`plantRoomControlsHint`,icon:`<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>`}},lc=e=>!!e&&sc.includes(e),uc=e=>lc(e)?cc[e]:void 0,K=(e,t)=>t?e.hass.states[t]:void 0,dc=(e,t)=>Js(K(e,L.entities[t]),e.fmt),q=e=>e in L.entities,fc=(e,t,n,r)=>M`<div class="gauge ${r}">
    <div class="gauge-face">
      <svg viewBox="0 0 120 120" role="img" aria-label="${e}: ${t}">
        <circle class="gauge-track" cx="60" cy="60" r="${ic}"></circle>
        <circle class="gauge-arc" cx="60" cy="60" r="${ic}" stroke-dasharray="${(n===void 0?0:Math.max(0,Math.min(100,n)))/100*ac} ${ac}"></circle>
      </svg>
      <b>${t}</b>
    </div>
    <span>${e}</span>
  </div>`,pc=Us,mc=(e,t,n,r=!1)=>Ks(e,t,n,{mini:r}),hc=e=>e.length?M`<div class="card budget">${e.map(e=>M`<div class="budget-row">
          <span>${e.label}</span>
          <div class="track"><i class="${e.cls}" style="width:${Math.max(0,Math.min(100,e.pct))}%"></i></div>
          <b>${e.value}</b>
        </div>`)}</div>`:P;function gc(e){let{t}=e.i18n;if(!(Object.keys(L.entities).length>0||L.packs.length>0||L.wallboxes.length>0))return M`<p class="empty">${t(`plantEmpty`)}</p>`;let n=[q(`powerValue`)?{label:t(`plantPower`),value:dc(e,`powerValue`)}:null,q(`manualEnergy`)?{label:t(`plantManualEnergy`),value:dc(e,`manualEnergy`)}:null].filter(e=>e!==null),r=[{key:`limitCharge`,label:t(`plantLimitCharge`),cls:`bat`},{key:`limitDischarge`,label:t(`plantLimitDischarge`),cls:`warn`},{key:`limitDischargeMin`,label:t(`plantLimitMin`),cls:`muted`}].map(t=>({...t,kw:q(t.key)?Xs(K(e,L.entities[t.key])):void 0})),i=Math.max(0,...r.map(e=>Math.abs(e.kw??0))),a=hc(r.filter(e=>e.kw!==void 0).map(t=>({label:t.label,value:dc(e,t.key),pct:i>0?Math.abs(t.kw)/i*100:0,cls:t.cls}))),o=[{key:`limitsOn`,label:`plantLimits`},{key:`manualCharge`,label:`plantManual`},{key:`pvDerated`,label:`plantDerated`,warn:!0},{key:`emergencyPower`,label:`plantEmergency`,warn:!0},{key:`emergencyReserve`,label:`plantReserveHit`},{key:`rescueBattery`,label:`plantReserveOn`},{key:`weather`,label:`plantWeather`},{key:`weatherWait`,label:`plantWeatherWait`}].filter(e=>q(e.key)),s=t=>q(t)?Xs(K(e,L.entities[t])):void 0,c=n=>{let r=n.map(e=>L.entities[e]).filter(e=>!!e);if(!r.length)return P;let i=n.flatMap((t,n)=>{let r=L.entities[t],i=r?e.phasePoints?.[r]:void 0;return i?.length?[{name:`L${n+1}`,points:i}]:[]}),a=e.phaseHistory??`idle`;if(!i.length&&a===`error`)return M`<p class="err">${t(`historyFailed`)}</p>`;if(!i.length&&a!==`ready`)return M`<p class="hint">${t(`loading`)}</p>`;if(!i.length)return M`<p class="hint">${t(`historyEmpty`)}</p>`;let o=i.map(e=>e.points[e.points.length-1]?.[0]??0).join(`,`),s=[`var(--accent)`,`var(--house)`,`var(--pv)`];return M`<div class="phase-legend">
        ${i.map((e,t)=>M`<span style="--swatch:${s[t]??s[0]}"><i></i>${e.name}</span>`)}
      </div>
      <maestro-chart
        class="phase-chart"
        .options=${Oi(`phase-${r.join(`,`)}`,[e.theme,e.fmt.loc,o],()=>mr(i,e.fmt))}
      ></maestro-chart>`},l=(n,r,i)=>{if(!i.some(q))return P;let a=Math.max(.001,...i.map(e=>Math.abs(s(e)??0)));return M`<div class="card phase-gauges">
      <h3>${r}</h3>
      <div class="phase-gauge-row">
        ${i.map((t,r)=>{let i=s(t),o=i===void 0?void 0:Math.abs(i)/a*100,c=`${n}${i!==void 0&&i<0?` neg`:``}`;return fc(`L${r+1}`,q(t)?dc(e,t):`–`,o,c)})}
      </div>
      <div class="phase-history">
        <div class="sub">${t(`historySub`)}</div>
        ${c(i)}
      </div>
    </div>`},u=l(`house`,t(`plantHouse`),[`houseL1`,`houseL2`,`houseL3`]),d=l(`grid`,t(`plantGrid`),[`gridL1`,`gridL2`,`gridL3`]),f=l(`pvi`,t(`plantInverter`),[`pviL1`,`pviL2`,`pviL3`]),p=[{key:`installedPeak`,label:t(`plantPeak`),cls:`pv`},{key:`acMax`,label:t(`plantAc`),cls:`house`},{key:`chargeMax`,label:t(`plantSysCharge`),cls:`bat`},{key:`dischargeMax`,label:t(`plantSysDischarge`),cls:`warn`},{key:`deratePower`,label:t(`plantDeratePower`),cls:`pv`},{key:`extraProduction`,label:t(`plantExtraPv`),cls:`pv`},{key:`extraConsumption`,label:t(`plantExtraUse`),cls:`house`}].map(t=>({...t,kw:q(t.key)?Xs(K(e,L.entities[t.key])):void 0})),m=t=>{let n=p.filter(e=>t.includes(e.key)&&e.kw!==void 0),r=Math.max(0,...n.map(e=>Math.abs(e.kw)));return hc(n.map(t=>({label:t.label,value:dc(e,t.key),pct:r>0?Math.abs(t.kw)/r*100:0,cls:t.cls})))},h=q(`batteryCapacity`)?Ys(K(e,L.entities.batteryCapacity)):void 0,g=(n,r,i)=>{let a=t=>Js(K(e,r[t]),e.fmt),o=t=>Ys(K(e,r[t])),s=ec(r.energy?o(`energy`):void 0,h,L.packs.length),c=pc(r.current?o(`current`):void 0),l=r.tempMin?o(`tempMin`):void 0,u=r.tempMax?o(`tempMax`):void 0,d=r.tempMin&&r.tempMax?`${a(`tempMin`)} – ${a(`tempMax`)}`:r.tempMin?a(`tempMin`):r.tempMax?a(`tempMax`):``,f=l??u,p=u??l,m=e=>Math.max(0,Math.min(100,e/50*100)),g=r.soh?o(`soh`):void 0,_=n||t(`plantPack`);return M`<article class="card pack">
      <div class="pack-visual">
        ${mc(`${_}, ${r.energy?a(`energy`):``}`,s,c)}
        ${g===void 0?P:M`<b class="pack-soh">${a(`soh`)}</b><span>${t(`plantSoh`)}</span>`}
      </div>
      <div class="pack-stats">
        <h3>${_}</h3>
        ${r.energy?M`<div class="pack-energy">${a(`energy`)}</div><div class="pack-share">${t(s===void 0?`plantEnergy`:`plantShare`)}</div>`:P}
        <div class="pack-meta">
          ${r.current?M`<div><span>${t(`plantCurrent`)}</span><b class="${c}">${a(`current`)}</b></div>`:P}
          ${r.voltage?M`<div><span>${t(`plantVoltage`)}</span><b>${a(`voltage`)}</b></div>`:P}
          ${r.cycles?M`<div><span>${t(`plantCycles`)}</span><b>${a(`cycles`)}</b></div>`:P}
        </div>
        ${d?M`<div class="temp">
              <div class="temp-top"><span>${t(`plantTemp`)}</span><b>${d}</b></div>
              ${f!==void 0&&p!==void 0?M`<div class="temp-track"><i style="left:${m(Math.min(f,p))}%;width:${Math.max(4,m(Math.max(f,p))-m(Math.min(f,p)))}%"></i></div>`:P}
            </div>`:P}
      </div>
      ${i.length?M`<div class="cells">
            <span class="cells-label">${t(`plantCells`)}</span>
            ${i.map(n=>{let r=Ys(K(e,n.entities.sohReported)),i=Js(K(e,n.entities.sohReported),e.fmt);return M`<div class="cell">
                ${mc(`${n.name}, ${i}`,r,$s(r),!0)}
                <b>${i}</b>
                <span>${n.name||t(`plantCell`)}</span>
              </div>`})}
          </div>`:P}
    </article>`},_=(n,r)=>{let i=t=>Js(K(e,r[t]),e.fmt),a=n=>rc(K(e,r[n]),t),o=r.soc?Ys(K(e,r.soc)):void 0,s=r.sun?Xs(K(e,r.sun)):void 0,c=r.net?Xs(K(e,r.net)):void 0,l=(s??0)+(c??0),u=[r.phases?{label:t(`plantPhaseCount`),value:i(`phases`)}:null,r.current?{label:t(`plantMaxCurrent`),value:i(`current`)}:null].filter(e=>e!==null);return M`<article class="card pack wall">
      ${o===void 0?P:M`<div class="pack-visual">${mc(`${n||t(`plantWallbox`)}, ${i(`soc`)}`,o,r.charging&&K(e,r.charging)?.state===`on`?`charge`:`idle`)}<b class="pack-soh">${i(`soc`)}</b><span>${t(`plantCarSoc`)}</span></div>`}
      <div class="pack-stats">
        ${L.wallboxes.length>1?M`<h3>${n||t(`plantWallbox`)}</h3>`:P}
        <div class="plant-flags">
          ${r.plug?M`<span class="chip ${K(e,r.plug)?.state===`on`?`on`:``}"><i></i>${t(`plantPlug`)} ${a(`plug`)}</span>`:P}
          ${r.charging?M`<span class="chip ${K(e,r.charging)?.state===`on`?`on`:``}"><i></i>${t(`plantCharging`)} ${a(`charging`)}</span>`:P}
        </div>
        ${s!==void 0||c!==void 0?M`<div class="mix" title="${t(`plantSun`)} ${r.sun?i(`sun`):``} · ${t(`plantNet`)} ${r.net?i(`net`):``}">
              ${s===void 0?P:M`<i class="sun" style="width:${l>0?Math.abs(s)/l*100:0}%"></i>`}
              ${c===void 0?P:M`<i class="net" style="width:${l>0?Math.abs(c)/l*100:0}%"></i>`}
            </div>
            <div class="phase-legend">
              ${r.sun?M`<span><i class="pvi"></i>${t(`plantSun`)} ${i(`sun`)}</span>`:P}
              ${r.net?M`<span><i class="grid"></i>${t(`plantNet`)} ${i(`net`)}</span>`:P}
            </div>`:P}
        ${u.length?M`<div class="rows">${u.map(e=>M`<div class="row"><span>${e.label}</span><b>${e.value}</b></div>`)}</div>`:P}
      </div>
    </article>`},v=K(e,L.entities.mode)?.state,y=n=>{let r=o.filter(e=>n.includes(e.key));return r.length?M`<div class="plant-flags">${r.map(n=>M`<span class="chip ${K(e,L.entities[n.key])?.state===`on`?n.warn?`warn`:`on`:``}"><i></i>${t(n.label)}</span>`)}</div>`:P},b=(e,t)=>{let n=e?.attributes.friendly_name;return typeof n==`string`&&n.trim()?n.trim():t},x=n=>{let r=K(e,n);if(!r)return P;let i=b(r,n),a=n.split(`.`,1)[0],o=r.state===`unavailable`||e.pending.has(n),s=typeof r.attributes.unit_of_measurement==`string`?r.attributes.unit_of_measurement:``,c=typeof r.attributes.min==`number`?r.attributes.min:void 0,l=typeof r.attributes.max==`number`?r.attributes.max:void 0,u=typeof r.attributes.step==`number`?r.attributes.step:1,d=s===`%`||r.attributes.mode===`slider`,f=a===`switch`?M`<button class="switch ${B(r)?`on`:``}" role="switch" aria-checked=${B(r)} aria-label=${i} ?disabled=${o} @click=${()=>e.onToggle(n)}></button>`:a===`number`&&d&&c!==void 0&&l!==void 0?Zt({label:i,min:c,max:l,step:u,value:z(r)??c,unit:s,disabled:o,onCommit:t=>e.onNumber(n,t)}):a===`number`?M`<label class="setting-num">
              <input
                type="number"
                inputmode="decimal"
                aria-label=${i}
                step=${typeof r.attributes.step==`number`?r.attributes.step:`any`}
                ?disabled=${o}
                ${Bt(e=>{let t=e?.getRootNode(),n=t instanceof ShadowRoot?t.activeElement:null;if(!(e instanceof HTMLInputElement)||e===n)return;let i=z(r),a=i===void 0?``:String(i);e.value!==a&&(e.value=a)})}
                @change=${t=>{let r=Number.parseFloat(t.target.value);Number.isFinite(r)&&e.onNumber(n,r)}}
              />
              ${typeof r.attributes.unit_of_measurement==`string`?M`<span>${r.attributes.unit_of_measurement}</span>`:P}
            </label>`:a===`button`?M`<button class="btn" ?disabled=${o} @click=${()=>{window.confirm(t(`plantSend`))&&e.onPress(n)}}>${i}</button>`:P;return M`<div class="ctrl setting-row ${d&&a===`number`?`wide`:``}"><div class="txt"><span class="name"><b>${i}</b></span></div>${f}</div>`},S=e=>{let t=Object.values(e??{}).map(e=>x(e));return t.some(e=>e!==P)?M`<div class="card">${t}</div>`:P},C=L.identity??{},w=[C.model?{label:t(`plantModel`),value:C.model}:null,C.serial?{label:t(`plantSerial`),value:C.serial}:null,C.firmware?{label:t(`plantFirmware`),value:C.firmware}:null].filter(e=>e!==null),T=Qs(K(e,L.entities.errors)),E=M`<section class="card hero">
    <div class="hero-main">
      <div class="hero-mode" data-mode=${v??``}>
        <span>${t(`plantMode`)}</span>
        <b>${q(`mode`)?nc(v,t):`–`}</b>
      </div>
      <div class="hero-gauges">
        ${fc(t(`plantAutarky`),q(`autarky`)?dc(e,`autarky`):`–`,q(`autarky`)?Ys(K(e,L.entities.autarky)):void 0,`autarky`)}
        ${fc(t(`plantSelf`),q(`selfConsumption`)?dc(e,`selfConsumption`):`–`,q(`selfConsumption`)?Ys(K(e,L.entities.selfConsumption)):void 0,`self`)}
      </div>
    </div>
    ${w.length?M`<div class="hero-meta">${w.map(e=>M`<div><span>${e.label}</span><b>${e.value}</b></div>`)}</div>`:P}
    ${T?M`<p class="hero-fault" role="status">${t(`plantFault`)}: ${T}</p>`:P}
  </section>`,D=q(`batteryCapacity`)?[{label:t(`plantCapacity`),value:dc(e,`batteryCapacity`)}]:[],O=q(`deratePercent`)?[{label:t(`plantDeratePct`),value:dc(e,`deratePercent`)}]:[],k={grid:{show:u!==P||d!==P||q(`extraConsumption`),body:M`${u}${d}${m([`extraConsumption`])}`},battery:{show:L.packs.length>0||a!==P||q(`chargeMax`)||q(`dischargeMax`)||q(`batteryCapacity`),body:M`${L.packs.length?M`<div class="plant-packs">${L.packs.map(e=>g(e.name,e.entities,e.modules??[]))}</div>`:P}${y([`manualCharge`,`emergencyPower`,`emergencyReserve`,`rescueBattery`])}${a}${m([`chargeMax`,`dischargeMax`])}${oc(D)}`},pv:{show:f!==P||q(`installedPeak`)||q(`acMax`)||q(`deratePower`)||q(`deratePercent`)||q(`extraProduction`)||q(`pvDerated`),body:M`${f}${y([`pvDerated`])}${m([`installedPeak`,`acMax`,`deratePower`,`extraProduction`])}${oc(O)}`},wallbox:{show:L.wallboxes.length>0||Object.keys(L.controls?.wallbox??{}).length>0,body:M`${L.wallboxes.length?M`<div class="plant-packs">${L.wallboxes.map(e=>M`<div class="wall-stack">${_(e.name,e.entities)}${S(e.controls)}</div>`)}</div>`:P}${S(L.controls?.wallbox)}`},controls:{show:Object.keys(L.controls?.general??{}).length>0||q(`mode`)||n.length>0||q(`limitsOn`)||q(`weatherWait`),body:M`${S(L.controls?.general)}${y([`limitsOn`,`weatherWait`])}${oc(n)}`}},ee=lc(e.groupId)?e.groupId:void 0;return ee&&k[ee].show?M`<div class="plant-body">${k[ee].body}</div>`:M`${E}
    <div class="settings-tiles">
      ${Object.keys(k).filter(e=>k[e].show).map(n=>{let r=cc[n];return M`<button type="button" class="settings-tile" @click=${()=>e.onOpenRoom(n)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${r.icon}></svg>
          <b>${t(r.title)}</b>
          <span>${t(r.hint)}</span>
        </button>`})}
    </div>`}var _c={pv:`M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z`,grid:`M12 2 7 22M12 2l5 20M5 9h14M4 15h16`,house:`M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6`,bat:`M7 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM10 3h4`},vc=24,yc=2.15,bc=30,xc=26,Sc=16,Cc=5500,wc=72,Tc=52,Ec=48,Dc=72,Oc={wide:{box:[600,420],hub:{x:300,y:215},pv:{x:300,y:88,labelDy:-58},grid:{x:78,y:215,labelDy:70},house:{x:522,y:215,labelDy:70},bat:{x:300,y:342,labelDy:58}},compact:{box:[360,600],hub:{x:180,y:255},pv:{x:180,y:100,labelDy:-56},grid:{x:72,y:255,labelDy:58},house:{x:288,y:255,labelDy:58},bat:{x:180,y:430,labelDy:52}}},kc={"var(--pv)":`#9a3412`,"var(--house)":`#5b21b6`,"var(--grid-in)":`#b91c1c`,"var(--grid-out)":`#047857`,"var(--bat)":`#0e7490`,"var(--accent)":`#075985`},Ac=(e,t)=>t?kc[e]??`#152033`:e;function jc(e,t,n){let r=vc/2*n;return`translate(${e-r} ${t-r}) scale(${n})`}function Mc(e,t){let n=Hr(e);return N`<clipPath id="blob-batbody"><rect x="6.6" y="7.6" width="10.8" height="10.8" rx="1.3"/></clipPath>
    ${n?N`<rect clip-path="url(#blob-batbody)" x=${n.x} y=${n.y} width=${n.width} height=${n.height+1} fill=${t} stroke="none" opacity="0.78"/>`:N``}
    <path d=${_c.bat} vector-effect="non-scaling-stroke"/>`}var Nc=(e,t=16)=>e.length<=t?e:`${e.slice(0,t-1)}…`;function Pc(e,t){return e>0?1-Math.min(1,Math.max(0,-t)/e):+(t>=0)}function Fc(e,t){return(t?Tc:wc)*(.88+.22*Math.min(1,Math.abs(e)/Cc))}function Ic(e){let t=e=>Math.min(1,Math.abs(e)/Cc),n=[{angle:-Math.PI/2,strength:t(e.pv)},{angle:Math.PI,strength:t(e.grid)},{angle:0,strength:t(e.house)},{angle:Math.PI/2,strength:t(e.battery)}];for(let r of e.consumers??[])Math.abs(r.watts)<bc||n.push({angle:r.angle,strength:t(r.watts)*.55});return n.filter(e=>e.strength>.02)}function Lc(e,t,n){let r=t;for(let t of n){let n=Math.abs(e-t.angle);n>Math.PI&&(n=2*Math.PI-n);let i=Math.max(0,Math.cos(n));r+=t.strength*Ec*i*i*i}return r}function Rc(e,t,n=Dc){let r=[];for(let i=0;i<n;i++){let a=i/n*Math.PI*2-Math.PI/2,o=Lc(a,e,t),s=Math.cos(a)*o,c=Math.sin(a)*o;r.push(`${i?`L`:`M`}${s.toFixed(1)} ${c.toFixed(1)}`)}return`${r.join(` `)} Z`}function zc(e,t){return Math.atan2(t.y-e.y,t.x-e.x)}var Bc=46;function Vc(e,t){let n=Oc.compact.bat,r=n.y+n.labelDy+44;return Array.from({length:e},(e,n)=>({x:t-40,y:r+n*Bc,labelDy:5}))}function Hc(e,t){if(!e){if(!t)return;let e=Oc.wide,n=Dr(e.house,t);return Math.round(Ar(e.house.y,n,e.box[1])*.95)}let n=Oc.compact;if(!t)return Math.round(n.box[1]*.94);let r=Vc(t,n.box[0]).at(-1);return Math.round((r.y+36)*.94)}function Uc(e){let t=(e.consumers??[]).slice(0,6),n=e.compact?Oc.compact:Oc.wide,r=Dr(n.house,t.length),i=n.box[0]+(e.compact?0:kr(t.length)),a=e.compact?t.length?Vc(t.length,i).at(-1).y+36:n.box[1]:Ar(n.house.y,r,n.box[1]),o=e.compact?Vc(t.length,i):[],s=e.compact?[]:Or(t.map(e=>e.id),e.consumerPlaces??{},r),c=t=>e.compact?o[t]:{x:s[t].x,y:s[t].y,labelDy:0},{pv:l=0,house:u=0,grid:d=0,battery:f=0}=e,p=e.outline===!0,m=e.motion!==!1,h=e=>Ac(e,p),g=e.i18n.t,_=t.map((e,t)=>({c:e,p:c(t)})),v=Math.abs(l)+Math.abs(u)+Math.abs(d)+Math.abs(f),y=Fc(v,e.compact),b=Rc(y,Ic({pv:l,house:u,grid:d,battery:f,consumers:_.map(({c:e,p:t})=>({angle:zc(n.hub,t),watts:e.watts}))})),x=Pc(u,d),S=e.compact?22:28,C=typeof e.soc==`number`&&Number.isFinite(e.soc)?Math.min(100,Math.max(0,e.soc)):void 0,w=C===void 0?S*.9:S*.55+S*.55*(C/100),T={pv:{color:`var(--pv)`,label:g(`nodePv`),value:l,icon:_c.pv},grid:{color:d<0?`var(--grid-in)`:`var(--grid-out)`,label:g(d<0?`nodeImport`:`nodeFeed`),value:d,icon:_c.grid},house:{color:`var(--house)`,label:g(`nodeHouse`),value:u,icon:_c.house},bat:{color:`var(--bat)`,label:g(f<0?`nodeBatDischarge`:`nodeBatCharge`),value:f,icon:_c.bat}},E=[`pv`,`grid`,`house`,`bat`],D=[...E.map(t=>`${T[t].label} ${e.fmt.w(T[t].value)}`),..._.map(({c:t})=>`${t.name} ${e.fmt.w(t.watts)}`)].join(`, `),O=x>.55?`var(--pv)`:x>.25?`var(--bat)`:`var(--grid-in)`,k=x>.55?`var(--bat)`:x>.25?`var(--house)`:`var(--grid-in)`,ee=Math.min(1,v/Cc),te=`${(3.2-1.4*ee).toFixed(2)}s`,A=[];l>bc&&A.push({node:`pv`,toHub:!0}),f<-30&&A.push({node:`bat`,toHub:!0}),f>bc&&A.push({node:`bat`,toHub:!1}),d<-30&&A.push({node:`grid`,toHub:!0}),d>bc&&A.push({node:`grid`,toHub:!1}),u>bc&&A.push({node:`house`,toHub:!1});let j=y*(.72+.18*ee);return N`<svg viewBox="0 0 ${i} ${a}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${D}>
    <defs>
      <filter id="blob-glow"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="blob-fill" cx="50%" cy="45%" r="70%">
        <stop offset="0%" stop-color=${O} stop-opacity="0.55"/>
        <stop offset="55%" stop-color=${k} stop-opacity="0.32"/>
        <stop offset="100%" stop-color=${k} stop-opacity="0.08"/>
      </radialGradient>
      <radialGradient id="blob-core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--bat)" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="var(--bat)" stop-opacity="0.08"/>
      </radialGradient>
    </defs>
    ${E.map(e=>N`<path class="flow-line" d=${Xr(n[e],n.hub,36,S)} stroke=${T[e].color} opacity=${Math.abs(T[e].value)>bc?.4:.16}/>`)}
    ${A.map(e=>oi(e.toHub?n[e.node]:n.hub,e.toHub?n.hub:n[e.node],e.toHub?36:S,e.toHub?S:36,T[e.node].value,T[e.node].color,m))}
    <g class="flow-blob ${m?`motion`:``}" style=${`--blob-period:${te}`} transform=${`translate(${n.hub.x} ${n.hub.y})`}>
      <ellipse class="flow-blob-halo" cx="0" cy="0" rx=${(j*1.15).toFixed(1)} ry=${(j*.92).toFixed(1)} fill="none" stroke=${h(O)} stroke-width="1.2" stroke-dasharray="6 10" opacity=${(.2+.35*ee).toFixed(2)}/>
      <path class="flow-blob-shape" d=${b} fill="url(#blob-fill)" stroke=${h(O)} stroke-width=${p?`2.2`:`1.4`} filter=${p?`none`:`url(#blob-glow)`} opacity="0.95"/>
      <circle class="flow-blob-core" r=${w.toFixed(1)} fill="url(#blob-core)" opacity=${C===void 0?.35:.75}/>
      <image href=${Nr} x=${-S} y=${-S} width=${S*2} height=${S*2} aria-label="Maestro"/>
    </g>
    ${E.map(t=>{let r=T[t],i=n[t],a=Math.abs(r.value)<bc,o=i.labelDy<0,s=i.y+i.labelDy;return N`<g class="flow-node" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${r.label} @click=${()=>e.onSelect?.(t)} @keydown=${n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),e.onSelect?.(t))}}>
        <circle cx=${i.x} cy=${i.y} r=${36} fill=${p?`none`:`rgba(10,16,30,.88)`} stroke=${h(r.color)} stroke-width=${p?`2.4`:`2`} filter=${a||p?`none`:`url(#blob-glow)`}/>
        <g transform=${jc(i.x,i.y,zr(36))} fill="none" stroke=${h(r.color)} stroke-width=${yc} stroke-linecap="round" stroke-linejoin="round">
          ${t===`bat`?Mc(e.soc,h(r.color)):N`<path d=${r.icon} vector-effect="non-scaling-stroke"/>`}
        </g>
        <text class="node-val" x=${i.x} y=${s} text-anchor="middle">${e.fmt.w(r.value)}</text>
        <text class="node-lbl" x=${i.x} y=${s+(o?19:18)} text-anchor="middle">${r.label}</text>
      </g>`})}
    ${e.compact?ui(_,n.house,i,m,36):_.map(({c:e,p:t})=>{let r=e.mode===`included`?n.house:n.hub,i=e.mode===`included`?36:S,a=e.mode===`included`?`var(--house)`:`var(--accent)`;return N`<path class="flow-line" d=${Xr(r,t,i,xc)} stroke=${a} opacity=${Math.abs(e.watts)>bc?.4:.16}/>
            ${oi(r,t,i,xc,e.watts,a,m)}`})}
    ${_.map(({c:t,p:n})=>{let i=h(t.mode===`included`?`var(--house)`:`var(--accent)`),a=t.missing||Math.abs(t.watts)<bc,o=()=>{e.arrange||e.onSelect?.(t.id)},s=e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),o())};return e.compact?N`<g class="flow-node" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${t.name} @click=${o} @keydown=${s}>
          <circle cx=${n.x} cy=${n.y} r=${Sc} fill=${p?`none`:`rgba(10,16,30,.9)`} stroke=${i} stroke-width=${p?`2.2`:`2`}/>
          <g transform=${jc(n.x,n.y,Lr(Sc))} fill="none" stroke=${i} stroke-width=${yc} stroke-linecap="round" stroke-linejoin="round"><path d=${ut[t.icon]} vector-effect="non-scaling-stroke"/></g>
          <text font-size="14" font-weight="700" fill="var(--text)" x=${n.x-26} y=${n.y+5} text-anchor="end">${e.fmt.w(t.watts)}  ${Nc(t.name,24)}</text>
        </g>`:N`<g class="flow-node ${e.arrange?`arrange`:``}" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${t.name} @click=${o} @keydown=${s} @pointerdown=${n=>Mr(n,t.id,r,e.arrange,e.onPlaceConsumer)}>
        <circle cx=${n.x} cy=${n.y} r="26" fill=${p?`none`:`rgba(10,16,30,.9)`} stroke=${i} stroke-width=${p?`2.4`:`2`} filter=${a||p?`none`:`url(#blob-glow)`}/>
        <g transform=${jc(n.x,n.y,Lr(xc))} fill="none" stroke=${i} stroke-width=${yc} stroke-linecap="round" stroke-linejoin="round"><path d=${ut[t.icon]} vector-effect="non-scaling-stroke"/></g>
        <text class="node-val-sm" x=${n.x+34} y=${n.y-2} text-anchor="start">${e.fmt.w(t.watts)}</text>
        <text class="node-lbl-sm" x=${n.x+34} y=${n.y+14} text-anchor="start">${Nc(t.name,18)}</text>
      </g>`})}
  </svg>`}var J=30,Wc=26,Gc=16,Kc=24,qc=2.15,Jc=12e3,Yc=6,Xc=6e3,Zc={"var(--pv)":`#9a3412`,"var(--house)":`#5b21b6`,"var(--grid-in)":`#b91c1c`,"var(--grid-out)":`#047857`,"var(--bat)":`#0e7490`,"var(--accent)":`#075985`},Qc=(e,t)=>t?Zc[e]??`#152033`:e;function $c(e,t,n){let r=Kc/2*n;return`translate(${e-r} ${t-r}) scale(${n})`}var el=(e,t=16)=>e.length<=t?e:`${e.slice(0,t-1)}…`;function tl(e,t=Jc){let n=Math.max(1e3,Number.isFinite(t)?t:Jc);if(!(e>J))return Array.from({length:Yc},()=>0);let r=Math.min(1,e/n)*Yc;return Array.from({length:Yc},(e,t)=>Math.min(1,Math.max(0,r-t)))}function nl(e){return e>J?.22+.7*Math.min(1,e/Xc):.1}function rl(e,t){return typeof e!=`number`||!Number.isFinite(e)||e<=0?0:Math.min(100,e)/100*t}function il(e,t,n,r,i,a,o){let s=o?$r(i):0;if(!s)return N``;let c=Yr(e,t,n,r),l=ei(i).toFixed(3);return N`${Array.from({length:s},(e,t)=>N`<g class="electron" fill=${a} data-x1=${c.x1} data-y1=${c.y1} data-x2=${c.x2} data-y2=${c.y2} data-speed=${l} data-phase=${t/s}><circle class="halo" r="3.4"/><circle r="1.5"/><circle r="0.75" fill="#fff"/></g>`)}`}function al(e,t){if(e){let e=t?66+t*46:54;return{boxW:360,boxH:Math.max(520,222+e),roof:{x:108,y:72,w:192,h:26},soffit:{x:110,y:98,w:188,h:5},facade:{x:126,y:103,w:156,h:148},plinth:{x:128,y:251,w:152,h:18},mast:{x:34,y:182,h:71},logo:{x:136,y:221,s:20},groundY:272}}return{boxW:600+(t?kr(t):0),boxH:297,roof:{x:184,y:52,w:240,h:28},soffit:{x:186,y:80,w:236,h:6},facade:{x:206,y:86,w:196,h:168},plinth:{x:209,y:254,w:190,h:20},mast:{x:76,y:175,h:81},logo:{x:216,y:222,s:22},groundY:277}}function ol(e,t,n,r){let i=e.y-e.h,a=i+14,o=r?3.6:3.2,s=r?2.2:2;return N`<g class="flow-city-mast" filter=${n&&!r?`url(#city-glow)`:`none`}>
    <line x1=${e.x} y1=${e.y} x2=${e.x} y2=${i} stroke=${t} stroke-width=${o} stroke-linecap="round"/>
    <line x1=${e.x-20} y1=${a} x2=${e.x+20} y2=${a} stroke=${t} stroke-width=${o} stroke-linecap="round"/>
    <line x1=${e.x-20+5} y1=${a} x2=${e.x-20+5} y2=${a+11} stroke=${t} stroke-width=${s} stroke-linecap="round"/>
    <line x1=${e.x+20-5} y1=${a} x2=${e.x+20-5} y2=${a+11} stroke=${t} stroke-width=${s} stroke-linecap="round"/>
    <circle cx=${e.x-20+5} cy=${a+13} r="2.8" fill=${t} opacity=${n?.95:.5}/>
    <circle cx=${e.x+20-5} cy=${a+13} r="2.8" fill=${t} opacity=${n?.95:.5}/>
    <path d=${`M${e.x-12} ${e.y} L${e.x} ${e.y-9} L${e.x+12} ${e.y} Z`} fill=${t} opacity="0.4"/>
  </g>`}function sl(e){let t=e.x+e.w*.1,n=e.w*.8,r=e.y+e.h*.12,i=e.h*.42,a=n-10-25,o=Math.max(7,a/Yc),s=i-10;return Array.from({length:Yc},(e,n)=>({x:t+5+n*(o+5),y:r+5,w:o,h:s}))}function cl(e,t,n,r){let i=()=>n?.(e);return N`<g class="flow-node flow-city-zone" role="button" tabindex="0" aria-label=${t} @click=${i} @keydown=${e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),i())}}>${r}</g>`}function ll(e){let t=(e.consumers??[]).slice(0,6),n=al(e.compact,t.length),{pv:r=0,house:i=0,grid:a=0,battery:o=0}=e,s=e.motion!==!1,c=e.outline===!0,l=e=>Qc(e,c),u=e.i18n.t,d=nl(r),f=tl(i,e.loadMax??Jc),p=sl(n.facade),m=rl(e.soc,n.plinth.w-6),h=a<0?`var(--grid-in)`:`var(--grid-out)`,g=u(a<0?`nodeImport`:`nodeFeed`),_=u(o<0?`nodeBatDischarge`:`nodeBatCharge`),v={x:n.roof.x+n.roof.w/2,y:n.roof.y+n.roof.h/2},y={x:n.facade.x+n.facade.w/2,y:n.facade.y+n.facade.h*.45},b={x:n.plinth.x+n.plinth.w/2,y:n.plinth.y+n.plinth.h/2},x=n.facade.x+n.facade.w-9,S={x,y:n.facade.y+14},C={x,y:n.facade.y+n.facade.h*.36},w={x,y:b.y},T=y.x,E=Math.abs(o)>J,D={x:n.mast.x+16,y:n.mast.y-n.mast.h+14},O={x:n.roof.x+8,y:n.soffit.y+n.soffit.h/2},k=(D.y+O.y)/2-8,ee=`M${D.x} ${D.y} C${D.x+24} ${k}, ${O.x-28} ${O.y-4}, ${O.x} ${O.y}`,te={x:n.facade.x+n.facade.w*.1,y:n.facade.y+n.facade.h*.12,w:n.facade.w*.8,h:n.facade.h*.42},A=Dr({x:n.facade.x+n.facade.w,y:y.y},t.length),j=e.compact?[]:Or(t.map(e=>e.id),e.consumerPlaces??{},A),ne=n.plinth.y+n.plinth.h+18,re=ne+52,ie=t.map((t,r)=>e.compact?{c:t,p:{x:n.boxW-40,y:re+r*46,labelDy:5}}:{c:t,p:{x:j[r].x,y:j[r].y,labelDy:0}}),ae=t.length?Ar(y.y,A,n.boxH):n.boxH,oe=ie.length?Math.max(n.groundY+20,...ie.map(({p:e})=>e.y+44)):n.boxH,se=e.compact?ie.length?ie.at(-1).p.y+40:n.mast.y+56:e.arrange?ae:Math.max(n.boxH,oe),ce=[`${u(`nodePv`)} ${e.fmt.w(r)}`,`${u(`nodeHouse`)} ${e.fmt.w(i)}`,`${g} ${e.fmt.w(a)}`,`${_} ${e.fmt.w(o)}`,...ie.map(({c:t})=>`${t.name} ${e.fmt.w(t.watts)}`)].join(`, `),le=c?`none`:`rgba(16,22,36,.9)`,ue=c?1.8:1.4;return N`<svg viewBox="0 0 ${n.boxW} ${se}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${ce}>
    <defs>
      <filter id="city-glow"><feGaussianBlur stdDeviation="4.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="city-soft"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/></feMerge></filter>
      <linearGradient id="city-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--pv)" stop-opacity=${(d*.2).toFixed(2)}/>
        <stop offset="70%" stop-color="var(--fill, #0a101e)" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="city-roof" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--pv)" stop-opacity=${(d*.85).toFixed(2)}/>
        <stop offset="100%" stop-color="var(--pv)" stop-opacity=${(d*.5).toFixed(2)}/>
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
        <rect x=${n.roof.x+2} y=${n.roof.y+2} width=${n.roof.w-4} height=${n.roof.h-4} rx="3"/>
      </clipPath>
      <clipPath id="city-plinth-clip">
        <rect x=${n.plinth.x+2} y=${n.plinth.y+2} width=${n.plinth.w-4} height=${n.plinth.h-4} rx="1.5"/>
      </clipPath>
      ${p.map((e,t)=>N`<clipPath id=${`city-bar-${t}`}><rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx="2"/></clipPath>`)}
    </defs>

    <rect x="0" y="0" width=${n.boxW} height=${n.roof.y+36} fill="url(#city-sky)"/>
    <ellipse cx=${v.x} cy=${n.roof.y+6} rx=${n.roof.w*.34} ry="18" fill="var(--pv)" opacity=${(d*.14).toFixed(2)} filter="url(#city-soft)"/>
    <line x1=${n.mast.x-18} y1=${n.groundY} x2=${n.plinth.x+n.plinth.w+28} y2=${n.groundY} stroke="rgba(148,163,184,.3)" stroke-width="1.6" stroke-linecap="round"/>

    <path
      class="flow-line"
      d=${ee}
      stroke=${l(h)}
      opacity=${Math.abs(a)>J?.45:.22}
    />

    ${cl(`pv`,u(`nodePv`),e.onSelect,N`<rect class="flow-city-roof" x=${n.roof.x} y=${n.roof.y} width=${n.roof.w} height=${n.roof.h} rx="4" fill=${c?`none`:`rgba(10,16,28,.92)`} stroke=${l(`var(--pv)`)} stroke-width=${ue} stroke-opacity=${r>J||c?1:.45} filter=${r>J&&!c?`url(#city-glow)`:`none`}/>
        <rect x=${n.roof.x+2} y=${n.roof.y+2} width=${n.roof.w-4} height=${n.roof.h-4} rx="3" fill="url(#city-roof)"/>
        <g clip-path="url(#city-roof-clip)">
          ${Array.from({length:6},(e,t)=>{let r=n.roof.x+6+(n.roof.w-12)*t/5;return N`<line x1=${r} y1=${n.roof.y+4} x2=${r} y2=${n.roof.y+n.roof.h-4} stroke="rgba(255,255,255,.18)" stroke-width="1"/>`})}
          ${Array.from({length:3},(e,t)=>{let r=n.roof.y+5+(n.roof.h-10)*t/2;return N`<line x1=${n.roof.x+5} y1=${r} x2=${n.roof.x+n.roof.w-5} y2=${r} stroke="rgba(255,255,255,.14)" stroke-width="1"/>`})}
        </g>
        <rect x=${n.soffit.x} y=${n.soffit.y} width=${n.soffit.w} height=${n.soffit.h} fill=${c?`none`:`rgba(8,12,22,.85)`} stroke=${l(`var(--pv)`)} stroke-width="1" opacity="0.85"/>
        <text class="node-val" x=${v.x} y=${n.roof.y-18} text-anchor="middle">${e.fmt.w(r)}</text>
        <text class="node-lbl" x=${v.x} y=${n.roof.y-2} text-anchor="middle">${u(`nodePv`)}</text>`)}
    <circle cx=${O.x} cy=${O.y} r="3" fill=${l(h)} opacity=${Math.abs(a)>J?.9:.45}/>

    ${cl(`house`,u(`nodeHouse`),e.onSelect,N`<rect class="flow-city-body" x=${n.facade.x} y=${n.facade.y} width=${n.facade.w} height=${n.facade.h} rx="2" fill=${le} stroke=${l(`var(--house)`)} stroke-width=${ue}/>
        <rect x=${n.facade.x+1} y=${n.facade.y+1} width=${n.facade.w-2} height=${n.facade.h-2} rx="1.5" fill="url(#city-glass)"/>
        <rect x=${te.x} y=${te.y} width=${te.w} height=${te.h} rx="2" fill="rgba(8,12,22,.55)" stroke="rgba(148,163,184,.28)" stroke-width="1.2"/>
        ${p.map((e,t)=>{let n=f[t]??0,r=e.h*n,i=e.y+e.h-r;return N`<g>
            <rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx="2" fill="rgba(148,163,184,.2)" opacity="0.35"/>
            ${n>.005?N`<rect clip-path=${`url(#city-bar-${t})`} x=${e.x} y=${i} width=${e.w} height=${r} fill="var(--house)" opacity=${(.55+.4*n).toFixed(2)} filter=${c?`none`:`url(#city-glow)`}/>`:N``}
            ${t<5?N`<line x1=${e.x+e.w+2.5} y1=${te.y+3} x2=${e.x+e.w+2.5} y2=${te.y+te.h-3} stroke="rgba(148,163,184,.22)" stroke-width="1"/>`:N``}
          </g>`})}`)}

    <image href=${Nr} x=${n.logo.x} y=${n.logo.y} width=${n.logo.s} height=${n.logo.s} opacity="0.65" style="pointer-events:none" aria-label="Maestro"/>

    ${cl(`bat`,_,e.onSelect,N`<rect class="flow-city-cellar" x=${n.plinth.x} y=${n.plinth.y} width=${n.plinth.w} height=${n.plinth.h} rx="1.5" fill=${c?`none`:`rgba(8,12,20,.94)`} stroke=${l(`var(--bat)`)} stroke-width=${ue} filter=${Math.abs(o)>J&&!c?`url(#city-glow)`:`none`}/>
        <rect clip-path="url(#city-plinth-clip)" x=${n.plinth.x+2} y=${n.plinth.y+2} width=${m} height=${n.plinth.h-4} fill="url(#city-plinth)"/>
        ${e.compact?N`<text class="node-val-sm" x=${b.x} y=${ne} text-anchor="middle">${e.fmt.w(o)}</text>
            <text class="node-lbl-sm" x=${b.x} y=${ne+14} text-anchor="middle">${_}</text>`:N`<text class="node-val-sm" x=${n.plinth.x-14} y=${b.y-12} text-anchor="end">${e.fmt.w(o)}</text>
            <text class="node-lbl-sm" x=${n.plinth.x-14} y=${b.y+3} text-anchor="end">${_}</text>`}`)}

    ${cl(`grid`,g,e.onSelect,N`<rect x=${n.mast.x-28} y=${n.mast.y-n.mast.h-4} width="56" height=${n.mast.h+44} fill="transparent"/>
        ${ol(n.mast,l(h),Math.abs(a)>J,c)}
        <text class="node-val-sm" x=${n.mast.x} y=${e.compact?ne:n.mast.y+20} text-anchor="middle">${e.fmt.w(a)}</text>
        <text class="node-lbl-sm" x=${n.mast.x} y=${e.compact?ne+14:n.mast.y+34} text-anchor="middle">${g}</text>`)}

    <path
      class="flow-line"
      d=${`M${w.x} ${w.y} L${C.x} ${C.y}`}
      stroke=${l(`var(--bat)`)}
      opacity=${E?.5:.18}
    />
    ${r>J?N`<path class="flow-line" d=${`M${v.x} ${v.y} L${S.x} ${S.y}`} stroke=${l(`var(--pv)`)} opacity="0.45"/>
          ${il(v,S,2,2,r,l(`var(--pv)`),s)}`:N``}
    ${i>J&&o>J?il(C,w,2,2,Math.min(i,o),l(`var(--bat)`),s):N``}
    ${o<-30?il(w,C,2,2,Math.abs(o),l(`var(--bat)`),s):N``}
    ${a<-30?il(D,O,4,4,Math.abs(a),l(`var(--grid-in)`),s):N``}
    ${a>J?il(O,D,4,4,a,l(`var(--grid-out)`),s):N``}

    ${e.compact?ui(ie,{x:n.facade.x+n.facade.w,y:y.y},n.boxW,s):N``}

    <g style="pointer-events:none">
      <text class="node-lbl-sm" x=${T} y=${p[0].y+p[0].h+14} text-anchor="middle" opacity="0.75">${u(`flowCityLoad`)}</text>
      <text class="node-val" x=${T} y=${p[0].y+p[0].h+34} text-anchor="middle">${e.fmt.w(i)}</text>
      <text class="node-lbl" x=${T} y=${p[0].y+p[0].h+50} text-anchor="middle">${u(`nodeHouse`)}</text>
    </g>

    ${ie.map(({c:t,p:r})=>{let i=l(t.mode===`included`?`var(--house)`:`var(--accent)`),a=t.missing||Math.abs(t.watts)<J,o=()=>{e.arrange||e.onSelect?.(t.id)},u=e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),o())},d=n=>Mr(n,t.id,A,e.arrange,e.onPlaceConsumer),f={x:n.facade.x+n.facade.w,y:Math.min(Math.max(r.y,n.facade.y+24),n.facade.y+n.facade.h-24)};return e.compact?N`<g class="flow-node" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${t.name} @click=${o} @keydown=${u}>
          <circle cx=${r.x} cy=${r.y} r=${Gc} fill=${c?`none`:`rgba(10,16,30,.9)`} stroke=${i} stroke-width=${c?`2.2`:`2`}/>
          <g transform=${$c(r.x,r.y,Lr(Gc))} fill="none" stroke=${i} stroke-width=${qc} stroke-linecap="round" stroke-linejoin="round"><path d=${ut[t.icon]} vector-effect="non-scaling-stroke"/></g>
          <text font-size="14" font-weight="700" fill="var(--text)" x=${r.x-26} y=${r.y+5} text-anchor="end">${e.fmt.w(t.watts)}  ${el(t.name,24)}</text>
        </g>`:N`<g class="flow-node ${e.arrange?`arrange`:``}" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${t.name} @click=${o} @keydown=${u} @pointerdown=${d}>
        <path class="flow-line" d=${`M${f.x} ${f.y} C${f.x+28} ${f.y}, ${r.x-36} ${r.y}, ${r.x-Wc} ${r.y}`} stroke=${i}/>
        ${il(f,r,0,Wc,t.watts,i,s)}
        <circle cx=${r.x} cy=${r.y} r="26" fill=${c?`none`:`rgba(10,16,30,.9)`} stroke=${i} stroke-width=${c?`2.4`:`2`} filter=${a||c?`none`:`url(#city-glow)`}/>
        <g transform=${$c(r.x,r.y,Lr(Wc))} fill="none" stroke=${i} stroke-width=${qc} stroke-linecap="round" stroke-linejoin="round"><path d=${ut[t.icon]} vector-effect="non-scaling-stroke"/></g>
        <text class="node-val-sm" x=${r.x+36} y=${r.y-2} text-anchor="start">${e.fmt.w(t.watts)}</text>
        <text class="node-lbl-sm" x=${r.x+36} y=${r.y+14} text-anchor="start">${el(t.name,18)}</text>
      </g>`})}
  </svg>`}function ul(e,t){let n=al(e,t);if(e){let e=n.plinth.y+n.plinth.h+18;if(!t)return Math.round((e+40)*.94);let r=e+52+(t-1)*46;return Math.round((r+40)*.94)}if(!t)return Math.round(n.boxH*.95);let r=Tr(1,1,Dr({x:n.facade.x+n.facade.w,y:n.facade.y+n.facade.h*.45},t)).y+44;return Math.round(Math.max(n.boxH,r)*.95)}function dl(e){return/[",\n\r]/.test(e)?`"${e.replace(/"/g,`""`)}"`:e}function fl(e){return e.map(e=>e.map(dl).join(`,`)).join(`
`)}function pl(e,t){let n=new Blob([`\uFEFF${fl(t)}`],{type:`text/csv;charset=utf-8`}),r=document.createElement(`a`);r.href=URL.createObjectURL(n),r.download=e,r.click(),URL.revokeObjectURL(r.href)}var ml=e=>!e||e.state===`unknown`||e.state===`unavailable`?`–`:e.state,hl={off:`noPlanOff`,slots:`noPlanSlots`,threshold:`noPlanThreshold`,computing:`planComputing`,no_prices:`noPlanPrices`,no_profile:`noPlanProfile`,no_room:`noPlanRoom`,no_plan:`noPlan`},Y=(e,t)=>e.hass.states[t],gl=(e,t)=>Y(e,t)?.attributes??{},X=e=>typeof e==`number`&&Number.isFinite(e)?e:void 0,Z=(e,t)=>M`${e}<small>${t}</small>`,_l=(e,t)=>{let n=gl(e,t);if(n.simulation!==`dynamic_buy_price`)return;let r=X(n.simulation_dynamic_eur);if(r===void 0)return;let i=n.simulation_kind===`saving`?`saving`:`cost`,a=n.simulation_comparable===!0;return{sim:r,delta:a?X(n.simulation_delta_eur):void 0,kind:i,comparable:a}},Q=(e,t)=>M`<div class="row"><span>${e}</span><b>${t}</b></div>`,vl=e=>[[`time`,`soc_pct`,`pv_w`,`house_w`,`grid_w`,`phase`],...e.trajectory_points.map((t,n)=>[new Date(t[0]).toISOString(),String(t[1]),String(e.pv_points[n]?.[1]??``),String(e.house_points[n]?.[1]??``),String(e.grid_points[n]?.[1]??``),e.trajectory_phases[n]??``])],yl=e=>[[`time`,`phase`,`reason`],...(e.timeline??[]).map(e=>[new Date(e.ts).toISOString(),e.phase,e.reason])],bl=e=>B(Y(e,I.debug)),xl=e=>{let t=Y(e,I.debugLog),n=t?.attributes?.lines;if(Array.isArray(n)&&n.length>0)return n.map(String).join(`
`);let r=t?.state;return!r||r===`unknown`||r===`unavailable`?e.i18n.t(`debugEmpty`):r};function Sl(e,t,n){return M`<div class="soc-gauge" role="img" aria-label=${`${Math.round(e)}% ${t}`}>
    <div class="soc-disc" style=${`background:${pr(e,n)}`}></div>
    <div class="soc-readout">
      <b>${Math.round(e)}%</b>
      <span>${t}</span>
    </div>
  </div>`}function Cl(e,t,n,r){let i=Ws(n);return M`<div class="soc-pack">
    ${Ks(`${Math.round(e)}% ${t}`,e,i,{live:!0,reserve:r})}
    <div class="soc-pack-readout">
      <b>${Math.round(e)}%</b>
      <span>${t}</span>
    </div>
  </div>`}function wl(e,t,n,r){let{t:i}=e.i18n,a=ml(Y(e,I.autonomy)),o=on(a===`–`?void 0:a),s=o===void 0?t??0:Math.min(100,o/12*100),c=rn(gl(e,I.trajectory)),l=c?dn(c.trajectory_points,c.grid_points,{reserve:r,currentSoc:t,currentGrid:z(Y(e,I.grid)),battery:c.battery_points}):void 0,u=l?.peakSoc,d=Math.max(0,Math.min(100,u??t??0)),f=Math.max(0,Math.min(100,t??0)),p=r!==void 0&&Number.isFinite(r)?Math.max(0,Math.min(100,r)):void 0,m=[l?l.peakAt===void 0?i(`forecastNoPeak`):i(l.peakDay===`today`?`forecastPeakToday`:`forecastPeakTomorrow`,{v:e.fmt.time(l.peakAt)}):void 0,l?.floorAt===void 0?void 0:i(l.floorKind===`up`?`forecastFloorReach`:p?`forecastFloor`:`forecastEmpty`,{v:e.fmt.time(l.floorAt)}),l?l.gridImportKind===`ongoing`?i(`forecastGridOngoing`):l.gridImportKind===`until`&&l.gridImportAt!==void 0?i(`forecastGridUntil`,{v:e.fmt.time(l.gridImportAt)}):l.gridImportKind===`starts`&&l.gridImportAt!==void 0?i(`forecastGrid`,{v:e.fmt.time(l.gridImportAt)}):i(`forecastNoGrid`):void 0,n!==void 0&&(u===void 0||Math.round(n)!==Math.round(u))?i(`tagTargetSoc`,{v:Math.round(n)}):void 0].filter(Boolean);return M`<div class="soc-metrics">
    <div class="soc-metric">
      <div class="soc-metric-head">
        <span>${i(`forecastPeak`)}</span>
        <b>${u===void 0?`–`:`${Math.round(u)}%`}</b>
      </div>
      <div class="soc-track" role="img" aria-label=${`${i(`forecastPeak`)} ${u===void 0?`–`:`${Math.round(u)}%`}`}>
        ${p===void 0?P:M`<i class="soc-track-reserve" style="width:${p}%"></i>`}
        <i class="soc-track-fill" style="width:${f}%"></i>
        ${u===void 0?P:M`<i class="soc-track-mark" style="left:${d}%"></i>`}
      </div>
      ${m.length?M`<div class="soc-metric-sub">
            ${m.map((e,t)=>M`${t?M`<span class="soc-metric-sep" aria-hidden="true">·</span>`:P}<span>${e}</span>`)}
          </div>`:P}
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
  </div>`}var Tl=(e,t,n)=>{if(n(I.unjustified))return t(`kpiGridBatWarn`);let r=Y(e,I.phase)?.state;if(r===`reserve_protection`)return t(`kpiGridBatReserve`);if(r===`emergency`)return t(`kpiGridBatEmergency`);let i=String(Y(e,I.gridToBattery)?.attributes?.charge_reason??``);return i===`reserve`?t(`kpiGridBatReserve`):i===`emergency`?t(`kpiGridBatEmergency`):i===`justified`&&n(I.fixedReserve)?t(`kpiGridBatReserve`):t(i===`justified`||i===`curtailment`||i===`feed_in_limit`?`kpiGridBatJustified`:`kpiGridBatSub`)};function El(e){let{t}=e.i18n,n=z(Y(e,I.soc)),r=z(Y(e,I.targetSoc)),i=z(Y(e,I.battery)),a=t=>B(Y(e,t)),o=a(I.reachable),s=[[t(`chipUnreachable`),!o,`warn`],[t(`chipChargeLock`),a(I.chargeLock),`warn`],[t(`chipDischargeLock`),a(I.dischargeLock),`warn`],[t(`chipHt`),a(I.htProtect),`warn`],[t(`chipCurtail`),a(I.curtail),`warn`],[t(`chipEmergency`),a(I.emergency),`warn`],[t(`chipFeedIn`),a(I.feedInLimit),`warn`],[t(`chipReserveCharge`),Y(e,I.phase)?.state===`reserve_protection`,`on`],[t(`chipGridCharge`),a(I.gridCharge),`on`],[t(`chipBatteryPriority`),a(I.batteryPriority),`warn`],[t(`chipLowYield`),a(I.lowYield),`warn`]].filter(([,e])=>e),c=e.period===`today`&&jn(e.balanceDay),l=(t,n,r=e.period===`today`)=>!r||!e.sparks?.[t]?.length?P:M`<maestro-chart class="spark" .options=${Oi(`spark-${t}`,[e.theme,e.sparks[t]],()=>gr(e.sparks[t],n))}></maestro-chart>`,u=e.flowStyle===`city`?e.mobile?ul(!0,e.consumers.length):void 0:e.flowStyle===`blob`?Hc(e.mobile,e.consumers.length):li(e.mobile,e.consumers.length),d=e.flowStyle===`blob`?Uc:e.flowStyle===`city`?ll:di,f=t=>e.period===`today`?z(Y(e,I[t])):e.periodSums?.[t],p=t=>e.period===`today`?c?z(Y(e,I[t])):e.daySums?.[t]:e.periodSums?.[t],m=[p(`feedRevenue`),p(`saving`),p(`costToday`),p(`wear`)],h=c?z(Y(e,I.balance)):m.some(e=>e===void 0)?void 0:m[0]+m[1]-m[2]-m[3],g=t=>`${e.fmt.n(t,2)} €`,_=t(e.period===`today`?`whenToday`:e.period===`week`?`whenWeek`:`whenMonth`),v=e.period===`today`?c?_:e.fmt.day(An(e.balanceDay)):_,y=t(e.period===`today`?`groupToday`:e.period===`week`?`groupWeek`:`groupMonth`),b=t(e.period===`today`?`balanceTitle`:e.period===`week`?`balanceWeek`:`balanceMonth`),x=h===void 0||h===0?``:h>0?`pos`:`neg`,S=kn(),C=(n,r=e.period===`today`)=>{if(!r)return P;let i=_l(e,n);if(!i)return P;let a=P;if(!i.comparable)a=M`<span class="sim-delta muted">${t(`kpiSimPending`)}</span>`;else if(i.delta!==void 0&&Math.abs(i.delta)>=.005){let n=e.fmt.n(Math.abs(i.delta),2),r=i.kind===`cost`?i.delta<0:i.delta>0,o=i.kind===`cost`?t(i.delta>0?`kpiSimCostlier`:`kpiSimCheaper`,{v:n}):t(i.delta>0?`kpiSimMoreSaving`:`kpiSimLessSaving`,{v:n});a=M`<span class="sim-delta ${r?`pos`:`neg`}">${o}</span>`}return M`<div class="sim-dyn">${t(`kpiSimDynamic`,{v:e.fmt.n(i.sim,2)})} ${a}</div>`},w=t=>{!/^\d{4}-\d{2}-\d{2}$/.test(t)||t>S||e.onBalanceDay(t)},T=e.period===`today`?M`<div class="day-nav" role="group" aria-label=${t(`dayNav`)}>
          <button type="button" class="day-nav-btn" aria-label=${t(`dayPrev`)} @click=${()=>w(Mn(e.balanceDay,-1))}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>
          </button>
          <div class="day-nav-pick">
            <button type="button" class="day-nav-date" aria-label=${t(`dayPick`)} @click=${e=>{let t=e.currentTarget.closest(`.day-nav-pick`)?.querySelector(`input[type=date]`);if(t){e.preventDefault();try{typeof t.showPicker==`function`?t.showPicker():(t.focus(),t.click())}catch{t.focus(),t.click()}}}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>
              <span class="day-nav-label">${c?t(`periodToday`):e.fmt.day(An(e.balanceDay))}</span>
            </button>
            <input
              type="date"
              .value=${e.balanceDay}
              max=${S}
              tabindex="-1"
              aria-hidden="true"
              @change=${e=>w(e.target.value)}
            />
          </div>
          <button
            type="button"
            class="day-nav-btn"
            aria-label=${t(`dayNext`)}
            ?disabled=${c}
            @click=${()=>w(Mn(e.balanceDay,1))}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
          </button>
          ${c?P:M`<button type="button" class="day-nav-today" @click=${()=>w(S)}>${t(`periodToday`)}</button>`}
        </div>`:P,E=Y(e,I.forceDischargePower),D=E?.attributes??{},O=typeof D.min==`number`?D.min:100,k=typeof D.max==`number`?D.max:1e4,ee=typeof D.step==`number`?D.step:100,te=e.forcePowerDraft??z(E)??O,A=Y(e,I.fixedReserveSoc),j=A?.attributes??{},ne=typeof j.min==`number`?j.min:0,re=typeof j.max==`number`?j.max:100,ie=typeof j.step==`number`?j.step:1,ae=e.reserveDraft??z(A)??ne,oe=[a(I.ctrlPredictive)?t(`modePredictive`):``,a(I.ctrlPlanShadow)?t(`modeShadow`):``].filter(Boolean).join(` · `),se=t=>e.fmt.n(z(Y(e,I[t]))),ce=Ct(e.consumers,z(Y(e,I.wallboxEnergy))),le=()=>{e.collapsed.has(`today`)&&e.onToggleGroup(`today`)},ue=(t,n,r,i,a,o=`grid kpis`)=>{let s=!e.collapsed.has(t);return M`<section class="group">
      <div class="group-bar">
        <button type="button" class="group-head ${s?`open`:``}" aria-expanded=${s} @click=${()=>e.onToggleGroup(t)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
          <span>${n}</span>
          ${s?P:r}
        </button>
        ${a??P}
      </div>
      ${s?M`<div class=${o}>${i}</div>`:P}
    </section>`};return M`
    ${ho(e)}
    <div class="grid live-top">
      <div class="card">
        <div class="card-head">
          <div>
            <h3>${t(`flowTitle`)}</h3>
            <div class="sub live-state">${t(`flowSub`)}<i class="live-dot ${o?`ok`:`bad`}" role="img" aria-label=${t(o?`chipReachable`:`chipUnreachable`)}></i></div>
            ${oe?M`<div class="sub mode-line">${oe}</div>`:P}
          </div>
          <div class="flow-head-actions">
            <div class="flow-style" role="radiogroup" aria-label=${t(`flowStyleLabel`)}>
              ${ia.map(n=>M`<button
                  type="button"
                  class="flow-style-btn ${e.flowStyle===n?`on`:``}"
                  role="radio"
                  aria-checked=${e.flowStyle===n}
                  @click=${()=>e.onFlowStyle(n)}
                >${t(n===`nodes`?`flowStyleNodes`:n===`blob`?`flowStyleBlob`:`flowStyleCity`)}</button>`)}
            </div>
            ${e.consumers.length&&!e.mobile?M`<button
                  type="button"
                  class="flow-style-btn arrange-btn ${e.arrangeConsumers?`on`:``}"
                  aria-pressed=${e.arrangeConsumers}
                  @click=${e.onToggleArrange}
                >${e.arrangeConsumers?t(`arrangeDone`):t(`arrangeConsumers`)}</button>`:P}
            <button type="button" class="icon-btn" aria-label=${t(`editConsumers`)} @click=${e.onEditConsumers}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
            </button>
          </div>
        </div>
        ${e.arrangeConsumers?M`<p class="flow-arrange-hint">${t(`arrangeHint`)}
              <button type="button" class="linkish" @click=${e.onResetConsumerPlaces}>${t(`arrangeReset`)}</button>
            </p>`:P}
        <div class="flow-wrap ${e.flowStyle} ${e.arrangeConsumers?`arrange`:``}" style=${u?`height:${u}px`:P}>
          ${d({pv:z(Y(e,I.pv)),house:z(Y(e,I.house)),grid:z(Y(e,I.grid)),battery:i,loadMax:z(Y(e,I.inverterPower)),soc:n,consumers:e.consumers,consumerPlaces:e.consumerPlaces,arrange:e.arrangeConsumers,onPlaceConsumer:e.onPlaceConsumer,motion:e.motion,onSelect:e.onFlowNode,compact:e.mobile,outline:e.theme!==`dark`,fmt:e.fmt,i18n:e.i18n})}
        </div>
        <button type="button" class="flow-day" @click=${le} aria-label=${t(`flowDayOpen`)}>
          <span class="flow-day-label">${t(`flowDay`)}</span>
          <span>${t(`nodePv`)} ${se(`pvToday`)}</span>
          <span class="flow-day-sep" aria-hidden="true">·</span>
          <span>${t(`nodeHouse`)} ${se(`houseToday`)}</span>
          <span class="flow-day-sep" aria-hidden="true">·</span>
          <span>${t(`flowDayImport`)} ${se(`importToday`)}</span>
          <span class="flow-day-sep" aria-hidden="true">·</span>
          <span>${t(`flowDayFeed`)} ${se(`feedToday`)}</span>
          <span class="flow-day-unit">kWh</span>
        </button>
        ${ce.length?M`<div class="flow-day flow-day-extra">
              <span class="flow-day-label">${t(`flowDaySeparate`)}</span>
              ${ce.map((t,n)=>M`${n?M`<span class="flow-day-sep" aria-hidden="true">·</span>`:P}
                  <span>${t.name} ${e.fmt.n(t.kwh)}</span>`)}
              <span class="flow-day-unit">kWh</span>
            </div>`:P}
        ${e.consumerOverflow?M`<p class="err">${t(`consumersOverflow`)}</p>`:P}
      </div>
      <div class="card soc-card">
        <div class="card-head soc-head">
          <h3>${t(`battery`)}</h3>
          <div class="flow-style" role="radiogroup" aria-label=${t(`batteryStyleLabel`)}>
            ${$i.map(n=>M`<button
                type="button"
                class="flow-style-btn ${e.batteryStyle===n?`on`:``}"
                role="radio"
                aria-checked=${e.batteryStyle===n}
                @click=${()=>e.onBatteryStyle(n)}
              >${t(n===`pack`?`batteryStylePack`:`batteryStyleRing`)}</button>`)}
          </div>
        </div>
        <div class="soc-visual">
          ${n===void 0?M`<p class="empty">${t(`unavailable`)}</p>`:e.batteryStyle===`pack`?Cl(n,t(`stateOfCharge`),i,a(I.fixedReserve)?ae:void 0):Sl(n,t(`stateOfCharge`),a(I.fixedReserve)?ae:void 0)}
          ${a(I.fixedReserve)?M`<p class="reserve-hint"><i></i>${t(`fixedReserve`)} ${t(`ctrlReserveSoc`,{v:Math.round(ae)})}</p>`:P}
        </div>
        ${wl(e,n,r,a(I.fixedReserve)?ae:void 0)}
      </div>
    </div>
    ${s.length?M`<div class="chips">
          ${s.map(([e,,t])=>M`<span class="chip ${t}"><i></i>${e}</span>`)}
        </div>`:P}
    <section class="card grip">
      <button type="button" class="grip-head ${e.controlsOpen?`open`:``}" aria-expanded=${e.controlsOpen} @click=${()=>e.onToggleControls()}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        <span class="grip-title">${t(`controlsPair`)}</span>
        ${a(I.forceDischarge)?M`<span class="grip-state warn">${t(`controlsForceOn`,{v:e.fmt.w(te)})}</span>`:P}
        ${a(I.fixedReserve)?M`<span class="grip-state on">${t(`controlsReserveOn`,{v:Math.round(ae)})}</span>`:P}
      </button>
      ${e.controlsOpen?M`<div class="grip-body">
            <div class="force">
              <div class="txt"><b>${t(`forceTitle`)}</b><span>${t(`ctrlForcePower`,{v:e.fmt.w(te)})}</span></div>
              <button
                class="switch ${a(I.forceDischarge)?`on`:``}"
                role="switch"
                aria-checked=${a(I.forceDischarge)}
                aria-label=${t(`forceTitle`)}
                ?disabled=${!Y(e,I.forceDischarge)||e.pending.has(I.forceDischarge)}
                @click=${()=>e.onToggle(I.forceDischarge)}
              ></button>
              ${Zt({label:t(`ctrlForcePower`,{v:``}),min:O,max:k,step:ee,value:te,disabled:!E||E.state===`unavailable`,onPreview:e.onPowerDraft,onCommit:e.onPowerCommit})}
            </div>
            <div class="force">
              <div class="txt"><b>${t(`fixedReserve`)}</b><span>${t(`ctrlReserveSoc`,{v:Math.round(ae)})}</span></div>
              <button
                class="switch ${a(I.fixedReserve)?`on`:``}"
                role="switch"
                aria-checked=${a(I.fixedReserve)}
                aria-label=${t(`fixedReserve`)}
                ?disabled=${!Y(e,I.fixedReserve)||e.pending.has(I.fixedReserve)}
                @click=${()=>e.onToggle(I.fixedReserve)}
              ></button>
              ${Zt({label:t(`fixedReserve`),min:ne,max:re,step:ie,value:ae,unit:`%`,disabled:!A||A.state===`unavailable`,onPreview:e.onReserveDraft,onCommit:e.onReserveCommit})}
            </div>
          </div>`:P}
    </section>
    ${Ll(e)}
    ${ue(`today`,y,M`<b class="group-sum">${g(f(`costNet`))}<small>${t(`groupNet`)}</small></b>`,M`
      <div class="card kpi">
        <h3>${t(`kpiCost`,{when:_})}</h3>
        <div class="v">${Z(e.fmt.n(f(`costNet`),2),`€`)}${C(I.costNet)}</div>
        <div class="delta">${t(`kpiCostSub`)}</div>
        ${l(`costNet`,V.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiSaving`,{when:_})}</h3>
        <div class="v">${Z(e.fmt.n(f(`saving`),2),`€`)}${C(I.saving)}</div>
        <div class="delta">${t(`kpiSavingSub`)}</div>
        ${l(`saving`,V.gridOut)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiSelf`,{when:_})}</h3>
        <div class="v">${Z(e.fmt.n(f(`selfUse`)),`kWh`)}</div>
        <div class="delta">${t(`kpiSelfSub`,{imp:e.fmt.n(f(`importToday`)),feed:e.fmt.n(f(`feedToday`))})}</div>
        ${l(`selfUse`,V.pv)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiBattery`,{when:_})}</h3>
        <div class="v">${Z(e.fmt.n(f(`chargedToday`)),`kWh`)}</div>
        <div class="delta">${t(`kpiBatterySub`,{out:e.fmt.n(f(`dischargedToday`))})}</div>
        ${l(`chargedToday`,V.bat)}
      </div>
    `,M`<div class="seg period" role="group" aria-label=${t(`periodToday`)}>
        ${[`today`,`week`,`month`].map(n=>M`<button class=${e.period===n?`active`:``} aria-pressed=${e.period===n} @click=${()=>e.onPeriod(n)}>${t(n===`today`?`periodToday`:n===`week`?`periodWeek`:`periodMonth`)}</button>`)}
      </div>`)}
    ${ue(`balance`,b,M`<b class="group-sum ${x}">${g(h)}</b>`,M`
      <div class="card kpi">
        <h3>${t(`kpiCostGross`)}</h3>
        <div class="v">${Z(e.fmt.n(p(`costToday`),2),`€`)}${C(I.costToday,c)}</div>
        <div class="delta">${t(`kpiCostGrossSub`)}</div>
        ${l(`costToday`,V.gridIn,c)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiRevenue`)}</h3>
        <div class="v">${Z(e.fmt.n(p(`feedRevenue`),2),`€`)}</div>
        <div class="delta">${t(`kpiRevenueSub`,{when:v})}</div>
        ${l(`feedRevenue`,V.gridOut,c)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiWear`)}</h3>
        <div class="v">${Z(e.fmt.n(p(`wear`),2),`€`)}</div>
        <div class="delta">${t(`kpiWearSub`)}</div>
        ${l(`wear`,V.accent2,c)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiBalance`)}</h3>
        <div class="v">${Z(e.fmt.n(h,2),`€`)}</div>
        <div class="delta">${t(`kpiBalanceSub`)}</div>
        ${l(`balance`,V.accent,c)}
      </div>
      <div class="card kpi ${c&&a(I.unjustified)?`alert`:``}">
        <h3>${t(`kpiGridBat`)}</h3>
        <div class="v">${Z(e.fmt.n(p(`gridToBattery`)),`kWh`)}</div>
        <div class="delta">${c?Tl(e,t,a):t(`kpiGridBatSub`)}</div>
        ${l(`gridToBattery`,V.gridIn,c)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiWallbox`,{when:v})}</h3>
        <div class="v">${Z(e.fmt.n(p(`wallboxEnergy`)),`kWh`)}</div>
        <div class="delta">${t(`kpiWallboxSub`)}</div>
        ${l(`wallboxEnergy`,V.house,c)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiFeedLimit`)}</h3>
        <div class="v">${Z(e.fmt.n(p(`curtailAvoided`)),`kWh`)}</div>
        <div class="delta">${t(`kpiFeedLimitSub`,{n:e.fmt.n(p(`feedInInterventions`),0),dc:e.fmt.n(p(`feedInAvoided`))})}</div>
        ${l(`curtailAvoided`,V.pv,c)}
      </div>
    `,T)}
    ${(()=>{let n=e.pulseDays??[],r=n.filter(e=>e.balance!==void 0),i=r.length?r.reduce((e,t)=>e+t.balance,0):void 0,a=i===void 0||i===0?``:i>0?`pos`:`neg`,o=r.map(e=>[e.ts,e.balance]),s=a===`neg`?V.gridIn:V.gridOut,c=e.pulseState??`idle`,l=c===`error`?M`<p class="err">${t(`historyFailed`)}</p>`:c===`loading`&&!n.length?M`<p class="hint">${t(`loading`)}</p>`:r.length?M`<maestro-chart
                  class="pulse-chart"
                  .options=${Oi(`pulse-${e.pulseRange}`,[e.theme,e.fmt.loc,n],()=>vr({days:n,fmt:e.fmt,i18n:e.i18n,onDay:t=>e.onBalanceDay(t)}))}
                ></maestro-chart>`:M`<p class="hint">${t(`pulseEmpty`)}</p>`;return ue(`balancePulse`,t(`pulseTitle`),M`<span class="pulse-sum">
          ${o.length?M`<maestro-chart class="pulse-spark" .options=${Oi(`pulse-spark-${e.pulseRange}`,[e.theme,o],()=>gr(o,s))}></maestro-chart>`:P}
          <b class="group-sum ${a}">${g(i)}</b>
        </span>`,l,M`<div class="seg period" role="group" aria-label=${t(`pulseTitle`)}>
          ${[`week`,`month`].map(n=>M`<button class=${e.pulseRange===n?`active`:``} aria-pressed=${e.pulseRange===n} @click=${()=>e.onPulseRange(n)}>${t(n===`week`?`periodWeek`:`periodMonth`)}</button>`)}
        </div>`,`pulse-body`)})()}`}var Dl=(e,t)=>e(t===`ok`?`qualityOk`:t===`pv_fallback`?`qualityPv`:t===`consumption_fallback`?`qualityConsumption`:t===`both_fallback`?`qualityBoth`:`qualityUnknown`),Ol=(e,t)=>{let n=z(Y(e,t));return n===void 0?`–`:`${Math.round(n)} %`};function kl(e){let{t}=e.i18n,n=gl(e,I.trajectory),r=rn(n);if(!r)return M`<div class="card"><p class="empty">${t(`noForecast`)}</p></div>`;let i=gl(e,I.plan),a=i.controlling===!0?gn(hn(i.plan_slots)):void 0,o=!!a&&a.length>=2,s=[[V.bat,t(o?`legendPlanSoc`:`legendSoc`)],[V.pv,t(`legendPv`)],[V.house,t(`legendHouse`)],[V.gridIn,t(`legendImport`)],[V.gridOut,t(`legendFeed`)]],c=o?Math.min(...a.map(e=>e[1])):X(n.min_soc),l=o?Math.max(...a.map(e=>e[1])):X(n.max_soc),u=(e,t)=>M`<div class="card stat"><h3>${e}</h3><div class="v">${t}</div></div>`;return M`
    <div class="card">
      <div class="chart-head">
        <div class="grow">
          <h3>${t(o?`chartTitlePlan`:`chartTitle`)}</h3>
          <div class="legend">${s.map(([e,t])=>M`<span><i style="background:${e}"></i>${t}</span>`)}</div>
        </div>
        <button class="toggle ${e.showIst?`active`:``}" aria-pressed=${e.showIst} @click=${e.onToggleIst}>${t(`actualOverlay`)}</button>
        <button class="toggle" @click=${()=>pl(`maestro-prognose.csv`,vl(r))}>${t(`exportCsv`)}</button>
        <div class="seg" role="group">
          ${[6,12,24].map(n=>M`<button class=${e.range===n?`active`:``} aria-pressed=${e.range===n} @click=${()=>e.onRange(n)}>${t(`hoursShort`,{h:n})}</button>`)}
        </div>
      </div>
      <maestro-chart
        id="fc-main"
        .options=${Oi(`forecast`,[e.theme,Y(e,I.trajectory),Y(e,I.plan),Y(e,I.targetSoc)?.state,e.ist,e.showIst,e.fmt.loc],()=>ur({traj:r,targetSoc:z(Y(e,I.targetSoc)),planSoc:o?a:void 0,ist:e.ist,showIst:e.showIst,fmt:e.fmt,i18n:e.i18n}))}
      ></maestro-chart>
      <maestro-chart id="fc-brush" .options=${Oi(`brush`,[e.theme,Y(e,I.trajectory)],()=>dr(r))}></maestro-chart>
    </div>
    <div class="grid stat-row">
      ${u(t(`statMinMax`),M`${Math.round(c??0)}<small>%</small> / ${Math.round(l??0)}<small>%</small>`)}
      ${u(t(`statImport`),Z(e.fmt.n(X(n.grid_draw_kwh)),`kWh`))}
      ${u(t(`statFeed`),Z(e.fmt.n(X(n.grid_feed_in_kwh)),`kWh`))}
      ${u(t(`statAutarky`),Z(e.fmt.n(X(n.self_sufficiency_pct)),`%`))}
      ${u(t(`statPvTomorrow`),Z(e.fmt.n(z(Y(e,I.pvTomorrow))),`kWh`))}
    </div>
    <div class="grid stat-row">
      ${u(t(`qualityLabel`),Dl(t,Y(e,I.forecastQuality)?.state))}
      ${u(t(`statP10`),Z(e.fmt.n(z(Y(e,I.p10))),`kWh`))}
      ${u(t(`statDeficit`),Z(e.fmt.n(z(Y(e,I.deficit))),`kWh`))}
      ${u(t(`statYield`),M`${e.fmt.n((()=>{let t=z(Y(e,I.yieldRatio));return t===void 0?void 0:t*100})())}<small>%</small>`)}
    </div>
    <p class="sub yield-note">${t(`statYieldSub`,{today:e.fmt.n(z(Y(e,I.yieldToday))),ref:e.fmt.n(z(Y(e,I.yieldRef)))})}</p>`}var Al=(e,t,n)=>M`<div class="row"><span>${e}</span><b style=${n?`color:${n}`:``}>${t}</b></div>`;function jl(e,t){let{t:n}=e.i18n,{fmt:r}=e,i=X(t.budget_kwh),a=X(t.floor_pct),o=X(t.ceiling_pct),s=X(t.efficiency),c=X(t.min_spread),l=X(t.wear_eur_per_kwh),u=X(t.safety_factor);return i===void 0&&a===void 0&&o===void 0&&s===void 0&&c===void 0?P:M`<div class="plan-diag">
    <h4>${n(`planDiag`)}</h4>
    ${i===void 0?P:Al(n(`planBudget`),`${r.n(i,2)} kWh`)}
    ${a===void 0?P:Al(n(`planFloor`),`${r.n(a,0)} %`)}
    ${o===void 0?P:Al(n(`planCeiling`),`${r.n(o,0)} %`)}
    ${s===void 0?P:Al(n(`planEfficiency`),r.n(s,2))}
    ${c===void 0?P:Al(n(`planMinSpread`),`${r.n(c*100,1)} ct/kWh`)}
    ${l===void 0?P:Al(n(`planWear`),`${r.n(l,3)} €/kWh`)}
    ${u===void 0?P:Al(n(`planSafety`),r.n(u,2))}
  </div>`}function Ml(e){let{t}=e.i18n,n=gl(e,I.plan),r=hn(n.plan_slots),i=us(e.hass),a=Bs({...e,priceSensor:e.options.ready?!!e.options.options.price_sensor:void 0}),o=jl(e,n);if(!r.length){let e=yn(i,n),r=typeof n.message==`string`&&n.message&&e!==`computing`?n.message:``;return M`<div class="card">
      <div class="empty plan-empty ${e===`computing`?`busy`:``}" role="status">
        ${e===`computing`?M`<span class="spinner" aria-hidden="true"></span>`:P}
        <p>${t(hl[e])}</p>
        ${r?M`<p class="sub">${r}</p>`:P}
      </div>
      ${o}
    </div>${a}`}let s=vn(r),c=[[V.gridOut,t(`legendCharge`)],[V.pv,t(`legendHold`)],[V.bat,t(`legendRelease`)]],l=typeof n.known_until==`string`?e.fmt.dayTime(n.known_until):`–`,u=t=>`${e.fmt.n(t.price*100)} ct · ${t.start_local}`;return M`
    <div class="grid plan-top">
      <div class="card">
        <div class="chart-head">
          <div class="grow">
            <h3>${t(`priceTitle`)}</h3>
            <div class="legend">
              ${c.map(([e,t])=>M`<span><i style="background:${e}"></i>${t}</span>`)}
              <span><i style="background:#fff;height:2px;border-radius:0"></i>${t(`legendPlanSoc`)}</span>
            </div>
          </div>
          <span class="badge">${n.shadow_mode?t(`planShadow`):t(`planActive`)}</span>
        </div>
        <maestro-chart .options=${Oi(`plan`,[e.theme,Y(e,I.plan),e.fmt.loc],()=>fr({slots:r,fmt:e.fmt,i18n:e.i18n}))}></maestro-chart>
        <div class="strip">
          ${r.map(t=>M`<div class="slot ${mn(t)}" title="${t.start_local} · ${e.fmt.n(t.price*100)} ct"></div>`)}
        </div>
        <div class="strip-axis">${r.filter((e,t)=>t%4==0).map(e=>M`<span>${e.start_local}</span>`)}</div>
      </div>
      <div class="card plan-kpi">
        <div>
          <h3>${t(`planTitle`)}</h3>
          <div class="plan-state">${ml(Y(e,I.plan))}</div>
          <div class="sub msg">${typeof n.message==`string`?n.message:``}</div>
        </div>
        <div>
          ${Al(t(`planStrategy`),i?e.i18n.option(i):`–`)}
          ${Al(t(`planGridCharge`),`${e.fmt.n(X(n.total_grid_charge_kwh),2)} kWh`)}
          ${Al(t(`planSaving`),`${e.fmt.n(X(n.expected_saving_eur),2)} €`,`var(--ok)`)}
          ${s?Al(t(`planCheapest`),u(s.min)):P}
          ${s?Al(t(`planMostExpensive`),u(s.max)):P}
          ${Al(t(`planKnownUntil`),l)}
        </div>
        ${o}
      </div>
    </div>
    ${a}`}var Nl=e=>{let t=Math.floor(e),n=Math.round((e-t)*60);return n?`${t}:${String(n).padStart(2,`0`)}`:String(t)};function Pl(e){let t=gl(e,I.autoStrategy).overrides;return t&&typeof t==`object`?t:{}}function Fl(e){let t=Pl(e),n=X(t.morning_cap_soc),r=X(t.morning_cap_until_h);if(n!==void 0&&r!==void 0)return e.i18n.t(`autoCap`,{soc:Math.round(n),hour:Nl(r)})}function Il(e){let{t}=e.i18n;if(!B(Y(e,I.ctrlAuto)))return{text:t(`autoOff`),tone:``};let n=gl(e,I.autoStrategy),r=typeof n.objective==`string`&&n.objective?e.i18n.option(n.objective):`–`;if(n.fallback===!0)return{text:t(`autoData`,{goal:r}),tone:`warn`};if(typeof n.last_run!=`string`)return{text:t(`autoPending`,{goal:r}),tone:``};let i=z(Y(e,I.autoSaving));return{text:t(`autoOn`,{goal:r,eur:i===void 0?`–`:`${i>0?`+`:``}${e.fmt.n(i,2)} €`}),tone:`on`}}function Ll(e){let{t}=e.i18n,n=e.autoOpen,r=Il(e),i=B(Y(e,I.ctrlAuto)),a=gl(e,I.autoStrategy),o=Y(e,I.selAuto),s=Array.isArray(o?.attributes.options)?o.attributes.options:[],c=z(Y(e,I.autoSaving)),l=typeof a.last_run==`string`,u=Fl(e),d=i?a.fallback===!0?M`<p class="sub">${t(`autoFallback`)}</p>`:l?M`<p class="sub">${u??t(`autoNone`)}</p>`:P:P;return M`<section class="card grip">
    <div class="auto-bar">
      <button type="button" class="grip-head ${n?`open`:``}" aria-expanded=${n} @click=${()=>e.onToggleAuto()}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        <span class="grip-title">${t(`autoTitle`)}</span>
        <span class="grip-state ${r.tone}">${r.text}</span>
      </button>
      <button
        class="switch ${i?`on`:``}"
        role="switch"
        aria-checked=${i}
        aria-label=${t(`autoTitle`)}
        ?disabled=${!Y(e,I.ctrlAuto)||e.pending.has(I.ctrlAuto)}
        @click=${()=>e.onToggle(I.ctrlAuto)}
      ></button>
    </div>
    ${n?M`<div class="grip-body">
          <div class="force">
            <div class="txt"><b>${t(`autoObjective`)}</b></div>
            <select
              aria-label=${t(`autoObjective`)}
              .value=${o?.state??``}
              ?disabled=${!o||o.state===`unavailable`||e.pending.has(I.selAuto)}
              @change=${t=>e.onSelect(I.selAuto,t.target.value)}
            >
              ${s.map(t=>M`<option value=${t} ?selected=${t===o?.state}>${e.i18n.option(t)}</option>`)}
            </select>
          </div>
          ${i&&a.fallback!==!0&&c!==void 0?M`<div class="row"><span>${t(`autoSaving`)}</span><b>${c>0?`+`:``}${e.fmt.n(c,2)} €</b></div>`:P}
          ${d}
          <p class="sub">${t(`autoLiveHint`)}</p>
        </div>`:P}
  </section>`}var Rl=e=>typeof e==`string`&&e?e:typeof e==`number`&&Number.isFinite(e)?String(e):typeof e==`boolean`?e?`1`:`0`:`–`;function zl(e){let{t}=e.i18n,n=gl(e,I.autoStrategy),r=(t,n,r,i)=>Q(t,`${e.fmt.n(X(n),r)} ${i}`);return M`
    ${Q(t(`autoTitle`),ml(Y(e,I.autoStrategy)))}
    ${Q(t(`autoObjective`),Rl(n.objective))}
    ${Q(t(`autoLastRun`),typeof n.last_run==`string`?e.fmt.dayTime(n.last_run):`–`)}
    ${Q(t(`autoFallback`),n.fallback===!0?t(`optYes`):n.fallback===!1?t(`optNo`):`–`)}
    ${typeof n.fallback_reason==`string`&&n.fallback_reason?Q(t(`autoReason`),n.fallback_reason):P}
    ${Q(t(`autoGrid`),Rl(n.grid_size))}
    ${Q(t(`autoSaving`),`${e.fmt.n(z(Y(e,I.autoSaving)),2)} €`)}
    ${r(t(`autoDeltaDraw`),n.delta_grid_draw_kwh,2,`kWh`)}
    ${r(t(`autoDeltaFeed`),n.delta_grid_feed_in_kwh,2,`kWh`)}
    ${r(t(`autoDeltaCurtail`),n.delta_curtailed_kwh,2,`kWh`)}
    ${r(t(`autoDeltaSelf`),X(n.delta_self_sufficiency)===void 0?void 0:X(n.delta_self_sufficiency)*100,1,`%`)}
    ${Fl(e)?M`<p class="sub">${Fl(e)}</p>`:n.fallback===!1&&typeof n.last_run==`string`?M`<p class="sub">${t(`autoNone`)}</p>`:P}`}function Bl(e){let{t,phase:n}=e.i18n,r=gl(e,I.explanation);if(typeof r.phase!=`string`)return M`<div class="card"><p class="empty">${t(`noDecision`)}</p></div>`;let i=z(Y(e,I.soc)),a=X(r.target_soc),o=typeof r.timestamp==`string`?e.fmt.time(r.timestamp):void 0,s=[a===void 0?null:t(`tagTargetSoc`,{v:Math.round(a)}),t(`tagTargetPower`,{v:e.fmt.w(X(r.target_charge_power)??z(Y(e,I.targetCharge))??0)}),r.battery_priority===!0?t(`tagBatteryPriority`):null,o?t(`tagSince`,{t:o}):null].filter(e=>!!e),c=(t,n)=>X(t)??z(Y(e,n)),l=c(r.charge_power_limit,I.chargeLimit),u=c(r.sent_charge_power_limit,I.sentChargeLimit),d=c(r.discharge_power_limit,I.dischargeLimit),f=c(r.sent_discharge_power_limit,I.sentDischargeLimit),p=Math.max(9e3,l??0,u??0,d??0,f??0),m=(n,r,i)=>M`
    <div class="limit-row">
      <div class="lbl"><span>${n}</span><span>${t(`limitTarget`,{a:r===void 0?t(`limitNone`):e.fmt.w(r),b:i===void 0?t(`limitNone`):e.fmt.w(i)})}</span></div>
      <div class="bar"><div class="soll" style="width:${(r??0)/p*100}%"></div><div class="sent" style="width:${(i??0)/p*100}%"></div></div>
    </div>`;return M`
    <div class="grid dec-top">
      <div class="card phase-hero">
        <h3>${t(`decisionPhase`)}</h3>
        <div class="phase-name">${n(r.phase)}</div>
        <div class="phase-reason">${typeof r.reason==`string`?r.reason:``}</div>
        <div class="chips">${s.map(e=>M`<span class="chip on"><i></i>${e}</span>`)}</div>
      </div>
      <div class="card">
        <h3>${t(`limitsTitle`)}</h3>
        <div class="sub lim-sub">${t(`limitsSub`)}</div>
        <div class="limits">
          ${m(t(`limitCharge`),l,u)}
          <div class="limit-row">
            <div class="lbl"><span>${t(`targetPower`)}</span><span>${e.fmt.w(X(r.target_charge_power)??z(Y(e,I.targetCharge))??0)}</span></div>
          </div>
          ${m(t(`limitDischarge`),d,f)}
          ${a===void 0?P:M`<div class="limit-row">
                <div class="lbl"><span>${t(`targetSoc`)}</span><span>${t(`limitSoc`,{a:Math.round(i??0),b:Math.round(a)})}</span></div>
                <div class="bar"><div class="soll" style="width:${a}%"></div><div class="sent" style="width:${i??0}%"></div></div>
              </div>`}
        </div>
      </div>
    </div>
    <div class="card tl-card">
      <div class="card-head">
        <h3>${t(`timelineTitle`)}</h3>
        <button class="toggle" ?disabled=${!e.timeline?.length} @click=${()=>e.timeline&&pl(`maestro-entscheidungen.csv`,yl(e))}>${t(`exportCsv`)}</button>
      </div>
      ${e.timeline?.length?M`<div class="timeline">
            ${e.timeline.map(t=>M`<div class="tl-item">
                <div class="tl-time">${e.fmt.dayTime(t.ts)}</div>
                <div class="tl-phase">${n(t.phase)}</div>
                <div class="tl-reason">${t.reason}</div>
              </div>`)}
          </div>`:M`<p class="empty">${e.timeline?t(`timelineEmpty`):t(`loading`)}</p>`}
    </div>
    <div class="grid stat-row dec-extra">
      <div class="card">
        <h3>${t(`reserveTitle`)}</h3>
        <div class="rows">
          ${Q(t(`reserveSeasonal`),Ol(e,I.seasonalReserve))}
          ${Q(t(`reserveAdaptive`),Ol(e,I.adaptiveReserve))}
          ${Q(t(`reserveHt`),Ol(e,I.htReserve))}
          ${Q(t(`reserveForward`),Ol(e,I.forwardTarget))}
          ${Q(t(`targetSoc`),Ol(e,I.targetSoc))}
        </div>
      </div>
      <div class="card">
        <h3>${t(`windowsTitle`)}</h3>
        <div class="rows">
          ${Q(t(`windowAstro`),ml(Y(e,I.astroStart)))}
          ${Q(t(`windowSeasonalEnd`),ml(Y(e,I.seasonalEnd)))}
          ${Q(t(`windowPvDelay`),ml(Y(e,I.pvDelayStart)))}
          ${Q(t(`windowTomorrow`),`${ml(Y(e,I.tomorrowStart))} – ${ml(Y(e,I.tomorrowEnd))}`)}
        </div>
      </div>
      <div class="card">
        <h3>${t(`autoTitle`)}</h3>
        <div class="rows">${zl(e)}</div>
      </div>
    </div>
    <section class="group">
      <button type="button" class="group-head ${e.debugOpen?`open`:``}" aria-expanded=${e.debugOpen} @click=${e.onToggleDebug}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        <span>${t(`debugTitle`)}</span>
      </button>
      ${e.debugOpen?M`<div class="card debug-card">
            <div class="force">
              <div class="txt"><b>${t(`debugSwitch`)}</b></div>
              <button
                class="switch ${bl(e)?`on`:``}"
                role="switch"
                aria-checked=${bl(e)}
                aria-label=${t(`debugSwitch`)}
                ?disabled=${!Y(e,I.debug)||e.pending.has(I.debug)}
                @click=${()=>e.onToggle(I.debug)}
              ></button>
            </div>
            <pre class="debug-log">${xl(e)}</pre>
          </div>`:P}
    </section>`}var Vl={off:`helpRuleOff`,force:`helpRuleForce`,emergency:`helpRuleEmergency`,feed:`helpRuleFeed`,reserve:`helpRuleReserve`,evcc:`helpRuleEvcc`,price:`helpRulePrice`,ht:`helpRuleHt`,hold:`helpRuleHold`,morning:`helpRuleMorning`,cap:`helpRuleCap`,astro:`helpRuleAstro`,hard:`helpRuleHard`,floor:`helpRuleFloor`,low:`helpRuleLow`,grid:`helpRuleGrid`,corridor:`helpRuleCorridor`,spread:`helpRuleSpread`,curtail:`helpRuleCurtail`,idle:`helpRuleIdle`},Hl=()=>to.map(e=>({id:e.id,title:e.label,body:Vl[e.id]??`helpRuleIdle`,actions:[{label:`helpOpenSettings`,action:{kind:`screen`,screen:`settings`,group:e.group}}]})),$=(e,t,n,r)=>({id:e,title:t,body:n,...r}),Ul=[{id:`start`,title:`helpChStart`,sections:[$(`start-lead`,`helpStartLead`,`helpStartLeadBody`,{links:[{id:`rules`,label:`helpSeeRules`}],actions:[{label:`helpOpenSetup`,action:{kind:`screen`,screen:`settings`,group:`setup`}}]}),$(`start-steps`,`helpStartSteps`,`helpStartStepsBody`)]},{id:`live`,title:`helpChLive`,sections:[$(`live-page`,`helpChLive`,`helpLiveBody`)]},{id:`forecast`,title:`helpChForecast`,sections:[$(`forecast-page`,`helpChForecast`,`helpForecastBody`)]},{id:`plan`,title:`helpChPlan`,sections:[$(`plan-page`,`helpChPlan`,`helpPlanBody`,{actions:[{label:`helpOpenSettings`,action:{kind:`screen`,screen:`settings`,group:`tariff`}}]})]},{id:`decision`,title:`helpChDecision`,sections:[$(`decision-page`,`helpChDecision`,`helpDecisionBody`,{links:[{id:`rules`,label:`helpSeeLadder`}]})]},{id:`plant`,title:`helpChPlant`,sections:[$(`plant-page`,`helpChPlant`,`helpPlantBody`)]},{id:`settings`,title:`helpChSettings`,sections:[$(`set-intro`,`helpSetIntro`,`helpSetIntroBody`),$(`set-setup`,`helpSetSetup`,`helpSetSetupBody`),$(`set-plant`,`helpSetPlant`,`helpSetPlantBody`),$(`set-safety`,`helpSetSafety`,`helpSetSafetyBody`),$(`set-tariff`,`helpSetTariff`,`helpSetTariffBody`),$(`set-pv`,`helpSetPv`,`helpSetPvBody`),$(`set-loads`,`helpSetLoads`,`helpSetLoadsBody`),$(`set-auto`,`helpSetAuto`,`helpSetAutoBody`),$(`set-system`,`helpSetSystem`,`helpSetSystemBody`),$(`set-look`,`helpSetLook`,`helpSetLookBody`),$(`set-classic`,`helpSetClassic`,`helpSetClassicBody`),$(`set-sizing`,`helpSetSizing`,`helpSetSizingBody`)]},{id:`controls`,title:`helpChControls`,sections:[$(`controls-page`,`helpChControls`,`helpControlsBody`,{actions:[{label:`helpOpenControls`,action:{kind:`controls`}}]})]},{id:`rules`,title:`helpChRules`,sections:[$(`rules-how`,`helpRulesHow`,`helpRulesHowBody`,{ladder:!0}),...Hl(),$(`why-grid`,`helpWhyGrid`,`helpWhyGridBody`)]},{id:`concepts`,title:`helpChConcepts`,sections:[$(`concept-plan`,`helpConceptPlan`,`helpConceptPlanBody`),$(`concept-pv`,`helpConceptPv`,`helpConceptPvBody`),$(`concept-low`,`helpConceptLow`,`helpConceptLowBody`),$(`concept-feed`,`helpConceptFeed`,`helpConceptFeedBody`),$(`concept-loads`,`helpConceptLoads`,`helpConceptLoadsBody`)]},{id:`trouble`,title:`helpChTrouble`,sections:[$(`trouble-off`,`helpTroubleOff`,`helpTroubleOffBody`,{links:[{id:`decision`,label:`helpChDecision`}]}),$(`trouble-entities`,`helpTroubleEntities`,`helpTroubleEntitiesBody`),$(`trouble-alerts`,`helpTroubleAlerts`,`helpTroubleAlertsBody`),$(`trouble-history`,`helpTroubleHistory`,`helpTroubleHistoryBody`),$(`faq-nogrid`,`helpFaqNoGrid`,`helpFaqNoGridBody`,{links:[{id:`why-grid`,label:`helpWhyGrid`}]}),$(`faq-swing`,`helpFaqSwing`,`helpFaqSwingBody`),$(`faq-ht`,`helpFaqHt`,`helpFaqHtBody`),$(`faq-pause`,`helpFaqPause`,`helpFaqPauseBody`),$(`faq-min`,`helpFaqMin`,`helpFaqMinBody`),$(`faq-restart`,`helpFaqRestart`,`helpFaqRestartBody`),$(`faq-tibber`,`helpFaqTibber`,`helpFaqTibberBody`),$(`faq-plan`,`helpFaqPlan`,`helpFaqPlanBody`),$(`faq-plan-hold`,`helpFaqPlanHold`,`helpFaqPlanHoldBody`,{links:[{id:`faq-plan`,label:`helpFaqPlan`}]}),$(`faq-old`,`helpFaqOld`,`helpFaqOldBody`)]},{id:`glossary`,title:`helpChGlossary`,sections:[$(`glossary-page`,`helpChGlossary`,`helpGlossaryBody`)]}],Wl=new Set(Ul.map(e=>e.id)),Gl=new Set(Ul.flatMap(e=>e.sections.map(e=>e.id)));function Kl(e,t){return e===`settings`?t&&Gl.has(`set-${t}`)?`set-${t}`:`ch-settings`:Wl.has(e)?`ch-${e}`:`ch-start`}function ql(e,t){let n=e.trim().toLowerCase();if(!n)return;let r=new Set;for(let e of Ul){let i=t(e.title).toLowerCase().includes(n);for(let a of e.sections){let e=`${t(a.title)}\n${t(a.body)}`.toLowerCase();(i||e.includes(n))&&r.add(a.id)}}return r}var Jl=new Map(to.map(e=>[e.id,e])),Yl=e=>{if(e.key!==`Tab`)return;let t=e.currentTarget;if(!(t instanceof HTMLElement))return;let n=[...t.querySelectorAll(`button, input, summary`)].filter(e=>!e.hidden&&e.offsetParent!==null),r=n[0],i=n[n.length-1];if(!r||!i)return;let a=t.getRootNode().activeElement;e.shiftKey&&a===r?(e.preventDefault(),i.focus()):!e.shiftKey&&a===i&&(e.preventDefault(),r.focus())},Xl=(e,t)=>{let n=t.trim(),r=e=>{if(!n)return e;let t=e.toLowerCase().indexOf(n.toLowerCase());return t<0?e:M`${e.slice(0,t)}<mark>${e.slice(t,t+n.length)}</mark>${e.slice(t+n.length)}`};return M`${e.split(`
`).map(e=>M`<p>${r(e)}</p>`)}`},Zl=(e,t)=>{let{t:n}=e.i18n;return Ul.map(r=>{let i=r.sections.filter(e=>!t||t.has(e.id));if(!i.length)return P;let a=r.id===e.current||i.some(t=>t.id===e.current),o=i.filter(e=>e.title!==r.title);return M`<div class="help-toc-ch">
      <button type="button" class=${a?`on`:``} aria-current=${a?`true`:`false`} @click=${()=>e.onJump(r.id)}>${n(r.title)}</button>
      ${o.map(t=>M`<button
        type="button"
        class=${e.current===t.id?`on`:``}
        aria-current=${e.current===t.id?`true`:`false`}
        @click=${()=>e.onJump(t.id)}
      >${n(t.title)}</button>`)}
    </div>`})},Ql=e=>{let{t}=e.i18n,n=io(e.phase,e.planActive,e.lowYield),r=n?Jl.get(n):void 0;return M`<div class="help-live">
    <p class="help-now">${r?t(`helpActive`,{rule:t(r.label)}):t(`helpNoPhase`)}</p>
    ${no.map(r=>M`<div class="ladder-band">
      <h4>${t(r.label)}</h4>
      <div class="ladder-steps">
        ${r.steps.map(r=>{let i=Jl.get(r);return i?M`<button type="button" class="ladder-step ${r===n?`on`:``}" @click=${()=>e.onJump(r)}>${t(i.label)}</button>`:P})}
      </div>
    </div>`)}
  </div>`},$l=e=>{let{t}=e.i18n,n=ql(e.query,t),r=Ul.flatMap(e=>e.sections).filter(e=>!n||n.has(e.id));return M`<div class="scrim open help-scrim" @click=${e.onClose}></div>
    <aside class="help" role="dialog" aria-modal="true" aria-labelledby="help-title" @keydown=${Yl}>
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
        <nav class="help-toc" aria-label=${t(`helpToc`)}>${Zl(e,n)}</nav>
      </details>
      <div class="help-body">
        <nav class="help-toc" aria-label=${t(`helpToc`)}>${Zl(e,n)}</nav>
        <div class="help-doc">
          ${r.length?Ul.map(r=>{let i=r.sections.filter(e=>!n||n.has(e.id));return i.length?M`<article id=${`help-ch-${r.id}`} data-chapter=${r.id}>
                  <h3>${t(r.title)}</h3>
                  ${i.map(n=>M`<section id=${`help-${n.id}`} data-help=${n.id}>
                    ${n.title===r.title?P:M`<h4>${t(n.title)}</h4>`}
                    ${Xl(t(n.body),e.query)}
                    ${n.ladder?Ql(e):P}
                    ${n.links?.map(n=>M`<button type="button" class="help-link" @click=${()=>e.onJump(n.id)}>${t(n.label)}</button>`)}
                    ${n.actions?.map(n=>M`<button type="button" class="btn help-action" @click=${()=>e.onAction(n.action)}>${t(n.label)}</button>`)}
                  </section>`)}
                </article>`:P}):M`<p class="hint">${t(`helpEmpty`)}</p>`}
          <button type="button" class="btn help-top" @click=${e.onTop}>${t(`helpTop`)}</button>
        </div>
      </div>
    </aside>`},eu,tu={pv:{entity:`pv`,color:`#fbbf24`,label:`nodePv`},grid:{entity:`grid`,color:`#f87171`,label:`nodeImport`},house:{entity:`house`,color:`#a78bfa`,label:`nodeHouse`},bat:{entity:`battery`,color:`#22d3ee`,label:`nodeBatCharge`}},nu=new URLSearchParams(location.search).has(`debug`),ru=[{id:`live`,label:`navLive`,sub:`subLive`,icon:`<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>`},{id:`forecast`,label:`navForecast`,sub:`subForecast`,icon:`<path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/>`},{id:`plan`,label:`navPlan`,sub:`subPlan`,icon:`<rect x="3" y="10" width="4" height="11" rx="1"/><rect x="10" y="5" width="4" height="16" rx="1"/><rect x="17" y="13" width="4" height="8" rx="1"/>`},{id:`decision`,label:`navDecision`,sub:`subDecision`,icon:`<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>`},{id:`plant`,label:`navPlant`,sub:`subPlant`,icon:`<path d="M4 21V10l8-7 8 7v11"/><path d="M9 21v-6h6v6"/>`},{id:`settings`,label:`navSettings`,sub:`subSettings`,icon:`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`}],iu=`<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>`,au=`<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 1 1 4.2 2.7c-.8.4-1.3 1-1.3 1.8V14"/><path d="M12 17h.01"/>`,ou=`(max-width: 960px)`,su=3e5,cu=6e4,lu=6,uu=3e4,du=6,fu=(e,t=``)=>M`<svg class=${t} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${e}></svg>`,pu=()=>{let[e,t]=location.hash.slice(1).split(`/`),n=ru.some(t=>t.id===e)?e:`live`;return{screen:n,settingsGroup:n===`settings`?Jo(t):void 0,plantGroup:n===`plant`&&lc(t)?t:void 0}},mu=pu(),hu=class extends Me{constructor(...e){super(...e),this._narrow=!1,this._screen=mu.screen,this._settingsGroup=mu.settingsGroup,this._plantGroup=mu.plantGroup,this._theme=fa(),this._flowStyle=sa(),this._batteryStyle=na(),this._bannerHidden=Zi(),this._alertDismissed=Ji(),this._consumerPlaces=xr(),this._arrangeConsumers=!1,this._sheet=!1,this._pauseOpen=!1,this._help=!1,this._helpQuery=``,this._helpCurrent=``,this._helpListening=!1,this._mobile=window.matchMedia(ou).matches,this._mq=window.matchMedia(ou),this._range=24,this._showIst=!0,this._loadedAt=new Map,this._pending=new Set,this._flowRaf=0,this._motion=!0,this._histState=`loading`,this._stats={hassUpdates:0,renders:0},this._resolvedAt=0,this._consumers=bt(),this._collapsed=yi(),this._controlsOpen=xi(),this._autoOpen=Ci(),this._expert=ks(),this._planTuneOpen=Ds(),this._pvOpen=Ms(),this._setupAck=za(),this._period=`today`,this._pulseRange=`week`,this._pulseState=`idle`,this._debugOpen=!1,this._picking=!1,this._pickQuery=``,this._focusConsumers=!1,this._storedOptions={},this._optionsLoaded=!1,this._optionsReady=!1,this._optionQuery={},this._slots=[],this._slotsDirty=!1,this._phasePoints={},this._phaseHistory=`idle`,this._phaseTicket=0,this._watchSig=``,this._onMq=e=>{this._mobile=e.matches,this.requestUpdate()},this._onPop=()=>{let e=pu();this._screen=e.screen,this._settingsGroup=e.settingsGroup,this._plantGroup=e.plantGroup,this.requestUpdate(),this._loadPhaseHistory()},this._animateFlows=e=>{ti(this.renderRoot.querySelectorAll(`.electron`),e),this._flowRaf=requestAnimationFrame(this._animateFlows)},this._onKey=e=>{e.key===`Escape`?this._pauseOpen?(this._pauseOpen=!1,this.requestUpdate()):this._help?this._closeHelp():this._hist?this._closeHistory():this._sheet&&this._setSheet(!1):e.key!==`?`||e.metaKey||e.ctrlKey||e.altKey||this._help||e.composedPath().some(e=>e instanceof HTMLElement&&(e.tagName===`INPUT`||e.tagName===`TEXTAREA`||e.tagName===`SELECT`||e.isContentEditable))||(e.preventDefault(),this._openHelp())},this._onHelpScroll=()=>{let e=this.renderRoot.querySelector(`.help-doc`);if(!(e instanceof HTMLElement))return;let t=e.getBoundingClientRect().top+12,n=``;for(let r of e.querySelectorAll(`[data-help]`))r.getBoundingClientRect().top<=t&&(n=r.dataset.help??n);n&&n!==this._helpCurrent&&(this._helpCurrent=n,this.requestUpdate())},this._onChartError=e=>{this._chartError=e.detail,this.requestUpdate()},this._scrollKey=``}set hass(e){this._stats.hassUpdates++;let t=this._hass;this._hass=e,(!t||this._missingKeys(e).length)&&this._resolveEntities();let n=this._watchSignature(e);!t||t.language!==e.language||n!==this._watchSig?(this._watchSig=n,this.requestUpdate()):nu&&this.requestUpdate()}_watchSignature(e){let t=``;for(let n of it()){let r=e.states[n],i=r?r.last_updated??r.last_changed:``;t+=`${n}:${r?.state??``}:${i};`}let n=e.states[I.sizingScenario]?.attributes;return n&&(t+=JSON.stringify(n.slider_battery_kwh)+JSON.stringify(n.slider_pv_kwp)+JSON.stringify(n.scenario_monthly_avoided_kwh)),t}get hass(){return this._hass}set narrow(e){e!==this._narrow&&(this._narrow=e,this.requestUpdate())}get narrow(){return this._narrow}connectedCallback(){super.connectedCallback(),er(this._theme),this._mq.addEventListener(`change`,this._onMq),this._mobile=this._mq.matches,this._timer=window.setInterval(()=>void this._ensureHistory(),cu),this.addEventListener(`chart-error`,this._onChartError),window.addEventListener(`keydown`,this._onKey),window.addEventListener(`popstate`,this._onPop);let e=location.hash.slice(1).split(`/`)[1];this._screen===`settings`&&e&&this._settingsGroup&&e!==this._settingsGroup&&history.replaceState(null,``,`#settings/${this._settingsGroup}`),this._motion=!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,this._motion&&(this._flowRaf=requestAnimationFrame(this._animateFlows))}disconnectedCallback(){super.disconnectedCallback(),this._mq.removeEventListener(`change`,this._onMq),window.clearInterval(this._timer),window.clearInterval(this._pauseClock),window.clearTimeout(this._overflowTimer),cancelAnimationFrame(this._flowRaf),this.removeEventListener(`chart-error`,this._onChartError),window.removeEventListener(`keydown`,this._onKey),this._unbindHelpScroll(),window.removeEventListener(`popstate`,this._onPop)}_openHelp(){this._help=!0,this._helpAnchor=Kl(this._screen,this._settingsGroup),this._helpCurrent=this._helpAnchor.startsWith(`ch-`)?this._helpAnchor.slice(3):this._helpAnchor,this.requestUpdate()}_closeHelp(){this._help=!1,this._helpQuery=``,this._helpAnchor=void 0,this._unbindHelpScroll(),this.requestUpdate()}_jumpHelp(e){if(this._helpCurrent=e,this._helpQuery){this._helpQuery=``,this._helpAnchor=e,this.requestUpdate();return}let t=this.renderRoot.querySelector(`.help-fold`);t instanceof HTMLDetailsElement&&(t.open=!1),this._scrollHelp(e)}_scrollHelp(e){let t=()=>{let t=this.renderRoot.querySelector(`.help-doc`);if(!(t instanceof HTMLElement))return;let n=e.startsWith(`ch-`)?e.slice(3):e,r=t.querySelector(`[data-help="${n}"]`)??t.querySelector(`[data-chapter="${n}"]`);if(!(r instanceof HTMLElement))return;let i=r.getBoundingClientRect().top-t.getBoundingClientRect().top+t.scrollTop;t.scrollTop=Math.max(0,i-4)};t(),requestAnimationFrame(t)}_helpAction(e){this._closeHelp(),e.kind===`controls`?this._setSheet(!0):e.group&&e.screen===`settings`?this._openSettingsGroup(e.group):e.group&&e.screen===`plant`?this._openPlantRoom(e.group):this._go(e.screen)}_bindHelpScroll(){let e=this.renderRoot.querySelector(`.help-doc`);e instanceof HTMLElement&&!this._helpListening&&(e.addEventListener(`scroll`,this._onHelpScroll,{passive:!0}),this._helpListening=!0)}_unbindHelpScroll(){this.renderRoot.querySelector(`.help-doc`)?.removeEventListener(`scroll`,this._onHelpScroll),this._helpListening=!1}_closeHistory(){this._hist=void 0,this._histPoints=void 0,this.requestUpdate()}_openFlow(e){let t=this._hass;if(!t)return;let n=Li(t.language),r=tu[e],i=this._consumers.find(t=>t.id===e),a=r?I[r.entity]:i?.entityId;if(!a)return;let o=t.states[a],s=z(o),c=e===`grid`&&s!==void 0&&s>=0,l=e===`grid`?n.t(c?`nodeFeed`:`nodeImport`):r?n.t(r.label):i?.name??a,u=c?`#34d399`:r?.color??`#38bdf8`,d=o?.attributes.unit_of_measurement;this._hist={name:l,color:u,entityId:a},this._histPoints=void 0,this._histState=`loading`,this.requestUpdate(),Jn(t,a,d===`kW`?1e3:1).then(e=>{this._hist?.entityId===a&&(this._histPoints=e,this._histState=e.length?`ready`:`empty`,this.requestUpdate())}).catch(()=>{this._hist?.entityId===a&&(this._histState=`error`,this.requestUpdate())})}async _resolveEntities(){let e=this._hass;if(!(!e||Date.now()-this._resolvedAt<uu)){this._resolvedAt=Date.now();try{let t=await e.callWS({type:`e3dc_maestro/panel_entities`}),n=JSON.stringify(I);Xe(t),Qe(t);let r=JSON.stringify(L.entities);$e(t),JSON.stringify(L.entities)!==r&&(this._phasePoints={},this._loadedAt.delete(`plant-grid`),this._loadedAt.delete(`plant-pv`)),this._entityMap=t,JSON.stringify(I)!==n&&this._loadedAt.clear(),this.requestUpdate(),this._ensureHistory()}catch{}}}_missingKeys(e){return Object.keys(Je).filter(t=>!e.states[I[t]])}_entityNotice(e,t){let n=this._entityMap;if(n&&n.entry_id===null)return M`<p class="err">${t(`notSetUp`)}</p>`;let r=this._missingKeys(e);if(!r.length)return P;let i=new Set(n?.disabled??[]),a=r.slice(0,du).map(e=>i.has(e)?`${I[e]} (${t(`entityDisabled`)})`:I[e]),o=r.length>du?` +${r.length-du}`:``;return M`<p class="err">${t(`entitiesMissing`,{list:a.join(`, `)+o})}</p>`}_liveFacts(e,t,n){if(this._screen!==`live`)return P;let r=e=>e===void 0?`–`:`${t.n(e)} kWh`,i=t=>{let n=this._storedOptions[t];return typeof n==`string`?z(e.states[n]):void 0},a=e.states[I.p10],o=a?.attributes.p50_remaining_kwh,s=i(`pv_forecast_sensor`)??(typeof o==`number`?o:z(a)),c=i(`pv_forecast_sensor_day2`);return M`<p class="facts">
      <span>${n(`factRest`)} <b>${r(s)}</b></span>
      <span>${n(`factTomorrow`)} <b>${r(z(e.states[I.pvTomorrow]))}</b></span>
      ${c===void 0?P:M`<span>${n(`factDayAfter`)} <b>${r(c)}</b></span>`}
    </p>`}_syncAlertDismissed(e){let t=Gi(this._alertDismissed,e);t.size===this._alertDismissed.size&&[...t].every(e=>this._alertDismissed.has(e))||(this._alertDismissed=t,Yi(t))}_dismissAlerts(e){let t=new Set(e);this._alertDismissed=t,Yi(t),this.requestUpdate()}_setBannerHidden(e){this._bannerHidden=e,Qi(e),this.requestUpdate()}_alerts(e,t){let n=Wi(e);return Ki(n,this._alertDismissed,this._bannerHidden)?M`<div class="banner ${n.includes(`unreachable`)?`bad`:``}" role="status">
      <div class="banner-notes">${n.map(e=>M`<span>${t(Ui(e))}</span>`)}</div>
      <button type="button" class="banner-ack" @click=${()=>this._dismissAlerts(n)}>${t(`alertDismiss`)}</button>
    </div>`:P}async _ensureHistory(){let e=this._hass;if(!e||document.hidden)return;let t=e=>Date.now()-(this._loadedAt.get(e)??0)>su,n=async(e,n)=>{if(t(e)){this._loadedAt.set(e,Date.now()-su+cu);try{await n(),this._loadedAt.set(e,Date.now()),this.requestUpdate()}catch{}}};if(this._screen===`live`&&await n(`sparks`,async()=>void(this._sparks=await Wn(e))),this._screen===`live`&&this._period!==`today`){let t=this._period;await n(`period-${t}`,async()=>void(this._periodSums=await Hn(e,t)))}if(this._screen===`live`&&this._period===`today`&&this._balanceDay&&!jn(this._balanceDay)){let t=this._balanceDay;await n(`day-${t}`,async()=>void(this._daySums=await Un(e,t)))}if(this._screen===`live`&&!this._collapsed.has(`balancePulse`)){let n=this._pulseRange,r=`pulse-${n}`;if(t(r)){this._pulseDays||(this._pulseState=`loading`,this.requestUpdate()),this._loadedAt.set(r,Date.now()-su+cu);try{this._pulseDays=await Vn(e,n),this._pulseState=`ready`,this._loadedAt.set(r,Date.now()),this.requestUpdate()}catch{this._pulseState=`error`,this.requestUpdate()}}}this._screen===`forecast`&&this._showIst&&await n(`ist`,async()=>void(this._ist=await Xn(e,lu))),this._screen===`decision`&&await n(`timeline`,async()=>void(this._timeline=await Zn(e))),await this._loadPhaseHistory()}async _loadPhaseHistory(){let e=this._hass,t=this._plantGroup;if(!e||document.hidden||this._screen!==`plant`||t!==`grid`&&t!==`pv`)return;let n=(t===`grid`?[`houseL1`,`houseL2`,`houseL3`,`gridL1`,`gridL2`,`gridL3`]:[`pviL1`,`pviL2`,`pviL3`]).map(e=>L.entities[e]).filter(e=>!!e);if(!n.length)return;let r=`plant-${t}`;if(n.every(e=>e in this._phasePoints)&&Date.now()-(this._loadedAt.get(r)??0)<=su){this._phaseHistory!==`ready`&&(this._phaseHistory=`ready`,this.requestUpdate());return}let i=++this._phaseTicket;n.every(e=>e in this._phasePoints)||(this._phaseHistory=`loading`,this.requestUpdate());try{let t=await Yn(e,n);if(this._phasePoints={...this._phasePoints,...Object.fromEntries(n.map(e=>[e,t[e]??[]]))},this._loadedAt.set(r,Date.now()),i!==this._phaseTicket)return;this._phaseHistory=`ready`}catch{if(i!==this._phaseTicket)return;this._loadedAt.set(r,Date.now()-su+cu),this._phaseHistory=`error`}this.requestUpdate()}_setTheme(e){this._theme=e,er(e),pa(e),this.requestUpdate()}_setFlowStyle(e){this._flowStyle=e,ca(e),this.requestUpdate()}_setBatteryStyle(e){this._batteryStyle=e,ra(e),this.requestUpdate()}_placeConsumer(e,t){this._consumerPlaces={...this._consumerPlaces,[e]:t},Sr(this._consumerPlaces),this.requestUpdate()}_resetConsumerPlaces(){this._consumerPlaces={},Cr(),this.requestUpdate()}_go(e){this._screen=e,this._settingsGroup=void 0,this._plantGroup=void 0,this._zoomKey=void 0,this._error=void 0,history.replaceState(null,``,`#${e}`),this.requestUpdate(),this._ensureHistory()}_openSettingsGroup(e){this._screen=`settings`,this._settingsGroup=e,e===Vo.id&&(this._classic=void 0),history.pushState({maestroGroup:!0},``,`#settings/${e}`),this.requestUpdate()}_openPlantRoom(e){this._screen=`plant`,this._plantGroup=e,history.pushState({maestroGroup:!0},``,`#plant/${e}`),this.requestUpdate(),this._loadPhaseHistory()}_closeArea(){history.state?.maestroGroup?history.back():(this._screen===`plant`?(this._plantGroup=void 0,history.replaceState(null,``,`#plant`)):(this._settingsGroup=void 0,history.replaceState(null,``,`#settings`)),this.requestUpdate())}_setSheet(e){this._sheet=e,e||(this._error=void 0,this._picking=!1),this.requestUpdate()}_openConsumers(){this._sheet=!0,this._focusConsumers=!0,this.requestUpdate()}_heldOverflow(e){let t=Date.now(),n=Tt(e,this._overflowSince,t);if(this._overflowSince=n.since,window.clearTimeout(this._overflowTimer),this._overflowTimer=void 0,n.since!==void 0&&!n.show){let e=Math.max(0,ct-(t-n.since));this._overflowTimer=window.setTimeout(()=>this.requestUpdate(),e)}return n.show}_setConsumers(e,t=!1){this._consumers=e.slice(0,6),xt(this._consumers),this._setOption(`flow_consumers`,this._consumers,!0),t&&(this._picking=!1,this._pickQuery=``),this.requestUpdate()}async _call(e,t,n,r){let i=this._hass;if(i){this._pending.add(e),this._error=void 0,this.requestUpdate();try{await i.callService(t,n,r)}catch(e){let t=e instanceof Error?e.message:typeof e==`object`&&e&&`message`in e?String(e.message):String(e);this._error=Li(i.language).t(`callFailed`,{err:t})}finally{this._pending.delete(e),this.requestUpdate()}}}_openPause(){this._pauseOpen=!0,this.requestUpdate()}_resumeRegulation(){this._pauseOpen=!1,this._call(I.ctrlActive,`switch`,`turn_on`,{entity_id:I.ctrlActive})}_toggle(e){let t=B(this._hass?.states[e]);e===I.ctrlActive&&t?this._openPause():this._call(e,`switch`,t?`turn_off`:`turn_on`,{entity_id:e})}async _pause(e){let t=this._hass;if(this._pauseOpen=!1,t){this._pending.add(I.ctrlActive),this._error=void 0,this.requestUpdate();try{await t.callWS({type:`e3dc_maestro/pause`,hours:e})}catch(e){let n=e instanceof Error?e.message:typeof e==`object`&&e&&`message`in e?String(e.message):String(e);this._error=Li(t.language).t(`callFailed`,{err:n})}finally{this._pending.delete(I.ctrlActive),this.requestUpdate()}}}_syncPauseClock(e){let t=e!==void 0&&e*1e3>Date.now();t&&this._pauseClock===void 0?this._pauseClock=window.setInterval(()=>this.requestUpdate(),3e4):!t&&this._pauseClock!==void 0&&(window.clearInterval(this._pauseClock),this._pauseClock=void 0)}_press(e){this._call(e,`button`,`press`,{entity_id:e})}_select(e,t){this._call(e,`select`,`select_option`,{entity_id:e,option:t})}_commitPower(e){this._commitNumber(I.forceDischargePower,e).then(()=>{this._powerDraft=void 0,this.requestUpdate()})}_commitReserve(e){this._commitNumber(I.fixedReserveSoc,e).then(()=>{this._reserveDraft=void 0,this.requestUpdate()})}_commitNumber(e,t){return this._call(e,`number`,`set_value`,{entity_id:e,value:t})}async _checkClassic(){let e=this._hass;e&&(this._classic={...this._classic,state:`checking`},this.requestUpdate(),this._classic=await Sa(e),this.requestUpdate())}async _createClassic(){let e=this._hass,t=this._classic;if(e&&t){this._classic={...t,state:`creating`},this.requestUpdate();try{await Ca(e,t.state),await this._checkClassic()}catch(e){this._classic={...t,state:`error`,error:ga(e)},this.requestUpdate()}}}_openClassic(){history.pushState(null,``,`/e3dc-maestro`),window.dispatchEvent(new CustomEvent(`location-changed`,{detail:{replace:!1}}))}_toggleMenu(){this.dispatchEvent(new Event(`hass-toggle-menu`,{bubbles:!0,composed:!0}))}_fault(e){if(e instanceof Error)return e.message;if(e&&typeof e==`object`&&`message`in e){let t=e.message;if(typeof t==`string`&&t)return t}return String(e)}async _loadOptions(){let e=this._hass;if(e&&!this._optionsLoaded){this._optionsLoaded=!0;try{let t=await e.callWS({type:`e3dc_maestro/panel_options`});this._storedOptions=t.options??{},this._optionsReady=!0,this._slotsDirty||(this._slots=Ya(this._storedOptions.tariff_slots));let n=yt(this._storedOptions.flow_consumers,this._consumers);this._consumers=n.list,xt(n.list),n.publishLocal&&this._setOption(`flow_consumers`,n.list,!0)}catch(e){this._optionError=this._fault(e)}this.requestUpdate()}}async _setOption(e,t,n=!1){let r=this._hass;if(r){this._pending.add(e),this._optionError=void 0,this.requestUpdate();try{let i=await r.callWS({type:`e3dc_maestro/panel_options/set`,values:{[e]:t}}),a={...this._storedOptions};t===null?delete a[e]:a[e]=t,this._storedOptions=a,n||(this._optionNotice=i.reloaded?`reload`:`saved`),e===`tariff_slots`&&(this._slotsDirty=!1),i.reloaded&&(this._resolvedAt=0,this._resolveEntities())}catch(e){this._optionError=this._fault(e)}finally{this._pending.delete(e),this.requestUpdate()}}}render(){this._stats.renders++;let e=this._hass;if(!e)return M``;let t=Li(e.language),n=fi(e.language),{t:r}=t,i={hass:e,i18n:t,isAdmin:e.user?.is_admin===!0,options:this._storedOptions,ready:this._optionsReady,error:this._optionError,notice:this._optionNotice,query:this._optionQuery,pending:this._pending,slots:this._slots,onQuery:(e,t)=>{this._optionQuery={...this._optionQuery,[e]:t},this.requestUpdate()},onChange:(e,t)=>void this._setOption(e,t),onSlots:e=>{this._slots=e,this._slotsDirty=!0,this.requestUpdate()},onSaveSlots:()=>void this._setOption(`tariff_slots`,this._slots),onRunSizing:()=>this._press(I.btnSizing)},a={hass:e,i18n:t,fmt:n,mobile:this._mobile,sparks:this._sparks,ist:this._ist,timeline:this._timeline,range:this._range,showIst:this._showIst,onRange:e=>{this._range=e,this.requestUpdate()},onToggleIst:()=>{this._showIst=!this._showIst,this.requestUpdate(),this._ensureHistory()},consumers:St(this._consumers,e),consumerOverflow:this._heldOverflow(wt(z(e.states[I.house]),St(this._consumers,e))),onEditConsumers:()=>this._openConsumers(),arrangeConsumers:this._arrangeConsumers,onToggleArrange:()=>{this._arrangeConsumers=!this._arrangeConsumers,this.requestUpdate()},onResetConsumerPlaces:()=>this._resetConsumerPlaces(),consumerPlaces:this._consumerPlaces,onPlaceConsumer:(e,t)=>this._placeConsumer(e,t),onFlowNode:e=>this._openFlow(e),motion:this._motion,collapsed:this._collapsed,onToggleGroup:e=>{let t=new Set(this._collapsed);t.delete(e)||t.add(e),this._collapsed=t,Ei(t),this.requestUpdate(),e===`balancePulse`&&!t.has(`balancePulse`)&&this._ensureHistory()},controlsOpen:this._controlsOpen,onToggleControls:()=>{this._controlsOpen=!this._controlsOpen,Ti(this._controlsOpen),this.requestUpdate()},autoOpen:this._autoOpen,onToggleAuto:()=>{this._autoOpen=!this._autoOpen,wi(this._autoOpen),this.requestUpdate()},period:this._period,periodSums:this._periodSums,onPeriod:e=>{this._period=e,this.requestUpdate(),this._ensureHistory()},balanceDay:this._balanceDay??kn(),daySums:this._daySums,onBalanceDay:e=>{let t=jn(e)?void 0:e;t!==this._balanceDay&&(this._balanceDay=t,this._daySums=void 0,t&&this._loadedAt.delete(`day-${t}`),this.requestUpdate(),this._ensureHistory())},pulseRange:this._pulseRange,onPulseRange:e=>{e!==this._pulseRange&&(this._pulseRange=e,this._pulseDays=void 0,this._pulseState=`idle`,this._loadedAt.delete(`pulse-${e}`),this.requestUpdate(),this._ensureHistory())},pulseDays:this._pulseDays,pulseState:this._pulseState,pending:this._pending,groupId:this._screen===`plant`?this._plantGroup:this._settingsGroup,onOpenGroup:e=>this._openSettingsGroup(e),setupAck:this._setupAck,onAckSetup:()=>{this._setupAck=!0,Ba(),this.requestUpdate()},onOpenRoom:e=>this._openPlantRoom(e),onOpenClassic:()=>this._openClassic(),classic:this._classic,isAdmin:e.user?.is_admin===!0,onCreateClassic:()=>void this._createClassic(),onCheckClassic:()=>void this._checkClassic(),onToggle:e=>this._toggle(e),onPress:e=>this._press(e),onSelect:(e,t)=>this._select(e,t),onNumber:(e,t)=>void this._commitNumber(e,t),forcePowerDraft:this._powerDraft,onPowerDraft:e=>{this._powerDraft=e,this.requestUpdate()},onPowerCommit:e=>this._commitPower(e),reserveDraft:this._reserveDraft,onReserveDraft:e=>{this._reserveDraft=e,this.requestUpdate()},onReserveCommit:e=>this._commitReserve(e),debugOpen:this._debugOpen,onToggleDebug:()=>{this._debugOpen=!this._debugOpen,this.requestUpdate()},theme:this._theme,onTheme:e=>this._setTheme(e),flowStyle:this._flowStyle,onFlowStyle:e=>this._setFlowStyle(e),alertBannerHidden:this._bannerHidden,onAlertBannerHidden:e=>this._setBannerHidden(e),batteryStyle:this._batteryStyle,onBatteryStyle:e=>this._setBatteryStyle(e),phasePoints:this._phasePoints,phaseHistory:this._phaseHistory,options:i,expert:this._expert,onExpert:e=>{this._expert=e,As(e),this.requestUpdate()},planTuneOpen:this._planTuneOpen,onTogglePlanTune:()=>{this._planTuneOpen=!this._planTuneOpen,Os(this._planTuneOpen),this.requestUpdate()},pvOpen:this._pvOpen,onTogglePv:e=>{let t=new Set(this._pvOpen);t.delete(e)||t.add(e),this._pvOpen=t,Ns(t),this.requestUpdate()}},o=ru.find(e=>e.id===this._screen)??ru[0],s=this._screen===`settings`?Yo(this._settingsGroup):void 0,c=this._screen===`plant`?uc(this._plantGroup):void 0,l=s??c,u=B(e.states[I.ctrlActive]),d=Ht(e.states[I.ctrlActive]);this._syncPauseClock(d);let f=Wt(r,e.states[I.ctrlActive]),p=e.states[I.phase]?.state,m={live:El,forecast:kl,plan:Ml,decision:Bl,plant:gc,settings:Hs}[o.id](a);return M`
      <div class="app">
        <nav class="rail" aria-label="Maestro">
          <div class="logo">
            <img src=${Nr} alt="Maestro" />
          </div>
          ${ru.map(e=>M`<button
      class="nav-btn ${e.id===o.id?`active`:``}"
      aria-current=${e.id===o.id?`page`:`false`}
      @click=${()=>this._go(e.id)}
    >
      ${fu(e.icon)}${r(e.label)}
    </button>`)}
          <div class="spacer"></div>
          <button class="nav-btn" @click=${()=>this._setSheet(!0)}>${fu(iu)}${r(`navControls`)}</button>
          <button class="nav-btn ${this._help?`active`:``}" aria-expanded=${this._help?`true`:`false`} @click=${()=>this._help?this._closeHelp():this._openHelp()}>${fu(au)}${r(`navHelp`)}</button>
        </nav>
        <main>
          <header class="topbar">
            ${this._narrow?M`<button class="menu" aria-label=${r(`menu`)} @click=${this._toggleMenu}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" /></svg>
                </button>`:P}
            ${l?M`<button class="menu" aria-label=${r(`settingsBack`)} @click=${()=>this._closeArea()}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.4 5.4 9.8 11H21v2H9.8l5.6 5.6L14 20l-8-8 8-8z"/></svg>
                </button>`:P}
            <div class="title grow">
              <h1>${r(l?l.title:o.label)}</h1>
              <p>${r(l?l.hint:o.sub)}</p>
              ${f?M`<p class="sub">${f}</p>`:P}
              ${l?P:this._liveFacts(e,n,r)}
            </div>
            <button class="menu help-menu" aria-label=${r(`navHelp`)} @click=${()=>this._help?this._closeHelp():this._openHelp()}>${fu(au)}</button>
            <button type="button" class="pill hide-sm" @click=${()=>this._openPause()}>
              <span class="dot ${u?``:`off`}"></span>${u?r(`regulationOn`):f??r(`regulationOff`)}${p?` · ${t.phase(p)}`:``}
            </button>
          </header>
          ${this._entityNotice(e,r)}
          ${this._alerts(e,r)}
          ${this._error&&!this._sheet?M`<p class="err" role="alert">${this._error}</p>`:P}
          ${this._chartError?M`<p class="err">${r(`chartError`,{err:this._chartError})}</p>`:P}
          <section class="screen" id=${`screen-${o.id}`}>${m}</section>
          ${nu?M`<footer class="debug">hass-Updates ${this._stats.hassUpdates} · Renders ${this._stats.renders}</footer>`:P}
        </main>
      </div>
      ${tn({hass:e,i18n:t,fmt:n,open:this._sheet,pending:this._pending,error:this._error,forcePowerDraft:this._powerDraft,onClose:()=>this._setSheet(!1),onToggle:e=>this._toggle(e),onPowerDraft:e=>{this._powerDraft=e,this.requestUpdate()},onPowerCommit:e=>this._commitPower(e),reserveDraft:this._reserveDraft,onReserveDraft:e=>{this._reserveDraft=e,this.requestUpdate()},onReserveCommit:e=>this._commitReserve(e),onPress:e=>this._press(e),onSelect:(e,t)=>this._select(e,t),onAllSettings:()=>{this._setSheet(!1),this._go(`settings`)},consumers:this._consumers,picking:this._picking,pickQuery:this._pickQuery,choices:Et(e,new Set(this._consumers.map(e=>e.entityId)),this._pickQuery),wallbox:e.states[`sensor.e3dc_maestro_wallbox_leistung`]&&!this._consumers.some(e=>e.entityId===`sensor.e3dc_maestro_wallbox_leistung`)?{id:at,name:gt(e.states[at],t.t(`useWallbox`))}:void 0,onPick:e=>{this._picking=e,this.requestUpdate()},onPickQuery:e=>{this._pickQuery=e,this.requestUpdate()},onAddConsumer:(e,t)=>{this._consumers.some(t=>t.entityId===e)||this._setConsumers([...this._consumers,{id:vt(),entityId:e,name:t,mode:`included`,icon:ft(e)}],!0)},onUseWallbox:()=>{let n=gt(e.states[at],t.t(`useWallbox`));this._setConsumers([...this._consumers,{id:vt(),entityId:at,name:n,mode:`separate`,icon:`wallbox`}],!0)},onRenameConsumer:(e,t)=>{let n=t.slice(0,40);n.trim()&&this._setConsumers(this._consumers.map(t=>t.id===e?{...t,name:n}:t))},onConsumerMode:(e,t)=>{this._setConsumers(this._consumers.map(n=>n.id===e?{...n,mode:t}:n))},onConsumerIcon:(e,t)=>{this._setConsumers(this._consumers.map(n=>n.id===e?{...n,icon:t}:n))},onRemoveConsumer:e=>this._setConsumers(this._consumers.filter(t=>t.id!==e))})}
      ${this._help?$l({i18n:t,query:this._helpQuery,phase:p,planActive:B(e.states[I.ctrlPlanControls]),lowYield:B(e.states[I.lowYield]),current:this._helpCurrent,onQuery:e=>{this._helpQuery=e,this.requestUpdate()},onClose:()=>this._closeHelp(),onJump:e=>this._jumpHelp(e),onAction:e=>this._helpAction(e),onTop:()=>{let e=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;this.renderRoot.querySelector(`.help-doc`)?.scrollTo({top:0,behavior:e?`auto`:`smooth`})}}):P}
      ${this._pauseOpen?Gt(r,u,e=>void this._pause(e),()=>this._resumeRegulation(),()=>{this._pauseOpen=!1,this.requestUpdate()}):P}
      ${this._hist?M`<div class="scrim open hist-scrim" @click=${()=>this._closeHistory()}></div>
            <aside class="overlay" role="dialog" aria-modal="true" aria-label=${this._hist.name}>
              <div class="sheet-head">
                <div class="grow"><h2>${this._hist.name}</h2><div class="sub">${r(`historySub`)}</div></div>
                <button class="btn" @click=${()=>this._closeHistory()}>${r(`close`)}</button>
              </div>
              ${this._histState===`loading`?M`<p class="hint">${r(`loading`)}</p>`:P}
              ${this._histState===`empty`?M`<p class="hint">${r(`historyEmpty`)}</p>`:P}
              ${this._histState===`error`?M`<p class="err">${r(`historyFailed`)}</p>`:P}
              ${this._histState===`ready`&&this._histPoints?M`<maestro-chart .options=${Oi(`hist-${this._hist.entityId}`,[this._theme,this._histPoints,this._hist.color,n.loc],()=>hr(this._histPoints,this._hist.color,n))}></maestro-chart>`:P}
            </aside>`:P}
    `}firstUpdated(){this._ensureHistory()}willUpdate(){this.getAttribute(`theme`)!==this._theme&&this.setAttribute(`theme`,this._theme),this._hass&&this._syncAlertDismissed(Wi(this._hass))}updated(){let e=`${this._screen}/${this._settingsGroup??``}/${this._plantGroup??``}`;if(e!==this._scrollKey){this._scrollKey=e;let t=this.renderRoot.querySelector(`main`);t&&!this._focusConsumers&&(t.scrollTop=0)}if(this._loadOptions(),this._screen===`settings`&&this._settingsGroup===Vo.id&&!this._classic&&this._checkClassic(),this._focusConsumers&&(this._focusConsumers=!1,this.renderRoot.querySelector(`#display-consumers`)?.scrollIntoView({block:`start`})),this._help?this._bindHelpScroll():this._unbindHelpScroll(),this._helpAnchor){let e=this._helpAnchor;this._helpAnchor=void 0,this._helpCurrent=e.startsWith(`ch-`)?e.slice(3):e,this._scrollHelp(e),this.renderRoot.querySelector(`.help-query`)?.focus({preventScroll:!0})}if(this._screen!==`forecast`||!this._hass)return;let t=rn(this._hass.states[I.trajectory]?.attributes),n=this.renderRoot.querySelector(`#fc-main`);if(!t||!n)return;let r=t.trajectory_points[0][0],i=t.trajectory_points[t.trajectory_points.length-1][0],a=this._showIst&&this._ist?.pv.length?Math.min(r,this._ist.pv[0][0]):r,o=`${this._range}|${a}|${r}`;o!==this._zoomKey&&(this._zoomKey=o,n.zoomX(a,Math.min(i,r+this._range*36e5)))}};eu=hu,eu.styles=Ri,customElements.get(`e3dc-maestro-panel`)||customElements.define(`e3dc-maestro-panel`,hu);