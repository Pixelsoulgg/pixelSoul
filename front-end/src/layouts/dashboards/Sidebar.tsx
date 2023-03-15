import { Flex, FlexProps, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { layouts } from "../../configs/constants";
import Menu from "./Menu";

interface IProps extends FlexProps {}

export default function Sidebar({ ...props }: IProps) {
  return (
    <Flex flexDirection="column" 
    borderRight="1px solid #EAECF0"
    minW="280px"
    pl="20px"
    flex={1}
    {...props}>
      <HStack w="full" py="32px" ml="20px">
        <Image src="./logo.svg" sizes="content" alt="pixelSoul" />
        <Text variant="with-title">{layouts.title}</Text>
      </HStack>
      <Menu mt="25px" />
    </Flex>
  );
}
