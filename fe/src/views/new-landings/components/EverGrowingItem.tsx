import { Animate } from "@/components/animations";
import { TextVariants } from "@/themes/theme";
import { Flex, FlexProps, Image, Text } from "@chakra-ui/react";
import { m } from "framer-motion";
import React from "react";

interface IProps extends FlexProps {
  index?: number;
}
export default function EverGrowingItem({ index = 1, ...props }: IProps) {
  return (
    <Flex
      w="251px"
      h="352px"
      bgColor="rgba(255,255,255, 0.35)"
      borderRadius="8px"
      overflow="hidden"
      flexDirection="column"
      as={m.div}
      whileHover={Animate.whileHover}
      whileTap={Animate.whileTap}
      cursor="pointer"
      {...props}
    >
      <Image src={`./new-landings/evers/${index}.png`} h="277px" w="full" />
      <Flex
        h="55px"
        w="full"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        py="10px !important"
        mt="10px !important"
      >
        <Text variant={TextVariants.WITH_24} fontSize="32px">
          Feature
        </Text>
        <Text variant={TextVariants.WITH_18}>
          Lorem Ipsum is simply dummy text{" "}
        </Text>
      </Flex>
    </Flex>
  );
}
