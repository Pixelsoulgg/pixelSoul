import React, { useMemo } from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ButtonVariants, TextVariants } from "@/themes/theme";


interface IProps {
  defaultValue: number;
  onChange: (val: number) => void;
}

export default function YearDropdown({ defaultValue, onChange }: IProps) {
  const currentYear = new Date().getFullYear();

  const years = useMemo(() => {
    const data=[];
    for (let i = currentYear - 4; i < currentYear + 4; i++) {
      data.push(i);
    }
    return data.reverse();
  }, [currentYear]);

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
        {years.map((val) => (
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
