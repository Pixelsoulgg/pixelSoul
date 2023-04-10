import Layout from '@/layouts'
import DetailModal from '@/views/forges/DetailModal'
import Features from '@/views/forges/Features'
import ListGame from '@/views/forges/ListGame'
import { Flex, useDisclosure } from '@chakra-ui/react'
import React from 'react'

Forges.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export default function Forges() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex flex={1} w="full" flexDirection={{base: "column", lg: "row"}}>
        <Flex flex={1} flexDirection="column">
            <Features onModal={() => onOpen()} />
            <ListGame onModal={() => onOpen()} />
        </Flex>
        <DetailModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}
