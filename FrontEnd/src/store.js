import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/user/userSlice";
import activeProjectSlice from "./Slices/projectSlice/activeProjectSlice";

const reducers = combineReducers({
  user: userSlice,
  activeProject: activeProjectSlice,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
