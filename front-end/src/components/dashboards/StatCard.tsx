import { Box, Flex, HStack, Image, Img, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { fonts } from "../../configs/constants";
import ComingSoon from "../ComingSoon";

interface IProps {
  title: string;
  value: string;
  percent?: number;
  isUp: boolean;
  comingSoon?: boolean;
}

export default function StatCard({
  title,
  value,
  percent,
  isUp,
  comingSoon,
}: IProps) {
  const color = isUp ? "#027A48" : "#B42318";
  const bg = isUp ? "#ECFDF3" : "#FEF3F2";
  const icon = isUp ? "up" : "down";
  return (
    <Flex
      direction="column"
      bg="#fff"
      border="1px solid #EAECF0"
      padding="24px"
      borderRadius="12px"
      boxShadow="0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)"
      gap="8px"
      alignItems="flex-start"
      minW="223px"
      maxH="115px"
      flex={1}
      my="10px"
    >
      <HStack justifyContent="space-between" w="full">
        <Text
          color="#475467"
          fontWeight="500"
          fontSize="14px"
          fontFamily={fonts.Inter}
        >
          {title}
        </Text>
        <Image src="/three-dot.svg" />
      </HStack>
      {!comingSoon && (
        <HStack w="full">
          <Text
            color="#101828"
            fontFamily={fonts.Inter}
            fontWeight="600"
            fontSize="30px"
            lineHeight="38px"
          >
            {value}
          </Text>
          <Spacer />
          <Box
            display="flex"
            flexDirection="row"
            bg={bg}
            w="61px"
            h="24px"
            borderRadius="16px"
            justifyContent="center"
            alignItems="center"
          >
            <Image w="12px" src={`/arrow-${icon}.svg`} />
            <Text
              color={color}
              fontWeight="bold"
              fontSize="14px"
              fontFamily={fonts.Inter}
              ml="4px"
            >
              {percent}%
            </Text>
          </Box>
        </HStack>
      )}
      {comingSoon && <ComingSoon isSmall  bg="#f1f1f170" borderRadius="5px" />}
    </Flex>
  );
}
