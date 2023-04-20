import React from 'react'
import {Button, HStack, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, ModalProps, Text, useDisclosure} from '@chakra-ui/react'
import { ButtonVariants } from '@/themes/theme'

interface IProps extends Omit<ModalProps, "children"> {
  title: string;
  onOk?: () => void;
}

export default function ConfirmModal({title, onOk, onClose, ... props}: IProps) { 
  return (
    <Modal onClose={onClose} closeOnOverlayClick={false} isCentered {...props}>
    <ModalOverlay />
    <ModalContent borderRadius="10px">           
      <ModalBody padding="30px">
          <Text variant="with-24" textAlign="center">{title}</Text>
          <HStack w="full" justifyContent="center" mt="20px">
            <Button variant={ButtonVariants.WITH_DEFAULT} onClick={() => onOk && onOk()}>Ok</Button>
            <Button variant={ButtonVariants.WITH_HOVER} onClick={onClose}>Cancel</Button>
          </HStack>
      </ModalBody>     
    </ModalContent>
  </Modal>
  )
}
