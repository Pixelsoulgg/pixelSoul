import { getCDNServer } from "@/utils/env.helpers";
import { Box, Image } from "@chakra-ui/react";
import React from "react";

interface IProps {
  avatar?: string;
  disableViewMore?: boolean;
}

export default function UserAvatar({
  avatar,
  disableViewMore = false,
}: IProps) {
  const avatarUrl =
    avatar && avatar.indexOf(getCDNServer()!) > -1
      ? avatar
      : `/avatar/${avatar ? avatar : "avatar-default"}.svg`;
  return (
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
      {!disableViewMore && (
        <Image
          src="/three-dot.svg"
          position="absolute"
          right="15px"
          top="16px"
          alt="view more"
        />
      )}
      <Image
        src={avatarUrl}
        objectFit={avatar ? "cover" : "none"}
        w="full"
        alt="avatar"
      />
    </Box>
  );
}
