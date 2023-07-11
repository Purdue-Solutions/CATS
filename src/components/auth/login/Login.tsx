import MainLogo from '@/components/misc/MainLogo';
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
import { useInputState } from '@mantine/hooks';

export default function Login() {
  const [email, setEmail] = useInputState('');
  const [password, setPassword] = useInputState('');

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
            onChange={ setEmail } required id="email-input"/>
            <Group position="apart" mb={5} mt="md">
              <Text component="label" htmlFor="your-password" size="sm" weight={500}>
                Password
              </Text>
              <Anchor
                id='forgot-password'
                href="/forgotpassword"
                onClick={(event) => event.preventDefault()}
                sx={(theme) => ({
                  paddingTop: 2,
                  color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
                  fontWeight: 500,
                  fontSize: theme.fontSizes.xs,
                })}
              >
                Forgot your password?
              </Anchor>
            </Group>
            <PasswordInput placeholder="Your password" 
                required id="password-input" onChange={ setPassword }/>
          <Button fullWidth mt="xl" id="log-in" disabled={!email || !password}>
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  );
}