import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadVideoResponse } from '../components/upload-video/upload-video-response';
import { VideoDTO } from '../datatransferobject/video-dto';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private apiServiceURL = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {

    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name) // 'file' is written because in spring boot the requestparam is named as 'file'

    // HTTP post call to upload the video
    return this.httpClient.post<UploadVideoResponse>(`${this.apiServiceURL}/api/videos`, formData);
  }

  uploadThumbnail(fileEntry: File, videoId: string): Observable<string> {

    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name) // 'file' is written because in spring boot the requestparam is named as 'file'
    formData.append('videoId', videoId) // FormData interface appends a new value onto an existing key inside a FormData object

    // HTTP post call to upload the thumbnail
    return this.httpClient.post(`${this.apiServiceURL}/api/videos/thumbnail/`, formData, {
      responseType: 'text'
    });
  }

  getVideoDetails(videoId: string): Observable<VideoDTO> {
    return this.httpClient.get<VideoDTO>(`${this.apiServiceURL}/api/videos/` + videoId);
  }

  saveVideoDetails(videoMetaData: VideoDTO): Observable<VideoDTO> {
    return this.httpClient.put<VideoDTO>(`${this.apiServiceURL}/api/videos`, videoMetaData);
  }

  getAllVideos(): Observable<Array<VideoDTO>> {
    return this.httpClient.get<Array<VideoDTO>>(`${this.apiServiceURL}/api/videos`);
  }

  likeVideo(videoId: string): Observable<VideoDTO> {
    return this.httpClient.post<VideoDTO>(`${this.apiServiceURL}/api/videos/` + videoId + `/like`, null);
  }

  dislikeVideo(videoId: string): Observable<VideoDTO> {
    return this.httpClient.post<VideoDTO>(`${this.apiServiceURL}/api/videos/` + videoId + `/dislike`, null);
  }

  getSuggestedVideos(userId: string): Observable<Array<VideoDTO>> {
    return this.httpClient.get<Array<VideoDTO>>(`${this.apiServiceURL}/api/videos/suggested/` + userId);
  }
} 
