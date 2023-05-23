import {
  useAddEventMutation,
  useDeleteEventByIdMutation,
  useUpdateEventByIdMutation,
} from "@/services/modules/game.check.services";
import { ButtonVariants, TextVariants } from "@/themes/theme";
import { IEvent } from "@/types";
import { getToast } from "@/utils";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Modal,
  ModalProps,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  HStack,
  Spacer,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";

interface IValidate {
  isName: boolean;
  isDescription: boolean;
  isDate: boolean;
  isHasFile: boolean;
}

interface IModel {
  name: string;
  description: string;
  image?: File;
  imageName?: string;
  date: Date;
}

interface IProps extends Omit<ModalProps, "children"> {
  onOk?: () => void;
  event?: IEvent;
}

const initialState: IModel = {
  name: "",
  description: "",
  date: new Date(),
};

export default function AddEditEventModal({
  event,
  onOk,
  onClose,
  ...props
}: IProps) {
  const toast = useToast();

  const [addEvent, { isLoading: isAddEventLoading }] = useAddEventMutation();
  const [deleteEventAsync, deleteEventResult] = useDeleteEventByIdMutation();
  const [updateEventAsync, updateEventResult] = useUpdateEventByIdMutation();

  const [model, setModel] = useState<IModel>(initialState);
  const [fileSelected, setFile] = useState<File>();
  const [validate, setValidate] = useState<IValidate>();

  useEffect(() => {
    if (!event) {
      setModel(initialState);
    } else {
      console.log({ event });
      setModel({
        name: event.name,
        description: event.description,
        date: new Date(event.date),
        imageName: event.image,
      });
    }
  }, [event]);

  const handleClose = () => {
    setModel(initialState);
    onClose();
  };

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFile(file);
      setModel({ ...model, imageName: file.name });
    }
  };

  const validateData = () => {
    const isName = model.name === "";
    const isDescription = model.description === "";
    const isDate = model.date === undefined;
    const isHasFile = event ? event.image === '' : fileSelected === undefined;
    setValidate({ isName, isDescription, isDate, isHasFile });
    return !isName && !isDescription && !isDate && !isHasFile;
  };

  const handleSubmitForm = async () => {
    try {
      if (!validateData()) return;

      const formData = new FormData();
      formData.append("name", model.name);
      formData.append("description", model.description);
      if (fileSelected) {
        formData.append("image", fileSelected);
      }
      if (model.date) {
        formData.append("date", model.date.toISOString());
      }
      let message = "Create event successfully!";
      if (!event) {
        await addEvent(formData).unwrap();
      } else {
        await updateEventAsync({
          eventId: event.id.toString(),
          data: formData,
        }).unwrap();
        message = "Update event successfully!";
      }
      toast(getToast(message, "success", "success"));
      onClose();
      setModel(initialState);
    } catch (ex) {
      toast(getToast("something errors!"));
    }
  };

  const handleDeleteEvent = async () => {
    try {
      if (event) {
        await deleteEventAsync(event.id.toString()).unwrap();
        toast(
          getToast(
            `Delete event: ${event.name} success.`,
            "success",
            "successfully"
          )
        );
        onClose();
      }
    } catch (er) {
      toast(getToast("something errors!"));
    }
  };

  return (
    <Modal
      onClose={handleClose}
      closeOnOverlayClick={false}
      size="3xl"
      isCentered
      {...props}
    >
      <ModalOverlay />
      <ModalContent borderRadius="10px">
        <ModalCloseButton />
        <ModalBody
          padding="30px"
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Text variant={TextVariants.WITH_24} fontSize="40px" mb="30px">
            {`${event ? "EDIT" : "CREATE"} EVENT`}
          </Text>
          <FormControl isRequired isInvalid={validate?.isName}>
            <FormLabel>Event Name</FormLabel>
            <Input
              placeholder="Event name"
              value={model.name}
              onChange={(e) => {
                const name = e.target.value;
                setModel({ ...model, name });
              }}
            />
          </FormControl>
          <FormControl isRequired mt="20px" isInvalid={validate?.isDate}>
            <FormLabel>Start date</FormLabel>
            <DatePicker
              className="chakra-input css-1kp110w"
              selected={model.date}
              onChange={(date) => {
                if (date) {
                  setModel({ ...model, date });
                }
              }}
              showTimeSelect
              dateFormat="dd-MM-yyyy hh:mm aa"
            />
          </FormControl>
          <FormControl mt="20px" isInvalid={validate?.isDescription}>
            <FormLabel> Description</FormLabel>
            <Textarea
              placeholder="Event Description"
              value={model.description}
              onChange={(e) =>
                setModel({ ...model, description: e.target.value })
              }
            />
          </FormControl>
          <FormControl mt="20px" isInvalid={validate?.isHasFile}>
            <FormLabel> Event Image</FormLabel>
            <HStack position="relative" bg="white" w="full">
              <Input
                borderRadius="0px"
                placeholder={`select image`}
                value={model.imageName}
              />
              <Button
                position="absolute"
                right="0"
                borderRadius="0px"
                variant={ButtonVariants.WITH_ACTIVE}
              >
                Select Image
              </Button>
              <Input
                type="file"
                height="100%"
                width="100%"
                position="absolute"
                top="0"
                left="0"
                opacity="0"
                aria-hidden="true"
                accept="image/*"
                onChange={handleSelectFile}
              />
            </HStack>
          </FormControl>
          <HStack w="full" mt="20px">
            {event && (
              <Button
                variant={ButtonVariants.WITH_HOVER}
                minW="50px"
                title="Delete event"
                onClick={handleDeleteEvent}
                disabled={isAddEventLoading || updateEventResult.isLoading}
                isDisabled={isAddEventLoading || updateEventResult.isLoading}
              >
                {deleteEventResult.isLoading && <Spinner />}
                {!deleteEventResult.isLoading && <DeleteIcon />}
              </Button>
            )}
            <Spacer />
            <Button variant={ButtonVariants.WITH_DEFAULT} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant={ButtonVariants.WITH_HIGHLIGHT_BLUE_DARK}
              onClick={handleSubmitForm}
              disabled={isAddEventLoading || updateEventResult.isLoading}
              isDisabled={isAddEventLoading || updateEventResult.isLoading}
            >
              {(isAddEventLoading || updateEventResult.isLoading) && (
                <Spinner />
              )}
              {!isAddEventLoading && !updateEventResult.isLoading && (
                <Text variant={TextVariants.WITH_24} color="#fff">Ok</Text>
              )}
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
