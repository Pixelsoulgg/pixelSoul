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
