import { Flex, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import StatCard from "../../components/dashboards/StatCard";
import { useAppSelector } from "../../reduxs/hooks";
import { numberFormat } from "@/utils";
import ConnectMetaMask from "./ConnectMetaMask";

export default function WalletContainer() {
  const { score } = useAppSelector((state) => state.account);
  const { auth0Info } = useAppSelector((state) => state.auth);

  return (
    <Flex w="full" flexDir="column" mt={{ base: "10px"}}>
      {!auth0Info?.walletAddress && <ConnectMetaMask />}
      {auth0Info?.walletAddress && (
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
            ml={{ base: 0, lg: "24px" }}
          />
        </SimpleGrid>
      )}
    </Flex>
  );
}
