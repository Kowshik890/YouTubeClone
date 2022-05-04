# YouTube Clone 
## This project is developed using Angular, Spring Boot, MongoDB and Auth0.

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
* Photos and Videos are saved in AWS S3 Bucket
* Auth0 is used for security
* JSON Web Token (JWT) based registration and authorization
* Usage of Data Transfer Object (DTO) concept


## Frontend

[![4.png](https://i.postimg.cc/VvFjKwXv/4.png)](https://postimg.cc/9wrRfv8H) 

[![1.png](https://i.postimg.cc/DyMWnmfF/1.png)](https://postimg.cc/0b75CkJH)

[![2.png](https://i.postimg.cc/7ZzL4VQM/2.png)](https://postimg.cc/75x4Mg4f)

[![3.png](https://i.postimg.cc/sxBrcjk9/3.png)](https://postimg.cc/jnrmqbdL)

[![5.png](https://i.postimg.cc/0rgL0pdP/5.png)](https://postimg.cc/0KfW8KBB)

