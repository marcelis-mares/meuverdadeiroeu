/* Medição do Meu Verdadeiro Eu: Google Analytics 4 (consent mode v2), Microsoft Clarity e aviso de cookies.
   GA conta visitas sem cookie até a pessoa aceitar; Clarity só carrega depois do aceite. */
(function(){
  var GA_ID = 'G-BKZRRRTMXD';
  var CLARITY_ID = 'z90jkeu2qf';            /* projeto Meu Verdadeiro Eu no Clarity */
  var CHAVE = 'mve_cookies';      /* 'sim' ou 'nao' */

  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ dataLayer.push(arguments); };
  gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
  gtag('js', new Date());
  gtag('config', GA_ID);
  var s=document.createElement('script'); s.async=true; s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID; document.head.appendChild(s);

  function ler(){ try { return localStorage.getItem(CHAVE); } catch(e){ return null; } }
  function gravar(v){ try { localStorage.setItem(CHAVE, v); } catch(e){} }

  function carregarClarity(){
    if (!CLARITY_ID || window.clarity) return;
    (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",CLARITY_ID);
  }
  function liberar(){ gtag('consent','update',{analytics_storage:'granted'}); carregarClarity(); }

  /* Evento padrão das páginas: window.maresEvento(nome, params) */
  window.maresEvento = function(nome, params){
    try { params = params || {}; params.pagina = 'meu-verdadeiro-eu'; gtag('event', nome, params); } catch(e){}
  };

  /* Cliques medidos sozinhos */
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href]'); if (!a) return;
    var h = a.getAttribute('href') || '', txt = (a.textContent||'').trim().slice(0,80);
    if (/wa\.me|api\.whatsapp\.com/.test(h)) window.maresEvento('clique_whatsapp',{botao:txt});
    else if (/eduzz\.com/.test(h)) window.maresEvento('clique_checkout',{botao:txt,destino:h});
    else if (/instagram\.com/.test(h)) window.maresEvento('clique_social',{rede:'instagram',botao:txt});
  }, true);

  function aviso(){
    var d=document.createElement('div'); d.id='mve-cookies'; d.setAttribute('role','dialog'); d.setAttribute('aria-label','Aviso de cookies');
    d.innerHTML='<p>Usamos cookies para entender como a página é usada e melhorar a sua experiência. Você escolhe.</p>'+
      '<div><button type="button" data-c="nao">Recusar</button><button type="button" data-c="sim">Aceitar</button></div>';
    var st=document.createElement('style');
    st.textContent='#mve-cookies{position:fixed;left:16px;right:16px;bottom:16px;max-width:520px;margin:0 auto;z-index:9999;background:#1E3D33;color:#F7F3EA;border-top:2px solid #C9A227;padding:16px 18px;font:400 15px/1.5 Jost,Lato,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.25);display:flex;gap:14px;align-items:center;flex-wrap:wrap}'+
      '#mve-cookies p{margin:0;flex:1 1 240px}#mve-cookies div{display:flex;gap:8px}'+
      '#mve-cookies button{font:500 13px Jost,Lato,sans-serif;letter-spacing:.12em;text-transform:uppercase;padding:10px 16px;cursor:pointer;border:1px solid #E8D9A6;background:transparent;color:#F7F3EA}'+
      '#mve-cookies button[data-c=sim]{background:#C9A227;border-color:#C9A227;color:#1E3D33}';
    document.head.appendChild(st); document.body.appendChild(d);
    d.addEventListener('click', function(e){ var c=e.target.getAttribute('data-c'); if(!c) return; gravar(c); if(c==='sim') liberar(); d.remove(); });
  }

  var escolha = ler();
  if (escolha === 'sim') liberar();
  else if (escolha !== 'nao') { if (document.body) aviso(); else document.addEventListener('DOMContentLoaded', aviso); }
})();
