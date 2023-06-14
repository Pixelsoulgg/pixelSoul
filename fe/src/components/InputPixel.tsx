import { fonts } from "@/configs/constants";
import { Flex, FlexProps, Input, InputProps } from "@chakra-ui/react";
import React from "react";

interface IProps extends InputProps {
  icon?: React.ReactNode;
  wrapStyle?: FlexProps;
}

export default function InputPixel({ icon, wrapStyle, ...props }: IProps) {
  return (
    <Flex position="relative" alignItems="center" {...wrapStyle}>
      <Input
        flex={1}
        textAlign="center"
        bg="#FFFFFF"
        borderRadius="8px"
        color="#000000"
        fontFamily={fonts.VT323}
        fontWeight={400}
        fontSize={22}
        boxShadow="0px 12px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)"
        {...props}
      />
      {icon}
    </Flex>
  );
}
