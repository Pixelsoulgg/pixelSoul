import {
  Flex,
  FlexProps,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface IProps extends FlexProps {
  name: string;
  score: number | string;
  percent?: number;
  nameOnly?: boolean;
  showIcon?: boolean;
}

export default function BudgetCard({
  name,
  score,
  percent,
  nameOnly,
  showIcon,
  ...flexProps
}: IProps) {
  if (nameOnly) {
    return (
      <Flex bg="#F5FAFF" p="16px" borderRadius="20px" my="10px" {...flexProps}>
        <VStack
          w="full"
          justifyContent="center"
          alignItems="center"
          mx="10px"
        >
          <Text variant="with-sub" color="#333" fontWeight="500">
            {name}
          </Text>
        </VStack>
      </Flex>
    );
  }

  return (
    <Flex bg="#F5FAFF" p="16px" borderRadius="20px"  my="10px"  {...flexProps}>
      {showIcon && <Image src="/budget.svg" /> }
      <VStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        mx="10px"
      >
        <HStack w="full">
          <Text variant="with-sub" color="#194185" fontWeight="500">
            {name}
          </Text>
          <Spacer />
          <Text variant="with-sub" color="#175CD3">
            {score}
          </Text>
        </HStack>
        <Flex width="full" h="10px" borderRadius="full" bg="#D1E9FF">
          <Flex
            width={`${percent}%`}
            h="10px"
            borderRadius="full"
            bg="#175CD3"
          />
        </Flex>
      </VStack>
    </Flex>
  );
}
