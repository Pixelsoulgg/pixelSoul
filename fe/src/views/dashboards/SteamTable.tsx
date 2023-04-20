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
  Tr,
} from "@chakra-ui/react";
import { useAppSelector } from "@/reduxs/hooks";
import { getYears, numberFormat } from "@/utils";

interface IProps extends FlexProps {}

export default function SteamTable({ ...props }: IProps) {
  const {steamUser} = useAppSelector((p) => p.soul);  

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
            <Th w="20%" minW="200px">
            Age
            </Th>
            <Th w="10%" minW="150px">
            Games
            </Th>
          </Tr>
        </Thead>
        <Tbody>     
            <Tr>
              <Td>
                <HStack>
                  <Image src={`/steam-icon.svg`} mr="12px" alt="steam logo" />
                  <Text variant="with-sub" fontWeight="500" color="#101828">
                    {steamUser?.steamProfile.realname}
                  </Text>
                </HStack>
              </Td>
              <Td>
                  <Text variant="with-sub" fontWeight="500" color="#101828">
                    {numberFormat((steamUser?.totalHours || 0) / 60)} 
                  </Text>
              </Td>
              <Td>
                   <Text variant="with-sub" fontWeight="500" color="#101828">
                   {steamUser?.level}
                  </Text>
              </Td>
              
              <Td>
                   <Text variant="with-sub" fontWeight="500" color="#101828">
                   {getYears(steamUser?.timeCreated || 0)} Y
                  </Text> 
              </Td>
              <Td>
                  <Text variant="with-sub" fontWeight="500" color="#101828">
                   {steamUser?.gameNumber}
                  </Text>
              </Td>
            </Tr>         
        </Tbody>
      </Table>
    </Flex>
  );
}
