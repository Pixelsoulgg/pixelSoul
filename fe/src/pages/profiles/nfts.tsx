import { Button, Flex, Image, SimpleGrid, Spacer } from '@chakra-ui/react'
import React from 'react'
import { NFTItem } from '@/views/profiles'

import Layout from '@/layouts'


nfts.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export default function nfts() {
  return (
    <Flex flex={1} w="full" flexDirection="column">
        <Flex w="full" px="20px">
          <Spacer />
          <Button variant="active" w="160px">All</Button>
          <Button variant="normal" minW="40px" w="44px" mx="10px">
            <Image src="/arrow-pre.svg" />
          </Button>
          <Button variant="normal" minW="40px" w="44px">
            <Image src="/arrow-next.svg" />
          </Button>
        </Flex>

        <SimpleGrid w="full" columns={{base: 1, lg: 4}} gap="30px" mt="20px">
          {new Array(12).fill(0).map((_, index) => <NFTItem key={index} />)}
        </SimpleGrid>

    </Flex>
  )
}
