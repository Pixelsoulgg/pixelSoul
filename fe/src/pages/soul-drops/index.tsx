import { StatCard } from "@/components/dashboards";
import Layout from "@/layouts";
import { useAppSelector } from "@/reduxs/hooks";
import {
  useClaimMysteryChestMutation,
  useGetAmountGroupByRarityQuery,
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
  const { auth0Sub, steamId } = useAppSelector((p) => p.auth);
  const [title, setTitle] = useState<string>(Congratulations);
  const [subTitle, setSubTitle] = useState<string>(Congratulations);
  const [claimChest, claimChestResult] = useClaimMysteryChestMutation();
  const [openChest, { isLoading, isSuccess: isOpenChestSuccess, data, error }] =
    useOpenChestMutation();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data: amountData, isFetching: isFetchingGetAmount } = useGetAmountGroupByRarityQuery(auth0Sub, {
    skip: !steamId || !auth0Sub,
  });


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
    setIsSuccess(false);
    onOpen();
  };

  const handleOpen = async () => {
    try {
      setIsSuccess(false);
      await openChest({ auth0Sub, type: 1, amount: 1 }).unwrap();
      setTitle(Great);
    } catch (ex) {
      if (!error) {
        //@ts-ignore
        toast(getToast(error?.data));
      }
    }
    setIsSuccess(isOpenChestSuccess);
  };

  return (
    <Flex w="full" flexDirection="column">
      <SimpleGrid w="full" columns={{ base: 2, lg: 6 }} columnGap="24px">
        {!isFetchingGetAmount && amountData && amountData?.map((p, index) => (
          <StatCard
            key={`${p.rarity}-${index}`}
            title={`${p.rarity} chest`}
            value={numberFormat(p.amount)}
            percent={0}
            disableUpDown
            isUp
            minW="190px"
            disableThreeDot
          />
        ))}

        {/* <StatCard
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
        /> */}
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
