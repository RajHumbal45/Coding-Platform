import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../redux/store";
import { AuthProvider } from "../src/context/AuthContext";

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...props.pageProps} />
      </AuthProvider>
    </Provider>
  );
}
