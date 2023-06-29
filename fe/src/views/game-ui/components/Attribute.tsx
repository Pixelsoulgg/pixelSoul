import { HStack, StackProps, Image } from '@chakra-ui/react'
import React from 'react'

export enum AttributeType {
  attack,
  defense,
  blood,
  mana
}

interface IProps extends StackProps {
  type: AttributeType,
  value: number;
}

export default function Attribute({type, value, ...props}: IProps) {
  return (
    <HStack {...props}>
      <Image src={`/game-ui/attributes/${type}.svg`} alt="attribute" />
      <Image src={`/game-ui/attributes/progress/${value}.svg`} alt="value" />
    </HStack>
  )
}
