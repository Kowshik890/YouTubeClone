package com.project.youtubeclone.service;

import com.project.youtubeclone.datatransferobject.UploadVideoResponse;
import com.project.youtubeclone.model.Video;
import com.project.youtubeclone.datatransferobject.VideoDTO;
import com.project.youtubeclone.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final AWSS3Service awss3Service;
    private final VideoRepository videoRepository;

    public UploadVideoResponse uploadVideo(MultipartFile file) {
        // Upload file to AWS S3
        String videoURL = awss3Service.uploadFile(file);

        // Save uploaded video URL to database
        var video = new Video();
        video.setVideoUrl(videoURL);
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

        // Save the video to the database
        videoRepository.save(savedVideo);
        return videoDTO;
    }

    public String uploadThumbnail(MultipartFile file, String videoId) {
        // Find the video by videoId
        Video savedVideo = findVideoById(videoId);

        // Upload file to AWS S3
        String thumbnailURL = awss3Service.uploadFile(file);

        // Save uploaded video URL to database
        savedVideo.setThumbnailUrl(thumbnailURL);
        videoRepository.save(savedVideo);
        return thumbnailURL;
    }

    public Video findVideoById(String videoId) {
        return videoRepository.findById(videoId)
                .orElseThrow(()->new IllegalArgumentException("Cannot find video by id - " + videoId));
    }
}
