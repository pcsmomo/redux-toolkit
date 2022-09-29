import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

// const BASE_URL = "https://jsonplaceholder.typicode.com?_limit=10";
const BASE_URL = "http://localhost:3001";
const SUBJECT = "comments";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const data = await fetch(`${BASE_URL}/${SUBJECT}`).then((res) =>
      res.json()
    );
    const likes = data.reduce((prev, curr) => [...prev, curr.likes], []).flat();
    // console.log(data.reduce((prev, curr) => [...prev, curr.likes], []));
    // console.log(likes);
    const tags = data.reduce((prev, curr) => [...prev, curr.tags], []).flat();
    const comments = data.map(({ id, body }) => ({ id, body }));
    console.table({ comments, likes, tags });
    return { comments, likes, tags };
  }

  // async (_, { dispatch }) => {
  //   const data = await fetch(
  //     `${BASE_URL}/${SUBJECT}?_limit=10`
  //   ).then((res) => res.json());
  //   dispatch(setAllComments(data));  // it will set
  // }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id) => {
    await fetch(`${BASE_URL}/${SUBJECT}/${id}`, {
      method: "DELETE",
    });

    return id;
  }
);

export const patchComment = createAsyncThunk(
  "comments/patchComment",
  async ({ id, newObj }) => {
    // const data = await fetch(
    //   `${BASE_URL}/${SUBJECT}/${id}`,
    //   {
    //     method: "PATCH",
    //     body: JSON.stringify(newObj),
    //   }
    // ).then((res) => res.json());

    await fetch(`${BASE_URL}/${SUBJECT}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(newObj),
    });

    return { id, changes: newObj };
  }
);

const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment.id,
});

const likesAdapter = createEntityAdapter({
  selectId: (like) => like.id,
});

const tagsAdapter = createEntityAdapter({
  selectId: (tag) => tag.id,
});

const commentsSlice = createSlice({
  name: "comments",
  initialState: commentsAdapter.getInitialState({
    loading: false,
    likes: likesAdapter.getInitialState(),
    tags: tagsAdapter.getInitialState(),
  }),
  reducers: {
    setAllComments: commentsAdapter.setAll,
    setOneComment: commentsAdapter.removeOne,
    setManyComments: commentsAdapter.addMany,
    updateOneComment: commentsAdapter.updateOne,
    removeLikes(state) {
      likesAdapter.removeAll(state.likes, {});
    },
    removeTagById(state, { payload: tagId }) {
      // a882d44c-0baf-4d26-844e-8f20a0aa8323
      tagsAdapter.removeOne(state.tags, tagId);
    },
  },
  extraReducers: {
    [fetchComments.pending](state) {
      state.loading = true;
    },
    [fetchComments.fulfilled](state, { payload }) {
      state.loading = false;
      commentsAdapter.setAll(state, payload.comments);
      tagsAdapter.setAll(state.tags, payload.tags);
      likesAdapter.setAll(state.likes, payload.likes);
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

export const likesSelectors = likesAdapter.getSelectors(
  (state) => state.comments.likes
);

export const {
  setAllComments,
  setOneComment,
  setManyComments,
  updateOneComment,
  removeLikes,
  removeTagById,
} = commentsSlice.actions;

export default commentsSlice.reducer;
