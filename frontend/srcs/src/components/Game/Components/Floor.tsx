import { useState } from "react";
import { degreeToRad } from "../../../services/Game/utilsGame";

interface TFloorProps {
    width: number,
    length: number,
}

const Floor = (props: TFloorProps) => {
  return (
    <mesh rotation={[degreeToRad(-90), 0, 0]} position={[props.width / 2, 0, props.length / 2 ]}>
      <planeGeometry args={[props.width, props.length]} />
      <meshToonMaterial color={"#000000"} />
    </mesh>
  );
};

export default Floor;
