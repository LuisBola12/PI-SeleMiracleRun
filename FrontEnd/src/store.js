import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/user/userSlice";
import activeProjectSlice from "./Slices/projectSlice/activeProjectSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
  user: userSlice,
  activeProject: activeProjectSlice,
});

const rootPersistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(rootPersistConfig, reducers);


const store = configureStore({
  reducer: persistedReducer,
});

export default store;
