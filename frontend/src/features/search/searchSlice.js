import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import coursesApi from '@api/coursesApi';

export const getCoursesWhenSearch = createAsyncThunk(
  'search/getCoursesWhenSearch',
  async (data) => {
    const res = await coursesApi.getCoursesWhenSearch(data);
    return res?.data;
  }
);
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    courses: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getCoursesWhenSearch.pending]: (state, action) => {
      state.loading = true;
    },
    [getCoursesWhenSearch.fulfilled]: (state, action) => {
      state.courses = action.payload;
      state.loading = false;
    },
    [getCoursesWhenSearch.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer: searchReducer } = searchSlice;
export default searchReducer;
