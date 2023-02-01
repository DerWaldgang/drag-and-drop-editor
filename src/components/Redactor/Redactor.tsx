import { useState, DragEvent, FC } from "react";
import logo from "../../assets/react.svg";

import Editor from "./Editor/Editor";

const Redactor: FC = () => {
  const [currentTarget, setCurrentTarget] = useState<string>("");

  const dragStartHandlerText = (e: DragEvent) => {
    setCurrentTarget("text");
  };
  const dragStartHandlerImage = (e: DragEvent) => {
    setCurrentTarget("image");
  };

  return (
    <div className="redactor">
      <div className="board">
        <div className="board-title">UI</div>

        <div className="board-ui">
          <div draggable onDragStart={(e) => dragStartHandlerText(e)}>
            text
          </div>
          <img
            onDragStart={(e) => dragStartHandlerImage(e)}
            className="image"
            src={logo}
            alt="image"
          />
        </div>
      </div>
      <Editor currentTarget={currentTarget} logo={logo} />
    </div>
  );
};

export default Redactor;
