import { Button, Flex, Image, SimpleGrid, Spacer } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { NFTItem } from "@/views/profiles";

import Layout from "@/layouts";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { getNFTsAction } from "@/reduxs/souls/soul.slices";

Nfts.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export default function Nfts() {
  const dispatch = useAppDispatch();

  const { nfts } = useAppSelector((p) => p.soul);
  const { walletInfo } = useAppSelector((p) => p.account);

  useEffect(() => {
    if (!nfts) {
      if (walletInfo && walletInfo.address) {
        dispatch(getNFTsAction(walletInfo?.address));
      }
    }
  }, [dispatch, nfts, walletInfo]);

  return (
    <Flex flex={1} w="full" flexDirection="column">
      <Flex w="full" px="20px">
        <Spacer />
        <Button variant="active" w="160px">
          All
        </Button>
        <Button variant="normal" minW="40px" w="44px" mx="10px">
          <Image src="/arrow-pre.svg" alt="pre" />
        </Button>
        <Button variant="normal" minW="40px" w="44px">
          <Image src="/arrow-next.svg" alt="next" />
        </Button>
      </Flex>

      <SimpleGrid w="full" columns={{ base: 1, lg: 4 }} gap="30px" mt="20px">
        {nfts?.assets.map((item, index) => (
          <NFTItem key={index} item={item} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
