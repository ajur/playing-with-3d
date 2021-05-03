
export const createVillage = async (scene, shadowGenerator) => {
    // const scene = BABYLON.EngineStore.LastCreatedScene;
    createSkyBox(scene);
    const ground = await loadValleyVilage(scene, shadowGenerator);
    createTrees(scene);
    createFountain(scene);
    await clreateLights(scene);

    return ground;
}

export const clreateLights = async (scene) => {
    await BABYLON.SceneLoader.ImportMeshAsync("", "/assets/", "lamp.babylon")
    
    const lampLight = new BABYLON.SpotLight("lampLight", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, -1, 0), 0.8 * Math.PI, 0.01, scene);
    lampLight.diffuse = BABYLON.Color3.Yellow();
    lampLight.parent = scene.getMeshByName("bulb");

    const lamp = scene.getMeshByName("lamp");
    lamp.position = new BABYLON.Vector3(2, 0, 2);
    lamp.rotation = BABYLON.Vector3.Zero();
    lamp.rotation.y = -Math.PI / 4;

    const lamp3 = lamp.clone("lamp3");
    lamp3.position.z = -8;

    const lamp1 = lamp.clone("lamp1");
    lamp1.position.x = -8;
    lamp1.position.z = 1.2;
    lamp1.rotation.y = Math.PI / 2;

    const lamp2 = lamp1.clone("lamp2");
    lamp2.position.x = -2.7;
    lamp2.position.z = 0.8;
    lamp2.rotation.y = -Math.PI / 2;
}

export const createFountain = (scene) => {
    const fountainOutline = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(0.5, 0, 0),
        new BABYLON.Vector3(0.5, 0.2, 0),
        new BABYLON.Vector3(0.4, 0.2, 0),
        new BABYLON.Vector3(0.4, 0.05, 0),
        new BABYLON.Vector3(0.05, 0.1, 0),
        new BABYLON.Vector3(0.05, 0.8, 0),
        new BABYLON.Vector3(0.15, 0.9, 0)
    ];

    //Create lathed fountain
    const fountain = BABYLON.MeshBuilder.CreateLathe("fountain", { shape: fountainOutline, sideOrientation: BABYLON.Mesh.DOUBLESIDE });
    fountain.position.x = -4;
    fountain.position.z = -6;

    const particleSystem = createFountainParticles();

    //Switch fountain on and off
    scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN && pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh === fountain) {
            particleSystem.toggle();
        }
    });
    particleSystem.toggle();

}

export const createTrees = () => {
    const spriteManagerTrees = new BABYLON.SpriteManager("treesManager", "/assets/palm.png", 2000, { width: 512, height: 1024 });

    //We create trees at random positions
    for (let i = 0; i < 500; i++) {
        const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
        tree.position.x = Math.random() * (-30);
        tree.position.z = Math.random() * 20 + 8;
        tree.position.y = 0.5;
    }

    for (let i = 0; i < 500; i++) {
        const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
        tree.position.x = Math.random() * (25) + 7;
        tree.position.z = Math.random() * -35 + 8;
        tree.position.y = 0.5;
    }
}

export const createSkyBox = () => {
    //Skybox
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox");
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/assets/skybox/skybox");
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 150 });
    skybox.material = skyboxMaterial;

    return skybox;
}

export const loadValleyVilage = async (scene, shadowGenerator) => {
    await BABYLON.SceneLoader.ImportMeshAsync("", "/assets/", "valleyvillage.glb");
    
    const ground = scene.getMeshByName("ground");
    ground.material.maxSimultaneousLights = 5;
    ground.receiveShadows = true;

    for (let i = 0; i < 20; ++i) {
        const house = scene.getMeshByName("house" + i);
        if (!house) break;
        shadowGenerator.addShadowCaster(house, true);
    }

    return ground;
}

export const createTexturedGround = () => {
    //Create Village ground
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseTexture = new BABYLON.Texture("/assets/villagegreen.png");
    groundMat.diffuseTexture.hasAlpha = true;

    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 24, height: 24 });
    ground.material = groundMat;

    //large ground
    const largeGroundMat = new BABYLON.StandardMaterial("largeGroundMat");
    largeGroundMat.diffuseTexture = new BABYLON.Texture("/assets/valleygrass.png");

    const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap("largeGround", "/assets/villageheightmap.png", { width: 150, height: 150, subdivisions: 20, minHeight: 0, maxHeight: 10 });
    largeGround.material = largeGroundMat;
    largeGround.position.y = -0.01;
}

export const loadSampleVillage = () => {
    BABYLON.SceneLoader.ImportMeshAsync("", "/assets/", "village.glb");
}

export const buildDwellings = () => {

    const detached_house = buildHouse(1);
    detached_house.rotation.y = -Math.PI / 16;
    detached_house.position.x = -6.8;
    detached_house.position.z = 2.5;

    const semi_house = buildHouse(2);
    semi_house.rotation.y = -Math.PI / 16;
    semi_house.position.x = -4.5;
    semi_house.position.z = 3;

    const places = []; //each entry is an array [house type, rotation, x, z]
    places.push([1, -Math.PI / 16, -6.8, 2.5]);
    places.push([2, -Math.PI / 16, -4.5, 3]);
    places.push([2, -Math.PI / 16, -1.5, 4]);
    places.push([2, -Math.PI / 3, 1.5, 6]);
    places.push([2, 15 * Math.PI / 16, -6.4, -1.5]);
    places.push([1, 15 * Math.PI / 16, -4.1, -1]);
    places.push([2, 15 * Math.PI / 16, -2.1, -0.5]);
    places.push([1, 5 * Math.PI / 4, 0, -1]);
    places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3]);
    places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5]);
    places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7]);
    places.push([2, Math.PI / 1.9, 4.75, -1]);
    places.push([1, Math.PI / 1.95, 4.5, -3]);
    places.push([2, Math.PI / 1.9, 4.75, -5]);
    places.push([1, Math.PI / 1.9, 4.75, -7]);
    places.push([2, -Math.PI / 3, 5.25, 2]);
    places.push([1, -Math.PI / 3, 6, 4]);

    //Create instances from the first two that were built 
    const houses = [];
    for (let i = 0; i < places.length; i++) {
        if (places[i][0] === 1) {
            houses[i] = detached_house.createInstance("house" + i);
        }
        else {
            houses[i] = semi_house.createInstance("house" + i);
        }
        houses[i].rotation.y = places[i][1];
        houses[i].position.x = places[i][2];
        houses[i].position.z = places[i][3];
    }
}

export const buildGround = () => {
    // texture
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = new BABYLON.Color3(0, 0.6, 0);

    // object
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 15, height: 15 });
    ground.material = groundMat;

    return ground;
};

export const buildHouse = (width) => {
    const box = buildBox(width);
    const roof = buildRoof(width);

    const house = BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true);

    return house;
};

const buildBox = (width) => {
    // texture
    const boxMat = new BABYLON.StandardMaterial("boxMat");
    const boxType = width === 1 ? "cube" : "semi";
    boxMat.diffuseTexture = new BABYLON.Texture(`/assets/${boxType}house.png`);

    // options parameter to set different images on each side
    const faceUV = [];
    if (width === 1) {
        faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
        faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
        faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
        faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
        // top 4 and bottom 5 not seen so not set
    }
    else {
        faceUV[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); //rear face
        faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); //front face
        faceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side
        faceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side
    }

    // object
    const box = BABYLON.MeshBuilder.CreateBox("box", { width, faceUV, wrap: true });
    box.position.y = 0.5;
    box.material = boxMat;

    return box;
};

const buildRoof = (width) => {
    const roofMat = new BABYLON.StandardMaterial("roofMat");
    roofMat.diffuseTexture = new BABYLON.Texture("/assets/roof.jpg");

    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", { diameter: 1.3, height: 1.2, tessellation: 3 });
    roof.scaling.x = 0.75;
    roof.scaling.y = width;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;
    roof.material = roofMat;

    return roof;
}

const createFountainParticles = () => {
    // Create a particle system
    const particleSystem = new BABYLON.ParticleSystem("particles", 5000);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("/assets/flare.png");

    // Where the particles come from
    particleSystem.emitter = new BABYLON.Vector3(-4, 0.8, -6); // emitted from the top of the fountain
    particleSystem.minEmitBox = new BABYLON.Vector3(-0.01, 0, -0.01); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(0.01, 0, 0.01); // To...

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.01;
    particleSystem.maxSize = 0.05;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1.5;

    // Emission rate
    particleSystem.emitRate = 1500;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(-1, 8, 1);
    particleSystem.direction2 = new BABYLON.Vector3(1, 8, -1);

    // Power and speed
    particleSystem.minEmitPower = 0.2;
    particleSystem.maxEmitPower = 0.6;
    particleSystem.updateSpeed = 0.01;

    let switched = false;
    particleSystem.toggle = () => {
        switched = !switched;
        if (switched) {
            particleSystem.start();
        }
        else {
            particleSystem.stop();
        }
    }

    return particleSystem;
}