import { varFade, varScale } from "@/components/animations";
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
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Button,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { m } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

Landing.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="landing">{page}</Layout>;
};

export default function Landing() {
  const { push, pathname, query } = useRouter();
  const { user, isLoading, error } = useUser();
  const [authWindow, setAuthWindow] = useState<Window>();
  const [currentWindow, setCurrentWindow] = useState<Window>();
  const [accessToken, setAccessToken] = useState<string>();

  const getAccessToken = useCallback(
    async (isRedirect = false) => {
      const response = await fetch("/api/check");
      const auth = await response.json();
      if (auth.accessToken) {
        if (isRedirect) {
          push(`/my-souls${query ? `?refer=${query.refer}` : ""}`);
        } else {
          setAccessToken(auth.accessToken);
        }
      }
    },
    [push]
  );

  useEffect(() => {
    getAccessToken(true);
  }, [getAccessToken]);

  const handleAuth = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (authWindow) {
      authWindow.close();
    }

    const param =
      "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500px,height=700px'); return false;";
    const _openWindow = window?.open(
      "/api/auth/login",
      "pixelSoulAuth0",
      param
    );
    if (_openWindow) {
      setAuthWindow(_openWindow);
    }
  }, [authWindow]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentWindow(window);
    }
  }, []);

  useEffect(() => {
    if (authWindow) {
      if (authWindow.closed) {
        setAuthWindow(undefined);
        return;
      }
      const interval = setInterval(() => {
        getAccessToken();
      }, 500);
      return () => clearInterval(interval);
    }
  }, [authWindow, getAccessToken]);

  useEffect(() => {
    if (accessToken && authWindow) {
      authWindow.close();
      setAuthWindow(undefined);
      push(`/my-souls${query ? `?refer=${query.refer}` : ""}`);
    }
  }, [authWindow, accessToken, currentWindow, push]);

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
          isDisableAnimation={false}
          initial="visible"
        >
          <HStack
            w="full"
            as={m.header}
            variants={varFade({ easeIn: "linear" }).inDown}
            initial="initial"
            animate="animate"
          >
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
                onClick={handleAuth}
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
                onClick={handleAuth}
              >
                <Image src="./new-landings/signup-btn.svg" />
              </Button>
            </HStack>
          </HStack>
        </LandingContainer>

        <LandingContainer flex={1} justifyContent="center" initial="visible">
          <VStack w="full">
            <Text
              variant={TextVariants.WITH_LANDING}
              className="text-border"
              as={m.p}
              variants={varFade({ easeIn: "linear", durationIn: 1 }).in}
              initial="initial"
              animate="animate"
              fontSize={{base:  "25px", lg: "32px"}}
            >
              Play. Win. Earn.
            </Text>
            <Text
              variant={TextVariants.WITH_LANDING}
              fontSize={{base:  "32px", lg: "48px"}}
              className="text-border-4"
              fontFamily={fonts.QuinqueFive}
              fontWeight="400"
              my="39px !important"
              textAlign="center"             
              as={m.p}
              variants={varFade({ easeIn: "linear" }).inUp}
              initial="initial"
              animate="animate"
            >
              New World of Gaming
            </Text>

            <Text
              variant={TextVariants.WITH_LANDING}
              className="text-border"
              fontWeight="700"
              as={m.p}
              variants={varScale({ easeIn: "linear" }).inY}
              initial="initial"
              animate="animate"
              textAlign="center"
            >
              Bringing the power back to the player
            </Text>
            <Flex
              w="full"
              justifyContent="center"
              mt="70px !important"
              as={m.div}
              variants={varFade({ easeIn: "linear" }).inUp}
              initial="initial"
              animate="animate"
            >
              <Image
                src="./new-landings/signup1-btn.svg"
                cursor="pointer"
                mr="23px"
                onClick={handleAuth}
                as={m.img}
                whileTap={{
                  scaleX: 0.98,
                  boxShadow: "4px 4px 4px rgba(151, 71, 255, 0.35)",
                }}
              />
              <Image
                src="./new-landings/demo-btn.svg"
                cursor="pointer"
                onClick={() => push("/my-souls")}
                as={m.img}
                whileTap={{
                  scaleX: 0.98,
                  boxShadow: "4px 4px 4px rgba(151, 71, 255, 0.35)",
                }}
              />
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
