import { StatCard } from "@/components/dashboards";
import Layout from "@/layouts";
import { useAppSelector } from "@/reduxs/hooks";
import {
  useClaimMysteryChestMutation,
  useOpenChestMutation,
} from "@/services/modules/game.check.services";
import { getToast, numberFormat } from "@/utils";
import { AvailableMysteryChest, ClaimedContainer } from "@/views/soulDrops";
import OpenChestModal from "@/views/soulDrops/components/OpenChestModal";
import { Flex, SimpleGrid, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

SoulDrop.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

const Congratulations = "Congratulations";
const Great = "Great!";
const subTitle1 = "You have received a Diamond Chest";

export default function SoulDrop() {
  const toast = useToast();
  const { auth0Sub } = useAppSelector((p) => p.auth);
  const [title, setTitle] = useState<string>(Congratulations);
  const [subTitle, setSubTitle] = useState<string>(Congratulations);
  const [claimChest, claimChestResult] = useClaimMysteryChestMutation();
  const [openChest, { isLoading, isSuccess, data, error }] =
    useOpenChestMutation();

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    const handleClaimChest = async () => {
      try {
        if (auth0Sub) {
          await claimChest(auth0Sub).unwrap();          
        }
      } catch (er) {}
    };

    handleClaimChest();
  }, [auth0Sub]);

  const handleOpenChestModal = () => {
    setTitle(Congratulations);
    setSubTitle(subTitle1);
    onOpen();
  };

  const handleOpen = async () => {
    try {
      await openChest({ auth0Sub, type: 1, amount: 1 }).unwrap();
      setTitle(Great);
    } catch (ex) {
      if (!error) {
        //@ts-ignore
        toast(getToast(error?.data));
      }
    }
  };

  return (
    <Flex w="full" flexDirection="column">
      <SimpleGrid w="full" columns={{ base: 1, lg: 4 }} columnGap="24px">
        <StatCard
          title="My Chests"
          value={numberFormat(10)}
          percent={0}
          disableUpDown
          isUp
        />
        <StatCard
          title="Common Chests"
          value={numberFormat(10)}
          percent={0}
          disableUpDown
          isUp
        />
        <StatCard
          title="Mythic Chests"
          value={numberFormat(10)}
          percent={0}
          disableUpDown
          isUp
        />
        <StatCard
          title="Legendary Chests"
          value={numberFormat(10)}
          percent={0}
          disableUpDown
          isUp
        />
      </SimpleGrid>
      <ClaimedContainer onOpenChest={handleOpenChestModal} />
      <AvailableMysteryChest onOpenChest={handleOpenChestModal} />

      <OpenChestModal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        subTitle={!data ? subTitle : `You have received a ${data.reward} Chest`}
        onOk={handleOpen}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </Flex>
  );
}
