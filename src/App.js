import React from "react";
import "rsuite/dist/rsuite.min.css";
// import "rsuite/styles/index.less"; // or 'rsuite/dist/rsuite.min.css'

import { Button } from "rsuite";

import Comments from "./features/comments/Comments";

const App = () => {
  return (
    <div>
      <Button>Hello</Button>
      <Comments />
    </div>
  );
};

export default App;
