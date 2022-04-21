import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveVideoDetailsComponent } from './components/save-video-details/save-video-details.component';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';

const routes: Routes = [
  {
    path: 'upload-video', component: UploadVideoComponent
  },
  {
    path: 'save-video-details/:videoId', component: SaveVideoDetailsComponent
  },
  {
    path: 'video-details/:videoId', component: VideoDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
