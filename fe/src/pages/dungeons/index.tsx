import { DungeonContent } from "@/views/dungeons";
import { Button, Container, Flex, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

import Layout from "@/layouts";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import {
  changeGameTypeAction,
  getChallengesAction,
  getGamesAction,
} from "@/reduxs/dungeons/dungeon.slices";
import { DungeonGameType } from "@/types/dungeon.types";

Index.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export default function Index() {
  const dispatch = useAppDispatch();
  const { auth0Info } = useAppSelector((p) => p.auth);
  const { gameType } = useAppSelector((p) => p.dungeon);

  const fetchChallenges = useCallback(async () => {
    if (auth0Info && auth0Info.steamId) {
      dispatch(getChallengesAction(auth0Info.steamId));
    }
  }, [auth0Info]);

  useEffect(() => {
    dispatch(getGamesAction());
  }, []);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  return (
    <Flex flex={1} w="full" flexDirection="column">
      <DungeonContent type="Action" sortBy="Game">
        <Text variant="with-24" w="115px">
          Genres
        </Text>
        <Button
          variant={gameType === DungeonGameType.All ? "active" : "normal"}
          onClick={() => dispatch(changeGameTypeAction(DungeonGameType.All))}
          w="160px"
        >
          All Game
        </Button>
        <Button
          variant={gameType === DungeonGameType.Action ? "active" : "normal"}
          onClick={() => dispatch(changeGameTypeAction(DungeonGameType.Action))}
          w="160px"
          mx="10px"
        >
          Action
        </Button>
        <Button
          w="160px"
          variant={gameType === DungeonGameType.Arena ? "active" : "normal"}
          onClick={() => dispatch(changeGameTypeAction(DungeonGameType.Arena))}
        >
          Arena
        </Button>
      </DungeonContent>
    </Flex>
  );
}
