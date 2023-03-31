import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { Empty } from "../../components";
import StatCard from "../../components/dashboards/StatCard";
import { useAppSelector } from "../../reduxs/hooks";
import {connectToWalletConnect, connectToMetamask} from '../../contracts/interfaces/EthersConnect';

export default function WalletContainer() {
  const { walletInfo } = useAppSelector((state) => state.account);
  console.log({walletInfo})
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
          value="999"
          percent={10}
          isUp
          comingSoon
        />
        <StatCard
          title="CollectorScore"
          value="999"
          percent={50}
          isUp={false}
        />
      </SimpleGrid>
      }
    </Flex>
  );
}
