import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';

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
  videoAvailable: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService) { 
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
    })
  }

  ngOnInit(): void {
  }

}
