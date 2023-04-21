import { DungeonContent } from "@/views/dungeons";
import { Button, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";

import Layout from '@/layouts'
import DungeonCarousel from "@/views/dungeons/DungeonCarousel";

index.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};


export default function index() {
  return (
    <Flex flex={1} w="full" flexDirection="column">
      <DungeonContent
        type="Action"       
        sortBy="Game"
      >
        <Text variant="with-24" w="115px">Genres</Text>
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
    </Flex>
  );
}
