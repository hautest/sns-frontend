import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";

import { axiosInstance } from "src/utils";
import { invalidatePostsQuery } from "src/page/MainPage/query/usePostsQuery";
import { invalidateMyPostsQuery } from "src/page/MyInformation/query/useMyPostsQuery";
import { userAtom } from "src/store";

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
  const { accessToken: token } = useRecoilValue(userAtom);

  return useMutation(
    ({ postId, desc }: useMutationProps) => postCommentAPI(postId, desc, token),
    {
      onError: () => {
        alert("댓글 작성 실패");
      },
      onSuccess: (_, { postId }) => {
        invalidatePostsQuery(({ posts }) =>
          posts.some((post) => post.id === postId)
        );
        invalidateMyPostsQuery((post) => post.id === postId);
      },
    }
  );
};
