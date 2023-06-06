import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";

export interface iQuestion {
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
  playSound: Function;
}

interface iQuizComponent {
  questions: iQuestion[];
  questionNumber: number;
  submit: Function;
}

const Question: React.FC<iQuestionComponent> = ({
  question,
  submit,
  playSound,
}) => {
  const questionOptions = Object.values(question.options);

  return (
    <>
      <View className="flex justify-center items-center h-[35%] bg-[#595959]">
        <View className="bg-white rounded-lg shadow h-[70%] w-[90%] flex justify-center items-center rotate-[-6deg]">
          <View className="bg-white rounded-lg shadow h-[100%] w-[100%] flex justify-center items-center rotate-[3deg]">
            <View className="bg-white rounded-lg shadow h-[100%] w-[100%] flex justify-center items-center rotate-[3deg]">
              <Text className="text-5xl">{question.question}</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="px-5 bg-[#595959] h-[100%]">
        {questionOptions.map((item, index) => (
          <TouchableOpacity
            activeOpacity={1}
            key={index}
            className="shadow rounded-md flex justify-center items-center bg-white mb-5 h-[5%]"
            onPress={() => {
              submit(question.answer, item);
              playSound();
            }}
          >
            <Text className="text-2xl">{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export const AllQuestions: React.FC<iQuizComponent> = ({
  questions,
  questionNumber,
  submit,
}) => {
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

  let item = questions[questionNumber];

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Click Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playClick() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/music/click.mp3")
    );
    console.log("Playing Click Sound");
    setSound(sound);
    await sound.playAsync();
  }
  return <Question question={item} submit={submit} playSound={playClick} />;
};
