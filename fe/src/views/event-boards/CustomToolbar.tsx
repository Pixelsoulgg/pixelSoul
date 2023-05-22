import MonthDropdown from "@/components/dashboards/MonthDropdown";
import YearDropdown from "@/components/dashboards/YearDropdown";
import { ButtonVariants } from "@/themes/theme";
import { getShortMonth } from "@/utils";
import { Button, HStack, Spacer } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { Calendar, View, Views } from "react-big-calendar";

interface IProps {
  date: Date;
  defaultView: View;
  calendarRef?: React.RefObject<Calendar>;
  onDateChange?: (date: Date) => void;
}

export default function CustomToolbar({
  date,
  defaultView,
  calendarRef,
  onDateChange,
}: IProps) {
  const [activeView, setActiveView] = useState<View>(defaultView);

  const handleChangeView = (type: View) => {
    if (calendarRef?.current) {
      const { onView } = calendarRef.current.props;
      onView && onView(type);
      setActiveView(type);
    }
  };

  const handleChangeYearOrMonth = (
    val: string | number,
    type: "month" | "year"
  ) => {
    let year = date.getFullYear();
    let month = getShortMonth(date);
    if (type === "month") {
      month = val as string;
    } else {
      year = val as number;
    }

    const newDate = moment(`01-${month}-${year}`, 'DD-MMM-YYYY').toDate();
    console.log({newDate})
    onDateChange && onDateChange(newDate)
  };

  return (
    <HStack w="full" minH="20px">
      <Spacer />
      <YearDropdown
        defaultValue={date.getFullYear()}
        onChange={(year) => handleChangeYearOrMonth(year, "year")}
      />
      <MonthDropdown
        defaultValue={getShortMonth(date)}
        onChange={(val) => handleChangeYearOrMonth(val, "month")}
      />
      <Button
        variant={ButtonVariants.WITH_DEFAULT}
        minW="69px"
        marginRight="-8px !important"
        borderTopRightRadius="2px"
        borderBottomRightRadius="2px"
        className={activeView === Views.MONTH ? "active-view-calendar" : ""}
        onClick={() => handleChangeView(Views.MONTH)}
      >
        Month
      </Button>
      <Button
        variant={ButtonVariants.WITH_DEFAULT}
        minW="69px"
        borderTopLeftRadius="2px"
        borderBottomLeftRadius="2px"
        className={activeView === Views.WEEK ? "active-view-calendar" : ""}
        onClick={() => handleChangeView(Views.WEEK)}
      >
        Week
      </Button>
    </HStack>
  );
}
