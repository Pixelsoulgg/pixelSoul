import React from "react";
import {
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { fonts, NFTsData } from "../../configs/constants";
import Tag from "../../components/dashboards/Tag";

interface IProps extends FlexProps {}

export default function SteamTable({ ...props }: IProps) {
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
      {...props}
    >
      <Table w="full" className="game-table">
        <Thead>
          <Tr>
            <Th minW="200px">Steam ID</Th>
            <Th w="20%" minW="150px">
            Total Hours
            </Th>
            <Th w="10%" minW="150px">
            Steam Level
            </Th>
            <Th w="20%" minW="150px">
            Total Hours
            </Th>
            <Th w="20%" minW="200px">
            Year
            </Th>
            <Th w="10%" minW="150px">
            Games
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {new Array(1).fill(0).map((item, index) => (
            <Tr key={index.toString()}>
              <Td>
                <HStack>
                  <Image src={`/steam-icon.svg`} mr="12px" />
                  <Text variant="with-sub" fontWeight="500" color="#101828">
                    Gods Unchained
                  </Text>
                </HStack>
              </Td>
              <Td>
                  <Text variant="with-sub" fontWeight="500" color="#101828">
                    212
                  </Text>
              </Td>
              <Td>
                   <Text variant="with-sub" fontWeight="500" color="#101828">
                    212
                  </Text>
              </Td>
              <Td>
                   <Text variant="with-sub" fontWeight="500" color="#101828">
                    212
                  </Text>
              </Td>
              <Td>
                   <Text variant="with-sub" fontWeight="500" color="#101828">
                    2 Y
                  </Text> 
              </Td>
              <Td>
                  <Text variant="with-sub" fontWeight="500" color="#101828">
                    2
                  </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}
