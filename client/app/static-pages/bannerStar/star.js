// the main three.js components
var camera, scene, renderer,

	// to keep track of the mouse position
	mouseX = 0,
	mouseY = 0,

	// an array to store our particles in
	particles = [];

// let's get going! 
init();

function init() {

	// 
	camera = new THREE.PerspectiveCamera(
			100, // 数值越大，星星出现的初始位置的z轴越远
			window.innerWidth / window.innerHeight, // 宽高比
			1, //能看到的最近距离
			4000 // 能看到的最远距离
		);

	// 设置相机原点为z轴得1000
	camera.position.z = 1000;

	scene = new THREE.Scene();
	scene.add(camera);

	renderer = new THREE.CanvasRenderer();
	// 设置场景宽高
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	makeParticles();

	// add the mouse move listener
	// document.addEventListener('mousemove', onMouseMove, false);

	// render 30 times a second (should also look 
	// at requestAnimationFrame) 
	setInterval(update, 1000 / 30);

}

// the main update function, called 30 times a second

function update() {

	updateParticles();

	// and render the scene from the perspective of the camera
	renderer.render(scene, camera);

}

// creates a random field of Particle objects

function makeParticles() {

	var particle, material;


	for (var zpos = -1000; zpos < 1000; zpos += 20) {

		// we make a particle material and pass through the 
		// colour and custom particle render function we defined. 
		material = new THREE.ParticleCanvasMaterial({
			color: 0xffffff,
			program: particleRender
		});
		particle = new THREE.Particle(material);

		particle.position.x = Math.random() * 2500 - 1000;
		particle.position.y = Math.random() * 2000 - 1000;

		// set its z position
		particle.position.z = zpos;

		// scale it up a bit
		particle.scale.x = particle.scale.y = 10;

		// add it to the scene
		scene.add(particle);

		// and to the array of particles. 
		particles.push(particle);
	}

}

function particleRender(context) {

	context.beginPath();
	context.arc(0, 0, 1, 0, Math.PI * 2, true);
	context.fill();
};


// moves all the particles dependent on mouse position

var particleFadePos = {}

function runByRandom(randoms, cb){

	var rangeRandom = Math.random()*100,
			curRandom = 0;

	randoms.some(function(random, index){
		curRandom += random;
		if(curRandom > rangeRandom){
			cb(index)
			return true;
		} 
		return false;
	})
	
}

function testRunByRandom(){

	var randomArr = [0,0,0,0];
	for(var i=0;i<10000;i++){
		runByRandom([10, 20, 50, 20], function(index){
			randomArr[index]++;
		})
	}

	console.log(randomArr.map(function(item){ return (item/10000).toFixed(2) }))

}

function setParticleFadePos(id){
	if(!particleFadePos[id]){

		
		var pos;

		runByRandom([20, 20, 40, 10], function(index){

			switch(index){
				// 1000（能够最后消失）出现得概率为10%
				case 0:
					pos =1000;
				break;

				// 700-900出现得概率为20%
				case 1:
					pos = Math.random() * 700 + 200;
				break;

				// 500-700出现得概率为50%
				case 2:
					pos = Math.random() * 500 + 200;
				break;
				
				// 300-500出现得概率为20%
				case 3:
					pos = Math.random() * 300 + 200;
				break;
			}
		});
		
		return particleFadePos[id] = pos;
	}
}

function getParticleFadePos(id){
	return particleFadePos[id];
}

function clearParticleFadePos(id){
	particleFadePos[id] = null;
}

function updateParticles() {

	// iterate through every particle
	for (var i = 0; i < particles.length; i++) {

		particle = particles[i];

		// and move it forward dependent on the mouseY position. 
		particle.position.z += 80 * 0.1;

		// if the particle is too close move it to the back
		var id = particle.id;
		var fadePos = getParticleFadePos(id);
		if(!fadePos){
			fadePos = setParticleFadePos(id);
		}

		if (particle.position.z > fadePos){
			particle.position.z -= 2000 + (1000 - fadePos);
			clearParticleFadePos(id);
		} 

	}

}

// called when the mouse moves
function onMouseMove(event) {
	// store the mouseX and mouseY position 
	mouseX = event.clientX;
	mouseY = event.clientY;
}