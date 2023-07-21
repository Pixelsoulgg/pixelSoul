import { AnimateVariants } from "@/components/animations";
import { MAX_WIDTH } from "@/themes/config";
import { Flex, FlexProps } from "@chakra-ui/react";
import { m, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface IProps extends FlexProps {
  contentStyle?: FlexProps;
  isDisableAnimation?: boolean;
}

export default function LandingContainer({
  contentStyle,
  children,
  isDisableAnimation = false,
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
      as={m.div}
      ref={ref}
      animate={controls}
      initial={`${isDisableAnimation ? 'visible' : "hidden"}`}
      variants={AnimateVariants}
      {...props}
    >
      <Flex w="full" maxW={`${MAX_WIDTH}px`} {...contentStyle}>
        {children}
      </Flex>
    </Flex>
  );
}
