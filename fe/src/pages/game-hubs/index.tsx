import { InputPixel } from "@/components";
import { fonts } from "@/configs/constants";
import Layout from "@/layouts";
import { ButtonVariants, TextVariants } from "@/themes/theme";
import { GameHubCarousel, GameHubGames } from "@/views/game-hubs";
import { Button, Flex, HStack, Image, Input, Text } from "@chakra-ui/react";
import React from "react";

GameHub.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export default function GameHub() {
  return (
    <Flex flex={1} w="full" flexDirection="column">
      <GameHubCarousel />
      <GameHubGames />
    </Flex>
  );
}
