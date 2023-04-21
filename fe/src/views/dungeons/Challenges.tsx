import Tag from "@/components/dashboards/Tag";
import { CHALLANGES_DATA } from "@/configs/mockup.data";
import { ButtonVariants } from "@/themes/theme";
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
import React from "react";

export default function Challenges() {
  return (
    <Flex w="full" flexDirection="column" mt="30px">
      <Text variant="with-24" mb="15px">
        All Challenges
      </Text>
      <Table w="full" className="game-table challenge-table">
        <Thead>
          <Tr>
            <Th minW="250px">Challenge</Th>
            <Th w="20%" minW="150px">
              Game
            </Th>
            <Th w="20%" minW="150px">
              Challenge
            </Th>
            <Th w="15%" minW="200px">
              Status
            </Th>
            <Th w="15%" minW="150px">
              Challenge
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {CHALLANGES_DATA.map((item, index) => (
            <Tr key={index.toString()}>
              <Td>
                <VStack w="full" alignItems="flex-start">
                  <Text variant="with-sub" fontWeight="500" color="#039855">
                    Challenge_name_1_hour
                  </Text>

                  <Text
                    variant="with-sub"
                    fontSize="14px"
                    fontWeight="400"
                    color="#101828"
                  >
                    Challenge_description
                  </Text>
                </VStack>
              </Td>
              <Td>
                <Text variant="with-18">Game name</Text>
              </Td>
              <Td>
                <Text variant="with-18">
                  Reward_amount, reward_type (ex. 10 Gold)
                </Text>
              </Td>
              <Td>
                <Tag
                  label={item.status}
                  type={item.status.toLocaleLowerCase().replace(" ", "")}
                />
              </Td>
              <Td>
                <Button
                  w="175px"
                  variant={
                    index === CHALLANGES_DATA.length - 1
                      ? ButtonVariants.WITH_HIGHLIGHT_BLUE
                      : ButtonVariants.WITH_HIGHLIGHT_GREEN
                  }
                >
                  {index === CHALLANGES_DATA.length - 1
                    ? "Accept"
                    : "Check Eligibility"}
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}
