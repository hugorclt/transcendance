import { createMaterialArray } from "../../../services/Game/utilsGame";

const SKYBOX = "space/eclipse/redeclipse";

const SkyBox = () => {
  const skyBox = createMaterialArray(SKYBOX);

  return (
    <mesh material={skyBox}>
      <boxGeometry args={[2000, 2000, 2000]} />
    </mesh>
  );
};

export default SkyBox;
