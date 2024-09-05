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
      const tentangDiriContent = form.getFieldValue("tentangDiri");
      console.log(tentangDiriContent);

      if (tentangDiriContent) {
        try {
          const parsedContent = JSON.parse(tentangDiriContent);
          editor.update(() => {
            const editorState = editor.parseEditorState(parsedContent);
            editor.setEditorState(editorState);
          });
        } catch (error) {
          console.error("Error parsing editor content:", error);
        }
      }
    };

    render();
  }, [editor, form]);

  return null;
};
