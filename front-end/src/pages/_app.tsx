import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../themes/theme";
import MainLayout from "../layouts";
import { Provider } from "react-redux";
import store from "../reduxs/store";
import Head from "next/head";
import DashboardLayout from "../layouts/dashboards";
import { GlobalContextProvider } from "../contexts/Globals";

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <GlobalContextProvider>
            <Head>
              <meta charSet="UTF-8" />
              <meta name="keywords" content="Flip, coin, deget" />
              <meta name="author" content="Flip Coin" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
            </Head>
            <DashboardLayout>
              {/* <MainLayout> */}
              <AnyComponent {...pageProps} />
              {/* </MainLayout> */}
            </DashboardLayout>
          </GlobalContextProvider>
        </UserProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
