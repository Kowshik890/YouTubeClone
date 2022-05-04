import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {

  videoId!: string;
  videoURL!: string;
  videoTitle!: string;
  videoDescription!: string;
  tags: Array<string> = [];
  likeCount: number = 0;
  dislikeCount: number = 0;
  viewCount: number = 0;
  uploadedDate: any;
  videoAvailable: boolean = false;
  showSubscribeButton: boolean = true;
  showUnsubscribeButton: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService, private userService: UserService) { 
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideoDetails(this.videoId)
    .subscribe(data => {
      this.videoURL = data.videoUrl;
      this.videoTitle = data.title;
      this.videoDescription = data.description;
      this.tags = data.tags;
      this.likeCount = data.likeCount;
      this.dislikeCount = data.dislikeCount;
      this.viewCount = data.viewCount;
      this.videoAvailable = true;
      this.uploadedDate = data.uploadedDate.split('T', 1);
      console.log("Date: " + this.uploadedDate);
    })
  }

  ngOnInit(): void {
  }

  likeVideo() {
    this.videoService.likeVideo(this.videoId).subscribe(response => {
      this.likeCount = response.likeCount;
      this.dislikeCount = response.dislikeCount;
    })
  }

  dislikeVideo() {
    this.videoService.dislikeVideo(this.videoId).subscribe(response => {
      this.likeCount = response.likeCount;
      this.dislikeCount = response.dislikeCount;
    })
  }

  subscribeToUser() {
    let userId = this.userService.getUserId();
    this.userService.subscribeToUser(userId).subscribe(response => {
      this.showSubscribeButton = false;
      this.showUnsubscribeButton = true;
    });
  }

  unsubscribeToUser() {
    let userId = this.userService.getUserId();
    this.userService.unsubscribeToUser(userId).subscribe(response => {
      this.showSubscribeButton = true;
      this.showUnsubscribeButton = false;
    });
  }

}
