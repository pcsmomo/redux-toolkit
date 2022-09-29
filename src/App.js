import React from "react";
import "rsuite/dist/rsuite.min.css";
// import "rsuite/styles/index.less"; // or 'rsuite/dist/rsuite.min.css'

import Comments from "./features/comments/Comments";
import MyDynamicForm from "./features/myDynamicForm/MyDynamicForm";

const App = () => {
  return (
    <>
      <Comments />
      <MyDynamicForm />
    </>
  );
};

export default App;
