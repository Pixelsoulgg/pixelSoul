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
import React from "react";
import MintCharacterModal from "./MintCharacterModal";

export default function LeaderBoard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            {new Array(4).fill(0).map((_, index) => (
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
                  Name 1
                </Text>
              </HStack>
            ))}
          </VStack>

          <VStack alignItems="flex-start" mt="25px" w="440px">
            <Text fontFamily={fonts.Silkscreen} fontSize="24px" color="#1E0505">
              Bot battle
            </Text>
            {new Array(4).fill(0).map((_, index) => (
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
                  Name 1
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
