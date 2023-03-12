import {
  Flex,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Image,
  VStack,
  Text,
  Tooltip,
  Button,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { fonts } from "../../configs/constants";
import { INftDashboardItem, INftLabel } from "../../types";
import ComingSoon from "../ComingSoon";
import Tag from "./Tag";

type IProps = {
  title: string;
  tableLabels: INftLabel[];
  data: INftDashboardItem[];
  comingSoon?: boolean;
};

const NFTTable = ({ title, tableLabels, data, comingSoon }: IProps) => {
  return (
    <Flex
      flex={1}
      w="100%"
      flexDirection="column"
      px="10px"
      py="10px"
      borderRadius="10px"
      mt={{ base: "20px", lg: "0px" }}
    >
      <Heading
        size="md"
        fontFamily={fonts.Inter}
        color="#101828"
        fontSize="18px"
        fontWeight="600"
        lineHeight="28px"
      >
        {title}
      </Heading>

      <Table variant="simple" margin="0px" className="nft-table">
        <Thead>
          <Tr px="0px">
            {tableLabels.map((p, index) => (
              <Th
                w={p.width || "20%"}
                textTransform="capitalize"
                key={String(index)}
              >
                <HStack>
                  <Text>{p.label}</Text>
                  {p.description && (
                    <Tooltip>
                      <Image src="/tooltip.svg" />
                    </Tooltip>
                  )}
                </HStack>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {!comingSoon &&
            data.map((d, index) => (
              <Tr key={String(index)}>
                <Td>
                  <HStack>
                    <Image src={`/${d.img}`} />
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
                      <Text
                        fontSize="14px"
                        color="#101828"
                        lineHeight="20px"
                        fontWeight="400"
                        fontFamily={fonts.Inter}
                      >
                        {d.kb} KB
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
                    ${d.amount}
                  </Text>
                </Td>
                <Td>
                  <Tag label={d.type} type={d.type.toLocaleLowerCase()} />
                </Td>
              </Tr>
            ))}
          {comingSoon && (
            <Tr>
              <Td colSpan={tableLabels.length}>
                <ComingSoon minH="200px" bg="#f1f1f170" />
              </Td>
            </Tr>
          )}
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
  );
};

export default NFTTable;
