var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:f,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,h=globalThis,ee=h.trustedTypes,g=ee?ee.emptyScript:``,_=h.reactiveElementPolyfillSupport,v=(e,t)=>e,te={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},ne=(e,t)=>!l(e,t),re={attribute:!0,type:String,converter:te,reflect:!1,useDefault:!1,hasChanged:ne};Symbol.metadata??=Symbol(`metadata`),h.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=re){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??re}static _$Ei(){if(this.hasOwnProperty(v(`elementProperties`)))return;let e=m(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v(`properties`))){let e=this.properties,t=[...f(e),...p(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?te:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?te:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??ne)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:`open`},y[v(`elementProperties`)]=new Map,y[v(`finalized`)]=new Map,_?.({ReactiveElement:y}),(h.reactiveElementVersions??=[]).push(`2.1.2`);var b=globalThis,ie=e=>e,ae=b.trustedTypes,oe=ae?ae.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,x=`$lit$`,S=`lit$${Math.random().toFixed(9).slice(2)}$`,se=`?`+S,ce=`<${se}>`,C=document,w=()=>C.createComment(``),T=e=>e===null||typeof e!=`object`&&typeof e!=`function`,le=Array.isArray,ue=e=>le(e)||typeof e?.[Symbol.iterator]==`function`,de=`[ 	
\f\r]`,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fe=/-->/g,pe=/>/g,D=RegExp(`>|${de}(?:([^\\s"'>=/]+)(${de}*=${de}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),me=/'/g,he=/"/g,ge=/^(?:script|style|textarea|title)$/i,_e=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),O=_e(1),k=_e(2),A=Symbol.for(`lit-noChange`),j=Symbol.for(`lit-nothing`),ve=new WeakMap,M=C.createTreeWalker(C,129);function ye(e,t){if(!le(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return oe===void 0?t:oe.createHTML(t)}var be=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=E;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===E?c[1]===`!--`?o=fe:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=D):(ge.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=D):o=pe:o===D?c[0]===`>`?(o=i??E,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?D:c[3]===`"`?he:me):o===he||o===me?o=D:o===fe||o===pe?o=E:(o=D,i=void 0);let d=o===D&&e[t+1].startsWith(`/>`)?` `:``;a+=o===E?n+ce:l>=0?(r.push(s),n.slice(0,l)+x+n.slice(l)+S+d):n+S+(l===-2?t:d)}return[ye(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},xe=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=be(t,n);if(this.el=e.createElement(l,r),M.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=M.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(x)){let t=u[o++],n=i.getAttribute(e).split(S),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?we:r[1]===`?`?Te:r[1]===`@`?Ee:P}),i.removeAttribute(e)}else e.startsWith(S)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(ge.test(i.tagName)){let e=i.textContent.split(S),t=e.length-1;if(t>0){i.textContent=ae?ae.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],w()),M.nextNode(),c.push({type:2,index:++a});i.append(e[t],w())}}}else if(i.nodeType===8){if(i.data===se)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(S,e+1))!==-1;)c.push({type:7,index:a}),e+=S.length-1}}a++}}static createElement(e,t){let n=C.createElement(`template`);return n.innerHTML=e,n}};function N(e,t,n=e,r){if(t===A)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=T(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=N(e,i._$AS(e,t.values),i,r)),t}var Se=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??C).importNode(t,!0);M.currentNode=r;let i=M.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Ce(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new De(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=M.nextNode(),a++)}return M.currentNode=C,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Ce=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=N(this,e,t),T(e)?e===j||e==null||e===``?(this._$AH!==j&&this._$AR(),this._$AH=j):e!==this._$AH&&e!==A&&this._(e):e._$litType$===void 0?e.nodeType===void 0?ue(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==j&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(C.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=xe.createElement(ye(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Se(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=ve.get(e.strings);return t===void 0&&ve.set(e.strings,t=new xe(e)),t}k(t){le(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(w()),this.O(w()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=ie(e).nextSibling;ie(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},P=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=j,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=j}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=N(this,e,t,0),a=!T(e)||e!==this._$AH&&e!==A,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=N(this,r[n+o],t,o),s===A&&(s=this._$AH[o]),a||=!T(s)||s!==this._$AH[o],s===j?e=j:e!==j&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},we=class extends P{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===j?void 0:e}},Te=class extends P{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==j)}},Ee=class extends P{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=N(this,e,t,0)??j)===A)return;let n=this._$AH,r=e===j&&n!==j||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==j&&(n===j||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},De=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}},Oe={M:x,P:S,A:se,C:1,L:be,R:Se,D:ue,V:N,I:Ce,H:P,N:Te,U:Ee,B:we,F:De},ke=b.litHtmlPolyfillSupport;ke?.(xe,Ce),(b.litHtmlVersions??=[]).push(`3.3.3`);var Ae=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Ce(t.insertBefore(w(),e),e,void 0,n??{})}return i._$AI(e),i},je=globalThis,F=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ae(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};F._$litElement$=!0,F.finalized=!0,je.litElementHydrateSupport?.({LitElement:F});var Me=je.litElementPolyfillSupport;Me?.({LitElement:F}),(je.litElementVersions??=[]).push(`4.2.2`);var Ne=(function(){let e=typeof document<`u`&&document.createElement(`link`).relList;return e&&e.supports&&e.supports(`modulepreload`)?`modulepreload`:`preload`})(),Pe=function(e,t){return new URL(e,t).href},Fe={},Ie=function(e){return e.pathname.endsWith(`.css`)},Le=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},Re=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Pe(t,n);let r=s(t),i=Ie(r);return Le(Fe,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Ne,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},ze,Be=new WeakMap,Ve,He=0;async function Ue(){return Ve??=await Re(()=>import(`./apex-DvHPYsi2.js`),[],import.meta.url),Ve}var We=class extends F{constructor(...e){super(...e),this._run=0}createRenderRoot(){return this}updated(e){e.has(`options`)&&this._apply().catch(e=>{this.dispatchEvent(new CustomEvent(`chart-error`,{detail:e instanceof Error?`${e.name}: ${e.message}`:String(e),bubbles:!0,composed:!0}))})}connectedCallback(){super.connectedCallback(),He++,Ve?.claimSVG(),this.hasUpdated&&this.options&&!this._chart&&this.requestUpdate(`options`)}disconnectedCallback(){super.disconnectedCallback(),--He===0&&Ve?.releaseSVG(),this._run++;try{this._chart?.destroy()}catch{}this._chart=void 0,this.replaceChildren()}_scoped(e){let t=e.chart?.id,n=e.chart?.brush?.target,r=this.getRootNode(),i=Be.get(r);i||Be.set(r,i=Math.random().toString(36).slice(2,8));let a=i;return{...e,chart:{...e.chart,...t?{id:`${t}-${a}`}:{},...n?{brush:{...e.chart?.brush,target:`${n}-${a}`}}:{}}}}zoomX(e,t){this._zoom=[e,t],this._chart?.zoomX(e,t)}async _apply(){let e=this.options;if(!e)return;let t=this._scoped(e),n=++this._run,r=await Ue(),i=r.default;if(n!==this._run||!this.isConnected)return;r.claimSVG();let a=t.chart?.brush?.target;if(a){for(let e=0;e<120&&!i.getChartByID(a);e++)if(await new Promise(e=>requestAnimationFrame(e)),n!==this._run)return}this._chart?await this._chart.updateOptions(t,!1,!1):(this._chart=new i(this,t),await this._chart.render()),n===this._run&&this._zoom&&this._chart.zoomX(...this._zoom)}};ze=We,ze.properties={options:{attribute:!1}},customElements.get(`maestro-chart`)||customElements.define(`maestro-chart`,We);var I=e=>`sensor.e3dc_maestro_${e}`,L=e=>`binary_sensor.e3dc_maestro_${e}`,R=e=>`switch.e3dc_maestro_${e}`,Ge={phase:I(`regelphase`),lastAction:I(`letzte_aktion`),explanation:I(`entscheidungserklarung`),trajectory:I(`forecast_soc_trajektorie_24h`),plan:I(`preisplan`),soc:I(`aktueller_soc`),targetSoc:I(`ziel_soc`),pv:I(`pv_power`),house:I(`house_power`),grid:I(`grid_power`),battery:I(`battery_power`),autonomy:I(`autonomiezeit`),costNet:I(`netto_stromkosten_heute`),costToday:I(`stromkosten_heute`),feedRevenue:I(`einspeise_erlos_heute`),wear:I(`akku_verschleiss_heute`),balance:I(`energiebilanz_heute`),gridToBattery:I(`netz_akku_heute`),unjustified:L(`netzladung_ohne_rechtfertigung`),wallboxEnergy:I(`wallbox_energie_heute`),feedInInterventions:I(`einspeise_eingriffe_heute`),feedInAvoided:I(`dc_abregelung_verhindert_heute`),curtailAvoided:I(`abregelung_verhindert_heute`),feedInLimit:L(`einspeisedrosselung_aktiv`),gridCharge:L(`netzladung_aktiv`),batteryPriority:L(`akku_prioritat_aktiv`),lowYield:L(`schwacher_pv_tag`),forecastQuality:I(`forecast_datenqualitat`),p10:I(`pv_restprognose_p10`),yieldToday:I(`pv_tagesprognose`),yieldRef:I(`pv_referenz_ertrag`),yieldRatio:I(`pv_tag_quote`),deficit:I(`morgen_energiedefizit`),seasonalReserve:I(`notstromreserve_aktuell`),adaptiveReserve:I(`notstromreserve_adaptiv`),htReserve:I(`ht_reserve_adaptiv`),forwardTarget:I(`vorausschauendes_ladeziel`),astroStart:I(`astro_ladestart_uhrzeit`),seasonalEnd:I(`saisonales_ladeende_uhrzeit`),pvDelayStart:I(`verzogerter_ladestart_heute`),tomorrowStart:I(`ladestart_morgen_prognose`),tomorrowEnd:I(`ladeende_morgen_prognose`),autoStrategy:I(`auto_aktive_strategie`),autoSaving:I(`auto_geschatzte_einsparung`),saving:I(`pv_ersparnis_heute`),selfUse:I(`pv_eigenverbrauch_heute`),importToday:I(`netzbezug_heute`),feedToday:I(`netzeinspeisung_heute`),chargedToday:I(`geladen_heute`),dischargedToday:I(`entladen_heute`),pvTomorrow:I(`morgen_pv_prognose`),reachable:L(`e3dc_erreichbar`),chargeLock:L(`ladesperre_aktiv`),dischargeLock:L(`entladesperre_aktiv`),htProtect:L(`ht_schutz_aktiv`),curtail:L(`abregelschutz_aktiv`),emergency:L(`notfallladung_aktiv`),chargeLimit:I(`soll_lade_limit`),dischargeLimit:I(`soll_entlade_limit`),sentChargeLimit:I(`gesendetes_lade_limit`),sentDischargeLimit:I(`gesendetes_entlade_limit`),forceDischargePower:`number.e3dc_maestro_erzwungene_entladungsleistung`,fixedReserveSoc:`number.e3dc_maestro_notstromreserve_prozent`,ctrlActive:R(`regelung_aktiv`),ctrlPredictive:R(`vorausschauende_ladung`),ctrlPvDelay:R(`pv_prognose_verzogerung`),ctrlPlanControls:R(`preisplan_steuert_akku`),ctrlPlanShadow:R(`preisplan_schattenmodus`),forceDischarge:R(`erzwungene_entladung`),fixedReserve:R(`notstromreserve`),debug:R(`debug_logging`),debugLog:I(`debug_log`),btnClear:`button.e3dc_maestro_limits_jetzt_freigeben`,btnCharge:`button.e3dc_maestro_manuell_laden_3_kwh`,selWallbox:`select.e3dc_maestro_wallbox_typ`,selMorning:`select.e3dc_maestro_vorentladungs_modus`,selAuto:`select.e3dc_maestro_auto_optimierung_ziel`,selTariff:`select.e3dc_maestro_tarif_modus`},z={...Ge};function Ke(e){for(let t of Object.keys(Ge))z[t]=e.entities[t]??Ge[t]}var qe=[`ctrlActive`,`ctrlPredictive`,`ctrlPvDelay`,`ctrlPlanControls`,`ctrlPlanShadow`],Je=()=>Object.values(z),B=e=>{let t=e?Number.parseFloat(e.state):NaN;return Number.isFinite(t)?t:void 0},V=e=>e?.state===`on`,Ye=`sensor.e3dc_maestro_wallbox_leistung`,Xe=`e3dc-maestro.consumers.v1`,Ze=50,Qe=[`wallbox`,`heater`,`climate`,`heatpump`,`meter`],$e={wallbox:`M6 8h12v7H6zM9 8V5M15 8V5M12 15v4M9 19h6`,heater:`M10 3v18M15 7c1.4 1 1.4 2 0 3s-1.4 2 0 3 1.4 2 0 3`,climate:`M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9`,heatpump:`M4 7h16v11H4zM12 9.5a2.5 2.5 0 1 0 .01 0`,meter:`M6 16a6 6 0 1 1 12 0M12 16l3.5-3.5`},et=e=>typeof e==`string`&&Qe.includes(e);function tt(e){return/wallbox|evcc|easee|go-?e/i.test(e)?`wallbox`:`meter`}function nt(e){return!e||e.state===`unavailable`}function rt(e){let t=B(e);if(t!==void 0)return e?.attributes.unit_of_measurement===`kW`?t*1e3:t}function it(e){if(!e?.entity_id.startsWith(`sensor.`))return!1;let t=e.attributes.unit_of_measurement;return e.attributes.device_class===`power`||t===`W`||t===`kW`}function at(e,t){let n=e?.attributes.friendly_name;return typeof n==`string`&&n.trim()?n.trim():t}function ot(e){if(!Array.isArray(e))return[];let t=[],n=new Set;for(let r of e){if(!r||typeof r!=`object`)continue;let e=r,i=e.entityId,a=e.mode;if(typeof i!=`string`||!i.startsWith(`sensor.`)||n.has(i)||a!==`included`&&a!==`separate`)continue;let o=typeof e.name==`string`&&e.name.trim()?e.name.trim().slice(0,40):i,s=typeof e.id==`string`&&e.id?e.id:i;if(t.push({id:s,entityId:i,name:o,mode:a,icon:et(e.icon)?e.icon:tt(i)}),n.add(i),t.length>=6)break}return t}function st(){let e=new Uint8Array(8);return crypto.getRandomValues(e),[...e].map(e=>e.toString(16).padStart(2,`0`)).join(``)}function ct(){try{return ot(JSON.parse(localStorage.getItem(Xe)??`null`))}catch{return[]}}function lt(e){localStorage.setItem(Xe,JSON.stringify(ot(e)))}function ut(e,t){return e.map(e=>{let n=t.states[e.entityId],r=rt(n);return{id:e.id,name:e.name,mode:e.mode,icon:e.icon,watts:r??0,missing:nt(n)}})}function dt(e,t){return e!==void 0&&t.filter(e=>e.mode===`included`).reduce((e,t)=>e+Math.max(0,t.watts),0)>e+Ze}function ft(e,t,n){let r=n.trim().toLowerCase();return Object.values(e.states).filter(e=>it(e)&&!t.has(e.entity_id)).map(e=>({id:e.entity_id,name:at(e,e.entity_id)})).filter(e=>!r||e.name.toLowerCase().includes(r)||e.id.toLowerCase().includes(r)).sort((e,t)=>e.name.localeCompare(t.name)).slice(0,12)}var{I:pt}=Oe,mt=e=>e.strings===void 0,ht={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},gt=e=>(...t)=>({_$litDirective$:e,values:t}),_t=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},H=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),H(e,t);return!0},vt=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},yt=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),St(t)}};function bt(e){this._$AN===void 0?this._$AM=e:(vt(this),this._$AM=e,yt(this))}function xt(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0){if(t){if(Array.isArray(r))for(let e=n;e<r.length;e++)H(r[e],!1),vt(r[e]);else r!=null&&(H(r,!1),vt(r))}else H(this,e)}}var St=e=>{e.type==ht.CHILD&&(e._$AP??=xt,e._$AQ??=bt)},Ct=class extends _t{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),yt(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(H(this,e),vt(this))}setValue(e){if(mt(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}},wt=new WeakMap,Tt=gt(class extends Ct{render(e){return j}update(e,[t]){let n=t!==this.G;return n&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),j}rt(e){if(this.G!==void 0){if(this.isConnected||(e=void 0),typeof this.G==`function`){let t=this.ht??globalThis,n=wt.get(t);n===void 0&&(n=new WeakMap,wt.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}}get lt(){return typeof this.G==`function`?wt.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Et={wallbox:`iconWallbox`,heater:`iconHeater`,climate:`iconClimate`,heatpump:`iconHeatpump`,meter:`iconMeter`},Dt=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},Ot={ctrlActive:`ctrlActiveSub`,ctrlPredictive:`ctrlPredictiveSub`,ctrlPvDelay:`ctrlPvDelaySub`,ctrlPlanControls:`ctrlPlanControlsSub`,ctrlPlanShadow:`ctrlPlanShadowSub`};function kt(e){let{t}=e.i18n,n=e.hass.states[z.forceDischargePower],r=n?.attributes??{},i=typeof r.min==`number`?r.min:100,a=typeof r.max==`number`?r.max:1e4,o=typeof r.step==`number`?r.step:100,s=e.forcePowerDraft??B(n)??i,c=e.hass.states[z.fixedReserveSoc],l=c?.attributes??{},u=typeof l.min==`number`?l.min:0,d=typeof l.max==`number`?l.max:100,f=typeof l.step==`number`?l.step:1,p=e.reserveDraft??B(c)??u,m=(t,n)=>{let r=e.hass.states[t],i=V(r),a=!r||r.state===`unavailable`;return O`<button
      class="switch ${i?`on`:``}"
      role="switch"
      aria-checked=${i}
      aria-label=${n}
      ?disabled=${a||e.pending.has(t)}
      @click=${()=>e.onToggle(t)}
    ></button>`};return O`
    <div class="scrim ${e.open?`open`:``}" @click=${e.onClose}></div>
    <aside class="sheet ${e.open?`open`:``}" role="dialog" aria-modal="true" aria-label=${t(`controlsTitle`)} ?inert=${!e.open}>
      <div class="sheet-head">
        <div class="grow"><h2>${t(`controlsTitle`)}</h2><div class="sub">${t(`controlsSub`)}</div></div>
        <button class="btn" @click=${e.onClose}>${t(`close`)}</button>
      </div>
      ${e.error?O`<p class="err">${e.error}</p>`:j}
      <div class="release">
        <button
          class="btn action"
          ?disabled=${!e.hass.states[z.btnClear]||e.pending.has(z.btnClear)}
          @click=${()=>e.onPress(z.btnClear)}
        >${t(`btnClear`)}</button>
        <p class="sub">${t(`btnClearSub`)}</p>
      </div>
      ${qe.map(e=>O`<div class="ctrl">
          <div class="txt"><b>${t(e)}</b><span>${t(Ot[e])}</span></div>
          ${m(z[e],t(e))}
        </div>`)}
      <div class="ctrl wrap">
        <div class="txt"><b>${t(`ctrlForce`)}</b><span>${t(`ctrlForcePower`,{v:e.fmt.w(s)})}</span></div>
        ${m(z.forceDischarge,t(`ctrlForce`))}
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
        ${m(z.fixedReserve,t(`fixedReserve`))}
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
        ${[`selWallbox`,`selMorning`,`selAuto`,`selTariff`].map(n=>{let r=e.hass.states[z[n]],i=Array.isArray(r?.attributes.options)?r.attributes.options:[];return O`<label class="ctrl">
            <span class="txt"><b>${t(n)}</b></span>
            <select
              .value=${r?.state??``}
              ?disabled=${!r||r.state===`unavailable`||e.pending.has(z[n])}
              @change=${t=>e.onSelect(z[n],t.target.value)}
            >
              ${i.map(t=>O`<option value=${t} ?selected=${t===r?.state}>${e.i18n.option(t)}</option>`)}
            </select>
          </label>`})}
        ${[`btnCharge`].map(n=>{let r=n===`btnCharge`?[t(`confirmCharge`)]:[];return O`<button
            class="btn action"
            ?disabled=${!e.hass.states[z[n]]||e.pending.has(z[n])}
            @click=${()=>{r.some(e=>!window.confirm(e))||e.onPress(z[n])}}
          >${t(n)}</button>`})}
      </div>
      <div class="sheet-section" id="display-consumers">
        <h3>${t(`displayTitle`)}</h3>
        <div class="sub">${t(`consumersSub`)}</div>
        ${e.consumers.length?e.consumers.map(n=>{let r=e.hass.states[n.entityId],i=nt(r);return O`<div class="consumer">
                <label class="txt">
                  <span class="lbl">${t(`consumerName`)}</span>
                  <input
                    ${Tt(e=>{e instanceof HTMLInputElement&&!Dt(e)&&e.value!==n.name&&(e.value=n.name)})}
                    maxlength="40"
                    aria-label=${t(`consumerName`)}
                    @input=${t=>e.onRenameConsumer(n.id,t.target.value)}
                  />
                  <span>${i?t(`consumerMissing`):n.entityId}</span>
                </label>
                <div class="icon-pick" role="group" aria-label=${t(`consumerIcon`)}>
                  ${Qe.map(r=>O`<button
                      type="button"
                      class=${n.icon===r?`on`:``}
                      aria-pressed=${n.icon===r}
                      aria-label=${t(Et[r])}
                      @click=${()=>e.onConsumerIcon(n.id,r)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${$e[r]} /></svg>
                    </button>`)}
                </div>
                <div class="seg" role="group" aria-label=${n.name}>
                  <button type="button" class=${n.mode===`included`?`on`:``} aria-pressed=${n.mode===`included`} @click=${()=>e.onConsumerMode(n.id,`included`)}>${t(`modeIncluded`)}</button>
                  <button type="button" class=${n.mode===`separate`?`on`:``} aria-pressed=${n.mode===`separate`} @click=${()=>e.onConsumerMode(n.id,`separate`)}>${t(`modeSeparate`)}</button>
                </div>
                <button type="button" class="btn ghost" @click=${()=>e.onRemoveConsumer(n.id)}>${t(`removeConsumer`)}</button>
              </div>`}):O`<p class="hint">${t(`consumersEmpty`)}</p>`}
        ${e.wallbox?O`<button type="button" class="btn add" @click=${e.onUseWallbox}>${t(`useWallbox`)}</button>`:j}
        ${e.consumers.length<6?O`<button type="button" class="btn add" @click=${()=>e.onPick(!e.picking)}>${t(`addConsumer`)}</button>`:j}
        ${e.picking?O`<div class="picker">
              <input
                type="search"
                placeholder=${t(`consumerSearch`)}
                aria-label=${t(`consumerSearch`)}
                .value=${e.pickQuery}
                @input=${t=>e.onPickQuery(t.target.value)}
              />
              ${e.choices.length?e.choices.map(t=>O`<button type="button" class="pick" @click=${()=>e.onAddConsumer(t.id,t.name)}>
                      <b>${t.name}</b><span>${t.id}</span>
                    </button>`):O`<p class="hint">${t(`noPowerSensors`)}</p>`}
            </div>`:j}
      </div>
      <a class="link" href="/e3dc-maestro" @click=${t=>{t.preventDefault(),e.onAllSettings()}}>${t(`allSettings`)}</a>
    </aside>`}var At=e=>Array.isArray(e)&&e.every(e=>Array.isArray(e)&&e.length===2&&Number.isFinite(e[0]));function jt(e){if(!e)return;let t=e;if(!(!At(t.trajectory_points)||!At(t.pv_points)||!At(t.house_points)||!At(t.grid_points)||!Array.isArray(t.trajectory_phases)||t.trajectory_points.length<2))return t}var U=e=>e.map(([e,t])=>[e,t/1e3]);function Mt(e){return{imp:e.map(([e,t])=>[e,Math.max(0,-t)/1e3]),exp:e.map(([e,t])=>[e,Math.max(0,t)/1e3])}}function Nt(e,t){let n=[],r=0;for(let i=1;i<=e.length;i++)(i===e.length||e[i]!==e[r])&&(n.push({phase:e[r],x:t[r][0],x2:t[Math.min(i,t.length)-1][0]}),r=i);return n}var Pt=e=>e.grid_charge_kwh>0?`charge`:e.hold?`hold`:`release`;function Ft(e){return Array.isArray(e)?e.filter(e=>!!e&&typeof e.start==`string`&&Number.isFinite(Date.parse(e.start))&&Number.isFinite(e.price)):[]}function It(e){if(e.length<3)return e;let t=e.map(e=>Date.parse(e.start)),n=t.slice(1).map((e,n)=>e-t[n]).sort((e,t)=>e-t),r=n[Math.floor(n.length/2)];return e.filter((n,i)=>i===e.length-1||t[i+1]-t[i]>=r*.5)}function Lt(e){if(e.length)return{min:e.reduce((e,t)=>t.price<e.price?t:e),max:e.reduce((e,t)=>t.price>e.price?t:e)}}function Rt(e){return(e??[]).map(e=>{let t=e.lc??e.lu,n=t===void 0?Date.parse(e.last_changed??e.last_updated??``):t*1e3;return{state:e.s??e.state??``,attrs:e.a??e.attributes??{},ts:n}}).filter(e=>Number.isFinite(e.ts))}function zt(e){return e.map(e=>[e.ts,Number.parseFloat(e.state)]).filter(([,e])=>Number.isFinite(e))}function Bt(e,t,n){let r=new Map;for(let[n,i]of e){let e=Math.floor(n/t)*t,a=r.get(e);a?a.push(i):r.set(e,[i])}return[...r.entries()].sort(([e],[t])=>e-t).map(([e,t])=>[e,n===`last`?t[t.length-1]:t.reduce((e,t)=>e+t,0)/t.length])}function Vt(e,t,n=12){let r=(e,t,n)=>{let r=typeof e.timestamp==`string`?Date.parse(e.timestamp):NaN;return{phase:typeof e.phase==`string`?e.phase:t,reason:typeof e.reason==`string`?e.reason:``,ts:Number.isFinite(r)?r:n}},i=e=>e===`unavailable`||e===`unknown`||e===``,a=e.filter(e=>!i(e.state)||typeof e.attrs.phase==`string`).map(e=>r(e.attrs,e.state,e.ts));if(Array.isArray(t))for(let e of t)e&&typeof e==`object`&&a.push(r(e,``,Date.now()));a.sort((e,t)=>t.ts-e.ts);let o=[];for(let e of a){if(!e.phase)continue;let t=o[o.length-1];t&&t.phase===e.phase?o[o.length-1]=e:o.push(e)}return o.slice(0,n)}var W={pv:`#fbbf24`,house:`#a78bfa`,gridIn:`#f87171`,gridOut:`#34d399`,bat:`#22d3ee`,accent:`#38bdf8`,accent2:`#818cf8`,text:`#e8edf7`,muted:`#8b96ad`,faint:`#5a6580`,bg:`#070b14`},Ht={charge:W.gridOut,hold:W.pv,release:W.bat},Ut={chart:{background:`transparent`,foreColor:W.muted,fontFamily:`Inter, system-ui, sans-serif`,toolbar:{show:!1},animations:{enabled:!1}},theme:{mode:`dark`},grid:{borderColor:`rgba(255,255,255,0.06)`,strokeDashArray:4},dataLabels:{enabled:!1},legend:{show:!1},tooltip:{theme:`dark`}},Wt=e=>!!e&&typeof e==`object`&&!Array.isArray(e),Gt=(e,t)=>{let n={...e};for(let[e,r]of Object.entries(t))n[e]=Wt(r)&&Wt(n[e])?Gt(n[e],r):r;return n},G=e=>Gt(Ut,e),Kt=e=>({x:Date.now(),borderColor:W.text,opacity:.6,label:{text:e,orientation:`horizontal`,borderWidth:0,style:{background:W.text,color:W.bg,fontWeight:700}}}),qt=(e={})=>({type:`datetime`,labels:{datetimeUTC:!1,format:`HH:mm`},axisBorder:{show:!1},axisTicks:{show:!1},...e});function Jt({traj:e,targetSoc:t,ist:n,showIst:r,fmt:i,i18n:a}){let{imp:o,exp:s}=Mt(e.grid_points),c=Nt(e.trajectory_phases,e.trajectory_points).map(e=>{let t={x:e.x,x2:e.x2,fillColor:W.accent,opacity:.05};return e.x2-e.x>=18e5&&(t.label={text:a.phase(e.phase),borderWidth:0,orientation:`vertical`,position:`top`,offsetX:10,offsetY:10,style:{background:`transparent`,color:W.muted,fontSize:`11px`}}),t}),l=[{name:a.t(`legendPv`),type:`area`,data:U(e.pv_points)},{name:a.t(`legendHouse`),type:`line`,data:U(e.house_points)},{name:a.t(`legendImport`),type:`area`,data:o},{name:a.t(`legendFeed`),type:`area`,data:s},{name:a.t(`legendSoc`),type:`line`,data:e.trajectory_points}],u=[W.pv,W.house,W.gridIn,W.gridOut,W.bat],d=[2,2,1.5,1.5,3.5],f=[0,4,0,0,0],p=[`gradient`,`solid`,`gradient`,`gradient`,`solid`],m=[{seriesName:a.t(`legendPv`),min:0,title:{text:`kW`},labels:{formatter:e=>i.n(e,1)}},{seriesName:a.t(`legendPv`),show:!1},{seriesName:a.t(`legendPv`),show:!1},{seriesName:a.t(`legendPv`),show:!1},{seriesName:a.t(`legendSoc`),opposite:!0,min:0,max:100,tickAmount:5,title:{text:`SoC %`},labels:{formatter:e=>`${Math.round(e)}%`}}],h=-1;return r&&n&&(n.pv.length>1||n.house.length>1)&&(h=l.length,l.push({name:`${a.t(`legendPv`)} ${a.t(`legendActual`)}`,type:`line`,data:U(n.pv)},{name:`${a.t(`legendHouse`)} ${a.t(`legendActual`)}`,type:`line`,data:U(n.house)},{name:`${a.t(`legendSoc`)} ${a.t(`legendActual`)}`,type:`line`,data:n.soc}),u.push(W.pv,W.house,W.bat),d.push(1.5,1.5,1.5),f.push(0,0,0),p.push(`solid`,`solid`,`solid`),m.push({seriesName:a.t(`legendPv`),show:!1},{seriesName:a.t(`legendPv`),show:!1},{seriesName:a.t(`legendSoc`),opposite:!0,min:0,max:100,show:!1})),G({chart:{id:`fc`,type:`line`,height:420,zoom:{enabled:!0,type:`x`},toolbar:{show:!1,autoSelected:`zoom`}},grid:{padding:{top:t!==void 0&&t>=90?28:8}},series:l,colors:u,stroke:{width:d,curve:`smooth`,dashArray:f},fill:{type:p,gradient:{opacityFrom:.45,opacityTo:.02},opacity:l.map((e,t)=>h>=0&&t>=h?.55:1)},xaxis:qt({tooltip:{enabled:!1}}),yaxis:m,tooltip:{shared:!0,intersect:!1,x:{format:`HH:mm`},y:{formatter:(e,t)=>e==null?`–`:t?.seriesIndex===4||h>=0&&t?.seriesIndex===h+2?`${i.n(e)} %`:`${i.n(e,2)} kW`}},markers:{size:0,hover:{size:5}},annotations:{xaxis:[...c,Kt(a.t(`now`))],yaxis:t===void 0?[]:[{y:t,yAxisIndex:4,borderColor:W.accent2,strokeDashArray:6,label:{text:a.t(`targetLabel`,{v:Math.round(t)}),position:`right`,textAnchor:`end`,offsetX:-8,offsetY:-16,borderWidth:0,style:{background:`rgba(7,11,20,.85)`,color:`#c7d2fe`,fontSize:`12px`,padding:{left:6,right:6,top:3,bottom:3}}}}]}})}function Yt(e){let t=e.trajectory_points[0][0],n=e.trajectory_points[e.trajectory_points.length-1][0];return G({chart:{id:`fc-brush`,type:`area`,height:90,brush:{enabled:!0,target:`fc`},selection:{enabled:!0,xaxis:{min:t,max:n},fill:{color:W.accent,opacity:.12},stroke:{color:W.accent}}},series:[{name:`PV`,data:U(e.pv_points)},{name:`House`,data:U(e.house_points)}],colors:[W.pv,W.house],stroke:{width:1.5,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.35,opacityTo:0}},xaxis:qt(),yaxis:{show:!1,min:0},grid:{show:!1},tooltip:{enabled:!1}})}function Xt({slots:e,fmt:t,i18n:n}){let r=It(e),i=e=>Date.parse(e.start),a=e=>{let r=Pt(e);return r===`charge`?n.t(`slotCharge`,{kwh:t.n(e.grid_charge_kwh,2)}):r===`hold`?n.t(`slotHold`):n.t(`slotRelease`)},o=(e,t)=>`<div style="display:flex;justify-content:space-between;gap:16px;color:${W.muted}"><span>${e}</span><b style="color:${W.text}">${t}</b></div>`;return G({chart:{type:`line`,height:360,zoom:{enabled:!0,type:`x`},toolbar:{show:!1,autoSelected:`zoom`}},series:[{name:n.t(`slotPrice`),type:`column`,data:r.map(e=>({x:i(e),y:+(e.price*100).toFixed(1),fillColor:Ht[Pt(e)]}))},{name:n.t(`legendPlanSoc`),type:`line`,data:r.map(e=>({x:i(e),y:e.soc_pct}))}],colors:[W.bat,`#ffffff`],stroke:{width:[0,2.5],curve:`stepline`},plotOptions:{bar:{columnWidth:`78%`,borderRadius:4,borderRadiusApplication:`end`}},fill:{opacity:[.85,1]},xaxis:qt(),yaxis:[{title:{text:`ct/kWh`},labels:{formatter:e=>t.n(e,0)}},{opposite:!0,min:0,max:100,title:{text:`SoC %`},labels:{formatter:e=>`${Math.round(e)}%`}}],tooltip:{shared:!0,intersect:!1,custom:({dataPointIndex:e})=>{let i=r[e];return i?`<div style="padding:12px 14px;min-width:190px">
          <div style="font-weight:700;margin-bottom:8px">${t.dayTime(i.start)}</div>
          ${o(n.t(`slotPrice`),`${t.n(i.price*100)} ct`)}
          ${o(n.t(`slotSoc`),`${t.n(i.soc_pct)} %`)}
          ${o(n.t(`slotConsumption`),`${t.n(i.consumption_kwh,2)} kWh`)}
          <div style="margin-top:8px;color:${Ht[Pt(i)]};font-weight:600">${a(i)}</div></div>`:``}},annotations:{xaxis:[Kt(n.t(`now`))]}})}function Zt(e,t){return G({chart:{type:`radialBar`,height:270,sparkline:{enabled:!0}},series:[e],colors:[W.bat],fill:{type:`gradient`,gradient:{shade:`dark`,type:`horizontal`,gradientToColors:[W.accent2],stops:[0,100]}},plotOptions:{radialBar:{hollow:{size:`68%`},startAngle:-135,endAngle:135,track:{background:`rgba(255,255,255,0.06)`,strokeWidth:`100%`},dataLabels:{name:{show:!0,offsetY:26,color:W.muted,fontSize:`13px`},value:{offsetY:-14,fontSize:`46px`,fontWeight:800,color:W.text,formatter:e=>`${Math.round(e)}%`}}}},stroke:{lineCap:`round`},labels:[t]})}function Qt(e,t,n){return G({chart:{type:`area`,height:280},series:[{data:U(e)}],colors:[t],stroke:{width:2,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.32,opacityTo:.02}},xaxis:qt(),yaxis:{decimalsInFloat:1,title:{text:`kW`},labels:{formatter:e=>n.n(e,1)}},tooltip:{x:{format:`dd.MM. HH:mm`},y:{formatter:e=>`${n.n(e,2)} kW`}}})}function $t(e,t){return G({chart:{type:`area`,height:56,sparkline:{enabled:!0}},series:[{data:e}],colors:[t],stroke:{width:2,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.35,opacityTo:0}},xaxis:{type:`datetime`},tooltip:{enabled:!1}})}var en={pv:`M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z`,grid:`M12 2 7 22M12 2l5 20M5 9h14M4 15h16`,house:`M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6`,bat:`M7 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM10 3h4M9 13h6`},tn={wide:{box:[600,420],hub:{x:300,y:215},pv:{x:300,y:100,labelDy:-72},grid:{x:90,y:215,labelDy:70},house:{x:510,y:215,labelDy:70},bat:{x:300,y:320,labelDy:70}},compact:{box:[360,520],hub:{x:180,y:250},pv:{x:180,y:95,labelDy:-72},grid:{x:62,y:250,labelDy:70},house:{x:298,y:250,labelDy:70},bat:{x:180,y:405,labelDy:70}}},K=30,nn=42,rn=16,an=26;function on(e,t,n,r){let i=t.x-e.x,a=t.y-e.y,o=Math.hypot(i,a)||1,s=Math.min(n,o/2),c=Math.min(r,o/2);return{x1:e.x+i/o*s,y1:e.y+a/o*s,x2:t.x-i/o*c,y2:t.y-a/o*c}}function sn(e,t,n,r){let i=on(e,t,n,r);return`M${i.x1} ${i.y1} L${i.x2} ${i.y2}`}var cn=.22,ln=6e3;function un(e){let t=Math.abs(e);return t<K?0:t<600?2:t<2e3?3:t<4500?4:5}function dn(e){return cn+Math.min(Math.abs(e),ln)/ln*1.1300000000000001}function fn(e,t){let n=t/1e3;for(let t of e){let e=Number(t.getAttribute(`data-x1`)),r=Number(t.getAttribute(`data-y1`)),i=Number(t.getAttribute(`data-x2`)),a=Number(t.getAttribute(`data-y2`)),o=Number(t.getAttribute(`data-speed`)),s=Number(t.getAttribute(`data-phase`));if(!Number.isFinite(o))continue;let c=((n*o+s)%1+1)%1,l=Math.sin(c*Math.PI),u=e+(i-e)*c,d=r+(a-r)*c;t.setAttribute(`transform`,`translate(${u.toFixed(1)} ${d.toFixed(1)})`),t.setAttribute(`opacity`,(.2+.8*l).toFixed(3))}}var pn=e=>e.length<=16?e:`${e.slice(0,15)}…`;function mn(e,t,n,r,i,a,o){let s=o?un(i):0;if(!s)return k``;let c=on(e,t,n,r),l=dn(i).toFixed(3);return k`${Array.from({length:s},(e,t)=>k`<g class="electron" fill=${a} data-x1=${c.x1} data-y1=${c.y1} data-x2=${c.x2} data-y2=${c.y2} data-speed=${l} data-phase=${t/s}><circle class="halo" r="3.4"/><circle r="1.5"/><circle r="0.75" fill="#fff"/></g>`)}`}function hn(e,t){if(t)return e?500+t*52:Math.round(380*Math.max(420,48+t*96)/420)}function gn(e){let t=(e.consumers??[]).slice(0,6),n=e.compact?tn.compact:tn.wide,r=n.box[0]+(!e.compact&&t.length?160:0),i=e.compact?n.box[1]+t.length*58+(t.length?12:0):Math.max(n.box[1],48+t.length*96),a=r=>e.compact?{x:n.hub.x,y:n.box[1]+8+r*58,labelDy:40}:{x:n.box[0]+78,y:i*((r+1)/(t.length+1)),labelDy:44},{pv:o=0,house:s=0,grid:c=0,battery:l=0}=e,u=e.motion!==!1,d=e.i18n.t,f={pv:{color:`var(--pv)`,label:d(`nodePv`),value:o,icon:en.pv},grid:{color:c<0?`var(--grid-in)`:`var(--grid-out)`,label:d(c<0?`nodeImport`:`nodeFeed`),value:c,icon:en.grid},house:{color:`var(--house)`,label:d(`nodeHouse`),value:s,icon:en.house},bat:{color:`var(--bat)`,label:d(l<0?`nodeBatDischarge`:`nodeBatCharge`),value:l,icon:en.bat}},p=[];o>K&&p.push({node:`pv`,toHub:!0}),l<-30&&p.push({node:`bat`,toHub:!0}),l>K&&p.push({node:`bat`,toHub:!1}),c<-30&&p.push({node:`grid`,toHub:!0}),c>K&&p.push({node:`grid`,toHub:!1}),s>K&&p.push({node:`house`,toHub:!1});let m=[`pv`,`grid`,`house`,`bat`],h=t.map((e,t)=>({c:e,p:a(t)}));return k`<svg viewBox="0 0 ${r} ${i}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${[...m.map(t=>`${f[t].label} ${e.fmt.w(f[t].value)}`),...h.map(({c:t})=>`${t.name} ${e.fmt.w(t.watts)}`)].join(`, `)}>
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="hubg"><stop offset="0" stop-color="rgba(56,189,248,.5)"/><stop offset="1" stop-color="rgba(56,189,248,0)"/></radialGradient>
    </defs>
    ${m.map(e=>k`<path class="flow-line" d=${sn(n[e],n.hub,nn,rn)} stroke=${f[e].color}/>`)}
    ${h.map(({c:e,p:t})=>{let r=e.mode===`included`?n.house:n.hub,i=e.mode===`included`?nn:rn,a=e.mode===`included`?`var(--house)`:`var(--accent)`;return k`<path class="flow-line" d=${sn(r,t,i,an)} stroke=${a}/>
        ${mn(r,t,i,an,e.watts,a,u)}`})}
    ${p.map(e=>mn(e.toHub?n[e.node]:n.hub,e.toHub?n.hub:n[e.node],e.toHub?nn:rn,e.toHub?rn:nn,f[e.node].value,f[e.node].color,u))}
    <circle cx=${n.hub.x} cy=${n.hub.y} r="46" fill="url(#hubg)"/>
    <circle cx=${n.hub.x} cy=${n.hub.y} r="9" fill="#fff" opacity=".9"/>
    ${m.map(t=>{let r=f[t],i=n[t],a=Math.abs(r.value)<K,o=i.labelDy<0;return k`<g class="flow-node" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${r.label} @click=${()=>e.onSelect?.(t)} @keydown=${n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),e.onSelect?.(t))}}>
        <circle cx=${i.x} cy=${i.y} r="42" fill="rgba(10,16,30,.9)" stroke=${r.color} stroke-width="2" filter=${a?`none`:`url(#glow)`}/>
        <g transform="translate(${i.x-13} ${i.y-13}) scale(1.08)" fill="none" stroke=${r.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${r.icon}/></g>
        <text class="node-val" x=${i.x} y=${i.y+i.labelDy} text-anchor="middle">${e.fmt.w(r.value)}</text>
        <text class="node-lbl" x=${i.x} y=${i.y+i.labelDy+(o?19:18)} text-anchor="middle">${r.label}</text>
      </g>`})}
    ${h.map(({c:t,p:n})=>{let r=t.mode===`included`?`var(--house)`:`var(--accent)`,i=t.missing||Math.abs(t.watts)<K;return k`<g class="flow-node" opacity=${i?.55:1} role="button" tabindex="0" aria-label=${t.name} @click=${()=>e.onSelect?.(t.id)} @keydown=${n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),e.onSelect?.(t.id))}}>
        <circle cx=${n.x} cy=${n.y} r="26" fill="rgba(10,16,30,.9)" stroke=${r} stroke-width="2" filter=${i?`none`:`url(#glow)`}/>
        <g transform="translate(${n.x-9} ${n.y-9}) scale(0.75)" fill="none" stroke=${r} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${$e[t.icon]}/></g>
        <text class="node-val-sm" x=${n.x} y=${n.y+n.labelDy} text-anchor="middle">${e.fmt.w(t.watts)}</text>
        <text class="node-lbl-sm" x=${n.x} y=${n.y+n.labelDy+14} text-anchor="middle">${pn(t.name)}</text>
      </g>`})}
  </svg>`}var _n=e=>{let t=e||`de`,n=(e,n=1)=>e===void 0||!Number.isFinite(e)?`–`:e.toLocaleString(t,{minimumFractionDigits:n,maximumFractionDigits:n});return{loc:t,n,w:e=>e===void 0||!Number.isFinite(e)?`–`:Math.abs(e)>=1e3?`${n(Math.abs(e)/1e3,1)} kW`:`${Math.round(Math.abs(e))} W`,time:e=>new Date(e).toLocaleTimeString(t,{hour:`2-digit`,minute:`2-digit`}),dayTime:e=>new Date(e).toLocaleString(t,{weekday:`short`,hour:`2-digit`,minute:`2-digit`})}},vn=[`today`,`balance`],yn=`e3dc-maestro.groups.v1`;function bn(e){return Array.isArray(e)?new Set(e.filter(e=>typeof e==`string`&&vn.includes(e))):new Set}function xn(){try{return bn(JSON.parse(localStorage.getItem(yn)??`null`))}catch{return new Set}}function Sn(e){try{localStorage.setItem(yn,JSON.stringify([...e]))}catch{}}function Cn(e,t,n,r){return e.callWS({type:`history/history_during_period`,start_time:new Date(n).toISOString(),end_time:new Date().toISOString(),entity_ids:t,include_start_time_state:!0,...r})}var wn=()=>{let e=new Date;return e.setHours(0,0,0,0),e.getTime()},Tn=[`costNet`,`saving`,`selfUse`,`chargedToday`,`costToday`,`feedRevenue`,`wear`,`balance`,`gridToBattery`,`wallboxEnergy`,`curtailAvoided`];function En(e){if(!e?.length)return;let t=!1,n=0;for(let r of e)typeof r.change==`number`&&Number.isFinite(r.change)&&(t=!0,n+=r.change);return t?n:void 0}var Dn=[`costNet`,`costToday`,`feedRevenue`,`wear`,`saving`,`selfUse`,`importToday`,`feedToday`,`chargedToday`,`dischargedToday`,`gridToBattery`,`wallboxEnergy`,`curtailAvoided`,`feedInAvoided`,`feedInInterventions`],On=e=>{let t=new Date;return e===`week`?t.setDate(t.getDate()-(t.getDay()+6)%7):t.setDate(1),t.setHours(0,0,0,0),t.getTime()};async function kn(e,t){let n=await e.callWS({type:`recorder/statistics_during_period`,start_time:new Date(On(t)).toISOString(),end_time:new Date().toISOString(),statistic_ids:Dn.map(e=>z[e]),period:`day`,types:[`change`]}),r={};for(let e of Dn){let t=En(n[z[e]]);t!==void 0&&(r[e]=t)}return r}async function An(e){let t=await Cn(e,Tn.map(e=>z[e]),wn(),{minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),n={};for(let e of Tn)n[e]=Bt(zt(Rt(t[z[e]])),18e5,`last`);return n}async function jn(e,t,n=1){return Bt(zt(Rt((await Cn(e,[t],Date.now()-864e5,{minimal_response:!0,no_attributes:!0,significant_changes_only:!1}))[t])).map(([e,t])=>[e,t*n]),3e5,`mean`)}async function Mn(e,t=6){let n=await Cn(e,[z.pv,z.house,z.soc],Date.now()-t*36e5,{minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),r=e=>Bt(zt(Rt(n[e])),3e5,`mean`);return{pv:r(z.pv),house:r(z.house),soc:r(z.soc)}}async function Nn(e){let t=await Cn(e,[z.lastAction],Date.now()-864e5,{minimal_response:!1,no_attributes:!1,significant_changes_only:!0}),n=e.states[z.lastAction]?.attributes.history;return Vt(Rt(t[z.lastAction]),n)}var Pn=new Map;function q(e,t,n){let r=Pn.get(e);if(r&&r.deps.length===t.length&&r.deps.every((e,n)=>Object.is(e,t[n])))return r.value;let i=n();return Pn.set(e,{deps:t,value:i}),i}var Fn={navLive:`Live`,navForecast:`Prognose`,navPlan:`Preisplan`,navDecision:`Entscheidung`,navControls:`Steuerung`,menu:`Menü`,subLive:`Energiefluss und Akku in Echtzeit`,subForecast:`Was Maestro für die nächsten 24 Stunden erwartet`,subPlan:`Netzladung nach dynamischem Tarif`,subDecision:`Warum Maestro gerade so regelt`,regulationOn:`Regelung aktiv`,regulationOff:`Regelung aus`,flowTitle:`Energiefluss`,flowSub:`Jetzt · aktualisiert live`,nodePv:`PV`,nodeHouse:`Haus`,nodeImport:`Netzbezug`,nodeFeed:`Einspeisung`,nodeBatDischarge:`Akku entlädt`,nodeBatCharge:`Akku lädt`,battery:`Akku`,stateOfCharge:`Ladezustand`,targetSoc:`Ziel-SoC`,autonomy:`Autonomie`,discharging:`Entladung`,charging:`Ladung`,chipReachable:`E3DC erreichbar`,chipChargeLock:`Ladesperre`,chipDischargeLock:`Entladesperre`,chipHt:`HT-Schutz`,chipCurtail:`Abregelschutz`,chipEmergency:`Notladung`,chipFeedIn:`Einspeisedrosselung`,chipGridCharge:`Netzladung`,chipBatteryPriority:`Akku-Priorität`,chipLowYield:`Schwacher PV-Tag`,chipPredictive:`Vorausschauende Ladung`,chipShadow:`Preisplan · Schatten`,groupToday:`Heute`,groupWeek:`Woche`,groupMonth:`Monat`,groupNet:`netto`,periodToday:`Heute`,periodWeek:`Woche`,periodMonth:`Monat`,forceTitle:`Erzwungene Entladung`,fixedReserve:`Notstromreserve`,ctrlReserveSoc:`{v} %`,exportCsv:`CSV`,actionsTitle:`Aktionen`,btnClear:`Limits freigeben`,btnClearSub:`Hebt Lade- und Entladegrenzen sofort auf und setzt den Wechselrichter auf Normal.`,btnCharge:`Manuell laden (3 kWh)`,confirmCharge:`3 kWh aus dem Netz laden?`,selWallbox:`Wallbox-Typ`,selMorning:`Vorentladung`,selAuto:`Auto-Ziel`,selTariff:`Tarif`,debugTitle:`Debug-Log`,debugEmpty:`Noch keine Debug-Zeilen. Der Schalter startet das Logging.`,debugSwitch:`Debug-Logging`,balanceTitle:`Tagesbilanz`,balanceWeek:`Wochenbilanz`,balanceMonth:`Monatsbilanz`,whenToday:`heute`,whenWeek:`diese Woche`,whenMonth:`diesen Monat`,kpiCostGross:`Stromkosten`,kpiCostGrossSub:`Netzbezug brutto`,kpiRevenue:`Einspeise-Erlös`,kpiRevenueSub:`Vergütung {when}`,kpiWear:`Akku-Verschleiß`,kpiWearSub:`anteilige Zyklenkosten`,kpiBalance:`Energiebilanz`,kpiBalanceSub:`Erlös + Ersparnis − Kosten − Verschleiß`,kpiGridBat:`Netz → Akku`,kpiGridBatSub:`aus dem Netz geladen`,kpiGridBatWarn:`Netzladung ohne Rechtfertigung`,kpiWallbox:`Wallbox {when}`,kpiWallboxSub:`geladene Energie`,kpiFeedLimit:`Einspeisebegrenzung`,kpiFeedLimitSub:`{n} Eingriffe · {dc} kWh DC-Abregelung`,kpiCost:`Stromkosten {when}`,kpiCostSub:`netto nach Einspeisung`,kpiSaving:`PV-Ersparnis {when}`,kpiSavingSub:`gegenüber reinem Netzbezug`,kpiSelf:`Eigenverbrauch {when}`,kpiSelfSub:`Netzbezug {imp} kWh · Einspeisung {feed} kWh`,kpiBattery:`Akku {when}`,kpiBatterySub:`geladen · {out} kWh entladen`,chartTitle:`SoC-Trajektorie & Leistungen · nächste 24 h`,legendSoc:`SoC`,legendPv:`PV`,legendHouse:`Haus`,legendImport:`Netzbezug`,legendFeed:`Einspeisung`,legendActual:`Ist`,actualOverlay:`Ist-Verlauf`,now:`Jetzt`,targetLabel:`Ziel-SoC {v}%`,hoursShort:`{h} h`,statMinMax:`SoC Min / Max`,statImport:`Netzbezug`,statFeed:`Einspeisung`,statAutarky:`Autarkie`,statPvTomorrow:`PV morgen`,statP10:`PV-Rest (P10)`,statDeficit:`Defizit morgen`,statYield:`PV-Tag`,statYieldSub:`{today} / {ref} kWh Referenz`,qualityLabel:`Datenqualität`,qualityOk:`vollständig`,qualityPv:`PV-Profil fehlt`,qualityConsumption:`Verbrauchsprofil fehlt`,qualityBoth:`Profile fehlen`,qualityUnknown:`unbekannt`,reserveTitle:`Ziel-SoC`,reserveSeasonal:`Notstromreserve`,reserveAdaptive:`Reserve adaptiv`,reserveHt:`HT-Reserve`,reserveForward:`Vorausschau`,windowsTitle:`Ladefenster`,windowAstro:`Astro-Start`,windowSeasonalEnd:`Saison-Ende`,windowPvDelay:`PV-Verzögerung`,windowTomorrow:`Morgen`,autoTitle:`Auto-Strategie`,autoSaving:`Geschätzte Einsparung`,alertUnreachable:`E3DC ist nicht erreichbar`,alertChargeLock:`Ladesperre aktiv`,alertDischargeLock:`Entladesperre aktiv`,alertUnjustified:`Netzladung ohne Rechtfertigung`,noForecast:`Noch keine Prognose verfügbar. Maestro braucht mindestens 7 Tage Verlauf.`,priceTitle:`Strompreis & geplanter SoC`,legendCharge:`Netzladung`,legendHold:`Akku halten`,legendRelease:`Akku frei`,legendPlanSoc:`SoC geplant`,planShadow:`Schattenmodus · steuert nicht`,planActive:`Aktiv · steuert den Akku`,planTitle:`Plan`,planGridCharge:`Netzladung geplant`,planSaving:`Erwartete Ersparnis`,planCheapest:`Günstigster Slot`,planMostExpensive:`Teuerster Slot`,planKnownUntil:`Preise bekannt bis`,noPlan:`Es liegt kein Preisplan vor. Er braucht einen dynamischen Tarif.`,slotPrice:`Preis`,slotSoc:`SoC`,slotConsumption:`Verbrauch`,slotCharge:`Netzladung {kwh} kWh`,slotHold:`Akku halten`,slotRelease:`Akku frei`,decisionPhase:`Aktuelle Regelphase`,tagTargetSoc:`Ziel-SoC {v} %`,tagTargetPower:`Ziel-Ladeleistung {v}`,tagBatteryPriority:`Akku-Priorität`,tagSince:`seit {t}`,limitsTitle:`Limits · Soll vs. gesendet`,limitsSub:`Was Maestro will und was am E3DC ankommt`,limitCharge:`Ladelimit`,limitDischarge:`Entladelimit`,limitTarget:`Soll {a} · gesendet {b}`,limitNone:`kein Limit`,entitiesMissing:`Nicht verfügbar: {list}. Diese Maestro-Entities fehlen oder sind deaktiviert – bitte unter Einstellungen › Entitäten prüfen.`,entityDisabled:`deaktiviert`,notSetUp:`E3DC Maestro ist nicht eingerichtet oder noch nicht gestartet.`,limitSoc:`aktuell {a} % → {b} %`,timelineTitle:`Verlauf der Entscheidungen`,timelineEmpty:`Noch keine Entscheidungen aufgezeichnet.`,noDecision:`Noch keine Entscheidung vorhanden.`,controlsTitle:`Schnellsteuerung`,controlsSub:`Wirkt sofort auf die Regelung`,close:`Schließen`,historySub:`Letzte 24 Stunden`,historyEmpty:`Keine Verlaufsdaten in den letzten 24 Stunden.`,historyFailed:`Der Verlauf konnte nicht geladen werden.`,ctrlActive:`Regelung aktiv`,ctrlActiveSub:`Maestro steuert die Lade- und Entladelimits`,ctrlPredictive:`Vorausschauende Ladung`,ctrlPredictiveSub:`Ladeziel aus Prognose und Verbrauch`,ctrlPvDelay:`PV-Prognose-Verzögerung`,ctrlPvDelaySub:`Ladestart verschieben, wenn PV reicht`,ctrlPlanControls:`Preisplan steuert Akku`,ctrlPlanControlsSub:`Aus = nur Schattenmodus`,ctrlPlanShadow:`Preisplan Schattenmodus`,ctrlPlanShadowSub:`Plan berechnen, aber nichts senden`,ctrlForce:`Erzwungene Entladung`,ctrlForcePower:`Leistung {v}`,allSettings:`Alle Einstellungen öffnen →`,displayTitle:`Anzeige`,consumersSub:`Verbraucher im Energiefluss der Live-Ansicht`,addConsumer:`Verbraucher hinzufügen`,consumerSearch:`Leistungssensor suchen`,consumerName:`Name im Energiefluss`,consumerIcon:`Symbol`,iconWallbox:`Wallbox`,iconHeater:`Heizstab`,iconClimate:`Klimaanlage`,iconHeatpump:`Wärmepumpe`,iconMeter:`Leistungsmesser`,modeIncluded:`Im Hausverbrauch`,modeSeparate:`Separat gemessen`,useWallbox:`Wallbox übernehmen`,removeConsumer:`Entfernen`,editConsumers:`Verbraucher bearbeiten`,consumersEmpty:`Noch keine Verbraucher. Wallbox, Wärmepumpe und weitere Lasten kannst du hier ergänzen.`,consumersOverflow:`Die enthaltenen Verbraucher liegen über der Hausleistung. Prüfe, ob sie wirklich im Hauszähler stecken.`,noPowerSensors:`Keine passenden Leistungssensoren gefunden.`,consumerMissing:`Sensor nicht verfügbar`,unavailable:`nicht verfügbar`,callFailed:`Aktion fehlgeschlagen: {err}`,chartError:`Chart konnte nicht geladen werden: {err}`,loading:`Lädt …`,demoHint:`Keine Daten`},In={navLive:`Live`,navForecast:`Forecast`,navPlan:`Price plan`,navDecision:`Decision`,navControls:`Controls`,menu:`Menu`,subLive:`Energy flow and battery in real time`,subForecast:`What Maestro expects for the next 24 hours`,subPlan:`Grid charging by dynamic tariff`,subDecision:`Why Maestro regulates the way it does`,regulationOn:`Regulation active`,regulationOff:`Regulation off`,flowTitle:`Energy flow`,flowSub:`Now · live`,nodePv:`PV`,nodeHouse:`House`,nodeImport:`Grid import`,nodeFeed:`Feed-in`,nodeBatDischarge:`Battery discharging`,nodeBatCharge:`Battery charging`,battery:`Battery`,stateOfCharge:`State of charge`,targetSoc:`Target SoC`,autonomy:`Autonomy`,discharging:`Discharging`,charging:`Charging`,chipReachable:`E3DC reachable`,chipChargeLock:`Charge lock`,chipDischargeLock:`Discharge lock`,chipHt:`HT protection`,chipCurtail:`Curtailment guard`,chipEmergency:`Emergency charge`,chipFeedIn:`Feed-in curtailment`,chipGridCharge:`Grid charge`,chipBatteryPriority:`Battery priority`,chipLowYield:`Low-yield day`,chipPredictive:`Predictive charging`,chipShadow:`Price plan · shadow`,groupToday:`Today`,groupWeek:`Week`,groupMonth:`Month`,groupNet:`net`,periodToday:`Today`,periodWeek:`Week`,periodMonth:`Month`,forceTitle:`Forced discharge`,fixedReserve:`Emergency reserve`,ctrlReserveSoc:`{v}%`,exportCsv:`CSV`,actionsTitle:`Actions`,btnClear:`Release limits`,btnClearSub:`Clears charge and discharge limits immediately and sets the inverter to normal.`,btnCharge:`Manual charge (3 kWh)`,confirmCharge:`Charge 3 kWh from the grid?`,selWallbox:`Wallbox type`,selMorning:`Pre-discharge`,selAuto:`Auto objective`,selTariff:`Tariff`,debugTitle:`Debug log`,debugEmpty:`No debug lines yet. The switch starts logging.`,debugSwitch:`Debug logging`,balanceTitle:`Daily balance`,balanceWeek:`Weekly balance`,balanceMonth:`Monthly balance`,whenToday:`today`,whenWeek:`this week`,whenMonth:`this month`,kpiCostGross:`Electricity cost`,kpiCostGrossSub:`grid import, gross`,kpiRevenue:`Feed-in revenue`,kpiRevenueSub:`remuneration {when}`,kpiWear:`Battery wear`,kpiWearSub:`share of cycle cost`,kpiBalance:`Energy balance`,kpiBalanceSub:`revenue + savings − cost − wear`,kpiGridBat:`Grid → battery`,kpiGridBatSub:`charged from the grid`,kpiGridBatWarn:`Grid charge without justification`,kpiWallbox:`Wallbox {when}`,kpiWallboxSub:`energy charged`,kpiFeedLimit:`Feed-in limit`,kpiFeedLimitSub:`{n} interventions · {dc} kWh DC curtailment`,kpiCost:`Electricity cost {when}`,kpiCostSub:`net of feed-in`,kpiSaving:`PV savings {when}`,kpiSavingSub:`vs. grid-only supply`,kpiSelf:`Self-consumption {when}`,kpiSelfSub:`Import {imp} kWh · feed-in {feed} kWh`,kpiBattery:`Battery {when}`,kpiBatterySub:`charged · {out} kWh discharged`,chartTitle:`SoC trajectory & power · next 24 h`,legendSoc:`SoC`,legendPv:`PV`,legendHouse:`House`,legendImport:`Import`,legendFeed:`Feed-in`,legendActual:`Actual`,actualOverlay:`Actuals`,now:`Now`,targetLabel:`Target SoC {v}%`,hoursShort:`{h} h`,statMinMax:`SoC min / max`,statImport:`Grid import`,statFeed:`Feed-in`,statAutarky:`Self-sufficiency`,statPvTomorrow:`PV tomorrow`,statP10:`PV remaining (P10)`,statDeficit:`Deficit tomorrow`,statYield:`PV day`,statYieldSub:`{today} / {ref} kWh reference`,qualityLabel:`Data quality`,qualityOk:`complete`,qualityPv:`PV profile missing`,qualityConsumption:`Consumption profile missing`,qualityBoth:`Profiles missing`,qualityUnknown:`unknown`,reserveTitle:`Target SoC`,reserveSeasonal:`Emergency reserve`,reserveAdaptive:`Reserve, adaptive`,reserveHt:`HT reserve`,reserveForward:`Look-ahead`,windowsTitle:`Charge window`,windowAstro:`Astro start`,windowSeasonalEnd:`Season end`,windowPvDelay:`PV delay`,windowTomorrow:`Tomorrow`,autoTitle:`Auto strategy`,autoSaving:`Estimated saving`,alertUnreachable:`E3DC is not reachable`,alertChargeLock:`Charge lock active`,alertDischargeLock:`Discharge lock active`,alertUnjustified:`Grid charge without justification`,noForecast:`No forecast yet. Maestro needs at least 7 days of history.`,priceTitle:`Electricity price & planned SoC`,legendCharge:`Grid charge`,legendHold:`Hold battery`,legendRelease:`Battery free`,legendPlanSoc:`Planned SoC`,planShadow:`Shadow mode · not controlling`,planActive:`Active · controls the battery`,planTitle:`Plan`,planGridCharge:`Planned grid charging`,planSaving:`Expected saving`,planCheapest:`Cheapest slot`,planMostExpensive:`Most expensive slot`,planKnownUntil:`Prices known until`,noPlan:`There is no price plan. It needs a dynamic tariff.`,slotPrice:`Price`,slotSoc:`SoC`,slotConsumption:`Consumption`,slotCharge:`Grid charge {kwh} kWh`,slotHold:`Hold battery`,slotRelease:`Battery free`,decisionPhase:`Current control phase`,tagTargetSoc:`Target SoC {v} %`,tagTargetPower:`Target charge power {v}`,tagBatteryPriority:`Battery priority`,tagSince:`since {t}`,limitsTitle:`Limits · target vs. sent`,limitsSub:`What Maestro wants and what reaches the E3DC`,limitCharge:`Charge limit`,limitDischarge:`Discharge limit`,limitTarget:`Target {a} · sent {b}`,limitNone:`no limit`,entitiesMissing:`Not available: {list}. These Maestro entities are missing or disabled – please check Settings › Entities.`,entityDisabled:`disabled`,notSetUp:`E3DC Maestro is not set up or has not started yet.`,limitSoc:`now {a} % → {b} %`,timelineTitle:`Decision history`,timelineEmpty:`No decisions recorded yet.`,noDecision:`No decision available yet.`,controlsTitle:`Quick controls`,controlsSub:`Takes effect immediately`,close:`Close`,historySub:`Last 24 hours`,historyEmpty:`No history for the last 24 hours.`,historyFailed:`The history could not be loaded.`,ctrlActive:`Regulation active`,ctrlActiveSub:`Maestro controls charge and discharge limits`,ctrlPredictive:`Predictive charging`,ctrlPredictiveSub:`Charge target from forecast and consumption`,ctrlPvDelay:`PV forecast delay`,ctrlPvDelaySub:`Postpone charging when PV is enough`,ctrlPlanControls:`Price plan controls battery`,ctrlPlanControlsSub:`Off = shadow mode only`,ctrlPlanShadow:`Price plan shadow mode`,ctrlPlanShadowSub:`Compute the plan but send nothing`,ctrlForce:`Forced discharge`,ctrlForcePower:`Power {v}`,allSettings:`Open all settings →`,displayTitle:`Display`,consumersSub:`Consumers in the live energy flow`,addConsumer:`Add consumer`,consumerSearch:`Search power sensors`,consumerName:`Name in the energy flow`,consumerIcon:`Icon`,iconWallbox:`Wallbox`,iconHeater:`Heating rod`,iconClimate:`Air conditioning`,iconHeatpump:`Heat pump`,iconMeter:`Power meter`,modeIncluded:`In house load`,modeSeparate:`Measured separately`,useWallbox:`Add wallbox`,removeConsumer:`Remove`,editConsumers:`Edit consumers`,consumersEmpty:`No consumers yet. Add a wallbox, heat pump or other loads here.`,consumersOverflow:`Included consumers exceed the house load. Check whether they are really part of the house meter.`,noPowerSensors:`No matching power sensors found.`,consumerMissing:`Sensor unavailable`,unavailable:`unavailable`,callFailed:`Action failed: {err}`,chartError:`Chart failed to load: {err}`,loading:`Loading …`,demoHint:`No data`},Ln={e3dc:`E3DC`,generic:`Generisch`,off:`Aus`,passive:`Passiv`,active_house:`Aktiv Haus`,active_grid:`Aktiv Netz`,self_consumption:`Eigenverbrauch`,cost:`Kosten`,co2:`CO₂`,fixed:`Fest`,dynamic:`Dynamisch`},Rn={e3dc:`E3DC`,generic:`Generic`,off:`Off`,passive:`Passive`,active_house:`Active, house`,active_grid:`Active, grid`,self_consumption:`Self-consumption`,cost:`Cost`,co2:`CO₂`,fixed:`Fixed`,dynamic:`Dynamic`},zn={off:`Aus`,manual:`Manuell`,emergency:`Notladung`,feed_in_limit:`Einspeisebegrenzung`,reserve_protection:`Reserveschutz`,evcc_pause:`EVCC-Pause`,ht_protection:`HT-Schutz`,force_discharge:`Erzwungene Entladung`,morning_discharge:`Morgen-Entladung`,astro_wait:`Astro-Wartezeit`,morning_cap:`Morgen-Deckel`,hard_soc_limit:`SoC-Deckel`,fast_floor:`Schnell-Boden`,grid_charge:`Netzladung`,grid_hold:`Akku halten`,corridor:`Ladekorridor`,pv_delay:`PV-Verzögerung`,spreading:`Spreading`,curtailment_guard:`Abregelschutz`,idle:`Leerlauf`},Bn={off:`Off`,manual:`Manual`,emergency:`Emergency charge`,feed_in_limit:`Feed-in limit`,reserve_protection:`Reserve protection`,evcc_pause:`EVCC pause`,ht_protection:`HT protection`,force_discharge:`Forced discharge`,morning_discharge:`Morning discharge`,astro_wait:`Astro wait`,morning_cap:`Morning cap`,hard_soc_limit:`SoC cap`,fast_floor:`Fast floor`,grid_charge:`Grid charge`,grid_hold:`Hold battery`,corridor:`Charge corridor`,pv_delay:`PV delay`,spreading:`Spreading`,curtailment_guard:`Curtailment guard`,idle:`Idle`};function Vn(e){let t=!e||e.toLowerCase().startsWith(`de`),n=t?Fn:In,r=t?zn:Bn,i=t?Ln:Rn;return{t:(e,t)=>{let r=n[e];if(t)for(let[e,n]of Object.entries(t))r=r.replace(`{${e}}`,String(n));return r},phase:e=>r[e]??e,option:e=>i[e]??e}}var Hn=o`
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
    --ok: #34d399;
    --warn: #fbbf24;
    --radius: 20px;
    --radius-sm: 12px;
    display: block;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    color: var(--text);
    font-family: Inter, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    background:
      radial-gradient(1200px 600px at 10% -10%, rgba(56, 189, 248, 0.14), transparent 60%),
      radial-gradient(900px 500px at 100% 0%, rgba(129, 140, 248, 0.14), transparent 60%),
      radial-gradient(800px 600px at 50% 120%, rgba(34, 211, 238, 0.08), transparent 60%), var(--bg);
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
    min-height: 100%;
  }

  /* Navigation */
  .rail {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 20px 0;
    border-right: 1px solid var(--stroke);
    background: rgba(7, 11, 20, 0.55);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  .logo {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    margin-bottom: 18px;
    background: conic-gradient(from 200deg, var(--accent), var(--accent-2), var(--bat), var(--accent));
    display: grid;
    place-items: center;
    box-shadow: 0 8px 30px rgba(56, 189, 248, 0.35);
  }
  .logo svg {
    width: 24px;
    height: 24px;
  }
  .nav-btn {
    width: 60px;
    padding: 10px 0 8px;
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
  .spacer {
    flex: 1;
  }

  main {
    padding: max(22px, env(safe-area-inset-top)) 28px 40px;
    max-width: 1480px;
    width: 100%;
    min-width: 0;
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
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04));
    color: var(--text);
    font: 600 13px Inter, system-ui, sans-serif;
  }
  .btn:hover {
    border-color: rgba(56, 189, 248, 0.6);
  }
  .btn svg {
    width: 16px;
    height: 16px;
  }

  .card {
    position: relative;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.025));
    border: 1px solid var(--stroke);
    border-radius: var(--radius);
    padding: 20px;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.05) inset,
      0 20px 50px rgba(0, 0, 0, 0.25);
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
    background: rgba(255, 255, 255, 0.04);
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
    border-color: rgba(56, 189, 248, 0.6);
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
    background: rgba(255, 255, 255, 0.03);
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
    background: rgba(255, 255, 255, 0.03);
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
    .group-head svg {
      transition: none;
    }
  }
  .kpis {
    grid-template-columns: repeat(4, 1fr);
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
    background: rgba(255, 255, 255, 0.04);
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
    background: rgba(255, 255, 255, 0.04);
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
    background: rgba(255, 255, 255, 0.05);
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
    background: radial-gradient(circle, rgba(56, 189, 248, 0.28), transparent 65%);
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
    background: rgba(255, 255, 255, 0.06);
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
    background: rgba(3, 6, 12, 0.55);
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
    background: linear-gradient(180deg, rgba(20, 28, 48, 0.94), rgba(12, 18, 32, 0.97));
    border: 1px solid var(--stroke-strong);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
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
    background: linear-gradient(180deg, rgba(20, 28, 48, 0.97), rgba(12, 18, 32, 0.98));
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
    background: rgba(255, 255, 255, 0.035);
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
  .switch {
    width: 46px;
    height: 28px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.12);
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
    background: rgba(255, 255, 255, 0.035);
    border: 1px solid var(--stroke);
    margin-top: 10px;
  }
  .consumer input,
  .picker input {
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid var(--stroke-strong);
    background: rgba(0, 0, 0, 0.25);
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
    border-color: rgba(56, 189, 248, 0.7);
    background: rgba(56, 189, 248, 0.16);
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
    background: rgba(0, 0, 0, 0.25);
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
    background: rgba(56, 189, 248, 0.18);
    color: var(--text);
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
    background: rgba(255, 255, 255, 0.04);
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
  .apexcharts-tooltip.apexcharts-theme-dark {
    background: rgba(14, 20, 36, 0.95) !important;
    border: 1px solid var(--stroke-strong) !important;
    border-radius: 12px !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4) !important;
  }
  .apexcharts-tooltip-title {
    background: transparent !important;
    border-bottom: 1px solid var(--stroke) !important;
  }
  .apexcharts-xaxistooltip {
    background: rgba(14, 20, 36, 0.95) !important;
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
      background: rgba(7, 11, 20, 0.88);
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
    .stat-row,
    .dec-extra {
      grid-template-columns: repeat(2, 1fr);
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
`;function Un(e){return/[",\n\r]/.test(e)?`"${e.replace(/"/g,`""`)}"`:e}function Wn(e){return e.map(e=>e.map(Un).join(`,`)).join(`
`)}function Gn(e,t){let n=new Blob([`\uFEFF${Wn(t)}`],{type:`text/csv;charset=utf-8`}),r=document.createElement(`a`);r.href=URL.createObjectURL(n),r.download=e,r.click(),URL.revokeObjectURL(r.href)}var J=e=>!e||e.state===`unknown`||e.state===`unavailable`?`–`:e.state,Y=(e,t)=>e.hass.states[t],Kn=(e,t)=>Y(e,t)?.attributes??{},X=e=>typeof e==`number`&&Number.isFinite(e)?e:void 0,Z=(e,t)=>O`${e}<small>${t}</small>`,Q=(e,t)=>O`<div class="row"><span>${e}</span><b>${t}</b></div>`,qn=e=>[[`time`,`soc_pct`,`pv_w`,`house_w`,`grid_w`,`phase`],...e.trajectory_points.map((t,n)=>[new Date(t[0]).toISOString(),String(t[1]),String(e.pv_points[n]?.[1]??``),String(e.house_points[n]?.[1]??``),String(e.grid_points[n]?.[1]??``),e.trajectory_phases[n]??``])],Jn=e=>[[`time`,`phase`,`reason`],...(e.timeline??[]).map(e=>[new Date(e.ts).toISOString(),e.phase,e.reason])],Yn=e=>V(Y(e,z.debug)),Xn=e=>{let t=Y(e,z.debugLog)?.state;return!t||t===`unknown`||t===`unavailable`?e.i18n.t(`debugEmpty`):t};function Zn(e){let{t}=e.i18n,n=B(Y(e,z.soc)),r=B(Y(e,z.targetSoc)),i=B(Y(e,z.battery)),a=t=>V(Y(e,t)),o=[[t(`chipReachable`),a(z.reachable),`on`],[t(`chipChargeLock`),a(z.chargeLock),`warn`],[t(`chipDischargeLock`),a(z.dischargeLock),`warn`],[t(`chipHt`),a(z.htProtect),`warn`],[t(`chipCurtail`),a(z.curtail),`warn`],[t(`chipEmergency`),a(z.emergency),`warn`],[t(`chipFeedIn`),a(z.feedInLimit),`warn`],[t(`chipGridCharge`),a(z.gridCharge),`on`],[t(`chipBatteryPriority`),a(z.batteryPriority),`warn`],[t(`chipLowYield`),a(z.lowYield),`warn`],[t(`chipPredictive`),a(z.ctrlPredictive),`on`],[t(`chipShadow`),a(z.ctrlPlanShadow),`on`]],s=(t,n)=>e.period!==`today`||!e.sparks?.[t]?.length?j:O`<maestro-chart class="spark" .options=${q(`spark-${t}`,[e.sparks[t]],()=>$t(e.sparks[t],n))}></maestro-chart>`,c=hn(e.mobile,e.consumers.length),l=t=>e.period===`today`?B(Y(e,z[t])):e.periodSums?.[t],u=[l(`feedRevenue`),l(`saving`),l(`costToday`),l(`wear`)],d=e.period===`today`?B(Y(e,z.balance)):u.some(e=>e===void 0)?void 0:u[0]+u[1]-u[2]-u[3],f=t=>`${e.fmt.n(t,2)} €`,p=t(e.period===`today`?`whenToday`:e.period===`week`?`whenWeek`:`whenMonth`),m=t(e.period===`today`?`groupToday`:e.period===`week`?`groupWeek`:`groupMonth`),h=t(e.period===`today`?`balanceTitle`:e.period===`week`?`balanceWeek`:`balanceMonth`),ee=d===void 0||d===0?``:d>0?`pos`:`neg`,g=Y(e,z.forceDischargePower),_=g?.attributes??{},v=typeof _.min==`number`?_.min:100,te=typeof _.max==`number`?_.max:1e4,ne=typeof _.step==`number`?_.step:100,re=e.forcePowerDraft??B(g)??v,y=Y(e,z.fixedReserveSoc),b=y?.attributes??{},ie=typeof b.min==`number`?b.min:0,ae=typeof b.max==`number`?b.max:100,oe=typeof b.step==`number`?b.step:1,x=e.reserveDraft??B(y)??ie,S=(t,n,r,i)=>{let a=!e.collapsed.has(t);return O`<section class="group">
      <button type="button" class="group-head ${a?`open`:``}" aria-expanded=${a} @click=${()=>e.onToggleGroup(t)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        <span>${n}</span>
        ${a?j:r}
      </button>
      ${a?O`<div class="grid kpis">${i}</div>`:j}
    </section>`};return O`
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
        <div class="flow-wrap" style=${c?`height:${c}px`:j}>
          ${gn({pv:B(Y(e,z.pv)),house:B(Y(e,z.house)),grid:B(Y(e,z.grid)),battery:i,consumers:e.consumers,motion:e.motion,onSelect:e.onFlowNode,compact:e.mobile,fmt:e.fmt,i18n:e.i18n})}
        </div>
        ${e.consumerOverflow?O`<p class="err">${t(`consumersOverflow`)}</p>`:j}
      </div>
      <div class="card soc-card">
        <h3 class="self-start">${t(`battery`)}</h3>
        ${n===void 0?O`<p class="empty">${t(`unavailable`)}</p>`:O`<maestro-chart class="ring" .options=${q(`ring`,[n,e.fmt.loc],()=>Zt(n,t(`stateOfCharge`)))}></maestro-chart>`}
        <div class="soc-meta">
          <div class="meta"><b>${r===void 0?`–`:`${Math.round(r)}%`}</b><span>${t(`targetSoc`)}</span></div>
          <div class="meta"><b>${J(Y(e,z.autonomy))}</b><span>${t(`autonomy`)}</span></div>
          <div class="meta"><b>${e.fmt.w(i)}</b><span>${t(i!==void 0&&i<0?`discharging`:`charging`)}</span></div>
        </div>
      </div>
    </div>
    <div class="chips">
      ${o.map(([e,t,n])=>O`<span class="chip ${t?n:``}"><i></i>${e}</span>`)}
    </div>
    <div class="card force">
      <div class="txt"><b>${t(`forceTitle`)}</b><span>${t(`ctrlForcePower`,{v:e.fmt.w(re)})}</span></div>
      <button
        class="switch ${a(z.forceDischarge)?`on`:``}"
        role="switch"
        aria-checked=${a(z.forceDischarge)}
        aria-label=${t(`forceTitle`)}
        ?disabled=${!Y(e,z.forceDischarge)||e.pending.has(z.forceDischarge)}
        @click=${()=>e.onToggle(z.forceDischarge)}
      ></button>
      <input
        type="range"
        min=${v}
        max=${te}
        step=${ne}
        .value=${String(re)}
        aria-label=${t(`ctrlForcePower`,{v:``})}
        ?disabled=${!g||g.state===`unavailable`}
        @input=${t=>e.onPowerDraft(Number(t.target.value))}
        @change=${t=>e.onPowerCommit(Number(t.target.value))}
      />
    </div>
    <div class="card force">
      <div class="txt"><b>${t(`fixedReserve`)}</b><span>${t(`ctrlReserveSoc`,{v:Math.round(x)})}</span></div>
      <button
        class="switch ${a(z.fixedReserve)?`on`:``}"
        role="switch"
        aria-checked=${a(z.fixedReserve)}
        aria-label=${t(`fixedReserve`)}
        ?disabled=${!Y(e,z.fixedReserve)||e.pending.has(z.fixedReserve)}
        @click=${()=>e.onToggle(z.fixedReserve)}
      ></button>
      <input
        type="range"
        min=${ie}
        max=${ae}
        step=${oe}
        .value=${String(x)}
        aria-label=${t(`fixedReserve`)}
        ?disabled=${!y||y.state===`unavailable`}
        @input=${t=>e.onReserveDraft(Number(t.target.value))}
        @change=${t=>e.onReserveCommit(Number(t.target.value))}
      />
    </div>
    <div class="seg period" role="group" aria-label=${t(`periodToday`)}>
      ${[`today`,`week`,`month`].map(n=>O`<button class=${e.period===n?`active`:``} aria-pressed=${e.period===n} @click=${()=>e.onPeriod(n)}>${t(n===`today`?`periodToday`:n===`week`?`periodWeek`:`periodMonth`)}</button>`)}
    </div>
    ${S(`today`,m,O`<b class="group-sum">${f(l(`costNet`))}<small>${t(`groupNet`)}</small></b>`,O`
      <div class="card kpi">
        <h3>${t(`kpiCost`,{when:p})}</h3>
        <div class="v">${Z(e.fmt.n(l(`costNet`),2),`€`)}</div>
        <div class="delta">${t(`kpiCostSub`)}</div>
        ${s(`costNet`,W.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiSaving`,{when:p})}</h3>
        <div class="v">${Z(e.fmt.n(l(`saving`),2),`€`)}</div>
        <div class="delta">${t(`kpiSavingSub`)}</div>
        ${s(`saving`,W.gridOut)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiSelf`,{when:p})}</h3>
        <div class="v">${Z(e.fmt.n(l(`selfUse`)),`kWh`)}</div>
        <div class="delta">${t(`kpiSelfSub`,{imp:e.fmt.n(l(`importToday`)),feed:e.fmt.n(l(`feedToday`))})}</div>
        ${s(`selfUse`,W.pv)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiBattery`,{when:p})}</h3>
        <div class="v">${Z(e.fmt.n(l(`chargedToday`)),`kWh`)}</div>
        <div class="delta">${t(`kpiBatterySub`,{out:e.fmt.n(l(`dischargedToday`))})}</div>
        ${s(`chargedToday`,W.bat)}
      </div>
    `)}
    ${S(`balance`,h,O`<b class="group-sum ${ee}">${f(d)}</b>`,O`
      <div class="card kpi">
        <h3>${t(`kpiCostGross`)}</h3>
        <div class="v">${Z(e.fmt.n(l(`costToday`),2),`€`)}</div>
        <div class="delta">${t(`kpiCostGrossSub`)}</div>
        ${s(`costToday`,W.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiRevenue`)}</h3>
        <div class="v">${Z(e.fmt.n(l(`feedRevenue`),2),`€`)}</div>
        <div class="delta">${t(`kpiRevenueSub`,{when:p})}</div>
        ${s(`feedRevenue`,W.gridOut)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiWear`)}</h3>
        <div class="v">${Z(e.fmt.n(l(`wear`),2),`€`)}</div>
        <div class="delta">${t(`kpiWearSub`)}</div>
        ${s(`wear`,W.accent2)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiBalance`)}</h3>
        <div class="v">${Z(e.fmt.n(d,2),`€`)}</div>
        <div class="delta">${t(`kpiBalanceSub`)}</div>
        ${s(`balance`,W.accent)}
      </div>
      <div class="card kpi ${a(z.unjustified)?`alert`:``}">
        <h3>${t(`kpiGridBat`)}</h3>
        <div class="v">${Z(e.fmt.n(l(`gridToBattery`)),`kWh`)}</div>
        <div class="delta">${a(z.unjustified)?t(`kpiGridBatWarn`):t(`kpiGridBatSub`)}</div>
        ${s(`gridToBattery`,W.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiWallbox`,{when:p})}</h3>
        <div class="v">${Z(e.fmt.n(l(`wallboxEnergy`)),`kWh`)}</div>
        <div class="delta">${t(`kpiWallboxSub`)}</div>
        ${s(`wallboxEnergy`,W.house)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiFeedLimit`)}</h3>
        <div class="v">${Z(e.fmt.n(l(`curtailAvoided`)),`kWh`)}</div>
        <div class="delta">${t(`kpiFeedLimitSub`,{n:e.fmt.n(l(`feedInInterventions`),0),dc:e.fmt.n(l(`feedInAvoided`))})}</div>
        ${s(`curtailAvoided`,W.pv)}
      </div>
    `)}`}var Qn=(e,t)=>e(t===`ok`?`qualityOk`:t===`pv_fallback`?`qualityPv`:t===`consumption_fallback`?`qualityConsumption`:t===`both_fallback`?`qualityBoth`:`qualityUnknown`),$=(e,t)=>{let n=B(Y(e,t));return n===void 0?`–`:`${Math.round(n)} %`};function $n(e){let{t}=e.i18n,n=Kn(e,z.trajectory),r=jt(n);if(!r)return O`<div class="card"><p class="empty">${t(`noForecast`)}</p></div>`;let i=[[W.bat,t(`legendSoc`)],[W.pv,t(`legendPv`)],[W.house,t(`legendHouse`)],[W.gridIn,t(`legendImport`)],[W.gridOut,t(`legendFeed`)]],a=(e,t)=>O`<div class="card stat"><h3>${e}</h3><div class="v">${t}</div></div>`;return O`
    <div class="card">
      <div class="chart-head">
        <div class="grow">
          <h3>${t(`chartTitle`)}</h3>
          <div class="legend">${i.map(([e,t])=>O`<span><i style="background:${e}"></i>${t}</span>`)}</div>
        </div>
        <button class="toggle ${e.showIst?`active`:``}" aria-pressed=${e.showIst} @click=${e.onToggleIst}>${t(`actualOverlay`)}</button>
        <button class="toggle" @click=${()=>Gn(`maestro-prognose.csv`,qn(r))}>${t(`exportCsv`)}</button>
        <div class="seg" role="group">
          ${[6,12,24].map(n=>O`<button class=${e.range===n?`active`:``} aria-pressed=${e.range===n} @click=${()=>e.onRange(n)}>${t(`hoursShort`,{h:n})}</button>`)}
        </div>
      </div>
      <maestro-chart
        id="fc-main"
        .options=${q(`forecast`,[Y(e,z.trajectory),Y(e,z.targetSoc)?.state,e.ist,e.showIst,e.fmt.loc],()=>Jt({traj:r,targetSoc:B(Y(e,z.targetSoc)),ist:e.ist,showIst:e.showIst,fmt:e.fmt,i18n:e.i18n}))}
      ></maestro-chart>
      <maestro-chart id="fc-brush" .options=${q(`brush`,[Y(e,z.trajectory)],()=>Yt(r))}></maestro-chart>
    </div>
    <div class="grid stat-row">
      ${a(t(`statMinMax`),O`${Math.round(X(n.min_soc)??0)}<small>%</small> / ${Math.round(X(n.max_soc)??0)}<small>%</small>`)}
      ${a(t(`statImport`),Z(e.fmt.n(X(n.grid_draw_kwh)),`kWh`))}
      ${a(t(`statFeed`),Z(e.fmt.n(X(n.grid_feed_in_kwh)),`kWh`))}
      ${a(t(`statAutarky`),Z(e.fmt.n(X(n.self_sufficiency_pct)),`%`))}
      ${a(t(`statPvTomorrow`),Z(e.fmt.n(B(Y(e,z.pvTomorrow))),`kWh`))}
    </div>
    <div class="grid stat-row">
      ${a(t(`qualityLabel`),Qn(t,Y(e,z.forecastQuality)?.state))}
      ${a(t(`statP10`),Z(e.fmt.n(B(Y(e,z.p10))),`kWh`))}
      ${a(t(`statDeficit`),Z(e.fmt.n(B(Y(e,z.deficit))),`kWh`))}
      ${a(t(`statYield`),O`${e.fmt.n((()=>{let t=B(Y(e,z.yieldRatio));return t===void 0?void 0:t*100})())}<small>%</small>`)}
    </div>
    <p class="sub yield-note">${t(`statYieldSub`,{today:e.fmt.n(B(Y(e,z.yieldToday))),ref:e.fmt.n(B(Y(e,z.yieldRef)))})}</p>`}function er(e){let{t}=e.i18n,n=Kn(e,z.plan),r=Ft(n.plan_slots);if(!r.length)return O`<div class="card"><p class="empty">${t(`noPlan`)}</p></div>`;let i=Lt(r),a=[[W.gridOut,t(`legendCharge`)],[W.pv,t(`legendHold`)],[W.bat,t(`legendRelease`)]],o=typeof n.known_until==`string`?e.fmt.dayTime(n.known_until):`–`,s=(e,t,n)=>O`<div class="row"><span>${e}</span><b style=${n?`color:${n}`:``}>${t}</b></div>`,c=t=>`${e.fmt.n(t.price*100)} ct · ${t.start_local}`;return O`
    <div class="grid plan-top">
      <div class="card">
        <div class="chart-head">
          <div class="grow">
            <h3>${t(`priceTitle`)}</h3>
            <div class="legend">
              ${a.map(([e,t])=>O`<span><i style="background:${e}"></i>${t}</span>`)}
              <span><i style="background:#fff;height:2px;border-radius:0"></i>${t(`legendPlanSoc`)}</span>
            </div>
          </div>
          <span class="badge">${n.shadow_mode?t(`planShadow`):t(`planActive`)}</span>
        </div>
        <maestro-chart .options=${q(`plan`,[Y(e,z.plan),e.fmt.loc],()=>Xt({slots:r,fmt:e.fmt,i18n:e.i18n}))}></maestro-chart>
        <div class="strip">
          ${r.map(t=>O`<div class="slot ${Pt(t)}" title="${t.start_local} · ${e.fmt.n(t.price*100)} ct"></div>`)}
        </div>
        <div class="strip-axis">${r.filter((e,t)=>t%4==0).map(e=>O`<span>${e.start_local}</span>`)}</div>
      </div>
      <div class="card plan-kpi">
        <div>
          <h3>${t(`planTitle`)}</h3>
          <div class="plan-state">${J(Y(e,z.plan))}</div>
          <div class="sub msg">${typeof n.message==`string`?n.message:``}</div>
        </div>
        <div>
          ${s(t(`planGridCharge`),`${e.fmt.n(X(n.total_grid_charge_kwh),2)} kWh`)}
          ${s(t(`planSaving`),`${e.fmt.n(X(n.expected_saving_eur),2)} €`,`var(--ok)`)}
          ${i?s(t(`planCheapest`),c(i.min)):j}
          ${i?s(t(`planMostExpensive`),c(i.max)):j}
          ${s(t(`planKnownUntil`),o)}
        </div>
      </div>
    </div>`}function tr(e){let{t,phase:n}=e.i18n,r=Kn(e,z.explanation);if(typeof r.phase!=`string`)return O`<div class="card"><p class="empty">${t(`noDecision`)}</p></div>`;let i=B(Y(e,z.soc)),a=X(r.target_soc),o=typeof r.timestamp==`string`?e.fmt.time(r.timestamp):void 0,s=[a===void 0?null:t(`tagTargetSoc`,{v:Math.round(a)}),(X(r.target_charge_power)??0)>0?t(`tagTargetPower`,{v:e.fmt.w(X(r.target_charge_power))}):null,r.battery_priority===!0?t(`tagBatteryPriority`):null,o?t(`tagSince`,{t:o}):null].filter(e=>!!e),c=(t,n)=>X(t)??B(Y(e,n)),l=c(r.charge_power_limit,z.chargeLimit),u=c(r.sent_charge_power_limit,z.sentChargeLimit),d=c(r.discharge_power_limit,z.dischargeLimit),f=c(r.sent_discharge_power_limit,z.sentDischargeLimit),p=Math.max(9e3,l??0,u??0,d??0,f??0),m=(n,r,i)=>O`
    <div class="limit-row">
      <div class="lbl"><span>${n}</span><span>${t(`limitTarget`,{a:r===void 0?t(`limitNone`):e.fmt.w(r),b:i===void 0?t(`limitNone`):e.fmt.w(i)})}</span></div>
      <div class="bar"><div class="soll" style="width:${(r??0)/p*100}%"></div><div class="sent" style="width:${(i??0)/p*100}%"></div></div>
    </div>`;return O`
    <div class="grid dec-top">
      <div class="card phase-hero">
        <h3>${t(`decisionPhase`)}</h3>
        <div class="phase-name">${n(r.phase)}</div>
        <div class="phase-reason">${typeof r.reason==`string`?r.reason:``}</div>
        <div class="chips">${s.map(e=>O`<span class="chip on"><i></i>${e}</span>`)}</div>
      </div>
      <div class="card">
        <h3>${t(`limitsTitle`)}</h3>
        <div class="sub lim-sub">${t(`limitsSub`)}</div>
        <div class="limits">
          ${m(t(`limitCharge`),l,u)}
          ${m(t(`limitDischarge`),d,f)}
          ${a===void 0?j:O`<div class="limit-row">
                <div class="lbl"><span>${t(`targetSoc`)}</span><span>${t(`limitSoc`,{a:Math.round(i??0),b:Math.round(a)})}</span></div>
                <div class="bar"><div class="soll" style="width:${a}%"></div><div class="sent" style="width:${i??0}%"></div></div>
              </div>`}
        </div>
      </div>
    </div>
    <div class="card tl-card">
      <div class="card-head">
        <h3>${t(`timelineTitle`)}</h3>
        <button class="toggle" ?disabled=${!e.timeline?.length} @click=${()=>e.timeline&&Gn(`maestro-entscheidungen.csv`,Jn(e))}>${t(`exportCsv`)}</button>
      </div>
      ${e.timeline?.length?O`<div class="timeline">
            ${e.timeline.map(t=>O`<div class="tl-item">
                <div class="tl-time">${e.fmt.dayTime(t.ts)}</div>
                <div class="tl-phase">${n(t.phase)}</div>
                <div class="tl-reason">${t.reason}</div>
              </div>`)}
          </div>`:O`<p class="empty">${e.timeline?t(`timelineEmpty`):t(`loading`)}</p>`}
    </div>
    <div class="grid stat-row dec-extra">
      <div class="card">
        <h3>${t(`reserveTitle`)}</h3>
        <div class="rows">
          ${Q(t(`reserveSeasonal`),$(e,z.seasonalReserve))}
          ${Q(t(`reserveAdaptive`),$(e,z.adaptiveReserve))}
          ${Q(t(`reserveHt`),$(e,z.htReserve))}
          ${Q(t(`reserveForward`),$(e,z.forwardTarget))}
          ${Q(t(`targetSoc`),$(e,z.targetSoc))}
        </div>
      </div>
      <div class="card">
        <h3>${t(`windowsTitle`)}</h3>
        <div class="rows">
          ${Q(t(`windowAstro`),J(Y(e,z.astroStart)))}
          ${Q(t(`windowSeasonalEnd`),J(Y(e,z.seasonalEnd)))}
          ${Q(t(`windowPvDelay`),J(Y(e,z.pvDelayStart)))}
          ${Q(t(`windowTomorrow`),`${J(Y(e,z.tomorrowStart))} – ${J(Y(e,z.tomorrowEnd))}`)}
        </div>
      </div>
      <div class="card">
        <h3>${t(`autoTitle`)}</h3>
        <div class="rows">
          ${Q(t(`autoTitle`),J(Y(e,z.autoStrategy)))}
          ${Q(t(`autoSaving`),`${e.fmt.n(B(Y(e,z.autoSaving)),2)} €`)}
        </div>
      </div>
    </div>
    <section class="group">
      <button type="button" class="group-head ${e.debugOpen?`open`:``}" aria-expanded=${e.debugOpen} @click=${e.onToggleDebug}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        <span>${t(`debugTitle`)}</span>
      </button>
      ${e.debugOpen?O`<div class="card debug-card">
            <div class="force">
              <div class="txt"><b>${t(`debugSwitch`)}</b></div>
              <button
                class="switch ${Yn(e)?`on`:``}"
                role="switch"
                aria-checked=${Yn(e)}
                aria-label=${t(`debugSwitch`)}
                ?disabled=${!Y(e,z.debug)||e.pending.has(z.debug)}
                @click=${()=>e.onToggle(z.debug)}
              ></button>
            </div>
            <pre class="debug-log">${Xn(e)}</pre>
          </div>`:j}
    </section>`}var nr,rr={pv:{entity:`pv`,color:`#fbbf24`,label:`nodePv`},grid:{entity:`grid`,color:`#f87171`,label:`nodeImport`},house:{entity:`house`,color:`#a78bfa`,label:`nodeHouse`},bat:{entity:`battery`,color:`#22d3ee`,label:`nodeBatCharge`}},ir=new URLSearchParams(location.search).has(`debug`),ar=[{id:`live`,label:`navLive`,sub:`subLive`,icon:`<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>`},{id:`forecast`,label:`navForecast`,sub:`subForecast`,icon:`<path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/>`},{id:`plan`,label:`navPlan`,sub:`subPlan`,icon:`<rect x="3" y="10" width="4" height="11" rx="1"/><rect x="10" y="5" width="4" height="16" rx="1"/><rect x="17" y="13" width="4" height="8" rx="1"/>`},{id:`decision`,label:`navDecision`,sub:`subDecision`,icon:`<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>`}],or=`<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>`,sr=`(max-width: 960px)`,cr=3e5,lr=6e4,ur=6,dr=3e4,fr=6,pr=(e,t=``)=>O`<svg class=${t} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${e}></svg>`,mr=()=>{let e=location.hash.slice(1);return ar.some(t=>t.id===e)?e:`live`},hr=class extends F{constructor(...e){super(...e),this._narrow=!1,this._screen=mr(),this._sheet=!1,this._mobile=window.matchMedia(sr).matches,this._mq=window.matchMedia(sr),this._range=24,this._showIst=!0,this._loadedAt=new Map,this._pending=new Set,this._flowRaf=0,this._motion=!0,this._histState=`loading`,this._stats={hassUpdates:0,renders:0},this._resolvedAt=0,this._consumers=ct(),this._collapsed=xn(),this._period=`today`,this._debugOpen=!1,this._picking=!1,this._pickQuery=``,this._focusConsumers=!1,this._onMq=e=>{this._mobile=e.matches,this.requestUpdate()},this._animateFlows=e=>{fn(this.renderRoot.querySelectorAll(`.electron`),e),this._flowRaf=requestAnimationFrame(this._animateFlows)},this._onKey=e=>{e.key===`Escape`&&this._hist&&this._closeHistory()},this._onChartError=e=>{this._chartError=e.detail,this.requestUpdate()}}set hass(e){this._stats.hassUpdates++;let t=this._hass;this._hass=e,(!t||this._missingKeys(e).length)&&this._resolveEntities(),(!t||t.language!==e.language||Je().some(n=>t.states[n]!==e.states[n])||ir)&&this.requestUpdate()}get hass(){return this._hass}set narrow(e){e!==this._narrow&&(this._narrow=e,this.requestUpdate())}get narrow(){return this._narrow}connectedCallback(){super.connectedCallback(),this._mq.addEventListener(`change`,this._onMq),this._mobile=this._mq.matches,this._timer=window.setInterval(()=>void this._ensureHistory(),lr),this.addEventListener(`chart-error`,this._onChartError),window.addEventListener(`keydown`,this._onKey),this._motion=!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,this._motion&&(this._flowRaf=requestAnimationFrame(this._animateFlows))}disconnectedCallback(){super.disconnectedCallback(),this._mq.removeEventListener(`change`,this._onMq),window.clearInterval(this._timer),cancelAnimationFrame(this._flowRaf),this.removeEventListener(`chart-error`,this._onChartError),window.removeEventListener(`keydown`,this._onKey)}_closeHistory(){this._hist=void 0,this._histPoints=void 0,this.requestUpdate()}_openFlow(e){let t=this._hass;if(!t)return;let n=Vn(t.language),r=rr[e],i=this._consumers.find(t=>t.id===e),a=r?z[r.entity]:i?.entityId;if(!a)return;let o=t.states[a],s=B(o),c=e===`grid`&&s!==void 0&&s>=0,l=e===`grid`?n.t(c?`nodeFeed`:`nodeImport`):r?n.t(r.label):i?.name??a,u=c?`#34d399`:r?.color??`#38bdf8`,d=o?.attributes.unit_of_measurement;this._hist={name:l,color:u,entityId:a},this._histPoints=void 0,this._histState=`loading`,this.requestUpdate(),jn(t,a,d===`kW`?1e3:1).then(e=>{this._hist?.entityId===a&&(this._histPoints=e,this._histState=e.length?`ready`:`empty`,this.requestUpdate())}).catch(()=>{this._hist?.entityId===a&&(this._histState=`error`,this.requestUpdate())})}async _resolveEntities(){let e=this._hass;if(!(!e||Date.now()-this._resolvedAt<dr)){this._resolvedAt=Date.now();try{let t=await e.callWS({type:`e3dc_maestro/panel_entities`}),n=JSON.stringify(z);Ke(t),this._entityMap=t,JSON.stringify(z)!==n&&this._loadedAt.clear(),this.requestUpdate(),this._ensureHistory()}catch{}}}_missingKeys(e){return Object.keys(Ge).filter(t=>!e.states[z[t]])}_entityNotice(e,t){let n=this._entityMap;if(n&&n.entry_id===null)return O`<p class="err">${t(`notSetUp`)}</p>`;let r=this._missingKeys(e);if(!r.length)return j;let i=new Set(n?.disabled??[]),a=r.slice(0,fr).map(e=>i.has(e)?`${z[e]} (${t(`entityDisabled`)})`:z[e]),o=r.length>fr?` +${r.length-fr}`:``;return O`<p class="err">${t(`entitiesMissing`,{list:a.join(`, `)+o})}</p>`}_alerts(e,t){let n=t=>e.states[t]?.state,r=n(z.reachable)===`off`,i=[r?t(`alertUnreachable`):null,n(z.chargeLock)===`on`?t(`alertChargeLock`):null,n(z.dischargeLock)===`on`?t(`alertDischargeLock`):null,n(z.unjustified)===`on`?t(`alertUnjustified`):null].filter(e=>!!e);return i.length?O`<div class="banner ${r?`bad`:``}" role="status">${i.map(e=>O`<span>${e}</span>`)}</div>`:j}async _ensureHistory(){let e=this._hass;if(!e||document.hidden)return;let t=e=>Date.now()-(this._loadedAt.get(e)??0)>cr,n=async(e,n)=>{if(t(e)){this._loadedAt.set(e,Date.now()-cr+lr);try{await n(),this._loadedAt.set(e,Date.now()),this.requestUpdate()}catch{}}};if(this._screen===`live`&&await n(`sparks`,async()=>void(this._sparks=await An(e))),this._screen===`live`&&this._period!==`today`){let t=this._period;await n(`period-${t}`,async()=>void(this._periodSums=await kn(e,t)))}this._screen===`forecast`&&this._showIst&&await n(`ist`,async()=>void(this._ist=await Mn(e,ur))),this._screen===`decision`&&await n(`timeline`,async()=>void(this._timeline=await Nn(e)))}_go(e){this._screen=e,this._zoomKey=void 0,history.replaceState(null,``,`#${e}`),this.requestUpdate(),this._ensureHistory()}_setSheet(e){this._sheet=e,e||(this._error=void 0,this._picking=!1),this.requestUpdate()}_openConsumers(){this._sheet=!0,this._focusConsumers=!0,this.requestUpdate()}_setConsumers(e,t=!1){this._consumers=e.slice(0,6),lt(this._consumers),t&&(this._picking=!1,this._pickQuery=``),this.requestUpdate()}async _call(e,t,n,r){let i=this._hass;if(i){this._pending.add(e),this._error=void 0,this.requestUpdate();try{await i.callService(t,n,r)}catch(e){let t=e instanceof Error?e.message:typeof e==`object`&&e&&`message`in e?String(e.message):String(e);this._error=Vn(i.language).t(`callFailed`,{err:t})}finally{this._pending.delete(e),this.requestUpdate()}}}_toggle(e){let t=V(this._hass?.states[e]);this._call(e,`switch`,t?`turn_off`:`turn_on`,{entity_id:e})}_press(e){this._call(e,`button`,`press`,{entity_id:e})}_select(e,t){this._call(e,`select`,`select_option`,{entity_id:e,option:t})}_commitPower(e){this._call(z.forceDischargePower,`number`,`set_value`,{entity_id:z.forceDischargePower,value:e}).then(()=>{this._powerDraft=void 0,this.requestUpdate()})}_commitReserve(e){this._call(z.fixedReserveSoc,`number`,`set_value`,{entity_id:z.fixedReserveSoc,value:e}).then(()=>{this._reserveDraft=void 0,this.requestUpdate()})}_openSettings(){this._setSheet(!1),history.pushState(null,``,`/e3dc-maestro`),window.dispatchEvent(new CustomEvent(`location-changed`,{detail:{replace:!1}}))}_toggleMenu(){this.dispatchEvent(new Event(`hass-toggle-menu`,{bubbles:!0,composed:!0}))}render(){this._stats.renders++;let e=this._hass;if(!e)return O``;let t=Vn(e.language),n=_n(e.language),{t:r}=t,i={hass:e,i18n:t,fmt:n,mobile:this._mobile,sparks:this._sparks,ist:this._ist,timeline:this._timeline,range:this._range,showIst:this._showIst,onRange:e=>{this._range=e,this.requestUpdate()},onToggleIst:()=>{this._showIst=!this._showIst,this.requestUpdate(),this._ensureHistory()},consumers:ut(this._consumers,e),consumerOverflow:dt(B(e.states[z.house]),ut(this._consumers,e)),onEditConsumers:()=>this._openConsumers(),onFlowNode:e=>this._openFlow(e),motion:this._motion,collapsed:this._collapsed,onToggleGroup:e=>{let t=new Set(this._collapsed);t.delete(e)||t.add(e),this._collapsed=t,Sn(t),this.requestUpdate()},period:this._period,periodSums:this._periodSums,onPeriod:e=>{this._period=e,this.requestUpdate(),this._ensureHistory()},pending:this._pending,onToggle:e=>this._toggle(e),onPress:e=>this._press(e),forcePowerDraft:this._powerDraft,onPowerDraft:e=>{this._powerDraft=e,this.requestUpdate()},onPowerCommit:e=>this._commitPower(e),reserveDraft:this._reserveDraft,onReserveDraft:e=>{this._reserveDraft=e,this.requestUpdate()},onReserveCommit:e=>this._commitReserve(e),debugOpen:this._debugOpen,onToggleDebug:()=>{this._debugOpen=!this._debugOpen,this.requestUpdate()}},a=ar.find(e=>e.id===this._screen)??ar[0],o=V(e.states[z.ctrlActive]),s=e.states[z.phase]?.state,c={live:Zn,forecast:$n,plan:er,decision:tr}[a.id](i);return O`
      <div class="app">
        <nav class="rail" aria-label="Maestro">
          <div class="logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="#06101f" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" /></svg>
          </div>
          ${ar.map(e=>O`<button
      class="nav-btn ${e.id===a.id?`active`:``}"
      aria-current=${e.id===a.id?`page`:`false`}
      @click=${()=>this._go(e.id)}
    >
      ${pr(e.icon)}${r(e.label)}
    </button>`)}
          <div class="spacer"></div>
          <button class="nav-btn" @click=${()=>this._setSheet(!0)}>${pr(or)}${r(`navControls`)}</button>
        </nav>
        <main>
          <header class="topbar">
            ${this._narrow?O`<button class="menu" aria-label=${r(`menu`)} @click=${this._toggleMenu}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" /></svg>
                </button>`:j}
            <div class="title grow">
              <h1>${r(a.label)}</h1>
              <p>${r(a.sub)}</p>
            </div>
            <span class="pill hide-sm"><span class="dot ${o?``:`off`}"></span>${r(o?`regulationOn`:`regulationOff`)}${s?` · ${t.phase(s)}`:``}</span>
          </header>
          ${this._entityNotice(e,r)}
          ${this._alerts(e,r)}
          ${this._chartError?O`<p class="err">${r(`chartError`,{err:this._chartError})}</p>`:j}
          <section class="screen" id=${`screen-${a.id}`}>${c}</section>
          ${ir?O`<footer class="debug">hass-Updates ${this._stats.hassUpdates} · Renders ${this._stats.renders}</footer>`:j}
        </main>
      </div>
      ${kt({hass:e,i18n:t,fmt:n,open:this._sheet,pending:this._pending,error:this._error,forcePowerDraft:this._powerDraft,onClose:()=>this._setSheet(!1),onToggle:e=>this._toggle(e),onPowerDraft:e=>{this._powerDraft=e,this.requestUpdate()},onPowerCommit:e=>this._commitPower(e),reserveDraft:this._reserveDraft,onReserveDraft:e=>{this._reserveDraft=e,this.requestUpdate()},onReserveCommit:e=>this._commitReserve(e),onPress:e=>this._press(e),onSelect:(e,t)=>this._select(e,t),onAllSettings:()=>this._openSettings(),consumers:this._consumers,picking:this._picking,pickQuery:this._pickQuery,choices:ft(e,new Set(this._consumers.map(e=>e.entityId)),this._pickQuery),wallbox:e.states[`sensor.e3dc_maestro_wallbox_leistung`]&&!this._consumers.some(e=>e.entityId===`sensor.e3dc_maestro_wallbox_leistung`)?{id:Ye,name:at(e.states[Ye],t.t(`useWallbox`))}:void 0,onPick:e=>{this._picking=e,this.requestUpdate()},onPickQuery:e=>{this._pickQuery=e,this.requestUpdate()},onAddConsumer:(e,t)=>{this._consumers.some(t=>t.entityId===e)||this._setConsumers([...this._consumers,{id:st(),entityId:e,name:t,mode:`included`,icon:tt(e)}],!0)},onUseWallbox:()=>{let n=at(e.states[Ye],t.t(`useWallbox`));this._setConsumers([...this._consumers,{id:st(),entityId:Ye,name:n,mode:`separate`,icon:`wallbox`}],!0)},onRenameConsumer:(e,t)=>{let n=t.slice(0,40);n.trim()&&this._setConsumers(this._consumers.map(t=>t.id===e?{...t,name:n}:t))},onConsumerMode:(e,t)=>{this._setConsumers(this._consumers.map(n=>n.id===e?{...n,mode:t}:n))},onConsumerIcon:(e,t)=>{this._setConsumers(this._consumers.map(n=>n.id===e?{...n,icon:t}:n))},onRemoveConsumer:e=>this._setConsumers(this._consumers.filter(t=>t.id!==e))})}
      ${this._hist?O`<div class="scrim open hist-scrim" @click=${()=>this._closeHistory()}></div>
            <aside class="overlay" role="dialog" aria-modal="true" aria-label=${this._hist.name}>
              <div class="sheet-head">
                <div class="grow"><h2>${this._hist.name}</h2><div class="sub">${r(`historySub`)}</div></div>
                <button class="btn" @click=${()=>this._closeHistory()}>${r(`close`)}</button>
              </div>
              ${this._histState===`loading`?O`<p class="hint">${r(`loading`)}</p>`:j}
              ${this._histState===`empty`?O`<p class="hint">${r(`historyEmpty`)}</p>`:j}
              ${this._histState===`error`?O`<p class="err">${r(`historyFailed`)}</p>`:j}
              ${this._histState===`ready`&&this._histPoints?O`<maestro-chart .options=${q(`hist-${this._hist.entityId}`,[this._histPoints,this._hist.color,n.loc],()=>Qt(this._histPoints,this._hist.color,n))}></maestro-chart>`:j}
            </aside>`:j}
    `}firstUpdated(){this._ensureHistory()}updated(){if(this._focusConsumers&&(this._focusConsumers=!1,this.renderRoot.querySelector(`#display-consumers`)?.scrollIntoView({block:`start`})),this._screen!==`forecast`||!this._hass)return;let e=jt(this._hass.states[z.trajectory]?.attributes),t=this.renderRoot.querySelector(`#fc-main`);if(!e||!t)return;let n=e.trajectory_points[0][0],r=e.trajectory_points[e.trajectory_points.length-1][0],i=this._showIst&&this._ist?.pv.length?Math.min(n,this._ist.pv[0][0]):n,a=`${this._range}|${i}|${n}`;a!==this._zoomKey&&(this._zoomKey=a,t.zoomX(i,Math.min(r,n+this._range*36e5)))}};nr=hr,nr.styles=Hn,customElements.get(`e3dc-maestro-panel`)||customElements.define(`e3dc-maestro-panel`,hr);