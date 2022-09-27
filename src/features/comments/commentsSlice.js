import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    return await fetch(
      "https://jsonplaceholder.typicode.com/comments?_limit=10"
    ).then((res) => res.json());
  }

  // async (_, { dispatch }) => {
  //   const data = await fetch(
  //     "https://jsonplaceholder.typicode.com/comments?_limit=10"
  //   ).then((res) => res.json());
  //   dispatch(setAllComments(data));  // it will set
  // }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: "DELETE",
    });

    return id;
  }
);

export const patchComment = createAsyncThunk(
  "comments/patchComment",
  async ({ id, newObj }) => {
    // const data = await fetch(
    //   `https://jsonplaceholder.typicode.com/comments/${id}`,
    //   {
    //     method: "PATCH",
    //     body: JSON.stringify(newObj),
    //   }
    // ).then((res) => res.json());

    await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(newObj),
    });

    return { id, changes: newObj };
  }
);

const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment.id,
});

const commentsSlice = createSlice({
  name: "comments",
  initialState: commentsAdapter.getInitialState({ loading: false }),
  reducers: {
    setAllComments: commentsAdapter.setAll,
    setOneComment: commentsAdapter.removeOne,
    setManyComments: commentsAdapter.addMany,
    updateOneComment: commentsAdapter.updateOne,
  },
  extraReducers: {
    [fetchComments.pending](state) {
      state.loading = true;
    },
    [fetchComments.fulfilled](state, { payload }) {
      state.loading = false;
      commentsAdapter.setAll(state, payload);
    },
    [fetchComments.rejected](state) {
      state.loading = false;
    },
    [deleteComment.pending](state) {
      state.loading = true;
    },
    [deleteComment.fulfilled](state, { payload: id }) {
      state.loading = false;
      commentsAdapter.removeOne(state, id);
    },
    [deleteComment.rejected](state) {
      state.loading = false;
    },
    [patchComment.pending](state) {
      state.loading = true;
    },
    [patchComment.fulfilled](state, { payload }) {
      state.loading = false;
      commentsAdapter.updateOne(state, {
        id: payload.id,
        changes: payload.changes,
      });
    },
    [patchComment.rejected](state) {
      state.loading = false;
    },
  },
});

export const commentsSelectors = commentsAdapter.getSelectors(
  (state) => state.comments
);

// export const { selectIds, selectEntities, selectById, selectTotal, selectAll } =
//   commentsSelectors;

export const {
  setAllComments,
  setOneComment,
  setManyComments,
  updateOneComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
