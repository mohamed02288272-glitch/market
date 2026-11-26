/* fast.js v2 — يشيل شاشة اللوجو التانية، يسرّع الرسم، ويحدّث الصفحة لما ترفع نسخة جديدة */
(function(){
 var s=document.createElement('style');
 s.textContent='#sp0{display:none!important}';
 document.head.appendChild(s);

 document.addEventListener('DOMContentLoaded',function(){
  var o=window.rp,t=0;
  if(typeof o!=='function')return;
  window.rp=function(){
   if(t)return;
   t=requestAnimationFrame(function(){t=0;o()});
  };
 });

 /* لما يوصل تحديث جديد للموقع يتحمّل لوحده (مرة كل 30 ثانية كحد أقصى، ومش وأنت بتعدّل) */
 if('serviceWorker' in navigator){
  navigator.serviceWorker.addEventListener('message',function(e){
   if(!e.data||!e.data.u)return;
   var n=Date.now(),l=+(sessionStorage.getItem('sam_rl')||0);
   if(n-l<30000)return;
   var w=setInterval(function(){
    var ov=document.getElementById('ov');
    if(ov&&ov.classList.contains('on'))return;
    clearInterval(w);
    sessionStorage.setItem('sam_rl',Date.now());
    location.reload();
   },1500);
  });
 }
})();
