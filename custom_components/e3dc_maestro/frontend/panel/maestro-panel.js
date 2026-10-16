import{i as e,n as t,r as n,t as r}from"./entities-B-vYTcEP.js";var i=globalThis,a=i.ShadowRoot&&(i.ShadyCSS===void 0||i.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap,c=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(a&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=s.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&s.set(t,e))}return e}toString(){return this.cssText}},l=e=>new c(typeof e==`string`?e:e+``,void 0,o),u=(e,...t)=>new c(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,o),d=(e,t)=>{if(a)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=i.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},f=a?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return l(t)})(e):e,{is:ee,defineProperty:te,getOwnPropertyDescriptor:ne,getOwnPropertyNames:re,getOwnPropertySymbols:ie,getPrototypeOf:ae}=Object,p=globalThis,m=p.trustedTypes,oe=m?m.emptyScript:``,se=p.reactiveElementPolyfillSupport,h=(e,t)=>e,g={toAttribute(e,t){switch(t){case Boolean:e=e?oe:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},_=(e,t)=>!ee(e,t),v={attribute:!0,type:String,converter:g,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol(`metadata`),p.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&te(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=ne(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??v}static _$Ei(){if(this.hasOwnProperty(h(`elementProperties`)))return;let e=ae(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(h(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(h(`properties`))){let e=this.properties,t=[...re(e),...ie(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(f(e))}else e!==void 0&&t.push(f(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return d(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?g:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?g:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??_)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:`open`},y[h(`elementProperties`)]=new Map,y[h(`finalized`)]=new Map,se?.({ReactiveElement:y}),(p.reactiveElementVersions??=[]).push(`2.1.2`);var b=globalThis,x=e=>e,S=b.trustedTypes,C=S?S.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,w=`$lit$`,T=`lit$${Math.random().toFixed(9).slice(2)}$`,E=`?`+T,ce=`<${E}>`,D=document,O=()=>D.createComment(``),k=e=>e===null||typeof e!=`object`&&typeof e!=`function`,A=Array.isArray,le=e=>A(e)||typeof e?.[Symbol.iterator]==`function`,j=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,P=/>/g,F=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),I=/'/g,L=/"/g,R=/^(?:script|style|textarea|title)$/i,z=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),B=Symbol.for(`lit-noChange`),V=Symbol.for(`lit-nothing`),H=new WeakMap,U=D.createTreeWalker(D,129);function W(e,t){if(!A(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return C===void 0?t:C.createHTML(t)}var ue=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=M;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===M?c[1]===`!--`?o=N:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=F):(R.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=F):o=P:o===F?c[0]===`>`?(o=i??M,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?F:c[3]===`"`?L:I):o===L||o===I?o=F:o===N||o===P?o=M:(o=F,i=void 0);let d=o===F&&e[t+1].startsWith(`/>`)?` `:``;a+=o===M?n+ce:l>=0?(r.push(s),n.slice(0,l)+w+n.slice(l)+T+d):n+T+(l===-2?t:d)}return[W(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},G=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=ue(t,n);if(this.el=e.createElement(l,r),U.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=U.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(w)){let t=u[o++],n=i.getAttribute(e).split(T),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?fe:r[1]===`?`?pe:r[1]===`@`?me:J}),i.removeAttribute(e)}else e.startsWith(T)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(R.test(i.tagName)){let e=i.textContent.split(T),t=e.length-1;if(t>0){i.textContent=S?S.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],O()),U.nextNode(),c.push({type:2,index:++a});i.append(e[t],O())}}}else if(i.nodeType===8){if(i.data===E)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(T,e+1))!==-1;)c.push({type:7,index:a}),e+=T.length-1}}a++}}static createElement(e,t){let n=D.createElement(`template`);return n.innerHTML=e,n}};function K(e,t,n=e,r){if(t===B)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=k(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=K(e,i._$AS(e,t.values),i,r)),t}var de=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??D).importNode(t,!0);U.currentNode=r;let i=U.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new q(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new he(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=U.nextNode(),a++)}return U.currentNode=D,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},q=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),k(e)?e===V||e==null||e===``?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==B&&this._(e):e._$litType$===void 0?e.nodeType===void 0?le(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&k(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=G.createElement(W(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new de(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=H.get(e.strings);return t===void 0&&H.set(e.strings,t=new G(e)),t}k(t){A(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(O()),this.O(O()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=x(e).nextSibling;x(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=V}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=K(this,e,t,0),a=!k(e)||e!==this._$AH&&e!==B,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=K(this,r[n+o],t,o),s===B&&(s=this._$AH[o]),a||=!k(s)||s!==this._$AH[o],s===V?e=V:e!==V&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},fe=class extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}},pe=class extends J{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}},me=class extends J{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=K(this,e,t,0)??V)===B)return;let n=this._$AH,r=e===V&&n!==V||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==V&&(n===V||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},he=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}},ge=b.litHtmlPolyfillSupport;ge?.(G,q),(b.litHtmlVersions??=[]).push(`3.3.3`);var _e=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new q(t.insertBefore(O(),e),e,void 0,n??{})}return i._$AI(e),i},Y=globalThis,X=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=_e(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};X._$litElement$=!0,X.finalized=!0,Y.litElementHydrateSupport?.({LitElement:X});var ve=Y.litElementPolyfillSupport;ve?.({LitElement:X}),(Y.litElementVersions??=[]).push(`4.2.2`);var ye=(function(){let e=typeof document<`u`&&document.createElement(`link`).relList;return e&&e.supports&&e.supports(`modulepreload`)?`modulepreload`:`preload`})(),be=function(e,t){return new URL(e,t).href},xe={},Se=function(e){return e.pathname.endsWith(`.css`)},Ce=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},we=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=be(t,n);let r=s(t),i=Se(r);return Ce(xe,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:ye,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Z,Q=new URLSearchParams(location.search).has(`debug`),Te=[6,12,24],$=class extends X{constructor(...e){super(...e),this._range=24,this._stats={hassUpdates:0,renders:0,chartDraws:0,chartMs:0},this._narrow=!1}set hass(e){this._stats.hassUpdates++;let t=this._hass;this._hass=e,(!t||n.some(n=>t.states[n]!==e.states[n])||Q)&&this.requestUpdate()}get hass(){return this._hass}set narrow(e){e!==this._narrow&&(this._narrow=e,this.requestUpdate())}get narrow(){return this._narrow}_toggleMenu(){this.dispatchEvent(new Event(`hass-toggle-menu`,{bubbles:!0,composed:!0}))}connectedCallback(){super.connectedCallback(),this._chartInput=void 0,this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this._chart?.destroy(),this._chart=void 0}_state(e){return this._hass?.states[e]}render(){this._stats.renders++;let n=this._state(r.trajectory),i=this._state(r.phase)?.state,a=e(this._state(r.soc)),o=Array.isArray(n?.attributes.trajectory_points);return z`
      <header>
        <div class="brand">
          ${this._narrow?z`<button class="menu" aria-label="Menü" @click=${this._toggleMenu}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
                </svg>
              </button>`:V}
          <span class="logo"></span>
          <div>
            <h1>Maestro</h1>
            <p>Prognose der nächsten 24 Stunden</p>
          </div>
        </div>
        <div class="chips">
          ${i?z`<span class="chip accent">${t[i]??i}</span>`:V}
          ${a===void 0?V:z`<span class="chip">SoC ${Math.round(a)} %</span>`}
        </div>
      </header>

      <section class="card">
        <div class="card-head">
          <h2>SoC-Trajektorie und Leistung</h2>
          <div class="seg" role="group" aria-label="Zeitraum">
            ${Te.map(e=>z`<button
                class=${this._range===e?`active`:``}
                aria-pressed=${this._range===e}
                @click=${()=>this._zoom(e)}
              >
                ${e} h
              </button>`)}
          </div>
        </div>
        <div id="chart" ?hidden=${!o}></div>
        ${this._error?z`<p class="empty err">Chart konnte nicht geladen werden: ${this._error}</p>`:V}
        ${o?V:z`<p class="empty">
              Noch keine Prognose verfügbar. Maestro braucht mindestens 7 Tage Verlauf.
            </p>`}
      </section>

      ${Q?z`<footer>
            hass-Updates ${this._stats.hassUpdates} · Renders ${this._stats.renders} · Chart-Draws
            ${this._stats.chartDraws} · letzter Chart ${this._stats.chartMs.toFixed(0)} ms
          </footer>`:V}
    `}updated(){let e=this._state(r.trajectory),t=this._state(r.targetSoc);(this._chartInput?.[0]!==e||this._chartInput?.[1]!==t)&&(this._chartInput=[e,t],this._drawChart(e,t).catch(e=>{this._error=e instanceof Error?`${e.name}: ${e.message}`:String(e),this.requestUpdate()}))}async _drawChart(t,n){let r=this.renderRoot.querySelector(`#chart`),{ForecastChart:i,isTrajectory:a}=await we(async()=>{let{ForecastChart:e,isTrajectory:t}=await import(`./forecast-chart-wcxHgeEJ.js`);return{ForecastChart:e,isTrajectory:t}},[],import.meta.url);if(!r||!a(t?.attributes)){this._chart?.destroy(),this._chart=void 0;return}let o=performance.now();this._chart??=new i(r),await this._chart.update(t.attributes,e(n)),this._range!==24&&this._chart.zoomHours(this._range),this._error=void 0,this._stats.chartDraws++,this._stats.chartMs=performance.now()-o,Q&&this.requestUpdate()}_zoom(e){this._range=e,this._chart?.zoomHours(e),this.requestUpdate()}};Z=$,Z.styles=u`
    :host {
      --bg: #070b14;
      --glass: rgba(255, 255, 255, 0.045);
      --stroke: rgba(255, 255, 255, 0.08);
      --text: #e8edf7;
      --muted: #8b96ad;
      --faint: #5a6580;
      --accent: #38bdf8;
      --radius: 20px;
      display: block;
      min-height: 100%;
      box-sizing: border-box;
      padding: 24px;
      color: var(--text);
      font-family: Inter, system-ui, sans-serif;
      background:
        radial-gradient(1200px 600px at 10% -10%, rgba(56, 189, 248, 0.12), transparent 60%),
        radial-gradient(900px 500px at 110% 10%, rgba(167, 139, 250, 0.1), transparent 60%),
        var(--bg);
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .menu {
      width: 40px;
      height: 40px;
      border: 0;
      border-radius: 12px;
      background: var(--glass);
      color: var(--text);
      cursor: pointer;
    }
    .menu svg {
      width: 22px;
      height: 22px;
      fill: currentColor;
    }
    .logo {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: linear-gradient(135deg, #38bdf8, #a78bfa);
    }
    h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
    }
    h1 + p {
      margin: 2px 0 0;
      color: var(--muted);
      font-size: 13px;
    }
    .chips {
      display: flex;
      gap: 8px;
    }
    .chip {
      padding: 6px 12px;
      border-radius: 999px;
      border: 1px solid var(--stroke);
      background: var(--glass);
      font-size: 13px;
    }
    .chip.accent {
      color: var(--accent);
      border-color: rgba(56, 189, 248, 0.35);
    }
    .card {
      background: var(--glass);
      border: 1px solid var(--stroke);
      border-radius: var(--radius);
      backdrop-filter: blur(20px);
      padding: 20px;
    }
    .card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    h2 {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
    }
    .seg {
      display: inline-flex;
      padding: 3px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.05);
    }
    .seg button {
      border: 0;
      background: transparent;
      color: var(--muted);
      font: inherit;
      font-size: 13px;
      padding: 6px 12px;
      border-radius: 8px;
      cursor: pointer;
    }
    .seg button.active {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text);
    }
    .seg button:focus-visible {
      outline: 2px solid var(--accent);
    }
    #chart {
      margin-top: 8px;
      min-height: 420px;
    }
    .empty {
      color: var(--muted);
      padding: 48px 0;
      text-align: center;
    }
    .err {
      color: #f87171;
      padding: 12px 0;
      font-size: 13px;
      word-break: break-word;
    }
    footer {
      margin-top: 12px;
      color: var(--faint);
      font: 12px ui-monospace, monospace;
    }
    @media (max-width: 600px) {
      :host {
        padding: 16px;
      }
      .card {
        padding: 14px;
      }
    }
  `,customElements.get(`e3dc-maestro-panel`)||customElements.define(`e3dc-maestro-panel`,$);