import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function SceneCamera() {
  const { camera } = useThree();

  useEffect(() => {
    // camera.fov = 75;
    camera.near = 1;
    camera.far = 1000;
    camera.position.set([240, -420, 180]);
    camera.rotateY(60);
    camera.updateProjectionMatrix();
  }, []);
  return <PerspectiveCamera makeDefault></PerspectiveCamera>;
}
