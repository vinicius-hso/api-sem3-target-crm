import "@styles/globals.css";
import { ThemeProvider } from "@material-ui/core/";
import theme from "ui/theme/theme";
import Head from "next/head";
import Header from "ui/components/Header/Header";
import Footer from "ui/components/Footer/Footer";
import { AppContainer } from "ui/styles/pagesStyle/_app.syile";
import moment from 'moment';


function MyApp({ Component, pageProps }) {
 moment.locale('pt-br');
  return (
    <>
      <Head>
        <title>TARGET</title>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </AppContainer>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
