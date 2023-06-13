import { fonts } from "@/configs/constants";
import { ButtonVariants } from "@/themes/theme";
import { getToast } from "@/utils";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { ConnectButton, ErrorCode, useWallet } from "@suiet/wallet-kit";

export default function SuiWalletConnector() {
  const { select, configuredWallets, detectedWallets } = useWallet();
  const toast = useToast();
  return (
    <>
      <ConnectButton
        style={{
          backgroundColor: "#BBF2FF",
          color: "#000082",
          width: "81px",
          minHeight: "26px",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: fonts.VT323,
          borderRadius: "6px",
          fontSize: "18px",
          padding: "4px",
        }}
        onConnectError={(err) => {
          if (err.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
            toast(getToast('user rejected the connection to ' + err.details?.wallet, "error", "Error"))
          } else {
            toast(getToast("unknown connect error", "error", "Error"))
          }
        }}
      >
        Sign In
      </ConnectButton>
      {/* {[...configuredWallets, ...detectedWallets].map((wallet) => (
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
      ))} */}
    </>
  );
}
