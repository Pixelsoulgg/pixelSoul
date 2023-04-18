import { Button, Flex, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { Animate } from "../../components/animations";
import { NFT } from "@/types/nft.type";
import Link from "next/link";

interface IProps {
  item: NFT;
}

export default function NFTItem({ item }: IProps) {
  return (
    <Flex
      flex={1}
      flexDir="column"
      as={motion.div}
      whileHover={Animate.whileHover}
      whileTap={Animate.whileTap}
      borderRadius="20px"
      padding="10px"
      cursor="pointer"
    >
      <Link href={item.permalink} target="_blank">
        <Flex
          bgImage={item.image_preview_url || item.image_thumbnail_url || '/placeholder.svg'}
          bgRepeat="no-repeat"
          h="402px"
          w="full"
          bgSize="cover"
          borderRadius="20px"
          padding="10px"
          flexDirection="column"          
        />

        <Text variant="with-title" fontSize="24px" mt="10px" color="#101828">
          {item.name}
        </Text>
      </Link>
      <Text variant="with-sub" fontSize="18px" mt="10px" color="#101828">
        ID: {item.id}
      </Text>
      <Text variant="with-sub" fontSize="18px" my="10px" color="#101828">
        Description
      </Text>
      <Text variant="with-sub" fontSize="18px" color="#101828">
        {item.description}
      </Text>

      <HStack w="full" mt="15px">
        <Image src="/gold.svg" mr="5px" alt="gold" />
        <Text
          variant="with-sub"
          fontSize="18px"
          my="10px"
          color="#000"
          fontWeight="500"
        >
          0 Gold
        </Text>
        <Spacer />
        <Button variant="normal" bg="bg.hover" w="118px" color="white" isDisabled>
          Sell
        </Button>
      </HStack>
    </Flex>
  );
}
