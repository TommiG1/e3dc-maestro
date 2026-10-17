var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:f,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,h=globalThis,g=h.trustedTypes,_=g?g.emptyScript:``,v=h.reactiveElementPolyfillSupport,y=(e,t)=>e,ee={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},te=(e,t)=>!l(e,t),ne={attribute:!0,type:String,converter:ee,reflect:!1,useDefault:!1,hasChanged:te};Symbol.metadata??=Symbol(`metadata`),h.litPropertyMetadata??=new WeakMap;var b=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ne){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ne}static _$Ei(){if(this.hasOwnProperty(y(`elementProperties`)))return;let e=m(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y(`properties`))){let e=this.properties,t=[...f(e),...p(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?ee:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?ee:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??te)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};b.elementStyles=[],b.shadowRootOptions={mode:`open`},b[y(`elementProperties`)]=new Map,b[y(`finalized`)]=new Map,v?.({ReactiveElement:b}),(h.reactiveElementVersions??=[]).push(`2.1.2`);var x=globalThis,re=e=>e,S=x.trustedTypes,ie=S?S.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,ae=`$lit$`,C=`lit$${Math.random().toFixed(9).slice(2)}$`,oe=`?`+C,se=`<${oe}>`,w=document,ce=()=>w.createComment(``),T=e=>e===null||typeof e!=`object`&&typeof e!=`function`,le=Array.isArray,ue=e=>le(e)||typeof e?.[Symbol.iterator]==`function`,de=`[ 	
\f\r]`,fe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,me=/>/g,E=RegExp(`>|${de}(?:([^\\s"'>=/]+)(${de}*=${de}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),he=/'/g,ge=/"/g,_e=/^(?:script|style|textarea|title)$/i,ve=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),D=ve(1),O=ve(2),k=Symbol.for(`lit-noChange`),A=Symbol.for(`lit-nothing`),ye=new WeakMap,j=w.createTreeWalker(w,129);function be(e,t){if(!le(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ie===void 0?t:ie.createHTML(t)}var xe=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=fe;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===fe?c[1]===`!--`?o=pe:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=E):(_e.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=E):o=me:o===E?c[0]===`>`?(o=i??fe,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?E:c[3]===`"`?ge:he):o===ge||o===he?o=E:o===pe||o===me?o=fe:(o=E,i=void 0);let d=o===E&&e[t+1].startsWith(`/>`)?` `:``;a+=o===fe?n+se:l>=0?(r.push(s),n.slice(0,l)+ae+n.slice(l)+C+d):n+C+(l===-2?t:d)}return[be(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},Se=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=xe(t,n);if(this.el=e.createElement(l,r),j.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=j.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(ae)){let t=u[o++],n=i.getAttribute(e).split(C),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Ee:r[1]===`?`?De:r[1]===`@`?Oe:Te}),i.removeAttribute(e)}else e.startsWith(C)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(_e.test(i.tagName)){let e=i.textContent.split(C),t=e.length-1;if(t>0){i.textContent=S?S.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],ce()),j.nextNode(),c.push({type:2,index:++a});i.append(e[t],ce())}}}else if(i.nodeType===8){if(i.data===oe)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(C,e+1))!==-1;)c.push({type:7,index:a}),e+=C.length-1}}a++}}static createElement(e,t){let n=w.createElement(`template`);return n.innerHTML=e,n}};function M(e,t,n=e,r){if(t===k)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=T(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=M(e,i._$AS(e,t.values),i,r)),t}var Ce=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??w).importNode(t,!0);j.currentNode=r;let i=j.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new we(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new ke(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=j.nextNode(),a++)}return j.currentNode=w,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},we=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=M(this,e,t),T(e)?e===A||e==null||e===``?(this._$AH!==A&&this._$AR(),this._$AH=A):e!==this._$AH&&e!==k&&this._(e):e._$litType$===void 0?e.nodeType===void 0?ue(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==A&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Se.createElement(be(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Ce(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=ye.get(e.strings);return t===void 0&&ye.set(e.strings,t=new Se(e)),t}k(t){le(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(ce()),this.O(ce()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=re(e).nextSibling;re(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Te=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=A,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=A}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=M(this,e,t,0),a=!T(e)||e!==this._$AH&&e!==k,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=M(this,r[n+o],t,o),s===k&&(s=this._$AH[o]),a||=!T(s)||s!==this._$AH[o],s===A?e=A:e!==A&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Ee=class extends Te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===A?void 0:e}},De=class extends Te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==A)}},Oe=class extends Te{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=M(this,e,t,0)??A)===k)return;let n=this._$AH,r=e===A&&n!==A||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==A&&(n===A||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ke=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){M(this,e)}},Ae={M:ae,P:C,A:oe,C:1,L:xe,R:Ce,D:ue,V:M,I:we,H:Te,N:De,U:Oe,B:Ee,F:ke},je=x.litHtmlPolyfillSupport;je?.(Se,we),(x.litHtmlVersions??=[]).push(`3.3.3`);var Me=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new we(t.insertBefore(ce(),e),e,void 0,n??{})}return i._$AI(e),i},Ne=globalThis,N=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Me(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};N._$litElement$=!0,N.finalized=!0,Ne.litElementHydrateSupport?.({LitElement:N});var Pe=Ne.litElementPolyfillSupport;Pe?.({LitElement:N}),(Ne.litElementVersions??=[]).push(`4.2.2`);var Fe=(function(){let e=typeof document<`u`&&document.createElement(`link`).relList;return e&&e.supports&&e.supports(`modulepreload`)?`modulepreload`:`preload`})(),Ie=function(e,t){return new URL(e,t).href},Le={},Re=function(e){return e.pathname.endsWith(`.css`)},ze=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},Be=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Ie(t,n);let r=s(t),i=Re(r);return ze(Le,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Fe,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Ve,He=new WeakMap,Ue,We=0;async function Ge(){return Ue??=await Be(()=>import(`./apex-DvHPYsi2.js`),[],import.meta.url),Ue}var Ke=class extends N{constructor(...e){super(...e),this._run=0}createRenderRoot(){return this}updated(e){e.has(`options`)&&this._apply().catch(e=>{this.dispatchEvent(new CustomEvent(`chart-error`,{detail:e instanceof Error?`${e.name}: ${e.message}`:String(e),bubbles:!0,composed:!0}))})}connectedCallback(){super.connectedCallback(),We++,Ue?.claimSVG(),this.hasUpdated&&this.options&&!this._chart&&this.requestUpdate(`options`)}disconnectedCallback(){super.disconnectedCallback(),--We===0&&Ue?.releaseSVG(),this._run++;try{this._chart?.destroy()}catch{}this._chart=void 0,this.replaceChildren()}_scoped(e){let t=e.chart?.id,n=e.chart?.brush?.target,r=this.getRootNode(),i=He.get(r);i||He.set(r,i=Math.random().toString(36).slice(2,8));let a=i;return{...e,chart:{...e.chart,...t?{id:`${t}-${a}`}:{},...n?{brush:{...e.chart?.brush,target:`${n}-${a}`}}:{}}}}zoomX(e,t){this._zoom=[e,t],this._chart?.zoomX(e,t)}async _apply(){let e=this.options;if(!e)return;let t=this._scoped(e),n=++this._run,r=await Ge(),i=r.default;if(n!==this._run||!this.isConnected)return;r.claimSVG();let a=t.chart?.brush?.target;if(a){for(let e=0;e<120&&!i.getChartByID(a);e++)if(await new Promise(e=>requestAnimationFrame(e)),n!==this._run)return}this._chart?await this._chart.updateOptions(t,!1,!1):(this._chart=new i(this,t),await this._chart.render()),n===this._run&&this._zoom&&this._chart.zoomX(...this._zoom)}};Ve=Ke,Ve.properties={options:{attribute:!1}},customElements.get(`maestro-chart`)||customElements.define(`maestro-chart`,Ke);var P=e=>`sensor.e3dc_maestro_${e}`,F=e=>`binary_sensor.e3dc_maestro_${e}`,I=e=>`switch.e3dc_maestro_${e}`,qe={phase:P(`regelphase`),lastAction:P(`letzte_aktion`),explanation:P(`entscheidungserklarung`),trajectory:P(`forecast_soc_trajektorie_24h`),plan:P(`preisplan`),soc:P(`aktueller_soc`),targetSoc:P(`ziel_soc`),pv:P(`pv_power`),house:P(`house_power`),grid:P(`grid_power`),battery:P(`battery_power`),autonomy:P(`autonomiezeit`),costNet:P(`netto_stromkosten_heute`),costToday:P(`stromkosten_heute`),feedRevenue:P(`einspeise_erlos_heute`),wear:P(`akku_verschleiss_heute`),balance:P(`energiebilanz_heute`),gridToBattery:P(`netz_akku_heute`),unjustified:F(`netzladung_ohne_rechtfertigung`),wallboxEnergy:P(`wallbox_energie_heute`),feedInInterventions:P(`einspeise_eingriffe_heute`),feedInAvoided:P(`dc_abregelung_verhindert_heute`),curtailAvoided:P(`abregelung_verhindert_heute`),feedInLimit:F(`einspeisedrosselung_aktiv`),gridCharge:F(`netzladung_aktiv`),batteryPriority:F(`akku_prioritat_aktiv`),lowYield:F(`schwacher_pv_tag`),forecastQuality:P(`forecast_datenqualitat`),p10:P(`pv_restprognose_p10`),yieldToday:P(`pv_tagesprognose`),yieldRef:P(`pv_referenz_ertrag`),yieldRatio:P(`pv_tag_quote`),deficit:P(`morgen_energiedefizit`),seasonalReserve:P(`notstromreserve_aktuell`),adaptiveReserve:P(`notstromreserve_adaptiv`),htReserve:P(`ht_reserve_adaptiv`),forwardTarget:P(`vorausschauendes_ladeziel`),astroStart:P(`astro_ladestart_uhrzeit`),seasonalEnd:P(`saisonales_ladeende_uhrzeit`),pvDelayStart:P(`verzogerter_ladestart_heute`),tomorrowStart:P(`ladestart_morgen_prognose`),tomorrowEnd:P(`ladeende_morgen_prognose`),autoStrategy:P(`auto_aktive_strategie`),autoSaving:P(`auto_geschatzte_einsparung`),saving:P(`pv_ersparnis_heute`),selfUse:P(`pv_eigenverbrauch_heute`),importToday:P(`netzbezug_heute`),feedToday:P(`netzeinspeisung_heute`),chargedToday:P(`geladen_heute`),dischargedToday:P(`entladen_heute`),pvTomorrow:P(`morgen_pv_prognose`),reachable:F(`e3dc_erreichbar`),chargeLock:F(`ladesperre_aktiv`),dischargeLock:F(`entladesperre_aktiv`),htProtect:F(`ht_schutz_aktiv`),curtail:F(`abregelschutz_aktiv`),emergency:F(`notfallladung_aktiv`),chargeLimit:P(`soll_lade_limit`),dischargeLimit:P(`soll_entlade_limit`),sentChargeLimit:P(`gesendetes_lade_limit`),sentDischargeLimit:P(`gesendetes_entlade_limit`),forceDischargePower:`number.e3dc_maestro_erzwungene_entladungsleistung`,fixedReserveSoc:`number.e3dc_maestro_notstromreserve_prozent`,ctrlActive:I(`regelung_aktiv`),ctrlPredictive:I(`vorausschauende_ladung`),ctrlPvDelay:I(`pv_prognose_verzogerung`),ctrlPlanControls:I(`preisplan_steuert_akku`),ctrlPlanShadow:I(`preisplan_schattenmodus`),forceDischarge:I(`erzwungene_entladung`),fixedReserve:I(`notstromreserve`),debug:I(`debug_logging`),debugLog:P(`debug_log`),btnClear:`button.e3dc_maestro_limits_jetzt_freigeben`,btnCharge:`button.e3dc_maestro_manuell_laden_3_kwh`,selWallbox:`select.e3dc_maestro_wallbox_typ`,selMorning:`select.e3dc_maestro_vorentladungs_modus`,selAuto:`select.e3dc_maestro_auto_optimierung_ziel`,selTariff:`select.e3dc_maestro_tarif_modus`},L={...qe};function Je(e){for(let t of Object.keys(qe))L[t]=e.entities[t]??qe[t]}var R={},Ye=new Set;function Xe(e){for(let e of Object.keys(R))delete R[e];Object.assign(R,e.settings??{}),Ye.clear();for(let t of e.settings_disabled??[])Ye.add(t)}var Ze=e=>Ye.has(e),Qe=[`ctrlActive`,`ctrlPredictive`,`ctrlPvDelay`,`ctrlPlanControls`,`ctrlPlanShadow`],$e=()=>[...Object.values(L),...Object.values(R)],z=e=>{let t=e?Number.parseFloat(e.state):NaN;return Number.isFinite(t)?t:void 0},B=e=>e?.state===`on`,et=`sensor.e3dc_maestro_wallbox_leistung`,tt=`e3dc-maestro.consumers.v1`,nt=50,rt=[`wallbox`,`heater`,`climate`,`heatpump`,`meter`],it={wallbox:`M6 8h12v7H6zM9 8V5M15 8V5M12 15v4M9 19h6`,heater:`M10 3v18M15 7c1.4 1 1.4 2 0 3s-1.4 2 0 3 1.4 2 0 3`,climate:`M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9`,heatpump:`M4 7h16v11H4zM12 9.5a2.5 2.5 0 1 0 .01 0`,meter:`M6 16a6 6 0 1 1 12 0M12 16l3.5-3.5`},at=e=>typeof e==`string`&&rt.includes(e);function ot(e){return/wallbox|evcc|easee|go-?e/i.test(e)?`wallbox`:`meter`}function st(e){return!e||e.state===`unavailable`}function ct(e){let t=z(e);if(t!==void 0)return e?.attributes.unit_of_measurement===`kW`?t*1e3:t}function lt(e){if(!e?.entity_id.startsWith(`sensor.`))return!1;let t=e.attributes.unit_of_measurement;return e.attributes.device_class===`power`||t===`W`||t===`kW`}function ut(e,t){let n=e?.attributes.friendly_name;return typeof n==`string`&&n.trim()?n.trim():t}function dt(e){if(!Array.isArray(e))return[];let t=[],n=new Set;for(let r of e){if(!r||typeof r!=`object`)continue;let e=r,i=e.entityId,a=e.mode;if(typeof i!=`string`||!i.startsWith(`sensor.`)||n.has(i)||a!==`included`&&a!==`separate`)continue;let o=typeof e.name==`string`&&e.name.trim()?e.name.trim().slice(0,40):i,s=typeof e.id==`string`&&e.id?e.id:i;if(t.push({id:s,entityId:i,name:o,mode:a,icon:at(e.icon)?e.icon:ot(i)}),n.add(i),t.length>=6)break}return t}function ft(){let e=new Uint8Array(8);return crypto.getRandomValues(e),[...e].map(e=>e.toString(16).padStart(2,`0`)).join(``)}function pt(){try{return dt(JSON.parse(localStorage.getItem(tt)??`null`))}catch{return[]}}function mt(e){try{localStorage.setItem(tt,JSON.stringify(dt(e)))}catch{}}function ht(e,t){return e.map(e=>{let n=t.states[e.entityId],r=ct(n);return{id:e.id,name:e.name,mode:e.mode,icon:e.icon,watts:r??0,missing:st(n)}})}function gt(e,t){return e!==void 0&&t.filter(e=>e.mode===`included`).reduce((e,t)=>e+Math.max(0,t.watts),0)>e+nt}function _t(e,t,n){let r=n.trim().toLowerCase();return Object.values(e.states).filter(e=>lt(e)&&!t.has(e.entity_id)).map(e=>({id:e.entity_id,name:ut(e,e.entity_id)})).filter(e=>!r||e.name.toLowerCase().includes(r)||e.id.toLowerCase().includes(r)).sort((e,t)=>e.name.localeCompare(t.name)).slice(0,12)}var{I:vt}=Ae,yt=e=>e.strings===void 0,bt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},xt=e=>(...t)=>({_$litDirective$:e,values:t}),St=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},Ct=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),Ct(e,t);return!0},wt=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},Tt=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Ot(t)}};function Et(e){this._$AN===void 0?this._$AM=e:(wt(this),this._$AM=e,Tt(this))}function Dt(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0){if(t){if(Array.isArray(r))for(let e=n;e<r.length;e++)Ct(r[e],!1),wt(r[e]);else r!=null&&(Ct(r,!1),wt(r))}else Ct(this,e)}}var Ot=e=>{e.type==bt.CHILD&&(e._$AP??=Dt,e._$AQ??=Et)},kt=class extends St{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),Tt(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Ct(this,e),wt(this))}setValue(e){if(yt(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}},At=new WeakMap,jt=xt(class extends kt{render(e){return A}update(e,[t]){let n=t!==this.G;return n&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),A}rt(e){if(this.G!==void 0){if(this.isConnected||(e=void 0),typeof this.G==`function`){let t=this.ht??globalThis,n=At.get(t);n===void 0&&(n=new WeakMap,At.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}}get lt(){return typeof this.G==`function`?At.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Mt={wallbox:`iconWallbox`,heater:`iconHeater`,climate:`iconClimate`,heatpump:`iconHeatpump`,meter:`iconMeter`},Nt=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},Pt={ctrlActive:`ctrlActiveSub`,ctrlPredictive:`ctrlPredictiveSub`,ctrlPvDelay:`ctrlPvDelaySub`,ctrlPlanControls:`ctrlPlanControlsSub`,ctrlPlanShadow:`ctrlPlanShadowSub`};function Ft(e){let{t}=e.i18n,n=e.hass.states[L.forceDischargePower],r=n?.attributes??{},i=typeof r.min==`number`?r.min:100,a=typeof r.max==`number`?r.max:1e4,o=typeof r.step==`number`?r.step:100,s=e.forcePowerDraft??z(n)??i,c=e.hass.states[L.fixedReserveSoc],l=c?.attributes??{},u=typeof l.min==`number`?l.min:0,d=typeof l.max==`number`?l.max:100,f=typeof l.step==`number`?l.step:1,p=e.reserveDraft??z(c)??u,m=(t,n)=>{let r=e.hass.states[t],i=B(r),a=!r||r.state===`unavailable`;return D`<button
      class="switch ${i?`on`:``}"
      role="switch"
      aria-checked=${i}
      aria-label=${n}
      ?disabled=${a||e.pending.has(t)}
      @click=${()=>e.onToggle(t)}
    ></button>`};return D`
    <div class="scrim ${e.open?`open`:``}" @click=${e.onClose}></div>
    <aside class="sheet ${e.open?`open`:``}" role="dialog" aria-modal="true" aria-label=${t(`controlsTitle`)} ?inert=${!e.open}>
      <div class="sheet-head">
        <div class="grow"><h2>${t(`controlsTitle`)}</h2><div class="sub">${t(`controlsSub`)}</div></div>
        <button class="btn" @click=${e.onClose}>${t(`close`)}</button>
      </div>
      ${e.error?D`<p class="err">${e.error}</p>`:A}
      <div class="release">
        <button
          class="btn action"
          ?disabled=${!e.hass.states[L.btnClear]||e.pending.has(L.btnClear)}
          @click=${()=>e.onPress(L.btnClear)}
        >${t(`btnClear`)}</button>
        <p class="sub">${t(`btnClearSub`)}</p>
      </div>
      ${Qe.map(e=>D`<div class="ctrl">
          <div class="txt"><b>${t(e)}</b><span>${t(Pt[e])}</span></div>
          ${m(L[e],t(e))}
        </div>`)}
      <div class="ctrl wrap">
        <div class="txt"><b>${t(`ctrlForce`)}</b><span>${t(`ctrlForcePower`,{v:e.fmt.w(s)})}</span></div>
        ${m(L.forceDischarge,t(`ctrlForce`))}
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
        ${m(L.fixedReserve,t(`fixedReserve`))}
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
        ${[`selWallbox`,`selMorning`,`selAuto`,`selTariff`].map(n=>{let r=e.hass.states[L[n]],i=Array.isArray(r?.attributes.options)?r.attributes.options:[];return D`<label class="ctrl">
            <span class="txt"><b>${t(n)}</b></span>
            <select
              .value=${r?.state??``}
              ?disabled=${!r||r.state===`unavailable`||e.pending.has(L[n])}
              @change=${t=>e.onSelect(L[n],t.target.value)}
            >
              ${i.map(t=>D`<option value=${t} ?selected=${t===r?.state}>${e.i18n.option(t)}</option>`)}
            </select>
          </label>`})}
        ${[`btnCharge`].map(n=>{let r=n===`btnCharge`?[t(`confirmCharge`)]:[];return D`<button
            class="btn action"
            ?disabled=${!e.hass.states[L[n]]||e.pending.has(L[n])}
            @click=${()=>{r.some(e=>!window.confirm(e))||e.onPress(L[n])}}
          >${t(n)}</button>`})}
      </div>
      <div class="sheet-section" id="display-consumers">
        <h3>${t(`displayTitle`)}</h3>
        <div class="sub">${t(`consumersSub`)}</div>
        ${e.consumers.length?e.consumers.map(n=>{let r=e.hass.states[n.entityId],i=st(r);return D`<div class="consumer">
                <label class="txt">
                  <span class="lbl">${t(`consumerName`)}</span>
                  <input
                    ${jt(e=>{e instanceof HTMLInputElement&&!Nt(e)&&e.value!==n.name&&(e.value=n.name)})}
                    maxlength="40"
                    aria-label=${t(`consumerName`)}
                    @input=${t=>e.onRenameConsumer(n.id,t.target.value)}
                  />
                  <span>${i?t(`consumerMissing`):n.entityId}</span>
                </label>
                <div class="icon-pick" role="group" aria-label=${t(`consumerIcon`)}>
                  ${rt.map(r=>D`<button
                      type="button"
                      class=${n.icon===r?`on`:``}
                      aria-pressed=${n.icon===r}
                      aria-label=${t(Mt[r])}
                      @click=${()=>e.onConsumerIcon(n.id,r)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${it[r]} /></svg>
                    </button>`)}
                </div>
                <div class="seg" role="group" aria-label=${n.name}>
                  <button type="button" class=${n.mode===`included`?`on`:``} aria-pressed=${n.mode===`included`} @click=${()=>e.onConsumerMode(n.id,`included`)}>${t(`modeIncluded`)}</button>
                  <button type="button" class=${n.mode===`separate`?`on`:``} aria-pressed=${n.mode===`separate`} @click=${()=>e.onConsumerMode(n.id,`separate`)}>${t(`modeSeparate`)}</button>
                </div>
                <button type="button" class="btn ghost" @click=${()=>e.onRemoveConsumer(n.id)}>${t(`removeConsumer`)}</button>
              </div>`}):D`<p class="hint">${t(`consumersEmpty`)}</p>`}
        ${e.wallbox?D`<button type="button" class="btn add" @click=${e.onUseWallbox}>${t(`useWallbox`)}</button>`:A}
        ${e.consumers.length<6?D`<button type="button" class="btn add" @click=${()=>e.onPick(!e.picking)}>${t(`addConsumer`)}</button>`:A}
        ${e.picking?D`<div class="picker">
              <input
                type="search"
                placeholder=${t(`consumerSearch`)}
                aria-label=${t(`consumerSearch`)}
                .value=${e.pickQuery}
                @input=${t=>e.onPickQuery(t.target.value)}
              />
              ${e.choices.length?e.choices.map(t=>D`<button type="button" class="pick" @click=${()=>e.onAddConsumer(t.id,t.name)}>
                      <b>${t.name}</b><span>${t.id}</span>
                    </button>`):D`<p class="hint">${t(`noPowerSensors`)}</p>`}
            </div>`:A}
      </div>
      <a class="link" href="#settings" @click=${t=>{t.preventDefault(),e.onAllSettings()}}>${t(`allSettings`)}</a>
    </aside>`}var It=e=>Array.isArray(e)&&e.every(e=>Array.isArray(e)&&e.length===2&&Number.isFinite(e[0]));function Lt(e){if(!e)return;let t=e;if(!(!It(t.trajectory_points)||!It(t.pv_points)||!It(t.house_points)||!It(t.grid_points)||!Array.isArray(t.trajectory_phases)||t.trajectory_points.length<2))return t}var V=e=>e.map(([e,t])=>[e,t/1e3]);function Rt(e){return{imp:e.map(([e,t])=>[e,Math.max(0,-t)/1e3]),exp:e.map(([e,t])=>[e,Math.max(0,t)/1e3])}}function zt(e,t){let n=[],r=0;for(let i=1;i<=e.length;i++)(i===e.length||e[i]!==e[r])&&(n.push({phase:e[r],x:t[r][0],x2:t[Math.min(i,t.length)-1][0]}),r=i);return n}var Bt=e=>e.grid_charge_kwh>0?`charge`:e.hold?`hold`:`release`;function Vt(e){return Array.isArray(e)?e.filter(e=>!!e&&typeof e.start==`string`&&Number.isFinite(Date.parse(e.start))&&Number.isFinite(e.price)):[]}function Ht(e){if(e.length<3)return e;let t=e.map(e=>Date.parse(e.start)),n=t.slice(1).map((e,n)=>e-t[n]).sort((e,t)=>e-t),r=n[Math.floor(n.length/2)];return e.filter((n,i)=>i===e.length-1||t[i+1]-t[i]>=r*.5)}function Ut(e){if(e.length)return{min:e.reduce((e,t)=>t.price<e.price?t:e),max:e.reduce((e,t)=>t.price>e.price?t:e)}}function Wt(e){return(e??[]).map(e=>{let t=e.lc??e.lu,n=t===void 0?Date.parse(e.last_changed??e.last_updated??``):t*1e3;return{state:e.s??e.state??``,attrs:e.a??e.attributes??{},ts:n}}).filter(e=>Number.isFinite(e.ts))}function Gt(e){return e.map(e=>[e.ts,Number.parseFloat(e.state)]).filter(([,e])=>Number.isFinite(e))}function Kt(e,t,n){let r=new Map;for(let[n,i]of e){let e=Math.floor(n/t)*t,a=r.get(e);a?a.push(i):r.set(e,[i])}return[...r.entries()].sort(([e],[t])=>e-t).map(([e,t])=>[e,n===`last`?t[t.length-1]:t.reduce((e,t)=>e+t,0)/t.length])}function qt(e,t,n=12){let r=(e,t,n)=>{let r=typeof e.timestamp==`string`?Date.parse(e.timestamp):NaN;return{phase:typeof e.phase==`string`?e.phase:t,reason:typeof e.reason==`string`?e.reason:``,ts:Number.isFinite(r)?r:n}},i=e=>e===`unavailable`||e===`unknown`||e===``,a=e.filter(e=>!i(e.state)||typeof e.attrs.phase==`string`).map(e=>r(e.attrs,e.state,e.ts));if(Array.isArray(t))for(let e of t)e&&typeof e==`object`&&a.push(r(e,``,Date.now()));a.sort((e,t)=>t.ts-e.ts);let o=[];for(let e of a){if(!e.phase)continue;let t=o[o.length-1];t&&t.phase===e.phase?o[o.length-1]=e:o.push(e)}return o.slice(0,n)}var Jt={dark:{text:`#e8edf7`,muted:`#8b96ad`,faint:`#5a6580`,bg:`#070b14`,grid:`rgba(255,255,255,0.06)`,series:`#ffffff`,track:`rgba(255,255,255,0.06)`,mode:`dark`},classic:{text:`#152033`,muted:`#5b6b80`,faint:`#8b97a8`,bg:`#eef2f6`,grid:`rgba(21,32,51,0.08)`,series:`#152033`,track:`rgba(21,32,51,0.08)`,mode:`light`}},H=Jt.dark;function Yt(e){H=e===`classic`?Jt.classic:Jt.dark}var U={pv:`#fbbf24`,house:`#a78bfa`,gridIn:`#f87171`,gridOut:`#34d399`,bat:`#22d3ee`,accent:`#38bdf8`,accent2:`#818cf8`,get text(){return H.text},get muted(){return H.muted},get faint(){return H.faint},get bg(){return H.bg},get grid(){return H.grid},get series(){return H.series},get track(){return H.track},get mode(){return H.mode}},Xt={charge:U.gridOut,hold:U.pv,release:U.bat},Zt=()=>({chart:{background:`transparent`,foreColor:U.muted,fontFamily:`Inter, system-ui, sans-serif`,toolbar:{show:!1},animations:{enabled:!1}},theme:{mode:U.mode},grid:{borderColor:U.grid,strokeDashArray:4},dataLabels:{enabled:!1},legend:{show:!1},tooltip:{theme:U.mode}}),Qt=e=>!!e&&typeof e==`object`&&!Array.isArray(e),$t=(e,t)=>{let n={...e};for(let[e,r]of Object.entries(t))n[e]=Qt(r)&&Qt(n[e])?$t(n[e],r):r;return n},W=e=>$t(Zt(),e),en=e=>({x:Date.now(),borderColor:U.text,opacity:.6,label:{text:e,orientation:`horizontal`,borderWidth:0,style:{background:U.text,color:U.bg,fontWeight:700}}}),tn=(e={})=>({type:`datetime`,labels:{datetimeUTC:!1,format:`HH:mm`},axisBorder:{show:!1},axisTicks:{show:!1},...e});function nn({traj:e,targetSoc:t,ist:n,showIst:r,fmt:i,i18n:a}){let{imp:o,exp:s}=Rt(e.grid_points),c=zt(e.trajectory_phases,e.trajectory_points).map(e=>{let t={x:e.x,x2:e.x2,fillColor:U.accent,opacity:.05};return e.x2-e.x>=18e5&&(t.label={text:a.phase(e.phase),borderWidth:0,orientation:`vertical`,position:`top`,offsetX:10,offsetY:10,style:{background:`transparent`,color:U.muted,fontSize:`11px`}}),t}),l=[{name:a.t(`legendPv`),type:`area`,data:V(e.pv_points)},{name:a.t(`legendHouse`),type:`line`,data:V(e.house_points)},{name:a.t(`legendImport`),type:`area`,data:o},{name:a.t(`legendFeed`),type:`area`,data:s},{name:a.t(`legendSoc`),type:`line`,data:e.trajectory_points}],u=[U.pv,U.house,U.gridIn,U.gridOut,U.bat],d=[2,2,1.5,1.5,3.5],f=[0,4,0,0,0],p=[`gradient`,`solid`,`gradient`,`gradient`,`solid`],m=[{seriesName:a.t(`legendPv`),min:0,title:{text:`kW`},labels:{formatter:e=>i.n(e,1)}},{seriesName:a.t(`legendPv`),show:!1},{seriesName:a.t(`legendPv`),show:!1},{seriesName:a.t(`legendPv`),show:!1},{seriesName:a.t(`legendSoc`),opposite:!0,min:0,max:100,tickAmount:5,title:{text:`SoC %`},labels:{formatter:e=>`${Math.round(e)}%`}}],h=-1;return r&&n&&(n.pv.length>1||n.house.length>1)&&(h=l.length,l.push({name:`${a.t(`legendPv`)} ${a.t(`legendActual`)}`,type:`line`,data:V(n.pv)},{name:`${a.t(`legendHouse`)} ${a.t(`legendActual`)}`,type:`line`,data:V(n.house)},{name:`${a.t(`legendSoc`)} ${a.t(`legendActual`)}`,type:`line`,data:n.soc}),u.push(U.pv,U.house,U.bat),d.push(1.5,1.5,1.5),f.push(0,0,0),p.push(`solid`,`solid`,`solid`),m.push({seriesName:a.t(`legendPv`),show:!1},{seriesName:a.t(`legendPv`),show:!1},{seriesName:a.t(`legendSoc`),opposite:!0,min:0,max:100,show:!1})),W({chart:{id:`fc`,type:`line`,height:420,zoom:{enabled:!0,type:`x`},toolbar:{show:!1,autoSelected:`zoom`}},grid:{padding:{top:t!==void 0&&t>=90?28:8}},series:l,colors:u,stroke:{width:d,curve:`smooth`,dashArray:f},fill:{type:p,gradient:{opacityFrom:.45,opacityTo:.02},opacity:l.map((e,t)=>h>=0&&t>=h?.55:1)},xaxis:tn({tooltip:{enabled:!1}}),yaxis:m,tooltip:{shared:!0,intersect:!1,x:{format:`HH:mm`},y:{formatter:(e,t)=>e==null?`–`:t?.seriesIndex===4||h>=0&&t?.seriesIndex===h+2?`${i.n(e)} %`:`${i.n(e,2)} kW`}},markers:{size:0,hover:{size:5}},annotations:{xaxis:[...c,en(a.t(`now`))],yaxis:t===void 0?[]:[{y:t,yAxisIndex:4,borderColor:U.accent2,strokeDashArray:6,label:{text:a.t(`targetLabel`,{v:Math.round(t)}),position:`right`,textAnchor:`end`,offsetX:-8,offsetY:-16,borderWidth:0,style:{background:`rgba(7,11,20,.85)`,color:`#c7d2fe`,fontSize:`12px`,padding:{left:6,right:6,top:3,bottom:3}}}}]}})}function rn(e){let t=e.trajectory_points[0][0],n=e.trajectory_points[e.trajectory_points.length-1][0];return W({chart:{id:`fc-brush`,type:`area`,height:90,brush:{enabled:!0,target:`fc`},selection:{enabled:!0,xaxis:{min:t,max:n},fill:{color:U.accent,opacity:.12},stroke:{color:U.accent}}},series:[{name:`PV`,data:V(e.pv_points)},{name:`House`,data:V(e.house_points)}],colors:[U.pv,U.house],stroke:{width:1.5,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.35,opacityTo:0}},xaxis:tn(),yaxis:{show:!1,min:0},grid:{show:!1},tooltip:{enabled:!1}})}function an({slots:e,fmt:t,i18n:n}){let r=Ht(e),i=e=>Date.parse(e.start),a=e=>{let r=Bt(e);return r===`charge`?n.t(`slotCharge`,{kwh:t.n(e.grid_charge_kwh,2)}):r===`hold`?n.t(`slotHold`):n.t(`slotRelease`)},o=(e,t)=>`<div style="display:flex;justify-content:space-between;gap:16px;color:${U.muted}"><span>${e}</span><b style="color:${U.text}">${t}</b></div>`;return W({chart:{type:`line`,height:360,zoom:{enabled:!0,type:`x`},toolbar:{show:!1,autoSelected:`zoom`}},series:[{name:n.t(`slotPrice`),type:`column`,data:r.map(e=>({x:i(e),y:+(e.price*100).toFixed(1),fillColor:Xt[Bt(e)]}))},{name:n.t(`legendPlanSoc`),type:`line`,data:r.map(e=>({x:i(e),y:e.soc_pct}))}],colors:[U.bat,U.series],stroke:{width:[0,2.5],curve:`stepline`},plotOptions:{bar:{columnWidth:`78%`,borderRadius:4,borderRadiusApplication:`end`}},fill:{opacity:[.85,1]},xaxis:tn(),yaxis:[{title:{text:`ct/kWh`},labels:{formatter:e=>t.n(e,0)}},{opposite:!0,min:0,max:100,title:{text:`SoC %`},labels:{formatter:e=>`${Math.round(e)}%`}}],tooltip:{shared:!0,intersect:!1,custom:({dataPointIndex:e})=>{let i=r[e];return i?`<div style="padding:12px 14px;min-width:190px">
          <div style="font-weight:700;margin-bottom:8px">${t.dayTime(i.start)}</div>
          ${o(n.t(`slotPrice`),`${t.n(i.price*100)} ct`)}
          ${o(n.t(`slotSoc`),`${t.n(i.soc_pct)} %`)}
          ${o(n.t(`slotConsumption`),`${t.n(i.consumption_kwh,2)} kWh`)}
          <div style="margin-top:8px;color:${Xt[Bt(i)]};font-weight:600">${a(i)}</div></div>`:``}},annotations:{xaxis:[en(n.t(`now`))]}})}function on(e,t){return W({chart:{type:`radialBar`,height:270,sparkline:{enabled:!0}},series:[e],colors:[U.bat],fill:{type:`gradient`,gradient:{shade:U.mode,type:`horizontal`,gradientToColors:[U.accent2],stops:[0,100]}},plotOptions:{radialBar:{hollow:{size:`68%`},startAngle:-135,endAngle:135,track:{background:U.track,strokeWidth:`100%`},dataLabels:{name:{show:!0,offsetY:26,color:U.muted,fontSize:`13px`},value:{offsetY:-14,fontSize:`46px`,fontWeight:800,color:U.text,formatter:e=>`${Math.round(e)}%`}}}},stroke:{lineCap:`round`},labels:[t]})}function sn(e,t,n){return W({chart:{type:`area`,height:280},series:[{data:V(e)}],colors:[t],stroke:{width:2,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.32,opacityTo:.02}},xaxis:tn(),yaxis:{decimalsInFloat:1,title:{text:`kW`},labels:{formatter:e=>n.n(e,1)}},tooltip:{x:{format:`dd.MM. HH:mm`},y:{formatter:e=>`${n.n(e,2)} kW`}}})}function cn(e,t){return W({chart:{type:`area`,height:56,sparkline:{enabled:!0}},series:[{data:e}],colors:[t],stroke:{width:2,curve:`smooth`},fill:{type:`gradient`,gradient:{opacityFrom:.35,opacityTo:0}},xaxis:{type:`datetime`},tooltip:{enabled:!1}})}var ln={pv:`M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z`,grid:`M12 2 7 22M12 2l5 20M5 9h14M4 15h16`,house:`M3 11 12 3l9 8M5 9.5V21h14V9.5M10 21v-6h4v6`,bat:`M7 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM10 3h4M9 13h6`},un={wide:{box:[600,420],hub:{x:300,y:215},pv:{x:300,y:100,labelDy:-72},grid:{x:90,y:215,labelDy:70},house:{x:510,y:215,labelDy:70},bat:{x:300,y:320,labelDy:70}},compact:{box:[360,520],hub:{x:180,y:250},pv:{x:180,y:95,labelDy:-72},grid:{x:62,y:250,labelDy:70},house:{x:298,y:250,labelDy:70},bat:{x:180,y:405,labelDy:70}}},G=30,dn=42,fn=16,pn=26;function mn(e,t,n,r){let i=t.x-e.x,a=t.y-e.y,o=Math.hypot(i,a)||1,s=Math.min(n,o/2),c=Math.min(r,o/2);return{x1:e.x+i/o*s,y1:e.y+a/o*s,x2:t.x-i/o*c,y2:t.y-a/o*c}}function hn(e,t,n,r){let i=mn(e,t,n,r);return`M${i.x1} ${i.y1} L${i.x2} ${i.y2}`}var gn=.22,_n=6e3;function vn(e){let t=Math.abs(e);return t<G?0:t<600?2:t<2e3?3:t<4500?4:5}function yn(e){return gn+Math.min(Math.abs(e),_n)/_n*1.1300000000000001}function bn(e,t){let n=t/1e3;for(let t of e){let e=Number(t.getAttribute(`data-x1`)),r=Number(t.getAttribute(`data-y1`)),i=Number(t.getAttribute(`data-x2`)),a=Number(t.getAttribute(`data-y2`)),o=Number(t.getAttribute(`data-speed`)),s=Number(t.getAttribute(`data-phase`));if(!Number.isFinite(o))continue;let c=((n*o+s)%1+1)%1,l=Math.sin(c*Math.PI),u=e+(i-e)*c,d=r+(a-r)*c;t.setAttribute(`transform`,`translate(${u.toFixed(1)} ${d.toFixed(1)})`),t.setAttribute(`opacity`,(.2+.8*l).toFixed(3))}}var xn=e=>e.length<=16?e:`${e.slice(0,15)}…`,Sn={"var(--pv)":`#9a3412`,"var(--house)":`#5b21b6`,"var(--grid-in)":`#b91c1c`,"var(--grid-out)":`#047857`,"var(--bat)":`#0e7490`,"var(--accent)":`#075985`},Cn=(e,t)=>t?Sn[e]??`#152033`:e;function wn(e,t,n,r,i,a,o){let s=o?vn(i):0;if(!s)return O``;let c=mn(e,t,n,r),l=yn(i).toFixed(3);return O`${Array.from({length:s},(e,t)=>O`<g class="electron" fill=${a} data-x1=${c.x1} data-y1=${c.y1} data-x2=${c.x2} data-y2=${c.y2} data-speed=${l} data-phase=${t/s}><circle class="halo" r="3.4"/><circle r="1.5"/><circle r="0.75" fill="#fff"/></g>`)}`}function Tn(e,t){if(t)return e?500+t*52:Math.round(380*Math.max(420,48+t*96)/420)}function En(e){let t=(e.consumers??[]).slice(0,6),n=e.compact?un.compact:un.wide,r=n.box[0]+(!e.compact&&t.length?160:0),i=e.compact?n.box[1]+t.length*58+(t.length?12:0):Math.max(n.box[1],48+t.length*96),a=r=>e.compact?{x:n.hub.x,y:n.box[1]+8+r*58,labelDy:40}:{x:n.box[0]+78,y:i*((r+1)/(t.length+1)),labelDy:44},{pv:o=0,house:s=0,grid:c=0,battery:l=0}=e,u=e.motion!==!1,d=e.outline===!0,f=e=>Cn(e,d),p=e.i18n.t,m={pv:{color:`var(--pv)`,label:p(`nodePv`),value:o,icon:ln.pv},grid:{color:c<0?`var(--grid-in)`:`var(--grid-out)`,label:p(c<0?`nodeImport`:`nodeFeed`),value:c,icon:ln.grid},house:{color:`var(--house)`,label:p(`nodeHouse`),value:s,icon:ln.house},bat:{color:`var(--bat)`,label:p(l<0?`nodeBatDischarge`:`nodeBatCharge`),value:l,icon:ln.bat}},h=[];o>G&&h.push({node:`pv`,toHub:!0}),l<-30&&h.push({node:`bat`,toHub:!0}),l>G&&h.push({node:`bat`,toHub:!1}),c<-30&&h.push({node:`grid`,toHub:!0}),c>G&&h.push({node:`grid`,toHub:!1}),s>G&&h.push({node:`house`,toHub:!1});let g=[`pv`,`grid`,`house`,`bat`],_=t.map((e,t)=>({c:e,p:a(t)}));return O`<svg viewBox="0 0 ${r} ${i}" preserveAspectRatio="xMidYMid meet" role="img" aria-label=${[...g.map(t=>`${m[t].label} ${e.fmt.w(m[t].value)}`),..._.map(({c:t})=>`${t.name} ${e.fmt.w(t.watts)}`)].join(`, `)}>
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="hubg"><stop offset="0" stop-color="rgba(56,189,248,.5)"/><stop offset="1" stop-color="rgba(56,189,248,0)"/></radialGradient>
    </defs>
    ${g.map(e=>O`<path class="flow-line" d=${hn(n[e],n.hub,dn,fn)} stroke=${m[e].color}/>`)}
    ${_.map(({c:e,p:t})=>{let r=e.mode===`included`?n.house:n.hub,i=e.mode===`included`?dn:fn,a=e.mode===`included`?`var(--house)`:`var(--accent)`;return O`<path class="flow-line" d=${hn(r,t,i,pn)} stroke=${a}/>
        ${wn(r,t,i,pn,e.watts,a,u)}`})}
    ${h.map(e=>wn(e.toHub?n[e.node]:n.hub,e.toHub?n.hub:n[e.node],e.toHub?dn:fn,e.toHub?fn:dn,m[e.node].value,m[e.node].color,u))}
    ${d?O`<circle cx=${n.hub.x} cy=${n.hub.y} r="16" fill="none" stroke="#075985" stroke-width="2.4"/>`:O`<circle cx=${n.hub.x} cy=${n.hub.y} r="46" fill="url(#hubg)"/><circle cx=${n.hub.x} cy=${n.hub.y} r="9" fill="#fff" opacity=".9"/>`}
    ${g.map(t=>{let r=m[t],i=n[t],a=Math.abs(r.value)<G,o=i.labelDy<0;return O`<g class="flow-node" opacity=${a?.55:1} role="button" tabindex="0" aria-label=${r.label} @click=${()=>e.onSelect?.(t)} @keydown=${n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),e.onSelect?.(t))}}>
        <circle cx=${i.x} cy=${i.y} r="42" fill=${d?`none`:`rgba(10,16,30,.9)`} stroke=${f(r.color)} stroke-width=${d?`2.4`:`2`} filter=${a||d?`none`:`url(#glow)`}/>
        <g transform="translate(${i.x-13} ${i.y-13}) scale(1.08)" fill="none" stroke=${f(r.color)} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${r.icon}/></g>
        <text class="node-val" x=${i.x} y=${i.y+i.labelDy} text-anchor="middle">${e.fmt.w(r.value)}</text>
        <text class="node-lbl" x=${i.x} y=${i.y+i.labelDy+(o?19:18)} text-anchor="middle">${r.label}</text>
      </g>`})}
    ${_.map(({c:t,p:n})=>{let r=f(t.mode===`included`?`var(--house)`:`var(--accent)`),i=t.missing||Math.abs(t.watts)<G;return O`<g class="flow-node" opacity=${i?.55:1} role="button" tabindex="0" aria-label=${t.name} @click=${()=>e.onSelect?.(t.id)} @keydown=${n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),e.onSelect?.(t.id))}}>
        <circle cx=${n.x} cy=${n.y} r="26" fill=${d?`none`:`rgba(10,16,30,.9)`} stroke=${r} stroke-width=${d?`2.4`:`2`} filter=${i||d?`none`:`url(#glow)`}/>
        <g transform="translate(${n.x-9} ${n.y-9}) scale(0.75)" fill="none" stroke=${r} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${it[t.icon]}/></g>
        <text class="node-val-sm" x=${n.x} y=${n.y+n.labelDy} text-anchor="middle">${e.fmt.w(t.watts)}</text>
        <text class="node-lbl-sm" x=${n.x} y=${n.y+n.labelDy+14} text-anchor="middle">${xn(t.name)}</text>
      </g>`})}
  </svg>`}var Dn=e=>{let t=e||`de`,n=(e,n=1)=>e===void 0||!Number.isFinite(e)?`–`:e.toLocaleString(t,{minimumFractionDigits:n,maximumFractionDigits:n});return{loc:t,n,w:e=>e===void 0||!Number.isFinite(e)?`–`:Math.abs(e)>=1e3?`${n(Math.abs(e)/1e3,1)} kW`:`${Math.round(Math.abs(e))} W`,time:e=>new Date(e).toLocaleTimeString(t,{hour:`2-digit`,minute:`2-digit`}),dayTime:e=>new Date(e).toLocaleString(t,{weekday:`short`,hour:`2-digit`,minute:`2-digit`})}},On=[`today`,`balance`],kn=`e3dc-maestro.groups.v1`;function An(e){return Array.isArray(e)?new Set(e.filter(e=>typeof e==`string`&&On.includes(e))):new Set}function jn(){try{return An(JSON.parse(localStorage.getItem(kn)??`null`))}catch{return new Set}}function Mn(e){try{localStorage.setItem(kn,JSON.stringify([...e]))}catch{}}function Nn(e,t,n,r){return e.callWS({type:`history/history_during_period`,start_time:new Date(n).toISOString(),end_time:new Date().toISOString(),entity_ids:t,include_start_time_state:!0,...r})}var Pn=()=>{let e=new Date;return e.setHours(0,0,0,0),e.getTime()},Fn=[`costNet`,`saving`,`selfUse`,`chargedToday`,`costToday`,`feedRevenue`,`wear`,`balance`,`gridToBattery`,`wallboxEnergy`,`curtailAvoided`];function In(e){if(!e?.length)return;let t=!1,n=0;for(let r of e)typeof r.change==`number`&&Number.isFinite(r.change)&&(t=!0,n+=r.change);return t?n:void 0}var Ln=[`costNet`,`costToday`,`feedRevenue`,`wear`,`saving`,`selfUse`,`importToday`,`feedToday`,`chargedToday`,`dischargedToday`,`gridToBattery`,`wallboxEnergy`,`curtailAvoided`,`feedInAvoided`,`feedInInterventions`].filter(e=>e!==`costNet`),Rn=e=>{let t=new Date;return e===`week`?t.setDate(t.getDate()-(t.getDay()+6)%7):t.setDate(1),t.setHours(0,0,0,0),t.getTime()};async function zn(e,t){let n=await e.callWS({type:`recorder/statistics_during_period`,start_time:new Date(Rn(t)).toISOString(),end_time:new Date().toISOString(),statistic_ids:Ln.map(e=>L[e]),period:`day`,types:[`change`]}),r={};for(let e of Ln){let t=In(n[L[e]]);t!==void 0&&(r[e]=t)}return r.costToday!==void 0&&r.feedRevenue!==void 0&&(r.costNet=r.costToday-r.feedRevenue),r}async function Bn(e){let t=await Nn(e,Fn.map(e=>L[e]),Pn(),{minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),n={};for(let e of Fn)n[e]=Kt(Gt(Wt(t[L[e]])),18e5,`last`);return n}async function Vn(e,t,n=1){return Kt(Gt(Wt((await Nn(e,[t],Date.now()-864e5,{minimal_response:!0,no_attributes:!0,significant_changes_only:!1}))[t])).map(([e,t])=>[e,t*n]),3e5,`mean`)}async function Hn(e,t=6){let n=await Nn(e,[L.pv,L.house,L.soc],Date.now()-t*36e5,{minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),r=e=>Kt(Gt(Wt(n[e])),3e5,`mean`);return{pv:r(L.pv),house:r(L.house),soc:r(L.soc)}}async function Un(e){let t=await Nn(e,[L.lastAction],Date.now()-864e5,{minimal_response:!1,no_attributes:!1,significant_changes_only:!0}),n=e.states[L.lastAction]?.attributes.history;return qt(Wt(t[L.lastAction]),n)}var Wn=new Map;function K(e,t,n){let r=Wn.get(e);if(r&&r.deps.length===t.length&&r.deps.every((e,n)=>Object.is(e,t[n])))return r.value;let i=n();return Wn.set(e,{deps:t,value:i}),i}var Gn={navLive:`Live`,navForecast:`Prognose`,navPlan:`Preisplan`,navDecision:`Entscheidung`,navSettings:`Einstellungen`,settingHelp:`Hilfe`,navControls:`Steuerung`,menu:`Menü`,subLive:`Energiefluss und Akku in Echtzeit`,subForecast:`Was Maestro für die nächsten 24 Stunden erwartet`,subPlan:`Netzladung nach dynamischem Tarif`,subDecision:`Warum Maestro gerade so regelt`,subSettings:`Regelung einstellen, von der Anlage bis zur Reserve`,regulationOn:`Regelung aktiv`,regulationOff:`Regelung aus`,flowTitle:`Energiefluss`,flowSub:`Jetzt · aktualisiert live`,nodePv:`PV`,nodeHouse:`Haus`,nodeImport:`Netzbezug`,nodeFeed:`Einspeisung`,nodeBatDischarge:`Akku entlädt`,nodeBatCharge:`Akku lädt`,battery:`Akku`,stateOfCharge:`Ladezustand`,targetSoc:`Ziel-SoC`,autonomy:`Autonomie`,discharging:`Entladung`,charging:`Ladung`,chipReachable:`E3DC erreichbar`,chipChargeLock:`Ladesperre`,chipDischargeLock:`Entladesperre`,chipHt:`HT-Schutz`,chipCurtail:`Abregelschutz`,chipEmergency:`Notladung`,chipFeedIn:`Einspeisedrosselung`,chipGridCharge:`Netzladung`,chipBatteryPriority:`Akku-Priorität`,chipLowYield:`Schwacher PV-Tag`,chipPredictive:`Vorausschauende Ladung`,chipShadow:`Preisplan · Schatten`,groupToday:`Heute`,groupWeek:`Woche`,groupMonth:`Monat`,groupNet:`netto`,periodToday:`Heute`,periodWeek:`Woche`,periodMonth:`Monat`,forceTitle:`Erzwungene Entladung`,fixedReserve:`Notstromreserve`,ctrlReserveSoc:`{v} %`,exportCsv:`CSV`,actionsTitle:`Aktionen`,btnClear:`Limits freigeben`,btnClearSub:`Hebt Lade- und Entladegrenzen sofort auf und setzt den Wechselrichter auf Normal.`,btnCharge:`Manuell laden (3 kWh)`,confirmCharge:`3 kWh aus dem Netz laden?`,selWallbox:`Wallbox-Typ`,selMorning:`Vorentladung`,selAuto:`Auto-Ziel`,selTariff:`Tarif`,debugTitle:`Debug-Log`,debugEmpty:`Noch keine Debug-Zeilen. Der Schalter startet das Logging.`,debugSwitch:`Debug-Logging`,balanceTitle:`Tagesbilanz`,balanceWeek:`Wochenbilanz`,balanceMonth:`Monatsbilanz`,whenToday:`heute`,whenWeek:`diese Woche`,whenMonth:`diesen Monat`,kpiCostGross:`Stromkosten`,kpiCostGrossSub:`Netzbezug brutto`,kpiRevenue:`Einspeise-Erlös`,kpiRevenueSub:`Vergütung {when}`,kpiWear:`Akku-Verschleiß`,kpiWearSub:`anteilige Zyklenkosten`,kpiBalance:`Energiebilanz`,kpiBalanceSub:`Erlös + Ersparnis − Kosten − Verschleiß`,kpiGridBat:`Netz → Akku`,kpiGridBatSub:`aus dem Netz geladen`,kpiGridBatWarn:`Netzladung ohne Rechtfertigung`,kpiWallbox:`Wallbox {when}`,kpiWallboxSub:`geladene Energie`,kpiFeedLimit:`Einspeisebegrenzung`,kpiFeedLimitSub:`{n} Eingriffe · {dc} kWh DC-Abregelung`,kpiCost:`Stromkosten {when}`,kpiCostSub:`netto nach Einspeisung`,kpiSaving:`PV-Ersparnis {when}`,kpiSavingSub:`gegenüber reinem Netzbezug`,kpiSelf:`Eigenverbrauch {when}`,kpiSelfSub:`Netzbezug {imp} kWh · Einspeisung {feed} kWh`,kpiBattery:`Akku {when}`,kpiBatterySub:`geladen · {out} kWh entladen`,chartTitle:`SoC-Trajektorie & Leistungen · nächste 24 h`,legendSoc:`SoC`,legendPv:`PV`,legendHouse:`Haus`,legendImport:`Netzbezug`,legendFeed:`Einspeisung`,legendActual:`Ist`,actualOverlay:`Ist-Verlauf`,now:`Jetzt`,targetLabel:`Ziel-SoC {v}%`,hoursShort:`{h} h`,statMinMax:`SoC Min / Max`,statImport:`Netzbezug`,statFeed:`Einspeisung`,statAutarky:`Autarkie`,statPvTomorrow:`PV morgen`,statP10:`PV-Rest (P10)`,statDeficit:`Defizit morgen`,statYield:`PV-Tag`,statYieldSub:`{today} / {ref} kWh Referenz`,qualityLabel:`Datenqualität`,qualityOk:`vollständig`,qualityPv:`PV-Profil fehlt`,qualityConsumption:`Verbrauchsprofil fehlt`,qualityBoth:`Profile fehlen`,qualityUnknown:`unbekannt`,reserveTitle:`Ziel-SoC`,reserveSeasonal:`Notstromreserve`,reserveAdaptive:`Reserve adaptiv`,reserveHt:`HT-Reserve`,reserveForward:`Vorausschau`,windowsTitle:`Ladefenster`,windowAstro:`Astro-Start`,windowSeasonalEnd:`Saison-Ende`,windowPvDelay:`PV-Verzögerung`,windowTomorrow:`Morgen`,autoTitle:`Auto-Strategie`,autoSaving:`Geschätzte Einsparung`,alertUnreachable:`E3DC ist nicht erreichbar`,alertChargeLock:`Ladesperre aktiv`,alertDischargeLock:`Entladesperre aktiv`,alertUnjustified:`Netzladung ohne Rechtfertigung`,noForecast:`Noch keine Prognose verfügbar. Maestro braucht mindestens 7 Tage Verlauf.`,priceTitle:`Strompreis & geplanter SoC`,legendCharge:`Netzladung`,legendHold:`Akku halten`,legendRelease:`Akku frei`,legendPlanSoc:`SoC geplant`,planShadow:`Schattenmodus · steuert nicht`,planActive:`Aktiv · steuert den Akku`,planTitle:`Plan`,planGridCharge:`Netzladung geplant`,planSaving:`Erwartete Ersparnis`,planCheapest:`Günstigster Slot`,planMostExpensive:`Teuerster Slot`,planKnownUntil:`Preise bekannt bis`,noPlan:`Es liegt kein Preisplan vor. Er braucht einen dynamischen Tarif.`,planTune:`Schwellwerte`,planTuneHint:`Diese Werte entscheiden, wann aus dem Netz geladen wird.`,planTuneTariff:`Tarif`,planTuneTariffHint:`Bei dynamischem Tarif gilt ein Preis bis zur Günstig-Schwelle als günstig.`,planTuneGrid:`Netzladung im günstigen Fenster`,planTuneGridHint:`Im günstigen Slot wird bis zum Ziel geladen, höchstens das Tagesbudget.`,planTunePlan:`Preisplan`,planTunePlanHint:`Netzladung nur, wenn die Preisspanne Wirkungsgrad und Verschleiß deckt, und nur bis zur SoC-Obergrenze.`,slotPrice:`Preis`,slotSoc:`SoC`,slotConsumption:`Verbrauch`,slotCharge:`Netzladung {kwh} kWh`,slotHold:`Akku halten`,slotRelease:`Akku frei`,decisionPhase:`Aktuelle Regelphase`,tagTargetSoc:`Ziel-SoC {v} %`,tagTargetPower:`Ziel-Ladeleistung {v}`,tagBatteryPriority:`Akku-Priorität`,tagSince:`seit {t}`,limitsTitle:`Limits · Soll vs. gesendet`,limitsSub:`Was Maestro will und was am E3DC ankommt`,limitCharge:`Ladelimit`,limitDischarge:`Entladelimit`,limitTarget:`Soll {a} · gesendet {b}`,limitNone:`kein Limit`,entitiesMissing:`Nicht verfügbar: {list}. Diese Maestro-Entities fehlen oder sind deaktiviert – bitte unter Einstellungen › Entitäten prüfen.`,entityDisabled:`deaktiviert`,notSetUp:`E3DC Maestro ist nicht eingerichtet oder noch nicht gestartet.`,limitSoc:`aktuell {a} % → {b} %`,timelineTitle:`Verlauf der Entscheidungen`,timelineEmpty:`Noch keine Entscheidungen aufgezeichnet.`,noDecision:`Noch keine Entscheidung vorhanden.`,controlsTitle:`Schnellsteuerung`,controlsSub:`Wirkt sofort auf die Regelung`,close:`Schließen`,historySub:`Letzte 24 Stunden`,historyEmpty:`Keine Verlaufsdaten in den letzten 24 Stunden.`,historyFailed:`Der Verlauf konnte nicht geladen werden.`,ctrlActive:`Regelung aktiv`,ctrlActiveSub:`Maestro steuert die Lade- und Entladelimits`,ctrlPredictive:`Vorausschauende Ladung`,ctrlPredictiveSub:`Ladeziel aus Prognose und Verbrauch`,ctrlPvDelay:`PV-Prognose-Verzögerung`,ctrlPvDelaySub:`Ladestart verschieben, wenn PV reicht`,ctrlPlanControls:`Preisplan steuert Akku`,ctrlPlanControlsSub:`Aus = nur Schattenmodus`,ctrlPlanShadow:`Preisplan Schattenmodus`,ctrlPlanShadowSub:`Plan berechnen, aber nichts senden`,ctrlForce:`Erzwungene Entladung`,ctrlForcePower:`Leistung {v}`,allSettings:`Alle Einstellungen öffnen →`,displayTitle:`Anzeige`,consumersSub:`Verbraucher im Energiefluss der Live-Ansicht`,addConsumer:`Verbraucher hinzufügen`,consumerSearch:`Leistungssensor suchen`,consumerName:`Name im Energiefluss`,consumerIcon:`Symbol`,iconWallbox:`Wallbox`,iconHeater:`Heizstab`,iconClimate:`Klimaanlage`,iconHeatpump:`Wärmepumpe`,iconMeter:`Leistungsmesser`,modeIncluded:`Im Hausverbrauch`,modeSeparate:`Separat gemessen`,useWallbox:`Wallbox übernehmen`,removeConsumer:`Entfernen`,editConsumers:`Verbraucher bearbeiten`,consumersEmpty:`Noch keine Verbraucher. Wallbox, Wärmepumpe und weitere Lasten kannst du hier ergänzen.`,consumersOverflow:`Die enthaltenen Verbraucher liegen über der Hausleistung. Prüfe, ob sie wirklich im Hauszähler stecken.`,noPowerSensors:`Keine passenden Leistungssensoren gefunden.`,consumerMissing:`Sensor nicht verfügbar`,unavailable:`nicht verfügbar`,callFailed:`Aktion fehlgeschlagen: {err}`,chartError:`Chart konnte nicht geladen werden: {err}`,loading:`Lädt …`,demoHint:`Keine Daten`,setHardware:`Anlage`,setHardwareHint:`Anlagendaten, mit denen Maestro Leistungen und Grenzen rechnet.`,setCorridor:`Ziel-SoC und Ladekorridor`,setCorridorHint:`Wohin der Akku am Tag soll: Schwelle, Korridor, Ladeende und harte Deckel.`,setWindows:`Vorausschau und Zeitfenster`,setWindowsHint:`Wann geladen wird: Prognose, Sonne, Morgen-Deckel und Verteilung über den Tag.`,setYield:`Wenig PV und Abregelung`,setYieldHint:`Akku vor Einspeisung füllen, Abregelung abfangen und spät nachladen.`,setTariff:`Netz und Tarif`,setTariffHint:`Dieselben Schwellwerte stehen im Preisplan. Tarif-Slots bleiben unter Integration konfigurieren.`,setReserve:`Hochtarif und Reserve`,setReserveHint:`HT-Fenster und Notstromreserve. Lookback der adaptiven Reserve bleibt unter Integration konfigurieren.`,setFlex:`Wallbox, Wärmepumpe, Vorentladung`,setFlexHint:`Zusätzliche Lasten und das morgendliche Entladen vor dem Ladestart.`,setControl:`Steuerverhalten`,setControlHint:`Hauptschalter, erzwungene Entladung und wie ruhig die Regelung nachregelt.`,setDiag:`Diagnose und Aktionen`,setDiagHint:`Debug-Protokoll und einmalige Aktionen.`,confirmReset:`Tagesstatistik auf 0 setzen?`,settingsPending:`Einstellungen werden geladen …`,settingsBack:`Alle Bereiche`,setClassic:`Classic-Dashboard`,setClassicHint:`Mit einem Klick anlegen`,classicLead:`Das Classic-Dashboard ist die Lovelace-Ansicht mit allen Tabs, auch Auto-Optimierung, Sizing-Berater und Hilfe. Maestro legt es hier direkt an.`,classicDepsTitle:`Benötigte Karten`,classicDepMushroom:`Mushroom Cards`,classicDepApex:`ApexCharts Card`,classicDepVia:`HACS → Frontend`,classicInstalled:`installiert`,classicMissing:`fehlt – über HACS → Frontend installieren`,classicDepsMissing:`Ohne diese Karten zeigt das Dashboard Fehlerkacheln. Erst installieren, dann den Browser neu laden.`,classicActionTitle:`Dashboard`,classicChecking:`Prüfe, ob das Dashboard schon angelegt ist …`,classicCreate:`Dashboard anlegen`,classicSetup:`Inhalt einrichten`,classicCreating:`Wird angelegt …`,classicReady:`Das Dashboard E3DC Maestro ist angelegt und steht in der Seitenleiste.`,classicEmpty:`Unter dem Pfad e3dc-maestro gibt es ein leeres Dashboard. Maestro richtet den Inhalt dort ein.`,classicForeign:`Unter dem Pfad e3dc-maestro liegt schon ein Dashboard mit anderem Inhalt. Maestro überschreibt es nicht. Zum Neuanlegen dieses Dashboard unter Einstellungen → Dashboards löschen.`,classicAdminOnly:`Anlegen können nur Administratoren.`,classicFailed:`Das hat nicht geklappt: {err}`,classicRetry:`Erneut prüfen`,classicManual:`Manuell anlegen`,classicHa:`Der Eintrag unter Community dashboards erscheint ab Home Assistant 2026.5. In älteren Versionen das Dashboard leer anlegen (Titel E3DC Maestro, Pfad e3dc-maestro) und den Inhalt von maestro_dashboard.yaml im YAML-Editor einfügen.`,classicStep1:`Integration E3DC Maestro einrichten. Läuft sie schon, Home Assistant einmal neu starten.`,classicStep2:`Den Browser hart neu laden, damit das Dashboard-Modul geladen ist.`,classicStep3:`Einstellungen → Dashboards → Dashboard hinzufügen.`,classicStep4:`Unter Community dashboards E3DC Maestro wählen.`,classicStep5:`Titel E3DC Maestro und das vorgeschlagene Icon bestätigen, dann anlegen.`,classicPath:`Der Pfad muss e3dc-maestro bleiben. Den vorgeschlagenen Titel nicht umbenennen, bevor der Slug feststeht. Sonst zeigen die Hilfe-Links ins Leere.`,classicAfter:`Das Dashboard baut sich bei jedem Öffnen aus der aktuellen Maestro-Vorlage auf. Updates kommen damit automatisch an, solange du es nicht im Editor übernimmst.`,classicTimeout:`Kommt „Timeout waiting for strategy element ll-strategy-dashboard-e3dc-maestro“: Home Assistant neu starten, den Browser hart neu laden und unter Einstellungen → Dashboards → Ressourcen prüfen, ob ganz oben /local/e3dc_maestro/e3dc-maestro-strategy.js als JavaScript-Modul steht (direkt nach dem ersten Einrichten noch /e3dc_maestro/frontend/e3dc-maestro-strategy.js).`,classicOpen:`Dashboard öffnen`,setLook:`Darstellung`,setLookHint:`Heller oder dunkler Look. Weitere Themes kommen hier dazu.`,themeDark:`Dunkel`,themeDarkHint:`Das bisherige Nacht-Cockpit.`,themeClassic:`Classic`,themeClassicHint:`Helles Cockpit, dieselben Farben für PV, Haus und Netz.`},Kn={navLive:`Live`,navForecast:`Forecast`,navPlan:`Price plan`,navDecision:`Decision`,navSettings:`Settings`,settingHelp:`Help`,navControls:`Controls`,menu:`Menu`,subLive:`Energy flow and battery in real time`,subForecast:`What Maestro expects for the next 24 hours`,subPlan:`Grid charging by dynamic tariff`,subDecision:`Why Maestro regulates the way it does`,subSettings:`Tune the control, from the system up to the reserve`,regulationOn:`Regulation active`,regulationOff:`Regulation off`,flowTitle:`Energy flow`,flowSub:`Now · live`,nodePv:`PV`,nodeHouse:`House`,nodeImport:`Grid import`,nodeFeed:`Feed-in`,nodeBatDischarge:`Battery discharging`,nodeBatCharge:`Battery charging`,battery:`Battery`,stateOfCharge:`State of charge`,targetSoc:`Target SoC`,autonomy:`Autonomy`,discharging:`Discharging`,charging:`Charging`,chipReachable:`E3DC reachable`,chipChargeLock:`Charge lock`,chipDischargeLock:`Discharge lock`,chipHt:`HT protection`,chipCurtail:`Curtailment guard`,chipEmergency:`Emergency charge`,chipFeedIn:`Feed-in curtailment`,chipGridCharge:`Grid charge`,chipBatteryPriority:`Battery priority`,chipLowYield:`Low-yield day`,chipPredictive:`Predictive charging`,chipShadow:`Price plan · shadow`,groupToday:`Today`,groupWeek:`Week`,groupMonth:`Month`,groupNet:`net`,periodToday:`Today`,periodWeek:`Week`,periodMonth:`Month`,forceTitle:`Forced discharge`,fixedReserve:`Emergency reserve`,ctrlReserveSoc:`{v}%`,exportCsv:`CSV`,actionsTitle:`Actions`,btnClear:`Release limits`,btnClearSub:`Clears charge and discharge limits immediately and sets the inverter to normal.`,btnCharge:`Manual charge (3 kWh)`,confirmCharge:`Charge 3 kWh from the grid?`,selWallbox:`Wallbox type`,selMorning:`Pre-discharge`,selAuto:`Auto objective`,selTariff:`Tariff`,debugTitle:`Debug log`,debugEmpty:`No debug lines yet. The switch starts logging.`,debugSwitch:`Debug logging`,balanceTitle:`Daily balance`,balanceWeek:`Weekly balance`,balanceMonth:`Monthly balance`,whenToday:`today`,whenWeek:`this week`,whenMonth:`this month`,kpiCostGross:`Electricity cost`,kpiCostGrossSub:`grid import, gross`,kpiRevenue:`Feed-in revenue`,kpiRevenueSub:`remuneration {when}`,kpiWear:`Battery wear`,kpiWearSub:`share of cycle cost`,kpiBalance:`Energy balance`,kpiBalanceSub:`revenue + savings − cost − wear`,kpiGridBat:`Grid → battery`,kpiGridBatSub:`charged from the grid`,kpiGridBatWarn:`Grid charge without justification`,kpiWallbox:`Wallbox {when}`,kpiWallboxSub:`energy charged`,kpiFeedLimit:`Feed-in limit`,kpiFeedLimitSub:`{n} interventions · {dc} kWh DC curtailment`,kpiCost:`Electricity cost {when}`,kpiCostSub:`net of feed-in`,kpiSaving:`PV savings {when}`,kpiSavingSub:`vs. grid-only supply`,kpiSelf:`Self-consumption {when}`,kpiSelfSub:`Import {imp} kWh · feed-in {feed} kWh`,kpiBattery:`Battery {when}`,kpiBatterySub:`charged · {out} kWh discharged`,chartTitle:`SoC trajectory & power · next 24 h`,legendSoc:`SoC`,legendPv:`PV`,legendHouse:`House`,legendImport:`Import`,legendFeed:`Feed-in`,legendActual:`Actual`,actualOverlay:`Actuals`,now:`Now`,targetLabel:`Target SoC {v}%`,hoursShort:`{h} h`,statMinMax:`SoC min / max`,statImport:`Grid import`,statFeed:`Feed-in`,statAutarky:`Self-sufficiency`,statPvTomorrow:`PV tomorrow`,statP10:`PV remaining (P10)`,statDeficit:`Deficit tomorrow`,statYield:`PV day`,statYieldSub:`{today} / {ref} kWh reference`,qualityLabel:`Data quality`,qualityOk:`complete`,qualityPv:`PV profile missing`,qualityConsumption:`Consumption profile missing`,qualityBoth:`Profiles missing`,qualityUnknown:`unknown`,reserveTitle:`Target SoC`,reserveSeasonal:`Emergency reserve`,reserveAdaptive:`Reserve, adaptive`,reserveHt:`HT reserve`,reserveForward:`Look-ahead`,windowsTitle:`Charge window`,windowAstro:`Astro start`,windowSeasonalEnd:`Season end`,windowPvDelay:`PV delay`,windowTomorrow:`Tomorrow`,autoTitle:`Auto strategy`,autoSaving:`Estimated saving`,alertUnreachable:`E3DC is not reachable`,alertChargeLock:`Charge lock active`,alertDischargeLock:`Discharge lock active`,alertUnjustified:`Grid charge without justification`,noForecast:`No forecast yet. Maestro needs at least 7 days of history.`,priceTitle:`Electricity price & planned SoC`,legendCharge:`Grid charge`,legendHold:`Hold battery`,legendRelease:`Battery free`,legendPlanSoc:`Planned SoC`,planShadow:`Shadow mode · not controlling`,planActive:`Active · controls the battery`,planTitle:`Plan`,planGridCharge:`Planned grid charging`,planSaving:`Expected saving`,planCheapest:`Cheapest slot`,planMostExpensive:`Most expensive slot`,planKnownUntil:`Prices known until`,noPlan:`There is no price plan. It needs a dynamic tariff.`,planTune:`Thresholds`,planTuneHint:`These values decide when the battery charges from the grid.`,planTuneTariff:`Tariff`,planTuneTariffHint:`With a dynamic tariff, a price up to the cheap threshold counts as cheap.`,planTuneGrid:`Grid charging in the cheap window`,planTuneGridHint:`In a cheap slot Maestro charges up to the target, limited by the daily budget.`,planTunePlan:`Price plan`,planTunePlanHint:`Grid charging only when the price spread covers efficiency and wear, and only up to the SoC cap.`,slotPrice:`Price`,slotSoc:`SoC`,slotConsumption:`Consumption`,slotCharge:`Grid charge {kwh} kWh`,slotHold:`Hold battery`,slotRelease:`Battery free`,decisionPhase:`Current control phase`,tagTargetSoc:`Target SoC {v} %`,tagTargetPower:`Target charge power {v}`,tagBatteryPriority:`Battery priority`,tagSince:`since {t}`,limitsTitle:`Limits · target vs. sent`,limitsSub:`What Maestro wants and what reaches the E3DC`,limitCharge:`Charge limit`,limitDischarge:`Discharge limit`,limitTarget:`Target {a} · sent {b}`,limitNone:`no limit`,entitiesMissing:`Not available: {list}. These Maestro entities are missing or disabled – please check Settings › Entities.`,entityDisabled:`disabled`,notSetUp:`E3DC Maestro is not set up or has not started yet.`,limitSoc:`now {a} % → {b} %`,timelineTitle:`Decision history`,timelineEmpty:`No decisions recorded yet.`,noDecision:`No decision available yet.`,controlsTitle:`Quick controls`,controlsSub:`Takes effect immediately`,close:`Close`,historySub:`Last 24 hours`,historyEmpty:`No history for the last 24 hours.`,historyFailed:`The history could not be loaded.`,ctrlActive:`Regulation active`,ctrlActiveSub:`Maestro controls charge and discharge limits`,ctrlPredictive:`Predictive charging`,ctrlPredictiveSub:`Charge target from forecast and consumption`,ctrlPvDelay:`PV forecast delay`,ctrlPvDelaySub:`Postpone charging when PV is enough`,ctrlPlanControls:`Price plan controls battery`,ctrlPlanControlsSub:`Off = shadow mode only`,ctrlPlanShadow:`Price plan shadow mode`,ctrlPlanShadowSub:`Compute the plan but send nothing`,ctrlForce:`Forced discharge`,ctrlForcePower:`Power {v}`,allSettings:`Open all settings →`,displayTitle:`Display`,consumersSub:`Consumers in the live energy flow`,addConsumer:`Add consumer`,consumerSearch:`Search power sensors`,consumerName:`Name in the energy flow`,consumerIcon:`Icon`,iconWallbox:`Wallbox`,iconHeater:`Heating rod`,iconClimate:`Air conditioning`,iconHeatpump:`Heat pump`,iconMeter:`Power meter`,modeIncluded:`In house load`,modeSeparate:`Measured separately`,useWallbox:`Add wallbox`,removeConsumer:`Remove`,editConsumers:`Edit consumers`,consumersEmpty:`No consumers yet. Add a wallbox, heat pump or other loads here.`,consumersOverflow:`Included consumers exceed the house load. Check whether they are really part of the house meter.`,noPowerSensors:`No matching power sensors found.`,consumerMissing:`Sensor unavailable`,unavailable:`unavailable`,callFailed:`Action failed: {err}`,chartError:`Chart failed to load: {err}`,loading:`Loading …`,demoHint:`No data`,setHardware:`System`,setHardwareHint:`Plant data Maestro uses to calculate power and limits.`,setCorridor:`Target SoC and charge corridor`,setCorridorHint:`Where the battery should be today: threshold, corridor, charge end and hard caps.`,setWindows:`Look-ahead and time windows`,setWindowsHint:`When to charge: forecast, sun, morning cap and spreading across the day.`,setYield:`Low PV and curtailment`,setYieldHint:`Fill the battery before feed-in, catch curtailment and top up late.`,setTariff:`Grid and tariff`,setTariffHint:`The same thresholds are on the price plan screen. Tariff slots stay in the integration options.`,setReserve:`High tariff and reserve`,setReserveHint:`HT window and emergency reserve. Adaptive-reserve lookback stays in the integration options.`,setFlex:`Wallbox, heat pump, pre-discharge`,setFlexHint:`Extra loads and the morning discharge before charging starts.`,setControl:`Control behaviour`,setControlHint:`Master switch, forced discharge and how calmly the control follows.`,setDiag:`Diagnostics and actions`,setDiagHint:`Debug log and one-off actions.`,confirmReset:`Reset today's statistics to 0?`,settingsPending:`Loading settings …`,settingsBack:`All areas`,setClassic:`Classic dashboard`,setClassicHint:`Add it with one click`,classicLead:`The classic dashboard is the Lovelace view with every tab, including auto-optimisation, sizing advisor and help. Maestro creates it right here.`,classicDepsTitle:`Required cards`,classicDepMushroom:`Mushroom Cards`,classicDepApex:`ApexCharts Card`,classicDepVia:`HACS → Frontend`,classicInstalled:`installed`,classicMissing:`missing – install via HACS → Frontend`,classicDepsMissing:`Without these cards the dashboard shows error tiles. Install them first, then reload the browser.`,classicActionTitle:`Dashboard`,classicChecking:`Checking whether the dashboard already exists …`,classicCreate:`Create dashboard`,classicSetup:`Set up content`,classicCreating:`Creating …`,classicReady:`The E3DC Maestro dashboard exists and is in the sidebar.`,classicEmpty:`There is an empty dashboard at the path e3dc-maestro. Maestro sets up its content there.`,classicForeign:`A dashboard with other content already uses the path e3dc-maestro. Maestro does not overwrite it. To start over, delete it under Settings → Dashboards.`,classicAdminOnly:`Only administrators can create it.`,classicFailed:`That did not work: {err}`,classicRetry:`Check again`,classicManual:`Add it manually`,classicHa:`The Community dashboards entry appears from Home Assistant 2026.5. On older versions, create an empty dashboard (title E3DC Maestro, path e3dc-maestro) and paste maestro_dashboard.yaml into the YAML editor.`,classicStep1:`Set up the E3DC Maestro integration. If it is already running, restart Home Assistant once.`,classicStep2:`Hard-reload the browser so the dashboard module is loaded.`,classicStep3:`Settings → Dashboards → Add dashboard.`,classicStep4:`Under Community dashboards, choose E3DC Maestro.`,classicStep5:`Confirm the title E3DC Maestro and the suggested icon, then create it.`,classicPath:`The path must stay e3dc-maestro. Do not rename the suggested title before the slug is set, or the help links inside the dashboard point nowhere.`,classicAfter:`The dashboard is built from the current Maestro template every time it opens, so updates arrive automatically as long as you do not take control of it in the editor.`,classicTimeout:`If you see “Timeout waiting for strategy element ll-strategy-dashboard-e3dc-maestro”: restart Home Assistant, hard-reload the browser, and under Settings → Dashboards → Resources check that /local/e3dc_maestro/e3dc-maestro-strategy.js is the first JavaScript module (right after first setup it is still /e3dc_maestro/frontend/e3dc-maestro-strategy.js).`,classicOpen:`Open dashboard`,setLook:`Appearance`,setLookHint:`Light or dark look. Further themes will live here.`,themeDark:`Dark`,themeDarkHint:`The current night cockpit.`,themeClassic:`Classic`,themeClassicHint:`A light cockpit, with the same colours for PV, house and grid.`},qn={e3dc:`E3DC`,generic:`Generisch`,off:`Aus`,passive:`Passiv`,active_house:`Aktiv Haus`,active_grid:`Aktiv Netz`,self_consumption:`Eigenverbrauch`,cost:`Kosten`,co2:`CO₂`,fixed:`Fest`,dynamic:`Dynamisch`},Jn={e3dc:`E3DC`,generic:`Generic`,off:`Off`,passive:`Passive`,active_house:`Active, house`,active_grid:`Active, grid`,self_consumption:`Self-consumption`,cost:`Cost`,co2:`CO₂`,fixed:`Fixed`,dynamic:`Dynamic`},Yn={off:`Aus`,manual:`Manuell`,emergency:`Notladung`,feed_in_limit:`Einspeisebegrenzung`,reserve_protection:`Reserveschutz`,evcc_pause:`EVCC-Pause`,ht_protection:`HT-Schutz`,force_discharge:`Erzwungene Entladung`,morning_discharge:`Morgen-Entladung`,astro_wait:`Astro-Wartezeit`,morning_cap:`Morgen-Deckel`,hard_soc_limit:`SoC-Deckel`,fast_floor:`Schnell-Boden`,grid_charge:`Netzladung`,grid_hold:`Akku halten`,corridor:`Ladekorridor`,pv_delay:`PV-Verzögerung`,spreading:`Spreading`,curtailment_guard:`Abregelschutz`,idle:`Leerlauf`},Xn={off:`Off`,manual:`Manual`,emergency:`Emergency charge`,feed_in_limit:`Feed-in limit`,reserve_protection:`Reserve protection`,evcc_pause:`EVCC pause`,ht_protection:`HT protection`,force_discharge:`Forced discharge`,morning_discharge:`Morning discharge`,astro_wait:`Astro wait`,morning_cap:`Morning cap`,hard_soc_limit:`SoC cap`,fast_floor:`Fast floor`,grid_charge:`Grid charge`,grid_hold:`Hold battery`,corridor:`Charge corridor`,pv_delay:`PV delay`,spreading:`Spreading`,curtailment_guard:`Curtailment guard`,idle:`Idle`};function Zn(e){let t=!e||e.toLowerCase().startsWith(`de`),n=t?Gn:Kn,r=t?Yn:Xn,i=t?qn:Jn;return{t:(e,t)=>{let r=n[e];if(t)for(let[e,n]of Object.entries(t))r=r.replace(`{${e}}`,String(n));return r},phase:e=>r[e]??e,option:e=>i[e]??e}}var Qn=o`
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
    border-color: rgba(56, 189, 248, 0.6);
  }
  .btn svg {
    width: 16px;
    height: 16px;
  }
  .btn.primary {
    border-color: rgba(56, 189, 248, 0.7);
    background: linear-gradient(180deg, rgba(56, 189, 248, 0.35), rgba(56, 189, 248, 0.15));
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
`,$n=[`dark`,`classic`],er=`e3dc-maestro.theme.v1`;function tr(e){return e===`classic`?`classic`:`dark`}function nr(){try{return tr(localStorage.getItem(er))}catch{return`dark`}}function rr(e){try{localStorage.setItem(er,e)}catch{}}var ir=`e3dc-maestro`,ar=`custom:e3dc-maestro`,or=e=>e instanceof Error?e.message:typeof e==`object`&&e&&`message`in e?String(e.message):String(e),sr=e=>typeof e==`object`&&e&&`code`in e?String(e.code):void 0,cr=(e,t)=>e.some(e=>e.toLowerCase().includes(t));function lr(e){if(!e||typeof e!=`object`)return`empty`;let t=e.strategy;if(t?.type===`custom:e3dc-maestro`)return`ours`;let n=e.views;return Object.keys(e).length===0||Array.isArray(n)&&n.length===0&&!t?`empty`:`foreign`}async function ur(e){try{let t=(await e.callWS({type:`lovelace/resources`})).map(e=>e.url??``);return{mushroom:cr(t,`mushroom`),apex:cr(t,`apexcharts-card`)}}catch{return{}}}async function dr(e){if(!(await e.callWS({type:`lovelace/dashboards/list`})).some(e=>e.url_path===`e3dc-maestro`))return`missing`;try{return lr(await e.callWS({type:`lovelace/config`,url_path:ir,force:!1}))}catch(e){if(sr(e)===`config_not_found`)return`empty`;throw e}}async function fr(e){let t=await ur(e);try{return{state:await dr(e),...t}}catch(e){return{state:`error`,error:or(e),...t}}}async function pr(e,t){if(t===`missing`)await e.callWS({type:`lovelace/dashboards/create`,url_path:ir,title:`E3DC Maestro`,icon:`mdi:battery-charging`,require_admin:!1,show_in_sidebar:!0,mode:`storage`});else if(t!==`empty`)return;await e.callWS({type:`lovelace/config/save`,url_path:ir,config:{strategy:{type:ar}}})}var mr={inverter_power:{de:`Leistung des Wechselrichters. Begrenzt, wie stark Maestro den Akku entladen darf.`,en:`Inverter power. Caps how hard Maestro may discharge the battery.`},installed_kwp:{de:`Installierte PV-Leistung. Daraus vergleicht Maestro den Tagesertrag.`,en:`Installed PV power. Maestro compares the day's yield against this.`},max_charge_power:{de:`Höchste Ladeleistung, die Maestro anfordern darf.`,en:`Highest charge power Maestro may request.`},min_charge_power:{de:`Unter dieser Leistung startet Maestro keine Ladung.`,en:`Maestro does not start charging below this power.`},feed_in_limit_percent:{de:`Anteil der Wechselrichterleistung, der höchstens ins Netz gehen darf.`,en:`Share of inverter power that may be exported at most.`},charge_threshold:{de:`Ab diesem SoC beginnt das gezielte Laden zum Tagesziel.`,en:`Targeted charging towards the daily goal starts at this SoC.`},advanced_corridor:{de:`Statt einer Schwelle gilt ein SoC-Band zwischen unterem und oberem Korridor.`,en:`A SoC band between the lower and upper corridor replaces a single threshold.`},lower_corridor:{de:`Untergrenze des Ladebands. Darunter wird nachgeladen.`,en:`Bottom of the charge band. Below it, Maestro charges again.`},upper_corridor:{de:`Obergrenze des Ladebands. Darüber stoppt die gezielte Ladung.`,en:`Top of the charge band. Targeted charging stops above it.`},charge_target:{de:`SoC, den der Akku bis zum Ladeende erreichen soll.`,en:`SoC the battery should reach by the end of charging.`},winter_minimum_hour:{de:`Früheste Stunde, zu der das Ladeende im Winter liegen darf.`,en:`Earliest hour the charge window may end in winter.`},summer_maximum_hour:{de:`Späteste Stunde, zu der das Ladeende im Sommer liegen darf.`,en:`Latest hour the charge window may end in summer.`},summer_charge_end:{de:`SoC-Ziel für das Sommer-Ladeende.`,en:`SoC target for the summer end of charging.`},hard_soc_limit_enabled:{de:`Harter Deckel: darüber lädt Maestro den Akku nicht weiter.`,en:`Hard cap: Maestro will not charge the battery above it.`},hard_soc_limit:{de:`SoC, der mit dem harten Deckel nicht überschritten wird.`,en:`SoC the hard cap will not go past.`},fast_charge_floor_enabled:{de:`Unter dem Boden lädt Maestro mit voller Leistung, unabhängig vom Korridor.`,en:`Below the floor Maestro charges at full power, ignoring the corridor.`},fast_charge_floor_soc:{de:`SoC, unter dem die Schnellladung greift.`,en:`SoC below which fast charging applies.`},forward_looking_enabled:{de:`Plant die Ladung aus dem erwarteten Verbrauch der nächsten Stunden.`,en:`Plans charging from the expected consumption of the next hours.`},forward_looking_max_soc:{de:`Obergrenze für die vorausschauende Ladung.`,en:`Cap for look-ahead charging.`},pv_forecast_enabled:{de:`Verschiebt die Ladung, wenn die PV-Prognose den Bedarf deckt.`,en:`Delays charging when the PV forecast covers the need.`},delay_min_soc:{de:`Nur oberhalb dieses SoC darf die Prognose die Ladung verzögern.`,en:`The forecast may delay charging only above this SoC.`},pv_forecast_threshold_kwh:{de:`Ab dieser prognostizierten Energiemenge gilt der Tag als ergiebig genug.`,en:`From this forecast energy the day counts as productive enough.`},pv_forecast_safety_factor:{de:`Die Prognose wird um diesen Faktor vorsichtiger gerechnet.`,en:`The forecast is treated this much more cautiously.`},astro_enabled:{de:`Richtet Ladestart und Ladeende an Sonnenauf- und Untergang aus.`,en:`Aligns charge start and end with sunrise and sunset.`},charge_start_sunrise_offset_h:{de:`Stunden nach Sonnenaufgang, ab denen geladen werden darf.`,en:`Hours after sunrise before charging may start.`},charge_end_sunset_offset_h:{de:`Stunden vor Sonnenuntergang, zu denen das Ladeende liegen soll.`,en:`Hours before sunset when charging should finish.`},morning_cap_enabled:{de:`Hält den SoC am Morgen unter einer Grenze, damit PV-Ertrag noch hineinpasst.`,en:`Keeps the morning SoC under a limit so PV yield still fits.`},morning_cap_soc:{de:`SoC, den der Morning-Cap am Morgen nicht überschreitet.`,en:`SoC the morning cap will not exceed.`},morning_cap_until_h:{de:`Lokale Stunde, bis zu der der Morning-Cap gilt.`,en:`Local hour until which the morning cap applies.`},gentle_charge_enabled:{de:`Lädt mit einem Bruchteil der möglichen Leistung, schonender für den Akku.`,en:`Charges at a fraction of the possible power, easier on the battery.`},gentle_charge_factor:{de:`Anteil der Ladeleistung im Schonmodus. 0,5 ist die Hälfte.`,en:`Share of charge power in gentle mode. 0.5 is half.`},spreading_enabled:{de:`Verteilt die Ladung über das Fenster, statt in einem Rutsch voll zu laden.`,en:`Spreads charging across the window instead of one full burst.`},spreading_target_soc:{de:`SoC, auf den die verteilte Ladung hinsteuert.`,en:`SoC the spread charging aims for.`},low_yield_priority_enabled:{de:`An ertragsarmen Tagen wird der Akku früher und höher geladen.`,en:`On low-yield days the battery is charged earlier and higher.`},low_yield_threshold:{de:`Unter diesem Anteil der Referenz gilt der Tag als ertragsarm.`,en:`Below this share of the reference the day counts as low yield.`},low_yield_reference_kwh:{de:`Feste Tagesreferenz in kWh. 0 übernimmt den automatischen Wert.`,en:`Fixed daily reference in kWh. 0 uses the automatic value.`},low_yield_reference_kwh_per_kwp:{de:`Erwartete kWh pro installiertem kWp für die automatische Referenz.`,en:`Expected kWh per installed kWp for the automatic reference.`},curtailment_guard_enabled:{de:`Lädt den Akku, sobald die Einspeisung an der Abregelgrenze kratzt.`,en:`Charges the battery once export nears the curtailment limit.`},curtailment_activation_w:{de:`Einspeiseleistung, ab der der Abregelschutz die Ladung startet.`,en:`Export power at which curtailment protection starts charging.`},curtailment_release_w:{de:`Unter dieser Einspeisung lässt der Abregelschutz wieder los.`,en:`Below this export, curtailment protection lets go again.`},two_tier_enabled:{de:`Lädt erst auf ein frühes Ziel und hebt es später am Tag an.`,en:`Charges to an early target first and raises it later in the day.`},charge_target_late:{de:`Höheres SoC-Ziel für den späteren Teil des Tages.`,en:`Higher SoC target for the later part of the day.`},late_charge_end_h:{de:`Stunde, ab der das spätere Ziel gilt.`,en:`Hour from which the later target applies.`},lower_corridor_pause_enabled:{de:`Pausiert die Mindestladung, solange der SoC im unteren Korridor liegt.`,en:`Pauses minimum charging while the SoC sits in the lower corridor.`},tariff_mode:{de:`Fest rechnet mit dem Bezugspreis. Dynamisch nutzt den Preis-Sensor.`,en:`Fixed uses the buy price. Dynamic uses the price sensor.`},dynamic_tariff_enabled:{de:`Schaltet die Auswertung des dynamischen Preises ein.`,en:`Turns evaluation of the dynamic price on.`},fixed_buy_price:{de:`Bezugspreis bei festem Tarif, in Euro pro kWh.`,en:`Buy price on a fixed tariff, in euros per kWh.`},feed_in_price:{de:`Vergütung pro eingespeister kWh. Der Preisplan rechnet sie gegen den Bezug.`,en:`Payment per exported kWh. The price plan weighs it against buying.`},battery_capex_eur:{de:`Anschaffungskosten des Akkus. Daraus rechnet der Preisplan den Verschleiß pro kWh.`,en:`Battery purchase cost. The price plan turns it into wear per kWh.`},battery_total_cycles:{de:`Erwartete Lebensdauer in Zyklen. Mehr Zyklen bedeuten weniger Verschleiß pro kWh.`,en:`Expected lifetime in cycles. More cycles mean less wear per kWh.`},cheap_threshold:{de:`Bis zu diesem Preis pro kWh gilt der Strom als günstig.`,en:`Up to this price per kWh the electricity counts as cheap.`},max_grid_charge_kwh:{de:`Höchstens so viele kWh darf Maestro an einem Tag aus dem Netz laden.`,en:`Maestro may charge at most this many kWh from the grid in one day.`},low_slot_grid_charge_enabled:{de:`Lädt im günstigen Zeitfenster aktiv aus dem Netz, nicht nur per Preisplan.`,en:`Actively charges from the grid in the cheap window, not only via the price plan.`},low_slot_target_soc:{de:`SoC, bis zu dem im günstigen Fenster aus dem Netz geladen wird.`,en:`SoC up to which the cheap window charges from the grid.`},low_slot_forecast_based:{de:`Die Lademenge folgt der Prognose. Das Ziel ist dann nur die Obergrenze.`,en:`The amount follows the forecast. The target is then only a cap.`},low_slot_hold_discharge:{de:`Sperrt die Entladung, sobald das Ziel im günstigen Fenster erreicht ist.`,en:`Blocks discharge once the cheap-window target is reached.`},price_plan_enabled:{de:`Berechnet den Plan und zeigt ihn. Der Akku wird davon noch nicht gesteuert.`,en:`Calculates the plan and shows it. It does not control the battery yet.`},price_plan_active:{de:`Setzt den Plan um: Netzladung in günstigen Slots und Halten der Entladung.`,en:`Executes the plan: grid charging in cheap slots and holding discharge.`},price_plan_max_soc:{de:`Der Plan lädt aus dem Netz höchstens bis zu diesem SoC.`,en:`The plan charges from the grid only up to this SoC.`},price_plan_min_spread:{de:`Mindestabstand zwischen günstigem und teurem Preis, damit sich Netzladung lohnt.`,en:`Minimum gap between cheap and expensive price for grid charging to pay off.`},price_plan_efficiency:{de:`Wirkungsgrad des Umwegs über den Akku. 0,9 heißt: 10 Prozent gehen verloren.`,en:`Round-trip efficiency. 0.9 means 10 percent is lost.`},price_plan_safety_factor:{de:`Der Plan rechnet den Verbrauch um diesen Faktor höher, damit der Akku nicht leerläuft.`,en:`The plan assumes consumption this much higher so the battery does not run empty.`},ht_enabled:{de:`Schützt den SoC im Hochtarif-Fenster vor Entladung.`,en:`Protects the SoC from discharge during the high-tariff window.`},ht_sat:{de:`Der Hochtarif-Schutz gilt auch am Samstag.`,en:`High-tariff protection also applies on Saturday.`},ht_sun:{de:`Der Hochtarif-Schutz gilt auch am Sonntag.`,en:`High-tariff protection also applies on Sunday.`},ht_on:{de:`Stunde, ab der das Hochtarif-Fenster gilt.`,en:`Hour when the high-tariff window starts.`},ht_off:{de:`Stunde, ab der das Hochtarif-Fenster endet.`,en:`Hour when the high-tariff window ends.`},ht_min:{de:`SoC, der im Hochtarif im Winter nicht unterschritten wird.`,en:`SoC that winter high-tariff hours will not go below.`},ht_sockel:{de:`SoC-Sockel zur Tag-und-Nacht-Gleiche, zwischen Winter- und Sommerwert.`,en:`SoC floor at the equinox, between the winter and summer values.`},seasonal_reserve_enabled:{de:`Die Notstromreserve folgt der Jahreszeit, höher im Winter, niedriger im Sommer.`,en:`The backup reserve follows the season, higher in winter, lower in summer.`},reserve_winter_percent:{de:`Notstromreserve zur Wintersonnenwende.`,en:`Backup reserve at the winter solstice.`},reserve_equinox_percent:{de:`Notstromreserve zur Tag-und-Nacht-Gleiche.`,en:`Backup reserve at the equinox.`},fixed_reserve_enabled:{de:`Ersetzt die saisonale Reserve durch einen festen SoC und lädt darunter aus dem Netz.`,en:`Replaces the seasonal reserve with a fixed SoC and charges from the grid below it.`},fixed_reserve_soc:{de:`Fester SoC der Notstromreserve. Darunter ist die Entladung gesperrt.`,en:`Fixed backup SoC. Discharge is blocked below it.`},adaptive_reserve_enabled:{de:`Hebt die Reserve anhand des Verbrauchs der letzten Tage an.`,en:`Raises the reserve from the consumption of recent days.`},evcc_enabled:{de:`Begrenzt die Entladung, während EVCC das Auto im Now-Modus lädt.`,en:`Limits discharge while EVCC charges the car in now mode.`},evcc_discharge_limit_w:{de:`Höchste Entladung in Watt, solange EVCC im Now-Modus lädt.`,en:`Highest discharge in watts while EVCC charges in now mode.`},wallbox_enabled:{de:`Maestro steuert den Ladestrom der Wallbox nach Überschuss.`,en:`Maestro controls the wallbox current from surplus.`},wallbox_type:{de:`Welche Wallbox Maestro anspricht. Die Leistungswerte hängen davon ab.`,en:`Which wallbox Maestro talks to. The power figures depend on it.`},wallbox_min_current:{de:`Niedrigster Ladestrom. Darunter schaltet Maestro die Wallbox aus.`,en:`Lowest charge current. Below it Maestro switches the wallbox off.`},wallbox_max_current:{de:`Höchster Ladestrom, den Maestro der Wallbox gibt.`,en:`Highest charge current Maestro gives the wallbox.`},wallbox_min_surplus:{de:`Überschuss, ab dem die Wallbox laden darf.`,en:`Surplus from which the wallbox may charge.`},wallbox_discharge_guard_enabled:{de:`Stoppt die Wallbox, wenn der Akku dafür zu stark entladen würde.`,en:`Stops the wallbox when it would discharge the battery too hard.`},wallbox_discharge_guard_threshold_w:{de:`Ab dieser Akku-Entladung greift der Netzschutz der Wallbox.`,en:`Wallbox grid protection starts at this battery discharge.`},hp_enabled:{de:`Gibt die Wärmepumpe nur bei Überschuss und passendem Preis frei.`,en:`Releases the heat pump only with surplus and a suitable price.`},hp_min_surplus:{de:`Überschuss, ab dem die Wärmepumpe laufen darf.`,en:`Surplus from which the heat pump may run.`},hp_max_price:{de:`Über diesem Strompreis bleibt die Wärmepumpe aus.`,en:`Above this electricity price the heat pump stays off.`},hp_min_run_minutes:{de:`Mindestlaufzeit, damit die Wärmepumpe nicht taktet.`,en:`Minimum runtime so the heat pump does not short-cycle.`},hp_min_pause_minutes:{de:`Mindestpause zwischen zwei Läufen der Wärmepumpe.`,en:`Minimum pause between two heat-pump runs.`},morning_discharge_mode:{de:`Wie der Akku vor dem PV-Tag geleert wird: aus, fest oder nach Preis.`,en:`How the battery is emptied before the PV day: off, fixed, or by price.`},morning_unload_soc:{de:`SoC, auf den die Vorentladung am Morgen hinuntergeht.`,en:`SoC the morning pre-discharge goes down to.`},morning_unload_start_soc:{de:`Erst oberhalb dieses SoC startet die Vorentladung.`,en:`Pre-discharge starts only above this SoC.`},pre_discharge_offset_h:{de:`Stunden vor dem Ladestart, ab denen vorentladen wird.`,en:`Hours before charge start when pre-discharge may begin.`},pre_discharge_max_power_w:{de:`Höchste Leistung der Vorentladung.`,en:`Highest power of the pre-discharge.`},pre_discharge_tibber_auto:{de:`Entlädt morgens nur, wenn der Strompreis unter der Tibber-Schwelle liegt.`,en:`Discharges in the morning only when the price is under the Tibber threshold.`},morning_grid_export_threshold:{de:`Unter diesem Preis darf die Vorentladung ins Netz gehen.`,en:`Below this price the pre-discharge may export to the grid.`},regelung_aktiv:{de:`Hauptschalter. Aus heißt: Maestro sendet keine Limits mehr.`,en:`Master switch. Off means Maestro stops sending limits.`},auto_mode_enabled:{de:`Rechnet einmal täglich passende Regelparameter aus dem Verbrauchs- und PV-Verlauf aus. Braucht mindestens 7 Tage Daten.`,en:`Works out fitting control parameters once a day from consumption and PV history. Needs at least 7 days of data.`},auto_mode_objective:{de:`Worauf die Auto-Optimierung achtet: Eigenverbrauch, Kosten oder CO₂.`,en:`What the auto optimisation aims for: self-consumption, cost or CO₂.`},force_discharge:{de:`Entlädt den Akku mit der eingestellten Leistung, unabhängig vom Plan.`,en:`Discharges the battery at the set power, ignoring the plan.`},force_discharge_power_w:{de:`Leistung der erzwungenen Entladung in Watt.`,en:`Power of the forced discharge in watts.`},soc_hysteresis_percent:{de:`SoC-Änderung, die Maestro ignoriert, damit die Regelung nicht pendelt.`,en:`SoC change Maestro ignores so control does not hunt.`},charge_ramp_w_per_cycle:{de:`Wie schnell die Ladeleistung pro Takt ansteigen darf.`,en:`How fast charge power may rise per cycle.`},update_interval:{de:`Sekunden zwischen zwei Regel-Durchläufen.`,en:`Seconds between two control cycles.`},watchdog_timeout:{de:`Nach diesen Sekunden ohne Kontakt hebt der Wechselrichter die Limits auf.`,en:`After these seconds without contact the inverter clears the limits.`},debug:{de:`Schreibt ausführliche Regelentscheidungen ins Log.`,en:`Writes detailed control decisions to the log.`},reset_stats:{de:`Setzt die Tageszähler zurück. Die Regelung selbst bleibt, wie sie ist.`,en:`Resets the daily counters. Control itself stays as it is.`},clear_limits:{de:`Hebt die gesetzten Lade- und Entladelimits am Wechselrichter sofort auf.`,en:`Clears the charge and discharge limits on the inverter immediately.`}},hr=(e,t)=>{let n=mr[t];if(n)return e.toLowerCase().startsWith(`de`)?n.de:n.en},gr,_r=new Set,vr=class extends N{constructor(...e){super(...e),this.text=``,this.label=`Hilfe`,this.open=!1,this.onOutside=e=>{e.composedPath().includes(this)||this.close()},this.onKey=e=>{e.key===`Escape`&&this.close()}}createRenderRoot(){return this}disconnectedCallback(){super.disconnectedCallback(),this.close()}toggle(e){if(e.preventDefault(),e.stopPropagation(),this.open)this.close();else{for(let e of _r)e!==this&&e.close();this.open=!0,_r.add(this),this.requestUpdate(),window.addEventListener(`pointerdown`,this.onOutside,!0),window.addEventListener(`keydown`,this.onKey)}}close(){window.removeEventListener(`pointerdown`,this.onOutside,!0),window.removeEventListener(`keydown`,this.onKey),_r.delete(this),this.open&&(this.open=!1,this.requestUpdate())}updated(){let e=this.querySelector(`.tip`);if(!(e instanceof HTMLElement))return;let t=this.getRootNode(),n=t instanceof ShadowRoot?t.host.getBoundingClientRect():{left:0,right:window.innerWidth,width:window.innerWidth};e.style.width=`${Math.min(280,n.width-24)}px`,e.style.transform=`translateY(-50%)`;let r=e.getBoundingClientRect(),i=0;r.right>n.right-12&&(i=n.right-12-r.right),r.left+i<n.left+12&&(i=n.left+12-r.left),e.style.transform=`translate(${i}px, -50%)`}render(){return D`<button
        type="button"
        class="info"
        aria-label=${this.label}
        aria-expanded=${this.open}
        @click=${this.toggle}
      >i</button>
      ${this.open?D`<div class="tip" role="tooltip">${this.text}</div>`:A}`}};gr=vr,gr.properties={text:{type:String},label:{type:String}},customElements.get(`maestro-setting-tip`)||customElements.define(`maestro-setting-tip`,vr);var yr=[{id:`hardware`,title:`setHardware`,hint:`setHardwareHint`,icon:`<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/>`,rows:[`inverter_power`,`installed_kwp`,`max_charge_power`,`min_charge_power`,`feed_in_limit_percent`]},{id:`corridor`,title:`setCorridor`,hint:`setCorridorHint`,icon:`<rect x="7" y="7" width="10" height="13" rx="2"/><path d="M10 4h4"/>`,rows:[`charge_threshold`,`advanced_corridor`,`lower_corridor`,`upper_corridor`,`charge_target`,`winter_minimum_hour`,`summer_maximum_hour`,`summer_charge_end`,`hard_soc_limit_enabled`,`hard_soc_limit`,`fast_charge_floor_enabled`,`fast_charge_floor_soc`]},{id:`windows`,title:`setWindows`,hint:`setWindowsHint`,icon:`<circle cx="12" cy="12" r="8"/><path d="M12 8v5l3 2"/>`,rows:[`forward_looking_enabled`,`forward_looking_max_soc`,`pv_forecast_enabled`,`delay_min_soc`,`pv_forecast_threshold_kwh`,`pv_forecast_safety_factor`,`astro_enabled`,`charge_start_sunrise_offset_h`,`charge_end_sunset_offset_h`,`morning_cap_enabled`,`morning_cap_soc`,`morning_cap_until_h`,`gentle_charge_enabled`,`gentle_charge_factor`,`spreading_enabled`,`spreading_target_soc`]},{id:`yield`,title:`setYield`,hint:`setYieldHint`,icon:`<circle cx="12" cy="12" r="3.5"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>`,rows:[`low_yield_priority_enabled`,`low_yield_threshold`,`low_yield_reference_kwh`,`low_yield_reference_kwh_per_kwp`,`curtailment_guard_enabled`,`curtailment_activation_w`,`curtailment_release_w`,`two_tier_enabled`,`charge_target_late`,`late_charge_end_h`,`lower_corridor_pause_enabled`]},{id:`tariff`,title:`setTariff`,hint:`setTariffHint`,icon:`<path d="M12 3v18"/><path d="M16 7.5A3.2 3.2 0 0 0 12.8 5H10a2.8 2.8 0 0 0 0 5.6h4a2.8 2.8 0 0 1 0 5.6H9.5A3.2 3.2 0 0 1 7 13.5"/>`,rows:[`tariff_mode`,`dynamic_tariff_enabled`,`fixed_buy_price`,`feed_in_price`,`battery_capex_eur`,`battery_total_cycles`,`cheap_threshold`,`max_grid_charge_kwh`,`low_slot_grid_charge_enabled`,`low_slot_target_soc`,`low_slot_forecast_based`,`low_slot_hold_discharge`,`price_plan_enabled`,`price_plan_active`,`price_plan_max_soc`,`price_plan_min_spread`,`price_plan_efficiency`,`price_plan_safety_factor`]},{id:`reserve`,title:`setReserve`,hint:`setReserveHint`,icon:`<path d="M12 3 5 6v6c0 4.5 3 7 7 9 4-2 7-4.5 7-9V6z"/>`,rows:[`ht_enabled`,`ht_sat`,`ht_sun`,`ht_on`,`ht_off`,`ht_min`,`ht_sockel`,`seasonal_reserve_enabled`,`reserve_winter_percent`,`reserve_equinox_percent`,`fixed_reserve_enabled`,`fixed_reserve_soc`,`adaptive_reserve_enabled`]},{id:`flex`,title:`setFlex`,hint:`setFlexHint`,icon:`<path d="M9 7v4M15 7v4"/><path d="M8 11h8v2a4 4 0 0 1-8 0z"/><path d="M12 17v3"/>`,rows:[`evcc_enabled`,`evcc_discharge_limit_w`,`wallbox_enabled`,`wallbox_type`,`wallbox_min_current`,`wallbox_max_current`,`wallbox_min_surplus`,`wallbox_discharge_guard_enabled`,`wallbox_discharge_guard_threshold_w`,`hp_enabled`,`hp_min_surplus`,`hp_max_price`,`hp_min_run_minutes`,`hp_min_pause_minutes`,`morning_discharge_mode`,`morning_unload_soc`,`morning_unload_start_soc`,`pre_discharge_offset_h`,`pre_discharge_max_power_w`,`pre_discharge_tibber_auto`,`morning_grid_export_threshold`]},{id:`control`,title:`setControl`,hint:`setControlHint`,icon:`<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>`,rows:[`regelung_aktiv`,`auto_mode_enabled`,`auto_mode_objective`,`force_discharge`,`force_discharge_power_w`,`soc_hysteresis_percent`,`charge_ramp_w_per_cycle`,`update_interval`,`watchdog_timeout`]},{id:`diag`,title:`setDiag`,hint:`setDiagHint`,icon:`<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4z"/><path d="M16.5 13v7M13 16.5h7"/>`,rows:[`debug`,`reset_stats`,`clear_limits`]}],br={reset_stats:`confirmReset`},q={id:`classic`,title:`setClassic`,hint:`setClassicHint`,icon:`<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>`},J={id:`look`,title:`setLook`,hint:`setLookHint`,icon:`<circle cx="12" cy="12" r="4"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6"/>`},xr=e=>e===q.id||e===J.id||yr.some(t=>t.id===e),Sr=e=>e===q.id?q:e===J.id?J:yr.find(t=>t.id===e),Cr=e=>{let t=e.getRootNode();return(t instanceof ShadowRoot?t.activeElement:document.activeElement)===e},wr=(e,t)=>{let n=e?.attributes.friendly_name;return typeof n==`string`&&n.trim()?n.trim():t},Tr=e=>{let t=e?.attributes.unit_of_measurement;return typeof t==`string`?t:``},Er=(e,t)=>{let n=e?.attributes[t];return typeof n==`number`&&Number.isFinite(n)?n:void 0};function Dr(e,t,n,r){let i=e.hass.states[t],a=B(i);return D`<button
    class="switch ${a?`on`:``}"
    role="switch"
    aria-checked=${a}
    aria-label=${n}
    ?disabled=${r||e.pending.has(t)}
    @click=${()=>e.onToggle(t)}
  ></button>`}function Or(e,t,n,r,i){let a=z(n),o=a===void 0?``:String(a),s=Er(n,`min`),c=Er(n,`max`),l=Er(n,`step`),u=Tr(n);return D`<label class="setting-num">
    <input
      type="number"
      inputmode="decimal"
      aria-label=${r}
      min=${s??A}
      max=${c??A}
      step=${l??`any`}
      ?disabled=${i||e.pending.has(t)}
      ${jt(e=>{e instanceof HTMLInputElement&&!Cr(e)&&e.value!==o&&(e.value=o)})}
      @change=${n=>{let r=Number.parseFloat(n.target.value);Number.isFinite(r)&&e.onNumber(t,r)}}
    />
    ${u?D`<span>${u}</span>`:A}
  </label>`}function kr(e,t,n,r){let i=Array.isArray(n?.attributes.options)?n.attributes.options:[];return D`<select
    .value=${n?.state??``}
    aria-label=${wr(n,t)}
    ?disabled=${r||!i.length||e.pending.has(t)}
    @change=${n=>e.onSelect(t,n.target.value)}
  >
    ${i.map(t=>D`<option value=${t} ?selected=${t===n?.state}>${e.i18n.option(t)}</option>`)}
  </select>`}function Ar(e,t){let n=R[t];if(!n)return A;let r=e.hass.states[n],i=Ze(t);if(!r&&!i)return A;let a=i||!r||r.state===`unavailable`,o=wr(r,t),s=n.split(`.`,1)[0],c=s===`switch`?Dr(e,n,o,a):s===`number`?Or(e,n,r,o,a):s===`select`?kr(e,n,r,a):s===`button`?D`<button
                class="btn"
                ?disabled=${a||e.pending.has(n)}
                @click=${()=>{let r=br[t];(!r||window.confirm(e.i18n.t(r)))&&e.onPress(n)}}
              >${o}</button>`:A,l=hr(e.hass.language,t);return D`<div class="ctrl setting-row ${a?`locked`:``}">
    <div class="txt">
      <span class="name"><b>${o}</b>${l?D`<maestro-setting-tip .text=${l} .label=${e.i18n.t(`settingHelp`)}></maestro-setting-tip>`:A}</span>
      ${i?D`<span>${e.i18n.t(`entityDisabled`)}</span>`:A}
    </div>
    ${c}
  </div>`}var jr=(e,t)=>t.rows.some(t=>{let n=R[t];return!!n&&(!!e.hass.states[n]||Ze(t))}),Mr=(e,t,n,r,i)=>D`<button type="button" class="settings-tile" @click=${()=>e.onOpenGroup(t)}>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${n}></svg>
  <b>${e.i18n.t(r)}</b>
  <span>${e.i18n.t(i)}</span>
</button>`;function Nr(e,t,n){let{t:r}=e.i18n,i=r(n===void 0?`classicDepVia`:n?`classicInstalled`:`classicMissing`);return D`<div class="dep"><b>${r(t)}</b><span class=${n===void 0?``:n?`ok`:`bad`}>${i}</span></div>`}function Pr(e){let{t}=e.i18n,n=e.classic,r=n?.state??`checking`,i=D`<button type="button" class="btn primary" @click=${()=>e.onOpenClassic()}>${t(`classicOpen`)}</button>`;if(r===`checking`)return D`<p>${t(`classicChecking`)}</p>`;if(r===`ours`)return D`<p class="ok">${t(`classicReady`)}</p>${i}`;if(r===`foreign`)return D`<p class="bad">${t(`classicForeign`)}</p>`;if(r===`error`)return D`<p class="bad">${t(`classicFailed`,{err:n?.error??``})}</p>
      <button type="button" class="btn" @click=${()=>e.onCheckClassic()}>${t(`classicRetry`)}</button>`;if(!e.isAdmin)return D`<p>${t(`classicAdminOnly`)}</p>`;let a=r===`creating`;return D`${r===`empty`?D`<p>${t(`classicEmpty`)}</p>`:A}
    <button type="button" class="btn primary" ?disabled=${a} @click=${()=>e.onCreateClassic()}>
      ${t(a?`classicCreating`:r===`empty`?`classicSetup`:`classicCreate`)}
    </button>`}function Fr(e){let{t}=e.i18n,n=[`classicStep1`,`classicStep2`,`classicStep3`,`classicStep4`,`classicStep5`],r=e.classic?.mushroom===!1||e.classic?.apex===!1;return D`<div class="guide">
    <p>${t(`classicLead`)}</p>
    <h3>${t(`classicDepsTitle`)}</h3>
    ${Nr(e,`classicDepMushroom`,e.classic?.mushroom)}
    ${Nr(e,`classicDepApex`,e.classic?.apex)}
    ${r?D`<p class="bad">${t(`classicDepsMissing`)}</p>`:A}
    <h3>${t(`classicActionTitle`)}</h3>
    <div class="classic-action">${Pr(e)}</div>
    <p>${t(`classicAfter`)}</p>
    <details>
      <summary>${t(`classicManual`)}</summary>
      <ol>${n.map(e=>D`<li>${t(e)}</li>`)}</ol>
      <p>${t(`classicHa`)}</p>
      <p>${t(`classicPath`)}</p>
      <p>${t(`classicTimeout`)}</p>
    </details>
  </div>`}var Ir=[{title:`planTuneTariff`,hint:`planTuneTariffHint`,rows:[`tariff_mode`,`dynamic_tariff_enabled`,`cheap_threshold`,`fixed_buy_price`,`feed_in_price`]},{title:`planTuneGrid`,hint:`planTuneGridHint`,rows:[`low_slot_grid_charge_enabled`,`low_slot_target_soc`,`max_grid_charge_kwh`,`low_slot_forecast_based`,`low_slot_hold_discharge`]},{title:`planTunePlan`,hint:`planTunePlanHint`,rows:[`price_plan_enabled`,`price_plan_active`,`price_plan_max_soc`,`price_plan_min_spread`,`price_plan_efficiency`,`price_plan_safety_factor`,`battery_capex_eur`,`battery_total_cycles`]}];function Lr(e){let{t}=e.i18n;return D`<div class="card plan-tune">
    <h3>${t(`planTune`)}</h3>
    <p class="hint">${t(`planTuneHint`)}</p>
    ${Ir.map(n=>D`<h4>${t(n.title)}</h4>
        <p class="sub">${t(n.hint)}</p>
        ${n.rows.map(t=>Ar(e,t))}`)}
  </div>`}function Rr(e){let{t}=e.i18n,n={dark:{title:`themeDark`,hint:`themeDarkHint`},classic:{title:`themeClassic`,hint:`themeClassicHint`}};return D`<div class="theme-choices" role="radiogroup" aria-label=${t(`setLook`)}>
    ${$n.map(r=>D`<button
        type="button"
        class="theme-choice ${e.theme===r?`on`:``}"
        role="radio"
        aria-checked=${e.theme===r}
        @click=${()=>e.onTheme(r)}
      >
        <span class="swatch ${r}" aria-hidden="true"></span>
        <span class="txt"><b>${t(n[r].title)}</b><span>${t(n[r].hint)}</span></span>
      </button>`)}
  </div>`}function zr(e){let{t}=e.i18n;if(e.groupId===J.id)return Rr(e);if(e.groupId===q.id)return Fr(e);let n=yr.find(t=>t.id===e.groupId);if(n)return D`<div class="settings-detail">${n.rows.map(t=>Ar(e,t))}</div>`;let r=Object.keys(R).length>0;return D`<div class="settings-tiles">
    ${Mr(e,J.id,J.icon,J.title,J.hint)}
    ${Mr(e,q.id,q.icon,q.title,q.hint)}
    ${r?yr.map(t=>jr(e,t)?Mr(e,t.id,t.icon,t.title,t.hint):A):D`<p class="hint">${t(`settingsPending`)}</p>`}
  </div>`}function Br(e){return/[",\n\r]/.test(e)?`"${e.replace(/"/g,`""`)}"`:e}function Vr(e){return e.map(e=>e.map(Br).join(`,`)).join(`
`)}function Hr(e,t){let n=new Blob([`\uFEFF${Vr(t)}`],{type:`text/csv;charset=utf-8`}),r=document.createElement(`a`);r.href=URL.createObjectURL(n),r.download=e,r.click(),URL.revokeObjectURL(r.href)}var Y=e=>!e||e.state===`unknown`||e.state===`unavailable`?`–`:e.state,X=(e,t)=>e.hass.states[t],Ur=(e,t)=>X(e,t)?.attributes??{},Z=e=>typeof e==`number`&&Number.isFinite(e)?e:void 0,Q=(e,t)=>D`${e}<small>${t}</small>`,$=(e,t)=>D`<div class="row"><span>${e}</span><b>${t}</b></div>`,Wr=e=>[[`time`,`soc_pct`,`pv_w`,`house_w`,`grid_w`,`phase`],...e.trajectory_points.map((t,n)=>[new Date(t[0]).toISOString(),String(t[1]),String(e.pv_points[n]?.[1]??``),String(e.house_points[n]?.[1]??``),String(e.grid_points[n]?.[1]??``),e.trajectory_phases[n]??``])],Gr=e=>[[`time`,`phase`,`reason`],...(e.timeline??[]).map(e=>[new Date(e.ts).toISOString(),e.phase,e.reason])],Kr=e=>B(X(e,L.debug)),qr=e=>{let t=X(e,L.debugLog)?.state;return!t||t===`unknown`||t===`unavailable`?e.i18n.t(`debugEmpty`):t};function Jr(e){let{t}=e.i18n,n=z(X(e,L.soc)),r=z(X(e,L.targetSoc)),i=z(X(e,L.battery)),a=t=>B(X(e,t)),o=[[t(`chipReachable`),a(L.reachable),`on`],[t(`chipChargeLock`),a(L.chargeLock),`warn`],[t(`chipDischargeLock`),a(L.dischargeLock),`warn`],[t(`chipHt`),a(L.htProtect),`warn`],[t(`chipCurtail`),a(L.curtail),`warn`],[t(`chipEmergency`),a(L.emergency),`warn`],[t(`chipFeedIn`),a(L.feedInLimit),`warn`],[t(`chipGridCharge`),a(L.gridCharge),`on`],[t(`chipBatteryPriority`),a(L.batteryPriority),`warn`],[t(`chipLowYield`),a(L.lowYield),`warn`],[t(`chipPredictive`),a(L.ctrlPredictive),`on`],[t(`chipShadow`),a(L.ctrlPlanShadow),`on`]],s=(t,n)=>e.period!==`today`||!e.sparks?.[t]?.length?A:D`<maestro-chart class="spark" .options=${K(`spark-${t}`,[e.theme,e.sparks[t]],()=>cn(e.sparks[t],n))}></maestro-chart>`,c=Tn(e.mobile,e.consumers.length),l=t=>e.period===`today`?z(X(e,L[t])):e.periodSums?.[t],u=[l(`feedRevenue`),l(`saving`),l(`costToday`),l(`wear`)],d=e.period===`today`?z(X(e,L.balance)):u.some(e=>e===void 0)?void 0:u[0]+u[1]-u[2]-u[3],f=t=>`${e.fmt.n(t,2)} €`,p=t(e.period===`today`?`whenToday`:e.period===`week`?`whenWeek`:`whenMonth`),m=t(e.period===`today`?`groupToday`:e.period===`week`?`groupWeek`:`groupMonth`),h=t(e.period===`today`?`balanceTitle`:e.period===`week`?`balanceWeek`:`balanceMonth`),g=d===void 0||d===0?``:d>0?`pos`:`neg`,_=X(e,L.forceDischargePower),v=_?.attributes??{},y=typeof v.min==`number`?v.min:100,ee=typeof v.max==`number`?v.max:1e4,te=typeof v.step==`number`?v.step:100,ne=e.forcePowerDraft??z(_)??y,b=X(e,L.fixedReserveSoc),x=b?.attributes??{},re=typeof x.min==`number`?x.min:0,S=typeof x.max==`number`?x.max:100,ie=typeof x.step==`number`?x.step:1,ae=e.reserveDraft??z(b)??re,C=(t,n,r,i)=>{let a=!e.collapsed.has(t);return D`<section class="group">
      <button type="button" class="group-head ${a?`open`:``}" aria-expanded=${a} @click=${()=>e.onToggleGroup(t)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        <span>${n}</span>
        ${a?A:r}
      </button>
      ${a?D`<div class="grid kpis">${i}</div>`:A}
    </section>`};return D`
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
        <div class="flow-wrap" style=${c?`height:${c}px`:A}>
          ${En({pv:z(X(e,L.pv)),house:z(X(e,L.house)),grid:z(X(e,L.grid)),battery:i,consumers:e.consumers,motion:e.motion,onSelect:e.onFlowNode,compact:e.mobile,outline:e.theme===`classic`,fmt:e.fmt,i18n:e.i18n})}
        </div>
        ${e.consumerOverflow?D`<p class="err">${t(`consumersOverflow`)}</p>`:A}
      </div>
      <div class="card soc-card">
        <h3 class="self-start">${t(`battery`)}</h3>
        ${n===void 0?D`<p class="empty">${t(`unavailable`)}</p>`:D`<maestro-chart class="ring" .options=${K(`ring`,[e.theme,n,e.fmt.loc],()=>on(n,t(`stateOfCharge`)))}></maestro-chart>`}
        <div class="soc-meta">
          <div class="meta"><b>${r===void 0?`–`:`${Math.round(r)}%`}</b><span>${t(`targetSoc`)}</span></div>
          <div class="meta"><b>${Y(X(e,L.autonomy))}</b><span>${t(`autonomy`)}</span></div>
          <div class="meta"><b>${e.fmt.w(i)}</b><span>${t(i!==void 0&&i<0?`discharging`:`charging`)}</span></div>
        </div>
      </div>
    </div>
    <div class="chips">
      ${o.map(([e,t,n])=>D`<span class="chip ${t?n:``}"><i></i>${e}</span>`)}
    </div>
    <div class="card force">
      <div class="txt"><b>${t(`forceTitle`)}</b><span>${t(`ctrlForcePower`,{v:e.fmt.w(ne)})}</span></div>
      <button
        class="switch ${a(L.forceDischarge)?`on`:``}"
        role="switch"
        aria-checked=${a(L.forceDischarge)}
        aria-label=${t(`forceTitle`)}
        ?disabled=${!X(e,L.forceDischarge)||e.pending.has(L.forceDischarge)}
        @click=${()=>e.onToggle(L.forceDischarge)}
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
      <div class="txt"><b>${t(`fixedReserve`)}</b><span>${t(`ctrlReserveSoc`,{v:Math.round(ae)})}</span></div>
      <button
        class="switch ${a(L.fixedReserve)?`on`:``}"
        role="switch"
        aria-checked=${a(L.fixedReserve)}
        aria-label=${t(`fixedReserve`)}
        ?disabled=${!X(e,L.fixedReserve)||e.pending.has(L.fixedReserve)}
        @click=${()=>e.onToggle(L.fixedReserve)}
      ></button>
      <input
        type="range"
        min=${re}
        max=${S}
        step=${ie}
        .value=${String(ae)}
        aria-label=${t(`fixedReserve`)}
        ?disabled=${!b||b.state===`unavailable`}
        @input=${t=>e.onReserveDraft(Number(t.target.value))}
        @change=${t=>e.onReserveCommit(Number(t.target.value))}
      />
    </div>
    <div class="seg period" role="group" aria-label=${t(`periodToday`)}>
      ${[`today`,`week`,`month`].map(n=>D`<button class=${e.period===n?`active`:``} aria-pressed=${e.period===n} @click=${()=>e.onPeriod(n)}>${t(n===`today`?`periodToday`:n===`week`?`periodWeek`:`periodMonth`)}</button>`)}
    </div>
    ${C(`today`,m,D`<b class="group-sum">${f(l(`costNet`))}<small>${t(`groupNet`)}</small></b>`,D`
      <div class="card kpi">
        <h3>${t(`kpiCost`,{when:p})}</h3>
        <div class="v">${Q(e.fmt.n(l(`costNet`),2),`€`)}</div>
        <div class="delta">${t(`kpiCostSub`)}</div>
        ${s(`costNet`,U.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiSaving`,{when:p})}</h3>
        <div class="v">${Q(e.fmt.n(l(`saving`),2),`€`)}</div>
        <div class="delta">${t(`kpiSavingSub`)}</div>
        ${s(`saving`,U.gridOut)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiSelf`,{when:p})}</h3>
        <div class="v">${Q(e.fmt.n(l(`selfUse`)),`kWh`)}</div>
        <div class="delta">${t(`kpiSelfSub`,{imp:e.fmt.n(l(`importToday`)),feed:e.fmt.n(l(`feedToday`))})}</div>
        ${s(`selfUse`,U.pv)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiBattery`,{when:p})}</h3>
        <div class="v">${Q(e.fmt.n(l(`chargedToday`)),`kWh`)}</div>
        <div class="delta">${t(`kpiBatterySub`,{out:e.fmt.n(l(`dischargedToday`))})}</div>
        ${s(`chargedToday`,U.bat)}
      </div>
    `)}
    ${C(`balance`,h,D`<b class="group-sum ${g}">${f(d)}</b>`,D`
      <div class="card kpi">
        <h3>${t(`kpiCostGross`)}</h3>
        <div class="v">${Q(e.fmt.n(l(`costToday`),2),`€`)}</div>
        <div class="delta">${t(`kpiCostGrossSub`)}</div>
        ${s(`costToday`,U.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiRevenue`)}</h3>
        <div class="v">${Q(e.fmt.n(l(`feedRevenue`),2),`€`)}</div>
        <div class="delta">${t(`kpiRevenueSub`,{when:p})}</div>
        ${s(`feedRevenue`,U.gridOut)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiWear`)}</h3>
        <div class="v">${Q(e.fmt.n(l(`wear`),2),`€`)}</div>
        <div class="delta">${t(`kpiWearSub`)}</div>
        ${s(`wear`,U.accent2)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiBalance`)}</h3>
        <div class="v">${Q(e.fmt.n(d,2),`€`)}</div>
        <div class="delta">${t(`kpiBalanceSub`)}</div>
        ${s(`balance`,U.accent)}
      </div>
      <div class="card kpi ${a(L.unjustified)?`alert`:``}">
        <h3>${t(`kpiGridBat`)}</h3>
        <div class="v">${Q(e.fmt.n(l(`gridToBattery`)),`kWh`)}</div>
        <div class="delta">${a(L.unjustified)?t(`kpiGridBatWarn`):t(`kpiGridBatSub`)}</div>
        ${s(`gridToBattery`,U.gridIn)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiWallbox`,{when:p})}</h3>
        <div class="v">${Q(e.fmt.n(l(`wallboxEnergy`)),`kWh`)}</div>
        <div class="delta">${t(`kpiWallboxSub`)}</div>
        ${s(`wallboxEnergy`,U.house)}
      </div>
      <div class="card kpi">
        <h3>${t(`kpiFeedLimit`)}</h3>
        <div class="v">${Q(e.fmt.n(l(`curtailAvoided`)),`kWh`)}</div>
        <div class="delta">${t(`kpiFeedLimitSub`,{n:e.fmt.n(l(`feedInInterventions`),0),dc:e.fmt.n(l(`feedInAvoided`))})}</div>
        ${s(`curtailAvoided`,U.pv)}
      </div>
    `)}`}var Yr=(e,t)=>e(t===`ok`?`qualityOk`:t===`pv_fallback`?`qualityPv`:t===`consumption_fallback`?`qualityConsumption`:t===`both_fallback`?`qualityBoth`:`qualityUnknown`),Xr=(e,t)=>{let n=z(X(e,t));return n===void 0?`–`:`${Math.round(n)} %`};function Zr(e){let{t}=e.i18n,n=Ur(e,L.trajectory),r=Lt(n);if(!r)return D`<div class="card"><p class="empty">${t(`noForecast`)}</p></div>`;let i=[[U.bat,t(`legendSoc`)],[U.pv,t(`legendPv`)],[U.house,t(`legendHouse`)],[U.gridIn,t(`legendImport`)],[U.gridOut,t(`legendFeed`)]],a=(e,t)=>D`<div class="card stat"><h3>${e}</h3><div class="v">${t}</div></div>`;return D`
    <div class="card">
      <div class="chart-head">
        <div class="grow">
          <h3>${t(`chartTitle`)}</h3>
          <div class="legend">${i.map(([e,t])=>D`<span><i style="background:${e}"></i>${t}</span>`)}</div>
        </div>
        <button class="toggle ${e.showIst?`active`:``}" aria-pressed=${e.showIst} @click=${e.onToggleIst}>${t(`actualOverlay`)}</button>
        <button class="toggle" @click=${()=>Hr(`maestro-prognose.csv`,Wr(r))}>${t(`exportCsv`)}</button>
        <div class="seg" role="group">
          ${[6,12,24].map(n=>D`<button class=${e.range===n?`active`:``} aria-pressed=${e.range===n} @click=${()=>e.onRange(n)}>${t(`hoursShort`,{h:n})}</button>`)}
        </div>
      </div>
      <maestro-chart
        id="fc-main"
        .options=${K(`forecast`,[e.theme,X(e,L.trajectory),X(e,L.targetSoc)?.state,e.ist,e.showIst,e.fmt.loc],()=>nn({traj:r,targetSoc:z(X(e,L.targetSoc)),ist:e.ist,showIst:e.showIst,fmt:e.fmt,i18n:e.i18n}))}
      ></maestro-chart>
      <maestro-chart id="fc-brush" .options=${K(`brush`,[e.theme,X(e,L.trajectory)],()=>rn(r))}></maestro-chart>
    </div>
    <div class="grid stat-row">
      ${a(t(`statMinMax`),D`${Math.round(Z(n.min_soc)??0)}<small>%</small> / ${Math.round(Z(n.max_soc)??0)}<small>%</small>`)}
      ${a(t(`statImport`),Q(e.fmt.n(Z(n.grid_draw_kwh)),`kWh`))}
      ${a(t(`statFeed`),Q(e.fmt.n(Z(n.grid_feed_in_kwh)),`kWh`))}
      ${a(t(`statAutarky`),Q(e.fmt.n(Z(n.self_sufficiency_pct)),`%`))}
      ${a(t(`statPvTomorrow`),Q(e.fmt.n(z(X(e,L.pvTomorrow))),`kWh`))}
    </div>
    <div class="grid stat-row">
      ${a(t(`qualityLabel`),Yr(t,X(e,L.forecastQuality)?.state))}
      ${a(t(`statP10`),Q(e.fmt.n(z(X(e,L.p10))),`kWh`))}
      ${a(t(`statDeficit`),Q(e.fmt.n(z(X(e,L.deficit))),`kWh`))}
      ${a(t(`statYield`),D`${e.fmt.n((()=>{let t=z(X(e,L.yieldRatio));return t===void 0?void 0:t*100})())}<small>%</small>`)}
    </div>
    <p class="sub yield-note">${t(`statYieldSub`,{today:e.fmt.n(z(X(e,L.yieldToday))),ref:e.fmt.n(z(X(e,L.yieldRef)))})}</p>`}function Qr(e){let{t}=e.i18n,n=Ur(e,L.plan),r=Vt(n.plan_slots);if(!r.length)return D`<div class="card"><p class="empty">${t(`noPlan`)}</p></div>${Lr(e)}`;let i=Ut(r),a=[[U.gridOut,t(`legendCharge`)],[U.pv,t(`legendHold`)],[U.bat,t(`legendRelease`)]],o=typeof n.known_until==`string`?e.fmt.dayTime(n.known_until):`–`,s=(e,t,n)=>D`<div class="row"><span>${e}</span><b style=${n?`color:${n}`:``}>${t}</b></div>`,c=t=>`${e.fmt.n(t.price*100)} ct · ${t.start_local}`;return D`
    <div class="grid plan-top">
      <div class="card">
        <div class="chart-head">
          <div class="grow">
            <h3>${t(`priceTitle`)}</h3>
            <div class="legend">
              ${a.map(([e,t])=>D`<span><i style="background:${e}"></i>${t}</span>`)}
              <span><i style="background:#fff;height:2px;border-radius:0"></i>${t(`legendPlanSoc`)}</span>
            </div>
          </div>
          <span class="badge">${n.shadow_mode?t(`planShadow`):t(`planActive`)}</span>
        </div>
        <maestro-chart .options=${K(`plan`,[e.theme,X(e,L.plan),e.fmt.loc],()=>an({slots:r,fmt:e.fmt,i18n:e.i18n}))}></maestro-chart>
        <div class="strip">
          ${r.map(t=>D`<div class="slot ${Bt(t)}" title="${t.start_local} · ${e.fmt.n(t.price*100)} ct"></div>`)}
        </div>
        <div class="strip-axis">${r.filter((e,t)=>t%4==0).map(e=>D`<span>${e.start_local}</span>`)}</div>
      </div>
      <div class="card plan-kpi">
        <div>
          <h3>${t(`planTitle`)}</h3>
          <div class="plan-state">${Y(X(e,L.plan))}</div>
          <div class="sub msg">${typeof n.message==`string`?n.message:``}</div>
        </div>
        <div>
          ${s(t(`planGridCharge`),`${e.fmt.n(Z(n.total_grid_charge_kwh),2)} kWh`)}
          ${s(t(`planSaving`),`${e.fmt.n(Z(n.expected_saving_eur),2)} €`,`var(--ok)`)}
          ${i?s(t(`planCheapest`),c(i.min)):A}
          ${i?s(t(`planMostExpensive`),c(i.max)):A}
          ${s(t(`planKnownUntil`),o)}
        </div>
      </div>
    </div>
    ${Lr(e)}`}function $r(e){let{t,phase:n}=e.i18n,r=Ur(e,L.explanation);if(typeof r.phase!=`string`)return D`<div class="card"><p class="empty">${t(`noDecision`)}</p></div>`;let i=z(X(e,L.soc)),a=Z(r.target_soc),o=typeof r.timestamp==`string`?e.fmt.time(r.timestamp):void 0,s=[a===void 0?null:t(`tagTargetSoc`,{v:Math.round(a)}),(Z(r.target_charge_power)??0)>0?t(`tagTargetPower`,{v:e.fmt.w(Z(r.target_charge_power))}):null,r.battery_priority===!0?t(`tagBatteryPriority`):null,o?t(`tagSince`,{t:o}):null].filter(e=>!!e),c=(t,n)=>Z(t)??z(X(e,n)),l=c(r.charge_power_limit,L.chargeLimit),u=c(r.sent_charge_power_limit,L.sentChargeLimit),d=c(r.discharge_power_limit,L.dischargeLimit),f=c(r.sent_discharge_power_limit,L.sentDischargeLimit),p=Math.max(9e3,l??0,u??0,d??0,f??0),m=(n,r,i)=>D`
    <div class="limit-row">
      <div class="lbl"><span>${n}</span><span>${t(`limitTarget`,{a:r===void 0?t(`limitNone`):e.fmt.w(r),b:i===void 0?t(`limitNone`):e.fmt.w(i)})}</span></div>
      <div class="bar"><div class="soll" style="width:${(r??0)/p*100}%"></div><div class="sent" style="width:${(i??0)/p*100}%"></div></div>
    </div>`;return D`
    <div class="grid dec-top">
      <div class="card phase-hero">
        <h3>${t(`decisionPhase`)}</h3>
        <div class="phase-name">${n(r.phase)}</div>
        <div class="phase-reason">${typeof r.reason==`string`?r.reason:``}</div>
        <div class="chips">${s.map(e=>D`<span class="chip on"><i></i>${e}</span>`)}</div>
      </div>
      <div class="card">
        <h3>${t(`limitsTitle`)}</h3>
        <div class="sub lim-sub">${t(`limitsSub`)}</div>
        <div class="limits">
          ${m(t(`limitCharge`),l,u)}
          ${m(t(`limitDischarge`),d,f)}
          ${a===void 0?A:D`<div class="limit-row">
                <div class="lbl"><span>${t(`targetSoc`)}</span><span>${t(`limitSoc`,{a:Math.round(i??0),b:Math.round(a)})}</span></div>
                <div class="bar"><div class="soll" style="width:${a}%"></div><div class="sent" style="width:${i??0}%"></div></div>
              </div>`}
        </div>
      </div>
    </div>
    <div class="card tl-card">
      <div class="card-head">
        <h3>${t(`timelineTitle`)}</h3>
        <button class="toggle" ?disabled=${!e.timeline?.length} @click=${()=>e.timeline&&Hr(`maestro-entscheidungen.csv`,Gr(e))}>${t(`exportCsv`)}</button>
      </div>
      ${e.timeline?.length?D`<div class="timeline">
            ${e.timeline.map(t=>D`<div class="tl-item">
                <div class="tl-time">${e.fmt.dayTime(t.ts)}</div>
                <div class="tl-phase">${n(t.phase)}</div>
                <div class="tl-reason">${t.reason}</div>
              </div>`)}
          </div>`:D`<p class="empty">${e.timeline?t(`timelineEmpty`):t(`loading`)}</p>`}
    </div>
    <div class="grid stat-row dec-extra">
      <div class="card">
        <h3>${t(`reserveTitle`)}</h3>
        <div class="rows">
          ${$(t(`reserveSeasonal`),Xr(e,L.seasonalReserve))}
          ${$(t(`reserveAdaptive`),Xr(e,L.adaptiveReserve))}
          ${$(t(`reserveHt`),Xr(e,L.htReserve))}
          ${$(t(`reserveForward`),Xr(e,L.forwardTarget))}
          ${$(t(`targetSoc`),Xr(e,L.targetSoc))}
        </div>
      </div>
      <div class="card">
        <h3>${t(`windowsTitle`)}</h3>
        <div class="rows">
          ${$(t(`windowAstro`),Y(X(e,L.astroStart)))}
          ${$(t(`windowSeasonalEnd`),Y(X(e,L.seasonalEnd)))}
          ${$(t(`windowPvDelay`),Y(X(e,L.pvDelayStart)))}
          ${$(t(`windowTomorrow`),`${Y(X(e,L.tomorrowStart))} – ${Y(X(e,L.tomorrowEnd))}`)}
        </div>
      </div>
      <div class="card">
        <h3>${t(`autoTitle`)}</h3>
        <div class="rows">
          ${$(t(`autoTitle`),Y(X(e,L.autoStrategy)))}
          ${$(t(`autoSaving`),`${e.fmt.n(z(X(e,L.autoSaving)),2)} €`)}
        </div>
      </div>
    </div>
    <section class="group">
      <button type="button" class="group-head ${e.debugOpen?`open`:``}" aria-expanded=${e.debugOpen} @click=${e.onToggleDebug}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        <span>${t(`debugTitle`)}</span>
      </button>
      ${e.debugOpen?D`<div class="card debug-card">
            <div class="force">
              <div class="txt"><b>${t(`debugSwitch`)}</b></div>
              <button
                class="switch ${Kr(e)?`on`:``}"
                role="switch"
                aria-checked=${Kr(e)}
                aria-label=${t(`debugSwitch`)}
                ?disabled=${!X(e,L.debug)||e.pending.has(L.debug)}
                @click=${()=>e.onToggle(L.debug)}
              ></button>
            </div>
            <pre class="debug-log">${qr(e)}</pre>
          </div>`:A}
    </section>`}var ei,ti={pv:{entity:`pv`,color:`#fbbf24`,label:`nodePv`},grid:{entity:`grid`,color:`#f87171`,label:`nodeImport`},house:{entity:`house`,color:`#a78bfa`,label:`nodeHouse`},bat:{entity:`battery`,color:`#22d3ee`,label:`nodeBatCharge`}},ni=new URLSearchParams(location.search).has(`debug`),ri=[{id:`live`,label:`navLive`,sub:`subLive`,icon:`<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>`},{id:`forecast`,label:`navForecast`,sub:`subForecast`,icon:`<path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/>`},{id:`plan`,label:`navPlan`,sub:`subPlan`,icon:`<rect x="3" y="10" width="4" height="11" rx="1"/><rect x="10" y="5" width="4" height="16" rx="1"/><rect x="17" y="13" width="4" height="8" rx="1"/>`},{id:`decision`,label:`navDecision`,sub:`subDecision`,icon:`<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>`},{id:`settings`,label:`navSettings`,sub:`subSettings`,icon:`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`}],ii=`<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>`,ai=`(max-width: 960px)`,oi=3e5,si=6e4,ci=6,li=3e4,ui=6,di=(e,t=``)=>D`<svg class=${t} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" .innerHTML=${e}></svg>`,fi=()=>{let[e,t]=location.hash.slice(1).split(`/`),n=ri.some(t=>t.id===e)?e:`live`;return{screen:n,settingsGroup:n===`settings`&&xr(t)?t:void 0}},pi=fi(),mi=class extends N{constructor(...e){super(...e),this._narrow=!1,this._screen=pi.screen,this._settingsGroup=pi.settingsGroup,this._theme=nr(),this._sheet=!1,this._mobile=window.matchMedia(ai).matches,this._mq=window.matchMedia(ai),this._range=24,this._showIst=!0,this._loadedAt=new Map,this._pending=new Set,this._flowRaf=0,this._motion=!0,this._histState=`loading`,this._stats={hassUpdates:0,renders:0},this._resolvedAt=0,this._consumers=pt(),this._collapsed=jn(),this._period=`today`,this._debugOpen=!1,this._picking=!1,this._pickQuery=``,this._focusConsumers=!1,this._onMq=e=>{this._mobile=e.matches,this.requestUpdate()},this._onPop=()=>{let e=fi();this._screen=e.screen,this._settingsGroup=e.settingsGroup,this.requestUpdate()},this._animateFlows=e=>{bn(this.renderRoot.querySelectorAll(`.electron`),e),this._flowRaf=requestAnimationFrame(this._animateFlows)},this._onKey=e=>{e.key===`Escape`&&(this._hist?this._closeHistory():this._sheet&&this._setSheet(!1))},this._onChartError=e=>{this._chartError=e.detail,this.requestUpdate()},this._scrollKey=``}set hass(e){this._stats.hassUpdates++;let t=this._hass;this._hass=e,(!t||this._missingKeys(e).length)&&this._resolveEntities(),(!t||t.language!==e.language||$e().some(n=>t.states[n]!==e.states[n])||ni)&&this.requestUpdate()}get hass(){return this._hass}set narrow(e){e!==this._narrow&&(this._narrow=e,this.requestUpdate())}get narrow(){return this._narrow}connectedCallback(){super.connectedCallback(),Yt(this._theme),this._mq.addEventListener(`change`,this._onMq),this._mobile=this._mq.matches,this._timer=window.setInterval(()=>void this._ensureHistory(),si),this.addEventListener(`chart-error`,this._onChartError),window.addEventListener(`keydown`,this._onKey),window.addEventListener(`popstate`,this._onPop),this._motion=!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,this._motion&&(this._flowRaf=requestAnimationFrame(this._animateFlows))}disconnectedCallback(){super.disconnectedCallback(),this._mq.removeEventListener(`change`,this._onMq),window.clearInterval(this._timer),cancelAnimationFrame(this._flowRaf),this.removeEventListener(`chart-error`,this._onChartError),window.removeEventListener(`keydown`,this._onKey),window.removeEventListener(`popstate`,this._onPop)}_closeHistory(){this._hist=void 0,this._histPoints=void 0,this.requestUpdate()}_openFlow(e){let t=this._hass;if(!t)return;let n=Zn(t.language),r=ti[e],i=this._consumers.find(t=>t.id===e),a=r?L[r.entity]:i?.entityId;if(!a)return;let o=t.states[a],s=z(o),c=e===`grid`&&s!==void 0&&s>=0,l=e===`grid`?n.t(c?`nodeFeed`:`nodeImport`):r?n.t(r.label):i?.name??a,u=c?`#34d399`:r?.color??`#38bdf8`,d=o?.attributes.unit_of_measurement;this._hist={name:l,color:u,entityId:a},this._histPoints=void 0,this._histState=`loading`,this.requestUpdate(),Vn(t,a,d===`kW`?1e3:1).then(e=>{this._hist?.entityId===a&&(this._histPoints=e,this._histState=e.length?`ready`:`empty`,this.requestUpdate())}).catch(()=>{this._hist?.entityId===a&&(this._histState=`error`,this.requestUpdate())})}async _resolveEntities(){let e=this._hass;if(!(!e||Date.now()-this._resolvedAt<li)){this._resolvedAt=Date.now();try{let t=await e.callWS({type:`e3dc_maestro/panel_entities`}),n=JSON.stringify(L);Je(t),Xe(t),this._entityMap=t,JSON.stringify(L)!==n&&this._loadedAt.clear(),this.requestUpdate(),this._ensureHistory()}catch{}}}_missingKeys(e){return Object.keys(qe).filter(t=>!e.states[L[t]])}_entityNotice(e,t){let n=this._entityMap;if(n&&n.entry_id===null)return D`<p class="err">${t(`notSetUp`)}</p>`;let r=this._missingKeys(e);if(!r.length)return A;let i=new Set(n?.disabled??[]),a=r.slice(0,ui).map(e=>i.has(e)?`${L[e]} (${t(`entityDisabled`)})`:L[e]),o=r.length>ui?` +${r.length-ui}`:``;return D`<p class="err">${t(`entitiesMissing`,{list:a.join(`, `)+o})}</p>`}_alerts(e,t){let n=t=>e.states[t]?.state,r=n(L.reachable)===`off`,i=[r?t(`alertUnreachable`):null,n(L.chargeLock)===`on`?t(`alertChargeLock`):null,n(L.dischargeLock)===`on`?t(`alertDischargeLock`):null,n(L.unjustified)===`on`?t(`alertUnjustified`):null].filter(e=>!!e);return i.length?D`<div class="banner ${r?`bad`:``}" role="status">${i.map(e=>D`<span>${e}</span>`)}</div>`:A}async _ensureHistory(){let e=this._hass;if(!e||document.hidden)return;let t=e=>Date.now()-(this._loadedAt.get(e)??0)>oi,n=async(e,n)=>{if(t(e)){this._loadedAt.set(e,Date.now()-oi+si);try{await n(),this._loadedAt.set(e,Date.now()),this.requestUpdate()}catch{}}};if(this._screen===`live`&&await n(`sparks`,async()=>void(this._sparks=await Bn(e))),this._screen===`live`&&this._period!==`today`){let t=this._period;await n(`period-${t}`,async()=>void(this._periodSums=await zn(e,t)))}this._screen===`forecast`&&this._showIst&&await n(`ist`,async()=>void(this._ist=await Hn(e,ci))),this._screen===`decision`&&await n(`timeline`,async()=>void(this._timeline=await Un(e)))}_setTheme(e){this._theme=e,Yt(e),rr(e),this.requestUpdate()}_go(e){this._screen=e,this._settingsGroup=void 0,this._zoomKey=void 0,this._error=void 0,history.replaceState(null,``,`#${e}`),this.requestUpdate(),this._ensureHistory()}_openSettingsGroup(e){this._screen=`settings`,this._settingsGroup=e,e===q.id&&(this._classic=void 0),history.pushState({maestroGroup:!0},``,`#settings/${e}`),this.requestUpdate()}_closeSettingsGroup(){history.state?.maestroGroup?history.back():(this._settingsGroup=void 0,history.replaceState(null,``,`#settings`),this.requestUpdate())}_setSheet(e){this._sheet=e,e||(this._error=void 0,this._picking=!1),this.requestUpdate()}_openConsumers(){this._sheet=!0,this._focusConsumers=!0,this.requestUpdate()}_setConsumers(e,t=!1){this._consumers=e.slice(0,6),mt(this._consumers),t&&(this._picking=!1,this._pickQuery=``),this.requestUpdate()}async _call(e,t,n,r){let i=this._hass;if(i){this._pending.add(e),this._error=void 0,this.requestUpdate();try{await i.callService(t,n,r)}catch(e){let t=e instanceof Error?e.message:typeof e==`object`&&e&&`message`in e?String(e.message):String(e);this._error=Zn(i.language).t(`callFailed`,{err:t})}finally{this._pending.delete(e),this.requestUpdate()}}}_toggle(e){let t=B(this._hass?.states[e]);this._call(e,`switch`,t?`turn_off`:`turn_on`,{entity_id:e})}_press(e){this._call(e,`button`,`press`,{entity_id:e})}_select(e,t){this._call(e,`select`,`select_option`,{entity_id:e,option:t})}_commitPower(e){this._commitNumber(L.forceDischargePower,e).then(()=>{this._powerDraft=void 0,this.requestUpdate()})}_commitReserve(e){this._commitNumber(L.fixedReserveSoc,e).then(()=>{this._reserveDraft=void 0,this.requestUpdate()})}_commitNumber(e,t){return this._call(e,`number`,`set_value`,{entity_id:e,value:t})}async _checkClassic(){let e=this._hass;e&&(this._classic={...this._classic,state:`checking`},this.requestUpdate(),this._classic=await fr(e),this.requestUpdate())}async _createClassic(){let e=this._hass,t=this._classic;if(e&&t){this._classic={...t,state:`creating`},this.requestUpdate();try{await pr(e,t.state),await this._checkClassic()}catch(e){this._classic={...t,state:`error`,error:or(e)},this.requestUpdate()}}}_openClassic(){history.pushState(null,``,`/e3dc-maestro`),window.dispatchEvent(new CustomEvent(`location-changed`,{detail:{replace:!1}}))}_toggleMenu(){this.dispatchEvent(new Event(`hass-toggle-menu`,{bubbles:!0,composed:!0}))}render(){this._stats.renders++;let e=this._hass;if(!e)return D``;let t=Zn(e.language),n=Dn(e.language),{t:r}=t,i={hass:e,i18n:t,fmt:n,mobile:this._mobile,sparks:this._sparks,ist:this._ist,timeline:this._timeline,range:this._range,showIst:this._showIst,onRange:e=>{this._range=e,this.requestUpdate()},onToggleIst:()=>{this._showIst=!this._showIst,this.requestUpdate(),this._ensureHistory()},consumers:ht(this._consumers,e),consumerOverflow:gt(z(e.states[L.house]),ht(this._consumers,e)),onEditConsumers:()=>this._openConsumers(),onFlowNode:e=>this._openFlow(e),motion:this._motion,collapsed:this._collapsed,onToggleGroup:e=>{let t=new Set(this._collapsed);t.delete(e)||t.add(e),this._collapsed=t,Mn(t),this.requestUpdate()},period:this._period,periodSums:this._periodSums,onPeriod:e=>{this._period=e,this.requestUpdate(),this._ensureHistory()},pending:this._pending,groupId:this._settingsGroup,onOpenGroup:e=>this._openSettingsGroup(e),onOpenClassic:()=>this._openClassic(),classic:this._classic,isAdmin:e.user?.is_admin===!0,onCreateClassic:()=>void this._createClassic(),onCheckClassic:()=>void this._checkClassic(),onToggle:e=>this._toggle(e),onPress:e=>this._press(e),onSelect:(e,t)=>this._select(e,t),onNumber:(e,t)=>void this._commitNumber(e,t),forcePowerDraft:this._powerDraft,onPowerDraft:e=>{this._powerDraft=e,this.requestUpdate()},onPowerCommit:e=>this._commitPower(e),reserveDraft:this._reserveDraft,onReserveDraft:e=>{this._reserveDraft=e,this.requestUpdate()},onReserveCommit:e=>this._commitReserve(e),debugOpen:this._debugOpen,onToggleDebug:()=>{this._debugOpen=!this._debugOpen,this.requestUpdate()},theme:this._theme,onTheme:e=>this._setTheme(e)},a=ri.find(e=>e.id===this._screen)??ri[0],o=this._screen===`settings`?Sr(this._settingsGroup):void 0,s=B(e.states[L.ctrlActive]),c=e.states[L.phase]?.state,l={live:Jr,forecast:Zr,plan:Qr,decision:$r,settings:zr}[a.id](i);return D`
      <div class="app">
        <nav class="rail" aria-label="Maestro">
          <div class="logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="#06101f" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" /></svg>
          </div>
          ${ri.map(e=>D`<button
      class="nav-btn ${e.id===a.id?`active`:``}"
      aria-current=${e.id===a.id?`page`:`false`}
      @click=${()=>this._go(e.id)}
    >
      ${di(e.icon)}${r(e.label)}
    </button>`)}
          <div class="spacer"></div>
          <button class="nav-btn" @click=${()=>this._setSheet(!0)}>${di(ii)}${r(`navControls`)}</button>
        </nav>
        <main>
          <header class="topbar">
            ${this._narrow?D`<button class="menu" aria-label=${r(`menu`)} @click=${this._toggleMenu}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" /></svg>
                </button>`:A}
            ${o?D`<button class="menu" aria-label=${r(`settingsBack`)} @click=${()=>this._closeSettingsGroup()}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.4 5.4 9.8 11H21v2H9.8l5.6 5.6L14 20l-8-8 8-8z"/></svg>
                </button>`:A}
            <div class="title grow">
              <h1>${r(o?o.title:a.label)}</h1>
              <p>${r(o?o.hint:a.sub)}</p>
            </div>
            <span class="pill hide-sm"><span class="dot ${s?``:`off`}"></span>${r(s?`regulationOn`:`regulationOff`)}${c?` · ${t.phase(c)}`:``}</span>
          </header>
          ${this._entityNotice(e,r)}
          ${this._alerts(e,r)}
          ${this._error&&!this._sheet?D`<p class="err" role="alert">${this._error}</p>`:A}
          ${this._chartError?D`<p class="err">${r(`chartError`,{err:this._chartError})}</p>`:A}
          <section class="screen" id=${`screen-${a.id}`}>${l}</section>
          ${ni?D`<footer class="debug">hass-Updates ${this._stats.hassUpdates} · Renders ${this._stats.renders}</footer>`:A}
        </main>
      </div>
      ${Ft({hass:e,i18n:t,fmt:n,open:this._sheet,pending:this._pending,error:this._error,forcePowerDraft:this._powerDraft,onClose:()=>this._setSheet(!1),onToggle:e=>this._toggle(e),onPowerDraft:e=>{this._powerDraft=e,this.requestUpdate()},onPowerCommit:e=>this._commitPower(e),reserveDraft:this._reserveDraft,onReserveDraft:e=>{this._reserveDraft=e,this.requestUpdate()},onReserveCommit:e=>this._commitReserve(e),onPress:e=>this._press(e),onSelect:(e,t)=>this._select(e,t),onAllSettings:()=>{this._setSheet(!1),this._go(`settings`)},consumers:this._consumers,picking:this._picking,pickQuery:this._pickQuery,choices:_t(e,new Set(this._consumers.map(e=>e.entityId)),this._pickQuery),wallbox:e.states[`sensor.e3dc_maestro_wallbox_leistung`]&&!this._consumers.some(e=>e.entityId===`sensor.e3dc_maestro_wallbox_leistung`)?{id:et,name:ut(e.states[et],t.t(`useWallbox`))}:void 0,onPick:e=>{this._picking=e,this.requestUpdate()},onPickQuery:e=>{this._pickQuery=e,this.requestUpdate()},onAddConsumer:(e,t)=>{this._consumers.some(t=>t.entityId===e)||this._setConsumers([...this._consumers,{id:ft(),entityId:e,name:t,mode:`included`,icon:ot(e)}],!0)},onUseWallbox:()=>{let n=ut(e.states[et],t.t(`useWallbox`));this._setConsumers([...this._consumers,{id:ft(),entityId:et,name:n,mode:`separate`,icon:`wallbox`}],!0)},onRenameConsumer:(e,t)=>{let n=t.slice(0,40);n.trim()&&this._setConsumers(this._consumers.map(t=>t.id===e?{...t,name:n}:t))},onConsumerMode:(e,t)=>{this._setConsumers(this._consumers.map(n=>n.id===e?{...n,mode:t}:n))},onConsumerIcon:(e,t)=>{this._setConsumers(this._consumers.map(n=>n.id===e?{...n,icon:t}:n))},onRemoveConsumer:e=>this._setConsumers(this._consumers.filter(t=>t.id!==e))})}
      ${this._hist?D`<div class="scrim open hist-scrim" @click=${()=>this._closeHistory()}></div>
            <aside class="overlay" role="dialog" aria-modal="true" aria-label=${this._hist.name}>
              <div class="sheet-head">
                <div class="grow"><h2>${this._hist.name}</h2><div class="sub">${r(`historySub`)}</div></div>
                <button class="btn" @click=${()=>this._closeHistory()}>${r(`close`)}</button>
              </div>
              ${this._histState===`loading`?D`<p class="hint">${r(`loading`)}</p>`:A}
              ${this._histState===`empty`?D`<p class="hint">${r(`historyEmpty`)}</p>`:A}
              ${this._histState===`error`?D`<p class="err">${r(`historyFailed`)}</p>`:A}
              ${this._histState===`ready`&&this._histPoints?D`<maestro-chart .options=${K(`hist-${this._hist.entityId}`,[this._theme,this._histPoints,this._hist.color,n.loc],()=>sn(this._histPoints,this._hist.color,n))}></maestro-chart>`:A}
            </aside>`:A}
    `}firstUpdated(){this._ensureHistory()}willUpdate(){this.getAttribute(`theme`)!==this._theme&&this.setAttribute(`theme`,this._theme)}updated(){let e=`${this._screen}/${this._settingsGroup??``}`;if(e!==this._scrollKey){this._scrollKey=e;let t=this.renderRoot.querySelector(`main`);t&&!this._focusConsumers&&(t.scrollTop=0)}if(this._screen===`settings`&&this._settingsGroup===q.id&&!this._classic&&this._checkClassic(),this._focusConsumers&&(this._focusConsumers=!1,this.renderRoot.querySelector(`#display-consumers`)?.scrollIntoView({block:`start`})),this._screen!==`forecast`||!this._hass)return;let t=Lt(this._hass.states[L.trajectory]?.attributes),n=this.renderRoot.querySelector(`#fc-main`);if(!t||!n)return;let r=t.trajectory_points[0][0],i=t.trajectory_points[t.trajectory_points.length-1][0],a=this._showIst&&this._ist?.pv.length?Math.min(r,this._ist.pv[0][0]):r,o=`${this._range}|${a}|${r}`;o!==this._zoomKey&&(this._zoomKey=o,n.zoomX(a,Math.min(i,r+this._range*36e5)))}};ei=mi,ei.styles=Qn,customElements.get(`e3dc-maestro-panel`)||customElements.define(`e3dc-maestro-panel`,mi);