import { atom } from "recoil";

export const userAtom = atom({
  key: "userAtom",
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
