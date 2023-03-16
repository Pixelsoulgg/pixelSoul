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
    inprogress: "#ECFDF3"
  },
  color: {
    white: "#ffffff",
    primary: "#0047B8",
    secondary: "#B2B2B2",
    subscriptions: "#175CD3",
    dining: "#C11574",
    uncategorized: "#344054",
    inprogress: "#027A48"
  },
};

const Text: ComponentStyleConfig = {
  variants: {
    "with-title": {
      fontFamily: fonts.Inter,
      fontSize: "30px",
      lineHeight: "38px",
      color: '#101828',    
      fontWeight: '600',      
    },
    "with-sub": {
      fontFamily: fonts.Inter,
      fontSize: "16px",
      lineHeight: "24px",
      color: '#475467',    
      fontWeight: '400',      
    },
  },
};

const Button: ComponentStyleConfig = {
  variants: {
    solid: (props: GlobalStyleProps) => ({
      bg: props.colorMode === "dark" ? "red.300" : "red.500",
    }),
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
