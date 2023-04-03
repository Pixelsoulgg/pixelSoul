import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Img,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import BudgetCard from "../../components/games/BudgetCard";
import BundleCard from "../../components/games/BundleCard";
import ChallangesTable from "../../components/games/ChallangesTable";
import GameCard from "../../components/games/GameCard";
import GameTable from "../../components/games/GameTable";

export default function GameDetail() {
  const [tabActive, setTabActive] = useState<string>("SBT");

  return (
    <Flex flex={1} w="full" flexDirection="column" pb="50px">
      <Flex flexDirection="column" w="full">
        <Flex
          w="full"
          h={{ base: "150px", lg: "250px" }}
          bgImage="/header-bg.png"
          bgSize="cover"
          bgRepeat="no-repeat"
          padding="0px"
          margin="0px"
        ></Flex>
        <HStack w="full" mt="-30px" py="20px" px={{ base: "10px", lg: "32px" }}>
          <Box
            w={{ base: "110px", lg: "160px" }}
            position="relative"
            mt="-20px"
          >
            <Image src="/avatar.svg" />
            <Image
              src="/verified-tick.svg"
              position="absolute"
              bottom="30px"
              right={{ base: "0px", lg: "10px" }}
            />
          </Box>
          <VStack alignItems="flex-start">
            <Text variant="with-title" fontSize={{ base: "20px", lg: "30px" }}>
              Illuvium
            </Text>
            <Text
              variant="with-sub"
              fontSize={{ base: "12px", lg: "16px" }}
              mt={{ base: "-5px !important", lg: "0px !important" }}
            >
              Best omniverse around
            </Text>
          </VStack>

          <Spacer />
          <Button bg="#7F56D9" color="#fff">
            Follow
          </Button>
        </HStack>
      </Flex>
      <Flex w="full" flex={1} flexDirection="column" px="10px">
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 2, xl: 4 }}
          w="full"
          gap="5px"
        >
          <BudgetCard
            name="Your Illuvium Score"
            score={80}
            percent={80}
            flex={1}
            showIcon
          />
          <BudgetCard
            name="SBTs Collected"
            score={"10/30"}
            percent={70}
            flex={1}
          />
          <BudgetCard name="Leaderboard" score={12046} percent={20} flex={1} />
          <BudgetCard
            name="Your Illuvium Score"
            score={80}
            percent={40}
            bg="#FFFFFF !important"
            nameOnly
            border="1px solid #D0D5DD"
            boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
            w="70%"
          />
        </SimpleGrid>

        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 2, xl: 4 }}
          w="full"
          gap={{ lg: "24px" }}
        >
          <GameCard
            iconName="1"
            title="SBT Collectibles"
            subName="In-game"
            isActive={tabActive === "SBT"}
            onClick={() => setTabActive("SBT")}
          />
          <GameCard
            iconName="2"
            title="Challanges"
            subName="In-game"
            isActive={tabActive === "Challanges"}
            onClick={() => setTabActive("Challanges")}
          />
          <GameCard
            iconName="3"
            title="Bundles"
            subName="Holdings"
            isActive={tabActive === "Bundles"}
            onClick={() => setTabActive("Bundles")}


            
          />
          <GameCard
            iconName="4"
            title="Packages"
            subName="Catalog"
            isActive={tabActive === "Packages"}
            onClick={() => setTabActive("Packages")}
          />
        </SimpleGrid>
        <Flex w="full" flexDirection="column" mt="20px">
          {tabActive === "SBT" && (
            <Text
              variant="with-title"
              fontSize="18px"
              color="#101828"
              mb="10px"
            >
              Soulbound Collectibles
            </Text>
          )}
          <GameTable display={tabActive === "SBT" ? "flex" : "none"} />
          <ChallangesTable
            display={tabActive === "Challanges" ? "flex" : "none"}
          />
          <SimpleGrid columns={{base: 1, lg: 3}} gap="30px"
            display={tabActive === "Bundles" ? "grid" : "none"}
          >
              <BundleCard />
              <BundleCard />
              <BundleCard />
         </SimpleGrid>


         <SimpleGrid columns={{base: 1, lg: 3}} gap="30px"
            display={tabActive === "Packages" ? "grid" : "none"}
          >
              <BundleCard maxW="400px" />
         </SimpleGrid>
        </Flex>
      </Flex>
    </Flex>
  );
}
