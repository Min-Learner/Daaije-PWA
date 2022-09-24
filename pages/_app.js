import "../styles/globals.css";
import { AppContextProvider } from "../utils/appContext";
import Layout from "../components/Layout";
import "animate.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}

export default MyApp;
