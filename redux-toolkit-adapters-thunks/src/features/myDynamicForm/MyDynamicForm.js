import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonToolbar } from "rsuite";
import { createState, setAll } from "./MyDynamicFormSlice";
import { generate } from "shortid";

const MyDynamicForm = (props) => {
  const dispatch = useDispatch();
  const allIds = useSelector((state) => Object.keys(state.myDynamicForm));

  return (
    <>
      <Button onClick={() => dispatch(createState(generate()))}>
        Create a dynamic createEntityAdapter state
      </Button>
      {allIds.map((id) => (
        <ButtonToolbar key={id} style={{ padding: 20 }}>
          <Button
            color="red"
            appearance="primary"
            onClick={() =>
              dispatch(
                setAll({
                  id,
                  array: [
                    { id: generate(), name: generate(), number: Math.random() },
                    { id: generate(), name: generate(), number: Math.random() },
                    { id: generate(), name: generate(), number: Math.random() },
                  ],
                })
              )
            }
          >
            Set All
          </Button>
          <Button color="violet" appearance="primary">
            violet
          </Button>
        </ButtonToolbar>
      ))}
    </>
  );
};

export default MyDynamicForm;
