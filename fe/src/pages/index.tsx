import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { m } from "framer-motion";
import { varFade, varScale } from "@/components/animations";
import { useUser } from "@auth0/nextjs-auth0/client";
import PixelSouldLogo from "@/components/PixelSould";
import Layout from "@/layouts";
import { useRouter } from "next/router";

LandingPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="landing">{page}</Layout>;
};

export default function LandingPage() {
  const {push} = useRouter();
  const { user, isLoading, error } = useUser();
  const [authWindow, setAuthWindow] = useState<Window>();
  const [currentWindow, setCurrentWindow] = useState<Window>();
  const [accessToken, setAccessToken] = useState<string>();

  const getAccessToken = useCallback(async (isRedirect = false) => {
    const response = await fetch("/api/check");
    const auth = await response.json();
    if (auth.accessToken) {
      if (isRedirect) {
        push('my-souls')
      } else {
        setAccessToken(auth.accessToken);
      }      
    }
  }, [push]);

  useEffect(() => {
    getAccessToken(true);
  }, [getAccessToken])

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
      push('/my-souls')
    }
  }, [authWindow, accessToken, currentWindow, push]);

  return (
    <Flex
      flex={1}
      w="full"
      flexDirection={{ base: "column", lg: "column" }}
    >
     
      {/* Header */}
      <Flex
        w="full"
        as={m.header}
        variants={varFade({ easeIn: "linear" }).inDown}
        initial="initial"
        animate="animate"
      >
        <HStack alignItems="center">
          <PixelSouldLogo />
          <Link href="/">
            <Text
              variant="with-lexend-menu"
              color="color.white"
              ml={{ base: "5px", lg: "25px" }}
            >
              Games
            </Text>
          </Link>
        </HStack>
        <Spacer />
        {!user && (
          <>
            <Button
              variant="with-no-bg"
              ml="20px"
              as="a"
              cursor="pointer"
              onClick={handleAuth}
            >
              Login
            </Button>
            <Button
              cursor="pointer"
              variant="with-no-bg"
              bg="bg.primary"
              border="none"
              ml="16px"
              onClick={handleAuth}
            >
              Sign up
            </Button>
          </>
        )}
        {user && (
          <HStack>
            <Tooltip title={user.name || undefined}>
              <Avatar
                name={user.name || "pixelSoul"}
                src={user.picture || ""}
                w="53px"
                h="53px"
                mr="10px"
                title={user.name || ""}
                border="1px solid rgba(0,0,0, 0.4)"
              />
            </Tooltip>
            <Link href="/api/auth/logout">
              <Button
                variant="with-no-bg"
                bg="bg.primary"
                border="none"
                ml="16px"
              >
                log out
              </Button>
            </Link>
          </HStack>
        )}
      </Flex>
      {/* End Header */}

      <Flex w="full" flex={1} flexDirection="column" justifyContent="center">
        <Text
          variant="with-lexend"
          fontSize="20px"
          fontWeight="400"
          mb="22px"
          as={m.p}
          variants={varFade({ easeIn: "linear", durationIn: 1 }).in}
          initial="initial"
          animate="animate"
        >
          Play. Win. Earn.
        </Text>

        <Text
          variant="with-heading"
          as={m.p}
          variants={varFade({ easeIn: "linear" }).inUp}
          initial="initial"
          animate="animate"
        >
          New world of gaming
        </Text>

        <Text
          variant="with-lexend"
          mt="22px"
          fontSize="31px"
          fontWeight="500"
          as={m.p}
          variants={varScale({ easeIn: "linear" }).inY}
          initial="initial"
          animate="animate"
        >
          Bringing the power back to the player
        </Text>

        <Box
          mt="84px"
          w="full"
          as={m.div}
          variants={varFade().inUp}
          initial="initial"
          animate="animate"
        >
          <Button
            variant="with-bg"
            mr="30px"
            my="5px"
            cursor="pointer"
            onClick={handleAuth}
          >
            Sign Up
          </Button>         
            <Button             
              variant="with-bg"
              bg="bg.white"
              color="color.black"
              my="5px"
              cursor="pointer"
              isDisabled={!user}
              _disabled={{bg: 'rgba(255,255,255, 0.5)'}}
              onClick={() => push('/my-souls')}
            >
              <Image src="/subtract.svg" mr="17px" alt="subtract" />
              Demo
            </Button>        
        </Box>
      </Flex>
    </Flex>
  );
}
