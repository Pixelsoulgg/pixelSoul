import Layout from "@/layouts";
import { useAppDispatch } from "@/reduxs/hooks";
import { checkSoulTagAction } from "@/reduxs/suinft/sui.actions";
import GameContainer from "@/views/game-ui/GameContainer";
import Header from "@/views/game-ui/Header";
import LeaderBoard from "@/views/game-ui/LeaderBoard";
import { Flex } from "@chakra-ui/react";
import { useWallet } from "@suiet/wallet-kit";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";

Game.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="other">{page}</Layout>;
};

export default function Game() {
  const dispatch = useAppDispatch();
  const { address } = useWallet();
  const {push} = useRouter();

  const handleCheckMintedSoulTag = useCallback(async () => {
    if (address) {
      try {
        const rs = await dispatch(checkSoulTagAction(address)).unwrap();
        if (!rs) {
          push('/my-souls');
        }
      } catch (ex) {
        push('/my-souls');
      }
    }
  }, []);

  useEffect(() => {
    handleCheckMintedSoulTag();
  }, [handleCheckMintedSoulTag]);

  return (
    <Flex
      w="full"
      bgImage="/game-ui/bg.png"
      bgSize="cover"
      bgRepeat="no-repeat"
      alignItems="center"
    >
      <Flex
        minH="100vh"
        w="full"
        flexDirection="column"
        maxW="1400px"
        alignSelf="center"
        py="30px"
        margin="0px auto"
      >
        <Header />
        <GameContainer />
        <LeaderBoard />
      </Flex>
    </Flex>
  );
}
