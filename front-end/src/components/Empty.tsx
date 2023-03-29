import { Flex, FlexProps, Image, ImageProps, Text, TextProps } from "@chakra-ui/react";
import React from "react";
import { fonts } from "../configs/constants";

interface IProps extends FlexProps {
  imageStyle?: ImageProps;
 
}

function Empty({ imageStyle, ...props}: IProps) {
  return (
    <Flex
      w="full"
      bg="#F9FAFB"
      flexDirection="column"
      h="250px"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Image src="/empty.svg" alt="empty" w="76px" h="112px" {...imageStyle} />
      <Text
        fontFamily={fonts.Inter}
        fontWeight="600"
        color="#475467"
        fontSize="24px"
      >
        Data is Empty
      </Text>
    </Flex>
  );
}

export default Empty;
