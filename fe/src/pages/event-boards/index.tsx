import Layout from "@/layouts";
import React, { useMemo, useRef, useState } from "react";
import moment from "moment";
import { Calendar, Event, Views, momentLocalizer } from "react-big-calendar";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Flex, useDisclosure } from "@chakra-ui/react";
import CustomToolbar from "@/views/event-boards/CustomToolbar";
import EventModal from "@/views/event-boards/EventModal";
import AddEditEventModal from "@/views/event-boards/AddEditEventModal";
import { useGetEventsQuery } from "@/services/modules/game.check.services";
import { useAppSelector } from "@/reduxs/hooks";
import { getCDNServer } from "@/utils/env.helpers";

const localizer = momentLocalizer(moment);

EventBoard.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export default function EventBoard() {
  const {auth0Info} = useAppSelector((p) => p.auth);
  const { auth0Sub } = useAppSelector((p) => p.auth);
  const { isLoading, data, isError, isFetching } = useGetEventsQuery(
    undefined,
    { skip: !auth0Sub }
  );

  const calendarRef = useRef<Calendar>(null);
  const [selectedDate, setDate] = useState<Date>(new Date());
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenAdd,
    onClose: onCloseAdd,
    onOpen: onOpenAdd,
  } = useDisclosure();
  const [selectedEvent, setEvent] = useState<Event>();

  const handleSelectEvent = (e: Event) => {
    setEvent(e);
    onOpen();
  };

  const events = useMemo(() => {
    return data?.map((e, index) => ({
      id: e.id,
      title: e.name,
      start: new Date(e.date),
      end: new Date(e.date),
      img: e.image ? `${getCDNServer()}/${e.image}` : undefined,
    }));
  }, [data]);

  const handleOnEdit = () => {
    onClose();
    onOpenAdd();
  };

  const isAdministrator =  useMemo(() => {
    const val = auth0Info?.grantRole.findIndex(p => p.role.id === 1);
    if (val === undefined) return false;
    return val > -1;
  }, [auth0Info, auth0Info?.grantRole]);

  return (
    <Flex w="full" h="100vh">
      <Calendar
        ref={calendarRef}
        localizer={localizer}
        date={selectedDate}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ width: "100%" }}
        components={{
          toolbar: () => (
            <CustomToolbar
              isAdministrator={isAdministrator}
              onAdd={() => {
                setEvent(undefined);
                onOpenAdd();
              }}
              date={selectedDate}
              defaultView={Views.MONTH}
              calendarRef={calendarRef}
              onDateChange={(newDate) => setDate(newDate)}
            />
          ),
        }}
        defaultView={Views.MONTH}
        onSelectEvent={(e) => handleSelectEvent(e)}
      />

      <EventModal
        isAdministrator={isAdministrator}
        event={selectedEvent}
        isOpen={isOpen}
        eventName={`${selectedEvent?.title || "Event"}`}
        onClose={onClose}
        onEdit={() => handleOnEdit()}
      />

      <AddEditEventModal
        //@ts-ignore
        event={data?.find((p) => p.id === selectedEvent?.id)}
        isOpen={isOpenAdd}
        onClose={onCloseAdd}
      />
    </Flex>
  );
}
