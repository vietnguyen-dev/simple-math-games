import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { AllQuestions, iQuestion } from "../ui/questions";

interface iGameScreen {
  handleGoToStart: () => void;
  question: number;
  timeLeft: number;
  numQuestions: number;
  questions: iQuestion[];
  submitAnswer: Function;
}

const GameScreen: React.FC<iGameScreen> = ({
  handleGoToStart,
  question,
  timeLeft,
  numQuestions,
  questions,
  submitAnswer,
}) => {
  return (
    <>
      <View className="flex flex-row items-end bg-pink-700 h-[10%] pb-2 px-7">
        <TouchableOpacity onPress={handleGoToStart} className="basis-1/6">
          <Ionicons name="caret-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-lg text-white font-extrabold text-center basis-2/3">
          {question + 1} / {numQuestions}
        </Text>
        {timeLeft > 59 ? (
          <Text className="text-lg text-white font-extrabold basis-1/6">
            01:00
          </Text>
        ) : (
          <Text className="text-lg text-white font-extrabold basis-1/6">
            00:{timeLeft}
          </Text>
        )}
      </View>
      <AllQuestions
        questions={questions}
        questionNumber={question}
        submit={submitAnswer}
      />
    </>
  );
};

export default GameScreen;
