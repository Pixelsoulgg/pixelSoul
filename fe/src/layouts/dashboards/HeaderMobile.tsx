import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  FlexProps,
  HStack,
  Image,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Search from "../../components/Search";
import Menu from "./Menu";

interface IProps extends FlexProps {}

function HeaderMobile({ ...props }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  return (
    <Flex
      w="full"
      borderBottom="1px solid #EAECF0"
      h="64px"
      {...props}
      px="16px"
    >
      <HStack w="full">
        <Image src="/logo.svg" sizes="content" alt="pixelSoul" />
        <Spacer />
        <Button bg="transparent" onClick={onOpen}>
          <Image src="/menu.svg" sizes="content" alt="menu" />
        </Button>
      </HStack>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Search mt="50px" />
          <Menu isExpand mt="10px" />
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default HeaderMobile;
