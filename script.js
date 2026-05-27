// ==================== HAMBURGER MENU ====================
const hamburger = document.querySelector('.hamburger');
const header = document.querySelector('.header');

hamburger.addEventListener('click', () => {
    header.classList.toggle('menu-open');
    
    const spans = hamburger.children;
    if (header.classList.contains('menu-open')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ==================== WEBGL OCEAN - 5 FPS Dreamy Style ====================
const canvas = document.getElementById('ocean-canvas');
const gl = canvas.getContext('webgl', { alpha: true, antialias: true });

if (!gl) {
    console.error("WebGL not supported");
} else {
    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Shader error:", gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

    function createProgram(gl, vsSource, fsSource) {
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
        if (!vertexShader || !fragmentShader) return null;

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Link error:", gl.getProgramInfoLog(program));
            return null;
        }
        return program;
    }

    const vsSource = `
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying float vTime;
        uniform float uTime;

        void main() {
            vUv = aPosition * 0.5 + 0.5;
            vTime = uTime;
            vec2 pos = aPosition;
            
float wave = sin(pos.x * 1.0 + uTime * 0.55) * 0.032;
wave += sin(pos.y * 1.2 + uTime * 0.78) * 0.021;
wave += sin((pos.x + pos.y) * 0.9 + uTime * 0.42) * 0.014;
            
            vWorldPos = vec3(pos.x * 2.6, wave * 1.4, pos.y * 2.1 - 0.9);
            gl_Position = vec4(pos, wave * 0.45, 1.0);
        }
    `;

    const fsSource = `
        precision mediump float;
        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying float vTime;

        void main() {
            vec3 deep = vec3(0.006, 0.028, 0.095);
            vec3 surface = vec3(0.32, 0.58, 0.88);
            
            vec3 normal = normalize(vec3(
                sin(vWorldPos.x * 5.8 + vTime * 1.25) * 0.5,
                1.0,
                cos(vWorldPos.z * 4.9 + vTime * 0.95) * 0.6
            ));
            
            float fresnel = pow(1.0 - max(dot(normal, vec3(0.0, 1.0, 0.0)), 0.0), 2.35);
            
            vec3 moonDir = normalize(vec3(0.65, 0.8, -0.35));
            float spec = pow(max(dot(reflect(-moonDir, normal), vec3(0.0, 0.85, 0.0)), 0.0), 36.0);
            vec3 moonLight = vec3(1.0, 0.88, 0.62) * spec * 2.1;
            
            vec3 color = mix(deep, surface, fresnel * 0.65);
            color += moonLight;
            
            float horizon = smoothstep(0.35, 0.72, vUv.y);
            color = mix(color, vec3(0.003, 0.007, 0.02), horizon * 0.88);
            color += vec3(0.12, 0.25, 0.4) * pow(1.0 - horizon, 7.0) * 0.28;
            
            gl_FragColor = vec4(color, 0.96);
        }
    `;

    const program = createProgram(gl, vsSource, fsSource);

    if (program) {
        gl.useProgram(program);

        const vertices = new Float32Array([-1,-1, 1,-1, -1,1, 1,1]);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const posLoc = gl.getAttribLocation(program, "aPosition");
        if (posLoc >= 0) {
            gl.enableVertexAttribArray(posLoc);
            gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
        }

        const timeLoc = gl.getUniformLocation(program, "uTime");

        let time = 0;
        let lastUpdate = Date.now();

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        }

        function render() {
            const now = Date.now();
            
            // Throttle time update to ~5 FPS feel
            if (now - lastUpdate > 180) {           // ~5.5 updates per second
                time +=0.089;                      // Adjusted increment for dreamy speed
                lastUpdate = now;
            }

            gl.uniform1f(timeLoc, time);

            gl.clearColor(0.0, 0.0, 0.01, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            requestAnimationFrame(render);
        }

        window.addEventListener('resize', resize);
        resize();
        render();
    }
}

// ==================== CLEAN 2D LOW-FPS OCEAN BEFORE FOOTER ====================
const canvas2d = document.getElementById('ocean-2d-canvas');
const useSpeed = 0.038;
if (canvas2d) {
    const ctx = canvas2d.getContext('2d');
    let width, height, time = 0;
    let lastUpdate = Date.now();
    let isVisible = false;

    function resize2d() {
        width = canvas2d.offsetWidth;
        height = canvas2d.offsetHeight;
        canvas2d.width = width;
        canvas2d.height = height;
    }

    function draw2dOcean() {
        ctx.clearRect(0, 0, width, height);
        time += useSpeed;   // calm speed

        // Deep dark background
        ctx.fillStyle = '#02060f';
        ctx.fillRect(0, 0, width, height);

        // Multiple soft wave layers
        for (let i = 0; i < 7; i++) {
            ctx.beginPath();
            const baseY = height * (0.11 + i * 0.102);
            const amp = 13 - i * 1.6;
            const freq = 0.0055 + i * 0.0018;
            
            ctx.strokeStyle = i === 0 ? 'rgba(186, 230, 253, 0.48)' : 
                             `rgba(140, 190, 235, ${0.38 - i * 0.055})`;
            ctx.lineWidth = 2.6 - i * 0.25;

            for (let x = 0; x <= width; x += 3) {
                const y = baseY + 
                         Math.sin(x * freq + time * (0.55 + i * 0.12)) * amp +
                         Math.sin(x * freq * 2.3 + time * 0.35) * (amp * 0.45);
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        // Very subtle horizontal highlight near horizon
        ctx.save();
        ctx.globalAlpha = 0.12;
        const horizonGrad = ctx.createLinearGradient(0, height*0.48, 0, height*0.65);
        horizonGrad.addColorStop(0, 'rgba(220, 240, 255, 0.25)');
        horizonGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = horizonGrad;
        ctx.fillRect(0, height*0.48, width, height*0.22);
        ctx.restore();
    }

    function render2d() {
        const now = Date.now();
        if (isVisible && now - lastUpdate > 165) {   // ~6 FPS dreamy feel
            draw2dOcean();
            lastUpdate = now;
        }
        requestAnimationFrame(render2d);
    }

    function checkVisibility() {
        const rect = canvas2d.getBoundingClientRect();
        isVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > 50;
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', () => {
        resize2d();
        checkVisibility();
    });

    resize2d();
    render2d();
}
