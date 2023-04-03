import {
  Flex,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { fonts } from "../configs/constants";
import { setActiveMenu } from "../reduxs/accounts/account.actions";
import { useAppDispatch, useAppSelector } from "../reduxs/hooks";
import React from 'react';

export default function Header() {
  const { walletInfo, selectedMenu } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const [isOpenMenu, setOpenMenu] = React.useState<boolean>(false);

  const handleNavigate = (name: string) => {
    dispatch(setActiveMenu(name));
  };

  return (
    <Flex
      w="full"
      minH="100px"
      alignItems="center"
      justifyContent="space-between"
      px="20px"
      borderBottom="1px solid #EAECF0"
      flexDirection={{base: 'column', lg: 'row'}}
      py="10px"
    >
      <Stack position="relative" onClick={() => setOpenMenu(!isOpenMenu)}>
        <Text
          fontFamily={fonts.Inter}
          fontSize={{ base: "12px", lg: "30px" }}
          lineHeight="38px"
          fontWeight="600"
          ml="10px"
          color="#000"
        >
          Welcome to PixelSoul, gamer69
        </Text>
      </Stack>
      <Spacer />
    </Flex>
  );
}
