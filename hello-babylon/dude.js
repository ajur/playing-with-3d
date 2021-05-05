
export const loadAndAnimateDude = async (scene, shadowGenerator) => {
    const result = await BABYLON.SceneLoader.ImportMeshAsync("him", "assets/dude/", "Dude.babylon")
    const dude = result.meshes[0];

    dude.scaling = new BABYLON.Vector3(0.008, 0.008, 0.008);
    dude.position = new BABYLON.Vector3(-6, 0, 0);
    dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(-95), BABYLON.Space.LOCAL);
    
    shadowGenerator.addShadowCaster(dude, true);

    scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);

    animateWalk(dude, scene);

    return dude;
}

const animateWalk = (dude, scene) => {
    let distance = 0;
    let step = 0.015;
    let p = 0;

    const startRotation = dude.rotationQuaternion.clone();  

    scene.onBeforeRenderObservable.add(() => {
        dude.movePOV(0, 0, step);
        distance += step;
          
        if (distance > track[p].dist) {
                
            dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(track[p].turn), BABYLON.Space.LOCAL);
            p +=1;
            p %= track.length; 
            if (p === 0) {
                distance = 0;
                dude.position = new BABYLON.Vector3(-6, 0, 0);
                dude.rotationQuaternion = startRotation.clone();
            }
        }
        
    });
}

const walk = (turn, dist) => ({turn, dist});

const track = [
    walk(86, 7),
    walk(-85, 14.8),
    walk(-93, 16.5),
    walk(48, 25.5),
    walk(-112, 30.5),
    walk(-72, 33.2),
    walk(42, 37.5),
    walk(-98, 45.2),
    walk(0, 47)
];
