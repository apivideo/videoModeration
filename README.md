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

### Solution

In this demo, we use api.video as the video hosting service, and moderate the videos using thehive.ai machine learning API.  There are several steps:

1. Video Upload
2. Video tagging as unmoderated
3. video sent to theHive for moderation
4. moderation results returned to server
5. Server tabulates results and scores video
6. video tagged with approproiate (or inappropriate) labels
7. video available on different views of the website.

