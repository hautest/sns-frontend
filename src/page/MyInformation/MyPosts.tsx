import styled from "styled-components";

import { PostItem, LoadingIndicator } from "../../components";
import { useInfiniteScroll } from "../../hooks";
import { postItemLayout } from "../../styles/common";
import { getMyPostsRequest } from "../../store/slice/postSlice";
import { useAppSelector, useAppDispatch } from "src/store";

export function MyPosts() {
  const { data, hasMore } = useAppSelector(({ post }) => post.myPosts);
  const { loading } = useAppSelector(({ post }) => post);

  const dispatch = useAppDispatch();

  const { ref } = useInfiniteScroll(() => {
    if (hasMore) dispatch(getMyPostsRequest());
  }, [hasMore]);

  return (
    <>
      <StyledMyPosts>
        {data?.map((postsData) => (
          <PostItem key={postsData.id} {...postsData} />
        ))}
      </StyledMyPosts>
      <div ref={ref}></div>
      <LoadingIconBox>
        {loading && <LoadingIndicator size="md" />}
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
