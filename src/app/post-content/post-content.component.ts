import { Component, OnInit, Input } from '@angular/core';
import { PostService, ApiResponse, postnews } from '../post.service';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.css']
})
export class PostContentComponent implements OnInit {

  @Input() techpost: ApiResponse[] = [];
  @Input() content: string;
  @Input() page: number;
  throttle = 300;
  scrollDistance = 1;
  constructor(private postService: PostService) { }

  ngOnInit() {
    console.log("init")
  }

  onScrollDown() {
    if (this.content == "apps" || this.content == "gadgets" || this.content == "startups") {
      if (this.techpost.length <= 20 && this.page > 1) {
        this.page = 1;
      }
      this.page = this.page + 1;
      this.postService.getPost(this.content, this.page)
        .subscribe((res) => this.onSuccess(res));
    } else {
      this.page = this.page + 1;
      this.postService.search(this.content, this.page)
        .subscribe((res) => this.onSuccess(res));
    }

  }
  onSuccess(res) {
    if (res != undefined) {
      // this.myPhotosList = [];
      res.forEach(item => {
        this.techpost.push(new postnews(item));
      });
    }

  }
}