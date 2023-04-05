import {
  Button,
  Flex,
  FlexProps,
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
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { CHALLANGES_DATA } from "../../configs/mockup.data";
import Tag from "../dashboards/Tag";

interface IProps extends FlexProps {}

export default function ChallangesTable({ ...props }: IProps) {
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
      display="none"
      {...props}
    >
      <Table w="full" className="game-table">
        <Thead>
          <Tr>
            <Th w="20%" minW="250px">
              Challenge
            </Th>
            <Th w="10%" minW="150px">
              Reward
            </Th>
            <Th w="20%" minW="150px">
              Status
            </Th>
            <Th w="20%" minW="200px">
              Players
            </Th>
            <Th w="10%" minW="150px">
              Progress
            </Th>
            <Th w="10%" minW="150px">
              actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {CHALLANGES_DATA.map((item, index) => (
            <Tr key={index.toString()}>
              <Td>
                <HStack>
                  <Image src={`/challenges/${item.id}.svg`} mr="12px" />
                  <VStack w="full" alignItems="flex-start">
                  <Text variant="with-sub" fontWeight="500" color="#101828">
                    {item.challenge}
                  </Text>
                  {item.subName && (
                    <Text
                      variant="with-sub"
                      fontSize="14px"
                      fontWeight="400"
                      color="#475467"
                    >
                      {item.subName}
                    </Text>
                  )}
                  </VStack>
                </HStack>
              </Td>
              <Td>
                <Tag label={item.reward} type="inprogress" />
              </Td>
              <Td>
                <Tag label={item.status} type={item.status.toLocaleLowerCase().replace(' ','')} />
              </Td>
              <Td>
                <Image src="/games/holders.svg" />
              </Td>
              <Td>
                <Flex w="full" h="8px" borderRadius="full" bg="#EAECF0">
                  <Flex w={`${item.process}%`} h="8px" borderRadius="full" bg={item.process > 75 ? '#12B76A' : '#7F56D9' } />
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

        <Text variant="with-sub" fontSize="14px">
          Page 1 of 5
        </Text>

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
