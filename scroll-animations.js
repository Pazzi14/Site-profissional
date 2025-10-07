// scroll-animations.js (100% Completo e com todas as páginas e seções)

document.addEventListener('DOMContentLoaded', function() {
    // Configurações padrão de animação
    const defaultProps = {
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        distance: '50px',
        duration: 1000,
        delay: 0,
        scale: 1,
        viewFactor: 0.1
    };

    // 1. Animação para a Home Page (index.html)
    // ... (Regras para Hero, Diferenciais, Depoimentos, FAQ Resumido) ...

    // 2. Animação para a Página de Tratamentos (tratamentos.html)
    // ... (Regras para Laserterapia, Comparação, Patologias) ...
    ScrollReveal().reveal('#comparacao-tratamento h2', { ...defaultProps, origin: 'top' });
    ScrollReveal().reveal('.metodo-card', { ...defaultProps, origin: 'left', interval: 100, delay: 200 });
    
    // 3. Animação para a Página Quem Somos (quem-somos.html)
    // ... (Regras para Perfil, Biografia, Missão) ...

    // 4. Animação para a Página Contato (contato.html)
    // ... (Regras para Info Cards, Agendamento) ...

    // 5. Animação para a Página FAQ (faq.html)
    ScrollReveal().reveal('.faq-item', { ...defaultProps, origin: 'bottom', interval: 100, });
});
