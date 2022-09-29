import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const myDynamicFormAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
});

const myDynamicFormSlice = createSlice({
  name: "myDynamicForm",
  initialState: {},
  reducers: {
    createState(state, { payload: id }) {
      state[id] = myDynamicFormAdapter.getInitialState({ loading: true });
    },
    setAll(state, { payload: { id, array } }) {
      myDynamicFormAdapter.setAll(state[id], array);
    },
  },
});

export const { createState, setAll } = myDynamicFormSlice.actions;

export default myDynamicFormSlice.reducer;
