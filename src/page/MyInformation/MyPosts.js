import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { PostItem } from "../../components/PostItem";
import { useInfiniteScroll } from "../../hooks";
import { postItemLayout } from "../../styles/common";
import { getMyPostsRequest } from "../../store/slice/postSlice";

export function MyPosts() {
  const { myPostsData, hasMore } = useSelector(({ post }) => post);
  const dispatch = useDispatch();

  const { ref } = useInfiniteScroll(() => {
    if (hasMore) dispatch(getMyPostsRequest());
  }, [hasMore]);

  return (
    <>
      <StyledMyPosts>
        {myPostsData?.map((postsData) => (
          <PostItem key={postsData.id} {...postsData} />
        ))}
      </StyledMyPosts>
      <div ref={ref}></div>
    </>
  );
}

const StyledMyPosts = styled.div`
  ${postItemLayout}
`;
