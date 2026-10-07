/**
 * Marque-page « Capter les annonces ».
 *
 * L'utilisateur le glisse dans sa barre de favoris, ouvre SA page de résultats
 * Leboncoin, et clique dessus. Le code ci-dessous s'exécute dans la page déjà
 * affichée : il lit les annonces visibles et les copie dans le presse-papiers,
 * au même format que l'extension. L'utilisateur les colle ensuite dans Terouva.
 *
 * Même posture que l'extension, en moins automatique : aucune requête vers
 * Leboncoin, aucune navigation déclenchée, rien d'observé en continu. C'est la
 * personne qui ouvre la page et qui clique.
 */

/** Code du marque-page, écrit en ES5 compact (il vit dans une URL `javascript:`). */
const SOURCE = `(function(){
try{
var SEL="a[href^='/ad/'],a[href*='/itemId-'],a[data-test-id='ad']";
var A=[].slice.call(document.querySelectorAll(SEL));
var seen={},items=[];
function n(v){var x=parseInt(String(v).replace(/[^0-9]/g,''),10);return isNaN(x)?null:x}
function fresh(raw){var t=String(raw||'').toLowerCase(),now=Date.now(),m;
if(/à l'instant|quelques secondes/.test(t))return new Date(now).toISOString();
if((m=t.match(/il y a (\\d+)\\s*min/)))return new Date(now-m[1]*60000).toISOString();
if((m=t.match(/il y a (?:environ )?(\\d+)\\s*(?:h|heure)/)))return new Date(now-m[1]*3600000).toISOString();
if((m=t.match(/aujourd'hui[,\\s]*(\\d{1,2})[:h](\\d{2})/))){var d=new Date();d.setHours(+m[1],+m[2],0,0);return d.toISOString()}
if(/(?:^|[^a-z0-9])hier(?:[^a-z0-9]|$)/.test(t))return new Date(now-86400000).toISOString();
if((m=t.match(/il y a (\\d+)\\s*jour/)))return new Date(now-m[1]*86400000).toISOString();
return null}
A.forEach(function(a){
var h=a.getAttribute('href')||'';if(!h)return;
var u;try{u=new URL(h,location.origin).toString().split('#')[0].split('?')[0]}catch(e){return}
var m=h.match(/itemId-(\\d+)|\\/ad\\/[a-z0-9_-]+\\/(\\d+)/i);var id=m?(m[1]||m[2]):null;
var k=id||u;if(seen[k])return;seen[k]=1;
var t=(a.innerText||a.textContent||'').replace(/\\s+/g,' ').trim();
var p=t.match(/([0-9][0-9 \\u00a0\\u202f]*)\\s*€/);
var s=t.match(/(\\d+)\\s*m²/);
var r=t.match(/(\\d+)\\s*pi[eè]ce/i);
var pc=t.match(/(?:^|[^\\d])(\\d{5})(?!\\d)/);
var te=a.querySelector("[data-test-id='adcard-title']")||a.querySelector("p[role='heading']")||a.querySelector('p');
var im=a.querySelector('img');var src=im&&(im.getAttribute('src')||im.getAttribute('data-src'));
items.push({url:u,external_id:id,title:((te?te.textContent:t)||'').replace(/\\s+/g,' ').trim().slice(0,200)||null,
price:p?n(p[1]):null,surface:s?n(s[1]):null,rooms:r?n(r[1]):null,city:null,postal_code:pc?pc[1]:null,
furnished:null,property_type:null,description:null,images:src?[src]:[],publisher_name:null,publisher_type:null,
published_at:fresh(t)})});
if(!items.length){alert("Terouva : aucune annonce sur cette page.\\n\\nOuvrez une page de résultats Leboncoin, puis recliquez sur le marque-page.");return}
var payload=JSON.stringify({app:'terouva',type:'listing-batch',version:1,captured_at:new Date().toISOString(),source_url:location.href,items:items});
var msg="Terouva : "+items.length+" annonce(s) copiée(s).\\n\\nRetournez dans Terouva et collez avec Ctrl+V (Cmd+V sur Mac).";
function ok(){alert(msg)}
function old(){var ta=document.createElement('textarea');ta.value=payload;ta.style.position='fixed';ta.style.opacity='0';
document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch(e){}document.body.removeChild(ta);ok()}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(payload).then(ok,old)}else{old()}
}catch(e){alert('Terouva : '+(e&&e.message?e.message:e))}
})()`;

/**
 * URL `javascript:` du marque-page. À poser avec `setAttribute("href", …)` :
 * React refuse ce type de lien s'il est passé par la propriété `href`.
 */
export function bookmarkletHref(): string {
  return "javascript:" + encodeURIComponent(SOURCE.replace(/\n/g, ""));
}
