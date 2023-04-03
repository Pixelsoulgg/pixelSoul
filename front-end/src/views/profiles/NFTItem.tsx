import { Button, Flex, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import {motion} from 'framer-motion'
import React from "react";

export default function NFTItem() {
  return (
    <Flex flex={1} 
    flexDir="column" 
    as={motion.div}
    whileHover={{scale: 1.01, boxShadow: "4px 4px 4px rgba(151, 71, 255, 0.35)" }}
    whileTap={{scale: 1.01, boxShadow: "4px 4px 4px rgba(151, 71, 255, 0.35)" }}
    borderRadius="20px"
    padding="10px"
    cursor="pointer"
  >
    <Flex      
      bgImage="/collectibles/2.png"
      bgRepeat="no-repeat"
      h="402px"
      w="full"
      bgSize="cover"
      borderRadius="20px"
      padding="10px"
      flexDirection="column"
    >
    </Flex>
    <Text variant="with-title" fontSize="18px" mt="10px" color="#101828">
      Name NFT
    </Text>
    <Text variant="with-sub" fontSize="15px" mt="10px" color="#101828">
      ID: 12345678910
    </Text>
    <Text variant="with-sub" fontSize="15px" my="10px" color="#101828">
      Description
    </Text>
    <Text variant="with-sub" fontSize="15px" color="#101828">
    Description
  Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
    </Text>

    <HStack w="full" mt="15px">
      <Image src="/gold.svg" mr="5px" />
      <Text
        variant="with-sub"
        fontSize="15px"
        my="10px"
        color="#000"
        fontWeight="500"
      >
       + 100 Gold
      </Text>
      <Spacer />
      <Button variant="normal" bg="#7F56D9" w="118px" color="white">Sell</Button>
    </HStack>
  </Flex>
  )
}
