import {
  Button,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
  SkeletonText,
  SkeletonCircle,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

export default function ChestCardLoading() {
 
  return (
     <Flex
      bg="#F2F4F7"
      borderRadius="10px"
      minH="494px"
      flex={1}
      p="20px"
      flexDirection="column"
      mt="10px"
    >
  
       <Skeleton height="20px" w="80%" borderRadius="10px" />
      <Flex
        w="full"
        borderRadius="20px"
        mt="20px"
        bg="#D0D5DD"
        minH="301px"
        border="2px solid #98A2B3"
        justifyContent="center"
        alignItems="center"
      >
        <Skeleton height="230px" w="230px" borderRadius="10px" />
      </Flex>
      <HStack w="full" my="24px">
         <Skeleton height="20px" w="40%" borderRadius="3px" />
        <Spacer />
        <Skeleton height="20px" w="40%" borderRadius="3px" />
      </HStack>

      <HStack w="full" mb="24px">
        <Skeleton height="40px" w="40%" borderRadius="10px" />
        <Spacer />
        <Skeleton height="40px" w="40%" borderRadius="10px" />
      </HStack>
    </Flex>
  );
}
