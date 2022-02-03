import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Platform } from '../platform';
import { PlatformService } from '../platform.service';
import { PostsListService } from '../posts-list.service';
import { SocialMediaPost } from '../socialMediaPost';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: SocialMediaPost[] = [];

  posts$: Subscription = new Subscription();

  constructor(private postsListService: PostsListService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  ngOnDestroy(): void{
    this.posts$.unsubscribe();
  }

  getPosts(){
    this.posts$ = this.postsListService.getPosts().subscribe(result => {
      this.posts = result;
    });
  }

}
