import React from "react";
import LandingContainer from "./LandingContainer";
import {
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TextVariants } from "@/themes/theme";


const data = {
 1: "player",
 2: "game",
 3: "artist" 
}

export default function TimeToJumpIn() {
  return (
    <LandingContainer contentStyle={{ minH: "50vh" }} pt="170px">
      <VStack w="full">
        <Text
          variant={TextVariants.WITH_LANDING}
          className="text-border-blue"
          color="white"
          fontSize="48px"
          fontWeight="400"
          lineHeight="normal"
        >
          Time ti jump in
        </Text>

        <Text
          variant={TextVariants.WITH_24}
          color="#000082"
          fontWeight="400"
          lineHeight="normal"
        >
          You're a:
        </Text>
        <HStack w="full" columnGap="30px" mt="70px !important">
          {new Array(3).fill("").map((_, index) => (
            <Flex
              key={String(index)}
              w={`${index === 1 ? 442 : 382}px`}
              position="relative"
              cursor="pointer"
            >
              <Image
                src={`./new-landings/jumps/${index + 1}.png`}
                objectFit="cover"
              />
              <Text
                variant={TextVariants.WITH_LANDING}
                className="text-border-blue"
                color="white"
                fontSize="35px"
                fontWeight="400"
                lineHeight="normal"
                w="50%"
                h="30%"
                margin="auto"
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
              >
                {data[(index + 1) as keyof typeof data]}
              </Text>
            </Flex>
          ))}
        </HStack>
      </VStack>
    </LandingContainer>
  );
}
