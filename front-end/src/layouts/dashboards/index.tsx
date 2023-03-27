import { Flex, Text,HStack,Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode, useMemo } from "react";
import Search from "../../components/Search";
import HeaderMobile from "./HeaderMobile";
import Sidebar from "./Sidebar";
import StatCard from "../../components/dashboards/StatCard";
import {
  fonts,
} from "../../configs/constants";
export interface IProps {
  children: ReactNode;
}
export default function DashboardLayout({ children }: IProps) {
  const router = useRouter();
  
  const isHideHeader = useMemo(() => {
    const { pathname } = router;
    const checkList = ["/games/detail"];
    if (checkList.findIndex((p) => p === pathname) > -1) return false;
    return true;
  }, [router]);

  return (
    <Flex
      w="100%"
      margin="0px auto"
      flexDirection={{ base: "column", lg: "row" }}
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Sidebar display={{ base: "none", lg: "flex" }} minH="110vh" />
      <HeaderMobile display={{ base: "flex", lg: "none" }} />
      <Flex
        flexDirection="column"
        w="100%"
        px={!isHideHeader ? "0px" : "20px"}
        py={!isHideHeader ? "0px" : "20px"}
        minH="100vh"
        justifyContent="flex-start"
        alignItems="center"
      >
        {isHideHeader && (
          <Flex
            w="full"
            justifyContent="space-between"
            alignContent="center"
            py="12px"
            borderBottom="1px solid #EAECF0"
            mb="32px"
          >
            <Text variant="with-title">Welcome to PixelSoul, gamer69</Text>
            <Flex
              bg="#fff"
              border="1px solid #EAECF0"
              padding="0px"
              margin="0px"
              maxHeight="45px"
              width="320px"
              paddingRight="100px"
              borderRadius="12px"
            >
               <HStack
                cursor="pointer"
                mx="15px"
                my="5px"
                padding={{ base: "8px 12px", lg: "8px 0px" }}
              >
                <Image src='./coin.svg' boxSize='20px' />
                  <Text line-height= "24px" fontFamily={fonts.Inter} variant="with-title" fontSize="16px" ml="12px" weight="400" color="#667085">
                    500 Gold
                  </Text>
               
              </HStack>

            </Flex>
            {/* <Search
              paddingY="0px"
              w="320px"
              display={{ base: "none", lg: "flex" }}
            /> */}
          </Flex>
        )}
        {children}
      </Flex>
    </Flex>
  );
}
