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
import Rarity from "@/components/Rarity";
import { useGetChestQuery } from "@/services/modules/game.check.services";


export default function MySouldDropChests() {
  const { auth0Sub, auth0Info } = useAppSelector((state) => state.auth);
  const {data: chestData} = useGetChestQuery(auth0Sub, {skip: !auth0Sub});

  return (
    <Flex w="full" flexDir="column" mt="30px">
      <Text variant="with-title" fontSize="24px" mb="10px">
        My SouldDrop Chests
      </Text>
      {!auth0Info?.walletAddress && <Empty />}
      {auth0Info?.walletAddress && (
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
                      <Text fontFamily={fonts.Inter} fontSize="16px">{p.label}</Text>
                    </HStack>
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {chestData?.map((d, index) => (
                <Tr key={String(index)} as={motion.tr} whileHover={Animate.tableHover}>
                  <Td>
                    <Link href="#" target="_blank">
                    <HStack>
                      <Image src={`/chests/${d.chest.rarity}.svg`} alt={d.chest.name} 
                        h="50px"
                        w="83px"
                        objectFit="cover"
                        borderRadius="5px"                        
                      />
                      <VStack alignItems="flex-start">
                        <Text
                          fontSize="16px"
                          color="#101828"
                          lineHeight="20px"
                          fontWeight="500"
                          fontFamily={fonts.Inter}
                        >
                          {d.chest.name}
                        </Text>
                      </VStack>
                    </HStack>
                    </Link>
                  </Td>
                  <Td>
                    <Text
                      fontSize="16px"
                      color="#101828"
                      lineHeight="20px"
                      fontWeight="400"
                      fontFamily={fonts.Inter}
                    >         
                     {/* @ts-ignore */}
                     <Rarity type={d.chest.rarity} />
                    </Text>
                  </Td>
                  <Td>                   
                      <Text variant="with-sub" fontWeight="600">
                        {d.chest.description}
                      </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>   
        </>
      )}
    </Flex>
  );
}
