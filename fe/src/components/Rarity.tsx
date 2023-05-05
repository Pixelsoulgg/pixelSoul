import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface IProps {
  type: "common" | "rare" | "super" | "ultra" | "ultimate" | "secret";
}

const RarityColor = {
  common: "#E4E7EC",
  rare: "#9EA5D1",
  super: "#FDDCAB",
  ultra: "#0BA5EC",
  ultimate: "#EE46BC",
  secret: "#6938EF",
};

export default function Rarity({ type }: IProps) {
  const color = ["ultra", "ultimate", "secret"].find((p) => p === type)
    ? "white"
    : "black";
  return (
    <Box bg={RarityColor[type]} p="5px 10px" borderRadius="6px" display="inline-block">
      <Text variant="with-18" textTransform="capitalize" color={color}>
        {type}
      </Text>
    </Box>
  );
}
