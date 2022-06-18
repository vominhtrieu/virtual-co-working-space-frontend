import { useGLTF } from "@react-three/drei";

const url = "https://virtual-space-models.s3.ap-southeast-1.amazonaws.com/BoxingFist/BoxingGlove.glb"

const Fist = () => {
    const obj = useGLTF(url);

    return (
        <primitive object={obj.scene} />
    )
}

export default Fist;