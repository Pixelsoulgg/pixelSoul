import { TextVariants } from '@/themes/theme'
import { Flex, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import GameCard from './GameCard'
import { GameHubGamesData } from '@/configs/constants'

export default function GameHubGames() {
  return (
    <Flex w="full" flexDirection="column">
      <Text variant={TextVariants.WITH_24} fontSize="32px">Powered by Pixel Soul</Text>
      <SimpleGrid columns={{base: 1, lg: 4}} columnGap="27px" mt="20px">
          {GameHubGamesData.map((game, index) => <GameCard key={index} index={index} name={game.name} />)}
      </SimpleGrid>

    </Flex>
  )
}
