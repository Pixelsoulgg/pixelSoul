import { HStack, Text, VStack } from "@chakra-ui/react";
import { useCountdown } from "./useCountdown";
import { TextVariants } from "@/themes/theme";

const ShowCounter = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return (
    <HStack
      w="496px"
      h="88px"
      my="30px"
      bg="#fff"
      border="1px solid #4BFFFF"
      borderRadius="6px"
      boxShadow="0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)"
      px="34px"
      justifyContent="space-between"
    >
      <VStack>
        <Text variant={TextVariants.WITH_24} fontSize="40px">
          {days < 0 ? 0 : days}
        </Text>
        <Text variant={TextVariants.WITH_18} color="#4691FF">
          days
        </Text>
      </VStack>
      <VStack>
        <Text variant={TextVariants.WITH_24} fontSize="40px">
          {hours < 0 ? 0 : hours}
        </Text>
        <Text variant={TextVariants.WITH_18} color="#4691FF">
          hours
        </Text>
      </VStack>
      <VStack>
        <Text variant={TextVariants.WITH_24} fontSize="40px">
          {minutes < 0 ? 0 : minutes}
        </Text>
        <Text variant={TextVariants.WITH_18} color="#4691FF">
          minutes
        </Text>
      </VStack>
      <VStack>
        <Text variant={TextVariants.WITH_24} fontSize="40px">
          {seconds < 0 ? 0 : seconds}
        </Text>
        <Text variant={TextVariants.WITH_18} color="#4691FF">
          seconds
        </Text>
      </VStack>
    </HStack>
  );
};

const CountdownTimer = ({ targetDate }: { targetDate: number }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  return (
    <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  );
};

export default CountdownTimer;
