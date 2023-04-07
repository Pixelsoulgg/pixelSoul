import { UserAvatar } from '@/components/dashboards'
import { useGlobal } from '@/contexts/Globals'
import Layout from '@/layouts'
import AllReward from '@/views/taverns/AllReward'
import TopReward from '@/views/taverns/TopReward'
import { Flex, HStack, Text, Image, Button } from '@chakra-ui/react'
import React from 'react'

Tavern.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant='dashboard'>{page}</Layout>
}
export default function Tavern() {
  const {avatar} = useGlobal();
  return (
    <Flex flex={1} w="full" flexDirection={{base: "column", lg: "row"}}>
        <Flex w={{base: "full", lg: "348px"}} flexDirection="column">
            <Text variant="with-title" fontSize="18px">Your Gold Balance</Text>
            <HStack w="full" py="30px" borderBottom="1.5px solid #E4E7EC">
              <Image src="/gold.svg" alt="your gold" />
              <Text variant="with-title" color="#667085">40,026.00</Text>
            </HStack>
            <UserAvatar avatar={avatar} disableViewMore />
            <Button bgColor="#7F56D9" color="white" mt="30px" h="36px !important" borderRadius="8px">Get Gold</Button>
        </Flex>
        <Flex flex={1} flexDirection="column" ml={{base: "0px", lg: "20px"}} borderLeft={{base: "none", lg: "1.5px solid #E4E7EC"}}>
            <TopReward />
            <AllReward />
        </Flex>
    </Flex>
  )
}
