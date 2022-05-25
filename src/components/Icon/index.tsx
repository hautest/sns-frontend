import { useTheme } from "styled-components";
import { ReactComponent as close } from "./close.svg";
import { ReactComponent as loading } from "./loading.svg";

import { ThemeColorType } from "src/styles";

const icons = {
  close,
  loading,
};

interface IconInterface {
  size: string;
  name: "close" | "loading";
  color: ThemeColorType;
}

export const Icon = ({
  size = "16px",
  name,
  color = "black",
}: IconInterface) => {
  const IconComponent = icons[name];
  const { colors } = useTheme();

  return <IconComponent width={size} height={size} color={colors[color]} />;
};
