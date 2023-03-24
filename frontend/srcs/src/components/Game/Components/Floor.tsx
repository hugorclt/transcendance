import { useState } from "react";
import { degreeToRad } from "../../../services/Game/utilsGame";

interface TFloorProps {
    width: number,
    length: number,
}

const Floor = (props: TFloorProps) => {
  return (
    <mesh rotation={[degreeToRad(-90), 0, 0]} position={[0, 0,0]}>
      <planeGeometry args={[props.width, props.length]} />
      <meshToonMaterial color={"#000000"} />
    </mesh>
  );
};

export default Floor;
