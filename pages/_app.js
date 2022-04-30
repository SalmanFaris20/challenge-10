import "../styles/globals.css";
import { Provider, useDispatch } from "react-redux";
import store from "../app/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { updateAuthenticatedUser } from "../redux/auth/authSlice";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const App = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log("ini user", user);
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        dispatch(
          updateAuthenticatedUser({
            email: user.email,
            username: user.displayName || docSnap.data().username,
            gender: "Men" || docSnap.data().gender,
          })
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
