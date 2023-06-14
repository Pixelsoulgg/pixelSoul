import { TextVariants } from '@/themes/theme'
import { Flex, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import GameCard from './GameCard'

export default function GameHubGames() {
  return (
    <Flex w="full" flexDirection="column">
      <Text variant={TextVariants.WITH_24} fontSize="32px">Powered by Pixel Soul</Text>
      <SimpleGrid columns={{base: 1, lg: 4}} columnGap="27px" mt="20px">
          {Array(4).fill(0).map((_, index) => <GameCard key={index} index={index} />)}
      </SimpleGrid>

    </Flex>
  )
}
