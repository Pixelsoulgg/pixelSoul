import {
  Box,
  Flex,
  Text,
  IconButton,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import Slider from "react-slick";
import React from "react";

const cards = [2,3,4,5,6,7];

const settings = {
  className: "slider-1 variable-width",
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  variableWidth: true,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
  ],
};

export default function DungeonCarousel() {
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  return (
    <Box position="relative" w="full" maxW="1300px" alignSelf="center">
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={{ base: "-15px", lg: "-50px" }}
        top="70px"
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <Image src="/expand-left.svg" />
      </IconButton>
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={{ base: "-15px", lg: "-50px" }}
        top="70px"
        transform={"translate(0%, -50%) rotate(180deg)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <Image src="/expand-left.svg" />
      </IconButton>

      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <div style={{ width: "190px" }} key={`${index}`}>
            <Flex
              w="full"
              bgImage={`/dungeons/${card}.png`}
              objectFit="cover"
              margin="10px"
              h="115px"
              justifyContent="center"
              alignItems="center"
              borderRadius={10}
              cursor="pointer"
              onClick={() => alert(index)}
            >
              <Text variant="with-24">{index}</Text>
            </Flex>
          </div>
        ))}
      </Slider>
    </Box>
  );
}
