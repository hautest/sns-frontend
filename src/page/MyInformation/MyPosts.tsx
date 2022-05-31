import styled from "styled-components";

import { PostItem, LoadingIndicator } from "../../components";
import { useInfiniteScroll } from "../../hooks";
import { postItemLayout } from "../../styles/common";
import { useMyPostsQuery } from "./useMyPostsQuery";

export function MyPosts() {
  const { data, hasNextPage, fetchNextPage, isFetching } = useMyPostsQuery();

  const { ref } = useInfiniteScroll(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage]);

  return (
    <>
      <StyledMyPosts>
        {data?.pages.map((page) =>
          page.posts.map((post) => <PostItem key={post.id} {...post} />)
        )}
      </StyledMyPosts>
      <div ref={ref}></div>
      <LoadingIconBox>
        {isFetching && <LoadingIndicator size="md" />}
      </LoadingIconBox>
    </>
  );
}

const StyledMyPosts = styled.div`
  ${postItemLayout}
`;

const LoadingIconBox = styled.div`
  margin: 0 auto;
`;
