import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { PostItem, LoadingIndicator } from "../../components";
import { useInfiniteScroll } from "../../hooks";
import { postItemLayout } from "../../styles/common";
import { getMyPostsRequest } from "../../store/slice/postSlice";

export function MyPosts() {
  const { data, hasMore } = useSelector(({ post }) => post.myPosts);
  const { loading } = useSelector(({ post }) => post);

  const dispatch = useDispatch();

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
        {loading && <LoadingIndicator size="16px" />}
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
