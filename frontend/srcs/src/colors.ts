export const COLORS = {
  background: "#19191A",
  primary: "#fdfdfd",
  secondary: "#DB504A",
  tertiary: "#464545",
  green: "#0CFC07",
  orange: "#FFA800",
  blue: "#075AFC",
  grey: "#404040",
  lightgrey: "#B6B6B6",
  border: "#464545",
  disabled: "#2d2d2d",
  purple: "#7c3296",
  white: "#ffffff",
  black: "#000000",
  darkgrey: "#737373",
  darkergrey: "#292929",
  red: "#FF0000",
};

export const convertStatusColor = (status: string): string => {
  switch (status) {
    case "AWAY":
      return COLORS.orange;
    case "DISCONNECTED":
      return COLORS.disabled;
    case "CONNECTED":
      return COLORS.green;
    case "GAME":
      return COLORS.blue;
    case "LOBBY":
      return COLORS.purple;
    default:
      return COLORS.green;
  }
};
