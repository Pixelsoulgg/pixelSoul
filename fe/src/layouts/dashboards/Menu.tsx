import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Avatar,
  Button,
  Flex,
  FlexProps,
  HStack,
  Image,
  ImageProps,
  Spacer,
  Text,
  Tooltip,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { ImgHTMLAttributes, useRef } from "react";
import { useGlobal } from "../../contexts/Globals";
import { MENUS, SETTING_MENU } from "./constants";

interface IProps extends FlexProps {
  isExpand?: boolean;
}

export default function Menu({ isExpand, ...props }: IProps) {
  const {user} = useUser();
  const { onMenuChange, menuSelected } = useGlobal();

  return (
    <Flex w="full" flex={1} flexDirection="column" {...props}>
      <Flex w="full" flexDirection="column" flex={1}>
        {MENUS.map((menu) => (
          <Link href={menu.nav || "/"} key={menu.name}>
            <a href={menu.nav}>
              <Tooltip label={menu.name} direction="rtl" hasArrow>
                <HStack
                  cursor="pointer"
                  mx="15px"
                  my="5px"
                  padding={{ base: "8px 12px", lg: "8px 0px" }}
                  className={`menu-sidebar ${menuSelected === menu.name ? 'menu-sidebar-active' : ''}`}   
                  onClick={() => onMenuChange && onMenuChange(menu.name)}        
                  role="group"     
                  _hover={{bg: '#475467', borderRadius: "6px"}}
                >
                  <Flex id="initial" w="25px" h="25px" bgImage={`/nav/${menu.icon}.svg`} objectFit="contain" bgRepeat="no-repeat" mr="10px" />
                  <Flex id="onhover" w="25px" h="25px" bgImage={`/nav/${menu.icon}-hover.svg`} objectFit="contain" bgRepeat="no-repeat" mr="10px" />
                  {isExpand && (
                    <Text variant="with-title" fontSize="16px" ml="12px" color={menuSelected === menu.name ? 'white' : '#101828'}
                      _groupHover={{color: 'white'}}
                    >
                      {menu.name}
                    </Text>
                  )}
                </HStack>
              </Tooltip>
            </a>
          </Link>
        ))}
      </Flex>

      <Flex minH="100px" flexDirection="column">
        {SETTING_MENU.map((menu) => (
          <Link href={menu.nav || "/"} key={menu.name}>
            <a href={menu.nav}>
              <Tooltip label={menu.name} direction="rtl" hasArrow>
                <HStack
                  cursor="pointer"
                  mx="15px"
                  my="5px"
                  padding={{ base: "8px 12px", lg: "8px 0px" }}
                  className="menu-sidebar"
                >
                  <Flex id="initial" w="25px" h="25px" bgImage={`/nav/${menu.icon}.svg`} objectFit="contain" bgRepeat="no-repeat" mr="10px" />
                  <Flex id="onhover" w="25px" h="25px" bgImage={`/nav/${menu.icon}-hover.svg`} objectFit="contain" bgRepeat="no-repeat" mr="10px" />

                  {isExpand && (
                    <Text variant="with-title" fontSize="16px" ml="12px">
                      {menu.name}
                    </Text>
                  )}
                </HStack>
              </Tooltip>
            </a>
          </Link>
        ))}
      </Flex>

      <Flex minH="80px" mx="10px" borderTop="1px solid #EAECF0">
        <HStack w="full" >
          <Avatar name={user?.name || ''}  src={user?.picture || ''}  w="50px" />
          {isExpand && (
            <VStack justifyContent="center" alignItems="flex-start" py="24px">
              <Text variant="with-title" fontSize="14px" mb="-25px !important">
                {user?.name || ''}
              </Text>
            {user && user.email && <><Text
                variant="with-title"
                fontSize="14px"
                color="#475467"
                fontWeight="normal"
              >
                {user.email}
              </Text>
              </>}
            </VStack>
          )}
          <Spacer />
          {isExpand && (
            <Image src="/log-out.svg" w="20px" h="20px" cursor="pointer" />
          )}
        </HStack>
      </Flex>
    </Flex>
  );
}
