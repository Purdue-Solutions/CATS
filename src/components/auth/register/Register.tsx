import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Center,
} from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link'
import { useInputState } from '@mantine/hooks';
import Password from './Password';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { IconX } from '@tabler/icons-react';
import MainLogo from '@/components/misc/MainLogo';

const purdueEmailRegex = /[a-zA-Z0-9_.-]+@purdue.edu$/

export default function Register() {
  const [email, setEmail] = useInputState('');
  const emailError = email && !purdueEmailRegex.test(email) ? 
    <Text color='red' size="sm">Invalid Purdue email</Text> : null

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<JSX.Element | null>(null)

  const [confirmPassword, setConfirmPassword] = useInputState('');
  const confirmPasswordError = password && confirmPassword && password != confirmPassword ?
    <Text color='red' size="sm">Passwords do not match</Text> : null
  
  const router = useRouter();
  // TODO: use this as indicator for account creation success in a useEffect block
  const [accountSuccess, setAccountSuccess] = useState(false); 


  const createAccount = () => {
    if (accountSuccess) {
      notifications.show({
        title: 'Verification Email',
        message: `A verification email was sent to ${email}. You will be redirected to the login page in 3 seconds`,
        autoClose: 3000
      })
      setTimeout(() => router.push('/login'), 3000)
    } else {
      notifications.show({
        title: 'Unable to create account',
        message: `Account creation unsuccessful. Do you already have an account?`,
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
          Create an Account
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{' '}
          <Anchor size="sm" href='/login' id='log-in'>
            Log in
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Purdue Email" placeholder="pete@purdue.edu" 
            onChange={setEmail} required id="email-input"/>
          { emailError }
          <Password setPassword={ setPassword } setPasswordError={ setPasswordError } />
          { passwordError }
          <PasswordInput label="Confirm Password" placeholder="Your password" 
            required mt="md" onChange={ setConfirmPassword } id="confirm-password-input"/>
          { confirmPasswordError }
          <Button 
            fullWidth
            mt="xl" 
            id="sign-up"
            disabled={((email == '') || (emailError != null)) || 
                      ((password == '') || (passwordError != null)) || 
                      ((confirmPassword == '') || (confirmPasswordError != null))
                      }
            onClick={ createAccount }
          >
            Create Account
          </Button>
        </Paper>
      </Container>
    </>
  );
}