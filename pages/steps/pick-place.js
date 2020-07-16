import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Layout from '../../components/layout';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useDispatch } from 'react-redux';

const PickPlace = () => {
  const dispatch = useDispatch();
  const PlacesAutocomplete = () => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        /* Define search scope here */
      },
      debounce: 300,
    });
    const ref = useOnclickOutside(() => {
      clearSuggestions();
    });

    const handleInput = (e) => {
      setValue(e.target.value);
    };

    const handleSelect = ({ description }) => () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          dispatch({
            type: 'SET_BOOKING_PLACE',
            payload: { lat, lng, description },
          });
        })
        .catch((error) => {
          console.log('Error: ', error);
        });
    };

    const renderSuggestions = () => {
      return data.map((suggestion, i) => {
        const {
          structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
          <Paper elevation={3} key={i} onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </Paper>
        );
      });
    };

    return (
      <Box ref={ref}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Where are you going?"
          variant="outlined"
          value={value}
          onChange={handleInput}
          disabled={!ready}
        />
        {status === 'OK' && <Box>{renderSuggestions()}</Box>}
      </Box>
    );
  };

  return (
    <Layout>
      <Head>
        <title>Pick date</title>
      </Head>
      <Typography align="center" variant="h4">
        Choose place of your stay
      </Typography>
      <Box
        mx="auto"
        mt={5}
        display="flex"
        flexDirection="column"
        alignContent="center"
        minWidth="75%"
      >
        <PlacesAutocomplete />
        <Box mt={5} display="flex" justifyContent="center">
          <Button
            fullWidth={false}
            variant="contained"
            color="primary"
            onClick={() => Router.push('/steps/summary')}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default PickPlace;
