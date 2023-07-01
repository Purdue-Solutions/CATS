import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Center,
} from '@mantine/core';
import Image from 'next/image';
import { useInputState } from '@mantine/hooks';

export default function Login() {
  const [email, setEmail] = useInputState('');
  const [password, setPassword] = useInputState('');

  return (
    <>
      <Center mt={40}>
        <Image src="/black_cat.png" width={200} height={200} alt="CATS Logo"/>
      </Center>
      <Container size={420} my={40}>
        <Title
          align="center"
          id="welcome-back"
          sx={(theme) => ({ fontFamily: `${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" href='/register' id='create-account'>
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Purdue Email" placeholder="pete@purdue.edu" 
            onChange={setEmail} required id="email-input"/>
          <PasswordInput label="Password" placeholder="Your password" 
            required mt="md" id="password-input"/>
          <Group position="center" mt="lg">
            <Anchor size="sm" id="forgot-password">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" id="log-in">
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  );
}