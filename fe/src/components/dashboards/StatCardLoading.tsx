import { fonts } from "@/configs/constants";
import {
  Box,
  Flex,
  FlexProps,
  HStack,
  Spacer,
  color,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { title } from "process";
import React from "react";

interface IProps extends FlexProps {}
export default function StatCardLoading({ ...props }: IProps) {
  return (
    <Flex
      direction="column"
      bg="#fff"
      border="1px solid #EAECF0"
      borderRadius="12px"
      boxShadow="0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)"
      gap="8px"
      alignItems="flex-start"
      minW="223px"
      maxH="115px"
      flex={1}
      overflow="hidden"
      {...props}
    >
      <Box p="6px" px="10px" w="full" bg="white" >
        <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
        <SkeletonCircle size="10" mt="10px" />
      </Box>
    </Flex>
  );
}
