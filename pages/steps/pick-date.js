import Head from 'next/head';
import Router from 'next/router';
import Layout from '../../components/layout';
import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { Formik, Form, Field, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { DateTimePicker } from 'formik-material-ui-pickers';
import add from 'date-fns/add';

const Booking = () => {
  const DateSchema = Yup.object().shape({
    checkIn: Yup.date()
      .min(add(new Date(), { hours: 2 }), 'Must be at least 2hrs from now')
      .required('Required'),
    checkOut: Yup.date().when('checkIn', (checkIn) => {
      return checkIn
        ? Yup.date().min(add(checkIn, { hours: 4 }), 'Min stay - 4hrs')
        : Yup.date().min(add(new Date(), { hours: 4 }), 'Min stay - 4hrs');
    }),
  });
  const minStayTime = 4;
  const minCheckInDelay = 2;
  let minCheckoutTime = add(new Date(), {
    hours: minStayTime + minCheckInDelay,
  });

  const SetMinCheckoutTime = () => {
    const {
      values: { checkIn },
    } = useFormikContext();
    React.useEffect(() => {
      minCheckoutTime = add(checkIn, { hours: minCheckoutTime });
      //if new check-in is later then minimum check-out time, update check-out value
      // add(checkIn, { hours: 4 }) > checkOut &&
      //   setFieldValue('checkOut', minCheckoutTime);
    }, [checkIn]);
    return null;
  };

  return (
    <Layout>
      <Head>
        <title>Pick Date</title>
      </Head>
      <h1>Choose dates of your upcoming stay</h1>
      <Formik
        initialValues={{
          checkIn: add(new Date(), { hours: minCheckInDelay }),
          checkOut: add(new Date(), { hours: minStayTime + minCheckInDelay }),
        }}
        validationSchema={DateSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
          //to redux state
          Router.push('/steps/pick-place');
        }}
        render={({ isSubmitting, touched, submitForm, isValid }) => (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Form>
              <Field
                component={DateTimePicker}
                ampm={false}
                disablePast
                name="checkIn"
                label="Check In"
              />
              <SetMinCheckoutTime />
              <Field
                component={DateTimePicker}
                ampm={false}
                disablePast
                name="checkOut"
                label="Check Out"
                minDate={minCheckoutTime}
              />

              <Button
                variant="contained"
                color="primary"
                disabled={!isValid}
                type="submit"
              >
                Choose place
              </Button>
            </Form>
          </MuiPickersUtilsProvider>
        )}
      />
    </Layout>
  );
};

export default Booking;
