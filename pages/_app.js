import { Provider } from 'react-redux';
import '../styles/global.css';
import store from '../store';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff',
      main: '#0070f3',
      dark: '#000',
    },
    secondary: {
      main: '#676767',
      dark: '#676767',
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        padding: '10px',
        margin: '10px 0',
        cursor: 'pointer',
      },
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default function App({ Component, pageProps }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </MuiThemeProvider>
  );
}
