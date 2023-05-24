import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ButtonVariants, TextVariants } from "@/themes/theme";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface IProps {
  defaultValue: string;
  onChange: (val: string) => void;
}

export default function MonthDropdown({ defaultValue, onChange }: IProps) {
  return (
    <Menu>
      <MenuButton
        variant={ButtonVariants.WITH_DEFAULT}
        as={Button}
        minW="100px"
        rightIcon={<ChevronDownIcon />}
      >
        {defaultValue}
      </MenuButton>
      <MenuList
        w="50px !important"      
        zIndex={10}
      >
        {months.map((val) => (
          <MenuItem key={val}
            onClick={() => onChange && onChange(val)}
          >
            <Text variant={TextVariants.WITH_18}
            fontWeight={val === defaultValue ? 'bold' : 'normal'}
            >{val}</Text></MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
