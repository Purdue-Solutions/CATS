import { createStyles, Title, Text, Button, Container, rem, Center } from '@mantine/core';
import Image from 'next/image';
import MainLogo from '../misc/MainLogo';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: rem(120),
    paddingBottom: rem(80),

    [theme.fn.smallerThan('sm')]: {
      paddingTop: rem(80),
      paddingBottom: rem(60),
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('xs')]: {
      textAlign: 'left',
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: 'flex',
    justifyContent: 'center',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  control: {
    marginLeft: theme.spacing.md,

    [theme.fn.smallerThan('xs')]: {
      height: rem(42),
      fontSize: theme.fontSizes.md,

      marginTop: theme.spacing.md,
      marginLeft: 0,
    },
  },
}));

export default function Hero() {
  const { classes } = useStyles();

  return (
    <Container className={ classes.wrapper } size={1400}>
      <div className={ classes.inner }>
        <Center>
          <MainLogo width={ 400 } />
        </Center>

        <Title className={ classes.title } id='title'>
          Interested in{' '}
          <Text component="span" className={ classes.highlight } inherit>
            Purdue Solutions
          </Text>{' '}
          ?
        </Title>

        <Container p={0} size={600} id="subtext">
          <Text size="lg" color="dimmed" className={ classes.description }>
            Consulting Applicant Tracking System (CATS)
          </Text>
        </Container>

        <div className={ classes.controls }>
          <Button
            component='a'
            className={ classes.control } 
            size="lg"
            href="https://www.purduesolutions.org"
            target='_blank'
            color='gray'
            variant='default'
            id='learn-more'
          >
            Learn More
          </Button>
          <Button 
            component='a'
            className={ classes.control } 
            size="lg"
            href="/login"
            id='apply-now'
          >
            Apply Now
          </Button>
        </div>
      </div>
    </Container>
  );
}