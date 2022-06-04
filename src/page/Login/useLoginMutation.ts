import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";

import { userAtom } from "src/store";
import { axiosInstance } from "src/utils";

interface LoginApiProps {
  email: string;
  password: string;
}

interface LoginApiResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    createdAt: string;
    email: string;
    id: string;
    nickname: string;
    updatedAt: string;
  };
}

function logInApi(body: LoginApiProps) {
  return axiosInstance.post<LoginApiResponse>(`/auth/login`, body);
}

export const useLoginMutation = () => {
  const setuserAtom = useSetRecoilState(userAtom);

  return useMutation((body: LoginApiProps) => logInApi(body), {
    onSuccess: ({ data }) => {
      setuserAtom(data);
      localStorage.setItem("refreshToken", data.refreshToken);
    },
    onError: (error) => {
      console.dir(error);
      alert("로그인 실패");
    },
  });
};
