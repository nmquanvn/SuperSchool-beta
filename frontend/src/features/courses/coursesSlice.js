import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import coursesApi from '@api/coursesApi';

export const getListCourses = createAsyncThunk(
  'courses/getListCourses',
  async (data) => {
    const res = await coursesApi.getCoursesWhenSearch(data);
    return res?.data;
  }
);
export const getDetailCourses = createAsyncThunk(
  'courses/getDetailCourses',
  async (id) => {
    const res = await coursesApi.getDetailCourses(id);
    return res?.data;
  }
);
const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    loading: false,
    detailCourses: [],
  },
  reducers: {},
  extraReducers: {
    [getListCourses.pending]: (state, action) => {
      state.loading = true;
    },
    [getListCourses.fulfilled]: (state, action) => {
      state.courses = action.payload;
      state.loading = false;
    },
    [getListCourses.rejected]: (state, action) => {
      state.loading = false;
    },
    [getDetailCourses.pending]: (state, action) => {
      state.loading = true;
    },
    [getDetailCourses.fulfilled]: (state, action) => {
      state.detailCourses = action.payload;
      state.loading = false;
    },
    [getDetailCourses.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer: coursesReducer } = coursesSlice;
export default coursesReducer;
