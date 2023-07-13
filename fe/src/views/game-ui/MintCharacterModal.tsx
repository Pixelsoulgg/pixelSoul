import { character_nft_data, fonts } from "@/configs/constants";
import { useAppDispatch } from "@/reduxs/hooks";
import { getSuiNFTAction } from "@/reduxs/suinft/sui.actions";
import { getToast } from "@/utils";
import { coinType } from "@/utils/suis";
import {
  Box,
  Flex,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  ModalProps,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import { TransactionBlock } from "@mysten/sui.js";
import { useWallet } from "@suiet/wallet-kit";
import { motion } from "framer-motion";
import React, { useState } from "react";

interface IProps extends Omit<ModalProps, "children"> {}

const CHECK_NAME_OBJECT_ID='0x7a2982a80f5dd142267cf36c940e3c2cf337806462ccc7c3efdb37e120632827';

export default function MinCharacterModal({ onClose, ...props }: IProps) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const wallet = useWallet();
  const [nftName, setNftName] = useState<string>("");
  const [character, setCharacter] = useState<number>(1);

  const handleMintNFT = async () => {
    if (!nftName) {
      toast(getToast('Name is invalid!'))
      return;
    }
    if (!wallet.connected || !nftName) return;
    const tx = new TransactionBlock();
    //@ts-ignore
    const ob = character_nft_data[character];
    tx.moveCall({
      target: coinType,
      arguments: [
        tx.pure(nftName), // name
        tx.pure(`${ob[0]}`), //head
        tx.pure(ob[1]), //head
        tx.pure(ob[2]),
        tx.pure(`${character}`),
        tx.pure(CHECK_NAME_OBJECT_ID)
      ],
    });
    try {
      const resData = await wallet.signAndExecuteTransactionBlock({
        //@ts-ignore
        transactionBlock: tx,
      });
      if (wallet.address) {
        dispatch(getSuiNFTAction(wallet.address)).unwrap();
      }
      setNftName("");
      toast(getToast("nft minted successfully!", "success", "Mint NFT"));
      onClose();
    } catch (er) {
      toast(getToast("nft mint failed"));
      console.error("nft mint failed", er);
    }
  };
  return (
    <Modal size="3xl" onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent
        h="675px"
        w="537px"
        bgImage="/game-ui/mint-nft-bg.svg"
        bgSize="contain"
        bgColor="transparent"
        bgRepeat="no-repeat"
      >
        <ModalBody
          flex={1}
          display="flex"
          flexDirection="column"
          position="relative"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box w="225px" h="50px" position="absolute" left="156px" top="15px">
            <Input
              flex={1}
              focusBorderColor="transparent"
              border="none"
              textAlign="center"
              placeholder="Name..."
              color="#000"
              _placeholder={{ color: "#000" }}
              fontFamily={fonts.VT323}
              fontSize="32px"
              marginTop="5px"
              value={nftName}
              onChange={(e) => setNftName(e.target.value)}
            />
          </Box>
          <Text color="transparent">1</Text>
          <Flex w="456px" h="456px" mt="47px" position="relative">
            <Image
              src={`/game-ui/characters/${character}.png`}
              w="332px"
              top={0}
              bottom={0}
              margin="0px auto"
            />
            <Flex
              w="full"
              position="absolute"
              h="456px"
              flexDirection="column"
              justifyContent="space-around"
              px="20px"
            >
              <HStack>
                <Image
                  src={`/game-ui/${character > 1 ? "active-" : ""}arrow.svg`}
                  cursor="pointer"
                  onClick={() => {
                    if (character > 1) {
                      setCharacter((pre) => pre - 1);
                    }
                  }}
                />
                <Spacer />
                <Image
                  src={`/game-ui/${character < 5 ? "active-" : ""}arrow.svg`}
                  transform={"rotate(180deg)"}
                  cursor="pointer"
                  onClick={() => {
                    if (character < 5) {
                      setCharacter((pre) => pre + 1);
                    }
                  }}
                />
              </HStack>
            </Flex>
          </Flex>

          <HStack w="full" justifyContent="center" spacing="42px">
            <Image
              src="/game-ui/cancel-btn.svg"
              as={motion.img}
              whileTap={{ scale: 0.95 }}
              cursor="pointer"
              onClick={onClose}
            />
            <Image
              src="/game-ui/mint-btn.svg"
              as={motion.img}
              whileTap={{ scale: 0.95 }}
              cursor="pointer"
              onClick={handleMintNFT}
            />
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
