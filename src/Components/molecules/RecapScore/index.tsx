import { Flex, Space, Typography } from "antd";
import { useQuizContext } from "../../../Hooks/useQuiz";
import { Stats } from "../../atoms";

export const RecapScore = () => {
  const { state } = useQuizContext();
  const countWrong = state.questions.length - state.countRight;

  return (
    <Flex gap="middle" vertical>
      <Typography.Title level={4}>Game Selesai</Typography.Title>
      <Stats amount={state.score} label="Score" />
      <Space direction="vertical">
        <Stats amount={state.countRight} label="Right" color="#22c55e" />
        <Stats amount={countWrong} label="Wrong" color="#ef4444" />
      </Space>
    </Flex>
  );
};
