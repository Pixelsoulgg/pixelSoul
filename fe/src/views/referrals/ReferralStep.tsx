import { TextVariants } from "@/themes/theme";
import { Flex, FlexProps, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ReCard } from "./components";
import { ReferralData } from "@/configs/constants";
import { useAppSelector } from "@/reduxs/hooks";

interface IProps extends FlexProps {}

export default function ReferralStep({ ...props }: IProps) {
  const {auth0Info} = useAppSelector(p => p.auth);
  const currentRef = auth0Info?.referralAmount || 0;
  return (
    <Flex
      w="full"
      bg="#E4E7EC"
      minH="369px"
      border="1px solid #667085"
      mt="30px"
      p="30px"
      borderRadius={8}
      justifyContent="center"
      {...props}
    >
      <Stack direction={{ base: "column", lg: "row" }} mt="53px">
        {ReferralData.map((item, index) => (
          <ReCard key={index} item={item} active={currentRef >= item.label} />
        ))}
      </Stack>
    </Flex>
  );
}
