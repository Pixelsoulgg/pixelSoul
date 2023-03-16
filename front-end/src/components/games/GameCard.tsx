import { Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface IProps {
  iconName: string;
  title: string;
  subName: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function GameCard({
  iconName,
  title,
  subName,
  isActive,
  onClick,
}: IProps) {
  const boxShadow = isActive ? "0px 4px 4px #6941C6" : "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)"
  return (
    <Flex
      w="full"
      boxShadow={boxShadow}
      borderRadius="12px"
      bg="#fff"
      border="1px solid #EAECF0"
      padding="24px"
      my="10px"
    >
      <HStack w="full">
        <Image src={`/games/${iconName}.svg`} mr="12px" />
        <VStack w="full" justifyContent="center" alignItems="flex-start" ml="10px">
          <Text variant="with-sub"  fontSize="16px" color="#101828" fontWeight="500">{title}</Text>
          <Text variant="with-sub" fontSize="14px" fontWeight="400" color="#475467" mt="-2px !important">{subName}</Text>
        </VStack>
      </HStack>
    </Flex>
  );
}
