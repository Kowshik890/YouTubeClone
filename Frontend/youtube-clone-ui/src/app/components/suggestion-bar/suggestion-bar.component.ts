import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoDTO } from 'src/app/datatransferobject/video-dto';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-suggestion-bar',
  templateUrl: './suggestion-bar.component.html',
  styleUrls: ['./suggestion-bar.component.css']
})
export class SuggestionBarComponent implements OnInit {

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
