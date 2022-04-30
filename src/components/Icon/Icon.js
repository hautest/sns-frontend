import { Close } from "./Close";
import { Loading } from "./Loading";

export const Icon = ({ icon, size }) => {
  if (icon === "loading") {
    return <Loading size={size} />;
  } else if (icon === "close") {
    return <Close />;
  }
};
