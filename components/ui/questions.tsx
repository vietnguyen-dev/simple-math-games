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
      <View className="flex justify-center items-center h-[35%] bg-[#595959]">
        <View className="bg-white rounded-lg shadow h-[70%] w-[90%] flex justify-center items-center">
          <Text className="text-5xl">{question.question}</Text>
        </View>
      </View>
      <View className="h-[70%] px-5 bg-[#595959]">
        {questionOptions.map((item, index) => (
          <TouchableOpacity
            activeOpacity={1}
            key={index}
            className="shadow rounded-md flex justify-center items-center bg-white h-[7%] mb-5"
            onPress={() => submit(question.answer, item)}
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
  let item = questions[questionNumber];
  return <Question question={item} submit={submit} />;
};
