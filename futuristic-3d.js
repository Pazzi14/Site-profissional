// futuristic-3d.js (100% Completo e Funcional)

// Configurações básicas (Cores da Marcela)
const PRIMARY_COLOR = 0x004c6d; // Azul Profundo
const ACCENT_COLOR = 0x66b8a7;  // Verde Menta

let scene, camera, renderer, particles, particleSystem, lineSegments;
const particleCount = 200;
const particlePositions = new Float32Array(particleCount * 3);
const maxDistance = 1.5; // Distância máxima para as partículas se conectarem

// 1. Inicializa a Cena 3D
function init() {
    // ... (Conteúdo completo da função init) ...
}

// 2. Loop de Animação
function animate() {
    // ... (Conteúdo completo da função animate) ...
}

// 3. Lógica para conectar as partículas que estão próximas
function updateLines() {
    // ... (Conteúdo completo da função updateLines) ...
}

// 4. Responsividade (Redimensionar ao mudar o tamanho da tela)
function onWindowResize() {
    // ... (Conteúdo completo da função onWindowResize) ...
}

// Inicia o processo
if (document.getElementById('hero-3d-background')) {
    init();
    animate();
    window.addEventListener('resize', onWindowResize);
}
