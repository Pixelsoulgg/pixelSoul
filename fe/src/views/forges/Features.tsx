import { Flex, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import ForgeItem from './ForgeItem'

interface IProps {
  onModal?: () => void;
} 
export default function Features({onModal}: IProps) {
  return (
    <Flex w="full" flexDirection="column" pl={{base: "0px", lg: "20px"}}>
        <Text variant="with-title" fontSize="18px">Featured</Text>
        <SimpleGrid columns={{base: 1, lg: 4}} w="full" columnGap="30px" mt="30px"> 
          {new Array(4).fill(0).map((_,index) => <ForgeItem key={String(index)} onModal={onModal} />)}
        </SimpleGrid>
    </Flex>
  )
}
