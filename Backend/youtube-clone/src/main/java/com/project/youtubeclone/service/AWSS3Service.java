package com.project.youtubeclone.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor  // It will generate argument constructor automatically
public class AWSS3Service implements FileService {

    public static final String BUCKET_NAME = "youtube-clone-kd";
    private final AmazonS3Client amazonS3Client;

    @Override
    public String uploadFile(MultipartFile file) {      // The return type is string because once upload the video we will get the URL of that particular video
        // Upload the file to AWS S3
        // To get the extension of the file
        // First prepare a unique key for file
        var fileNameExtension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        var key = UUID.randomUUID().toString() + "." + fileNameExtension;

        var object = new ObjectMetadata();  // This object will be used to set the size and type of the videos
        object.setContentLength(file.getSize());
        object.setContentType(file.getContentType());

        try {
            amazonS3Client.putObject(BUCKET_NAME, key, file.getInputStream(), object); // to upload the file to AWS S3
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An exception occurred while uploading the file!!");
        }

        amazonS3Client.setObjectAcl(BUCKET_NAME, key, CannedAccessControlList.PublicRead); // to make it public readable state

        return amazonS3Client.getResourceUrl(BUCKET_NAME, key);
    }
}