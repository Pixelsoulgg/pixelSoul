import { TextVariants } from "@/themes/theme";
import { Box, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";

interface IProps {
  lable: string;
  showLogo?: boolean;
}

export default function MainButton({ lable, showLogo }: IProps) {
  return (
    <Box
      w="265px"
      h="94px"
      bgImage="/game-ui/btn-bg.svg"
      bgRepeat="no-repeat"
      bgSize="cover"
      alignItems="center"
      justifyContent="center"
      display="flex"
      flexDirection="row"
      cursor="pointer"
    >
      <HStack>
        {showLogo && <Image src="/game-ui/logo.svg" />}
        <Text variant={TextVariants.WITH_24} fontSize="32px" color="#1E0505">
          {lable}
        </Text>
      </HStack>
    </Box>
  );
}
