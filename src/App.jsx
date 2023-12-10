import { useEffect, useState } from "react";
import "./App.css";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Play from "./components/Play";
import { moneyPyramid } from "./data/moneyPiramid";
import { data } from "./data/englishQuestions";
import getRandomQuestions from "./utils/getRandomQuestions";
import Audio from "./components/Audio";

const selectedQ = getRandomQuestions(data, moneyPyramid.length);

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(
        moneyPyramid.find((elem) => elem.id === questionNumber - 1).amount
      );
  }, [questionNumber]);

  return (
    <>
      {!isPlaying ? (
        <Play isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      ) : (
        <div className="app">
          <div className="main">
            {stop ? (
              <div className="endText">
                <h1>You earned: {earned}</h1>
                <button
                  className="playAgain"
                  onClick={() => window.location.reload()}
                >
                  Play Again?
                </button>
              </div>
            ) : (
              <>
                <div className="top">
                  {selectedQ[questionNumber - 1].hasAudio ? (
                    <Audio props={selectedQ} questionNumber={questionNumber} />
                  ) : (
                    <div className="timer">
                      <Timer
                        setStop={setStop}
                        questionNumber={questionNumber}
                      />
                    </div>
                  )}
                </div>
                <div className="bottom">
                  <Trivia
                    data={selectedQ}
                    setStop={setStop}
                    setQuestionNumber={setQuestionNumber}
                    questionNumber={questionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((item, key) => (
                <li
                  key={key}
                  className={
                    questionNumber === item.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyItemNumber">{item.id}</span>
                  <span className="moneyItemAmount">{item.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
