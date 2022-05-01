import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private apiServiceURL = environment.apiBaseUrl;
  private userId: string = '';

  constructor(private httpClient: HttpClient) { }

  subscribeToUser(userId: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.apiServiceURL}/api/user/subscribe/` + userId, null);
  }

  unsubscribeToUser(userId: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.apiServiceURL}/api/user/unsubscribe/` + userId, null);
  }

  getRegisteredUserId() {
    return this.httpClient.get(`${this.apiServiceURL}/api/user/register/`, { responseType: 'text' }).subscribe(response => {
      this.userId = response;
    });
  }

  getUserId(): string {
    return this.userId;
  }
}
