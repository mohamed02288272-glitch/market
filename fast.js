/* fast.js v3 — يشيل شاشة اللوجو التانية، يسرّع الرسم، ويحدّث الصفحة لما ترفع نسخة جديدة */
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

 /* زر "الكل": يمسح اللي مكتوب في البحث ويعرض كل المنتجات */
 document.addEventListener('DOMContentLoaded',function(){
  var p=window.pc;
  if(typeof p!=='function')return;
  window.pc=function(k){
   if(k==='all'){
    q='';
    var i=document.getElementById('q');
    if(i)i.value='';
   }
   p(k);
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
