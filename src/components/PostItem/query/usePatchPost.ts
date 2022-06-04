import { axiosInstance } from "src/utils";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";

import { userAtom } from "src/store";
import { invalidateMyPostsQuery } from "src/page/MyInformation/query/useMyPostsQuery";
import { invalidatePostsQuery } from "src/page/MainPage/query/usePostsQuery";

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
  const { accessToken: token } = useRecoilValue(userAtom);

  return useMutation(
    ({ inputValue, id }: useMutationProps) =>
      patchPostAPI(inputValue, id, token),
    {
      onSuccess: (_, { id }) => {
        invalidatePostsQuery(({ posts }) =>
          posts.some((post) => post.id === id)
        );
        invalidateMyPostsQuery((post) => post.id === id);
      },
      onError: (error) => {
        console.dir(error);
        alert("글 수정 실패");
      },
    }
  );
};
