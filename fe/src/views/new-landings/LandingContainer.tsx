import { MAX_WIDTH } from "@/themes/config";
import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

interface IProps extends FlexProps {
  contentStyle?: FlexProps;
}

export default function LandingContainer({
  contentStyle,
  children,
  ...props
}: IProps) {
  return (
    <Flex
      w="full"
      flexDirection="column"
      alignItems="center"
      {...props}
    >
      <Flex w="full" maxW={`${MAX_WIDTH}px`} {...contentStyle}>
        {children}
      </Flex>
    </Flex>
  );
}
