import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

import starsTexture from '../img/stars.jpg';
import sunTexture from '../img/sun.jpg';
import mercuryTexture from '../img/mercury.jpg';
import venusTexture from '../img/venus.jpg';
import earthTexture from '../img/earth.jpg';
import marsTexture from '../img/mars.jpg';
import jupiterTexture from '../img/jupiter.jpg';
import saturnTexture from '../img/saturn.jpg';
import saturnRingTexture from '../img/saturn ring.png';
import uranusTexture from '../img/uranus.jpg';
import uranusRingTexture from '../img/uranus ring.png';
import neptuneTexture from '../img/neptune.jpg';
import plutoTexture from '../img/pluto.jpg';

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;


renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene();
const cubetextureloader = new THREE.CubeTextureLoader()
scene.background = cubetextureloader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1, 2000
);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-100, 100, 100)
orbit.update();
const pointLight = new THREE.PointLight(0xFFFFFF, 3, 15000, 0.1)
scene.add(pointLight)
const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(20, 50, 50)
const sunMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture),
})
const Sun = new THREE.Mesh(sunGeo, sunMaterial)
scene.add(Sun)

const planetData = [
    { name: 'Mercury', size: 3.383, rotationSpeed: 0.01, orbitSpeed: 0.037, distance: 48, texture: mercuryTexture },
    { name: 'Venus', size: 3.949, rotationSpeed: 0.005, orbitSpeed: 0.025, distance: 70, texture: venusTexture },
    { name: 'Earth', size: 4, rotationSpeed: 0.004, orbitSpeed: 0.02, distance: 95, texture: earthTexture },
    { name: 'Mars', size: 3.532, rotationSpeed: 0.004, orbitSpeed: 0.014, distance: 118, texture: marsTexture },
    { name: 'Jupiter', size: 8.2, rotationSpeed: 0.001, orbitSpeed: 0.003, distance: 190, texture: jupiterTexture },
    { name: 'Saturn', size: 7.41, rotationSpeed: 0.001, orbitSpeed: 0.005, distance: 270, texture: saturnTexture },
    { name: 'Uranus', size: 5.5, rotationSpeed: 0.001, orbitSpeed: 0.006, distance: 350, texture: uranusTexture },
    { name: 'Neptune', size: 5.38, rotationSpeed: 0.001, orbitSpeed: 0.004, distance: 475, texture: neptuneTexture },
    { name: 'Pluto', size: 3.18, rotationSpeed: 0.005, orbitSpeed: 0.001, distance: 550, texture: plutoTexture },
];



const createPlanet = (name, size, rotationSpeed, orbitSpeed, distance, texture) => {
    const planetGeo = new THREE.SphereGeometry(size, 30, 30);
    const planetMaterial = new THREE.MeshStandardMaterial({ map: textureLoader.load(texture) });
    const planetMesh = new THREE.Mesh(planetGeo, planetMaterial);
    const planetObj = new THREE.Object3D();
    planetObj.add(planetMesh);
    scene.add(planetObj);
    planetMesh.position.x = distance;

    return { name, size, rotationSpeed, orbitSpeed, distance, obj: planetObj };
};

const planets = planetData.map((planet) => {
    return createPlanet(planet.name, planet.size, planet.rotationSpeed, planet.orbitSpeed, planet.distance, planet.texture);
});

const saturnRingGeo = new THREE.RingGeometry(12, 20, 32);
const saturnRingMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(saturnRingTexture),
    side: THREE.DoubleSide
})
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMaterial);
planets[5].obj.add(saturnRing);
saturnRing.rotation.x = (Math.PI / 2);
saturnRing.position.x = 270;

const uranusRingGeo = new THREE.RingGeometry(12, 10, 32);
const uranusRingMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(uranusRingTexture),
    side: THREE.DoubleSide
})
const uranusRing = new THREE.Mesh(uranusRingGeo, uranusRingMaterial);
planets[6].obj.add(uranusRing);
uranusRing.rotation.x = (Math.PI / 2);
uranusRing.position.x = 350;

const animate = () => {
    Sun.rotateY(0.004);

    planets.forEach((planet) => {
        planet.obj.rotateY(planet.orbitSpeed);
        planet.obj.children[0].rotateY(planet.rotationSpeed);
    });


    renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);

window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
}