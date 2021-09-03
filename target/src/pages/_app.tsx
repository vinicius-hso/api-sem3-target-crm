import React from "react";
import "@styles/globals.css";
import moment from "moment";
import { ThemeProvider } from "@material-ui/core/";
import theme from "ui/theme/theme";
import Head from "next/head";
import Header from "ui/components/Header/Header";
import Footer from "ui/components/Footer/Footer";
import { AppContainer } from "ui/styles/pagesStyle/_app.syile";

function MyApp({ Component, pageProps }) {
  moment.locale("pt-br");
  return (
    <>
      <Head>
        {/* DEFINE LINK DA FONTE POPPINS E FONTE DE ICONES  */}
        <title>TARGET</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://kit.fontawesome.com/189c1a3970.js"
          crossOrigin="BA770C04-EB7C-46D7-8585-8F6D199DC256"
        ></script>
      </Head>
      {/* THEMEPROVIDER DEIXA O TEMA DA APLICAÇÃO DISPONIVEL EM TODOS ELEMENTOS FILHOS NESSE CASO TODAS AS PAGINAS */}
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Header />
          {/* COMPONENTE SÃO TODAS NOSSAS PAGINAS */}
          <Component {...pageProps} />
          <Footer />
        </AppContainer>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
