import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { usePageLoading } from "../app/usePageLoading";
import Loading from "../components/Loading";

const MyApp = ({ Component, pageProps }) => {
  const { isPageLoading } = usePageLoading();

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        {isPageLoading ? <Loading /> : <Component {...pageProps} />}
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
