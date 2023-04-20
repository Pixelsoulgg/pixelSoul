import { HStack, Image, Text } from "@chakra-ui/react";
import React from "react";

interface IProps {
  isExpand?: boolean;
}
export default function PixelSouldLogo({isExpand}: IProps) {
  return (
    <HStack>
      {isExpand && <Image src="/logo.svg" alt="PixelSoul" mr="10px" />  }
      {!isExpand && <Image src="/logo-only.svg" alt="PixelSoul" mr="10px" />  }

    </HStack>
  );
}
