import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
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

export const fetchLeaderboard = createAsyncThunk(
  "games/fetchLeaderboard",
  async () => {
    try {
      const userCollectionRef = collection(db, "users");
      const q = query(userCollectionRef, orderBy("score.game1", "desc"));
      const data = await getDocs(q);
      const result = data.docs.map((doc) => ({ ...doc.data() }));
      return result;
    } catch (error) {
      throw TypeError("Can't push score");
    }
  }
);

export const gamesSlice = createSlice({
  name: "games",
  initialState: {
    isListGamesLoading: false,
    isLeadeLoading: false,
    data: [],
    dataLead: [],
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
      state.isListGamesLoading = false;
      state.score = action.payload;
    });
    builder.addCase(updateScore.rejected, (state) => {
      state.isListGamesLoading = false;
    });
    builder.addCase(fetchLeaderboard.pending, (state) => {
      state.isLeadeLoading = true;
    });
    builder.addCase(fetchLeaderboard.fulfilled, (state, action) => {
      state.isLeadeLoading = false;
      state.dataLead = action.payload;
    });
    builder.addCase(fetchLeaderboard.rejected, (state) => {
      state.isLeadeLoading = false;
    });
  },
});

export default gamesSlice.reducer;
