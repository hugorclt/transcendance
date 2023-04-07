import React from "react";
import { TRoundIconButtonProps } from "./IconButtonType";
import { RoundIconButtonContainer } from "./RoundIconButton.style";
import { COLORS } from "../../../../colors";

const RoundIconButton = ({
  size,
  color,
  disabledColor,
  backgroundColor,
  rotation,
  disabled,
  Icon,
  ...buttonProps
}: TRoundIconButtonProps) => {
  const iconColor = color ? color : COLORS.secondary;
  const iconDisabledColor = disabledColor ? disabledColor : COLORS.background;

  return (
    <RoundIconButtonContainer
      {...buttonProps}
      className={disabled ? "disabled" : ""}
      style={{
        width: size,
        height: size,
        backgroundColor: backgroundColor,
        transform: rotation,
      }}
    >
      <Icon size={size} color={disabled ? iconDisabledColor : iconColor} />
    </RoundIconButtonContainer>
  );
};

export default RoundIconButton;
