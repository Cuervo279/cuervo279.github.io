const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");
const sourceIMG = document.getElementById("sourceIMG");

sourceIMG.crossOrigin = "Anonymous";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0, 0, canvas.width, canvas.height);

// Configurable parameters
const config = {
	particleSize: 2,
	returnSpeed: 0.005,
	velocityDamping: 0.95,
	spacingX: 8,
	spacingY: 8,
	attractionRadius: 2.5,
	attractionForce: 0.0001
};

let particleCount;
let particles = [];
const mouse = {
	x: -500,
	y: -500,
	radius: config.attractionRadius
};

function calculateParticleCount() {
	const cols = Math.floor(canvas.width / config.spacingX);
	const rows = Math.floor(canvas.height / config.spacingY);
	return cols * rows;
}

function createParticles() {
	particles = [];
	particleCount = calculateParticleCount();

	const cols = Math.floor(canvas.width / config.spacingX);
	const rows = Math.floor(canvas.height / config.spacingY);
	const offsetX = (canvas.width - (cols - 1) * config.spacingX) / 2;
	const offsetY = (canvas.height - (rows - 1) * config.spacingY) / 2;

	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			const particle = {
				x: ((x * config.spacingX + offsetX) / canvas.width) * 2 - 1,
				y: ((y * config.spacingY + offsetY) / canvas.height) * -2 + 1,
				baseX: ((x * config.spacingX + offsetX) / canvas.width) * 2 - 1,
				baseY: ((y * config.spacingY + offsetY) / canvas.height) * -2 + 1,
				vx: 0,
				vy: 0,
				color: [1.0, 1.0, 1.0]
			};
			particles.push(particle);
		}
	}
}

function loadImageColors() {
	const img = new Image();
	img.src = sourceIMG.src;
	img.crossOrigin = "Anonymous";
	img.onload = function () {
		const tempCanvas = document.createElement("canvas");
		const ctx = tempCanvas.getContext("2d");

		let imgWidth,
			imgHeight,
			imgX = 0,
			imgY = 0;
		const imgAspectRatio = img.width / img.height;
		const canvasAspectRatio = canvas.width / canvas.height;

		if (imgAspectRatio > canvasAspectRatio) {
			imgHeight = canvas.height;
			imgWidth = imgHeight * imgAspectRatio;
			imgX = (canvas.width - imgWidth) / 2;
		} else {
			imgWidth = canvas.width;
			imgHeight = imgWidth / imgAspectRatio;
			imgY = (canvas.height - imgHeight) / 2;
		}

		tempCanvas.width = canvas.width;
		tempCanvas.height = canvas.height;

		ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

		particles.forEach((particle) => {
			const imgX = Math.floor(((particle.baseX + 1) / 2) * canvas.width);
			const imgY = Math.floor(((1 - particle.baseY) / 2) * canvas.height);
			const index = (imgY * canvas.width + imgX) * 4;
			const r = imageData[index] / 255;
			const g = imageData[index + 1] / 255;
			const b = imageData[index + 2] / 255;
			particle.color = [r, g, b];
		});

		animate();
	};
}

const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec3 a_color;
    varying vec3 v_color;
    void main() {
        gl_PointSize = ${config.particleSize.toFixed(1)};
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_color = a_color;
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    varying vec3 v_color;
    void main() {
        gl_FragColor = vec4(v_color, 1.0); // Use particle color
    }
`;

function createShader(gl, type, source) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error(gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}
	return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
	const program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error(gl.getProgramInfoLog(program));
		gl.deleteProgram(program);
		return null;
	}
	return program;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(
	gl,
	gl.FRAGMENT_SHADER,
	fragmentShaderSource
);
const program = createProgram(gl, vertexShader, fragmentShader);

const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
const colorAttributeLocation = gl.getAttribLocation(program, "a_color");

const positionBuffer = gl.createBuffer();
const colorBuffer = gl.createBuffer();

function updateParticles() {
	const positions = new Float32Array(particleCount * 2);
	const colors = new Float32Array(particleCount * 3);

	for (let i = 0; i < particleCount; i++) {
		const particle = particles[i];

		const dx = mouse.x - particle.x;
		const dy = mouse.y - particle.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		if (distance < mouse.radius) {
			const force = (mouse.radius - distance) * config.attractionForce;
			const angle = Math.atan2(dy, dx);
			particle.vx += Math.cos(angle) * force;
			particle.vy += Math.sin(angle) * force;
		}

		particle.vx += (particle.baseX - particle.x) * config.returnSpeed;
		particle.vy += (particle.baseY - particle.y) * config.returnSpeed;

		particle.x += particle.vx;
		particle.y += particle.vy;
		particle.vx *= config.velocityDamping;
		particle.vy *= config.velocityDamping;

		positions[i * 2] = particle.x;
		positions[i * 2 + 1] = particle.y;

		colors[i * 3] = particle.color[0];
		colors[i * 3 + 1] = particle.color[1];
		colors[i * 3 + 2] = particle.color[2];
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, colors, gl.DYNAMIC_DRAW);
}

function animate() {
	updateParticles();

	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(positionAttributeLocation);

	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(colorAttributeLocation);

	gl.useProgram(program);
	gl.drawArrays(gl.POINTS, 0, particleCount);
	requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", (event) => {
	mouse.x = (event.clientX / canvas.width) * 2 - 1;
	mouse.y = (event.clientY / canvas.height) * -2 + 1;
});

canvas.addEventListener("mouseleave", () => {
	mouse.x = -500;
	mouse.y = -500;
});

let resizeTimeout;
window.addEventListener("resize", () => {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(() => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		gl.viewport(0, 0, canvas.width, canvas.height);
		createParticles();
		loadImageColors();
	}, 200);
});

gl.clearColor(0, 0, 0, 1);
createParticles();
loadImageColors();
