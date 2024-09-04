import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FormInstance } from "antd";
import { useEffect } from "react";

export const MyCustomAutoFocusPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
};

export const RenderContentFromDBPlugin = ({ form }: { form: FormInstance }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const render = () => {
      const content = form.getFieldValue("tentangDiri");
      if (content) {
        editor.update(() => {
          const parsedContent = JSON.parse(content);
          const editorState = editor.parseEditorState(parsedContent);
          editor.setEditorState(editorState);
        });
      } else {
        return;
      }
    };

    render();
  }, [editor, form.getFieldsValue()]);

  return null;
};
