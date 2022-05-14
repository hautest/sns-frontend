import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { getPostRequest } from "../../store/slice/postSlice";
import { flexSpaceBetween } from "../../styles/common";
import { useInfiniteScroll } from "../../hooks";
import { PostItem } from "./PostItem";

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
        <PostItem {...post} />
      ))}
      <div ref={ref} />
    </StyledContentBox>
  );
}

const StyledContentBox = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  border-radius: 16px;
  ${flexSpaceBetween}
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: 0 10px;
`;
