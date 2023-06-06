import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useEffect } from "react";
import { Audio } from "expo-av";

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
  useEffect(() => {
    let gradeSound = score / numQuestions;
    let soundObject: Audio.Sound | undefined;

    async function play() {
      console.log("Loading Sound");
      const aGradeSound = await Audio.Sound.createAsync(
        require("../../assets/music/a-grade-result.mp3")
      );
      const otherGradeSound = await Audio.Sound.createAsync(
        require("../../assets/music/all-other-grade-result.mp3")
      );
      if (gradeSound >= 0.9) {
        soundObject = aGradeSound.sound;
        soundObject.playAsync();
      } else {
        soundObject = otherGradeSound.sound;
        soundObject.playAsync();
      }
    }
    play();
    return () => {
      if (soundObject) {
        console.log("Pausing Sound");
        soundObject.pauseAsync();

        console.log("Unloading Sound");
        soundObject.unloadAsync();
      }
    };
  }, []);

  return (
    <View className="flex justify-center items-center h-full bg-white px-4">
      <Score score={score / numQuestions} />
      <Text className="text-2xl mb-3">
        Score: {score} / {numQuestions}
      </Text>
      <TouchableOpacity className="bg-blue-400 w-full mt-7 rounded-md">
        <Button
          onPress={handleGoToStart}
          title="Go To Start"
          color="white"
          accessibilityLabel="Learn more about this purple button"
        />
      </TouchableOpacity>
      <TouchableOpacity className="bg-green-500 w-full mt-7 rounded-md">
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
