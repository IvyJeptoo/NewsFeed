import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { RandomuserService } from '../../services/randomuser.service';

@Component({
  selector: 'app-allfeeds',
  templateUrl: './allfeeds.component.html',
  styleUrls: ['./allfeeds.component.css']
})
export class AllfeedsComponent implements OnInit {
  randomuser: any;
  postList: any = [];
  username: string;
  commentList: any[];
  likeFeedArray: any[];
  commentFeedArray: any[];
  idFeed: any[];
  singleFeed: any = {};
  public errorMessage;
  active: number = -1;


  toggleComment(index: number) {
    if (index == this.active) {
      this.active = -1
      return;
    }
    this.active = index
  }
  isActive(index: number) {
    if (index == this.active) {
      return true;
    }
    return false;
  }


  // username event emmiter
  userFeedFunction(valueEmitted) {
    this.username = valueEmitted;
    this.postService.GetSingleUserFeed(this.username).subscribe(res => this.postList = res)

  }
 

  // comment feed alert
  comment: string = "";
  postComment(index: number) {
    
    let usercomment = {
      "subject": this.randomuser.name.first,
      "action": "commented on",
      "owner": `${this.postList[index].subject}'s`,
      "info": "",
      "message": this.comment,
      "object": this.postList[index].object,
      "date": Date.now(),
    }
    
    this.postService.PostActivity(usercomment).subscribe(res => {
      console.log(res);

    });
    
    let idFeed = this.postList[index].id
    

    this.postService.GetSingleFeed(idFeed).subscribe(res =>{
      this.singleFeed = res
      
      this.commentFeedArray = this.singleFeed.comments
      let randomcommentor = this.randomuser.name.first
      this.commentFeedArray.push({ "comment": this.comment, "commenter": randomcommentor })
      
      let comments = this.commentFeedArray

      let userCommentUpdate = {
        "subject": this.singleFeed.subject,
        "action": this.singleFeed.action,
        "object": this.singleFeed.object,
        "image": this.singleFeed.image,
        "date": this.singleFeed.date,
        "likes": this.singleFeed.likes,
        "comments": comments
      }      

      this.postService.UpdateFeed(idFeed, userCommentUpdate).subscribe(res => {
        console.log(res);
        this.allFeeds()
      });
      this.comment = '';

    });
   
    this.allFeeds()
  }


  allFeeds() {
    this.postService.GetAllFeeds().subscribe(res => this.postList = res)

  }
  constructor(
    public postService: PostService,
    public http: HttpClient,
    private randomuserService: RandomuserService
  ) { }

  ngOnInit(): void {
    this.allFeeds();
    this.randomuserService.getRandomUser().subscribe(
      (data: any) => {
        this.randomuser = data.results[0];

      }
    );

  }

  // new like feed alert
  likeOnClick(index: number) {

    let userlike = {

      "subject": this.randomuser.name.first,
      "action": "liked",
      "owner": `${this.postList[index].subject}'s`,
      "upvote": "",
      "object": this.postList[index].object,
      "date": Date.now(),
    }
    this.postService.PostActivity(userlike).subscribe(res => {
      console.log(res);



    });
    //get feed by id
    let idFeed = this.postList[index].id  
    

    // update like 
    this.postService.GetSingleFeed(idFeed).subscribe(res => {
      console.log(res);
      this.singleFeed = res  
      
      this.likeFeedArray = this.singleFeed.likes
      let randomliker = this.randomuser.name.first
      this.likeFeedArray.push(randomliker)
      let likes = this.likeFeedArray

      let userLikeUpdate = {
        "subject": this.singleFeed.subject,
        "action": this.singleFeed.action,
        "object": this.singleFeed.object,
        "image": this.singleFeed.image,
        "owner": this.singleFeed.owner,
        "date": this.singleFeed.date,
        "likes": likes,
        "comments": this.singleFeed.comments
      }
      
      
      this.postService.UpdateFeed(idFeed, userLikeUpdate).subscribe((res: any) => {
        console.log(res)

        

        this.allFeeds()
      });
    })
    this.allFeeds()
  }



}
