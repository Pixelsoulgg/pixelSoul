import {
  Box,
  Flex,
  Text,
  IconButton,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import Slider from "react-slick";
import React, { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { chooseGameId } from "@/reduxs/dungeons/dungeon.slices";
import { DungeonGameType } from "@/types/dungeon.types";
import CarouselLoading from "./CarouselLoading";


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
  const dispatch = useAppDispatch();
  const { games, gameType } = useAppSelector((p) => p.dungeon);
  const [slider, setSlider] = React.useState<Slider | null>(null);

  const handleChooseGame = useCallback((gameId: number) => {dispatch(chooseGameId(gameId))}, [])

  const gameList = useMemo(() => {
    if (gameType === DungeonGameType.Action)
      return games.filter(p => p.gameTypes.name === 'Action');
    if (gameType === DungeonGameType.Arena)
      return games.filter(p => p.gameTypes.name === 'Arena');

    return games;
  }, [gameType, games]);

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
        {gameList.length < 1 && new Array(8).fill(1).map((_, index) => <CarouselLoading key={index} />)}
        {gameList.map((game, index) => (
          <div style={{ width: "190px" }} key={`${index}`}>      
              <Text variant="with-18" fontSize="20px" textAlign="center" textTransform="uppercase">{game.name.substring(0, 15)}</Text>     
              <Flex
                w="full"
                bgImage={game.gameUrl || game.logo}
                objectFit="cover"
                margin="10px"
                h="115px"
                justifyContent="center"
                alignItems="center"
                borderRadius={10}
                cursor="pointer"
                onClick={() => handleChooseGame(game.appId)}
              />           
          </div>
        ))}
      </Slider>
    </Box>
  );
}
