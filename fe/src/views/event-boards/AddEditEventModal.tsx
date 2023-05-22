import { useAddEventMutation } from "@/services/modules/game.check.services";
import { ButtonVariants, TextVariants } from "@/themes/theme";
import { getToast } from "@/utils";
import {
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Modal,
  ModalProps,
  Text,
  Image,
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
import React, { useCallback, useState } from "react";
import DatePicker from "react-datepicker";

interface IProps extends Omit<ModalProps, "children"> {
  onOk?: () => void;
}

interface IModel {
  name: string;
  description: string;
  image?: File;
  imageName?: string;
  date: Date;
}

const initialState: IModel = {
  name: "",
  description: "",
  date: new Date(),
};

export default function AddEditEventModal({ onOk, onClose, ...props }: IProps) {
  const toast = useToast();
  const [addEvent, {isLoading: isAddEventLoading}] = useAddEventMutation();
  const [model, setModel] = useState<IModel>(initialState);
  const [fileSelected, setFile] = useState<File>();

  const handleClose = () => {
    setModel(initialState);
    onClose();
  };

  const handleSelectFile = 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0];
        setFile(file);
        setModel({ ...model, imageName: file.name });
      }
    }

  const handleSubmitForm = async () => {
    try {
      const formData = new FormData();
      console.log({model})
      formData.append("name", model.name);
      formData.append("description", model.description);
      if (fileSelected) {
        formData.append("image", fileSelected);
      }
      if (model.date) {
        formData.append("date", model.date.toISOString());
      }
      await addEvent(formData).unwrap();
      toast(getToast('Create event successfully!', 'success', 'success'));
      onClose();
      setModel(initialState);
    } catch (ex) {
      toast(getToast('something errors!'));
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
            CREATE EVENT
          </Text>
          <FormControl isRequired>
            <FormLabel>Event Name</FormLabel>
            <Input
              placeholder="Event name"
              value={model.name}
              onChange={(e) => {
                const name = e.target.value;
                setModel({ ...model, name})
              }}
            />
          </FormControl>
          <FormControl isRequired mt="20px">
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
          <FormControl mt="20px">
            <FormLabel> Description</FormLabel>
            <Textarea
              placeholder="Event Description"
              value={model.description}
              onChange={(e) =>
                setModel({ ...model, description: e.target.value })
              }
            />
          </FormControl>
          <FormControl mt="20px">
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
                variant={ButtonVariants.WITH_HIGHLIGHT_BLUE}
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
            <Spacer />
            <Button variant={ButtonVariants.WITH_DEFAULT} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant={ButtonVariants.WITH_HIGHLIGHT_BLUE_DARK}
              onClick={handleSubmitForm}
              disabled={isAddEventLoading}
              isDisabled={isAddEventLoading}
            >
              {isAddEventLoading && <Spinner />}
              Ok
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
