import { useTheme } from "styled-components";
import { ReactComponent as close } from "./close.svg";
import { ReactComponent as loading } from "./loading.svg";

import { ThemeColorType, ThemeSpacingType } from "src/styles";

const icons = {
  close,
  loading,
};

interface IconProps {
  size?: ThemeSpacingType;
  name: "close" | "loading";
  color?: ThemeColorType;
}

export const Icon = ({ size = "md", name, color = "black" }: IconProps) => {
  const IconComponent = icons[name];
  const { colors, spacing } = useTheme();

  const iconSize = spacing[size];

  return (
    <IconComponent width={iconSize} height={iconSize} color={colors[color]} />
  );
};
