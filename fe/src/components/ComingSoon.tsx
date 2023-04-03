import { Box, BoxProps, Text } from "@chakra-ui/react";
import React from "react";

interface IProps extends BoxProps {
  isSmall?: boolean;
}

export default function ComingSoon({isSmall, ...props}: IProps) {
  return (
    <Box
      flex={1}
      w="100%"
      h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Text
        color="rgba(0,0,0, 0.3)"
        textTransform="uppercase"
        fontSize={isSmall ? '10px' : "16px"}
        letterSpacing="5px"        
      >
        Coming Soon
      </Text>
    </Box>
  );
}
