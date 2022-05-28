import styled from "styled-components";

import { getPostRequest } from "../../store/slice/postSlice";
import { postItemLayout } from "../../styles/common";
import { useInfiniteScroll } from "../../hooks";
import { PostItem } from "../../components";
import { useAppSelector, useAppDispatch } from "src/store";

export function ContentBox() {
  const { data, hasMore } = useAppSelector(({ post }) => post.posts);
  const dispatch = useAppDispatch();

  const { ref } = useInfiniteScroll(() => {
    if (hasMore) dispatch(getPostRequest());
  }, [hasMore]);
  return (
    <StyledContentBox>
      {data?.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
      <div ref={ref} />
    </StyledContentBox>
  );
}

const StyledContentBox = styled.div`
  ${postItemLayout}
`;
