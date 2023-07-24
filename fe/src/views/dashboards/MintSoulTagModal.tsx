import { UserAvatar } from "@/components/dashboards";
import { fonts } from "@/configs/constants";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { checkSoulTagAction } from "@/reduxs/suinft/sui.actions";
import { useUploadImageSoulTagMutation } from "@/services/modules/game.check.services";
import { ButtonVariants, TextVariants } from "@/themes/theme";
import { getToast, getURL } from "@/utils";
import { getCDNServer } from "@/utils/env.helpers";
import { soultag_package } from "@/utils/suis";
import {
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  VStack,
  Image,
  Text,
  useToast,
  Input,
  ModalProps,
} from "@chakra-ui/react";
import { TransactionBlock } from "@mysten/sui.js";
import { useWallet } from "@suiet/wallet-kit";
import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";

const SOULTAG_NAME = `0xcc1b068308e08e04983ad9c95847d824501b667769b4659ff7e7afbb3c5608a5`;

interface IProps extends Omit<ModalProps, "children"> {}

export default function MintSoulTagModal({ onClose, ...props }: IProps) {
  const dispatch = useAppDispatch();
  const [avatarChoose, setAvatarChoose] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [uploadImageSoulTag] = useUploadImageSoulTagMutation();

  const wallet = useWallet();
  const toast = useToast();

  const handleSelectFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const result = await uploadImageSoulTag(formData).unwrap();
      setAvatarChoose(`${getCDNServer()}${result.fileurl}`);
    }
  };

  const handleOnOk = async () => {
    if (!nickname) {
      toast(getToast("Nickname is invalid!"));
      return;
    }
    if (!wallet.connected) {
      toast(getToast("Please connect your Sui wallet first!"));
      return;
    }
    const pfp =
      avatarChoose.indexOf(getCDNServer()!) > -1
        ? avatarChoose
        : `${getURL("")}avatar/${avatarChoose}.svg`;

    const tx = new TransactionBlock();
    tx.moveCall({
      target: soultag_package,
      arguments: [
        tx.pure(nickname), // name
        tx.pure(pfp), // pfp
        tx.pure(SOULTAG_NAME),
      ],
    });

    try {
      const resData = await wallet.signAndExecuteTransactionBlock({
        //@ts-ignore
        transactionBlock: tx,
      });
      setNickname("");
      setAvatarChoose("");
      toast(getToast("Mint SoulTag success", "success", "Mint"));
      if (wallet.address) {
        dispatch(checkSoulTagAction(wallet.address));
      }
      onClose();
    } catch (ex) {
      toast(getToast("nft mint failed"));
    }
  };

  return (
    <Modal size="3xl" onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p="20px" bgColor="#F2F4F7" borderRadius="8px">
          <Flex
            w="full"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text variant={TextVariants.WITH_TITLE} fontSize="32px">
              Mint SoulTag
            </Text>
            <Text
              variant={TextVariants.WITH_18}
              fontSize="16px"
              textAlign="center"
              maxW="500px"
              mt="10px"
            >
              Everybody starts somewhere. Let's get your Forge of Legends
              journey started! First we need to mint your PixelSoul GamerTag
            </Text>
          </Flex>
          <VStack w="full" alignItems="flex-start" mt="30px">
            <Text variant={TextVariants.WITH_24} fontSize="22px">
              Create your Nickname
            </Text>
            <Text variant={TextVariants.WITH_18} fontSize="16px">
              Your PixelSoul gaming identity
            </Text>
            <Input
              w="full"
              placeholder="#Nickname"
              fontSize="18px"
              _placeholder={{ color: "#98A2B3" }}
              fontFamily={fonts.VT323}
              mt="20px !important"
              bgColor="white"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </VStack>

          <HStack>
            <Flex flexDirection="column">
              <Text variant={TextVariants.WITH_24} fontSize="22px">
                Create your Profile picture
              </Text>
              <Text variant={TextVariants.WITH_18} fontSize="16px">
                Your PixelSoul gaming identity
              </Text>
              <UserAvatar avatar={avatarChoose} />
            </Flex>
            <Flex flexDirection="column">
              <HStack
                w="full"
                pb="21px"
                borderBottom="1px solid #EAECF0"
                mb="10px"
                mt="30px"
              >
                <VStack alignItems="flex-start" w="full">
                  <Flex
                    border="1px solid #D0D5DD"
                    filter="drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05))"
                    borderRadius="20px"
                    overflow="hidden"
                    w="full"
                    h="40px"
                  >
                    <Flex
                      p="10px 16px"
                      color="#1D2939"
                      fontSize={{ base: "16px", lg: "20px" }}
                      fontFamily={fonts.Inter}
                      fontWeight="600"
                      cursor="pointer"
                      flex={1}
                      justifyContent="center"
                      alignItems="center"
                      className={"tab-steam-active"}
                    >
                      Select Source
                    </Flex>
                    <Flex
                      flex={1.5}
                      p="10px 16px"
                      color="#1D2939"
                      fontSize={{ base: "16px", lg: "20px" }}
                      fontFamily={fonts.Inter}
                      fontWeight="600"
                      justifyContent="center"
                      alignItems="center"
                      position="relative"
                      cursor="pointer"
                    >
                      Upload Your picture
                      <Input
                        type="file"
                        height="100%"
                        width="100%"
                        position="absolute"
                        top="0"
                        left="0"
                        opacity="0"
                        aria-hidden="true"
                        accept="image/*"
                        onChange={handleSelectFile}
                        cursor="pointer"
                      />
                    </Flex>
                  </Flex>
                </VStack>
              </HStack>
              <SimpleGrid
                columns={4}
                gap="10px"
                w="332px"
                h="350px"
                overflowY="auto"
                id="style-1"
                p="10px"
              >
                {new Array(16).fill(1).map((_, index) => (
                  <Image
                    src={`/avatar/${index + 1}.svg`}
                    key={index.toString()}
                    onClick={() => {
                      setAvatarChoose(`${index + 1}`);
                    }}
                    cursor="pointer"
                    as={motion.img}
                    borderRadius="10px"
                    objectFit="cover"
                    whileHover={{
                      boxShadow: "0px 4px 4px rgba(151, 71, 255, 0.35)",
                    }}
                    whileTap={{ border: "2px solid #444CE7" }}
                    alt="profile"
                  />
                ))}
              </SimpleGrid>
            </Flex>
          </HStack>
          <Flex w="full" mt="15px" px="20px">
            <Button
              variant={`${
                avatarChoose ? ButtonVariants.WITH_HIGHLIGHT_BLUE : "normal"
              }`}
              ml="10px"
              disabled={!avatarChoose}
              onClick={handleOnOk}
              isDisabled={!avatarChoose}
              w="full"
            >
              Mint
            </Button>
            <Flex w="25px" />
            <Button
              variant="normal"
              onClick={() => {
                setAvatarChoose("");
                onClose();
              }}
              w="full"
            >
              Cancel
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
