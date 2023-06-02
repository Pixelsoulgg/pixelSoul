import React, { Fragment } from "react";
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  Image,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Text,
  ModalCloseButton,
  Spinner,
} from "@chakra-ui/react";
import { ButtonVariants } from "@/themes/theme";

interface IProps extends Omit<ModalProps, "children"> {
  title: string;
  subTitle: string;
  isLoading: boolean;
  isSuccess: boolean;
  img?: string;
  onOk?: () => void;
}

export default function OpenChestModal({
  title,
  subTitle,
  isLoading,
  isSuccess,
  img,
  onOk,
  onClose,
  ...props
}: IProps) {
  return (
    <Modal
      onClose={onClose}
      closeOnOverlayClick={false}
      size="lg"
      isCentered
      {...props}
    >
      <ModalOverlay />
      <ModalContent borderRadius="20px">
      <ModalCloseButton />
        <ModalBody
          padding="30px"
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
         {isSuccess &&  <Fragment>
          <Text
            variant="with-24"
            textAlign="center"
            fontSize="48px"
            color="#12B76A"
            mt="30px"
          >
            {title}
          </Text>
          <Text variant="with-24" textAlign="center" my="30px">
            {subTitle}
          </Text>
          </Fragment>
}
          <Image src={`/chests/${img || 'Mystery'}.svg`} alignSelf="center" />
          <HStack w="full" justifyContent="center" mt="30px">
            {/* <Button
              variant={isSuccess ? ButtonVariants.WITH_HIGHLIGHT_BLUE : ButtonVariants.WITH_DEFAULT}
              w={isSuccess ? 'full' : ''}
              isDisabled={isLoading}
              onClick={onClose}
            >
              Ok
            </Button> */}
            {!isSuccess && <Button
              variant={ButtonVariants.WITH_HIGHLIGHT_BLUE}
              isDisabled={isLoading}
              onClick={() => onOk && onOk()}
            >
              {isLoading && <Spinner />}
              {!isLoading && 'CLAIM NOW'} 
            </Button>}
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
