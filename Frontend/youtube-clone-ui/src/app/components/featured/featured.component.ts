import { Component, OnInit } from '@angular/core';
import { VideoDTO } from 'src/app/datatransferobject/video-dto';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {

  featuredVideos: Array<VideoDTO> = [];

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.videoService.getAllVideos().subscribe(response => {
      this.featuredVideos = response;
    })
  }

}
