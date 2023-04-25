import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

export default function CarouselLoading() {
  return (
    <div style={{ width: "190px" }}>
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </div>
  );
}
