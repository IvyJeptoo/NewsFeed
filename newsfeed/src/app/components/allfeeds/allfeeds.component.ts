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
  commentList: any [];
  likeFeedArray: any [];
  idFeed: any []; 
  singleFeed: any;

  
 // username event emmiter
  userFeedFunction(valueEmitted){
    this.username = valueEmitted;
    this.postService.GetSingleUserFeed(this.username).subscribe(res => this.postList = res)
    console.log(this.postList);
   
  } 
  // Comment functionality
  isShowComment=true;
  toggleDisplay(){
    this.isShowComment=!this.isShowComment
  }

  comment: string = "";  
  postComment(index: number){
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
    console.log(usercomment);
    this.postService.PostUserComment(usercomment).subscribe(res => {
      console.log(res);
      
    })
    this.allFeeds() 

  }  
  allFeeds(){
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
      (data:any) => {
        this.randomuser = data.results[0];
        console.log(this.randomuser);
        
      }
    );
        
  }
  
  likeOnClick(index: number){ 
    
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
    

    this.postService.GetSingleFeed(idFeed).subscribe(res => {
      console.log(res);   
      this.singleFeed =  res
      this.likeFeedArray = this.singleFeed.likes  
      console.log(this.likeFeedArray); 
      let randomliker = this.randomuser.name.first
      console.log(randomliker);
      this.likeFeedArray.push(randomliker)
      console.log(this.likeFeedArray); 
      let likes = this.likeFeedArray

      let userLikeUpdate = {
        
        "userId": "",
        "subject": this.randomuser.name.first,
        "action": this.postList[index].action,
        "object": this.postList[index].object,
        "image": this.postList[index].image,
        "date": this.postList[index].date,
        "likes": likes,
        "comments": this.postList[index].comments
      }
      this.postService.UpdateFeedLikes(idFeed,userLikeUpdate).subscribe(res => {
        console.log(res);
        
        this.allFeeds()
      })
      
    })


    
    this.allFeeds()
  }



}
