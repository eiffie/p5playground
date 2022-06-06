class V1{//float
 static fract(a){return a<0.?1.-(a%1.):(a%1.);}
 static mod(a,b){return a<0.?b-(a%b):(a%b);}
 static clamp(a,b,c){return Math.min(c,Math.max(b,a));}
 static saturate(a){return V1.clamp(a,0.,1.);}
 static mix(a,b,c){return a*(1.-c)+b*c;}
 static smoothstep(a,b,c){let t=V1.saturate((c-a)/(b-a));return t*t*(3.-2.*t);}
 static step(a,b){return a>b?0.:1.;}
}
class V2{//vec2
 x=0.;y=0.;
 constructor(a,b){this.x=a;this.y=b;}
 static c(a){return new V2(a,a);}
 static add(a,b){return new V2(a.x+b.x,a.y+b.y);}
 static sub(a,b){return new V2(a.x-b.x,a.y-b.y);}
 static mul(a,b){return new V2(a.x*b.x,a.y*b.y);}
 static mlc(a,b){return new V2(a.x*b,a.y*b);}
 static div(a,b){return new V2(a.x/b.x,a.y/b.y);}
 static cpy(a,b){a.x=b.x;a.y=b.y;}
 static fnc(a,f){return new V2(f(a.x),f(a.y));}
 static rot(b,a){let ca=Math.cos(a),sa=Math.sin(a);return new V2(ca*b.x+sa*b.y,ca*b.y-sa*b.x);}
 static dot(a,b){return b.x*a.x+b.y*a.y;}
 static nrm(a){let m=a.mag();if(m==0.)a.x=m=1.;return V2.mlc(a,1./m);}
 add(a){this.x+=a.x;this.y+=a.y;}
 sub(a){this.x-=a.x;this.y-=a.y;}
 mul(a){this.x*=a.x;this.y*=a.y;}
 mlc(a){this.x*=a;this.y*=a;}
 div(a){this.x/=a.x;this.y/=a.y;}
 fnc(f){this.x=f(this.x);this.y=f(this.y);}
 mag(){return Math.sqrt(this.x*this.x+this.y*this.y);}
 cln(){return new V2(this.x,this.y);}
 yx(){return new V2(this.y,this.x);}
 nrm(){let m=this.mag();if(m==0.)this.x=m=1.;this.mlc(1./m);}
 rfl(N){let h=2.*V2.dot(this,N);this.add(V2.mlc(N,-h));}
}
class V3{//vec3
 x=0.;y=0.;z=0.;
 constructor(a,b,c){this.x=a;this.y=b;this.z=c;}
 static c(a){return new V3(a,a,a);}
 static v2c(a,b){return new V3(a.x,a.y,b);}
 static add(a,b){return new V3(a.x+b.x,a.y+b.y,a.z+b.z);}
 static sub(a,b){return new V3(a.x-b.x,a.y-b.y,a.z-b.z);}
 static mul(a,b){return new V3(a.x*b.x,a.y*b.y,a.z*b.z);}
 static mlc(a,b){return new V3(a.x*b,a.y*b,a.z*b);}
 static div(a,b){return new V3(a.x/b.x,a.y/b.y,a.z/b.z);}
 static cpy(a,b){a.x=b.x;a.y=b.y;a.z=b.z;}
 static fnc(a,f){return new V3(f(a.x),f(a.y),f(a.z));}
 static dot(a,b){return b.x*a.x+b.y*a.y+b.z*a.z;}
 static crs(a,b){return new V3(a.y*b.z-a.z*b.y,a.z*b.x-a.x*b.z,a.x*b.y-a.y*b.x);}
 static nrm(a){let m=a.mag();if(m==0.)a.x=m=1.;return V3.mlc(a,1./m);}
 add(a){this.x+=a.x;this.y+=a.y;this.z+=a.z;}
 sub(a){this.x-=a.x;this.y-=a.y;this.z-=a.z;}
 mul(a){this.x*=a.x;this.y*=a.y;this.z*=a.z;}
 mlc(a){this.x*=a;this.y*=a;this.z*=a;}
 div(a){this.x/=a.x;this.y/=a.y;this.z/=a.z;}
 fnc(f){this.x=f(this.x);this.y=f(this.y);this.z=f(this.z);}
 mag(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);}
 cln(){return new V3(this.x,this.y,this.z);}
 swz(i,j,k){let a=Object.values(this);return new V3(a[i],a[j],a[k]);}
 rdc(i,j){let a=Object.values(this);return new V2(a[i],a[j]);}
 nrm(){let m=this.mag();if(m==0.)this.x=m=1.;this.mlc(1./m);}
 rfl(N){let h=2.*V3.dot(this,N);this.add(V3.mlc(N,-h));}
 iV2(b){this.x=b.x;this.y=b.y;}
}
class V4{//vec4
 x=0.;y=0.;z=0.;w=0.;
 constructor(a,b,c,d){this.x=a;this.y=b;this.z=c;this.w=d;}
 static c(a){return new V4(a,a,a,a);}
 static v3c(a,b){return new V4(a.x,a.y,a.z,b);}
 static add(a,b){return new V4(a.x+b.x,a.y+b.y,a.z+b.z,a.w+b.w);}
 static sub(a,b){return new V4(a.x-b.x,a.y-b.y,a.z-b.z,a.w-b.w);}
 static mul(a,b){return new V4(a.x*b.x,a.y*b.y,a.z*b.z,a.w*b.w);}
 static mlc(a,b){return new V4(a.x*b,a.y*b,a.z*b,a.w*b);}
 static div(a,b){return new V4(a.x/b.x,a.y/b.y,a.z/b.z,a.w/b.w);}
 static cpy(a,b){a.x=b.x;a.y=b.y;a.z=b.z;a.w=b.w;}
 static fnc(a,f){return new V4(f(a.x),f(a.y),f(a.z),f(a.w));}
 static dot(a,b){return b.x*a.x+b.y*a.y+b.z*a.z+a.w*b.w;}
 static nrm(a){let m=a.mag();if(m==0.)a.x=m=1.;return V4.mlc(a,1./m);}
 add(a){this.x+=a.x;this.y+=a.y;this.z+=a.z;this.w+=a.w;}
 sub(a){this.x-=a.x;this.y-=a.y;this.z-=a.z;this.w-=a.w;}
 mul(a){this.x*=a.x;this.y*=a.y;this.z*=a.z;this.w*=a.w;}
 mlc(a){this.x*=a;this.y*=a;this.z*=a;this.w*=a;}
 div(a){this.x/=a.x;this.y/=a.y;this.z/=a.z;this.w/=a.w;}
 fnc(f){this.x=f(this.x);this.y=f(this.y);this.z=f(this.z);this.w=f(this.w);}
 mag(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);}
 cln(){return new V4(this.x,this.y,this.z,this.w);}
 swz(i,j,k,l){let a=Object.values(this);return new V4(a[i],a[j],a[k],a[l]);}
 nrm(){let m=this.mag();if(m==0.)this.x=m=1.;this.mlc(1./m);}
 rfl(N){let h=2.*V4.dot(this,N);this.add(V4.mlc(N,-h));}
 rdc(i,j,k){let a=Object.values(this);return new V3(a[i],a[j],a[k]);}
 rd2(i,j){let a=Object.values(this);return new V2(a[i],a[j]);}
 iV2(a){this.x=a.x;this.y=a.y;}
 iV3(a){this.x=a.x;this.y=a.y;this.z=a.z;}
 static QmulQ(a,b){let t=V3.add(V3.mlc(a,b.w),V3.add(V3.mlc(b,a.w),V3.crs(a,b)));
  return new V4(t.x,t.y,t.z,a.w*b.w-V3.dot(a,b));}
 static Qinv(a){let d=1./V4.dot(a,a),t=V3.mlc(a,-d);return new V4(t.x,t.y,t.z,a.w*d);}
 static QmulV(a,b){let qi=V4.Qinv(a),q2=V3.add(V3.crs(b,qi),V3.mlc(b,qi.w)),q=V3.mlc(a,-dot(b,qi));
  return V3.add(q,V3.add(V3.mlc(q2,a.w),V3.crs(q,q2)));}
 static Qaxa(b,a){let c=V3.mlc(b,Math.sin(a*.5)/V3.mag(b));return new V4(c.x,c.y,c.z,Math.cos(a*.5));}
 static Qface(a){return V4.Qaxa(new V3(-a.y,a.x,0.),Math.acos(a.z/V3.mag(a)));}
 static Qpyr(a){let o=V3.mlc(a,.5),s=V3.fnc(o,Math.sin),c=V3.fnc(o,Math.cos);
 return new V4(s.x*c.y*c.z+s.y*c.x*s.z, s.y*c.x*c.z-s.x*c.y*s.z, s.x*s.y*c.z+s.z*c.x*c.y, c.x*c.y*c.z-s.x*s.y*s.z);}
}
function A(a){//a=[{samps:24000,fill:ampk},{...}] 1 object for each sound effect
 A.AC=null;   //required: samps=samples in buffer, ampk(k) is called for each sample k
 if(!a)return;//optional: sampleRate:# is rate of recording, echo:# adds ampk(k-#)/2
 A.buf=new Array(a.length);
 try{A.AC=new (window.AudioContext || window.webkitAudioContext)();}
 catch(error){window.alert("No WebAudioAPI support. "+error);return;}
 for(let i=0;i<a.length;i++){
  if(!a[i].samps || ! a[i].fill)alert("audio config error missing samps and/or fill");
  if(!a[i].sampleRate)a[i].sampleRate=A.AC.sampleRate;
  A.buf[i]=A.AC.createBuffer(1,a[i].samps,a[i].sampleRate);
  if(!A.buf[i])alert("failed to create audio buffer, perform sanity check on samps and rate options");
  var cd=A.buf[i].getChannelData(0);
  for(let k=0;k<a[i].samps;k++){cd[k]=a[i].fill(k);if(a[i].echo)if(k>a[i].echo)cd[k]+=cd[k-a[i].echo]*.5;}
 }
}//O defaults {randomize:false,rate:1,gain:1,pan:0,detune:0,loop:false,startTime:0}
function plAy(n,O){if(!A.AC){console.log("A.AC does not exist");return;}
  let src=A.AC.createBufferSource();//O is optional and can be null or {}, don't use false just leave out
  src.buffer=A.buf[n];
  var R={source:src},output=A.AC.destination,st=0;
  if(O){
    if(O.gain){
      var gn=A.AC.createGain();
      gn.connect(output);output=gn;
      gn.gain.value=O.gain;
      R.gain=gn;
    }if(O.pan){
      var pn=O.pan=="3D"?A.AC.createPanner():A.AC.createStereoPanner();
      pn.connect(output);output=pn;
      if(O.pan!="3D")pn.pan.value=O.pan;
      R.pan=pn;
    }if(O.randomize)src.playbackRate.setValueAtTime(1.+Math.random()*.1,0);
    if(O.rate)src.playbackRate.setValueAtTime(O.rate,0);
    if(O.detune)src.detune.setValueAtTime(O.detune,0);
    if(O.loop)src.loop=true;
    if(O.startTime)st=O.startTime;
  }src.connect(output);src.start(st);return R;
}
function G(C,F,O){//O={fboScript:'',onFrame:null,wrap:CLAMP,magFilter:NEAREST,minFilter:NEAREST}
 G.u={res:V2.c(0.),time:0.,user:0.,key:0.,mouse:V3.c(0.)};//{uniform:{key:value,...}}
 G.LEFT_ARROW=37;G.RIGHT_ARROW=39;G.UP_ARROW=38;G.DOWN_ARROW=40;G.LINEAR=9729;G.REPEAT=10497;
 function getShader(src, typ){//{returnPixels:#} fbo pixels 0,0 thru #,0 are placed in G.r[0..4*#] float array
  var shader=G.gl.createShader(typ);//O can be null or {}, if onFrame:frame frame() is called after draw
  G.gl.shaderSource(shader,src);
  G.gl.compileShader(shader);
  if(!G.gl.getShaderParameter(shader,G.gl.COMPILE_STATUS))alert(G.gl.getShaderInfoLog(shader));
  return shader;
 }
 function script2Prog(F){
  const VS="attribute vec3 position;void main(void){gl_Position=vec4(position,1.0);}";
  var FS=F.length<255?document.getElementById(F).textContent:F;
  var fs=getShader(FS,G.gl.FRAGMENT_SHADER);
  var vs=getShader(VS,G.gl.VERTEX_SHADER);
  var P=G.gl.createProgram();
  G.gl.attachShader(P,vs);
  G.gl.attachShader(P,fs);
  G.gl.linkProgram(P);
  if(!G.gl.getProgramParameter(P,G.gl.LINK_STATUS))alert("Could not initialise shader "+F);
  G.gl.useProgram(P);
  P.vertexPositionAttribute=G.gl.getAttribLocation(P,"position");
  G.gl.enableVertexAttribArray(P.vertexPositionAttribute);
  G.gl.vertexAttribPointer(P.vertexPositionAttribute, G.VP.itemSize, G.gl.FLOAT, false, 0, 0);
  return P;
 }
 if(!O)O={};
 if(O.onFrame)G.onFrame=O.onFrame;
 G.buf=G.st=G.pt=0;
 G.c=document.getElementById(C);
 G.gl=G.c.getContext("webgl", { antialias: false, depth: false, alpha: false } );
 G.gl.getExtension('OES_texture_float');
 G.u.res.x=G.gl.viewportWidth=G.c.width;
 G.u.res.y=G.gl.viewportHeight=G.c.height;
 if(O.returnPixels){
  let px=Math.min(O.returnPixels,G.c.width)*(1+Math.floor(O.returnPixels/G.c.width-.5));
  if(!O.fboScript)alert("returnPixels will be ignored, no fboScript option");
  else {G.returnPixels=O.returnPixels;G.r=new Float32Array(px*4);}
 }
 G.VP=G.gl.createBuffer();
 G.gl.bindBuffer(G.gl.ARRAY_BUFFER, G.VP);
 var vertices = [1.0,  1.0,  0.0, -1.0,  1.0,  0.0, 1.0, -1.0,  0.0, -1.0, -1.0,  0.0];
 G.gl.bufferData(G.gl.ARRAY_BUFFER,new Float32Array(vertices),G.gl.STATIC_DRAW);
 G.VP.itemSize = 3;
 G.VP.numItems = 4;
 G.P=script2Prog(F);
 if(O.uniform)G.u={...G.u, ...O.uniform};
 let k=Object.keys(G.u);
 let v=Object.values(G.u);
 G.ui=new Array(k.length);
 G.uv=new Array(k.length);
 let sE1="unable to pass uniform ",sE2="missing/unused uniform ";
 for(let i=0;i<k.length;i++){
  let t=typeof(v[i]);
  if(t.localeCompare("number")==0)G.uv[i]=1;
  else if(t.localeCompare("object")==0){
   if(Array.isArray(v[i])){
    t=typeof(v[i][0]);
    if(t.localeCompare("number")==0)G.uv[i]=0;
    else alert(sE1+k[i]+" an array of "+t+". Only float arrays are allowed.");
   }else{//a class
    t=v[i].constructor.name;
    if(t.localeCompare("V2")==0)G.uv[i]=2;
    else if(t.localeCompare("V3")==0)G.uv[i]=3;
    else if(t.localeCompare("V4")==0)G.uv[i]=4;
    else alert(sE1+k[i]+" of type "+t+". Only V2,V3,V4 are recognized objects.");
   }
  }else alert(sE1+k[i]+" of type "+t);
  G.ui[i]=G.gl.getUniformLocation(G.P,k[i]);
  if(!G.ui[i])console.log(sE2+k[i]+" in canvas shader");
 }
 if(O.fboScript){
  G.ufbo=G.gl.getUniformLocation(G.P,"fbo");if(!G.ufbo)console.log(sE2+"sampler2D fbo; in screen shader");
  G.PA=script2Prog(O.fboScript);
  G.uiA=new Array(k.length);
  for(let i=0;i<k.length;i++){
   G.uiA[i]=G.gl.getUniformLocation(G.PA,k[i]);
   if(!G.uiA[i])console.log(sE2+k[i]+" in fbo shader");
  }
  G.ufboA=G.gl.getUniformLocation(G.PA,"fbo");if(!G.ufboA)console.log(sE2+"sampler2D fbo; in fbo shader");
 }
 if(G.PA){
  G.tx=new Array(2);
  G.fbo=new Array(2);
  for(let i=0;i<2;i++){
   G.tx[i]=G.gl.createTexture();
   G.gl.bindTexture(G.gl.TEXTURE_2D,G.tx[i]);
   G.gl.texImage2D(G.gl.TEXTURE_2D,0,G.gl.RGBA,G.c.width,G.c.height,0,G.gl.RGBA,G.gl.FLOAT,null);
   G.gl.texParameteri(G.gl.TEXTURE_2D,G.gl.TEXTURE_MAG_FILTER,O.magFilter?O.magFilter:G.gl.NEAREST);
   G.gl.texParameteri(G.gl.TEXTURE_2D,G.gl.TEXTURE_MIN_FILTER,O.minFilter?O.minFilter:G.gl.NEAREST);
   G.gl.texParameteri(G.gl.TEXTURE_2D,G.gl.TEXTURE_WRAP_S,O.wrap?O.wrap:G.gl.CLAMP_TO_EDGE);
   G.gl.texParameteri(G.gl.TEXTURE_2D,G.gl.TEXTURE_WRAP_T,O.wrap?O.wrap:G.gl.CLAMP_TO_EDGE);
   G.fbo[i]=G.gl.createFramebuffer();
   G.gl.bindFramebuffer(G.gl.FRAMEBUFFER,G.fbo[i]);
   G.fbo[i].width=G.c.width;G.fbo[i].height=G.c.height;
   G.gl.framebufferTexture2D(G.gl.FRAMEBUFFER,G.gl.COLOR_ATTACHMENT0,G.gl.TEXTURE_2D,G.tx[i],0);
  }
 }
 G.gl.clearColor(0.,0.,0.,1.);
 if(!window.requestAnimationFrame){
  window.requestAnimationFrame=(function(){
   return window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback,element){window.setTimeout(callback,G.fpsSecs);};})();
 }
 G.c.addEventListener('mousedown',mouseDown,false);
 G.c.addEventListener('mouseup',mouseUp,false);
 G.c.addEventListener('mousemove',mouseMove,false);
 document.addEventListener('keydown',keyDown,false);
 document.addEventListener('keyup',keyUp,false);
 G.now=window.performance.now?function(){return window.performance.now();}:function(){return Date.now;};
 if(O.fps){G.fpsMs=1000/O.fps;G.clock=G.now()-1;}
 G.paused=true;togglePause();
 _animate();
}
function togglePause(){//if called do this-->onFrame(){if(G.paused)return;
  if(G.paused){G.st=G.now()-G.pt;_pauseAnim();G.paused=false;if(A.AC)A.AC.resume();}
  else {_pauseAnim();if(A.AC)A.AC.suspend();}
}
function fullScreen(el){//browser handles reverse on Esc
 if( el.requestFullscreen ) el.requestFullscreen();
 else if( el.msRequestFullscreen ) el.msRequestFullscreen();
 else if( el.mozRequestFullScreen ) el.mozRequestFullScreen();
 else if( el.webkitRequestFullscreen ) el.webkitRequestFullscreen( Element.ALLOW_KEYBOARD_INPUT );
}//DO NOT CALL UNDERSCORED FUNCTIONS
function _pauseAnim(){G.paused=true;G.pt=G.now()-G.st;}
function _animate(){requestAnimationFrame(_animate);
  if(G.fpsMs){var n=G.now();if(n<G.clock)return;G.clock+=G.fpsMs-(n%G.fpsMs);}
  if(!G.paused)_draw();else if(G.onFrame)G.onFrame();}
function _draw(){
  function drawquad(){
   G.gl.clear(G.gl.COLOR_BUFFER_BIT);
   G.gl.drawArrays(G.gl.TRIANGLE_STRIP,0,G.VP.numItems);}
  G.u.time=(G.now()-G.st)/1000.0;
  if(G.onFrame)G.onFrame();
  let v=Object.values(G.u);
  if(G.PA){
   G.gl.activeTexture(G.gl.TEXTURE0);
   G.gl.bindTexture(G.gl.TEXTURE_2D,G.tx[G.buf]);
   G.buf=1-G.buf;
   G.gl.bindFramebuffer(G.gl.FRAMEBUFFER,G.fbo[G.buf]);
   G.gl.useProgram(G.PA);
   for(let i=0;i<G.ui.length;i++)if(G.uiA[i])
    if(G.uv[i]==0)G.gl.uniform1fv(G.uiA[i],v[i]);
    else if(G.uv[i]==1)G.gl.uniform1f(G.uiA[i],v[i]);
    else if(G.uv[i]==2)G.gl.uniform2f(G.uiA[i],v[i].x,v[i].y);
    else if(G.uv[i]==3)G.gl.uniform3f(G.uiA[i],v[i].x,v[i].y,v[i].z);
    else G.gl.uniform4f(G.uiA[i],v[i].x,v[i].y,v[i].z,v[i].w);
   G.gl.uniform1i(G.ufboA,0);
   drawquad();
   if(G.returnPixels){G.gl.flush();G.gl.readPixels(0,0,Math.min(G.returnPixels,G.u.res.x),1+Math.floor(G.returnPixels/G.u.res.x-.5),G.gl.RGBA,G.gl.FLOAT,G.r);}
   G.gl.bindFramebuffer(G.gl.FRAMEBUFFER,null);}
  G.gl.useProgram(G.P);
  for(let i=0;i<G.ui.length;i++)if(G.ui[i])
   if(G.uv[i]==0)G.gl.uniform1fv(G.ui[i],v[i]);
    else if(G.uv[i]==1)G.gl.uniform1f(G.ui[i],v[i]);
    else if(G.uv[i]==2)G.gl.uniform2f(G.ui[i],v[i].x,v[i].y);
    else if(G.uv[i]==3)G.gl.uniform3f(G.ui[i],v[i].x,v[i].y,v[i].z);
    else G.gl.uniform4f(G.ui[i],v[i].x,v[i].y,v[i].z,v[i].w);
  if(G.ufbo){
    G.gl.uniform1i(G.ufbo,0);
    G.gl.activeTexture(G.gl.TEXTURE0);
    if(G.PA)G.gl.bindTexture(G.gl.TEXTURE_2D,G.tx[G.buf]);}
  drawquad();
}//replace these event callbacks if needed
function mouseDown(e){G.u.mouse.z=1.0;}
function mouseUp(e){G.u.mouse.z=0.0;}
function mouseMove(e){var rect=G.c.getBoundingClientRect();
G.u.mouse.x=(e.clientX-rect.left)/rect.width;G.u.mouse.y=1.-(e.clientY-rect.top)/rect.height;}
function keyDown(e){G.u.key=e.keyCode;if(e.keyCode>=32 && e.keyCode<=40)e.preventDefault();}
function keyUp(e){if(G.u.key==e.keyCode)G.u.key=0.0;}
