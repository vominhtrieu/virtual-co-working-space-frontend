import 'antd/dist/antd.css';
import { Canvas } from "@react-three/fiber";
import "./App.css";
import Scene from "./components/Scene";
import ShowListEditItem from './components/listItem/ShowListEditItem';
import Chair from './components/Models/Chair';

function App() {
    const name="Chair";

    const items = [Chair, Chair, Chair, Chair,Chair];

    return (
        <div className="App" >

            <Canvas
                shadows={{ enabled: true, autoUpdate: true }}
                camera={{ position: [0, 20, 10], rotation: [45, 0, 0] }}
                style={{ height: "100vh", background: "#222222" }}
            >
                <Scene />
            </Canvas>

            <ShowListEditItem items={items} name={name}/>
        </div>
    );
}

export default App;
