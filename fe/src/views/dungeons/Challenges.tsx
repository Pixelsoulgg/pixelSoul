import { Empty } from "@/components";
import InfoModal from "@/components/InfoModal";
import Tag from "@/components/dashboards/Tag";
import {
  activeChallengeAction,
  checkChallengeStatusAction,
} from "@/reduxs/dungeons/dungeon.slices";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { ButtonVariants } from "@/themes/theme";
import {
  Button,
  Flex,
  HStack,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";

enum ChallengeType {     
  All,
  Accepted,
}

export default function Challenges() {
  const dispatch = useAppDispatch();
  const { auth0Info } = useAppSelector((p) => p.auth);
  const { challenges, gameId, games, isSubmit } = useAppSelector(
    (p) => p.dungeon
  );

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [result, setResult] = useState<{
    type: "success" | "info";
    msg: string;
  }>();
  const [challengeType, setChallengeType] = useState<ChallengeType>(
    ChallengeType.All
  );

  const filterChallengesByGameId = useMemo(() => {
    const status = challengeType === ChallengeType.All ? -1 : 1;
    return challenges.filter((p) => p.challenge.gameId === gameId && (status === -1 || p.status === status));
  }, [gameId, challenges, challengeType]);

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

  const handleCheckOrActive = async (challengeId: number, status: number) => {
    try {
      if (auth0Info?.steamId) {
        if (status === 0) {
          dispatch(
            activeChallengeAction({ steamId: auth0Info?.steamId, challengeId })
          ).unwrap();
        } else {
          const rs = await dispatch(
            checkChallengeStatusAction({
              steamId: auth0Info?.steamId,
              challengeId,
            })
          ).unwrap();
          setResult({
            type: rs.result ? "success" : "info",
            msg: rs.msg || ''
          });
          onOpen();
        }
      }
    } catch (er) {}
  };

  return (
    <>
      <Flex
        w="full"
        flexDirection="column"
        maxW="1600px"
        alignSelf="center"
        mt="30px"
        borderTop="1.5px solid #E4E7EC"
      >
        <Flex
          w="full"
          flexDirection={{ base: "column", lg: "row" }}
          alignItems={{ lg: "center" }}
          paddingTop="40px"
          pb="12px"
        >
          <Text variant="with-24" mb="15px" mr="10px">
            All Challenges
          </Text>
          <HStack>
            <Button
              variant={
                challengeType === ChallengeType.All ? "active" : "normal"
              }
              onClick={() => setChallengeType(ChallengeType.All)}
              w="160px"
            >
              All
            </Button>
            <Button
              variant={
                challengeType === ChallengeType.Accepted ? "active" : "normal"
              }
              onClick={() => setChallengeType(ChallengeType.Accepted)}
              w="160px"
              mx="10px"
            >
              Accepted
            </Button>
          </HStack>
        </Flex>
        <Flex
          w="full"
          overflow="hidden"
          bg="white"
          overflowX="auto"
        >
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
                      {
                        games.find((p) => p.appId === item.challenge.gameId)
                          ?.name
                      }
                    </Text>
                  </Td>
                  <Td>
                    <Text variant="with-18">
                      {item.challenge.goldReward} Gold
                    </Text>
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
      </Flex>
      <InfoModal
        hideTitle={!result?.type || result.type === "info"}
        type={result?.type || "info"}
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        onOk={onClose}
        title="Congratulations !"
        description={result?.msg || ""}
      />
    </>
  );
}
