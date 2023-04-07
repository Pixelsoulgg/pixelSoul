import Layout from '@/layouts'
import Features from '@/views/forges/Features'
import ListGame from '@/views/forges/ListGame'
import { Flex } from '@chakra-ui/react'
import React from 'react'

Forges.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export default function Forges() {
  return (
    <Flex flex={1} w="full" flexDirection={{base: "column", lg: "row"}}>
        <Flex flex={1} flexDirection="column">
            <Features />
            <ListGame />
        </Flex>
    </Flex>
  )
}
