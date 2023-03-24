import { createMaterialArray } from "../../../services/Game/utilsGame";

const SKYBOX = "space/eclipse/redeclipse";

const SkyBox = () => {
  const skyBox = createMaterialArray(SKYBOX);

  return (
    <mesh material={skyBox}>
      <boxGeometry args={[1000, 1000, 1000]} />
    </mesh>
  );
};

export default SkyBox;
