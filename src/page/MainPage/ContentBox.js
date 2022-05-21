import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { getPostRequest } from "../../store/slice/postSlice";
import { postItemLayout } from "../../styles/common";
import { useInfiniteScroll } from "../../hooks";
import { PostItem } from "../../components/PostItem";

export function ContentBox() {
  const postDataArray = useSelector(({ post }) => post.postData);
  const hasMore = useSelector(({ post }) => post.hasMore);
  const dispatch = useDispatch();

  const { ref } = useInfiniteScroll(() => {
    if (hasMore) dispatch(getPostRequest());
  }, [hasMore]);
  return (
    <StyledContentBox>
      {postDataArray?.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
      <div ref={ref} />
    </StyledContentBox>
  );
}

const StyledContentBox = styled.div`
  ${postItemLayout}
`;
