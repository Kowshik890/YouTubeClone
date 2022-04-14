import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  @Input()  // it is used to hold the videoURL value from save-video-details.component.html
  videoURL!: string; // ! is used to remove this error "Property 'videoURL' has no initializer and is not definitely assigned in the constructor."
  constructor() { }

  ngOnInit(): void {
  }

}
