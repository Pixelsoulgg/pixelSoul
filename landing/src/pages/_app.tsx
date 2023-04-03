import "../../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../themes/theme";
import MainLayout from "../layouts";
import { Provider } from "react-redux";
import store from "../reduxs/store";
import Head from "next/head";
import { MotionLazyContainer } from "../components/animate";

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="DeQuest, landing page, pixelSoul" />
        <meta name="author" content="DeQuest" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <UserProvider>
            <MotionLazyContainer>
              <MainLayout>
                <AnyComponent {...pageProps} />
              </MainLayout>
            </MotionLazyContainer>
          </UserProvider>
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
