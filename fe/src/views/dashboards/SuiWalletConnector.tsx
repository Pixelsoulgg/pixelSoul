import { ButtonVariants } from "@/themes/theme";
import { getToast } from "@/utils";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
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
        <Button
          variant={ButtonVariants.WITH_WALLET_SIGN_IN}
          key={wallet.name}          
          onClick={() => {
            if (!wallet.installed) {
              toast(getToast("Please install sui wallet first.", "error", "Error"))
              return;
            }
            select(wallet.name);
          }}
        >
            Sign In  
        </Button>
      ))}
    </>
  );
}
