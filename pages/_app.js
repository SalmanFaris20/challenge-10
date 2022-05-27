/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import '../styles/globals.css';
import { Provider, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import AOS from 'aos';
import store from '../app/store';
import { auth, db } from '../config/firebase';

import 'aos/dist/aos.css';

import { updateAuthenticatedUser } from '../redux/auth/authSlice';

const App = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        dispatch(
          updateAuthenticatedUser({
            email: user.email,
            username: user.displayName || docSnap.data().username,
            gender: docSnap.data().gender,
          }),
        );
      }
    });
  }, []);

  return props.children;
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <App>
        <Component {...pageProps} />
      </App>
    </Provider>
  );
}

export default MyApp;
