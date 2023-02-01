import { FC } from "react";
import { IEditor } from "./editor.interface";
import ImageEditor from "./ImageEditor";
import TextAreaEditor from "./TextAreaEditor";

const Editor: FC<IEditor> = ({ currentTarget, logo }) => {
  return (
    <div className="editor">
      <TextAreaEditor currentTarget={currentTarget} />
      <ImageEditor currentTarget={currentTarget} logo={logo} />
    </div>
  );
};

export default Editor;
