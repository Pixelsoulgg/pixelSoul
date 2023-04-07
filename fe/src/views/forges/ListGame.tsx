import Tag from "@/components/dashboards/Tag";
import { fonts } from "@/configs/constants";
import {
  Button,
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
import { m } from "framer-motion";
import React from "react";

export default function ListGame() {
  return (
    <Flex
      w="full"
      flexDirection="column"
      pl={{ base: "0px", lg: "20px" }}
      mt="30px"
    >
      <HStack w="full" my="40px">
        <Button variant="active" w="160px">
          All Game
        </Button>
        <Button variant="normal" w="160px" mx="10px">
          Active
        </Button>
        <Button variant="normal" w="160px">
          Archived
        </Button>
      </HStack>
      <Table variant="simple" margin="0px" className="nft-table">
        <Thead>
          <Tr px="0px">
            <Th textTransform="capitalize" w="15%">
              <Text>Image</Text>
            </Th>
            <Th textTransform="capitalize">
              <Text>Oferring_name</Text>
            </Th>
            <Th textTransform="capitalize" w="15%">
              <Text>Status</Text>
            </Th>
            <Th textTransform="capitalize" w="15%">
              <Text>Time_remaining</Text>
            </Th>
            <Th textTransform="capitalize" w="15%">
              <Text>Like</Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {new Array(3).fill(0).map((d, index) => (
            <Tr
              key={String(index)}
              as={m.tr}
              whileHover={{
                backgroundColor: "rgba(0,0,0, 0.05)",
                cursor: "pointer",
              }}
            >
              <Td>
                <Image src={`/forges/${index + 2}.png`} alt="" />
              </Td>
              <Td>
                <Text
                  fontSize="14px"
                  color="#101828"
                  lineHeight="20px"
                  fontWeight="400"
                  fontFamily={fonts.Inter}
                >
                  Early Access to Samurai Warriors
                </Text>
              </Td>
              <Td>
                <Tag label="Active" type="inprogress" />
              </Td>
              <Td>
                <Text
                  fontSize="14px"
                  color="#101828"
                  lineHeight="20px"
                  fontWeight="400"
                  fontFamily={fonts.Inter}
                >
                  2 days left
                </Text>
              </Td>
              <Td>
                <HStack w="full" mt="18px">
                  <Image src="/like.svg" alt="gold" w="15px" />
                  <Text
                    variant="with-sub"
                    fontSize="12px"
                    color="#000000"
                    fontWeight="500"
                  >
                    3.5k
                  </Text>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}
