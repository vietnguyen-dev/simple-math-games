import { View, Text, TouchableOpacity, Button } from "react-native";
import React from "react";

import Score from "../ui/score";

interface iResultsScreen {
  score: number;
  numQuestions: number;
  handleGoToStart: () => void;
  handleRestart: () => void;
}

const ResultsScreen: React.FC<iResultsScreen> = ({
  score,
  numQuestions,
  handleGoToStart,
  handleRestart,
}) => {
  return (
    <View className="flex justify-center items-center h-full ">
      <Score score={score / numQuestions} />
      <Text className="text-2xl mb-3">
        Score: {score} / {numQuestions}
      </Text>
      <TouchableOpacity className="bg-blue-400 w-full mt-7">
        <Button
          onPress={handleGoToStart}
          title="Go To Start"
          color="white"
          accessibilityLabel="Learn more about this purple button"
        />
      </TouchableOpacity>
      <TouchableOpacity className="bg-blue-400 w-full mt-7">
        <Button
          onPress={handleRestart}
          title="Restart"
          color="white"
          accessibilityLabel="Learn more about this purple button"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ResultsScreen;
