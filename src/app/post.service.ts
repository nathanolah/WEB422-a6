import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from './BlogPost';

const perPage = 6;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  // Get posts
  getPosts(page, tag, category): Observable<BlogPost[]> {
    if (tag != null && tag.charAt(0) != '#') {
      return this.http.get<BlogPost[]>(`https://pure-hamlet-68748.herokuapp.com/api/posts?page=${page}&perPage=${perPage}&tag=${tag}`);
    } else if (category != null) {
      return this.http.get<BlogPost[]>(`https://pure-hamlet-68748.herokuapp.com/api/posts?page=${page}&perPage=${perPage}&category=${category}`);
    } else {
      return this.http.get<BlogPost[]>(`https://pure-hamlet-68748.herokuapp.com/api/posts?page=${page}&perPage=${perPage}`);
    }
  }

  // Get post by id
  getPostById(id): Observable<BlogPost> {
    return this.http.get<BlogPost>(`https://pure-hamlet-68748.herokuapp.com/api/posts/${id}`);
  }

  // Get categories
  getCategories(): Observable<any> {
    return this.http.get<any>(`https://pure-hamlet-68748.herokuapp.com/api/categories`);
  }

  // Get tags
  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`https://pure-hamlet-68748.herokuapp.com/api/tags`);
  }

  // Get all posts
  getAllPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`https://pure-hamlet-68748.herokuapp.com/api/posts?page=${1}&perPage=${Number.MAX_SAFE_INTEGER}`);
  }

  // New post
  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>(`https://pure-hamlet-68748.herokuapp.com/api/posts`, data);
  }

  // Update post
  updatePostById(id: String, data: BlogPost): Observable<any> {
    return this.http.put<any>(`https://pure-hamlet-68748.herokuapp.com/api/posts/${id}`, data);
  }

  // Delete post
  deletePostById(id: String): Observable<any> {
    return this.http.delete<any>(`https://pure-hamlet-68748.herokuapp.com/api/posts/${id}`);
  }

}
