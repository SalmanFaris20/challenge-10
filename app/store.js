import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import authGames from "../redux/games/gamesSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    games: authGames,
  },
});
