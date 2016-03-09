/*
License: Copyright Axel Hjelmqvist 2015. You may play this game in your browser, and even save it and distribute it freely, but you may not try to reverse-engineer and/or modify
the code or any of the text in this document in any way.
*/
/**
 *
 *            ############        BLOCKSGAME         ############
 *            ############                           ############
 *
 *
 *               ######             ABOUT               ######
 *               ######                                 ######
 *                  ###        Author: Axel             ###
 *                  ###          Year: 2013-            ###
 *                  ###                2015             ###
 *                  ###                                 ###
 *
 *                         Tools used: Notepad++
 *               ######                Pain(t).net      ######
 *               ######                Google Chrome    ######
 *            ######                                       ######
 *            ######                                       ######
 *                     ######      DESCRIPTION    ######
 *                     ######                     ######
 *                  ######        Made in Malmö      ######
 *                  ######                           ######
 *
 *
 *                                    ###
 *                                    ###
 *                                 #########
 *                                 #########
 *
 *
 *        This is a version of a classic puzzle-game, base on a codebase
 *        that was originally authored for the Android-platform. This
 *        is a port to Html5/Canvas and JavaScript. All the code and assets
 *        are written and designed by me.
 *
 *        My inspiration is a pocket/handheld version of the original game
 *        that was available during and after the 1990's.
 *        After playing many modern versions on Web/Flash/Windows/Phone platforms,
 *        I usually found something that I did not like about every single
 *        implementation of the game, except possible the Ericsson R310 version,
 *        that made the gameplay experience inferior in relation to the original
 *        handheld version of the game. A single or a few of the following problems
 *        caused hindrance to me enjoying the game; bad sound-effects, useless
 *        gameplay-gimmicks like "fastdrop", the tiles would rotate in the wrong
 *        direction (ie counter-clockwise), usually the auto-keyrepeat does not
 *        feel right in terms of timing, on cellphone versions of the game,
 *        swiping is considered a suitable method of input, even though it clearly
 *        does not work well at all.
 *
 *        All of these issues are fixed with this version of the game, without
 *        really messing any of the gameplay up.
 *
 *        Sound support may be added in the future (or not, it all depends).
 *        If you feel that the difficulty never increases, it's because it does not.
 *
 *        If you liked it, or have another inquiry, feel free to tell me so/email
 *        me at axel [DOT] hj [AT] hotmail [DOT] com
 *
 */
window.Blocksgame={paused:!1};window.htmlColor=l;window.tintImage=n;var r=null,t=null,u=null;function l(b,c,d){function h(b){var a,e="";do a=b%16,b=Math.floor(b/16),0<a&&(e="0123456789ABCDEF"[a]+e);while(0<a);for(;2>e.length;)e="0"+e;return e}return"#"+h(b)+h(c)+h(d)}
function n(b,c){canvas=document.createElement("canvas");canvas.width=220;canvas.height=300;var d=canvas.getContext("2d"),h=document.createElement("canvas");h.width=b.width;h.height=b.height;var k=h.getContext("2d");d.fillStyle=c;d.fillRect(0,0,b.width,b.height);d.globalCompositeOperation="destination-atop";d.drawImage(b,0,0);k.drawImage(b,0,0);k.globalAlpha=.3;k.drawImage(canvas,0,0);return h}function v(b){return Math.floor(0+Math.random()*(b-0))}
Blocksgame.f={Y:function(b){Blocksgame.paused||(37===b.keyCode?(Blocksgame.a.m(Blocksgame.a,!0),b.preventDefault()):39===b.keyCode&&(Blocksgame.a.o(Blocksgame.a,!0),b.preventDefault()),38===b.keyCode&&(Blocksgame.a.w(Blocksgame.a),b.preventDefault()),40===b.keyCode&&(Blocksgame.a.j(Blocksgame.a,!0),b.preventDefault()))},Z:function(b){Blocksgame.paused||(37===b.keyCode?(Blocksgame.a.m(Blocksgame.a,!1),b.preventDefault()):39===b.keyCode&&(Blocksgame.a.o(Blocksgame.a,!1),b.preventDefault()),40===b.keyCode&&
(Blocksgame.a.j(Blocksgame.a,!1),b.preventDefault()))},X:function(b,c){return c<=.4*u.height?0:c<=.8*u.height?b<u.width/2?1:2:3},fa:function(b){0===b?Blocksgame.a.w(Blocksgame.a):1===b?Blocksgame.a.m(Blocksgame.a,!0):2===b?Blocksgame.a.o(Blocksgame.a,!0):3===b&&Blocksgame.a.j(Blocksgame.a,!0)},w:[],m:[],o:[],j:[],ia:function(b){if(!Blocksgame.paused){b.preventDefault();b=b.targetTouches;var c=Blocksgame.f.m,d=Blocksgame.f.o,h=Blocksgame.f.j,k=Blocksgame.f.w,a;for(a=0;a<b.length;++a){touch=b[a];u.getBoundingClientRect();
var e=Blocksgame.f.X(touch.pageX-window.pageXOffset-u.offsetLeft,touch.pageY-window.pageYOffset-u.offsetTop);0==e&&0>k.indexOf(touch.identifier)?k[k.length]=touch.identifier:1==e&&0>c.indexOf(touch.identifier)?c[c.length]=touch.identifier:2==e&&0>d.indexOf(touch.identifier)?d[d.length]=touch.identifier:3==e&&0>h.indexOf(touch.identifier)&&(h[h.length]=touch.identifier);Blocksgame.f.fa(e)}}},A:function(b){b.preventDefault();b=b.changedTouches;var c=Blocksgame.f.m,d=Blocksgame.f.o,h=Blocksgame.f.j,
k=Blocksgame.f.w,a,e;for(a=0;a<b.length;++a)touch=b[a],e=c.indexOf(touch.identifier),0>e||(c.splice(e,1),Blocksgame.a.m(Blocksgame.a,!1)),e=d.indexOf(touch.identifier),0>e||(d.splice(e,1),Blocksgame.a.o(Blocksgame.a,!1)),e=h.indexOf(touch.identifier),0>e||(h.splice(e,1),Blocksgame.a.j(Blocksgame.a,!1)),e=k.indexOf(touch.identifier),0>e||Blocksgame.f.w.splice(e,1)},aa:function(b){if(!Blocksgame.paused){b.preventDefault();var c=u.getBoundingClientRect();Blocksgame.f.fa(Blocksgame.f.X(b.clientX-c.left,
b.clientY-c.top))}},ba:function(b){b.preventDefault();Blocksgame.a.m(Blocksgame.a,!1);Blocksgame.a.o(Blocksgame.a,!1);Blocksgame.a.j(Blocksgame.a,!1)},ca:function(b){80==b.keyCode&&(Blocksgame.paused=!Blocksgame.paused,t(Blocksgame.paused),b.preventDefault())}};
window.Blocksgame.startGame=function(b,c,d,h,k,a,e,g){function w(){null!=r&&clearInterval(r);u.removeEventListener("mousedown",m.aa);u.removeEventListener("mouseup",m.ba);u.removeEventListener("touchstart",m.ia,!1);u.removeEventListener("touchleave",m.A,!1);u.removeEventListener("touchend",m.A,!1);u.removeEventListener("touchcancel",m.A,!1);document.removeEventListener("keydown",m.Y);document.removeEventListener("keyup",m.Z);document.removeEventListener("keydown",m.ca);Blocksgame.a=null;Blocksgame.c=
null}u=document.getElementById("blocksgame");var f=u.width,z=u.height,x=u.getContext("2d"),m=Blocksgame.f;t=e;Blocksgame.s=function(a,e,b,g,c){"undefined"!==typeof a&&null!==a&&x.drawImage(a,e,b,g,c)};e=[];nrColors=Blocksgame.C.length/3;var q,p;for(q=0;q<nrColors;++q)p=3*q,p=l(Blocksgame.C[p],Blocksgame.C[p+1],Blocksgame.C[p+2]),e[q]=n(b.blocks,p);w();Blocksgame.a=Blocksgame.controller(e,c,d,h,k);Blocksgame.c=Blocksgame.za();Blocksgame.a.g.xa=g;Blocksgame.a.g.wa=a;Blocksgame.a.ra(Blocksgame.a);Blocksgame.a.ka=
w;u.addEventListener("mousedown",m.aa,!1);u.addEventListener("mouseup",m.ba,!1);u.addEventListener("touchstart",m.ia,!1);u.addEventListener("touchleave",m.A,!1);u.addEventListener("touchend",m.A,!1);u.addEventListener("touchcancel",m.A,!1);document.addEventListener("keydown",m.Y);document.addEventListener("keyup",m.Z);document.addEventListener("keydown",m.ca);r=setInterval(function(){Blocksgame.paused||(Blocksgame.a.update(Blocksgame.a,.033),null!==Blocksgame.a&&(x.drawImage(b.bg,0,0,f,z),Blocksgame.a.s(Blocksgame.a)))},
33)};Blocksgame.C=[255,0,255,255,255,0,0,255,255,255,0,0,0,0,255,0,255,0,0,255,127];Blocksgame.G=[0,0,0,-1,0,1,0,0,1,1,0,1,2,0,1,0,0,0,0,0,1,1,0,1,0,1,1,1,1,1,0,0,0,-1,0,1,0,0,1,0,1,1,1,1,1,0,0,0,0,1,1,-1,0,1,0,0,1,1,0,1,0,0,0,-1,1,1,-1,0,1,0,0,1,1,0,1];
Blocksgame.controller=function(b,c,d,h,k){return{Da:{Ba:function(){}},g:{$:2,M:0,pa:function(){Blocksgame.a.g.wa();Blocksgame.a.ka()},g:function(a){a+=Blocksgame.a.g.$;Blocksgame.a.g.M+=a*a*10;Blocksgame.a.g.xa(Blocksgame.a.g.M)},s:function(){}},U:b,shape:null,h:null,width:c.x,height:c.y,da:d.x,ea:d.y,ua:k.x,va:k.y,v:h.x/c.x,u:h.y/c.y,l:[],B:[0,0,0,0,0,0,0,0],O:!1,P:!1,W:!1,D:!1,Ca:!1,F:0,Aa:[1,2,5,6,9,10,13,14],ra:function(a){a.ga(a);var e={type:v(Blocksgame.G.length/15),qa:v(1),orientation:v(3)};
y=-4;a.h=Blocksgame.c.V(Math.floor(a.width/2),y);a.shape=Blocksgame.c.V(Math.floor(a.width/2),y,e);a.H(a);a.H(a);a.H(a)},j:function(a,e){a.W=e},m:function(a,e){a.O=e;a.O&&(a.D=.4,a.K(a,-1))},o:function(a,e){a.P=e;a.P&&(a.I=.4,a.K(a,1))},w:function(a){if(1!=a.shape.type){var e=a.L(a,Blocksgame.c.S(a.shape,0,0,-1,3)),b=a.la(a,e);1!=b&&2!=b&&4!=b&&0==a.N(a,e)&&Blocksgame.c.T(a.shape)}},update:function(a,e){a.F+=e;var b=.5-2*a.g.$/60;a.W&&(b/=4);a.F>=b&&(a.F=0,a.ta(a));a.O?(0>a.D&&(a.K(a,-1),a.D=.1),
a.D-=e):a.P&&(0>a.I&&(a.K(a,1),a.I=.1),a.I-=e)},ga:function(a){var e;for(e=0;e<a.width*a.height;++e)a.l[e]=0},oa:function(a,e,b){var c,f;for(c=0;c<b;++c)if(!(e[c]>=a.height)){for(f=1;f<=e[c]*a.width;++f)a.l[e[c]*a.width-f+a.width]=a.l[e[c]*a.width-f];for(f=0;f<a.width;++f)a.l[f]=0}},L:function(a,e){var b;for(b=0;b<a.B.length;++b)a.B[b]=0;var c=a.B,f=0;for(b=3;15>b;b+=3)0!=e.b[b+2]&&(c[f]=Math.floor(e.x+e.b[b]),c[f+1]=Math.floor(e.y+e.b[b+1]),f+=2);6>f&&(c[f]=-61);return c},N:function(a,b){var g;for(g=
0;8>g&&-61!=b[g];g+=2)if(!(0>b[g]||b[g]>=a.width||0>b[g+1]||b[g+1]>=a.height)&&0!=a.l[b[g]+b[g+1]*a.width])return 1;return 0},la:function(a,b){var g;for(g=0;8>g&&-61!=b[g];g+=2){if(0>b[g])return 1;if(b[g]>=a.width)return 2;if(0>b[g+1])return 3;if(b[g+1]>=a.height)return 4}return 0},na:function(a,b){var g;for(g=0;8>g&&-61!=b[g];g+=2){if(0>b[g+1])return 3;if(b[g+1]>=a.height)return 4}return 0},ma:function(a,b){var g;for(g=0;8>g&&-61!=b[g];g+=2){if(0>b[g])return 1;if(b[g]>=a.width)return 2}return 0},
sa:function(a,b){var g=0,c=0,g=0,f;for(f=3;15>f;f+=3)g=b.x+b.b[f],c=b.y+b.b[f+1],g+=c*a.width,0!=b.b[f+2]&&0<=g&&g<a.width*a.height&&(a.l[g]=b.b[f+2])},ja:function(a,b){var c=0;if(0>a.shape.y)return 0;var d=a.shape.y,f=a.shape.y,h=0,k;for(k=0;4>k;++k)h=a.shape.b[3*(k+1)+1]+a.shape.y,h<d&&(d=h-1),h>f&&(f=h);for(k=d;k<=f&&0<=k&&k<a.height;++k){h=!0;for(d=0;d<a.width;++d)0==a.l[k*a.width+d]&&(h=!1);h&&(b[c]=k,++c)}return c},ta:function(a){var b=a.L(a,Blocksgame.c.S(a.shape,0,1));if(4==a.na(a,b)||0!=
a.N(a,b)){a.sa(a,a.shape);for(b=0;b<a.B.length;++b)a.B[b]=0;var b=a.B,c=a.ja(a,b);a.oa(a,b,c);0<c&&a.g.g(c);0>a.shape.y?(a.g.pa(),a.ga(a)):a.H(a)}else Blocksgame.c.T(a.shape)},K:function(a,b){var c=Blocksgame.c.S(a.shape,b,0),c=a.L(a,c);0==a.ma(a,c)&&0==a.N(a,c)&&Blocksgame.c.T(a.shape)},H:function(a){var b=a.shape.b;a.shape.b=a.h.b;a.h.b=b;b=a.shape.type;a.shape.type=a.h.type;a.h.type=b;Blocksgame.c.J(a.shape,v(3));var b=-61,c;for(c=3;15>c;c+=3)a.h.b[c+1]>b&&(b=c+1);a.shape.y=-1*b+1;a.shape.x=a.width/
2-1;c=v(Blocksgame.C.length/3-1);b=v(Blocksgame.G.length/15);Blocksgame.c.ha(a.h,b,c);Blocksgame.c.J(a.h,1);b=v(4);2>b&&Blocksgame.c.R(a.h,b)},s:function(a){var b,c,d=0,f;for(f=3;15>f;f+=3)b=a.v*(a.shape.x+a.shape.b[f])+a.da,c=a.u*(a.shape.y+a.shape.b[f+1])+a.ea,d=a.shape.b[f+2],0!=d&&0<=a.shape.y+a.shape.b[f+1]&&Blocksgame.s(a.U[d],b,c,a.v,a.u);for(f=3;15>f;f+=3)b=a.v*(a.h.b[f]+1)+a.ua,c=a.u*(a.h.b[f+1]+2)+a.va,d=a.h.b[f+2],0!=d&&Blocksgame.s(a.U[d],b,c,a.v,a.u);for(f=0;f<a.width*a.height;++f)d=
a.l[f],0!=d&&(b=f%a.width*a.v+a.da,c=a.u*Math.floor(f/a.width)+a.ea,Blocksgame.s(a.U[d],b,c,a.v,a.u));a.g.s()}}};
Blocksgame.za=function(){return{V:function(b,c,d){b={x:b,y:c,type:0,b:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],i:{x:b,y:c,type:0,b:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}};void 0!==d&&(b.type=d.type,Blocksgame.c.ha(b,d.type,0),Blocksgame.c.R(b,d.qa),Blocksgame.c.J(b,d.orientation,0));return b},S:function(b,c,d,h,k){b.i.x=b.x+c;b.i.y=b.y+d;for(c=0;15>c;++c)b.i.b[c]=b.b[c];"undefined"!==typeof h&&0<=h&&Blocksgame.c.R(b.i,h);"undefined"!==typeof k&&0!=k&&Blocksgame.c.J(b.i,k);return b.i},T:function(b){b.x=b.i.x;b.y=
b.i.y;var c;for(c=0;15>c;++c)b.b[c]=b.i.b[c]},ya:function(b,c,d,h,k,a){a[0]=Math.round(Math.cos(b)*(c-h)-Math.sin(b)*(d-k)+h);a[1]=Math.round(Math.sin(b)*(c-h)+Math.cos(b)*(d-k)-k)},ha:function(b,c,d){var h=b.b;b.type=c;c>=Blocksgame.G.length/15&&(c=0);b=15*c;for(c=0;15>c;++c)h[c]=Blocksgame.G[b+c];for(c=3;15>c;c+=3)h[c+2]+=d},R:function(b){b=b.b;var c=b[0],d;for(d=3;15>d;d+=3)b[d]=-1*(b[d+0]-c)+1;b[0]+=1},J:function(b,c){var d=b.b,h=Math.PI/180*c*-90,k=[0,0],a;for(a=3;15>a;a+=3)Blocksgame.c.ya(h,
d[a],d[a+1],d[0],d[1],k),d[a]=k[0],d[a+1]=k[1]}}};
