import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "../features/comments/commentsSlice";
import myDynamicFormReducer from "../features/myDynamicForm/MyDynamicFormSlice";

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    myDynamicForm: myDynamicFormReducer,
  },
});
