import React from "react";
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Text,
} from "@chakra-ui/react";
import { ButtonVariants } from "@/themes/theme";

interface IProps extends Omit<ModalProps, "children"> {
  title?: string;
  description: string;
  type: "success" | "info";
  hideTitle?: boolean;
  onOk?: () => void;
}
export default function InfoModal({
  title,
  description,
  type,
  hideTitle,
  onOk,
  onClose,
  ...props
}: IProps) {
  return (
    <Modal onClose={onClose} closeOnOverlayClick={false} isCentered {...props}>
      <ModalOverlay />
      <ModalContent borderRadius="10px">
        <ModalBody padding="30px">
          {!hideTitle && (
            <Text variant="with-24" fontSize="32px" textAlign="center" color="color.success">
              {title}
            </Text>
          )}
          <Text variant="with-18" textAlign="center" my="20px">
            {description}
          </Text>
          <HStack w="full" justifyContent="center" mt="20px">
            <Button
              variant={
                type === "info"
                  ? ButtonVariants.WITH_HIGHLIGHT_BLUE
                  : ButtonVariants.WITH_HIGHLIGHT_GREEN
              }
              onClick={() => onOk && onOk()}
            >
              Ok
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
