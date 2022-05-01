import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VideoDTO } from 'src/app/datatransferobject/video-dto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})
export class SaveVideoDetailsComponent implements OnInit {

  saveVideoDetailsForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  selectedFile!: File;
  selectedFileName: any = '';
  videoId: any = '';
  fileSelected: boolean = false;
  videoURL!: string;
  thumbnailURL!: string;
  uploadedDate!: string;

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService, private matSnackBar: MatSnackBar) { 
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideoDetails(this.videoId)
    .subscribe(data => {
      this.videoURL = data.videoUrl;
      this.thumbnailURL = data.thumbnailUrl;
      this.uploadedDate = data.uploadedDate;
    })
    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus
    })
  } 

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.tags.indexOf(value);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    this.selectedFile = event.target.files[0]; // file will be stored in this variable // @ts-ignore is used to remove compiler error
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;
  }

  onUploadThumbnail() {
    // First need the videoId and file
    this.videoService.uploadThumbnail(this.selectedFile, this.videoId)
    .subscribe(data => { // to store the response from video-service.ts
      this.thumbnailURL = data;
      // show an upload notification
      this.matSnackBar.open("Thumbnail upload successfully!", "OK");
    })
  }

  saveVideoDetails() {
    console.log("Thumbnail: "+this.thumbnailURL);
    const videoMetaData: VideoDTO = {
      id: this.videoId,
      title: this.saveVideoDetailsForm.get('title')?.value,
      description: this.saveVideoDetailsForm.get('description')?.value,
      tags: this.tags,
      videoUrl: this.videoURL,
      videoStatus: this.saveVideoDetailsForm.get('videoStatus')?.value,
      thumbnailUrl: this.thumbnailURL,
      likeCount: 0,
      dislikeCount: 0,
      viewCount: 0,
      uploadedDate: this.uploadedDate
    } 
    this.videoService.saveVideoDetails(videoMetaData)
    .subscribe(data => {
      this.matSnackBar.open("Video metadata saved successfully", "OK");
    });
  }

}
