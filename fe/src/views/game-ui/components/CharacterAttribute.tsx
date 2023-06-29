import { fonts } from "@/configs/constants";
import { Flex } from "@chakra-ui/react";
import React from "react";

interface IProps {
  type: 1 | 2 | 3;
  label: string;
}

export default function CharacterAttribute({ type=1, label }: IProps) {
  return (
    <Flex
      bgImage={`/game-ui/btn/${type}.svg`}
      h="59px"
      w={`${type === 1 ? 334 : (type === 2 ? 275: 230)}px`}
      justifyContent="center"
      alignItems="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      fontFamily={fonts.Silkscreen}
      fontSize="24px"
      color="#1E0505"
    >
      {label}
    </Flex>
  );
}
