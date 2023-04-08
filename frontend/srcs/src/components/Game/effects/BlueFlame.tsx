import React, {useEffect, useState} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import NebulaEngine, {NebulaSystem} from "./NebulaEngine";
import { json } from "react-router-dom";

interface Props {

}
const BlueFlame : React.FC<Props> = (props: Props) => {
    const {scene} = useThree();
    const [particleSystem, setParticleSystem] = useState<NebulaSystem>();

    useFrame(() => {
        if (particleSystem) {
            NebulaEngine.update(particleSystem);
        }
    })

    useEffect(() => {
        NebulaEngine.loadSystem(json as unknown as JSON, scene).then(nebulaSystem => {
            setParticleSystem(nebulaSystem);
        });
    }, [])

    return (
       <>
       </>
    );
}

export default BlueFlame;