import { fonts } from "@/configs/constants";
import {
  Box,
  Flex,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spacer,
  useDisclosure,
  Text,
  ModalProps,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

interface IProps extends Omit<ModalProps, "children">{}

export default function MinCharacterModal({onClose, ...props}: IProps) {

  return (
    <Modal size="3xl" onClose={onClose} {...props} >
      <ModalOverlay />
      <ModalContent
        h="675px"
        w="537px"
        bgImage="/game-ui/mint-nft-bg.svg"
        bgSize="contain"
        bgColor="transparent"
        bgRepeat="no-repeat"
      >
        <ModalBody
          flex={1}
          display="flex"
          flexDirection="column"
          position="relative"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box w="225px" h="50px" position="absolute" left="156px" top="15px">
            <Input
              flex={1}
              focusBorderColor="transparent"
              border="none"
              textAlign="center"
              placeholder="Name..."
              color="#000"
              _placeholder={{ color: "#000" }}
              fontFamily={fonts.VT323}
              fontSize="32px"
              marginTop="5px"
            />
          </Box>
          <Text color="transparent">1</Text>
          <Flex w="456px" h="456px" mt="47px" position="relative">
            <Image
              src="/game-ui/characters/1.gif"
              w="332px"
              top={0}
              bottom={0}
              margin="0px auto"
            />
            <Flex
              w="full"
              position="absolute"
              h="456px"
              flexDirection="column"
              justifyContent="space-around"
              px="20px"
            >
              <HStack>
                <Image src="/game-ui/arrow.svg" cursor="pointer"  />
                <Spacer />
                <Image src="/game-ui/arrow.svg" transform={"rotate(180deg)"} cursor="pointer" />
              </HStack>
              <HStack>
                <Image src="/game-ui/arrow.svg" cursor="pointer" />
                <Spacer />
                <Image src="/game-ui/arrow.svg" transform={"rotate(180deg)"} cursor="pointer" />
              </HStack>
               <HStack>
                <Image src="/game-ui/arrow.svg" cursor="pointer" />
                <Spacer />
                <Image src="/game-ui/arrow.svg" transform={"rotate(180deg)"} cursor="pointer" />
              </HStack>
            </Flex>
          </Flex>

          <HStack w="full" justifyContent="center" spacing="42px">
            <Image
              src="/game-ui/cancel-btn.svg"
              as={motion.img}
              whileTap={{ scale: 0.95 }}
              cursor="pointer"
              onClick={onClose}
            />
            <Image
              src="/game-ui/mint-btn.svg"
              as={motion.img}
              whileTap={{ scale: 0.95 }}
              cursor="pointer"
            />
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
