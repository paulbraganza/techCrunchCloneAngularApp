import { Component, OnInit } from '@angular/core';
import { PostService, ApiResponse, postnews } from '../post.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private postService: PostService) { }
  posts: ApiResponse[] = []
  postsTemp: ApiResponse[] = []
  keyword: string
  content: string
  page: number
  ngOnInit() {
    this.content = "apps"
    this.page = 1
    console.log("Menu component initiated..")
    console.log("Making a request for apps post..")
    this.postService.getPost("apps", this.page)
      .subscribe(posts => this.posts = posts);
    console.log("Request for apps post complete..")
  }

  //Handling all the calls 
  handleCall(element: string): void {
    //selecting the link
    this.keyword = null;
    console.log("In Handle call function...")
    let apps = document.getElementsByName("apps")
    let gadgets = document.getElementsByName('gadgets');
    let startups = document.getElementsByName('startup');
    switch (element) {
      case "apps": {
        this.content = "apps"
        this.page = 1
        console.log("User wants apps post ..")
        Array.prototype.forEach.call(apps, function (a) {
          a.className = "link mat-button active"
        });
        Array.prototype.forEach.call(gadgets, function (a) {
          a.className = "link mat-button"
        });
        Array.prototype.forEach.call(startups, function (a) {
          a.className = "link mat-button"
        });
        this.postService.getPost("apps", this.page)
          .subscribe(posts => this.posts = posts);
        console.log("Request for apps post complete..")
        break;
      }
      case "gadgets": {
        this.content = "gadgets"
        this.page = 1
        console.log("User wants gadgets post ..")
        Array.prototype.forEach.call(apps, function (a) {
          a.className = "link mat-button"
        });
        Array.prototype.forEach.call(gadgets, function (a) {
          a.className = "link mat-button active"
        });
        Array.prototype.forEach.call(startups, function (a) {
          a.className = "link mat-button"
        });
        this.postService.getPost("gadgets", this.page)
          .subscribe(posts => this.posts = posts);
        console.log("Request for gadgets post complete..")
        break;
      }
      case "startup": {
        this.content = "startups"
        this.page = 1
        console.log("User wants startups post ..")
        Array.prototype.forEach.call(apps, function (a) {
          a.className = "link mat-button"
        });
        Array.prototype.forEach.call(gadgets, function (a) {
          a.className = "link mat-button"
        });
        Array.prototype.forEach.call(startups, function (a) {
          a.className = "link mat-button active"
        });
        this.postService.getPost("startups", this.page)
          .subscribe(posts => this.posts = posts);
        console.log("Request for startups post complete..")
        break;
      }
    }
  }
  //to handle serach 
  search(event: any) {
    this.page = 1
    this.keyword = event.target.value
    this.content = this.keyword
    if (this.keyword != "") {
      console.log("User wants post related to " + this.keyword)
      this.postService.search(this.keyword, this.page)
        .subscribe((res) => this.onSuccess(res));
    } else {
      alert("Please enter a valid input")
    }

  }

  onSuccess(res) {
    if (res != undefined) {
      // this.myPhotosList = [];
      res.forEach(item => {
        this.postsTemp.push(new postnews(item));
      });
      if (this.postsTemp.length < 4) {
        this.page = this.page + 1
        this.postService.search(this.keyword, this.page)
          .subscribe((res) => this.onSuccess(res));
      }else{
        this.posts=this.postsTemp
      }

    }

  }

  clear(event: any) {
    event.target.value = ""
  }

  onEnter(value: string) {
    alert(value)
  }

}
