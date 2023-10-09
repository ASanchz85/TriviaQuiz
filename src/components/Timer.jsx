import { useEffect, useState } from "react";
import wrong from "../sounds/wrong.mp3";

export default function Timer({ setStop, questionNumber }) {
  const [timer, setTimer] = useState(30);

  const wrongAudio = new Audio(wrong);

  useEffect(() => {
    if (timer === 0) {
      wrongAudio.volume = 0.5;
      wrongAudio.play();
      return setStop(true);
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setStop, timer]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  return timer;
}
