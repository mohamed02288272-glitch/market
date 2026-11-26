/* patch2.js — الهيدر صغير فوق + الآية + انوسه + عناوين أصغر */
(function(){
var st=document.createElement('style');
st.textContent=
'.w{padding-top:4px}'+
'.hd{padding:3px 8px;border-radius:12px;gap:7px}'+
'.logo{width:32px;height:32px;border-radius:9px}'+
'.hd h1{font-size:12px}.live{font-size:8px}'+
'.ic{width:26px;height:26px;font-size:13px;border-radius:8px}'+
'.bless{margin:4px 0 0!important;gap:8px!important}'+
'.bt{font-size:clamp(22px,7vw,30px)!important;line-height:1.5!important}'+
'.anosa{text-align:center;margin:0 0 4px;line-height:1.4}'+
'.anosa .at{font-family:"Lalezar","Cairo",sans-serif;font-weight:800;font-size:clamp(24px,8vw,34px);background:linear-gradient(100deg,#d6336c,#9c36b5 35%,#e8590c 70%,#d6336c);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:ans 4s ease-in-out infinite;filter:drop-shadow(0 2px 2px rgba(0,0,0,.25))}'+
'.anosa .ae{font-size:clamp(24px,8vw,32px);-webkit-text-fill-color:initial;display:inline-block;animation:anw 1.6s ease-in-out infinite}'+
'@keyframes ans{0%,100%{background-position:100% 0}50%{background-position:0 0}}'+
'@keyframes anw{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}'+
'@media(prefers-reduced-motion:reduce){.anosa .at,.anosa .ae{animation:none}}'+
'#vp .tr{margin-top:4px}#vp h2.t{font-size:14px}'+
'#cnt{font-size:10px;margin:0 0 3px}'+
'.addb{font-size:13px;padding:7px 14px}';
document.head.appendChild(st);
var fl=document.createElement('link');fl.rel='stylesheet';fl.href='https://fonts.googleapis.com/css2?family=Lalezar&display=swap';document.head.appendChild(fl);
var hd=document.querySelector('.w .hd');if(!hd)return;
var bl=document.querySelector('.bless');
if(bl)hd.parentNode.insertBefore(bl,hd.nextSibling);
var an=document.createElement('div');an.className='anosa';
an.innerHTML='<span class="at">انوسه رقم واحد</span> <span class="ae">😂</span>';
var ref=bl||hd;ref.parentNode.insertBefore(an,ref.nextSibling);
})();
