import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { Empty } from "../../components";
import StatCard from "../../components/dashboards/StatCard";
import { useAppSelector } from "../../reduxs/hooks";
import {connectToWalletConnect, connectToMetamask} from '../../contracts/interfaces/EthersConnect';
import { numberFormat } from "@/utils";

export default function WalletContainer() {
  const { walletInfo, score } = useAppSelector((state) => state.account);
  return (
    <Flex w="full" flexDir="column">
      {/* <Empty
        h="50px"
        imageStyle={{ w: "30px", h: "45px", mr: "7px" }}
        flexDirection="row"
        bg="transparent"
      /> */}
      {!walletInfo && (
        <Box
          cursor="pointer"
          bg="#DC6803"
          justifyContent="center"
          alignItems="center"
          display="flex"
          w="260px"
          h="44px"
          alignSelf="center"
          borderRadius="8px"
          px="16px"
          onClick={connectToMetamask}
        >
          <Text variant="with-title" fontSize="16px" color="white">
            Connect Wallet
          </Text>
        </Box>
      )}
      {walletInfo && 
      <SimpleGrid w="full" columns={{ base: 1, lg: 2 }} columnGap="24px">
        <StatCard
          title="InvestScore"
          value={numberFormat(score?.investorLevel || 0)}
          percent={0}
          isUp        
        />
        <StatCard
          title="CollectorScore"
          value={numberFormat(score?.collectorLevel || 0)}
          percent={0}
          isUp={false}
        />
      </SimpleGrid>
      }
    </Flex>
  );
}
