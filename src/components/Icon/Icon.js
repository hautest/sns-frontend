import { useTheme } from "styled-components";
import { ReactComponent as close } from "./close.svg";
import { ReactComponent as loading } from "./loading.svg";

const icons = {
  close,
  loading,
};

export const Icon = ({ size = "16px", name, color = "black" }) => {
  const IconComponent = icons[name];
  const { colors } = useTheme();

  return <IconComponent width={size} height={size} color={colors[color]} />;
};
