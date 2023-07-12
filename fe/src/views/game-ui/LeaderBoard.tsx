import { fonts } from "@/configs/constants";
import { TextVariants } from "@/themes/theme";
import {
  Box,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { m } from "framer-motion";
import React, { useMemo } from "react";
import MintCharacterModal from "./MintCharacterModal";
import { useGetLeaderBoardBotQuery, useGetLeaderBoardHumanQuery } from "@/services/modules/game.check.services";

export default function LeaderBoard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: botLeaderBoard, isLoading: isLoadingLeaderBoardBot } = useGetLeaderBoardBotQuery();
  const { data: humanLeaderBoard, isLoading: isLoadingLeaderBoardHuman } = useGetLeaderBoardHumanQuery();

  const humanEmptyArray = useMemo(() => {
    if (!humanLeaderBoard || humanLeaderBoard.length === 0 || humanLeaderBoard.length > 3) return [];
    return new Array(4 - humanLeaderBoard.length).fill(0);
  }, [humanLeaderBoard]);
  
  const botEmptyArray = useMemo(() => {
    if (!botLeaderBoard || botLeaderBoard.length === 0 || botLeaderBoard.length > 3) return [];
    return new Array(4 - botLeaderBoard.length).fill(0);
  }, [botLeaderBoard]);

  const botLeaderBoardData = useMemo(() => {
    if(botLeaderBoard && botLeaderBoard.length > 4) return botLeaderBoard?.slice(0, 4);
    return botLeaderBoard;
  }, [botLeaderBoard]);

  return (
    <Flex w="full" justifyContent='space-between' alignItems='flex-end' px="30px">
      <Flex w="fit-content" flexDirection="column">
        <Text fontFamily={fonts.Silkscreen} fontSize="30px" color="#1E0505">
          Leader Board
        </Text>
        <SimpleGrid columns={2} columnGap="30px" w="fit-content">
          <VStack alignItems="flex-start" mt="25px" w="440px">
            <Text fontFamily={fonts.Silkscreen} fontSize="24px" color="#1E0505">
              Bot battle
            </Text>
            {botLeaderBoardData?.map((lead, index) => (
              <HStack
                key={index}
                w="full"
                borderRadius="8px"
                border="1.644px solid #77312B"
                p="9px"
                bgColor="rgba(255,255,255, 0.6)"
              >
                <Image src="/game-ui/item.svg" />
                <Text fontFamily={fonts.VT323} fontSize="20px">
                {lead.name}
                </Text>
              </HStack>
            ))}
            {botEmptyArray.map((_, index) => (
              <HStack
                key={index}
                w="full"
                borderRadius="8px"
                border="1.644px solid #77312B"
                p="9px"
                bgColor="rgba(255,255,255, 0.6)"
              >
                <Image src="/game-ui/item.svg" />
                <Text fontFamily={fonts.VT323} fontSize="20px">
                --- ---
                </Text>
              </HStack>
            ))}
          </VStack>

          <VStack alignItems="flex-start" mt="25px" w="440px">
            <Text fontFamily={fonts.Silkscreen} fontSize="24px" color="#1E0505">
             Real Battles  
            </Text>
            {humanLeaderBoard?.map((lead, index) => (
              <HStack
                key={index}
                w="full"
                borderRadius="8px"
                border="1.644px solid #77312B"
                p="9px"
                bgColor="rgba(255,255,255, 0.6)"
              >
                <Image src="/game-ui/item.svg" />
                <Text fontFamily={fonts.VT323} fontSize="20px">
                {lead.name}
                </Text>
              </HStack>
            ))}
            {humanEmptyArray.map((_, index) => (
              <HStack
                key={index}
                w="full"
                borderRadius="8px"
                border="1.644px solid #77312B"
                p="9px"
                bgColor="rgba(255,255,255, 0.6)"
              >
                <Image src="/game-ui/item.svg" />
                <Text fontFamily={fonts.VT323} fontSize="20px">
                 --- ---
                </Text>
              </HStack>
            ))}
          </VStack>
        </SimpleGrid>
      </Flex>
      <Box cursor='pointer' as={m.div} whileTap={{scale: 0.95}} onClick={onOpen}>
        <Image src="/game-ui/min.svg" />
      </Box>

      <MintCharacterModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}
