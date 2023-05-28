import { Text } from "react-native";

interface iScoreComponent {
  score: number;
}

const Score: React.FC<iScoreComponent> = ({ score }) => {
  let grade = "F";
  if (score >= 0.9) {
    grade = "A";
    return <Text className="text-9xl mb-3 text-blue-500">{grade}</Text>;
  } else if (score >= 0.8) {
    grade = "B";
    return <Text className="text-9xl mb-3 text-blue-400">{grade}</Text>;
  } else if (score >= 0.7) {
    grade = "C";
    return <Text className="text-9xl mb-3 text-red-400">{grade}</Text>;
  } else if (score >= 0.6) {
    grade = "D";
    return <Text className="text-9xl mb-3 text-red-300">{grade}</Text>;
  }
  return <Text className="text-9xl mb-3 text-red-600 font-bold">{grade}</Text>;
};

export default Score;
