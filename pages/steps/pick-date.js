import Head from 'next/head';
import Router from 'next/router';
import Layout from '../../components/layout';
import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { Persist } from 'formik-persist';
import * as Yup from 'yup';
import { DateTimePicker } from 'formik-material-ui-pickers';
import add from 'date-fns/add';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const PickDate = () => {
  const dispatch = useDispatch();
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
    }, [checkIn]);
    return null;
  };

  return (
    <Layout>
      <Head>
        <title>Pick Date</title>
      </Head>
      <>
        <Typography align="center" variant="h4">
          Choose dates of your upcoming stay
        </Typography>

        <Formik
          initialValues={{
            checkIn: add(new Date(), { hours: minCheckInDelay }),
            checkOut: add(new Date(), {
              hours: minStayTime + minCheckInDelay,
            }),
          }}
          validationSchema={DateSchema}
          onSubmit={(values) => {
            dispatch({
              type: 'SET_BOOKING_DATES',
              payload: values,
            });
            Router.push('/steps/pick-place');
          }}
        >
          {({ isValid }) => (
            <Box display="flex" flexDirection="column">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Form>
                  <Box display="flex" justifyContent="space-around" mt={5}>
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
                  </Box>
                  <Box mt={5} display="flex" justifyContent="center">
                    <Button
                      mx="auto"
                      variant="contained"
                      color="primary"
                      disabled={!isValid}
                      type="submit"
                    >
                      Next
                    </Button>
                  </Box>
                  {/* <Persist isSessionStorage={true} name="signupForm" /> */}
                </Form>
              </MuiPickersUtilsProvider>
            </Box>
          )}
        </Formik>
      </>
    </Layout>
  );
};

export default PickDate;
