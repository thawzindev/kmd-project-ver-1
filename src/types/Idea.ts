export interface Ideas {
  slug: string;
  title: string;
  content: string;
  file: File;
  staff: IdeaStaff | null;
  reactionsCount: ReactionsCount;
  viewsCount: Number | null;
  commentsCount: Number | null;
  currentReaction: String | null;
  category: Category | null;
  submittedAt: String | null;
  type: String | null;
  academic: Academic | null;
  isOwner: boolean;
}

export interface IdeaStaff {
  name: String | "";
  avatar: String | "";
}

export interface File {
  url: String | "";
  type: String | "";
}

export interface ReactionsCount {
  THUMBS_UP: Number | null;
  THUMBS_DOWN: Number | null;
}

export interface Category {
  slug: String | null;
  name: String | null;
  createdAt: String | null;
}

export interface Academic {
  name: String | null;
}
