import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  LexicalCommand,
  TextFormatType,
} from "lexical";
import Button from "./Button";
import { useEffect, useState } from "react";
import { themeColors } from "@/Utils/theme";

const EditorButton = ({
  command,
  icon,
  commandArgs,
}: {
  command: LexicalCommand<string | void>;
  commandArgs?: TextFormatType | undefined;
  icon: React.ReactNode;
}) => {
  const [editor] = useLexicalComposerContext();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const unsubscribe = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsActive(selection.hasFormat(commandArgs!));
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, [editor, commandArgs]);

  const handleClick = () => {
    editor.dispatchCommand(command, commandArgs);
  };

  return (
    <Button
      style={{ backgroundColor: isActive ? themeColors.primary : "white" }}
      onClick={handleClick}
      icon={icon}
    />
  );
};

export default EditorButton;
