type Sender = {
  username: string;
  role: string;
};

export interface Comment {
  _id: string;
  projectId: string;
  message: string;
  sender: Sender;
  hasReply: boolean;
  isReply: boolean;
  totalLikes: number;
  totalDislikes: number;
  createdAt: string;
  updatedAt: string;
}
