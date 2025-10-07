// tracking.js (Rastreamento de Conversão para CTA Fixo no WhatsApp)

document.addEventListener('DOMContentLoaded', function() {
    // Localiza o botão fixo do WhatsApp pelo ID atualizado no HTML
    const ctaFixo = document.getElementById('cta-fixo-agendar'); 

    if (ctaFixo) {
        ctaFixo.addEventListener('click', function() {
            
            // Log de Console para confirmar o disparo
            console.log("Conversão: Evento 'clique_whatsapp' disparado.");
            
            // 1. Envia o evento de conversão para o GOOGLE ADS/GA4
            // Verifica se a função gtag está definida (necessário para o GA4 funcionar)
            if (typeof gtag === 'function') { 
                gtag('event', 'clique_whatsapp', {
                    'event_category': 'contato',
                    'event_label': 'cta_fixo',
                    'value': 1 
                });
                console.log("GA4/Google Ads Evento Disparado: clique_whatsapp");
            } else {
                console.warn("GA4/Google Ads: Função 'gtag' não encontrada. O script de rastreamento do Google pode estar faltando.");
            }

            // 2. Envia o evento de conversão para o META PIXEL (Facebook/Instagram)
            // Verifica se a função fbq está definida (necessário para o Meta Pixel funcionar)
            if (typeof fbq === 'function') { 
                fbq('track', 'Contact'); // Evento padrão para cliques de contato
                console.log("Meta Pixel Evento Disparado: Contact");
            } else {
                console.warn("Meta Pixel: Função 'fbq' não encontrada. O script de rastreamento do Meta Pixel pode estar faltando.");
            }
        });
    }
});
