import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { CommentDTO } from '../datatransferobject/comment-dto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiServiceURL = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  postComment(commentDTO: any, videoId: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiServiceURL}/api/videos/` + videoId + `/comment`, commentDTO);
  }

  getAllComments(videoId: string): Observable<Array<CommentDTO>> {
    return this.httpClient.get<CommentDTO[]>(`${this.apiServiceURL}/api/videos/` + videoId + `/comment`)
  }
}
