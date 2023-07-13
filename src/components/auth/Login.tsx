import {
  TextInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Center,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconMail, IconX } from '@tabler/icons-react';
import MainLogo from '@/components/misc/MainLogo';
import { sendSignInEmail } from '@/lib/firebase/utils';
import { AuthError } from 'firebase/auth';
import { useState } from 'react';

const purdueEmailRegex = /[a-zA-Z0-9_.-]+@purdue.edu$/

export default function Login() {
  const [firstName, setFirstName] = useInputState('');
  const [lastName, setLastName] = useInputState('');
  const [email, setEmail] = useInputState('');
  const [loginDone, setLoginDone] = useState(false);
  const emailError = email && !purdueEmailRegex.test(email) ? 
    <Text color='red' size="sm">Invalid Purdue email</Text> : null
  

  const createAccount = async () => {
    try {
      await sendSignInEmail(email);
      setLoginDone(true);
    }
    catch (error) {
      notifications.show({
        title: 'Unable to send email',
        message: (error as AuthError).message,
        color: "red",
        icon: <IconX />,
        autoClose: 3000
      })
    }
  }

  const Login = (
  <Container size={480} my={40}>
    <Title
      align="center"
      id="welcome-back"
      sx={(theme) => ({ fontFamily: `${theme.fontFamily}`, fontWeight: 900 })}
    >
      {"Let's get started"}
    </Title>
    <Text color="dimmed" size="sm" align="center" mt={5}>
      Not sure what you are getting into?{' '}
      <Anchor size="sm" href='https://www.purduesolutions.org' id='log-in'>
        Learn More
      </Anchor>
    </Text>

    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      {/* <Flex justify="space-between">
        <TextInput label="First Name" placeholder="Purdue" 
          onChange={ setFirstName } required id="email-input"/>
        <TextInput label="Last Name" placeholder="Pete" 
          onChange={ setLastName } required id="email-input"/>
      </Flex> */}
      <TextInput label="Purdue Email" placeholder="pete@purdue.edu" 
        onChange={ setEmail } required id="email-input" mt={10}/>
      { emailError }
      <Button 
        fullWidth
        mt="xl" 
        id="sign-up"
        disabled={ (email == '') || (emailError != null) }
        onClick={ createAccount }
      >
        Sign In
      </Button>
    </Paper>
  </Container>);

const LoginDone = (
  <Container size={420} my={40}>
    <Title
      align="center"
      id="sent-email"
      sx={(theme) => ({ fontFamily: `${theme.fontFamily}`, fontWeight: 900 })}
    >
      {"We sent you a login link"}
    </Title>
    <Text color="dimmed" size="sm" align="center" mt={5}>
      {`If you don't see it, please wait up to 5 minutes and check your spam!`}
    </Text>

    <Center>
      <Button
        component="a"
        href='https://outlook.office.com/mail/'
        target='_blank'
        mt="xl"
        id="open-outlook"
        color="blue"
        variant="subtle"
        leftIcon={<IconMail />}
      >
        Open Outlook
      </Button>
    </Center>
  </Container>);

  

  return (
    <>
      <Center mt={40}>
        <MainLogo width={200} />
      </Center>
      { loginDone ? LoginDone : Login }
    </>
  );
}