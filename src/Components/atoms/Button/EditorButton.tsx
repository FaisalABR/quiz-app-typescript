import { $createCodeNode, $isCodeNode } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  LexicalCommand,
  TextFormatType,
} from "lexical";
import Button from "./Button";

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

  const handleClick = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (commandArgs === "code") {
          const anchorNode = selection.anchor.getNode();

          if ($isCodeNode(anchorNode)) {
            const paragraphNode = $createParagraphNode();
            paragraphNode.append(...anchorNode.getChildren());
            anchorNode.replace(paragraphNode);
          } else {
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
          }
        } else {
          editor.dispatchCommand(command, commandArgs);
        }
      }
    });
  };

  return <Button onClick={handleClick} icon={icon} />;
};

export default EditorButton;
