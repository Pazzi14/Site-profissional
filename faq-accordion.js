// faq-accordion.js (100% Completo e Funcional para FAQ Resumido e Completo)

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os botões de pergunta
    const buttons = document.querySelectorAll('.faq-pergunta');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // ... (Lógica completa do Acordeão) ...
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            const isExpanded = button.getAttribute('aria-expanded') === 'true' || false;

            // Fecha todos os outros itens
            document.querySelectorAll('.faq-pergunta').forEach(btn => {
                if (btn !== button) {
                    btn.setAttribute('aria-expanded', 'false');
                    const otherTarget = document.getElementById(btn.getAttribute('data-target'));
                    otherTarget.style.maxHeight = 0;
                    otherTarget.style.paddingTop = 0;
                    otherTarget.style.paddingBottom = 0;
                }
            });

            // Alterna o estado do item clicado
            button.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                targetElement.style.maxHeight = targetElement.scrollHeight + "px";
                targetElement.style.paddingTop = "0"; 
                targetElement.style.paddingBottom = "0"; 
            } else {
                targetElement.style.maxHeight = 0;
                targetElement.style.paddingTop = "0";
                targetElement.style.paddingBottom = "0";
            }
        });
    });
});
