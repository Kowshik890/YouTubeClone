import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './components/callback/callback.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { LikedVideoComponent } from './components/liked-video/liked-video.component';
import { SaveVideoDetailsComponent } from './components/save-video-details/save-video-details.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'featured', component: FeaturedComponent
      },
      {
        path: 'subscriptions', component: SubscriptionsComponent
      },
      {
        path: 'history', component: HistoryComponent
      },
      {
        path: 'liked-videos', component: LikedVideoComponent
      }
    ]
  },
  {
    path: 'upload-video', component: UploadVideoComponent
  },
  {
    path: 'save-video-details/:videoId', component: SaveVideoDetailsComponent
  },
  {
    path: 'video-details/:videoId', component: VideoDetailComponent
  },
  {
    path: 'callback', component: CallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
