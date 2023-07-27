import { useAppDispatch } from "@/reduxs/hooks";
import { ButtonVariants, TextVariants } from "@/themes/theme";
import {
  Modal,
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  Text,
  Flex,
  Box,
  Image,
  HStack,
  Spacer,
  Button,
} from "@chakra-ui/react";
import React from "react";

interface IProps extends Omit<ModalProps, "children"> {}

export default function MintSoulTagSuccessModal({ onClose, ...props }: IProps) {
  const dispatch = useAppDispatch();

  return (
    <Modal isCentered size="xl" onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody
          p="30px 50px"
          bgColor="#fff"
          borderRadius="8px"
          w="full"
          maxW="628px"
        >
          <VStack w="full" minH="200px">
            <Text
              variant={TextVariants.WITH_18}
              fontSize="48px"
              color="#4691FF"
            >
              Congratulations!
            </Text>
            <Flex
              w="full"
              p="40px 60px"
              minH="379px"
              borderRadius="10px"
              bgColor="#DAF1FF"
              my="30px !important"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              position="relative"
            >
              <Box zIndex="1" w="244px" h="146px" bgImage="./badges/tag.svg" />
              <Box
                mt="-25px"
                w="full"
                maxW="399px"
                h="257.7px"
                bgImage="./badges/content.svg"
                bgSize="contain"
                bgRepeat="no-repeat"
              >
                <Flex
                  flex={1}
                  my="20px"
                  mx="8px"
                  justifyContent="space-between"
                >
                  <Flex w="full" flexDirection="column" justifyContent='space-around' alignItems='center'>
                      <Box w="105px" h="105px" bg="white" borderRadius="8px">
                        <Image src="./avatar/1.svg" w="full" />
                      </Box>
                      <Image src="./badges/code.svg" bgSize="cover" w="105px" mt="10px" />
                  </Flex>
                  <Flex
                    w="204px"
                    h="180px"
                    bg="#EAEBEE"
                    p="12px"
                    flexDirection="column"
                    position="relative"
                  >
                    <Flex bg="#28BC8C" w="201px" minH="27px !important" justifyContent="center" alignItems="center"
                      ml="-20px"
                    >
                      <Text variant={TextVariants.WITH_24} color="#fff">
                        DarkKnight
                      </Text>
                    </Flex>

                    <Text variant={TextVariants.WITH_24}>AnthonyRich</Text>
                    <Text
                      variant={TextVariants.WITH_14}
                      fontSize="16px"
                      color="#828282"
                      mt="0px"
                    >
                      Object ID
                    </Text>
                    <Text variant={TextVariants.WITH_18}>
                      0x847091203ie0912384e33
                    </Text>
                    <Image src="./badges/badge-log.svg"  />
                  </Flex>
                </Flex>
              </Box>
            </Flex>

            <HStack w="full">
            <HStack>
              <Text variant={TextVariants.WITH_24} fontSize="20px">Share with</Text>
              <Image src="./badges/twitter.svg" cursor='pointer' />
              <Image src="./badges/facebook.svg" cursor='pointer' />
            </HStack>
            <Spacer />
            <Button variant={ButtonVariants.WITH_HIGHLIGHT_BLUE}>Great!. Come back My Soul</Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
