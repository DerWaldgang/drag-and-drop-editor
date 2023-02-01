import { FC, useState, DragEvent, ChangeEvent } from "react";
import { createRoot } from "react-dom/client";
import { IEditor } from "./editor.interface";

const ImageEditor: FC<IEditor> = ({ currentTarget, logo }) => {
  const [isRootImage, setIsRootImage] = useState<boolean>(true);
  const [isDragImage, setIsDragImage] = useState<boolean>(false);

  const dragOverHandlerImage = (e: DragEvent) => {
    e.preventDefault();
    if (currentTarget === "image") {
      setIsDragImage(true);
    }
  };

  const dragLeaveHandlerImage = (e: DragEvent) => {
    if (currentTarget === "image") {
      setIsDragImage(false);
    }
  };

  const dropHandlerImage = (e: DragEvent) => {
    e.preventDefault();

    if (currentTarget === "image") {
      setIsDragImage(false);

      const FileInputAndImage = () => {
        const [imageClicked, setImageClicked] = useState<boolean>(false);

        const [image, setImage] = useState<string | ArrayBuffer | null>(logo);

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          const input = e.currentTarget;

          if (!input.files) return;

          const reader = new FileReader();

          reader.onload = function () {
            const dataURL = reader.result;
            setImage(dataURL);
          };

          reader.readAsDataURL(input.files[0]);
        };

        return (
          <div className="editor-image-container">
            <img
              className="image"
              src={image as string}
              onClick={() => {
                setImageClicked(true);
              }}
              draggable={false}
            />
            {imageClicked && (
              <input
                type="file"
                className="inputfile"
                onChange={(e) => handleChange(e)}
              />
            )}
          </div>
        );
      };

      if (isRootImage) {
        const fileInputRoot = createRoot(
          document.querySelector(".editor-image") as HTMLElement
        );
        fileInputRoot.render(<FileInputAndImage />);
        setIsRootImage(false);
      }
    }
  };

  return (
    <div
      className="editor-image"
      onDragOver={(e) => dragOverHandlerImage(e)}
      onDrop={(e) => dropHandlerImage(e)}
      onDragLeave={(e) => dragLeaveHandlerImage(e)}
      style={isDragImage ? { borderTop: "1px dashed" } : { border: "none" }}
    >
      {isDragImage && <div>DROP IMAGE HERE</div>}
    </div>
  );
};

export default ImageEditor;
