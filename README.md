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

Sign up for your [api.video](http://my.api.video/register/community) key.  The sandbox key gives you unlimited free uploads, but thye are deleted after 72 hours.
Sign up for your [HiveAI](https://thehive.ai/signup) API key.  You will need to ask for the key you want - video moderation.  They currently have 2 products: one for short videos (~30s), and another for long. Both analyze 1 frame per second, so I would recommend the "long" API.

### Deploying

The code is NodeJS, so you'll need to install all the node dependencies: ```npm install```
You'll also need to create a .env file for your API keys.  Name the variables in the env file based on the variables on lines 28-32 in the index.js file.

For example:

```const apiVideoKey = process.env.apiProductionKey;```
is defining the api.video production key, so the .env file will have
```apiProductionKey={apiToken here}```

Run the node server. ```npm start``` will start running this on port 3002.


## What's under the hood


