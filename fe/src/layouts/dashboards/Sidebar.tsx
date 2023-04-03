import { Flex, FlexProps, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { layouts } from "../../configs/constants";
import Menu from "./Menu";

interface IProps extends FlexProps {}

const KEY_EXPAND = "SIDEBAR_COLLAPSE";

export default function Sidebar({ ...props }: IProps) {
  const [isExpand, setIsExpand] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const val = window.localStorage.getItem(KEY_EXPAND);
      const isVal = val && val === "true" ? true : false;
      setIsExpand(isVal);
    }
  }, []);

  const handleClick = () => {
    const isVal = isExpand ? false : true;
    setIsExpand(isVal);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY_EXPAND, `${isVal}`);
    }
  };

  return (
    <Flex
      flexDirection="column"      
      pl="16px"     
      flex={1}
      position="relative"
      mr={`${isExpand ? 280 : 100}px`}
      {...props}
    >
      <Flex 
        h="full" 
        flexDirection="column" 
        position="fixed"
        minW={`${isExpand ? 280 : 100}px`}
        borderRight="1px solid #EAECF0"
        bg="white"       
      >
        <HStack
          w="full"
          py="32px"
          ml="10px"
          pr="26px"
          cursor="pointer"
          onClick={handleClick}
        >
          <Image src="/logo.svg" sizes="content" alt="pixelSoul" />
          {isExpand && <Text variant="with-title" fontSize="24px">{layouts.title}</Text>}
        </HStack>
        <Menu mt="25px" isExpand={isExpand} />
      </Flex>
    </Flex>
  );
}
