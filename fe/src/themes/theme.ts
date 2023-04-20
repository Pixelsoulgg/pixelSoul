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
    hover: "#4691FF",
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
    "with-24": {
      fontFamily: fonts.VT323,
      fontSize: "24px",
      fontWeight: "400",
      lineHeight: "24px",
      color: "#101828",
      fontStyle: "normal"
    },
    "with-18": {
      fontFamily: fonts.VT323,
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "24px",
      color: "#475467",
      fontStyle: "normal"
    },
    "with-14": {
      fontFamily: fonts.VT323,
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "24px",
      color: "#475467",
      fontStyle: "normal"
    }

  },
};

const Button: ComponentStyleConfig = {
  variants: {
    active: {
      padding: "10px 16px",
      bg: "white",
      border: "2px solid #4691FF",
      boxShadow: "0px 4px 4px rgba(75, 255, 255, 0.5)",
      borderRadius: "8px",
      fontSize: "20px",
      fontWeight: "400",
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
      fontSize: "20px",
      fontWeight: "400",
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
    },
    "with-hl-blue": {
      bgColor: "#4691FF",
      color: "#fff",
      minW: "160px",
      minH: "36px",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: fonts.VT323,
      border: "3px solid #4691FF",
      boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      borderRadius: "6px",
      fontSize: "20px",
    },
    "with-hl-green": {
      bgColor: "#12B76A",
      color: "#fff",
      minW: "160px",
      minH: "36px",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: fonts.VT323,
      border: "3px solid #12B76A",
      boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      borderRadius: "6px",
      fontSize: "20px",
    },
    "with-default": {
      bgColor: "#FFFFFF",
      minW: "160px",
      minH: "36px",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: fonts.VT323,
      border: "1px solid #D0D5DD",
      boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      borderRadius: "6px",
      color: "#344054",
      fontSize: "20px",
    },
    "with-hover": {
      bgColor: "#F2F4F7",
      color: "#344054",
      minW: "160px",
      minH: "36px",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: fonts.VT323,
      border: "1px solid #D0D5DD",
      boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      borderRadius: "6px",
      fontSize: "20px",
    },
    "with-active": {
      bgColor: "#FFFFFF",
      color: "#344054",
      minW: "160px",
      minH: "36px",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: fonts.VT323,
      border: "2px solid #4691FF",
      boxShadow: "0px 4px 4px rgba(75, 255, 255, 0.5)",
      borderRadius: "6px",
      fontSize: "20px",
    },
  },
};

export const ButtonVariants = {
  WITH_DEFAULT: "with-default",
  WITH_HIGHLIGHT_GREEN: "with-hl-green",
  WITH_HIGHLIGHT_BLUE: "with-hl-blue",
  WITH_HOVER: "with-hover",
  WITH_ACTIVE: "with-active",

}

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
