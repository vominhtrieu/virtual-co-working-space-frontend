import { Canvas } from "@react-three/fiber";
import "./App.css";
import Button from "./components/Button";
import Scene from "./components/Scene";
import WorkspaceCustom from "./pages/WorkspaceCustom";

function App() {
  return (
    <div className="App">
      {/* <Canvas
        shadows={{ enabled: true, autoUpdate: true }}
        camera={{ position: [0, 20, 10], rotation: [45, 0, 0] }}
        style={{ height: "100vh", background: "#222222", position: "fixed" }}
      >
        <Scene />
      </Canvas> */}
      <WorkspaceCustom style={{ background: "#000957" }} />
    </div>
  );
}

export default App;
