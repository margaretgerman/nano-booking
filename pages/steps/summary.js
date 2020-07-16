import Head from 'next/head';
import Layout from '../../components/layout';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import Typography from '@material-ui/core/Typography';

const Summary = () => {
  useEffect(() => {
    if (!!lat && lng) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: bookingLocation,
        zoom: 14,
      });
      new google.maps.Marker({ position: bookingLocation, map: map });
    }
  }, []);

  const { checkIn, checkOut } = useSelector((state) => state.bookingDates);
  const { lat, lng, description } = useSelector((state) => state.bookingPlace);
  const bookingLocation = { lat, lng };

  const allFields = checkIn && checkOut && lat && lng;

  return (
    <Layout>
      <Head>
        <title>Summary</title>
      </Head>
      {allFields ? (
        <>
          <Typography align="center" variant="h4">
            Here's a summary of your stay:
          </Typography>
          <p>Check-in: {format(checkIn, 'd LLL y HH:mm')}</p>
          <p>Check-out: {format(checkOut, 'd LLL y HH:mm')}</p>
          <p>Address: {description}</p>
          <div style={{ width: 500, height: 500 }} id="map" />
        </>
      ) : (
        <Typography align="center" variant="h4">
          Oops! You have to fill out previous steps first
        </Typography>
      )}
    </Layout>
  );
};

export default Summary;
