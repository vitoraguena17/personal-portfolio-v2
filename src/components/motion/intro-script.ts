export const INTRO_KEY = "va-intro";

/**
 * Roda no início do <body>, antes da pintura. Marca .js e decide se a abertura
 * aparece: visita repetida na sessão ou movimento reduzido já entram com
 * .intro-done. Rede de segurança: se o React não hidratar em 6 s (bundle
 * bloqueado, extensão, erro), tira o .js e todo o conteúdo aparece sem animação.
 */
export const introScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('${INTRO_KEY}'))d.classList.add('intro-done')}catch(e){}if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('intro-done');setTimeout(function(){d.classList.add('intro-done')},4500);setTimeout(function(){if(!d.classList.contains('hydrated'))d.classList.remove('js')},6000)})()`;
