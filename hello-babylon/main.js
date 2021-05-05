
import {createVillage} from './village.js';
import {loadAndAnimateCar2} from './car.js';
import {loadAndAnimateDude} from './dude.js';
import {createGUI} from './gui.js';

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = async engine => {

    const scene = new BABYLON.Scene(engine);

    /**** Set camera and light *****/
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    // const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.5, 150, new BABYLON.Vector3(0, 60, 0));  // attatched to dude
    // camera.upperBetaLimit = Math.PI / 2.2;  // limit camera moving under ground
    camera.attachControl(canvas, true);
    
    const ambientLight = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    ambientLight.intensity = 0.05;
    
    const  light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -1, 1), scene);
    light.position = new BABYLON.Vector3(0, 50, -100);
    light.intensity = 1;

    const onLightValueChanged = (value) => {
        light.intensity = value;
    }

    // Shadow generator
    const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

    /**** World Objects *****/
    // loadSampleVillage();
    
    // createTexturedGround();
    // buildDwellings();
    
    const ground = createVillage(scene, shadowGenerator);

    // const car = buildCar(scene);
    loadAndAnimateCar2(scene, shadowGenerator);
    const dude = await loadAndAnimateDude(scene, shadowGenerator);

    createGUI({onLightValueChanged})

    // camera.parent = dude;

    const xr = await scene.createDefaultXRExperienceAsync({
        floorMeshes: ground,
    });
    

    return scene;
};



const scene = await createScene(engine); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});