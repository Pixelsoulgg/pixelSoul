import { ButtonVariants, TextVariants } from "@/themes/theme";
import {
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Modal,
  ModalProps,
  Text,
  Image,
  Button,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import CountdownTimer from "./CountDownTimer";
import { convertDateToUnix } from "@/utils";
import { Event } from "react-big-calendar";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface IProps extends Omit<ModalProps, "children"> {
  eventName: string;
  event?: Event;
  img?: string;
  onOk?: () => void;
  onEdit?: () => void;
}

export default function EventModal({
  eventName,
  img,
  event,
  onOk,
  onEdit,
  onClose,
  ...props
}: IProps) {
  return (
    <Modal
      onClose={onClose}
      closeOnOverlayClick={false}
      size="3xl"
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
          <Fragment>
            <Text variant={TextVariants.WITH_24} mt="30px">
              Event
            </Text>
            <Text
              variant="with-24"
              textAlign="center"
              fontSize="48px"
              color="#F9AF3C"
              mt="5px"
            >
              {eventName}
            </Text>
          </Fragment>

        <CountdownTimer targetDate={convertDateToUnix(event?.start)} />

          <Text
            variant={TextVariants.WITH_18}
            color="#000000"
            textAlign="center"
            mb="30px"
          >
            Do not miss this opportunity <br />
            Many attractive gifts are waiting for you!
          </Text>
          {/* @ts-ignore */}
          <Image src={event?.img || '/events/box.svg'} alignSelf="center" minH="300px" minW="300px" />

          <HStack mt="30px">
            <Button variant={ButtonVariants.WITH_ACTIVE} onClick={onEdit}>            
              <EditIcon mr="10px" />            
              Edit
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
