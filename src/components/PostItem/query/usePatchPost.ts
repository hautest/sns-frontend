import { axiosInstance } from "src/utils";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

import { userState } from "src/store";

function patchPostAPI(inputValue: string, id: string, token: null | string) {
  return axiosInstance.patch(
    `/posts/${id}`,
    { desc: inputValue },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

interface useMutationProps {
  inputValue: string;
  id: string;
}

export const usePatchPost = () => {
  const queryClient = useQueryClient();
  const { accessToken: token } = useRecoilValue(userState);
  return useMutation(
    ({ inputValue, id }: useMutationProps) =>
      patchPostAPI(inputValue, id, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        queryClient.invalidateQueries("myPosts");
      },
      onError: (error) => {
        console.dir(error);
        alert("글 수정 실패");
      },
    }
  );
};
