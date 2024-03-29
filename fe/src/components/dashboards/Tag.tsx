import { Box, BoxProps, Flex, FlexProps, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { fonts } from '../../configs/constants'

interface IProps extends BoxProps {
  label: string;
  type: string;
  showDot?: boolean;
  color?: string;
}

export default function Tag({label = 'Subscriptions', type = 'subscriptions', showDot, color, ...props}: IProps) {
  return (
    <Box display="inline-block" 
      bg={`bg.${type.toLowerCase()}`}
      borderRadius="16px"
      p="2px 8px"
      {...props}
    >
      <HStack>
        {(showDot) && <Box bg={`color.${type.toLowerCase()}`} w="8px" h="8px" borderRadius="full" />}
        <Text
          fontFamily={fonts.Inter}
          fontSize="12px"
          lineHeight="18px"
          textAlign="center"
          color={color || `color.${type.toLowerCase()}`}
        >{label}</Text> 
        </HStack>
    </Box>
  )
}
