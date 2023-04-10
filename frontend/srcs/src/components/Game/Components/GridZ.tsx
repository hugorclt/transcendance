/**========================================================================
 *!                           MODIFIED Grid of Prei lib for three fiber
 *========================================================================**/

import * as React from "react";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "./tools/shaderMaterial";

export type GridMaterialType = {
  /** Cell size, default: 0.5 */
  cellSize?: number;
  /** Cell thickness, default: 0.5 */
  cellThickness?: number;
  /** Cell color, default: black */
  cellColor?: THREE.ColorRepresentation;
  /** Section size, default: 1 */
  sectionSize?: number;
  /** Section thickness, default: 1 */
  sectionThickness?: number;
  /** Section color, default: #2080ff */
  sectionColor?: THREE.ColorRepresentation;
  /** Follow camera, default: false */
  followCamera?: boolean;
  /** Display the grid infinitely, default: false */
  infiniteGrid?: boolean;
  /** Fade distance, default: 100 */
  fadeDistance?: number;
  /** Fade strength, default: 1 */
  fadeStrength?: number;
  /** Material side, default: THREE.BackSide */
  side?: THREE.Side;

  gridLength ?: number;
  gridWidth ?: number;
};

export type GridProps = GridMaterialType & {
  /** Default plane-geometry arguments */
  args?: ConstructorParameters<typeof THREE.PlaneGeometry>;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      gridMaterial: JSX.IntrinsicElements["shaderMaterial"] & GridMaterialType;
    }
  }
}

const GridMaterial = shaderMaterial(
  {
    cellSize: 0.5,
    sectionSize: 1,
    fadeDistance: 100,
    fadeStrength: 1,
    cellThickness: 0.5,
    sectionThickness: 1,
    cellColor: new THREE.Color(),
    sectionColor: new THREE.Color(),
    infiniteGrid: 0,
    followCamera: 0,
  },
  `varying vec3 worldPosition;
   uniform float fadeDistance;
   uniform float infiniteGrid;
   uniform float followCamera;
   void main() {
     vec3 pos = position.xzy * (1. + fadeDistance * infiniteGrid);
     pos.xz += (cameraPosition.xz * followCamera);
     worldPosition = pos;
     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
   }`,
  `varying vec3 worldPosition;
   uniform float cellSize;
   uniform float sectionSize;
   uniform vec3 cellColor;
   uniform vec3 sectionColor;
   uniform float fadeDistance;
   uniform float fadeStrength;
   uniform float cellThickness;
   uniform float sectionThickness;
   uniform float infiniteGrid;
   float getGrid(float size, float thickness) {
     vec2 r = worldPosition.xz / size;
     vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
     float line = min(grid.x, grid.y) + 1. - thickness;
     return 1.0 - min(line, 1.);
   }
   void main() {
     float g1 = getGrid(cellSize, cellThickness);
     float g2 = getGrid(sectionSize, sectionThickness);
     float d = 1.0 - min(distance(cameraPosition.xz, worldPosition.xz) / fadeDistance, 1.);
     vec3 color = mix(cellColor, sectionColor, min(1.,sectionThickness * g2));
     gl_FragColor = vec4(color, (g1 + g2) * pow(d,fadeStrength));
     gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
     if (gl_FragColor.a <= 0.0) discard;
     #include <tonemapping_fragment>
     #include <encodings_fragment>
   }`
);

/*================================ RIGHT WALL ==============================*/


export const GridRightWall = React.forwardRef(
  (
    {
      args,
      cellColor = "#F607DC",
      sectionColor = "#2080ff",
      cellSize = 0.5,
      sectionSize = 1,
      followCamera = false,
      infiniteGrid = false,
      fadeDistance = 100,
      fadeStrength = 1,
      cellThickness = 0,
      sectionThickness = 1,
      side = THREE.BackSide,
      ...props
    }: Omit<JSX.IntrinsicElements["mesh"], "args"> & GridProps,
    fRef: React.ForwardedRef<THREE.Mesh>
  ) => {
    extend({ GridMaterial });
    const uniforms1 = {
      cellSize,
      sectionSize,
      cellColor,
      sectionColor,
      cellThickness,
      sectionThickness,
    };
    const uniforms2 = {
      fadeDistance,
      fadeStrength,
      infiniteGrid,
      followCamera,
    };
    return (
      <mesh
        ref={fRef}
        frustumCulled={false}
        rotation={[0, 0, Math.PI / 2]}
        {...props}
      >
        <gridMaterial
          transparent
          extensions-derivatives
          side={THREE.DoubleSide}
          {...uniforms1}
          {...uniforms2}
        />
        <planeGeometry args={args} />
      </mesh>
    );
  }
);

/*================================ LEFT WALL ==============================*/



export const GridLeftWall = React.forwardRef(
  (
    {
      args,
      cellColor = "#F607DC",
      sectionColor = "#2080ff",
      cellSize = 0.5,
      sectionSize = 1,
      followCamera = false,
      infiniteGrid = false,
      fadeDistance = 100,
      fadeStrength = 1,
      cellThickness = 0,
      sectionThickness = 1,
      side = THREE.DoubleSide,
      ...props
    }: Omit<JSX.IntrinsicElements["mesh"], "args"> & GridProps,
    fRef: React.ForwardedRef<THREE.Mesh>
  ) => {
    extend({ GridMaterial });
    const uniforms1 = {
      cellSize,
      sectionSize,
      cellColor,
      sectionColor,
      cellThickness,
      sectionThickness,
    };
    const uniforms2 = {
      fadeDistance,
      fadeStrength,
      infiniteGrid,
      followCamera,
    };
    return (
      <mesh
        ref={fRef}
        frustumCulled={true}
        rotation={[0, 0, Math.PI / 2]}
        visible={true}
        {...props}
      >
        <gridMaterial
          transparent
          extensions-derivatives
          side={side}
          {...uniforms1}
          {...uniforms2}
        />
        <planeGeometry args={args} />
      </mesh>
    );
  }
);

/*================================ FLOOR ==============================*/

export const GridFloor = React.forwardRef(
  (
    {
      args,
      cellColor = "#F607DC",
      sectionColor = "#2080ff",
      cellSize = 0,
      sectionSize = 4,
      followCamera = false,
      infiniteGrid = false,
      fadeDistance = 200,
      fadeStrength = 5,
      cellThickness = 1,
      sectionThickness = 1,
      side = THREE.DoubleSide,
      gridLength = 64,
      gridWidth = 32,
      ...props
    }: Omit<JSX.IntrinsicElements["mesh"], "args"> & GridProps,
    fRef: React.ForwardedRef<THREE.Mesh>
  ) => {
    extend({ GridMaterial });
    const uniforms1 = {
      cellSize,
      sectionSize,
      cellColor,
      sectionColor,
      cellThickness,
      sectionThickness,
    };
    const uniforms2 = {
      fadeDistance,
      fadeStrength,
      infiniteGrid,
      followCamera,
    };
    return (
      <mesh
        ref={fRef}
        frustumCulled={true}
        rotation={[0, 0, 0]}
        visible={true}
        {...props}
      >
        <gridMaterial
          transparent
          extensions-derivatives
          side={side}
          {...uniforms1}
          {...uniforms2}
        />
        <planeGeometry args={[gridLength, gridWidth]} />
      </mesh>
    );
  }
);
