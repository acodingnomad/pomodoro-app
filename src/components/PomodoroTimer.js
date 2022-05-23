import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  createContext,
} from "react";

const SettingsContext = createContext({});

const PomodoroTimer = () => {
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const settingsInfo = useContext(SettingsContext);

  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  };

  useEffect(() => {
    function switchMode() {
      const nextSeconds = 25 * 60;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = 25 * 60;
    setSecondsLeft(secondsLeftRef.current);

    let interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  const startTimer = () => {
    setIsPaused(false);
    isPausedRef.current = false;
  };
  const pauseTimer = () => {
    setIsPaused(true);
    isPausedRef.current = true;
  };
  return (
    <div className="text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-[#609541]">
        Pomodoro Timer
      </h1>
      <div className="flex m-auto items-center justify-center mt-8 bg-cover w-64 h-64 rounded-lg bg-[url('./pomodoro.png')]">
        <p className="text-white text-3xl pl-4 pt-6 font-bold">
          {minutes}:{seconds === "0" ? "00" : seconds}
        </p>
      </div>
      <div className="flex mt-10 justify-center space-x-4">
        <button
          onClick={startTimer}
          className="py-3 bg-[#dd2d44] w-32 rounded-lg text-[white] font-semibold hover:bg-[#dd2d4475] hover:text-[#dd2d44]"
        >
          Starte
        </button>
        <button
          onClick={pauseTimer}
          className="py-3 bg-white w-32 rounded-lg text-[#dd2d44] font-semibold hover:bg-[#dd2d4475]"
        >
          Pause
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
