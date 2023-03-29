import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useMemo } from "react";
import { getProfile } from "../apis";
import ComingSoon from "../components/ComingSoon";
import NFTTable from "../components/dashboards/NFTTable";
import StatCard from "../components/dashboards/StatCard";
import {
  Bundles_And_Packages,
  fonts,
  NFTsData,
  SBTs_And_Collectibles,
} from "../configs/constants";
import { INftDashboardItem } from "../types";
import DataEmpty from "../components/DataEmpty";
import { LIST_AVATAR } from "../layouts/dashboards/constants";
import TopPlayerCard from "../components/dashboards/TopPlayerCard";

const Home: NextPage = () => {
  const [available, setAvailable] = React.useState<string>("Bronxe");
  const [avatarPathCurrent, setAvatarPathCurrent] =
    React.useState<string>("profile_14");
  const [avatarPath, setAvatarPath] = React.useState<string>(avatarPathCurrent);
  const [messageButton, setMessageButton] = React.useState<string>("OK");
  const [isConnectedSteam, setConnectedSteam] = React.useState<boolean>(false);
  const [isConnectedWallet, setConnectedWallet] =
    React.useState<boolean>(false);
  const [profile, setProfile] = React.useState<any>();

  const fetchData = useCallback(async () => {
    const profile = await getProfile();
    setProfile(profile);
  }, []);

  const nftsDatasource = useMemo(() => {
    if (!profile) return [];
    const { nfts } = profile.nftHolding;
    return nfts.map((nft: any) => {
      const item: INftDashboardItem = {
        img: "file.svg",
        name: nft.slug,
        kb: 0,
        amount: Number(nft.amount),
        floorPrice: Number(nft.floorPriceETH).toFixed(5),
        type: "UnCategorized",
      };
      return item;
    });
  }, [profile]);

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>PixelSoul - Dashboard</title>
      </Head>

      <Flex flex={1} w="full" flexDirection={{ base: "column", lg: "row" }}>
        <Flex
          flex={1}
          alignItems="flex-start"
          mr={{ base: "0px", lg: "32px" }}
          flexDirection="column"
        >
          <HStack w="full" pb="21px" borderBottom="1px solid #EAECF0" mb="10px">
            <VStack alignItems="flex-start">
              <Heading
                size="md"
                fontFamily={fonts.Inter}
                color="#101828"
                fontSize="18px"
                fontWeight="600"
                lineHeight="28px"
              >
                Create your Avatar
              </Heading>
              <Text
                color="#475467"
                fontSize="14px"
                fontWeight="400"
                fontFamily={fonts.Inter}
                mt="4px"
              >
                Manage and track your card spending.
              </Text>
            </VStack>
          </HStack>

          <Box
            bg={`url('/profile/${avatarPath}.svg')`}
            // bg={`url('/${avatarPath}.png')`}
            // bg="#EAECF0"
            w="348px"
            h="302px"
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            borderRadius="24px"
            mt="32px"
            position="relative"
          >
            <Image
              color="#fff"
              src="./three-dot.svg"
              position="absolute"
              right="15px"
              top="16px"
            />
            {/* <Image  src="./three-dot.svg"/> */}
            {/* <ComingSoon /> */}
          </Box>

          <HStack
            w="100%"
            pb="21px"
            borderBottom="1px solid #EAECF0"
            mb="10px"
            mt="70px"
          >
            <VStack alignItems="flex-start">
              <Heading
                size="md"
                fontFamily={fonts.Inter}
                color="#101828"
                fontSize="18px"
                fontWeight="600"
                lineHeight="28px"
              >
                Select source
              </Heading>

              <Flex
                // border="1px solid  #D0D5DD"
                filter="drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05))"
                borderRadius="8px"
                // overflow="hidden"
              >
                <Box
                  p="10px 16px"
                  borderTopLeftRadius="8px"
                  borderBottomLeftRadius="8px"
                  border={
                    available === "Bronxe"
                      ? "2px solid #6938EF"
                      : "1px solid  #D0D5DD"
                  }
                  boxShadow={
                    available === "Bronxe"
                      ? "0px 4px 4px rgba(151, 71, 255, 0.35)"
                      : ""
                  }
                  _hover={
                    available != "Bronxe" ? { border: "1px solid #444CE7" } : {}
                  }
                  //boxShadow="11111110px 400px 4px rgba(151, 71, 255, 0.35)"
                  color="#1D2939"
                  fontSize="14px"
                  fontFamily={fonts.Inter}
                  fontWeight="600"
                  // bg={available === "Bronxe" ? "#F9FAFB" : ""}
                  cursor="pointer"
                  onClick={() => setAvailable("Bronxe")}
                >
                  Steam Profile Image
                </Box>
                {/* <Box
                  p="10px 16px"
                  color="#1D2939"
                  fontSize="14px"
                  fontFamily={fonts.Inter}
                  fontWeight="600"
                  borderLeft="1px solid #D0D5DD"
                  borderRight="1px solid #D0D5DD"
                  cursor="pointer"
                  bg={available === "Silver" ? "#F9FAFB" : ""}
                  onClick={() => setAvailable("Silver")}
                >
                  Silver
                </Box> */}
                <Box
                  borderTopRightRadius="8px"
                  borderBottomRightRadius="8px"
                  boxShadow={
                    available === "Gold"
                      ? "0px 4px 4px rgba(151, 71, 255, 0.35)"
                      : ""
                  }
                  border={
                    available === "Gold"
                      ? "2px solid #6938EF"
                      : "1px solid  #D0D5DD"
                  }
                  _hover={
                    available != "Gold" ? { border: "1px solid #444CE7" } : {}
                  }
                  p="10px 16px"
                  color="#1D2939"
                  fontSize="14px"
                  fontFamily={fonts.Inter}
                  fontWeight="600"
                  cursor="pointer"
                  // bg={available === "Gold" ? "#F9FAFB" : ""}
                  onClick={() => setAvailable("Gold")}
                >
                  Steam Profile Image
                </Box>
              </Flex>
            </VStack>
          </HStack>

          {available === "Bronxe" && (
            <Box>
              <div
                style={{
                  overflow: "auto",
                  height: "300px",
                  width: "100%",
                  padding: "20px",
                }}
              >
                <SimpleGrid columns={4} columnGap="20px" spacing={4}>
                  {LIST_AVATAR.map((avatar) => (
                    <Box
                      // margin="6px"
                      w="70px"
                    >
                      <Image
                        width="100%"
                        height="100%"
                        // sx={{
                        //   boxShadow: avatarPath === avatar ? "0px 4px 8px rgba(164, 59, 246, 0.35),0 0 0 6px #6938EF" : "none",
                        // }}
                        border={
                          avatarPath === avatar
                            ? "4px solid #6938EF"
                            : "4px solid transparent"
                        }
                        boxShadow={
                          avatarPath === avatar
                            ? "0px 4px 8px rgba(164, 59, 246, 0.35)"
                            : ""
                        }
                        borderRadius="12px"
                        //
                        src={`profile/${avatar}.svg`}
                        onClick={() => {
                          setAvatarPath(avatar);
                        }}
                      />
                    </Box>
                  ))}
                </SimpleGrid>
              </div>

              <Flex alignItems="center" marginTop="20px">
                {/* Other flex items */}
                <Spacer />

                <Button
                  minW="90px"
                  _hover={{ border: "1px solid #444CE7" }}
                  mr="20px"
                  borderRadius="8px"
                  padding="10px 16px"
                  border="1px solid #D0D5DD"
                  sx={
                    messageButton === "Cancle"
                      ? {
                          outline: "none",
                          "&:focus": {
                            boxShadow: "0px 4px 4px rgba(151, 71, 255, 0.35)",
                            border: "2px solid #444CE7",
                          },
                        }
                      : {}
                  }
                  bg="#fff"
                  boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                  w="fit-content"
                  cursor="pointer"
                  // _active={messageButton === "Cancle" ?{ border:"2px solid #444CE7", bg:"red.500" }:{}}
                  onClick={() => {
                    setMessageButton("Cancle");
                    setAvatarPath(avatarPathCurrent);
                    setAvailable("");
                  }}
                  // activeStyle={{ border:"10px solid #D0D5DD"}}
                >
                  <Text
                    color="#344054"
                    fontSize="14px"
                    fontWeight="600"
                    fontFamily={fonts.Inter}
                  >
                    Cancle
                  </Text>
                </Button>
                <Button
                  minW="90px"
                  _hover={{ border: "1px solid #444CE7" }}
                  borderRadius="8px"
                  padding="10px 16px"
                  border="1px solid #D0D5DD"
                  sx={
                    messageButton === "OK"
                      ? {
                          outline: "none",
                          "&:focus": {
                            boxShadow: "0px 4px 4px rgba(151, 71, 255, 0.35)",
                            border: "2px solid #444CE7",
                          },
                        }
                      : {}
                  }
                  bg="#fff"
                  boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                  w="fit-content"
                  cursor="pointer"
                  onClick={() => {
                    setMessageButton("OK");
                    setAvatarPathCurrent(avatarPath);
                    setAvailable("");
                  }}
                >
                  <Text
                    color="#344054"
                    fontSize="14px"
                    fontWeight="600"
                    fontFamily={fonts.Inter}
                  >
                    OK
                  </Text>
                </Button>
              </Flex>
            </Box>
          )}
        </Flex>
        <Flex
          flex={{ base: 1, lg: 4 }}
          w="full"
          flexDirection="column"
          borderLeft={{ base: "none", lg: "1px solid #EAECF0" }}
          pl={{ base: "0px", lg: "32px" }}
        >
          <Flex w="full" flexDir="column">
            <HStack
              w="full"
              pb="21px"
              borderBottom="1px solid #EAECF0"
              mb="10px"
              mt={{ base: "70px", lg: "0px" }}
            >
              <VStack alignItems="flex-start">
                <Heading
                  size="md"
                  fontFamily={fonts.Inter}
                  color="#101828"
                  fontSize="18px"
                  fontWeight="600"
                  lineHeight="28px"
                >
                  Stats
                </Heading>
                <Text
                  color="#475467"
                  fontSize="14px"
                  fontWeight="400"
                  fontFamily={fonts.Inter}
                  mt="4px"
                >
                  The higher your SoulScore the more valuable you are to Games
                  as a player.{" "}
                </Text>
              </VStack>
              <Spacer />
              <Image src="/three-dot.svg" />
            </HStack>

            <Flex
              w="full"
              paddingTop="50px"
              flexDirection={{ base: "column", lg: "row" }}
            >
              <Flex w="full" flex={1} marginRight={{ base: 0, lg: 2 }}>
                {isConnectedSteam ? (
                  <SimpleGrid
                    columns={{ base: 1, sm: 2 }}
                    w="full"
                    columnGap="20px"
                  >
                    <StatCard title="SoulScore" value="999" percent={10} isUp />
                    <StatCard
                      title="GamerScore"
                      value="999"
                      percent={10}
                      isUp={true}
                    />
                  </SimpleGrid>
                ) : (
                  <Box
                    width="full"
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Box
                      textAlign="center"
                      position="relative"
                      w="full"
                      justifyContent="center"
                      alignItems="center"
                      display="flex"
                    >
                      <Image src="/empty.svg" mr="10px" mt="10px" mb="10px" />

                      <Text
                        color="#475467"
                        style={{ fontWeight: "bold", fontSize: "24px" }}
                        fontFamily={fonts.Inter}
                      >
                        Data is empty
                      </Text>
                    </Box>
                    <Button
                      borderRadius="8px"
                      bg="#194185"
                      color="white"
                      _hover={{ bg: "#2d69cf" }}
                      onClick={() => {
                        window.open("steam://", "_blank");
                        setConnectedSteam(true);
                      }}
                    >
                      Connect Steam to receive SoulScore
                    </Button>
                  </Box>
                )}
              </Flex>

              <Flex w="full" flex={1} marginLeft={{ base: 0, lg: 2 }}>
                {isConnectedWallet ? (
                  <SimpleGrid
                    columns={{ base: 1, sm: 2 }}
                    w="full"
                    columnGap="20px"
                  >
                    <StatCard
                      title="InvestScore"
                      value={(profile && profile.investorLevel) || 0}
                      percent={60}
                      isUp
                    />
                    <StatCard
                      title="CollectorScore"
                      value={(profile && profile.collectorLevel) || 0}
                      percent={13}
                      isUp={false}
                    />
                  </SimpleGrid>
                ) : (
                  <Box
                    width="full"
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Box
                      textAlign="center"
                      position="relative"
                      w="full"
                      justifyContent="center"
                      alignItems="center"
                      display="flex"
                    >
                      <Image src="/empty.svg" mr="10px" mt="10px" mb="10px" />

                      <Text
                        color="#475467"
                        style={{ fontWeight: "bold", fontSize: "24px" }}
                        fontFamily={fonts.Inter}
                      >
                        Data is empty
                      </Text>
                    </Box>
                    <Button
                      borderRadius="8px"
                      bg="#DC6803"
                      color="white"
                      _hover={{ bg: "#2d69cf" }}
                      onClick={async () => {
                        try {
                          // check if MetaMask is installed
                          if (!window.ethereum) {
                            throw new Error("MetaMask is not installed");
                          }
                          setConnectedWallet(true);
                          // request user's permission to connect to MetaMask
                          await window.ethereum.enable();
                          // MetaMask is now connected, you can use the provider to interact with the blockchain
                          // for example:
                          const accounts = await window.ethereum.request({
                            method: "eth_requestAccounts",
                          });
                          console.log(accounts[0]); // prints the user's Ethereum address
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                    >
                      Connect Wallet to unlock InvesScore
                    </Button>
                  </Box>
                )}
              </Flex>
            </Flex>
          </Flex>

          <Heading
            paddingTop="50px"
            paddingBottom="5px"
            size="md"
            fontFamily={fonts.Inter}
            color="#101828"
            fontSize="18px"
            fontWeight="600"
            lineHeight="28px"
          >
            Steam General Data
          </Heading>
          {isConnectedSteam ? (
            <Box>
              <Flex
                w="full"
                borderRadius="12px"
                overflow="hidden"
                border="1px solid #EAECF0"
                boxShadow="0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)"
                bg="white"
                overflowX="auto"
                flexDirection="column"
                display="flex"
              >
                <Table w="full" className="game-table">
                  <Thead>
                    <Tr>
                      <Th minW="250px">Steam ID</Th>
                      <Th minW="150px">Total Hours</Th>
                      <Th minW="150px">Steam Level</Th>
                      <Th minW="150px">Total Hours</Th>
                      <Th minW="150px">Year</Th>
                      <Th minW="150px">Games</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {new Array(1).fill(0).map((item, index) => (
                      <Tr key={index.toString()}>
                        <Td>
                          <HStack>
                            <Image src={`/steam-icon.svg`} mr="12px" />
                            <Text
                              variant="with-sub"
                              fontWeight="500"
                              color="#101828"
                            >
                              Gods Unchained
                            </Text>
                          </HStack>
                        </Td>
                        <Td>1234</Td>
                        <Td>1234</Td>
                        <Td>1234</Td>
                        <Td>2y</Td>
                        <Td>2</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Flex>
              <SimpleGrid
                columns={{ base: 1, lg: 1, xl: 2 }}
                w="full"
                columnGap="13px"
                mt="16px"
              >
                <Box>
                  <Heading
                    paddingTop="50px"
                    paddingBottom="5px"
                    size="md"
                    fontFamily={fonts.Inter}
                    color="#101828"
                    fontSize="16px"
                    fontWeight="500"
                    lineHeight="24px"
                  >
                    Top Played Genres
                  </Heading>
                  <TopPlayerCard
                    title="Genre Game"
                    value={"999"}
                    percent={10}
                    isUp
                  />
                  <TopPlayerCard
                    title="Genre Game"
                    value={"912"}
                    percent={2}
                    isUp={false}
                  />
                  <TopPlayerCard
                    title="Genre Game"
                    value={"999"}
                    percent={10}
                    isUp
                  />
                </Box>
                <Box>
                  <Heading
                    paddingTop="50px"
                    paddingBottom="5px"
                    size="md"
                    fontFamily={fonts.Inter}
                    color="#101828"
                    fontSize="16px"
                    fontWeight="500"
                    lineHeight="24px"
                  >
                    Top Played Games
                  </Heading>
                  <TopPlayerCard
                    title="Game Name"
                    value={"999"}
                    percent={10}
                    isUp
                  />
                  <TopPlayerCard
                    title="Game Name"
                    value={"912"}
                    percent={2}
                    isUp={false}
                  />
                  <TopPlayerCard
                    title="Game Name"
                    value={"999"}
                    percent={10}
                    isUp
                  />
                </Box>
              </SimpleGrid>
            </Box>
          ) : (
            <Box
              paddingTop="50px"
              paddingBottom="50px"
              w="full"
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              bg="#F9FAFB"
            >
              <Image src="/empty.svg" h="112px"></Image>
              <Text
                color="#475467"
                style={{ fontWeight: "bold", fontSize: "24px" }}
                fontFamily={fonts.Inter}
              >
                Data is empty
              </Text>
            </Box>
          )}

          <Heading
            paddingTop="50px"
            paddingBottom="5px"
            size="md"
            fontFamily={fonts.Inter}
            color="#101828"
            fontSize="18px"
            fontWeight="600"
            lineHeight="28px"
          >
            My Collectibles
          </Heading>
          {isConnectedWallet ? (
            <Box>
              <Flex
                w="full"
                borderRadius="12px"
                overflow="hidden"
                border="1px solid #EAECF0"
                // boxShadow="0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)"
                bg="white"
                overflowX="auto"
                flexDirection="column"
                display="flex"
              >
                <Table w="full" className="game-table-no-border-header">
                  <Thead>
                    <Tr>
                      <Th w="75%" minW="250px">
                        Name
                      </Th>
                      <Th w="10%" minW="150px">
                        SoulScore Value
                      </Th>
                      <Th w="15%" minW="150px">
                        Soure
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {new Array(3).fill(0).map((item, index) => (
                      <Tr key={index.toString()}>
                        <Td>
                          <HStack>
                            <Image
                              borderRadius="6px"
                              src={`/dashboard/card_0${index + 1}.png`}
                              mr="12px"
                            />
                            <Text
                              variant="with-sub"
                              fontWeight="500"
                              color="#101828"
                            >
                              Steam Card Level {index + 1}
                            </Text>
                          </HStack>
                        </Td>
                        <Td>10</Td>
                        <Td>
                          <HStack>
                            <Image borderRadius="6px" src={`/steam-icon.svg`} />
                            <Text
                              variant="with-sub"
                              fontWeight="500"
                              color="#101828"
                            >
                              Steam
                            </Text>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Flex>
              <Box
                mt="20px"
                borderRadius="8px"
                padding="10px 16px"
                border="1px solid #D0D5DD"
                bg="#fff"
                boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                w="fit-content"
                cursor="pointer"
              >
                <Text
                  color="#344054"
                  fontSize="14px"
                  fontWeight="600"
                  fontFamily={fonts.Inter}
                >
                  View All
                </Text>
              </Box>
            </Box>
          ) : (
            <Box
              paddingTop="50px"
              paddingBottom="50px"
              w="full"
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              bg="#F9FAFB"
            >
              <Image src="/empty.svg" h="112px"></Image>
              <Text
                color="#475467"
                style={{ fontWeight: "bold", fontSize: "24px" }}
                fontFamily={fonts.Inter}
              >
                Data is empty
              </Text>
            </Box>
          )}

          <Heading
            paddingTop="50px"
            paddingBottom="5px"
            size="md"
            fontFamily={fonts.Inter}
            color="#101828"
            fontSize="18px"
            fontWeight="600"
            lineHeight="28px"
          >
            My NFTs
          </Heading>
          {isConnectedWallet ? (
            <Box>
              <Flex
                w="full"
                borderRadius="12px"
                overflow="hidden"
                borderBottom="1px solid #EAECF0"
                //  boxShadow="0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)"
                bg="white"
                overflowX="auto"
                flexDirection="column"
                display="flex"
              >
                <Table w="full" className="game-table-no-border-header">
                  <Thead>
                    <Tr>
                      <Th w="75%" minW="250px">
                        Name
                      </Th>
                      <Th w="10%" minW="150px">
                        Floor Price
                      </Th>
                      <Th w="15%" minW="150px">
                        Blockchain
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {new Array(3).fill(0).map((item, index) => (
                      <Tr key={index.toString()}>
                        <Td>
                          <HStack>
                            <Image
                              borderRadius="6px"
                              src={`/dashboard/nft_0${index + 1}.png`}
                              mr="12px"
                            />
                            <Text
                              variant="with-sub"
                              fontWeight="500"
                              color="#101828"
                            >
                              Steam Card Level {index + 1}
                            </Text>
                          </HStack>
                        </Td>
                        <Td>10</Td>
                        <Td>
                          <HStack>
                            <Image borderRadius="6px" src={`/steam-icon.svg`} />
                            <Text
                              variant="with-sub"
                              fontWeight="500"
                              color="#101828"
                            >
                              Steam
                            </Text>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Flex>
              <Box
                mt="20px"
                borderRadius="8px"
                padding="10px 16px"
                border="1px solid #D0D5DD"
                bg="#fff"
                boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
                w="fit-content"
                cursor="pointer"
              >
                <Text
                  color="#344054"
                  fontSize="14px"
                  fontWeight="600"
                  fontFamily={fonts.Inter}
                >
                  View All
                </Text>
              </Box>
            </Box>
          ) : (
            <Box
              paddingBottom="50px"
              paddingTop="50px"
              w="full"
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              bg="#F9FAFB"
            >
              <Image src="/empty.svg" h="112px"></Image>
              <Text
                color="#475467"
                style={{ fontWeight: "bold", fontSize: "24px" }}
                fontFamily={fonts.Inter}
              >
                Data is empty
              </Text>
            </Box>
          )}

          {/* <SimpleGrid
            columns={{ base: 1, lg: 1, xl: 2 }}
            w="full"
            columnGap="13px"
            mt="16px"
          >
            <NFTTable
              title="SBTs and Collectibles"
              tableLabels={SBTs_And_Collectibles.header}
              data={SBTs_And_Collectibles.data}
              comingSoon
            />

            <NFTTable
              title="Bundles and Packages"
              tableLabels={Bundles_And_Packages.header}
              data={Bundles_And_Packages.data}
              comingSoon
            />
          </SimpleGrid>

          <Flex mt="32px">
            <NFTTable
              title="NFTs"
              tableLabels={NFTsData.header}
              data={nftsDatasource}
            />
          </Flex> */}
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
