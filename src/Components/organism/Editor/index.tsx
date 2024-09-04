import {
  $getRoot,
  CLEAR_EDITOR_COMMAND,
  EditorState,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { Button, EditorButton } from "@/Components/atoms";
import {
  BoldOutlined,
  ClearOutlined,
  CodeOutlined,
  ItalicOutlined,
  RedoOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { INITIAL_CONFIG } from "@/Constants";
import { FormInstance } from "antd";
import EditorSelect from "@/Components/atoms/Button/AlignButton";

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

const ClearButton = () => {
  const [editor] = useLexicalComposerContext();

  const handleClick = () => {
    editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
  };

  return <Button handleClick={handleClick} icon={<ClearOutlined />} />;
};

export const Editor = ({ form }: { form: FormInstance }) => {
  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const content = JSON.stringify($getRoot());

      form.setFieldsValue({ tentangDiri: content });
    });
  };

  return (
    <LexicalComposer initialConfig={INITIAL_CONFIG}>
      <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
        <EditorButton
          command={FORMAT_TEXT_COMMAND}
          commandArgs="bold"
          icon={<BoldOutlined />}
        />
        <EditorButton
          command={FORMAT_TEXT_COMMAND}
          commandArgs="italic"
          icon={<ItalicOutlined />}
        />
        <EditorButton
          command={FORMAT_TEXT_COMMAND}
          commandArgs="underline"
          icon={<UnderlineOutlined />}
        />
        <EditorButton
          command={FORMAT_TEXT_COMMAND}
          commandArgs="strikethrough"
          icon={<StrikethroughOutlined />}
        />
        <ClearButton />
        <EditorButton command={UNDO_COMMAND} icon={<UndoOutlined />} />
        <EditorButton command={REDO_COMMAND} icon={<RedoOutlined />} />
        <EditorButton
          command={FORMAT_ELEMENT_COMMAND}
          commandArgs="code"
          icon={<CodeOutlined />}
        />
        <EditorSelect command={FORMAT_ELEMENT_COMMAND} />
      </div>
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-content" />}
        placeholder={
          <div className="editor-placeholder">Enter some text...</div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin />
    </LexicalComposer>
  );
};
