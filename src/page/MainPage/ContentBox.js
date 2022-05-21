import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { getPostRequest } from "../../store/slice/postSlice";
import { postItemLayout } from "../../styles/common";
import { useInfiniteScroll } from "../../hooks";
import { PostItem } from "../../components";

export function ContentBox() {
  const { data, hasMore } = useSelector(({ post }) => post.posts);
  const dispatch = useDispatch();

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
