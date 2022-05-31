import { useInfiniteQuery } from "react-query";
import { AxiosError } from "axios";

import { axiosInstance } from "src/utils";
import { PostItem } from "src/interface";

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
export const usePostsQuery = () => {
  return useInfiniteQuery(["posts"], ({ pageParam }) => getPostAPI(pageParam), {
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
  });
};
