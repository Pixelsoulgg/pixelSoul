import { Animate } from "@/components/animations";
import { fonts } from "@/configs/constants";
import { Box, Button, Flex, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

interface IProps {
  onModal?: () => void;
} 
export default function ForgeItem({onModal}:IProps) {
  return (
    <Box padding="10px" borderRadius="10px" bg="#F2F4F7" as={motion.div}
      whileHover={Animate.whileHover}
      whileTap={Animate.whileTap}
      cursor="pointer"
      onClick={onModal}
    >
       <Text variant="with-title" fontSize="18px" my="10px">
       Offering_name
      </Text>
      
      <Flex
        w="full"
        minH="220px"
        bg="red"
        borderRadius="10px"
        bgImg="/forges/1.png"
        bgRepeat="no-repeat"
        bgSize="cover"
      ></Flex>     
     

     <Text variant="with-title" fontSize="18px" my="10px">
        Reward_name
      </Text>

    <HStack w="full">
      <Text color="#B54708" fontSize="14px" fontWeight="500" fontFamily={fonts.Inter}>Start Date</Text>
      <Spacer />
      <Text color="#B54708" fontSize="14px" fontWeight="500" fontFamily={fonts.Inter}>End Date</Text>
    </HStack>
    <HStack w="full" mt="8px">
      <Text color="#B54708" fontSize="14px" fontWeight="500" fontFamily={fonts.Inter}>05/01/2023</Text>
      <Spacer />
      <Text color="#B54708" fontSize="14px" fontWeight="500" fontFamily={fonts.Inter}>05/01/2023</Text>
    </HStack>
     
      
      <HStack w="full" mt="18px">
          <Image src="/like.svg" alt="gold" />
          <Text variant="with-sub" color="#000000" fontWeight="500">3.5k</Text>
          <Spacer />
          <Button bg="#FFFFFF" 
            h="36px" w="154px"
            border="1px solid #D0D5DD"
            boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
            color="#344"
          >More</Button>
      </HStack>
    </Box>
  );
}
