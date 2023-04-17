import { Vector3 } from "three";
import { Object3D } from "./interfaces";

function createMeshComponent(object : Object3D) {
    const position = new Vector3(object.position.x, object.position.y, object.position.z);
  
    switch (object.type) {
      case 'BOX':
        return (
          <mesh position={position}>
            <boxGeometry args={[object.width, object.height, object.depth]} />
          </mesh>
        );
      case 'SPHERE':
        return (
          <mesh position={position}>
            <sphereGeometry args={[object.width, object.height, object.depth]} />
          </mesh>
        );
      default:
        return null;
    }
  }