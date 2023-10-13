import { useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
    const [t, setT] = useState<number>(0);

    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        let intervalId: number;
        if (isRunning) {
            intervalId = setInterval(() => {
                setT(t + 1);
                console.log(t);
            }, 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, t]);

    const seconde = useMemo(() => {}, [t]);

    return (
        <>
            <button onClick={() => setIsRunning(!isRunning)}>test</button>
            <span className="text-red-500 underline">Hello world</span>
            <span>
                {t.toString().length < 2 ? t.toString().padStart(2, "0") : t}
            </span>
        </>
    );
}

export default App;
