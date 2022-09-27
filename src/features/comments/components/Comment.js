import React from "react";
import PropTypes from "prop-types";

import { Panel, Button, ButtonToolbar } from "rsuite";

const Comment = ({ comment, onDelete }) => {
  return (
    <Panel header={<h2>{comment.id}</h2>} bordered style={{ margin: 20 }}>
      {comment.body}
      <ButtonToolbar style={{ marginTop: 10 }}>
        <Button
          size="lg"
          color="red"
          appearance="primary"
          onClick={() => onDelete(comment.id)}
          // onClick={() =>
          //   onDelete(comment.id).then((data) => alert(data.payload))
          // }
        >
          Delete
        </Button>
        <Button size="lg" color="cyan" appearance="primary">
          Patch
        </Button>
      </ButtonToolbar>
    </Panel>
  );
};

Comment.propTypes = {
  onDelete: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
};

export default Comment;
