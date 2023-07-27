import { AnimateVariants } from "@/components/animations";
import { MAX_WIDTH } from "@/themes/config";
import { Flex, FlexProps } from "@chakra-ui/react";
import { m, motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface IProps extends FlexProps {
  contentStyle?: FlexProps;
  isDisableAnimation?: boolean;
  initial?: 'visible' | 'hidden'
}

export default function LandingContainer({
  contentStyle,
  children,
  isDisableAnimation = false,
  initial = 'hidden',
  ...props
}: IProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      if (!isDisableAnimation) controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <Flex
      w="full"
      flexDirection="column"
      alignItems="center"
      as={motion.div}
      ref={ref}
      animate={controls}
      initial={initial}
      variants={AnimateVariants}
      {...props}
    >
      <Flex w="full" maxW={`${MAX_WIDTH}px`} px={{base: "10px", lg: 0}} {...contentStyle}>
        {children}
      </Flex>
    </Flex>
  );
}
