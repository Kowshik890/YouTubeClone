import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'youtube-clone-ui';

  constructor(private oidcSecurityService: OidcSecurityService) {

  }

  ngOnInit(): void {
    // this checkAuth() method will check that the authentication is functioning correctly or not
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => { // userData, accessToken, idToken
      console.log("App is authenticated: ", isAuthenticated);
    });
  }
}
