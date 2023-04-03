import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Spacer,
  Tag,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { Animate } from "../../components/animations";

interface IProps {
  bgColor?: string;
  label?: string;
  type: "Action" | "Arena";
}

export default function DungeonItem({
  type,
  bgColor = "#7F56D9",
  label = "Accept",
}: IProps) {
  return (
    <Flex
      as={motion.div}
      flex={1}
      w="full"
      flexDirection="column"
      p="10px"
      mb="10px"
      cursor="pointer"
      whileHover={{...Animate.whileHover, borderRadius: "15px"}}
      whileTap={Animate.whileTap}
    >
      <Text variant="with-title" fontSize="18px">
        Game Name
      </Text>
      <Flex
        w="full"
        minH="163px"
        bg="#000"
        borderRadius="10px"
        p="10px"
        flexDirection="column"
      >
        <Text
          variant="with-sub"
          color="white"
          fontSize="12px"
          bg={`bg.${type}`.toLowerCase()}
          display="flex"
          borderRadius="10px"
          alignSelf="flex-start"
          px="10px"
        >
          {type}
        </Text>
        <Image
          src="/dungeons/1.png"
          objectFit="contain"
          borderRadius="10px"
          mt="10px"
        />
      </Flex>
      <Text variant="with-title" fontSize="18px">
        Challenge_name
      </Text>
      <Text variant="with-sub" fontSize="14px">
        Challenge_description
      </Text>
      <Text variant="with-sub" fontSize="14px" mt="10px">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint. Velit officia consequat duis enim velit mollit.
      </Text>
      <HStack w="full">
        <Image src="/gold.svg" />
        <Text variant="with-sub" ml="5px">
          + 100 gold
        </Text>
        <Spacer />
        <Button variant="normal" bg={bgColor} color="white" fontSize="14px">
          {label}
        </Button>
      </HStack>
    </Flex>
  );
}
