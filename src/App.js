import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./App.css";
const loader = new GLTFLoader();

function Box() {
    return (
        <mesh>
            <boxBufferGeometry attach="geometry" />
            <meshStandardMaterial attach="material" color="blue" />
        </mesh>
    );
}

// function Load3DModel() {
//     loader.load(
//         "src/models/Chair.glb",
//         function (gltf) {
//             scene.add(gltf.scene);
//         },
//         undefined,
//         function (error) {
//             console.error(error);
//         }
//     );
// }

function App() {
    return (
        <div className="App">
            <Canvas style={{ height: "100vh", background: "#4059CC" }}>
                <OrbitControls />
                <Box />
            </Canvas>
        </div>
    );
}

export default App;
