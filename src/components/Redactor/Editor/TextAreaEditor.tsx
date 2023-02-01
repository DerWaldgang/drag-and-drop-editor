import { FC, useState, DragEvent } from "react";
import { createRoot } from "react-dom/client";
import { IEditor } from "./editor.interface";

const TextAreaEditor: FC<Pick<IEditor, "currentTarget">> = ({
  currentTarget,
}) => {
  const [isDragText, setIsDragText] = useState<boolean>(false);
  const [isRootText, setIsRootText] = useState<boolean>(true);

  const dragOverHandlerText = (e: DragEvent) => {
    e.preventDefault();
    if (currentTarget === "text") {
      setIsDragText(true);
    }
  };

  const dragLeaveHandlerText = (e: DragEvent) => {
    if (currentTarget === "text") {
      setIsDragText(false);
    }
  };

  const dropHandlerText = (e: DragEvent) => {
    e.preventDefault();

    if (currentTarget === "text") {
      setIsDragText(false);

      const Textarea = () => {
        // Легко можно сделать контролируемым, но в ТЗ ничего не было сказано :)
        return <textarea className="textarea"></textarea>;
      };

      if (isRootText) {
        const textareaRoot = createRoot(
          document.querySelector(".editor-textarea") as HTMLInputElement
        );
        textareaRoot.render(<Textarea />);
        setIsRootText(false);
      }
    }
  };

  return (
    <div
      className="editor-textarea"
      onDragOver={(e) => dragOverHandlerText(e)}
      onDrop={(e) => dropHandlerText(e)}
      onDragLeave={(e) => dragLeaveHandlerText(e)}
      style={isDragText ? { borderBottom: "1px dashed" } : { border: "none" }}
    >
      {isDragText && <div>DROP TEXT HERE</div>}
    </div>
  );
};

export default TextAreaEditor;
