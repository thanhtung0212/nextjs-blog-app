import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import './global.css';
import { useApollo } from '../lib/apollo';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from 'react-toastify';
import { AuthContextProvider } from '../context/AuthContext';
import { PostsProvider } from '../context/PostsContext';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps);

  return (
    <AuthContextProvider>
      <PostsProvider>
        <ApolloProvider client={apolloClient}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          <Component {...pageProps} />
        </ApolloProvider>
      </PostsProvider>
    </AuthContextProvider>
  );
};

export default App;
