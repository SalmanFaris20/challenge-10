import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

export const fetchDataPlayer = createAsyncThunk(
  'auth/fetchDataPlayer',
  async () => {
    try {
      const userCollectionRef = collection(db, 'users');
      const datas = await getDocs(userCollectionRef);
      const result = datas.docs.map((document) => ({ ...document.data() }));
      return result;
    } catch (error) {
      throw TypeError('Cant load data');
    }
  },
);

export const editAuth = createAsyncThunk(
  'auth/editAuth',
  async (credentials) => {
    try {
      const { email, username, gender } = credentials;
      const user = auth.currentUser;
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        email: email,
        username: username,
        gender: gender,
      });
    } catch (error) {
      throw TypeError('Unable Edit Form');
    }
  },
);

export const registerAuth = createAsyncThunk(
  'auth/registerAuth',
  async (credentials) => {
    try {
      const { email, password, username, gender } = credentials;
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const { user } = userCredential;
          setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: email,
            username: username,
            gender: gender,
            score: {
              game1: 0,
              game2: 0,
            },
            gameplayed: {
              game1: false,
              game2: false,
            },
            createdAt: Timestamp.fromDate(new Date()),
          });
        },
      );
    } catch (error) {
      const errorMessage = error.message;
      throw TypeError(errorMessage);
    }
  },
);

export const loginAuth = createAsyncThunk(
  'auth/loginAuth',
  async (credentials) => {
    try {
      const { email, password } = credentials;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      return {
        email: userCredential.user.email,
      };
    } catch (err) {
      throw TypeError('Unable to login');
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await signOut(auth);
    return {};
  } catch (error) {
    throw TypeError('Unable to logout');
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    form: {
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
      gender: '',
    },
    data: [],
    isLoginLoading: false,
    authenticatedUser: {},
    isLogoutLoading: false,
    isRegisterLoading: false,
    isEditLoading: false,
    isGoogleLoading: false,
  },
  reducers: {
    updateCredentials: (state, action) => {
      const { name, value } = action.payload;
      state.form = {
        ...state.form,
        [name]: value,
      };
    },
    updateAuthenticatedUser: (state, action) => {
      state.authenticatedUser = {
        email: action.payload.email,
        username: action.payload.username,
        gender: action.payload.gender,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAuth.pending, (state) => {
      state.isLoginLoading = true;
    });
    builder.addCase(loginAuth.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload;
      state.isLoginLoading = false;
    });
    builder.addCase(loginAuth.rejected, (state) => {
      state.isLoginLoading = false;
    });
    builder.addCase(registerAuth.pending, (state) => {
      state.isRegisterLoading = true;
    });
    builder.addCase(registerAuth.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload;
      state.isRegisterLoading = false;
    });
    builder.addCase(registerAuth.rejected, (state) => {
      state.isRegisterLoading = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLogoutLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.authenticatedUser = null;
      state.isLogoutLoading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.isLogoutLoading = false;
    });
    builder.addCase(editAuth.pending, (state) => {
      state.isEditLoading = true;
    });
    builder.addCase(editAuth.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload;
      state.isEditLoading = false;
    });
    builder.addCase(editAuth.rejected, (state) => {
      state.isEditLoading = false;
    });
    builder.addCase(fetchDataPlayer.pending, (state) => {
      state.isFetchDataPlayerLoading = true;
    });
    builder.addCase(fetchDataPlayer.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isFetchDataPlayerLoading = false;
    });
    builder.addCase(fetchDataPlayer.rejected, (state) => {
      state.isFetchDataPlayerLoading = false;
    });
  },
});

export const { updateCredentials, updateAuthenticatedUser } = authSlice.actions;

export default authSlice.reducer;
