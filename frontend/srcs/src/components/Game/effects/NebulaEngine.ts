import * as THREE from "three";
import Nebula, { SpriteRenderer } from "three-nebula";

export type NebulaSystem = {
    update: Function
}

class NebulaEngine {

    update(nebulaSystem : NebulaSystem) {
       nebulaSystem.update();
    }

    async loadSystem(json: JSON, scene: THREE.Scene) : Promise<NebulaSystem> {
        const loaded = await Nebula.fromJSONAsync(json, THREE, undefined);
        const nebulaRenderer = new SpriteRenderer(scene, THREE);
        return loaded.addRenderer(nebulaRenderer);
    }
}

export default new NebulaEngine();