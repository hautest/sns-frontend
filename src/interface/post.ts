export interface PostItem {
  title: string;
  desc: string;
  id: string;
  author: { nickname: string };
  comments: Comment[];
  authorId: string;
}

export interface Comment {
  commenter: { id: string; nickname: string };
  desc: string;
  id: string;
}

export interface GetComment {
  commenterId: string;
  createdAt: string;
  desc: string;
  id: string;
  postId: string;
  updatedAt: string;
}
