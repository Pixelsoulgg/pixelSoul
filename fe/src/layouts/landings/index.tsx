import { MotionLazyContainer } from "@/components/animations";
import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};
export default function LandingLayout({ children }: Props) {
  return (
    <MotionLazyContainer>
      <Flex
        w="100%"
        margin="0px auto"
        flexDirection="column"
        alignItems="center"
        // // bgImage="/bg1.png"
        // bgRepeat="no-repeat"
        // bgSize="cover"
      >
        <Flex
          flexDirection="column"
          w="100%"
          // maxW="1667.56px"
          // px="20px"
          // py="20px"
          // minH="100vh"
          justifyContent="center"
          alignItems="center"
        >
          {children}
        </Flex>
      </Flex>
    </MotionLazyContainer>
  );
}
