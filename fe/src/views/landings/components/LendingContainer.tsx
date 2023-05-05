import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

interface IProps extends FlexProps {
  contentStyle?: FlexProps;

}
export default function LendingContainer({ children, contentStyle, ...props }: IProps) {
  return (
    <Flex w="full" alignItems="center" justifyContent="center" {...props}>
      <Flex
        w="full"
        alignSelf="center"
        maxW="1667.56px"
        px="20px"
        py="20px"
        flexDirection="column"
        minH="100vh"
        {...contentStyle}
      >
        {children}
      </Flex>
    </Flex>
  );
}
