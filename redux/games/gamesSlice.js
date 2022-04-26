import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";

export const fetchData = createAsyncThunk("games/fetchData", async () => {
  try {
    const userCollectionRef = collection(db, "games");
    const datas = await getDocs(userCollectionRef);
    const result = datas.docs.map((doc) => ({ ...doc.data() }));
    return result;
  } catch (error) {
    throw TypeError("Can't load data");
  }
});

export const updateScore = createAsyncThunk(
  "games/updateScore",
  async (credentials) => {
    console.log("ini credent", credentials);
    const { score } = credentials;
    try {
      const userDoc = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(userDoc);
      const currentScore = docSnap.data().score.game1;
      const newScore = currentScore + score;
      await updateDoc(userDoc, { "score.game1": newScore });
      await updateDoc(userDoc, { "gameplayed.game1": true });
    } catch (error) {
      throw TypeError("Can't push score");
    }
  }
);

export const gamesSlice = createSlice({
  name: "games",
  initialState: {
    isListGamesLoading: false,

    data: [],

    score: 0,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isListGamesLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isListGamesLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchData.rejected, (state) => {
      state.isListGamesLoading = false;
    });
    builder.addCase(updateScore.pending, (state) => {
      state.isListGamesLoading = true;
    });
    builder.addCase(updateScore.fulfilled, (state, action) => {
      const score = action.payload;
      state.score = score;
      state.isListGamesLoading = false;
    });
    builder.addCase(updateScore.rejected, (state) => {
      state.isListGamesLoading = false;
    });
  },
});

export default gamesSlice.reducer;
