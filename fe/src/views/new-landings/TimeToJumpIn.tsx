import React from "react";
import LandingContainer from "./LandingContainer";
import {
  Center,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TextVariants } from "@/themes/theme";
import { m } from "framer-motion";
import { Animate } from "@/components/animations";

const data = {
  1: "player",
  2: "game developer",
  3: "artist",
};

export default function TimeToJumpIn() {
  return (
    <LandingContainer contentStyle={{ minH: "40vh" }} pt="170px">
      <VStack w="full">
        <Text
          variant={TextVariants.WITH_LANDING}
          className="text-border-blue"
          color="white"
          fontSize="48px"
          fontWeight="400"
          lineHeight="normal"
          textAlign="center"
        >
          Time to jump in
        </Text>

        <Text
          variant={TextVariants.WITH_24}
          color="#000082"
          fontWeight="400"
          lineHeight="normal"
        >
          You're a:
        </Text>
        <Stack
          direction={{ base: "column", lg: "row" }}
          w="full"
          columnGap="30px"
          rowGap="30px"
          mt="70px !important"
        >
          {new Array(3).fill("").map((_, index) => (
            <Center key={index}>
              <Flex
                key={String(index)}
                w={{ base: "full", lg: `${index === 1 ? 442 : 382}px` }}
                position="relative"
                cursor="pointer"
                borderRadius="8px"
                overflow="hidden"
              >
                <Image
                  src={`./new-landings/jumps/${index + 1}.png`}
                  objectFit="cover"
                  w="100%"
                  as={m.img}
                  whileHover={Animate.whileHover}
                  whileTap={Animate.whileTap}
                />
                <Text
                  variant={TextVariants.WITH_LANDING}
                  className="text-border-blue"
                  color="white"
                  fontSize="35px"
                  fontWeight="400"
                  lineHeight="normal"
                  w="60%"
                  h="30%"
                  margin="auto"
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  textAlign={"center"}
                >
                  {data[(index + 1) as keyof typeof data]}
                </Text>
              </Flex>
            </Center>
          ))}
        </Stack>
      </VStack>
    </LandingContainer>
  );
}
