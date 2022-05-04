import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { HeaderComponent } from './components/header/header.component';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';
import { SaveVideoDetailsComponent } from './components/save-video-details/save-video-details.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { AuthConfigModule } from './auth/auth-config.module';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';
import { AuthInterceptor, AuthModule  } from 'angular-auth-oidc-client';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { LikedVideoComponent } from './components/liked-video/liked-video.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { CallbackComponent } from './components/callback/callback.component';
import { CommentsComponent } from './components/comments/comments.component';
import { SuggestionBarComponent } from './components/suggestion-bar/suggestion-bar.component';



@NgModule({
  declarations: [
    AppComponent,
    UploadVideoComponent,
    HeaderComponent,
    SaveVideoDetailsComponent,
    VideoPlayerComponent,
    VideoDetailComponent,
    HomeComponent,
    HistoryComponent,
    SubscriptionsComponent,
    LikedVideoComponent,
    SidebarComponent,
    FeaturedComponent,
    VideoCardComponent,
    CallbackComponent,
    CommentsComponent,
    SuggestionBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatChipsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatSnackBarModule,
    AuthConfigModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
