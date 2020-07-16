import { createStore } from 'redux';

const initialState = {
  bookingDates: {},
  bookingPlace: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BOOKING_DATES':
      return { ...state, bookingDates: action.payload };
    case 'SET_BOOKING_PLACE':
      return { ...state, bookingPlace: action.payload };
    default:
      return state;
  }
};
const store = createStore(reducer);
export default store;
