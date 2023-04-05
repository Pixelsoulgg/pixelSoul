import { Flex, FlexProps, HStack, Image, Input } from "@chakra-ui/react";
import React from "react";

interface IProps extends FlexProps {}

export default function Search({ ...props }: IProps) {
  return (
    <Flex
      mx="20px"
      border="1px solid #D0D5DD"
      bg="white"
      padding="5px 14px"
      borderRadius="8px"
      boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
      {...props}
    >
      <HStack w="full">
        <Image src="/search.svg" alt="search" />
        <Input
          w="full"
          placeholder="Search"
          border="none"
          _placeholder={{
            color: "#667085",
            fontSize: "14px",
            fontWeight: "400",
          }}
          _focus={{border: "none"}}
          _active={{border: "none"}}
        />
      </HStack>
    </Flex>
  );
}
