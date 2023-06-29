import { fonts } from "@/configs/constants";
import {
  Box,
  Flex,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CharacterAttribute from "./components/CharacterAttribute";
import Attribute, { AttributeType } from "./components/Attribute";
import { m } from "framer-motion";

export default function GameContainer() {
  const [active, setActive] = useState<number>(2)
  return (
    <Flex w="96%" margin="0px auto" mt="27px">
      <Flex flex={1}>
        <VStack alignItems="flex-start" spacing="30px">
          <Text
            fontFamily={fonts.Silkscreen}
            fontSize="36px"
            fontWeight="700"
            textTransform="uppercase"
            color="#1E0505"
          >
            Select Character
          </Text>
          <CharacterAttribute type={1} label="Thunderstom" />
          <CharacterAttribute type={2} label="ID:12312312" />
          <CharacterAttribute type={3} label="Level 123" />
          <Attribute type={AttributeType.attack} value={3} />
          <Attribute type={AttributeType.defense} value={5} />
          <Attribute type={AttributeType.blood} value={6} />
          <Attribute type={AttributeType.mana} value={9} />
        </VStack>
      </Flex>
      <Flex flexDirection="column" position="relative" pt="40px">
        <SimpleGrid columns={4} gap="40px">
          {new Array(12).fill(0).map((_, index) => (
            <Box key={index}
              bgImage={active === index ? "/game-ui/game-characters/active.svg" : undefined }
              w="162px"
              h="162px"
              bgRepeat="no-repeat"
              bgSize="cover"
              boxShadow={active === index ? '0px 0px 50px 0px #0035F2': '' }
              onClick={() => setActive(index)}
              as={m.div}
              whileTap={{scale: 1.05}}
              whileInView={{scale: 1.05}}
              whileHover={{scale: 1.1}}
            >
              <Image
                src={`/game-ui/game-characters/${index + 1}.svg`}
                w="162px"
                h="162px"
                cursor="pointer"
                transform={`scale(${active === index ? 0.9 : 1})`}
              />
            </Box>
          ))}
        </SimpleGrid>
        <Box
          position="absolute"
          h="10%"
          overflow="auto"
          margin="auto"
          top={0}
          left={"-40px"}
          bottom={0}
          right={0}
          cursor="pointer"
        >
          <Image src="/game-ui/arrow.svg" />
        </Box>

        <Box
          position="absolute"
          h="10%"
          overflow="auto"
          margin="auto"
          top={0}
          bottom={0}
          right="-40px"
          cursor="pointer"
        >
          <Image src="/game-ui/arrow.svg" transform={"rotate(180deg)"} />
        </Box>
        <Flex w="full" justifyContent="center" alignItems="center" pt="35px">
          <Box
            bgImage="/game-ui/play.svg"
            w="235px"
            h="71px"
            bgColor="transparent"
            cursor="pointer"
            as={m.div}
            whileTap={{scale: 0.95}}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
