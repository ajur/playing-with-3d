const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = async engine => {

    const scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 50, -50), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    const ambientLight = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    ambientLight.intensity = 0.1;

    await BABYLON.SceneLoader.AppendAsync("./assets/", "scene.gltf", scene);
    
    const xr = await scene.createDefaultXRExperienceAsync();

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