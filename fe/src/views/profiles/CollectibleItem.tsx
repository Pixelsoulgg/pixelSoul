import { Flex, HStack, Image, Text } from "@chakra-ui/react";
import {m} from 'framer-motion'
import React from "react";
import { Animate } from "../../components/animations";

export default function CollectibleItem() {
  return (
    <Flex flex={1} 
      flexDir="column" 
      as={m.div}
      whileHover={Animate.whileHover}
      whileTap={Animate.whileTap}
      borderRadius="20px"
      padding="10px"
      cursor="pointer"    
    >
      <Flex      
        bgImage="/bg-collectible.svg"
        bgRepeat="no-repeat"
        h="402px"
        w="full"
        bgSize="cover"
        borderRadius="20px"
        padding="10px"
        flexDirection="column"
      >
        <Image src="/steam-icon.svg" w="45px" h="45px" alt='' />
        <Flex
          w="full"
          h="332px"
          borderRadius="10px"
          bgImage="/collectibles/1.png"
          bgSize="cover"
          bgRepeat="no-repeat"
          bgPosition="center"
          mt="5px"
        />
      </Flex>
      <Text variant="with-title" fontSize="18px" mt="10px" color="#101828">
        Name Card
      </Text>
      <Text variant="with-sub" fontSize="15px" mt="10px" color="#101828">
        ID: 12345678910
      </Text>
      <Text variant="with-sub" fontSize="15px" my="10px" color="#101828">
        Description
      </Text>
      <Text variant="with-sub" fontSize="15px" color="#101828">
        Description Amet minim mollit non deserunt ullamco est sit aliqua dolor
        do amet sint. Velit officia consequat duis enim velit mollit.
      </Text>

      <HStack w="full" mt="15px">
        <Image src="/pixel-icon.svg" mr="5px" alt='' />
        <Text
          variant="with-sub"
          fontSize="15px"
          my="10px"
          color="#000"
          fontWeight="500"
        >
          + 100 SoulScore Value
        </Text>
      </HStack>
    </Flex>
  );
}
