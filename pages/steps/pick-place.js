import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import Button from '@material-ui/core/Button';
import Layout from '../../components/layout';
import useOnclickOutside from 'react-cool-onclickoutside';

const PickPlace = () => {
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
      // When user clicks outside of the component, we can dismiss
      // the searched suggestions by calling this method
      clearSuggestions();
    });

    const handleInput = (e) => {
      // Update the keyword of the input element
      setValue(e.target.value);
    };

    const handleSelect = ({ description }) => () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          //save coordinates and description
          //setPlacePicked(true);
          //console.log(description);
          console.log('📍 Coordinates: ', { lat, lng });
        })
        .catch((error) => {
          console.log('😱 Error: ', error);
        });
    };

    const renderSuggestions = () => {
      //setPlacePicked(false);
      data.map((suggestion) => {
        const {
          id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
          <li key={id} onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });
    };

    return (
      <div ref={ref}>
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Where are you going?"
        />
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {<ul>{renderSuggestions()}</ul>}
      </div>
    );
  };

  return (
    <Layout>
      <Head>
        <title>Pick date</title>
      </Head>
      <h1>Choose place of your stay</h1>
      <PlacesAutocomplete />
      {/* <Button>Next</Button> */}
    </Layout>
  );
};

export default PickPlace;
