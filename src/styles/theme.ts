const colors = {
  black: "#000000",
  gray1: "#333333",
  gray2: "#4F4F4F",
  gray3: "#828282",
  gray4: "#BDBDBD",
  gray5: "#E0E0E0",
  gray6: "#F2F2F2",
  primary: "#0085FF",
  warn: "#EB5757",
  white: "#ffffff",
  success: "#219653",
  hoverColor: "#0065c2",
};

const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "32px",
  xl: "64px",
};

export const theme = {
  colors,
  spacing,
};

export type ThemeColorType = keyof typeof colors;
export type ThemeSpacingType = keyof typeof spacing;
