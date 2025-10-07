// futuristic-3d.js (Implementação Completa do Background 3D com Three.js)

// Configurações básicas (Cores da Marcela)
const PRIMARY_COLOR = 0x004c6d; // Azul Profundo
const ACCENT_COLOR = 0x66b8a7;  // Verde Menta

let scene, camera, renderer, particles, particleSystem, lineSegments;
const particleCount = 200;
const particlePositions = new Float32Array(particleCount * 3);
const particleVelocities = new Float32Array(particleCount * 3);
const maxDistance = 150; // Distância máxima para as partículas se conectarem (aumentado para a escala)
const container = document.getElementById('hero-3d-background');
const clock = new THREE.Clock();

// Variáveis de Interatividade do Mouse/Toque
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;


// 1. Inicializa a Cena 3D
function init() {
    if (!container) return; // Garante que o container existe

    // Cena
    scene = new THREE.Scene();

    // Câmera
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 1, 10000);
    camera.position.z = 1000;

    // Renderizador
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(PRIMARY_COLOR, 1); // Fundo azul profundo
    container.appendChild(renderer.domElement);

    // Geração de Partículas
    const particleGeometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < particleCount; i++) {
        // Posições aleatórias dentro de um cubo de 2000x2000x2000
        const x = Math.random() * 2000 - 1000;
        const y = Math.random() * 2000 - 1000;
        const z = Math.random() * 2000 - 1000;
        
        positions.push(x, y, z);
        
        // Velocidades aleatórias para movimento sutil
        particleVelocities[i * 3] = (Math.random() - 0.5) * 0.5;
        particleVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
        particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particles = particleGeometry.attributes.position.array;


    const particleMaterial = new THREE.PointsMaterial({
        color: ACCENT_COLOR,
        size: 5,
        sizeAttenuation: true
    });

    particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Linhas de Conexão
    const lineGeometry = new THREE.BufferGeometry();
    const maxLineSegments = particleCount * (particleCount - 1) / 2; // Máximo de linhas
    const linePositions = new Float32Array(maxLineSegments * 2 * 3); // 2 pontos * 3 coordenadas
    
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
        color: ACCENT_COLOR,
        opacity: 0.5,
        transparent: true
    });
    
    lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // Event Listeners para Interatividade
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchmove', onDocumentTouchMove, { passive: false });
}

// Manipulação de Mouse (Movimento)
function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

// Manipulação de Toque (Movimento Mobile)
function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
        event.preventDefault(); // Evita scroll
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}


// 2. Loop de Animação
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    // Atualiza a posição das partículas (movimento)
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        particles[i3] += particleVelocities[i3] * delta * 50;
        particles[i3 + 1] += particleVelocities[i3 + 1] * delta * 50;
        particles[i3 + 2] += particleVelocities[i3 + 2] * delta * 50;

        // Limita o movimento das partículas ao cubo (-1000 a 1000)
        if (particles[i3] > 1000 || particles[i3] < -1000) particleVelocities[i3] *= -1;
        if (particles[i3 + 1] > 1000 || particles[i3 + 1] < -1000) particleVelocities[i3 + 1] *= -1;
        if (particles[i3 + 2] > 1000 || particles[i3 + 2] < -1000) particleVelocities[i3 + 2] *= -1;
    }
    
    // Marca a necessidade de atualização dos vértices
    particleSystem.geometry.attributes.position.needsUpdate = true;
    
    // Atualiza as linhas de conexão
    updateLines();

    // Movimento sutil da câmera baseado no mouse/toque
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}


// 3. Lógica para conectar as partículas que estão próximas
function updateLines() {
    let lineIndex = 0;
    const linePositions = lineSegments.geometry.attributes.position.array;
    const maxLineLengthSq = maxDistance * maxDistance;

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const p1x = particles[i3];
        const p1y = particles[i3 + 1];
        const p1z = particles[i3 + 2];

        // Partículas em movimento
        linePositions[lineIndex++] = p1x;
        linePositions[lineIndex++] = p1y;
        linePositions[lineIndex++] = p1z;
        
        // Linha para o centro da cena (efeito de gravidade sutil)
        linePositions[lineIndex++] = 0;
        linePositions[lineIndex++] = 0;
        linePositions[lineIndex++] = 0;


        // Conexão entre partículas próximas
        for (let j = i + 1; j < particleCount; j++) {
            const j3 = j * 3;
            const p2x = particles[j3];
            const p2y = particles[j3 + 1];
            const p2z = particles[j3 + 2];

            // Calcula a distância ao quadrado
            const dx = p1x - p2x;
            const dy = p1y - p2y;
            const dz = p1z - p2z;
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < maxLineLengthSq) {
                // Adiciona a linha de p1 para p2
                linePositions[lineIndex++] = p1x;
                linePositions[lineIndex++] = p1y;
                linePositions[lineIndex++] = p1z;

                linePositions[lineIndex++] = p2x;
                linePositions[lineIndex++] = p2y;
                linePositions[lineIndex++] = p2z;
            }
        }
    }

    // Preenche o resto do buffer de posições com zeros para esconder linhas não utilizadas
    while (lineIndex < linePositions.length) {
        linePositions[lineIndex++] = 0;
    }

    // Atualiza a geometria
    lineSegments.geometry.attributes.position.needsUpdate = true;
    lineSegments.geometry.setDrawRange(0, lineIndex);
}


// 4. Responsividade (Redimensionar ao mudar o tamanho da tela)
function onWindowResize() {
    if (!container || !camera || !renderer) return;

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    // Atualiza o tamanho do container
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}


// Inicia o processo
if (container) {
    init();
    animate();
    window.addEventListener('resize', onWindowResize);
}
