import { useState } from "react";
import { degreeToRad } from "../../../services/Game/utilsGame";

interface TFloorProps {
    width: number,
    height: number,
}

const Floor = (props: TFloorProps) => {
  return (
    <mesh rotation={[degreeToRad(-90), 0, 0]} position={[props.width / 2, 0, props.height / 2 ]}>
      <planeGeometry args={[props.width, props.height]} />
      <meshToonMaterial color={"#000000"} />
    </mesh>
  );
};

export default Floor;
