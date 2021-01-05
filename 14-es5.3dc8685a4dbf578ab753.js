!function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{qOEh:function(n,r,c){"use strict";c.r(r),c.d(r,"GesuchPageModule",(function(){return P}));var a,u=c("ofXK"),i=c("3Pt+"),o=c("TEn/"),s=c("tyNb"),f=c("mrSG"),l=c("fXoL"),h=c("lJxs"),d=c("I/3d"),p=((a=function(){function n(t){e(this,n),this.afs=t,this.gesuchCollection=t.collection("gesuche")}return t(n,[{key:"observableGesuch",value:function(){return this.gesuchCollection.snapshotChanges().pipe(Object(h.a)((function(e){return e.map((function(e){var n=e.payload.doc.data();return n._ID=e.payload.doc.id,n}))})))}},{key:"addGesuch",value:function(e){var t=this;return new Promise((function(r,c){t.gesuchCollection.add(n.copyAndPrepare(e)).then((function(n){var t=e;t._ID=n.id,r({gesuch:t,message:"Document written with ID: "+n.id})})).catch((function(e){c("Error adding document: "+e)}))}))}},{key:"deleteGesuch",value:function(e){var n=this;return new Promise((function(t,r){n.gesuchCollection.doc(e).delete().then((function(){return Object(f.a)(n,void 0,void 0,regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t("Successfully deleted Document with ID: "+e);case 1:case"end":return n.stop()}}),n)})))})).catch((function(e){r("Error deleting document: "+e)}))}))}},{key:"updateGesuch",value:function(e){var t=this;return new Promise((function(r,c){var a=e._ID;t.gesuchCollection.doc(e._ID).update(n.copyAndPrepare(e)).then((function(){return Object(f.a)(t,void 0,void 0,regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e._ID=a,r({gesuch:e,message:"Successfully edited Document with ID: "+e._ID});case 1:case"end":return n.stop()}}),n)})))})).catch((function(e){c("Error editing document: "+e)}))}))}}],[{key:"copyAndPrepare",value:function(e){var n=Object.assign({},e);return delete n._ID,n.erstellerId=n.erstellerId||null,n.ankunftDatum=n.ankunftDatum||null,n.ankunftZeit=n.ankunftZeit||null,n.abfahrtStrasse=n.abfahrtStrasse||null,n.abfahrtOrt=n.abfahrtOrt||null,n.abfahrtPlz=n.abfahrtPlz||null,n.ankunftStrasse=n.ankunftStrasse||null,n.ankunftOrt=n.ankunftOrt||null,n.ankunftPlz=n.ankunftPlz||null,n.bezahlung=n.bezahlung||null,n.fahrtId=n.fahrtId||null,n.fahrer=n.fahrer||[],n.interessenten=n.interessenten||[],n.lieferobjektId=n.lieferobjektId||null,n}}]),n}()).\u0275fac=function(e){return new(e||a)(l.Rb(d.a))},a.\u0275prov=l.Eb({token:a,factory:a.\u0275fac,providedIn:"root"}),a),g=c("h0n1");function b(e,n){1&e&&l.Jb(0,"app-anfrage-card",2),2&e&&l.ac("page","gesuch")}var v=function(){return[0,1,2]};function m(e,n){1&e&&(l.Lb(0),l.gc(1,b,1,1,"app-anfrage-card",1),l.Kb()),2&e&&(l.yb(1),l.ac("ngForOf",l.bc(1,v)))}function y(e,n){1&e&&l.Jb(0,"app-anfrage-card",4),2&e&&l.ac("inputGesuch",n.$implicit)("page","gesuch")}function w(e,n){if(1&e&&(l.Lb(0),l.gc(1,y,1,2,"app-anfrage-card",3),l.Kb()),2&e){var t=l.Xb();l.yb(1),l.ac("ngForOf",t.filtertGesuche)}}var k,I,G,O=[{path:"",component:(k=function(){function n(t){var r=this;e(this,n),this.gesuchService=t,this.gesuche=[],this.filtertGesuche=[],this.gesuchService.observableGesuch().subscribe((function(e){return Object(f.a)(r,void 0,void 0,regeneratorRuntime.mark((function n(){var t=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:this.gesuche=e,this.gesuche.forEach((function(e){t.filtertGesuche.push(e)}));case 1:case"end":return n.stop()}}),n,this)})))}))}return t(n,[{key:"ngOnInit",value:function(){}}]),n}(),k.\u0275fac=function(e){return new(e||k)(l.Ib(p))},k.\u0275cmp=l.Cb({type:k,selectors:[["app-gesuch"]],decls:7,vars:2,consts:[[4,"ngIf"],[3,"page",4,"ngFor","ngForOf"],[3,"page"],[3,"inputGesuch","page",4,"ngFor","ngForOf"],[3,"inputGesuch","page"]],template:function(e,n){1&e&&(l.Nb(0,"ion-header"),l.Nb(1,"ion-toolbar"),l.Nb(2,"ion-title"),l.hc(3,"gesuch"),l.Mb(),l.Mb(),l.Mb(),l.Nb(4,"ion-content"),l.gc(5,m,2,2,"ng-container",0),l.gc(6,w,2,1,"ng-container",0),l.Mb()),2&e&&(l.yb(5),l.ac("ngIf",n.filtertGesuche.length<1),l.yb(1),l.ac("ngIf",n.filtertGesuche.length>0))},directives:[o.p,o.B,o.A,o.m,u.i,u.h,g.a],styles:[""]}),k)}],D=((I=function n(){e(this,n)}).\u0275mod=l.Gb({type:I}),I.\u0275inj=l.Fb({factory:function(e){return new(e||I)},imports:[[s.j.forChild(O)],s.j]}),I),j=c("iWjc"),P=((G=function n(){e(this,n)}).\u0275mod=l.Gb({type:G}),G.\u0275inj=l.Fb({factory:function(e){return new(e||G)},imports:[[u.b,i.a,o.C,D,j.a]]}),G)}}])}();