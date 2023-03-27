import {
  Button,
  Flex,
  FlexProps,
  HStack,
  Image,
  Link,
  Spacer,
  Text,
  Tooltip,
  VStack,
  Icon,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { MENUS, SETTING_MENU } from "./constants";
interface IProps extends FlexProps {
  isExpand?: boolean;
}

export default function Menu({ isExpand, ...props }: IProps) {
  return (
    <Flex w="full" flex={1} flexDirection="column" {...props}>
      <Flex w="full" flexDirection="column" flex={1}>
        {MENUS.map((menu) => (
          <Link  href={menu.nav} key={menu.name} className="custom-link" >

            <Tooltip label={menu.name} direction="rtl" hasArrow>
              <HStack
                cursor="pointer"
                mx="15px"
                my="5px"
                padding={{ base: "8px 12px", lg: "8px 0px" }}
              >
                <Image src={`/nav/${menu.icon}`} boxSize='20px' />
                {isExpand && (
                  <Text variant="with-title" fontSize="16px" ml="12px">
                    {menu.name}
                  </Text>
                )}
              </HStack>
            </Tooltip>
          </Link>
        ))}
      </Flex>

      <Flex minH="100px" flexDirection="column">
        {SETTING_MENU.map((menu) => (
          <Link  href={menu.nav} key={menu.name}>
            <Tooltip label={menu.name} direction="rtl" hasArrow>
              <HStack
                cursor="pointer"
                mx="15px"
                my="5px"
                padding={{ base: "8px 12px", lg: "8px 0px" }}
              >
                <Image src={`/nav/${menu.icon}`} />
                {isExpand && (
                  <Text variant="with-title" fontSize="16px" ml="12px">
                    {menu.name}
                  </Text>
                )}
              </HStack>
            </Tooltip>
          </Link>
        ))}
      </Flex>

      <Flex minH="80px" mx="10px" borderTop="1px solid #EAECF0">
        <HStack w="full">
          <Image src="/avatar.svg" w="50px" />
          {isExpand && (
            <VStack justifyContent="center" alignItems="flex-start" py="24px">
              <Text variant="with-title" fontSize="14px" mb="-25px !important">
                Olivia Rhye
              </Text>
              <Text
                variant="with-title"
                fontSize="14px"
                color="#475467"
                fontWeight="normal"
              >
                olivia@untitledui.com
              </Text>
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
