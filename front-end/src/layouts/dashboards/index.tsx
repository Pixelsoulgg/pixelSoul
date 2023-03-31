import { Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode, useMemo, useState } from "react";
import GoldButton from "../../components/dashboards/GoldButton";
import Search from "../../components/Search";
import HeaderMobile from "./HeaderMobile";
import Sidebar from "./Sidebar";

export interface IProps {
  children: ReactNode;
}
export default function DashboardLayout({ children }: IProps) {
  const router = useRouter();
  const { pathname } = router;

  const isHideBackAndSearch = useMemo(() => {
    const checkList = ["/"];
    if (checkList.findIndex((p) => p === pathname) > -1) return false;
    return true;
  }, [pathname]);

  const isHideHeader = useMemo(() => {
    const checkList = ["/games/detail"];
    if (checkList.findIndex((p) => p === pathname) > -1) return false;
    return true;
  }, [pathname]);

  const getTitle = useMemo(() => {
    switch (pathname) {
      case "/profiles/collectible":
        return "My Collectibles";
      case "/profiles/nfts":
        return "My NFT";
      case "/":
        return "Welcome to PixelSoul, gamer69";
      default:
        return "";
    }
  }, [pathname]);

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
            <HStack>
              {isHideBackAndSearch && (
                <Button bg="transparent" onClick={() => router?.back()}>
                  <Image src="/back.svg" />
                </Button>
              )}
              <Text variant="with-title">{getTitle}</Text>
            </HStack>
            {!isHideBackAndSearch && <GoldButton />}
            {isHideBackAndSearch && (
              <Search
                paddingY="0px"
                w="320px"
                display={{ base: "none", lg: "flex" }}
              />
            )}
          </Flex>
        )}
        {children}
      </Flex>
    </Flex>
  );
}
