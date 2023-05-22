import Layout from "@/layouts";
import React, { useRef, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Flex } from "@chakra-ui/react";
import CustomToolbar from "@/views/event-boards/CustomToolbar";

const localizer = momentLocalizer(moment);

EventBoard.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export default function EventBoard() {
  const calendarRef = useRef<Calendar>(null);
  const [selectedDate, setDate] = useState<Date>(new Date());
  return (
    <Flex w="full" h="100vh">
      <Calendar
        ref={calendarRef}
        localizer={localizer}
        date={selectedDate}
        // events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ width: "100%" }}
        components={{
          toolbar: () => (
            <CustomToolbar
              date={selectedDate}
              defaultView={Views.MONTH}
              calendarRef={calendarRef}
              onDateChange={(newDate) => setDate(newDate)}
            />
          ),
        }}
        defaultView={Views.MONTH}
      />
    </Flex>
  );
}
