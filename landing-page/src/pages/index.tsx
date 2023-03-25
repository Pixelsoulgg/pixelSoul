import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { PixelSouldLogo } from "../components";
import { m, motion } from "framer-motion";
import { varFade, varScale } from "../components/animate";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>PixelSoul - Landing page</title>
      </Head>

      <Flex flex={1} w="full" flexDirection={{ base: "column", lg: "column" }}>
        {/* Header */}
        <Flex 
          w="full" 
          as={m.header}
          variants={varFade({easeIn: 'linear'}).inDown}
          initial="initial"
          animate="animate"
        >
          <HStack alignItems="center">
            <PixelSouldLogo />
            <Link href="/">
              <a>
                <Text
                  variant="with-lexend-menu"
                  color="color.white"
                  ml={{ base: "5px", lg: "25px" }}
                >
                  Games
                </Text>
              </a>
            </Link>
          </HStack>
          <Spacer />
          <Button variant="with-no-bg" ml="20px">
            Login
          </Button>
          <Button variant="with-no-bg" bg="bg.primary" border="none" ml="16px">
            Sign up
          </Button>
        </Flex>
        {/* End Header */}

        <Flex w="full" flex={1} flexDirection="column" justifyContent="center"
          
        >
          <Text
            variant="with-lexend"
            fontSize="20px"
            fontWeight="400"
            mb="22px"
            as={m.p}
            variants={varFade({easeIn: 'linear', durationIn: 1}).in}
            initial="initial"
            animate="animate"
          >
            Play. Win. Earn.
          </Text>

          <Text
            variant="with-heading"    
            as={m.p}
            variants={varFade({easeIn: 'linear'}).inUp}
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
            variants={varScale({easeIn: 'linear'}).inY}
            initial="initial"
            animate="animate"      

          >
            Bringing the power back to the player
          </Text>

          <Box mt="84px" w="full" as={m.div} variants={varFade().inUp}
            initial="initial"
            animate="animate"
          >
            <Button variant="with-bg" mr="30px" my="5px">
              Sign Up
            </Button>
            <Button
              variant="with-bg"
              bg="bg.white"
              color="color.black"
              my="5px"
            >
              <Image src="/subtract.svg" mr="17px" />
              Demo
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
