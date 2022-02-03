import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstrants } from './globalConstrants';
import { SocialMediaPost } from './socialMediaPost';

@Injectable({
  providedIn: 'root'
})
export class PostsListService {

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<SocialMediaPost[]>{
    return this.httpClient.get<SocialMediaPost[]>(GlobalConstrants.apiUrl + "/socialmediaposts");
  }

}
