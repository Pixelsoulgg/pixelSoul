import {
  Box,
  Flex,
  HStack,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useMemo } from "react";
import { Empty } from "../../components";
import { fonts, NFTsData } from "../../configs/constants";
import { useAppSelector } from "../../reduxs/hooks";
import { Animate } from "@/components/animations";

export default function MyNFTs() {
  const { walletInfo } = useAppSelector((state) => state.account);
  const {nfts} = useAppSelector((state) => state.soul);

  const data = useMemo(() => {
    if (!nfts) return [];
    return nfts.assets.slice(0, 3);
  }, [nfts]);

  return (
    <Flex w="full" flexDir="column" mt="30px">
      <Text variant="with-title" fontSize="18px" mb="10px">
        My NFTs
      </Text>
      {!walletInfo && <Empty />}

      {walletInfo && (
        <>
          <Table variant="simple" margin="0px" className="nft-table">
            <Thead>
              <Tr px="0px">
                {NFTsData.header.map((p, index) => (
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
              {data.map((d, index) => (
                <Tr key={String(index)} as={motion.tr} whileHover={Animate.tableHover}>
                  <Td>
                    <Link href={d.permalink} target="_blank">
                    <HStack>
                      <Image src={d.image_preview_url} alt={d.name} 
                        h="50px"
                        w="83px"
                        objectFit="cover"
                        borderRadius="5px"                        
                      />
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
                    </Link>
                  </Td>
                  <Td>
                    <Text
                      fontSize="14px"
                      color="#101828"
                      lineHeight="20px"
                      fontWeight="400"
                      fontFamily={fonts.Inter}
                    >
                      {d.stats.floor_price}
                    </Text>
                  </Td>
                  <Td>
                    <HStack>
                      <Image src="/steam-icon.svg" alt="steam" />
                      <Text variant="with-sub" fontWeight="600">
                        Steam
                      </Text>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>         
            <Box
              as="a"
              mt="20px"
              borderRadius="8px"
              padding="10px 16px"
              border="1px solid #D0D5DD"
              bg="#fff"
              boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
              w="fit-content"
              
            >
               <Link href="profiles/nfts">
                  <Text
                    color="#344054"
                    fontSize="14px"
                    fontWeight="600"
                    fontFamily={fonts.Inter}
                    flex={1}
                  >
                    View All
                  </Text>
                </Link>
            </Box>
        </>
      )}
    </Flex>
  );
}
