(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"0/6H":function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var i=n("A36C"),s=n("iWo5"),r=n("qULd");const o=(t,e)=>{let n,o;const a=(t,i,s)=>{if("undefined"==typeof document)return;const r=document.elementFromPoint(t,i);r&&e(r)?r!==n&&(b(),c(r,s)):b()},c=(t,e)=>{n=t,o||(o=n);const s=n;Object(i.f)(()=>s.classList.add("ion-activated")),e()},b=(t=!1)=>{if(!n)return;const e=n;Object(i.f)(()=>e.classList.remove("ion-activated")),t&&o!==n&&n.click(),n=void 0};return Object(s.createGesture)({el:t,gestureName:"buttonActiveDrag",threshold:0,onStart:t=>a(t.currentX,t.currentY,r.a),onMove:t=>a(t.currentX,t.currentY,r.b),onEnd:()=>{b(!0),Object(r.e)(),o=void 0}})}},"74mu":function(t,e,n){"use strict";n.d(e,"a",(function(){return s})),n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"d",(function(){return a}));const i=(t,e)=>null!==e.closest(t),s=(t,e)=>"string"==typeof t&&t.length>0?Object.assign({"ion-color":!0,["ion-color-"+t]:!0},e):e,r=t=>{const e={};return(t=>void 0!==t?(Array.isArray(t)?t:t.split(" ")).filter(t=>null!=t).map(t=>t.trim()).filter(t=>""!==t):[])(t).forEach(t=>e[t]=!0),e},o=/^[a-z][a-z0-9+\-.]*:/,a=async(t,e,n,i)=>{if(null!=t&&"#"!==t[0]&&!o.test(t)){const s=document.querySelector("ion-router");if(s)return null!=e&&e.preventDefault(),s.push(t,n,i)}return!1}},ZGwD:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var i=n("mrSG"),s=n("fXoL"),r=n("ZETX"),o=n("TEn/");let a=(()=>{class t{constructor(t,e){this.authService=t,this.modalController=e,this.gesuchBool=!!this.gesuch}dismissClickPopover(){return Object(i.a)(this,void 0,void 0,(function*(){yield this.modalController.dismiss()}))}}return t.\u0275fac=function(e){return new(e||t)(s.Ib(r.a),s.Ib(o.F))},t.\u0275cmp=s.Cb({type:t,selectors:[["app-profil-popover"]],inputs:{gesuch:"gesuch",angebot:"angebot"},decls:44,vars:0,consts:[["src","../../../assets/icon/man.jpeg","alt","profilbild"],[1,"name"],[1,"stars"],["name","star"],["name","star-half-outline"],["name","star-outline"],["lines","full"],["name","mail-outline","slot","start"],["name","call-outline","slot","start"],[1,"ion-justify-content-center"],[1,"accept",3,"click"],[1,"abbrechen",3,"click"]],template:function(t,e){1&t&&(s.Nb(0,"ion-content"),s.Nb(1,"ion-card"),s.Nb(2,"ion-card-content"),s.Nb(3,"ion-grid"),s.Nb(4,"ion-row"),s.Nb(5,"ion-col"),s.Jb(6,"img",0),s.Mb(),s.Nb(7,"ion-col"),s.Nb(8,"p",1),s.hc(9,"Max Mustermann"),s.Mb(),s.Mb(),s.Nb(10,"ion-col",2),s.Jb(11,"ion-icon",3),s.Jb(12,"ion-icon",3),s.Jb(13,"ion-icon",3),s.Jb(14,"ion-icon",4),s.Jb(15,"ion-icon",5),s.Mb(),s.Mb(),s.Mb(),s.Nb(16,"ion-item",6),s.Nb(17,"p"),s.Jb(18,"ion-icon",7),s.hc(19," max@gmail.com "),s.Mb(),s.Mb(),s.Nb(20,"ion-item",6),s.Jb(21,"p"),s.Nb(22,"p"),s.Jb(23,"ion-icon",8),s.hc(24," 0123 456789 "),s.Mb(),s.Mb(),s.Jb(25,"br"),s.Jb(26,"br"),s.Nb(27,"ion-item",6),s.Nb(28,"p"),s.hc(29,"Mercedes Vito"),s.Mb(),s.Mb(),s.Nb(30,"ion-item",6),s.Nb(31,"p"),s.hc(32,"Fahrzeugart: Transporter"),s.Mb(),s.Mb(),s.Nb(33,"ion-item",6),s.Nb(34,"p"),s.hc(35,"3m x 4m x 200x"),s.Mb(),s.Mb(),s.Nb(36,"ion-row",9),s.Nb(37,"ion-list"),s.Nb(38,"button",10),s.Vb("click",(function(){return e.dismissClickPopover()})),s.hc(39,"Anfrage annehmen"),s.Mb(),s.Mb(),s.Mb(),s.Nb(40,"ion-row",9),s.Nb(41,"ion-list"),s.Nb(42,"button",11),s.Vb("click",(function(){return e.dismissClickPopover()})),s.hc(43,"Abbrechen"),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb(),s.Mb())},directives:[o.m,o.h,o.i,o.o,o.y,o.l,o.q,o.t,o.v],styles:["@media only screen and (min-width:768px){.abbrechen[_ngcontent-%COMP%]{visibility:hidden}}.abbrechen[_ngcontent-%COMP%]{width:200px;height:50px;border-radius:10px;font-size:20px;color:#fff;background-color:red}ion-card[_ngcontent-%COMP%]{border-radius:30px;background-color:#fff}img[_ngcontent-%COMP%]{border-radius:50%;width:75px;height:75px}.accept[_ngcontent-%COMP%]{width:200px;height:50px;border-radius:10px;color:#fff;background-color:#1d5a52}.accept[_ngcontent-%COMP%], p[_ngcontent-%COMP%]{font-size:20px}p[_ngcontent-%COMP%]{color:#1d5a52}ion-item[_ngcontent-%COMP%]{--border-color:#1d5a52}.name[_ngcontent-%COMP%]{font-size:20px;font-weight:700}.stars[_ngcontent-%COMP%]{text-align:right;font-size:18px}"]}),t})(),c=(()=>{class t{constructor(t){this.modalController=t}presentPopoverProfile(){return Object(i.a)(this,void 0,void 0,(function*(){const t=yield this.modalController.create({component:a,cssClass:"profil-popover.component.scss"});return yield t.present()}))}emailIsValid(t){return/\S+@\S+\.\S+/.test(t)}}return t.\u0275fac=function(e){return new(e||t)(s.Rb(o.F))},t.\u0275prov=s.Eb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},ZaV5:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return s}));const i=async(t,e,n,i,s)=>{if(t)return t.attachViewToDom(e,n,s,i);if("string"!=typeof n&&!(n instanceof HTMLElement))throw new Error("framework delegate is missing");const r="string"==typeof n?e.ownerDocument&&e.ownerDocument.createElement(n):n;return i&&i.forEach(t=>r.classList.add(t)),s&&Object.assign(r,s),e.appendChild(r),r.componentOnReady&&await r.componentOnReady(),r},s=(t,e)=>{if(e){if(t)return t.removeViewFromDom(e.parentElement,e);e.remove()}return Promise.resolve()}},h0n1:function(t,e,n){"use strict";n.d(e,"a",(function(){return d}));class i{}class s extends i{constructor(){super(...arguments),this.fahrer=[],this.interessenten=[]}getInteressenten(){const t=[];return this.interessenten.forEach(e=>{t.push(JSON.parse(e))}),t}addInteressent(t){return this.interessenten.push(JSON.stringify(t)),this}deleteInteressent(t){return this.interessenten=this.interessenten.filter(e=>JSON.parse(e).userId!==t.userId&&JSON.parse(e).objectId!==t.fahrerId),this}getFahrer(){const t=[];return this.fahrer.forEach(e=>{t.push(JSON.parse(e))}),t}addFahrer(t){return this.fahrer.push(JSON.stringify(t)),this}deleteFahrer(t){return this.fahrer=this.fahrer.filter(e=>JSON.parse(e).userId!==t.userId&&JSON.parse(e).objectId!==t.fahrerId),this}}class r extends i{constructor(){super(...arguments),this.kunden=[],this.interessenten=[]}getInteressenten(){const t=[];return this.interessenten.forEach(e=>{t.push(JSON.parse(e))}),t}addInteressent(t){return this.interessenten.push(JSON.stringify(t)),this}deleteInteressent(t){return this.interessenten=this.interessenten.filter(e=>JSON.parse(e).userId!==t.userId&&JSON.parse(e).objectId!==t.objectId),this}getKunden(){const t=[];return this.kunden.forEach(e=>{t.push(JSON.parse(e))}),t}addKunde(t){return this.kunden.push(JSON.stringify(t)),this}deleteKunde(t){return this.kunden=this.kunden.filter(e=>JSON.parse(e).userId!==t.userId&&JSON.parse(e).objectId!==t.objectId),this}}var o=n("fXoL"),a=n("ofXK"),c=n("TEn/");function b(t,e){1&t&&(o.Nb(0,"ion-item",5),o.Nb(1,"ion-label",2),o.hc(2," Fahrzeug: "),o.Mb(),o.Nb(3,"ion-label"),o.hc(4," Mercedes Vito "),o.Mb(),o.Mb())}function h(t,e){1&t&&(o.Nb(0,"ion-item",5),o.Nb(1,"ion-label",2),o.hc(2," Gegenstand: "),o.Mb(),o.Nb(3,"ion-label"),o.hc(4," GegebstandID "),o.Mb(),o.Mb())}function l(t,e){if(1&t){const t=o.Ob();o.Nb(0,"div"),o.Nb(1,"ion-card"),o.Nb(2,"ion-item",1),o.Nb(3,"h3",2),o.hc(4),o.Mb(),o.Nb(5,"ion-badge",3),o.hc(6),o.Mb(),o.Mb(),o.Nb(7,"ion-item",1),o.Nb(8,"h4",2),o.hc(9),o.Mb(),o.Jb(10,"ion-icon",4),o.Nb(11,"h4",3),o.hc(12),o.Mb(),o.Mb(),o.Nb(13,"ion-item",5),o.Nb(14,"p",2),o.hc(15,"Ankunft:"),o.Mb(),o.Nb(16,"p",3),o.hc(17),o.Mb(),o.Mb(),o.Nb(18,"ion-icon",6),o.Vb("click",(function(){o.dc(t);const e=o.Xb();return e.dropdown=!e.dropdown})),o.Mb(),o.Mb(),o.Nb(19,"ion-card",7),o.gc(20,b,5,0,"ion-item",8),o.gc(21,h,5,0,"ion-item",8),o.Nb(22,"ion-item",5),o.Nb(23,"ion-label",2),o.hc(24," Start Adresse: "),o.Mb(),o.Nb(25,"ion-label"),o.hc(26),o.Jb(27,"br"),o.hc(28),o.Mb(),o.Mb(),o.Nb(29,"ion-item",5),o.Nb(30,"ion-label",2),o.hc(31," Ziel Adresse: "),o.Mb(),o.Nb(32,"ion-label"),o.hc(33),o.Jb(34,"br"),o.hc(35),o.Mb(),o.Mb(),o.Nb(36,"ion-item",5),o.Nb(37,"ion-label",2),o.hc(38," Ersteller: "),o.Mb(),o.Nb(39,"ion-avatar",9),o.Jb(40,"img",10),o.Mb(),o.Nb(41,"ion-label"),o.hc(42),o.Mb(),o.Mb(),o.Nb(43,"ion-item",5),o.Nb(44,"ion-label",2),o.hc(45," Telefon: "),o.Mb(),o.Nb(46,"ion-label"),o.hc(47," 0123 456789 "),o.Mb(),o.Mb(),o.Nb(48,"ion-item",5),o.Nb(49,"ion-label",2),o.hc(50," Bezahlung: "),o.Mb(),o.Nb(51,"ion-label"),o.hc(52),o.Mb(),o.Mb(),o.Nb(53,"div",11),o.Nb(54,"ion-button"),o.hc(55,"Anfragen"),o.Mb(),o.Mb(),o.Mb(),o.Mb()}if(2&t){const t=o.Xb();o.yb(1),o.Ab("border-card-orange","angebot"==t.page)("border-card-green","gesuch"==t.page),o.yb(3),o.ic(t.titel),o.yb(2),o.ic(t.interessenten),o.yb(3),o.ic(t.abfahrtOrt),o.yb(3),o.ic(t.ankunftOrt),o.yb(5),o.kc("",t.ankunftDatum,", ",t.ankunftZeit,""),o.yb(1),o.Ab("spin",t.dropdown),o.yb(1),o.Ab("card-dropdown-disabled",!t.dropdown),o.yb(1),o.ac("ngIf",t.angebot),o.yb(1),o.ac("ngIf",t.gesuch),o.yb(5),o.jc(" ",t.abfahrtStrasse,","),o.yb(2),o.kc(" ",t.abfahrtPlz," ",t.abfahrtOrt," "),o.yb(5),o.jc(" ",t.ankunftStrasse,","),o.yb(2),o.kc(" ",t.ankunftPlz," ",t.ankunftOrt," "),o.yb(7),o.jc(" ",t.erstellerName," "),o.yb(10),o.jc(" ",t.bezahlung," ")}}function u(t,e){if(1&t&&(o.Nb(0,"div"),o.Nb(1,"ion-card",12),o.Nb(2,"ion-item",1),o.Jb(3,"ion-skeleton-text",13),o.Jb(4,"ion-skeleton-text",14),o.Mb(),o.Nb(5,"ion-item",1),o.Jb(6,"ion-skeleton-text",15),o.Jb(7,"ion-icon",4),o.Jb(8,"ion-skeleton-text",15),o.Mb(),o.Nb(9,"ion-item",5),o.Jb(10,"ion-skeleton-text",13),o.Jb(11,"ion-skeleton-text",14),o.Jb(12,"ion-skeleton-text",16),o.Mb(),o.Jb(13,"ion-icon",17),o.Mb(),o.Mb()),2&t){const t=o.Xb();o.yb(1),o.Ab("border-card-orange","angebot"==t.page)("border-card-green","gesuch"==t.page)}}let d=(()=>{class t{constructor(){this.inputAngebot=new r,this.angebot=new r,this.inputGesuch=new s,this.gesuch=new s,this.page="none",this.dropdown=!1,this.interessenten="laden..."}ngOnInit(){if("angebot"===this.page&&this.inputAngebot){Object.assign(this.angebot,this.inputAngebot);const t=this.angebot.getInteressenten()||[];this.setInteressenten(t.length),this.titel=this.angebot.fahrzeugId,this.interessentenAngebot=this.angebot.getInteressenten(),this.abfahrtOrt=this.angebot.abfahrtOrt,this.abfahrtStrasse=this.angebot.abfahrtStrasse,this.abfahrtPlz=this.angebot.abfahrtPlz,this.ankunftStrasse=this.angebot.ankunftStrasse,this.ankunftOrt=this.angebot.ankunftOrt,this.ankunftPlz=this.angebot.ankunftPlz,this.ankunftDatum=this.angebot.ankunftDatum,this.ankunftZeit=this.angebot.ankunftZeit,this.bezahlung=this.angebot.bezahlung,this.erstellerName=this.angebot.erstellerId,this.erstellerProfilbild=""}else if("gesuch"===this.page&&this.inputGesuch){Object.assign(this.gesuch,this.inputGesuch);const t=this.gesuch.getInteressenten()||[];this.setInteressenten(t.length),this.titel=this.gesuch.lieferobjektId,this.interessentenGesuch=this.gesuch.getInteressenten(),this.abfahrtOrt=this.gesuch.abfahrtOrt,this.abfahrtStrasse=this.gesuch.abfahrtStrasse,this.abfahrtPlz=this.gesuch.abfahrtPlz,this.ankunftStrasse=this.gesuch.ankunftStrasse,this.ankunftOrt=this.gesuch.ankunftOrt,this.ankunftPlz=this.gesuch.ankunftPlz,this.ankunftDatum=this.gesuch.ankunftDatum,this.ankunftZeit=this.gesuch.ankunftZeit,this.bezahlung=this.gesuch.bezahlung,this.erstellerName=this.gesuch.erstellerId,this.erstellerProfilbild=""}}setInteressenten(t){this.interessenten=0===t?"Keine Interessenten":1===t?"1 Interessent":t+" Interessenten"}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Cb({type:t,selectors:[["app-anfrage-card"]],inputs:{inputAngebot:"inputAngebot",inputGesuch:"inputGesuch",page:"page"},decls:2,vars:2,consts:[[4,"ngIf"],["lines","none"],["slot","start"],["slot","end"],["name","arrow-forward",1,"center"],["lines","full"],["size","large","name","chevron-down-outline",1,"center","transition","pointer",3,"click"],[1,"card-dropdown"],["lines","full",4,"ngIf"],[1,"ion-margin"],["src","https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"],[1,"ion-text-center","ion-margin"],[1,"ion-padding","custom-skeleton"],["slot","start","animated","",2,"width","30%"],["slot","end","animated","",2,"width","10%"],["slot","","animated","",2,"width","25%"],["slot","end","animated","",2,"width","20%"],["size","large","name","chevron-down-outline",1,"center"]],template:function(t,e){1&t&&(o.gc(0,l,56,24,"div",0),o.gc(1,u,14,4,"div",0)),2&t&&(o.ac("ngIf",e.inputGesuch&&e.inputAngebot),o.yb(1),o.ac("ngIf",!(e.inputAngebot&&e.inputGesuch)))},directives:[a.i,c.h,c.t,c.e,c.q,c.u,c.b,c.f,c.z],styles:[".border-card-green[_ngcontent-%COMP%]{border:2px solid green}.border-card-orange[_ngcontent-%COMP%]{border:2px solid orange}.center[_ngcontent-%COMP%]{width:100%;text-align:center}.card-dropdown[_ngcontent-%COMP%]{opacity:1;display:block;overflow:hidden;position:relative;z-index:-1;top:-15px;max-height:500px}.card-dropdown[_ngcontent-%COMP%], .card-dropdown-disabled[_ngcontent-%COMP%]{transition:opacity 1s ease-out,max-height 1s,top 1s}.card-dropdown-disabled[_ngcontent-%COMP%]{top:-200px;opacity:0;max-height:0}.spin[_ngcontent-%COMP%]{transform:rotate(180deg)}.spin[_ngcontent-%COMP%], .transition[_ngcontent-%COMP%]{transition:1s}.pointer[_ngcontent-%COMP%]{cursor:pointer}"]}),t})()},h3R7:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));const i={bubbles:{dur:1e3,circles:9,fn:(t,e,n)=>{const i=t*e/n-t+"ms",s=2*Math.PI*e/n;return{r:5,style:{top:9*Math.sin(s)+"px",left:9*Math.cos(s)+"px","animation-delay":i}}}},circles:{dur:1e3,circles:8,fn:(t,e,n)=>{const i=e/n,s=t*i-t+"ms",r=2*Math.PI*i;return{r:5,style:{top:9*Math.sin(r)+"px",left:9*Math.cos(r)+"px","animation-delay":s}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(t,e)=>({r:6,style:{left:9-9*e+"px","animation-delay":-110*e+"ms"}})},lines:{dur:1e3,lines:12,fn:(t,e,n)=>({y1:17,y2:29,style:{transform:`rotate(${30*e+(e<6?180:-180)}deg)`,"animation-delay":t*e/n-t+"ms"}})},"lines-small":{dur:1e3,lines:12,fn:(t,e,n)=>({y1:12,y2:20,style:{transform:`rotate(${30*e+(e<6?180:-180)}deg)`,"animation-delay":t*e/n-t+"ms"}})}}},iWjc:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var i=n("ofXK"),s=n("TEn/"),r=n("tyNb"),o=n("fXoL");let a=(()=>{class t{}return t.\u0275mod=o.Gb({type:t}),t.\u0275inj=o.Fb({factory:function(e){return new(e||t)},imports:[[i.b,s.C,r.j]]}),t})()},qULd:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return s})),n.d(e,"d",(function(){return c})),n.d(e,"e",(function(){return a}));const i={getEngine(){const t=window;return t.TapticEngine||t.Capacitor&&t.Capacitor.isPluginAvailable("Haptics")&&t.Capacitor.Plugins.Haptics},available(){return!!this.getEngine()},isCordova:()=>!!window.TapticEngine,isCapacitor:()=>!!window.Capacitor,impact(t){const e=this.getEngine();if(!e)return;const n=this.isCapacitor()?t.style.toUpperCase():t.style;e.impact({style:n})},notification(t){const e=this.getEngine();if(!e)return;const n=this.isCapacitor()?t.style.toUpperCase():t.style;e.notification({style:n})},selection(){this.impact({style:"light"})},selectionStart(){const t=this.getEngine();t&&(this.isCapacitor()?t.selectionStart():t.gestureSelectionStart())},selectionChanged(){const t=this.getEngine();t&&(this.isCapacitor()?t.selectionChanged():t.gestureSelectionChanged())},selectionEnd(){const t=this.getEngine();t&&(this.isCapacitor()?t.selectionEnd():t.gestureSelectionEnd())}},s=()=>{i.selection()},r=()=>{i.selectionStart()},o=()=>{i.selectionChanged()},a=()=>{i.selectionEnd()},c=t=>{i.impact(t)}}}]);