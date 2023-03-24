import { Sky } from "@react-three/drei";
import SkyBox from "../Components/SkyBox";
import Ocean from "./Ocean";

const SeaMap = () => {
  return (
    <>
      <Sky
        distance={450000}
        sunPosition={[5, 1, 8]}
        inclination={0}
        azimuth={0.25}
      />
      <Ocean />
      {/* <SkyBox /> */}
    </>
  );
};

export default SeaMap;
