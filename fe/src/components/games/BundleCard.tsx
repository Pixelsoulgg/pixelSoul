import {
  Checkbox,
  Flex,
  FlexProps,
  HStack,
  Image,
  Radio,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Tag from "../dashboards/Tag";

interface IProps extends FlexProps {}

export default function BundleCard({...props}: IProps) {
  return (
    <Flex w="full" flexDirection="column" {...props}>
      <Flex
        w="full"
        borderRadius="12px"
        border="2px solid #7F56D9"
        flexDirection="column"
        bg="#F9F5FF"
      >
        <Flex w="full" borderBottom="2px solid #7F56D9">
          <HStack w="full" p="16px">
            <Image src="/bundles/1.svg" />
            <Text variant="with-title" color="#7F56D9" fontSize="16px">
              Pro Bundle
            </Text>
            <Spacer />
            <Image src="/bundles/tick.svg" />
          </HStack>
        </Flex>
        <Flex w="full" flexDirection="column" p="16px">
          <HStack w="full" mb="10px">
            <Text variant="with-title">$50</Text>
            <Spacer />
            <Tag type="inprogress" label="One time" />
          </HStack>
          <Text variant="with-sub" w="50%">
            Includes up to 10 users, 20GB individual data and access to all
            features.
          </Text>
        </Flex>
      </Flex>
      <VStack w="full" alignItems="flex-start">
        <HStack
          w="full"
          p="16px"
          border="1px solid #EAECF0"
          borderRadius="12px"
        >
          <Image src="/bundles/1.svg" />
          <Text variant="with-title" fontSize="16px" color="#344054">
            5 NFTs
          </Text>
          <Spacer />
          <Radio isReadOnly />
        </HStack>
        <HStack
          w="full"
          p="16px"
          border="1px solid #EAECF0"
          borderRadius="12px"
          mt="0px !important"
        >
          <Image src="/bundles/3.svg" />
          <Text variant="with-title" fontSize="16px" color="#344054">
            100 ILV
          </Text>
          <Spacer />
          <Radio isReadOnly />
        </HStack>
        <HStack
          w="full"
          p="16px"
          border="1px solid #EAECF0"
          borderRadius="12px"
          mt="0px !important"
        >
          <Image src="/bundles/3.svg" />
          <Text variant="with-title" fontSize="16px" color="#344054">
            100 GOLD
          </Text>
          <Spacer />
          <Radio isReadOnly />
        </HStack>
      </VStack>
      <Flex w="full" px="16px" py="5px">
        <Text variant="with-sub" fontSize="14px">
          Rules: Over 100H in the Strategy Genre{" "}
        </Text>
      </Flex>
      <SimpleGrid w="full" columns={2} columnGap="15px">
        <Flex w="full" bg="#7F56D9" borderRadius="12px">
          <Flex
            p="16px"
            m="16px"
            borderRadius="8px"
            bg="rgba(255,255,255, 0.3)"
            w="full"
            justifyContent="center"
            alignItems="center"
            border="1px solid rgba(255, 255, 255, 0.5)"
            backdropFilter="blur(12px)"
          >
            <Text variant="with-sub" color="#fff" fontWeight="500">
              Buy with Card
            </Text>
          </Flex>
        </Flex>

        <Flex w="full" bg="#039855" borderRadius="12px">
          <Flex
            p="16px"
            m="16px"
            borderRadius="8px"
            bg="rgba(255,255,255, 0.3)"
            w="full"
            justifyContent="center"
            alignItems="center"
            border="1px solid rgba(255, 255, 255, 0.5)"
            backdropFilter="blur(12px)"
          >
            <Text variant="with-sub" color="#fff" fontWeight="500">
              Buy with Crypto
            </Text>
          </Flex>
        </Flex>
      </SimpleGrid>
    </Flex>
  );
}
