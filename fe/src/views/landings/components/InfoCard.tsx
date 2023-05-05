import { Flex, Text, Image, FlexProps, ImageProps } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { m, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AnimateVariants } from "@/components/animations";


interface IProps extends FlexProps {
  name: string;
  des: string;
  img: string;
  imgStyle?: ImageProps;
}

export default function InfoCard({
  name,
  des,
  img,
  imgStyle,
  ...props
}: IProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <Flex
      as={m.div}
      flexDirection="column"
      minW={{ base: "390px", lg: "481px" }}
      h="577px"
      bg="#fff"
      borderRadius="20px"
      justifyContent="center"
      alignItems="center"
      bgImage="/landings/bg.svg"
      bgRepeat="repeat-x"
      backgroundPosition="50px 20px"
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={AnimateVariants}
      {...props}
    >
      <Text variant="with-24" fontSize="40px">
        {name}
      </Text>
      <Text variant="with-24" mt="10px" textAlign="center">
        {des}
      </Text>
      <Image src={`/landings/${img}.png`} alt={des} mt="30px" {...imgStyle} />
    </Flex>
  );
}
