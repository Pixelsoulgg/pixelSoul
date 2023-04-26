import {
  Button,
  Flex,
  FlexProps,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import DungeonCarousel from "./DungeonCarousel";
import Challenges from "./Challenges";
import { useAppSelector } from "@/reduxs/hooks";

interface IProps extends FlexProps {
  type: "Action" | "Arena";
  children: ReactNode;
  sortBy?: "Game" | "Gold";
}

export default function DungeonContent({
  sortBy,
  type,
  children,
  ...props
}: IProps) {
  return (
      <Flex w="full" flexDirection="column" {...props}>
        <Flex
          w="full"
          px="20px"
          flexDir={{ base: "column", lg: "row" }}
          borderBottom="1.5px solid #E4E7EC"
          paddingBottom="30px"
          mb="20px"
        >
          <HStack>{children}</HStack>
          <Spacer />
        </Flex>
        <DungeonCarousel />
        <Challenges />
      </Flex>
  );
}
