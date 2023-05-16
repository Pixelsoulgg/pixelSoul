import { Animate } from "@/components/animations";
import { ButtonVariants } from "@/themes/theme";
import { formatDateYYYYMMDDHHMMSS } from "@/utils";
import { getSteamAuthUrl } from "@/utils/env.helpers";
import {
  Button,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

interface IProps {
  chestName: string;
  src?: string;
  text: string;
  isClaimed?: boolean;
  steamConnected?: boolean;
  claimDate?: Date;
  isDisable?: boolean;
  onOpenOrClaim?: () => void;
}

export default function ChestCard({
  chestName,
  src,
  text,
  isClaimed,
  steamConnected,
  claimDate,
  isDisable,
  onOpenOrClaim
}: IProps) {

  const handleClick = () => {
    if (!steamConnected && window) {
      window.location.href = getSteamAuthUrl() || '';
    } else if (onOpenOrClaim) {
      onOpenOrClaim()
    }
  }

  return (
    <Flex
      as={motion.div}
      whileHover={Animate.whileHover}
      bg="#F2F4F7"
      borderRadius="10px"
      minH="494px"
      flex={1}
      p="20px"
      flexDirection="column"
      mt="10px"
    >
      <Text variant="with-24">{chestName}</Text>
      <Flex
        w="full"
        borderRadius="20px"
        mt="20px"
        bg="#D0D5DD"
        minH="301px"
        border="2px solid #98A2B3"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={src} alt="chest" />
      </Flex>
      <HStack w="full" my="24px">
        <Text variant="with-18" color="#B54708">
          Claim Date
        </Text>
        <Spacer />
        <Text variant="with-18" color="#B54708">
         {formatDateYYYYMMDDHHMMSS(claimDate)}
        </Text>
      </HStack>

      <HStack w="full" mb="24px">
        <Image src="/like.svg" alt="like" w="34px" h="34px" />
        <Text variant="with-18" fontSize={{ base: "12px", lg: "18px" }}>
          {text}
        </Text>
        <Spacer />
        <Button
          variant={
            !steamConnected ? ButtonVariants.WITH_HIGHLIGHT_BLUE_DARK : (
              isClaimed ? ButtonVariants.WITH_DEFAULT : ButtonVariants.WITH_HIGHLIGHT_GREEN
            )
          }
          isDisabled={steamConnected && isDisable}
        onClick={handleClick}
        >
          {!steamConnected ? "Connect Steam" : (isClaimed ? "Open" : "Claim")}
        </Button>
      </HStack>
    </Flex>
  );
}
