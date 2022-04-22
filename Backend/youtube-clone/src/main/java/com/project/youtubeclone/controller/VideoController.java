package com.project.youtubeclone.controller;

import com.project.youtubeclone.datatransferobject.CommentDTO;
import com.project.youtubeclone.datatransferobject.UploadVideoResponse;
import com.project.youtubeclone.datatransferobject.VideoDTO;
import com.project.youtubeclone.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UploadVideoResponse uploadVideo(@RequestParam("file") MultipartFile file) {
        return videoService.uploadVideo(file);
    }

    @PostMapping("/thumbnail")
    @ResponseStatus(HttpStatus.CREATED)
    public String uploadThumbnail(@RequestParam("file") MultipartFile file, @RequestParam("videoId") String videoId) {
        return videoService.uploadThumbnail(file, videoId);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public VideoDTO editVideoMetadata(@RequestBody VideoDTO videoDTO) {
        return videoService.editVideo(videoDTO);
    }

    @GetMapping("/{videoId}")
    @ResponseStatus(HttpStatus.OK)
    public VideoDTO getVideoDetails(@PathVariable String videoId) {
        return videoService.getVideoDetails(videoId);
    }

    @PostMapping("/{videoId}/like")
    @ResponseStatus(HttpStatus.CREATED)
    public VideoDTO likeVideo(@PathVariable String videoId) {
        return videoService.likeVideo(videoId);
    }

    @PostMapping("/{videoId}/dislike")
    @ResponseStatus(HttpStatus.CREATED)
    public VideoDTO dislikeVideo(@PathVariable String videoId) {
        return videoService.dislikeVideo(videoId);
    }

    @PostMapping("/{videoId}/comment")
    @ResponseStatus(HttpStatus.CREATED)
    public void addComment(@PathVariable String videoId, @RequestBody CommentDTO commentDTO) {
        videoService.addComment(videoId, commentDTO);
    }

    @GetMapping("/{videoId}/comment")
    @ResponseStatus(HttpStatus.OK)
    public List<CommentDTO> getAllComments(@PathVariable String videoId) {
        return videoService.getAllComments(videoId);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<VideoDTO> getAllVideos() {
        return videoService.getAllVideos();
    }
}
