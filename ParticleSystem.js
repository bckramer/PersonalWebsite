// Set the scene size.
const WIDTH = 600;
const HEIGHT = 600;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;
const numParticles = 3000;
let minLifetime;
let maxLifetime;
let minSize;
let maxSize;
let minSpeed;
let maxSpeed;
let startColor;
let endColor;
const objects = [];

var spawnDensity = document.getElementById("spawnDensity").value;
var lifetime = document.getElementById("lifetime").value;
var lifetimeVariation = document.getElementById("lifetimeVariation").value;
minLifetime = lifetime - lifetimeVariation / 2.0;
maxLifetime = parseFloat(lifetime) + parseFloat(lifetimeVariation / 2.0);
var size = document.getElementById("size").value;
if (size < 0.001){
    size = 0.001;
}
var sizeVariation = document.getElementById("sizeVariation").value;
if(size - sizeVariation / 2 < 0.001){
    minSize = 0.001;
}else{
    minSize = size - sizeVariation / 2.0;
}
maxSize = parseFloat(size) + parseFloat(sizeVariation / 2.0);
var speed = document.getElementById("speed").value;
var speedVariation = document.getElementById("speedVariation").value;
minSpeed = speed - speedVariation / 2.0;
maxSpeed = parseFloat(speed) + parseFloat(speedVariation / 2.0);
var acceleration = document.getElementById("acceleration").value;
var startColorR = document.getElementById("startColorR").value;
var startColorG = document.getElementById("startColorG").value;
var startColorB = document.getElementById("startColorB").value;
var endColorR = document.getElementById("endColorR").value;
var endColorG = document.getElementById("endColorG").value;
var endColorB = document.getElementById("endColorB").value;

function updateTextBoxes() {
    spawnDensity = document.getElementById("spawnDensity").value;
    lifetime = document.getElementById("lifetime").value;
    lifetimeVariation = document.getElementById("lifetimeVariation").value;
    minLifetime = lifetime - lifetimeVariation / 2.0;
    maxLifetime = parseFloat(lifetime) + parseFloat(lifetimeVariation / 2.0);

    size = document.getElementById("size").value;
    if (size < 0.001){
        size = 0.001;
    }
    sizeVariation = document.getElementById("sizeVariation").value;
    if(size - sizeVariation / 2.0 < 0.001){
        minSize = 0.001;
    }else{
        minSize = size - sizeVariation / 2.0;
    }
    maxSize = parseFloat(size) + parseFloat(sizeVariation / 2.0);
    speed = document.getElementById("speed").value;
    speedVariation = document.getElementById("speedVariation").value;
    minSpeed = speed - speedVariation / 2.0;
    maxSpeed = parseFloat(speed) + parseFloat(speedVariation / 2.0);
    acceleration = document.getElementById("acceleration").value;
    this.startColor.setRGB(
        document.getElementById("startColorR").value,
        document.getElementById("startColorG").value,
        document.getElementById("startColorB").value
    );
    this.endColor.setRGB(
        document.getElementById("endColorR").value,
        document.getElementById("endColorG").value,
        document.getElementById("endColorB").value
    );
}

var xSpeed = 3.0;
var ySpeed = 3.0;
var zSpeed = 3.0;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode === 87) {
        //w
        user.position.z -= zSpeed;
    } else if (keyCode === 83) {
        //s
        user.position.z += zSpeed;
    } else if (keyCode === 65) {
        //a
        user.position.x -= xSpeed;
    } else if (keyCode === 68) {
        //d
        user.position.x += xSpeed;
    } else if (keyCode === 82) {
        //r
        user.position.y += ySpeed;
    } else if (keyCode === 70) {
        //f
        user.position.y -= ySpeed;
    } else if (keyCode === 32) {
        //space
        user.position.set(0, 0, 0);
    }
}

// Get the DOM element to attach to
const container =
    document.querySelector('#container');

// Create a WebGL renderer, camera
// and a scene
const renderer = new THREE.WebGLRenderer();
const camera =
    new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );

const scene = new THREE.Scene();

// Add the camera to the scene.
scene.add(camera);

// Start the renderer.
renderer.setSize(WIDTH, HEIGHT);

// Attach the renderer-supplied
// DOM element.
container.appendChild(renderer.domElement);

// create a point light
const pointLight =
    new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.set(10,50,100);

// add to the scene
scene.add(pointLight);

// create the sphere's material
const sphereMaterial =
    new THREE.MeshPhongMaterial(
        {
            color: new THREE.Color(0xFF0000)
        });

// Set up the sphere vars
const RADIUS = 10;
const SEGMENTS = 16;
const RINGS = 16;

const user = new THREE.Mesh(
    new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS),

    sphereMaterial);

user.position.z = -300;
scene.add(user);

for (let i = 0; i < numParticles; i++) {

    let particleMaterial =
        new THREE.PointsMaterial(
            {
                color: new THREE.Color(0xFFFFFF)
            });

    // let particleMesh = new THREE.Mesh(
    //     // new THREE.SphereGeometry(
    //     //     0.5,
    //     //     RADIUS,
    //     //     RINGS),
    //     new THREE.PlaneGeometry(
    //         1.0,
    //         1.0,
    //         1.0),

    var vertices = new Float32Array( [
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,

        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0, -1.0,  1.0
    ] );

    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ).setDynamic(true) );
    let particleMesh = new THREE.Mesh(geometry, particleMaterial);

    particleMesh.position.set(
        user.position.x + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0),
        user.position.y + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0),
        user.position.z + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0)
    );

    particleMesh.scale.setScalar(parseFloat(Math.random() * (maxSize - minSize)) + parseFloat(minSize));

    this.startColor = new THREE.Color(this.startColorR, this.startColorG, this.startColorB);
    this.endColor = new THREE.Color(this.endColorR, this.endColorG, this.endColorB);

    let particle =
        new ParticleObject(
                particleMesh, //Mesh
                lifetime * Math.random(), //Lifetime. If there is no random, all the particle will spawn and die at the same time
                parseFloat(Math.random() * (maxSpeed - minSpeed)) + parseFloat(minSpeed), //Speed
                acceleration, //Acceleration
                new Vector3([1 - (2 * Math.random()), 1 - (2 *Math.random()), 1 - (2 * Math.random())]).normalize(), //Direction
                new THREE.Color(this.startColor), //StartColor
                new THREE.Color(this.endColor) //EndColor
            );


    objects.push(particle);
    scene.add(particle.mesh);
}

function update() {

    updateTextBoxes();
    renderer.render(scene, camera);

    let particle;

    for (let i = 0; i < objects.length; i++) {

        particle = objects[i];

        //    objects[i].position.x = Math.random() * 250 - 175;
        if (particle.getLifeLeft() < 0) {
            let spawnX = user.position.x + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0);
            let spawnY = user.position.y + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0);
            let spawnZ = user.position.z + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0);
            particle.setPosition(spawnX, spawnY, spawnZ);
            particle.setSize(parseFloat(Math.random() * (maxSize - minSize)) + parseFloat(minSize));
            particle.setLifetime(parseFloat(Math.random() * (maxLifetime - minLifetime)) + parseFloat(minLifetime));
            particle.resetColor();
            particle.setSpeed(parseFloat(Math.random() * (maxSpeed - minSpeed)) + parseFloat(minSpeed));
            particle.setAcceleration(this.acceleration);
            particle.swapColor(this.startColor, this.endColor);
        } else {
            particle.update();
        }
    }
    requestAnimationFrame(update);
}

// Schedule the first frame.
requestAnimationFrame(update);