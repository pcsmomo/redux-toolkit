import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, commentsSelectors } from "./commentsSlice";
import Comment from "./components/Comment";

const Comments = () => {
  const dispatch = useDispatch();
  // const total = useSelector(commentsSelectors.selectTotal);
  const allComments = useSelector(commentsSelectors.selectAll);
  // const commentWithId5 = useSelector((state) =>
  //   commentsSelectors.selectById(state, 5)
  // );

  // console.log({
  //   total,
  //   allComments,
  //   commentWithId5,
  // });

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  return allComments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));
};

export default Comments;
