import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    accessToken: "",
    refreshToken: "",
    user: {
      createdAt: "",
      email: "",
      id: "",
      nickname: "",
      updatedAt: "",
    },
  },
});
