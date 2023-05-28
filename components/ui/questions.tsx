import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";

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
}

interface iQuizComponent {
  questions: iQuestion[];
  questionNumber: number;
  submit: Function;
}

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
        source={require("../../assets/desk.jpg")}
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

export const AllQuestions: React.FC<iQuizComponent> = ({
  questions,
  questionNumber,
  submit,
}) => {
  let item = questions[questionNumber];
  return <Question question={item} submit={submit} />;
};
