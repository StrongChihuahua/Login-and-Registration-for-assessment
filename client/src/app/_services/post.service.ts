import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Post } from '../model/posts';
import { Observable } from 'rxjs';
//import { Observable } from 'rxjs/Observable'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  
  fetchPosts(): Observable<Post[]> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Post[]>(`${environment.apiEndpoint}/users/posts`, {headers: header});
  }

  addComment(id:string, value:string) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.patch(`${environment.apiEndpoint}/users/post/${id}/create/comment`, value, {headers: header});
  }
}
