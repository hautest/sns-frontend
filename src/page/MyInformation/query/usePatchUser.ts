import { useMutation } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { axiosInstance } from "src/utils";
import { addNewPostModalAtom } from "src/store";
import { userAtom } from "src/store";
import { AxiosError } from "axios";

interface PatchUserResponse {
  email: string;
  nickname: string;
}

function patchUserApi(email: string, nickname: string, token: string) {
  return axiosInstance.patch<PatchUserResponse>(
    `/users`,
    {
      email,
      nickname,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export const usePatchUser = () => {
  const { accessToken: token } = useRecoilValue(userAtom);
  const setUserEmailAndNickName = useSetRecoilState(userAtom);
  const setModal = useSetRecoilState(addNewPostModalAtom);
  return useMutation(
    ({ email, nickname }: { email: string; nickname: string }) => {
      return patchUserApi(email, nickname, token);
    },
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message);
        }
      },
      onSuccess: ({ data }) => {
        setUserEmailAndNickName((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            email: data.email,
            nickname: data.nickname,
          },
        }));
        setModal((prev) => !prev);
      },
    }
  );
};
