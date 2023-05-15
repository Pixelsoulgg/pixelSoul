import { StatCard } from '@/components/dashboards';
import Layout from '@/layouts';
import { numberFormat } from '@/utils';
import { ClaimedAndAvailableMysteryBox } from '@/views/soulDrops';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import React from 'react'


SoulDrop.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export default function SoulDrop() {
  return (
    <Flex w="full" flexDirection="column">
      <SimpleGrid w="full" columns={{base: 1, lg: 5}} columnGap="24px">
        <StatCard title="My Chests" value={numberFormat(10)} percent={0} disableUpDown isUp />
        <StatCard title="Mythic Chests" value={numberFormat(10)} percent={0} disableUpDown isUp />
        <StatCard title="Mythic Chests" value={numberFormat(10)} percent={0} disableUpDown isUp />
        <StatCard title="Legendary Chests" value={numberFormat(10)} percent={0} disableUpDown isUp />
        <StatCard title="Common Chests" value={numberFormat(10)} percent={0} disableUpDown isUp />
      </SimpleGrid>

      <ClaimedAndAvailableMysteryBox type="CLAIMED" />

      <ClaimedAndAvailableMysteryBox type="AVAILABLE" />
      
    </Flex>
  )
}
