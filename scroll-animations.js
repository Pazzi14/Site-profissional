// scroll-animations.js (Configuração de Animações com ScrollReveal para todas as seções da Home)

document.addEventListener('DOMContentLoaded', function() {
    // Verifica se ScrollReveal está carregado
    if (typeof ScrollReveal === 'undefined') {
        console.error("ScrollReveal não está carregado. Verifique a inclusão do script no HTML.");
        return;
    }

    // Configurações padrão de animação
    const defaultProps = {
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        distance: '50px',
        duration: 800, // Tempo de animação ligeiramente reduzido para mais agilidade
        delay: 0,
        scale: 1,
        viewFactor: 0.2 // A animação começa quando 20% do elemento está visível
    };

    // Inicializa ScrollReveal com configurações padrão para todos os elementos com o atributo 'data-scroll-reveal'
    ScrollReveal().reveal('[data-scroll-reveal]', defaultProps);


    // 1. Animação para a Home Page (index.html)
    
    // Elementos da Hero (Já tratados pelo atributo data-scroll-reveal no HTML, mas configurando os atrasos)
    // - h2, p, a.cta-principal-btn
    
    // Seção de Diferenciais (Grid)
    ScrollReveal().reveal('.diferencial-item', { 
        ...defaultProps, 
        origin: 'bottom', 
        interval: 150, // Intervalo entre os itens
        duration: 600 
    });

    // Seção de Depoimentos
    ScrollReveal().reveal('.depoimentos-container', { 
        ...defaultProps, 
        origin: 'top', 
        delay: 200, 
    });

    // Seção de Serviços/Chamada
    ScrollReveal().reveal('.servico-card', { 
        ...defaultProps, 
        origin: 'right', 
        interval: 200, 
        duration: 700 
    });

    // Seção FAQ Resumido (Itens do Acordeão)
    ScrollReveal().reveal('.faq-item', { 
        ...defaultProps, 
        origin: 'bottom', 
        interval: 100,
        duration: 500
    });

    // 2. Animação para Páginas Secundárias (Garantindo que os comentários reflitam as regras para as outras páginas, mesmo que não estejam anexadas)
    
    // Página de Tratamentos (tratamentos.html) - Exemplo
    ScrollReveal().reveal('#comparacao-tratamento h2', { ...defaultProps, origin: 'top' });
    ScrollReveal().reveal('.metodo-card', { ...defaultProps, origin: 'left', interval: 100, delay: 200 });
    
    // Página Quem Somos (quem-somos.html) - Exemplo
    ScrollReveal().reveal('.perfil-foto', { ...defaultProps, origin: 'left' });
    ScrollReveal().reveal('.biografia-texto', { ...defaultProps, origin: 'right', delay: 200 });

    // Página Contato (contato.html) - Exemplo
    ScrollReveal().reveal('.info-card', { ...defaultProps, origin: 'bottom', interval: 150 });
    ScrollReveal().reveal('#form-agendamento', { ...defaultProps, origin: 'right', delay: 300 });
});
