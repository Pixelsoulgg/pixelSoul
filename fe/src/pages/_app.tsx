import { UserProvider } from "@auth0/nextjs-auth0/client";
import store from "@/reduxs/store";
import { SuiWallet, WalletProvider } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import "@/styles/globals.css";
import theme from "@/themes/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <WalletProvider defaultWallets={[SuiWallet]}>
          <UserProvider>
            <Head>
              <meta charSet="UTF-8" />
              <meta name="keywords" content="Flip, coin, deget" />
              <meta name="author" content="Flip Coin" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <link
                rel="stylesheet"
                type="text/css"
                charSet="UTF-8"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
              />
              <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
              />
            </Head>
            {getLayout(<Component {...pageProps} />)}
          </UserProvider>
        </WalletProvider>
      </ChakraProvider>
    </Provider>
  );
}
