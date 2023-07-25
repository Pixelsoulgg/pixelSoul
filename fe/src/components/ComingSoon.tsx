import { PixelFuncType } from "@/types";
import { isBetaRender } from "@/utils";
import { Box, BoxProps, Flex, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";

interface IProps extends BoxProps {
  isSmall?: boolean;
  isCenter?: boolean;
  isVCenter?: boolean;
  funcName?: PixelFuncType;
  bgColor?: string;
}

export default function ComingSoon({
  isSmall,
  isCenter,
  isVCenter,
  funcName,
  children,
  bgColor,
  ...props
}: IProps) {
  if (funcName && isBetaRender(funcName)) return <Fragment>{children}</Fragment>;
  return (
    <Box
      flex={1}
      minH="80px"
      w="100%"
      h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
      {...props}
    >
      {children}
      <Flex
        bg={bgColor || "rgba(255,255,255, 0.5)"}
        w="100%"
        h="100%"
        position="absolute"
        justifyContent={isCenter ? "center" : 'flex-start'}
        alignItems={isVCenter ? 'center' : 'flex-start'}
      >
        <Text
          color="rgba(0,0,0, 0.3)"
          textTransform="uppercase"
          fontSize={isSmall ? "10px" : "16px"}
          letterSpacing="5px"
          mt="-10px"
        >
          Coming Soon
        </Text>
      </Flex>
    </Box>
  );
}
