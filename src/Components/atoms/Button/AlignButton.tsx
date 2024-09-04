import { AlignmentType } from "@/Types";
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
} from "@ant-design/icons";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Select } from "antd";
import { LexicalCommand } from "lexical";

const { Option } = Select;

const EditorSelect = ({
  command,
}: {
  command: LexicalCommand<AlignmentType>;
}) => {
  const [editor] = useLexicalComposerContext();

  const handleChange = (value: AlignmentType) => {
    editor.dispatchCommand(command, value);
  };

  return (
    <Select
      onChange={handleChange}
      defaultValue="left"
      style={{ width: "30%" }}
    >
      <Option value="center">
        <AlignCenterOutlined /> Center
      </Option>
      <Option value="left">
        <AlignLeftOutlined /> Left
      </Option>
      <Option value="right">
        <AlignRightOutlined /> Right
      </Option>
    </Select>
  );
};

export default EditorSelect;
