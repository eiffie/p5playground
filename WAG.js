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
}//O defaults {randomize:false,rate:1,volume:1,detune:0,loop:false,startTime:0}
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
function G(C,F,O,U){//O={fboScript:'',onFrame:null,wrap:CLAMP,magFilter:NEAREST,minFilter:NEAREST}
 G.u={width:0.,height:0.,time:0.,user:0.,key:0.,mousex:0.,mousey:0.,mousedown:0.};
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
  var FS=document.getElementById(F).textContent;
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
 if(U)G.U=U;
 if(O.onFrame)G.onFrame=O.onFrame;
 G.buf=G.st=G.pt=0;
 G.c=document.getElementById(C);
 if(O.returnPixels){
  if(!O.fboScript)alert("returnPixels will be ignored, no fboScript option");
  else {G.returnPixels=O.returnPixels;G.r=new Float32Array(O.returnPixels*4);}
 }
 G.gl=G.c.getContext("webgl", { antialias: false, depth: false, alpha: false } );
 G.gl.getExtension('OES_texture_float');
 G.gl.viewportWidth=G.u.width=G.c.width;
 G.gl.viewportHeight=G.u.height=G.c.height;
 G.VP=G.gl.createBuffer();
 G.gl.bindBuffer(G.gl.ARRAY_BUFFER, G.VP);
 var vertices = [1.0,  1.0,  0.0, -1.0,  1.0,  0.0, 1.0, -1.0,  0.0, -1.0, -1.0,  0.0];
 G.gl.bufferData(G.gl.ARRAY_BUFFER,new Float32Array(vertices),G.gl.STATIC_DRAW);
 G.VP.itemSize = 3;
 G.VP.numItems = 4;
 G.P=script2Prog(F);
 var s=": missing uniform float[] ";
 G.uni=G.gl.getUniformLocation(G.P,"u");if(!G.uni)alert("0"+s+"u");
 if(G.U){G.Uni=G.gl.getUniformLocation(G.P,"U");if(!G.Uni)alert("0"+s+"U");}
 if(O.fboScript){
  G.ufbo=G.gl.getUniformLocation(G.P,"fbo");if(!G.ufbo)alert("missing uniform sampler2D fbo; in screen shader");
  G.PA=script2Prog(O.fboScript);
  G.uniA=G.gl.getUniformLocation(G.PA,"u");if(!G.uniA)alert("1"+s+"u");
  if(G.U){G.UniA=G.gl.getUniformLocation(G.PA,"U");if(!G.UniA)alert("1"+s+"U");}
  G.ufboA=G.gl.getUniformLocation(G.PA,"fbo");
 }
 if(G.PA){
  G.tx=new Array(2);
  G.fbo=new Array(2);
  for(let i=0;i<2;i++){
   G.tx[i]=G.gl.createTexture();
   G.gl.bindTexture(G.gl.TEXTURE_2D,G.tx[i]);
   G.gl.texImage2D(G.gl.TEXTURE_2D,0,G.gl.RGBA,G.u.width,G.u.height,0,G.gl.RGBA,G.gl.FLOAT,null);
   G.gl.texParameteri(G.gl.TEXTURE_2D,G.gl.TEXTURE_MAG_FILTER,O.magFilter?O.magFilter:G.gl.NEAREST);
   G.gl.texParameteri(G.gl.TEXTURE_2D,G.gl.TEXTURE_MIN_FILTER,O.minFilter?O.minFilter:G.gl.NEAREST);
   G.gl.texParameteri(G.gl.TEXTURE_2D,G.gl.TEXTURE_WRAP_S,O.wrap?O.wrap:G.gl.CLAMP_TO_EDGE);
   G.gl.texParameteri(G.gl.TEXTURE_2D,G.gl.TEXTURE_WRAP_T,O.wrap?O.wrap:G.gl.CLAMP_TO_EDGE);
   G.fbo[i]=G.gl.createFramebuffer();
   G.gl.bindFramebuffer(G.gl.FRAMEBUFFER,G.fbo[i]);
   G.fbo[i].width=G.u.width;G.fbo[i].height=G.u.height;
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
  var u=Object.values(G.u);
  var u2=null;if(G.U){if(Array.isArray(G.U))u2=G.U;else u2=Object.values(G.U);}
  if(G.PA){
   G.gl.activeTexture(G.gl.TEXTURE0);
   G.gl.bindTexture(G.gl.TEXTURE_2D,G.tx[G.buf]);
   G.buf=1-G.buf;
   G.gl.bindFramebuffer(G.gl.FRAMEBUFFER,G.fbo[G.buf]);
   G.gl.useProgram(G.PA);
   G.gl.uniform1fv(G.uniA,u);
   if(u2)G.gl.uniform1fv(G.UniA,u2);
   G.gl.uniform1i(G.ufboA,0);
   drawquad();
   if(G.returnPixels){G.gl.flush();G.gl.readPixels(0,0,G.returnPixels,1,G.gl.RGBA,G.gl.FLOAT,G.r);}
   G.gl.bindFramebuffer(G.gl.FRAMEBUFFER,null);}
  G.gl.useProgram(G.P);
  G.gl.uniform1fv(G.uni,u);
  if(u2)G.gl.uniform1fv(G.Uni,u2);
  if(G.ufbo){
    G.gl.uniform1i(G.ufbo,0);
    G.gl.activeTexture(G.gl.TEXTURE0);
    if(G.PA)G.gl.bindTexture(G.gl.TEXTURE_2D,G.tx[G.buf]);}
  drawquad();
}//replace these event callbacks if needed
function mouseDown(e){G.u.mousedown=1.0;}
function mouseUp(e){G.u.mousedown=0.0;}
function mouseMove(e){var rect=G.c.getBoundingClientRect();
G.u.mousex=(e.clientX-rect.left)/rect.width;G.u.mousey=1.-(e.clientY-rect.top)/rect.height;}
function keyDown(e){G.u.key=e.keyCode;if(e.keyCode>=32 && e.keyCode<=40)e.preventDefault();}
function keyUp(e){if(G.u.key==e.keyCode)G.u.key=0.0;}
