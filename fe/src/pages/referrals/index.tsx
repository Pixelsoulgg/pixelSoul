import { InputPixel } from "@/components";
import { fonts } from "@/configs/constants";
import Layout from "@/layouts";
import { ButtonVariants, TextVariants } from "@/themes/theme";
import { ReferralStep } from "@/views/referrals";
import { Button, Flex, HStack, Image, Input, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

Referral.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export default function Referral() {
  return (
    <Flex
      w="full"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        variant={TextVariants.WITH_TITLE}
        textAlign="center"
        fontWeight={400}
        fontSize={40}
        mt="32px"
      >
        Refer. Earn. Play. Repeat.
      </Text>
      <Text
        variant={TextVariants.WITH_SUB}
        textAlign="center"
        fontWeight={400}
        fontSize={24}
        mt="15px"
      >
        Refer your friends to join DeQuest and enjoy some unique perks!
      </Text>

      <ReferralStep />

      <Flex
        w="full"
        maxW="970px"
        minH="335.15px"
        bg="#F0F9FF"
        borderRadius="8px"
        p="30px 70px"
        mt="30px"
        flexDirection="column"        
      >
        <HStack w="full" justifyContent="flex-start">
          <Flex>
            <Text variant={TextVariants.WITH_18}>Your Referrals:</Text>
          </Flex>
          <InputPixel
            value={"03"}
            h="53px"
            wrapStyle={{ w: "82px", ml: "15px !important" }}
          />

          <Flex w={{ base: "full", lg: "140px" }} ml="20px !important">
            <Text variant={TextVariants.WITH_18}>Total Reward:</Text>
          </Flex>
          <InputPixel
            value={"03"}
            w="131px"
            textAlign="center"
            h="53px"
            icon={
              <Image
                src="/referrals/1.svg"
                position="absolute"
                right={-12}
                left={0}
                marginLeft="auto"
                mr="auto"
              />
            }
          />
        </HStack>

        <HStack w="full" my="30px">
          <Flex w={{ base: "full", lg: "180px" }}>
            <Text variant={TextVariants.WITH_18}>Invite by email:</Text>
          </Flex>
          <InputPixel
            value={"03"}
            w="full"
            h="40px"
            textAlign="start"
            wrapStyle={{ w: "full" }}
          />
          <Button variant={ButtonVariants.WITH_HIGHLIGHT_BLUE}>Send</Button>
        </HStack>

        <HStack w="full">
          <Flex w={{ base: "full", lg: "180px" }}>
            <Text variant={TextVariants.WITH_18}>Invite by email:</Text>
          </Flex>
          <InputPixel
            value={"03"}
            w="full"
            textAlign="start"
            wrapStyle={{ w: "full" }}
          />
          <Button variant={ButtonVariants.WITH_HIGHLIGHT_BLUE} h="36px">
            Copy
          </Button>
        </HStack>

        <Flex
          w={{ base: "full", lg: "192px" }}
          justifyContent="space-between"
          mt="30px"
          ml={{ base: "0px", lg: "130px" }}
        >
          <Link href="#">
            <Image src="/referrals/socials/facebook.svg" />
          </Link>
          <Link href="#">
            <Image src="/referrals/socials/twitter.svg" />
          </Link>
          <Link href="#">
            <Image src="/referrals/socials/linkedin.svg" />
          </Link>
          <Link href="#">
            <Image src="/referrals/socials/telegram.svg" />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
