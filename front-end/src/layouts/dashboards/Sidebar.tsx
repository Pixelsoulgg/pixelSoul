import { Flex, FlexProps, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { layouts } from "../../configs/constants";
import Menu from "./Menu";

interface IProps extends FlexProps {}

const KEY_EXPAND = 'SIDEBAR_COLLAPSE'

export default function Sidebar({ ...props }: IProps) {
  const [isExpand, setIsExpand] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const val = window.localStorage.getItem(KEY_EXPAND);       
        const isVal = val && val === 'true'  ? true : false;
        setIsExpand(isVal);
    }
  }, []);

  const handleClick = () => {
    const isVal = isExpand ? false : true;
    setIsExpand(isVal);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(KEY_EXPAND, `${isVal}`);
    }
  };

  return (
    <Flex flexDirection="column" 
    borderRight="1px solid #EAECF0"
    minW={`${isExpand ? 280 : 100}px`}
    pl="20px"
    flex={1}
    {...props}>
      <HStack w="full" py="32px" ml="10px" cursor="pointer" onClick={handleClick}>
        <Image src="/logo.svg" sizes="content" alt="pixelSoul" />
        {isExpand && <Text variant="with-title">{layouts.title}</Text>}
      </HStack>
      <Menu mt="25px" isExpand={isExpand} />
    </Flex>
  );
}
