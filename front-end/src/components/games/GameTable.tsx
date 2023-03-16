import {
  Button,
  Flex,
  HStack,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import Tag from "../dashboards/Tag";

export default function GameTable() {
  return (
    <Flex
      w="full"
      borderRadius="12px"
      overflow="hidden"
      border="1px solid #EAECF0"
      boxShadow="0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)"
      bg="white"
      overflowX="auto"
      flexDirection="column"
    >
      <Table w="full" className="game-table">
        <Thead>
          <Tr>
            <Th minW="200px">Name</Th>
            <Th w="20%" minW="150px">
              Requirment
            </Th>
            <Th w="10%" minW="150px">
              Value
            </Th>
            <Th w="20%" minW="150px">
              Holders
            </Th>
            <Th w="20%" minW="200px">
              Progress
            </Th>
            <Th w="10%" minW="150px">
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {new Array(5).fill(0).map((item, index) => (
            <Tr key={index.toString()}>
              <Td>
                <HStack>
                  <Image src={`/games/${index % 4}.svg`} mr="12px" />
                  <Text variant="with-sub" fontWeight="500" color="#101828">
                    Eth Holder
                  </Text>
                </HStack>
              </Td>
              <Td>
                <Tag label="In process" type="inprogress" />
              </Td>
              <Td>
                <Tag
                  type={index % 4 === 0 ? "inprogress" : "uncategorized"}
                  label={(index * 2).toString()}
                />
              </Td>
              <Td>
                <Image src="/games/holders.svg" />
              </Td>
              <Td>
                <Flex w="full" h="8px" borderRadius="full" bg="#EAECF0">
                  <Flex w="60%" h="8px" borderRadius="full" bg="#7F56D9" />
                </Flex>
              </Td>
              <Td>
                <HStack>
                  <Image src="/games/trash.svg" cursor="pointer" />
                  <Image src="/games/edit.svg" cursor="pointer" />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex
        w="full"
        h="65px"
        justifyContent="space-between"
        px="20px"
        alignItems="center"
      >
        <Button
          border="1px solid #D0D5DD"
          bg="white"
          boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
        >
          Previous
        </Button>

        <Text variant="with-sub" fontSize="14px">Page 1 of 5</Text>

        <Button
          border="1px solid #D0D5DD"
          bg="white"
          boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
}
