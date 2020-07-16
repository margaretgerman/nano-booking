import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function Layout({ children, home }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="60%"
      justifyContent="center"
      mt={6}
      mx="auto"
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Nano booking with Next.js" />
      </Head>
      <Box display="flex" justifyContent="center">
        {home ? (
          <>
            <Typography variant="h4">
              Welcome to home page of NanoBooking
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h4">
              <Link href="/">
                <a className={utilStyles.colorInherit}>{'NanoBooking'}</a>
              </Link>
            </Typography>
          </>
        )}
      </Box>
      {children}
    </Box>
  );
}
