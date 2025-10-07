// tracking.js (100% Completo para a base de rastreamento)

document.addEventListener('DOMContentLoaded', function() {
    // Localize o botão fixo do WhatsApp
    const ctaFixo = document.getElementById('ctaFixo'); 

    if (ctaFixo) {
        ctaFixo.addEventListener('click', function() {
            
            // 1. Envia o evento de conversão para o GOOGLE ADS/GA4
            if (typeof gtag === 'function') { 
                gtag('event', 'clique_whatsapp', {
                    'event_category': 'contato',
                    'event_label': 'cta_fixo',
                    'value': 1 
                });
            }

            // 2. Envia o evento de conversão para o META PIXEL (Facebook/Instagram)
            if (typeof fbq === 'function') { 
                fbq('track', 'Contact'); 
            }
            
            console.log("Conversão: Evento 'clique_whatsapp' disparado.");
        });
    }
});
