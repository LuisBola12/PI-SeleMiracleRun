import { createSlice } from '@reduxjs/toolkit';

const activeProjectSlice = createSlice({
  name: 'activeProjectSlice',
  initialState: {
    projectName: '',
    contractType: '',
  },
  reducers: {
    updateActiveProject: (state, action) => { state.projectName = action.payload; },
    updateContract: (state, action) => { state.contractType = action.payload; },
    resetProject: (state) => { state.projectName = ''; },
  },

});


export const { updateActiveProject,resetProject, updateContract} = activeProjectSlice.actions;
export default activeProjectSlice.reducer;