[![badge](https://img.shields.io/twitter/follow/api_video?style=social)](https://twitter.com/intent/follow?screen_name=api_video)

[![badge](https://img.shields.io/github/stars/apivideo/videoModeration?style=social)](https://github.com/apivideo/videoModeration)

[![badge](https://img.shields.io/discourse/topics?server=https%3A%2F%2Fcommunity.api.video)](https://community.api.video)

![](https://github.com/apivideo/API_OAS_file/blob/master/apivideo_banner.png)

api.video is an API that encodes on the go to facilitate immediate playback, enhancing viewer streaming experiences across multiple devices and platforms. You can stream live or on-demand online videos within minutes.

# videoModeration
Using HiveAI to moderate videos uplaoded to api.video


## Introduction

Sites are highly focused on the addition of user generated content (UGC). Uploading images and videos to share with friends describes the majority of all social media posting, from Facebook, Instagram to TikTok.

More and more companies are interested in incorporating UGC content on their sites, but without heavy moderation, this content can devolve into a cesspit of dispair and inappropriate content


![](https://github.com/dougsillars/videoModeration/blob/main/docs/comments.jpeg?raw=true)

### User generated content 

The comments can beome extremely toxic - imageine user generated videos.  It is important that any abuses that might be perputrated by bad actors do not make it to the website for vistors to see.  

There is also an immediacy to video: users do not want to wait a day for moderation and their videos to go live.  

So there is a balance - getting videos launched quickly, but also in a moderated way: keeping inappropriate content off of your app or site.

## Solution

In this demo, we use api.video as the video hosting service, and moderate the videos using thehive.ai machine learning API.  There are several steps:

1. Video Upload.
2. Video tagged as unmoderated.
3. Video encoded as mp4.
4. mp4 version of video sent to theHive for moderation.
5. moderation results returned to server.
5. Server tabulates results and scores video.
6. video tagged with approproiate (or inappropriate) labels.
7. video available on different views of the website.


### Implementing your own version

You will need API keys for api.video and HiveAI.

* Sign up for your [api.video](http://my.api.video/register/community) key.  The sandbox key gives you unlimited free uploads, but thye are deleted after 72 hours.
* Sign up for your [HiveAI](https://thehive.ai/signup) API key.  You will need to ask for the key you want - video moderation.  They currently have 2 products: one for short videos (~30s), and another for long. Both analyze 1 frame per second, so I would recommend the "long" API.

* Create a delegated upload token for api.video. Here's a [tutorial how](https://api.video/blog/tutorials/delegated-uploads).  The add this in line 48 of public/indexchunks.html.  Also note: if you move from Sandbox to production on api.video (or vie-versa), you'll need  a new delegated token for the new environment.


### Deploying

The code is NodeJS, so you'll need to install all the node dependencies: ```npm install```
You'll also need to create a .env file for your API keys.  Name the variables in the env file based on the variables on lines 28-32 in the index.js file.

For example:

```const apiVideoKey = process.env.apiProductionKey;```

is defining the api.video production key, so the .env file will have:

```apiProductionKey={apiToken here}```

Run the node server. ```npm start``` will start running this on port 3002.


## What's under the hood

1. Delegated video upload.  This upload process uses a public key. Anyone with this link can upload videos into your account at api.video.  To ensure every video can be uploaded, we use the JavaScript Blob API to break the video into 50MB segments for upload.
2. Once the video is uploaded, a POST with the videoId and video name is sent to the NOde server.  The file name is updated, and the initial tag of "needsScreening" indicating that the ideo has not had moderation run yet.
3. The moderation can only be run on the mp4 version of the video, so once the mp4 is encoded (there is a 2 second "ping" to check the encoding status), the file is sent to the Hive for moderation.
4. Every second, Hive extracts a frame and checks against [many types of content](https://thehive.ai/hive-moderation-suite).  A JSON response for each frame is returned to the Node Server.
5. moderationSummary creates a bunch of arrays for a few of the measured attributes:
```		
		let yes_nazi = [];
		let safeForWork=[];
		let yes_female_nudity=[];
		let yes_male_nudity=[];
		let yes_male_shirtless=[];
		let yes_female_swimwear=[];
		let no_guns=[];
		let no_smoking=[];
```

6. We calculate min, max, average and Median scores.  The threshold for someting passing is 09 (out of 1).  We created metrics for pass/fail.  
* For example - if the median score for "safe For Work" is under 90%, that means that at least half the framce are not certin to be safe for work - and we label the video NSFW.
* if there is one frame with smoking - the video is labeled as having smoking. (same for Nazis, nudity, guns.)
7. The video is updated at api.video with new tags.

Finally, there are a series of pages that list the videos that have each tag.  "/SFW" displays all of the 'safe for work' videos, etc.



## installation

clone the repo
npm install (for all dependencies)
node src/index.js
