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
  singleFeed: any;
  public errorMessage;


  // username event emmiter
  userFeedFunction(valueEmitted) {
    this.username = valueEmitted;
    this.postService.GetSingleUserFeed(this.username).subscribe(res => this.postList = res)
    console.log(this.postList);

  }
  // Comment functionality
  isShowComment = true;
  toggleDisplay() {
    this.isShowComment = !this.isShowComment
  }

  // comment feed alert
  comment: string = "";
  postComment(index: number) {
    console.log(this.comment);
    let usercomment = {
      "userId": "",
      "subject": this.randomuser.name.first,
      "action": "commented on",
      "owner": `${this.postList[index].subject}'s`,
      "info": "",
      "message": this.comment,
      "object": this.postList[index].object,
      "date": Date.now(),

    }
    this.comment = '';

    // update comment 
    this.postService.PostUserComment(usercomment).subscribe(res => {
      console.log(res);
      this.singleFeed = res
      this.commentFeedArray = this.singleFeed.comments
      let randomcommentor = this.randomuser.name.first
      this.commentFeedArray.push({ "comment": this.comment, "commentor": randomcommentor })
      let comments = this.commentFeedArray
      let userCommentUpdate = {
        "userId": "",
        "subject": this.singleFeed[index].subject,
        "action": this.singleFeed[index].action,
        "object": this.singleFeed[index].object,
        "image": this.singleFeed[index].image,
        "date": this.singleFeed[index].date,
        "likes": this.singleFeed[index].likes,
        "comments": comments
      }
      let idFeed = this.postList[index].id
      this.postService.UpdateFeed(idFeed, userCommentUpdate).subscribe(res => {
        console.log(res);
        this.allFeeds()
      })

    })
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
        console.log(this.randomuser);

      }
    );

  }

  // new like feed alert
  likeOnClick(index: number) {

    let userlike = {

      "userId": this.postList[index].userId,
      "subject": this.randomuser.name.first,
      "action": "liked",
      "owner": `${this.postList[index].subject}'s`,
      "upvote": "",
      "object": this.postList[index].object,
      "date": Date.now(),
    }
    this.postService.PostLike(userlike).subscribe(res => {
      console.log(res);



    });
    //get feed by id
    let idFeed = this.postList[index].id
    console.log(idFeed);
    

    // update like 
    this.postService.GetSingleFeed(idFeed).subscribe(res => {
      console.log(res);
      this.singleFeed = res
      this.likeFeedArray = this.singleFeed.likes
      console.log(this.likeFeedArray);
      let randomliker = this.randomuser.name.first
      console.log(randomliker);
      this.likeFeedArray.push(randomliker)
      console.log(this.likeFeedArray);
      let likes = this.likeFeedArray
      console.log(likes);
      

      let userLikeUpdate = {

        "userId": this.singleFeed[index].userId,
        "subject": this.singleFeed[index].subject,
        "action": this.singleFeed[index].action,
        "object": this.singleFeed[index].object,
        "image": this.singleFeed[index].image,
        "owner": this.singleFeed[index].owner,
        "date": this.singleFeed[index].date,
        "likes": ["new"],
        "comments": this.singleFeed[index].comments
      }
      this.postService.UpdateFeed(idFeed, userLikeUpdate).subscribe(res => {
        console.log(res)
        // error => this.errorMessage = error
        // console.log(this.errorMessage);
        

        // this.allFeeds()
      });
    })
    this.allFeeds()
  }



}
