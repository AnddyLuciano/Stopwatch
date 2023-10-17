import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [t, setT] = useState<number>(0);
    const [seconde, setSeconde] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [hour, setHour] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

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
        setOpenDialog(true);
    };

    const closeDialog = () => {
        setOpenDialog(false);
    };

    console.log(openDialog);

    return (
        <main className="relative">
            <div>
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
            </div>
            <div className="flex gap-2">
                <button onClick={startOrPauseTimer}>
                    {!isRunning ? "START" : "PAUSE"}
                </button>
                <button
                    onClick={stopTimer}
                    disabled={openDialog === true || t <= 0}
                >
                    STOP
                </button>
            </div>
            <dialog
                open={openDialog === true}
                className="absolute top-0 left-0 w-screen h-screen backdrop-blur-[1px] bg-gray-700/10"
            >
                <div className="w-full h-full flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md relative shadow-lg">
                        <p>ceci n'est qu'un test</p>
                        <button
                            className="absolute -top-2 -right-1"
                            onClick={closeDialog}
                        >
                            <i className="fa-solid fa-circle-xmark text-red-500"></i>
                        </button>
                    </div>
                </div>
            </dialog>
        </main>
    );
}

export default App;
