import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

interface IProps {
  type: "Common" | "Uncommon" | "Rare" | "Mythic" | "Lengendary";
}


export default function Rarity({ type }: IProps) {
  return (
    <Box display="inline-block">
     <Image src={`/rarities/${type}.svg`} alt={type} />
    </Box>
  );
}
