import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import StartScreen from "./components/pages/start";
import GameScreen from "./components/pages/game";
import ResultsScreen from "./components/pages/results";

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const gameStates = ["Start", "Game", "Result"];
const numQuestions = 30;
const numSeconds = 60;

const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const createQuestions = () => {
  let questions = [];
  for (let i = 0; i < numQuestions; i++) {
    const randomNumber = Math.floor(Math.random() * 12) + 1;
    const randomNumber2 = Math.floor(Math.random() * 12) + 1;
    const answer = randomNumber * randomNumber2;
    const options = {
      option1: answer,
      option2: answer + 1,
      option3: answer - 1,
      option4: answer + 2,
    };
    const shuffledOptions = shuffleArray(Object.values(options));
    const obj = {
      question: `${randomNumber} x ${randomNumber2}`,
      answer: answer,
      options: {
        option1: shuffledOptions[0],
        option2: shuffledOptions[1],
        option3: shuffledOptions[2],
        option4: shuffledOptions[3],
      },
    };
    questions[i] = obj;
  }
  return questions;
};

const questions = createQuestions();

const App = () => {
  const [gameState, setGameState] = useState<string>(gameStates[0]);

  const [timeLeft, setTimeLeft] = useState<number>(numSeconds);
  const [counting, setCounting] = useState<boolean>(false);

  const [score, setScore] = useState<number>(0);
  const [question, setQuestion] = useState<number>(0);

  // useEffect(() => {
  //   let intervalId: NodeJS.Timeout;
  //   if (counting && timeLeft > 0) {
  //     intervalId = setInterval(() => {
  //       setTimeLeft(timeLeft - 1);
  //     }, 1000);
  //   } else if (timeLeft === 0) {
  //     setGameState(gameStates[2]);
  //     setCounting(false);
  //   }
  //   return () => clearInterval(intervalId);
  // }, [counting, timeLeft]);

  const handleStart = () => {
    setGameState(gameStates[1]);
    setCounting(true);
  };

  const handleGoToStart = () => {
    setTimeLeft(numSeconds);
    setScore(0);
    setQuestion(0);
    setCounting(false);
    setGameState(gameStates[0]);
  };

  const handleRestart = () => {
    setTimeLeft(numSeconds);
    setScore(0);
    setQuestion(0);
    setCounting(false);
    setGameState(gameStates[1]);
  };

  const submitAnswer = (answer: number, input: number) => {
    if (answer === input) {
      setScore(score + 1);
    }
    if (question < 29) {
      setQuestion(question + 1);
    } else {
      setGameState(gameStates[2]);
    }
  };

  return (
    <View className="h-[100%] bg-[#73C4BD]">
      <StatusBar style="light" />
      {gameState === gameStates[0] && <StartScreen handleStart={handleStart} />}
      {gameState === gameStates[1] && (
        <GameScreen
          handleGoToStart={handleGoToStart}
          question={question}
          numQuestions={numQuestions}
          timeLeft={timeLeft}
          questions={questions}
          submitAnswer={submitAnswer}
        />
      )}
      {gameState === gameStates[2] && (
        <ResultsScreen
          score={score}
          numQuestions={numQuestions}
          handleGoToStart={handleGoToStart}
          handleRestart={handleRestart}
        />
      )}
    </View>
  );
};

export default App;
