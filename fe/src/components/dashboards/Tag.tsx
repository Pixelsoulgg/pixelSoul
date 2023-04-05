import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { fonts } from '../../configs/constants'

type IProps = {
  label: string;
  type: string;
  showDot?: boolean;
}

export default function Tag({label = 'Subscriptions', type = 'subscriptions', showDot}: IProps) {
  return (
    <Box display="inline-block" 
      bg={`bg.${type}`}
      borderRadius="16px"
      p="2px 8px"
    >
      <HStack>
        {(showDot) && <Box bg={`color.${type}`} w="8px" h="8px" borderRadius="full" />}
        <Text
          fontFamily={fonts.Inter}
          fontSize="12px"
          lineHeight="18px"
          textAlign="center"
          color={`color.${type}`}
        >{label}</Text> 
        </HStack>
    </Box>
  )
}
