import { Flex, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useWallet } from "@suiet/wallet-kit";
import StatCard from "../../components/dashboards/StatCard";
import { useAppSelector } from "../../reduxs/hooks";
import { numberFormat } from "@/utils";
import SuiWalletConnector from "./SuiWalletConnector";

export default function WalletContainer() {
  const { score } = useAppSelector((state) => state.account);
  const wallet = useWallet();

  return (
    <Flex w="full" flexDir="column" mt={{ base: "10px"}}>
      {!wallet.address && <SuiWalletConnector />}
      {wallet.address && (
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
      )}
    </Flex>
  );
}
