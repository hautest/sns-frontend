import styled from "styled-components";

import { postItemLayout } from "../../styles/common";
import { useInfiniteScroll } from "../../hooks";
import { PostItem, LoadingIndicator } from "../../components";
import { usePostsQuery } from "./usePostsQuery";

export function ContentBox() {
  const { data, hasNextPage, fetchNextPage, isFetching } = usePostsQuery();

  const { ref } = useInfiniteScroll(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage]);
  return (
    <StyledContentBox>
      {data?.pages.map((page) =>
        page.posts.map((post) => <PostItem key={post.id} {...post} />)
      )}
      <div ref={ref} />
      <LoadingIconBox>
        {isFetching && <LoadingIndicator size="md" />}
      </LoadingIconBox>
    </StyledContentBox>
  );
}

const StyledContentBox = styled.div`
  ${postItemLayout}
`;

const LoadingIconBox = styled.div`
  margin: 0 auto;
`;
