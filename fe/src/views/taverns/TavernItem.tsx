import { Animate } from "@/components/animations";
import { Box, Button, Flex, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import { m } from "framer-motion";
import React from "react";

export default function TavernItem() {
  return (
    <Box padding="10px" borderRadius="10px" bg="#F2F4F7" as={m.div}
      whileHover={Animate.whileHover}
      whileTap={Animate.whileTap}
      cursor="pointer"
    >
      <Flex
        w="full"
        minH="190px"
        bg="red"
        borderRadius="10px"
        bgImg="/taverns/1.png"
        bgRepeat="no-repeat"
        bgSize="cover"
      ></Flex>
      <Text variant="with-title" fontSize="18px" my="10px">
        Reward_name
      </Text>
      <Text variant="with-sub" fontSize="14px">
        Reward_description<br></br>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint. Velit officia consequat duis enim velit mollit.
      </Text>
      <HStack w="full" mt="18px">
          <Image src="/gold.svg" alt="gold" />
          <Text variant="with-sub" color="#000000" fontWeight="500">+ 100 Gold</Text>
          <Spacer />
          <Button bg="#7F56D9" color="white" h="36px" w="104px">Buy</Button>
      </HStack>
    </Box>
  );
}
