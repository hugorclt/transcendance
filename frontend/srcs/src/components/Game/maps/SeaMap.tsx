import { Cloud, Environment, Lightformer, Sky, Stars } from "@react-three/drei";
import SkyBox from "../Components/SkyBox";
import Ocean from "./Ocean";

const SeaMap = () => {
  return (
    <>
      <Environment background near={1} far={1000} resolution={256}>
        <Sky
          distance={450000}
          sunPosition={[5, 0.2, 8]}
          inclination={0}
          azimuth={0.25}
        />
      </Environment>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <Ocean />
    </>
  );
};

export default SeaMap;
