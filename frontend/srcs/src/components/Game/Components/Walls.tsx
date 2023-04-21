import React from "react";
import { Mesh, Vector3 } from "three";
import { Object3D } from "./Assets/interfaces";
import { createMeshComponent } from "./Assets/meshGenerator";

type WallsProps = {
  walls: Object3D[];
};

function Walls({ walls }: WallsProps) {
  return (
    <>
      {walls.map((wall, index) => {
        const ref = React.createRef<Mesh>();
        const meshComponent = createMeshComponent(wall, ref, false);

        return (
          <React.Fragment key={index}>
            {meshComponent}
          </React.Fragment>
        );
      })}
    </>
  );
}

export default Walls;
