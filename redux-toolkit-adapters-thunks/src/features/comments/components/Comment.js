import React, { memo } from "react";
import PropTypes from "prop-types";

import { Panel, Button, ButtonToolbar } from "rsuite";

const Comment = ({ id, body, onDelete, onPatch, onUpdate }) => {
  return (
    <Panel header={<h2>{id}</h2>} bordered style={{ margin: 20 }}>
      {body}
      <ButtonToolbar style={{ marginTop: 10 }}>
        <Button
          size="lg"
          color="red"
          appearance="primary"
          onClick={() => onDelete(id)}
          // onClick={() =>
          //   onDelete(comment.id).then((data) => alert(data.payload))
          // }
        >
          Delete
        </Button>
        <Button
          size="lg"
          color="cyan"
          appearance="primary"
          onClick={() => onPatch(id, { body: "NEW TEXT" })}
          // onClick={() => onUpdate(id, { body: "NEW TEXT" })}
        >
          Patch
        </Button>
      </ButtonToolbar>
    </Panel>
  );
};

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPatch: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default memo(Comment);
