import Layout from "@/layouts";
import GameContainer from "@/views/game-ui/GameContainer";
import Header from "@/views/game-ui/Header";
import LeaderBoard from "@/views/game-ui/LeaderBoard";
import { Flex } from "@chakra-ui/react";
import React from "react";

Game.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="other">{page}</Layout>;
};

export default function Game() {
  return (
    <Flex
      w="full"
      bgImage="/game-ui/bg.png"
      bgSize="cover"
      bgRepeat="no-repeat"
      alignItems='center'
    >
      <Flex
        minH="100vh"
        w="full"
        flexDirection="column"
        maxW="1400px"
        alignSelf="center"
        py="30px"
        margin="0px auto"
      >
        <Header />
        <GameContainer />
        <LeaderBoard />
      </Flex>
    </Flex>
  );
}
