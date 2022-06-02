import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";

import { userState } from "src/store";
import { axiosInstance } from "src/utils";

interface LoginApiProps {
  email: string;
  password: string;
}

function logInApi({ email, password }: LoginApiProps) {
  return axiosInstance.post(`/auth/login`, { email, password });
}

export const useLogin = () => {
  const setUserState = useSetRecoilState(userState);
  return useMutation(
    ({ email, password }: LoginApiProps) => logInApi({ email, password }),
    {
      onSuccess: ({ data }) => {
        setUserState(data);
        localStorage.setItem("accessToken", data.accessToken);
      },
      onError: (error) => {
        console.dir(error);
        alert("로그인 실패");
      },
    }
  );
};
