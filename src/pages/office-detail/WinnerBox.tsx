import { useEffect, useState } from "react";

interface WinnerBoxProps {
    visible: boolean;
    name: string;
    onEnd: () => void;
}

export default function WinnerBox({ visible, name, onEnd }: WinnerBoxProps) {
    useEffect(() => {
        if (visible) {
            const t = setTimeout(() => {
                onEnd();
            }, 10000);
            return () => {
                clearTimeout(t);
            }
        }
    }, [visible, onEnd]);
    return <div className={`winner-box ${visible ? "" : "hide"}`}>
        <div className="winner-header">WINNER</div>
        <div className="winner-name">{name}</div>
    </div>
}