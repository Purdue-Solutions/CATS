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
import { IconCheck, IconX } from '@tabler/icons-react';
import MainLogo from '@/components/misc/MainLogo';
import { sendSignInEmail } from '@/lib/firebase/utils';
import { AuthError } from 'firebase/auth';

const purdueEmailRegex = /[a-zA-Z0-9_.-]+@purdue.edu$/

export default function Login() {
  const [email, setEmail] = useInputState('');
  const emailError = email && !purdueEmailRegex.test(email) ? 
    <Text color='red' size="sm">Invalid Purdue email</Text> : null
  

  const createAccount = async () => {
    try {
      await sendSignInEmail(email);
      notifications.show({
        title: 'Sign In Email',
        color: 'green',
        message: `An email was sent to ${email}. You can sign in through the link in the email. Please check your spam!`,
        icon: <IconCheck />,
        autoClose: 1000000
      })
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

  return (
    <>
      <Center mt={40}>
        <MainLogo width={200} />
      </Center>
      <Container size={420} my={40}>
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
          <TextInput label="Purdue Email" placeholder="pete@purdue.edu" 
            onChange={setEmail} required id="email-input"/>
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
      </Container>
    </>
  );
}