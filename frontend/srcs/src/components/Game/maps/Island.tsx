import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Island() {
    const gltf = useLoader(GLTFLoader, '/island.gltf')
    return <primitive object={gltf.scene} />
  
}

export default Island