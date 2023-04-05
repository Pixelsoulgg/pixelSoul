import {
  ComponentStyleConfig,
  extendTheme,
  ThemeConfig,
} from "@chakra-ui/react";
import type { GlobalStyleProps } from "@chakra-ui/theme-tools";
import { fonts } from "../configs/constants";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  bg: {
    primary: "#0047B8",
    secondary: "#0E1E45",
    tertiary: "#151D14",
    subscriptions: "#EFF8FF",
    dining: "#FDF2FA",
    uncategorized: "#F2F4F7",
    inprogress: "#ECFDF3",
    action: "#7F56D9",
    arena: "#F63D68",
    white: "#ffffff",
  },
  color: {
    white: "#ffffff",
    primary: "#0047B8",
    secondary: "#B2B2B2",
    subscriptions: "#175CD3",
    dining: "#C11574",
    uncategorized: "#344054",
    inprogress: "#027A48",
  },
};

const Text: ComponentStyleConfig = {
  variants: {
    "with-title": {
      fontFamily: fonts.Inter,
      fontSize: "30px",
      lineHeight: "38px",
      color: "#101828",
      fontWeight: "600",
    },
    "with-sub": {
      fontFamily: fonts.Inter,
      fontSize: "16px",
      lineHeight: "24px",
      color: "#475467",
      fontWeight: "400",
    },
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
    active: {
      padding: "10px 16px",
      bg: "white",
      border: "2px solid #444CE7",
      boxShadow: "0px 4px 4px rgba(151, 71, 255, 0.35)",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      fontFamily: fonts.Inter,
      color: "#344054",
      minW: "90px"
    },
    normal: {
      padding: "10px 16px",
      bg: "white",
      border: "1px solid #D0D5DD",
      boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      fontFamily: fonts.Inter,
      color: "#344054",
      minW: "90px"
    },
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
