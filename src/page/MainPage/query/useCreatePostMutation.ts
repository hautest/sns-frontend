import { useMutation } from "react-query";
import { useSetRecoilState, useRecoilValue } from "recoil";

import { axiosInstance } from "src/utils";
import { addNewPostModalAtom, userAtom } from "src/store";
import { invalidatePostsQuery } from "./usePostsQuery";

interface UseCreatePostPorps {
  desc: string;
  title: string;
  token: string;
}

async function postCreatePost({ desc, title, token }: UseCreatePostPorps) {
  return await axiosInstance.post(
    `/posts`,
    { desc, title },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

export const useCreatePostMutation = () => {
  const setShowModal = useSetRecoilState(addNewPostModalAtom);
  const { accessToken: token } = useRecoilValue(userAtom);
  return useMutation(
    ({ desc, title }: Omit<UseCreatePostPorps, "token">) =>
      postCreatePost({ desc, title, token }),
    {
      onSuccess: () => {
        invalidatePostsQuery((_, index) => !index);
        alert("새 글 작성 완료");
        setShowModal(false);
      },
      onError: (error) => {
        console.dir(error);
      },
    }
  );
};
