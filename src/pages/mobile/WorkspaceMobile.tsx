import {Joystick} from 'react-joystick-component';
import Workspace from "../office-detail/Workspace";

export type positionType = {
    x: number;
    y: number;
};

const WorkspaceCustom = () => {
    return (
        <>
            <Workspace mobile/>
            <div style={{position: "absolute", bottom: 30, width: "100vw", display: "flex", justifyContent: "center"}}>
                <Joystick size={150} move={({x, y}) => {
                    x = x ? x / 75 : 0;
                    y = y ? y / 75 : 0;

                    const w = window as any;
                    w.moveVector = [x, 0, y];
                }} stop={() => {
                    const w = window as any;
                    w.moveVector = [0, 0, 0];
                }} baseColor="gray" stickColor="white"/>
            </div>
        </>
    );
};

export default WorkspaceCustom;
