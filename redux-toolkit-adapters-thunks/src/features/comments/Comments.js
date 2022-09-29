import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  deleteComment,
  patchComment,
  updateOneComment,
  removeLikes,
  removeTagById,
  commentsSelectors,
  likesSelectors,
} from "./commentsSlice";
import Comment from "./components/Comment";
import { Button } from "rsuite";

const Comments = () => {
  const dispatch = useDispatch();
  // const total = useSelector(commentsSelectors.selectTotal);
  const allComments = useSelector(commentsSelectors.selectAll);
  const allNestedLikes = useSelector(likesSelectors.selectAll);
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

  const onPatch = useCallback(
    (id, newObj) => dispatch(patchComment({ id, newObj })),
    [dispatch]
  );

  const onUpdate = useCallback(
    (id, newObj) => {
      dispatch(updateOneComment({ id, changes: newObj }));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  console.table({ allNestedLikes });

  return (
    <>
      <Button
        color="yellow"
        appearance="primary"
        size="lg"
        onClick={() => dispatch(removeLikes())}
      >
        DELETE ALL LIKES
      </Button>
      <Button
        color="blue"
        appearance="primary"
        size="lg"
        onClick={() =>
          dispatch(removeTagById("a882d44c-0baf-4d26-844e-8f20a0aa8323"))
        }
      >
        DELETE TAG BY ID
      </Button>
      {allComments.map(({ id, body }) => (
        <Comment
          key={id}
          id={id}
          body={body}
          onDelete={onDelete}
          onPatch={onPatch}
          onUpdate={onUpdate}
        />
      ))}
    </>
  );
};

export default Comments;
