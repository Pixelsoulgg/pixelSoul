import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import Header from "./Header";

export interface IProps {
  children: ReactNode;
}
export default function MainLayout({ children }: IProps) {
  return (
    <Flex
      w="100%"
      // maxW="1667.56px"
      margin="0px auto"
      flexDirection="column"
      alignItems="center"
      bgImage="/bg1.png"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      {/* <Header /> */}
      <Flex
        flexDirection="column"
        w="100%"
        maxW="1667.56px"
        px="20px"
        py="20px"
        minH="100vh"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Flex>
    </Flex>
  );
}
