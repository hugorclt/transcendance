import { IconType } from "react-icons";

export type TRoundIconButtonProps = {
  size?: number;
  color?: string;
  backgroundColor?: string;
  rotation?: string;
  disabled?: boolean;
  disabledColor?: string;
  Icon: React.ElementType;
  onClick?: React.MouseEventHandler<HTMLElement>;
};
