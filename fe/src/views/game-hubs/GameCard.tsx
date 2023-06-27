import { Animate } from "@/components/animations";
import Tag from "@/components/dashboards/Tag";
import { TextVariants } from "@/themes/theme";
import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

interface IProps extends FlexProps {
  index: number;
  name: string;
}

export default function GameCard({ name, index }: IProps) {
  return (
    <Flex
      as={motion.div}
      h="385px"
      w="full"
      maxW="328px"
      bg="linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)"
      bgImage={`/game-hubs/${index + 1}.png`}
      bgRepeat="no-repeat"
      bgSize="cover"
      borderRadius="10px"
      flexDirection="column"
      p="15px"
      whileHover={Animate.whileHover}
      whileTap={Animate.whileTap}
    >
      <Tag label="Action" type="action" color="white" w="50px !important" />
      <Text variant={TextVariants.WITH_24} color="#fff" mt="5px">
       {name}
      </Text>
    </Flex>
  );
}
