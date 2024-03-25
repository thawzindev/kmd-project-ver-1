export interface Ideas {
    slug: string;
    title: string;
    content: string;
    file: string | null;
    staff: IdeaStaff | null;
    reactionsCount: ReactionsCount;
    viewsCount: Number | null;
    commentsCount: Number | null;
    currentReaction: String | null;
    category: Category | null;
    submittedAt: String | null;
    type: String | null;
    academic: Academic | null;
  }

  export interface IdeaStaff{
    name : String | null;
    avatar : String | null;
  }

  export interface ReactionsCount{
    THUMBS_UP : Number | null;
    THUMBS_DOWN : Number | null;
  }

  export interface Category{
    slug : String | null;
    name : String | null;
    createdAt : String | null;
  }

  export interface Academic{
    name : String | null;
  }