import { Box, BoxProps, Text,Image } from "@chakra-ui/react";
import React from "react";

interface IProps extends BoxProps {
  isHorizontal?: boolean; //horizontal and vertical
}

export default function DataEmpty({isHorizontal, ...props}: IProps) {
  return (
    <Box
      bg="#F9FAFB"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box textAlign="center">
        <Image src='./empty.svg' />
        <Text mt="4">Data is empty</Text>
      </Box>
    </Box>
  );
}
