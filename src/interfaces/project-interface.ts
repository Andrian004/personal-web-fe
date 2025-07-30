type Image = {
  imgUrl: string;
  public_id: string;
};

export interface Project {
  id: string;
  github: string;
  liked: boolean;
  title: string;
  image: Image;
  videoId: string;
  description: string;
  totalComments: number;
  totalLikes: number;
  url: string;
}
