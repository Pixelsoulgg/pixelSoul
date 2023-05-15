import { Animate, varHover } from "@/components/animations";
import { useAppSelector } from "@/reduxs/hooks";
import { ButtonVariants } from "@/themes/theme";
import {
  Button,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

interface IProps {
  type: "CLAIMED" | "AVAILABLE";
}

export default function ClaimedAndAvailableMysteryBox({ type }: IProps) {
  const { steamId } = useAppSelector((p) => p.auth);
  return (
    <Flex w="full" my="15px" flexDirection="column">
      <Text variant="with-24">
        {type === "CLAIMED" ? "Claimed" : "Available Mystery Box"}
      </Text>

      <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} columnGap="20px">
        {Array(3)
          .fill(1)
          .map((_, index) => (
            <Flex
              as={motion.div}
              whileHover={Animate.whileHover}
              key={String(index)}
              bg="#F2F4F7"
              borderRadius="10px"
              minH="494px"
              flex={1}
              p="20px"
              flexDirection="column"
              mt="10px"
            >
              <Text variant="with-24">Chest_name</Text>
              <Flex
                w="full"
                borderRadius="20px"
                mt="20px"
                bg="#D0D5DD"
                minH="301px"
                border="2px solid #98A2B3"
                justifyContent="center"
                alignItems="center"
              >
                <Image src={`/chests/${index + 1}.svg`} alt="chest" />
              </Flex>
              <HStack w="full" my="24px">
                <Text variant="with-18" color="#B54708">
                  Claim Date
                </Text>
                <Spacer />
                <Text variant="with-18" color="#B54708">
                  05/01/2023
                </Text>
              </HStack>

              <HStack w="full" mb="24px">
                <Image src="/like.svg" alt="like" w="34px" h="34px" />
                <Text variant="with-18" fontSize={{base: "12px", lg: "18px"}}>
                  {type === "CLAIMED" ? "3.5k" : "10H of Steam Gameplay"}
                </Text>
                <Spacer />
                <Button
                  variant={
                    type !== "AVAILABLE"
                      ? ButtonVariants.WITH_DEFAULT
                      : ButtonVariants.WITH_HIGHLIGHT_BLUE_DARK
                  }
                >
                  {!steamId ? "Connect Steam" : "Open"}
                </Button>
              </HStack>
            </Flex>
          ))}
      </SimpleGrid>
    </Flex>
  );
}
