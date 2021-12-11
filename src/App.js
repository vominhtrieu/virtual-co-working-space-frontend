import { Canvas } from "@react-three/fiber";
import "./App.css";
import Scene from "./components/Scene";

function App() {
    return (
        <div className="App">
            <Canvas
                shadows={{ enabled: true, autoUpdate: true }}
                camera={{ position: [0, 20, 10], rotation: [45, 0, 0] }}
                style={{ height: "100vh", background: "#222222" }}
            >
                <Scene />
            </Canvas>
        </div>
    );
}

export default App;
