import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Post } from 'src/models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url:string = 'assets/users.json';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  };

  postUrl: string = 'https://jsonplaceholder.typicode.com/posts/';

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get(`${this.url}`)
  }

  getPost(idPost: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.postUrl}/${idPost}`);
  }

  updatePost(idPost: number): Observable<Post> {
    const post: Post = {
      userId: 1,
      title: "HI from G-SCOP",
      body: "body....",
      id: 1
    };
    return this.httpClient.put<Post>(`${this.postUrl}/${idPost}`, post, this.httpOptions);
  }
}
