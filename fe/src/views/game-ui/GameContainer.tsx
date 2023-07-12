import { fonts } from "@/configs/constants";
import {
  Box,
  Flex,
  Image,
  SimpleGrid,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CharacterAttribute from "./components/CharacterAttribute";
import Attribute, { AttributeType } from "./components/Attribute";
import { m } from "framer-motion";
import { useWallet } from "@suiet/wallet-kit";
import { JsonRpcProvider, testnetConnection } from "@mysten/sui.js";
import { coinType, package_type } from "@/utils/suis";
import { ISuiNftItem } from "@/types/nft.type";
import { convertObjectToQueryString, getToast, showSortAddress } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { getSuiNFTAction } from "@/reduxs/suinft/sui.actions";
import { getBrawGameUrl } from "@/utils/env.helpers";
import { useRouter } from "next/router";

export default function GameContainer() {
  const toast = useToast();
  const {push}= useRouter();
  const [active, setActive] = useState<number>();
  const wallet = useWallet();
  const {nfts} = useAppSelector((p) => p.suinft);
  const dispatch = useAppDispatch();

  const handleFetchMyNFTs = useCallback(async () => {
    if (wallet && wallet.address) {
     dispatch(getSuiNFTAction(wallet.address));
    }
  }, [wallet?.address]);

  useEffect(() => {
    handleFetchMyNFTs();
  }, [handleFetchMyNFTs]);

 


  const emptyArray = useMemo(() => {
    if (nfts.length >= 12) return [];
    return new Array(12 - nfts.length).fill(0);
  }, [nfts]);

  const nft = useMemo(() => {
    if (active === undefined) return undefined;
    return nfts[active];
  }, [active]);

  const handlePlayGame = () => {
    if (!nft) {      
      toast(getToast('Please select character!'))
      return;
    }
    const character = {
      address: wallet.address,
      object_id: nft.objectId,
      name: nft.name,
      hat: nft.head,
      body: nft.body,
      leg: nft.leg
    }
   const qr = convertObjectToQueryString(character);
    push(`${getBrawGameUrl()}${qr}`);
  }

  return (
    <Flex w="96%" margin="0px auto" mt="27px">
      <Flex flex={1}>/game-ui/cancel-btn.svg
        <VStack alignItems="flex-start" spacing="30px">
          <Text
            fontFamily={fonts.Silkscreen}
            fontSize="36px"
            fontWeight="700"
            textTransform="uppercase"
            color="#1E0505"
          >
            Select Character
          </Text>
          <CharacterAttribute type={1} label={nft?.name ||'-- --'} />
          <CharacterAttribute type={2} label={`ID:${showSortAddress(nft?.objectId || '')}`} />
          <CharacterAttribute type={3} label={`Level ${nft?.level || '0'}`} />
          <Attribute type={AttributeType.attack} value={3} />
          <Attribute type={AttributeType.defense} value={5} />
          <Attribute type={AttributeType.blood} value={6} />
          <Attribute type={AttributeType.mana} value={9} />
        </VStack>
      </Flex>
      <Flex flexDirection="column" position="relative" pt="40px">
        <SimpleGrid columns={4} gap="40px">
          {nfts.map((item, index) => (
            <Box key={index}
              bgImage={active === index ? "/game-ui/game-characters/active.svg" : undefined }
              w="162px"
              h="162px"
              bgRepeat="no-repeat"
              bgSize="cover"
              boxShadow={active === index ? '0px 0px 50px 0px #0035F2': '' }
              onClick={() => setActive(index)}
              as={m.div}
              whileTap={{scale: 1.05}}
              whileInView={{scale: 1.05}}
              whileHover={{scale: 1.1}}
            >
              <Image
                src={`/game-ui/game-characters/new/${item.image}.svg`}
                w="162px"
                h="162px"
                cursor="pointer"
                transform={`scale(${active === index ? 0.9 : 1})`}
                fallbackSrc={`/game-ui/game-characters/new/0.svg`}
              />
            </Box>
          ))}

          {emptyArray.map((_, index) =>  <Box key={index}
              w="162px"
              h="162px"
              bgRepeat="no-repeat"
              bgSize="cover"
              as={m.div}
              whileTap={{scale: 1.05}}
              whileInView={{scale: 1.05}}
              whileHover={{scale: 1.1}}
            >
              <Image
                src={`/game-ui/game-characters/new/0.svg`}
                w="162px"
                h="162px"
                transform={`scale(${active === index ? 0.9 : 1})`}
                fallbackSrc={`/game-ui/game-characters/new/0.svg`}
              />
            </Box>)}
        </SimpleGrid>
        <Box
          position="absolute"
          h="10%"
          overflow="auto"
          margin="auto"
          top={0}
          left={"-40px"}
          bottom={0}
          right={0}
          cursor="pointer"
        >
          <Image src="/game-ui/arrow.svg" />
        </Box>

        <Box
          position="absolute"
          h="10%"
          overflow="auto"
          margin="auto"
          top={0}
          bottom={0}
          right="-40px"
          cursor="pointer"
        >
          <Image src="/game-ui/arrow.svg" transform={"rotate(180deg)"} />
        </Box>
        <Flex w="full" justifyContent="center" alignItems="center" pt="35px">
          <Box
            bgImage="/game-ui/play.svg"
            w="235px"
            h="71px"
            bgColor="transparent"
            cursor="pointer"
            as={m.div}
            whileTap={{scale: 0.95}}
            onClick={handlePlayGame}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
