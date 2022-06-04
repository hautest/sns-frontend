import { useInfiniteQuery, useQuery } from "react-query";
import { AxiosError } from "axios";
import { useRecoilValue } from "recoil";

import { queryClient, userAtom } from "src/store";
import { PostItem } from "src/interface";
import { axiosInstance } from "src/utils";

interface GetPostAPIResponse {
  posts: PostItem[];
  lastId: string;
  token: null | string;
}

const QUERY_KEY = ["myPosts"];

async function getMyPostAPI(lastItemId: string, token: null | string) {
  const { data } = await axiosInstance.get<GetPostAPIResponse>("/posts/my", {
    params: { take: 5, lastItemId },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export const useMyPostsQuery = () => {
  const { accessToken: token } = useRecoilValue(userAtom);
  return useInfiniteQuery(
    QUERY_KEY,
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
      notifyOnChangeProps: [
        "data",
        "hasNextPage",
        "fetchNextPage",
        "isFetching",
      ],
    }
  );
};

export const invalidateMyPostsQuery = (
  refetchPageFunc: (post: PostItem) => boolean
) => {
  queryClient.invalidateQueries<GetPostAPIResponse>(QUERY_KEY, {
    refetchPage: ({ posts }) => {
      return posts.some(refetchPageFunc);
    },
  });
};
