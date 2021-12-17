import "./App.css";
import { Canvas } from "@react-three/fiber";
import WorkspaceCustom from "./pages/WorkspaceCustom";

function App() {
    return (
        <div className="App">
            <WorkspaceCustom style={{ background: "#000957" }} />
        </div>
    );
}

export default App;
