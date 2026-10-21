var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:f,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,h=globalThis,g=h.trustedTypes,_=g?g.emptyScript:``,v=h.reactiveElementPolyfillSupport,y=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},x=(e,t)=>!l(e,t),S={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol(`metadata`),h.litPropertyMetadata??=new WeakMap;var C=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=S){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??S}static _$Ei(){if(this.hasOwnProperty(y(`elementProperties`)))return;let e=m(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y(`properties`))){let e=this.properties,t=[...f(e),...p(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?b:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?b:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??x)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};C.elementStyles=[],C.shadowRootOptions={mode:`open`},C[y(`elementProperties`)]=new Map,C[y(`finalized`)]=new Map,v?.({ReactiveElement:C}),(h.reactiveElementVersions??=[]).push(`2.1.2`);var ee=globalThis,w=e=>e,T=ee.trustedTypes,te=T?T.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,E=`$lit$`,D=`lit$${Math.random().toFixed(9).slice(2)}$`,O=`?`+D,ne=`<${O}>`,k=document,A=()=>k.createComment(``),re=e=>e===null||typeof e!=`object`&&typeof e!=`function`,ie=Array.isArray,ae=e=>ie(e)||typeof e?.[Symbol.iterator]==`function`,j=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oe=/-->/g,N=/>/g,P=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),se=/'/g,ce=/"/g,le=/^(?:script|style|textarea|title)$/i,ue=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),F=ue(1),I=ue(2),de=Symbol.for(`lit-noChange`),L=Symbol.for(`lit-nothing`),fe=new WeakMap,pe=k.createTreeWalker(k,129);function me(e,t){if(!ie(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return te===void 0?t:te.createHTML(t)}var he=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=M;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===M?c[1]===`!--`?o=oe:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=P):(le.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=P):o=N:o===P?c[0]===`>`?(o=i??M,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?P:c[3]===`"`?ce:se):o===ce||o===se?o=P:o===oe||o===N?o=M:(o=P,i=void 0);let d=o===P&&e[t+1].startsWith(`/>`)?` `:``;a+=o===M?n+ne:l>=0?(r.push(s),n.slice(0,l)+E+n.slice(l)+D+d):n+D+(l===-2?t:d)}return[me(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},ge=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=he(t,n);if(this.el=e.createElement(l,r),pe.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=pe.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(E)){let t=u[o++],n=i.getAttribute(e).split(D),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?xe:r[1]===`?`?Se:r[1]===`@`?Ce:be}),i.removeAttribute(e)}else e.startsWith(D)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(le.test(i.tagName)){let e=i.textContent.split(D),t=e.length-1;if(t>0){i.textContent=T?T.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],A()),pe.nextNode(),c.push({type:2,index:++a});i.append(e[t],A())}}}else if(i.nodeType===8){if(i.data===O)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(D,e+1))!==-1;)c.push({type:7,index:a}),e+=D.length-1}}a++}}static createElement(e,t){let n=k.createElement(`template`);return n.innerHTML=e,n}};function _e(e,t,n=e,r){if(t===de)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=re(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=_e(e,i._$AS(e,t.values),i,r)),t}var ve=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??k).importNode(t,!0);pe.currentNode=r;let i=pe.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new ye(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new we(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=pe.nextNode(),a++)}return pe.currentNode=k,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},ye=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=_e(this,e,t),re(e)?e===L||e==null||e===``?(this._$AH!==L&&this._$AR(),this._$AH=L):e!==this._$AH&&e!==de&&this._(e):e._$litType$===void 0?e.nodeType===void 0?ae(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==L&&re(this._$AH)?this._$AA.nextSibling.data=e:this.T(k.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=ge.createElement(me(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new ve(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=fe.get(e.strings);return t===void 0&&fe.set(e.strings,t=new ge(e)),t}k(t){ie(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(A()),this.O(A()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=w(e).nextSibling;w(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},be=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=L,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=L}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=_e(this,e,t,0),a=!re(e)||e!==this._$AH&&e!==de,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=_e(this,r[n+o],t,o),s===de&&(s=this._$AH[o]),a||=!re(s)||s!==this._$AH[o],s===L?e=L:e!==L&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},xe=class extends be{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===L?void 0:e}},Se=class extends be{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==L)}},Ce=class extends be{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=_e(this,e,t,0)??L)===de)return;let n=this._$AH,r=e===L&&n!==L||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==L&&(n===L||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},we=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){_e(this,e)}},Te={M:E,P:D,A:O,C:1,L:he,R:ve,D:ae,V:_e,I:ye,H:be,N:Se,U:Ce,B:xe,F:we},Ee=ee.litHtmlPolyfillSupport;Ee?.(ge,ye),(ee.litHtmlVersions??=[]).push(`3.3.3`);var De=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new ye(t.insertBefore(A(),e),e,void 0,n??{})}return i._$AI(e),i},Oe=globalThis,ke=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=De(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return de}};ke._$litElement$=!0,ke.finalized=!0,Oe.litElementHydrateSupport?.({LitElement:ke});var Ae=Oe.litElementPolyfillSupport;Ae?.({LitElement:ke}),(Oe.litElementVersions??=[]).push(`4.2.2`);var je=(function(){let e=typeof document<`u`&&document.createElement(`link`).relList;return e&&e.supports&&e.supports(`modulepreload`)?`modulepreload`:`preload`})(),Me=function(e,t){return new URL(e,t).href},Ne={},Pe=function(e){return e.pathname.endsWith(`.css`)},Fe=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},Ie=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Me(t,n);let r=s(t),i=Pe(r);return Fe(Ne,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:je,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Le,Re=new WeakMap,ze,Be=0;async function Ve(){return ze??=await Ie(()=>import(`./apex-DvHPYsi2.js`),[],import.meta.url),ze}var He=class extends ke{constructor(...e){super(...e),this._run=0,this._shape=``,this._onRebuilt=e=>{let t=this.options?.chart?.brush?.target;if(t&&e.detail===t&&this._chart){try{this._chart.destroy()}catch{}this._chart=void 0,this.replaceChildren(),this.requestUpdate(`options`)}}}createRenderRoot(){return this}updated(e){e.has(`options`)&&this._apply().catch(e=>{this.dispatchEvent(new CustomEvent(`chart-error`,{detail:e instanceof Error?`${e.name}: ${e.message}`:String(e),bubbles:!0,composed:!0}))})}connectedCallback(){super.connectedCallback(),Be++,ze?.claimSVG(),this.hasUpdated&&this.options&&!this._chart&&this.requestUpdate(`options`),window.addEventListener(`maestro-chart-rebuilt`,this._onRebuilt)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(`maestro-chart-rebuilt`,this._onRebuilt),--Be===0&&ze?.releaseSVG(),this._run++;try{this._chart?.destroy()}catch{}this._chart=void 0,this.replaceChildren()}_scoped(e){let t=e.chart?.id,n=e.chart?.brush?.target,r=this.getRootNode(),i=Re.get(r);i||Re.set(r,i=Math.random().toString(36).slice(2,8));let a=i;return{...e,chart:{...e.chart,...t?{id:`${t}-${a}`}:{},...n?{brush:{...e.chart?.brush,target:`${n}-${a}`}}:{}}}}zoomX(e,t){this._zoom=[e,t],this._chart?.zoomX(e,t)}async _apply(){let e=this.options;if(!e)return;let t=this._scoped(e),n=++this._run,r=await Ve(),i=r.default;if(n!==this._run||!this.isConnected)return;r.claimSVG();let a=t.chart?.brush?.target;if(a){for(let e=0;e<120&&!i.getChartByID(a);e++)if(await new Promise(e=>requestAnimationFrame(e)),n!==this._run)return}let o=`${Array.isArray(t.series)?t.series.length:0}|${Array.isArray(t.yaxis)?t.yaxis.length:1}|${t.chart?.type}`;if(this._chart&&o!==this._shape){try{this._chart.destroy()}catch{}this._chart=void 0,this.replaceChildren(),t.chart?.id&&window.dispatchEvent(new CustomEvent(`maestro-chart-rebuilt`,{detail:e.chart?.id}))}this._shape=o,this._chart?(await this._chart.updateOptions(t,!1,!1),t.series&&await this._chart.updateSeries(t.series,!1)):(this._chart=new i(this,t),await this._chart.render()),n===this._run&&this._zoom&&this._chart.zoomX(...this._zoom)}};Le=He,Le.properties={options:{attribute:!1}},customElements.get(`maestro-chart`)||customElements.define(`maestro-chart`,He);var R=e=>`sensor.e3dc_maestro_${e}`,Ue=e=>`binary_sensor.e3dc_maestro_${e}`,We=e=>`switch.e3dc_maestro_${e}`,Ge={phase:R(`regelphase`),lastAction:R(`letzte_aktion`),explanation:R(`entscheidungserklarung`),trajectory:R(`forecast_soc_trajektorie_24h`),plan:R(`preisplan`),soc:R(`aktueller_soc`),targetSoc:R(`ziel_soc`),pv:R(`pv_power`),house:R(`house_power`),grid:R(`grid_power`),battery:R(`battery_power`),autonomy:R(`autonomiezeit`),costNet:R(`netto_stromkosten_heute`),costToday:R(`stromkosten_heute`),feedRevenue:R(`einspeise_erlos_heute`),wear:R(`akku_verschleiss_heute`),balance:R(`energiebilanz_heute`),gridToBattery:R(`netz_akku_heute`),unjustified:Ue(`netzladung_ohne_rechtfertigung`),wallboxEnergy:R(`wallbox_energie_heute`),feedInInterventions:R(`einspeise_eingriffe_heute`),feedInAvoided:R(`dc_abregelung_verhindert_heute`),curtailAvoided:R(`abregelung_verhindert_heute`),feedInLimit:Ue(`einspeisedrosselung_aktiv`),gridCharge:Ue(`netzladung_aktiv`),batteryPriority:Ue(`akku_prioritat_aktiv`),lowYield:Ue(`schwacher_pv_tag`),forecastQuality:R(`forecast_datenqualitat`),p10:R(`pv_restprognose_p10`),yieldToday:R(`pv_tagesprognose`),yieldRef:R(`pv_referenz_ertrag`),yieldRatio:R(`pv_tag_quote`),deficit:R(`morgen_energiedefizit`),seasonalReserve:R(`notstromreserve_aktuell`),adaptiveReserve:R(`notstromreserve_adaptiv`),htReserve:R(`ht_reserve_adaptiv`),forwardTarget:R(`vorausschauendes_ladeziel`),astroStart:R(`astro_ladestart_uhrzeit`),seasonalEnd:R(`saisonales_ladeende_uhrzeit`),pvDelayStart:R(`verzogerter_ladestart_heute`),tomorrowStart:R(`ladestart_morgen_prognose`),tomorrowEnd:R(`ladeende_morgen_prognose`),autoStrategy:R(`auto_aktive_strategie`),autoSaving:R(`auto_geschatzte_einsparung`),targetCharge:R(`ziel_ladeleistung`),sizingStatus:R(`advisor_status`),sizingMatrix:R(`advisor_sizing_matrix`),sizingScenario:R(`advisor_szenario`),sizingInverter:Ue(`advisor_wr_upgrade_empfohlen`),btnSizing:`button.e3dc_maestro_sizing_analyse_starten`,saving:R(`pv_ersparnis_heute`),selfUse:R(`pv_eigenverbrauch_heute`),importToday:R(`netzbezug_heute`),feedToday:R(`netzeinspeisung_heute`),pvToday:R(`pv_ertrag_heute`),houseToday:R(`hausverbrauch_heute`),chargedToday:R(`geladen_heute`),dischargedToday:R(`entladen_heute`),pvTomorrow:R(`morgen_pv_prognose`),reachable:Ue(`e3dc_erreichbar`),chargeLock:Ue(`ladesperre_aktiv`),dischargeLock:Ue(`entladesperre_aktiv`),htProtect:Ue(`ht_schutz_aktiv`),curtail:Ue(`abregelschutz_aktiv`),emergency:Ue(`notfallladung_aktiv`),chargeLimit:R(`soll_lade_limit`),dischargeLimit:R(`soll_entlade_limit`),sentChargeLimit:R(`gesendetes_lade_limit`),sentDischargeLimit:R(`gesendetes_entlade_limit`),forceDischargePower:`number.e3dc_maestro_erzwungene_entladungsleistung`,fixedReserveSoc:`number.e3dc_maestro_notstromreserve_prozent`,inverterPower:`number.e3dc_maestro_wr_leistung`,ctrlActive:We(`regelung_aktiv`),ctrlPredictive:We(`vorausschauende_ladung`),ctrlPvDelay:We(`pv_prognose_verzogerung`),ctrlPlanControls:We(`preisplan_steuert_akku`),ctrlPlanShadow:We(`preisplan_schattenmodus`),ctrlAuto:We(`auto_optimierung`),forceDischarge:We(`erzwungene_entladung`),fixedReserve:We(`notstromreserve`),debug:We(`debug_logging`),debugLog:R(`debug_log`),btnClear:`button.e3dc_maestro_limits_jetzt_freigeben`,btnCharge:`button.e3dc_maestro_manuell_laden_3_kwh`,selWallbox:`select.e3dc_maestro_wallbox_typ`,selMorning:`select.e3dc_maestro_vorentladungs_modus`,selAuto:`select.e3dc_maestro_auto_optimierung_ziel`,selTariff:`select.e3dc_maestro_tarif_modus`,selStrategy:`select.e3dc_maestro_netzladung_strategie`},z={...Ge},Ke=()=>({entities:{},packs:[],wallboxes:[],controls:{general:{},wallbox:{}},identity:{}}),B=Ke();function qe(e){for(let t of Object.keys(Ge))z[t]=e.entities[t]??Ge[t]}var Je={},Ye=new Set;function Xe(e){for(let e of Object.keys(Je))delete Je[e];Object.assign(Je,e.settings??{}),Ye.clear();for(let t of e.settings_disabled??[])Ye.add(t)}function Ze(e){B=e.plant??Ke()}var Qe=e=>Ye.has(e),$e=[`ctrlActive`,`ctrlPredictive`,`ctrlPvDelay`,`ctrlPlanControls`,`ctrlPlanShadow`],et=e=>Object.values(e??{}),tt=()=>[...et(B.entities),...et(B.controls?.general),...et(B.controls?.wallbox),...B.packs.flatMap(e=>[...et(e.entities),...et(e.controls),...(e.modules??[]).flatMap(e=>et(e.entities))]),...B.wallboxes.flatMap(e=>[...et(e.entities),...et(e.controls)])],nt=()=>[...Object.values(z),...Object.values(Je),...tt()],V=e=>{let t=e?Number.parseFloat(e.state):NaN;return Number.isFinite(t)?t:void 0},H=e=>e?.state===`on`,rt=`sensor.e3dc_maestro_wallbox_leistung`,it=`e3dc-maestro.consumers.v1`,at=50,ot=1e4,st=[`wallbox`,`heater`,`climate`,`heatpump`,`meter`],ct={wallbox:`M6 8h12v7H6zM9 8V5M15 8V5M12 15v4M9 19h6`,heater:`M10 3v18M15 7c1.4 1 1.4 2 0 3s-1.4 2 0 3 1.4 2 0 3`,climate:`M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9`,heatpump:`M4 7h16v11H4zM12 9.5a2.5 2.5 0 1 0 .01 0`,meter:`M6 16a6 6 0 1 1 12 0M12 16l3.5-3.5`},lt=e=>typeof e==`string`&&st.includes(e);function ut(e){return/wallbox|evcc|easee|go-?e/i.test(e)?`wallbox`:`meter`}function dt(e){return!e||e.state===`unavailable`}function ft(e){let t=V(e);if(t!==void 0)return e?.attributes.unit_of_measurement===`kW`?t*1e3:t}function pt(e){if(!e?.entity_id.startsWith(`sensor.`))return!1;let t=e.attributes.unit_of_measurement;return e.attributes.device_class===`power`||t===`W`||t===`kW`}function mt(e,t){let n=e?.attributes.friendly_name;return typeof n==`string`&&n.trim()?n.trim():t}function ht(e){if(!Array.isArray(e))return[];let t=[],n=new Set;for(let r of e){if(!r||typeof r!=`object`)continue;let e=r,i=e.entityId,a=e.mode;if(typeof i!=`string`||!i.startsWith(`sensor.`)||n.has(i)||a!==`included`&&a!==`separate`)continue;let o=typeof e.name==`string`&&e.name.trim()?e.name.trim().slice(0,40):i,s=typeof e.id==`string`&&e.id?e.id:i;if(t.push({id:s,entityId:i,name:o,mode:a,icon:lt(e.icon)?e.icon:ut(i)}),n.add(i),t.length>=6)break}return t}function gt(){let e=new Uint8Array(8);return crypto.getRandomValues(e),[...e].map(e=>e.toString(16).padStart(2,`0`)).join(``)}function _t(e,t){return Array.isArray(e)?{list:ht(e),publishLocal:!1}:t.length?{list:t,publishLocal:!0}:{list:[],publishLocal:!1}}function vt(){try{return ht(JSON.parse(localStorage.getItem(it)??`null`))}catch{return[]}}function yt(e){try{localStorage.setItem(it,JSON.stringify(ht(e)))}catch{}}function bt(e,t){return e.map(e=>{let n=t.states[e.entityId],r=ft(n);return{id:e.id,name:e.name,entityId:e.entityId,mode:e.mode,icon:e.icon,watts:r??0,missing:dt(n)}})}function xt(e,t){if(t?.arrange)return e;let n=t?.minW??10;return e.filter(e=>Math.abs(e.watts)>n)}function St(e,t){return t===void 0||!Number.isFinite(t)||t<=0?[]:e.filter(e=>e.mode===`separate`&&e.entityId===`sensor.e3dc_maestro_wallbox_leistung`).map(e=>({name:e.name,kwh:t}))}function Ct(e,t){return e!==void 0&&t.filter(e=>e.mode===`included`).reduce((e,t)=>e+Math.max(0,t.watts),0)>e+at}function wt(e,t,n,r=ot){if(!e)return{show:!1,since:void 0};let i=t??n;return{show:n-i>=r,since:i}}function Tt(e,t,n){let r=n.trim().toLowerCase();return Object.values(e.states).filter(e=>pt(e)&&!t.has(e.entity_id)).map(e=>({id:e.entity_id,name:mt(e,e.entity_id)})).filter(e=>!r||e.name.toLowerCase().includes(r)||e.id.toLowerCase().includes(r)).sort((e,t)=>e.name.localeCompare(t.name)).slice(0,12)}var{I:Et}=Te,Dt=e=>e.strings===void 0,Ot={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},kt=e=>(...t)=>({_$litDirective$:e,values:t}),At=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},jt=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),jt(e,t);return!0},Mt=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},Nt=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),It(t)}};function Pt(e){this._$AN===void 0?this._$AM=e:(Mt(this),this._$AM=e,Nt(this))}function Ft(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0){if(t){if(Array.isArray(r))for(let e=n;e<r.length;e++)jt(r[e],!1),Mt(r[e]);else r!=null&&(jt(r,!1),Mt(r))}else jt(this,e)}}var It=e=>{e.type==Ot.CHILD&&(e._$AP??=Ft,e._$AQ??=Pt)},Lt=class extends At{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),Nt(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(jt(this,e),Mt(this))}setValue(e){if(Dt(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}},Rt=new WeakMap,zt=kt(class extends Lt{render(e){return L}update(e,[t]){let n=t!==this.G;return n&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),L}rt(e){if(this.G!==void 0){if(this.isConnected||(e=void 0),typeof this.G==`function`){let t=this.ht??globalThis,n=Rt.get(t);n===void 0&&(n=new WeakMap,Rt.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}}get lt(){return typeof this.G==`function`?Rt.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Bt=[1,3,6,12,24];function Vt(e){let t=e?.attributes?.pause_until;return typeof t==`number`&&Number.isFinite(t)?t:void 0}function Ht(e,t=Date.now()){let n=e*1e3-t;if(n<=0)return;let r=Math.max(1,Math.ceil(n/6e4));return{h:Math.floor(r/60),m:r%60}}function Ut(e,t,n=Date.now()){let r=Vt(t);if(r===void 0)return;let i=Ht(r,n);if(i)return i.h>0&&i.m>0?e(`pauseLeftHours`,{h:i.h,m:i.m}):i.h>0?e(`pauseLeftHour`,{h:i.h}):e(`pauseLeftMin`,{m:i.m})}function Wt(e,t,n,r,i){let a=(e,t)=>F`<button
    type="button"
    class="pause-choice"
    role="option"
    @click=${()=>n(e)}
  >${t}</button>`;return F`<div class="scrim open" @click=${i}></div>
    <div class="pause-menu" role="dialog" aria-modal="true" aria-label=${e(t?`pauseTitle`:`pauseOffTitle`)}>
      <h2>${e(t?`pauseTitle`:`pauseOffTitle`)}</h2>
      <p class="sub">${e(t?`pauseHint`:`pauseOffHint`)}</p>
      ${t?L:F`<button type="button" class="pause-choice resume" @click=${r}>${e(`pauseResume`)}</button>`}
      <div class="pause-options" role="listbox" aria-label=${e(`pauseTitle`)}>
        ${Bt.map(t=>a(t,t===1?e(`pauseOneHour`):e(`pauseHours`,{h:t})))}
        ${a(null,e(`pausePermanent`))}
      </div>
      <button type="button" class="btn" @click=${i}>${e(`close`)}</button>
    </div>`}var Gt=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},Kt=e=>{let t=e.closest(`.slider-field`),n=e.type===`range`?`number`:`range`,r=t?.querySelector(`input[type="${n}"]`);r instanceof HTMLInputElement&&(r.value=e.value)},qt=(e,t)=>Math.abs(e/t-Math.round(e/t))<1e-6;function Jt(e,t,n){let r=t-e;if(!(r>0))return n>0?n:1;if(n>0&&n>=r/10&&Number.isInteger(n))return n;let i=[1,2,5,10,20,25].filter(e=>qt(r,e)&&r/e>=4&&r/e<=20);return i.length===0?1:i.reduce((e,t)=>Math.abs(r/t-10)<Math.abs(r/e-10)?t:e)}function Yt(e,t,n){let r=Math.max(1,Math.round((t-e)/n));return Array.from({length:r+1},(n,i)=>Math.round(e+(t-e)*i/r))}function Xt(e){let t=String(e.value),n=e.unit===`%`,r=n?Jt(e.min,e.max,e.step):e.step,i=n?Yt(e.min,e.max,r):[],a=t=>{let n=Number.parseFloat(t);Number.isFinite(n)&&e.onCommit(Math.min(e.max,Math.max(e.min,n)))},o=t=>{let n=Number.parseFloat(t);Number.isFinite(n)&&e.onPreview?.(n)};return F`<div class="slider-field">
    <div class="slider-track ${n?`raster`:``}">
    <input
      type="range"
      aria-label=${e.label}
      min=${e.min}
      max=${e.max}
      step=${r}
      ?disabled=${e.disabled}
      ${zt(e=>{e instanceof HTMLInputElement&&!Gt(e)&&e.value!==t&&(e.value=t)})}
      @input=${e=>{let t=e.target;Kt(t),o(t.value),window.clearTimeout(t._commit),t._commit=window.setTimeout(()=>a(t.value),200)}}
      @change=${e=>{let t=e.target;window.clearTimeout(t._commit),a(t.value)}}
    />
    ${n?F`<div class="slider-scale" aria-hidden="true">
          ${i.map(t=>F`<span style="left: ${(t-e.min)/(e.max-e.min)*100}%">${t}</span>`)}
        </div>`:L}
    </div>
    <input
      type="number"
      inputmode="decimal"
      aria-label=${e.label}
      min=${e.min}
      max=${e.max}
      step=${e.step}
      ?disabled=${e.disabled}
      ${zt(e=>{e instanceof HTMLInputElement&&!Gt(e)&&e.value!==t&&(e.value=t)})}
      @input=${e=>{let t=e.target;Kt(t),o(t.value)}}
      @change=${e=>a(e.target.value)}
    />
    ${e.unit?F`<span>${e.unit}</span>`:L}
  </div>`}var Zt={wallbox:`iconWallbox`,heater:`iconHeater`,climate:`iconClimate`,heatpump:`iconHeatpump`,meter:`iconMeter`},Qt=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},$t={ctrlActive:`ctrlActiveSub`,ctrlPredictive:`ctrlPredictiveSub`,ctrlPvDelay:`ctrlPvDelaySub`,ctrlPlanControls:`ctrlPlanControlsSub`,ctrlPlanShadow:`ctrlPlanShadowSub`};function en(e){let{t}=e.i18n,n=e.hass.states[z.forceDischargePower],r=n?.attributes??{},i=typeof r.min==`number`?r.min:100,a=typeof r.max==`number`?r.max:1e4,o=typeof r.step==`number`?r.step:100,s=e.forcePowerDraft??V(n)??i,c=e.hass.states[z.fixedReserveSoc],l=c?.attributes??{},u=typeof l.min==`number`?l.min:0,d=typeof l.max==`number`?l.max:100,f=typeof l.step==`number`?l.step:1,p=e.reserveDraft??V(c)??u,m=(t,n)=>{let r=e.hass.states[t],i=H(r),a=!r||r.state===`unavailable`;return F`<button
      class="switch ${i?`on`:``}"
      role="switch"
      aria-checked=${i}
      aria-label=${n}
      ?disabled=${a||e.pending.has(t)}
      @click=${()=>e.onToggle(t)}
    ></button>`};return F`
    <div class="scrim ${e.open?`open`:``}" @click=${e.onClose}></div>
    <aside class="sheet ${e.open?`open`:``}" role="dialog" aria-modal="true" aria-label=${t(`controlsTitle`)} ?inert=${!e.open}>
      <div class="sheet-head">
        <div class="grow">
          <h2>${e.consumersSheet?t(`editConsumers`):t(`controlsTitle`)}</h2>
          <div class="sub">${e.consumersSheet?t(`consumersSub`):t(`controlsSub`)}</div>
        </div>
        <button class="btn ${e.consumersSheet?`primary`:``}" @click=${e.onClose}>${e.consumersSheet?t(`arrangeDone`):t(`close`)}</button>
      </div>
      ${e.error?F`<p class="err">${e.error}</p>`:L}
      ${e.consumersSheet?L:F`      <div class="release">
        <button
          class="btn action"
          ?disabled=${!e.hass.states[z.btnClear]||e.pending.has(z.btnClear)}
          @click=${()=>e.onPress(z.btnClear)}
        >${t(`btnClear`)}</button>
        <p class="sub">${t(`btnClearSub`)}</p>
      </div>
      ${$e.map(n=>{let r=n===`ctrlActive`?Ut(t,e.hass.states[z.ctrlActive]):void 0;return F`<div class="ctrl">
          <div class="txt"><b>${t(n)}</b><span>${r??t($t[n])}</span></div>
          ${m(z[n],t(n))}
        </div>`})}
      <div class="ctrl wrap">
        <div class="txt"><b>${t(`ctrlForce`)}</b><span>${t(`ctrlForcePower`,{v:e.fmt.w(s)})}</span></div>
        ${m(z.forceDischarge,t(`ctrlForce`))}
        ${Xt({label:t(`ctrlForcePower`,{v:``}),min:i,max:a,step:o,value:s,disabled:!n||n.state===`unavailable`,onPreview:e.onPowerDraft,onCommit:e.onPowerCommit})}
      </div>
      <div class="ctrl wrap">
        <div class="txt"><b>${t(`fixedReserve`)}</b><span>${t(`ctrlReserveSoc`,{v:Math.round(p)})}</span></div>
        ${m(z.fixedReserve,t(`fixedReserve`))}
        ${Xt({label:t(`fixedReserve`),min:u,max:d,step:f,value:p,unit:`%`,disabled:!c||c.state===`unavailable`,onPreview:e.onReserveDraft,onCommit:e.onReserveCommit})}
      </div>
      <div class="sheet-section">
        <h3>${t(`actionsTitle`)}</h3>
        ${[`selWallbox`,`selMorning`,`selAuto`,`selStrategy`].map(n=>{let r=e.hass.states[z[n]],i=Array.isArray(r?.attributes.options)?r.attributes.options:[];return F`<label class="ctrl">
            <span class="txt"><b>${t(n)}</b></span>
            <select
              .value=${r?.state??``}
              ?disabled=${!r||r.state===`unavailable`||e.pending.has(z[n])}
              @change=${t=>e.onSelect(z[n],t.target.value)}
            >
              ${i.map(t=>F`<option value=${t} ?selected=${t===r?.state}>${e.i18n.option(t)}</option>`)}
            </select>
          </label>`})}
        ${[`btnCharge`].map(n=>{let r=n===`btnCharge`?[t(`confirmCharge`)]:[];return F`<button
            class="btn action"
            ?disabled=${!e.hass.states[z[n]]||e.pending.has(z[n])}
            @click=${()=>{r.some(e=>!window.confirm(e))||e.onPress(z[n])}}
          >${t(n)}</button>`})}
      </div>`}
      <div class="sheet-section" id="display-consumers">
        <h3>${t(`displayTitle`)}</h3>
        <div class="sub">${t(`consumersSub`)}</div>
        ${e.consumers.length?e.consumers.map(n=>{let r=e.hass.states[n.entityId],i=dt(r);return F`<div class="consumer">
                <label class="txt">
                  <span class="lbl">${t(`consumerName`)}</span>
                  <input
                    ${zt(e=>{e instanceof HTMLInputElement&&!Qt(e)&&e.value!==n.name&&(e.value=n.name)})}
                    maxlength="40"
                    aria-label=${t(`consumerName`)}
                    @input=${t=>e.onRenameConsumer(n.id,t.target.value)}
                  />
                  <span>${i?t(`consumerMissing`):n.entityId}</span>
                </label>
                <div class="icon-pick" role="group" aria-label=${t(`consumerIcon`)}>
                  ${st.map(r=>F`<button
                      type="button"
                      class=${n.icon===r?`on`:``}
                      aria-pressed=${n.icon===r}
                      aria-label=${t(Zt[r])}
                      @click=${()=>e.onConsumerIcon(n.id,r)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${ct[r]} /></svg>
                    </button>`)}
                </div>
                <div class="seg" role="group" aria-label=${n.name}>
                  <button type="button" class=${n.mode===`included`?`on`:``} aria-pressed=${n.mode===`included`} @click=${()=>e.onConsumerMode(n.id,`included`)}>${t(`modeIncluded`)}</button>
                  <button type="button" class=${n.mode===`separate`?`on`:``} aria-pressed=${n.mode===`separate`} @click=${()=>e.onConsumerMode(n.id,`separate`)}>${t(`modeSeparate`)}</button>
                </div>
                <button type="button" class="btn ghost" @click=${()=>e.onRemoveConsumer(n.id)}>${t(`removeConsumer`)}</button>
              </div>`}):F`<p class="hint">${t(`consumersEmpty`)}</p>`}
        ${e.wallbox?F`<button type="button" class="btn add" @click=${e.onUseWallbox}>${t(`useWallbox`)}</button>`:L}
        ${e.consumers.length<6?F`<button type="button" class="btn add" @click=${()=>e.onPick(!e.picking)}>${t(`addConsumer`)}</button>`:L}
        ${e.picking?F`<div class="picker">
              <input
                type="search"
                placeholder=${t(`consumerSearch`)}
                aria-label=${t(`consumerSearch`)}
                .value=${e.pickQuery}
                @input=${t=>e.onPickQuery(t.target.value)}
              />
              ${e.choices.length?e.choices.map(t=>F`<button type="button" class="pick" @click=${()=>e.onAddConsumer(t.id,t.name)}>
                      <b>${t.name}</b><span>${t.id}</span>
                    </button>`):F`<p class="hint">${t(`noPowerSensors`)}</p>`}
            </div>`:L}
        ${e.consumersSheet?F`<button type="button" class="btn primary flow-consumers-done" @click=${e.onClose}>${t(`arrangeDone`)}</button>`:L}
      </div>
      ${e.consumersSheet?L:F`<a class="link" href="#settings" @click=${t=>{t.preventDefault(),e.onAllSettings()}}>${t(`allSettings`)}</a>`}
    </aside>`}var tn=e=>Array.isArray(e)&&e.every(e=>Array.isArray(e)&&e.length===2&&Number.isFinite(e[0]));function nn(e){if(!e)return;let t=e;if(!(!tn(t.trajectory_points)||!tn(t.pv_points)||!tn(t.house_points)||!tn(t.grid_points)||!Array.isArray(t.trajectory_phases)||t.trajectory_points.length<2))return t}var rn=e=>e.map(([e,t])=>[e,t/1e3]);function an(e){if(!e||e===`unknown`||e===`unavailable`||e===`–`)return;let t=e.match(/(\d+)\s*h/i),n=e.match(/(\d+)\s*min/i);if(t||n)return(t?Number(t[1]):0)+(n?Number(n[1]):0)/60}function on(e,t){let n=new Intl.DateTimeFormat(`en-US`,{timeZone:t,hour12:!1,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`}),r=(e,t)=>Number(t.find(t=>t.type===e)?.value??0),i=n.formatToParts(new Date(e)),a=r(`hour`,i)%24;return Date.UTC(r(`year`,i),r(`month`,i)-1,r(`day`,i),a,r(`minute`,i),r(`second`,i))-e}function sn(e,t){if(!t){let t=new Date(e);return t.setHours(24,0,0,0),t.getTime()}let n=new Intl.DateTimeFormat(`en-CA`,{timeZone:t,year:`numeric`,month:`2-digit`,day:`2-digit`}).formatToParts(new Date(e)),r=e=>Number(n.find(t=>t.type===e)?.value),i=Date.UTC(r(`year`),r(`month`)-1,r(`day`)+1,0,0,0);return i-on(i,t)}var cn=-30,ln=e=>e<cn;function un(e,t,n={}){let r=n.now??Date.now(),i=e.filter(([e])=>e>r);if(!i.length)return;let a=sn(r,n.timeZone),o=0;for(;o<i.length-1&&i[o+1][1]<=i[o][1]+.2;)o++;let s=o<i.length-1?i.slice(o).reduce((e,t)=>t[1]>e[1]?t:e):void 0,c=s?s[0]<=a?`today`:`tomorrow`:void 0,l=n.reserve!==void 0&&n.reserve>0?n.reserve:.5,u=n.currentSoc!==void 0&&Number.isFinite(n.currentSoc)?n.currentSoc:i[0][1],d,f;u>l+.5?(d=i.find(([,e])=>e<=l)?.[0],d!==void 0&&(f=`down`)):u<l-.5&&(d=i.find(([,e])=>e>=l)?.[0],d!==void 0&&(f=`up`));let p=new Map(tn(n.battery)?n.battery:[]),m=t.filter(([e])=>e>r).map(([e,t])=>[e,ln(t)&&-t>Math.max(0,-(p.get(e)??0))]),h=n.currentGrid!==void 0&&Number.isFinite(n.currentGrid)?ln(n.currentGrid):m[0]?.[1],g,_;if(m.length){if(h&&m[0][1]){let e=0;for(;e<m.length&&m[e][1];)e++;e>=m.length?_=`ongoing`:(g=m[e][0],_=`until`)}else for(let e=0;e<m.length;e++){if(!m[e][1])continue;let t=m[e+1];if(!t||t[1]){g=m[e][0],_=`starts`;break}}}return{peakSoc:s?.[1],peakAt:s?.[0],peakDay:c,floorAt:d,floorKind:f,gridImportAt:g,gridImportKind:_}}function dn(e){return{imp:e.map(([e,t])=>[e,Math.max(0,-t)/1e3]),exp:e.map(([e,t])=>[e,Math.max(0,t)/1e3])}}function fn(e,t){let n=[],r=0;for(let i=1;i<=e.length;i++)(i===e.length||e[i]!==e[r])&&(n.push({phase:e[r],x:t[r][0],x2:t[Math.min(i,t.length)-1][0]}),r=i);return n}var pn=e=>e.grid_charge_kwh>0?`charge`:e.hold?`hold`:`release`;function mn(e){return Array.isArray(e)?e.filter(e=>!!e&&typeof e.start==`string`&&Number.isFinite(Date.parse(e.start))&&Number.isFinite(e.price)):[]}function hn(e){return e.filter(e=>Number.isFinite(e.soc_pct)).map(e=>[Date.parse(e.start),e.soc_pct])}function gn(e){if(e.length<3)return e;let t=e.map(e=>Date.parse(e.start)),n=t.slice(1).map((e,n)=>e-t[n]).sort((e,t)=>e-t),r=n[Math.floor(n.length/2)];return e.filter((n,i)=>i===e.length-1||t[i+1]-t[i]>=r*.5)}function _n(e){if(e.length)return{min:e.reduce((e,t)=>t.price<e.price?t:e),max:e.reduce((e,t)=>t.price>e.price?t:e)}}function vn(e,t){if(e===`off`)return`off`;if(e===`slots`)return`slots`;if(e===`threshold`)return`threshold`;let n=typeof t.status==`string`?t.status:void 0;return n===`no_prices`?`no_prices`:n===`no_profile`?`no_profile`:n===`no_room`?`no_room`:(e===`dynamic_auto`||e===`dynamic_expert`)&&(t.enabled!==!0||n===void 0)?`computing`:`no_plan`}function yn(e){return(e??[]).map(e=>{let t=e.lc??e.lu,n=t===void 0?Date.parse(e.last_changed??e.last_updated??``):t*1e3;return{state:e.s??e.state??``,attrs:e.a??e.attributes??{},ts:n}}).filter(e=>Number.isFinite(e.ts))}function bn(e){return e.map(e=>[e.ts,Number.parseFloat(e.state)]).filter(([,e])=>Number.isFinite(e))}function xn(e,t,n){let r=new Map;for(let[n,i]of e){let e=Math.floor(n/t)*t,a=r.get(e);a?a.push(i):r.set(e,[i])}return[...r.entries()].sort(([e],[t])=>e-t).map(([e,t])=>[e,n===`last`?t[t.length-1]:t.reduce((e,t)=>e+t,0)/t.length])}function Sn(e,t,n=12){let r=(e,t,n)=>{let r=typeof e.timestamp==`string`?Date.parse(e.timestamp):NaN;return{phase:typeof e.phase==`string`?e.phase:t,reason:typeof e.reason==`string`?e.reason:``,ts:Number.isFinite(r)?r:n}},i=e=>e===`unavailable`||e===`unknown`||e===``,a=e.filter(e=>!i(e.state)||typeof e.attrs.phase==`string`).map(e=>r(e.attrs,e.state,e.ts));if(Array.isArray(t))for(let e of t)e&&typeof e==`object`&&a.push(r(e,``,Date.now()));a.sort((e,t)=>t.ts-e.ts);let o=[];for(let e of a){if(!e.phase)continue;let t=o[o.length-1];t&&t.phase===e.phase?o[o.length-1]=e:o.push(e)}return o.slice(0,n)}function Cn(e,t,n,r,i=Date.now()){return e.callWS({type:`history/history_during_period`,start_time:new Date(n).toISOString(),end_time:new Date(i).toISOString(),entity_ids:t,include_start_time_state:!0,...r})}var wn=()=>{let e=new Date;return e.setHours(0,0,0,0),e.getTime()},Tn=[`costNet`,`saving`,`selfUse`,`chargedToday`,`costToday`,`feedRevenue`,`wear`,`balance`,`gridToBattery`,`wallboxEnergy`,`curtailAvoided`];function En(e){if(!e?.length)return;let t=!1,n=0;for(let r of e)typeof r.change==`number`&&Number.isFinite(r.change)&&(t=!0,n+=r.change);return t?n:void 0}var Dn=[`costNet`,`costToday`,`feedRevenue`,`wear`,`saving`,`selfUse`,`importToday`,`feedToday`,`chargedToday`,`dischargedToday`,`gridToBattery`,`wallboxEnergy`,`curtailAvoided`,`feedInAvoided`,`feedInInterventions`].filter(e=>e!==`costNet`),U=(e=new Date)=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`,W=e=>{let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t){let e=new Date;return e.setHours(0,0,0,0),e}return new Date(Number(t[1]),Number(t[2])-1,Number(t[3]))},On=e=>e===U();function kn(e,t,n,r=14){for(e.delete(t),e.set(t,n);e.size>r;){let t=e.keys().next().value;if(t===void 0)break;e.delete(t)}}function An(e,t){let n=e.get(t);if(n!==void 0)return e.delete(t),e.set(t,n),n}var jn=(e,t=Date.now())=>{let n=new Date(t);return e===`week`?n.setDate(n.getDate()-(n.getDay()+6)%7):n.setDate(1),n.setHours(0,0,0,0),n.getTime()};function Mn(e){let t=W(e);return t.setDate(t.getDate()-(t.getDay()+6)%7),t}function Nn(e,t=Date.now()){let n=U(new Date(t));return e>n?n:e}function Pn(e,t,n=Date.now()){let r=U(new Date(n)),i=Nn(t,n),a,o;if(e===`day`)a=W(i),o=new Date(a),o.setDate(o.getDate()+1);else if(e===`week`)a=Mn(i),o=new Date(a),o.setDate(o.getDate()+7);else if(e===`month`){let e=W(i);a=new Date(e.getFullYear(),e.getMonth(),1),o=new Date(e.getFullYear(),e.getMonth()+1,1)}else{let e=W(i);a=new Date(e.getFullYear(),0,1),o=new Date(e.getFullYear()+1,0,1)}let s=U(a),c=U(o),l=s<=r&&r<c;return{grain:e,anchor:i,start:s,end:c,startMs:a.getTime(),endMs:l?n:o.getTime(),live:l,cacheKey:`${e}:${s}`}}function Fn(e,t,n,r=Date.now()){let i=W(Nn(t,r));return e===`day`?i.setDate(i.getDate()+n):e===`week`?i.setDate(i.getDate()+7*n):e===`month`?i.setMonth(i.getMonth()+n):i.setFullYear(i.getFullYear()+n),Nn(U(i),r)}function In(e,t=Date.now()){if(e.live)return!1;let n=Pn(e.grain,Fn(e.grain,e.anchor,1,t),t);return n.cacheKey!==e.cacheKey||n.live}function Ln(e,t,n){if(e.grain===`day`&&e.live)return n;let r=W(e.start);if(e.grain===`day`)return r.toLocaleDateString(t,{weekday:`short`,day:`numeric`,month:`short`});if(e.grain===`week`){let n=W(e.end);return n.setDate(n.getDate()-1),`${r.toLocaleDateString(t,{weekday:`short`,day:`numeric`,month:`short`})} – ${n.toLocaleDateString(t,{weekday:`short`,day:`numeric`,month:`short`})}`}return e.grain===`month`?r.toLocaleDateString(t,{month:`long`,year:`numeric`}):String(r.getFullYear())}var Rn=[`costToday`,`feedRevenue`,`saving`,`wear`];function zn(e){let{feedRevenue:t,saving:n,costToday:r,wear:i}=e;if(t!==void 0||n!==void 0||r!==void 0||i!==void 0)return(t??0)+(n??0)-(r??0)-(i??0)}function Bn(e){let t=e.start;if(typeof t==`number`&&Number.isFinite(t))return t>0xe8d4a51000?t:t*1e3;if(typeof t==`string`){let e=Date.parse(t);return Number.isFinite(e)?e:void 0}}function Vn(e){let t=new Map;for(let n of e??[]){let e=Bn(n);e!==void 0&&typeof n.change==`number`&&Number.isFinite(n.change)&&t.set(U(new Date(e)),n.change)}return t}function Hn(e,t,n=Date.now()){let r=Object.fromEntries(Rn.map(t=>[t,Vn(e[z[t]])])),i=jn(t,n),a=U(new Date(n)),o=[],s=new Date(i);for(;U(s)<=a;){let e=U(s),t={costToday:r.costToday.get(e),feedRevenue:r.feedRevenue.get(e),saving:r.saving.get(e),wear:r.wear.get(e)};o.push({day:e,ts:s.getTime(),...t,balance:zn(t)}),s.setDate(s.getDate()+1)}return o}async function Un(e,t,n,r){return e.callWS({type:`recorder/statistics_during_period`,start_time:new Date(t).toISOString(),end_time:new Date(n).toISOString(),statistic_ids:r.map(e=>z[e]),period:`day`,types:[`change`]})}async function Wn(e,t,n){let r=await Un(e,t,n,Dn),i={};for(let e of Dn){let t=En(r[z[e]]);t!==void 0&&(i[e]=t)}return i.costToday!==void 0&&i.feedRevenue!==void 0&&(i.costNet=i.costToday-i.feedRevenue),i}async function Gn(e,t){let n=Date.now();return Hn(await Un(e,jn(t,n),n,Rn),t,n)}async function Kn(e,t){return Wn(e,t.startMs,t.endMs)}async function qn(e,t){let n=!!t&&!On(t),r=n?W(t).getTime():wn(),i=n?(()=>{let e=W(t);return e.setDate(e.getDate()+1),e.getTime()})():Date.now(),a=await Cn(e,Tn.map(e=>z[e]),r,{minimal_response:!0,no_attributes:!0,significant_changes_only:!1},i),o={};for(let e of Tn)o[e]=xn(bn(yn(a[z[e]])),18e5,`last`);return o}var Jn=864e5,Yn={minimal_response:!0,no_attributes:!0,significant_changes_only:!1},Xn=(e,t,n)=>{let r=e.states[t]?.attributes.unit_of_measurement===`kW`?1e3:1;return xn(bn(yn(n)).map(([e,t])=>[e,t*r]),3e5,`mean`)};async function Zn(e,t,n=1){return xn(bn(yn((await Cn(e,[t],Date.now()-Jn,Yn))[t])).map(([e,t])=>[e,t*n]),3e5,`mean`)}async function Qn(e,t){let n=[...new Set(t)],r={};if(!n.length)return r;let i=await Cn(e,n,Date.now()-Jn,Yn);for(let t of n)r[t]=Xn(e,t,i[t]);return r}async function $n(e,t=6){let n=await Cn(e,[z.pv,z.house,z.soc],Date.now()-t*36e5,{minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),r=e=>xn(bn(yn(n[e])),3e5,`mean`);return{pv:r(z.pv),house:r(z.house),soc:r(z.soc)}}async function er(e){let t=await Cn(e,[z.lastAction],Date.now()-864e5,{minimal_response:!1,no_attributes:!1,significant_changes_only:!0}),n=e.states[z.lastAction]?.attributes.history;return Sn(yn(t[z.lastAction]),n)}var tr={dark:{text:`#e8edf7`,muted:`#8b96ad`,faint:`#5a6580`,bg:`#070b14`,grid:`rgba(255,255,255,0.06)`,series:`#ffffff`,track:`rgba(255,255,255,0.06)`,mode:`dark`},classic:{text:`#152033`,muted:`#5b6b80`,faint:`#8b97a8`,bg:`#eef2f6`,grid:`rgba(21,32,51,0.08)`,series:`#152033`,track:`rgba(21,32,51,0.08)`,mode:`light`},e3dc:{text:`#4a4a4a`,muted:`#6e767c`,faint:`#a4aaae`,bg:`#f7f7f7`,grid:`rgba(30,37,43,0.08)`,series:`#4a4a4a`,track:`rgba(30,37,43,0.08)`,mode:`light`}},nr=tr.dark;function rr(e){nr=tr[e]}var G={pv:`#fbbf24`,house:`#a78bfa`,gridIn:`#f87171`,gridOut:`#34d399`,bat:`#22d3ee`,accent:`#38bdf8`,accent2:`#818cf8`,get text(){return nr.text},get muted(){return nr.muted},get faint(){return nr.faint},get bg(){return nr.bg},get grid(){return nr.grid},get series(){return nr.series},get track(){return nr.track},get mode(){return nr.mode}},ir={charge:G.gridOut,hold:G.pv,release:G.bat},ar=()=>({chart:{background:`transparent`,foreColor:G.muted,fontFamily:`Inter, system-ui, sans-serif`,toolbar:{show:!1},animations:{enabled:!1}},theme:{mode:G.mode},grid:{borderColor:G.grid,strokeDashArray:4},dataLabels:{enabled:!1},legend:{show:!1},tooltip:{theme:G.mode}}),or=e=>!!e&&typeof e==`object`&&!Array.isArray(e),sr=(e,t)=>{let n={...e};for(let[e,r]of Object.entries(t))n[e]=or(r)&&or(n[e])?sr(n[e],r):r;return n},cr=e=>sr(ar(),e),lr=e=>({x:Date.now(),borderColor:G.text,opacity:.6,label:{text:e,orientation:`horizontal`,borderWidth:0,style:{background:G.text,color:G.bg,fontWeight:700}}});function ur(e){if(!Array.isArray(e)||e.length!==12)return;let t=e.map(e=>typeof e==`number`&&Number.isFinite(e)?e:NaN);return t.some(e=>Number.isNaN(e))?void 0:t}function dr(e,t,n,r,i){let a=Array.from({length:12},(t,n)=>new Intl.DateTimeFormat(e||`de`,{month:`short`}).format(new Date(2024,n,1)));return cr({chart:{type:`line`,height:260},series:[{name:r,type:`area`,data:t},{name:i,type:`line`,data:n}],colors:[G.bat,G.gridIn],stroke:{curve:`smooth`,width:[2.5,1.5]},fill:{type:[`gradient`,`solid`],gradient:{shadeIntensity:.2,opacityFrom:.45,opacityTo:.02,stops:[0,100]}},xaxis:{categories:a,axisBorder:{show:!1},axisTicks:{show:!1}},yaxis:{min:0,title:{text:`kWh`},labels:{formatter:e=>String(Math.round(e))}}})}var fr=(e={})=>({type:`datetime`,labels:{datetimeUTC:!1,format:`HH:mm`},axisBorder:{show:!1},axisTicks:{show:!1},...e});function pr({traj:e,targetSoc:t,planSoc:n,ist:r,showIst:i,fmt:a,i18n:o}){let{imp:s,exp:c}=dn(e.grid_points),l=!!n&&n.length>=2,u=l?n:e.trajectory_points,d=l?o.t(`legendPlanSoc`):o.t(`legendSoc`),f=fn(e.trajectory_phases,e.trajectory_points).map(e=>{let t={x:e.x,x2:e.x2,fillColor:G.accent,opacity:.05};return e.x2-e.x>=18e5&&(t.label={text:o.phase(e.phase),borderWidth:0,orientation:`vertical`,position:`top`,offsetX:10,offsetY:10,style:{background:`transparent`,color:G.muted,fontSize:`11px`}}),t}),p=[{name:o.t(`legendPv`),type:`area`,data:rn(e.pv_points)},{name:o.t(`legendHouse`),type:`line`,data:rn(e.house_points)},{name:o.t(`legendImport`),type:`area`,data:s},{name:o.t(`legendFeed`),type:`area`,data:c},{name:d,type:`line`,data:u}],m=[G.pv,G.house,G.gridIn,G.gridOut,G.bat],h=[2,2,1.5,1.5,3.5],g=[0,4,0,0,0],_=[`gradient`,`solid`,`gradient`,`gradient`,`solid`],v=[{seriesName:o.t(`legendPv`),min:0,title:{text:`kW`},labels:{formatter:e=>a.n(e,1)}},{seriesName:o.t(`legendPv`),show:!1},{seriesName:o.t(`legendPv`),show:!1},{seriesName:o.t(`legendPv`),show:!1},{seriesName:d,opposite:!0,min:0,max:100,tickAmount:5,title:{text:`SoC %`},labels:{formatter:e=>`${Math.round(e)}%`}}],y=-1;if(i&&r&&(r.pv.length>1||r.house.length>1)){y=p.length;let t=(e,t)=>{let n=e[e.length-1],r=t[0];return n&&r&&r[0]>n[0]?[...e,r]:e};p.push({name:`${o.t(`legendPv`)} ${o.t(`legendActual`)}`,type:`line`,data:rn(t(r.pv,e.pv_points))},{name:`${o.t(`legendHouse`)} ${o.t(`legendActual`)}`,type:`line`,data:rn(t(r.house,e.house_points))},{name:`${o.t(`legendSoc`)} ${o.t(`legendActual`)}`,type:`line`,data:t(r.soc,u)}),m.push(G.pv,G.house,G.bat),h.push(1.5,1.5,1.5),g.push(0,0,0),_.push(`solid`,`solid`,`solid`),v.push({seriesName:o.t(`legendPv`),show:!1},{seriesName:o.t(`legendPv`),show:!1},{seriesName:d,opposite:!0,min:0,max:100,show:!1})}return cr({chart:{id:`fc`,type:`line`,height:420,zoom:{enabled:!0,type:`x`},toolbar:{show:!1,autoSelected:`zoom`}},grid:{padding:{top:t!==void 0&&t>=90?28:8}},series:p,colors:m,stroke:{width:h,curve:`smooth`,dashArray:g},fill:{type:_,gradient:{opacityFrom:.45,opacityTo:.02},opacity:p.map((e,t)=>y>=0&&t>=y?.55:1)},xaxis:fr({tooltip:{enabled:!1}}),yaxis:v,tooltip:{shared:!0,intersect:!1,x:{format:`HH:mm`},y:{formatter:(e,t)=>e==null?`–`:t?.seriesIndex===4||y>=0&&t?.seriesIndex===y+2?`${a.n(e)} %`:`${a.n(e,2)} kW`}},markers:{size:0,hover:{size:5}},annotations:{xaxis:[...f,lr(o.t(`now`))],yaxis:t===void 0?[]:[{y:t,yAxisIndex:4,borderColor:G.accent2,strokeDashArray:6,label:{text:o.t(`targetLabel`,{v:Math.round(t)}),position:`right`,textAnchor:`end`,offsetX:-8,offsetY:-16,borderWidth:0,style:{background:`rgba(7,11,20,.85)`,color:`#c7d2fe`,fontSize:`12px`,padding:{left:6,right:6,top:3,bottom:3}}}}]}})}function mr(e){let t=e.trajectory_points[0][0],n=e.trajectory_points[e.trajectory_points.length-1][0];return cr({chart:{id:`fc-brush`,type:`area`,height:90,brush:{enabled:!0,target:`fc`},selection:{enabled:!0,xaxis:{min:t,max:n},fill:{color:G.accent,opacity:.12},stroke:{color:G.accent}}},series:[{name:`PV`,data:rn(e.pv_points)},{name:`House`,data:rn(e.house_points)}],colors:[G.pv,G.house],stroke:{width:1.5,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.35,opacityTo:0}},xaxis:fr(),yaxis:{show:!1,min:0},grid:{show:!1},tooltip:{enabled:!1}})}function hr({slots:e,fmt:t,i18n:n}){let r=gn(e),i=e=>Date.parse(e.start),a=e=>{let r=pn(e);return r===`charge`?n.t(`slotCharge`,{kwh:t.n(e.grid_charge_kwh,2)}):r===`hold`?n.t(`slotHold`):n.t(`slotRelease`)},o=(e,t)=>`<div style="display:flex;justify-content:space-between;gap:16px;color:${G.muted}"><span>${e}</span><b style="color:${G.text}">${t}</b></div>`;return cr({chart:{type:`line`,height:360,zoom:{enabled:!0,type:`x`},toolbar:{show:!1,autoSelected:`zoom`}},series:[{name:n.t(`slotPrice`),type:`column`,data:r.map(e=>({x:i(e),y:+(e.price*100).toFixed(1),fillColor:ir[pn(e)]}))},{name:n.t(`legendPlanSoc`),type:`line`,data:r.map(e=>({x:i(e),y:e.soc_pct}))}],colors:[G.bat,G.series],stroke:{width:[0,2.5],curve:`stepline`},plotOptions:{bar:{columnWidth:`78%`,borderRadius:4,borderRadiusApplication:`end`}},fill:{opacity:[.85,1]},xaxis:fr(),yaxis:[{title:{text:`ct/kWh`},labels:{formatter:e=>t.n(e,0)}},{opposite:!0,min:0,max:100,title:{text:`SoC %`},labels:{formatter:e=>`${Math.round(e)}%`}}],tooltip:{shared:!0,intersect:!1,custom:({dataPointIndex:e})=>{let i=r[e];return i?`<div style="padding:12px 14px;min-width:190px">
          <div style="font-weight:700;margin-bottom:8px">${t.dayTime(i.start)}</div>
          ${o(n.t(`slotPrice`),`${t.n(i.price*100)} ct`)}
          ${o(n.t(`slotSoc`),`${t.n(i.soc_pct)} %`)}
          ${o(n.t(`slotConsumption`),`${t.n(i.consumption_kwh,2)} kWh`)}
          <div style="margin-top:8px;color:${ir[pn(i)]};font-weight:600">${a(i)}</div></div>`:``}},annotations:{xaxis:[lr(n.t(`now`))]}})}function gr(e,t){let n=e=>Math.min(1,Math.max(0,e/100)),r=n(e),i=t===void 0?void 0:n(t),a=e=>`${+(e*270).toFixed(2)}deg`,o=[],s=(e,t,n)=>{n-t<.001||o.push(`${e} ${a(t)}`,`${e} ${a(n)}`)},c=i===void 0?0:Math.min(r,i);i!==void 0&&i>0&&(s(`var(--warn)`,0,c),s(`color-mix(in srgb, var(--warn) 40%, transparent)`,c,i));let l=i===void 0?0:c;return r>l&&o.push(`var(--bat) ${a(l)}`,`color-mix(in srgb, var(--bat) 55%, white) ${a(r)}`),s(`var(--switch-track)`,Math.max(r,i??0),1),o.push(`transparent ${a(1)}`,`transparent 360deg`),`conic-gradient(from 225deg, ${o.join(`, `)})`}function _r(e,t){return cr({chart:{type:`line`,height:220},series:e.map(e=>({name:e.name,data:rn(e.points)})),colors:[G.accent,G.house,G.pv],stroke:{width:2,curve:`smooth`},legend:{show:!1},xaxis:fr(),yaxis:{decimalsInFloat:1,title:{text:`kW`},labels:{formatter:e=>t.n(e,1)}},tooltip:{shared:!0,intersect:!1,x:{format:`dd.MM. HH:mm`},y:{formatter:e=>`${t.n(e,2)} kW`}}})}function vr(e,t,n){return cr({chart:{type:`area`,height:280},series:[{data:rn(e)}],colors:[t],stroke:{width:2,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.32,opacityTo:.02}},xaxis:fr(),yaxis:{decimalsInFloat:1,title:{text:`kW`},labels:{formatter:e=>n.n(e,1)}},tooltip:{x:{format:`dd.MM. HH:mm`},y:{formatter:e=>`${n.n(e,2)} kW`}}})}function yr(e,t){return cr({chart:{type:`area`,height:56,sparkline:{enabled:!0}},series:[{data:e}],colors:[t],stroke:{width:2,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.35,opacityTo:0}},xaxis:{type:`datetime`},tooltip:{enabled:!1}})}var br=(e,t)=>e>=0?t?`#6ee7b7`:`rgba(52, 211, 153, 0.78)`:t?`#fca5a5`:`rgba(248, 113, 113, 0.78)`,xr=(e,t,n)=>{let r=new Date(e);return n?r.toLocaleDateString(t,{day:`numeric`}):r.toLocaleDateString(t,{weekday:`short`,day:`numeric`})},Sr=e=>{if(!Number.isFinite(e)||e===0)return 0;let t=e<0?-1:1,n=Math.abs(e),r=Math.floor(Math.log10(n)),i=n/10**r;return t*(i<=1?1:i<=2?2:i<=5?5:10)*10**r},Cr=e=>!Number.isFinite(e)||e===0?0:-Sr(-e);function wr(e,t,n=.1){let r=e.filter(e=>Number.isFinite(e)),i=t.filter(e=>Number.isFinite(e)),a=r.length?Math.min(...r,0):0,o=r.length?Math.max(...r,0):1,s=o-a||1;a-=s*n,o+=s*n,a>0&&(a=0),o<0&&(o=0),a=Cr(a),o=Sr(o),a===o&&(a=Math.min(0,a-1),o=Math.max(0,o+1));let c=i.length?Math.min(...i):0,l=i.length?Math.max(...i):1,u=o-a,d=(0-a)/u;if(d<=1e-6){let e=Sr(Math.max(l,0)*(1+n)||1);return{primary:{min:a,max:o},secondary:{min:0,max:Math.max(e,1)}}}if(d>=1-1e-6){let e=Cr(Math.min(c,0)*(1+n)||-1);return{primary:{min:a,max:o},secondary:{min:Math.min(e,-1),max:0}}}let f=Math.max(0,-Math.min(c,0)),p=Math.max(0,Math.max(l,0)),m=Math.max(f/d,p/(1-d),2**-52)*(1+n),h=Sr((1-d)*m),g=h===0?Cr(-d*m):-(d/(1-d))*h;return{primary:{min:a,max:o},secondary:{min:g,max:Math.max(h,1e-6)}}}function Tr({days:e,fmt:t,i18n:n,onDay:r}){let i=U(),a=e.length>14,o=(e,t,n)=>`<div style="display:flex;justify-content:space-between;gap:18px;color:${G.muted}"><span>${e}</span><b style="color:${n??G.text};font-variant-numeric:tabular-nums">${t}</b></div>`,s=0,c=e.map(e=>xr(e.ts,t.loc,a)),l=e.map(e=>{let n=e.day===i;return{x:xr(e.ts,t.loc,a),y:e.balance===void 0?null:+e.balance.toFixed(2),fillColor:e.balance===void 0?G.faint:br(e.balance,n)}}),u=e.map(e=>(e.balance!==void 0&&(s+=e.balance),{x:xr(e.ts,t.loc,a),y:+s.toFixed(2)})),d=wr(l.map(e=>e.y).filter(e=>e!==null),u.map(e=>e.y)),f=e.findIndex(e=>e.day===i),p=n.t(`pulseDaily`),m=n.t(`pulseCumulative`),h=(e,t)=>({text:e,offsetX:0,offsetY:0,style:{color:t,fontSize:`12px`,fontWeight:700,fontFamily:`Inter, system-ui, sans-serif`}});return cr({chart:{type:`line`,height:268,parentHeightOffset:0,animations:{enabled:!0,speed:480,animateGradually:{enabled:!0,delay:24},dynamicAnimation:{enabled:!1}},events:{click:(t,n,i)=>{let a=i.dataPointIndex;if(a===void 0||a<0||(i.seriesIndex??0)>0)return;let o=e[a];o&&r?.(o.day)}}},series:[{name:p,type:`column`,data:l},{name:m,type:`area`,data:u}],colors:[G.gridOut,G.accent],stroke:{width:[0,2.5],curve:[`smooth`,`straight`],lineCap:`round`},plotOptions:{bar:{columnWidth:a?`42%`:`46%`,borderRadius:4,borderRadiusApplication:`end`,borderRadiusWhenStacked:`last`}},fill:{type:[`solid`,`gradient`],opacity:[.9,1],gradient:{type:`vertical`,shadeIntensity:.15,gradientToColors:[G.accent],inverseColors:!1,opacityFrom:.28,opacityTo:.02,stops:[0,95]}},markers:{size:[0,0],hover:{size:5,sizeOffset:1},strokeWidth:0,colors:[G.accent]},legend:{show:!0,position:`top`,horizontalAlign:`left`,fontSize:`12px`,fontWeight:600,markers:{size:5,shape:`circle`,offsetX:-2},itemMargin:{horizontal:14,vertical:0},labels:{colors:G.text},onItemClick:{toggleDataSeries:!1},onItemHover:{highlightDataSeries:!0}},grid:{borderColor:G.grid,strokeDashArray:3,padding:{left:8,right:8,top:4,bottom:0},xaxis:{lines:{show:!1}},yaxis:{lines:{show:!0}}},xaxis:{type:`category`,categories:c,tickPlacement:`on`,tickAmount:a?Math.min(10,e.length):e.length,labels:{rotate:0,hideOverlappingLabels:!0,style:{colors:G.muted,fontSize:a?`10px`:`11px`,fontWeight:550}},axisBorder:{show:!1},axisTicks:{show:!1},crosshairs:{show:!0,width:1,stroke:{color:G.accent,width:1,dashArray:4}}},yaxis:[{seriesName:p,min:d.primary.min,max:d.primary.max,tickAmount:5,forceNiceScale:!1,decimalsInFloat:0,title:h(n.t(`pulseDailyAxis`),G.muted),labels:{style:{colors:G.muted,fontSize:`11px`,fontWeight:550},formatter:e=>`${t.n(e,0)} €`}},{seriesName:m,opposite:!0,min:d.secondary.min,max:d.secondary.max,tickAmount:5,forceNiceScale:!1,decimalsInFloat:0,title:h(n.t(`pulseSumAxis`),G.accent),labels:{style:{colors:G.accent,fontSize:`11px`,fontWeight:600},formatter:e=>e<-1e-9?``:`${t.n(e,0)} €`}}],annotations:{yaxis:[{y:0,yAxisIndex:0,borderColor:`rgba(148,163,184,0.55)`,strokeDashArray:0,opacity:.9}],...f>=0?{xaxis:[{x:c[f],borderColor:G.accent,strokeDashArray:5,opacity:.55,label:{text:n.t(`periodToday`),orientation:`horizontal`,borderWidth:0,offsetY:-2,style:{background:G.accent,color:G.bg,fontSize:`10px`,fontWeight:700,padding:{left:6,right:6,top:2,bottom:2}}}}]}:{}},tooltip:{shared:!0,intersect:!1,custom:({dataPointIndex:r})=>{let i=e[r];if(!i)return``;let a=u[r]?.y;return`<div style="padding:12px 14px;min-width:212px">
          <div style="font-weight:700;margin-bottom:8px;color:${G.text}">${t.day(i.ts)}</div>
          ${o(p,`${t.n(i.balance,2)} €`,i.balance!==void 0&&i.balance<0?G.gridIn:G.gridOut)}
          ${o(m,`${t.n(a,2)} €`,G.accent)}
          <div style="height:1px;background:${G.grid};margin:8px 0"></div>
          ${o(n.t(`kpiRevenue`),`${t.n(i.feedRevenue,2)} €`)}
          ${o(n.t(`kpiSaving`,{when:``}).trim(),`${t.n(i.saving,2)} €`)}
          ${o(n.t(`kpiCostGross`),`${t.n(i.costToday,2)} €`)}
          ${o(n.t(`kpiWear`),`${t.n(i.wear,2)} €`)}
          <div style="margin-top:8px;color:${G.muted};font-size:11px">${n.t(`pulseClickDay`)}</div>
        </div>`}}})}var Er=[`nodes`,`blob`,`city`],Dr=`e3dc-maestro.flow-style.v1`;function Or(e){return e===`blob`||e===`city`?e:`nodes`}function kr(){try{return Or(localStorage.getItem(Dr))}catch{return`nodes`}}function Ar(e){try{localStorage.setItem(Dr,e)}catch{}}var jr=`e3dc-maestro.consumer-places.v3`,Mr=`e3dc-maestro.consumer-places.v2`,Nr=`e3dc-maestro.consumer-places.v1`,Pr=.55,Fr=36,Ir=160,Lr=e=>typeof e.dx==`number`&&Number.isFinite(e.dx)&&typeof e.dy==`number`&&Number.isFinite(e.dy),Rr=e=>typeof e.t==`number`&&Number.isFinite(e.t)&&typeof e.r==`number`&&Number.isFinite(e.r);function zr(){return{nodes:{},blob:{},city:{}}}function Br(e){if(!e||typeof e!=`object`)return{};let t={};for(let[n,r]of Object.entries(e)){if(!n||!r||typeof r!=`object`)continue;let e=r;Lr(e)?t[n]={dx:e.dx,dy:e.dy}:Rr(e)&&(t[n]={t:Math.min(1,Math.max(0,e.t)),r:Math.min(1.35,Math.max(.35,e.r))})}return t}function Vr(e){if(!e||typeof e!=`object`||Array.isArray(e))return null;let t=e;if(!Er.some(e=>e in t&&t[e]!==null&&typeof t[e]==`object`&&!Array.isArray(t[e])))return null;let n=zr();for(let e of Er)n[e]=Br(t[e]);return n}function Hr(e){try{return JSON.parse(localStorage.getItem(e)??`null`)}catch{return null}}function Ur(e){let t={};for(let[n,r]of Object.entries(e))r&&`dx`in r&&(t[n]=r);return t}function Wr(){let e=Vr(Hr(jr));if(e)return e;let t=Br(Hr(Mr)),n=Object.keys(t).length?t:Br(Hr(Nr)),r=zr();if(!Object.keys(n).length)return r;for(let e of Er)r[e]={...n};return Gr(r),r}function Gr(e){try{let t={};for(let n of Er)t[n]=Ur(e[n]??{});localStorage.setItem(jr,JSON.stringify(t))}catch{}}function Kr(e,t){return t<=1?.5:e/(t-1)}function qr(e,t,n){let r=Math.min(1,Math.max(0,e)),i=n.radius*Math.min(1.35,Math.max(.35,t)),a=n.startAngle+r*(n.endAngle-n.startAngle);return{x:n.origin.x+Math.cos(a)*i,y:n.origin.y+Math.sin(a)*i}}function Jr(e,t){return{origin:e,radius:112+Math.min(t,6)*8,startAngle:-.95,endAngle:.95}}function Yr(e,t,n,r){let i=r===`separate`?Pr:1,a=qr(Kr(e,t),i,n);return{dx:a.x-n.origin.x,dy:a.y-n.origin.y}}function Xr(e,t,n,r,i){if(!e)return Yr(t,n,r,i);if(`dx`in e)return e;let a=qr(e.t,e.r,r);return{dx:a.x-r.origin.x,dy:a.y-r.origin.y}}function Zr(e,t,n,r){return e.map((i,a)=>{let o=r?.[a],s=Xr(t[i],a,e.length,n,o);return{x:n.origin.x+s.dx,y:n.origin.y+s.dy,labelSide:`right`,labelDy:0}})}function Qr(e,t,n,r){let i=e,a=t;return r&&(i=Math.min(r.maxX,Math.max(r.minX,i)),a=Math.min(r.maxY,Math.max(r.minY,a))),{dx:i-n.x,dy:a-n.y}}function $r(e){return e?200:0}function ei(e,t,n){let r=qr(0,1.35,t).y-36,i=qr(1,1.35,t).y+36,a=r>=0?e+(e-r)+24:i+24;return Math.max(n,Math.ceil(i+24),Math.ceil(a))}function ti(e,t,n){if(!e.length)return{w:t,h:n};let r=t,i=n,a=0;for(let t of e)r=Math.max(r,t.x+Ir),i=Math.max(i,t.y+44),a=Math.min(a,t.y-36);return{w:Math.ceil(r+16),h:Math.ceil(i-Math.min(0,a)+16)}}function ni(e,t,n){return{minX:Math.min(e.origin.x-120,Fr),maxX:Math.max(t-Fr,e.origin.x+e.radius*1.5),minY:Fr,maxY:Math.max(n-Fr,e.origin.y+e.radius*1.5)}}function ri(e,t,n){let r=e.getScreenCTM();if(!r)return;let i=e.createSVGPoint();i.x=t,i.y=n;let a=i.matrixTransform(r.inverse());return{x:a.x,y:a.y}}function ii(e,t,n,r,i,a){if(!r||!i)return;let o=e.currentTarget;if(!(o instanceof SVGElement))return;let s=o.ownerSVGElement;if(!s)return;e.preventDefault(),e.stopPropagation(),o.setPointerCapture(e.pointerId);let c=e=>{let r=ri(s,e.clientX,e.clientY);r&&i(t,Qr(r.x,r.y,n,a))},l=e=>{try{o.releasePointerCapture(e.pointerId)}catch{}window.removeEventListener(`pointermove`,c),window.removeEventListener(`pointerup`,l)};window.addEventListener(`pointermove`,c),window.addEventListener(`pointerup`,l),c(e)}var ai=`data:image/png;base64,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`,oi={pv:`M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z`,grid:`M12 2 7 22M12 2l5 20M5 9h14M4 15h16`,house:`M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6`,bat:`M7 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM10 3h4`},si=24,ci=2.15;function li(e){let t=e*2;return(t-Math.max(3,t*.05)*2)/si}var ui=1.08;function di(e){return(ui+li(e))/2}function fi(e,t,n){let r=si/2*n;return`translate(${e-r} ${t-r}) scale(${n})`}var pi={x:6.6,y:7.6,w:10.8,h:10.8};function mi(e){if(typeof e!=`number`||!Number.isFinite(e)||e<=0)return;let t=Math.min(100,e)/100,n=pi.h*t;return{x:pi.x,y:pi.y+pi.h-n,width:pi.w,height:n}}var hi={wide:{box:[600,420],hub:{x:300,y:215},pv:{x:300,y:100,labelDy:-72},grid:{x:90,y:215,labelDy:70},house:{x:510,y:215,labelDy:70},bat:{x:300,y:320,labelDy:70}},compact:{box:[360,520],hub:{x:180,y:250},pv:{x:180,y:95,labelDy:-72},grid:{x:62,y:250,labelDy:70},house:{x:298,y:250,labelDy:70},bat:{x:180,y:405,labelDy:70}}},gi=30,_i=42,vi=26,yi=46,bi=16;function xi(e,t,n,r){let i=t.x-e.x,a=t.y-e.y,o=Math.hypot(i,a)||1,s=Math.min(n,o/2),c=Math.min(r,o/2);return{x1:e.x+i/o*s,y1:e.y+a/o*s,x2:t.x-i/o*c,y2:t.y-a/o*c}}function Si(e,t,n,r){let i=xi(e,t,n,r);return`M${i.x1} ${i.y1} L${i.x2} ${i.y2}`}var Ci=.22,wi=6e3;function Ti(e){let t=Math.abs(e);return t<gi?0:t<600?2:t<2e3?3:t<4500?4:5}function Ei(e){return Ci+Math.min(Math.abs(e),wi)/wi*1.1300000000000001}function Di(e,t){let n=t/1e3;for(let t of e){let e=Number(t.getAttribute(`data-x1`)),r=Number(t.getAttribute(`data-y1`)),i=Number(t.getAttribute(`data-x2`)),a=Number(t.getAttribute(`data-y2`)),o=Number(t.getAttribute(`data-speed`)),s=Number(t.getAttribute(`data-phase`));if(!Number.isFinite(o))continue;let c=((n*o+s)%1+1)%1,l=Math.sin(c*Math.PI),u=e+(i-e)*c,d=r+(a-r)*c;t.setAttribute(`transform`,`translate(${u.toFixed(1)} ${d.toFixed(1)})`),t.setAttribute(`opacity`,(.2+.8*l).toFixed(3))}}var Oi=(e,t=16)=>e.length<=t?e:`${e.slice(0,t-1)}…`;function ki(e,t){let n=mi(e);return I`<clipPath id="batbody"><rect x=${pi.x} y=${pi.y} width=${pi.w} height=${pi.h} rx="1.3"/></clipPath>
    ${n?I`<rect clip-path="url(#batbody)" x=${n.x} y=${n.y} width=${n.width} height=${n.height+1} fill=${t} stroke="none" opacity="0.78"/>`:I``}
    <path d=${oi.bat} vector-effect="non-scaling-stroke"/>`}var Ai={"var(--pv)":`#9a3412`,"var(--house)":`#5b21b6`,"var(--grid-in)":`#b91c1c`,"var(--grid-out)":`#047857`,"var(--bat)":`#0e7490`,"var(--accent)":`#075985`},ji=(e,t)=>t?Ai[e]??`#152033`:e;function Mi(e,t,n,r,i,a,o){let s=o?Ti(i):0;if(!s)return I``;let c=xi(e,t,n,r),l=Ei(i).toFixed(3);return I`${Array.from({length:s},(e,t)=>I`<g class="electron" fill=${a} data-x1=${c.x1} data-y1=${c.y1} data-x2=${c.x2} data-y2=${c.y2} data-speed=${l} data-phase=${t/s}><circle class="halo" r="3.4"/><circle r="1.5"/><circle r="0.75" fill="#fff"/></g>`)}`}function Ni(e,t){let n=hi.compact.bat.y+hi.compact.bat.labelDy+52;return Array.from({length:e},(e,r)=>({x:t-40,y:n+r*yi,labelDy:5}))}function Pi(e){if(!e)return hi.compact.box[1];let t=Ni(e,hi.compact.box[0]).at(-1);return t.y+t.labelDy+36}function Fi(e,t){if(!t)return;if(e)return Math.round(Pi(t)*.94);let n=Jr(hi.wide.house,t),r=ei(hi.wide.house.y,n,hi.wide.box[1]);return Math.round(380*r/420)}function Ii(e,t,n,r,i=0){if(!e.length)return I``;let a=n-14,o=Math.max(...e.map(({p:e})=>e.y));return I`<path class="flow-line" d="M${t.x+i} ${t.y} L${a} ${t.y} L${a} ${o}" stroke="var(--house)"/>
    ${e.map(({c:e,p:t})=>{let n=e.mode===`included`?`var(--house)`:`var(--accent)`,i=xi({x:a,y:t.y},t,0,bi);return I`<path class="flow-line" d="M${a} ${t.y} L${i.x2} ${t.y}" stroke=${n}/>
        ${Mi({x:a,y:t.y},t,0,bi,e.watts,n,r)}`})}`}function Li(e){let t=(e.consumers??[]).slice(0,6),n=e.compact?hi.compact:hi.wide,r=Jr(n.house,t.length),i=n.box[0]+(e.compact?0:$r(t.length)),a=e.compact?Pi(t.length):ei(n.house.y,r,n.box[1]),o=e.compact?[]:Zr(t.map(e=>e.id),e.consumerPlaces??{},r,t.map(e=>e.mode)),s=e.compact?{w:i,h:a}:ti(o,i,a),c=s.w,l=s.h,u=ni(r,Math.max(c,920),Math.max(l,640)),d=e.compact?Ni(t.length,c):[],f=t=>e.compact?d[t]:{x:o[t].x,y:o[t].y,labelDy:0},{pv:p=0,house:m=0,grid:h=0,battery:g=0}=e,_=e.motion!==!1,v=e.outline===!0,y=e=>ji(e,v),b=e.i18n.t,x={pv:{color:`var(--pv)`,label:b(`nodePv`),value:p,icon:oi.pv},grid:{color:h<0?`var(--grid-in)`:`var(--grid-out)`,label:b(h<0?`nodeImport`:`nodeFeed`),value:h,icon:oi.grid},house:{color:`var(--house)`,label:b(`nodeHouse`),value:m,icon:oi.house},bat:{color:`var(--bat)`,label:b(g<0?`nodeBatDischarge`:`nodeBatCharge`),value:g,icon:oi.bat}},S=[];p>gi&&S.push({node:`pv`,toHub:!0}),g<-30&&S.push({node:`bat`,toHub:!0}),g>gi&&S.push({node:`bat`,toHub:!1}),h<-30&&S.push({node:`grid`,toHub:!0}),h>gi&&S.push({node:`grid`,toHub:!1}),m>gi&&S.push({node:`house`,toHub:!1});let C=e.compact?bi:vi,ee=[`pv`,`grid`,`house`,`bat`],w=t.map((e,t)=>({c:e,p:f(t)}));return I`<svg viewBox="0 0 ${c} ${l}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${[...ee.map(t=>`${x[t].label} ${e.fmt.w(x[t].value)}`),...w.map(({c:t})=>`${t.name} ${e.fmt.w(t.watts)}`)].join(`, `)}>
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="hubg"><stop offset="0" stop-color="rgba(56,189,248,.5)"/><stop offset="1" stop-color="rgba(56,189,248,0)"/></radialGradient>
    </defs>
    ${ee.map(e=>I`<path class="flow-line" d=${Si(n[e],n.hub,_i,C)} stroke=${x[e].color}/>`)}
    ${e.compact?Ii(w,n.house,c,_,_i):w.map(({c:e,p:t})=>{let r=e.mode===`included`?n.house:n.hub,i=e.mode===`included`?_i:C,a=e.mode===`included`?`var(--house)`:`var(--accent)`;return I`<path class="flow-line" d=${Si(r,t,i,vi)} stroke=${a}/>
        ${Mi(r,t,i,vi,e.watts,a,_)}`})}
    ${S.map(e=>Mi(e.toHub?n[e.node]:n.hub,e.toHub?n.hub:n[e.node],e.toHub?_i:C,e.toHub?C:_i,x[e.node].value,x[e.node].color,_))}
    <image href=${ai} x=${n.hub.x-C} y=${n.hub.y-C} width=${C*2} height=${C*2} aria-label="Maestro"/>
    ${ee.map(t=>{let r=x[t],i=n[t],a=Math.abs(r.value)<gi,o=i.labelDy<0;return I`<g class="flow-node" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${r.label} @click=${()=>e.onSelect?.(t)} @keydown=${n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),e.onSelect?.(t))}}>
        <circle cx=${i.x} cy=${i.y} r="42" fill=${v?`none`:`rgba(10,16,30,.9)`} stroke=${y(r.color)} stroke-width=${v?`2.4`:`2`} filter=${a||v?`none`:`url(#glow)`}/>
        <g transform=${fi(i.x,i.y,di(_i))} fill="none" stroke=${y(r.color)} stroke-width=${ci} stroke-linecap="round" stroke-linejoin="round">
          ${t===`bat`?ki(e.soc,y(r.color)):I`<path d=${r.icon} vector-effect="non-scaling-stroke"/>`}
        </g>
        <text class="node-val" x=${i.x} y=${i.y+i.labelDy} text-anchor="middle">${e.fmt.w(r.value)}</text>
        <text class="node-lbl" x=${i.x} y=${i.y+i.labelDy+(o?19:18)} text-anchor="middle">${r.label}</text>
      </g>`})}
    ${w.map(({c:t,p:n})=>{let i=y(t.mode===`included`?`var(--house)`:`var(--accent)`),a=t.missing||Math.abs(t.watts)<gi,o=()=>{e.arrange||e.onSelect?.(t.id)},s=e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),o())};return e.compact?I`<g class="flow-node" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${t.name} @click=${o} @keydown=${s}>
          <circle cx=${n.x} cy=${n.y} r=${bi} fill=${v?`none`:`rgba(10,16,30,.9)`} stroke=${i} stroke-width=${v?`2.2`:`2`}/>
          <g transform=${fi(n.x,n.y,li(bi))} fill="none" stroke=${i} stroke-width=${ci} stroke-linecap="round" stroke-linejoin="round"><path d=${ct[t.icon]} vector-effect="non-scaling-stroke"/></g>
          <text font-size="14" font-weight="700" fill="var(--text)" x=${n.x-26} y=${n.y+5} text-anchor="end">${e.fmt.w(t.watts)}  ${Oi(t.name,24)}</text>
        </g>`:I`<g class="flow-node ${e.arrange?`arrange`:``}" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${t.name} @click=${o} @keydown=${s} @pointerdown=${n=>ii(n,t.id,r.origin,e.arrange,e.onPlaceConsumer,u)}>
        <circle cx=${n.x} cy=${n.y} r="26" fill=${v?`none`:`rgba(10,16,30,.9)`} stroke=${i} stroke-width=${v?`2.4`:`2`} filter=${a||v?`none`:`url(#glow)`}/>
        <g transform=${fi(n.x,n.y,li(vi))} fill="none" stroke=${i} stroke-width=${ci} stroke-linecap="round" stroke-linejoin="round"><path d=${ct[t.icon]} vector-effect="non-scaling-stroke"/></g>
        <text class="node-val-sm" x=${n.x+34} y=${n.y-2} text-anchor="start">${e.fmt.w(t.watts)}</text>
        <text class="node-lbl-sm" x=${n.x+34} y=${n.y+14} text-anchor="start">${Oi(t.name,18)}</text>
      </g>`})}
  </svg>`}var Ri=e=>{let t=e||`de`,n=(e,n=1)=>e===void 0||!Number.isFinite(e)?`–`:e.toLocaleString(t,{minimumFractionDigits:n,maximumFractionDigits:n});return{loc:t,n,w:e=>e===void 0||!Number.isFinite(e)?`–`:Math.abs(e)>=1e3?`${n(Math.abs(e)/1e3,1)} kW`:`${Math.round(Math.abs(e))} W`,time:e=>new Date(e).toLocaleTimeString(t,{hour:`2-digit`,minute:`2-digit`}),dayTime:e=>new Date(e).toLocaleString(t,{weekday:`short`,hour:`2-digit`,minute:`2-digit`}),day:e=>new Date(e).toLocaleDateString(t,{weekday:`short`,day:`numeric`,month:`short`})}},zi=[`today`,`balance`,`balancePulse`,`plant-operation`,`plant-storage`,`plant-phases`,`plant-wallbox`],Bi=`e3dc-maestro.groups.v3`,Vi=`e3dc-maestro.groups.v2`,Hi=[`today`,`balance`,`balancePulse`];function Ui(e){return Array.isArray(e)?new Set(e.filter(e=>typeof e==`string`&&zi.includes(e))):new Set}function Wi(e,t){if(e!==null)try{return Ui(JSON.parse(e))}catch{return new Set(Hi)}let n=new Set;if(t!==null)try{for(let e of Ui(JSON.parse(t)))n.add(e)}catch{}for(let e of Hi)n.add(e);return n}function Gi(){try{return Wi(localStorage.getItem(Bi),localStorage.getItem(Vi))}catch{return new Set(Hi)}}function Ki(e){try{localStorage.setItem(Bi,JSON.stringify([...e]))}catch{}}var qi=new Map;function Ji(e,t,n){let r=qi.get(e);if(r&&r.deps.length===t.length&&r.deps.every((e,n)=>Object.is(e,t[n])))return r.value;let i=n();return qi.set(e,{deps:t,value:i}),i}var Yi={navHelp:`Hilfe`,helpTitle:`Hilfe`,helpSub:`Panel und Regelung`,helpSearch:`Suche in der Hilfe`,helpEmpty:`Dazu steht hier nichts. Versuch ein anderes Wort, zum Beispiel Reserve oder Preisplan.`,helpToc:`Inhalt`,helpTop:`Nach oben`,helpToToc:`Zum Inhalt`,helpActive:`Gerade aktiv: {rule}`,helpNoPhase:`Keine Phase gemeldet. Die Regelung ist aus oder der erste Lauf steht noch aus.`,helpOpenSettings:`In den Einstellungen öffnen`,helpOpenControls:`Steuerung öffnen`,helpChStart:`Schnellstart`,helpChLive:`Live`,helpChForecast:`Prognose`,helpChPlan:`Preisplan`,helpChDecision:`Entscheidung`,helpChPlant:`Anlage`,helpChSettings:`Einstellungen`,helpChControls:`Steuerung`,helpChRules:`Regellogik`,helpChConcepts:`Konzepte`,helpChTrouble:`Fragen und Antworten`,helpChGlossary:`Glossar`,helpStartLead:`Was Maestro tut`,helpStartLeadBody:`Maestro entscheidet in jedem Takt, ob der Hausakku lädt, entlädt oder wartet. Das Panel zeigt den Zustand und die Schalter. Die Entscheidung trifft die Integration, nicht die Ansicht.`,helpStartSteps:`Erste Schritte`,helpStartStepsBody:`Prüfe unter Einstellungen die Einrichtung: Sensoren, Regelung und, wenn du sie nutzt, die PV-Prognose.
Schalte die Regelung ein, im Menü Steuerung oder unter System.
Sieh auf Entscheidung nach, welche Regel gerade greift und warum.
Ändere eine Schwelle erst, wenn die Begründung dazu passt.`,helpSeeRules:`Zur Regellogik`,helpOpenSetup:`Einrichtung öffnen`,helpLiveBody:`Energiefluss. PV, Netz, Haus und Akku mit der Richtung des Stroms. Oben umschalten zwischen Knoten, Blob und Haus. Zusätzliche Verbraucher stehen im Fächer am Haus; mit Anordnen lassen sie sich verschieben. Wirkung: Ein Klick auf einen Knoten öffnet den Leistungsverlauf dieses Punktes. Ohne Recorder-Daten bleibt das Diagramm leer, der Live-Wert bleibt stehen.
Tageswerte unter dem Fluss. PV, Haus, Bezug und Einspeisung in kWh. Separat gemessene Verbraucher stehen darunter, sobald sie heute Energie haben. Wirkung: Ein Tippen öffnet die Gruppe Heute. Die Live-Leistung bleibt die Hauptzahl an den Knoten.
Kopfzeile. Restliche PV-Prognose heute, morgen und, wenn ein Sensor dafür gewählt ist, übermorgen. Die Pille zeigt, ob die Regelung an ist, und die aktuelle Phase. Wirkung: Das ist der Zustand des letzten Takts, kein Schalter.
Heute und Tagesbilanz. Starten zugeklappt. Der Kalender wählt Tag, Woche, Monat oder Jahr — auch zurückliegend. Wirkung: Aufklappen zeigt die Summen. Es ändert die Regelung nicht.
Bilanzpuls darunter. Zugeklappt mit Mini-Verlauf, aufgeklappt Woche oder Monat als Tagesbalken plus kumulierte Linie. Wirkung: Ein Tippen auf einen Tag übernimmt ihn in die Tagesbilanz. Ohne Recorder-Daten bleibt die Gruppe leer.
Akku-Karte. Unter dem Ladezustand öffnet „Akku steuern“ Entladung, Notstromreserve und Auto-Strategie in einem Overlay. Wirkung: Dieselben Eingriffe wie zuvor auf der Live-Seite, gebündelt am Akku. Die Zahl bei Auto ist kein bereits gespartes Geld.
Vorausschau und Schattenmodus stehen als Satz unter dem Fluss. Wirkung: Du erkennst, ob der Preisplan nur rechnet oder den Akku steuert.
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
Watchdog. Sekunden ohne Kontakt, nach denen der Wechselrichter die Limits verwirft. Wirkung: Hängt Home Assistant, fällt das Gerät auf seinen Eigenverbrauch zurück und bleibt nicht auf einem alten Ladebefehl stehen. Zu kurz löscht Limits bei kurzen Aussetzern.`,helpSetTariff:`Netz und Tarif`,helpSetTariffBody:`Netzladung-Strategie. Eine Auswahl statt vieler Einzelschalter. Aus: nie aus dem Netz, nur PV. Zeitfenster: lädt in Tarif-Slots der Klasse Niedrig bis zum Ziel. Unter Preisschwelle: lädt, sobald der Preis höchstens die Schwelle ist. Automatisch: der Preisplan sucht die günstigsten Stunden, mit festem Wirkungsgrad 0,90, Mindestspanne 0,03 €/kWh und Sicherheitsfaktor 1,15, ohne Verschleiß. Experte: dieselben Rechnungen mit deinen Werten. Wirkung: Die Strategie entscheidet, ob und wann Netzstrom in den Akku darf. Ein Wechsel in den Plan startet im Schattenmodus.
Preisplan steuert Akku. Aus ist Schattenmodus: der Plan rechnet und ist auf der Seite Preisplan sichtbar, schickt aber keine Limits. An setzt Laden und Halten um. Wirkung: Erst dieser Schalter ändert den Akku.
Max. Netzladung/Tag. Eine Sicherheitsgrenze, 0 heißt keine Grenze. Wirkung: Nach so vielen kWh aus dem Netz an einem Tag stoppt die Netzladung, auch wenn der Preis noch günstig ist. Wie viel geladen wird, bestimmen Ziel, Prognose und Preisplan, nicht diese Zahl.
Preisschwelle. Bis zu diesem Preis gilt Strom als günstig. Wirkung: Nur die Strategie unter Preisschwelle liest sie. Automatisch und Experte vergleichen Stunden untereinander, nicht mit dieser Zahl.
Ziel im günstigen Fenster und SoC-Obergrenze des Plans. Bis hierhin wird geladen. Wirkung: Der Akku stoppt an dieser Grenze. Prognosebasiert macht das Ziel zur Obergrenze und lädt nur, was der Akku nach dem Fenster bis zum nächsten günstigen Fenster braucht, plus Reserve.
Entladung halten. Im günstigen Fenster ohne steuernden Preisplan bleibt der Akku stehen, sobald das Ziel erreicht ist. Wirkung: Kein Laden und Entladen im Minutentakt, solange der günstige Strom noch anliegt.
Feinabstimmung, nur bei Experte. Mindestspanne: unter dieser Preisdifferenz lohnt Netzladung nicht, der Plan lädt nicht. Wirkungsgrad: 0,9 heißt, ein Zehntel geht auf dem Umweg über den Akku verloren, der Plan verlangt eine größere Spanne. Sicherheitsfaktor: Maestro rechnet den Verbrauch höher, damit der Akku nicht leerläuft. Er gilt auch für die prognosebasierte Netzladung in Zeitfenstern und unter Preisschwelle, dort steht er in der Expertenansicht unter Grenzen. Zu hoch lädt mehr aus dem Netz als nötig.
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
Die Bänder gruppieren die Stufen nur zur Übersicht. Geprüft wird weiterhin jede Stufe einzeln, in der angezeigten Reihenfolge.`,helpRuleOff:`Der Hauptschalter ist aus. Maestro setzt keine Lade- oder Entladegrenze und gibt die Steuerung an das Gerät zurück.`,helpRuleForce:`Entladung erzwungen ist an. Der Akku entlädt mit der eingestellten Leistung bis zum höheren Wert aus Ladeschwelle und Reserve. Liegt der Stand schon darunter, pausiert die Entladung. Diese Regel steht über Notladung, Tarif und PV.`,helpRuleEmergency:`Der Ladestand liegt unter der Ladeschwelle. Maestro lädt mit der maximalen Ladeleistung, bevor Einspeisegrenze, Reserve oder Tarif geprüft werden.`,helpRuleFeed:`Die Einspeisung liegt über der eingestellten Grenze. Maestro lädt den Überschuss in den Akku. Die Phase bleibt kurz aktiv, auch wenn die Einspeisung danach knapp unter die Grenze fällt, damit sie nicht bei jedem Takt springt. Ist der Akku praktisch voll, setzt Maestro keine zusätzliche Ladeanforderung.`,helpRuleReserve:`Der Ladestand liegt unter der Notstromreserve, fest oder saisonal. Maestro sperrt die Entladung und lädt bis zur Reserve nach. Eine bewusst eingeschaltete Netzladung im günstigen Fenster darf diese Stufe überspringen, damit der Akku über die Reserve hinaus kommen kann.`,helpRuleEvcc:`EVCC lädt das Auto im Sofort-Modus. Maestro sperrt die Akku-Entladung, damit das Auto den Hausakku nicht leert. Die Ladung aus PV bleibt möglich.`,helpRulePrice:`Der Preisplan steuert den Akku und die Kurve ist frisch. In einer günstigen Stunde lädt Maestro bis zum Planziel und nicht über den harten Deckel. In einer teuren Stunde hält er die Entladung an, damit die Energie später mehr wert ist. Der Abregelschutz schaltet den Plan für diesen Takt aus. Im Schattenmodus rechnet der Plan nur und diese Stufe greift nicht.`,helpRuleHt:`Im Hochtarif-Fenster deckt der Akku das Haus, bis er die HT-Reserve erreicht. Erst dann sperrt Maestro die Entladung, damit für den Rest des Fensters ein Sockel bleibt. Die Reserve kommt aus dem Slot, aus dem Verbrauch oder aus der Jahreszeit.`,helpRuleHold:`Ein günstiges Tarif-Fenster ist aktiv, Entladung halten ist an, und der Preisplan steuert den Akku nicht. Maestro entlädt in diesem Fenster nicht, damit der günstige Strom im Akku bleibt.`,helpRuleMorning:`Vor dem PV-Ladestart senkt Maestro den Akku ab, damit der mittägliche Überschuss hineinpasst. Modus, Startstand und Leistung stellst du bei den Verbrauchern ein.`,helpRuleCap:`Bis zur eingestellten Stunde lädt Maestro nicht über die Morning-Cap. So bleibt vormittags Platz für die PV. An einem schwachen PV-Tag und wenn die Restprognose den Akku nicht füllt, weicht diese Stufe. Eine anstehende Netzladung im günstigen Fenster ebenfalls.`,helpRuleAstro:`Vor Sonnenaufgang plus Versatz startet Maestro die PV-Ladung nicht. Die Entladung für das Haus bleibt frei. Im Winter gilt zusätzlich die früheste Stunde. Eine anstehende Netzladung im günstigen Fenster überspringt diese Sperre.`,helpRuleHard:`Der harte Ladestand-Deckel ist erreicht. Maestro blockiert weiteres Laden, die Entladung bleibt frei. Der Abregelschutz ist ausgenommen, damit sonst abgeregelte PV noch in den Akku kann.`,helpRuleFloor:`Unter dem Schnelllade-Boden nimmt der Akku den vollen PV-Überschuss auf, ohne Korridor-Drossel. Eine anstehende Netzladung im günstigen Fenster und der Abregelschutz haben Vorrang.`,helpRuleLow:`Der Tag ist als schwach markiert oder die konservative Restprognose reicht nicht bis zum Ziel. Solange PV anliegt und der Ladeende-Stand nicht erreicht ist, nimmt der Akku den Überschuss auf. Die Ladeverteilung und die Morning-Cap weichen. Eine eingeschaltete Netzladung im günstigen Fenster hat Vorrang, sie ist genau für solche Tage gedacht.`,helpRuleGrid:`Im günstigen Tarif-Fenster lädt Maestro aktiv aus dem Netz, bis zum Ziel dieses Fensters. Das Ziel ist fest oder kommt aus der Prognose. Der Abregelschutz hat Vorrang.`,helpRuleCorridor:`Im Ladekorridor folgt der Akku dem Tagesziel. Reicht die Restprognose schon für das Ziel, verzögert Maestro die Ladung und lässt die Entladung für das Haus frei. Ein unterer Korridor kann die Ladung pausieren, wenn wenig Überschuss da ist. Bei aktiver Ladeverteilung gilt deren Rate.`,helpRuleSpread:`Die Ladeverteilung zieht die PV-Ladung über den Tag, statt den Akku am Vormittag vollzumachen. Sie ist aus, solange der Akku Vorrang hat, also an einem schwachen Tag oder bei zu knapper Restprognose. Ist das Verteilungsziel erreicht, blockiert Maestro weiteres Laden, der Überschuss geht ins Netz.`,helpRuleCurtail:`Der Abregelschutz ist aktiv, weil die PV sonst am Einspeiselimit verloren ginge. Maestro setzt eine Mindest-Ladeleistung, damit der Überschuss in den Akku geht. Diese Stufe steht bewusst hinter den übrigen PV-Regeln und gewinnt dort, wo andere Stufen ihretwegen ausweichen. Ist der Akku voll, bleibt die Anforderung aus.`,helpRuleIdle:`Keine vorherige Regel trifft zu. Maestro setzt keine eigene Grenze. Der Wechselrichter arbeitet in seinem normalen Eigenverbrauch.`,helpWhyGrid:`Warum lädt Maestro aus dem Netz?`,helpWhyGridBody:`Netzladung kommt von zwei Stufen, und nur von denen. Entweder steuert der Preisplan und die aktuelle Stunde ist günstig. Oder die Strategie lädt im günstigen Fenster und der Zielstand lässt es zu. Notladung und das Nachladen der Reserve kommen aus dem Netz, wenn PV nicht reicht. Siehst du Netzbezug ohne eine dieser Phasen, liegt das an der Hauslast, nicht an einem Ladebefehl.`,helpConceptPlan:`Preisplan und günstige Fenster`,helpConceptPlanBody:`Der Preisplan sucht Stunden, in denen Laden und späteres Nutzen sich lohnt, und Stunden, in denen der Akku halten soll. Er braucht eine Preiskurve und eine frische Berechnung. Günstige Fenster ohne Plan sind die Tarif-Slots der Klasse Niedrig oder die Stunden unter der Preisschwelle. Die HT-Einstellungen legen nur Hochtarif-Fenster an, keine Niedertarif-Fenster.`,helpConceptPv:`Prognose und Korridor`,helpConceptPvBody:`Die PV-Prognose sagt, wie viel Energie bis zum Abend noch kommt. Davon hängt ab, ob Maestro sofort lädt, die Ladung verzögert oder dem Akku Vorrang gibt. Der Korridor ist das Tagesziel über die Stunden: nicht am Morgen schon voll, am Abend aber auf dem gewünschten Stand. Ohne Prognose entfällt die Vorausschau, die übrigen Regeln bleiben.`,helpConceptLow:`Schwacher PV-Tag`,helpConceptLowBody:`Liegt die Tagesprognose unter der Schwelle, merkt sich Maestro den Tag als schwach. Dann soll der Akku den Überschuss nehmen, statt ihn zu verteilen oder am Vormittag zu deckeln. Die Markierung löst sich, wenn die restliche Prognose den Bedarf bis zum Ladeende-Ziel deutlich deckt.`,helpConceptFeed:`Einspeisegrenze und Abregelung`,helpConceptFeedBody:`Die Einspeisegrenze reagiert, sobald messbar zu viel ins Netz fließt, und lädt genau diesen Überschuss. Der Abregelschutz wird früher aktiv, anhand der PV-Leistung, und hält eine Mindestladung, bevor der Wechselrichter die Anlage drosselt. Beide schonen die PV. Die Grenze ist die Reaktion, der Schutz die Vorsorge.`,helpConceptLoads:`Auto, Wärmepumpe, Morgen`,helpConceptLoadsBody:`EVCC Sofortladen ist eine eigene Stufe und stoppt die Entladung. Die Wallbox-Sperre gegen Netzbezug kommt nach der Entscheidung dazu und kann die Entladegrenze öffnen. Die Wärmepumpe schaltet Maestro nach Überschuss und Preis, unabhängig von der Akku-Stufe. Die Morgen-Vorentladung macht vor Sonnenaufgang Platz im Akku.`,helpTroubleOff:`Die Regelung greift nicht`,helpTroubleOffBody:`Prüfe die Pille in der Kopfzeile. Steht dort Regelung aus, ist der Hauptschalter aus und jede Stufe außer diesem Zustand bleibt stumm. Steht eine Phase, lies die Begründung auf Entscheidung. Oft blockiert eine höhere Stufe, zum Beispiel Reserve, Hochtarif oder Morning-Cap, genau das, was du weiter unten eingestellt hast.`,helpTroubleEntities:`Entitäten fehlen`,helpTroubleEntitiesBody:`Ein roter Hinweis nennt die Sensoren, die Maestro erwartet und nicht findet. Deaktivierte Entitäten sind gekennzeichnet. Lege sie in der Integration an oder aktiviere sie wieder. Solange der Hinweis steht, fehlen der Ansicht oder der Regelung Werte.`,helpTroubleAlerts:`Warnungen`,helpTroubleAlertsBody:`Das Band unter der Kopfzeile meldet, wenn der Wechselrichter nicht erreichbar ist oder eine Lade- oder Entladesperre am Gerät anliegt. Mit Bestätigen blendest du es aus, bis ein neuer Hinweis kommt. Unter Darstellung lässt sich das Banner dauerhaft ausschalten – die Chips unter dem Energiefluss bleiben. Eine Sperre am Gerät setzt Maestro nicht aus den Regeln heraus. Zusätzlich kann eine Meldung auf ungerechtfertigten Netzbezug oder Netzladung wegen Notstromreserve hinweisen.`,helpTroubleHistory:`Verlauf und Diagramme`,helpTroubleHistoryBody:`Verläufe kommen aus dem Recorder. Ist er für eine Entität ausgeschlossen oder noch nicht bereit, bleibt das Diagramm leer. Die Live-Werte darüber bleiben davon unberührt. Nach einem Update lädt das Panel das Skript neu. Siehst du die alte Ansicht, die Integration neu laden.`,helpFaqNoGrid:`Es wird nicht aus dem Netz geladen`,helpFaqNoGridBody:`Sieh auf Entscheidung die Phase. Netzladung läuft nur, wenn die Strategie nicht auf Aus steht, der Preisplan den Akku steuert oder ein günstiges Fenster aktiv ist, und der Ladestand unter dem Ziel liegt.
Häufige Gründe, warum trotzdem nichts passiert: Schattenmodus, der Plan ist nicht frisch, die Sicherheitsgrenze Max. Netzladung/Tag ist erreicht, die Prognose sieht bis zum nächsten günstigen Fenster keinen Bedarf, der harte Deckel ist erreicht, oder ein schwacher PV-Tag hat Vorrang, solange die Netzladung im günstigen Fenster nicht extra eingeschaltet ist. Liegt der Stand unter der Notstromreserve, lädt Maestro bis zur Reserve nach. Eine gewollte Ladung darüber hinaus braucht die Netzladung im günstigen Fenster, sonst endet der Takt an der Reserve.
Plant der Preisplan bewusst 0 kWh und hält nur Energie für teure Stunden, ist das ein anderer Fall – siehe den FAQ-Eintrag „Preisplan plant keine Netzladung“.`,helpFaqSwing:`Der Akku lädt und entlädt im Minutentakt`,helpFaqSwingBody:`Das passiert, wenn im günstigen Fenster bis zu einem Ziel geladen wird und die Entladung danach frei bleibt. Der Stand fällt, zwei Minuten später lädt Maestro wieder nach.
Wirkung von Entladung halten: Ist das Ziel erreicht, sperrt Maestro die Entladung, solange das günstige Fenster noch läuft. Beim Preisplan übernimmt das die Halten-Stunde. Die SoC-Hysterese dämpft zusätzlich kleine Sprünge, sie ersetzt das Halten nicht.`,helpFaqHt:`Im Hochtarif kommt Strom aus dem Netz`,helpFaqHtBody:`Der Hochtarif-Schutz sperrt die Entladung erst, wenn der Ladestand die HT-Reserve erreicht hat. Darüber deckt der Akku das Haus. Siehst du Netzbezug bei hohem Stand, ist der Schutz aus, das Fenster gilt zu dieser Stunde nicht, oder eine höhere Stufe hat die Entladung schon gesperrt, zum Beispiel die Notstromreserve oder EVCC.
Ein Slot der Klasse Hoch kann eine eigene Mindestreserve setzen. Die HT-Uhrzeiten legen kein Niedertarif-Fenster an. Niedertarif trägst du als Slot der Klasse Niedrig ein.`,helpFaqPause:`Überschuss geht ins Netz, der Akku bleibt leer`,helpFaqPauseBody:`Die Korridor-Pause setzt ein Ladelimit von 0 W, wenn der nutzbare Überschuss unter der unteren Korridorleistung liegt. Das Limit bleibt bis zum nächsten Takt. In der Zeit speist der Wechselrichter ein, obwohl der Akku Platz hat. Die Pause verhindert keinen Netzbezug. Sie verzögert nur das Laden, sobald wieder Überschuss da ist.
Ist die Ladeverteilung aus, gibt es nichts zu glätten. Schalte die Pause im unteren Korridor aus, oder den Schnelllade-Boden ein, solange der Akku leer ist. Ein schwacher Tag hebt die Drossel ebenfalls auf und nimmt den Überschuss.`,helpFaqMin:`Die kleine Mindest-Ladeleistung wirkt nicht`,helpFaqMinBody:`Die Mindest-Ladeleistung ist die Untergrenze, ab der Maestro überhaupt ein Limit schickt. Darunter gibt Maestro die Limits frei. Der Wechselrichter lädt dann nach seiner eigenen Vorgabe, oft erst ab etwa 100 W. Die Einstellung in Maestro springt dadurch nicht auf 100 W zurück.
Limits löschen macht dasselbe sofort, bis zum nächsten Takt. Wer eine sehr niedrige Schwelle will, braucht ein Limit, das Maestro auch sendet, also einen Bedarf über dieser Schwelle.`,helpFaqRestart:`Der Hauptschalter nach dem Neustart`,helpFaqRestartBody:`Der Hauptschalter merkt sich An, Aus und eine laufende Pause. Nach einem Neustart von Home Assistant steht er wieder so, wie er vorher stand, inklusive der restlichen Zeit. War er dauerhaft aus, geht Maestro nicht von allein an. Ist die Pause abgelaufen, geht er wieder an. In der Kopfzeile steht die restliche Zeit.`,helpFaqTibber:`Tibber zeigt keine Preise`,helpFaqTibberBody:`Ist der Strompreis-Sensor der Tibber-Integration gewählt, holt Maestro die Stundenkurve selbst über tibber.get_prices. Der aktuelle Preis bleibt der Sensor. Bei mehreren Wohnungen gilt der App-Spitzname. Ein Abruf läuft höchstens alle 15 Minuten. Schlägt er fehl, bleibt die letzte Kurve liegen.
15-Minuten-Preise der Börse ersetzt Maestro nicht durch eine eigene Kurve, solange Tibber sie nicht in dieser Abfrage liefert. Ohne Preis-Sensor rechnet ein dynamischer Plan nicht. Das steht dann im Satz unter der Strategie.`,helpFaqPlan:`Feste Schwelle oder Preisplan?`,helpFaqPlanBody:`Eine feste Preisschwelle lädt, sobald der Preis darunter liegt, auch wenn er später am Tag nicht teurer wird. Der Preisplan lädt nur, wenn die Spanne zur späteren teuren Stunde den Umweg über den Akku lohnt, abzüglich Wirkungsgrad und, bei Experte, Verschleiß.
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
Abregelung: der Wechselrichter drosselt PV, weil das Netz sie nicht aufnimmt.`},Xi={navHelp:`Help`,helpTitle:`Help`,helpSub:`Panel and control`,helpSearch:`Search the help`,helpEmpty:`Nothing matches. Try another word, for example reserve or price plan.`,helpToc:`Contents`,helpTop:`Back to top`,helpToToc:`Contents`,helpActive:`Active now: {rule}`,helpNoPhase:`No phase reported. Control is off, or the first cycle has not run yet.`,helpOpenSettings:`Open in settings`,helpOpenControls:`Open controls`,helpChStart:`Getting started`,helpChLive:`Live`,helpChForecast:`Forecast`,helpChPlan:`Price plan`,helpChDecision:`Decision`,helpChPlant:`System`,helpChSettings:`Settings`,helpChControls:`Controls`,helpChRules:`Control logic`,helpChConcepts:`Concepts`,helpChTrouble:`Questions and answers`,helpChGlossary:`Glossary`,helpStartLead:`What Maestro does`,helpStartLeadBody:`Each cycle Maestro decides whether the home battery charges, discharges, or waits. The panel shows the state and the switches. The integration makes the decision, not the view.`,helpStartSteps:`First steps`,helpStartStepsBody:`Under Settings, check setup: sensors, control, and the PV forecast if you use one.
Turn control on, from the Controls menu or under System.
On Decision, see which rule is active and why.
Change a threshold only when the reason points at it.`,helpSeeRules:`How the rules work`,helpOpenSetup:`Open setup`,helpLiveBody:`Energy flow. PV, grid, house, and battery, with the direction of the power. Switch above between nodes, blob and house. Extra consumers sit on a fan by the house; Arrange lets you move them. Effect: a click on a node opens that point's power history. Without recorder data the chart stays empty, and the live value remains.
Day totals under the flow. PV, house, import and feed-in in kWh. Separately measured loads appear below once they have energy today. Effect: a tap opens the Today group. Live power stays the main figure on the nodes.
Header. Remaining PV forecast for today, tomorrow, and, when a sensor is selected, the day after. The pill shows whether control is on, and the current phase. Effect: that is the state of the last cycle, not a switch.
Today and the day balance. They start collapsed. The calendar picks day, week, month or year — including past ranges. Effect: opening them shows the sums. It does not change control.
Balance pulse below. Collapsed with a mini spark, open as week or month bars plus a cumulative line. Effect: tapping a day selects it in the day balance. Without recorder data the group stays empty.
Battery card. Under the state of charge, “Control battery” opens forced discharge, backup reserve and auto strategy in one overlay. Effect: the same live interventions as before, gathered on the battery. The Auto figure is not money already saved.
Look-ahead and shadow mode sit as a sentence under the flow. Effect: you can see whether the price plan is only calculating or controlling the battery.
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
Watchdog. Seconds without contact after which the inverter drops the limits. Effect: if Home Assistant hangs, the device returns to its own self-consumption and does not stay on an old charge command. Too short clears limits on a brief gap.`,helpSetTariff:`Grid and tariff`,helpSetTariffBody:`Grid-charging strategy. One choice instead of many switches. Off: never from the grid, PV only. Time window: charges in tariff slots of class low up to the target. Below a price threshold: charges once the price is at or under the threshold. Automatic: the price plan picks the cheapest hours, with fixed efficiency 0.90, minimum spread 0.03 €/kWh, and safety factor 1.15, ignoring wear. Expert: the same sums with your values. Effect: the strategy decides whether and when grid power may enter the battery. Switching into the plan starts in shadow mode.
Price plan controls the battery. Off is shadow mode: the plan calculates and shows on the price-plan page, but sends no limits. On applies charging and holding. Effect: only this switch changes the battery.
Max. grid charge/day. A safety cap, 0 means no cap. Effect: grid charging stops after this many kWh from the grid in one day, even if the price is still cheap. Target, forecast and price plan decide how much is charged, not this number.
Price threshold. Up to this price, electricity counts as cheap. Effect: only the below-threshold strategy reads it. Automatic and expert compare hours with each other, not with this number.
Cheap-window target and the plan's state-of-charge cap. Charging stops here. Effect: the battery stops at this line. Forecast-based makes the target a cap and charges only what the battery needs after the window until the next cheap window, plus reserve.
Hold discharge. In a cheap window, when the price plan is not in control, the battery stays put once the target is reached. Effect: no charge-and-discharge cycle every couple of minutes while the cheap power is still there.
Fine tuning, expert only. Minimum spread: below this price gap, grid charging does not pay, so the plan does not charge. Efficiency: 0.9 means a tenth is lost on the detour through the battery, so the plan demands a wider gap. Safety factor: Maestro assumes higher consumption so the battery does not run empty. It also applies to forecast-based grid charging in time windows and below the price threshold; there it sits under Limits in the expert view. Too high charges more from the grid than you need.
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
The bands only group the rungs for reading. Each rung is still checked on its own, in the order shown.`,helpRuleOff:`The master switch is off. Maestro sets no charge or discharge limit and hands control back to the device.`,helpRuleForce:`Forced discharge is on. The battery discharges at the chosen power down to the higher of the charge threshold and the reserve. If the level is already below that, discharge pauses. This rule sits above emergency charge, tariff, and PV.`,helpRuleEmergency:`State of charge is below the charge threshold. Maestro charges at maximum power before the feed-in limit, reserve, or tariff are checked.`,helpRuleFeed:`Export is above the configured limit. Maestro charges the surplus into the battery. The phase stays briefly active even after export falls just under the limit, so it does not flicker every cycle. When the battery is practically full, Maestro does not add another charge request.`,helpRuleReserve:`State of charge is below the backup reserve, fixed or seasonal. Maestro blocks discharge and charges back up to the reserve. A deliberately enabled cheap-window grid charge may pass this rung, so the battery can rise above the reserve.`,helpRuleEvcc:`EVCC is charging the car in immediate mode. Maestro blocks battery discharge so the car does not empty the home battery. Charging from PV stays possible.`,helpRulePrice:`The price plan is controlling the battery and the curve is fresh. In a cheap hour Maestro charges toward the plan target and not past the hard cap. In an expensive hour it holds discharge so the energy is worth more later. The curtailment guard turns the plan off for that cycle. In shadow mode the plan only calculates, and this rung does not run.`,helpRuleHt:`During a high-tariff window the battery covers the house until it reaches the high-tariff reserve. Only then does Maestro block discharge, leaving a floor for the rest of the window. The reserve comes from the slot, from consumption, or from the season.`,helpRuleHold:`A cheap tariff window is active, hold discharge is on, and the price plan is not controlling the battery. Maestro does not discharge during that window, so the cheap energy stays in the battery.`,helpRuleMorning:`Before PV charging starts, Maestro lowers the battery so the midday surplus fits. Set the mode, starting level, and power under loads.`,helpRuleCap:`Until the configured hour Maestro does not charge above the morning cap, leaving room for PV. On a weak-PV day, and when the remaining forecast cannot fill the battery, this rung yields. A pending cheap-window grid charge does too.`,helpRuleAstro:`Before sunrise plus the offset, Maestro does not start PV charging. Discharge for the house stays free. In winter an earliest hour also applies. A pending cheap-window grid charge skips this block.`,helpRuleHard:`The hard state-of-charge cap is reached. Maestro blocks further charging, and discharge stays free. The curtailment guard is exempt, so PV that would otherwise be curtailed can still enter the battery.`,helpRuleFloor:`Below the fast-charge floor the battery takes the full PV surplus, without the corridor throttle. A pending cheap-window grid charge and the curtailment guard take priority.`,helpRuleLow:`The day is marked weak, or the conservative remaining forecast does not reach the target. While PV is producing and the end-of-charge level is not reached, the battery takes the surplus. Spreading and the morning cap yield. An enabled cheap-window grid charge takes priority. It exists for days like this.`,helpRuleGrid:`During a cheap tariff window Maestro charges from the grid, up to that window’s target. The target is fixed or comes from the forecast. The curtailment guard takes priority.`,helpRuleCorridor:`Inside the charge corridor the battery follows the daily target. When the remaining forecast already covers the target, Maestro delays charging and leaves discharge free for the house. A lower corridor can pause charging when there is little surplus. With spreading on, that rate applies.`,helpRuleSpread:`Spreading stretches PV charging across the day instead of filling the battery in the morning. It is off while the battery has priority: a weak day, or a remaining forecast that is too small. Once the spreading target is reached, Maestro blocks further charging and the surplus goes to the grid.`,helpRuleCurtail:`The curtailment guard is active because PV would otherwise be lost at the export limit. Maestro sets a minimum charge power so the surplus enters the battery. This rung sits after the other PV rules on purpose, and it wins where those rules yield because of it. When the battery is full, the request stays off.`,helpRuleIdle:`No earlier rule matches. Maestro sets no limit of its own. The inverter runs its normal self-consumption.`,helpWhyGrid:`Why is Maestro charging from the grid?`,helpWhyGridBody:`Grid charging comes from two rungs, and only those. Either the price plan is in control and the current hour is cheap. Or the strategy charges in a cheap window and the target allows it. Emergency charge and topping up the reserve also draw from the grid when PV is not enough. If you see grid import without one of these phases, that is house load, not a charge command.`,helpConceptPlan:`Price plan and cheap windows`,helpConceptPlanBody:`The price plan looks for hours where charging and later use pays off, and hours where the battery should hold. It needs a price curve and a fresh calculation. Cheap windows without the plan are tariff slots of class low, or hours below the price threshold. The high-tariff settings create only high-tariff windows, not low-tariff ones.`,helpConceptPv:`Forecast and corridor`,helpConceptPvBody:`The PV forecast says how much energy is still coming before evening. That decides whether Maestro charges now, delays charging, or gives the battery priority. The corridor is the state-of-charge target across the hours: not already full in the morning, but at the wanted level by evening. Without a forecast there is no lookahead. The other rules remain.`,helpConceptLow:`Weak PV day`,helpConceptLowBody:`When the daily forecast is below the threshold, Maestro latches the day as weak. The battery should then take the surplus instead of spreading it or capping the morning. The latch releases when the remaining forecast clearly covers the need up to the end-of-charge target.`,helpConceptFeed:`Feed-in limit and curtailment`,helpConceptFeedBody:`The feed-in limit reacts once measured export is too high, and charges exactly that surplus. The curtailment guard becomes active earlier, from PV power, and holds a minimum charge before the inverter throttles the plant. Both protect PV. The limit is the reaction, the guard is the precaution.`,helpConceptLoads:`Car, heat pump, morning`,helpConceptLoadsBody:`EVCC immediate charging is its own rung and stops discharge. The wallbox guard against grid import is applied after the decision and can open the discharge limit. Maestro switches the heat pump by surplus and price, independent of the battery rung. Morning pre-discharge makes room in the battery before sunrise.`,helpTroubleOff:`Control does nothing`,helpTroubleOffBody:`Check the pill in the header. If it says control is off, the master switch is off and every rung except that state stays silent. If a phase is shown, read the reason on Decision. A higher rung, such as reserve, high tariff, or the morning cap, often blocks exactly what you configured further down.`,helpTroubleEntities:`Entities are missing`,helpTroubleEntitiesBody:`A red note lists the sensors Maestro expects and cannot find. Disabled entities are marked. Create them in the integration or enable them again. While the note is shown, the view or the control logic is missing values.`,helpTroubleAlerts:`Warnings`,helpTroubleAlertsBody:`The band under the header reports when the inverter is unreachable or a charge or discharge lock is set on the device. Got it hides it until a new note appears. Under Appearance you can turn the banner off permanently — the chips under the energy flow stay. A lock on the device is not cleared by Maestro’s rules. A separate note can point at unjustified grid import or grid charge for the backup reserve.`,helpTroubleHistory:`History and charts`,helpTroubleHistoryBody:`History comes from the recorder. If an entity is excluded or the recorder is not ready, the chart stays empty. The live values above it are unaffected. After an update the panel loads the new script. If you still see the old view, reload the integration.`,helpFaqNoGrid:`It does not charge from the grid`,helpFaqNoGridBody:`Read the phase on Decision. Grid charging runs only when the strategy is not off, the price plan is controlling the battery or a cheap window is active, and the state of charge is under the target.
Common reasons nothing happens: shadow mode, the plan is not fresh, the max. grid charge/day safety cap is reached, the forecast sees no need until the next cheap window, the hard cap is reached, or a weak-PV day has priority while cheap-window grid charging is not switched on as well. Below the backup reserve Maestro charges back up to the reserve. Charging beyond that on purpose needs cheap-window grid charging, otherwise the cycle ends at the reserve.
If the price plan deliberately schedules 0 kWh and only holds energy for expensive hours, that is a different case — see the FAQ entry “Price plan schedules no grid charge”.`,helpFaqSwing:`The battery charges and discharges every couple of minutes`,helpFaqSwingBody:`This happens when a cheap window charges up to a target and discharge stays free afterwards. The level falls, and a couple of minutes later Maestro charges again.
Effect of hold discharge: once the target is reached, Maestro blocks discharge while the cheap window is still running. On the price plan, the hold hour does that. State-of-charge hysteresis damps small jumps. It does not replace the hold.`,helpFaqHt:`During high tariff, power comes from the grid`,helpFaqHtBody:`High-tariff protection blocks discharge only once the state of charge has reached the high-tariff reserve. Above that, the battery covers the house. If you see grid import at a high level, protection is off, the window does not apply this hour, or a higher rung already blocked discharge, for example the backup reserve or EVCC.
A slot of class high can set its own minimum reserve. The high-tariff clock does not create low-tariff windows. Enter low tariff as a slot of class low.`,helpFaqPause:`Surplus goes to the grid and the battery stays empty`,helpFaqPauseBody:`The corridor pause sends a charge limit of 0 W when the usable surplus is below the lower corridor power. The limit stays until the next cycle. In that time the inverter exports, even though the battery has room. The pause does not prevent grid import. It only delays charging once surplus returns.
With spreading off there is nothing to smooth. Turn off the pause in the lower corridor, or turn on the fast-charge floor while the battery is empty. A weak day also lifts the throttle and takes the surplus.`,helpFaqMin:`The small minimum charge power does nothing`,helpFaqMinBody:`Minimum charge power is the floor below which Maestro does not send a limit at all. Under it, Maestro releases the limits. The inverter then charges by its own rule, often only from about 100 W. The setting in Maestro does not jump back to 100 W because of that.
Clear limits does the same at once, until the next cycle. A very low threshold applies only when Maestro is actually sending a limit, so the need has to be above that threshold.`,helpFaqRestart:`The master switch after a restart`,helpFaqRestartBody:`The master switch remembers on, off, and a running pause. After a Home Assistant restart it comes back as it was, including the time still left. If it was off until turned on, Maestro does not turn itself on. Once the pause has ended, it turns on again. The header shows the time left.`,helpFaqTibber:`Tibber shows no prices`,helpFaqTibberBody:`When the electricity-price sensor from the Tibber integration is selected, Maestro fetches the hourly curve itself through tibber.get_prices. The current price stays the sensor. With several homes, the app nickname applies. A fetch runs at most every 15 minutes. If it fails, the last curve remains.
Maestro does not replace the exchange's 15-minute prices with a curve of its own unless Tibber returns them in that call. Without a price sensor a dynamic plan does not calculate. The line under the strategy says so.`,helpFaqPlan:`Fixed threshold or price plan?`,helpFaqPlanBody:`A fixed price threshold charges as soon as the price is below it, even if the price never rises later that day. The price plan charges only when the gap to a later expensive hour pays for the detour through the battery, after efficiency and, in expert mode, wear.
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
Curtailment: the inverter throttles PV because the grid will not take it.`},Zi={navLive:`Live`,navForecast:`Prognose`,navPlan:`Preisplan`,navDecision:`Entscheidung`,navSettings:`Einstellungen`,navPlant:`Anlage`,settingHelp:`Hilfe`,navControls:`Steuerung`,menu:`Menü`,subLive:`Energiefluss und Akku in Echtzeit`,factRest:`PV Prognose Rest heute`,factTomorrow:`Morgen`,factDayAfter:`Übermorgen`,subForecast:`Was Maestro für die nächsten 24 Stunden erwartet`,subPlan:`Netzladung nach dynamischem Tarif`,subDecision:`Warum Maestro gerade so regelt`,subSettings:`Von der Anlage über Schutz und Tarif bis zum PV-Laden`,subPlant:`Betriebszustand, Speicher und Phasen vom E3DC`,regulationOn:`Regelung aktiv`,regulationOff:`Regelung aus`,pauseTitle:`Wie lange aus?`,pauseHint:`Maestro bleibt so lange aus und schaltet sich danach wieder ein. Der Zähler bleibt über einen Neustart erhalten.`,pauseOffTitle:`Regelung`,pauseOffHint:`Wieder einschalten, oder für eine feste Zeit aus lassen.`,pauseResume:`Wieder einschalten`,pauseOneHour:`1 Stunde`,pauseHours:`{h} Stunden`,pausePermanent:`Dauerhaft`,pauseLeftHours:`noch {h} h {m} min`,pauseLeftHour:`noch {h} h`,pauseLeftMin:`noch {m} min`,flowTitle:`Energiefluss`,flowSub:`Jetzt · aktualisiert live`,flowDay:`Heute`,flowDaySeparate:`Separat`,flowDayImport:`Bezug`,flowDayFeed:`Einspeisung`,flowDayOpen:`Heute aufklappen`,flowStyleLabel:`Darstellung des Energieflusses`,flowOpts:`Darstellung`,flowOptsTitle:`Energiefluss darstellen`,flowOptsSub:`Ansicht wählen, Verbraucher anordnen oder bearbeiten`,flowOptsConsumers:`Verbraucher`,flowStyleTitle:`Energiefluss`,flowStyleHint:`Knoten, Blob oder Haus. Die Wahl gilt nur in diesem Browser.`,flowStyleNodes:`Knoten`,flowStyleNodesHint:`PV, Netz, Haus und Akku um den Hub. Mit separat gemessenen Verbrauchern erscheint ein Verbrauchskreis.`,flowStyleBlob:`Blob`,flowStyleBlobHint:`Weiche Form zur stärksten Quelle oder Senke. Mit separat gemessenen Verbrauchern erscheint Verbrauch → Haus.`,flowStyleCity:`Haus`,flowStyleCityHint:`Modernes Haus mit PV-Dach. Mit separat gemessenen Verbrauchern erscheint Verbrauch → Haus.`,nodeLoad:`Verbrauch`,flowCityLoad:`Last`,arrangeConsumers:`Anordnen`,arrangeDone:`Fertig`,arrangeHint:`Verbraucher frei ziehen und platzieren.`,arrangeReset:`Zurücksetzen`,nodePv:`PV`,nodeHouse:`Haus`,nodeImport:`Netzbezug`,nodeFeed:`Einspeisung`,nodeBatDischarge:`Akku entlädt`,nodeBatCharge:`Akku lädt`,battery:`Akku`,batteryPlantDetails:`Akku-Details`,gridPlantDetails:`Netz-Details`,pvPlantDetails:`PV-Details`,batteryStyleLabel:`Darstellung des Akkus`,batteryStyleRing:`Ring`,batteryStylePack:`Pack`,stateOfCharge:`Ladezustand`,targetSoc:`Ziel-SoC`,autonomy:`Autonomie`,forecastPeak:`Nächster SOC-Peak`,forecastPeakToday:`Peak heute {v}`,forecastPeakTomorrow:`Peak morgen {v}`,forecastNoPeak:`kein Anstieg in 24 h`,forecastFloor:`Sockel {v}`,forecastFloorReach:`Sockel erreicht {v}`,forecastEmpty:`Leer {v}`,forecastGrid:`Netz ab {v}`,forecastGridUntil:`Netz bis {v}`,forecastGridOngoing:`Netz durchgehend`,forecastNoGrid:`kein Netzbezug`,autonomyHint:`bei aktuellem Verbrauch`,discharging:`Entladung`,charging:`Ladung`,chipReachable:`E3DC erreichbar`,chipUnreachable:`E3DC nicht erreichbar`,chipChargeLock:`Ladesperre`,chipDischargeLock:`Entladesperre`,chipHt:`HT-Schutz`,chipCurtail:`Abregelschutz`,chipEmergency:`Notladung`,chipFeedIn:`Einspeisedrosselung`,chipGridCharge:`Netzladung`,chipReserveCharge:`Netzladung Notstromreserve`,chipBatteryPriority:`Akku-Priorität`,chipLowYield:`Schwacher PV-Tag`,chipPredictive:`Vorausschauende Ladung`,chipShadow:`Preisplan · Schatten`,modePredictive:`Vorausschauend`,modeShadow:`Preisplan im Schatten`,groupToday:`Heute`,groupWeek:`Woche`,groupMonth:`Monat`,groupYear:`Jahr`,groupNet:`netto`,periodToday:`Heute`,periodWeek:`Woche`,periodMonth:`Monat`,periodYear:`Jahr`,calGrainDay:`Tag`,calGrainWeek:`Woche`,calGrainMonth:`Monat`,calGrainYear:`Jahr`,forceTitle:`Erzwungene Entladung`,fixedReserve:`Notstromreserve`,controlsPair:`Entladung & Reserve`,batteryCtrl:`Akku steuern`,batteryCtrlTitle:`Akku-Steuerung`,batteryCtrlSub:`Entladung, Reserve und Auto-Strategie`,batteryCtrlIdle:`Entladung · Reserve · Auto`,controlsForceOn:`Erzwungene Entladung {v}`,controlsForceOff:`Erzwungene Entladung aus`,controlsReserveOn:`Notstromreserve {v} %`,controlsReserveOff:`Notstromreserve aus`,ctrlReserveSoc:`{v} %`,exportCsv:`CSV`,actionsTitle:`Aktionen`,btnClear:`Limits freigeben`,btnClearSub:`Hebt Lade- und Entladegrenzen sofort auf und setzt den Wechselrichter auf Normal.`,btnCharge:`Manuell laden (3 kWh)`,confirmCharge:`3 kWh aus dem Netz laden?`,selWallbox:`Wallbox-Typ`,selMorning:`Vorentladung`,selAuto:`Auto-Ziel`,selTariff:`Tarif`,debugTitle:`Debug-Log`,debugEmpty:`Noch keine Debug-Zeilen. Der Schalter startet das Logging.`,debugSwitch:`Debug-Logging`,balanceTitle:`Tagesbilanz`,balanceWeek:`Wochenbilanz`,balanceMonth:`Monatsbilanz`,balanceYear:`Jahresbilanz`,pulseTitle:`Bilanzpuls`,pulseDaily:`Tagesbilanz`,pulseCumulative:`Laufende Summe`,pulseDailyAxis:`€ / Tag`,pulseSumAxis:`Summe €`,pulseEmpty:`Keine Tagesbilanzen im Recorder.`,pulseClickDay:`Tippen wählt den Tag in der Bilanz.`,dayPrev:`Zurück`,dayNext:`Vor`,dayPick:`Zeitraum wählen`,dayNav:`Zeitraum`,rangeEmpty:`Für diesen Zeitraum liegen keine Recorder-Statistiken vor.`,whenToday:`heute`,whenWeek:`diese Woche`,whenMonth:`diesen Monat`,whenYear:`dieses Jahr`,kpiCostGross:`Stromkosten`,kpiCostGrossSub:`Netzbezug brutto`,kpiRevenue:`Einspeise-Erlös`,kpiRevenueSub:`Vergütung {when}`,kpiWear:`Akku-Verschleiß`,kpiWearSub:`anteilige Zyklenkosten`,kpiBalance:`Energiebilanz`,kpiBalanceSub:`Erlös + Ersparnis − Kosten − Verschleiß`,kpiGridBat:`Netz → Akku`,kpiGridBatSub:`aus dem Netz geladen`,kpiGridBatWarn:`Netzladung ohne Rechtfertigung`,kpiGridBatReserve:`wegen Notstromreserve`,kpiGridBatEmergency:`wegen Notladung`,kpiGridBatJustified:`berechtigte Netzladung`,kpiWallbox:`Wallbox {when}`,kpiWallboxSub:`geladene Energie`,kpiFeedLimit:`Einspeisebegrenzung`,kpiFeedLimitSub:`{n} Eingriffe · {dc} kWh DC-Abregelung`,kpiCost:`Stromkosten {when}`,kpiCostSub:`netto nach Einspeisung`,kpiSaving:`PV-Ersparnis {when}`,kpiSavingSub:`gegenüber reinem Netzbezug`,kpiSimDynamic:`Simulation dynamisch {v} €`,kpiSimCostlier:`{v} € teurer`,kpiSimCheaper:`{v} € günstiger`,kpiSimMoreSaving:`{v} € mehr Ersparnis`,kpiSimLessSaving:`{v} € weniger Ersparnis`,kpiSimPending:`Vergleich ab Mitternacht`,kpiSelf:`Eigenverbrauch {when}`,kpiSelfSub:`Netzbezug {imp} kWh · Einspeisung {feed} kWh`,kpiBattery:`Akku {when}`,kpiBatterySub:`geladen · {out} kWh entladen`,chartTitle:`SoC-Trajektorie & Leistungen · nächste 24 h`,chartTitlePlan:`SoC laut Preisplan & Leistungen · nächste 24 h`,legendSoc:`SoC`,legendPv:`PV`,legendHouse:`Haus`,legendImport:`Netzbezug`,legendFeed:`Einspeisung`,legendActual:`Ist`,actualOverlay:`Ist-Verlauf`,now:`Jetzt`,targetLabel:`Ziel-SoC {v}%`,hoursShort:`{h} h`,statMinMax:`SoC Min / Max`,statImport:`Netzbezug`,statFeed:`Einspeisung`,statAutarky:`Autarkie`,statPvTomorrow:`PV morgen`,statP10:`PV-Rest (P10)`,statDeficit:`Defizit morgen`,statYield:`PV-Tag`,statYieldSub:`{today} / {ref} kWh Referenz`,qualityLabel:`Datenqualität`,qualityOk:`vollständig`,qualityPv:`PV-Profil fehlt`,qualityConsumption:`Verbrauchsprofil fehlt`,qualityBoth:`Profile fehlen`,qualityUnknown:`unbekannt`,reserveTitle:`Ziel-SoC`,reserveSeasonal:`Notstromreserve`,reserveAdaptive:`Reserve adaptiv`,reserveHt:`HT-Reserve`,reserveForward:`Vorausschau`,windowsTitle:`Ladefenster`,windowAstro:`Astro-Start`,windowSeasonalEnd:`Saison-Ende`,windowPvDelay:`PV-Verzögerung`,windowTomorrow:`Morgen`,autoTitle:`Auto-Strategie`,autoSaving:`Geschätzte Einsparung`,autoOff:`Aus`,autoOn:`{goal} · {eur}`,autoPending:`{goal} · noch kein Lauf`,autoData:`{goal} · zu wenig Verlauf`,autoCap:`Morgenkappe an, bis {soc} %, bis {hour} Uhr.`,autoLiveHint:`Auto stellt nur die Morgenkappe ein. Die Zahl ist die prognostizierte Ersparnis der nächsten 24 Stunden gegenüber deiner Einstellung, kein bereits gespartes Geld.`,alertUnreachable:`E3DC ist nicht erreichbar`,alertChargeLock:`Ladesperre aktiv`,alertDischargeLock:`Entladesperre aktiv`,alertUnjustified:`Netzladung ohne Rechtfertigung`,alertReserveCharge:`Netzladung wegen Notstromreserve`,alertEmergencyCharge:`Netzladung wegen Notladung`,alertDismiss:`Bestätigen`,alertBannerShow:`Alarm-Banner`,alertBannerShowHint:`Kurze Hinweise oben. Dieselben Infos stehen als Chips unter dem Energiefluss.`,noForecast:`Noch keine Prognose verfügbar. Maestro braucht mindestens 7 Tage Verlauf.`,priceTitle:`Strompreis & geplanter SoC`,legendCharge:`Netzladung`,legendHold:`Akku halten`,legendRelease:`Akku frei`,legendPlanSoc:`SoC geplant`,planShadow:`Schattenmodus · steuert nicht`,planActive:`Aktiv · steuert den Akku`,planTitle:`Plan`,planStrategy:`Netzladung`,planGridCharge:`Netzladung geplant`,planSaving:`Erwartete Ersparnis`,planCheapest:`Günstigster Slot`,planMostExpensive:`Teuerster Slot`,planKnownUntil:`Preise bekannt bis`,planDiag:`Rechenwerte`,planFloor:`Boden`,planCeiling:`Obergrenze`,planEfficiency:`Wirkungsgrad`,planMinSpread:`Mindestspanne`,planWear:`Verschleiß`,planSafety:`Verbrauchs-Sicherheitsfaktor`,noPlan:`Es liegt kein Preisplan vor. Er braucht einen dynamischen Tarif.`,noPlanOff:`Bei Strategie „Aus“ gibt es keinen Preisplan-Chart. Maestro lädt den Akku nicht aus dem Netz.`,noPlanSlots:`Bei Zeitfenster (HT/NT) gibt es keinen Preisplan-Chart. Die Ladezeiten kommen aus den Tarif-Slots der Klasse „Niedrig“.`,noPlanThreshold:`Bei „unter Preisschwelle“ gibt es keinen Preisplan-Chart. Maestro lädt, sobald der Preis unter der Schwelle liegt — die Zeiten stehen nicht als Plan-Kurve.`,planComputing:`Preisplan wird berechnet…`,noPlanPrices:`Kein Preisplan: Es fehlt eine gültige Preiskurve. Prüfe den Preis-Sensor.`,noPlanProfile:`Kein Preisplan: Noch keine Verbrauchsstatistik.`,noPlanRoom:`Kein Preisplan: Zwischen Ladeschwelle/Reserve und Ziel-SoC bleibt kein Spielraum.`,planTune:`Netzladung einstellen`,planTuneHint:`Dieselben Einstellungen wie unter Einstellungen › Netz und Tarif.`,slotPrice:`Preis`,slotSoc:`SoC`,slotConsumption:`Verbrauch`,slotCharge:`Netzladung {kwh} kWh`,slotHold:`Akku halten`,slotRelease:`Akku frei`,decisionPhase:`Aktuelle Regelphase`,tagTargetSoc:`Ziel-SoC {v} %`,tagTargetPower:`Ziel-Ladeleistung {v}`,tagBatteryPriority:`Akku-Priorität`,tagSince:`seit {t}`,limitsTitle:`Limits · Soll vs. gesendet`,limitsSub:`Was Maestro will und was am E3DC ankommt`,limitCharge:`Ladelimit`,limitDischarge:`Entladelimit`,limitTarget:`Soll {a} · gesendet {b}`,limitNone:`kein Limit`,entitiesMissing:`Nicht verfügbar: {list}. Diese Maestro-Entities fehlen oder sind deaktiviert – bitte unter Einstellungen › Entitäten prüfen.`,entityDisabled:`deaktiviert`,notSetUp:`E3DC Maestro ist nicht eingerichtet oder noch nicht gestartet.`,limitSoc:`aktuell {a} % → {b} %`,timelineTitle:`Verlauf der Entscheidungen`,timelineEmpty:`Noch keine Entscheidungen aufgezeichnet.`,noDecision:`Noch keine Entscheidung vorhanden.`,controlsTitle:`Schnellsteuerung`,controlsSub:`Wirkt sofort auf die Regelung`,close:`Schließen`,historySub:`Letzte 24 Stunden`,historyEmpty:`Keine Verlaufsdaten in den letzten 24 Stunden.`,historyFailed:`Der Verlauf konnte nicht geladen werden.`,ctrlActive:`Regelung aktiv`,ctrlActiveSub:`Maestro steuert die Lade- und Entladelimits`,ctrlPredictive:`Vorausschauende Ladung`,ctrlPredictiveSub:`Ladeziel aus Prognose und Verbrauch`,ctrlPvDelay:`PV-Prognose-Verzögerung`,ctrlPvDelaySub:`Ladestart verschieben, wenn PV reicht`,ctrlPlanControls:`Preisplan steuert Akku`,ctrlPlanControlsSub:`Aus = nur Schattenmodus`,ctrlPlanShadow:`Preisplan Schattenmodus`,ctrlPlanShadowSub:`Plan berechnen, aber nichts senden`,ctrlForce:`Erzwungene Entladung`,ctrlForcePower:`Leistung {v}`,allSettings:`Alle Einstellungen öffnen →`,displayTitle:`Anzeige`,consumersSub:`Verbraucher im Energiefluss. Gilt für jedes Gerät, das dieses Cockpit öffnet.`,addConsumer:`Verbraucher hinzufügen`,consumerSearch:`Leistungssensor suchen`,consumerName:`Name im Energiefluss`,consumerIcon:`Symbol`,iconWallbox:`Wallbox`,iconHeater:`Heizstab`,iconClimate:`Klimaanlage`,iconHeatpump:`Wärmepumpe`,iconMeter:`Leistungsmesser`,modeIncluded:`Im Hausverbrauch`,modeSeparate:`Separat gemessen`,useWallbox:`Wallbox übernehmen`,removeConsumer:`Entfernen`,editConsumers:`Verbraucher bearbeiten`,consumersEmpty:`Noch keine Verbraucher. Wallbox, Wärmepumpe und weitere Lasten kannst du hier ergänzen.`,consumersOverflow:`Die enthaltenen Verbraucher liegen über der Hausleistung. Prüfe, ob sie wirklich im Hauszähler stecken.`,noPowerSensors:`Keine passenden Leistungssensoren gefunden.`,consumerMissing:`Sensor nicht verfügbar`,unavailable:`nicht verfügbar`,callFailed:`Aktion fehlgeschlagen: {err}`,chartError:`Chart konnte nicht geladen werden: {err}`,loading:`Lädt …`,demoHint:`Keine Daten`,setHardware:`Anlage`,setHardwareHint:`Anlagendaten, mit denen Maestro Leistungen und Grenzen rechnet.`,setCorridor:`Ziel-SoC und Ladekorridor`,setCorridorHint:`Wohin der Akku am Tag soll: Schwelle, Korridor, Ladeende und harte Deckel.`,setWindows:`Vorausschau und Zeitfenster`,setWindowsHint:`Wann geladen wird: Prognose, Sonne, Morgen-Deckel und Verteilung über den Tag.`,setYield:`Wenig PV und Abregelung`,setYieldHint:`Akku vor Einspeisung füllen, Abregelung abfangen und spät nachladen.`,setTariff:`Netz und Tarif`,setTariffHint:`Netzladung, Hochtarif, Preise und Tarif-Slots.`,setReserve:`Hochtarif und Reserve`,setReserveHint:`HT-Fenster und Notstromreserve. Lookback der adaptiven Reserve bleibt unter Integration konfigurieren.`,setFlex:`Wallbox, Wärmepumpe, Vorentladung`,setFlexHint:`Zusätzliche Lasten und das morgendliche Entladen vor dem Ladestart.`,setControl:`Steuerverhalten`,setControlHint:`Hauptschalter, erzwungene Entladung und wie ruhig die Regelung nachregelt.`,setDiag:`Diagnose und Aktionen`,setDiagHint:`Debug-Protokoll und einmalige Aktionen.`,setPlant:`Anlage`,setPlantHint:`Wechselrichter, PV-Leistung und die Grenzen, mit denen Maestro rechnet.`,setSafety:`Schutz`,setSafetyHint:`Notladung, Notstromreserve, Akku-Deckel und Watchdog.`,setPv:`PV-Laden`,setPvHint:`Tagesziel und Zeitfenster. Ladeleistung und Sonderfälle liegen darunter.`,setLoads:`Verbraucher`,setLoadsHint:`Wallbox, EVCC, Wärmepumpe und das morgendliche Entladen vor dem Ladestart.`,setAuto:`Automatik`,setAutoHint:`Maestro sucht einmal am Tag eine bessere Einstellung für Morning-Cap und Schonladung.`,setSystem:`System`,setSystemHint:`Hauptschalter, erzwungene Entladung, Regeltempo und Diagnose.`,secPlantPower:`Leistung und Grenzen`,secPlantPowerHint:`Nennwerte der Anlage.`,secEmergency:`Notladung`,secEmergencyHint:`Unter dieser Schwelle lädt Maestro sofort aus dem Netz. 0 schaltet die Notladung aus.`,secReserve:`Notstromreserve`,secReserveHint:`Eine feste Reserve ersetzt die saisonale und die adaptive.`,secHard:`Akku-Deckel`,secHardHint:`Oberhalb dieses SoC stoppt die Ladung. Der Abregelschutz darf den Deckel übersteuern.`,secWatchdog:`Watchdog`,secWatchdogHint:`Nach dieser Zeit ohne Kontakt gibt Maestro die Limits frei.`,secStrategy:`Netzladung`,secStrategyHint:`Ob und wie Maestro den Akku aus dem Netz lädt. Die Strategie setzt alle nötigen Schalter selbst.`,secLimits:`Grenzen`,secLimitsHint:`Wie viel und bis zu welchem Ladestand aus dem Netz geladen wird.`,secPlanTune:`Feinabstimmung Preisplan`,secPlanTuneHint:`Nur bei „Dynamisch: Experte“. „Automatisch“ rechnet mit festen Werten.`,secCosts:`Kosten & Auswertung`,secCostsHint:`Diese Werte steuern nicht, wann geladen wird. Sie fließen in Kosten, Erlös und Verschleiß der Statistik ein. Der Preisplan nutzt zusätzlich den Einspeisepreis, im Modus Experte auch den Verschleiß.`,secSwitches:`Einzelschalter`,secSwitchesHint:`Die Schalter hinter der Strategie. Wer sie einzeln ändert, ändert damit auch die angezeigte Strategie.`,expertView:`Expertenansicht`,expertViewHint:`Zeigt zusätzliche Optionen und die Einzelschalter. Gilt nur für diesen Browser.`,sumOff:`Maestro lädt den Akku nie aus dem Netz, nur aus PV.`,sumSlots:`Maestro lädt in den Zeitfenstern der Klasse „Niedrig“ aus dem Netz bis {soc} %. Die Fenster legen Sie unten unter Tarif-Slots an.`,sumSlotsNone:`Es gibt noch kein Zeitfenster der Klasse „Niedrig“. Ohne ein solches Fenster lädt Maestro nicht aus dem Netz.`,sumThreshold:`Maestro lädt aus dem Netz, sobald der Preis höchstens {price} €/kWh beträgt, bis {soc} %.`,sumCap:`Sicherheitsgrenze: Nach {kwh} kWh an einem Tag stoppt die Netzladung.`,sumPlan:`Maestro sucht aus der Preiskurve die günstigsten Stunden. Er rechnet mit der Prognose für Verbrauch und PV und lädt nur so viel, wie bis zur nächsten günstigen Phase fehlt, bis {soc} %.`,sumAuto:`Wirkungsgrad, Mindestspanne und Sicherheitsfaktor sind fest eingestellt. Der Akku-Verschleiß zählt nicht.`,sumExpert:`Der Plan rechnet mit Ihren Werten für Wirkungsgrad, Mindestspanne, Sicherheitsfaktor und Akku-Verschleiß.`,sumShadow:`Schattenmodus: Der Plan wird nur berechnet und angezeigt. Damit er den Akku steuert, „Preisplan steuert Akku“ einschalten.`,sumActive:`Der Plan steuert den Akku.`,sumNoPrice:`Es ist kein Preis-Sensor hinterlegt. Ohne Preise lädt diese Strategie nicht.`,selStrategy:`Netzladung`,secHt:`Hochtarif`,secHtHint:`Im HT-Fenster hält Maestro eine Mindestreserve.`,secCorridor:`Tagesziel`,secCorridorHint:`SoC bis zum Ladeende. Das spätere Ziel gilt nur mit dem Schalter.`,secWindows:`Zeitfenster`,secWindowsHint:`Mit Astro folgen Start und Ende der Sonne. Sonst liegen Winter- und Sommer-Ladeende fest.`,secShape:`Ladeleistung`,secShapeHint:`Wie stark geladen wird. Ausgegraute Werte gelten erst, wenn ihr Schalter an ist. Der Korridor ist eine Leistung in Watt.`,secYield:`Wenn der Tag anders läuft`,secYieldHint:`Prognose, schwacher Tag und Abregelung. Schwellen und Referenzen stehen in der Expertenansicht.`,sumTarget:`Bis zum Ladeende auf {soc} %.`,sumTargetLate:`Bis zum Ladeende auf {soc} %, ab {hour} Uhr auf {late} %.`,sumWindowAstro:`Ladestart {start} h nach Sonnenaufgang, Ladeende {end} h vor Sonnenuntergang.`,sumWindowHours:`Ladeende im Winter um {winter} Uhr, im Sommer um {summer} Uhr.`,sumWindowCap:`Morgens höchstens {soc} % bis {hour} Uhr.`,sumPowerAuto:`Automatisch: die Leistung folgt dem Weg zum Tagesziel.`,sumPowerFloor:`Unter {soc} % volle Leistung.`,sumPowerSpread:`Verteilt bis {soc} %.`,sumPowerGentle:`Begrenzt auf Faktor {factor}.`,sumPowerCorridor:`Korridor {low}–{high} W.`,sumPowerPause:`Pause unter {low} W.`,sumPvNone:`Keine Sonderregel. Es gilt das Tagesziel.`,sumPvForecast:`Die Prognose darf die Ladung verzögern.`,sumPvForward:`Vorausschau bis {soc} %.`,sumPvLow:`An schwachen Tagen wird früher geladen.`,sumPvCurtail:`Abregelung wird abgefangen.`,secWallbox:`Wallbox`,secWallboxHint:`Überschussladen und Netzschutz, solange das Auto Leistung zieht.`,secEvcc:`EVCC`,secEvccHint:`Sperrt die Akku-Entladung, während das Auto sofort lädt.`,secHp:`Wärmepumpe`,secHpHint:`Überschuss und Preisgrenze.`,secMorning:`Morgen-Vorentladung`,secMorningHint:`Akku vor dem Ladestart absenken, damit PV-Überschuss hineinpasst.`,secAuto:`Ziel`,secAutoHint:`Die gefundene Strategie steht auf der Entscheidungsseite.`,secRun:`Betrieb`,secRunHint:`Dieselben Schalter liegen im Schnellmenü.`,secPace:`Tempo`,secPaceHint:`Wie oft geregelt wird und wie stark sich die Ladeleistung pro Takt ändern darf.`,secDiag:`Diagnose`,secDiagHint:`Debug-Protokoll und einmalige Aktionen.`,ladderTitle:`Regelungsleiter`,ladderHint:`Maestro prüft von oben nach unten und nimmt die erste passende Regel. Die aktive Regel ist markiert.`,ladderBandSafety:`Sicherheit`,ladderBandTariff:`Netz und Tarif`,ladderBandBlocks:`Ladesperren`,ladderBandPv:`PV-Laden`,ladderBandRest:`Danach`,ladderOff:`Regelung aus`,ladderForce:`Entladung erzwungen`,ladderEmergency:`Notladung`,ladderFeed:`Einspeisegrenze`,ladderReserve:`Notstromreserve`,ladderEvcc:`EVCC Sofortladen`,ladderPrice:`Preisplan`,ladderHt:`Hochtarif`,ladderHold:`Günstigen Slot halten`,ladderMorning:`Morgen-Vorentladung`,ladderCap:`Morning-Cap`,ladderAstro:`Warten auf Sonne`,ladderHard:`Akku-Deckel`,ladderFloor:`Schnelllade-Boden`,ladderLow:`Schwacher PV-Tag`,ladderGrid:`Netzladung im Slot`,ladderCorridor:`Korridor und PV-Verzögerung`,ladderSpread:`Ladeverteilung`,ladderCurtail:`Abregelschutz`,ladderIdle:`Leerlauf`,confirmReset:`Tagesstatistik auf 0 setzen?`,settingsPending:`Einstellungen werden geladen …`,settingsBack:`Alle Bereiche`,setClassic:`Classic-Dashboard`,setClassicHint:`Mit einem Klick anlegen`,classicLead:`Das Classic-Dashboard ist die Lovelace-Ansicht mit allen Tabs, auch Auto-Optimierung, Sizing-Berater und Hilfe. Maestro legt es hier direkt an.`,classicDepsTitle:`Benötigte Karten`,classicDepMushroom:`Mushroom Cards`,classicDepApex:`ApexCharts Card`,classicDepVia:`HACS → Frontend`,classicInstalled:`installiert`,classicMissing:`fehlt – über HACS → Frontend installieren`,classicDepsMissing:`Ohne diese Karten zeigt das Dashboard Fehlerkacheln. Erst installieren, dann den Browser neu laden.`,classicActionTitle:`Dashboard`,classicChecking:`Prüfe, ob das Dashboard schon angelegt ist …`,classicCreate:`Dashboard anlegen`,classicSetup:`Inhalt einrichten`,classicCreating:`Wird angelegt …`,classicReady:`Das Dashboard E3DC Maestro ist angelegt und steht in der Seitenleiste.`,classicEmpty:`Unter dem Pfad e3dc-maestro gibt es ein leeres Dashboard. Maestro richtet den Inhalt dort ein.`,classicForeign:`Unter dem Pfad e3dc-maestro liegt schon ein Dashboard mit anderem Inhalt. Maestro überschreibt es nicht. Zum Neuanlegen dieses Dashboard unter Einstellungen → Dashboards löschen.`,classicAdminOnly:`Anlegen können nur Administratoren.`,classicFailed:`Das hat nicht geklappt: {err}`,classicRetry:`Erneut prüfen`,classicManual:`Manuell anlegen`,classicHa:`Der Eintrag unter Community dashboards erscheint ab Home Assistant 2026.5. In älteren Versionen das Dashboard leer anlegen (Titel E3DC Maestro, Pfad e3dc-maestro) und den Inhalt von maestro_dashboard.yaml im YAML-Editor einfügen.`,classicStep1:`Integration E3DC Maestro einrichten. Läuft sie schon, Home Assistant einmal neu starten.`,classicStep2:`Den Browser hart neu laden, damit das Dashboard-Modul geladen ist.`,classicStep3:`Einstellungen → Dashboards → Dashboard hinzufügen.`,classicStep4:`Unter Community dashboards E3DC Maestro wählen.`,classicStep5:`Titel E3DC Maestro und das vorgeschlagene Icon bestätigen, dann anlegen.`,classicPath:`Der Pfad muss e3dc-maestro bleiben. Den vorgeschlagenen Titel nicht umbenennen, bevor der Slug feststeht. Sonst zeigen die Hilfe-Links ins Leere.`,classicAfter:`Das Dashboard baut sich bei jedem Öffnen aus der aktuellen Maestro-Vorlage auf. Updates kommen damit automatisch an, solange du es nicht im Editor übernimmst.`,classicTimeout:`Kommt „Timeout waiting for strategy element ll-strategy-dashboard-e3dc-maestro“: Home Assistant neu starten, den Browser hart neu laden und unter Einstellungen → Dashboards → Ressourcen prüfen, ob ganz oben /local/e3dc_maestro/e3dc-maestro-strategy.js als JavaScript-Modul steht (direkt nach dem ersten Einrichten noch /e3dc_maestro/frontend/e3dc-maestro-strategy.js).`,classicOpen:`Dashboard öffnen`,setLook:`Darstellung`,setLookHint:`Wähle den Look, der sich für dich richtig anfühlt.`,themeDark:`Dunkel`,themeDarkHint:`Ruhig am Abend. Die Energieflüsse leuchten auf dunklem Grund.`,themeClassic:`Classic`,themeClassicHint:`Hell und klar, angenehm zum Lesen am Tag.`,themeE3dc:`myE3DC`,themeE3dcHint:`Der vertraute myE3DC-Look.`,plantEmpty:`Keine Daten der E3DC-Integration. Sobald E3DC RSCP eingerichtet ist, stehen hier Betriebszustand, Speicher und Phasen.`,plantOperation:`Betrieb`,plantStorage:`Speicher`,plantPhases:`Phasen`,plantWallbox:`Wallbox`,plantRoomGrid:`Netz`,plantRoomGridHint:`Haus- und Netzphasen, zusätzlicher Verbrauch.`,plantRoomBattery:`Akku`,plantRoomBatteryHint:`Packs, Zellzustand und Ladegrenzen.`,plantRoomPv:`PV`,plantRoomPvHint:`Wechselrichter, Leistung und Einspeisegrenze.`,plantRoomWallbox:`Wallbox`,plantRoomWallboxHint:`Ladestatus und schaltbare Wallbox-Einstellungen.`,plantRoomControls:`Einstellungen`,plantRoomControlsHint:`Werte, die der E3DC über RSCP annimmt.`,plantCells:`Zellzustand`,plantCell:`Modul`,plantSend:`Diese Einstellung an den E3DC senden?`,plantModel:`Modell`,plantSerial:`Seriennummer`,plantFirmware:`Firmware`,plantFault:`Aktuelle Meldung`,plantPack:`Speicher`,plantMode:`Modus`,plantAutarky:`Autarkie`,plantSelf:`Eigenverbrauch`,plantPower:`Sollleistung`,plantLimits:`Leistungsgrenzen`,plantLimitCharge:`Max. Ladung`,plantLimitDischarge:`Max. Entladung`,plantLimitMin:`Mindestentladung`,plantManual:`Manuelle Netzladung`,plantManualEnergy:`Dabei geladen`,plantDerated:`PV abgeregelt`,plantEmergency:`Notstrom`,plantReserveHit:`Notstromreserve erreicht`,plantReserveOn:`Notstromreserve`,plantWeather:`Wetterregelung`,plantWeatherWait:`Warten auf Wetterdurchbruch`,plantOn:`an`,plantOff:`aus`,plantMode0:`Normal`,plantMode1:`Leerlauf`,plantMode2:`Entladen`,plantMode3:`Laden`,plantMode4:`Netzladung`,plantSoh:`State of Health`,plantCycles:`Zyklen`,plantEnergy:`Nutzbare Restenergie`,plantShare:`Anteil an der Anlagenkapazität`,plantCurrent:`Strom`,plantVoltage:`Spannung`,plantTemp:`Zelltemperatur`,plantHouse:`Haus`,plantGrid:`Netz`,plantInverter:`Wechselrichter`,plantPeak:`Installierte PV-Leistung`,plantCapacity:`Batteriekapazität`,plantAc:`Max. AC-Leistung`,plantSysCharge:`Max. Systemladung`,plantSysDischarge:`Max. Systementladung`,plantDeratePct:`Einspeisegrenze`,plantDeratePower:`Einspeisegrenze Leistung`,plantExtraPv:`Zusätzliche Erzeugung`,plantExtraUse:`Zusätzlicher Verbrauch`,plantPlug:`Stecker`,plantCharging:`Laden`,plantPhaseCount:`Phasen`,plantSun:`Solaranteil`,plantNet:`Netzanteil`,plantCarSoc:`Fahrzeug-SoC`,plantMaxCurrent:`Max. Ladestrom`,secSources:`Quellen`,secSourcesHint:`Sensoren für SoC, Leistung und Tageszähler. Ein Wechsel lädt die Integration neu.`,secAdaptive:`Adaptive Reserve`,secAdaptiveHint:`Wie weit Maestro zurückschaut und wie hoch die Reserve steigen darf.`,secPriceSensor:`Preis-Sensor`,secPriceSensorHint:`Aktueller Bezugspreis für den dynamischen Tarif.`,secSlots:`Tarif-Slots`,secSlotsHint:`Wiederkehrende Fenster. Montag ist der erste Tag.`,secForecastSensors:`Prognose-Sensoren`,secForecastSensorsHint:`Rest heute, Tagessumme, morgen und übermorgen.`,secWallboxWire:`Wallbox-Anbindung`,secWallboxWireHint:`Leistungssensor, Phasen und die Dienste zum Schalten.`,secEvccWire:`EVCC`,secEvccWireHint:`Welche Entität das Laden meldet und welcher Wert Sofortladen heißt.`,secHpWire:`Wärmepumpe`,secHpWireHint:`Schalter, Dienste und das Zeitfenster, in dem sie laufen darf.`,secSizingInputs:`Zähler`,secSizingInputsHint:`Energiezähler und der Zeitraum der Rechnung. Ein Sensorwechsel lädt die Integration neu.`,setSizingTile:`Mehr Akku oder PV?`,setSizingTileHint:`Was sich an Zubau rechnet`,setSetup:`Einrichtung`,setSetupHint:`Was die Regelung zum Arbeiten braucht`,setupTitle:`Erste Schritte`,setupLead:`Diese Punkte braucht Maestro, damit die Regelung dein Haus steuert.`,setupProgress:`{done} von {total} Pflichtschritten erledigt`,setupDone:`Einrichtung vollständig`,setupDoneHint:`Alle Pflichtschritte sind erledigt. Die Liste bleibt unter Einstellungen.`,setupAck:`Verstanden`,setupOpen:`Öffnen`,setupStatusDone:`erledigt`,setupStatusTodo:`fehlt`,setupStatusOptional:`optional`,setupStatusWait:`wird gelesen`,setupOptionsError:`Die Einstellungen konnten nicht gelesen werden: {err}`,setupPlant:`Anlage verbunden`,setupPlantHint:`SoC, PV, Netz, Haus und Akku brauchen je einen Sensor, der Werte liefert.`,setupPlantOk:`Alle Pflichsensoren liefern Werte.`,setupPlantMissing:`Noch ohne Wert: {names}.`,setupTariff:`Tarif`,setupTariffHint:`Fester Preis, Preis-Sensor oder Zeitfenster. Ohne Preis kann Maestro nicht nach Preis laden.`,setupTariffOk:`Ein Preis oder Zeitfenster ist hinterlegt.`,setupTariffMissing:`Beim dynamischen Tarif fehlt der Preis-Sensor, beim festen der Bezugspreis.`,setupForecast:`PV-Prognose`,setupForecastHint:`Empfohlen, damit Maestro das Laden an den erwarteten Ertrag anpasst.`,setupForecastOk:`Ein Prognose-Sensor ist gewählt.`,setupForecastOpen:`Noch keiner gewählt. Die Regelung läuft auch ohne, nur ohne Vorausschau.`,setupSafety:`Notstromreserve`,setupSafetyHint:`Kein Muss. Sinnvoll, damit der Akku eine Reserve behält.`,setupSafetyOk:`Eine Reserve ist eingeschaltet.`,setupSafetyOpen:`Noch keine Reserve aktiv. Fest, saisonal oder adaptiv stellst du unter Sicherheit ein.`,setupLoads:`Verbraucher`,setupLoadsHint:`Optional, wenn Maestro Wallbox, Wärmepumpe oder EVCC mitregeln soll.`,setupLoadsOk:`Mindestens ein Verbraucher ist angebunden.`,setupLoadsOpen:`Keiner angebunden. Nur nötig, wenn Maestro einen Verbraucher steuern soll.`,setupRegulation:`Regelung einschalten`,setupRegulationHint:`Solange sie aus ist, beobachtet Maestro nur und schickt keine Limits.`,setupRegulationOk:`Maestro regelt.`,setupRegulationOff:`Die Regelung ist aus.`,setupRun:`Erste Entscheidung`,setupRunHint:`Maestro hat mindestens einmal gerechnet und sagt, warum.`,setupRunOk:`Es gibt eine Entscheidung.`,setupRunOff:`Schalte die Regelung ein. Danach erscheint hier die Entscheidung.`,setupRunWait:`Die Regelung ist an. Die erste Entscheidung kommt mit dem nächsten Lauf.`,setSizing:`Lohnt sich der Zubau?`,setSizingHint:`Wie viel Zubau sich mit deinem Verbrauch rechnet`,sizingLead:`Hier prüfst du, ob ein größerer Akku oder mehr PV sich für dein Haus lohnt. Du gibst an, wie viel du dazubauen willst. Maestro rechnet aus deinem bisherigen Verbrauch, was das an Autarkie, Kosten und Amortisation ändert.`,sizingAdd:`Dein Zubau`,sizingAddHint:`Zusätzlicher Akku in kWh und zusätzliche PV in kWp, auf dem, was schon steht. 0 heißt: nichts dazukaufen.`,sizingRun:`Aus deiner Historie rechnen`,sizingScenario:`Für diesen Zubau`,sizingNeedRun:`Stell den Zubau ein und starte die Rechnung. Danach steht hier, was er bringt.`,sizingChartAvoided:`Vermiedener Netzbezug`,sizingChartBaseline:`Bisheriger Netzbezug`,sizingChartCaption:`Fläche: vermiedener Netzbezug. Linie: bisheriger Netzbezug.`,sizingStory:`{bat} kWh Akku und {pv} kWp PV: etwa {aut} % Autarkie, {save} € im Jahr, amortisiert in {years} Jahren.`,sizingStoryOpen:`{bat} kWh Akku und {pv} kWp PV: etwa {aut} % Autarkie und {save} € im Jahr. Eine Amortisation lässt sich daraus nicht ableiten.`,sizingBasis:`Grundlagen`,sizingBasisHint:`Preise, mit denen Investition und Amortisation gerechnet werden.`,sizingRecsHint:`Wirtschaftlich sucht die kürzeste Amortisation, technisch die höchste Autarkie, ausgewogen den Kompromiss.`,sizingRecs:`Drei Vorschläge`,recEconomicHint:`Kürzeste Amortisation`,recTechnicalHint:`Höchste Autarkie`,recBalancedHint:`Kompromiss aus beidem`,sizingBattery:`Akku`,sizingPv:`PV-Zubau`,sizingAutarky:`Autarkie`,sizingAvoided:`Vermiedener Netzbezug`,sizingSavings:`Ersparnis im Jahr`,sizingInvestment:`Investition`,sizingPayback:`Amortisation`,sizingInverter:`Wechselrichter-Upgrade`,sizingBaseline:`Netzbezug heute hochgerechnet`,sizingNotRun:`Noch nicht gerechnet`,sizingRunning:`Rechnet …`,sizingReady:`Fertig`,recEconomic:`Wirtschaftlich`,recTechnical:`Technisch`,recBalanced:`Ausgewogen`,matrixDays:`Analysetage`,matrixRecords:`Stundenwerte`,matrixAnomaly:`Anomalien`,optReload:`Gespeichert. Die Integration lädt neu, damit die neuen Sensoren gelten.`,optSaved:`Gespeichert. Der Wert gilt sofort.`,optAdmin:`Nur Admins können diese Werte ändern.`,optClear:`Leeren`,optSearch:`Entität suchen`,optService:`Dienst, zum Beispiel switch.turn_on`,optTarget:`Ziel-Entität`,optWeekdays:`Wochentage`,optFrom:`Von`,optTo:`Bis`,optClass:`Klasse`,optReserve:`Mindest-Reserve %`,optAddSlot:`Slot hinzufügen`,optRemove:`Entfernen`,optSaveSlots:`Slots speichern`,optYes:`Ja`,optNo:`Nein`,classHigh:`Hoch`,classLow:`Niedrig`,classNormal:`Normal`,wd0:`Mo`,wd1:`Di`,wd2:`Mi`,wd3:`Do`,wd4:`Fr`,wd5:`Sa`,wd6:`So`,targetPower:`Ziel-Ladeleistung`,autoObjective:`Ziel`,autoLastRun:`Letzter Lauf`,autoFallback:`Daten-Fallback`,autoReason:`Grund`,autoOverrides:`Anpassungen`,autoNone:`Keine Anpassung. Die bisherige Einstellung war bereits die beste.`,autoGrid:`Raster`,autoDeltaDraw:`Netzbezug gegenüber Basis`,autoDeltaFeed:`Einspeisung gegenüber Basis`,autoDeltaCurtail:`Abregelung gegenüber Basis`,autoDeltaSelf:`Autarkie gegenüber Basis`,...Yi},Qi={navLive:`Live`,navForecast:`Forecast`,navPlan:`Price plan`,navDecision:`Decision`,navSettings:`Settings`,navPlant:`System`,settingHelp:`Help`,navControls:`Controls`,menu:`Menu`,subLive:`Energy flow and battery in real time`,factRest:`PV forecast remaining today`,factTomorrow:`Tomorrow`,factDayAfter:`Day after`,subForecast:`What Maestro expects for the next 24 hours`,subPlan:`Grid charging by dynamic tariff`,subDecision:`Why Maestro regulates the way it does`,subSettings:`From the plant through safety and tariff to PV charging`,subPlant:`Operating state, storage and phases from the E3DC`,regulationOn:`Regulation active`,regulationOff:`Regulation off`,pauseTitle:`How long off?`,pauseHint:`Maestro stays off for this long and turns itself back on. The countdown survives a restart.`,pauseOffTitle:`Regulation`,pauseOffHint:`Turn it back on, or leave it off for a fixed time.`,pauseResume:`Turn back on`,pauseOneHour:`1 hour`,pauseHours:`{h} hours`,pausePermanent:`Until turned on`,pauseLeftHours:`{h} h {m} min left`,pauseLeftHour:`{h} h left`,pauseLeftMin:`{m} min left`,flowTitle:`Energy flow`,flowSub:`Now · live`,flowDay:`Today`,flowDaySeparate:`Separate`,flowDayImport:`Import`,flowDayFeed:`Feed-in`,flowDayOpen:`Open today`,flowStyleLabel:`Energy flow layout`,flowOpts:`Layout`,flowOptsTitle:`Energy flow layout`,flowOptsSub:`Choose the view, arrange consumers, or edit them`,flowOptsConsumers:`Consumers`,flowStyleTitle:`Energy flow`,flowStyleHint:`Nodes, blob or house. The choice applies only in this browser.`,flowStyleNodes:`Nodes`,flowStyleNodesHint:`PV, grid, house and battery around the hub. With separately metered loads, a consumption node appears.`,flowStyleBlob:`Blob`,flowStyleBlobHint:`A soft shape toward the strongest source or sink. With separately metered loads, Verbrauch → House appears.`,flowStyleCity:`House`,flowStyleCityHint:`Modern house with PV canopy. With separately metered loads, Verbrauch → House appears.`,nodeLoad:`Load`,flowCityLoad:`Load`,arrangeConsumers:`Arrange`,arrangeDone:`Done`,arrangeHint:`Drag consumers freely to place them.`,arrangeReset:`Reset`,nodePv:`PV`,nodeHouse:`House`,nodeImport:`Grid import`,nodeFeed:`Feed-in`,nodeBatDischarge:`Battery discharging`,nodeBatCharge:`Battery charging`,battery:`Battery`,batteryPlantDetails:`Battery details`,gridPlantDetails:`Grid details`,pvPlantDetails:`PV details`,batteryStyleLabel:`Battery layout`,batteryStyleRing:`Ring`,batteryStylePack:`Pack`,stateOfCharge:`State of charge`,targetSoc:`Target SoC`,autonomy:`Autonomy`,forecastPeak:`Next SoC peak`,forecastPeakToday:`Peak today {v}`,forecastPeakTomorrow:`Peak tomorrow {v}`,forecastNoPeak:`no rise in 24 h`,forecastFloor:`Reserve floor {v}`,forecastFloorReach:`Floor reached {v}`,forecastEmpty:`Empty {v}`,forecastGrid:`Grid import from {v}`,forecastGridUntil:`Grid import until {v}`,forecastGridOngoing:`Grid import ongoing`,forecastNoGrid:`no grid import`,autonomyHint:`at current load`,discharging:`Discharging`,charging:`Charging`,chipReachable:`E3DC reachable`,chipUnreachable:`E3DC unreachable`,chipChargeLock:`Charge lock`,chipDischargeLock:`Discharge lock`,chipHt:`HT protection`,chipCurtail:`Curtailment guard`,chipEmergency:`Emergency charge`,chipFeedIn:`Feed-in curtailment`,chipGridCharge:`Grid charge`,chipReserveCharge:`Backup-reserve grid charge`,chipBatteryPriority:`Battery priority`,chipLowYield:`Low-yield day`,chipPredictive:`Predictive charging`,chipShadow:`Price plan · shadow`,modePredictive:`Looking ahead`,modeShadow:`Price plan in shadow`,groupToday:`Today`,groupWeek:`Week`,groupMonth:`Month`,groupYear:`Year`,groupNet:`net`,periodToday:`Today`,periodWeek:`Week`,periodMonth:`Month`,periodYear:`Year`,calGrainDay:`Day`,calGrainWeek:`Week`,calGrainMonth:`Month`,calGrainYear:`Year`,forceTitle:`Forced discharge`,fixedReserve:`Emergency reserve`,controlsPair:`Discharge & reserve`,batteryCtrl:`Control battery`,batteryCtrlTitle:`Battery controls`,batteryCtrlSub:`Discharge, reserve and auto strategy`,batteryCtrlIdle:`Discharge · Reserve · Auto`,controlsForceOn:`Forced discharge {v}`,controlsForceOff:`Forced discharge off`,controlsReserveOn:`Emergency reserve {v}%`,controlsReserveOff:`Emergency reserve off`,ctrlReserveSoc:`{v}%`,exportCsv:`CSV`,actionsTitle:`Actions`,btnClear:`Release limits`,btnClearSub:`Clears charge and discharge limits immediately and sets the inverter to normal.`,btnCharge:`Manual charge (3 kWh)`,confirmCharge:`Charge 3 kWh from the grid?`,selWallbox:`Wallbox type`,selMorning:`Pre-discharge`,selAuto:`Auto objective`,selTariff:`Tariff`,debugTitle:`Debug log`,debugEmpty:`No debug lines yet. The switch starts logging.`,debugSwitch:`Debug logging`,balanceTitle:`Daily balance`,balanceWeek:`Weekly balance`,balanceMonth:`Monthly balance`,balanceYear:`Yearly balance`,pulseTitle:`Balance pulse`,pulseDaily:`Daily balance`,pulseCumulative:`Running total`,pulseDailyAxis:`€ / day`,pulseSumAxis:`Total €`,pulseEmpty:`No daily balances in the recorder.`,pulseClickDay:`Tap to select that day in the balance.`,dayPrev:`Back`,dayNext:`Forward`,dayPick:`Choose period`,dayNav:`Period`,rangeEmpty:`No recorder statistics for this period.`,whenToday:`today`,whenWeek:`this week`,whenMonth:`this month`,whenYear:`this year`,kpiCostGross:`Electricity cost`,kpiCostGrossSub:`grid import, gross`,kpiRevenue:`Feed-in revenue`,kpiRevenueSub:`remuneration {when}`,kpiWear:`Battery wear`,kpiWearSub:`share of cycle cost`,kpiBalance:`Energy balance`,kpiBalanceSub:`revenue + savings − cost − wear`,kpiGridBat:`Grid → battery`,kpiGridBatSub:`charged from the grid`,kpiGridBatWarn:`Grid charge without justification`,kpiGridBatReserve:`due to backup reserve`,kpiGridBatEmergency:`due to emergency charge`,kpiGridBatJustified:`justified grid charge`,kpiWallbox:`Wallbox {when}`,kpiWallboxSub:`energy charged`,kpiFeedLimit:`Feed-in limit`,kpiFeedLimitSub:`{n} interventions · {dc} kWh DC curtailment`,kpiCost:`Electricity cost {when}`,kpiCostSub:`net of feed-in`,kpiSaving:`PV savings {when}`,kpiSavingSub:`vs. grid-only supply`,kpiSimDynamic:`Simulation dynamic {v} €`,kpiSimCostlier:`{v} € more expensive`,kpiSimCheaper:`{v} € cheaper`,kpiSimMoreSaving:`{v} € more savings`,kpiSimLessSaving:`{v} € less savings`,kpiSimPending:`Compare from midnight`,kpiSelf:`Self-consumption {when}`,kpiSelfSub:`Import {imp} kWh · feed-in {feed} kWh`,kpiBattery:`Battery {when}`,kpiBatterySub:`charged · {out} kWh discharged`,chartTitle:`SoC trajectory & power · next 24 h`,chartTitlePlan:`SoC from price plan & power · next 24 h`,legendSoc:`SoC`,legendPv:`PV`,legendHouse:`House`,legendImport:`Import`,legendFeed:`Feed-in`,legendActual:`Actual`,actualOverlay:`Actuals`,now:`Now`,targetLabel:`Target SoC {v}%`,hoursShort:`{h} h`,statMinMax:`SoC min / max`,statImport:`Grid import`,statFeed:`Feed-in`,statAutarky:`Self-sufficiency`,statPvTomorrow:`PV tomorrow`,statP10:`PV remaining (P10)`,statDeficit:`Deficit tomorrow`,statYield:`PV day`,statYieldSub:`{today} / {ref} kWh reference`,qualityLabel:`Data quality`,qualityOk:`complete`,qualityPv:`PV profile missing`,qualityConsumption:`Consumption profile missing`,qualityBoth:`Profiles missing`,qualityUnknown:`unknown`,reserveTitle:`Target SoC`,reserveSeasonal:`Emergency reserve`,reserveAdaptive:`Reserve, adaptive`,reserveHt:`HT reserve`,reserveForward:`Look-ahead`,windowsTitle:`Charge window`,windowAstro:`Astro start`,windowSeasonalEnd:`Season end`,windowPvDelay:`PV delay`,windowTomorrow:`Tomorrow`,autoTitle:`Auto strategy`,autoSaving:`Estimated saving`,autoOff:`Off`,autoOn:`{goal} · {eur}`,autoPending:`{goal} · no run yet`,autoData:`{goal} · not enough history`,autoCap:`Morning cap on, up to {soc} %, until {hour}.`,autoLiveHint:`Auto only adjusts the morning cap. The amount is the forecast saving over the next 24 hours versus your own setting, not money already saved.`,alertUnreachable:`E3DC is not reachable`,alertChargeLock:`Charge lock active`,alertDischargeLock:`Discharge lock active`,alertUnjustified:`Grid charge without justification`,alertReserveCharge:`Grid charge due to backup reserve`,alertEmergencyCharge:`Grid charge due to emergency charge`,alertDismiss:`Got it`,alertBannerShow:`Alert banner`,alertBannerShowHint:`Short notes at the top. The same info appears as chips under the energy flow.`,noForecast:`No forecast yet. Maestro needs at least 7 days of history.`,priceTitle:`Electricity price & planned SoC`,legendCharge:`Grid charge`,legendHold:`Hold battery`,legendRelease:`Battery free`,legendPlanSoc:`Planned SoC`,planShadow:`Shadow mode · not controlling`,planActive:`Active · controls the battery`,planTitle:`Plan`,planStrategy:`Grid charging`,planGridCharge:`Planned grid charging`,planSaving:`Expected saving`,planCheapest:`Cheapest slot`,planMostExpensive:`Most expensive slot`,planKnownUntil:`Prices known until`,planDiag:`Inputs`,planFloor:`Floor`,planCeiling:`Ceiling`,planEfficiency:`Efficiency`,planMinSpread:`Minimum spread`,planWear:`Wear`,planSafety:`Consumption safety factor`,noPlan:`There is no price plan. It needs a dynamic tariff.`,noPlanOff:`With strategy “Off” there is no price-plan chart. Maestro does not charge the battery from the grid.`,noPlanSlots:`With time windows (HT/NT) there is no price-plan chart. Charge times come from tariff slots of class “Low”.`,noPlanThreshold:`With “below price threshold” there is no price-plan chart. Maestro charges while the price is under the threshold — those times are not shown as a plan curve.`,planComputing:`Computing the price plan…`,noPlanPrices:`No price plan: there is no valid price curve. Check the price sensor.`,noPlanProfile:`No price plan: consumption statistics are not ready yet.`,noPlanRoom:`No price plan: there is no room between charge threshold/reserve and the target SoC.`,planTune:`Grid charging`,planTuneHint:`The same settings as under Settings › Grid and tariff.`,slotPrice:`Price`,slotSoc:`SoC`,slotConsumption:`Consumption`,slotCharge:`Grid charge {kwh} kWh`,slotHold:`Hold battery`,slotRelease:`Battery free`,decisionPhase:`Current control phase`,tagTargetSoc:`Target SoC {v} %`,tagTargetPower:`Target charge power {v}`,tagBatteryPriority:`Battery priority`,tagSince:`since {t}`,limitsTitle:`Limits · target vs. sent`,limitsSub:`What Maestro wants and what reaches the E3DC`,limitCharge:`Charge limit`,limitDischarge:`Discharge limit`,limitTarget:`Target {a} · sent {b}`,limitNone:`no limit`,entitiesMissing:`Not available: {list}. These Maestro entities are missing or disabled – please check Settings › Entities.`,entityDisabled:`disabled`,notSetUp:`E3DC Maestro is not set up or has not started yet.`,limitSoc:`now {a} % → {b} %`,timelineTitle:`Decision history`,timelineEmpty:`No decisions recorded yet.`,noDecision:`No decision available yet.`,controlsTitle:`Quick controls`,controlsSub:`Takes effect immediately`,close:`Close`,historySub:`Last 24 hours`,historyEmpty:`No history for the last 24 hours.`,historyFailed:`The history could not be loaded.`,ctrlActive:`Regulation active`,ctrlActiveSub:`Maestro controls charge and discharge limits`,ctrlPredictive:`Predictive charging`,ctrlPredictiveSub:`Charge target from forecast and consumption`,ctrlPvDelay:`PV forecast delay`,ctrlPvDelaySub:`Postpone charging when PV is enough`,ctrlPlanControls:`Price plan controls battery`,ctrlPlanControlsSub:`Off = shadow mode only`,ctrlPlanShadow:`Price plan shadow mode`,ctrlPlanShadowSub:`Compute the plan but send nothing`,ctrlForce:`Forced discharge`,ctrlForcePower:`Power {v}`,allSettings:`Open all settings →`,displayTitle:`Display`,consumersSub:`Consumers in the live energy flow. Applies on every device that opens this cockpit.`,addConsumer:`Add consumer`,consumerSearch:`Search power sensors`,consumerName:`Name in the energy flow`,consumerIcon:`Icon`,iconWallbox:`Wallbox`,iconHeater:`Heating rod`,iconClimate:`Air conditioning`,iconHeatpump:`Heat pump`,iconMeter:`Power meter`,modeIncluded:`In house load`,modeSeparate:`Measured separately`,useWallbox:`Add wallbox`,removeConsumer:`Remove`,editConsumers:`Edit consumers`,consumersEmpty:`No consumers yet. Add a wallbox, heat pump or other loads here.`,consumersOverflow:`Included consumers exceed the house load. Check whether they are really part of the house meter.`,noPowerSensors:`No matching power sensors found.`,consumerMissing:`Sensor unavailable`,unavailable:`unavailable`,callFailed:`Action failed: {err}`,chartError:`Chart failed to load: {err}`,loading:`Loading …`,demoHint:`No data`,setHardware:`System`,setHardwareHint:`Plant data Maestro uses to calculate power and limits.`,setCorridor:`Target SoC and charge corridor`,setCorridorHint:`Where the battery should be today: threshold, corridor, charge end and hard caps.`,setWindows:`Look-ahead and time windows`,setWindowsHint:`When to charge: forecast, sun, morning cap and spreading across the day.`,setYield:`Low PV and curtailment`,setYieldHint:`Fill the battery before feed-in, catch curtailment and top up late.`,setTariff:`Grid and tariff`,setTariffHint:`Grid charging, high tariff, prices and tariff slots.`,setReserve:`High tariff and reserve`,setReserveHint:`HT window and emergency reserve. Adaptive-reserve lookback stays in the integration options.`,setFlex:`Wallbox, heat pump, pre-discharge`,setFlexHint:`Extra loads and the morning discharge before charging starts.`,setControl:`Control behaviour`,setControlHint:`Master switch, forced discharge and how calmly the control follows.`,setDiag:`Diagnostics and actions`,setDiagHint:`Debug log and one-off actions.`,setPlant:`Plant`,setPlantHint:`Inverter, PV size and the limits Maestro calculates with.`,setSafety:`Protection`,setSafetyHint:`Emergency charge, backup reserve, battery cap and watchdog.`,setPv:`PV charging`,setPvHint:`Daily target and time window. Charge power and special cases sit below.`,setLoads:`Loads`,setLoadsHint:`Wallbox, EVCC, heat pump and the morning discharge before charging starts.`,setAuto:`Automation`,setAutoHint:`Once a day Maestro looks for a better morning-cap and gentle-charge setting.`,setSystem:`System`,setSystemHint:`Master switch, forced discharge, control pace and diagnostics.`,secPlantPower:`Power and limits`,secPlantPowerHint:`Nameplate values of the plant.`,secEmergency:`Emergency charge`,secEmergencyHint:`Below this threshold Maestro charges from the grid at once. 0 turns emergency charging off.`,secReserve:`Backup reserve`,secReserveHint:`A fixed reserve replaces the seasonal and the adaptive one.`,secHard:`Battery cap`,secHardHint:`Charging stops above this SoC. Curtailment protection may override the cap.`,secWatchdog:`Watchdog`,secWatchdogHint:`After this long without contact Maestro releases the limits.`,secStrategy:`Grid charging`,secStrategyHint:`Whether and how Maestro charges the battery from the grid. The strategy sets every switch it needs.`,secLimits:`Limits`,secLimitsHint:`How much and up to which charge level the battery charges from the grid.`,secPlanTune:`Price plan fine-tuning`,secPlanTuneHint:`Only for “Dynamic: expert”. “Automatic” uses fixed values.`,secCosts:`Costs & statistics`,secCostsHint:`These values do not decide when to charge. They feed cost, revenue and wear in the statistics. The price plan also uses the feed-in price, and in expert mode the wear.`,secSwitches:`Individual switches`,secSwitchesHint:`The switches behind the strategy. Changing one of them also changes the strategy shown.`,expertView:`Expert view`,expertViewHint:`Shows extra options and the individual switches. Applies to this browser only.`,sumOff:`Maestro never charges the battery from the grid, only from PV.`,sumSlots:`Maestro charges from the grid in time windows of class “Low”, up to {soc} %. Add the windows below under tariff slots.`,sumSlotsNone:`There is no time window of class “Low” yet. Without one, Maestro does not charge from the grid.`,sumThreshold:`Maestro charges from the grid while the price is at most {price} €/kWh, up to {soc} %.`,sumCap:`Safety cap: grid charging stops after {kwh} kWh in one day.`,sumPlan:`Maestro picks the cheapest hours from the price curve. It uses the consumption and PV forecast and charges only what is missing until the next cheap phase, up to {soc} %.`,sumAuto:`Efficiency, minimum spread and safety factor are fixed. Battery wear does not count.`,sumExpert:`The plan uses your values for efficiency, minimum spread, safety factor and battery wear.`,sumShadow:`Shadow mode: the plan is only computed and shown. Turn on “Price plan controls battery” to let it control the battery.`,sumActive:`The plan controls the battery.`,sumNoPrice:`No price sensor is set. Without prices this strategy does not charge.`,selStrategy:`Grid charging`,secHt:`High tariff`,secHtHint:`During the high-tariff window Maestro keeps a minimum reserve.`,secCorridor:`Daily target`,secCorridorHint:`State of charge by the end of charging. The later target applies only while its switch is on.`,secWindows:`Time window`,secWindowsHint:`With astro, start and end follow the sun. Otherwise the winter and summer end times are fixed.`,secShape:`Charge power`,secShapeHint:`How hard the battery is charged. Grey values apply only while their switch is on. The corridor is a power in watts.`,secYield:`When the day runs differently`,secYieldHint:`Forecast, a weak day and curtailment. Thresholds and references sit in the expert view.`,sumTarget:`Up to {soc} % by the end of charging.`,sumTargetLate:`Up to {soc} % by the end of charging, then {late} % from {hour}.`,sumWindowAstro:`Charging starts {start} h after sunrise and ends {end} h before sunset.`,sumWindowHours:`Charging ends at {winter} in winter and at {summer} in summer.`,sumWindowCap:`Mornings stay at {soc} % until {hour}.`,sumPowerAuto:`Automatic: power follows the path to the daily target.`,sumPowerFloor:`Full power below {soc} %.`,sumPowerSpread:`Spread up to {soc} %.`,sumPowerGentle:`Limited to factor {factor}.`,sumPowerCorridor:`Corridor {low}–{high} W.`,sumPowerPause:`Pause below {low} W.`,sumPvNone:`No special rule. The daily target applies.`,sumPvForecast:`The forecast may delay charging.`,sumPvForward:`Look-ahead up to {soc} %.`,sumPvLow:`Weak days charge earlier.`,sumPvCurtail:`Curtailment is caught.`,secWallbox:`Wallbox`,secWallboxHint:`Surplus charging and grid protection while the car draws power.`,secEvcc:`EVCC`,secEvccHint:`Blocks battery discharge while the car charges immediately.`,secHp:`Heat pump`,secHpHint:`Surplus and price limit.`,secMorning:`Morning discharge`,secMorningHint:`Lower the battery before charging starts so PV surplus fits.`,secAuto:`Objective`,secAutoHint:`The chosen strategy is shown on the decision screen.`,secRun:`Operation`,secRunHint:`The same switches are in the quick menu.`,secPace:`Pace`,secPaceHint:`How often the control runs and how far charge power may step each cycle.`,secDiag:`Diagnostics`,secDiagHint:`Debug log and one-off actions.`,ladderTitle:`Control ladder`,ladderHint:`Maestro checks from top to bottom and takes the first matching rule. The active rule is marked.`,ladderBandSafety:`Safety`,ladderBandTariff:`Grid and tariff`,ladderBandBlocks:`Charge blocks`,ladderBandPv:`PV charging`,ladderBandRest:`After that`,ladderOff:`Control off`,ladderForce:`Forced discharge`,ladderEmergency:`Emergency charge`,ladderFeed:`Feed-in limit`,ladderReserve:`Backup reserve`,ladderEvcc:`EVCC immediate charge`,ladderPrice:`Price plan`,ladderHt:`High tariff`,ladderHold:`Hold the cheap slot`,ladderMorning:`Morning discharge`,ladderCap:`Morning cap`,ladderAstro:`Wait for the sun`,ladderHard:`Battery cap`,ladderFloor:`Fast-charge floor`,ladderLow:`Weak PV day`,ladderGrid:`Grid charge in the slot`,ladderCorridor:`Corridor and PV delay`,ladderSpread:`Spreading`,ladderCurtail:`Curtailment guard`,ladderIdle:`Idle`,confirmReset:`Reset today's statistics to 0?`,settingsPending:`Loading settings …`,settingsBack:`All areas`,setClassic:`Classic dashboard`,setClassicHint:`Add it with one click`,classicLead:`The classic dashboard is the Lovelace view with every tab, including auto-optimisation, sizing advisor and help. Maestro creates it right here.`,classicDepsTitle:`Required cards`,classicDepMushroom:`Mushroom Cards`,classicDepApex:`ApexCharts Card`,classicDepVia:`HACS → Frontend`,classicInstalled:`installed`,classicMissing:`missing – install via HACS → Frontend`,classicDepsMissing:`Without these cards the dashboard shows error tiles. Install them first, then reload the browser.`,classicActionTitle:`Dashboard`,classicChecking:`Checking whether the dashboard already exists …`,classicCreate:`Create dashboard`,classicSetup:`Set up content`,classicCreating:`Creating …`,classicReady:`The E3DC Maestro dashboard exists and is in the sidebar.`,classicEmpty:`There is an empty dashboard at the path e3dc-maestro. Maestro sets up its content there.`,classicForeign:`A dashboard with other content already uses the path e3dc-maestro. Maestro does not overwrite it. To start over, delete it under Settings → Dashboards.`,classicAdminOnly:`Only administrators can create it.`,classicFailed:`That did not work: {err}`,classicRetry:`Check again`,classicManual:`Add it manually`,classicHa:`The Community dashboards entry appears from Home Assistant 2026.5. On older versions, create an empty dashboard (title E3DC Maestro, path e3dc-maestro) and paste maestro_dashboard.yaml into the YAML editor.`,classicStep1:`Set up the E3DC Maestro integration. If it is already running, restart Home Assistant once.`,classicStep2:`Hard-reload the browser so the dashboard module is loaded.`,classicStep3:`Settings → Dashboards → Add dashboard.`,classicStep4:`Under Community dashboards, choose E3DC Maestro.`,classicStep5:`Confirm the title E3DC Maestro and the suggested icon, then create it.`,classicPath:`The path must stay e3dc-maestro. Do not rename the suggested title before the slug is set, or the help links inside the dashboard point nowhere.`,classicAfter:`The dashboard is built from the current Maestro template every time it opens, so updates arrive automatically as long as you do not take control of it in the editor.`,classicTimeout:`If you see “Timeout waiting for strategy element ll-strategy-dashboard-e3dc-maestro”: restart Home Assistant, hard-reload the browser, and under Settings → Dashboards → Resources check that /local/e3dc_maestro/e3dc-maestro-strategy.js is the first JavaScript module (right after first setup it is still /e3dc_maestro/frontend/e3dc-maestro-strategy.js).`,classicOpen:`Open dashboard`,setLook:`Appearance`,setLookHint:`Choose the look that feels right.`,themeDark:`Dark`,themeDarkHint:`Calm in the evening. Energy flows glow on a dark ground.`,themeClassic:`Classic`,themeClassicHint:`Light and clear, easy to read during the day.`,themeE3dc:`myE3DC`,themeE3dcHint:`The familiar myE3DC look.`,plantEmpty:`No data from the E3DC integration. Once E3DC RSCP is set up, operating state, storage and phases show up here.`,plantOperation:`Operation`,plantStorage:`Storage`,plantPhases:`Phases`,plantWallbox:`Wallbox`,plantRoomGrid:`Grid`,plantRoomGridHint:`House and grid phases, additional consumption.`,plantRoomBattery:`Battery`,plantRoomBatteryHint:`Packs, cell health and charge limits.`,plantRoomPv:`PV`,plantRoomPvHint:`Inverter, power and the feed-in limit.`,plantRoomWallbox:`Wallbox`,plantRoomWallboxHint:`Charge status and wallbox settings that can be changed.`,plantRoomControls:`Settings`,plantRoomControlsHint:`Values the E3DC accepts over RSCP.`,plantCells:`Cell health`,plantCell:`Module`,plantSend:`Send this setting to the E3DC?`,plantModel:`Model`,plantSerial:`Serial number`,plantFirmware:`Firmware`,plantFault:`Current message`,plantPack:`Storage`,plantMode:`Mode`,plantAutarky:`Autarky`,plantSelf:`Self-consumption`,plantPower:`Power setpoint`,plantLimits:`Power limits`,plantLimitCharge:`Max. charge`,plantLimitDischarge:`Max. discharge`,plantLimitMin:`Minimum discharge`,plantManual:`Manual grid charge`,plantManualEnergy:`Charged that way`,plantDerated:`PV derated`,plantEmergency:`Emergency power`,plantReserveHit:`Emergency reserve reached`,plantReserveOn:`Emergency reserve`,plantWeather:`Weather regulation`,plantWeatherWait:`Waiting for weather breakthrough`,plantOn:`on`,plantOff:`off`,plantMode0:`Normal`,plantMode1:`Idle`,plantMode2:`Discharging`,plantMode3:`Charging`,plantMode4:`Grid charge`,plantSoh:`State of health`,plantCycles:`Cycles`,plantEnergy:`Usable energy left`,plantShare:`Share of installed capacity`,plantCurrent:`Current`,plantVoltage:`Voltage`,plantTemp:`Cell temperature`,plantHouse:`House`,plantGrid:`Grid`,plantInverter:`Inverter`,plantPeak:`Installed PV power`,plantCapacity:`Battery capacity`,plantAc:`Max. AC power`,plantSysCharge:`Max. system charge`,plantSysDischarge:`Max. system discharge`,plantDeratePct:`Feed-in limit`,plantDeratePower:`Feed-in limit power`,plantExtraPv:`Additional production`,plantExtraUse:`Additional consumption`,plantPlug:`Plug`,plantCharging:`Charging`,plantPhaseCount:`Phases`,plantSun:`Solar share`,plantNet:`Grid share`,plantCarSoc:`Vehicle SoC`,plantMaxCurrent:`Max. charge current`,secSources:`Sources`,secSourcesHint:`Sensors for state of charge, power and daily counters. Changing one reloads the integration.`,secAdaptive:`Adaptive reserve`,secAdaptiveHint:`How far back Maestro looks and how high the reserve may rise.`,secPriceSensor:`Price sensor`,secPriceSensorHint:`Current import price for the dynamic tariff.`,secSlots:`Tariff slots`,secSlotsHint:`Repeating windows. Monday is the first day.`,secForecastSensors:`Forecast sensors`,secForecastSensorsHint:`Remaining today, today's total, tomorrow and the day after.`,secWallboxWire:`Wallbox wiring`,secWallboxWireHint:`Power sensor, phases and the services that switch it.`,secEvccWire:`EVCC`,secEvccWireHint:`Which entity reports charging and which value means charge now.`,secHpWire:`Heat pump`,secHpWireHint:`Switch, services and the window in which it may run.`,secSizingInputs:`Meters`,secSizingInputsHint:`Energy meters and the period used for the calculation. Changing a sensor reloads the integration.`,setSizingTile:`More battery or PV?`,setSizingTileHint:`Which expansion pays off`,setSetup:`Setup`,setSetupHint:`What the control needs in order to run`,setupTitle:`First steps`,setupLead:`Maestro needs these points before it can control your home.`,setupProgress:`{done} of {total} required steps done`,setupDone:`Setup complete`,setupDoneHint:`Every required step is done. The list stays under Settings.`,setupAck:`Got it`,setupOpen:`Open`,setupStatusDone:`done`,setupStatusTodo:`missing`,setupStatusOptional:`optional`,setupStatusWait:`reading`,setupOptionsError:`The settings could not be read: {err}`,setupPlant:`Plant connected`,setupPlantHint:`State of charge, PV, grid, house and battery each need a sensor that reports values.`,setupPlantOk:`Every required sensor is reporting.`,setupPlantMissing:`Still without a value: {names}.`,setupTariff:`Tariff`,setupTariffHint:`A fixed price, a price sensor or time windows. Without a price Maestro cannot charge by price.`,setupTariffOk:`A price or a time window is set.`,setupTariffMissing:`The dynamic tariff has no price sensor, or the fixed tariff has no import price.`,setupForecast:`PV forecast`,setupForecastHint:`Recommended, so Maestro can match charging to the expected yield.`,setupForecastOk:`A forecast sensor is selected.`,setupForecastOpen:`None selected yet. Control still runs, only without looking ahead.`,setupSafety:`Emergency reserve`,setupSafetyHint:`Not required. Useful so the battery keeps a reserve.`,setupSafetyOk:`A reserve is switched on.`,setupSafetyOpen:`No reserve is active yet. Fixed, seasonal or adaptive lives under Safety.`,setupLoads:`Loads`,setupLoadsHint:`Optional, when Maestro should also control a wallbox, heat pump or EVCC.`,setupLoadsOk:`At least one load is connected.`,setupLoadsOpen:`None connected. Only needed when Maestro should control a load.`,setupRegulation:`Switch control on`,setupRegulationHint:`While it is off, Maestro only watches and sends no limits.`,setupRegulationOk:`Maestro is controlling.`,setupRegulationOff:`Control is off.`,setupRun:`First decision`,setupRunHint:`Maestro has calculated at least once and says why.`,setupRunOk:`There is a decision.`,setupRunOff:`Switch control on. The decision shows up here afterwards.`,setupRunWait:`Control is on. The first decision arrives with the next cycle.`,setSizing:`Does the expansion pay off?`,setSizingHint:`How much extra capacity fits your consumption`,sizingLead:`Check whether a larger battery or more PV is worth it for your home. You set how much you want to add. Maestro uses your past consumption to estimate what that changes in autarky, cost and payback.`,sizingAdd:`Your expansion`,sizingAddHint:`Extra battery in kWh and extra PV in kWp, on top of what is already installed. 0 means buy nothing.`,sizingRun:`Calculate from your history`,sizingScenario:`For this expansion`,sizingNeedRun:`Set the expansion and start the calculation. The result then shows what it is worth.`,sizingChartAvoided:`Avoided grid import`,sizingChartBaseline:`Current grid import`,sizingChartCaption:`Area: avoided grid import. Line: current grid import.`,sizingStory:`{bat} kWh of battery and {pv} kWp of PV: about {aut}% autarky, {save} € a year, paid back in {years} years.`,sizingStoryOpen:`{bat} kWh of battery and {pv} kWp of PV: about {aut}% autarky and {save} € a year. Payback cannot be derived from this.`,sizingBasis:`Assumptions`,sizingBasisHint:`Prices used for investment and payback.`,sizingRecsHint:`Economic looks for the shortest payback, technical for the highest autarky, balanced for a compromise.`,sizingRecs:`Three suggestions`,recEconomicHint:`Shortest payback`,recTechnicalHint:`Highest autarky`,recBalancedHint:`A compromise of both`,sizingBattery:`Battery`,sizingPv:`PV added`,sizingAutarky:`Autarky`,sizingAvoided:`Avoided grid import`,sizingSavings:`Savings per year`,sizingInvestment:`Investment`,sizingPayback:`Payback`,sizingInverter:`Inverter upgrade`,sizingBaseline:`Baseline grid import`,sizingNotRun:`Not calculated yet`,sizingRunning:`Calculating …`,sizingReady:`Ready`,recEconomic:`Economic`,recTechnical:`Technical`,recBalanced:`Balanced`,matrixDays:`Analysis days`,matrixRecords:`Hourly records`,matrixAnomaly:`Anomalies`,optReload:`Saved. The integration reloads so the new sensors take effect.`,optSaved:`Saved. The value applies immediately.`,optAdmin:`Only admins can change these values.`,optClear:`Clear`,optSearch:`Search entities`,optService:`Service, for example switch.turn_on`,optTarget:`Target entity`,optWeekdays:`Weekdays`,optFrom:`From`,optTo:`Until`,optClass:`Class`,optReserve:`Minimum reserve %`,optAddSlot:`Add slot`,optRemove:`Remove`,optSaveSlots:`Save slots`,optYes:`Yes`,optNo:`No`,classHigh:`High`,classLow:`Low`,classNormal:`Normal`,wd0:`Mon`,wd1:`Tue`,wd2:`Wed`,wd3:`Thu`,wd4:`Fri`,wd5:`Sat`,wd6:`Sun`,targetPower:`Target charge power`,autoObjective:`Objective`,autoLastRun:`Last run`,autoFallback:`Data fallback`,autoReason:`Reason`,autoOverrides:`Adjustments`,autoNone:`No adjustment. The previous setup was already the best.`,autoGrid:`Grid size`,autoDeltaDraw:`Grid import versus baseline`,autoDeltaFeed:`Feed-in versus baseline`,autoDeltaCurtail:`Curtailment versus baseline`,autoDeltaSelf:`Autarky versus baseline`,...Xi},$i={e3dc:`E3DC`,generic:`Generisch`,off:`Aus`,passive:`Passiv`,active_house:`Aktiv Haus`,active_grid:`Aktiv Netz`,self_consumption:`Eigenverbrauch`,cost:`Kosten`,co2:`CO₂`,fixed:`Fest`,dynamic:`Dynamisch`,slots:`Zeitfenster (HT/NT)`,threshold:`Dynamisch: unter Preisschwelle`,dynamic_auto:`Dynamisch: automatisch`,dynamic_expert:`Dynamisch: Experte`},ea={e3dc:`E3DC`,generic:`Generic`,off:`Off`,passive:`Passive`,active_house:`Active, house`,active_grid:`Active, grid`,self_consumption:`Self-consumption`,cost:`Cost`,co2:`CO₂`,fixed:`Fixed`,dynamic:`Dynamic`,slots:`Time windows (peak/off-peak)`,threshold:`Dynamic: below price threshold`,dynamic_auto:`Dynamic: automatic`,dynamic_expert:`Dynamic: expert`},ta={off:`Aus`,manual:`Manuell`,emergency:`Notladung`,feed_in_limit:`Einspeisebegrenzung`,reserve_protection:`Notstromreserve`,evcc_pause:`EVCC-Pause`,ht_protection:`HT-Schutz`,force_discharge:`Erzwungene Entladung`,morning_discharge:`Morgen-Entladung`,astro_wait:`Astro-Wartezeit`,morning_cap:`Morgen-Deckel`,hard_soc_limit:`SoC-Deckel`,fast_floor:`Schnell-Boden`,grid_charge:`Netzladung`,grid_hold:`Akku halten`,corridor:`Ladekorridor`,pv_delay:`PV-Verzögerung`,spreading:`Spreading`,curtailment_guard:`Abregelschutz`,idle:`Leerlauf`},na={off:`Off`,manual:`Manual`,emergency:`Emergency charge`,feed_in_limit:`Feed-in limit`,reserve_protection:`Backup reserve`,evcc_pause:`EVCC pause`,ht_protection:`HT protection`,force_discharge:`Forced discharge`,morning_discharge:`Morning discharge`,astro_wait:`Astro wait`,morning_cap:`Morning cap`,hard_soc_limit:`SoC cap`,fast_floor:`Fast floor`,grid_charge:`Grid charge`,grid_hold:`Hold battery`,corridor:`Charge corridor`,pv_delay:`PV delay`,spreading:`Spreading`,curtailment_guard:`Curtailment guard`,idle:`Idle`};function ra(e){let t=!e||e.toLowerCase().startsWith(`de`),n=t?Zi:Qi,r=t?ta:na,i=t?$i:ea;return{t:(e,t)=>{let r=n[e];if(t)for(let[e,n]of Object.entries(t))r=r.replace(`{${e}}`,String(n));return r},phase:e=>r[e]??e,option:e=>i[e]??e}}var ia=o`
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
`,aa=[`unreachable`,`charge_lock`,`discharge_lock`,`unjustified`,`reserve_charge`,`emergency_charge`],oa=`e3dc-maestro.alerts-dismissed.v1`,sa=`e3dc-maestro.alerts-banner-hidden.v1`,ca={unreachable:`alertUnreachable`,charge_lock:`alertChargeLock`,discharge_lock:`alertDischargeLock`,unjustified:`alertUnjustified`,reserve_charge:`alertReserveCharge`,emergency_charge:`alertEmergencyCharge`},la=e=>ca[e];function ua(e){let t=t=>e.states[t]?.state,n=t(z.phase),r=[];return t(z.reachable)===`off`&&r.push(`unreachable`),t(z.chargeLock)===`on`&&r.push(`charge_lock`),t(z.dischargeLock)===`on`&&r.push(`discharge_lock`),t(z.unjustified)===`on`&&r.push(`unjustified`),n===`reserve_protection`&&r.push(`reserve_charge`),n===`emergency`&&r.push(`emergency_charge`),r}function da(e,t){let n=new Set(t),r=new Set;for(let t of e)n.has(t)&&r.add(t);return r}function fa(e,t,n){return n||!e.length?!1:e.some(e=>!t.has(e))}function pa(e){let t=new Set(aa),n=new Set;if(!Array.isArray(e))return n;for(let r of e)typeof r==`string`&&t.has(r)&&n.add(r);return n}function ma(){try{return pa(JSON.parse(localStorage.getItem(oa)??`null`))}catch{return new Set}}function ha(e){try{localStorage.setItem(oa,JSON.stringify([...e]))}catch{}}function ga(e){return e===`1`}function _a(){try{return ga(localStorage.getItem(sa))}catch{return!1}}function va(e){try{localStorage.setItem(sa,e?`1`:`0`)}catch{}}var ya=[`ring`,`pack`],ba=`e3dc-maestro.battery-style.v1`;function xa(e){return e===`ring`?`ring`:`pack`}function Sa(){try{return xa(localStorage.getItem(ba))}catch{return`pack`}}function Ca(e){try{localStorage.setItem(ba,e)}catch{}}var wa=[`dark`,`classic`,`e3dc`],Ta=`e3dc-maestro.theme.v1`;function Ea(e){return e===`classic`||e===`e3dc`?e:`dark`}function Da(){try{return Ea(localStorage.getItem(Ta))}catch{return`dark`}}function Oa(e){try{localStorage.setItem(Ta,e)}catch{}}var ka=`e3dc-maestro`,Aa=`custom:e3dc-maestro`,ja=e=>e instanceof Error?e.message:typeof e==`object`&&e&&`message`in e?String(e.message):String(e),Ma=e=>typeof e==`object`&&e&&`code`in e?String(e.code):void 0,Na=(e,t)=>e.some(e=>e.toLowerCase().includes(t));function Pa(e){if(!e||typeof e!=`object`)return`empty`;let t=e.strategy;if(t?.type===`custom:e3dc-maestro`)return`ours`;let n=e.views;return Object.keys(e).length===0||Array.isArray(n)&&n.length===0&&!t?`empty`:`foreign`}async function Fa(e){try{let t=(await e.callWS({type:`lovelace/resources`})).map(e=>e.url??``);return{mushroom:Na(t,`mushroom`),apex:Na(t,`apexcharts-card`)}}catch{return{}}}async function Ia(e){if(!(await e.callWS({type:`lovelace/dashboards/list`})).some(e=>e.url_path===`e3dc-maestro`))return`missing`;try{return Pa(await e.callWS({type:`lovelace/config`,url_path:ka,force:!1}))}catch(e){if(Ma(e)===`config_not_found`)return`empty`;throw e}}async function La(e){let t=await Fa(e);try{return{state:await Ia(e),...t}}catch(e){return{state:`error`,error:ja(e),...t}}}async function Ra(e,t){if(t===`missing`)await e.callWS({type:`lovelace/dashboards/create`,url_path:ka,title:`E3DC Maestro`,icon:`mdi:battery-charging`,require_admin:!1,show_in_sidebar:!0,mode:`storage`});else if(t!==`empty`)return;await e.callWS({type:`lovelace/config/save`,url_path:ka,config:{strategy:{type:Aa}}})}var za=[`soc_sensor`,`pv_power_sensor`,`house_power_sensor`,`grid_power_sensor`,`battery_power_sensor`],Ba=[`pv_forecast_sensor`,`pv_forecast_today_sensor`,`tomorrow_pv_sensor`],Va=[`wallbox_power_sensor`,`evcc_charging_entity`,`hp_switch_entity`],Ha=[`fixed_reserve_enabled`,`seasonal_reserve_enabled`,`adaptive_reserve_enabled`],Ua=[`wallbox_enabled`,`evcc_enabled`,`hp_enabled`],Wa=e=>!e||e===`unknown`||e===`unavailable`||e===`none`,Ga=(e,t)=>{let n=e[t];return typeof n==`string`&&n.includes(`.`)?n:void 0},Ka=(e,t)=>{let n=Ga(e.options,t);return!!n&&!Wa(e.state(n))},qa=e=>{let t=za.filter(t=>!Ka(e,t)),n=e.options.battery_capacity_kwh;return(typeof n!=`number`||!(n>0))&&t.push(`battery_capacity_kwh`),t},Ja=e=>{let t=e.select(`tariff_mode`),n=Number.isFinite(e.number(`fixed_buy_price`)??NaN),r=Ka(e,`price_sensor`),i=e.slots>0;return t===`dynamic`?!e.ready&&!r&&!i?`wait`:r||i?`done`:`todo`:t===`fixed`&&n||r||i?`done`:e.ready?`todo`:`wait`},Ya=(e,t)=>{let n=t.map(t=>e.on(t));if(n.some(e=>e===!0))return!0;if(!n.every(e=>e===void 0))return!1};function Xa(e){let t=e.ready?qa(e):[],n=Ba.some(t=>Ka(e,t)),r=Va.some(t=>Ka(e,t)),i=Ya(e,Ua),a=Ya(e,Ha),o=!Wa(e.phase);return[{id:`plant`,status:e.ready?t.length?`todo`:`done`:`wait`,required:!0,area:`plant`,missing:t},{id:`tariff`,status:Ja(e),required:!0,area:`tariff`,missing:[]},{id:`forecast`,status:e.ready?n?`done`:`optional`:`wait`,required:!1,area:`pv`,missing:[]},{id:`safety`,status:a===void 0?`wait`:a?`done`:`optional`,required:!1,area:`safety`,missing:[]},{id:`loads`,status:i===!0||r?`done`:!e.ready||i===void 0?`wait`:`optional`,required:!1,area:`loads`,missing:[]},{id:`regulation`,status:e.regulation===void 0?`wait`:e.regulation?`done`:`todo`,required:!0,missing:[]},{id:`run`,status:o?`done`:e.regulation===!1?`todo`:`wait`,required:!0,missing:[],note:o&&e.explanation&&!Wa(e.explanation)?e.explanation:void 0}]}var Za=e=>e.filter(e=>e.required).every(e=>e.status===`done`),Qa=`e3dc-maestro.setup.ack`,$a=e=>e===`1`;function eo(){try{return $a(localStorage.getItem(Qa))}catch{return!1}}function to(){try{localStorage.setItem(Qa,`1`)}catch{}}var no=[`sensor`],ro=[`sensor`],io=(e,t,n,r=1,i)=>({key:e,kind:`number`,min:t,max:n,step:r,unit:i}),K=(e,t,n=!1)=>({key:e,kind:`entity`,domains:t,required:n}),ao=(e,t)=>({key:e,kind:`entities`,domains:t}),oo=[{area:`plant`,title:`secSources`,hint:`secSourcesHint`,fields:[io(`battery_capacity_kwh`,1,100,.1),K(`soc_sensor`,no,!0),K(`pv_power_sensor`,no,!0),ao(`additional_generation_sensor`,no),ao(`additional_energy_total_sensor`,ro),K(`house_power_sensor`,no,!0),K(`grid_power_sensor`,no,!0),{key:`grid_power_invert`,kind:`bool`},K(`battery_power_sensor`,no,!0),K(`battery_charged_today_sensor`,ro),K(`battery_discharged_today_sensor`,ro),K(`pv_production_today_sensor`,ro),K(`house_consumption_today_sensor`,ro)]},{area:`safety`,title:`secAdaptive`,hint:`secAdaptiveHint`,fields:[io(`adaptive_reserve_lookback_days`,1,60),io(`adaptive_reserve_min_days`,1,30),io(`adaptive_reserve_safety_factor`,1,3,.1),io(`adaptive_reserve_max_soc`,5,90,1,`%`)]},{area:`tariff`,title:`secPriceSensor`,hint:`secPriceSensorHint`,fields:[K(`price_sensor`,no)]},{area:`pv`,title:`secForecastSensors`,hint:`secForecastSensorsHint`,fields:[K(`pv_forecast_sensor`,no),K(`pv_forecast_today_sensor`,no),K(`tomorrow_pv_sensor`,no),K(`pv_forecast_sensor_day2`,no)],bundle:!0},{area:`loads`,title:`secWallboxWire`,hint:`secWallboxWireHint`,fields:[K(`wallbox_power_sensor`,no),{key:`wallbox_included_in_house`,kind:`bool`},{key:`wallbox_phases`,kind:`select`,choices:[`1`,`3`]},{key:`wallbox_service_on`,kind:`action`},{key:`wallbox_service_off`,kind:`action`}]},{area:`loads`,title:`secEvccWire`,hint:`secEvccWireHint`,fields:[K(`evcc_charging_entity`,[`sensor`,`binary_sensor`,`switch`,`input_boolean`]),K(`evcc_mode_entity`,[`select`,`input_select`,`sensor`]),{key:`evcc_now_value`,kind:`text`}]},{area:`loads`,title:`secHpWire`,hint:`secHpWireHint`,fields:[K(`hp_switch_entity`,[`switch`,`input_boolean`]),{key:`hp_service_on`,kind:`action`},{key:`hp_service_off`,kind:`action`},{key:`hp_time_start`,kind:`time`},{key:`hp_time_end`,kind:`time`}]},{area:`sizing`,title:`secSizingInputs`,hint:`secSizingInputsHint`,fields:[{key:`sizing_pv_energy_sensor`,kind:`entities`,domains:ro},K(`sizing_house_energy_sensor`,ro),{key:`sizing_house_from_balance`,kind:`bool`},K(`sizing_grid_import_energy_sensor`,ro),K(`sizing_grid_export_energy_sensor`,ro),K(`sizing_battery_charge_energy_sensor`,ro),K(`sizing_battery_discharge_energy_sensor`,ro),K(`sizing_wallbox_energy_sensor`,ro),K(`sizing_heat_pump_energy_sensor`,ro),io(`sizing_analysis_days`,30,730),io(`sizing_electricity_price_eur_kwh`,.05,2,.01),io(`sizing_feed_in_price_eur_kwh`,0,1,.01),io(`sizing_battery_price_eur_kwh`,100,5e3),io(`sizing_pv_price_eur_per_kwp`,200,5e3),io(`sizing_inverter_upgrade_price_eur`,0,2e4),io(`sizing_round_trip_efficiency`,.5,1,.01),io(`sizing_max_battery_sweep_kwh`,5,200,.5),io(`sizing_battery_step_kwh`,.5,10,.5),io(`sizing_max_pv_expansion_kwp`,0,200,.5),io(`sizing_pv_step_kwp`,.5,10,.5)]}],so={battery_capacity_kwh:{de:`Nutzbare Akkukapazität`,en:`Usable battery capacity`},soc_sensor:{de:`SoC-Sensor`,en:`State-of-charge sensor`},pv_power_sensor:{de:`PV-Leistung`,en:`PV power`},additional_generation_sensor:{de:`Zusätzliche Erzeuger (Leistung)`,en:`Additional producers (power)`},additional_energy_total_sensor:{de:`Zusatz-Energiezähler (gesamt)`,en:`Additional energy totals`},house_power_sensor:{de:`Hausverbrauch`,en:`House power`},grid_power_sensor:{de:`Netzleistung`,en:`Grid power`},grid_power_invert:{de:`Netzleistung invertieren`,en:`Invert grid power`},battery_power_sensor:{de:`Akkuleistung`,en:`Battery power`},battery_charged_today_sensor:{de:`Heute geladen`,en:`Charged today`},battery_discharged_today_sensor:{de:`Heute entladen`,en:`Discharged today`},pv_production_today_sensor:{de:`PV-Ertrag heute`,en:`PV yield today`},house_consumption_today_sensor:{de:`Hausverbrauch heute`,en:`House consumption today`},adaptive_reserve_lookback_days:{de:`Rückblick in Tagen`,en:`Lookback in days`},adaptive_reserve_min_days:{de:`Mindestens Tage mit Daten`,en:`Minimum days of data`},adaptive_reserve_safety_factor:{de:`Sicherheitsfaktor`,en:`Safety factor`},adaptive_reserve_max_soc:{de:`Obergrenze der Reserve`,en:`Reserve ceiling`},price_sensor:{de:`Preis-Sensor`,en:`Price sensor`},pv_forecast_sensor:{de:`Restprognose heute`,en:`Remaining forecast today`},pv_forecast_today_sensor:{de:`Tagesprognose`,en:`Today's forecast`},tomorrow_pv_sensor:{de:`Prognose morgen`,en:`Tomorrow's forecast`},pv_forecast_sensor_day2:{de:`Prognose übermorgen`,en:`Day-after forecast`},wallbox_power_sensor:{de:`Wallbox-Leistung`,en:`Wallbox power`},wallbox_included_in_house:{de:`In der Hauslast enthalten`,en:`Included in house load`},wallbox_phases:{de:`Phasen`,en:`Phases`},wallbox_service_on:{de:`Wallbox einschalten`,en:`Turn wallbox on`},wallbox_service_off:{de:`Wallbox ausschalten`,en:`Turn wallbox off`},evcc_charging_entity:{de:`Lade-Entität`,en:`Charging entity`},evcc_mode_entity:{de:`Modus-Entität`,en:`Mode entity`},evcc_now_value:{de:`Wert für Sofortladen`,en:`Now-mode value`},hp_switch_entity:{de:`Schalter der Wärmepumpe`,en:`Heat-pump switch`},hp_service_on:{de:`Wärmepumpe einschalten`,en:`Turn heat pump on`},hp_service_off:{de:`Wärmepumpe ausschalten`,en:`Turn heat pump off`},hp_time_start:{de:`Frühester Start`,en:`Earliest start`},hp_time_end:{de:`Spätestes Ende`,en:`Latest end`},sizing_pv_energy_sensor:{de:`PV-Energie`,en:`PV energy`},sizing_house_energy_sensor:{de:`Hausenergie`,en:`House energy`},sizing_house_from_balance:{de:`Haus aus der Bilanz rechnen`,en:`Derive house from the balance`},sizing_grid_import_energy_sensor:{de:`Netzbezug`,en:`Grid import`},sizing_grid_export_energy_sensor:{de:`Einspeisung`,en:`Grid export`},sizing_battery_charge_energy_sensor:{de:`Akku geladen`,en:`Battery charged`},sizing_battery_discharge_energy_sensor:{de:`Akku entladen`,en:`Battery discharged`},sizing_wallbox_energy_sensor:{de:`Wallbox-Energie`,en:`Wallbox energy`},sizing_heat_pump_energy_sensor:{de:`Wärmepumpen-Energie`,en:`Heat-pump energy`},sizing_analysis_days:{de:`Analysetage`,en:`Analysis days`},sizing_electricity_price_eur_kwh:{de:`Bezugspreis`,en:`Import price`},sizing_feed_in_price_eur_kwh:{de:`Einspeisepreis`,en:`Feed-in price`},sizing_battery_price_eur_kwh:{de:`Akkupreis`,en:`Battery price`},sizing_pv_price_eur_per_kwp:{de:`PV-Preis`,en:`PV price`},sizing_inverter_upgrade_price_eur:{de:`Wechselrichter-Upgrade`,en:`Inverter upgrade`},sizing_round_trip_efficiency:{de:`Wirkungsgrad`,en:`Round-trip efficiency`},sizing_max_battery_sweep_kwh:{de:`Akku bis`,en:`Battery sweep up to`},sizing_battery_step_kwh:{de:`Akku-Schritt`,en:`Battery step`},sizing_max_pv_expansion_kwp:{de:`PV-Zubau bis`,en:`PV expansion up to`},sizing_pv_step_kwp:{de:`PV-Schritt`,en:`PV step`}},co=(e,t)=>{let n=so[t];return n?e.toLowerCase().startsWith(`de`)||!e?n.de:n.en:t},lo=e=>oo.filter(t=>t.area===e);function uo(e,t,n,r=40){let i=new Set(t??[]),a=n.trim().toLowerCase(),o=[];for(let t of e){let e=t.split(`.`)[0];if((!i.size||i.has(e))&&(!a||t.toLowerCase().includes(a))&&(o.push(t),o.length>=r))break}return o}function fo(e){if(!Array.isArray(e))return[];let t=[];for(let n of e){if(!n||typeof n!=`object`)continue;let e=n,r=Array.isArray(e.weekdays)?e.weekdays.filter(e=>typeof e==`number`&&e>=0&&e<=6):[],i=e.class_===`high`||e.class_===`low`||e.class_===`normal`?e.class_:`normal`,a={weekdays:r,start_h:typeof e.start_h==`number`?e.start_h:0,end_h:typeof e.end_h==`number`?e.end_h:24,class_:i};typeof e.min_reserve_soc==`number`&&(a.min_reserve_soc=e.min_reserve_soc),t.push(a)}return t}var po=()=>({weekdays:[0,1,2,3,4],start_h:6,end_h:22,class_:`high`});function mo(e){if(!e||typeof e!=`object`||Array.isArray(e))return{service:``,entity:``};let t=e,n=typeof t.action==`string`?t.action:typeof t.service==`string`?t.service:``,r=t.target,i=r&&typeof r==`object`&&!Array.isArray(r)?r.entity_id:void 0;return{service:n,entity:typeof i==`string`?i:``}}function ho(e,t){let n=e.trim();if(!n)return null;let r=t.trim();return r?{action:n,target:{entity_id:r}}:{action:n}}function go(e,t){return typeof e==`string`&&t.includes(e)?e:typeof e==`number`&&t.includes(String(e))?String(e):t[0]??``}function _o(e){return typeof e==`string`&&/^\d{2}:\d{2}/.test(e)?e.slice(0,5):``}var vo=[{id:`off`,phases:[`off`],group:`system`,label:`ladderOff`},{id:`force`,phases:[`force_discharge`],group:`system`,label:`ladderForce`},{id:`emergency`,phases:[`emergency`],group:`safety`,label:`ladderEmergency`},{id:`feed`,phases:[`feed_in_limit`],group:`plant`,label:`ladderFeed`},{id:`reserve`,phases:[`reserve_protection`],group:`safety`,label:`ladderReserve`},{id:`evcc`,phases:[`evcc_pause`],group:`loads`,label:`ladderEvcc`},{id:`price`,phases:[`grid_charge`,`grid_hold`],group:`tariff`,label:`ladderPrice`},{id:`ht`,phases:[`ht_protection`],group:`tariff`,label:`ladderHt`},{id:`hold`,phases:[`grid_hold`],group:`tariff`,label:`ladderHold`},{id:`morning`,phases:[`morning_discharge`],group:`loads`,label:`ladderMorning`},{id:`cap`,phases:[`morning_cap`],group:`pv`,label:`ladderCap`},{id:`astro`,phases:[`astro_wait`],group:`pv`,label:`ladderAstro`},{id:`hard`,phases:[`hard_soc_limit`],group:`safety`,label:`ladderHard`},{id:`floor`,phases:[`fast_floor`],group:`pv`,label:`ladderFloor`},{id:`low`,phases:[`corridor`],group:`pv`,label:`ladderLow`},{id:`grid`,phases:[`grid_charge`],group:`tariff`,label:`ladderGrid`},{id:`corridor`,phases:[`corridor`,`pv_delay`],group:`pv`,label:`ladderCorridor`},{id:`spread`,phases:[`spreading`],group:`pv`,label:`ladderSpread`},{id:`curtail`,phases:[`curtailment_guard`],group:`pv`,label:`ladderCurtail`},{id:`idle`,phases:[`idle`],group:`pv`,label:`ladderIdle`}],yo=[{id:`safety`,label:`ladderBandSafety`,steps:[`off`,`force`,`emergency`,`feed`,`reserve`]},{id:`tariff`,label:`ladderBandTariff`,steps:[`evcc`,`price`,`ht`,`hold`]},{id:`blocks`,label:`ladderBandBlocks`,steps:[`morning`,`cap`,`astro`,`hard`]},{id:`pv`,label:`ladderBandPv`,steps:[`floor`,`low`,`grid`,`corridor`,`spread`]},{id:`rest`,label:`ladderBandRest`,steps:[`curtail`,`idle`]}],bo=new Map(vo.map(e=>[e.id,e]));function xo(e,t=!1,n=!1){if(e)return e===`grid_charge`?t?`price`:`grid`:e===`grid_hold`?t?`price`:`hold`:e===`corridor`?n?`low`:`corridor`:vo.find(t=>t.phases.includes(e))?.id}function So(e,t,n,r,i){let{t:a}=e,o=xo(t,n,r);return F`<section class="ladder" aria-label=${a(`ladderTitle`)}>
    <div class="ladder-head">
      <h3>${a(`ladderTitle`)}</h3>
      <p>${a(`ladderHint`)}</p>
    </div>
    ${yo.map(e=>F`<div class="ladder-band">
      <h4>${a(e.label)}</h4>
      <div class="ladder-steps">
        ${e.steps.map(e=>{let t=bo.get(e);if(!t)return F``;let n=e===o;return F`<button
            type="button"
            class="ladder-step ${n?`on`:``}"
            aria-current=${n?`true`:`false`}
            @click=${()=>i(t.group)}
          >${a(t.label)}</button>`})}
      </div>
    </div>`)}
  </section>`}var Co=e=>!e||e===`unknown`||e===`unavailable`||e===`none`,wo=e=>{let t=t=>{let n=Je[t];return n?e.hass.states[n]:void 0},n=e.hass.states[z.ctrlActive],r=e.hass.states[z.phase]?.state,i=e.hass.states[z.explanation]?.state;return{ready:e.options.ready,options:e.options.options,slots:e.options.slots.length,state:t=>e.hass.states[t]?.state,on:e=>{let n=t(e);if(n&&n.state!==`unavailable`&&n.state!==`unknown`)return H(n)},number:e=>V(t(e)),select:e=>{let n=t(e)?.state;return Co(n)?void 0:n},phase:Co(r)?void 0:r,explanation:Co(i)?void 0:i,regulation:!n||Co(n.state)?void 0:n.state===`on`}},To={plant:{title:`setupPlant`,hint:`setupPlantHint`,done:`setupPlantOk`,open:`setupPlantMissing`},tariff:{title:`setupTariff`,hint:`setupTariffHint`,done:`setupTariffOk`,open:`setupTariffMissing`},forecast:{title:`setupForecast`,hint:`setupForecastHint`,done:`setupForecastOk`,open:`setupForecastOpen`},safety:{title:`setupSafety`,hint:`setupSafetyHint`,done:`setupSafetyOk`,open:`setupSafetyOpen`},loads:{title:`setupLoads`,hint:`setupLoadsHint`,done:`setupLoadsOk`,open:`setupLoadsOpen`},regulation:{title:`setupRegulation`,hint:`setupRegulationHint`,done:`setupRegulationOk`,open:`setupRegulationOff`},run:{title:`setupRun`,hint:`setupRunHint`,done:`setupRunOk`,open:`setupRunOff`}},Eo={done:`✓`,todo:`!`,optional:`·`,wait:`…`},Do=(e,t)=>{let{t:n}=e.i18n;return t.status===`wait`?t.id===`run`?n(`setupRunWait`):n(`setupStatusWait`):t.status===`done`?t.note??n(To[t.id].done):t.id===`plant`&&t.missing.length?n(`setupPlantMissing`,{names:t.missing.map(t=>co(e.hass.language,t)).join(`, `)}):n(To[t.id].open)},Oo=(e,t)=>{let{t:n}=e.i18n,r=To[t.id],i=z.ctrlActive,a=e.hass.states[i]?.state===`on`,o=t.id===`regulation`?F`<button
          class="switch ${a?`on`:``}"
          role="switch"
          aria-checked=${a}
          aria-label=${n(r.title)}
          ?disabled=${e.pending.has(i)||!e.hass.states[i]}
          @click=${()=>e.onToggle(i)}
        ></button>`:t.area?F`<button type="button" class="btn" @click=${()=>e.onOpenGroup(t.area)}>${n(`setupOpen`)}</button>`:L;return F`<li class="setup-step ${t.status}">
    <span class="setup-mark ${t.status}" aria-hidden="true">${Eo[t.status]}</span>
    <div>
      <b>${n(r.title)}</b>
      <span class="tag">${n(t.status===`done`?`setupStatusDone`:t.status===`todo`?`setupStatusTodo`:t.status===`optional`?`setupStatusOptional`:`setupStatusWait`)}</span>
      <p>${n(r.hint)}</p>
      <p class="sub">${Do(e,t)}</p>
    </div>
    ${o}
  </li>`},ko=(e,t)=>{let{t:n}=e.i18n,r=t.filter(e=>e.required),i=r.filter(e=>e.status===`done`).length;return F`<p class="setup-progress">${n(`setupProgress`,{done:i,total:r.length})}</p>
    ${e.options.error?F`<p class="err">${n(`setupOptionsError`,{err:e.options.error})}</p>`:L}
    <ol class="setup-steps">
      ${t.map(t=>Oo(e,t))}
    </ol>`};function Ao(e){return F`<div class="settings-detail">${ko(e,Xa(wo(e)))}</div>`}function jo(e){let{t}=e.i18n,n=Xa(wo(e));return Za(n)?e.setupAck?F``:F`<div class="setup-done">
      <button type="button" class="setup-done-open" @click=${()=>e.onOpenGroup(`setup`)}>
        <span class="setup-mark done" aria-hidden="true">✓</span>
        <span><b>${t(`setupDone`)}</b><span>${t(`setupDoneHint`)}</span></span>
      </button>
      <button type="button" class="btn" @click=${()=>e.onAckSetup?.()}>${t(`setupAck`)}</button>
    </div>`:F`<section class="card setup-card" aria-label=${t(`setupTitle`)}>
    <h2>${t(`setupTitle`)}</h2>
    <p class="sub">${t(`setupLead`)}</p>
    ${ko(e,n)}
  </section>`}var Mo=e=>Object.keys(e.states).sort(),No=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},Po=(e,t,n,r=!1,i=!1)=>F`<div class="${i?`setting-line stack`:`ctrl setting-row`} ${n&&!i?`locked`:``} ${r&&!i?`wide`:``}">
    <div class="txt"><span class="name"><b>${e}</b></span></div>
    ${t}
  </div>`;function Fo(e,t,n){let r=e.options[t.key],i=typeof r==`number`?String(r):``;return t.unit===`%`&&t.min!==void 0&&t.max!==void 0?Xt({label:n,min:t.min,max:t.max,step:t.step??1,value:typeof r==`number`?r:t.min,unit:`%`,disabled:!e.isAdmin||e.pending.has(t.key),onCommit:n=>e.onChange(t.key,n)}):F`<label class="setting-num">
    <input
      type="number"
      inputmode="decimal"
      aria-label=${n}
      min=${t.min??L}
      max=${t.max??L}
      step=${t.step??`any`}
      ?disabled=${!e.isAdmin||e.pending.has(t.key)}
      ${zt(e=>{e instanceof HTMLInputElement&&!No(e)&&e.value!==i&&(e.value=i)})}
      @change=${n=>{let r=Number.parseFloat(n.target.value);Number.isFinite(r)&&e.onChange(t.key,r)}}
    />
  </label>`}function Io(e,t,n,r){let i=e.query[t.key]??``,a=i.trim()?uo(Mo(e.hass),t.domains,i):[],o=e.options[t.key],s=r?Array.isArray(o)?o.filter(e=>typeof e==`string`):typeof o==`string`&&o?[o]:[]:[],c=!r&&typeof o==`string`?o:``;return F`<div class="opt-entity">
    ${r?F`<div class="opt-chips">
          ${s.map(n=>F`<button type="button" class="chip" ?disabled=${!e.isAdmin} @click=${()=>e.onChange(t.key,s.filter(e=>e!==n))}>${n}</button>`)}
        </div>`:L}
    <input
      type="search"
      aria-label=${n}
      placeholder=${e.i18n.t(`optSearch`)}
      .value=${i||c}
      ?disabled=${!e.isAdmin}
      @input=${n=>e.onQuery(t.key,n.target.value)}
      @change=${n=>{let i=n.target.value.trim();r?(i&&!s.includes(i)&&e.onChange(t.key,[...s,i]),e.onQuery(t.key,``)):(i||!t.required)&&e.onChange(t.key,i||null)}}
    />
    ${a.length?F`<div class="opt-choices">
          ${a.map(n=>F`<button
              type="button"
              ?disabled=${!e.isAdmin}
              @click=${()=>{r?e.onChange(t.key,s.includes(n)?s:[...s,n]):e.onChange(t.key,n),e.onQuery(t.key,``)}}
            >${n}</button>`)}
        </div>`:L}
    ${!t.required&&!r&&c?F`<button type="button" class="btn" ?disabled=${!e.isAdmin} @click=${()=>e.onChange(t.key,null)}>${e.i18n.t(`optClear`)}</button>`:L}
  </div>`}function Lo(e,t){let n=mo(e.options[t.key]),r=(n,r)=>e.onChange(t.key,ho(n,r));return F`<div class="opt-action">
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
  </div>`}var Ro=[`wd0`,`wd1`,`wd2`,`wd3`,`wd4`,`wd5`,`wd6`];function zo(e){let{t}=e.i18n,n=(t,n)=>e.onSlots(e.slots.map((e,r)=>r===t?n:e));return F`<section class="settings-section">
    <h3>${t(`secSlots`)}</h3>
    <p class="sub">${t(`secSlotsHint`)}</p>
    ${e.slots.map((r,i)=>F`<div class="slot-card">
        <div class="opt-days" role="group" aria-label=${t(`optWeekdays`)}>
          ${Ro.map((a,o)=>F`<button
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
      <button type="button" class="btn" ?disabled=${!e.isAdmin} @click=${()=>e.onSlots([...e.slots,po()])}>${t(`optAddSlot`)}</button>
      <button type="button" class="btn" ?disabled=${!e.isAdmin||e.pending.has(`tariff_slots`)} @click=${()=>e.onSaveSlots()}>${t(`optSaveSlots`)}</button>
    </div>
  </section>`}function Bo(e,t,n=!1){let r=co(e.hass.language,t.key),i=!e.isAdmin;if(t.kind===`bool`){let a=e.options[t.key]===!0;return Po(r,F`<button class="switch ${a?`on`:``}" role="switch" aria-checked=${a} aria-label=${r} ?disabled=${i||e.pending.has(t.key)} @click=${()=>e.onChange(t.key,!a)}></button>`,i,!1,n)}if(t.kind===`number`)return Po(r,Fo(e,t,r),i,t.unit===`%`,n);if(t.kind===`select`){let a=t.choices??[],o=go(e.options[t.key],a);return Po(r,F`<select aria-label=${r} .value=${o} ?disabled=${i} @change=${n=>e.onChange(t.key,n.target.value)}>
        ${a.map(e=>F`<option value=${e} ?selected=${e===o}>${e}</option>`)}
      </select>`,i,!1,n)}return t.kind===`time`?Po(r,F`<input type="time" aria-label=${r} .value=${_o(e.options[t.key])} ?disabled=${i} @change=${n=>e.onChange(t.key,n.target.value)} />`,i,!1,n):t.kind===`text`?Po(r,F`<input aria-label=${r} .value=${typeof e.options[t.key]==`string`?e.options[t.key]:``} maxlength="64" ?disabled=${i} @change=${n=>e.onChange(t.key,n.target.value)} />`,i,!1,n):t.kind===`action`?Po(r,Lo(e,t),i,!0,n):Po(r,Io(e,t,r,t.kind===`entities`),i,!0,n)}var Vo=e=>!e||e.state===`unknown`||e.state===`unavailable`?`–`:e.state,Ho={recommended_economic:`recEconomicHint`,recommended_technical:`recTechnicalHint`,recommended_balanced:`recBalancedHint`},Uo=(e,t,n)=>typeof t==`number`&&Number.isFinite(t)?t.toLocaleString(e||`de`,{minimumFractionDigits:n,maximumFractionDigits:n}):void 0,Wo=(e,t,n)=>{let r=e.hass.states[z.sizingMatrix]?.attributes[t];if(!r||typeof r!=`object`)return F``;let i=r,a=(t,n,r)=>F`<div class="row"><span>${e.i18n.t(t)}</span><b>${n??`–`}${r}</b></div>`;return F`<div class="card">
    <h3>${e.i18n.t(n)}</h3>
    <p class="sub">${e.i18n.t(Ho[t])}</p>
    <div class="rows">
      ${a(`sizingBattery`,i.battery_kwh,` kWh`)}
      ${a(`sizingPv`,i.pv_kwp,` kWp`)}
      ${a(`sizingAutarky`,i.self_sufficiency_pct,` %`)}
      ${a(`sizingSavings`,i.savings_eur_per_year,` €`)}
      ${a(`sizingPayback`,i.payback_years,` a`)}
    </div>
    ${typeof i.reason==`string`?F`<p class="sub">${i.reason}</p>`:L}
  </div>`},Go=(e,t)=>{let n=e.hass.language,r=Uo(n,t.slider_battery_kwh,1),i=Uo(n,t.slider_pv_kwp,1),a=Uo(n,t.scenario_self_sufficiency_pct,0),o=Uo(n,t.scenario_savings_eur,0);if(!r||!i||!a||!o)return;let s=Uo(n,t.scenario_payback_years,1);return s?e.i18n.t(`sizingStory`,{bat:r,pv:i,aut:a,save:o,years:s}):e.i18n.t(`sizingStoryOpen`,{bat:r,pv:i,aut:a,save:o})};function Ko(e,t,n){let{t:r}=e.i18n,i=e.hass.states[z.sizingStatus]?.state,a=r(i===`running`?`sizingRunning`:i===`ready`?`sizingReady`:`sizingNotRun`),o=e.hass.states[z.sizingScenario]?.attributes??{},s=e.hass.states[z.sizingMatrix]?.attributes??{},c=Array.isArray(s.top_savings_scenarios)?s.top_savings_scenarios:[],l=e=>typeof e==`number`&&Number.isFinite(e)?String(e):`–`,u=Go(e,o);return F`<div class="settings-detail">
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
        <button type="button" class="btn" ?disabled=${!e.hass.states[z.btnSizing]||i===`running`} @click=${()=>e.onRunSizing()}>${r(`sizingRun`)}</button>
        <span class="hint">${a}</span>
      </div>
    </section>
    <section class="settings-section">
      <h3>${r(`sizingScenario`)}</h3>
      <p class="sub">${u??r(`sizingNeedRun`)}</p>
      ${(()=>{let t=ur(o.scenario_monthly_avoided_kwh),n=ur(o.scenario_monthly_baseline_grid_in);return!t||!n?L:F`<maestro-chart .options=${Ji(`sizing-year`,[e.hass.language,t.join(`,`),n.join(`,`)],()=>dr(e.hass.language,t,n,r(`sizingChartAvoided`),r(`sizingChartBaseline`)))}></maestro-chart>
          <p class="hint">${r(`sizingChartCaption`)}</p>`})()}
      ${u?F`<div class="rows">
            <div class="row"><span>${r(`sizingAutarky`)}</span><b>${l(o.scenario_self_sufficiency_pct)} %</b></div>
            <div class="row"><span>${r(`sizingAvoided`)}</span><b>${l(o.scenario_avoided_kwh)} kWh</b></div>
            <div class="row"><span>${r(`sizingSavings`)}</span><b>${l(o.scenario_savings_eur)} €</b></div>
            <div class="row"><span>${r(`sizingInvestment`)}</span><b>${l(o.scenario_investment_eur)} €</b></div>
            <div class="row"><span>${r(`sizingPayback`)}</span><b>${l(o.scenario_payback_years)} a</b></div>
            <div class="row"><span>${r(`sizingInverter`)}</span><b>${Vo(e.hass.states[z.sizingInverter])}</b></div>
          </div>`:L}
    </section>
    <section class="settings-section">
      <h3>${r(`sizingRecs`)}</h3>
      <p class="sub">${r(`sizingRecsHint`)}</p>
      <div class="grid">${Wo(e,`recommended_economic`,`recEconomic`)}${Wo(e,`recommended_technical`,`recTechnical`)}${Wo(e,`recommended_balanced`,`recBalanced`)}</div>
      <div class="rows">
        <div class="row"><span>${r(`matrixDays`)}</span><b>${l(s.analysis_days)}</b></div>
        <div class="row"><span>${r(`matrixRecords`)}</span><b>${l(s.records_count)}</b></div>
        <div class="row"><span>${r(`matrixAnomaly`)}</span><b>${l(s.anomaly_rate_pct)} %</b></div>
        <div class="row"><span>${r(`sizingBaseline`)}</span><b>${l(s.baseline_grid_import_kwh)} kWh</b></div>
      </div>
      ${c.length?F`<div class="opt-top">
            ${c.map(e=>F`<div class="row"><span>${l(e.b)} kWh · ${l(e.p)} kWp</span><b>${l(e.savings)} €</b></div>`)}
          </div>`:L}
    </section>
    <section class="settings-section">
      <h3>${r(`sizingBasis`)}</h3>
      <p class="sub">${r(`sizingBasisHint`)}</p>
      ${n}
    </section>
    ${qo(e,`sizing`)}
  </div>`}function qo(e,t){let n=lo(t);if(!n.length&&t!==`tariff`)return F``;let{t:r}=e.i18n;return F`${e.notice?F`<p class="hint">${e.notice===`reload`?r(`optReload`):r(`optSaved`)}</p>`:L}
    ${e.error?F`<p class="err">${e.error}</p>`:L}
    ${e.isAdmin?L:F`<p class="hint">${r(`optAdmin`)}</p>`}
    ${n.map(t=>F`<section class="settings-section">
        <h3>${r(t.title)}</h3>
        <p class="sub">${r(t.hint)}</p>
        ${t.bundle?F`<div class="ctrl setting-bundle">${t.fields.map(t=>Bo(e,t,!0))}</div>`:t.fields.map(t=>Bo(e,t))}
      </section>`)}
    ${t===`tariff`?zo(e):L}`}var Jo={grid_charge_strategy:{de:`Aus: nie aus dem Netz. Zeitfenster: in NT-Fenstern. Preisschwelle: unter einem festen Preis. Automatisch: der Preisplan wählt die günstigsten Stunden. Experte: wie automatisch, mit eigenen Werten.`,en:`Off: never from the grid. Time windows: in off-peak windows. Price threshold: below a fixed price. Automatic: the price plan picks the cheapest hours. Expert: like automatic, with your own values.`},inverter_power:{de:`Gesamte WR-Leistung der Anlage inkl. zusätzlicher Erzeuger. Begrenzt die Entladung und skaliert die Last-Balken im Haus-Fluss.`,en:`Total plant inverter power including additional producers. Caps discharge and scales the house-flow load bars.`},installed_kwp:{de:`Installierte PV-Leistung. Daraus vergleicht Maestro den Tagesertrag.`,en:`Installed PV power. Maestro compares the day's yield against this.`},max_charge_power:{de:`Höchste Ladeleistung, die Maestro anfordern darf.`,en:`Highest charge power Maestro may request.`},min_charge_power:{de:`Unter dieser Leistung startet Maestro keine Ladung.`,en:`Maestro does not start charging below this power.`},feed_in_limit_percent:{de:`Anteil der Wechselrichterleistung, der höchstens ins Netz gehen darf.`,en:`Share of inverter power that may be exported at most.`},charge_threshold:{de:`Unter diesem SoC lädt Maestro sofort aus dem Netz. 0 schaltet die Notladung aus.`,en:`Below this SoC Maestro charges from the grid at once. 0 turns emergency charging off.`},advanced_corridor:{de:`Übersetzt die fehlende Strecke zum Ziel in eine Ladeleistung zwischen unterem und oberem Korridor, in Watt.`,en:`Turns the gap to the target into a charge power between the lower and upper corridor, in watts.`},lower_corridor:{de:`Kleinste Ladeleistung im Korridor, in Watt. Darunter pausiert die Ladung, wenn die Pause an ist.`,en:`Lowest charge power in the corridor, in watts. Charging pauses below it while the pause is on.`},upper_corridor:{de:`Größte Ladeleistung im erweiterten Korridor, in Watt.`,en:`Highest charge power in the advanced corridor, in watts.`},charge_target:{de:`SoC, den der Akku bis zum Ladeende erreichen soll.`,en:`SoC the battery should reach by the end of charging.`},winter_minimum_hour:{de:`Frist fürs Tagesziel am kürzesten Tag. Danach lädt Überschuss weiter.`,en:`Deadline for the daily target on the shortest day. Surplus keeps charging after that.`},summer_maximum_hour:{de:`Wird von der Regelung nicht gelesen. Das Sommer-Ladeende steht im anderen Feld.`,en:`The control logic does not read this. The summer end of charging is the other field.`},summer_charge_end:{de:`Frist fürs Tagesziel am längsten Tag. Dazwischen nach Tageslänge.`,en:`Deadline for the daily target on the longest day. Other days fall in between by day length.`},hard_soc_limit_enabled:{de:`Harter Deckel: darüber lädt Maestro den Akku nicht weiter.`,en:`Hard cap: Maestro will not charge the battery above it.`},hard_soc_limit:{de:`SoC, der mit dem harten Deckel nicht überschritten wird.`,en:`SoC the hard cap will not go past.`},fast_charge_floor_enabled:{de:`Unter dem Boden lädt Maestro mit voller Leistung, unabhängig vom Korridor.`,en:`Below the floor Maestro charges at full power, ignoring the corridor.`},fast_charge_floor_soc:{de:`SoC, unter dem die Schnellladung greift.`,en:`SoC below which fast charging applies.`},forward_looking_enabled:{de:`Plant die Ladung aus dem erwarteten Verbrauch der nächsten Stunden.`,en:`Plans charging from the expected consumption of the next hours.`},forward_looking_max_soc:{de:`Obergrenze für die vorausschauende Ladung.`,en:`Cap for look-ahead charging.`},pv_forecast_enabled:{de:`Verschiebt die Ladung, wenn die PV-Prognose den Bedarf deckt.`,en:`Delays charging when the PV forecast covers the need.`},delay_min_soc:{de:`Unter diesem SoC verzögert weder die Prognose noch das Warten auf die Sonne die Ladung.`,en:`Below this SoC neither the forecast nor waiting for the sun delays charging.`},pv_forecast_threshold_kwh:{de:`Ab dieser prognostizierten Energiemenge gilt der Tag als ergiebig genug.`,en:`From this forecast energy the day counts as productive enough.`},pv_forecast_safety_factor:{de:`Die Prognose wird um diesen Faktor vorsichtiger gerechnet.`,en:`The forecast is treated this much more cautiously.`},astro_enabled:{de:`Richtet Ladestart und Ladeende an Sonnenauf- und Untergang aus.`,en:`Aligns charge start and end with sunrise and sunset.`},charge_start_sunrise_offset_h:{de:`Stunden nach Sonnenaufgang, ab denen geladen werden darf.`,en:`Hours after sunrise before charging may start.`},charge_end_sunset_offset_h:{de:`Stunden vor Sonnenuntergang, zu denen das Ladeende liegen soll.`,en:`Hours before sunset when charging should finish.`},morning_cap_enabled:{de:`Hält den SoC am Morgen unter einer Grenze, damit PV-Ertrag noch hineinpasst.`,en:`Keeps the morning SoC under a limit so PV yield still fits.`},morning_cap_soc:{de:`SoC, den der Morning-Cap am Morgen nicht überschreitet.`,en:`SoC the morning cap will not exceed.`},morning_cap_until_h:{de:`Lokale Stunde, bis zu der der Morning-Cap gilt.`,en:`Local hour until which the morning cap applies.`},gentle_charge_enabled:{de:`Lädt mit einem Bruchteil der möglichen Leistung, schonender für den Akku.`,en:`Charges at a fraction of the possible power, easier on the battery.`},gentle_charge_factor:{de:`Anteil der Ladeleistung im Schonmodus. 0,5 ist die Hälfte.`,en:`Share of charge power in gentle mode. 0.5 is half.`},spreading_enabled:{de:`Verteilt die Ladung über das Fenster, statt in einem Rutsch voll zu laden.`,en:`Spreads charging across the window instead of one full burst.`},spreading_target_soc:{de:`SoC, auf den die verteilte Ladung hinsteuert.`,en:`SoC the spread charging aims for.`},low_yield_priority_enabled:{de:`An ertragsarmen Tagen wird der Akku früher und höher geladen.`,en:`On low-yield days the battery is charged earlier and higher.`},low_yield_threshold:{de:`Unter diesem Anteil der Referenz gilt der Tag als ertragsarm.`,en:`Below this share of the reference the day counts as low yield.`},low_yield_reference_kwh:{de:`Feste Tagesreferenz in kWh. 0 übernimmt den automatischen Wert.`,en:`Fixed daily reference in kWh. 0 uses the automatic value.`},low_yield_reference_kwh_per_kwp:{de:`Erwartete kWh pro installiertem kWp für die automatische Referenz.`,en:`Expected kWh per installed kWp for the automatic reference.`},curtailment_guard_enabled:{de:`Lädt den Akku, sobald die Einspeisung an der Abregelgrenze kratzt.`,en:`Charges the battery once export nears the curtailment limit.`},curtailment_activation_w:{de:`Einspeiseleistung, ab der der Abregelschutz die Ladung startet.`,en:`Export power at which curtailment protection starts charging.`},curtailment_release_w:{de:`Unter dieser Einspeisung lässt der Abregelschutz wieder los.`,en:`Below this export, curtailment protection lets go again.`},two_tier_enabled:{de:`Lädt erst auf ein frühes Ziel und hebt es später am Tag an.`,en:`Charges to an early target first and raises it later in the day.`},charge_target_late:{de:`Höheres SoC-Ziel für den späteren Teil des Tages.`,en:`Higher SoC target for the later part of the day.`},late_charge_end_h:{de:`Stunde, ab der das spätere Ziel gilt.`,en:`Hour from which the later target applies.`},lower_corridor_pause_enabled:{de:`Pausiert die Mindestladung, solange der SoC im unteren Korridor liegt.`,en:`Pauses minimum charging while the SoC sits in the lower corridor.`},tariff_mode:{de:`Dein echter Vertrag. Fest: Kosten und PV-Ersparnis mit dem Bezugspreis; ein dynamischer Preis-Sensor erscheint daneben als Simulation. Dynamisch: Kosten und Ersparnis mit dem Preis-Sensor.`,en:`Your real contract. Fixed: cost and PV savings use the buy price; a dynamic price sensor shows beside them as a simulation. Dynamic: cost and savings use the price sensor.`},dynamic_tariff_enabled:{de:`Schaltet die Auswertung des dynamischen Preises für Regelung und Simulation ein.`,en:`Turns evaluation of the dynamic price on for control and simulation.`},fixed_buy_price:{de:`Echter Bezugspreis bei festem Tarif, in Euro pro kWh. Daraus werden die Hauptzahlen für Kosten und Ersparnis gerechnet.`,en:`Real buy price on a fixed tariff, in euros per kWh. Main cost and savings figures use this.`},feed_in_price:{de:`Vergütung pro eingespeister kWh. Der Preisplan rechnet sie gegen den Bezug.`,en:`Payment per exported kWh. The price plan weighs it against buying.`},battery_capex_eur:{de:`Anschaffungskosten des Akkus. Daraus rechnet der Preisplan den Verschleiß pro kWh.`,en:`Battery purchase cost. The price plan turns it into wear per kWh.`},battery_total_cycles:{de:`Erwartete Lebensdauer in Zyklen. Mehr Zyklen bedeuten weniger Verschleiß pro kWh.`,en:`Expected lifetime in cycles. More cycles mean less wear per kWh.`},cheap_threshold:{de:`Bis zu diesem Preis pro kWh gilt der Strom als günstig.`,en:`Up to this price per kWh the electricity counts as cheap.`},max_grid_charge_kwh:{de:`Sicherheitsgrenze: Nach so vielen kWh aus dem Netz an einem Tag stoppt die Netzladung. Die Menge selbst bestimmen Ziel und Prognose. 0 = keine Grenze.`,en:`Safety cap: grid charging stops after this many kWh from the grid in one day. Target and forecast decide the amount. 0 = no cap.`},low_slot_grid_charge_enabled:{de:`Lädt im günstigen Zeitfenster aktiv aus dem Netz, nicht nur per Preisplan.`,en:`Actively charges from the grid in the cheap window, not only via the price plan.`},low_slot_target_soc:{de:`SoC, bis zu dem im günstigen Fenster aus dem Netz geladen wird.`,en:`SoC up to which the cheap window charges from the grid.`},low_slot_forecast_based:{de:`Lädt so viel, wie der Akku bis zum nächsten günstigen Fenster braucht (Verbrauchs- und PV-Prognose, plus Reserve). Das Ziel ist dann nur die Obergrenze.`,en:`Charges what the battery needs until the next cheap window (consumption and PV forecast, plus reserve). The target is then only a cap.`},low_slot_hold_discharge:{de:`Sperrt die Entladung, sobald das Ziel im günstigen Fenster erreicht ist.`,en:`Blocks discharge once the cheap-window target is reached.`},price_plan_enabled:{de:`Berechnet den Plan und zeigt ihn. Der Akku wird davon noch nicht gesteuert.`,en:`Calculates the plan and shows it. It does not control the battery yet.`},price_plan_active:{de:`Setzt den Plan um: Netzladung in günstigen Slots und Halten der Entladung.`,en:`Executes the plan: grid charging in cheap slots and holding discharge.`},price_plan_max_soc:{de:`Der Plan lädt aus dem Netz höchstens bis zu diesem SoC.`,en:`The plan charges from the grid only up to this SoC.`},price_plan_min_spread:{de:`Mindestabstand zwischen günstigem und teurem Preis, damit sich Netzladung lohnt.`,en:`Minimum gap between cheap and expensive price for grid charging to pay off.`},price_plan_efficiency:{de:`Wirkungsgrad des Umwegs über den Akku. 0,9 heißt: 10 Prozent gehen verloren.`,en:`Round-trip efficiency. 0.9 means 10 percent is lost.`},price_plan_safety_factor:{de:`Maestro rechnet den Verbrauch um diesen Faktor höher, damit der Akku nicht leerläuft. Gilt für den Preisplan (Experte) und für die prognosebasierte Netzladung in Zeitfenstern und unter Preisschwelle.`,en:`Maestro assumes consumption this much higher so the battery does not run empty. Applies to the price plan (expert) and to forecast-based grid charging in time windows and below the price threshold.`},ht_enabled:{de:`Schützt den SoC im Hochtarif-Fenster vor Entladung.`,en:`Protects the SoC from discharge during the high-tariff window.`},ht_sat:{de:`Der Hochtarif-Schutz gilt auch am Samstag.`,en:`High-tariff protection also applies on Saturday.`},ht_sun:{de:`Der Hochtarif-Schutz gilt auch am Sonntag.`,en:`High-tariff protection also applies on Sunday.`},ht_on:{de:`Stunde, ab der das Hochtarif-Fenster gilt.`,en:`Hour when the high-tariff window starts.`},ht_off:{de:`Stunde, ab der das Hochtarif-Fenster endet.`,en:`Hour when the high-tariff window ends.`},ht_min:{de:`SoC, der im Hochtarif im Winter nicht unterschritten wird.`,en:`SoC that winter high-tariff hours will not go below.`},ht_sockel:{de:`SoC-Sockel zur Tag-und-Nacht-Gleiche, zwischen Winter- und Sommerwert.`,en:`SoC floor at the equinox, between the winter and summer values.`},seasonal_reserve_enabled:{de:`Die Notstromreserve folgt der Jahreszeit, höher im Winter, niedriger im Sommer.`,en:`The backup reserve follows the season, higher in winter, lower in summer.`},reserve_winter_percent:{de:`Notstromreserve zur Wintersonnenwende.`,en:`Backup reserve at the winter solstice.`},reserve_equinox_percent:{de:`Notstromreserve zur Tag-und-Nacht-Gleiche.`,en:`Backup reserve at the equinox.`},fixed_reserve_enabled:{de:`Ersetzt die saisonale Reserve durch einen festen SoC und lädt darunter aus dem Netz.`,en:`Replaces the seasonal reserve with a fixed SoC and charges from the grid below it.`},fixed_reserve_soc:{de:`Fester SoC der Notstromreserve. Darunter ist die Entladung gesperrt.`,en:`Fixed backup SoC. Discharge is blocked below it.`},adaptive_reserve_enabled:{de:`Hebt die Reserve anhand des Verbrauchs der letzten Tage an.`,en:`Raises the reserve from the consumption of recent days.`},evcc_enabled:{de:`Begrenzt die Entladung, während EVCC das Auto im Now-Modus lädt.`,en:`Limits discharge while EVCC charges the car in now mode.`},evcc_discharge_limit_w:{de:`Höchste Entladung in Watt, solange EVCC im Now-Modus lädt.`,en:`Highest discharge in watts while EVCC charges in now mode.`},wallbox_enabled:{de:`Maestro steuert den Ladestrom der Wallbox nach Überschuss.`,en:`Maestro controls the wallbox current from surplus.`},wallbox_type:{de:`Welche Wallbox Maestro anspricht. Die Leistungswerte hängen davon ab.`,en:`Which wallbox Maestro talks to. The power figures depend on it.`},wallbox_min_current:{de:`Niedrigster Ladestrom. Darunter schaltet Maestro die Wallbox aus.`,en:`Lowest charge current. Below it Maestro switches the wallbox off.`},wallbox_max_current:{de:`Höchster Ladestrom, den Maestro der Wallbox gibt.`,en:`Highest charge current Maestro gives the wallbox.`},wallbox_min_surplus:{de:`Überschuss, ab dem die Wallbox laden darf.`,en:`Surplus from which the wallbox may charge.`},wallbox_discharge_guard_enabled:{de:`Stoppt die Wallbox, wenn der Akku dafür zu stark entladen würde.`,en:`Stops the wallbox when it would discharge the battery too hard.`},wallbox_discharge_guard_threshold_w:{de:`Ab dieser Akku-Entladung greift der Netzschutz der Wallbox.`,en:`Wallbox grid protection starts at this battery discharge.`},hp_enabled:{de:`Gibt die Wärmepumpe nur bei Überschuss und passendem Preis frei.`,en:`Releases the heat pump only with surplus and a suitable price.`},hp_min_surplus:{de:`Überschuss, ab dem die Wärmepumpe laufen darf.`,en:`Surplus from which the heat pump may run.`},hp_max_price:{de:`Über diesem Strompreis bleibt die Wärmepumpe aus.`,en:`Above this electricity price the heat pump stays off.`},hp_min_run_minutes:{de:`Mindestlaufzeit, damit die Wärmepumpe nicht taktet.`,en:`Minimum runtime so the heat pump does not short-cycle.`},hp_min_pause_minutes:{de:`Mindestpause zwischen zwei Läufen der Wärmepumpe.`,en:`Minimum pause between two heat-pump runs.`},morning_discharge_mode:{de:`Wie der Akku vor dem PV-Tag geleert wird: aus, fest oder nach Preis.`,en:`How the battery is emptied before the PV day: off, fixed, or by price.`},morning_unload_soc:{de:`SoC, auf den die Vorentladung am Morgen hinuntergeht.`,en:`SoC the morning pre-discharge goes down to.`},morning_unload_start_soc:{de:`Erst oberhalb dieses SoC startet die Vorentladung.`,en:`Pre-discharge starts only above this SoC.`},pre_discharge_offset_h:{de:`Stunden vor dem Ladestart, ab denen vorentladen wird.`,en:`Hours before charge start when pre-discharge may begin.`},pre_discharge_max_power_w:{de:`Höchste Leistung der Vorentladung.`,en:`Highest power of the pre-discharge.`},pre_discharge_tibber_auto:{de:`Entlädt morgens nur, wenn der Strompreis unter der Tibber-Schwelle liegt.`,en:`Discharges in the morning only when the price is under the Tibber threshold.`},morning_grid_export_threshold:{de:`Unter diesem Preis darf die Vorentladung ins Netz gehen.`,en:`Below this price the pre-discharge may export to the grid.`},regelung_aktiv:{de:`Hauptschalter. Aus heißt: Maestro sendet keine Limits mehr. Beim Ausschalten wählst du 1, 3, 6, 12 oder 24 Stunden oder dauerhaft. Die Stellung und die restliche Zeit bleiben nach einem Neustart.`,en:`Master switch. Off means Maestro stops sending limits. Turning it off offers 1, 3, 6, 12 or 24 hours, or until turned on. The position and the time left survive a restart.`},auto_mode_enabled:{de:`Rechnet einmal täglich passende Regelparameter aus dem Verbrauchs- und PV-Verlauf aus. Braucht mindestens 7 Tage Daten.`,en:`Works out fitting control parameters once a day from consumption and PV history. Needs at least 7 days of data.`},auto_mode_objective:{de:`Worauf die Auto-Optimierung achtet: Eigenverbrauch, Kosten oder CO₂.`,en:`What the auto optimisation aims for: self-consumption, cost or CO₂.`},force_discharge:{de:`Entlädt den Akku mit der eingestellten Leistung, unabhängig vom Plan.`,en:`Discharges the battery at the set power, ignoring the plan.`},force_discharge_power_w:{de:`Leistung der erzwungenen Entladung in Watt.`,en:`Power of the forced discharge in watts.`},soc_hysteresis_percent:{de:`SoC-Änderung, die Maestro ignoriert, damit die Regelung nicht pendelt.`,en:`SoC change Maestro ignores so control does not hunt.`},charge_ramp_w_per_cycle:{de:`Wie schnell die Ladeleistung pro Takt ansteigen darf.`,en:`How fast charge power may rise per cycle.`},update_interval:{de:`Sekunden zwischen zwei Regel-Durchläufen. Standard 30 s, möglich 10–120 s.`,en:`Seconds between two control cycles. Default 30 s, range 10–120 s.`},watchdog_timeout:{de:`Nach diesen Sekunden ohne Kontakt hebt der Wechselrichter die Limits auf.`,en:`After these seconds without contact the inverter clears the limits.`},debug:{de:`Schreibt ausführliche Regelentscheidungen ins Log.`,en:`Writes detailed control decisions to the log.`},reset_stats:{de:`Setzt die Tageszähler zurück. Die Regelung selbst bleibt, wie sie ist.`,en:`Resets the daily counters. Control itself stays as it is.`},clear_limits:{de:`Hebt die gesetzten Lade- und Entladelimits am Wechselrichter sofort auf.`,en:`Clears the charge and discharge limits on the inverter immediately.`}},Yo=(e,t)=>{let n=Jo[t];if(n)return e.toLowerCase().startsWith(`de`)?n.de:n.en},Xo,Zo=new Set,Qo=class extends ke{constructor(...e){super(...e),this.text=``,this.label=`Hilfe`,this.open=!1,this.onOutside=e=>{e.composedPath().includes(this)||this.close()},this.onKey=e=>{e.key===`Escape`&&this.close()}}createRenderRoot(){return this}disconnectedCallback(){super.disconnectedCallback(),this.close()}toggle(e){if(e.preventDefault(),e.stopPropagation(),this.open)this.close();else{for(let e of Zo)e!==this&&e.close();this.open=!0,Zo.add(this),this.requestUpdate(),window.addEventListener(`pointerdown`,this.onOutside,!0),window.addEventListener(`keydown`,this.onKey)}}close(){window.removeEventListener(`pointerdown`,this.onOutside,!0),window.removeEventListener(`keydown`,this.onKey),Zo.delete(this),this.open&&(this.open=!1,this.requestUpdate())}updated(){let e=this.querySelector(`.tip`);if(!(e instanceof HTMLElement))return;let t=this.getRootNode(),n=t instanceof ShadowRoot?t.host.getBoundingClientRect():{left:0,right:window.innerWidth,width:window.innerWidth};e.style.width=`${Math.min(280,n.width-24)}px`,e.style.transform=`translateY(-50%)`;let r=e.getBoundingClientRect(),i=0;r.right>n.right-12&&(i=n.right-12-r.right),r.left+i<n.left+12&&(i=n.left+12-r.left),e.style.transform=`translate(${i}px, -50%)`}render(){return F`<button
        type="button"
        class="info"
        aria-label=${this.label}
        aria-expanded=${this.open}
        @click=${this.toggle}
      >i</button>
      ${this.open?F`<div class="tip" role="tooltip">${this.text}</div>`:L}`}};Xo=Qo,Xo.properties={text:{type:String},label:{type:String}},customElements.get(`maestro-setting-tip`)||customElements.define(`maestro-setting-tip`,Qo);var $o=(e,t,n,r,i)=>({id:e,title:t,hint:n,icon:r,sections:i,rows:i.flatMap(e=>e.rows)}),q=(e,t,n,r=!1)=>({title:e,hint:t,rows:n,...r?{fold:!0}:{}}),es=[$o(`plant`,`setPlant`,`setPlantHint`,`<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/>`,[q(`secPlantPower`,`secPlantPowerHint`,[`inverter_power`,`installed_kwp`,`max_charge_power`,`min_charge_power`,`feed_in_limit_percent`])]),$o(`safety`,`setSafety`,`setSafetyHint`,`<path d="M12 3 5 6v6c0 4.5 3 7 7 9 4-2 7-4.5 7-9V6z"/>`,[q(`secEmergency`,`secEmergencyHint`,[`charge_threshold`]),q(`secReserve`,`secReserveHint`,[`fixed_reserve_enabled`,`fixed_reserve_soc`,`seasonal_reserve_enabled`,`reserve_winter_percent`,`reserve_equinox_percent`,`adaptive_reserve_enabled`]),q(`secHard`,`secHardHint`,[`hard_soc_limit_enabled`,`hard_soc_limit`]),q(`secWatchdog`,`secWatchdogHint`,[`watchdog_timeout`])]),$o(`tariff`,`setTariff`,`setTariffHint`,`<path d="M12 3v18"/><path d="M16 7.5A3.2 3.2 0 0 0 12.8 5H10a2.8 2.8 0 0 0 0 5.6h4a2.8 2.8 0 0 1 0 5.6H9.5A3.2 3.2 0 0 1 7 13.5"/>`,[q(`secStrategy`,`secStrategyHint`,[`grid_charge_strategy`,`price_plan_active`]),q(`secLimits`,`secLimitsHint`,[`max_grid_charge_kwh`,`cheap_threshold`,`low_slot_target_soc`,`price_plan_max_soc`,`low_slot_forecast_based`,`price_plan_safety_factor`,`low_slot_hold_discharge`]),q(`secPlanTune`,`secPlanTuneHint`,[`price_plan_min_spread`,`price_plan_efficiency`]),q(`secHt`,`secHtHint`,[`ht_enabled`,`ht_on`,`ht_off`,`ht_min`,`ht_sockel`,`ht_sat`,`ht_sun`]),q(`secCosts`,`secCostsHint`,[`fixed_buy_price`,`feed_in_price`,`battery_capex_eur`,`battery_total_cycles`]),q(`secSwitches`,`secSwitchesHint`,[`tariff_mode`,`dynamic_tariff_enabled`,`low_slot_grid_charge_enabled`,`price_plan_enabled`])]),$o(`pv`,`setPv`,`setPvHint`,`<circle cx="12" cy="12" r="3.5"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>`,[q(`secCorridor`,`secCorridorHint`,[`charge_target`,`two_tier_enabled`,`charge_target_late`,`late_charge_end_h`]),q(`secWindows`,`secWindowsHint`,[`astro_enabled`,`charge_start_sunrise_offset_h`,`charge_end_sunset_offset_h`,`winter_minimum_hour`,`summer_charge_end`,`morning_cap_enabled`,`morning_cap_soc`,`morning_cap_until_h`]),q(`secShape`,`secShapeHint`,[`fast_charge_floor_enabled`,`fast_charge_floor_soc`,`spreading_enabled`,`spreading_target_soc`,`gentle_charge_enabled`,`gentle_charge_factor`,`advanced_corridor`,`lower_corridor`,`upper_corridor`,`lower_corridor_pause_enabled`],!0),q(`secYield`,`secYieldHint`,[`pv_forecast_enabled`,`delay_min_soc`,`pv_forecast_threshold_kwh`,`pv_forecast_safety_factor`,`forward_looking_enabled`,`forward_looking_max_soc`,`low_yield_priority_enabled`,`low_yield_threshold`,`low_yield_reference_kwh`,`low_yield_reference_kwh_per_kwp`,`curtailment_guard_enabled`,`curtailment_activation_w`,`curtailment_release_w`],!0)]),$o(`loads`,`setLoads`,`setLoadsHint`,`<path d="M9 7v4M15 7v4"/><path d="M8 11h8v2a4 4 0 0 1-8 0z"/><path d="M12 17v3"/>`,[q(`secWallbox`,`secWallboxHint`,[`wallbox_enabled`,`wallbox_type`,`wallbox_min_current`,`wallbox_max_current`,`wallbox_min_surplus`,`wallbox_discharge_guard_enabled`,`wallbox_discharge_guard_threshold_w`]),q(`secEvcc`,`secEvccHint`,[`evcc_enabled`,`evcc_discharge_limit_w`]),q(`secHp`,`secHpHint`,[`hp_enabled`,`hp_min_surplus`,`hp_max_price`,`hp_min_run_minutes`,`hp_min_pause_minutes`]),q(`secMorning`,`secMorningHint`,[`morning_discharge_mode`,`morning_unload_soc`,`morning_unload_start_soc`,`pre_discharge_offset_h`,`pre_discharge_max_power_w`,`pre_discharge_tibber_auto`,`morning_grid_export_threshold`])]),$o(`auto`,`setAuto`,`setAutoHint`,`<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="3"/>`,[q(`secAuto`,`secAutoHint`,[`auto_mode_enabled`,`auto_mode_objective`])]),$o(`system`,`setSystem`,`setSystemHint`,`<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>`,[q(`secRun`,`secRunHint`,[`regelung_aktiv`,`force_discharge`,`force_discharge_power_w`]),q(`secPace`,`secPaceHint`,[`soc_hysteresis_percent`,`charge_ramp_w_per_cycle`,`update_interval`]),q(`secDiag`,`secDiagHint`,[`debug`,`reset_stats`,`clear_limits`])])],ts={hardware:`plant`,corridor:`pv`,windows:`pv`,yield:`pv`,reserve:`safety`,flex:`loads`,control:`system`,diag:`system`},ns={reset_stats:`confirmReset`},rs={id:`classic`,title:`setClassic`,hint:`setClassicHint`,icon:`<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>`},is={id:`look`,title:`setLook`,hint:`setLookHint`,icon:`<circle cx="12" cy="12" r="4"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6"/>`},as={id:`setup`,title:`setSetup`,hint:`setSetupHint`,icon:`<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>`},os={id:`sizing`,title:`setSizing`,hint:`setSizingHint`,icon:`<path d="M4 19V5M4 19h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>`},ss=[`sizing_hypothetical_battery_kwh`,`sizing_hypothetical_pv_kwp`],cs=[`sizing_price_battery_kwh`,`sizing_price_pv_kwp`,`sizing_price_inverter`,`sizing_price_extra`],ls=e=>e===rs.id||e===is.id||e===os.id||e===as.id||es.some(t=>t.id===e);function us(e){if(!e)return;let t=ts[e]??e;return ls(t)?t:void 0}var ds=e=>e===rs.id?rs:e===is.id?is:e===os.id?os:e===as.id?as:es.find(t=>t.id===e),fs=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},ps=(e,t)=>{let n=e?.attributes.friendly_name;return typeof n==`string`&&n.trim()?n.trim():t},ms=e=>{let t=e?.attributes.unit_of_measurement;return typeof t==`string`?t:``},hs=(e,t)=>{let n=e?.attributes[t];return typeof n==`number`&&Number.isFinite(n)?n:void 0};function gs(e,t,n,r){let i=e.hass.states[t],a=H(i);return F`<button
    class="switch ${a?`on`:``}"
    role="switch"
    aria-checked=${a}
    aria-label=${n}
    ?disabled=${r||e.pending.has(t)}
    @click=${()=>e.onToggle(t)}
  ></button>`}function _s(e,t,n,r,i){let a=V(n),o=a===void 0?``:String(a),s=hs(n,`min`),c=hs(n,`max`),l=hs(n,`step`),u=ms(n),d=u===`%`;return(n?.attributes.mode===`slider`||d)&&s!==void 0&&c!==void 0?Xt({label:r,min:s,max:c,step:l??1,value:a??s,unit:u,disabled:i||e.pending.has(t),onCommit:n=>e.onNumber(t,n)}):F`<label class="setting-num">
    <input
      type="number"
      inputmode="decimal"
      aria-label=${r}
      min=${s??L}
      max=${c??L}
      step=${l??`any`}
      ?disabled=${i||e.pending.has(t)}
      ${zt(e=>{e instanceof HTMLInputElement&&!fs(e)&&e.value!==o&&(e.value=o)})}
      @change=${n=>{let r=Number.parseFloat(n.target.value);Number.isFinite(r)&&e.onNumber(t,r)}}
    />
    ${u?F`<span>${u}</span>`:L}
  </label>`}function vs(e,t,n,r){let i=Array.isArray(n?.attributes.options)?n.attributes.options:[];return F`<select
    .value=${n?.state??``}
    aria-label=${ps(n,t)}
    ?disabled=${r||!i.length||e.pending.has(t)}
    @change=${n=>e.onSelect(t,n.target.value)}
  >
    ${i.map(t=>F`<option value=${t} ?selected=${t===n?.state}>${e.i18n.option(t)}</option>`)}
  </select>`}function ys(e,t,n=!1,r=!1){let i=Je[t];if(!i)return L;let a=e.hass.states[i],o=Qe(t);if(!a&&!o)return L;let s=o||!a||a.state===`unavailable`,c=s||n,l=ps(a,t),u=i.split(`.`,1)[0],d=u===`switch`?gs(e,i,l,c):u===`number`?_s(e,i,a,l,c):u===`select`?vs(e,i,a,c):u===`button`?F`<button
                class="btn"
                ?disabled=${c||e.pending.has(i)}
                @click=${()=>{let n=ns[t];(!n||window.confirm(e.i18n.t(n)))&&e.onPress(i)}}
              >${l}</button>`:L,f=Yo(e.hass.language,t),p=t===`regelung_aktiv`?Ut(e.i18n.t,a):void 0;return F`<div class="${r?`setting-line`:`ctrl setting-row`} ${r&&u===`number`?`stack`:``} ${s||n&&!r?`locked`:``}">
    <div class="txt">
      <span class="name"><b>${l}</b>${f?F`<maestro-setting-tip .text=${f} .label=${e.i18n.t(`settingHelp`)}></maestro-setting-tip>`:L}</span>
      ${p?F`<span>${p}</span>`:L}
      ${o?F`<span>${e.i18n.t(`entityDisabled`)}</span>`:L}
    </div>
    ${d}
  </div>`}var bs=(e,t)=>t.rows.some(t=>{let n=Je[t];return!!n&&(!!e.hass.states[n]||Qe(t))}),xs=(e,t,n,r,i)=>F`<button type="button" class="settings-tile" @click=${()=>e.onOpenGroup(t)}>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${n}></svg>
  <b>${e.i18n.t(r)}</b>
  <span>${e.i18n.t(i)}</span>
</button>`;function Ss(e,t,n){let{t:r}=e.i18n,i=r(n===void 0?`classicDepVia`:n?`classicInstalled`:`classicMissing`);return F`<div class="dep"><b>${r(t)}</b><span class=${n===void 0?``:n?`ok`:`bad`}>${i}</span></div>`}function Cs(e){let{t}=e.i18n,n=e.classic,r=n?.state??`checking`,i=F`<button type="button" class="btn primary" @click=${()=>e.onOpenClassic()}>${t(`classicOpen`)}</button>`;if(r===`checking`)return F`<p>${t(`classicChecking`)}</p>`;if(r===`ours`)return F`<p class="ok">${t(`classicReady`)}</p>${i}`;if(r===`foreign`)return F`<p class="bad">${t(`classicForeign`)}</p>`;if(r===`error`)return F`<p class="bad">${t(`classicFailed`,{err:n?.error??``})}</p>
      <button type="button" class="btn" @click=${()=>e.onCheckClassic()}>${t(`classicRetry`)}</button>`;if(!e.isAdmin)return F`<p>${t(`classicAdminOnly`)}</p>`;let a=r===`creating`;return F`${r===`empty`?F`<p>${t(`classicEmpty`)}</p>`:L}
    <button type="button" class="btn primary" ?disabled=${a} @click=${()=>e.onCreateClassic()}>
      ${t(a?`classicCreating`:r===`empty`?`classicSetup`:`classicCreate`)}
    </button>`}function ws(e){let{t}=e.i18n,n=[`classicStep1`,`classicStep2`,`classicStep3`,`classicStep4`,`classicStep5`],r=e.classic?.mushroom===!1||e.classic?.apex===!1;return F`<div class="guide">
    <p>${t(`classicLead`)}</p>
    <h3>${t(`classicDepsTitle`)}</h3>
    ${Ss(e,`classicDepMushroom`,e.classic?.mushroom)}
    ${Ss(e,`classicDepApex`,e.classic?.apex)}
    ${r?F`<p class="bad">${t(`classicDepsMissing`)}</p>`:L}
    <h3>${t(`classicActionTitle`)}</h3>
    <div class="classic-action">${Cs(e)}</div>
    <p>${t(`classicAfter`)}</p>
    <details>
      <summary>${t(`classicManual`)}</summary>
      <ol>${n.map(e=>F`<li>${t(e)}</li>`)}</ol>
      <p>${t(`classicHa`)}</p>
      <p>${t(`classicPath`)}</p>
      <p>${t(`classicTimeout`)}</p>
    </details>
  </div>`}var Ts=[`off`,`slots`,`threshold`,`dynamic_auto`,`dynamic_expert`],Es=e=>{let t=Je.grid_charge_strategy,n=t?e.states[t]?.state:void 0;return Ts.find(e=>e===n)},Ds=e=>e===`dynamic_auto`||e===`dynamic_expert`,Os=e=>e===`slots`||e===`threshold`,ks={price_plan_active:e=>Ds(e.strategy),max_grid_charge_kwh:e=>e.strategy!==`off`,cheap_threshold:e=>e.strategy===`threshold`,low_slot_target_soc:e=>Os(e.strategy),price_plan_max_soc:e=>Ds(e.strategy),low_slot_forecast_based:e=>Os(e.strategy)&&e.expert,low_slot_hold_discharge:e=>Os(e.strategy)&&e.expert,price_plan_min_spread:e=>e.strategy===`dynamic_expert`,price_plan_efficiency:e=>e.strategy===`dynamic_expert`,price_plan_safety_factor:e=>e.strategy===`dynamic_expert`||Os(e.strategy)&&e.expert,tariff_mode:e=>e.expert,dynamic_tariff_enabled:e=>e.expert,low_slot_grid_charge_enabled:e=>e.expert,price_plan_enabled:e=>e.expert};function As(e,t){if(!t.strategy)return!0;let n=ks[e];return!n||n({strategy:t.strategy,expert:t.expert})}var js={charge_start_sunrise_offset_h:e=>e.astro!==!1,charge_end_sunset_offset_h:e=>e.astro!==!1,winter_minimum_hour:e=>e.astro!==!0,summer_charge_end:e=>e.astro!==!0,pv_forecast_threshold_kwh:e=>e.expert,pv_forecast_safety_factor:e=>e.expert,low_yield_threshold:e=>e.expert,low_yield_reference_kwh:e=>e.expert,low_yield_reference_kwh_per_kwp:e=>e.expert};function Ms(e,t){let n=js[e];return!n||n(t)}var Ns={charge_target_late:[`two_tier_enabled`],late_charge_end_h:[`two_tier_enabled`],morning_cap_soc:[`morning_cap_enabled`],morning_cap_until_h:[`morning_cap_enabled`],fast_charge_floor_soc:[`fast_charge_floor_enabled`],spreading_target_soc:[`spreading_enabled`],gentle_charge_factor:[`gentle_charge_enabled`],upper_corridor:[`advanced_corridor`],lower_corridor:[`advanced_corridor`,`lower_corridor_pause_enabled`],delay_min_soc:[`pv_forecast_enabled`,`astro_enabled`],pv_forecast_threshold_kwh:[`pv_forecast_enabled`],pv_forecast_safety_factor:[`pv_forecast_enabled`],forward_looking_max_soc:[`forward_looking_enabled`],low_yield_threshold:[`low_yield_priority_enabled`],low_yield_reference_kwh:[`low_yield_priority_enabled`],low_yield_reference_kwh_per_kwp:[`low_yield_priority_enabled`],curtailment_activation_w:[`curtailment_guard_enabled`],curtailment_release_w:[`curtailment_guard_enabled`]};function Ps(e,t){let n=Ns[e];if(!n)return!1;let r=n.map(t);return!r.some(e=>e===void 0)&&r.every(e=>!e)}var Fs={fixed_reserve_enabled:[`fixed_reserve_soc`],seasonal_reserve_enabled:[`reserve_winter_percent`,`reserve_equinox_percent`],hard_soc_limit_enabled:[`hard_soc_limit`],ht_enabled:[`ht_on`,`ht_off`,`ht_min`,`ht_sockel`,`ht_sat`,`ht_sun`],two_tier_enabled:[`charge_target_late`,`late_charge_end_h`],astro_enabled:[`charge_start_sunrise_offset_h`,`charge_end_sunset_offset_h`],morning_cap_enabled:[`morning_cap_soc`,`morning_cap_until_h`],fast_charge_floor_enabled:[`fast_charge_floor_soc`],spreading_enabled:[`spreading_target_soc`],gentle_charge_enabled:[`gentle_charge_factor`],advanced_corridor:[`upper_corridor`],pv_forecast_enabled:[`delay_min_soc`,`pv_forecast_threshold_kwh`,`pv_forecast_safety_factor`],forward_looking_enabled:[`forward_looking_max_soc`],low_yield_priority_enabled:[`low_yield_threshold`,`low_yield_reference_kwh`,`low_yield_reference_kwh_per_kwp`],curtailment_guard_enabled:[`curtailment_activation_w`,`curtailment_release_w`],wallbox_enabled:[`wallbox_type`,`wallbox_min_current`,`wallbox_max_current`,`wallbox_min_surplus`],wallbox_discharge_guard_enabled:[`wallbox_discharge_guard_threshold_w`],evcc_enabled:[`evcc_discharge_limit_w`],hp_enabled:[`hp_min_surplus`,`hp_max_price`,`hp_min_run_minutes`,`hp_min_pause_minutes`],auto_mode_enabled:[`auto_mode_objective`],force_discharge:[`force_discharge_power_w`]};function Is(e){let t=new Set(e),n=new Set;for(let[e,r]of Object.entries(Fs))if(t.has(e))for(let e of r)t.has(e)&&n.add(e);return e.filter(e=>!n.has(e)).map(e=>({key:e,children:(Fs[e]??[]).filter(e=>t.has(e))}))}var Ls=(e,t)=>{let n=Je[t],r=n?e.states[n]?.state:void 0;if(r===`on`)return!0;if(r===`off`)return!1};function Rs(e,t,n=()=>!1){return Is(t).map(({key:t,children:r})=>{if(!r.length)return ys(e,t,n(t));let i=Ls(e.hass,t)===!1,a=e=>{let r=Ns[e];return r&&(r.length>1||r[0]!==t)?n(e):i||n(e)},o=r.every(a);return F`<div class="ctrl setting-bundle">
      ${ys(e,t,!1,!0)}
      <div class="bundle-fields ${o?`quiet`:``}">
        ${r.map(t=>ys(e,t,a(t),!0))}
      </div>
    </div>`})}var zs=(e,t)=>{let n=Je[t],r=n?V(e.states[n]):void 0;if(r===void 0)return`–`;let i=Math.round(r*60),a=Math.floor(i/60)%24,o=(i%60+60)%60;return`${String(a).padStart(2,`0`)}:${String(o).padStart(2,`0`)}`},Bs=(es.find(e=>e.id===`tariff`)?.sections??[]).filter(e=>[`secStrategy`,`secLimits`,`secPlanTune`,`secSwitches`].includes(e.title)),Vs=`e3dc-maestro.settings-expert`,Hs=`e3dc-maestro.plan-tune`;function Us(){try{return localStorage.getItem(Hs)===`1`}catch{return!1}}function Ws(e){try{localStorage.setItem(Hs,e?`1`:`0`)}catch{}}function Gs(){try{return localStorage.getItem(Vs)===`1`}catch{return!1}}function Ks(e){try{localStorage.setItem(Vs,e?`1`:`0`)}catch{}}var qs=`e3dc-maestro.pv-open`;function Js(){try{let e=localStorage.getItem(qs);if(!e)return new Set;let t=JSON.parse(e);return Array.isArray(t)?new Set(t.filter(e=>typeof e==`string`)):new Set}catch{return new Set}}function Ys(e){try{localStorage.setItem(qs,JSON.stringify([...e]))}catch{}}var Xs=(e,t,n=0)=>{let r=Je[t],i=r?V(e.states[r]):void 0;return i===void 0?`–`:i.toLocaleString(e.language,{maximumFractionDigits:n})};function Zs(e,t,n){let{t:r}=t,i=t=>Ls(e,t)===!0;if(n===`secCorridor`){let t=Xs(e,`charge_target`);return i(`two_tier_enabled`)?r(`sumTargetLate`,{soc:t,late:Xs(e,`charge_target_late`),hour:zs(e,`late_charge_end_h`)}):r(`sumTarget`,{soc:t})}if(n===`secWindows`){let t=Ls(e,`astro_enabled`)===!0?r(`sumWindowAstro`,{start:Xs(e,`charge_start_sunrise_offset_h`,1),end:Xs(e,`charge_end_sunset_offset_h`,1)}):r(`sumWindowHours`,{winter:zs(e,`winter_minimum_hour`),summer:zs(e,`summer_charge_end`)});return i(`morning_cap_enabled`)?`${t} ${r(`sumWindowCap`,{soc:Xs(e,`morning_cap_soc`),hour:zs(e,`morning_cap_until_h`)})}`:t}if(n===`secShape`){let t=[];return i(`fast_charge_floor_enabled`)&&t.push(r(`sumPowerFloor`,{soc:Xs(e,`fast_charge_floor_soc`)})),i(`spreading_enabled`)&&t.push(r(`sumPowerSpread`,{soc:Xs(e,`spreading_target_soc`)})),i(`gentle_charge_enabled`)&&t.push(r(`sumPowerGentle`,{factor:Xs(e,`gentle_charge_factor`,2)})),i(`advanced_corridor`)?t.push(r(`sumPowerCorridor`,{low:Xs(e,`lower_corridor`),high:Xs(e,`upper_corridor`)})):i(`lower_corridor_pause_enabled`)&&t.push(r(`sumPowerPause`,{low:Xs(e,`lower_corridor`)})),t.length?t.join(` `):r(`sumPowerAuto`)}let a=[];return i(`pv_forecast_enabled`)&&a.push(r(`sumPvForecast`)),i(`forward_looking_enabled`)&&a.push(r(`sumPvForward`,{soc:Xs(e,`forward_looking_max_soc`)})),i(`low_yield_priority_enabled`)&&a.push(r(`sumPvLow`)),i(`curtailment_guard_enabled`)&&a.push(r(`sumPvCurtail`)),a.length?a.join(` `):r(`sumPvNone`)}var Qs=F`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>`;function $s(e,t){let{t:n}=e.i18n,r={astro:Ls(e.hass,`astro_enabled`),expert:e.expert},i=t=>Ps(t,t=>Ls(e.hass,t));return F`${tc(e)}
    ${t.map(t=>{let a=t.rows.filter(e=>Ms(e,r)),o=F`<div class="strategy-summary"><p>${Zs(e.hass,e.i18n,t.title)}</p></div>`;if(!t.fold)return F`<section class="settings-section">
          <h3>${n(t.title)}</h3>
          <p class="sub">${n(t.hint)}</p>
          ${Rs(e,a,i)}
          ${o}
        </section>`;let s=e.pvOpen.has(t.title);return F`<section class="settings-section settings-fold">
        <button type="button" class="group-head ${s?`open`:``}" aria-expanded=${s} @click=${()=>e.onTogglePv(t.title)}>
          ${Qs}
          <span>${n(t.title)}</span>
        </button>
        ${o}
        ${s?F`<p class="sub">${n(t.hint)}</p>${Rs(e,a,i)}`:L}
      </section>`})}`}function ec(e,t){let{t:n}=e.i18n,r=Je.max_grid_charge_kwh,i=r?V(e.hass.states[r]):void 0,a=[];if(t===`off`&&a.push(n(`sumOff`)),t===`slots`&&(a.push(n(`sumSlots`,{soc:Xs(e.hass,`low_slot_target_soc`)})),e.lowSlots===0&&a.push(n(`sumSlotsNone`))),t===`threshold`&&a.push(n(`sumThreshold`,{price:Xs(e.hass,`cheap_threshold`,3),soc:Xs(e.hass,`low_slot_target_soc`)})),t!==`off`&&i!==void 0&&i>0&&a.push(n(`sumCap`,{kwh:Xs(e.hass,`max_grid_charge_kwh`,1)})),Ds(t)){a.push(n(`sumPlan`,{soc:Xs(e.hass,`price_plan_max_soc`)})),a.push(n(t===`dynamic_auto`?`sumAuto`:`sumExpert`));let r=Je.price_plan_active?H(e.hass.states[Je.price_plan_active]):!1;a.push(n(r?`sumActive`:`sumShadow`))}return(t===`threshold`||Ds(t))&&e.priceSensor===!1&&a.push(n(`sumNoPrice`)),F`<div class="strategy-summary">${a.map(e=>F`<p>${e}</p>`)}</div>`}function tc(e){let{t}=e.i18n;return F`<div class="ctrl setting-row">
    <div class="txt"><span class="name"><b>${t(`expertView`)}</b></span><span>${t(`expertViewHint`)}</span></div>
    <button
      class="switch ${e.expert?`on`:``}"
      role="switch"
      aria-checked=${e.expert}
      aria-label=${t(`expertView`)}
      @click=${()=>e.onExpert(!e.expert)}
    ></button>
  </div>`}function nc(e,t,n){let{t:r}=e.i18n,i=Es(e.hass),a={strategy:i,expert:e.expert};return t.flatMap(t=>{let o=t.rows.filter(e=>As(e,a)),s=t.title===`secStrategy`;return!o.length&&!s?[]:[F`<section class="settings-section">
        ${n?F`<h3>${r(t.title)}</h3><p class="sub">${r(t.hint)}</p>`:L}
        ${Rs(e,o)}
        ${s&&i?ec(e,i):L}
        ${s?tc(e):L}
      </section>`]})}function rc(e){let{t}=e.i18n,n=Es(e.hass),r=e.planTuneOpen;return F`<div class="card plan-tune">
    <button
      type="button"
      class="group-head ${r?`open`:``}"
      aria-expanded=${r}
      @click=${()=>e.onTogglePlanTune()}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
      <span>${t(`planTune`)}</span>
      ${r||!n?L:F`<b class="group-sum">${e.i18n.option(n)}</b>`}
    </button>
    ${r?F`<p class="hint">${t(`planTuneHint`)}</p>
        ${nc(e,Bs,!0)}`:L}
  </div>`}function ic(e){let{t}=e.i18n,n={dark:{title:`themeDark`,hint:`themeDarkHint`},classic:{title:`themeClassic`,hint:`themeClassicHint`},e3dc:{title:`themeE3dc`,hint:`themeE3dcHint`}},r={nodes:{title:`flowStyleNodes`,hint:`flowStyleNodesHint`},blob:{title:`flowStyleBlob`,hint:`flowStyleBlobHint`},city:{title:`flowStyleCity`,hint:`flowStyleCityHint`}},i=!e.alertBannerHidden;return F`<div class="theme-choices" role="radiogroup" aria-label=${t(`setLook`)}>
    ${wa.map(r=>F`<button
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
    ${Er.map(n=>F`<button
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
  </div>`}function ac(e){let{t}=e.i18n;if(e.groupId===as.id)return Ao(e);if(e.groupId===is.id)return ic(e);if(e.groupId===rs.id)return ws(e);if(e.groupId===os.id)return Ko(e.options,F`${ss.map(t=>ys(e,t))}`,F`${cs.map(t=>ys(e,t))}`);let n=es.find(t=>t.id===e.groupId);if(n?.id===`pv`)return F`<div class="settings-detail">
      ${$s(e,n.sections)}
      ${qo(e.options,n.id)}
    </div>`;if(n?.id===`tariff`)return F`<div class="settings-detail">
      ${nc({...e,lowSlots:e.options.ready?e.options.slots.filter(e=>e.class_===`low`).length:void 0,priceSensor:e.options.ready?!!e.options.options.price_sensor:void 0},n.sections,!0)}
      ${qo(e.options,n.id)}
    </div>`;if(n)return F`<div class="settings-detail">
      ${n.sections.map(r=>F`<section class="settings-section">
          ${n.sections.length>1?F`<h3>${t(r.title)}</h3><p class="sub">${t(r.hint)}</p>`:L}
          ${Rs(e,r.rows)}
        </section>`)}
      ${qo(e.options,n.id)}
    </div>`;let r=Object.keys(Je).length>0,i=e.hass.states[z.phase]?.state;return F`${So(e.i18n,i,H(e.hass.states[z.ctrlPlanControls]),H(e.hass.states[z.lowYield]),e.onOpenGroup)}
    <div class="settings-tiles">
    ${xs(e,as.id,as.icon,as.title,as.hint)}
    ${xs(e,is.id,is.icon,is.title,is.hint)}
    ${xs(e,os.id,os.icon,`setSizingTile`,`setSizingTileHint`)}
    ${xs(e,rs.id,rs.icon,rs.title,rs.hint)}
    ${r?es.map(t=>bs(e,t)?xs(e,t.id,t.icon,t.title,t.hint):L):F`<p class="hint">${t(`settingsPending`)}</p>`}
  </div>`}function oc(e){return e===void 0||Math.abs(e)<.25?`idle`:e<0?`discharge`:`charge`}function sc(e,t=30){return e===void 0||Math.abs(e)<t?`idle`:e<0?`discharge`:`charge`}var cc=e=>Math.max(0,Math.min(100,e));function lc(e,t,n,r){let i=r?.mini?`mini`:r?.live?`live`:``,a=r?.reserve!==void 0&&Number.isFinite(r.reserve)?cc(r.reserve):void 0,o=t===void 0?void 0:cc(t),s=L;if(o!==void 0){if(a!==void 0&&a>0){let e=Math.min(o,a),t=Math.max(0,o-a);s=F`${t>.05?F`<div class="batt-fill" style="height:${t}%; bottom:${e}%"></div>`:L}
        ${e>.05?F`<div class="batt-fill batt-fill-reserve" style="height:${e}%"></div>`:L}`}else s=F`<div class="batt-fill" style="height:${o}%"></div>`}return F`<div class="batt ${n} ${i}" role="img" aria-label=${e}>
    <div class="batt-nub"></div>
    <div class="batt-body">
      ${a!==void 0&&a>0?F`<div class="batt-reserve-zone" style="height:${a}%" aria-hidden="true"></div>`:L}
      ${s}
      <div class="batt-cells" aria-hidden="true"></div>
    </div>
  </div>`}var uc=e=>!e||e===`unknown`||e===`unavailable`;function dc(e,t){if(!e||uc(e.state))return`–`;let n=Number.parseFloat(e.state);if(!Number.isFinite(n))return e.state;let r=typeof e.attributes.unit_of_measurement==`string`?e.attributes.unit_of_measurement:``;if(r===`%`)return`${t.n(Math.abs(n)<.05?0:n,0)} %`;if(r===`W`)return(n<0?`−`:``)+t.w(n);let i=+(r===`kW`||r===`kWh`||r===`A`||r===`V`||r===`°C`);return r?`${t.n(n,i)} ${r}`:t.n(n,0)}function fc(e){if(!e||uc(e.state))return;let t=Number.parseFloat(e.state);if(Number.isFinite(t))return(typeof e.attributes.unit_of_measurement==`string`?e.attributes.unit_of_measurement:``)===`%`&&Math.abs(t)<.05?0:t}function pc(e){let t=fc(e);if(t!==void 0)return(typeof e?.attributes.unit_of_measurement==`string`?e.attributes.unit_of_measurement:``)===`W`?t/1e3:t}var mc=864e5;function hc(e,t=Date.now()){let n=e?.attributes.items;if(!Array.isArray(n)||n.length===0)return;let r=n[0];if(!r||typeof r!=`object`)return;let i=r.time;if(typeof i!=`number`||t-i>mc)return;let a=e?.attributes.latest_message;return typeof a==`string`&&a.trim()?a.trim():void 0}function gc(e){return e===void 0||!Number.isFinite(e)?`idle`:e>=90?`soh-good`:e>=70?`soh-mid`:`soh-low`}function _c(e,t,n){if(!(e===void 0||!Number.isFinite(e)||e<0)&&!(t===void 0||!(t>0)||n<1))return Math.min(100,e/(t/n)*100)}var vc={0:`plantMode0`,1:`plantMode1`,2:`plantMode2`,3:`plantMode3`,4:`plantMode4`};function yc(e,t){if(!e||e===`unknown`||e===`unavailable`)return`–`;let n=vc[e];return n?t(n):e}var bc=(e,t)=>!e||uc(e.state)?`–`:e.state===`on`?t(`plantOn`):e.state===`off`?t(`plantOff`):e.state,xc=46,Sc=2*Math.PI*xc,Cc=e=>e.length?F`<div class="card"><div class="rows">${e.map(e=>F`<div class="row"><span>${e.label}</span><b>${e.value}</b></div>`)}</div></div>`:L,wc=[`grid`,`battery`,`pv`,`wallbox`,`controls`],Tc={grid:{title:`plantRoomGrid`,hint:`plantRoomGridHint`,icon:`<path d="M4 8h16M4 16h16"/><path d="M8 4v16M16 4v16"/>`},battery:{title:`plantRoomBattery`,hint:`plantRoomBatteryHint`,icon:`<rect x="7" y="6" width="10" height="15" rx="2"/><path d="M10 4h4"/>`},pv:{title:`plantRoomPv`,hint:`plantRoomPvHint`,icon:`<circle cx="12" cy="12" r="4"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21"/>`},wallbox:{title:`plantRoomWallbox`,hint:`plantRoomWallboxHint`,icon:`<path d="M7 17V7a2 2 0 0 1 2-2h4l2 3h2a2 2 0 0 1 2 2v7"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>`},controls:{title:`plantRoomControls`,hint:`plantRoomControlsHint`,icon:`<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>`}},Ec=e=>!!e&&wc.includes(e),Dc=e=>Ec(e)?Tc[e]:void 0,J=(e,t)=>t?e.hass.states[t]:void 0,Oc=(e,t)=>dc(J(e,B.entities[t]),e.fmt),Y=e=>e in B.entities,kc=(e,t,n,r)=>F`<div class="gauge ${r}">
    <div class="gauge-face">
      <svg viewBox="0 0 120 120" role="img" aria-label="${e}: ${t}">
        <circle class="gauge-track" cx="60" cy="60" r="${xc}"></circle>
        <circle class="gauge-arc" cx="60" cy="60" r="${xc}" stroke-dasharray="${(n===void 0?0:Math.max(0,Math.min(100,n)))/100*Sc} ${Sc}"></circle>
      </svg>
      <b>${t}</b>
    </div>
    <span>${e}</span>
  </div>`,Ac=oc,jc=(e,t,n,r=!1)=>lc(e,t,n,{mini:r}),Mc=e=>e.length?F`<div class="card budget">${e.map(e=>F`<div class="budget-row">
          <span>${e.label}</span>
          <div class="track"><i class="${e.cls}" style="width:${Math.max(0,Math.min(100,e.pct))}%"></i></div>
          <b>${e.value}</b>
        </div>`)}</div>`:L;function Nc(e){let{t}=e.i18n;if(!(Object.keys(B.entities).length>0||B.packs.length>0||B.wallboxes.length>0))return F`<p class="empty">${t(`plantEmpty`)}</p>`;let n=[Y(`powerValue`)?{label:t(`plantPower`),value:Oc(e,`powerValue`)}:null,Y(`manualEnergy`)?{label:t(`plantManualEnergy`),value:Oc(e,`manualEnergy`)}:null].filter(e=>e!==null),r=[{key:`limitCharge`,label:t(`plantLimitCharge`),cls:`bat`},{key:`limitDischarge`,label:t(`plantLimitDischarge`),cls:`warn`},{key:`limitDischargeMin`,label:t(`plantLimitMin`),cls:`muted`}].map(t=>({...t,kw:Y(t.key)?pc(J(e,B.entities[t.key])):void 0})),i=Math.max(0,...r.map(e=>Math.abs(e.kw??0))),a=Mc(r.filter(e=>e.kw!==void 0).map(t=>({label:t.label,value:Oc(e,t.key),pct:i>0?Math.abs(t.kw)/i*100:0,cls:t.cls}))),o=[{key:`limitsOn`,label:`plantLimits`},{key:`manualCharge`,label:`plantManual`},{key:`pvDerated`,label:`plantDerated`,warn:!0},{key:`emergencyPower`,label:`plantEmergency`,warn:!0},{key:`emergencyReserve`,label:`plantReserveHit`},{key:`rescueBattery`,label:`plantReserveOn`},{key:`weather`,label:`plantWeather`},{key:`weatherWait`,label:`plantWeatherWait`}].filter(e=>Y(e.key)),s=t=>Y(t)?pc(J(e,B.entities[t])):void 0,c=n=>{let r=n.map(e=>B.entities[e]).filter(e=>!!e);if(!r.length)return L;let i=n.flatMap((t,n)=>{let r=B.entities[t],i=r?e.phasePoints?.[r]:void 0;return i?.length?[{name:`L${n+1}`,points:i}]:[]}),a=e.phaseHistory??`idle`;if(!i.length&&a===`error`)return F`<p class="err">${t(`historyFailed`)}</p>`;if(!i.length&&a!==`ready`)return F`<p class="hint">${t(`loading`)}</p>`;if(!i.length)return F`<p class="hint">${t(`historyEmpty`)}</p>`;let o=i.map(e=>e.points[e.points.length-1]?.[0]??0).join(`,`),s=[`var(--accent)`,`var(--house)`,`var(--pv)`];return F`<div class="phase-legend">
        ${i.map((e,t)=>F`<span style="--swatch:${s[t]??s[0]}"><i></i>${e.name}</span>`)}
      </div>
      <maestro-chart
        class="phase-chart"
        .options=${Ji(`phase-${r.join(`,`)}`,[e.theme,e.fmt.loc,o],()=>_r(i,e.fmt))}
      ></maestro-chart>`},l=(n,r,i)=>{if(!i.some(Y))return L;let a=Math.max(.001,...i.map(e=>Math.abs(s(e)??0)));return F`<div class="card phase-gauges">
      <h3>${r}</h3>
      <div class="phase-gauge-row">
        ${i.map((t,r)=>{let i=s(t),o=i===void 0?void 0:Math.abs(i)/a*100,c=`${n}${i!==void 0&&i<0?` neg`:``}`;return kc(`L${r+1}`,Y(t)?Oc(e,t):`–`,o,c)})}
      </div>
      <div class="phase-history">
        <div class="sub">${t(`historySub`)}</div>
        ${c(i)}
      </div>
    </div>`},u=l(`house`,t(`plantHouse`),[`houseL1`,`houseL2`,`houseL3`]),d=l(`grid`,t(`plantGrid`),[`gridL1`,`gridL2`,`gridL3`]),f=l(`pvi`,t(`plantInverter`),[`pviL1`,`pviL2`,`pviL3`]),p=[{key:`installedPeak`,label:t(`plantPeak`),cls:`pv`},{key:`acMax`,label:t(`plantAc`),cls:`house`},{key:`chargeMax`,label:t(`plantSysCharge`),cls:`bat`},{key:`dischargeMax`,label:t(`plantSysDischarge`),cls:`warn`},{key:`deratePower`,label:t(`plantDeratePower`),cls:`pv`},{key:`extraProduction`,label:t(`plantExtraPv`),cls:`pv`},{key:`extraConsumption`,label:t(`plantExtraUse`),cls:`house`}].map(t=>({...t,kw:Y(t.key)?pc(J(e,B.entities[t.key])):void 0})),m=t=>{let n=p.filter(e=>t.includes(e.key)&&e.kw!==void 0),r=Math.max(0,...n.map(e=>Math.abs(e.kw)));return Mc(n.map(t=>({label:t.label,value:Oc(e,t.key),pct:r>0?Math.abs(t.kw)/r*100:0,cls:t.cls})))},h=Y(`batteryCapacity`)?fc(J(e,B.entities.batteryCapacity)):void 0,g=(n,r,i)=>{let a=t=>dc(J(e,r[t]),e.fmt),o=t=>fc(J(e,r[t])),s=_c(r.energy?o(`energy`):void 0,h,B.packs.length),c=Ac(r.current?o(`current`):void 0),l=r.tempMin?o(`tempMin`):void 0,u=r.tempMax?o(`tempMax`):void 0,d=r.tempMin&&r.tempMax?`${a(`tempMin`)} – ${a(`tempMax`)}`:r.tempMin?a(`tempMin`):r.tempMax?a(`tempMax`):``,f=l??u,p=u??l,m=e=>Math.max(0,Math.min(100,e/50*100)),g=r.soh?o(`soh`):void 0,_=n||t(`plantPack`);return F`<article class="card pack">
      <div class="pack-visual">
        ${jc(`${_}, ${r.energy?a(`energy`):``}`,s,c)}
        ${g===void 0?L:F`<b class="pack-soh">${a(`soh`)}</b><span>${t(`plantSoh`)}</span>`}
      </div>
      <div class="pack-stats">
        <h3>${_}</h3>
        ${r.energy?F`<div class="pack-energy">${a(`energy`)}</div><div class="pack-share">${t(s===void 0?`plantEnergy`:`plantShare`)}</div>`:L}
        <div class="pack-meta">
          ${r.current?F`<div><span>${t(`plantCurrent`)}</span><b class="${c}">${a(`current`)}</b></div>`:L}
          ${r.voltage?F`<div><span>${t(`plantVoltage`)}</span><b>${a(`voltage`)}</b></div>`:L}
          ${r.cycles?F`<div><span>${t(`plantCycles`)}</span><b>${a(`cycles`)}</b></div>`:L}
        </div>
        ${d?F`<div class="temp">
              <div class="temp-top"><span>${t(`plantTemp`)}</span><b>${d}</b></div>
              ${f!==void 0&&p!==void 0?F`<div class="temp-track"><i style="left:${m(Math.min(f,p))}%;width:${Math.max(4,m(Math.max(f,p))-m(Math.min(f,p)))}%"></i></div>`:L}
            </div>`:L}
      </div>
      ${i.length?F`<div class="cells">
            <span class="cells-label">${t(`plantCells`)}</span>
            ${i.map(n=>{let r=fc(J(e,n.entities.sohReported)),i=dc(J(e,n.entities.sohReported),e.fmt);return F`<div class="cell">
                ${jc(`${n.name}, ${i}`,r,gc(r),!0)}
                <b>${i}</b>
                <span>${n.name||t(`plantCell`)}</span>
              </div>`})}
          </div>`:L}
    </article>`},_=(n,r)=>{let i=t=>dc(J(e,r[t]),e.fmt),a=n=>bc(J(e,r[n]),t),o=r.soc?fc(J(e,r.soc)):void 0,s=r.sun?pc(J(e,r.sun)):void 0,c=r.net?pc(J(e,r.net)):void 0,l=(s??0)+(c??0),u=[r.phases?{label:t(`plantPhaseCount`),value:i(`phases`)}:null,r.current?{label:t(`plantMaxCurrent`),value:i(`current`)}:null].filter(e=>e!==null);return F`<article class="card pack wall">
      ${o===void 0?L:F`<div class="pack-visual">${jc(`${n||t(`plantWallbox`)}, ${i(`soc`)}`,o,r.charging&&J(e,r.charging)?.state===`on`?`charge`:`idle`)}<b class="pack-soh">${i(`soc`)}</b><span>${t(`plantCarSoc`)}</span></div>`}
      <div class="pack-stats">
        ${B.wallboxes.length>1?F`<h3>${n||t(`plantWallbox`)}</h3>`:L}
        <div class="plant-flags">
          ${r.plug?F`<span class="chip ${J(e,r.plug)?.state===`on`?`on`:``}"><i></i>${t(`plantPlug`)} ${a(`plug`)}</span>`:L}
          ${r.charging?F`<span class="chip ${J(e,r.charging)?.state===`on`?`on`:``}"><i></i>${t(`plantCharging`)} ${a(`charging`)}</span>`:L}
        </div>
        ${s!==void 0||c!==void 0?F`<div class="mix" title="${t(`plantSun`)} ${r.sun?i(`sun`):``} · ${t(`plantNet`)} ${r.net?i(`net`):``}">
              ${s===void 0?L:F`<i class="sun" style="width:${l>0?Math.abs(s)/l*100:0}%"></i>`}
              ${c===void 0?L:F`<i class="net" style="width:${l>0?Math.abs(c)/l*100:0}%"></i>`}
            </div>
            <div class="phase-legend">
              ${r.sun?F`<span><i class="pvi"></i>${t(`plantSun`)} ${i(`sun`)}</span>`:L}
              ${r.net?F`<span><i class="grid"></i>${t(`plantNet`)} ${i(`net`)}</span>`:L}
            </div>`:L}
        ${u.length?F`<div class="rows">${u.map(e=>F`<div class="row"><span>${e.label}</span><b>${e.value}</b></div>`)}</div>`:L}
      </div>
    </article>`},v=J(e,B.entities.mode)?.state,y=n=>{let r=o.filter(e=>n.includes(e.key));return r.length?F`<div class="plant-flags">${r.map(n=>F`<span class="chip ${J(e,B.entities[n.key])?.state===`on`?n.warn?`warn`:`on`:``}"><i></i>${t(n.label)}</span>`)}</div>`:L},b=(e,t)=>{let n=e?.attributes.friendly_name;return typeof n==`string`&&n.trim()?n.trim():t},x=n=>{let r=J(e,n);if(!r)return L;let i=b(r,n),a=n.split(`.`,1)[0],o=r.state===`unavailable`||e.pending.has(n),s=typeof r.attributes.unit_of_measurement==`string`?r.attributes.unit_of_measurement:``,c=typeof r.attributes.min==`number`?r.attributes.min:void 0,l=typeof r.attributes.max==`number`?r.attributes.max:void 0,u=typeof r.attributes.step==`number`?r.attributes.step:1,d=s===`%`||r.attributes.mode===`slider`,f=a===`switch`?F`<button class="switch ${H(r)?`on`:``}" role="switch" aria-checked=${H(r)} aria-label=${i} ?disabled=${o} @click=${()=>e.onToggle(n)}></button>`:a===`number`&&d&&c!==void 0&&l!==void 0?Xt({label:i,min:c,max:l,step:u,value:V(r)??c,unit:s,disabled:o,onCommit:t=>e.onNumber(n,t)}):a===`number`?F`<label class="setting-num">
              <input
                type="number"
                inputmode="decimal"
                aria-label=${i}
                step=${typeof r.attributes.step==`number`?r.attributes.step:`any`}
                ?disabled=${o}
                ${zt(e=>{let t=e?.getRootNode(),n=t instanceof ShadowRoot?t.activeElement:null;if(!(e instanceof HTMLInputElement)||e===n)return;let i=V(r),a=i===void 0?``:String(i);e.value!==a&&(e.value=a)})}
                @change=${t=>{let r=Number.parseFloat(t.target.value);Number.isFinite(r)&&e.onNumber(n,r)}}
              />
              ${typeof r.attributes.unit_of_measurement==`string`?F`<span>${r.attributes.unit_of_measurement}</span>`:L}
            </label>`:a===`button`?F`<button class="btn" ?disabled=${o} @click=${()=>{window.confirm(t(`plantSend`))&&e.onPress(n)}}>${i}</button>`:L;return F`<div class="ctrl setting-row ${d&&a===`number`?`wide`:``}"><div class="txt"><span class="name"><b>${i}</b></span></div>${f}</div>`},S=e=>{let t=Object.values(e??{}).map(e=>x(e));return t.some(e=>e!==L)?F`<div class="card">${t}</div>`:L},C=B.identity??{},ee=[C.model?{label:t(`plantModel`),value:C.model}:null,C.serial?{label:t(`plantSerial`),value:C.serial}:null,C.firmware?{label:t(`plantFirmware`),value:C.firmware}:null].filter(e=>e!==null),w=hc(J(e,B.entities.errors)),T=F`<section class="card hero">
    <div class="hero-main">
      <div class="hero-mode" data-mode=${v??``}>
        <span>${t(`plantMode`)}</span>
        <b>${Y(`mode`)?yc(v,t):`–`}</b>
      </div>
      <div class="hero-gauges">
        ${kc(t(`plantAutarky`),Y(`autarky`)?Oc(e,`autarky`):`–`,Y(`autarky`)?fc(J(e,B.entities.autarky)):void 0,`autarky`)}
        ${kc(t(`plantSelf`),Y(`selfConsumption`)?Oc(e,`selfConsumption`):`–`,Y(`selfConsumption`)?fc(J(e,B.entities.selfConsumption)):void 0,`self`)}
      </div>
    </div>
    ${ee.length?F`<div class="hero-meta">${ee.map(e=>F`<div><span>${e.label}</span><b>${e.value}</b></div>`)}</div>`:L}
    ${w?F`<p class="hero-fault" role="status">${t(`plantFault`)}: ${w}</p>`:L}
  </section>`,te=Y(`batteryCapacity`)?[{label:t(`plantCapacity`),value:Oc(e,`batteryCapacity`)}]:[],E=Y(`deratePercent`)?[{label:t(`plantDeratePct`),value:Oc(e,`deratePercent`)}]:[],D={grid:{show:u!==L||d!==L||Y(`extraConsumption`),body:F`${u}${d}${m([`extraConsumption`])}`},battery:{show:B.packs.length>0||a!==L||Y(`chargeMax`)||Y(`dischargeMax`)||Y(`batteryCapacity`),body:F`${B.packs.length?F`<div class="plant-packs">${B.packs.map(e=>g(e.name,e.entities,e.modules??[]))}</div>`:L}${y([`manualCharge`,`emergencyPower`,`emergencyReserve`,`rescueBattery`])}${a}${m([`chargeMax`,`dischargeMax`])}${Cc(te)}`},pv:{show:f!==L||Y(`installedPeak`)||Y(`acMax`)||Y(`deratePower`)||Y(`deratePercent`)||Y(`extraProduction`)||Y(`pvDerated`),body:F`${f}${y([`pvDerated`])}${m([`installedPeak`,`acMax`,`deratePower`,`extraProduction`])}${Cc(E)}`},wallbox:{show:B.wallboxes.length>0||Object.keys(B.controls?.wallbox??{}).length>0,body:F`${B.wallboxes.length?F`<div class="plant-packs">${B.wallboxes.map(e=>F`<div class="wall-stack">${_(e.name,e.entities)}${S(e.controls)}</div>`)}</div>`:L}${S(B.controls?.wallbox)}`},controls:{show:Object.keys(B.controls?.general??{}).length>0||Y(`mode`)||n.length>0||Y(`limitsOn`)||Y(`weatherWait`),body:F`${S(B.controls?.general)}${y([`limitsOn`,`weatherWait`])}${Cc(n)}`}},O=Ec(e.groupId)?e.groupId:void 0;return O&&D[O].show?F`<div class="plant-body">${D[O].body}</div>`:F`${T}
    <div class="settings-tiles">
      ${Object.keys(D).filter(e=>D[e].show).map(n=>{let r=Tc[n];return F`<button type="button" class="settings-tile" @click=${()=>e.onOpenRoom(n)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${r.icon}></svg>
          <b>${t(r.title)}</b>
          <span>${t(r.hint)}</span>
        </button>`})}
    </div>`}var Pc=30,Fc=42,Ic=Fc,Lc=34,Rc=26,zc=2.15,Bc={pv:`M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z`,grid:`M12 2 7 22M12 2l5 20M5 9h14M4 15h16`,house:`M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6`,bat:`M7 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM10 3h4`,load:`M4 12h16M12 4v16M7 7l10 10M17 7 7 17`},Vc={"var(--pv)":`#9a3412`,"var(--house)":`#5b21b6`,"var(--grid-in)":`#b91c1c`,"var(--grid-out)":`#047857`,"var(--bat)":`#0e7490`,"var(--accent)":`#075985`},Hc=(e,t)=>t?Vc[e]??`#152033`:e,Uc=(e,t=16)=>e.length<=t?e:`${e.slice(0,t-1)}…`;function Wc(e,t,n){let r=12*n;return`translate(${e-r} ${t-r}) scale(${n})`}var Gc=(e,t)=>e.filter(e=>e.mode===t).reduce((e,t)=>e+Math.max(0,t.watts),0);function Kc(e,t){return Math.max(0,e??0)+Gc(t,`separate`)}function qc(e){return{included:e.filter(e=>e.mode===`included`),separate:e.filter(e=>e.mode===`separate`)}}function Jc(e,t,n=120){if(t<=0)return[];if(t===1)return[{x:e.x+n,y:e.y}];let r=Math.min(200,36+t*34),i=e.y-r/2;return Array.from({length:t},(a,o)=>({x:e.x+n,y:i+o/(t-1)*r}))}function Yc(e,t,n,r,i,a){let o=i[e];return o&&`dx`in o?{x:r.x+o.dx,y:r.y+o.dy}:a[t]??{x:r.x+120,y:r.y}}function Xc(e,t){return e?Math.round(520+Math.max(0,t-2)*48):t?Math.round(420+Math.max(0,t-3)*28):420}function Zc(e){let{pv:t=0,house:n=0,grid:r=0,battery:i=0}=e,a=e.motion!==!1,o=e.outline===!0,s=e=>Hc(e,o),c=e.i18n.t,l=(e.consumers??[]).slice(0,6),{included:u,separate:d}=qc(l),f=Kc(n,l),p=Math.max(0,n),m=e.compact?{x:160,y:250}:{x:240,y:215},h=e.compact?{x:160,y:95}:{x:240,y:95},g=e.compact?{x:55,y:250}:{x:80,y:215},_=e.compact?{x:160,y:405}:{x:240,y:335},v=e.compact?{x:275,y:250}:{x:420,y:215},y=e.compact?{x:v.x+110,y:v.y-70}:{x:v.x+140,y:v.y-70},b=e.consumerPlaces?.__house__&&`dx`in e.consumerPlaces.__house__?{x:v.x+e.consumerPlaces.__house__.dx,y:v.y+e.consumerPlaces.__house__.dy}:y,x=e.consumerPlaces??{},S=Jc(v,d.length,140).map(e=>({x:e.x,y:e.y+55})),C=Jc(b,u.length,110),ee=d.map((e,t)=>({c:e,p:Yc(e.id,t,d.length,v,x,S),from:v})),w=u.map((e,t)=>({c:e,p:Yc(e.id,t,u.length,b,x,C),from:b})),T=ti([b,...ee.map(({p:e})=>e),...w.map(({p:e})=>e)],e.compact?360:760,Xc(e.compact,l.length)??420),te=T.w,E=T.h,D=ni({origin:v,radius:180,startAngle:-1,endAngle:1},Math.max(te,960),Math.max(E,680)),O=ni({origin:b,radius:140,startAngle:-1,endAngle:1},Math.max(te,960),Math.max(E,680)),ne=[{key:`pv`,pos:h,color:`var(--pv)`,label:c(`nodePv`),value:t,icon:Bc.pv},{key:`grid`,pos:g,color:r<0?`var(--grid-in)`:`var(--grid-out)`,label:c(r<0?`nodeImport`:`nodeFeed`),value:r,icon:Bc.grid},{key:`bat`,pos:_,color:`var(--bat)`,label:c(i<0?`nodeBatDischarge`:`nodeBatCharge`),value:i,icon:Bc.bat}],k=Ic,A=[...ne.map(t=>`${t.label} ${e.fmt.w(t.value)}`),`${c(`nodeLoad`)} ${e.fmt.w(f)}`,`${c(`nodeHouse`)} ${e.fmt.w(p)}`,...l.map(t=>`${t.name} ${e.fmt.w(t.watts)}`)].join(`, `),re=(t,n,r,i,a,c,l,u,d)=>{let f=Math.abs(a)<Pc,p=u<0,m=()=>{e.arrange||e.onSelect?.(t)};return I`<g class="flow-node ${d&&e.arrange?`arrange`:``}" opacity=${f?.55:1} role="button" tabindex="0" aria-label=${i}
      @click=${m}
      @keydown=${e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),m())}}
      @pointerdown=${d}
    >
      <circle cx=${n.x} cy=${n.y} r=${l} fill=${o?`none`:`rgba(10,16,30,.9)`} stroke=${s(r)} stroke-width=${o?`2.4`:`2`} filter=${f||o?`none`:`url(#glow)`}/>
      <g transform=${Wc(n.x,n.y,l>=Fc?di(l):li(l))} fill="none" stroke=${s(r)} stroke-width=${zc} stroke-linecap="round" stroke-linejoin="round">
        <path d=${c} vector-effect="non-scaling-stroke"/>
      </g>
      <text class=${l>=Lc?`node-val`:`node-val-sm`} x=${n.x} y=${n.y+u} text-anchor="middle">${e.fmt.w(a)}</text>
      <text class=${l>=Lc?`node-lbl`:`node-lbl-sm`} x=${n.x} y=${n.y+u+(p?19:16)} text-anchor="middle">${Uc(i,18)}</text>
    </g>`},ie=(t,n,r,i,c,l)=>{let u=t.missing||Math.abs(t.watts)<Pc,d=()=>{e.arrange||e.onSelect?.(t.id)};return I`<path class="flow-line" d=${Si(r,n,r===v?Ic:Lc,Rc)} stroke=${i}/>
      ${Mi(r,n,r===v?Ic:Lc,Rc,t.watts,i,a)}
      <g class="flow-node ${e.arrange?`arrange`:``}" opacity=${u?.55:1} role="button" tabindex="0" aria-label=${t.name}
        @click=${d}
        @keydown=${e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),d())}}
        @pointerdown=${n=>ii(n,t.id,c,e.arrange,e.onPlaceConsumer,l)}
      >
        <circle cx=${n.x} cy=${n.y} r=${Rc} fill=${o?`none`:`rgba(10,16,30,.9)`} stroke=${s(i)} stroke-width=${o?`2.4`:`2`} filter=${u||o?`none`:`url(#glow)`}/>
        <g transform=${Wc(n.x,n.y,li(Rc))} fill="none" stroke=${s(i)} stroke-width=${zc} stroke-linecap="round" stroke-linejoin="round">
          <path d=${ct[t.icon]} vector-effect="non-scaling-stroke"/>
        </g>
        <text class="node-val-sm" x=${n.x+34} y=${n.y-2} text-anchor="start">${e.fmt.w(t.watts)}</text>
        <text class="node-lbl-sm" x=${n.x+34} y=${n.y+14} text-anchor="start">${Uc(t.name,18)}</text>
      </g>`};return I`<svg viewBox="0 0 ${te} ${E}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${A}>
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    ${ne.map(e=>I`<path class="flow-line" d=${Si(e.pos,m,Fc,k)} stroke=${e.color}/>`)}
    <path class="flow-line" d=${Si(m,v,k,Ic)} stroke="var(--house)"/>
    <path class="flow-line" d=${Si(v,b,Ic,Lc)} stroke="var(--house)"/>

    ${ne.map(e=>{let n=e.key===`pv`&&t>Pc||e.key===`bat`&&i<-30||e.key===`grid`&&r<-30,o=e.key===`bat`&&i>Pc||e.key===`grid`&&r>Pc;return n?Mi(e.pos,m,Fc,k,e.value,e.color,a):o?Mi(m,e.pos,k,Fc,e.value,e.color,a):I``})}
    ${Mi(m,v,k,Ic,f,`var(--house)`,a)}
    ${Mi(v,b,Ic,Lc,p,`var(--house)`,a)}

    <image href=${ai} x=${m.x-k} y=${m.y-k} width=${84} height=${84} aria-label="Maestro"/>
    ${ne.map(e=>re(e.key,e.pos,e.color,e.label,e.value,e.icon,Fc,e.key===`pv`?-72:70))}
    ${re(`load`,v,`var(--house)`,c(`nodeLoad`),f,Bc.load,Ic,70)}
    ${re(`house`,b,`var(--house)`,c(`nodeHouse`),p,Bc.house,Lc,58,e.arrange?t=>ii(t,`__house__`,v,e.arrange,e.onPlaceConsumer,D):void 0)}
    ${ee.map(({c:e,p:t})=>ie(e,t,v,`var(--accent)`,v,D))}
    ${w.map(({c:e,p:t})=>ie(e,t,b,`var(--house)`,b,O))}
  </svg>`}var Qc={pv:`M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z`,grid:`M12 2 7 22M12 2l5 20M5 9h14M4 15h16`,house:`M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6`,bat:`M7 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM10 3h4`,load:`M4 12h16M12 4v16M7 7l10 10M17 7 7 17`},$c=24,el=2.15,tl=30,nl=30,rl=26,il=16,al=5500,ol=72,sl=52,cl=48,ll=72,ul={wide:{box:[600,420],hub:{x:300,y:215},pv:{x:300,y:88,labelDy:-58},grid:{x:78,y:215,labelDy:70},house:{x:522,y:215,labelDy:70},bat:{x:300,y:342,labelDy:58}},compact:{box:[360,600],hub:{x:180,y:255},pv:{x:180,y:100,labelDy:-56},grid:{x:72,y:255,labelDy:58},house:{x:288,y:255,labelDy:58},bat:{x:180,y:430,labelDy:52}}},dl={"var(--pv)":`#9a3412`,"var(--house)":`#5b21b6`,"var(--grid-in)":`#b91c1c`,"var(--grid-out)":`#047857`,"var(--bat)":`#0e7490`,"var(--accent)":`#075985`},fl=(e,t)=>t?dl[e]??`#152033`:e;function pl(e,t,n){let r=$c/2*n;return`translate(${e-r} ${t-r}) scale(${n})`}function ml(e,t){let n=mi(e);return I`<clipPath id="blob-batbody"><rect x="6.6" y="7.6" width="10.8" height="10.8" rx="1.3"/></clipPath>
    ${n?I`<rect clip-path="url(#blob-batbody)" x=${n.x} y=${n.y} width=${n.width} height=${n.height+1} fill=${t} stroke="none" opacity="0.78"/>`:I``}
    <path d=${Qc.bat} vector-effect="non-scaling-stroke"/>`}var hl=(e,t=16)=>e.length<=t?e:`${e.slice(0,t-1)}…`;function gl(e,t){return e>0?1-Math.min(1,Math.max(0,-t)/e):+(t>=0)}function _l(e,t){return(t?sl:ol)*(.88+.22*Math.min(1,Math.abs(e)/al))}function vl(e){let t=e=>Math.min(1,Math.abs(e)/al),n=[{angle:-Math.PI/2,strength:t(e.pv)},{angle:Math.PI,strength:t(e.grid)},{angle:0,strength:t(e.house)},{angle:Math.PI/2,strength:t(e.battery)}];for(let r of e.consumers??[])Math.abs(r.watts)<tl||n.push({angle:r.angle,strength:t(r.watts)*.55});return n.filter(e=>e.strength>.02)}function yl(e,t,n){let r=t;for(let t of n){let n=Math.abs(e-t.angle);n>Math.PI&&(n=2*Math.PI-n);let i=Math.max(0,Math.cos(n));r+=t.strength*cl*i*i*i}return r}function bl(e,t,n=ll){let r=[];for(let i=0;i<n;i++){let a=i/n*Math.PI*2-Math.PI/2,o=yl(a,e,t),s=Math.cos(a)*o,c=Math.sin(a)*o;r.push(`${i?`L`:`M`}${s.toFixed(1)} ${c.toFixed(1)}`)}return`${r.join(` `)} Z`}function xl(e,t){return Math.atan2(t.y-e.y,t.x-e.x)}var Sl=46;function Cl(e,t){let n=ul.compact.bat,r=n.y+n.labelDy+44;return Array.from({length:e},(e,n)=>({x:t-40,y:r+n*Sl,labelDy:5}))}function wl(e,t,n=!1){if(!e){if(!t&&!n)return;let e=ul.wide,r=n?{x:e.house.x+140,y:e.house.y-70}:{x:e.house.x,y:e.house.y},i=Jr(r,Math.max(1,t));return Math.round(ei(r.y,i,e.box[1])*.95)}let r=ul.compact;if(!t)return Math.round(r.box[1]*.94);let i=Cl(t,r.box[0]).at(-1);return Math.round((i.y+36)*.94)}function Tl(e){let t=(e.consumers??[]).slice(0,6),{included:n,separate:r}=qc(t),i=r.length>0,a=e.compact?ul.compact:ul.wide,o={x:a.house.x,y:a.house.y},s=e.consumerPlaces??{},c=e.compact?{x:o.x,y:o.y+78}:{x:o.x+140,y:o.y-70},l=i&&s.__house__&&`dx`in s.__house__?{x:o.x+s.__house__.dx,y:o.y+s.__house__.dy}:c,u=Jr(o,i?r.length:t.length),d=Jr(l,n.length),f=a.box[0]+(e.compact?0:$r(t.length+ +!!i)),p=e.compact?[]:Zr((i?r:t).map(e=>e.id),s,u,(i?r:t).map(e=>e.mode)),m=e.compact||!i?[]:Zr(n.map(e=>e.id),s,d,n.map(e=>e.mode)),h=e.compact?t.length?Cl(t.length,f).at(-1).y+36:a.box[1]:i?Math.max(ei(o.y,u,a.box[1]),ei(l.y,d,a.box[1])):ei(o.y,u,a.box[1]),g=e.compact?[]:i?[l,...p,...m]:p,_=e.compact?{w:f,h}:ti(g,f,h),v=_.w,y=_.h,b=ni(u,Math.max(v,920),Math.max(y,640)),x=ni(d,Math.max(v,920),Math.max(y,640)),S=e.compact?Cl(t.length,v):[],{pv:C=0,house:ee=0,grid:w=0,battery:T=0}=e,te=Math.max(0,ee),E=i?Kc(ee,t):te,D=e.outline===!0,O=e.motion!==!1,ne=e=>fl(e,D),k=e.i18n.t,A=i?[...r.map((n,r)=>({c:n,p:e.compact?S[t.indexOf(n)]:{x:p[r].x,y:p[r].y,labelDy:0},from:o,fromR:36,dragOrigin:o,bounds:b})),...n.map((n,r)=>({c:n,p:e.compact?S[t.indexOf(n)]:{x:m[r].x,y:m[r].y,labelDy:0},from:l,fromR:nl,dragOrigin:l,bounds:x}))]:t.map((t,n)=>({c:t,p:e.compact?S[n]:{x:p[n].x,y:p[n].y,labelDy:0},from:t.mode===`included`?o:a.hub,fromR:t.mode===`included`?36:e.compact?22:28,dragOrigin:u.origin,bounds:b})),re=Math.abs(C)+Math.abs(E)+Math.abs(w)+Math.abs(T),ie=_l(re,e.compact),ae=bl(ie,vl({pv:C,house:E,grid:w,battery:T,consumers:A.map(({c:e,p:t})=>({angle:xl(a.hub,t),watts:e.watts}))})),j=gl(E,w),M=e.compact?22:28,oe=typeof e.soc==`number`&&Number.isFinite(e.soc)?Math.min(100,Math.max(0,e.soc)):void 0,N=oe===void 0?M*.9:M*.55+M*.55*(oe/100),P={pv:{color:`var(--pv)`,label:k(`nodePv`),value:C,icon:Qc.pv},grid:{color:w<0?`var(--grid-in)`:`var(--grid-out)`,label:k(w<0?`nodeImport`:`nodeFeed`),value:w,icon:Qc.grid},house:{color:`var(--house)`,label:k(i?`nodeLoad`:`nodeHouse`),value:E,icon:i?Qc.load:Qc.house},bat:{color:`var(--bat)`,label:k(T<0?`nodeBatDischarge`:`nodeBatCharge`),value:T,icon:Qc.bat}},se=[`pv`,`grid`,`house`,`bat`],ce=[...se.map(t=>`${P[t].label} ${e.fmt.w(P[t].value)}`),...i?[`${k(`nodeHouse`)} ${e.fmt.w(te)}`]:[],...A.map(({c:t})=>`${t.name} ${e.fmt.w(t.watts)}`)].join(`, `),le=j>.55?`var(--pv)`:j>.25?`var(--bat)`:`var(--grid-in)`,ue=j>.55?`var(--bat)`:j>.25?`var(--house)`:`var(--grid-in)`,F=Math.min(1,re/al),de=`${(3.2-1.4*F).toFixed(2)}s`,L=[];C>tl&&L.push({node:`pv`,toHub:!0}),T<-30&&L.push({node:`bat`,toHub:!0}),T>tl&&L.push({node:`bat`,toHub:!1}),w<-30&&L.push({node:`grid`,toHub:!0}),w>tl&&L.push({node:`grid`,toHub:!1}),E>tl&&L.push({node:`house`,toHub:!1});let fe=ie*(.72+.18*F);return I`<svg viewBox="0 0 ${v} ${y}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${ce}>
    <defs>
      <filter id="blob-glow"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="blob-fill" cx="50%" cy="45%" r="70%">
        <stop offset="0%" stop-color=${le} stop-opacity="0.55"/>
        <stop offset="55%" stop-color=${ue} stop-opacity="0.32"/>
        <stop offset="100%" stop-color=${ue} stop-opacity="0.08"/>
      </radialGradient>
      <radialGradient id="blob-core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--bat)" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="var(--bat)" stop-opacity="0.08"/>
      </radialGradient>
    </defs>
    ${se.map(e=>I`<path class="flow-line" d=${Si(a[e],a.hub,36,M)} stroke=${P[e].color} opacity=${Math.abs(P[e].value)>tl?.4:.16}/>`)}
    ${i?I`<path class="flow-line" d=${Si(o,l,36,nl)} stroke="var(--house)" opacity=${te>tl?.4:.16}/>
          ${Mi(o,l,36,nl,te,`var(--house)`,O)}`:I``}
    ${L.map(e=>Mi(e.toHub?a[e.node]:a.hub,e.toHub?a.hub:a[e.node],e.toHub?36:M,e.toHub?M:36,P[e.node].value,P[e.node].color,O))}
    <g class="flow-blob ${O?`motion`:``}" style=${`--blob-period:${de}`} transform=${`translate(${a.hub.x} ${a.hub.y})`}>
      <ellipse class="flow-blob-halo" cx="0" cy="0" rx=${(fe*1.15).toFixed(1)} ry=${(fe*.92).toFixed(1)} fill="none" stroke=${ne(le)} stroke-width="1.2" stroke-dasharray="6 10" opacity=${(.2+.35*F).toFixed(2)}/>
      <path class="flow-blob-shape" d=${ae} fill="url(#blob-fill)" stroke=${ne(le)} stroke-width=${D?`2.2`:`1.4`} filter=${D?`none`:`url(#blob-glow)`} opacity="0.95"/>
      <circle class="flow-blob-core" r=${N.toFixed(1)} fill="url(#blob-core)" opacity=${oe===void 0?.35:.75}/>
      <image href=${ai} x=${-M} y=${-M} width=${M*2} height=${M*2} aria-label="Maestro"/>
    </g>
    ${se.map(t=>{let n=P[t],r=a[t],o=Math.abs(n.value)<tl,s=r.labelDy<0,c=r.y+r.labelDy;return I`<g class="flow-node" opacity=${o?.55:1} role="button" tabindex="0" aria-label=${n.label} @click=${()=>e.onSelect?.(t===`house`&&i?`load`:t)} @keydown=${n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),e.onSelect?.(t===`house`&&i?`load`:t))}}>
        <circle cx=${r.x} cy=${r.y} r=${36} fill=${D?`none`:`rgba(10,16,30,.88)`} stroke=${ne(n.color)} stroke-width=${D?`2.4`:`2`} filter=${o||D?`none`:`url(#blob-glow)`}/>
        <g transform=${pl(r.x,r.y,di(36))} fill="none" stroke=${ne(n.color)} stroke-width=${el} stroke-linecap="round" stroke-linejoin="round">
          ${t===`bat`?ml(e.soc,ne(n.color)):I`<path d=${n.icon} vector-effect="non-scaling-stroke"/>`}
        </g>
        <text class="node-val" x=${r.x} y=${c} text-anchor="middle">${e.fmt.w(n.value)}</text>
        <text class="node-lbl" x=${r.x} y=${c+(s?19:18)} text-anchor="middle">${n.label}</text>
      </g>`})}
    ${i?I`<g class="flow-node ${e.arrange?`arrange`:``}" opacity=${te<tl?.55:1} role="button" tabindex="0" aria-label=${k(`nodeHouse`)}
          @click=${()=>{e.arrange||e.onSelect?.(`house`)}}
          @keydown=${t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),e.arrange||e.onSelect?.(`house`))}}
          @pointerdown=${t=>ii(t,`__house__`,o,e.arrange,e.onPlaceConsumer,b)}
        >
          <circle cx=${l.x} cy=${l.y} r=${nl} fill=${D?`none`:`rgba(10,16,30,.88)`} stroke=${ne(`var(--house)`)} stroke-width=${D?`2.4`:`2`} filter=${te<tl||D?`none`:`url(#blob-glow)`}/>
          <g transform=${pl(l.x,l.y,di(nl))} fill="none" stroke=${ne(`var(--house)`)} stroke-width=${el} stroke-linecap="round" stroke-linejoin="round">
            <path d=${Qc.house} vector-effect="non-scaling-stroke"/>
          </g>
          <text class="node-val-sm" x=${l.x} y=${l.y+52} text-anchor="middle">${e.fmt.w(te)}</text>
          <text class="node-lbl-sm" x=${l.x} y=${l.y+68} text-anchor="middle">${k(`nodeHouse`)}</text>
        </g>`:I``}
    ${e.compact?i?I`${Ii(A.filter(({c:e})=>e.mode===`separate`),o,v,O,36)}${Ii(A.filter(({c:e})=>e.mode===`included`),l,v,O,nl)}`:Ii(A,o,v,O,36):A.map(({c:e,p:t,from:n,fromR:r})=>{let i=e.mode===`included`?`var(--house)`:`var(--accent)`;return I`<path class="flow-line" d=${Si(n,t,r,rl)} stroke=${i} opacity=${Math.abs(e.watts)>tl?.4:.16}/>
            ${Mi(n,t,r,rl,e.watts,i,O)}`})}
    ${A.map(({c:t,p:n,dragOrigin:r,bounds:i})=>{let a=ne(t.mode===`included`?`var(--house)`:`var(--accent)`),o=t.missing||Math.abs(t.watts)<tl,s=()=>{e.arrange||e.onSelect?.(t.id)},c=e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),s())};return e.compact?I`<g class="flow-node" opacity=${o?.55:1} role="button" tabindex="0" aria-label=${t.name} @click=${s} @keydown=${c}>
          <circle cx=${n.x} cy=${n.y} r=${il} fill=${D?`none`:`rgba(10,16,30,.9)`} stroke=${a} stroke-width=${D?`2.2`:`2`}/>
          <g transform=${pl(n.x,n.y,li(il))} fill="none" stroke=${a} stroke-width=${el} stroke-linecap="round" stroke-linejoin="round"><path d=${ct[t.icon]} vector-effect="non-scaling-stroke"/></g>
          <text font-size="14" font-weight="700" fill="var(--text)" x=${n.x-26} y=${n.y+5} text-anchor="end">${e.fmt.w(t.watts)}  ${hl(t.name,24)}</text>
        </g>`:I`<g class="flow-node ${e.arrange?`arrange`:``}" opacity=${o?.55:1} role="button" tabindex="0" aria-label=${t.name} @click=${s} @keydown=${c} @pointerdown=${n=>ii(n,t.id,r,e.arrange,e.onPlaceConsumer,i)}>
        <circle cx=${n.x} cy=${n.y} r="26" fill=${D?`none`:`rgba(10,16,30,.9)`} stroke=${a} stroke-width=${D?`2.4`:`2`} filter=${o||D?`none`:`url(#blob-glow)`}/>
        <g transform=${pl(n.x,n.y,li(rl))} fill="none" stroke=${a} stroke-width=${el} stroke-linecap="round" stroke-linejoin="round"><path d=${ct[t.icon]} vector-effect="non-scaling-stroke"/></g>
        <text class="node-val-sm" x=${n.x+34} y=${n.y-2} text-anchor="start">${e.fmt.w(t.watts)}</text>
        <text class="node-lbl-sm" x=${n.x+34} y=${n.y+14} text-anchor="start">${hl(t.name,18)}</text>
      </g>`})}
  </svg>`}var El=30,Dl=30,Ol=26,kl=16,Al=`M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6`,jl=24,Ml=2.15,Nl=12e3,Pl=6,Fl=6e3,Il={"var(--pv)":`#9a3412`,"var(--house)":`#5b21b6`,"var(--grid-in)":`#b91c1c`,"var(--grid-out)":`#047857`,"var(--bat)":`#0e7490`,"var(--accent)":`#075985`},Ll=(e,t)=>t?Il[e]??`#152033`:e;function Rl(e,t,n){let r=jl/2*n;return`translate(${e-r} ${t-r}) scale(${n})`}var zl=(e,t=16)=>e.length<=t?e:`${e.slice(0,t-1)}…`;function Bl(e,t=Nl){let n=Math.max(1e3,Number.isFinite(t)?t:Nl);if(!(e>El))return Array.from({length:Pl},()=>0);let r=Math.min(1,e/n)*Pl;return Array.from({length:Pl},(e,t)=>Math.min(1,Math.max(0,r-t)))}function Vl(e){return e>El?.22+.7*Math.min(1,e/Fl):.1}function Hl(e,t){return typeof e!=`number`||!Number.isFinite(e)||e<=0?0:Math.min(100,e)/100*t}function Ul(e,t,n,r,i,a,o){let s=o?Ti(i):0;if(!s)return I``;let c=xi(e,t,n,r),l=Ei(i).toFixed(3);return I`${Array.from({length:s},(e,t)=>I`<g class="electron" fill=${a} data-x1=${c.x1} data-y1=${c.y1} data-x2=${c.x2} data-y2=${c.y2} data-speed=${l} data-phase=${t/s}><circle class="halo" r="3.4"/><circle r="1.5"/><circle r="0.75" fill="#fff"/></g>`)}`}function Wl(e,t){if(e){let e=t?66+t*46:54;return{boxW:360,boxH:Math.max(520,222+e),roof:{x:108,y:72,w:192,h:26},soffit:{x:110,y:98,w:188,h:5},facade:{x:126,y:103,w:156,h:148},plinth:{x:128,y:251,w:152,h:18},mast:{x:34,y:182,h:71},logo:{x:136,y:221,s:20},groundY:272}}return{boxW:600+(t?$r(t):0),boxH:297,roof:{x:184,y:52,w:240,h:28},soffit:{x:186,y:80,w:236,h:6},facade:{x:206,y:86,w:196,h:168},plinth:{x:209,y:254,w:190,h:20},mast:{x:76,y:175,h:81},logo:{x:216,y:222,s:22},groundY:277}}function Gl(e,t,n,r){let i=e.y-e.h,a=i+14,o=r?3.6:3.2,s=r?2.2:2;return I`<g class="flow-city-mast" filter=${n&&!r?`url(#city-glow)`:`none`}>
    <line x1=${e.x} y1=${e.y} x2=${e.x} y2=${i} stroke=${t} stroke-width=${o} stroke-linecap="round"/>
    <line x1=${e.x-20} y1=${a} x2=${e.x+20} y2=${a} stroke=${t} stroke-width=${o} stroke-linecap="round"/>
    <line x1=${e.x-20+5} y1=${a} x2=${e.x-20+5} y2=${a+11} stroke=${t} stroke-width=${s} stroke-linecap="round"/>
    <line x1=${e.x+20-5} y1=${a} x2=${e.x+20-5} y2=${a+11} stroke=${t} stroke-width=${s} stroke-linecap="round"/>
    <circle cx=${e.x-20+5} cy=${a+13} r="2.8" fill=${t} opacity=${n?.95:.5}/>
    <circle cx=${e.x+20-5} cy=${a+13} r="2.8" fill=${t} opacity=${n?.95:.5}/>
    <path d=${`M${e.x-12} ${e.y} L${e.x} ${e.y-9} L${e.x+12} ${e.y} Z`} fill=${t} opacity="0.4"/>
  </g>`}function Kl(e){let t=e.x+e.w*.1,n=e.w*.8,r=e.y+e.h*.12,i=e.h*.42,a=n-10-25,o=Math.max(7,a/Pl),s=i-10;return Array.from({length:Pl},(e,n)=>({x:t+5+n*(o+5),y:r+5,w:o,h:s}))}function ql(e,t,n,r){let i=()=>n?.(e);return I`<g class="flow-node flow-city-zone" role="button" tabindex="0" aria-label=${t} @click=${i} @keydown=${e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),i())}}>${r}</g>`}function Jl(e){let t=(e.consumers??[]).slice(0,6),{included:n,separate:r}=qc(t),i=r.length>0,a=Wl(e.compact,t.length+ +!!i),{pv:o=0,house:s=0,grid:c=0,battery:l=0}=e,u=Math.max(0,s),d=i?Kc(s,t):u,f=e.motion!==!1,p=e.outline===!0,m=e=>Ll(e,p),h=e.i18n.t,g=Vl(o),_=Bl(d,e.loadMax??Nl),v=Kl(a.facade),y=Hl(e.soc,a.plinth.w-6),b=c<0?`var(--grid-in)`:`var(--grid-out)`,x=h(c<0?`nodeImport`:`nodeFeed`),S=h(l<0?`nodeBatDischarge`:`nodeBatCharge`),C={x:a.roof.x+a.roof.w/2,y:a.roof.y+a.roof.h/2},ee={x:a.facade.x+a.facade.w/2,y:a.facade.y+a.facade.h*.45},w={x:a.plinth.x+a.plinth.w/2,y:a.plinth.y+a.plinth.h/2},T=a.facade.x+a.facade.w-9,te={x:T,y:a.facade.y+14},E={x:T,y:a.facade.y+a.facade.h*.36},D={x:T,y:w.y},O=ee.x,ne=Math.abs(l)>El,k={x:a.mast.x+16,y:a.mast.y-a.mast.h+14},A={x:a.roof.x+8,y:a.soffit.y+a.soffit.h/2},re=(k.y+A.y)/2-8,ie=`M${k.x} ${k.y} C${k.x+24} ${re}, ${A.x-28} ${A.y-4}, ${A.x} ${A.y}`,ae={x:a.facade.x+a.facade.w*.1,y:a.facade.y+a.facade.h*.12,w:a.facade.w*.8,h:a.facade.h*.42},j={x:a.facade.x+a.facade.w,y:ee.y},M=e.consumerPlaces??{},oe=e.compact?{x:j.x+90,y:j.y-36}:{x:j.x+120,y:j.y-56},N=i&&M.__house__&&`dx`in M.__house__?{x:j.x+M.__house__.dx,y:j.y+M.__house__.dy}:oe,P=Jr(j,i?r.length:t.length),se=Jr(N,n.length),ce=e.compact?[]:Zr((i?r:t).map(e=>e.id),M,P,(i?r:t).map(e=>e.mode)),le=e.compact||!i?[]:Zr(n.map(e=>e.id),M,se,n.map(e=>e.mode)),ue=a.plinth.y+a.plinth.h+18,F=ue+52,de=e=>({x:a.boxW-40,y:F+e*46,labelDy:5}),L=i?[...r.map((n,r)=>({c:n,p:e.compact?de(t.indexOf(n)):{x:ce[r].x,y:ce[r].y,labelDy:0},joinFrom:j,dragOrigin:j})),...n.map((n,r)=>({c:n,p:e.compact?de(t.indexOf(n)):{x:le[r].x,y:le[r].y,labelDy:0},joinFrom:N,dragOrigin:N}))]:t.map((t,n)=>({c:t,p:e.compact?de(n):{x:ce[n].x,y:ce[n].y,labelDy:0},joinFrom:j,dragOrigin:j})),fe=i?Math.max(r.length?ei(j.y,P,a.boxH):a.boxH,n.length?ei(N.y,se,a.boxH):a.boxH):t.length?ei(ee.y,P,a.boxH):a.boxH,pe=i?[N,...L.map(({p:e})=>e)]:L.map(({p:e})=>e),me=e.compact?{w:a.boxW,h:fe}:ti(pe,a.boxW+(t.length||i?$r(t.length+ +!!i):0),fe),he=L.length||i?Math.max(a.groundY+20,N.y+(i?70:0),...L.map(({p:e})=>e.y+44)):a.boxH,ge=e.compact?a.boxW:me.w,_e=e.compact?L.length?L.at(-1).p.y+40:a.mast.y+56:Math.max(a.boxH,he,me.h),ve=ni(P,Math.max(ge,920),Math.max(_e,640)),ye=ni(se,Math.max(ge,920),Math.max(_e,640)),be=h(i?`nodeLoad`:`nodeHouse`),xe=[`${h(`nodePv`)} ${e.fmt.w(o)}`,`${be} ${e.fmt.w(d)}`,...i?[`${h(`nodeHouse`)} ${e.fmt.w(u)}`]:[],`${x} ${e.fmt.w(c)}`,`${S} ${e.fmt.w(l)}`,...L.map(({c:t})=>`${t.name} ${e.fmt.w(t.watts)}`)].join(`, `),Se=p?`none`:`rgba(16,22,36,.9)`,Ce=p?1.8:1.4;return I`<svg viewBox="0 0 ${ge} ${_e}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${xe}>
    <defs>
      <filter id="city-glow"><feGaussianBlur stdDeviation="4.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="city-soft"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/></feMerge></filter>
      <linearGradient id="city-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--pv)" stop-opacity=${(g*.2).toFixed(2)}/>
        <stop offset="70%" stop-color="var(--fill, #0a101e)" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="city-roof" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--pv)" stop-opacity=${(g*.85).toFixed(2)}/>
        <stop offset="100%" stop-color="var(--pv)" stop-opacity=${(g*.5).toFixed(2)}/>
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
      ${v.map((e,t)=>I`<clipPath id=${`city-bar-${t}`}><rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx="2"/></clipPath>`)}
    </defs>

    <rect x="0" y="0" width=${a.boxW} height=${a.roof.y+36} fill="url(#city-sky)"/>
    <ellipse cx=${C.x} cy=${a.roof.y+6} rx=${a.roof.w*.34} ry="18" fill="var(--pv)" opacity=${(g*.14).toFixed(2)} filter="url(#city-soft)"/>
    <line x1=${a.mast.x-18} y1=${a.groundY} x2=${a.plinth.x+a.plinth.w+28} y2=${a.groundY} stroke="rgba(148,163,184,.3)" stroke-width="1.6" stroke-linecap="round"/>

    <path
      class="flow-line"
      d=${ie}
      stroke=${m(b)}
      opacity=${Math.abs(c)>El?.45:.22}
    />

    ${ql(`pv`,h(`nodePv`),e.onSelect,I`<rect class="flow-city-roof" x=${a.roof.x} y=${a.roof.y} width=${a.roof.w} height=${a.roof.h} rx="4" fill=${p?`none`:`rgba(10,16,28,.92)`} stroke=${m(`var(--pv)`)} stroke-width=${Ce} stroke-opacity=${o>El||p?1:.45} filter=${o>El&&!p?`url(#city-glow)`:`none`}/>
        <rect x=${a.roof.x+2} y=${a.roof.y+2} width=${a.roof.w-4} height=${a.roof.h-4} rx="3" fill="url(#city-roof)"/>
        <g clip-path="url(#city-roof-clip)">
          ${Array.from({length:6},(e,t)=>{let n=a.roof.x+6+(a.roof.w-12)*t/5;return I`<line x1=${n} y1=${a.roof.y+4} x2=${n} y2=${a.roof.y+a.roof.h-4} stroke="rgba(255,255,255,.18)" stroke-width="1"/>`})}
          ${Array.from({length:3},(e,t)=>{let n=a.roof.y+5+(a.roof.h-10)*t/2;return I`<line x1=${a.roof.x+5} y1=${n} x2=${a.roof.x+a.roof.w-5} y2=${n} stroke="rgba(255,255,255,.14)" stroke-width="1"/>`})}
        </g>
        <rect x=${a.soffit.x} y=${a.soffit.y} width=${a.soffit.w} height=${a.soffit.h} fill=${p?`none`:`rgba(8,12,22,.85)`} stroke=${m(`var(--pv)`)} stroke-width="1" opacity="0.85"/>
        <text class="node-val" x=${C.x} y=${a.roof.y-18} text-anchor="middle">${e.fmt.w(o)}</text>
        <text class="node-lbl" x=${C.x} y=${a.roof.y-2} text-anchor="middle">${h(`nodePv`)}</text>`)}
    <circle cx=${A.x} cy=${A.y} r="3" fill=${m(b)} opacity=${Math.abs(c)>El?.9:.45}/>

    ${ql(i?`load`:`house`,be,e.onSelect,I`<rect class="flow-city-body" x=${a.facade.x} y=${a.facade.y} width=${a.facade.w} height=${a.facade.h} rx="2" fill=${Se} stroke=${m(`var(--house)`)} stroke-width=${Ce}/>
        <rect x=${a.facade.x+1} y=${a.facade.y+1} width=${a.facade.w-2} height=${a.facade.h-2} rx="1.5" fill="url(#city-glass)"/>
        <rect x=${ae.x} y=${ae.y} width=${ae.w} height=${ae.h} rx="2" fill="rgba(8,12,22,.55)" stroke="rgba(148,163,184,.28)" stroke-width="1.2"/>
        ${v.map((e,t)=>{let n=_[t]??0,r=e.h*n,i=e.y+e.h-r;return I`<g>
            <rect x=${e.x} y=${e.y} width=${e.w} height=${e.h} rx="2" fill="rgba(148,163,184,.2)" opacity="0.35"/>
            ${n>.005?I`<rect clip-path=${`url(#city-bar-${t})`} x=${e.x} y=${i} width=${e.w} height=${r} fill="var(--house)" opacity=${(.55+.4*n).toFixed(2)} filter=${p?`none`:`url(#city-glow)`}/>`:I``}
            ${t<5?I`<line x1=${e.x+e.w+2.5} y1=${ae.y+3} x2=${e.x+e.w+2.5} y2=${ae.y+ae.h-3} stroke="rgba(148,163,184,.22)" stroke-width="1"/>`:I``}
          </g>`})}`)}

    <image href=${ai} x=${a.logo.x} y=${a.logo.y} width=${a.logo.s} height=${a.logo.s} opacity="0.65" style="pointer-events:none" aria-label="Maestro"/>

    ${ql(`bat`,S,e.onSelect,I`<rect class="flow-city-cellar" x=${a.plinth.x} y=${a.plinth.y} width=${a.plinth.w} height=${a.plinth.h} rx="1.5" fill=${p?`none`:`rgba(8,12,20,.94)`} stroke=${m(`var(--bat)`)} stroke-width=${Ce} filter=${Math.abs(l)>El&&!p?`url(#city-glow)`:`none`}/>
        <rect clip-path="url(#city-plinth-clip)" x=${a.plinth.x+2} y=${a.plinth.y+2} width=${y} height=${a.plinth.h-4} fill="url(#city-plinth)"/>
        ${e.compact?I`<text class="node-val-sm" x=${w.x} y=${ue} text-anchor="middle">${e.fmt.w(l)}</text>
            <text class="node-lbl-sm" x=${w.x} y=${ue+14} text-anchor="middle">${S}</text>`:I`<text class="node-val-sm" x=${a.plinth.x-14} y=${w.y-12} text-anchor="end">${e.fmt.w(l)}</text>
            <text class="node-lbl-sm" x=${a.plinth.x-14} y=${w.y+3} text-anchor="end">${S}</text>`}`)}

    ${ql(`grid`,x,e.onSelect,I`<rect x=${a.mast.x-28} y=${a.mast.y-a.mast.h-4} width="56" height=${a.mast.h+44} fill="transparent"/>
        ${Gl(a.mast,m(b),Math.abs(c)>El,p)}
        <text class="node-val-sm" x=${a.mast.x} y=${e.compact?ue:a.mast.y+20} text-anchor="middle">${e.fmt.w(c)}</text>
        <text class="node-lbl-sm" x=${a.mast.x} y=${e.compact?ue+14:a.mast.y+34} text-anchor="middle">${x}</text>`)}

    <path
      class="flow-line"
      d=${`M${D.x} ${D.y} L${E.x} ${E.y}`}
      stroke=${m(`var(--bat)`)}
      opacity=${ne?.5:.18}
    />
    ${o>El?I`<path class="flow-line" d=${`M${C.x} ${C.y} L${te.x} ${te.y}`} stroke=${m(`var(--pv)`)} opacity="0.45"/>
          ${Ul(C,te,2,2,o,m(`var(--pv)`),f)}`:I``}
    ${d>El&&l>El?Ul(E,D,2,2,Math.min(d,l),m(`var(--bat)`),f):I``}
    ${l<-30?Ul(D,E,2,2,Math.abs(l),m(`var(--bat)`),f):I``}
    ${c<-30?Ul(k,A,4,4,Math.abs(c),m(`var(--grid-in)`),f):I``}
    ${c>El?Ul(A,k,4,4,c,m(`var(--grid-out)`),f):I``}

    ${i?I`<path class="flow-line" d=${Si(j,N,4,Dl)} stroke=${m(`var(--house)`)} opacity=${u>El?.45:.22}/>
          ${Ul(j,N,4,Dl,u,m(`var(--house)`),f)}
          <g class="flow-node ${e.arrange?`arrange`:``}" opacity=${u<El?.55:1} role="button" tabindex="0" aria-label=${h(`nodeHouse`)}
            @click=${()=>{e.arrange||e.onSelect?.(`house`)}}
            @keydown=${t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),e.arrange||e.onSelect?.(`house`))}}
            @pointerdown=${t=>ii(t,`__house__`,j,e.arrange,e.onPlaceConsumer,ve)}
          >
            <circle cx=${N.x} cy=${N.y} r=${Dl} fill=${p?`none`:`rgba(10,16,30,.9)`} stroke=${m(`var(--house)`)} stroke-width=${p?`2.4`:`2`} filter=${u<El||p?`none`:`url(#city-glow)`}/>
            <g transform=${Rl(N.x,N.y,li(Dl))} fill="none" stroke=${m(`var(--house)`)} stroke-width=${Ml} stroke-linecap="round" stroke-linejoin="round">
              <path d=${Al} vector-effect="non-scaling-stroke"/>
            </g>
            <text class="node-val-sm" x=${N.x} y=${N.y+48} text-anchor="middle">${e.fmt.w(u)}</text>
            <text class="node-lbl-sm" x=${N.x} y=${N.y+64} text-anchor="middle">${h(`nodeHouse`)}</text>
          </g>`:I``}

    ${e.compact?i?I`${Ii(L.filter(({c:e})=>e.mode===`separate`),j,a.boxW,f)}${Ii(L.filter(({c:e})=>e.mode===`included`),N,a.boxW,f,Dl)}`:Ii(L,j,a.boxW,f):I``}

    <g style="pointer-events:none">
      <text class="node-lbl-sm" x=${O} y=${v[0].y+v[0].h+14} text-anchor="middle" opacity="0.75">${h(i?`nodeLoad`:`flowCityLoad`)}</text>
      <text class="node-val" x=${O} y=${v[0].y+v[0].h+34} text-anchor="middle">${e.fmt.w(d)}</text>
      <text class="node-lbl" x=${O} y=${v[0].y+v[0].h+50} text-anchor="middle">${be}</text>
    </g>

    ${L.map(({c:t,p:n,joinFrom:r,dragOrigin:o})=>{let s=m(t.mode===`included`?`var(--house)`:`var(--accent)`),c=t.missing||Math.abs(t.watts)<El,l=()=>{e.arrange||e.onSelect?.(t.id)},u=e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),l())},d=t.mode===`included`&&i?ye:ve,h=n=>ii(n,t.id,o,e.arrange,e.onPlaceConsumer,d),g=i&&t.mode===`included`?r:{x:r.x,y:Math.min(Math.max(n.y,a.facade.y+24),a.facade.y+a.facade.h-24)};return e.compact?I`<g class="flow-node" opacity=${c?.55:1} role="button" tabindex="0" aria-label=${t.name} @click=${l} @keydown=${u}>
          <circle cx=${n.x} cy=${n.y} r=${kl} fill=${p?`none`:`rgba(10,16,30,.9)`} stroke=${s} stroke-width=${p?`2.2`:`2`}/>
          <g transform=${Rl(n.x,n.y,li(kl))} fill="none" stroke=${s} stroke-width=${Ml} stroke-linecap="round" stroke-linejoin="round"><path d=${ct[t.icon]} vector-effect="non-scaling-stroke"/></g>
          <text font-size="14" font-weight="700" fill="var(--text)" x=${n.x-26} y=${n.y+5} text-anchor="end">${e.fmt.w(t.watts)}  ${zl(t.name,24)}</text>
        </g>`:I`<g class="flow-node ${e.arrange?`arrange`:``}" opacity=${c?.55:1} role="button" tabindex="0" aria-label=${t.name} @click=${l} @keydown=${u} @pointerdown=${h}>
        <path class="flow-line" d=${`M${g.x} ${g.y} C${g.x+28} ${g.y}, ${n.x-36} ${n.y}, ${n.x-Ol} ${n.y}`} stroke=${s}/>
        ${Ul(g,n,0,Ol,t.watts,s,f)}
        <circle cx=${n.x} cy=${n.y} r="26" fill=${p?`none`:`rgba(10,16,30,.9)`} stroke=${s} stroke-width=${p?`2.4`:`2`} filter=${c||p?`none`:`url(#city-glow)`}/>
        <g transform=${Rl(n.x,n.y,li(Ol))} fill="none" stroke=${s} stroke-width=${Ml} stroke-linecap="round" stroke-linejoin="round"><path d=${ct[t.icon]} vector-effect="non-scaling-stroke"/></g>
        <text class="node-val-sm" x=${n.x+36} y=${n.y-2} text-anchor="start">${e.fmt.w(t.watts)}</text>
        <text class="node-lbl-sm" x=${n.x+36} y=${n.y+14} text-anchor="start">${zl(t.name,18)}</text>
      </g>`})}
  </svg>`}var Yl=[`day`,`week`,`month`,`year`],Xl=(e,t)=>e(t===`day`?`calGrainDay`:t===`week`?`calGrainWeek`:t===`month`?`calGrainMonth`:`calGrainYear`),Zl=e=>Array.from({length:7},(t,n)=>new Date(2024,0,1+n).toLocaleDateString(e,{weekday:`narrow`}));function Ql(e){let t=new Date(e.getFullYear(),e.getMonth(),1),n=(t.getDay()+6)%7,r=new Date(t);r.setDate(1-n);let i=[];for(let t=0;t<42;t++){let n=new Date(r);n.setDate(r.getDate()+t),i.push({day:U(n),inMonth:n.getMonth()===e.getMonth()})}return i}function $l(e,t,n){let r=W(e);return t===`year`?r.setFullYear(r.getFullYear()+n*12):t===`month`?r.setFullYear(r.getFullYear()+n):r.setMonth(r.getMonth()+n),U(r)}function eu(e,t,n){let r=W(e);if(t===`year`){let e=r.getFullYear();return`${e-5} – ${e+1}`}return t===`month`?String(r.getFullYear()):r.toLocaleDateString(n,{month:`long`,year:`numeric`})}function tu(e){if(!e.open)return L;let{t}=e.i18n,n=U(),r=W(e.viewAnchor),i=e.selected,a=Zl(e.loc),o=(t,n)=>{let r=Nn(n);e.onPick(t,r)},s=e.grain===`month`?(()=>{let t=r.getFullYear(),a=W(n);return F`<div class="cal-grid months">
      ${Array.from({length:12},(n,r)=>{let s=new Date(t,r,1),c=U(s),l=s>a;return F`<button
          type="button"
          class="cal-cell ${i.grain===`month`&&i.start===`${t}-${String(r+1).padStart(2,`0`)}-01`?`sel`:``}"
          ?disabled=${l}
          @click=${()=>o(`month`,Nn(c))}
        >${s.toLocaleDateString(e.loc,{month:`short`})}</button>`})}
    </div>`})():e.grain===`year`?(()=>{let e=r.getFullYear(),t=Array.from({length:12},(t,n)=>e-5+n),a=W(n).getFullYear();return F`<div class="cal-grid years">
      ${t.map(e=>{let t=`${e}-01-01`;return F`<button
          type="button"
          class="cal-cell ${i.grain===`year`&&W(i.start).getFullYear()===e?`sel`:``}"
          ?disabled=${e>a}
          @click=${()=>o(`year`,Nn(t))}
        >${e}</button>`})}
    </div>`})():(()=>{let t=Ql(r);return F`<div class="cal-weekdays">${a.map(e=>F`<span>${e}</span>`)}</div>
      <div class="cal-grid days" role="grid">
        ${t.map(({day:t,inMonth:r})=>{let a=t>n,s=i.grain===`day`&&i.start===t,c=t===n,l=i.grain===`week`&&t>=i.start&&t<i.end;return F`<button
            type="button"
            class="cal-cell ${r?``:`muted`} ${s?`sel`:``} ${l?`in-week`:``} ${c?`today`:``}"
            ?disabled=${a}
            @click=${()=>o(e.grain===`week`?`week`:`day`,t)}
          >${W(t).getDate()}</button>`})}
      </div>`})();return F`<div class="cal-backdrop" @click=${e.onClose}></div>
    <div class="cal-pop" role="dialog" aria-label=${t(`dayPick`)} @click=${e=>e.stopPropagation()}>
      <div class="seg cal-grains" role="group">
        ${Yl.map(n=>F`<button
              type="button"
              class=${e.grain===n?`active`:``}
              aria-pressed=${e.grain===n}
              @click=${()=>e.onGrain(n)}
            >${Xl(t,n)}</button>`)}
      </div>
      <div class="cal-head">
        <button type="button" class="day-nav-btn" aria-label=${t(`dayPrev`)} @click=${()=>e.onViewAnchor($l(e.viewAnchor,e.grain,-1))}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
        <span class="cal-title">${eu(e.viewAnchor,e.grain,e.loc)}</span>
        <button type="button" class="day-nav-btn" aria-label=${t(`dayNext`)} @click=${()=>e.onViewAnchor($l(e.viewAnchor,e.grain,1))}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        </button>
      </div>
      ${s}
      <button type="button" class="cal-today" @click=${()=>o(e.grain,n)}>${t(`periodToday`)}</button>
    </div>`}function nu(e){return/[",\n\r]/.test(e)?`"${e.replace(/"/g,`""`)}"`:e}function ru(e){return e.map(e=>e.map(nu).join(`,`)).join(`
`)}function iu(e,t){let n=new Blob([`\uFEFF${ru(t)}`],{type:`text/csv;charset=utf-8`}),r=document.createElement(`a`);r.href=URL.createObjectURL(n),r.download=e,r.click(),URL.revokeObjectURL(r.href)}var au=e=>!e||e.state===`unknown`||e.state===`unavailable`?`–`:e.state,ou={off:`noPlanOff`,slots:`noPlanSlots`,threshold:`noPlanThreshold`,computing:`planComputing`,no_prices:`noPlanPrices`,no_profile:`noPlanProfile`,no_room:`noPlanRoom`,no_plan:`noPlan`},X=(e,t)=>e.hass.states[t],su=(e,t)=>X(e,t)?.attributes??{},Z=e=>typeof e==`number`&&Number.isFinite(e)?e:void 0,cu=(e,t)=>F`${e}<small>${t}</small>`,lu=(e,t)=>{let n=su(e,t);if(n.simulation!==`dynamic_buy_price`)return;let r=Z(n.simulation_dynamic_eur);if(r===void 0)return;let i=n.simulation_kind===`saving`?`saving`:`cost`,a=n.simulation_comparable===!0;return{sim:r,delta:a?Z(n.simulation_delta_eur):void 0,kind:i,comparable:a}},Q=(e,t)=>F`<div class="row"><span>${e}</span><b>${t}</b></div>`,uu=e=>[[`time`,`soc_pct`,`pv_w`,`house_w`,`grid_w`,`phase`],...e.trajectory_points.map((t,n)=>[new Date(t[0]).toISOString(),String(t[1]),String(e.pv_points[n]?.[1]??``),String(e.house_points[n]?.[1]??``),String(e.grid_points[n]?.[1]??``),e.trajectory_phases[n]??``])],du=e=>[[`time`,`phase`,`reason`],...(e.timeline??[]).map(e=>[new Date(e.ts).toISOString(),e.phase,e.reason])],fu=e=>H(X(e,z.debug)),pu=e=>{let t=X(e,z.debugLog),n=t?.attributes?.lines;if(Array.isArray(n)&&n.length>0)return n.map(String).join(`
`);let r=t?.state;return!r||r===`unknown`||r===`unavailable`?e.i18n.t(`debugEmpty`):r};function mu(e,t,n){return F`<div class="soc-gauge" role="img" aria-label=${`${Math.round(e)}% ${t}`}>
    <div class="soc-disc" style=${`background:${gr(e,n)}`}></div>
    <div class="soc-readout">
      <b>${Math.round(e)}%</b>
      <span>${t}</span>
    </div>
  </div>`}function hu(e){return F`<p class="reserve-hint"><i></i>${e}</p>`}function gu(e,t,n,r,i){let a=sc(n);return F`<div class="soc-pack">
    ${lc(`${Math.round(e)}% ${t}`,e,a,{live:!0,reserve:r})}
    <div class="soc-pack-readout">
      <b>${Math.round(e)}%</b>
      <span>${t}</span>
    </div>
    ${i?hu(i):L}
  </div>`}function _u(e,t,n,r){let{t:i}=e.i18n,a=au(X(e,z.autonomy)),o=an(a===`–`?void 0:a),s=o===void 0?t??0:Math.min(100,o/12*100),c=nn(su(e,z.trajectory)),l=c?un(c.trajectory_points,c.grid_points,{reserve:r,currentSoc:t,currentGrid:V(X(e,z.grid)),battery:c.battery_points}):void 0,u=l?.peakSoc,d=Math.max(0,Math.min(100,u??t??0)),f=Math.max(0,Math.min(100,t??0)),p=r!==void 0&&Number.isFinite(r)?Math.max(0,Math.min(100,r)):void 0,m=[l?l.peakAt===void 0?i(`forecastNoPeak`):i(l.peakDay===`today`?`forecastPeakToday`:`forecastPeakTomorrow`,{v:e.fmt.time(l.peakAt)}):void 0,l?.floorAt===void 0?void 0:i(l.floorKind===`up`?`forecastFloorReach`:p?`forecastFloor`:`forecastEmpty`,{v:e.fmt.time(l.floorAt)}),l?l.gridImportKind===`ongoing`?i(`forecastGridOngoing`):l.gridImportKind===`until`&&l.gridImportAt!==void 0?i(`forecastGridUntil`,{v:e.fmt.time(l.gridImportAt)}):l.gridImportKind===`starts`&&l.gridImportAt!==void 0?i(`forecastGrid`,{v:e.fmt.time(l.gridImportAt)}):i(`forecastNoGrid`):void 0,n!==void 0&&(u===void 0||Math.round(n)!==Math.round(u))?i(`tagTargetSoc`,{v:Math.round(n)}):void 0].filter(Boolean);return F`<div class="soc-metrics">
    <div class="soc-metric">
      <div class="soc-metric-head">
        <span>${i(`forecastPeak`)}</span>
        <b>${u===void 0?`–`:`${Math.round(u)}%`}</b>
      </div>
      <div class="soc-track" role="img" aria-label=${`${i(`forecastPeak`)} ${u===void 0?`–`:`${Math.round(u)}%`}`}>
        ${p===void 0?L:F`<i class="soc-track-reserve" style="width:${p}%"></i>`}
        <i class="soc-track-fill" style="width:${f}%"></i>
        ${u===void 0?L:F`<i class="soc-track-mark" style="left:${d}%"></i>`}
      </div>
      ${m.length?F`<div class="soc-metric-sub">
            ${m.map((e,t)=>F`${t?F`<span class="soc-metric-sep" aria-hidden="true">·</span>`:L}<span>${e}</span>`)}
          </div>`:L}
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
  </div>`}var vu=(e,t,n)=>{if(n(z.unjustified))return t(`kpiGridBatWarn`);let r=X(e,z.phase)?.state;if(r===`reserve_protection`)return t(`kpiGridBatReserve`);if(r===`emergency`)return t(`kpiGridBatEmergency`);let i=String(X(e,z.gridToBattery)?.attributes?.charge_reason??``);return i===`reserve`?t(`kpiGridBatReserve`):i===`emergency`?t(`kpiGridBatEmergency`):i===`justified`&&n(z.fixedReserve)?t(`kpiGridBatReserve`):t(i===`justified`||i===`curtailment`||i===`feed_in_limit`?`kpiGridBatJustified`:`kpiGridBatSub`)};function yu(e){let{t}=e.i18n,n=V(X(e,z.soc)),r=V(X(e,z.targetSoc)),i=V(X(e,z.battery)),a=t=>H(X(e,t)),o=a(z.reachable),s=[[t(`chipUnreachable`),!o,`warn`],[t(`chipChargeLock`),a(z.chargeLock),`warn`],[t(`chipDischargeLock`),a(z.dischargeLock),`warn`],[t(`chipHt`),a(z.htProtect),`warn`],[t(`chipCurtail`),a(z.curtail),`warn`],[t(`chipEmergency`),a(z.emergency),`warn`],[t(`chipFeedIn`),a(z.feedInLimit),`warn`],[t(`chipReserveCharge`),X(e,z.phase)?.state===`reserve_protection`,`on`],[t(`chipGridCharge`),a(z.gridCharge),`on`],[t(`chipBatteryPriority`),a(z.batteryPriority),`warn`],[t(`chipLowYield`),a(z.lowYield),`warn`]].filter(([,e])=>e),c=e.balanceRange,l=c.grain===`day`&&c.live,u=(t,n,r=l?!0:c.grain===`day`&&`day`)=>{let i=r===`day`?e.daySparks?.[t]:r?e.sparks?.[t]:void 0;return i?.length?F`<maestro-chart
      class="spark"
      .options=${Ji(`spark-${t}-${r===`day`?c.start:`live`}`,[e.theme,i],()=>yr(i,n))}
    ></maestro-chart>`:L},d=(e,t)=>u(e,t,l?!0:c.grain===`day`&&`day`),f=xt(e.consumers,{arrange:e.arrangeConsumers}),p=e.consumers.some(e=>e.mode===`separate`),m=e.flowStyle===`nodes`&&p,h=e.flowStyle===`city`?void 0:e.flowStyle===`blob`?wl(e.mobile,f.length,p):m?Xc(e.mobile,f.length):Fi(e.mobile,f.length),g=e.flowStyle===`blob`?Tl:e.flowStyle===`city`?Jl:m?Zc:Li,_=t=>l?V(X(e,z[t])):e.rangeSums?.[t],v=_,y=l?V(X(e,z.balance)):zn({feedRevenue:v(`feedRevenue`),saving:v(`saving`),costToday:v(`costToday`),wear:v(`wear`)}),b=!l&&e.rangeSums!==void 0&&y===void 0&&_(`costNet`)===void 0&&_(`saving`)===void 0,x=t=>`${e.fmt.n(t,2)} €`,S=c.grain===`day`?(c.live,`whenToday`):c.grain===`week`?`whenWeek`:c.grain===`month`?`whenMonth`:`whenYear`,C=c.grain===`day`&&!c.live?e.fmt.day(W(c.start)):c.live?t(S):Ln(c,e.fmt.loc,t(`periodToday`)),ee=C,w=t(c.grain===`day`?`groupToday`:c.grain===`week`?`groupWeek`:c.grain===`month`?`groupMonth`:`groupYear`),T=t(c.grain===`day`?`balanceTitle`:c.grain===`week`?`balanceWeek`:c.grain===`month`?`balanceMonth`:`balanceYear`),te=y===void 0||y===0?``:y>0?`pos`:`neg`,E=U(),D=(n,r=l)=>{if(!r)return L;let i=lu(e,n);if(!i)return L;let a=L;if(!i.comparable)a=F`<span class="sim-delta muted">${t(`kpiSimPending`)}</span>`;else if(i.delta!==void 0&&Math.abs(i.delta)>=.005){let n=e.fmt.n(Math.abs(i.delta),2),r=i.kind===`cost`?i.delta<0:i.delta>0,o=i.kind===`cost`?t(i.delta>0?`kpiSimCostlier`:`kpiSimCheaper`,{v:n}):t(i.delta>0?`kpiSimMoreSaving`:`kpiSimLessSaving`,{v:n});a=F`<span class="sim-delta ${r?`pos`:`neg`}">${o}</span>`}return F`<div class="sim-dyn">${t(`kpiSimDynamic`,{v:e.fmt.n(i.sim,2)})} ${a}</div>`},O=Ln(c,e.fmt.loc,t(`periodToday`)),ne=In(c),k=F`<div class="day-nav cal-nav" role="group" aria-label=${t(`dayNav`)}>
      <button
        type="button"
        class="day-nav-btn"
        aria-label=${t(`dayPrev`)}
        @click=${()=>e.onBalanceSelect(c.grain,Fn(c.grain,c.anchor,-1))}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>
      </button>
      <div class="day-nav-pick">
        <button type="button" class="day-nav-date" aria-label=${t(`dayPick`)} aria-expanded=${e.calOpen} @click=${()=>e.onCalOpen(!e.calOpen)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>
          <span class="day-nav-label">${O}</span>
        </button>
        ${tu({open:e.calOpen,grain:c.grain,selected:c,viewAnchor:e.calViewAnchor,i18n:e.i18n,loc:e.fmt.loc,onClose:()=>e.onCalOpen(!1),onGrain:t=>{e.onCalViewAnchor(c.anchor),e.onBalanceSelect(t,c.anchor)},onViewAnchor:e.onCalViewAnchor,onPick:(t,n)=>{e.onBalanceSelect(t,n),e.onCalOpen(!1)}})}
      </div>
      <button
        type="button"
        class="day-nav-btn"
        aria-label=${t(`dayNext`)}
        ?disabled=${!ne}
        @click=${()=>e.onBalanceSelect(c.grain,Fn(c.grain,c.anchor,1))}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
      </button>
      ${c.live&&c.grain===`day`?L:F`<button type="button" class="day-nav-today" @click=${()=>e.onBalanceSelect(`day`,E)}>${t(`periodToday`)}</button>`}
    </div>`,A=e.forcePowerDraft??V(X(e,z.forceDischargePower))??100,re=e.reserveDraft??V(X(e,z.fixedReserveSoc))??0,ie=a(z.fixedReserve),ae=ie?`${t(`fixedReserve`)} ${t(`ctrlReserveSoc`,{v:Math.round(re)})}`:void 0,j=[a(z.ctrlPredictive)?t(`modePredictive`):``,a(z.ctrlPlanShadow)?t(`modeShadow`):``].filter(Boolean).join(` · `),M=t=>e.fmt.n(V(X(e,z[t]))),oe=St(e.consumers,V(X(e,z.wallboxEnergy))),N=()=>{e.collapsed.has(`today`)&&e.onToggleGroup(`today`)},P=(t,n,r,i,a,o=`grid kpis`)=>{let s=!e.collapsed.has(t);return F`<section class="group">
      <div class="group-bar">
        <button type="button" class="group-head ${s?`open`:``}" aria-expanded=${s} @click=${()=>e.onToggleGroup(t)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
          <span>${n}</span>
          ${s?L:r}
        </button>
        ${a??L}
      </div>
      ${s?F`<div class=${o}>${i}</div>`:L}
    </section>`};return F`
    ${jo(e)}
    <div class="grid live-top">
      <div class="card">
        <div class="card-head">
          <div>
            <h3>${t(`flowTitle`)}</h3>
            <div class="sub live-state">${t(`flowSub`)}<i class="live-dot ${o?`ok`:`bad`}" role="img" aria-label=${t(o?`chipReachable`:`chipUnreachable`)}></i></div>
            ${j?F`<div class="sub mode-line">${j}</div>`:L}
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
              ${e.flowOptsOpen?ju(e):L}
            </div>
          </div>
        </div>
        ${e.arrangeConsumers?F`<div class="flow-arrange-bar">
              <p class="flow-arrange-hint">${t(`arrangeHint`)}
                <button type="button" class="linkish" @click=${e.onResetConsumerPlaces}>${t(`arrangeReset`)}</button>
              </p>
              <button type="button" class="btn primary" @click=${e.onToggleArrange}>${t(`arrangeDone`)}</button>
            </div>`:L}
        <div class="flow-wrap ${e.flowStyle} ${e.arrangeConsumers?`arrange`:``}" style=${h?`height:${h}px`:L}>
          ${g({pv:V(X(e,z.pv)),house:V(X(e,z.house)),grid:V(X(e,z.grid)),battery:i,loadMax:V(X(e,z.inverterPower)),soc:n,consumers:f,consumerPlaces:e.consumerPlaces,arrange:e.arrangeConsumers,onPlaceConsumer:e.onPlaceConsumer,motion:e.motion,onSelect:e.onFlowNode,compact:e.mobile,outline:e.theme!==`dark`,fmt:e.fmt,i18n:e.i18n})}
        </div>
        <button type="button" class="flow-day" @click=${N} aria-label=${t(`flowDayOpen`)}>
          <span class="flow-day-label">${t(`flowDay`)}</span>
          <span>${t(`nodePv`)} ${M(`pvToday`)}</span>
          <span class="flow-day-sep" aria-hidden="true">·</span>
          <span>${t(`nodeHouse`)} ${M(`houseToday`)}</span>
          <span class="flow-day-sep" aria-hidden="true">·</span>
          <span>${t(`flowDayImport`)} ${M(`importToday`)}</span>
          <span class="flow-day-sep" aria-hidden="true">·</span>
          <span>${t(`flowDayFeed`)} ${M(`feedToday`)}</span>
          <span class="flow-day-unit">kWh</span>
        </button>
        ${oe.length?F`<div class="flow-day flow-day-extra">
              <span class="flow-day-label">${t(`flowDaySeparate`)}</span>
              ${oe.map((t,n)=>F`${n?F`<span class="flow-day-sep" aria-hidden="true">·</span>`:L}
                  <span>${t.name} ${e.fmt.n(t.kwh)}</span>`)}
              <span class="flow-day-unit">kWh</span>
            </div>`:L}
        ${e.consumerOverflow?F`<p class="err">${t(`consumersOverflow`)}</p>`:L}
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
              ${ya.map(n=>F`<button
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
          ${n===void 0?F`<p class="empty">${t(`unavailable`)}</p>`:e.batteryStyle===`pack`?gu(n,t(`stateOfCharge`),i,ie?re:void 0,ae):F`${mu(n,t(`stateOfCharge`),ie?re:void 0)}
                ${ae?hu(ae):L}`}
        </div>
        ${_u(e,n,r,ie?re:void 0)}
        <button type="button" class="soc-ctrl-btn" @click=${()=>e.onOpenBatteryCtrl()}>
          <span class="soc-ctrl-copy">
            <span class="soc-ctrl-label">${t(`batteryCtrl`)}</span>
            <span class="soc-ctrl-meta">${Au(e,A,re)}</span>
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        </button>
      </div>
    </div>
    ${s.length?F`<div class="chips">
          ${s.map(([e,,t])=>F`<span class="chip ${t}"><i></i>${e}</span>`)}
        </div>`:L}
    <div class="range-bar">${k}</div>
    ${b?F`<p class="hint range-empty">${t(`rangeEmpty`)}</p>`:L}
    ${P(`today`,w,F`<b class="group-sum">${x(_(`costNet`))}<small>${t(`groupNet`)}</small></b>`,F`
      <div class="card kpi">
        <h3>${t(`kpiCost`,{when:C})}</h3>
        <div class="v">${cu(e.fmt.n(_(`costNet`),2),`€`)}${D(z.costNet)}</div>
        <div class="delta">${t(`kpiCostSub`)}</div>
        ${u(`costNet`,G.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiSaving`,{when:C})}</h3>
        <div class="v">${cu(e.fmt.n(_(`saving`),2),`€`)}${D(z.saving)}</div>
        <div class="delta">${t(`kpiSavingSub`)}</div>
        ${u(`saving`,G.gridOut)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiSelf`,{when:C})}</h3>
        <div class="v">${cu(e.fmt.n(_(`selfUse`)),`kWh`)}</div>
        <div class="delta">${t(`kpiSelfSub`,{imp:e.fmt.n(_(`importToday`)),feed:e.fmt.n(_(`feedToday`))})}</div>
        ${u(`selfUse`,G.pv)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiBattery`,{when:C})}</h3>
        <div class="v">${cu(e.fmt.n(_(`chargedToday`)),`kWh`)}</div>
        <div class="delta">${t(`kpiBatterySub`,{out:e.fmt.n(_(`dischargedToday`))})}</div>
        ${u(`chargedToday`,G.bat)}
      </div>
    `)}
    ${P(`balance`,T,F`<b class="group-sum ${te}">${x(y)}</b>`,F`
      <div class="card kpi">
        <h3>${t(`kpiCostGross`)}</h3>
        <div class="v">${cu(e.fmt.n(v(`costToday`),2),`€`)}${D(z.costToday,l)}</div>
        <div class="delta">${t(`kpiCostGrossSub`)}</div>
        ${d(`costToday`,G.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiRevenue`)}</h3>
        <div class="v">${cu(e.fmt.n(v(`feedRevenue`),2),`€`)}</div>
        <div class="delta">${t(`kpiRevenueSub`,{when:ee})}</div>
        ${d(`feedRevenue`,G.gridOut)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiWear`)}</h3>
        <div class="v">${cu(e.fmt.n(v(`wear`),2),`€`)}</div>
        <div class="delta">${t(`kpiWearSub`)}</div>
        ${d(`wear`,G.accent2)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiBalance`)}</h3>
        <div class="v">${cu(e.fmt.n(y,2),`€`)}</div>
        <div class="delta">${t(`kpiBalanceSub`)}</div>
        ${d(`balance`,G.accent)}
      </div>
      <div class="card kpi ${l&&a(z.unjustified)?`alert`:``}">
        <h3>${t(`kpiGridBat`)}</h3>
        <div class="v">${cu(e.fmt.n(v(`gridToBattery`)),`kWh`)}</div>
        <div class="delta">${l?vu(e,t,a):t(`kpiGridBatSub`)}</div>
        ${d(`gridToBattery`,G.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiWallbox`,{when:ee})}</h3>
        <div class="v">${cu(e.fmt.n(v(`wallboxEnergy`)),`kWh`)}</div>
        <div class="delta">${t(`kpiWallboxSub`)}</div>
        ${d(`wallboxEnergy`,G.house)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiFeedLimit`)}</h3>
        <div class="v">${cu(e.fmt.n(v(`curtailAvoided`)),`kWh`)}</div>
        <div class="delta">${t(`kpiFeedLimitSub`,{n:e.fmt.n(v(`feedInInterventions`),0),dc:e.fmt.n(v(`feedInAvoided`))})}</div>
        ${d(`curtailAvoided`,G.pv)}
      </div>
    `)}
    ${(()=>{let n=e.pulseDays??[],r=n.filter(e=>e.balance!==void 0),i=r.length?r.reduce((e,t)=>e+t.balance,0):void 0,a=i===void 0||i===0?``:i>0?`pos`:`neg`,o=r.map(e=>[e.ts,e.balance]),s=a===`neg`?G.gridIn:G.gridOut,c=e.pulseState??`idle`,l=c===`error`?F`<p class="err">${t(`historyFailed`)}</p>`:c===`loading`&&!n.length?F`<p class="hint">${t(`loading`)}</p>`:r.length?F`<maestro-chart
                  class="pulse-chart"
                  .options=${Ji(`pulse-${e.pulseRange}`,[e.theme,e.fmt.loc,n],()=>Tr({days:n,fmt:e.fmt,i18n:e.i18n,onDay:t=>e.onBalanceSelect(`day`,t)}))}
                ></maestro-chart>`:F`<p class="hint">${t(`pulseEmpty`)}</p>`;return P(`balancePulse`,t(`pulseTitle`),F`<span class="pulse-sum">
          ${o.length?F`<maestro-chart class="pulse-spark" .options=${Ji(`pulse-spark-${e.pulseRange}`,[e.theme,o],()=>yr(o,s))}></maestro-chart>`:L}
          <b class="group-sum ${a}">${x(i)}</b>
        </span>`,l,F`<div class="seg period" role="group" aria-label=${t(`pulseTitle`)}>
          ${[`week`,`month`].map(n=>F`<button class=${e.pulseRange===n?`active`:``} aria-pressed=${e.pulseRange===n} @click=${()=>e.onPulseRange(n)}>${t(n===`week`?`periodWeek`:`periodMonth`)}</button>`)}
        </div>`,`pulse-body`)})()}`}var bu=(e,t)=>e(t===`ok`?`qualityOk`:t===`pv_fallback`?`qualityPv`:t===`consumption_fallback`?`qualityConsumption`:t===`both_fallback`?`qualityBoth`:`qualityUnknown`),xu=(e,t)=>{let n=V(X(e,t));return n===void 0?`–`:`${Math.round(n)} %`};function Su(e){let{t}=e.i18n,n=su(e,z.trajectory),r=nn(n);if(!r)return F`<div class="card"><p class="empty">${t(`noForecast`)}</p></div>`;let i=su(e,z.plan),a=i.controlling===!0?hn(mn(i.plan_slots)):void 0,o=!!a&&a.length>=2,s=[[G.bat,t(o?`legendPlanSoc`:`legendSoc`)],[G.pv,t(`legendPv`)],[G.house,t(`legendHouse`)],[G.gridIn,t(`legendImport`)],[G.gridOut,t(`legendFeed`)]],c=o?Math.min(...a.map(e=>e[1])):Z(n.min_soc),l=o?Math.max(...a.map(e=>e[1])):Z(n.max_soc),u=(e,t)=>F`<div class="card stat"><h3>${e}</h3><div class="v">${t}</div></div>`;return F`
    <div class="card">
      <div class="chart-head">
        <div class="grow">
          <h3>${t(o?`chartTitlePlan`:`chartTitle`)}</h3>
          <div class="legend">${s.map(([e,t])=>F`<span><i style="background:${e}"></i>${t}</span>`)}</div>
        </div>
        <button class="toggle ${e.showIst?`active`:``}" aria-pressed=${e.showIst} @click=${e.onToggleIst}>${t(`actualOverlay`)}</button>
        <button class="toggle" @click=${()=>iu(`maestro-prognose.csv`,uu(r))}>${t(`exportCsv`)}</button>
        <div class="seg" role="group">
          ${[6,12,24].map(n=>F`<button class=${e.range===n?`active`:``} aria-pressed=${e.range===n} @click=${()=>e.onRange(n)}>${t(`hoursShort`,{h:n})}</button>`)}
        </div>
      </div>
      <maestro-chart
        id="fc-main"
        .options=${Ji(`forecast`,[e.theme,X(e,z.trajectory),X(e,z.plan),X(e,z.targetSoc)?.state,e.ist,e.showIst,e.fmt.loc],()=>pr({traj:r,targetSoc:V(X(e,z.targetSoc)),planSoc:o?a:void 0,ist:e.ist,showIst:e.showIst,fmt:e.fmt,i18n:e.i18n}))}
      ></maestro-chart>
      <maestro-chart id="fc-brush" .options=${Ji(`brush`,[e.theme,X(e,z.trajectory)],()=>mr(r))}></maestro-chart>
    </div>
    <div class="grid stat-row">
      ${u(t(`statMinMax`),F`${Math.round(c??0)}<small>%</small> / ${Math.round(l??0)}<small>%</small>`)}
      ${u(t(`statImport`),cu(e.fmt.n(Z(n.grid_draw_kwh)),`kWh`))}
      ${u(t(`statFeed`),cu(e.fmt.n(Z(n.grid_feed_in_kwh)),`kWh`))}
      ${u(t(`statAutarky`),cu(e.fmt.n(Z(n.self_sufficiency_pct)),`%`))}
      ${u(t(`statPvTomorrow`),cu(e.fmt.n(V(X(e,z.pvTomorrow))),`kWh`))}
    </div>
    <div class="grid stat-row">
      ${u(t(`qualityLabel`),bu(t,X(e,z.forecastQuality)?.state))}
      ${u(t(`statP10`),cu(e.fmt.n(V(X(e,z.p10))),`kWh`))}
      ${u(t(`statDeficit`),cu(e.fmt.n(V(X(e,z.deficit))),`kWh`))}
      ${u(t(`statYield`),F`${e.fmt.n((()=>{let t=V(X(e,z.yieldRatio));return t===void 0?void 0:t*100})())}<small>%</small>`)}
    </div>
    <p class="sub yield-note">${t(`statYieldSub`,{today:e.fmt.n(V(X(e,z.yieldToday))),ref:e.fmt.n(V(X(e,z.yieldRef)))})}</p>`}var Cu=(e,t,n)=>F`<div class="row"><span>${e}</span><b style=${n?`color:${n}`:``}>${t}</b></div>`;function wu(e,t){let{t:n}=e.i18n,{fmt:r}=e,i=Z(t.floor_pct),a=Z(t.ceiling_pct),o=Z(t.efficiency),s=Z(t.min_spread),c=Z(t.wear_eur_per_kwh),l=Z(t.safety_factor);return i===void 0&&a===void 0&&o===void 0&&s===void 0?L:F`<div class="plan-diag">
    <h4>${n(`planDiag`)}</h4>
    ${i===void 0?L:Cu(n(`planFloor`),`${r.n(i,0)} %`)}
    ${a===void 0?L:Cu(n(`planCeiling`),`${r.n(a,0)} %`)}
    ${o===void 0?L:Cu(n(`planEfficiency`),r.n(o,2))}
    ${s===void 0?L:Cu(n(`planMinSpread`),`${r.n(s*100,1)} ct/kWh`)}
    ${c===void 0?L:Cu(n(`planWear`),`${r.n(c,3)} €/kWh`)}
    ${l===void 0?L:Cu(n(`planSafety`),r.n(l,2))}
  </div>`}function Tu(e){let{t}=e.i18n,n=su(e,z.plan),r=mn(n.plan_slots),i=Es(e.hass),a=rc({...e,priceSensor:e.options.ready?!!e.options.options.price_sensor:void 0}),o=wu(e,n);if(!r.length){let e=vn(i,n),r=typeof n.message==`string`&&n.message&&e!==`computing`?n.message:``;return F`<div class="card">
      <div class="empty plan-empty ${e===`computing`?`busy`:``}" role="status">
        ${e===`computing`?F`<span class="spinner" aria-hidden="true"></span>`:L}
        <p>${t(ou[e])}</p>
        ${r?F`<p class="sub">${r}</p>`:L}
      </div>
      ${o}
    </div>${a}`}let s=_n(r),c=[[G.gridOut,t(`legendCharge`)],[G.pv,t(`legendHold`)],[G.bat,t(`legendRelease`)]],l=typeof n.known_until==`string`?e.fmt.dayTime(n.known_until):`–`,u=t=>`${e.fmt.n(t.price*100)} ct · ${t.start_local}`;return F`
    <div class="grid plan-top">
      <div class="card">
        <div class="chart-head">
          <div class="grow">
            <h3>${t(`priceTitle`)}</h3>
            <div class="legend">
              ${c.map(([e,t])=>F`<span><i style="background:${e}"></i>${t}</span>`)}
              <span><i style="background:#fff;height:2px;border-radius:0"></i>${t(`legendPlanSoc`)}</span>
            </div>
          </div>
          <span class="badge">${n.shadow_mode?t(`planShadow`):t(`planActive`)}</span>
        </div>
        <maestro-chart .options=${Ji(`plan`,[e.theme,X(e,z.plan),e.fmt.loc],()=>hr({slots:r,fmt:e.fmt,i18n:e.i18n}))}></maestro-chart>
        <div class="strip">
          ${r.map(t=>F`<div class="slot ${pn(t)}" title="${t.start_local} · ${e.fmt.n(t.price*100)} ct"></div>`)}
        </div>
        <div class="strip-axis">${r.filter((e,t)=>t%4==0).map(e=>F`<span>${e.start_local}</span>`)}</div>
      </div>
      <div class="card plan-kpi">
        <div>
          <h3>${t(`planTitle`)}</h3>
          <div class="plan-state">${au(X(e,z.plan))}</div>
          <div class="sub msg">${typeof n.message==`string`?n.message:``}</div>
        </div>
        <div>
          ${Cu(t(`planStrategy`),i?e.i18n.option(i):`–`)}
          ${Cu(t(`planGridCharge`),`${e.fmt.n(Z(n.total_grid_charge_kwh),2)} kWh`)}
          ${Cu(t(`planSaving`),`${e.fmt.n(Z(n.expected_saving_eur),2)} €`,`var(--ok)`)}
          ${s?Cu(t(`planCheapest`),u(s.min)):L}
          ${s?Cu(t(`planMostExpensive`),u(s.max)):L}
          ${Cu(t(`planKnownUntil`),l)}
        </div>
        ${o}
      </div>
    </div>
    ${a}`}var Eu=e=>{let t=Math.floor(e),n=Math.round((e-t)*60);return n?`${t}:${String(n).padStart(2,`0`)}`:String(t)};function Du(e){let t=su(e,z.autoStrategy).overrides;return t&&typeof t==`object`?t:{}}function Ou(e){let t=Du(e),n=Z(t.morning_cap_soc),r=Z(t.morning_cap_until_h);if(n!==void 0&&r!==void 0)return e.i18n.t(`autoCap`,{soc:Math.round(n),hour:Eu(r)})}function ku(e){let{t}=e.i18n;if(!H(X(e,z.ctrlAuto)))return{text:t(`autoOff`),tone:``};let n=su(e,z.autoStrategy),r=typeof n.objective==`string`&&n.objective?e.i18n.option(n.objective):`–`;if(n.fallback===!0)return{text:t(`autoData`,{goal:r}),tone:`warn`};if(typeof n.last_run!=`string`)return{text:t(`autoPending`,{goal:r}),tone:``};let i=V(X(e,z.autoSaving));return{text:t(`autoOn`,{goal:r,eur:i===void 0?`–`:`${i>0?`+`:``}${e.fmt.n(i,2)} €`}),tone:`on`}}function Au(e,t,n){let{t:r}=e.i18n,i=[];return H(X(e,z.forceDischarge))&&i.push(r(`controlsForceOn`,{v:e.fmt.w(t)})),H(X(e,z.fixedReserve))&&i.push(r(`controlsReserveOn`,{v:Math.round(n)})),H(X(e,z.ctrlAuto))&&i.push(ku(e).text),i.length?i.join(` · `):r(`batteryCtrlIdle`)}function ju(e){let{t}=e.i18n,n={nodes:{title:`flowStyleNodes`,hint:`flowStyleNodesHint`},blob:{title:`flowStyleBlob`,hint:`flowStyleBlobHint`},city:{title:`flowStyleCity`,hint:`flowStyleCityHint`}},r=e.consumers.length>0&&!e.mobile;return F`
    <div class="flow-opts-scrim" @click=${()=>e.onCloseFlowOpts()}></div>
    <div class="flow-opts-menu" role="dialog" aria-label=${t(`flowOptsTitle`)}>
      <div class="flow-opts-body">
        <section class="flow-opts-block">
          <b class="flow-opts-section">${t(`flowStyleLabel`)}</b>
          <div class="theme-choices flow-opts-choices" role="radiogroup" aria-label=${t(`flowStyleLabel`)}>
            ${Er.map(r=>F`<button
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
          ${r?F`<button
                type="button"
                class="btn flow-opts-action ${e.arrangeConsumers?`primary`:``}"
                aria-pressed=${e.arrangeConsumers}
                @click=${()=>{e.onToggleArrange(),e.onCloseFlowOpts()}}
              >${e.arrangeConsumers?t(`arrangeDone`):t(`arrangeConsumers`)}</button>`:L}
          <button
            type="button"
            class="btn flow-opts-action"
            @click=${()=>{e.onCloseFlowOpts(),e.onEditConsumers()}}
          >${t(`editConsumers`)}</button>
        </section>
      </div>
    </div>
  `}function Mu(e){let{t}=e.i18n,n=X(e,z.forceDischargePower),r=n?.attributes??{},i=typeof r.min==`number`?r.min:100,a=typeof r.max==`number`?r.max:1e4,o=typeof r.step==`number`?r.step:100,s=e.forcePowerDraft??V(n)??i,c=X(e,z.fixedReserveSoc),l=c?.attributes??{},u=typeof l.min==`number`?l.min:0,d=typeof l.max==`number`?l.max:100,f=typeof l.step==`number`?l.step:1,p=e.reserveDraft??V(c)??u,m=H(X(e,z.ctrlAuto)),h=su(e,z.autoStrategy),g=X(e,z.selAuto),_=Array.isArray(g?.attributes.options)?g.attributes.options:[],v=V(X(e,z.autoSaving)),y=typeof h.last_run==`string`,b=Ou(e),x=ku(e),S=m?h.fallback===!0?F`<p class="sub">${t(`autoFallback`)}</p>`:y?F`<p class="sub">${b??t(`autoNone`)}</p>`:L:L,C=(t,n)=>F`<button
    class="switch ${H(X(e,t))?`on`:``}"
    role="switch"
    aria-checked=${H(X(e,t))}
    aria-label=${n}
    ?disabled=${!X(e,t)||e.pending.has(t)}
    @click=${()=>e.onToggle(t)}
  ></button>`;return F`
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
            ${C(z.forceDischarge,t(`forceTitle`))}
            ${Xt({label:t(`ctrlForcePower`,{v:``}),min:i,max:a,step:o,value:s,disabled:!n||n.state===`unavailable`,onPreview:e.onPowerDraft,onCommit:e.onPowerCommit})}
          </div>
        </section>
        <section class="battery-ctrl-block">
          <div class="force">
            <div class="txt"><b>${t(`fixedReserve`)}</b><span>${t(`ctrlReserveSoc`,{v:Math.round(p)})}</span></div>
            ${C(z.fixedReserve,t(`fixedReserve`))}
            ${Xt({label:t(`fixedReserve`),min:u,max:d,step:f,value:p,unit:`%`,disabled:!c||c.state===`unavailable`,onPreview:e.onReserveDraft,onCommit:e.onReserveCommit})}
          </div>
        </section>
        <section class="battery-ctrl-block">
          <div class="force">
            <div class="txt"><b>${t(`autoTitle`)}</b><span class="grip-state ${x.tone}">${x.text}</span></div>
            ${C(z.ctrlAuto,t(`autoTitle`))}
          </div>
          <div class="force">
            <div class="txt"><b>${t(`autoObjective`)}</b></div>
            <select
              aria-label=${t(`autoObjective`)}
              .value=${g?.state??``}
              ?disabled=${!g||g.state===`unavailable`||e.pending.has(z.selAuto)}
              @change=${t=>e.onSelect(z.selAuto,t.target.value)}
            >
              ${_.map(t=>F`<option value=${t} ?selected=${t===g?.state}>${e.i18n.option(t)}</option>`)}
            </select>
          </div>
          ${m&&h.fallback!==!0&&v!==void 0?F`<div class="row"><span>${t(`autoSaving`)}</span><b>${v>0?`+`:``}${e.fmt.n(v,2)} €</b></div>`:L}
          ${S}
          <p class="sub">${t(`autoLiveHint`)}</p>
        </section>
      </div>
    </aside>
  `}var Nu=e=>typeof e==`string`&&e?e:typeof e==`number`&&Number.isFinite(e)?String(e):typeof e==`boolean`?e?`1`:`0`:`–`;function Pu(e){let{t}=e.i18n,n=su(e,z.autoStrategy),r=(t,n,r,i)=>Q(t,`${e.fmt.n(Z(n),r)} ${i}`);return F`
    ${Q(t(`autoTitle`),au(X(e,z.autoStrategy)))}
    ${Q(t(`autoObjective`),Nu(n.objective))}
    ${Q(t(`autoLastRun`),typeof n.last_run==`string`?e.fmt.dayTime(n.last_run):`–`)}
    ${Q(t(`autoFallback`),n.fallback===!0?t(`optYes`):n.fallback===!1?t(`optNo`):`–`)}
    ${typeof n.fallback_reason==`string`&&n.fallback_reason?Q(t(`autoReason`),n.fallback_reason):L}
    ${Q(t(`autoGrid`),Nu(n.grid_size))}
    ${Q(t(`autoSaving`),`${e.fmt.n(V(X(e,z.autoSaving)),2)} €`)}
    ${r(t(`autoDeltaDraw`),n.delta_grid_draw_kwh,2,`kWh`)}
    ${r(t(`autoDeltaFeed`),n.delta_grid_feed_in_kwh,2,`kWh`)}
    ${r(t(`autoDeltaCurtail`),n.delta_curtailed_kwh,2,`kWh`)}
    ${r(t(`autoDeltaSelf`),Z(n.delta_self_sufficiency)===void 0?void 0:Z(n.delta_self_sufficiency)*100,1,`%`)}
    ${Ou(e)?F`<p class="sub">${Ou(e)}</p>`:n.fallback===!1&&typeof n.last_run==`string`?F`<p class="sub">${t(`autoNone`)}</p>`:L}`}function Fu(e){let{t,phase:n}=e.i18n,r=su(e,z.explanation);if(typeof r.phase!=`string`)return F`<div class="card"><p class="empty">${t(`noDecision`)}</p></div>`;let i=V(X(e,z.soc)),a=Z(r.target_soc),o=typeof r.timestamp==`string`?e.fmt.time(r.timestamp):void 0,s=[a===void 0?null:t(`tagTargetSoc`,{v:Math.round(a)}),t(`tagTargetPower`,{v:e.fmt.w(Z(r.target_charge_power)??V(X(e,z.targetCharge))??0)}),r.battery_priority===!0?t(`tagBatteryPriority`):null,o?t(`tagSince`,{t:o}):null].filter(e=>!!e),c=(t,n)=>Z(t)??V(X(e,n)),l=c(r.charge_power_limit,z.chargeLimit),u=c(r.sent_charge_power_limit,z.sentChargeLimit),d=c(r.discharge_power_limit,z.dischargeLimit),f=c(r.sent_discharge_power_limit,z.sentDischargeLimit),p=Math.max(9e3,l??0,u??0,d??0,f??0),m=(n,r,i)=>F`
    <div class="limit-row">
      <div class="lbl"><span>${n}</span><span>${t(`limitTarget`,{a:r===void 0?t(`limitNone`):e.fmt.w(r),b:i===void 0?t(`limitNone`):e.fmt.w(i)})}</span></div>
      <div class="bar"><div class="soll" style="width:${(r??0)/p*100}%"></div><div class="sent" style="width:${(i??0)/p*100}%"></div></div>
    </div>`;return F`
    <div class="grid dec-top">
      <div class="card phase-hero">
        <h3>${t(`decisionPhase`)}</h3>
        <div class="phase-name">${n(r.phase)}</div>
        <div class="phase-reason">${typeof r.reason==`string`?r.reason:``}</div>
        <div class="chips">${s.map(e=>F`<span class="chip on"><i></i>${e}</span>`)}</div>
      </div>
      <div class="card">
        <h3>${t(`limitsTitle`)}</h3>
        <div class="sub lim-sub">${t(`limitsSub`)}</div>
        <div class="limits">
          ${m(t(`limitCharge`),l,u)}
          <div class="limit-row">
            <div class="lbl"><span>${t(`targetPower`)}</span><span>${e.fmt.w(Z(r.target_charge_power)??V(X(e,z.targetCharge))??0)}</span></div>
          </div>
          ${m(t(`limitDischarge`),d,f)}
          ${a===void 0?L:F`<div class="limit-row">
                <div class="lbl"><span>${t(`targetSoc`)}</span><span>${t(`limitSoc`,{a:Math.round(i??0),b:Math.round(a)})}</span></div>
                <div class="bar"><div class="soll" style="width:${a}%"></div><div class="sent" style="width:${i??0}%"></div></div>
              </div>`}
        </div>
      </div>
    </div>
    <div class="card tl-card">
      <div class="card-head">
        <h3>${t(`timelineTitle`)}</h3>
        <button class="toggle" ?disabled=${!e.timeline?.length} @click=${()=>e.timeline&&iu(`maestro-entscheidungen.csv`,du(e))}>${t(`exportCsv`)}</button>
      </div>
      ${e.timeline?.length?F`<div class="timeline">
            ${e.timeline.map(t=>F`<div class="tl-item">
                <div class="tl-time">${e.fmt.dayTime(t.ts)}</div>
                <div class="tl-phase">${n(t.phase)}</div>
                <div class="tl-reason">${t.reason}</div>
              </div>`)}
          </div>`:F`<p class="empty">${e.timeline?t(`timelineEmpty`):t(`loading`)}</p>`}
    </div>
    <div class="grid stat-row dec-extra">
      <div class="card">
        <h3>${t(`reserveTitle`)}</h3>
        <div class="rows">
          ${Q(t(`reserveSeasonal`),xu(e,z.seasonalReserve))}
          ${Q(t(`reserveAdaptive`),xu(e,z.adaptiveReserve))}
          ${Q(t(`reserveHt`),xu(e,z.htReserve))}
          ${Q(t(`reserveForward`),xu(e,z.forwardTarget))}
          ${Q(t(`targetSoc`),xu(e,z.targetSoc))}
        </div>
      </div>
      <div class="card">
        <h3>${t(`windowsTitle`)}</h3>
        <div class="rows">
          ${Q(t(`windowAstro`),au(X(e,z.astroStart)))}
          ${Q(t(`windowSeasonalEnd`),au(X(e,z.seasonalEnd)))}
          ${Q(t(`windowPvDelay`),au(X(e,z.pvDelayStart)))}
          ${Q(t(`windowTomorrow`),`${au(X(e,z.tomorrowStart))} – ${au(X(e,z.tomorrowEnd))}`)}
        </div>
      </div>
      <div class="card">
        <h3>${t(`autoTitle`)}</h3>
        <div class="rows">${Pu(e)}</div>
      </div>
    </div>
    <section class="group">
      <button type="button" class="group-head ${e.debugOpen?`open`:``}" aria-expanded=${e.debugOpen} @click=${e.onToggleDebug}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        <span>${t(`debugTitle`)}</span>
      </button>
      ${e.debugOpen?F`<div class="card debug-card">
            <div class="force">
              <div class="txt"><b>${t(`debugSwitch`)}</b></div>
              <button
                class="switch ${fu(e)?`on`:``}"
                role="switch"
                aria-checked=${fu(e)}
                aria-label=${t(`debugSwitch`)}
                ?disabled=${!X(e,z.debug)||e.pending.has(z.debug)}
                @click=${()=>e.onToggle(z.debug)}
              ></button>
            </div>
            <pre class="debug-log">${pu(e)}</pre>
          </div>`:L}
    </section>`}var Iu={off:`helpRuleOff`,force:`helpRuleForce`,emergency:`helpRuleEmergency`,feed:`helpRuleFeed`,reserve:`helpRuleReserve`,evcc:`helpRuleEvcc`,price:`helpRulePrice`,ht:`helpRuleHt`,hold:`helpRuleHold`,morning:`helpRuleMorning`,cap:`helpRuleCap`,astro:`helpRuleAstro`,hard:`helpRuleHard`,floor:`helpRuleFloor`,low:`helpRuleLow`,grid:`helpRuleGrid`,corridor:`helpRuleCorridor`,spread:`helpRuleSpread`,curtail:`helpRuleCurtail`,idle:`helpRuleIdle`},Lu=()=>vo.map(e=>({id:e.id,title:e.label,body:Iu[e.id]??`helpRuleIdle`,actions:[{label:`helpOpenSettings`,action:{kind:`screen`,screen:`settings`,group:e.group}}]})),$=(e,t,n,r)=>({id:e,title:t,body:n,...r}),Ru=[{id:`start`,title:`helpChStart`,sections:[$(`start-lead`,`helpStartLead`,`helpStartLeadBody`,{links:[{id:`rules`,label:`helpSeeRules`}],actions:[{label:`helpOpenSetup`,action:{kind:`screen`,screen:`settings`,group:`setup`}}]}),$(`start-steps`,`helpStartSteps`,`helpStartStepsBody`)]},{id:`live`,title:`helpChLive`,sections:[$(`live-page`,`helpChLive`,`helpLiveBody`)]},{id:`forecast`,title:`helpChForecast`,sections:[$(`forecast-page`,`helpChForecast`,`helpForecastBody`)]},{id:`plan`,title:`helpChPlan`,sections:[$(`plan-page`,`helpChPlan`,`helpPlanBody`,{actions:[{label:`helpOpenSettings`,action:{kind:`screen`,screen:`settings`,group:`tariff`}}]})]},{id:`decision`,title:`helpChDecision`,sections:[$(`decision-page`,`helpChDecision`,`helpDecisionBody`,{links:[{id:`rules`,label:`helpSeeLadder`}]})]},{id:`plant`,title:`helpChPlant`,sections:[$(`plant-page`,`helpChPlant`,`helpPlantBody`)]},{id:`settings`,title:`helpChSettings`,sections:[$(`set-intro`,`helpSetIntro`,`helpSetIntroBody`),$(`set-setup`,`helpSetSetup`,`helpSetSetupBody`),$(`set-plant`,`helpSetPlant`,`helpSetPlantBody`),$(`set-safety`,`helpSetSafety`,`helpSetSafetyBody`),$(`set-tariff`,`helpSetTariff`,`helpSetTariffBody`),$(`set-pv`,`helpSetPv`,`helpSetPvBody`),$(`set-loads`,`helpSetLoads`,`helpSetLoadsBody`),$(`set-auto`,`helpSetAuto`,`helpSetAutoBody`),$(`set-system`,`helpSetSystem`,`helpSetSystemBody`),$(`set-look`,`helpSetLook`,`helpSetLookBody`),$(`set-classic`,`helpSetClassic`,`helpSetClassicBody`),$(`set-sizing`,`helpSetSizing`,`helpSetSizingBody`)]},{id:`controls`,title:`helpChControls`,sections:[$(`controls-page`,`helpChControls`,`helpControlsBody`,{actions:[{label:`helpOpenControls`,action:{kind:`controls`}}]})]},{id:`rules`,title:`helpChRules`,sections:[$(`rules-how`,`helpRulesHow`,`helpRulesHowBody`,{ladder:!0}),...Lu(),$(`why-grid`,`helpWhyGrid`,`helpWhyGridBody`)]},{id:`concepts`,title:`helpChConcepts`,sections:[$(`concept-plan`,`helpConceptPlan`,`helpConceptPlanBody`),$(`concept-pv`,`helpConceptPv`,`helpConceptPvBody`),$(`concept-low`,`helpConceptLow`,`helpConceptLowBody`),$(`concept-feed`,`helpConceptFeed`,`helpConceptFeedBody`),$(`concept-loads`,`helpConceptLoads`,`helpConceptLoadsBody`)]},{id:`trouble`,title:`helpChTrouble`,sections:[$(`trouble-off`,`helpTroubleOff`,`helpTroubleOffBody`,{links:[{id:`decision`,label:`helpChDecision`}]}),$(`trouble-entities`,`helpTroubleEntities`,`helpTroubleEntitiesBody`),$(`trouble-alerts`,`helpTroubleAlerts`,`helpTroubleAlertsBody`),$(`trouble-history`,`helpTroubleHistory`,`helpTroubleHistoryBody`),$(`faq-nogrid`,`helpFaqNoGrid`,`helpFaqNoGridBody`,{links:[{id:`why-grid`,label:`helpWhyGrid`}]}),$(`faq-swing`,`helpFaqSwing`,`helpFaqSwingBody`),$(`faq-ht`,`helpFaqHt`,`helpFaqHtBody`),$(`faq-pause`,`helpFaqPause`,`helpFaqPauseBody`),$(`faq-min`,`helpFaqMin`,`helpFaqMinBody`),$(`faq-restart`,`helpFaqRestart`,`helpFaqRestartBody`),$(`faq-tibber`,`helpFaqTibber`,`helpFaqTibberBody`),$(`faq-plan`,`helpFaqPlan`,`helpFaqPlanBody`),$(`faq-plan-hold`,`helpFaqPlanHold`,`helpFaqPlanHoldBody`,{links:[{id:`faq-plan`,label:`helpFaqPlan`}]}),$(`faq-plan-pv`,`helpFaqPlanPv`,`helpFaqPlanPvBody`,{links:[{id:`faq-plan`,label:`helpFaqPlan`},{id:`set-tariff`,label:`helpSetTariff`}]}),$(`faq-old`,`helpFaqOld`,`helpFaqOldBody`),$(`faq-balance-stats`,`helpFaqBalanceStats`,`helpFaqBalanceStatsBody`,{links:[{id:`trouble-history`,label:`helpTroubleHistory`}]})]},{id:`glossary`,title:`helpChGlossary`,sections:[$(`glossary-page`,`helpChGlossary`,`helpGlossaryBody`)]}],zu=new Set(Ru.map(e=>e.id)),Bu=new Set(Ru.flatMap(e=>e.sections.map(e=>e.id)));function Vu(e,t){return e===`settings`?t&&Bu.has(`set-${t}`)?`set-${t}`:`ch-settings`:zu.has(e)?`ch-${e}`:`ch-start`}function Hu(e,t){let n=e.trim().toLowerCase();if(!n)return;let r=new Set;for(let e of Ru){let i=t(e.title).toLowerCase().includes(n);for(let a of e.sections){let e=`${t(a.title)}\n${t(a.body)}`.toLowerCase();(i||e.includes(n))&&r.add(a.id)}}return r}var Uu=new Map(vo.map(e=>[e.id,e])),Wu=e=>{if(e.key!==`Tab`)return;let t=e.currentTarget;if(!(t instanceof HTMLElement))return;let n=[...t.querySelectorAll(`button, input, summary`)].filter(e=>!e.hidden&&e.offsetParent!==null),r=n[0],i=n[n.length-1];if(!r||!i)return;let a=t.getRootNode().activeElement;e.shiftKey&&a===r?(e.preventDefault(),i.focus()):!e.shiftKey&&a===i&&(e.preventDefault(),r.focus())},Gu=(e,t)=>{let n=t.trim(),r=e=>{if(!n)return e;let t=e.toLowerCase().indexOf(n.toLowerCase());return t<0?e:F`${e.slice(0,t)}<mark>${e.slice(t,t+n.length)}</mark>${e.slice(t+n.length)}`};return F`${e.split(`
`).map(e=>F`<p>${r(e)}</p>`)}`},Ku=(e,t)=>{let{t:n}=e.i18n;return Ru.map(r=>{let i=r.sections.filter(e=>!t||t.has(e.id));if(!i.length)return L;let a=r.id===e.current||i.some(t=>t.id===e.current),o=i.filter(e=>e.title!==r.title);return F`<div class="help-toc-ch">
      <button type="button" class=${a?`on`:``} aria-current=${a?`true`:`false`} @click=${()=>e.onJump(r.id)}>${n(r.title)}</button>
      ${o.map(t=>F`<button
        type="button"
        class=${e.current===t.id?`on`:``}
        aria-current=${e.current===t.id?`true`:`false`}
        @click=${()=>e.onJump(t.id)}
      >${n(t.title)}</button>`)}
    </div>`})},qu=e=>{let{t}=e.i18n,n=xo(e.phase,e.planActive,e.lowYield),r=n?Uu.get(n):void 0;return F`<div class="help-live">
    <p class="help-now">${r?t(`helpActive`,{rule:t(r.label)}):t(`helpNoPhase`)}</p>
    ${yo.map(r=>F`<div class="ladder-band">
      <h4>${t(r.label)}</h4>
      <div class="ladder-steps">
        ${r.steps.map(r=>{let i=Uu.get(r);return i?F`<button type="button" class="ladder-step ${r===n?`on`:``}" @click=${()=>e.onJump(r)}>${t(i.label)}</button>`:L})}
      </div>
    </div>`)}
  </div>`},Ju=e=>{let{t}=e.i18n,n=Hu(e.query,t),r=Ru.flatMap(e=>e.sections).filter(e=>!n||n.has(e.id));return F`<div class="scrim open help-scrim" @click=${e.onClose}></div>
    <aside class="help" role="dialog" aria-modal="true" aria-labelledby="help-title" @keydown=${Wu}>
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
        <nav class="help-toc" aria-label=${t(`helpToc`)}>${Ku(e,n)}</nav>
      </details>
      <div class="help-body">
        <nav class="help-toc" aria-label=${t(`helpToc`)}>${Ku(e,n)}</nav>
        <div class="help-doc">
          ${r.length?Ru.map(r=>{let i=r.sections.filter(e=>!n||n.has(e.id));return i.length?F`<article id=${`help-ch-${r.id}`} data-chapter=${r.id}>
                  <h3>${t(r.title)}</h3>
                  ${i.map(n=>F`<section id=${`help-${n.id}`} data-help=${n.id}>
                    ${n.title===r.title?L:F`<h4>${t(n.title)}</h4>`}
                    ${Gu(t(n.body),e.query)}
                    ${n.ladder?qu(e):L}
                    ${n.links?.map(n=>F`<button type="button" class="help-link" @click=${()=>e.onJump(n.id)}>${t(n.label)}</button>`)}
                    ${n.actions?.map(n=>F`<button type="button" class="btn help-action" @click=${()=>e.onAction(n.action)}>${t(n.label)}</button>`)}
                  </section>`)}
                </article>`:L}):F`<p class="hint">${t(`helpEmpty`)}</p>`}
          <button type="button" class="btn help-top" @click=${e.onTop}>${t(`helpTop`)}</button>
        </div>
      </div>
    </aside>`},Yu,Xu={pv:{entity:`pv`,color:`#fbbf24`,label:`nodePv`},grid:{entity:`grid`,color:`#f87171`,label:`nodeImport`},house:{entity:`house`,color:`#a78bfa`,label:`nodeHouse`},bat:{entity:`battery`,color:`#22d3ee`,label:`nodeBatCharge`}},Zu=new URLSearchParams(location.search).has(`debug`),Qu=[{id:`live`,label:`navLive`,sub:`subLive`,icon:`<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>`},{id:`forecast`,label:`navForecast`,sub:`subForecast`,icon:`<path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/>`},{id:`plan`,label:`navPlan`,sub:`subPlan`,icon:`<rect x="3" y="10" width="4" height="11" rx="1"/><rect x="10" y="5" width="4" height="16" rx="1"/><rect x="17" y="13" width="4" height="8" rx="1"/>`},{id:`decision`,label:`navDecision`,sub:`subDecision`,icon:`<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>`},{id:`plant`,label:`navPlant`,sub:`subPlant`,icon:`<path d="M4 21V10l8-7 8 7v11"/><path d="M9 21v-6h6v6"/>`},{id:`settings`,label:`navSettings`,sub:`subSettings`,icon:`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`}],$u=`<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>`,ed=`<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 1 1 4.2 2.7c-.8.4-1.3 1-1.3 1.8V14"/><path d="M12 17h.01"/>`,td=`(max-width: 960px)`,nd=3e5,rd=6e4,id=6,ad=3e4,od=6,sd=(e,t=``)=>F`<svg class=${t} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${e}></svg>`,cd=()=>{let[e,t]=location.hash.slice(1).split(`/`),n=Qu.some(t=>t.id===e)?e:`live`;return{screen:n,settingsGroup:n===`settings`?us(t):void 0,plantGroup:n===`plant`&&Ec(t)?t:void 0}},ld=cd(),ud=class extends ke{constructor(...e){super(...e),this._narrow=!1,this._screen=ld.screen,this._settingsGroup=ld.settingsGroup,this._plantGroup=ld.plantGroup,this._theme=Da(),this._flowStyle=kr(),this._batteryStyle=Sa(),this._bannerHidden=_a(),this._alertDismissed=ma(),this._consumerPlacesByStyle=Wr(),this._arrangeConsumers=!1,this._sheet=!1,this._pauseOpen=!1,this._help=!1,this._helpQuery=``,this._helpCurrent=``,this._helpListening=!1,this._mobile=window.matchMedia(td).matches,this._mq=window.matchMedia(td),this._range=24,this._showIst=!0,this._loadedAt=new Map,this._pending=new Set,this._flowRaf=0,this._motion=!0,this._histState=`loading`,this._stats={hassUpdates:0,renders:0},this._resolvedAt=0,this._consumers=vt(),this._collapsed=Gi(),this._batteryCtrlOpen=!1,this._flowOptsOpen=!1,this._expert=Gs(),this._planTuneOpen=Us(),this._pvOpen=Js(),this._setupAck=eo(),this._grain=`day`,this._rangeSumsCache=new Map,this._daySparksCache=new Map,this._rangePrefetch=new Set,this._calOpen=!1,this._calViewAnchor=U(),this._pulseRange=`month`,this._pulseState=`idle`,this._debugOpen=!1,this._picking=!1,this._pickQuery=``,this._focusConsumers=!1,this._consumersSheet=!1,this._storedOptions={},this._optionsLoaded=!1,this._optionsReady=!1,this._optionQuery={},this._slots=[],this._slotsDirty=!1,this._phasePoints={},this._phaseHistory=`idle`,this._phaseTicket=0,this._watchSig=``,this._onMq=e=>{this._mobile=e.matches,this.requestUpdate()},this._onPop=()=>{let e=cd();this._screen=e.screen,this._settingsGroup=e.settingsGroup,this._plantGroup=e.plantGroup,this.requestUpdate(),this._loadPhaseHistory()},this._animateFlows=e=>{Di(this.renderRoot.querySelectorAll(`.electron`),e),this._flowRaf=requestAnimationFrame(this._animateFlows)},this._onKey=e=>{e.key===`Escape`?this._pauseOpen?(this._pauseOpen=!1,this.requestUpdate()):this._help?this._closeHelp():this._batteryCtrlOpen?(this._batteryCtrlOpen=!1,this.requestUpdate()):this._flowOptsOpen?(this._flowOptsOpen=!1,this.requestUpdate()):this._hist?this._closeHistory():this._sheet&&this._setSheet(!1):e.key!==`?`||e.metaKey||e.ctrlKey||e.altKey||this._help||e.composedPath().some(e=>e instanceof HTMLElement&&(e.tagName===`INPUT`||e.tagName===`TEXTAREA`||e.tagName===`SELECT`||e.isContentEditable))||(e.preventDefault(),this._openHelp())},this._onHelpScroll=()=>{let e=this.renderRoot.querySelector(`.help-doc`);if(!(e instanceof HTMLElement))return;let t=e.getBoundingClientRect().top+12,n=``;for(let r of e.querySelectorAll(`[data-help]`))r.getBoundingClientRect().top<=t&&(n=r.dataset.help??n);n&&n!==this._helpCurrent&&(this._helpCurrent=n,this.requestUpdate())},this._onChartError=e=>{this._chartError=e.detail,this.requestUpdate()},this._scrollKey=``}set hass(e){this._stats.hassUpdates++;let t=this._hass;this._hass=e,(!t||this._missingKeys(e).length)&&this._resolveEntities();let n=this._watchSignature(e);!t||t.language!==e.language||n!==this._watchSig?(this._watchSig=n,this.requestUpdate()):Zu&&this.requestUpdate()}_watchSignature(e){let t=``;for(let n of nt()){let r=e.states[n],i=r?r.last_updated??r.last_changed:``;t+=`${n}:${r?.state??``}:${i};`}let n=e.states[z.sizingScenario]?.attributes;return n&&(t+=JSON.stringify(n.slider_battery_kwh)+JSON.stringify(n.slider_pv_kwp)+JSON.stringify(n.scenario_monthly_avoided_kwh)),t}get hass(){return this._hass}set narrow(e){e!==this._narrow&&(this._narrow=e,this.requestUpdate())}get narrow(){return this._narrow}connectedCallback(){super.connectedCallback(),rr(this._theme),this._mq.addEventListener(`change`,this._onMq),this._mobile=this._mq.matches,this._timer=window.setInterval(()=>void this._ensureHistory(),rd),this.addEventListener(`chart-error`,this._onChartError),window.addEventListener(`keydown`,this._onKey),window.addEventListener(`popstate`,this._onPop);let e=location.hash.slice(1).split(`/`)[1];this._screen===`settings`&&e&&this._settingsGroup&&e!==this._settingsGroup&&history.replaceState(null,``,`#settings/${this._settingsGroup}`),this._motion=!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,this._motion&&(this._flowRaf=requestAnimationFrame(this._animateFlows))}disconnectedCallback(){super.disconnectedCallback(),this._mq.removeEventListener(`change`,this._onMq),window.clearInterval(this._timer),window.clearInterval(this._pauseClock),window.clearTimeout(this._overflowTimer),cancelAnimationFrame(this._flowRaf),this.removeEventListener(`chart-error`,this._onChartError),window.removeEventListener(`keydown`,this._onKey),this._unbindHelpScroll(),window.removeEventListener(`popstate`,this._onPop)}_openHelp(){this._help=!0,this._helpAnchor=Vu(this._screen,this._settingsGroup),this._helpCurrent=this._helpAnchor.startsWith(`ch-`)?this._helpAnchor.slice(3):this._helpAnchor,this.requestUpdate()}_closeHelp(){this._help=!1,this._helpQuery=``,this._helpAnchor=void 0,this._unbindHelpScroll(),this.requestUpdate()}_jumpHelp(e){if(this._helpCurrent=e,this._helpQuery){this._helpQuery=``,this._helpAnchor=e,this.requestUpdate();return}let t=this.renderRoot.querySelector(`.help-fold`);t instanceof HTMLDetailsElement&&(t.open=!1),this._scrollHelp(e)}_scrollHelp(e){let t=()=>{let t=this.renderRoot.querySelector(`.help-doc`);if(!(t instanceof HTMLElement))return;let n=e.startsWith(`ch-`)?e.slice(3):e,r=t.querySelector(`[data-help="${n}"]`)??t.querySelector(`[data-chapter="${n}"]`);if(!(r instanceof HTMLElement))return;let i=r.getBoundingClientRect().top-t.getBoundingClientRect().top+t.scrollTop;t.scrollTop=Math.max(0,i-4)};t(),requestAnimationFrame(t)}_helpAction(e){this._closeHelp(),e.kind===`controls`?this._setSheet(!0):e.group&&e.screen===`settings`?this._openSettingsGroup(e.group):e.group&&e.screen===`plant`?this._openPlantRoom(e.group):this._go(e.screen)}_bindHelpScroll(){let e=this.renderRoot.querySelector(`.help-doc`);e instanceof HTMLElement&&!this._helpListening&&(e.addEventListener(`scroll`,this._onHelpScroll,{passive:!0}),this._helpListening=!0)}_unbindHelpScroll(){this.renderRoot.querySelector(`.help-doc`)?.removeEventListener(`scroll`,this._onHelpScroll),this._helpListening=!1}_closeHistory(){this._hist=void 0,this._histPoints=void 0,this.requestUpdate()}_openFlow(e){let t=this._hass;if(!t)return;let n=ra(t.language),r=Xu[e],i=this._consumers.find(t=>t.id===e),a=r?z[r.entity]:i?.entityId;if(!a)return;let o=t.states[a],s=V(o),c=e===`grid`&&s!==void 0&&s>=0,l=e===`grid`?n.t(c?`nodeFeed`:`nodeImport`):r?n.t(r.label):i?.name??a,u=c?`#34d399`:r?.color??`#38bdf8`,d=o?.attributes.unit_of_measurement;this._hist={name:l,color:u,entityId:a},this._histPoints=void 0,this._histState=`loading`,this.requestUpdate(),Zn(t,a,d===`kW`?1e3:1).then(e=>{this._hist?.entityId===a&&(this._histPoints=e,this._histState=e.length?`ready`:`empty`,this.requestUpdate())}).catch(()=>{this._hist?.entityId===a&&(this._histState=`error`,this.requestUpdate())})}async _resolveEntities(){let e=this._hass;if(!(!e||Date.now()-this._resolvedAt<ad)){this._resolvedAt=Date.now();try{let t=await e.callWS({type:`e3dc_maestro/panel_entities`}),n=JSON.stringify(z);qe(t),Xe(t);let r=JSON.stringify(B.entities);Ze(t),JSON.stringify(B.entities)!==r&&(this._phasePoints={},this._loadedAt.delete(`plant-grid`),this._loadedAt.delete(`plant-pv`)),this._entityMap=t,JSON.stringify(z)!==n&&this._loadedAt.clear(),this.requestUpdate(),this._ensureHistory()}catch{}}}_missingKeys(e){return Object.keys(Ge).filter(t=>!e.states[z[t]])}_entityNotice(e,t){let n=this._entityMap;if(n&&n.entry_id===null)return F`<p class="err">${t(`notSetUp`)}</p>`;let r=this._missingKeys(e);if(!r.length)return L;let i=new Set(n?.disabled??[]),a=r.slice(0,od).map(e=>i.has(e)?`${z[e]} (${t(`entityDisabled`)})`:z[e]),o=r.length>od?` +${r.length-od}`:``;return F`<p class="err">${t(`entitiesMissing`,{list:a.join(`, `)+o})}</p>`}_liveFacts(e,t,n){if(this._screen!==`live`)return L;let r=e=>e===void 0?`–`:`${t.n(e)} kWh`,i=t=>{let n=this._storedOptions[t];return typeof n==`string`?V(e.states[n]):void 0},a=e.states[z.p10],o=a?.attributes.p50_remaining_kwh,s=i(`pv_forecast_sensor`)??(typeof o==`number`?o:V(a)),c=i(`pv_forecast_sensor_day2`);return F`<p class="facts">
      <span>${n(`factRest`)} <b>${r(s)}</b></span>
      <span>${n(`factTomorrow`)} <b>${r(V(e.states[z.pvTomorrow]))}</b></span>
      ${c===void 0?L:F`<span>${n(`factDayAfter`)} <b>${r(c)}</b></span>`}
    </p>`}_syncAlertDismissed(e){let t=da(this._alertDismissed,e);t.size===this._alertDismissed.size&&[...t].every(e=>this._alertDismissed.has(e))||(this._alertDismissed=t,ha(t))}_dismissAlerts(e){let t=new Set(e);this._alertDismissed=t,ha(t),this.requestUpdate()}_setBannerHidden(e){this._bannerHidden=e,va(e),this.requestUpdate()}_alerts(e,t){let n=ua(e);return fa(n,this._alertDismissed,this._bannerHidden)?F`<div class="banner ${n.includes(`unreachable`)?`bad`:``}" role="status">
      <div class="banner-notes">${n.map(e=>F`<span>${t(la(e))}</span>`)}</div>
      <button type="button" class="banner-ack" @click=${()=>this._dismissAlerts(n)}>${t(`alertDismiss`)}</button>
    </div>`:L}_balanceRange(){return Pn(this._grain,this._anchor??U())}async _ensureBalanceRange(e){let t=this._balanceRange();if(t.grain===`day`&&t.live){this._rangeSums=void 0,this._daySparks=void 0;return}let n=An(this._rangeSumsCache,t.cacheKey);n&&(this._rangeSums=n);let r;t.grain===`day`?(r=An(this._daySparksCache,t.start),r&&(this._daySparks=r)):this._daySparks=void 0;let i=!n,a=t.grain===`day`&&!r;if(!i&&!a){this.requestUpdate(),this._prefetchNeighborRanges(e,t.grain,t.anchor);return}let o=[];i&&o.push(Kn(e,t).then(e=>{kn(this._rangeSumsCache,t.cacheKey,e),this._balanceRange().cacheKey===t.cacheKey&&(this._rangeSums=e)})),a&&o.push(qn(e,t.start).then(e=>{kn(this._daySparksCache,t.start,e),this._balanceRange().cacheKey===t.cacheKey&&(this._daySparks=e)}));try{await Promise.all(o)}catch{this._balanceRange().cacheKey===t.cacheKey&&this._rangeSums===void 0&&(this._rangeSums={},kn(this._rangeSumsCache,t.cacheKey,{}))}this.requestUpdate(),this._prefetchNeighborRanges(e,t.grain,t.anchor)}_prefetchNeighborRanges(e,t,n){for(let r of[-1,1]){let i=Pn(t,Fn(t,n,r));i.live&&i.grain===`day`||(!this._rangeSumsCache.has(i.cacheKey)||t===`day`&&!this._daySparksCache.has(i.start))&&(this._rangePrefetch.has(i.cacheKey)||(this._rangePrefetch.add(i.cacheKey),(async()=>{try{let n=!this._rangeSumsCache.has(i.cacheKey),r=t===`day`&&!this._daySparksCache.has(i.start),[a,o]=await Promise.all([n?Kn(e,i):Promise.resolve(void 0),r?qn(e,i.start):Promise.resolve(void 0)]);a&&kn(this._rangeSumsCache,i.cacheKey,a),o&&kn(this._daySparksCache,i.start,o)}catch{}finally{this._rangePrefetch.delete(i.cacheKey)}})()))}}async _ensureHistory(){let e=this._hass;if(!e||document.hidden)return;let t=e=>Date.now()-(this._loadedAt.get(e)??0)>nd,n=async(e,n)=>{if(t(e)){this._loadedAt.set(e,Date.now()-nd+rd);try{await n(),this._loadedAt.set(e,Date.now()),this.requestUpdate()}catch{}}};if(this._screen===`live`&&await n(`sparks`,async()=>void(this._sparks=await qn(e))),this._screen===`live`&&await this._ensureBalanceRange(e),this._screen===`live`&&!this._collapsed.has(`balancePulse`)){let n=this._pulseRange,r=`pulse-${n}`;if(t(r)){this._pulseDays||(this._pulseState=`loading`,this.requestUpdate()),this._loadedAt.set(r,Date.now()-nd+rd);try{this._pulseDays=await Gn(e,n),this._pulseState=`ready`,this._loadedAt.set(r,Date.now()),this.requestUpdate()}catch{this._pulseState=`error`,this.requestUpdate()}}}this._screen===`forecast`&&this._showIst&&await n(`ist`,async()=>void(this._ist=await $n(e,id))),this._screen===`decision`&&await n(`timeline`,async()=>void(this._timeline=await er(e))),await this._loadPhaseHistory()}async _loadPhaseHistory(){let e=this._hass,t=this._plantGroup;if(!e||document.hidden||this._screen!==`plant`||t!==`grid`&&t!==`pv`)return;let n=(t===`grid`?[`houseL1`,`houseL2`,`houseL3`,`gridL1`,`gridL2`,`gridL3`]:[`pviL1`,`pviL2`,`pviL3`]).map(e=>B.entities[e]).filter(e=>!!e);if(!n.length)return;let r=`plant-${t}`;if(n.every(e=>e in this._phasePoints)&&Date.now()-(this._loadedAt.get(r)??0)<=nd){this._phaseHistory!==`ready`&&(this._phaseHistory=`ready`,this.requestUpdate());return}let i=++this._phaseTicket;n.every(e=>e in this._phasePoints)||(this._phaseHistory=`loading`,this.requestUpdate());try{let t=await Qn(e,n);if(this._phasePoints={...this._phasePoints,...Object.fromEntries(n.map(e=>[e,t[e]??[]]))},this._loadedAt.set(r,Date.now()),i!==this._phaseTicket)return;this._phaseHistory=`ready`}catch{if(i!==this._phaseTicket)return;this._loadedAt.set(r,Date.now()-nd+rd),this._phaseHistory=`error`}this.requestUpdate()}_setTheme(e){this._theme=e,rr(e),Oa(e),this.requestUpdate()}_setFlowStyle(e){this._flowStyle=e,Ar(e),this.requestUpdate()}_setBatteryStyle(e){this._batteryStyle=e,Ca(e),this.requestUpdate()}_placeConsumer(e,t){let n=this._flowStyle,r={...this._consumerPlacesByStyle[n],[e]:t};this._consumerPlacesByStyle={...this._consumerPlacesByStyle,[n]:r},Gr(this._consumerPlacesByStyle),this.requestUpdate()}_resetConsumerPlaces(){let e=this._flowStyle;this._consumerPlacesByStyle={...this._consumerPlacesByStyle,[e]:{}},Gr(this._consumerPlacesByStyle),this.requestUpdate()}_go(e){this._screen=e,this._settingsGroup=void 0,this._plantGroup=void 0,this._zoomKey=void 0,this._error=void 0,history.replaceState(null,``,`#${e}`),this.requestUpdate(),this._ensureHistory()}_openSettingsGroup(e){this._screen=`settings`,this._settingsGroup=e,e===rs.id&&(this._classic=void 0),history.pushState({maestroGroup:!0},``,`#settings/${e}`),this.requestUpdate()}_openPlantRoom(e){this._screen=`plant`,this._plantGroup=e,history.pushState({maestroGroup:!0},``,`#plant/${e}`),this.requestUpdate(),this._loadPhaseHistory()}_closeArea(){history.state?.maestroGroup?history.back():(this._screen===`plant`?(this._plantGroup=void 0,history.replaceState(null,``,`#plant`)):(this._settingsGroup=void 0,history.replaceState(null,``,`#settings`)),this.requestUpdate())}_setSheet(e){this._sheet=e,e||(this._error=void 0,this._picking=!1,this._consumersSheet=!1),this.requestUpdate()}_openConsumers(){this._sheet=!0,this._focusConsumers=!0,this._consumersSheet=!0,this.requestUpdate()}_heldOverflow(e){let t=Date.now(),n=wt(e,this._overflowSince,t);if(this._overflowSince=n.since,window.clearTimeout(this._overflowTimer),this._overflowTimer=void 0,n.since!==void 0&&!n.show){let e=Math.max(0,ot-(t-n.since));this._overflowTimer=window.setTimeout(()=>this.requestUpdate(),e)}return n.show}_setConsumers(e,t=!1){this._consumers=e.slice(0,6),yt(this._consumers),this._setOption(`flow_consumers`,this._consumers,!0),t&&(this._picking=!1,this._pickQuery=``),this.requestUpdate()}async _call(e,t,n,r){let i=this._hass;if(i){this._pending.add(e),this._error=void 0,this.requestUpdate();try{await i.callService(t,n,r)}catch(e){let t=e instanceof Error?e.message:typeof e==`object`&&e&&`message`in e?String(e.message):String(e);this._error=ra(i.language).t(`callFailed`,{err:t})}finally{this._pending.delete(e),this.requestUpdate()}}}_openPause(){this._pauseOpen=!0,this.requestUpdate()}_resumeRegulation(){this._pauseOpen=!1,this._call(z.ctrlActive,`switch`,`turn_on`,{entity_id:z.ctrlActive})}_toggle(e){let t=H(this._hass?.states[e]);e===z.ctrlActive&&t?this._openPause():this._call(e,`switch`,t?`turn_off`:`turn_on`,{entity_id:e})}async _pause(e){let t=this._hass;if(this._pauseOpen=!1,t){this._pending.add(z.ctrlActive),this._error=void 0,this.requestUpdate();try{await t.callWS({type:`e3dc_maestro/pause`,hours:e})}catch(e){let n=e instanceof Error?e.message:typeof e==`object`&&e&&`message`in e?String(e.message):String(e);this._error=ra(t.language).t(`callFailed`,{err:n})}finally{this._pending.delete(z.ctrlActive),this.requestUpdate()}}}_syncPauseClock(e){let t=e!==void 0&&e*1e3>Date.now();t&&this._pauseClock===void 0?this._pauseClock=window.setInterval(()=>this.requestUpdate(),3e4):!t&&this._pauseClock!==void 0&&(window.clearInterval(this._pauseClock),this._pauseClock=void 0)}_press(e){this._call(e,`button`,`press`,{entity_id:e})}_select(e,t){this._call(e,`select`,`select_option`,{entity_id:e,option:t})}_commitPower(e){this._commitNumber(z.forceDischargePower,e).then(()=>{this._powerDraft=void 0,this.requestUpdate()})}_commitReserve(e){this._commitNumber(z.fixedReserveSoc,e).then(()=>{this._reserveDraft=void 0,this.requestUpdate()})}_commitNumber(e,t){return this._call(e,`number`,`set_value`,{entity_id:e,value:t})}async _checkClassic(){let e=this._hass;e&&(this._classic={...this._classic,state:`checking`},this.requestUpdate(),this._classic=await La(e),this.requestUpdate())}async _createClassic(){let e=this._hass,t=this._classic;if(e&&t){this._classic={...t,state:`creating`},this.requestUpdate();try{await Ra(e,t.state),await this._checkClassic()}catch(e){this._classic={...t,state:`error`,error:ja(e)},this.requestUpdate()}}}_openClassic(){history.pushState(null,``,`/e3dc-maestro`),window.dispatchEvent(new CustomEvent(`location-changed`,{detail:{replace:!1}}))}_toggleMenu(){this.dispatchEvent(new Event(`hass-toggle-menu`,{bubbles:!0,composed:!0}))}_fault(e){if(e instanceof Error)return e.message;if(e&&typeof e==`object`&&`message`in e){let t=e.message;if(typeof t==`string`&&t)return t}return String(e)}async _loadOptions(){let e=this._hass;if(e&&!this._optionsLoaded){this._optionsLoaded=!0;try{let t=await e.callWS({type:`e3dc_maestro/panel_options`});this._storedOptions=t.options??{},this._optionsReady=!0,this._slotsDirty||(this._slots=fo(this._storedOptions.tariff_slots));let n=_t(this._storedOptions.flow_consumers,this._consumers);this._consumers=n.list,yt(n.list),n.publishLocal&&this._setOption(`flow_consumers`,n.list,!0)}catch(e){this._optionError=this._fault(e)}this.requestUpdate()}}async _setOption(e,t,n=!1){let r=this._hass;if(r){this._pending.add(e),this._optionError=void 0,this.requestUpdate();try{let i=await r.callWS({type:`e3dc_maestro/panel_options/set`,values:{[e]:t}}),a={...this._storedOptions};t===null?delete a[e]:a[e]=t,this._storedOptions=a,n||(this._optionNotice=i.reloaded?`reload`:`saved`),e===`tariff_slots`&&(this._slotsDirty=!1),i.reloaded&&(this._resolvedAt=0,this._resolveEntities())}catch(e){this._optionError=this._fault(e)}finally{this._pending.delete(e),this.requestUpdate()}}}render(){this._stats.renders++;let e=this._hass;if(!e)return F``;let t=ra(e.language),n=Ri(e.language),{t:r}=t,i={hass:e,i18n:t,isAdmin:e.user?.is_admin===!0,options:this._storedOptions,ready:this._optionsReady,error:this._optionError,notice:this._optionNotice,query:this._optionQuery,pending:this._pending,slots:this._slots,onQuery:(e,t)=>{this._optionQuery={...this._optionQuery,[e]:t},this.requestUpdate()},onChange:(e,t)=>void this._setOption(e,t),onSlots:e=>{this._slots=e,this._slotsDirty=!0,this.requestUpdate()},onSaveSlots:()=>void this._setOption(`tariff_slots`,this._slots),onRunSizing:()=>this._press(z.btnSizing)},a={hass:e,i18n:t,fmt:n,mobile:this._mobile,sparks:this._sparks,daySparks:this._daySparks,ist:this._ist,timeline:this._timeline,range:this._range,showIst:this._showIst,onRange:e=>{this._range=e,this.requestUpdate()},onToggleIst:()=>{this._showIst=!this._showIst,this.requestUpdate(),this._ensureHistory()},consumers:bt(this._consumers,e),consumerOverflow:this._heldOverflow(Ct(V(e.states[z.house]),bt(this._consumers,e))),onEditConsumers:()=>this._openConsumers(),arrangeConsumers:this._arrangeConsumers,onToggleArrange:()=>{this._arrangeConsumers=!this._arrangeConsumers,this.requestUpdate()},onResetConsumerPlaces:()=>this._resetConsumerPlaces(),consumerPlaces:this._consumerPlacesByStyle[this._flowStyle]??{},onPlaceConsumer:(e,t)=>this._placeConsumer(e,t),onFlowNode:e=>this._openFlow(e),motion:this._motion,collapsed:this._collapsed,onToggleGroup:e=>{let t=new Set(this._collapsed);t.delete(e)||t.add(e),this._collapsed=t,Ki(t),this.requestUpdate(),e===`balancePulse`&&!t.has(`balancePulse`)&&this._ensureHistory()},batteryCtrlOpen:this._batteryCtrlOpen,onOpenBatteryCtrl:()=>{this._batteryCtrlOpen=!0,this.requestUpdate()},onCloseBatteryCtrl:()=>{this._batteryCtrlOpen=!1,this.requestUpdate()},flowOptsOpen:this._flowOptsOpen,onOpenFlowOpts:()=>{this._flowOptsOpen=!this._flowOptsOpen,this.requestUpdate()},onCloseFlowOpts:()=>{this._flowOptsOpen=!1,this.requestUpdate()},balanceRange:this._balanceRange(),rangeSums:this._rangeSums,onBalanceSelect:(e,t)=>{let n=Pn(e,t),r=n.grain===`day`&&n.live?void 0:n.anchor;(e!==this._grain||r!==this._anchor)&&(this._grain=e,this._anchor=r,this._calViewAnchor=n.anchor,n.grain===`day`&&n.live?(this._rangeSums=void 0,this._daySparks=void 0):(this._rangeSums=An(this._rangeSumsCache,n.cacheKey),this._daySparks=n.grain===`day`?An(this._daySparksCache,n.start):void 0),this.requestUpdate(),this._ensureHistory())},calOpen:this._calOpen,calViewAnchor:this._calViewAnchor,onCalOpen:e=>{this._calOpen=e,e&&(this._calViewAnchor=this._balanceRange().anchor),this.requestUpdate()},onCalViewAnchor:e=>{this._calViewAnchor=e,this.requestUpdate()},pulseRange:this._pulseRange,onPulseRange:e=>{e!==this._pulseRange&&(this._pulseRange=e,this._pulseDays=void 0,this._pulseState=`idle`,this._loadedAt.delete(`pulse-${e}`),this.requestUpdate(),this._ensureHistory())},pulseDays:this._pulseDays,pulseState:this._pulseState,pending:this._pending,groupId:this._screen===`plant`?this._plantGroup:this._settingsGroup,onOpenGroup:e=>this._openSettingsGroup(e),setupAck:this._setupAck,onAckSetup:()=>{this._setupAck=!0,to(),this.requestUpdate()},onOpenRoom:e=>this._openPlantRoom(e),onOpenClassic:()=>this._openClassic(),classic:this._classic,isAdmin:e.user?.is_admin===!0,onCreateClassic:()=>void this._createClassic(),onCheckClassic:()=>void this._checkClassic(),onToggle:e=>this._toggle(e),onPress:e=>this._press(e),onSelect:(e,t)=>this._select(e,t),onNumber:(e,t)=>void this._commitNumber(e,t),forcePowerDraft:this._powerDraft,onPowerDraft:e=>{this._powerDraft=e,this.requestUpdate()},onPowerCommit:e=>this._commitPower(e),reserveDraft:this._reserveDraft,onReserveDraft:e=>{this._reserveDraft=e,this.requestUpdate()},onReserveCommit:e=>this._commitReserve(e),debugOpen:this._debugOpen,onToggleDebug:()=>{this._debugOpen=!this._debugOpen,this.requestUpdate()},theme:this._theme,onTheme:e=>this._setTheme(e),flowStyle:this._flowStyle,onFlowStyle:e=>this._setFlowStyle(e),alertBannerHidden:this._bannerHidden,onAlertBannerHidden:e=>this._setBannerHidden(e),batteryStyle:this._batteryStyle,onBatteryStyle:e=>this._setBatteryStyle(e),phasePoints:this._phasePoints,phaseHistory:this._phaseHistory,options:i,expert:this._expert,onExpert:e=>{this._expert=e,Ks(e),this.requestUpdate()},planTuneOpen:this._planTuneOpen,onTogglePlanTune:()=>{this._planTuneOpen=!this._planTuneOpen,Ws(this._planTuneOpen),this.requestUpdate()},pvOpen:this._pvOpen,onTogglePv:e=>{let t=new Set(this._pvOpen);t.delete(e)||t.add(e),this._pvOpen=t,Ys(t),this.requestUpdate()}},o=Qu.find(e=>e.id===this._screen)??Qu[0],s=this._screen===`settings`?ds(this._settingsGroup):void 0,c=this._screen===`plant`?Dc(this._plantGroup):void 0,l=s??c,u=H(e.states[z.ctrlActive]),d=Vt(e.states[z.ctrlActive]);this._syncPauseClock(d);let f=Ut(r,e.states[z.ctrlActive]),p=e.states[z.phase]?.state,m={live:yu,forecast:Su,plan:Tu,decision:Fu,plant:Nc,settings:ac}[o.id](a);return F`
      <div class="app">
        <nav class="rail" aria-label="Maestro">
          <div class="logo">
            <img src=${ai} alt="Maestro" />
          </div>
          ${Qu.map(e=>F`<button
      class="nav-btn ${e.id===o.id?`active`:``}"
      aria-current=${e.id===o.id?`page`:`false`}
      @click=${()=>this._go(e.id)}
    >
      ${sd(e.icon)}${r(e.label)}
    </button>`)}
          <div class="spacer"></div>
          <button class="nav-btn" @click=${()=>this._setSheet(!0)}>${sd($u)}${r(`navControls`)}</button>
          <button class="nav-btn ${this._help?`active`:``}" aria-expanded=${this._help?`true`:`false`} @click=${()=>this._help?this._closeHelp():this._openHelp()}>${sd(ed)}${r(`navHelp`)}</button>
        </nav>
        <main>
          <header class="topbar">
            ${this._narrow?F`<button class="menu" aria-label=${r(`menu`)} @click=${this._toggleMenu}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" /></svg>
                </button>`:L}
            ${l?F`<button class="menu" aria-label=${r(`settingsBack`)} @click=${()=>this._closeArea()}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.4 5.4 9.8 11H21v2H9.8l5.6 5.6L14 20l-8-8 8-8z"/></svg>
                </button>`:L}
            <div class="title grow">
              <h1>${r(l?l.title:o.label)}</h1>
              <p>${r(l?l.hint:o.sub)}</p>
              ${f?F`<p class="sub">${f}</p>`:L}
              ${l?L:this._liveFacts(e,n,r)}
            </div>
            <button class="menu help-menu" aria-label=${r(`navHelp`)} @click=${()=>this._help?this._closeHelp():this._openHelp()}>${sd(ed)}</button>
            <button type="button" class="pill hide-sm" @click=${()=>this._openPause()}>
              <span class="dot ${u?``:`off`}"></span>${u?r(`regulationOn`):f??r(`regulationOff`)}${p?` · ${t.phase(p)}`:``}
            </button>
          </header>
          ${this._entityNotice(e,r)}
          ${this._alerts(e,r)}
          ${this._error&&!this._sheet?F`<p class="err" role="alert">${this._error}</p>`:L}
          ${this._chartError?F`<p class="err">${r(`chartError`,{err:this._chartError})}</p>`:L}
          <section class="screen" id=${`screen-${o.id}`}>${m}</section>
          ${Zu?F`<footer class="debug">hass-Updates ${this._stats.hassUpdates} · Renders ${this._stats.renders}</footer>`:L}
        </main>
      </div>
      ${en({hass:e,i18n:t,fmt:n,open:this._sheet,pending:this._pending,error:this._error,forcePowerDraft:this._powerDraft,onClose:()=>this._setSheet(!1),onToggle:e=>this._toggle(e),onPowerDraft:e=>{this._powerDraft=e,this.requestUpdate()},onPowerCommit:e=>this._commitPower(e),reserveDraft:this._reserveDraft,onReserveDraft:e=>{this._reserveDraft=e,this.requestUpdate()},onReserveCommit:e=>this._commitReserve(e),onPress:e=>this._press(e),onSelect:(e,t)=>this._select(e,t),onAllSettings:()=>{this._setSheet(!1),this._go(`settings`)},consumers:this._consumers,consumersSheet:this._consumersSheet,picking:this._picking,pickQuery:this._pickQuery,choices:Tt(e,new Set(this._consumers.map(e=>e.entityId)),this._pickQuery),wallbox:e.states[`sensor.e3dc_maestro_wallbox_leistung`]&&!this._consumers.some(e=>e.entityId===`sensor.e3dc_maestro_wallbox_leistung`)?{id:rt,name:mt(e.states[rt],t.t(`useWallbox`))}:void 0,onPick:e=>{this._picking=e,this.requestUpdate()},onPickQuery:e=>{this._pickQuery=e,this.requestUpdate()},onAddConsumer:(e,t)=>{this._consumers.some(t=>t.entityId===e)||this._setConsumers([...this._consumers,{id:gt(),entityId:e,name:t,mode:`included`,icon:ut(e)}],!0)},onUseWallbox:()=>{let n=mt(e.states[rt],t.t(`useWallbox`));this._setConsumers([...this._consumers,{id:gt(),entityId:rt,name:n,mode:`separate`,icon:`wallbox`}],!0)},onRenameConsumer:(e,t)=>{let n=t.slice(0,40);n.trim()&&this._setConsumers(this._consumers.map(t=>t.id===e?{...t,name:n}:t))},onConsumerMode:(e,t)=>{this._setConsumers(this._consumers.map(n=>n.id===e?{...n,mode:t}:n))},onConsumerIcon:(e,t)=>{this._setConsumers(this._consumers.map(n=>n.id===e?{...n,icon:t}:n))},onRemoveConsumer:e=>this._setConsumers(this._consumers.filter(t=>t.id!==e))})}
      ${this._help?Ju({i18n:t,query:this._helpQuery,phase:p,planActive:H(e.states[z.ctrlPlanControls]),lowYield:H(e.states[z.lowYield]),current:this._helpCurrent,onQuery:e=>{this._helpQuery=e,this.requestUpdate()},onClose:()=>this._closeHelp(),onJump:e=>this._jumpHelp(e),onAction:e=>this._helpAction(e),onTop:()=>{let e=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;this.renderRoot.querySelector(`.help-doc`)?.scrollTo({top:0,behavior:e?`auto`:`smooth`})}}):L}
      ${this._pauseOpen?Wt(r,u,e=>void this._pause(e),()=>this._resumeRegulation(),()=>{this._pauseOpen=!1,this.requestUpdate()}):L}
      ${this._batteryCtrlOpen?Mu(a):L}
      ${this._hist?F`<div class="scrim open hist-scrim" @click=${()=>this._closeHistory()}></div>
            <aside class="overlay" role="dialog" aria-modal="true" aria-label=${this._hist.name}>
              <div class="sheet-head">
                <div class="grow"><h2>${this._hist.name}</h2><div class="sub">${r(`historySub`)}</div></div>
                <button class="btn" @click=${()=>this._closeHistory()}>${r(`close`)}</button>
              </div>
              ${this._histState===`loading`?F`<p class="hint">${r(`loading`)}</p>`:L}
              ${this._histState===`empty`?F`<p class="hint">${r(`historyEmpty`)}</p>`:L}
              ${this._histState===`error`?F`<p class="err">${r(`historyFailed`)}</p>`:L}
              ${this._histState===`ready`&&this._histPoints?F`<maestro-chart .options=${Ji(`hist-${this._hist.entityId}`,[this._theme,this._histPoints,this._hist.color,n.loc],()=>vr(this._histPoints,this._hist.color,n))}></maestro-chart>`:L}
            </aside>`:L}
    `}firstUpdated(){this._ensureHistory()}willUpdate(){this.getAttribute(`theme`)!==this._theme&&this.setAttribute(`theme`,this._theme),this._hass&&this._syncAlertDismissed(ua(this._hass))}updated(){let e=`${this._screen}/${this._settingsGroup??``}/${this._plantGroup??``}`;if(e!==this._scrollKey){this._scrollKey=e;let t=this.renderRoot.querySelector(`main`);t&&!this._focusConsumers&&(t.scrollTop=0)}if(this._loadOptions(),this._screen===`settings`&&this._settingsGroup===rs.id&&!this._classic&&this._checkClassic(),this._focusConsumers&&(this._focusConsumers=!1,this.renderRoot.querySelector(`#display-consumers`)?.scrollIntoView({block:`start`})),this._help?this._bindHelpScroll():this._unbindHelpScroll(),this._helpAnchor){let e=this._helpAnchor;this._helpAnchor=void 0,this._helpCurrent=e.startsWith(`ch-`)?e.slice(3):e,this._scrollHelp(e),this.renderRoot.querySelector(`.help-query`)?.focus({preventScroll:!0})}if(this._screen!==`forecast`||!this._hass)return;let t=nn(this._hass.states[z.trajectory]?.attributes),n=this.renderRoot.querySelector(`#fc-main`);if(!t||!n)return;let r=t.trajectory_points[0][0],i=t.trajectory_points[t.trajectory_points.length-1][0],a=this._showIst&&this._ist?.pv.length?Math.min(r,this._ist.pv[0][0]):r,o=`${this._range}|${a}|${r}`;o!==this._zoomKey&&(this._zoomKey=o,n.zoomX(a,Math.min(i,r+this._range*36e5)))}};Yu=ud,Yu.styles=ia,customElements.get(`e3dc-maestro-panel`)||customElements.define(`e3dc-maestro-panel`,ud);