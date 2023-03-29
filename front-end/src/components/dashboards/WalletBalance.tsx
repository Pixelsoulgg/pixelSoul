
import { Image,HStack,Text } from "@chakra-ui/react";
import React from "react";
import {
    fonts,
  } from "../../configs/constants";
export default function GoldButton() {
  return (
    <HStack
                cursor="pointer"
                mx="15px"
                my="5px"
                padding={{ base: "8px 12px", lg: "8px 0px" }}
              >
                <Image src='./coin.svg' boxSize='20px' />
                  <Text line-height= "24px" fontFamily={fonts.Inter} variant="with-title" fontSize="16px" ml="12px" 
                  fontWeight="400" color="#667085">
                    500 Gold
                  </Text>
               
              </HStack>
  );
}


