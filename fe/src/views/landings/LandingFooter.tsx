import React, { useEffect } from "react";
import LandingContainer from "./components/LendingContainer";
import { Flex, SimpleGrid, Spacer, Text, VStack } from "@chakra-ui/react";
import PixelSouldLogo from "@/components/PixelSould";
import { fonts, footer_menu } from "@/configs/constants";
import { m, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AnimateVariants } from "@/components/animations";

export default function LandingFooter() {
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
      <LandingContainer
        mt={{ base: "150px", lg: "280px" }}
        mb="115px"
        contentStyle={{
          minH: { base: "50vh", "2xl": "294px" },
          bg: "rgba(255,255,255, 0.85)",
          borderRadius: "20px",
          // w: "1523px",
          p: "58px 50px",
          mx: { base: "10px", lg: "0px" },
        }}
      >
        <Flex
          w="full"
          h="full"
          flexDirection={{ base: "column-reverse", lg: "row" }}
        >
          <Flex flex={1} mt={{ base: "20px", lg: "0px" }}>
            <VStack w="full" alignItems={{ base: "center", lg: "flex-start" }}>
              <PixelSouldLogo isExpand w="296px" />
              <Spacer />
              <Text
                variant="with-24"
                fontSize={{ base: "20px", lg: "24px" }}
                color="#98A2B3"
                fontFamily={fonts.Silkscreen}
                textAlign="center"
              >
                Copyright © {new Date().getFullYear()}
              </Text>
            </VStack>
          </Flex>
          <Flex flex={1}>
            <SimpleGrid w="full" columns={{ base: 2, lg: 3 }} gap={10}>
              {footer_menu.map((menu) => (
                <VStack key={menu.title} alignItems="flex-start">
                  <Text variant="with-24" color="#98A2B3" mb="20px">
                    {menu.title}
                  </Text>
                  {menu.menus.map((sub) => (
                    <Text
                      variant="with-24"
                      key={sub.name}
                      fontSize="20px"
                      cursor="pointer"
                    >
                      {sub.name}
                    </Text>
                  ))}
                </VStack>
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
      </LandingContainer>
    </Flex>
  );
}
