import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { fonts } from "../../configs/constants";
import UserAvatar from "@/components/dashboards/UserAvatar";
import { updateUserAvatarAction } from "@/reduxs/auths/auth.slices";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import AccountInfo from "./AccountInfo";

export default function ProfileSection() {
  const dispatch = useAppDispatch();
  const {auth0Info} = useAppSelector((p) => p.auth);
  const [available, setAvailable] = React.useState<string>("STEAM_PROFILE");
  const [avatarChoose, setAvatarChoose] = useState<string>();

  const handleOnOk = useCallback(async() => {
    if (avatarChoose) {      
      await dispatch(updateUserAvatarAction(avatarChoose)).unwrap();
      setAvatarChoose(undefined);
    }
  }, [avatarChoose, dispatch]);

  return (
    <Flex
      flex={1}
      alignItems="flex-start"
      mr={{ base: "0px", lg: "32px" }}
      flexDirection="column"
      w="full"
    >
      <AccountInfo />

      <HStack w="full" pb="21px" borderBottom="1px solid #EAECF0" mb="10px" mt="30px">
        <VStack alignItems="flex-start">
          <Heading
            size="md"
            fontFamily={fonts.Inter}
            color="#101828"
            fontSize="24px"
            fontWeight="600"
            lineHeight="28px"
          >
            Create your Avatar
          </Heading>
          <Text
            color="#475467"
            fontSize="18px"
            fontWeight="400"
            fontFamily={fonts.Inter}
            mt="4px"
          >
            Your PixelSoul gaming identity.
          </Text>
        </VStack>
      </HStack>

      <UserAvatar avatar={avatarChoose || auth0Info?.imageUrl} />

      <HStack
        w="full"
        pb="21px"
        borderBottom="1px solid #EAECF0"
        mb="10px"
        mt="70px"
      >
        <VStack alignItems="flex-start" w="full">
          <Heading
            size="md"
            fontFamily={fonts.Inter}
            color="#101828"
            fontSize="24px"
            fontWeight="600"
            lineHeight="28px"
          >
            Select source
          </Heading>

          <Flex
            border="1px solid #D0D5DD"
            filter="drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05))"
            borderRadius="20px"
            overflow="hidden"
            w="full"
          >
            <Flex
              p="10px 16px"
              color="#1D2939"
              fontSize={{base: "16px", lg: "20px"}}
              fontFamily={fonts.Inter}
              fontWeight="600"
              cursor="pointer"
              onClick={() => setAvailable("STEAM_PROFILE")}
              flex={1}
              className={
                available === "STEAM_PROFILE" ? "tab-steam-active" : ""
              }
            >
              PixelSoul Profiles
            </Flex>
            <Flex
              flex={1}
              p="10px 16px"
              color="#1D2939"
              fontSize={{base: "16px", lg: "20px"}}
              fontFamily={fonts.Inter}
              fontWeight="600"
              cursor="pointer"
              bg={available === "Silver" ? "#F9FAFB" : ""}
              onClick={() => setAvailable("MY_NFTS")}
              className={available === "MY_NFTS" ? "tab-nft-active" : ""}
            >
              My NFT Collection
            </Flex>
          </Flex>
        </VStack>
      </HStack>

      <SimpleGrid
        columns={4}
        gap="10px"
        w="332px"
        h="250px"
        overflowY="scroll"
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
            whileHover={{ boxShadow: "0px 4px 4px rgba(151, 71, 255, 0.35)" }}
            whileTap={{ border: "2px solid #444CE7" }}
            alt="profile"
          />
        ))}
      </SimpleGrid>
      <Flex w="full" mt="15px" px="20px">
        <Spacer />
        <Button variant="normal" onClick={() => setAvatarChoose(undefined)}
          isDisabled={!avatarChoose}
        >
          Cancel
        </Button>
        <Button
          variant={`${avatarChoose ? "active" : "normal"}`}
          ml="10px"
          disabled={!avatarChoose}
          onClick={handleOnOk}
          isDisabled={!avatarChoose}
        >
          Ok
        </Button>
      </Flex>
    </Flex>
  );
}
