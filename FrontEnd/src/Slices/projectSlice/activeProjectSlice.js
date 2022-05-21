import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userReducers } from "../user/reducers/reducers";

const activeProjectSlice = createSlice({
  name: 'activeProjectSlice',
  initialState: {
    projectName: "",
  },
  reducers: {
    updateActiveProject: (state, action) => { state.projectName = action.payload },
  },

});


export const { updateActiveProject } = activeProjectSlice.actions;
export default activeProjectSlice.reducer;