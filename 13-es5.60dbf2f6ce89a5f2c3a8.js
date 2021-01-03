!function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"+iOL":function(r,t,i){"use strict";i.r(t),i.d(t,"RegisterPageModule",(function(){return k}));var a=i("ofXK"),o=i("3Pt+"),s=i("TEn/"),c=i("tyNb"),l=i("mrSG"),d=i("fXoL"),h=i("ZETX"),b=i("ZGwD"),g=i("QAk6"),u=["focus"];function f(e,n){if(1&e&&(d.Nb(0,"p",15),d.hc(1),d.Mb()),2&e){var r=d.Xb();d.yb(1),d.jc(" ",r.errors.get("email")," ")}}function p(e,n){if(1&e&&(d.Nb(0,"p",15),d.hc(1),d.Mb()),2&e){var r=d.Xb();d.yb(1),d.jc(" ",r.errors.get("username")," ")}}function m(e,n){if(1&e&&(d.Nb(0,"p",15),d.hc(1),d.Mb()),2&e){var r=d.Xb();d.yb(1),d.jc(" ",r.errors.get("firstname")," ")}}function M(e,n){if(1&e&&(d.Nb(0,"p",15),d.hc(1),d.Mb()),2&e){var r=d.Xb();d.yb(1),d.jc(" ",r.errors.get("lastname")," ")}}function w(e,n){if(1&e&&(d.Nb(0,"p",15),d.hc(1),d.Mb()),2&e){var r=d.Xb();d.yb(1),d.jc(" ",r.errors.get("password")," ")}}function y(e,n){if(1&e&&(d.Nb(0,"p",15),d.hc(1),d.Mb()),2&e){var r=d.Xb();d.yb(1),d.jc(" ",r.errors.get("passwordConfirmation")," ")}}var C,v,N,x=[{path:"",component:(C=function(){function r(n,t,i){e(this,r),this.authService=n,this.profileService=t,this.changePage=i,this.errors=new Map}var t,i,a;return t=r,(i=[{key:"register",value:function(){return Object(l.a)(this,void 0,void 0,regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.errors.clear(),this.email?this.profileService.emailIsValid(this.email)||this.errors.set("email","Fehlerhaftes Email Format!"):this.errors.set("email","Email darf nicht leer sein!"),this.username||this.errors.set("username","Nutzername darf nicht leer sein!"),this.firstname||this.errors.set("firstname","Vorname darf nicht leer sein!"),this.lastname||this.errors.set("lastname","Nachname darf nicht leer sein!"),this.password?this.password.length<6?this.errors.set("password","Passwort muss mindestens 6 Zeichen besitzen!"):this.passwordConfirmation?this.password!==this.passwordConfirmation&&this.errors.set("passwordConfirmation","Passw\xf6rter stimmen nicht \xfcberein!"):this.errors.set("passwordConfirmation","Bitte best\xe4tigen Sie das Passwort!"):this.errors.set("password","Passwort darf nicht leer sein!"),e.t0=0===this.errors.size,!e.t0){e.next=12;break}return e.next=10,this.authService.signUp(this.email,this.username,this.firstname,this.lastname,this.password);case 10:return e.next=12,this.changePage.route("profile");case 12:this.email="",this.username="",this.firstname="",this.lastname="",this.password="",this.passwordConfirmation="";case 18:case"end":return e.stop()}}),e,this)})))}},{key:"ionViewDidEnter",value:function(){var e=this;this.authService.getUserID()&&this.changePage.route("profile"),setTimeout((function(){return e.emailRef.setFocus()}),10)}}])&&n(t.prototype,i),a&&n(t,a),r}(),C.\u0275fac=function(e){return new(e||C)(d.Ib(h.a),d.Ib(b.a),d.Ib(g.a))},C.\u0275cmp=d.Cb({type:C,selectors:[["app-register"]],viewQuery:function(e,n){var r;1&e&&d.lc(u,!0),2&e&&d.cc(r=d.Wb())&&(n.emailRef=r.first)},decls:31,vars:13,consts:[[1,"cargo-content"],[1,"title"],["src","../../../../assets/icon/MyCargonaut.png","alt","MyCargonaut",1,"center"],["clearOnEdit","false","type","email","name","mail","placeholder","E-Mail...","required","",3,"ngModel","ngModelChange"],["focus",""],["class","ion-text-end ion-padding-end","style","color:var(--ion-color-danger)",4,"ngIf"],["clearOnEdit","false","type","text","name","username","placeholder","Nutzername...","required","",3,"ngModel","ngModelChange"],["clearOnEdit","false","type","text","name","firstname","placeholder","Vorname...","required","",3,"ngModel","ngModelChange"],["clearOnEdit","false","type","text","name","lastname","placeholder","Nachname...","required","",3,"ngModel","ngModelChange"],["clearOnEdit","false","type","password","name","password","minlength","6","placeholder","Passwort...","required","",3,"ngModel","ngModelChange"],["clearOnEdit","false","type","password","name","passwordConfirmation","minlength","6","placeholder","Passwort best\xe4tigen...","required","",3,"ngModel","ngModelChange"],[1,"center"],[1,"auth-button",3,"click"],[1,"info"],[3,"routerLink"],[1,"ion-text-end","ion-padding-end",2,"color","var(--ion-color-danger)"]],template:function(e,n){1&e&&(d.Nb(0,"ion-content"),d.Nb(1,"div",0),d.Nb(2,"ion-card"),d.Nb(3,"ion-card-header"),d.Nb(4,"p",1),d.hc(5,"REGISTRIEREN"),d.Mb(),d.Jb(6,"img",2),d.Mb(),d.Nb(7,"ion-card-content"),d.Nb(8,"ion-input",3,4),d.Vb("ngModelChange",(function(e){return n.email=e})),d.Mb(),d.gc(10,f,2,1,"p",5),d.Nb(11,"ion-input",6),d.Vb("ngModelChange",(function(e){return n.username=e})),d.Mb(),d.gc(12,p,2,1,"p",5),d.Nb(13,"ion-input",7),d.Vb("ngModelChange",(function(e){return n.firstname=e})),d.Mb(),d.gc(14,m,2,1,"p",5),d.Nb(15,"ion-input",8),d.Vb("ngModelChange",(function(e){return n.lastname=e})),d.Mb(),d.gc(16,M,2,1,"p",5),d.Nb(17,"ion-input",9),d.Vb("ngModelChange",(function(e){return n.password=e})),d.Mb(),d.gc(18,w,2,1,"p",5),d.Nb(19,"ion-input",10),d.Vb("ngModelChange",(function(e){return n.passwordConfirmation=e})),d.Mb(),d.gc(20,y,2,1,"p",5),d.Nb(21,"div",11),d.Nb(22,"button",12),d.Vb("click",(function(){return n.register()})),d.hc(23,"Registrieren"),d.Mb(),d.Mb(),d.Nb(24,"p",13),d.hc(25,"Bereits registriert? "),d.Jb(26,"br"),d.hc(27," Klicke "),d.Nb(28,"a",14),d.hc(29,"hier"),d.Mb(),d.hc(30,", um dich anzumelden. "),d.Mb(),d.Mb(),d.Mb(),d.Mb(),d.Mb()),2&e&&(d.yb(8),d.ac("ngModel",n.email),d.yb(2),d.ac("ngIf",n.errors.get("email")),d.yb(1),d.ac("ngModel",n.username),d.yb(1),d.ac("ngIf",n.errors.get("username")),d.yb(1),d.ac("ngModel",n.firstname),d.yb(1),d.ac("ngIf",n.errors.get("firstname")),d.yb(1),d.ac("ngModel",n.lastname),d.yb(1),d.ac("ngIf",n.errors.get("lastname")),d.yb(1),d.ac("ngModel",n.password),d.yb(1),d.ac("ngIf",n.errors.get("password")),d.yb(1),d.ac("ngModel",n.passwordConfirmation),d.yb(1),d.ac("ngIf",n.errors.get("passwordConfirmation")),d.yb(8),d.ac("routerLink","/login"))},directives:[s.m,s.h,s.j,s.i,s.s,s.I,o.g,o.e,o.f,a.i,o.b,c.i,s.H],styles:["ion-card[_ngcontent-%COMP%]{border-radius:50px;font-size:25px;background-color:#fff}img[_ngcontent-%COMP%]{width:400px;height:50%;display:block;margin:50px auto}.title[_ngcontent-%COMP%]{text-align:center;margin-top:0}.auth-button[_ngcontent-%COMP%]{width:150px;height:50px;margin-top:10px;margin-bottom:20px;border-radius:10px;font-size:20px;color:#fff;background-color:#1d5a52}.center[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}ion-input[_ngcontent-%COMP%]{--placeholder-color:#1d5a52;--placeholder-font-weight:bold;border:3px solid #1d5a52;border-radius:10px;margin-bottom:15px}.info[_ngcontent-%COMP%]{font-size:20px;color:#1d5a52}"]}),C)}],P=((N=function n(){e(this,n)}).\u0275mod=d.Gb({type:N}),N.\u0275inj=d.Fb({factory:function(e){return new(e||N)},imports:[[c.j.forChild(x)],c.j]}),N),k=((v=function n(){e(this,n)}).\u0275mod=d.Gb({type:v}),v.\u0275inj=d.Fb({factory:function(e){return new(e||v)},imports:[[a.b,o.a,s.C,P]]}),v)}}])}();