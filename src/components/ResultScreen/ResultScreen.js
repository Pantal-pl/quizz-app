import "../../css/ResultScreen.css";
import React, { useEffect, useCallback, useRef } from "react";
import MainButton from "../StartScreen/MainButton";
import { Link, useLocation } from "react-router-dom";
import ScoreBar from "./ScoreBar";
import { useMutation, useQuery } from "urql";

import { ReactComponent as Tick } from "../ResultScreen/tick.svg";
import { ReactComponent as X } from "../ResultScreen/x.svg";

import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

const ResultScreen = () => {
  const location = useLocation();
  const time = 180 - location.state.time;
  const points = location.state.points;
  const answers = location.state.answers;
  const correctAnswer = location.state.correctAnswer;
  const type = location.state.type;

  const questionName = [
    "ISO Code",
    "currency",
    "prefix",
    "continent",
    "capitol",
    "language",
    "flag",
  ];

  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
        ticks:1000,
        gravity:1.3
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 35,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    makeShot(0.12, {
      spread: 20,
      startVelocity: 55,
    });

    makeShot(0.23, {
      spread: 220,
      startVelocity: 15,
    });
  }, [makeShot]);

  let timeMultiply = 1;
  if (time < 40) {
    timeMultiply = 1;
  } else if (time >= 40 && time < 60) {
    timeMultiply = 0.95;
  } else if (time >= 60 && time < 80) {
    timeMultiply = 0.9;
  } else if (time >= 80 && time < 120) {
    timeMultiply = 0.8;
  } else if (time >= 120 && time < 155) {
    timeMultiply = 0.7;
  } else {
    timeMultiply = 0.6;
  }

  const scoreValue = points * 100 * timeMultiply;

  const queryExp = `query MyQuery {
    users {
      exp
    }
  }
  `;

  const swipeUp = () => {
    window.scrollTo(0, 0);
  };

  const [expResult, reexecuteQuery] = useQuery({
    query: queryExp,
  });

  useEffect(() => {
    reexecuteQuery();
    setTimeout(() => {
      fire();
    }, 100);
  }, []);

  const updateExpMutation = `mutation MyMutation($exp: Int = ${
    expResult.data.users[0].exp + scoreValue
  }) {
    update_users(_set: {exp: $exp}, where: {}) {
      returning {
        user_id
        exp
      }
    }
  }
  `;

  const [result, updateExp] = useMutation(updateExpMutation);
  useEffect(() => {
    updateExp();
  }, []);

  return (
    <>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      <section className="resultScreen">
        <label>
          <h1>Result: {points}/7</h1>
          <p>Score</p>
          <ScoreBar value={scoreValue} type="exp" />
        </label>
        <section className="answers">
          <div className="headings">
            <h2>Questions</h2>
            <h2>Result</h2>
            <h2>Correct</h2>
          </div>
          {answers.map((ans, index) => {
            return (
              <div className="answer" key={index}>
                <p className="questionName">{questionName[index]}</p>
                <div className="questionResult">
                  {answers[index] === correctAnswer[index] ? <Tick /> : <X />}
                </div>
                <p
                  className="correctAnswer"
                  style={{
                    color:
                      answers[index] === correctAnswer[index]
                        ? "#22BB33"
                        : "#BB2124",
                  }}
                >
                  {correctAnswer[index] ===
                  `<img src='https://flagcdn.com/128x96/${correctAnswer[0].toLowerCase()}.webp' />` ? (
                    <img
                      src={`https://flagcdn.com/64x48/${correctAnswer[0].toLowerCase()}.webp`}
                    />
                  ) : (
                    correctAnswer[index]
                  )}
                </p>
              </div>
            );
          })}
        </section>
        <div className="buttons">
          <Link
            onClick={swipeUp}
            to={
              type === "Country"
                ? "/gameTypes/selectCountry"
                : type === "Continent"
                ? "/gameTypes/selectContinent"
                : "/gameTypes/randomCountry/gameScreen"
            }
          >
            <MainButton type="green" text="Try again" />
          </Link>

          <Link to="/gameTypes" onClick={swipeUp}>
            <MainButton type="green" text="Menu" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default ResultScreen;
