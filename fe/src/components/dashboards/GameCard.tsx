import { Box, Flex, FlexProps, HStack, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { fonts } from "../../configs/constants";

interface IProps extends FlexProps {}

export default function GameCard({ ...props }: IProps) {
  return (
    <Flex
      bg="white"
      h="200px"     
      border="1px solid #EAECF0"
      borderRadius="12px"
      boxShadow="0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)"
      flexDirection="column"
    >
      <Flex p="24px" w="full" flexDirection="column">
        <HStack w="full">
          <Image src="./game.svg" mr="12px" />
          <Text variant="with-title" fontSize="16px">Sandbox</Text>
        </HStack>
        <Text variant="with-title" mt="20px" color="#475467" fontSize="14px" fontWeight="400">Streamline software projects, sprints</Text>
      </Flex>
      <Flex w="full" borderTop="1px solid #EAECF0" py="10px">
        <SimpleGrid w="full" columns={3}>
          <Box justifyContent="center" alignItems="center" display="flex">
            <Text color="#6941C6" fontWeight="600" fontFamily={fonts.Inter} lineHeight="20px">10k Suls</Text>
          </Box>
          <Box justifyContent="center" alignItems="center" display="flex">
            <Text color="#6941C6" fontWeight="600" fontFamily={fonts.Inter} lineHeight="20px">23 SBTs</Text>
          </Box>
          <Box justifyContent="center" alignItems="center" display="flex">
            <Text color="#6941C6" fontWeight="600" fontFamily={fonts.Inter} lineHeight="20px">Challanges</Text>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
