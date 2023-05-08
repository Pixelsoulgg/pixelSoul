import { getToast } from "@/utils";
import { Box, Text, useToast } from "@chakra-ui/react";
import { useWallet } from "@suiet/wallet-kit";

export default function SuiWalletConnector() {
  const {
    select,
    configuredWallets,
    detectedWallets,
  } = useWallet();
 const toast = useToast();
  return (
    <>
      {[...configuredWallets, ...detectedWallets].map((wallet) => (
        <Box
          key={wallet.name}
          cursor="pointer"
          bg="#DC6803"
          display="flex"
          w="260px"
          h="44px"
          borderRadius="8px"
          px="16px"
          ml={{ base: "-100px", lg: "0px" }}
          onClick={() => {
            if (!wallet.installed) {
              toast(getToast("Please install sui wallet first.", "error", "Error"))
              return;
            }
            select(wallet.name);
          }}
        >
          <Text variant="with-title" fontSize="16px" w="full" color="white" textAlign="center">
            Connect to {wallet.name}
          </Text>
        </Box>
      ))}
    </>
  );
}
