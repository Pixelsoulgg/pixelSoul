import { fonts } from "@/configs/constants";
import { ButtonVariants } from "@/themes/theme";
import { IDropdownItem } from "@/types";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";

export interface IProps {
  data: IDropdownItem[];
  value?: string | number;
  defaultLable: string;
  onChange?: (val: string | number) => void;
}

export default function Dropdown({ data = [], value, defaultLable, onChange }: IProps) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<Image src="/arrow-down-1.svg" />}
        bg="#fff"
        w="195px"
        border="1px solid #D0D5DD"
        borderRadius="6px"
        boxShadow="0px 1px 2px rgba(16, 24, 40, 0.05)"
        variant={ButtonVariants.WITH_DEFAULT}
        textAlign="justify"
      >
        {data.find(p => p.value === value)?.lable || defaultLable}
      </MenuButton>
      <MenuList>
        {data.map((item) => (
          <MenuItem fontFamily={fonts.VT323} fontSize="20px" color="#344054" key={item.value}
            onClick={() => onChange && onChange(item.value)}
          >
            {item.lable}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
