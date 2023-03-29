import { OrbitControls } from '@react-three/drei'
import React, { useEffect, useMemo, useState } from 'react'
import { BoxGeometry, BufferGeometry, CylinderGeometry } from 'three'
import * as THREE from "three";
import {nanoid} from 'nanoid';

const size = 10;

function Hexagone(props: any) {
    const shape = useMemo(() => {
        const shape = new THREE.Shape();
        const sides = 6,
          Xcenter = props.centerX,
          Ycenter = props.centerZ;
    
        shape.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));
    
        for (let i = 1; i <= sides; i += 1) {
          shape.lineTo(
            Xcenter + size * Math.cos((i * 2 * Math.PI) / sides),
            Ycenter + size * Math.sin((i * 2 * Math.PI) / sides)
          );
        }
        return shape;
      }, [size]);

      const settings = useMemo(
        () => ({
          steps: 2,
          depth: 10,
          bevelEnabled: true,
          bevelThickness: 0.2,
          bevelSize: 0.5,
          bevelOffset: 0,
          bevelSegments: 8,
        }),
        []
      );

      return <extrudeGeometry args={[shape, settings]}/>;
}

function ProceduralMap() {
    const [map, setMap] = useState<any>([{}]);

    useEffect(() => {
        setMap(() => {
            var array = new Array;
            for (var i = -5; i< 5; i++) {
                for (var j = -5; j< 5; j++) {
                    array.push(
                        {x: j * 21, z: i * 19}
                    )
                }
            }
            return (array);
        });
    }, [])

    

    function getColor(x: number, z: number) {
        const distFromCenter = Math.sqrt(x * x + z * z);
        const maxDist = 150 * Math.sqrt(3);
        const green = Math.floor(255 - 255 * (distFromCenter / maxDist));
        return `rgb(0, ${green}, 0)`;
      }

      function getY(x: number, z: number) {
        const distFromCenter = Math.sqrt(x * x + z * z);
        const maxDist = 150 * Math.sqrt(3);
        const green = Math.floor(255 - 255 * (distFromCenter / maxDist));
        return green
      }
      
      
    return (
    <>
        <hemisphereLight args={["#ffff", 0.6]} />
        <OrbitControls />
        {map.map((points, i) => {
             const color = getColor(points.x, points.z);
             const y = getY(points.x, points.y);
  return (
    <mesh key={nanoid()} rotation={[359.7, 0, 0]} >
      <Hexagone centerX={points.x} centerZ={points.z}/>
      <meshPhongMaterial color={color} />
    </mesh>
  )
})}
    </>
  )
}

export default ProceduralMap;