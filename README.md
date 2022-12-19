# YouTube Clone 
## This project is developed using Angular, Spring Boot, MongoDB, JWT Authentication using Spring Security and AWS S3 Bucket. 

## Project Functionalities
* User can upload new Videos using AWS S3
* Upload Thumbnails for the Videos using AWS S3
* Store Video, Thumbnail along with other video information e.g. Title, Description, Tags ...
* View uploaded Videos with details
* Viewer can see the number of views of that video
* Number of likes or dislikes of that video
* User Registration using Auth0
* Storing Liked/Disliked Videos to User table
* Store the number of view for a Video in DB
* Storing the history of Watched Videos
* User can view the History of Videos he/she watched
* User can Login/Logout using Single Sign On
* User can comment on Videos
* Comments are stored in DB
* User can view the List of Videos he/she Liked
* User can subscribe and unsubscribe 
* User can watch video from suggested bar

## Application Architecture

  [![architecture.png](https://i.postimg.cc/3JQPZJFG/architecture.png)](https://postimg.cc/rzgnVTby)


## Backend
* This project is developed consisting 3 layers [e.g: Controller -> Service -> Persistence (DB)]
* Photos and Videos are saved in AWS S3 Bucket
* Auth0 is used for security
* JSON Web Token (JWT) based registration and authorization
* Usage of Data Transfer Object (DTO) concept


## Frontend
* The frontend part of this project is component oriented
* Angular CLI: 13.0.4
* Installed Angular Material 
    * ng add @angular/material
* Installed ngx-file-drop for Drop/Down purpose
    *  npm install ngx-file-drop
* Installed flex-layout
    * npm i -s @angular/flex-layout @angular/cdk
* Installed videogular
    * npm i @videogular/ngx-videogular
    * npm i @types/core-js --save -dev
    * added following codes in angular.json:
        ```
            "styles": [
                         "./node_modules/@videogular/ngx-videogular/fonts/videogular.css"
                      ]
        ```
    * added following codes in app.module.ts: 
        ```
            import { VgCoreModule } from '@videogular/ngx-videogular/core';
            import { VgControlsModule } from '@videogular/ngx-videogular/controls';
            import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
            import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
        ```
        
## Screenshot

* User can upload a video with thumbnail and its detailed information

[![4.png](https://i.postimg.cc/VvFjKwXv/4.png)](https://postimg.cc/9wrRfv8H) 

* User can view the list of all uploaded videos

[![1.png](https://i.postimg.cc/DyMWnmfF/1.png)](https://postimg.cc/0b75CkJH)

* By clicking a specific video, it will redirect to another page as full form
* Display the number of views, uploaded date, suggested videos and other information

[![2.png](https://i.postimg.cc/7ZzL4VQM/2.png)](https://postimg.cc/75x4Mg4f)

* User can like/dislike the video, subscribe/unsubscribe and comment

[![3.png](https://i.postimg.cc/sxBrcjk9/3.png)](https://postimg.cc/jnrmqbdL)

* User can see the list of all his/her liked videos

[![5.png](https://i.postimg.cc/0rgL0pdP/5.png)](https://postimg.cc/0KfW8KBB)

* N.B: Few features are under development


