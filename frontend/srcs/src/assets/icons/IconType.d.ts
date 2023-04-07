export type TIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export type IconType = (props: TIconProps) => JSX.Element;
