import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadVideoResponse } from '../components/upload-video/upload-video-response';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient: HttpClient) { }

  uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {

    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name) // 'file' is written because in spring boot the requestparam is named as 'file'

    // HTTP post call to upload the video
    return this.httpClient.post<UploadVideoResponse>("http://localhost:8080/api/videos/", formData);
  }

  uploadThumbnail(fileEntry: File, videoId: string): Observable<string> {

    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name) // 'file' is written because in spring boot the requestparam is named as 'file'
    formData.append('videoId', videoId) // FormData interface appends a new value onto an existing key inside a FormData object

    // HTTP post call to upload the thumbnail
    return this.httpClient.post("http://localhost:8080/api/videos/thumbnail/", formData, {
      responseType: 'text'
    });
  }
} 
