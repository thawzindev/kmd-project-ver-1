import { IdeaStaff, ReactionsCount } from "./Idea";

export interface Comments {
  id: string;
  content: string;
  isAnonymous: boolean;
  staff: IdeaStaff | null;
  submittedAt: String | null;
  type: String | null;
  reactionsCount: ReactionsCount;
  isOwner: boolean;
  currentReaction: String | null;
}
