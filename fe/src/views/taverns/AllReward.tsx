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

export default function AllReward() {
  return (
    <Flex
      w="full"
      flexDirection="column"
      pl={{ base: "0px", lg: "20px" }}
      mt="30px"
    >
      <Text variant="with-title" fontSize="18px">
        All Reward
      </Text>
      <Table variant="simple" margin="0px" className="nft-table">
        <Thead>
          <Tr px="0px">
            <Th textTransform="capitalize" w="25%">
              <Text>Challenge</Text>
            </Th>
            <Th textTransform="capitalize">
              <Text>Description</Text>
            </Th>
            <Th textTransform="capitalize" w="15%">
              <Text ml="10px">Action</Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {new Array(5).fill(0).map((d, index) => (
            <Tr
              key={String(index)}
              as={m.tr}
              whileHover={{
                backgroundColor: "rgba(0,0,0, 0.05)",
                cursor: "pointer",
              }}
            >
              <Td>
                <Text
                  fontSize="16px"
                  color="#039855"
                  lineHeight="20px"
                  fontWeight="600"
                  fontFamily={fonts.Inter}
                >
                  Challenge_name
                </Text>
              </Td>
              <Td>
                <Text
                  fontSize="14px"
                  color="#101828"
                  lineHeight="20px"
                  fontWeight="400"
                  fontFamily={fonts.Inter}
                  pr="20px"
                >
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                </Text>
              </Td>
              <Td>
                <Button
                  bg="white"
                  border="1px solid #D0D5DD"
                  boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                  borderRadius="8px"
                  w="110px"
                  h="36px"
                  color="#344054"
                  fontSize="14px"
                  fontWeight="600"
                  ml="10px"
                >
                  Claim
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}
