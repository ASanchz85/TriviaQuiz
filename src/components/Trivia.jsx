import { useEffect, useState } from "react";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";
import wait from "../sounds/wait.mp3";

export default function Trivia({
  data,
  setStop,
  setQuestionNumber,
  questionNumber,
}) {
  const [question, setQuestion] = useState(null);
  const [selAnswer, setSelAnswer] = useState(null);
  const [classN, setClassN] = useState("answer");

  const waitAudio = new Audio(wait);
  const correctAudio = new Audio(correct);
  const wrongAudio = new Audio(wrong);

  useEffect(() => {
    setTimeout(() => {
      waitAudio.volume = 0.5;
      waitAudio.play();
      waitAudio.loop = true;
    }, 1500);
    return () => {
      waitAudio.pause();
      waitAudio.currentTime = 0;
      correctAudio.pause();
      wrongAudio.pause();
    };
  }, []);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const handleClick = (a) => {
    setSelAnswer(a);
    setClassN("answer active");

    setTimeout(() => {
      setClassN(a.correct ? "answer correct" : "answer wrong");
    }, 1000);

    setTimeout(() => {
      if (a.correct) {
        correctAudio.volume = 0.5;
        correctAudio.play();

        setTimeout(() => {
          setQuestionNumber((prev) => prev + 1);
          setSelAnswer(null);
        }, 1000);
      } else {
        wrongAudio.volume = 0.5;
        wrongAudio.play();

        setTimeout(() => {
          setStop(true);
        }, 1000);
      }
    }, 4000);
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((answ, key) => (
          <div
            key={key}
            className={selAnswer === answ ? classN : "answer"}
            onClick={() => handleClick(answ)}
          >
            {answ.text}
          </div>
        ))}
      </div>
    </div>
  );
}
