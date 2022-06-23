import { useEffect, useRef } from "react"
import { useAppDispatch } from "../../stores";
import { setGameState } from "../../stores/game-slice";
import { GameState } from "../../types/game-state";

export function GameStartMessage() {
    const countDownRef = useRef<HTMLSpanElement | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => {
            setInterval(() => {
                if (countDownRef.current) {
                    const newValue = +(countDownRef.current.textContent || "0") - 1;

                    if (newValue === 0) {
                        dispatch(setGameState(GameState.PLAYING))
                    } else {
                        countDownRef.current.textContent = newValue + "";
                    }
                }
            }, 1000)
        }, 1000)
    }, [dispatch])

    return (
        <div className="gamestart-message">
            <p>Minigame will start after</p>
            <p><span ref={countDownRef} className="gamestart-message__countdown">10</span> seconds</p>
            <p>Find a safe place</p>
            <p>Press E to catch the others</p>
        </div>
    )
}