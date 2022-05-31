import { useInfiniteQuery } from "react-query";
import { AxiosError } from "axios";
import { useAppSelector } from "src/store";

import { PostItem } from "src/interface";
import { axiosInstance } from "src/utils";

interface GetPostAPIResponse {
  posts: PostItem[];
  lastId: string;
  token: null | string;
}

async function getMyPostAPI(lastItemId: string, token: null | string) {
  const { data } = await axiosInstance.get<GetPostAPIResponse>("/posts/my", {
    params: { take: 5, lastItemId },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}
export const useMyPostsQuery = () => {
  const token = useAppSelector(({ user }) => user.accessToken);
  return useInfiniteQuery(
    ["myPosts"],
    ({ pageParam }) => getMyPostAPI(pageParam, token),
    {
      getNextPageParam: ({ lastId, posts }) => {
        const lastItemId = posts[posts.length - 1].id;
        return lastId !== lastItemId ? lastItemId : null;
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          alert(error.response?.data.message);
        }
        console.log(error);
      },
    }
  );
};
