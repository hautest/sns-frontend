import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";

import { axiosInstance } from "src/utils";
import { addNewPostModalAtom } from "src/store";
import { useAppSelector } from "src/store";

interface UseCreatePostPorps {
  desc: string;
  title: string;
}

async function postCreatePost(
  desc: string,
  title: string,
  token: null | string
) {
  return await axiosInstance.post(
    `/posts`,
    { desc, title },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

export const useCreatePost = () => {
  const setShowModal = useSetRecoilState(addNewPostModalAtom);
  const token = useAppSelector(({ user }) => user.accessToken);
  return useMutation(
    ({ desc, title }: UseCreatePostPorps) => postCreatePost(desc, title, token),
    {
      onSuccess: () => {
        alert("새 글 작성 완료");
        setShowModal(false);
      },
      onError: (error) => {
        console.dir(error);
      },
    }
  );
};
