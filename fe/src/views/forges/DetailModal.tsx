import Tag from "@/components/dashboards/Tag";
import { fonts } from "@/configs/constants";
import {
  Button,
  Flex,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

interface IProps extends Omit<ModalProps, "children"> {}

export default function DetailModal({...props}: IProps) {
  
  return (
    <Modal size="4xl" {...props}>
      <ModalOverlay />
      <ModalContent
        borderRadius="20px"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        p="20px"
        bg="#F2F4F7"
      >
        <ModalCloseButton />
        <ModalBody mt="20px">
          <Flex w="full" flexDirection="column">
            <HStack>
              <Text variant="with-title" fontSize="18px">
                Early Access to Samurai Warriors
              </Text>
              <Tag type="inprogress" label="Active" />
            </HStack>
            <Text variant="with-sub" fontSize="12px">
              2 days left
            </Text>
            <Flex w="full">
              <Flex flex={1}>
                <Image src="/forges/5.png" alt="forges detail" />
              </Flex>
              <Flex flex={2} flexDirection="column" pl="40px">
                <Table w="full" className="forge-table-detail">
                  <Tbody>
                    <Tr>
                      <Th>Creator Halogen Games</Th>
                      <Td>
                       {`Get early access to play Halogen's newest game Samurai
                        Warriors. Explore, build, forge alliances and take on
                        Samurai Warriors' greatest challenges.`}
                      </Td>
                    </Tr>
                    <Tr>
                      <Th>Requirements</Th>
                      <Td>
                        - Minimum Rank of 3 <br />- Minimum SoulScore of 350
                      </Td>
                    </Tr>
                    <Tr>
                      <Th>Rewards</Th>
                      <Td>- Samurai Warrior collectible - 1000 gold</Td>
                    </Tr>
                  </Tbody>
                </Table>
                <HStack w="full" mt="10px">
                  <Text
                    color="#B54708"
                    fontSize="14px"
                    fontWeight="500"
                    fontFamily={fonts.Inter}
                  >
                    Start Date
                  </Text>
                  <Spacer />
                  <Text
                    color="#B54708"
                    fontSize="14px"
                    fontWeight="500"
                    fontFamily={fonts.Inter}
                  >
                    End Date
                  </Text>
                </HStack>
                <HStack w="full" mt="8px">
                  <Text
                    color="#B54708"
                    fontSize="14px"
                    fontWeight="500"
                    fontFamily={fonts.Inter}
                  >
                    05/01/2023
                  </Text>
                  <Spacer />
                  <Text
                    color="#B54708"
                    fontSize="14px"
                    fontWeight="500"
                    fontFamily={fonts.Inter}
                  >
                    05/01/2023
                  </Text>
                </HStack>
                <HStack w="full" mt="18px">
                  <Image src="/like.svg" alt="gold" />
                  <Text variant="with-sub" color="#000000" fontWeight="500">
                    3.5k
                  </Text>
                  <Spacer />
                  <Button
                    bg="#7F56D9"
                    h="36px"
                    w="213px"
                    border="3px solid #7F56D9"
                    boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                    color="#fff"
                    borderRadius="8px"
                  >
                    Join
                  </Button>
                </HStack>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
