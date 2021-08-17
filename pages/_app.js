import "tailwindcss/tailwind.css";

import { ApolloProvider } from "@apollo/client";
import client from "../providers/apollo/client.js";
import Nav from "../components/Nav";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Nav />
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ApolloProvider>
  );
}

export default MyApp;
