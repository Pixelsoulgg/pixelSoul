import { Empty } from "@/components";
import Tag from "@/components/dashboards/Tag";
import { CHALLANGES_DATA } from "@/configs/mockup.data";
import {
  activeChallengeAction,
  checkChallengeStatusAction,
} from "@/reduxs/dungeons/dungeon.slices";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { ButtonVariants } from "@/themes/theme";
import {
  Button,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useMemo } from "react";

export default function Challenges() {
  const dispatch = useAppDispatch();
  const { auth0Info } = useAppSelector((p) => p.auth);
  const { challenges, gameId, games, isSubmit } = useAppSelector(
    (p) => p.dungeon
  );
  const filterChallengesByGameId = useMemo(() => {
    return challenges.filter((p) => p.challenge.gameId === gameId);
  }, [gameId, challenges]);

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 0:
        return "Not Started";
      case 1:
        return "In Progress";
      case 2:
        return "Completed";
      default:
        return "";
    }
  };

  const handleCheckOrActive = (challengeId: number, status: number) => {
    try {
      if (auth0Info?.steamId) {
        if (status === 0) {
          dispatch(activeChallengeAction({steamId: auth0Info?.steamId, challengeId})).unwrap();
        }else {
          dispatch(checkChallengeStatusAction({ steamId: auth0Info?.steamId, challengeId})).unwrap();
        }
      } 
    } catch (er) {}
  }
   

  return (
    <Flex
      w="full"
      flexDirection="column"
      maxW="1600px"
      alignSelf="center"
      mt="30px"
    >
      <Text variant="with-24" mb="15px">
        All Challenges
      </Text>
      <Table w="full" className="game-table challenge-table">
        <Thead>
          <Tr>
            <Th minW="250px">Challenge</Th>
            <Th w="20%" minW="150px">
              Game
            </Th>
            <Th w="20%" minW="150px">
              Challenge
            </Th>
            <Th w="15%" minW="200px">
              Status
            </Th>
            <Th w="15%" minW="150px">
              Challenge
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {filterChallengesByGameId.map((item, index) => (
            <Tr key={index.toString()}>
              <Td>
                <VStack w="full" alignItems="flex-start">
                  <Text variant="with-sub" fontWeight="500" color="#039855">
                    {item.challenge.name}
                  </Text>
                  <Text
                    variant="with-sub"
                    fontSize="14px"
                    fontWeight="400"
                    color="#101828"
                  >
                    {item.challenge.description}
                  </Text>
                </VStack>
              </Td>
              <Td>
                <Text variant="with-18">
                  {games.find((p) => p.appId === item.challenge.gameId)?.name}
                </Text>
              </Td>
              <Td>
                <Text variant="with-18">{item.challenge.goldReward} Gold</Text>
              </Td>
              <Td>
                <Tag
                  label={getStatusLabel(item.status)}
                  type={getStatusLabel(item.status).replace(" ", "")}
                />
              </Td>
              <Td>
                <Button
                  minW="175px"
                  variant={
                    item.status === 0
                      ? ButtonVariants.WITH_HIGHLIGHT_BLUE
                      : ButtonVariants.WITH_HIGHLIGHT_GREEN
                  }
                  isDisabled={isSubmit}
                  onClick={() =>
                    handleCheckOrActive(item.challengeId, item.status)
                  }
                >
                  {isSubmit && <Spinner />}
                  {item.status === 0 ? " Accept" : " Check Eligibility"}
                </Button>
              </Td>
            </Tr>
          ))}
          {filterChallengesByGameId.length < 1 && (
            <Tr>
              <Td colSpan={5}>
                <Empty />
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Flex>
  );
}
