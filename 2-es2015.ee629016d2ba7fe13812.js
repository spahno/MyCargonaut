(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"88mt":function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n("mrSG"),i=n("lJxs"),o=n("Dxl3"),s=n("fXoL"),a=n("I/3d");let c=(()=>{class e{constructor(e){this.afs=e,this.fahrtCollection=this.afs.collection("fahrt")}static copyAndPrepare(e){const t=Object.assign({},e);return delete t._ID,t}findFahrtById(e){return this.fahrtCollection.doc(e).snapshotChanges().pipe(Object(i.a)(t=>{const n=t.payload.data();return n&&(n._ID=e),Object.assign({},n)}))}startFahrt(){return new Promise((t,n)=>{this.fahrtCollection.add(e.copyAndPrepare(new o.a)).then(e=>{const n=new o.a;n._ID=e.id,t({fahrt:n,message:"Document written with ID: "+e.id})}).catch(e=>{n("Error adding document: "+e)})})}updateFahrt(t){return new Promise((n,i)=>{const o=t._ID;this.fahrtCollection.doc(o).update(e.copyAndPrepare(t)).then(()=>Object(r.a)(this,void 0,void 0,(function*(){t._ID=o,n({fahrt:t,message:"Successfully edited Document with ID: "+o})}))).catch(e=>{i("Error editing document: "+e)})})}endFahrt(e){return new Promise((t,n)=>{const r=this.findFahrtById(e).subscribe(e=>{r.unsubscribe(),e.beendet=!0,this.updateFahrt(e).then(e=>{t(e.fahrt)}).catch(e=>n(e))})})}fahrtBewerten(e,t){return new Promise((n,r)=>{if(t>5)r("Bewertung must be between 0 and 5.");else{const i=this.findFahrtById(e).subscribe(e=>{i.unsubscribe(),0===e.anzahlBewertungen?(e.bewertung=t,e.anzahlBewertungen++):(e.bewertung=(e.bewertung*e.anzahlBewertungen+t)/(e.anzahlBewertungen+1),e.anzahlBewertungen++),this.updateFahrt(e).then(e=>{n(e.fahrt)}).catch(e=>r(e))})}})}deleteFahrt(e){return new Promise((t,n)=>{this.fahrtCollection.doc(e).delete().then(()=>Object(r.a)(this,void 0,void 0,(function*(){t("Successfully deleted Document with ID: "+e)}))).catch(e=>{n("Error deleting document: "+e)})})}}return e.\u0275fac=function(t){return new(t||e)(s.Rb(a.a))},e.\u0275prov=s.Eb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},AS9q:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n("mrSG"),i=n("lJxs"),o=n("fXoL"),s=n("I/3d");let a=(()=>{class e{constructor(e){this.afs=e,this.fahrzeugCollection=this.afs.collection("fahrzeug"),this.userCollection=this.afs.collection("users")}static copyAndPrepare(e){const t=Object.assign({},e);return delete t.id,t}findFahrzeugById(e){return this.fahrzeugCollection.doc(e).snapshotChanges().pipe(Object(i.a)(t=>{const n=t.payload.data();return n&&(n.id=e),Object.assign({},n)}))}addFahrzeug(t){return new Promise((n,r)=>{this.fahrzeugCollection.add(e.copyAndPrepare(t)).then(e=>{const r=t;r.id=e.id,n({fahrzeug:r,message:"Document written with ID: "+e.id})}).catch(e=>{r("Error adding document: "+e)})})}deleteFahrzeug(e){return new Promise((t,n)=>{this.fahrzeugCollection.doc(e).delete().then(()=>Object(r.a)(this,void 0,void 0,(function*(){t("Successfully deleted Document with ID: "+e)}))).catch(e=>{n("Error deleting document: "+e)})})}}return e.\u0275fac=function(t){return new(t||e)(o.Rb(s.a))},e.\u0275prov=o.Eb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},Dxl3:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));class r{constructor(){this.anzahlBewertungen=0,this.beendet=!1}}},QIET:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));class r{}},VOOW:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n("mrSG"),i=n("lJxs"),o=n("fXoL"),s=n("I/3d"),a=n("tyNb");let c=(()=>{class e{constructor(e,t){this.afs=e,this.router=t,this.startort="",this.zielort="",this.endDate="",this.angebotCollection=e.collection("angebote")}static copyAndPrepare(e){const t=Object.assign({},e);return delete t._ID,t.erstellerId=t.erstellerId||null,t.ankunftDatum=t.ankunftDatum||null,t.ankunftZeit=t.ankunftZeit||null,t.abfahrtStrasse=t.abfahrtStrasse||null,t.abfahrtOrt=t.abfahrtOrt||null,t.abfahrtPlz=t.abfahrtPlz||null,t.ankunftStrasse=t.ankunftStrasse||null,t.ankunftOrt=t.ankunftOrt||null,t.ankunftPlz=t.ankunftPlz||null,t.bezahlung=t.bezahlung||null,t.fahrtId=t.fahrtId||null,t.kunden=t.kunden||[],t.interessenten=t.interessenten||[],t.fahrzeugId=t.fahrzeugId||null,t}observableAngebote(){return this.angebotCollection.snapshotChanges().pipe(Object(i.a)(e=>e.map(e=>{const t=e.payload.doc.data();return t._ID=e.payload.doc.id,t})))}findAngebotById(e){return new Promise((t,n)=>{this.angebotCollection.doc(e).get().toPromise().then(n=>{const r=n.data();r._ID=e,t(r)}).catch(e=>n(e))})}addAngebot(t){return new Promise((n,r)=>{this.angebotCollection.add(e.copyAndPrepare(t)).then(e=>{const r=t;r._ID=e.id,n({angebot:r,message:"Document written with ID: "+e.id})}).catch(e=>{r("Error adding document: "+e)})})}deleteAngebot(e){return new Promise((t,n)=>{this.angebotCollection.doc(e).delete().then(()=>Object(r.a)(this,void 0,void 0,(function*(){t(e)}))).catch(e=>{n("Error deleting document: "+e)})})}updateAngebot(t){return new Promise((n,i)=>{const o=t._ID;this.angebotCollection.doc(t._ID).update(e.copyAndPrepare(t)).then(()=>Object(r.a)(this,void 0,void 0,(function*(){t._ID=o,n({angebot:t,message:"Successfully edited Document with ID: "+t._ID})}))).catch(e=>{i("Error editing document: "+e)})})}startSearch(e,t,n){this.startort=e,this.zielort=t,this.endDate=n,this.router.navigate(["/angebot"])}}return e.\u0275fac=function(t){return new(t||e)(o.Rb(s.a),o.Rb(a.g))},e.\u0275prov=o.Eb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},ZM51:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return o}));var r=n("QIET");class i extends r.a{constructor(){super(...arguments),this.kunden=[],this.interessenten=[]}getInteressenten(){const e=[];return this.interessenten.forEach(t=>{e.push(JSON.parse(t))}),e}addInteressent(e){return this.interessenten.push(JSON.stringify(e)),this}deleteInteressent(e){return this.interessenten=this.interessenten.filter(t=>JSON.parse(t).userId!==e.userId&&JSON.parse(t).objectId!==e.objectId),this}isInteressent(e){let t=!1;const n=this.getInteressenten();for(let r=0;r<n.length;r++)if(t=n[r].userId===e,r+1===n.length)return t}getKunden(){const e=[];return this.kunden.forEach(t=>{e.push(JSON.parse(t))}),e}addKunde(e){return this.kunden.push(JSON.stringify(e)),this}deleteKunde(e){return this.kunden=this.kunden.filter(t=>JSON.parse(t).userId!==e.userId&&JSON.parse(t).objectId!==e.objectId),this}isKunde(e){let t=!1;const n=this.getKunden();for(let r=0;r<n.length;r++)if(t=n[r].userId===e,n[r].userId===e&&r+1===n.length)return t}addFahrzeug(e){this.fahrzeugId=e.id}deleteFahrzeug(){this.fahrzeugId=null}}class o{}},euJG:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var r=n("mrSG"),i=n("Oj1a"),o=n("fXoL"),s=n("ZETX"),a=n("TEn/"),c=n("ofXK");function b(e,t){if(1&e&&(o.Lb(0),o.Nb(1,"ion-item",6),o.Nb(2,"p"),o.kc(3),o.Mb(),o.Mb(),o.Nb(4,"ion-item",6),o.Nb(5,"p"),o.kc(6),o.Mb(),o.Mb(),o.Nb(7,"ion-item",6),o.Nb(8,"p"),o.kc(9),o.Mb(),o.Mb(),o.Kb()),2&e){const e=o.Xb();o.yb(3),o.nc("",e.fahrzeug.marke||"Keine Marke hinterlegt!"," ",e.fahrzeug.modell||"Kein Modell hinterlegt!",""),o.yb(3),o.mc("Fahrzeugart: ",e.fahrzeug.fahrzeugart||"Keine Fahrzeugart hinterlegt!",""),o.yb(3),o.oc("",e.fahrzeug.hoehe||"Keine H\xf6he hinterlegt!","m x ",e.fahrzeug.breite||"Keine breite hinterlegt!","m x ",e.fahrzeug.tiefe||"Keine tiefe hinterlegt!","m")}}function l(e,t){if(1&e&&(o.Lb(0),o.Nb(1,"ion-item",6),o.Nb(2,"p"),o.kc(3),o.Mb(),o.Mb(),o.Nb(4,"ion-item",6),o.Nb(5,"p"),o.kc(6),o.Mb(),o.Mb(),o.Nb(7,"ion-item",6),o.Nb(8,"p"),o.kc(9),o.Mb(),o.Mb(),o.Kb()),2&e){const e=o.Xb();o.yb(3),o.lc(e.lieferobjekt.name||"Kein Name hinterlegt!"),o.yb(3),o.mc("Preis: ",e.lieferobjekt.preis||"Kein Preis hinterlegt!",""),o.yb(3),o.lc(e.lieferobjekt.beschreibung||"Keine Beschreibung hinterlegt!")}}let d=(()=>{class e{constructor(e,t){this.authService=e,this.modalController=t,this.interessent=new i.a("","","","")}dismissClickPopover(){return Object(r.a)(this,void 0,void 0,(function*(){yield this.modalController.dismiss()}))}}return e.\u0275fac=function(t){return new(t||e)(o.Ib(s.a),o.Ib(a.M))},e.\u0275cmp=o.Cb({type:e,selectors:[["app-profil-popover"]],inputs:{interessent:"interessent",lieferobjekt:"lieferobjekt",fahrzeug:"fahrzeug"},decls:33,vars:6,consts:[["src","https://firebasestorage.googleapis.com/v0/b/mycargonaut-8ae2c.appspot.com/o/man.jpeg?alt=media&token=f73fcaba-cdb1-4a80-ac95-3c6defe453bf","alt","profilbild"],[1,"name"],[1,"stars"],["name","star"],["name","star-half-outline"],["name","star-outline"],["lines","full"],["name","mail-outline","slot","start"],["name","call-outline","slot","start"],[4,"ngIf"],[1,"ion-justify-content-center"],[1,"accept",3,"click"]],template:function(e,t){1&e&&(o.Nb(0,"ion-content"),o.Nb(1,"ion-card"),o.Nb(2,"ion-card-content"),o.Nb(3,"ion-grid"),o.Nb(4,"ion-row"),o.Nb(5,"ion-col"),o.Jb(6,"img",0),o.Mb(),o.Nb(7,"ion-col"),o.Nb(8,"p",1),o.kc(9),o.Mb(),o.Mb(),o.Nb(10,"ion-col",2),o.Jb(11,"ion-icon",3),o.Jb(12,"ion-icon",3),o.Jb(13,"ion-icon",3),o.Jb(14,"ion-icon",4),o.Jb(15,"ion-icon",5),o.Mb(),o.Mb(),o.Mb(),o.Nb(16,"ion-item",6),o.Nb(17,"p"),o.Jb(18,"ion-icon",7),o.kc(19),o.Mb(),o.Mb(),o.Nb(20,"ion-item",6),o.Jb(21,"p"),o.Nb(22,"p"),o.Jb(23,"ion-icon",8),o.kc(24),o.Mb(),o.Mb(),o.Jb(25,"br"),o.Jb(26,"br"),o.ic(27,b,10,6,"ng-container",9),o.ic(28,l,10,3,"ng-container",9),o.Nb(29,"ion-row",10),o.Nb(30,"ion-list"),o.Nb(31,"button",11),o.Vb("click",(function(){return t.dismissClickPopover()})),o.kc(32,"Schlie\xdfen"),o.Mb(),o.Mb(),o.Mb(),o.Mb(),o.Mb(),o.Mb()),2&e&&(o.yb(9),o.nc("",t.interessent.vorname||"Kein Vorname hinterlegt!"," ",t.interessent.nachname||"Kein Nachname hinterlegt!",""),o.yb(10),o.mc(" ",t.interessent.email||"Keine Email hinterlegt!"," "),o.yb(5),o.mc(" ",t.interessent.telefon||"Keine Telefonnummer hinterlegt!"," "),o.yb(3),o.ac("ngIf",t.fahrzeug),o.yb(1),o.ac("ngIf",t.lieferobjekt))},directives:[a.n,a.i,a.j,a.q,a.B,a.m,a.s,a.v,c.i,a.x],styles:["@media only screen and (min-width:768px){.abbrechen[_ngcontent-%COMP%]{visibility:hidden}}.abbrechen[_ngcontent-%COMP%]{width:200px;height:50px;border-radius:10px;font-size:20px;color:#fff;background-color:red}ion-card[_ngcontent-%COMP%]{border-radius:30px;background-color:#fff}img[_ngcontent-%COMP%]{border-radius:50%;width:75px;height:75px}.accept[_ngcontent-%COMP%]{width:200px;height:50px;border-radius:10px;color:#fff;background-color:#1d5a52}.accept[_ngcontent-%COMP%], p[_ngcontent-%COMP%]{font-size:20px}p[_ngcontent-%COMP%]{color:#1d5a52}ion-item[_ngcontent-%COMP%]{--border-color:#1d5a52}.name[_ngcontent-%COMP%]{font-size:20px;font-weight:700}.stars[_ngcontent-%COMP%]{text-align:right;font-size:18px}"]}),e})()},hrlM:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n("fXoL"),i=n("QAk6"),o=n("TEn/");let s=(()=>{class e{constructor(e){this.changePage=e}}return e.\u0275fac=function(t){return new(t||e)(r.Ib(i.a))},e.\u0275cmp=r.Cb({type:e,selectors:[["app-navbar"]],decls:9,vars:0,consts:[[1,"ion-justify-content-around",2,"max-width","600px","margin","auto"],["color","none",3,"click"],["slot","icon-only","name","search-outline"],["slot","icon-only","name","list"],["slot","icon-only","name","person"]],template:function(e,t){1&e&&(r.Nb(0,"ion-footer"),r.Nb(1,"ion-toolbar"),r.Nb(2,"ion-row",0),r.Nb(3,"ion-button",1),r.Vb("click",(function(){return t.changePage.route("suchen")})),r.Jb(4,"ion-icon",2),r.Mb(),r.Nb(5,"ion-button",1),r.Vb("click",(function(){return t.changePage.route("auftraege")})),r.Jb(6,"ion-icon",3),r.Mb(),r.Nb(7,"ion-button",1),r.Vb("click",(function(){return t.changePage.route("profile")})),r.Jb(8,"ion-icon",4),r.Mb(),r.Mb(),r.Mb(),r.Mb())},directives:[o.p,o.I,o.B,o.g,o.s],styles:["ion-toolbar[_ngcontent-%COMP%]{--background:#fff}ion-button[_ngcontent-%COMP%]{background-color:transparent;--box-shadow:none;opacity:.6;--color:#005b52}.active[_ngcontent-%COMP%]{opacity:1}"]}),e})()},vObQ:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n("mrSG"),i=n("lJxs"),o=n("fXoL"),s=n("I/3d");let a=(()=>{class e{constructor(e){this.afs=e,this.objektCollection=this.afs.collection("lieferObjekt")}static copyAndPrepare(e){const t=Object.assign({},e);return delete t._ID,t}findLieferobjektById(e){return this.objektCollection.doc(e).snapshotChanges().pipe(Object(i.a)(t=>{const n=t.payload.data();return n&&(n._ID=e),Object.assign({},n)}))}addLieferobjekt(t){return new Promise((n,r)=>{this.objektCollection.add(e.copyAndPrepare(t)).then(e=>{const r=t;r._ID=e.id,n({lieferobjekt:r,message:"Document written with ID: "+e.id})}).catch(e=>{r("Error adding document: "+e)})})}deleteLieferobjekt(e){return new Promise((t,n)=>{this.objektCollection.doc(e).delete().then(()=>Object(r.a)(this,void 0,void 0,(function*(){t("Successfully deleted Document with ID: "+e)}))).catch(e=>{n("Error deleting document: "+e)})})}}return e.\u0275fac=function(t){return new(t||e)(o.Rb(s.a))},e.\u0275prov=o.Eb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},zSeZ:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));class r{}},zwr5:function(e,t,n){"use strict";n.d(t,"a",(function(){return K}));var r=n("mrSG"),i=n("ZM51"),o=n("Oj1a"),s=n("Dxl3"),a=n("zSeZ"),c=n("euJG"),b=n("fXoL"),l=n("ZETX"),d=n("VOOW"),h=n("88mt"),u=n("vObQ"),g=n("TEn/"),f=n("AS9q"),p=n("ofXK");function m(e,t){if(1&e){const e=b.Ob();b.Nb(0,"ion-button",13),b.Vb("click",(function(){return b.fc(e),b.Xb(2).deleteAngebotAlert()})),b.Jb(1,"ion-icon",14),b.Mb()}}function I(e,t){if(1&e&&(b.Nb(0,"ion-item",8),b.Nb(1,"ion-label",3),b.kc(2," Fahrzeug: "),b.Mb(),b.Nb(3,"ion-label"),b.kc(4),b.Mb(),b.Mb()),2&e){const e=b.Xb(2);b.yb(4),b.nc(" ",e.fahrzeug.marke||"Fahrzeug nicht hinterlegt"," ",e.fahrzeug.modell||""," ")}}function k(e,t){if(1&e&&(b.Lb(0),b.Nb(1,"ion-item",8),b.Nb(2,"ion-label",3),b.kc(3," Ersteller: "),b.Mb(),b.Nb(4,"ion-avatar",15),b.Jb(5,"img",16),b.Mb(),b.Nb(6,"ion-label"),b.kc(7),b.Mb(),b.Mb(),b.Nb(8,"ion-item",8),b.Nb(9,"ion-label",3),b.kc(10," Telefon: "),b.Mb(),b.Nb(11,"ion-label"),b.kc(12),b.Mb(),b.Mb(),b.Kb()),2&e){const e=b.Xb(2);b.yb(5),b.bc("src",e.ersteller.profileImage||"https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",b.gc),b.yb(2),b.nc(" ",e.ersteller.vorname||"Ladefehler"," ",e.ersteller.nachname||"Ladefehler"," "),b.yb(5),b.mc(" ",e.ersteller.telefon||"Ladefehler"," ")}}function y(e,t){1&e&&(b.Nb(0,"ion-item",8),b.Nb(1,"ion-label",3),b.kc(2," Ersteller: "),b.Mb(),b.Nb(3,"ion-label"),b.Nb(4,"em"),b.kc(5,"Fehler bei dem Darstellen des Erstellers!"),b.Mb(),b.Mb(),b.Mb())}function M(e,t){1&e&&(b.Nb(0,"ion-label"),b.Nb(1,"em"),b.kc(2,"Es gibt noch keine Interessenten."),b.Mb(),b.Mb())}function v(e,t){if(1&e){const e=b.Ob();b.Nb(0,"ion-item",18),b.Nb(1,"ion-avatar",3),b.Jb(2,"img",16),b.Mb(),b.Nb(3,"ion-label"),b.kc(4),b.Mb(),b.Nb(5,"ion-icon",19),b.Vb("click",(function(){b.fc(e);const n=t.$implicit;return b.Xb(3).infoPopoverInteressent(n.interessent)})),b.Mb(),b.Nb(6,"ion-icon",20),b.Vb("click",(function(){b.fc(e);const n=t.$implicit;return b.Xb(3).interessentAnnehmen(n.interessent)})),b.Mb(),b.Nb(7,"ion-icon",21),b.Vb("click",(function(){b.fc(e);const n=t.$implicit;return b.Xb(3).interessentEntfernen(n.interessent)})),b.Mb(),b.Mb()}if(2&e){const e=t.$implicit;b.yb(2),b.bc("src",e.user.profileImage||"https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",b.gc),b.yb(2),b.nc(" ",e.user.vorname," ",e.user.nachname," ")}}function N(e,t){1&e&&(b.Nb(0,"ion-label"),b.Nb(1,"em"),b.kc(2,"Es wurden noch keine Interessenten angenommen."),b.Mb(),b.Mb())}function O(e,t){if(1&e){const e=b.Ob();b.Nb(0,"ion-item",18),b.Nb(1,"ion-avatar",3),b.Jb(2,"img",16),b.Mb(),b.Nb(3,"ion-label"),b.kc(4),b.Mb(),b.Nb(5,"ion-icon",19),b.Vb("click",(function(){b.fc(e);const n=t.$implicit;return b.Xb(3).infoPopoverInteressent(n.kunde)})),b.Mb(),b.Mb()}if(2&e){const e=t.$implicit;b.yb(2),b.bc("src",e.user.profileImage||"https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",b.gc),b.yb(2),b.nc(" ",e.user.vorname," ",e.user.nachname," ")}}function w(e,t){if(1&e&&(b.Lb(0),b.Nb(1,"ion-item",2),b.Nb(2,"ion-label",3),b.kc(3,"Interessenten:"),b.Mb(),b.ic(4,M,3,0,"ion-label",0),b.Mb(),b.ic(5,v,8,3,"ion-item",17),b.Nb(6,"ion-item",2),b.Nb(7,"ion-label",3),b.kc(8,"Kunden:"),b.Mb(),b.ic(9,N,3,0,"ion-label",0),b.Mb(),b.ic(10,O,6,3,"ion-item",17),b.Kb()),2&e){const e=b.Xb(2);b.yb(4),b.ac("ngIf",0===e.interessenten.length),b.yb(1),b.ac("ngForOf",e.interessenten),b.yb(4),b.ac("ngIf",0===e.kunden.length),b.yb(1),b.ac("ngForOf",e.kunden)}}function C(e,t){if(1&e){const e=b.Ob();b.Nb(0,"ion-button",25),b.Vb("click",(function(){return b.fc(e),b.Xb(3).starteFahrt()})),b.kc(1,"Fahrt starten"),b.Mb()}}function A(e,t){if(1&e){const e=b.Ob();b.Nb(0,"ion-button",25),b.Vb("click",(function(){return b.fc(e),b.Xb(3).fahrtBeenden()})),b.kc(1,"Fahrt beenden"),b.Mb()}}function z(e,t){1&e&&(b.Nb(0,"ion-button",26),b.Nb(1,"em"),b.kc(2,"Fahrt wurde beendet"),b.Mb(),b.Mb())}function P(e,t){if(1&e&&(b.Nb(0,"div",22),b.ic(1,C,2,0,"ion-button",23),b.ic(2,A,2,0,"ion-button",23),b.ic(3,z,3,0,"ion-button",24),b.Mb()),2&e){const e=b.Xb(2);b.yb(1),b.ac("ngIf",!e.angebot.fahrtId),b.yb(1),b.ac("ngIf",e.angebot.fahrtId&&!e.fahrt.beendet),b.yb(1),b.ac("ngIf",e.angebot.fahrtId&&e.fahrt.beendet)}}function j(e,t){1&e&&(b.Nb(0,"ion-button",26),b.Nb(1,"em"),b.kc(2,"Anfrage ausstehend"),b.Mb(),b.Mb())}function S(e,t){1&e&&(b.Nb(0,"ion-button",26),b.Nb(1,"em"),b.kc(2,"Anfrage abgelehnt"),b.Mb(),b.Mb())}function x(e,t){1&e&&(b.Lb(0),b.Nb(1,"em"),b.kc(2,"Sobald der Fahrer die Fahrt beginnt ist das Tracking m\xf6glich."),b.Mb(),b.Jb(3,"br"),b.Nb(4,"ion-button",27),b.Nb(5,"em"),b.kc(6,"Fahrt tracken"),b.Mb(),b.Mb(),b.Kb())}function F(e,t){1&e&&(b.Nb(0,"ion-button"),b.kc(1,"Fahrt tracken"),b.Mb())}function D(e,t){if(1&e){const e=b.Ob();b.Nb(0,"ion-button",25),b.Vb("click",(function(){return b.fc(e),b.Xb(3).angebotAnfragen()})),b.kc(1,"Anfragen"),b.Mb()}}function _(e,t){if(1&e&&(b.Nb(0,"div",22),b.ic(1,j,3,0,"ion-button",24),b.ic(2,S,3,0,"ion-button",24),b.ic(3,x,7,0,"ng-container",0),b.ic(4,F,2,0,"ion-button",0),b.ic(5,D,2,0,"ion-button",23),b.Mb()),2&e){const e=b.Xb(2);b.yb(1),b.ac("ngIf",!e.angebot.fahrtId&&e.angebot.isInteressent(e.user.id)&&!e.angebot.isKunde(e.user.id)),b.yb(1),b.ac("ngIf",e.angebot.fahrtId&&e.angebot.isInteressent(e.user.id)&&!e.angebot.isKunde(e.user.id)),b.yb(1),b.ac("ngIf",!e.angebot.fahrtId&&e.angebot.isKunde(e.user.id)),b.yb(1),b.ac("ngIf",e.angebot.fahrtId&&e.angebot.isKunde(e.user.id)),b.yb(1),b.ac("ngIf",!e.angebot.isInteressent(e.user.id)&&!e.angebot.isKunde(e.user.id))}}function J(e,t){if(1&e){const e=b.Ob();b.Nb(0,"div"),b.Nb(1,"ion-card",1),b.Nb(2,"ion-item",2),b.Nb(3,"h3",3),b.kc(4),b.Mb(),b.Nb(5,"ion-badge",4),b.kc(6),b.Mb(),b.ic(7,m,2,0,"ion-button",5),b.Mb(),b.Nb(8,"ion-item",2),b.Nb(9,"h4",3),b.kc(10),b.Mb(),b.Jb(11,"ion-icon",6),b.Nb(12,"h4",7),b.kc(13),b.Mb(),b.Mb(),b.Nb(14,"ion-item",8),b.Nb(15,"p",3),b.kc(16,"Ankunft:"),b.Mb(),b.Nb(17,"p",7),b.kc(18),b.Mb(),b.Mb(),b.Nb(19,"ion-icon",9),b.Vb("click",(function(){b.fc(e);const t=b.Xb();return t.dropdown=!t.dropdown})),b.Mb(),b.Mb(),b.Nb(20,"ion-card",10),b.ic(21,I,5,2,"ion-item",11),b.Nb(22,"ion-item",8),b.Nb(23,"ion-label",3),b.kc(24," Start Adresse: "),b.Mb(),b.Nb(25,"ion-label"),b.kc(26),b.Jb(27,"br"),b.kc(28),b.Mb(),b.Mb(),b.Nb(29,"ion-item",8),b.Nb(30,"ion-label",3),b.kc(31," Ziel Adresse: "),b.Mb(),b.Nb(32,"ion-label"),b.kc(33),b.Jb(34,"br"),b.kc(35),b.Mb(),b.Mb(),b.ic(36,k,13,4,"ng-container",0),b.ic(37,y,6,0,"ion-item",11),b.Nb(38,"ion-item",8),b.Nb(39,"ion-label",3),b.kc(40," Bezahlung: "),b.Mb(),b.Nb(41,"ion-label"),b.kc(42),b.Mb(),b.Mb(),b.ic(43,w,11,4,"ng-container",0),b.ic(44,P,4,3,"div",12),b.ic(45,_,6,5,"div",12),b.Mb(),b.Mb()}if(2&e){const e=b.Xb();b.yb(4),b.nc("",e.fahrzeug.marke||"Fahrzeug nicht hinterlegt"," ",e.fahrzeug.modell||"",""),b.yb(2),b.lc(e.interessentenText),b.yb(1),b.ac("ngIf",e.user.id&&e.user.id===e.angebot.erstellerId&&e.angebot._ID),b.yb(3),b.lc(e.angebot.abfahrtOrt),b.yb(3),b.lc(e.angebot.ankunftOrt),b.yb(5),b.nc("",e.angebot.ankunftDatum,", ",e.angebot.ankunftZeit,""),b.yb(1),b.Ab("spin",e.dropdown),b.yb(1),b.Ab("card-dropdown-disabled",!e.dropdown),b.yb(1),b.ac("ngIf",e.angebot),b.yb(5),b.mc(" ",e.angebot.abfahrtStrasse,","),b.yb(2),b.nc(" ",e.angebot.abfahrtPlz," ",e.angebot.abfahrtOrt," "),b.yb(5),b.mc(" ",e.angebot.ankunftStrasse,","),b.yb(2),b.nc(" ",e.angebot.ankunftPlz," ",e.angebot.ankunftOrt," "),b.yb(1),b.ac("ngIf",e.angebot.erstellerId),b.yb(1),b.ac("ngIf",!e.angebot.erstellerId),b.yb(5),b.mc(" ",e.angebot.bezahlung," "),b.yb(1),b.ac("ngIf",e.user.id&&e.user.id===e.angebot.erstellerId&&e.angebot._ID),b.yb(1),b.ac("ngIf",e.user.id&&e.user.id===e.angebot.erstellerId&&e.angebot._ID),b.yb(1),b.ac("ngIf",e.user.id&&e.user.id!==e.angebot.erstellerId&&e.angebot._ID)}}function E(e,t){1&e&&(b.Nb(0,"div"),b.Nb(1,"ion-card",28),b.Nb(2,"ion-item",2),b.Jb(3,"ion-skeleton-text",29),b.Jb(4,"ion-skeleton-text",30),b.Mb(),b.Nb(5,"ion-item",2),b.Jb(6,"ion-skeleton-text",31),b.Jb(7,"ion-icon",6),b.Jb(8,"ion-skeleton-text",31),b.Mb(),b.Nb(9,"ion-item",8),b.Jb(10,"ion-skeleton-text",29),b.Jb(11,"ion-skeleton-text",30),b.Jb(12,"ion-skeleton-text",32),b.Mb(),b.Jb(13,"ion-icon",33),b.Mb(),b.Mb())}let K=(()=>{class e{constructor(e,t,n,r,c,b,l){this.authService=e,this.angebotService=t,this.fahrtService=n,this.lieferobjektService=r,this.alertController=c,this.fahrzeugService=b,this.modalController=l,this.inputAngebot=new i.a,this.angebot=new i.a,this.inputUser=new o.a("","","",""),this.user=new o.a("","","",""),this.fahrzeug=new a.a,this.interessenten=[],this.kunden=[],this.fahrt=new s.a,this.ersteller=new o.a("","","",""),this.dropdown=!1}ngOnInit(){Object.assign(this.user,this.inputUser),Object.assign(this.angebot,this.inputAngebot);const e=this.angebot.getInteressenten();this.setInteressenten(e),this.setInteressentenText(e.length),this.setKunden(this.angebot.getKunden()),this.angebot.erstellerId&&this.authService.findUserById(this.angebot.erstellerId).then(e=>{Object.assign(this.ersteller,e)}),this.angebot.fahrzeugId&&this.fahrzeugService.findFahrzeugById(this.angebot.fahrzeugId).subscribe(e=>{Object.assign(this.fahrzeug,e)})}setInteressenten(e){this.interessenten=[],e.forEach(e=>{this.authService.findUserById(e.userId).then(t=>{this.interessenten.push({user:t,interessent:e})})})}setKunden(e){this.kunden=[],e.forEach(e=>{this.authService.findUserById(e.userId).then(t=>{this.kunden.push({user:t,kunde:e})})})}setInteressentenText(e){this.interessentenText=0===e?"Keine Interessenten":1===e?"1 Interessent":e+" Interessenten"}interessentAnnehmen(e){this.angebot.isKunde(e.userId)?alert("Der Interessent wurde schon angenommen."):(this.angebot.addKunde(e),this.angebot.deleteInteressent(e),this.angebotService.updateAngebot(this.angebot).then(e=>{Object.assign(this.angebot,e.angebot)}).catch(e=>this.presentAlert("Fehler","Fehler beim Update des Angebots. Error: "+e,"Ok")))}interessentEntfernen(e){this.authService.findUserById(e.userId).then(t=>{const n=t;n.id=e.userId;const r=n.interessierteAngebote.indexOf(this.angebot._ID);n.interessierteAngebote.splice(r,1),this.authService.updateUser(n)})}infoPopoverInteressent(e){return Object(r.a)(this,void 0,void 0,(function*(){const t=yield this.authService.findUserById(e.userId),n=yield this.lieferobjektService.findLieferobjektById(e.objectId).subscribe(e=>Object(r.a)(this,void 0,void 0,(function*(){n.unsubscribe();const r=yield this.modalController.create({component:c.a,cssClass:"my-custom-class",componentProps:{interessent:t,lieferobjekt:e}});return yield r.present()})))}))}starteFahrt(){this.authService.getUser()&&this.authService.getUser().id===this.angebot.erstellerId?this.angebot?this.angebot.fahrtId?this.presentAlert("Fehler","Fahrt starten fehlgeschlagen. Die fahrt wurde bereits gestartet.","Ok"):this.fahrtService.startFahrt().then(e=>{this.fahrt=e.fahrt,this.angebot.fahrtId=e.fahrt._ID,this.angebotService.updateAngebot(this.angebot).then(e=>{this.presentAlert("Fahrt gestartet","Die fahrt von "+e.angebot.abfahrtOrt+" nach "+e.angebot.ankunftOrt+" wurde gestartet.<br>Ihre angegebene Ankunftszeit ist: "+e.angebot.ankunftZeit+".","Los gehts!")}).catch(e=>{this.presentAlert("Fehler","Fahrt starten fehlgeschlagen. Error: "+e,"Ok")})}):this.presentAlert("Fehler","Fahrt starten fehlgeschlagen. Error: angebot: undefined","Ok"):this.presentAlert("Fehler","Fahrt starten fehlgeschlagen. Error: Nicht Authorisiert","Ok")}fahrtBeenden(){this.authService.getUser()&&this.authService.getUser().id===this.angebot.erstellerId?this.angebot?this.angebot.fahrtId?this.fahrtService.endFahrt(this.angebot.fahrtId).then(e=>Object(r.a)(this,void 0,void 0,(function*(){this.fahrt=e,this.fahrtBewerten(e._ID)}))):this.presentAlert("Fehler","Fahrt beenden fehlgeschlagen. Die fahrt wurde noch nicht gestartet.","Ok"):this.presentAlert("Fehler","Fahrt beenden fehlgeschlagen. Error: angebot: undefined","Ok"):this.presentAlert("Fehler","Fahrt beenden fehlgeschlagen. Error: Nicht Authorisiert","Ok")}fahrtBewerten(e){return Object(r.a)(this,void 0,void 0,(function*(){const t=yield this.alertController.create({cssClass:"my-custom-class",header:"Fahrt bewerten!",subHeader:"Bewerte die Fahrt",message:'<ion-col>                <ion-icon name="star"></ion-icon>                <ion-icon name="star"></ion-icon>                <ion-icon name="star"></ion-icon>                <ion-icon name="star"></ion-icon>                <ion-icon name="star"></ion-icon>            </ion-col>',buttons:[{text:"Cancel",role:"cancel",cssClass:"secondary"},{text:"Okay",handler:()=>{this.fahrtService.fahrtBewerten(e,5).then(e=>{this.fahrt=e}).catch(e=>{this.presentAlert("Bewertung fehlgeschlagen!","Beim speichern der Bewertung ist etwas schiefgelaufen. Error: <br>"+e,"Ok")})}}]});yield t.present()}))}angebotAnfragen(){return Object(r.a)(this,void 0,void 0,(function*(){if(this.angebot){const e=yield this.alertController.create({cssClass:"my-custom-class",header:"Angebot anfragen",subHeader:"Welches Objekt soll f\xfcr Sie transportiert werden? ",inputs:[{name:"name",type:"text",placeholder:"name des Lieferobjekts"},{name:"beschreibung",type:"text",placeholder:"beschreibung"},{name:"preis",type:"text",placeholder:"Preisvorschlag"}],buttons:[{text:"Cancel",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"Anfrage senden",handler:e=>Object(r.a)(this,void 0,void 0,(function*(){const t=new i.b,n=this.authService.getUser();t.userId=n.id,n.interessierteAngebote.push(this.angebot._ID);const r=yield this.lieferobjektService.addLieferobjekt(e);t.objectId=r.lieferobjekt._ID,this.angebot.addInteressent(t),this.authService.updateUser(n).catch(e=>{this.presentAlert("Fehler!","Fehler beim update des Users der sich interessiert. Error: "+e,"Ok")}),this.angebotService.updateAngebot(this.angebot).catch(e=>{this.presentAlert("Fehler!","Fehler beim speichern des Angebots entstanden. Error: "+e,"Ok")})}))}]});yield e.present()}}))}deleteAngebotAlert(){return Object(r.a)(this,void 0,void 0,(function*(){const e=yield this.alertController.create({cssClass:"my-custom-class",header:"Abgebot l\xf6schen!",message:"M\xf6chten Sie das Angebot von "+this.angebot.abfahrtOrt+" nach "+this.angebot.ankunftOrt+" wirklich l\xf6schen?",buttons:[{text:"Cancel",role:"cancel",cssClass:"secondary",handler:()=>{}},{text:"L\xf6schen",handler:()=>{this.deleteAngebot()}}]});yield e.present()}))}deleteAngebot(){this.angebotService.deleteAngebot(this.angebot._ID).then(e=>{this.angebot.getInteressenten().forEach(t=>{this.user.erstellteAngebote=this.user.erstellteAngebote.filter(t=>t!==e),this.authService.updateUser(this.user),this.authService.findUserById(t.userId).then(t=>{t.interessierteAngebote=t.interessierteAngebote.filter(t=>t!==e),this.authService.updateUser(t)})})}).catch(e=>{this.presentAlert("Fehler!","Fehler beim L\xf6schen des Angebots entstanden. Error: "+e,"Ok")})}presentAlert(e,t,n){return Object(r.a)(this,void 0,void 0,(function*(){const r=yield this.alertController.create({cssClass:"my-custom-class",header:e,message:t,buttons:[n]});yield r.present()}))}}return e.\u0275fac=function(t){return new(t||e)(b.Ib(l.a),b.Ib(d.a),b.Ib(h.a),b.Ib(u.a),b.Ib(g.a),b.Ib(f.a),b.Ib(g.M))},e.\u0275cmp=b.Cb({type:e,selectors:[["app-angebot-card"]],inputs:{inputAngebot:"inputAngebot",inputUser:"inputUser"},decls:2,vars:2,consts:[[4,"ngIf"],[1,"border-card-orange"],["lines","none"],["slot","start"],["color","secondary","slot","end"],["disabled","true","slot","end","color","danger",3,"click",4,"ngIf"],["name","arrow-forward",1,"center"],["slot","end"],["lines","full"],["size","large","name","chevron-down-outline",1,"center","transition","pointer",3,"click"],[1,"card-dropdown"],["lines","full",4,"ngIf"],["class","ion-text-center ion-margin",4,"ngIf"],["disabled","true","slot","end","color","danger",3,"click"],["slot","icon-only","name","trash-outline"],[1,"ion-margin"],[3,"src"],["lines","inset",4,"ngFor","ngForOf"],["lines","inset"],["slot","end","name","information-circle-outline",3,"click"],["slot","end","color","primary","name","checkmark-circle-outline",3,"click"],["slot","end","color","secondary","name","close-circle-outline",3,"click"],[1,"ion-text-center","ion-margin"],[3,"click",4,"ngIf"],["disabled","true",4,"ngIf"],[3,"click"],["disabled","true"],["disabled","true",1,"ion-margin-top"],[1,"ion-padding","custom-skeleton","border-card-orange"],["slot","start","animated","",2,"width","30%"],["slot","end","animated","",2,"width","10%"],["slot","","animated","",2,"width","25%"],["slot","end","animated","",2,"width","20%"],["size","large","name","chevron-down-outline",1,"center"]],template:function(e,t){1&e&&(b.ic(0,J,46,25,"div",0),b.ic(1,E,14,0,"div",0)),2&e&&(b.ac("ngIf",t.user.id&&t.angebot._ID),b.yb(1),b.ac("ngIf",!(t.user.id&&t.angebot._ID)))},directives:[p.i,g.i,g.v,g.f,g.s,g.w,g.g,g.c,p.h,g.E],styles:[".border-card-green[_ngcontent-%COMP%]{border:2px solid green}.border-card-orange[_ngcontent-%COMP%]{border:2px solid orange}.border-card-green[_ngcontent-%COMP%], .border-card-orange[_ngcontent-%COMP%]{z-index:1}.center[_ngcontent-%COMP%]{width:100%;text-align:center}.card-dropdown[_ngcontent-%COMP%]{opacity:1;display:block;overflow:scroll;position:relative;top:0;max-height:500px}.card-dropdown[_ngcontent-%COMP%], .card-dropdown-disabled[_ngcontent-%COMP%]{transition:opacity 1s ease-out,max-height 1s,top 1s}.card-dropdown-disabled[_ngcontent-%COMP%]{top:-200px;opacity:0;max-height:0}.spin[_ngcontent-%COMP%]{transform:rotate(180deg)}.spin[_ngcontent-%COMP%], .transition[_ngcontent-%COMP%]{transition:1s}.pointer[_ngcontent-%COMP%]{cursor:pointer}"]}),e})()}}]);