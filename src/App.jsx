import { useEffect, useState } from "react";
import "./App.css";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Play from "./components/Play";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");
  const [isPlaying, setIsPlaying] = useState(false);

  const moneyPyramid = [
    { id: 1, amount: "$ 100" },
    { id: 2, amount: "$ 250" },
    { id: 3, amount: "$ 500" },
    { id: 4, amount: "$ 1000" },
    { id: 5, amount: "$ 2500" },
    { id: 6, amount: "$ 5000" },
    { id: 7, amount: "$ 10000" },
    { id: 8, amount: "$ 25000" },
    { id: 9, amount: "$ 50000" },
    { id: 10, amount: "$ 100000" },
    { id: 11, amount: "$ 250000" },
    { id: 12, amount: "$ 500000" },
    { id: 13, amount: "$ 1000000" },
    { id: 14, amount: "$ 2500000" },
    { id: 15, amount: "$ 5000000" },
    { id: 16, amount: "$ 10000000" },
  ].reverse();

  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
  ];

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
                <h1 >You earned: {earned}</h1>
                <button className="playAgain" onClick={() => window.location.reload()}>Play Again?</button>
              </div>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
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
