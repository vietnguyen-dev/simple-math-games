import { Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

interface iStartPage {
  handleStart: () => void;
}

const StartScreen: React.FC<iStartPage> = ({ handleStart }) => {
  return (
    <>
      <View className="flex justify-center align-middle pt-12 items-center h-3/6 mx-4">
        <Text className="text-3xl text-white">K++ Quiz Day</Text>
        <TouchableOpacity
          className="bg-sky-950 mt-4 w-full rounded-md shadow h-[15%] flex justify-center"
          onPress={handleStart}
        >
          <Text className=" text-white text-xl text-center">
            Multiplication
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-400 mt-4 w-full rounded-md shadow h-[15%] flex justify-center"
          activeOpacity={1}
          onPress={handleStart}
        >
          <Text className=" text-white text-xl text-center">Division</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-lime-700 mt-4 w-full rounded-md shadow h-[15%] flex justify-center"
          activeOpacity={1}
          onPress={handleStart}
        >
          <Text className=" text-white text-xl text-center">Addition</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-950 mt-4 w-full rounded-md h-[15%] flex justify-center"
          activeOpacity={1}
          onPress={handleStart}
        >
          <Text className=" text-white text-xl text-center ">Subtraction</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require("./../../assets/school.png")}
        className="h-3/6 w-[100%]"
      />
    </>
  );
};

export default StartScreen;
