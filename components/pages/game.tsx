import { Text, View, Button, TouchableOpacity } from "react-native";
import React from "react";

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
  );
};

export default GameScreen;
