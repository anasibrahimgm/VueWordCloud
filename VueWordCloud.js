!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.VueWordCloud=e()}(this,function(){"use strict";function t(t){return"function"==typeof t}function e(){}function n(){return[]}function r(t){return new Promise(function(e){e(t())})}var i=function(){this.interrupted=!1,this.interruptHandlers=new Set};function o(t,e,n){return r(function(){var r=new Worker(e),i=function(){r.terminate()};t.onInterrupt(i),r.postMessage(n);var o=function(t){return new Promise(function(e,n){var r,i=function(t){r(t),e(t.data)},o=function(t){r(t),n(t)};r=function(e){e.preventDefault(),t.removeEventListener("message",i),t.removeEventListener("error",o)},t.addEventListener("message",i),t.addEventListener("error",o)})}(r);return o.then(i,i),o})}function a(e){return t(e)?e:function(t){return function(){return t}}(e)}function u(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function f(t){return Math.pow(2,Math.ceil(function(t){return Math.log(t)/Math.LN2}(t)))}function c(t,e){if(t.length>0)return e&&(t=t.map(e)),t.reduce(function(t,e){return Math.min(t,e)})}function h(t,e){if(t.length>0)return e&&(t=t.map(e)),t.reduce(function(t,e){return Math.max(t,e)})}function s(t,e,n,r,i){return r+(t-e)*(i-r)/(n-e)}function d(t,e,n){return[Math.ceil(t*Math.abs(Math.cos(n))+e*Math.abs(Math.sin(n))),Math.ceil(t*Math.abs(Math.sin(n))+e*Math.abs(Math.cos(n)))]}function l(t){return 2*t*Math.PI}function v(t,n,i,o,a,u,f){return r(function(){f=l(f);var c=[n,i,o,a+"px",u].join(" ");return function(t,e){return r(function(){return document.fonts.load(t,e)})}(c,t).catch(e).then(function(){var e=document.createElement("canvas").getContext("2d");e.font=c;var n=e.measureText(t).width,r=a,i=d(n,r,f),o=i[0],u=i[1],h=Math.max(e.measureText("m").width,a),s=d(n+2*h,r+2*h,f);return[n,r,o,u,s[0],s[1]]})})}function p(t,e,n,i){return r(function(){var t=function(t,e){var n={};if(t.length>0){var r=c(t,function(t){return t.weight}),i=h(t,function(t){return t.weight});if(r<i&&e>0&&e<1/0)e<1&&(e=1/e),t.forEach(function(t){var o=t.key,a=t.weight;n[o]=s(a,r,i,1,e)});else if(r>0)t.forEach(function(t){var e=t.key,i=t.weight;n[e]=i/r});else{var o=1+Math.abs(r)+Math.abs(i);t.forEach(function(t){var e=t.key,a=t.weight;n[e]=s(a,r,i,1,o)})}}return n}(e,i);return Promise.all(e.map(function(e){var r=e.key,i=e.text,o=e.rotation,a=e.fontFamily,u=e.fontStyle,c=e.fontVariant,h=e.fontWeight,s=Math.pow(n-1,2)*t[r]+1;return v(i,u,c,h,s,a,o).then(function(t){var r=t[0],d=t[1],v=t[2],p=t[3],g=t[4],m=t[5],y=Math.max(f(g),Math.pow(n,2)),w=Math.max(f(m),Math.pow(n,2)),W=function(t,e,n,r,i,o,a,u,f){f=l(f);var c=[e,n,r,i+"px",o].join(" "),h=document.createElement("canvas").getContext("2d");h.canvas.width=a,h.canvas.height=u,h.translate(a/2,u/2),h.rotate(f),h.font=c,h.textAlign="center",h.textBaseline="middle",h.fillText(t,0,0),h.miterLimit=1,h.lineWidth=3,h.strokeText(t,0,0);for(var s=new Uint8Array(a*u),d=h.getImageData(0,0,a,u).data,v=0,p=s.length;v<p;++v)s[v]=d[4*v+3];return s}(i,u,c,h,s,a,y,w,o);return Object.assign({fontSize:s,textWidth:r,textHeight:d,rectWidth:v,rectHeight:p,image:W,imageWidth:y,imageHeight:w},e)})}))})}i.prototype.throwIfInterrupted=function(){if(this.interrupted)throw new Error},i.prototype.interrupt=function(){this.interrupted||(this.interrupted=!1,this.interruptHandlers.forEach(function(t){t()}))},i.prototype.onInterrupt=function(t){this.interrupted&&(this.interruptHandlers.has(t)||t()),this.interruptHandlers.add(t)};var g={measuredWords:{get:function(t){return p(0,this.populatedWords,4,this.fontSizeRatio)},default:n}},m={boundedWords:{code:'!function(){"use strict";function r(r,t,a,o,n,e){var i=function(r,t,a){for(var o=[],n=0;n<t;++n)for(var e=0;e<a;++e)r[t*e+n]&&o.push([n,e]);return o}(o,n,e);return function(r,t,a){if(r>0&&t>0){var o,n;r>t?(o=1,n=t/r):t>r?(n=1,o=r/t):o=n=1;var e=Math.floor(r/2),i=Math.floor(t/2),f=r-e,v=t-i;if(e<f)for(var h=e;h<=f;++h){var u=[h,i];if(a(u))return u}else if(i<v)for(var c=i;c<=v;++c){var l=[e,c];if(a(l))return l}for(var g=e,s=i,M=f,d=v;f<r||v<t;){e-=o,i-=n,f+=o,v+=n;var m=Math.floor(e),p=Math.floor(i),W=Math.ceil(f),w=Math.ceil(v);if(W>M)for(var y=p;y<w;++y){var H=[W,y];if(a(H))return H}if(w>d)for(var x=W;x>m;--x){var S=[x,w];if(a(S))return S}if(m<g)for(var k=w;k>p;--k){var z=[m,k];if(a(z))return z}if(p<s)for(var L=m;L<W;++L){var A=[L,p];if(a(A))return A}g=m,s=p,M=W,d=w}}}(t-n,a-e,function(a){for(var o=a[0],n=a[1],e=0,f=i.length;e<f;++e){var v=i[e],h=v[0],u=v[1];if(r[t*(u+n)+(h+o)])return!1}return!0})}function t(r,t,a,o){for(var n=t/o,e=a/o,i=new Uint8Array(n*e),f=0;f<n;++f)for(var v=0;v<e;++v)r:for(var h=0;h<o;++h)for(var u=0;u<o;++u){var c=r[t*(v*o+u)+(f*o+h)];if(c){i[n*v+f]=c;break r}}return[i,n,e]}function a(r,t,a,o,n,e,i,f){for(var v=0;v<i;++v)for(var h=0;h<f;++h){var u=e[i*h+v];if(u){var c=v+o;if(c>=0&&c<t){var l=h+n;l>=0&&l<a&&(r[t*l+c]=u)}}}}var o=Math.pow(2,28),n=function(n,e,i,f){if(i>0&&f>0){var v=i/f,h=[],u=Math.floor(Math.sqrt(v*o)),c=Math.floor(o/u),l=Math.floor(u/4),g=Math.floor(c/4);return n=n.map(function(r){var t,a=r.imageWidth,o=r.imageHeight;return[(t=Math.min(a,o)/Math.pow(e,2),Math.log(t)/Math.LN2),r]}),s=function(r){return-r[0]},n=(n=n.map(function(r){return[s(r),r]}).sort(function(r,t){var a=r[0],o=t[0];return a>o?1:a<o?-1:0}).map(function(r){return r[1]})).map(function(o){for(var n=o[0],e=o[1],i=e.originalWord,f=e.key,v=e.text,s=e.weight,M=e.rotation,d=e.fontFamily,m=e.fontStyle,p=e.fontVariant,W=e.fontWeight,w=e.color,y=e.fontSize,H=e.textWidth,x=e.textHeight,S=e.rectWidth,k=e.rectHeight,z=e.image,L=e.imageWidth,A=e.imageHeight,F=[[z,L,A]],U=1;U<n;++U){var V;z=(V=t(z,L,A,2))[0],L=V[1],A=V[2],F.push([z,L,A])}if(h.length<1)for(var b=0;b<F.length;++b){var q=new Uint8Array(u*c);h.push(q)}var E=h[F.length-1],N=r(E,u,c,z,L,A),P=N[0],T=N[1];a(E,u,c,P,T,z,L,A);for(var j=F.length-1;j-- >0;){var B;P=2*(P-l),T=2*(T-g),E=h[j],z=(B=F[j])[0],L=B[1],A=B[2],a(E,u,c,P,T,z,L,A)}return{originalWord:i,key:f,text:v,weight:s,rotation:M,fontFamily:d,fontStyle:m,fontVariant:p,fontWeight:W,color:w,fontSize:y,textWidth:H,textHeight:x,rectLeft:P+(L-S)/2,rectTop:T+(A-k)/2,rectWidth:S,rectHeight:k}})}var s;return[]};self.addEventListener("message",function(r){var t=r.data,a=t.words,o=t.fontSizePower,e=t.containerWidth,i=t.containerHeight;self.postMessage(n(a,o,e,i))})}();\n',data:function(){return{words:this.measuredWords,fontSizePower:4,containerWidth:this.containerWidth,containerHeight:this.containerHeight}},default:n}};Object.entries(m).forEach(function(t){var e=t[0],n=t[1],r=n.code,i=n.data,a=n.default,u=n.errorHandler,f=URL.createObjectURL(new Blob([r]));g[e]={get:function(t){return o(t,f,i.call(this))},default:a,errorHandler:u}});var y={name:"VueWordCloud",props:{words:{type:Array,default:n},text:{type:[String,Function],default:""},weight:{type:[Number,Function],default:1},rotation:{type:[Number,Function],default:function(){var t=[0,.75];return function(){return(e=t)[Math.floor(e.length*Math.random())];var e}}},fontFamily:{type:[String,Function],default:"serif"},fontStyle:{type:[String,Function],default:"normal"},fontVariant:{type:[String,Function],default:"normal"},fontWeight:{type:[String,Function],default:"normal"},color:{type:[String,Function],default:"Black"},fontSizeRatio:{type:Number,default:0},maxFontSize:{type:Number,default:1/0},animationDuration:{type:Number,default:5e3},intervalBetweenUpdateContainerSize:{type:Number,default:1e3}},data:function(){var t={containerWidth:0,containerHeight:0};return Object.keys(g).forEach(function(e){t["asyncComputed$trigger$"+e]={}}),t},computed:{keyedPopulatedWords:function(){return function(t,e,n,r,i,o,f,c,h){e=a(e),n=a(n),r=a(r),i=a(i),o=a(o),f=a(f),c=a(c),h=a(h);var s={};return t.forEach(function(t){var a,d,l,v,p,g,m,y;if(t)if("string"==typeof t)a=t;else if(Array.isArray(t)){var w;a=(w=t)[0],d=w[1]}else if(function(t){return t&&"object"==typeof t}(t)){var W;a=(W=t).text,d=W.weight,l=W.rotation,v=W.fontFamily,p=W.fontStyle,g=W.fontVariant,m=W.fontWeight,y=W.color}void 0===a&&(a=e(t)),void 0===d&&(d=n(t)),void 0===l&&(l=r(t)),void 0===v&&(v=i(t)),void 0===p&&(p=o(t)),void 0===g&&(g=f(t)),void 0===m&&(m=c(t)),void 0===y&&(y=h(t));for(var M=JSON.stringify([a,v,p,g,m]);u(s,M);)M+="!";s[M]={originalWord:t,key:M,text:a,weight:d,rotation:l,fontFamily:v,fontStyle:p,fontVariant:g,fontWeight:m,color:y}}),s}(this.words,this.text,this.weight,this.rotation,this.fontFamily,this.fontStyle,this.fontVariant,this.fontWeight,this.color)},populatedWords:function(){return Object.values(this.keyedPopulatedWords)},scaledBoundedWords:function(){return t=this.boundedWords,e=this.containerWidth,n=this.containerHeight,r=this.maxFontSize,i=c(t,function(t){return t.rectLeft}),o=h(t,function(t){return t.rectLeft+t.rectWidth}),a=o-i,u=c(t,function(t){return t.rectTop}),f=h(t,function(t){return t.rectTop+t.rectHeight}),s=f-u,d=Math.min(e/a,n/s),(l=h(t,function(t){return t.fontSize})*d)>r&&(d*=r/l),t.map(function(t){var e=t.fontSize,n=t.textWidth,r=t.textHeight,a=t.rectLeft,c=t.rectTop,h=t.rectWidth,s=t.rectHeight;return e*=d,n*=d,r*=d,a=(a-(i+o)/2)*d,c=(c-(u+f)/2)*d,h*=d,s*=d,Object.assign({},t,{fontSize:e,textWidth:n,textHeight:r,rectLeft:a,rectTop:c,rectWidth:h,rectHeight:s})});var t,e,n,r,i,o,a,u,f,s,d,l},transitionDuration:function(){var t=this.scaledBoundedWords.length,e=this.animationDuration;return t>0?e/Math.min(4,t):0},transitionDelay:function(){var t=this.scaledBoundedWords.length,e=this.animationDuration,n=this.transitionDuration;return t>1?(e-n)/(t-1):0}},beforeCreate:function(){var n=this;Object.entries(g).forEach(function(o){var a,u=o[0],f=o[1],c=f.get,h=f.default,s=f.errorHandler;void 0===s&&(s=e),n.$options.computed[u]=function(){return this["asyncComputed$promise$"+u],this["asyncComputed$trigger$"+u],h},n.$options.computed["asyncComputed$promise$"+u]=function(){var e=this;a?a.interrupt():t(h)&&(h=h.call(this));var n=a=new i;return r(function(){return c.call(e,n)}).then(function(t){if(e._isDestroyed)throw new Error;n.throwIfInterrupted(),h=t,e["asyncComputed$trigger$"+u]={}}).catch(s)}})},mounted:function(){this.startToUpdateContainerSize()},methods:{startToUpdateContainerSize:function(){var t=this;this._isDestroyed||(setTimeout(function(){requestAnimationFrame(function(){t.startToUpdateContainerSize()})},this.intervalBetweenUpdateContainerSize),this.updateContainerSize())},updateContainerSize:function(){var t=this.$el.getBoundingClientRect(),e=t.width,n=t.height;this.containerWidth=e,this.containerHeight=n}},render:function(t){return function(t,e,n,r,i){return t("div",{style:{position:"relative",width:"100%",height:"100%",overflow:"hidden"}},[t("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"}},n.map(function(n,o){var a=n.originalWord,u=n.key,f=n.text,c=n.weight,h=n.rotation,s=n.fontFamily,d=n.fontStyle,l=n.fontVariant,v=n.fontWeight,p=n.color,g=n.fontSize,m=(n.textWidth,n.textHeight,n.rectLeft),y=n.rectTop,w=n.rectWidth,W=n.rectHeight;return t("div",{key:u,style:{position:"absolute",top:y+W/2+"px",left:m+w/2+"px",transform:"rotate("+h+"turn)",color:p,transition:["all",r+"ms","ease-in-out",i*o+"ms"].join(" "),font:[d,l,v,g+"px/1",s].join(" ")}},[t("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",whiteSpace:"nowrap"}},[e.default({originalWord:a,text:f,weight:c,rotation:h,fontFamily:s,fontStyle:d,fontVariant:l,fontWeight:v,color:p,fontSize:g})])])}))])}(t,Object.assign({default:function(t){return t.text}},this.$scopedSlots),this.scaledBoundedWords,this.transitionDuration,this.transitionDelay)}};return"undefined"!=typeof window&&window.Vue&&window.Vue.component(y.name,y),y});
