import { Box, Flex, HStack, Image, Table, Tbody, Td, Text, Th, Thead, Tooltip, Tr, VStack } from '@chakra-ui/react'
import React from 'react'
import { Empty } from '../../components'
import { fonts, MyCollectiblesData, NFTsData } from '../../configs/constants'

export default function MyCollectibles() {
  return (
    <Flex w="full" flexDir="column" mt="30px">
      <Text variant='with-title' fontSize="18px" mb="10px">My Collectibles</Text>
      <Empty />

      <Table variant="simple" margin="0px" className="nft-table">
        <Thead>
          <Tr px="0px">
            {MyCollectiblesData.header.map((p, index) => (
              <Th
                w={p.width || "20%"}
                textTransform="capitalize"
                key={String(index)}
              >
                <HStack>
                  <Text>{p.label}</Text>
                </HStack>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {
            MyCollectiblesData.data.map((d, index) => (
              <Tr key={String(index)}>
                <Td>
                  <HStack>
                    <Image src={`/nfts/${index + 4}.svg`} />
                    <VStack alignItems="flex-start">
                      <Text
                        fontSize="14px"
                        color="#101828"
                        lineHeight="20px"
                        fontWeight="500"
                        fontFamily={fonts.Inter}
                      >
                        {d.name}
                      </Text>
                    </VStack>
                  </HStack>
                </Td>
                <Td>
                  <Text
                    fontSize="14px"
                    color="#101828"
                    lineHeight="20px"
                    fontWeight="400"
                    fontFamily={fonts.Inter}
                  >
                    {d.amount}
                  </Text>
                </Td>
                <Td>
                  <HStack>
                    <Image src='/steam-icon.svg' />
                    <Text variant='with-sub' fontWeight="600">Steam</Text>
                  </HStack>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      <Box
        mt="20px"
        borderRadius="8px"
        padding="10px 16px"
        border="1px solid #D0D5DD"
        bg="#fff"
        boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
        w="fit-content"
        cursor="pointer"
      >
        <Text
          color="#344054"
          fontSize="14px"
          fontWeight="600"
          fontFamily={fonts.Inter}
        >
          View All
        </Text>
      </Box>


    </Flex>
  )
}
