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
import React from "react";
import ComingSoon from "../../components/ComingSoon";
import { fonts } from "../../configs/constants";

export default function ProfileSection() {
  const [available, setAvailable] = React.useState<string>("STEAM_PROFILE");
  const [avatar, setAvatar] = React.useState<string>();

  return (
    <Flex
      flex={1}
      alignItems="flex-start"
      mr={{ base: "0px", lg: "32px" }}
      flexDirection="column"
      w="full"
    >
      <HStack w="full" pb="21px" borderBottom="1px solid #EAECF0" mb="10px">
        <VStack alignItems="flex-start">
          <Heading
            size="md"
            fontFamily={fonts.Inter}
            color="#101828"
            fontSize="18px"
            fontWeight="600"
            lineHeight="28px"
          >
            Create your Avatar
          </Heading>
          <Text
            color="#475467"
            fontSize="14px"
            fontWeight="400"
            fontFamily={fonts.Inter}
            mt="4px"
          >
            Your PixelSoul gaming identity.
          </Text>
        </VStack>
      </HStack>

      <Box
        bg="#EAECF0"
        w="348px"
        h="302px"
        borderRadius="24px"
        mt="32px"
        position="relative"
        justifyContent="center"
        alignItems="center"
        display="flex"
        overflow="hidden"
      >
        <Image
          src="/three-dot.svg"
          position="absolute"
          right="15px"
          top="16px"
        />

        <Image
          src={`/avatar/${avatar ? avatar : "avatar-default"}.svg`}
          objectFit={avatar ? "cover" : "none"}
          w="full"
        />
      </Box>

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
            fontSize="18px"
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
              fontSize="14px"
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
              fontSize="14px"
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
            onClick={() => setAvatar(`${index + 1}`)}
            cursor="pointer"
            as={motion.img}
            borderRadius="10px"
            objectFit="cover"
            whileHover={{boxShadow: "0px 4px 4px rgba(151, 71, 255, 0.35)",}}
            whileTap={{border: "2px solid #444CE7"}}
          />
        ))}
      </SimpleGrid>
      <Flex w="full" mt="15px" px="20px">
        <Spacer />
        <Button variant="normal">Cancel</Button>
        <Button variant="active" ml="10px">
          Ok
        </Button>
      </Flex>
    </Flex>
  );
}
