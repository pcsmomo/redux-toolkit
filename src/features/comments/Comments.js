import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  commentsSelectors,
  deleteComment,
} from "./commentsSlice";
import Comment from "./components/Comment";

const Comments = () => {
  const dispatch = useDispatch();
  // const total = useSelector(commentsSelectors.selectTotal);
  const allComments = useSelector(commentsSelectors.selectAll);
  // comment select
  // const commentWithId5 = useSelector((state) =>
  //   commentsSelectors.selectById(state, 5)
  // );
  // console.log({
  //   total,
  //   allComments,
  //   commentWithId5,
  // });

  const onDelete = useCallback(
    (id) => dispatch(deleteComment(id)),
    // if you need extra work with the payload
    // dispatch(deleteComment(id)).then((data) => console.log(data));
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  return allComments.map((comment) => (
    <Comment key={comment.id} comment={comment} onDelete={onDelete} />
  ));
};

export default Comments;
