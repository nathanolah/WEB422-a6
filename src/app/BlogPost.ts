import { Comment } from './comment';

export class BlogPost {
    _id: String;
    title: String;
    postDate: String;
    featuredImage: String;
    post: String;
    postedBy: String;
    comments: Array<Comment>;
    category: String;
    tags: Array<String>;
    isPrivate: Boolean;
    views: number;
}

