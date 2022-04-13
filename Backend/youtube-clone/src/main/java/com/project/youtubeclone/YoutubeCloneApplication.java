package com.project.youtubeclone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

@SpringBootApplication
public class YoutubeCloneApplication {

	public static void main(String[] args) {
		SpringApplication.run(YoutubeCloneApplication.class, args);
	}

	@Bean
	public MongoDatabaseFactory mongoDatabaseFactory(){
		return new SimpleMongoClientDatabaseFactory("mongodb://localhost:27017/youtube-clone");
	}
}
