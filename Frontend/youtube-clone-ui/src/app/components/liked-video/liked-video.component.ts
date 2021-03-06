import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoDTO } from 'src/app/datatransferobject/video-dto';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-liked-video',
  templateUrl: './liked-video.component.html',
  styleUrls: ['./liked-video.component.css']
})
export class LikedVideoComponent implements OnInit {

  suggestedVideos: Array<VideoDTO> = [];
  getSuggestedVideosSubscription!: Subscription;

  constructor(private videoService: VideoService, private userService: UserService) { 
    this.userService.getRegisteredUserId();
    const userId = this.userService.getUserId();
    this.getSuggestedVideosSubscription = videoService.getSuggestedVideos(userId).subscribe(data => {
      this.suggestedVideos = data;
    });
  }
  ngOnInit(): void {
  }

}
