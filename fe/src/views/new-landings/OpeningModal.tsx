import {
  ModalOverlay,
  ModalContent,
  ModalBody,
  Modal,
  Image,
  HStack,
  ModalProps,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

interface IProps extends Omit<ModalProps, "children"> {}

export default function OpeningModal({onClose, ...props}: IProps) {
  return (
    <Modal size="3xl" onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent bg="transparent" shadow="none">
        <ModalBody
          p="20px"
          bgColor="transparent"
          borderRadius="8px"
          position="relative"
        >
          <Image
            src="./opening-close.png"
            position="absolute"
            top="50px"
            right="50px"
            cursor="pointer"
            onClick={onClose}
          />
          <Image src="./opening.png" />
          <HStack
            w="full"
            justifyContent="center"
            columnGap="10px"
            position="absolute"
            bottom="150px"
          >
            <Link href="/">
              <Image src="./socials/twitter.png" w="45px" h="45px" />
            </Link>
            <Link href="/">
              <Image src="./socials/discord.png" w="45px" h="45px" />
            </Link>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
