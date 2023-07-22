import React from "react";
import LandingContainer from "./LandingContainer";
import { Flex, SimpleGrid, Text, VStack, Image } from "@chakra-ui/react";
import { TextVariants } from "@/themes/theme";

const data = {
  1: "Cross-game SoulTag System",
  2: "Cross-game economy powered by $SOUL",
  3: "Powerful Omni-game Marketplace",
  4: "Customisable on-chain community tools",
  5: "Marketing & Key gaming partnerships",
  6: "Seanless Integrations"
}

export default function GameStudio() {
  return (
    <LandingContainer
      minH="706px"
      bgImage="./new-landings/game-studios/bg.png"
      bgRepeat="no-repeat"
      bgSize="contain"
      contentStyle={{
        justifyContent: "center",
      }}
    >
      <Flex
        w="full"
        maxW="992px"
        bg="rgba(255, 255, 255, 0.25)"
        borderRadius="8px"
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        py="40px !important"
        px={{base: '10px', lg:"88px"}}
        backdropFilter="blur(7px)"
        flexDirection="column"
        alignItems="center"
      >
        <Text
          variant={TextVariants.WITH_24}
          fontSize={{base: '30px', lg: "40px"}}
          color="#000082"
          textAlign="center"
          fontWeight="400"
          lineHeight="normal"
          w={{base: '100%', lg: "80%"}}
        >
          Game studios should focus on building great games, we'll do the heavy
          lifting.
        </Text>

        <SimpleGrid columns={{base: 2, lg: 3}} w="full" columnGap="100px" rowGap="45px" mt="40px">
          {new Array(6).fill(0).map((_, index) => (
            <VStack key={String(index)} minW={{base: '110px', lg: "222px"}}>
              <Image src={`./new-landings/game-studios/${index + 1}.svg`} />
              <Text variant={TextVariants.WITH_24} textAlign="center"
                fontSize={{ base: '18px', lg: "24px"}}
              >         
               {data[(index +1 as keyof typeof data)]}
              </Text>
              <Image src={`./new-landings/game-studios/arrow.svg`} />
            </VStack>
          ))}
        </SimpleGrid>
      </Flex>
    </LandingContainer>
  );
}
