import { useInfiniteQuery, InfiniteData } from "react-query";
import { AxiosError } from "axios";

import { axiosInstance } from "src/utils";
import { PostItem } from "src/interface";
import { queryClient } from "src/store";

interface GetPostAPIResponse {
  posts: PostItem[];
  lastId: string;
}

async function getPostAPI(lastItemId: string) {
  const { data } = await axiosInstance.get<GetPostAPIResponse>("/posts", {
    params: { take: 5, lastItemId },
  });
  return data;
}

const QUERY_KEY = ["posts"];

export const usePostsQuery = () => {
  return useInfiniteQuery(QUERY_KEY, ({ pageParam }) => getPostAPI(pageParam), {
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
    notifyOnChangeProps: ["data", "hasNextPage", "fetchNextPage", "isFetching"],
    refetchOnWindowFocus: false,
  });
};

export const invalidatePostsQuery = (
  refetchPage: (
    lastPage: GetPostAPIResponse,
    index: number,
    allPages: GetPostAPIResponse[]
  ) => boolean
) => {
  queryClient.invalidateQueries<GetPostAPIResponse>(QUERY_KEY, {
    refetchPage,
  });
};
