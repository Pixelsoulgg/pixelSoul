import {
  ComponentStyleConfig,
  extendTheme,
  ThemeConfig,
} from "@chakra-ui/react";
import type { GlobalStyleProps } from "@chakra-ui/theme-tools";
import { fonts } from "../configs/constants";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  bg: {
    primary: "#444CE7",
    white: '#fff'
  },
  color: {
    white: "#ffffff",
    primary: "#0047B8",
    black: "#000000",
    secondary: "rgba(239, 239, 239, 0.7)",   
  },
};

const Text: ComponentStyleConfig = {
  variants: {
    "with-heading": {
      fontFamily: fonts.Inter,
      fontStyle: "normal",
      fontSize: "72px",
      lineHeight: "90px",
      color: 'color.white',    
      fontWeight: '700',      
      lineSpace: "-0.02em",
    },
    "with-lexend": {
      fontSize: "20px",
      fontFamily: fonts.Lexend,
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "140%",
      color: "color.white",
      fontFeatureSettings: "'salt' on, 'liga' off"
    },
    "with-lexend-menu": {
      fontSize: "18px",
      fontFamily: fonts.Lexend,
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "150%",
      color: "color.secondary",
      fontFeatureSettings: "'salt' on, 'liga' off"
    },
  },
};

const Button: ComponentStyleConfig = {
  variants: {
    "with-bg": {
      backgroundColor: "bg.primary",
      borderRadius: "10.5px",
      color: "color.white",
      fontFamily: fonts.Lexend,
      fontSize: "23.5px",
      lineHeight: "150%",
      fontWeight: "400",
      minWidth: "198px",
      minHeight: "76.69px",
      // padding: "20px 41px !important"
    },
    "with-no-bg": {
      backgroundColor: "transparent",
      color: 'color.white',
      borderRadius: "8px",
      border: "1px solid #FFFFFF",
      padding: "8px 25px !important",
      fontWeight: "400",
      fontSize: "15px",
      fontFamily: fonts.Lexend,
    }
  },
};

const Input: ComponentStyleConfig = {
  variants: {},
};

const components = {
  Button,
  Text,
  Input,
};

const theme = extendTheme({
  config,
  colors,
  components,
});

export default theme;
