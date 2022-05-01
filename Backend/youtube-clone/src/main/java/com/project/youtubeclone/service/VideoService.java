package com.project.youtubeclone.service;

import com.project.youtubeclone.datatransferobject.CommentDTO;
import com.project.youtubeclone.datatransferobject.UploadVideoResponse;
import com.project.youtubeclone.model.Comment;
import com.project.youtubeclone.model.Video;
import com.project.youtubeclone.datatransferobject.VideoDTO;
import com.project.youtubeclone.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final AWSS3Service awss3Service;
    private final VideoRepository videoRepository;
    private final UserService userService;

    public UploadVideoResponse uploadVideo(MultipartFile file) {
        // Upload file to AWS S3
        String videoURL = awss3Service.uploadFile(file);

        // Save uploaded video URL to database
        Date date = new Date();
        var video = new Video();
        video.setVideoUrl(videoURL);
        video.setUploadedDate(date.toString());
        Video savedVideo = videoRepository.save(video);
        return new UploadVideoResponse(savedVideo.getId(), savedVideo.getVideoUrl());
    }

    public VideoDTO editVideo(VideoDTO videoDTO) {
        // Find the video by videoId
        Video savedVideo = findVideoById(videoDTO.getId());

        // Map/set the videoDetailObject fields to video
        savedVideo.setTitle(videoDTO.getTitle());
        savedVideo.setDescription(videoDTO.getDescription());
        savedVideo.setTags(videoDTO.getTags());
        savedVideo.setVideoStatus(videoDTO.getVideoStatus());
        savedVideo.setThumbnailUrl(videoDTO.getThumbnailUrl());
        savedVideo.setUploadedDate(videoDTO.getUploadedDate());

        // Save the video to the database
        videoRepository.save(savedVideo);
        return videoDTO;
    }

    public String uploadThumbnail(MultipartFile file, String videoId) {
        // Find the video by videoId
        Video savedVideo = findVideoById(videoId);

        // Upload file to AWS S3
        String thumbnailURL = awss3Service.uploadFile(file);
        System.out.println("ThumbnailURL: " + thumbnailURL);
        // Save uploaded video URL to database
        savedVideo.setThumbnailUrl(thumbnailURL);
        videoRepository.save(savedVideo);
        return thumbnailURL;
    }

    public Video findVideoById(String videoId) {
        return videoRepository.findById(videoId)
                .orElseThrow(()->new IllegalArgumentException("Cannot find video by id - " + videoId));
    }

    public VideoDTO getVideoDetails(String videoId) {
        Video savedVideo = findVideoById(videoId);

        incrementViewCount(savedVideo);
        userService.addVideoToHistory(videoId);

        return mapToVideoDTO(savedVideo);
    }

    public void incrementViewCount(Video savedVideo) {
        savedVideo.incrementViewCount();
        videoRepository.save(savedVideo);
    }

    public VideoDTO likeVideo(String videoId) {
        Video videoById = findVideoById(videoId);

        // Increment like count
        // If user already liked the video, then decrement like count
        // like - 0, dislike - 0
        // like - 1, dislike - 0
        // like - 0, dislike - 0

        // If user already disliked the video, now want to like it, then increment like count and decrement dislike count
        // like - 0, dislike - 1
        // like - 1, dislike - 0

        if(userService.ifLikedVideo(videoId)) {
            videoById.decrementLikes();
            userService.removeFromLikedVideos(videoId);
        } else if(userService.ifDislikedVideo(videoId)) {
            videoById.decrementDislikes();
            userService.removeFromDislikedVideos(videoId);

            videoById.incrementLikes();
            userService.addToLikedVideos(videoId);
        } else {
            videoById.incrementLikes();
            userService.addToLikedVideos(videoId);
        }

        videoRepository.save(videoById);

        return mapToVideoDTO(videoById);
    }

    public VideoDTO dislikeVideo(String videoId) {
        Video videoById = findVideoById(videoId);

        // Increment dislike count
        // If user already disliked the video, then decrement dislike count
        // dislike - 0, like - 0
        // dislike - 1, like - 0
        // dislike - 0, like - 0

        // If user already liked the video, now want to dislike it, then increment dislike count and decrement like count
        // dislike - 0, like - 1
        // dislike - 1, like - 0

        if(userService.ifDislikedVideo(videoId)) {
            videoById.decrementDislikes();
            userService.removeFromDislikedVideos(videoId);
        } else if(userService.ifLikedVideo(videoId)) {
            videoById.decrementLikes();
            userService.removeFromLikedVideos(videoId);

            videoById.incrementDislikes();
            userService.addToDislikedVideos(videoId);
        } else {
            videoById.incrementDislikes();
            userService.addToDislikedVideos(videoId);
        }

        videoRepository.save(videoById);

        return mapToVideoDTO(videoById);
    }

    private VideoDTO mapToVideoDTO(Video videoById) {
        VideoDTO videoDTO = new VideoDTO();
        videoDTO.setId(videoById.getId());
        videoDTO.setTitle(videoById.getTitle());
        videoDTO.setDescription(videoById.getDescription());
        videoDTO.setTags(videoById.getTags());
        videoDTO.setVideoUrl(videoById.getVideoUrl());
        videoDTO.setThumbnailUrl(videoById.getThumbnailUrl());
        videoDTO.setVideoStatus(videoById.getVideoStatus());
        videoDTO.setLikeCount(videoById.getLikes().get());
        videoDTO.setDislikeCount(videoById.getDislikes().get());
        videoDTO.setViewCount(videoById.getViewCount().get());
        videoDTO.setUploadedDate(videoById.getUploadedDate());
        return videoDTO;
    }

    public void addComment(String videoId, CommentDTO commentDTO) {
        Video video = findVideoById(videoId);

        Comment comment = new Comment();
        comment.setText(commentDTO.getCommentText());
        comment.setAuthorId(commentDTO.getAuthorId());

        video.addComment(comment);

        videoRepository.save(video);
    }

    public List<CommentDTO> getAllComments(String videoId) {
        Video video = findVideoById(videoId);
        List<Comment> commentList = video.getCommentList();
        // To map this list of comments into a list of commentDTO object
        // to loop through this comment list, it will call mapToCommentDTO() one at a time
        List<CommentDTO> list = new ArrayList<>();
        for (Comment comment : commentList) {
            CommentDTO commentDTO = mapToCommentDTO(comment);
            list.add(commentDTO);
        }
        return list;
    }

    private CommentDTO mapToCommentDTO(Comment comment) {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setCommentText(comment.getText());
        commentDTO.setAuthorId(comment.getAuthorId());
        return commentDTO;
    }

    public List<VideoDTO> getAllVideos() {
        List<VideoDTO> list = new ArrayList<>();
        for (Video video : videoRepository.findAll()) {
            VideoDTO videoDTO = mapToVideoDTO(video);
            list.add(videoDTO);
        }
        return list;
    }
}
