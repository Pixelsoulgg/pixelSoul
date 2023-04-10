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
import DungeonItem from "./DungeonItem";

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
      <Flex w="full" px="20px" flexDir={{ base: "column", lg: "row" }}>
        <HStack>{children}</HStack>
        <Spacer />
        <HStack w={{base: "full", lg: "fit-content"}} display="flex" justifyContent="space-between" mt={{base: "20px", lg: undefined}}>
          <Button variant="normal" w="160px">
            Sort by {sortBy}
          </Button>
          <HStack>
            <Button variant="normal" minW="40px" w="44px" mx="10px">
              <Image src="/arrow-pre.svg" alt="" />
            </Button>
            <Button variant="normal" minW="40px" w="44px">
              <Image src="/arrow-next.svg" alt="" />
            </Button>
          </HStack>
        </HStack>
      </Flex>

      <SimpleGrid columns={{ base: 1, lg: 4 }} gap="30px" mt="30px">
        {new Array(4).fill(0).map((_, index) => (
          <DungeonItem
            key={String(index)}
            bgColor={index === 0 ? "#7F56D9" : "#12B76A"}
            label={index === 0 ? "Check Eligibility" : "Accept"}
            type={type}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
