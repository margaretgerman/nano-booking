import Head from 'next/head';
import Layout from '../components/layout';
import Typography from '@material-ui/core/Typography';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>NanoBooking</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography align="center" variant="h2">
          <a href="/steps/pick-date">Book your stay</a>
        </Typography>
      </main>
    </Layout>
  );
}
