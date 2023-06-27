import { TextVariants } from "@/themes/theme";
import { Flex, Text, Image, VStack, Box } from "@chakra-ui/react";
import React from "react";

interface IProps {
  active: boolean;
  item: any;
}

const reColors = {
  "1": "#4691FF",
  "2": "#6941C6",
  "3": "#F79009"
}

export default function ReCard({ active, item }: IProps) {
  return (
    <Flex position="relative" h="100px" justifyContent="flex-end">
      <Flex
        w="168px"
        h="58px"
        filter="drop-shadow(0px 5.10001px 5.10001px rgba(75, 255, 255, 0.5))"
        bgImage={`/referra${active ? "-active" : ""}-bg.svg`}
        bgRepeat="no-repeat"
        justifyContent="center"
        alignItems="center"
      >
        {/* @ts-ignore */}
        <Text variant={TextVariants.WITH_18} fontSize="21px" color={reColors[item.logo]}>
          {item.value}
        </Text>
        <Image src={`/referrals/${item.logo}.svg`} w="21px" mx="5px" />
        {/* @ts-ignore */}
        <Text variant={TextVariants.WITH_18} fontSize="21px" color={reColors[item.logo]}>
          per referral
        </Text>
      </Flex>
      {item.child && (
        <Flex
          position="absolute"
          right="-55px"
          top="-12"
          justify="center"
          alignItems="center"
          flexDirection="column"
        >
          <Text variant={TextVariants.WITH_18} fontSize="23px">
            {item.label} Referrals
          </Text>
          <Image
            src={`/referrals/arrow${active ? "-active" : ""}.svg`}
            transform="rotate(-180deg)"
            mt="5px"
          />
        </Flex>
      )}

      {item.child && (
        <VStack right="-35px" bottom="-140px" position="absolute" h="167px">
          <Image src={`/referrals/arrow${active ? "-active" : ""}.svg`} />
          {item.child.map((t: any) => (
            <Box
              w="66px"
              h="40px"
              bg="#fff"
              justifyContent="center"
              alignItems="center"
              display="flex"
              border={`1.275px solid ${active ? "#4691FF" : "#C8CCE5"}`}
              borderRadius="5px"
            >
              <Text
                variant={TextVariants.WITH_18}
                fontSize="20.4px"
                color={`${active ? "#4691FF" : "#667085"}`}
              >
                {t.lable}
              </Text>
              <Image src={`/referrals/chest/${t.icon}.svg`} />
            </Box>
          ))}
        </VStack>
      )}
    </Flex>
  );
}
