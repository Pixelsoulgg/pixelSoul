import { DungeonContent } from "@/views/dungeons";
import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

import Layout from '@/layouts'

index.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export default function index() {
  return (
    <Flex flex={1} w="full" flexDirection="column">
      <DungeonContent
        type="Action"
        borderBottom="1.5px solid #E4E7EC"
        sortBy="Game"
      >
        <Button variant="active" w="160px">
          All Game
        </Button>
        <Button variant="normal" w="160px" mx="10px">
          Action
        </Button>
        <Button variant="normal" w="160px">
          Arena
        </Button>
      </DungeonContent>


      <DungeonContent
        type="Arena"
        mt="20px"
        sortBy="Gold"
      >
        <Text variant="with-title">To the TOP</Text>
      </DungeonContent>
    </Flex>
  );
}
