import { Link } from "react-router-dom";
import { IProps } from "../../../Types";
import { Button as AntdButton } from "antd";

export const Button = ({ handleClick, children, href, ...rest }: IProps) => {
  if (href) {
    return (
      <Link to={href}>
        <AntdButton onClick={handleClick} {...rest}>
          {children}
        </AntdButton>
      </Link>
    );
  }

  return (
    <AntdButton onClick={handleClick} {...rest}>
      {children}
    </AntdButton>
  );
};
