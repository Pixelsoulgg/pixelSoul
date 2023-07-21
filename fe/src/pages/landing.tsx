import { fonts } from "@/configs/constants";
import Layout from "@/layouts";
import { TextVariants } from "@/themes/theme";
import { LandingContainer } from "@/views/new-landings";
import EverGrowing from "@/views/new-landings/EverGrowing";
import GameStudio from "@/views/new-landings/GameStudio";
import LandingFooter from "@/views/new-landings/LandingFooter";
import TechIsNothing from "@/views/new-landings/TechIsNothing";
import TimeToJumpIn from "@/views/new-landings/TimeToJumpIn";
import UniqueGame from "@/views/new-landings/UniqueGame";
import {
  Button,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

Landing.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="landing">{page}</Layout>;
};


export default function Landing() {
  return (
    <>
      <Flex
        w="full"
        bgImage="./new-landings/header-bg.svg"
        minH="100vh"
        flexDirection="column"
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        <LandingContainer
          h="79px"
          bgColor="rgba(255, 255, 255, 0.20)"
          boxShadow="px 4px 4px 0px rgba(0, 0, 0, 0.25)"
          justifyContent="center"
          backdropFilter="blur(7px)"
          isDisableAnimation
        >
          <HStack w="full">
            <Link href="/">
              <Image src="./new-landings/logo.svg" />
            </Link>
            <Spacer />
            <HStack>
              <Button
                variant="ghost"
                w="120px !important"
                h="40px !important"
                _hover={{ bgColor: "none" }}
                _active={{ bgColor: "none" }}
              >
                <Image src="./new-landings/login-btn.svg" />
              </Button>
              <Button
                variant="ghost"
                w="120px !important"
                h="40px !important"
                _hover={{ bgColor: "none" }}
                _active={{ bgColor: "none" }}
                ml="-20px !important"
              >
                <Image src="./new-landings/signup-btn.svg" />
              </Button>
            </HStack>
          </HStack>
        </LandingContainer>

        <LandingContainer flex={1} justifyContent="center" isDisableAnimation>
          <VStack w="full">
            <Text variant={TextVariants.WITH_LANDING} className="text-border">
              Play. Win. Earn.
            </Text>
            <Text
              variant={TextVariants.WITH_LANDING}
              fontSize="48px"
              className="text-border-4"
              fontFamily={fonts.QuinqueFive}
              fontWeight="400"
              my="39px !important"
            >
              New World of Gaming
            </Text>

            <Text
              variant={TextVariants.WITH_LANDING}
              className="text-border"
              fontWeight="700"
            >
              Bringing the power back to the player
            </Text>
            <Flex w="full" justifyContent="center" mt="70px !important">
              <Image
                src="./new-landings/signup1-btn.svg"
                cursor="pointer"
                mr="23px"
              />
              <Image src="./new-landings/demo-btn.svg" cursor="pointer" />
            </Flex>
          </VStack>
        </LandingContainer>
      </Flex>
      <VStack
        w="full"
        bgImage="./new-landings/body-bg.png"
        minH="100vh"
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        <EverGrowing />
        <TechIsNothing />
        <UniqueGame />
        <GameStudio />
        <TimeToJumpIn />
        <LandingFooter />
      </VStack>
    </>
  );
}
