import { HStack, Image, Text } from "@chakra-ui/react";
import React from "react";

interface IProps {
  isExpand?: boolean;
  w?: number | string;
}
export default function PixelSouldLogo({isExpand, w}: IProps) {
  return (
    <HStack>
      {isExpand && <Image src="/logo.svg" alt="PixelSoul" mr="10px" w={w} />  }
      {!isExpand && <Image src="/logo-only.svg" alt="PixelSoul" mr="10px" />  }

    </HStack>
  );
}
