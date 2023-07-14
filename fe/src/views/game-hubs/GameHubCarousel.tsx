import { Animate } from "@/components/animations";
import Tag from "@/components/dashboards/Tag";
import { GameHubs } from "@/configs/constants";
import { ButtonVariants, TextVariants } from "@/themes/theme";
import { Button, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";

export default function GameHubCarousel() {
  const {push} = useRouter();
  const [game, setGame] = React.useState<number>(5);

  

  return (
    <Flex
      w="full"
      minH="200px"
      flexDirection={{ base: "column", lg: "row" }}
      mb="50px"
    >
      <Flex
        flex={1}
        w="full"
        borderRadius="8px"
        bgImage="/game-hubs/brawll.png"
        bgSize="cover"
        bgRepeat="no-repeat"
        overflow="hidden"
        minH="120px"  
      >
        <Flex
          w="full"
          flex={1}
          bg="linear-gradient(90deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0) 100%)"
          flexDirection="column"
          p="25px"
          justifyContent="space-between"
        >
          <Tag label="Action" type="action" color="#fff" w="62px" />

          <VStack w="378px" alignItems="flex-start">
            <Image src="/game-hubs/logos/2.svg" />
            <Text variant={TextVariants.WITH_18} color="#fff" fontSize="20px">
              Movet nonumy est id, eos nonumy reprehendunt te, quo ei enim harum
              omittantur. Ei nam placerat percipit cotidieque, an eum tale
              antiopam. Eu pro illud ignota luptatum
            </Text>
            <Button variant={ButtonVariants.WITH_HIGHLIGHT_BLUE} mt="28px"
              onClick={() => push('/game')}
            >
              EXPLORE
            </Button>
          </VStack>
        </Flex>
      </Flex>

      <Flex
        w={{ base: `${GameHubs.length * 365}px`, lg: "363px" }}
        h={{ base: "120px", lg: "532px" }}
        overflowY={{ base: "hidden", lg: "scroll" }}
        borderRadius="8px"
        ml={{ base: "0px", lg: "20px" }}
        mt={{ base: "10px", lg: "0px" }}
        flexDirection={{ base: "row", lg: "column" }}
        pr="15px"
        overflowX="scroll"
      >
        {GameHubs.map((p) => (
          <HStack
            as={motion.div}
            w={{ base: "365px", lg: "full" }}
            border="1px solid #D0D5DD"
            borderRadius="8px"
            p="10px"
            mb="10px"
            key={p.id}
            whileHover={Animate.whileHover}
            cursor="pointer"
            bg={game === p.id ? "#D0D5DD" : "#fff"}
            onClick={() => setGame(p.id)}
            mr={{ base: "20px", lg: "0px" }}
          >
            <Image src={`/game-hubs/games/${p.id}.svg`} />
            <Text variant={TextVariants.WITH_24}>{p.name}</Text>
          </HStack>
        ))}
      </Flex>
    </Flex>
  );
}
