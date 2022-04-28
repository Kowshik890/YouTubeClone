import { Component, Input, OnInit } from '@angular/core';
import { VideoDTO } from 'src/app/datatransferobject/video-dto';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent implements OnInit {

  @Input()
  featuredVideo!: VideoDTO;
  
  constructor() { }

  ngOnInit(): void {
  }

}
