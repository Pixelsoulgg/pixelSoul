import React, { useEffect } from "react";
import LendingContainer from "./components/LendingContainer";
import { Button, Flex, Text } from "@chakra-ui/react";
import { ButtonVariants } from "@/themes/theme";
import { fonts } from "@/configs/constants";
import { m, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AnimateVariants } from "@/components/animations";


interface IProps {
  onSignUp?: () => void;
}

export default function UnleashYourGaming({onSignUp}: IProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <Flex
      w="full"
      as={m.div}
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={AnimateVariants}
    >
      <LendingContainer
        w="full"
        contentStyle={{
          minH: "207px",
          // maxW: "1523px",
          bg: "white",
          borderRadius: "20px",
          justifyContent: "center",
          alignItems: "center",
          mx: { base: "10px", lg: "0px" },
        }}
      >
        <Text
          variant="with-24"
          fontSize={{ base: "30px", lg: "48px" }}
          mb="30px"
          bg="linear-gradient(180deg, #F7931E 0%, rgba(178, 30, 247, 0.88) 52.6%, #1EF7A9 100%);"
          backgroundClip="text"
          lineHeight={{ base: "40px", lg: "61px" }}
          fontFamily={fonts.Silkscreen}
          textAlign="center"
        >
          Unleash your gaming potential
        </Text>
        <Button variant={ButtonVariants.WITH_HIGHLIGHT_BLUE}
          onClick={onSignUp}
        >Sign up</Button>
      </LendingContainer>
    </Flex>
  );
}
