import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import homeReducer from '@features/home/homeSlice';
import searchReducer from '@features/search/searchSlice';
import coursesReducer from '@features/courses/coursesSlice';

export default configureStore({
  reducer: {
    userReducer,
    homeReducer,
    searchReducer,
    coursesReducer,
  },
});
