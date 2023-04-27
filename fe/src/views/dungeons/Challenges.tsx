import { Empty } from "@/components";
import Dropdown from "@/components/Dropdown";
import InfoModal from "@/components/InfoModal";
import Tag from "@/components/dashboards/Tag";
import {
  activeChallengeAction,
  checkChallengeStatusAction,
} from "@/reduxs/dungeons/dungeon.slices";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { ButtonVariants } from "@/themes/theme";
import { IDropdownItem } from "@/types";
import {
  Button,
  Flex,
  HStack,
  Spacer,
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
import React, { useCallback, useMemo, useState } from "react";

enum ChallengeType {
  All,
  Accepted,
}

const SortDatasource: IDropdownItem[] = [
  { lable: "All", value: -1 },
  { lable: "Gold (high-low)", value: 0 },
  { lable: "Gold (low-high)", value: 1 },
  { lable: "Game (A-Z)", value: 2 },
  { lable: "Game (Z-A)", value: 3 },
];

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

  const [sortBy, setSortBy] = useState<number>();
  const [selectedChallengeId, setSelectedChallengeId] = useState<number>();

  const filterChallengesByGameId = useMemo(() => {
    const status = challengeType === ChallengeType.All ? -1 : 1;
    const data = challenges.filter(
      (p) =>
        (!gameId || p.challenge.gameId === gameId) &&
        (status === -1 || p.status === status)
    );
    switch (sortBy) {
      case 0:
      case 1: {
        const dataRender = data.sort((a, b) => {
          if (a.challenge.goldReward === b.challenge.goldReward) return 0;
          return a.challenge.goldReward > b.challenge.goldReward ? 1 : -1;
        });
        return sortBy === 1 ? dataRender.reverse() : dataRender;
      }
      case 2:
      case 3: {
        const dataRender = data.sort((a, b) => {
          if (a.challenge.name === b.challenge.name) return 0;
          return a.challenge.name > b.challenge.name ? 1 : -1;
        });
        return sortBy === 3 ? dataRender.reverse() : dataRender;
      }
      default:
        return data;
    }
  }, [gameId, challenges, challengeType, sortBy]);

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
    setSelectedChallengeId(challengeId);
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
            msg: rs.msg || "",
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
          <Spacer />
          <Dropdown
            defaultLable="Sort"
            value={sortBy}
            data={SortDatasource}
            onChange={(val) => setSortBy(val as number)}
          />
        </Flex>
        <Flex w="full" overflow="hidden" bg="white" overflowX="auto">
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
                      isDisabled={isSubmit && selectedChallengeId === item.challengeId}
                      onClick={() =>
                        handleCheckOrActive(item.challengeId, item.status)
                      }
                    >
                      {isSubmit && selectedChallengeId === item.challengeId && (
                        <Spinner />
                      )}
                      {isSubmit && selectedChallengeId === item.challengeId ? undefined :
                        <Text variant="with-18" fontSize="20px" color="#fff">
                          {item.status === 0 ? " Accept" : " Check Eligibility"}
                        </Text>
                     }
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
