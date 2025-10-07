// faq-accordion.js (Lógica completa e corrigida para Acordeão FAQ)

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os botões de pergunta
    const buttons = document.querySelectorAll('.faq-pergunta');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            // Verifica o estado atual de expansão
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            // 1. Fecha todos os outros itens para garantir que apenas um esteja aberto (comportamento de acordeão)
            document.querySelectorAll('.faq-pergunta').forEach(btn => {
                if (btn !== button) {
                    btn.setAttribute('aria-expanded', 'false');
                    const otherTarget = document.getElementById(btn.getAttribute('data-target'));
                    // Zera maxHeight e Padding
                    otherTarget.style.maxHeight = '0px';
                    otherTarget.style.paddingTop = '0px';
                    otherTarget.style.paddingBottom = '0px';
                }
            });

            // 2. Alterna o estado do item clicado
            button.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                // Abre a resposta
                // Define o padding antes de maxHeight para a transição ser mais suave
                targetElement.style.paddingTop = '15px'; 
                targetElement.style.paddingBottom = '15px'; 
                // Usa scrollHeight para se ajustar ao conteúdo dinâmico
                targetElement.style.maxHeight = targetElement.scrollHeight + 'px';

            } else {
                // Fecha a resposta
                // Zera maxHeight primeiro, e o padding após a transição para evitar que o texto 'salte'
                targetElement.style.maxHeight = '0px';
                // Adiciona um listener para zerar o padding só depois que a transição de maxHeight terminar
                // Isso garante que o padding não cause um 'jump' no layout.
                targetElement.addEventListener('transitionend', function handler() {
                    if (targetElement.style.maxHeight === '0px') {
                        targetElement.style.paddingTop = '0px';
                        targetElement.style.paddingBottom = '0px';
                        targetElement.removeEventListener('transitionend', handler);
                    }
                }, { once: true });
            }
        });
    });
});
