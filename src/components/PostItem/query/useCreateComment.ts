import { useMutation, useQueryClient } from "react-query";

import { axiosInstance } from "src/utils";
import { useAppSelector } from "src/store";

function postCommentAPI(postId: string, desc: string, token: null | string) {
  return axiosInstance.post(
    `/comments`,
    { postId, desc },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

interface useMutationProps {
  postId: string;
  desc: string;
}

export const useCreateComment = () => {
  const token = useAppSelector(({ user }) => user.accessToken);
  const queryClient = useQueryClient();
  return useMutation(
    ({ postId, desc }: useMutationProps) => postCommentAPI(postId, desc, token),
    {
      onError: () => {
        alert("댓글 작성 실패");
      },
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        queryClient.invalidateQueries("myPosts");
      },
    }
  );
};
