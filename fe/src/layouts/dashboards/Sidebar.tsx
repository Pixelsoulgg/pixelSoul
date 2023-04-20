import { Flex, FlexProps, HStack, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { layouts } from "../../configs/constants";
import Menu from "./Menu";
import { AnimatePresence, m } from "framer-motion";
import PixelSouldLogo from "@/components/PixelSould";

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
       as={m.div}
      flexDirection="column"      
      pl="16px"     
      flex={1}
      position="relative"
      mr={`${isExpand ? 240 : 100}px`}
      animate={{width: 280}}
      initial={{width: 100}}
      exit={{width: 100}}
      transition='0.3s linear'
      {...props}
    >
      <AnimatePresence>
      <Flex 
        h="full" 
        flexDirection="column" 
        position="fixed"        
        borderRight="1px solid #EAECF0"
        bg="white"       
        // animate={{width: 280}}
        // initial={{width: 100}}
        // exit={{width: 100}}
      >
        <HStack
          w="full"
          py="32px"
          ml="10px"
          pr="26px"
          cursor="pointer"
          onClick={handleClick}
        >
          {/* <Image src="/logo.svg" sizes="content" alt="pixelSoul" /> */}
          <PixelSouldLogo isExpand={isExpand} />
          {/* {isExpand && <Text variant="with-title" fontSize="24px">{layouts.title}</Text>} */}
        </HStack>
        <Menu mt="25px" isExpand={isExpand} />
      </Flex>
      </AnimatePresence>
    </Flex>
  );
}
