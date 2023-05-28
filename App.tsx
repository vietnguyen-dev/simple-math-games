import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import StartScreen from "./components/pages/start";
import ResultsScreen from "./components/pages/results";

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const gameStates = ["Start", "In", "Result"];
const numQuestions = 30;
const numSeconds = 60;

interface iQuestion {
  question: string;
  answer: number;
  options: {
    option1: number;
    option2: number;
    option3: number;
    option4: number;
  };
}

interface iQuestionComponent {
  question: iQuestion;
  submit: Function;
}

interface iQuizComponent {
  questions: iQuestion[];
  questionNumber: number;
  submit: Function;
}

const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const createQuestions = () => {
  let questions: iQuestion[] = [];
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

const Question: React.FC<iQuestionComponent> = ({ question, submit }) => {
  const questionOptions = Object.values(question.options);

  return (
    <>
      <View className="flex justify-center items-center h-[35%] bg-[#F1E3C8]">
        <View className="bg-white px-[30%] py-[20%] rounded-lg shadow absolute rotate-[6deg] w-[85%] h-[58%]"></View>
        <View className="bg-white px-[30%] py-[20%] rounded-lg shadow absolute rotate-[3deg] w-[85%] h-[58%]"></View>
        <View className="bg-white px-[30%] py-[20%] rounded-lg shadow">
          <Text className="text-5xl">{question.question}</Text>
        </View>
      </View>
      <ImageBackground
        source={require("./assets/desk.jpg")}
        className="h-[65%]"
      >
        <View className="mt-4 flex flex-row flex-wrap justify-center items-center gap-[3%]">
          {questionOptions.map((item, index) => (
            <TouchableOpacity
              activeOpacity={1}
              key={index}
              className="shadow rounded-md flex justify-center items-center bg-white w-[40%] h-[45%]"
              onPress={() => submit(question.answer, item)}
            >
              <Text className="text-3xl">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ImageBackground>
    </>
  );
};

const AllQuestions: React.FC<iQuizComponent> = ({
  questions,
  questionNumber,
  submit,
}) => {
  let item = questions[questionNumber];
  return <Question question={item} submit={submit} />;
};

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
    setGameState(gameStates[0]);
  };

  const submitAnswer = (answer: number, input: number) => {
    if (answer === input) {
      setScore(score + 1);
    }
    if (question < 29) {
      setQuestion(question + 1);
    } else {
      console.log("send result");
      setGameState(gameStates[2]);
    }
  };

  return (
    <View className="h-[100%] bg-[#73C4BD]">
      <StatusBar style="light" />
      {gameState === gameStates[0] && <StartScreen handleStart={handleStart} />}
      {gameState === gameStates[1] && (
        <>
          <View className="flex bg-pink-700 h-[10%] flex-row items-end pb-2">
            <TouchableOpacity className="basis-1/6">
              <Button
                onPress={handleGoToStart}
                title="<"
                color="white"
                accessibilityLabel="Learn more about this purple button"
              />
            </TouchableOpacity>
            <Text className="text-lg text-white font-extrabold basis-4/6 text-center">
              {question + 1} / {numQuestions}
            </Text>
            <Text className="text-lg text-white font-extrabold basis-1/6">
              00:{timeLeft}
            </Text>
          </View>
          <View>
            <AllQuestions
              questions={questions}
              questionNumber={question}
              submit={submitAnswer}
            />
          </View>
        </>
      )}
      {gameState === gameStates[2] && (
        <ResultsScreen
          score={score}
          numQuestions={numQuestions}
          handleGoToStart={handleGoToStart}
        />
      )}
    </View>
  );
};

export default App;
