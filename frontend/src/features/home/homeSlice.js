import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryApi from '@api/categoryApi';
import coursesApi from '@api/coursesApi';

export const getListCategory = createAsyncThunk(
  'home/getListCategory',
  async () => {
    const res = await categoryApi.getListCategory();
    return res?.data;
  }
);
export const getCoursesHightLight = createAsyncThunk(
  'home/getCoursesHightLight',
  async () => {
    const res = await coursesApi.getCoursesHightLight();
    return res?.data;
  }
);
export const getTop10View = createAsyncThunk(
  'home/getTop10View',
  async () => {
    const res = await coursesApi.getTop10ViewCourses();
    return res?.data;
  }
);
export const getTop10New = createAsyncThunk(
  'home/getTop10New',
  async () => {
    const res = await coursesApi.getTop10NewestCourses();
    return res?.data;
  }
);
export const getTopRegisterCategory = createAsyncThunk(
  'home/getTopRegisterCategory',
  async () => {
    const res = await categoryApi.getTopRegisterCategory();
    return res?.data;
  }
);
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    category: [],
    coursesHightLight:[],
    top10View:[],
    top10New:[],
    topRegisterCategory:[]
  },
  reducers: {},
  extraReducers: {
    [getListCategory.fulfilled]: (state, action) => {
      state.category = action.payload;
    },
    [getCoursesHightLight.fulfilled]: (state, action) => {
      state.coursesHightLight = action.payload;
    },
    [getTop10View.fulfilled]: (state, action) => {
      state.top10View = action.payload;
    },
    [getTop10New.fulfilled]: (state, action) => {
      state.top10New = action.payload;
    },
    [getTopRegisterCategory.fulfilled]: (state, action) => {
      state.topRegisterCategory = action.payload;
    },
  },
});

const { reducer: homeReducer } = homeSlice;
export default homeReducer;
