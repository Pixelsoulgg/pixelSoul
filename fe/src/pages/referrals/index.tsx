import { InputPixel } from "@/components";
import Layout from "@/layouts";
import { useAppSelector } from "@/reduxs/hooks";
import { useInviteByEmailMutation } from "@/services/modules/game.check.services";
import { ButtonVariants, TextVariants } from "@/themes/theme";
import { getToast, isValidEmail } from "@/utils";
import { getReferralUrl } from "@/utils/env.helpers";
import { ReferralStep } from "@/views/referrals";
import { Button, Flex, HStack, Image, Spinner, Text, useClipboard, useToast } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

Referral.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

const URL_REF = getReferralUrl();
const DEFAULT_EMAIL = 'Enter the invited email address';

export default function Referral() {
  const {auth0Info} = useAppSelector(p => p.auth);
  const [inviteByEmailAsync, {isLoading, isError, isSuccess}] = useInviteByEmailMutation();
  const { onCopy, value, setValue } = useClipboard(`${URL_REF}${auth0Info?.referralCode || ''}`);
  const [email, setEmail] = useState<string>('');
  const toast = useToast();
  useEffect(() => {
    setValue(`${URL_REF}${auth0Info?.referralCode || ''}`);
  }, [auth0Info, auth0Info?.referralCode]);


  const handleSendEmail = async() => {
    try {
      if (!auth0Info || !auth0Info.referralCode || !email) 
        return;
      if (!isValidEmail(email)) {
        toast(getToast('Please enter a valid email format.'))
        return;
      }
      const {referralCode} = auth0Info;
      await inviteByEmailAsync({referralCode, desMail: email}).unwrap();
      toast(getToast(`The email has been sent to the email address ${email}.`, 'success', 'Pixelsoul Invitation'))
      
    } catch(ex) {}
  }


  return (
    <Flex
      w="full"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        variant={TextVariants.WITH_TITLE}
        textAlign="center"
        fontWeight={400}
        fontSize={40}
        mt="32px"
      >
        Refer. Earn. Play. Repeat.
      </Text>
      <Text
        variant={TextVariants.WITH_SUB}
        textAlign="center"
        fontWeight={400}
        fontSize={24}
        mt="15px"
      >
        Refer your friends to join DeQuest and enjoy some unique perks!
      </Text>

      <ReferralStep />

      <Flex
        w="full"
        maxW="970px"
        minH="335.15px"
        bg="#F0F9FF"
        borderRadius="8px"
        p="30px 70px"
        mt="30px"
        flexDirection="column"        
      >
        <HStack w="full" justifyContent="flex-start">
          <Flex>
            <Text variant={TextVariants.WITH_18}>Your Referrals:</Text>
          </Flex>
          <InputPixel
            value={`${auth0Info?.referralAmount || 0}`}
            h="53px"
            wrapStyle={{ w: "82px", ml: "15px !important" }}
          />

          <Flex w={{ base: "full", lg: "140px" }} ml="20px !important">
            <Text variant={TextVariants.WITH_18}>Total Reward:</Text>
          </Flex>
          <InputPixel
            value={`${auth0Info?.referralSoulPoint || 0}`}
            w="131px"
            textAlign="center"
            h="53px"
            icon={
              <Image
                src="/referrals/1.svg"
                position="absolute"
                right={-12}
                left={0}
                marginLeft="auto"
                mr="auto"
              />
            }
          />
        </HStack>

        <HStack w="full" my="30px">
          <Flex w={{ base: "full", lg: "180px" }}>
            <Text variant={TextVariants.WITH_18}>Invite by email:</Text>
          </Flex>
          <InputPixel
            value={email}
            placeholder={DEFAULT_EMAIL}
            type="email"
            w="full"
            h="40px"
            textAlign="start"
            wrapStyle={{ w: "full" }}
            className={email === DEFAULT_EMAIL ? 'input-placeholder' : ''}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button 
            variant={ButtonVariants.WITH_HIGHLIGHT_BLUE}                        
            isDisabled={isLoading}
            onClick={handleSendEmail}
          >
            {!isLoading && 'Send'}
            {isLoading && <Spinner />}
          </Button>
        </HStack>

        <HStack w="full">
          <Flex w={{ base: "full", lg: "180px" }}>
            <Text variant={TextVariants.WITH_18}>Invite by email:</Text>
          </Flex>
          <InputPixel
            value={value}
            w="full"
            textAlign="start"
            wrapStyle={{ w: "full" }}
          />
          <Button variant={ButtonVariants.WITH_HIGHLIGHT_BLUE} h="36px"
            onClick={() => {
              onCopy();
              toast(getToast("Copied", "success", "Referral"))
            }}
          >
            Copy
          </Button>
        </HStack>

        <Flex
          w={{ base: "full", lg: "192px" }}
          justifyContent="space-between"
          mt="30px"
          ml={{ base: "0px", lg: "130px" }}
        >
          <Link href="#">
            <Image src="/referrals/socials/facebook.svg" />
          </Link>
          <Link href="#">
            <Image src="/referrals/socials/twitter.svg" />
          </Link>
          <Link href="#">
            <Image src="/referrals/socials/linkedin.svg" />
          </Link>
          <Link href="#">
            <Image src="/referrals/socials/telegram.svg" />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
