import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [t, setT] = useState<number>(0);
    const [seconde, setSeconde] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [hour, setHour] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        let intervalId: number;
        if (isRunning) {
            intervalId = setInterval(() => {
                setT(t + 1);
                if (t >= 100) {
                    setSeconde(seconde + 1);
                    setT(0);
                }
                if (seconde >= 60) {
                    setSeconde(0);
                    setMinute(minute + 1);
                }
                if (minute >= 60) {
                    setMinute(0);
                    setHour(hour + 1);
                }
            }, 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, t]);

    const startOrPauseTimer = () => {
        setIsRunning(!isRunning);
    };

    const stopTimer = () => {
        setIsRunning(false);
        setT(0);
        setSeconde(0);
        setMinute(0);
        setHour(0);
    };
    return (
        <main className="relative w-screen h-screen bg-slate-100">
            <div className="w-full h-full flex items-center justify-center flex-col">
                <div className="bg-white w-1/5 h-1/4 rounded-sm shadow-[10px_10px_4px_-4px_rgba(213,220,217,1)]">
                    <div className="text-5xl font-open-sans text-[#657070] h-3/4 flex items-center justify-center relative">
                        <span>
                            {hour.toString().length < 2
                                ? hour.toString().padStart(2, "0")
                                : hour}
                            :
                            {minute.toString().length < 2
                                ? minute.toString().padStart(2, "0")
                                : minute}
                            :
                            {seconde.toString().length < 2
                                ? seconde.toString().padStart(2, "0")
                                : seconde}
                        </span>
                        <div className="w-20 text-center absolute top-2 right-2 rounded-sm bg-blue-500 text-white text-xs px-2 py-1 ">
                            {isRunning ? "RUNNING" : "STOPPED"}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 h-1/4">
                        <div
                            onClick={startOrPauseTimer}
                            className="bg-cyan-700 text-white flex items-center justify-center hover:cursor-pointer"
                        >
                            {!isRunning ? (
                                <i className="fa-solid fa-play"></i>
                            ) : (
                                <i className="fa-solid fa-pause"></i>
                            )}
                        </div>
                        <button
                            onClick={stopTimer}
                            disabled={isRunning === false}
                            className="bg-blue-300 text-white"
                        >
                            <i className="fa-solid fa-stop"></i>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default App;
