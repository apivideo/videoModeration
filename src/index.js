require('dotenv').config();
//import express from 'express';
const express = require('express');
//express for the website and pug to create the pages
const app = express();
const pug = require('pug');
const path = require('path');
var publicDir = path.join(__dirname, 'public');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine','pug');
app.use(express.static('public'));
//favicons are the cool little icon in the browser tab
var favicon = require('serve-favicon');
app.use(favicon('public/icon.ico')); 
const axios = require('axios');
var request = require("request");

//to get and save and resubmit the VTT file
const http = require('http');
const fs = require('fs');
let threshold = 0.9;

//apivideo
const apiVideo = require('@api.video/nodejs-sdk');


//if you chnage the key to sandbox or prod - make sure you fix the delegated toekn on the upload page
const apiVideoKey = process.env.apiProductionKey;
const hiveCaptionKey =  process.env.hiveKey;
const hiveModerationShortKey = process.env.hiveModerationShortKey;
const hiveModerationLongKey = process.env.hiveModerationLongKey;

const hiveKey = hiveModerationLongKey;
// website demo
//get request is the initial request - load the HTML page with the form
app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../public', 'indexChunks.html'));  
});

app.get('/NSFW', (req, res) => {
	//get list of SFW videos
	client = new apiVideo.Client({ apiKey: apiVideoKey});
	let recordedList = client.videos.search({"tags":'NSFW'});
	recordedList.then(function(list) {
		console.log("list of tagged videos");
		console.log(list);
		return res.render('videos',{list});  
	}).catch((error) => {
	    console.log(error);
	});
		
});
app.get('/SFW', (req, res) => {
	//get list of SFW videos
	client = new apiVideo.Client({ apiKey: apiVideoKey});
	let recordedList = client.videos.search({"tags":'SFW'});
	recordedList.then(function(list) {
		console.log("list of tagged videos");
		console.log(list);
		return res.render('videos',{list});  
	}).catch((error) => {
	    console.log(error);
	});
		
});
app.get('/nazism', (req, res) => {
	//get list of SFW videos
	client = new apiVideo.Client({ apiKey: apiVideoKey});
	let recordedList = client.videos.search({"tags":'nazism'});
	recordedList.then(function(list) {
		console.log("list of tagged videos");
		console.log(list);
		return res.render('videos',{list});  
	}).catch((error) => {
	    console.log(error);
	});
		
});
app.get('/no_nazism', (req, res) => {
	//get list of SFW videos
	client = new apiVideo.Client({ apiKey: apiVideoKey});
	let recordedList = client.videos.search({"tags":'no_nazism'});
	recordedList.then(function(list) {
		console.log("list of tagged videos");
		console.log(list);
		return res.render('videos',{list});  
	}).catch((error) => {
	    console.log(error);
	});
		
});
app.get('/shirtlessmale', (req, res) => {
	//get list of SFW videos
	client = new apiVideo.Client({ apiKey: apiVideoKey});
	let recordedList = client.videos.search({"tags":'Shirtless_male'});
	recordedList.then(function(list) {
		console.log("list of tagged videos");
		console.log(list);
		return res.render('videos',{list});  
	}).catch((error) => {
	    console.log(error);
	});
		
});
app.get('/no_shirtlessmale', (req, res) => {
	//get list of SFW videos
	client = new apiVideo.Client({ apiKey: apiVideoKey});
	let recordedList = client.videos.search({"tags":'no_Shirtless_male'});
	recordedList.then(function(list) {
		console.log("list of tagged videos");
		console.log(list);
		return res.render('videos',{list});  
	}).catch((error) => {
	    console.log(error);
	});
		
});
app.get('/femaleswimwear', (req, res) => {
	//get list of SFW videos
	client = new apiVideo.Client({ apiKey: apiVideoKey});
	let recordedList = client.videos.search({"tags":'female_swimwear'});
	recordedList.then(function(list) {
		console.log("list of tagged videos");
		console.log(list);
		return res.render('videos',{list});  
	}).catch((error) => {
	    console.log(error);
	});
		
});
app.get('/no_guns', (req, res) => {
	//get list of SFW videos
	client = new apiVideo.Client({ apiKey: apiVideoKey});
	let recordedList = client.videos.search({"tags":'no_guns'});
	recordedList.then(function(list) {
		console.log("list of tagged videos");
		console.log(list);
		return res.render('videos',{list});  
	}).catch((error) => {
	    console.log(error);
	});
		
});
app.get('/yes_guns', (req, res) => {
	//get list of SFW videos
	client = new apiVideo.Client({ apiKey: apiVideoKey});
	let recordedList = client.videos.search({"tags":'yes_guns'});
	recordedList.then(function(list) {
		console.log("list of tagged videos");
		console.log(list);
		return res.render('videos',{list});  
	}).catch((error) => {
	    console.log(error);
	});
		
});
app.get('/yes_smoking', (req, res) => {
	//get list of SFW videos
	client = new apiVideo.Client({ apiKey: apiVideoKey});
	let recordedList = client.videos.search({"tags":'yes_smoking'});
	recordedList.then(function(list) {
		console.log("list of tagged videos");
		console.log(list);
		return res.render('videos',{list});  
	}).catch((error) => {
	    console.log(error);
	});
		
});
app.get('/no_smoking', (req, res) => {
	//get list of SFW videos
	client = new apiVideo.Client({ apiKey: apiVideoKey});
	let recordedList = client.videos.search({"tags":'no_smoking'});
	recordedList.then(function(list) {
		console.log("list of tagged videos");
		console.log(list);
		return res.render('videos',{list});  
	}).catch((error) => {
	    console.log(error);
	});
		
});
app.get('/no_femaleswimwear', (req, res) => {
	//get list of SFW videos
	client = new apiVideo.Client({ apiKey: apiVideoKey});
	let recordedList = client.videos.search({"tags":'no_female_swimwear'});
	recordedList.then(function(list) {
		console.log("list of tagged videos");
		console.log(list);
		return res.render('videos',{list});  
	}).catch((error) => {
	    console.log(error);
	});
		
});
app.get('/encoding', (req, res) => {
	//get list of SFW videos
	client = new apiVideo.Client({ apiKey: apiVideoKey});
	let recordedList = client.videos.search({"tags":'needsScreening'});
	recordedList.then(function(list) {
		console.log("list of tagged videos");
		console.log(list);
		return res.render('videos',{list});  
	}).catch((error) => {
	    console.log(error);
	});
		
});



app.post('/', (req, res) => {
	console.log(req);
	//get values from POST body
	let videoId=req.body.videoId;
	let videoName = req.body.videoName;
	let moderationTag = "needsScreening";
	

	//SFW
	//NSFW
	

	client = new apiVideo.Client({ apiKey: apiVideoKey});
	
	

	let result = client.videos.update(videoId, {	title: videoName, 
												tags: [moderationTag]
											});
											console.log(result);
	result.then(function(video) {
		console.log("video uploaded and renamed");
		//video name changed.  
		//now begin process of captioning the video
		//
		// the MP$ link can take longer to 
			//get video player
			let player = video.assets.player;
			let m3u8 = video.assets.hls;
			let mp4url="";
			//no mp4 url until it is encoded.
			//let mp4Url = video.assets.mp4;
		
			//the checkMp4 fucntion will poll the status until the mp4 url is encoded.
			checkMp4(videoId, mp4url, videoName);
			
		    var iframecode = "iframe id='videoPlayer', src='"+player+"#autoplay', height='100%', width='100%'";
			//not ready to send to the 
			return res.render('result',{videoId, videoName,player, iframecode});
	}).catch((error) => {
	    console.log(error);
	});
	
	

});


//testing on 3001
app.listen(3002, () =>
  console.log('Example app listening on port 3002!'),
);
process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log(err)
    // Note: after client disconnect, the subprocess will cause an Error EPIPE, which can only be caught this way.
});

function checkMp4(videoId, mp4, videoName) {
	console.log("checking mp4 encoding status");
	let status = client.videos.getStatus(videoId);
    status.then(function(videoStats){
	 // console.log(videoStats);
	  let playable = videoStats.encoding.playable;
	  let qualitylist = videoStats.encoding.qualities;
	  console.log("is video playable?", playable);
	  //only look for the mp4 if the video is playable
	  //when still encoding, sometimes the mp4 status does not appear immediately
	  if(playable){
		 console.log("video is playable");
	    for(let i=0; i<qualitylist.length; i++){
		  if(qualitylist[i].type == "mp4"){
			  //mp4
			  console.log("mp4 encoding status: ",qualitylist[i].status);
			  
			  if(qualitylist[i].status == "encoded"){
			  	//the video is ready - call the apivideo status API for the mp4 url
				  
				  let getmp4Url = client.videos.update(videoId, {	title: videoName});
											console.log(getmp4Url);
				getmp4Url.then(function(video) {
					mp4 = video.assets.mp4;
					console.log("got the mp4url", mp4);
				 	 //now we have the mp4 url, we can 
				 	 //we can call the API for captions
					makeModerationRequest(mp4,videoName, videoId);
				}).catch((error) => {
	    			console.log(error);
				});
			  }else{
			  	//not encoded yet, wait 2 sec and re-reun checkMp4
				setTimeout(checkMp4,2000,videoId, mp4, videoName);
			  }
		  }
	    }
	  }else{
	  	setTimeout(checkMp4,2000,videoId, mp4, videoName);
	  }
  }).catch((error) => {
	    console.log(error);
	});
	
	
	
	
}

async function makeModerationRequest(mp4,videoName, videoId){
	console.log("requesting moderation");
	
	
	
		var options = {
			method: 'POST',
			url: 'https://api.thehive.ai/api/v2/task/sync',
			headers: {
				accept: 'application/json',
				authorization: 'token ' + hiveKey
			},
			form: {image_url:mp4}
		};  
		console.log(options);	
		request(options, function (error, response, body) {
			if (error) throw new Error(error);
	  
			console.log(body);
			//run through the moderation suite	
			moderationSummary(body, videoId);
	 	   //we have each word, so we need to parse into sentences
	  	  //then the VTT we create can be uploaded to apivideo
	 	   
		});	
	
		
}
	
	
	function moderationSummary(results, videoId){
	  //so we need to parse the JSON list of each frame moderated
	  //moderation is in results.status[0].response.output[i]\
		console.log(results);
		results = JSON.parse(results);
	console.log(results);
		let frameResults = results.status[0].response;
		
		//each attribute to be tested has an empty array
		let yes_nazi = [];
		let safeForWork=[];
		let yes_female_nudity=[];
		let yes_male_nudity=[];
		let yes_male_shirtless=[];
		let yes_female_swimwear=[];
		let no_guns=[];
		let no_smoking=[];
		
		//add the details for each tested frame into each array
		for (let i=0;i<frameResults.output.length;i++){
		
			for(let j=0;j<frameResults.output[0].classes.length;j++){
			//iterate through each value
				if (frameResults.output[i].classes[j].class =="general_not_nsfw_not_suggestive"){
					//do something
					safeForWork[i] = Math.round(frameResults.output[i].classes[j].score*100)/100;
					if(frameResults.output[i].classes[j].score> threshold){		
					}	
				}
				else if (frameResults.output[i].classes[j].class =="yes_male_nudity"){
					//do something
					yes_male_nudity[i] = Math.round(frameResults.output[i].classes[j].score*100)/100;
					if(frameResults.output[i].classes[j].score> threshold){
					}	
				}
				else if (frameResults.output[i].classes[j].class =="yes_female_nudity"){
					//do something
					yes_female_nudity[i] = Math.round(frameResults.output[i].classes[j].score*100)/100;
					if(frameResults.output[i].classes[j].score> threshold){
					}	
				}
				else if (frameResults.output[i].classes[j].class =="yes_male_shirtless"){
					//do something
					yes_male_shirtless[i] = Math.round(frameResults.output[i].classes[j].score*100)/100;
					if(frameResults.output[i].classes[j].score> threshold){
					}	
				}
				else if (frameResults.output[i].classes[j].class =="yes_female_swimwear"){
					//do something
					yes_female_swimwear[i] = Math.round(frameResults.output[i].classes[j].score*100)/100;
					if(frameResults.output[i].classes[j].score> threshold){
					}	
				}
				else if (frameResults.output[i].classes[j].class =="yes_nazi"){
					//do something
					yes_nazi[i] = Math.round(frameResults.output[i].classes[j].score*100)/100;
					if(frameResults.output[i].classes[j].score> threshold){
					}	
				}
				else if (frameResults.output[i].classes[j].class =="no_gun"){
					//do something
					no_guns[i] = Math.round(frameResults.output[i].classes[j].score*100)/100;
					if(frameResults.output[i].classes[j].score> threshold){
					}	
				}
				else if (frameResults.output[i].classes[j].class =="no_smoking"){
					//do something
					no_smoking[i] = Math.round(frameResults.output[i].classes[j].score*100)/100;
					if(frameResults.output[i].classes[j].score> threshold){
					}	
				}
		
			}	
		}
		console.log("frames analysed: ", frameResults.output.length);
		console.log("safe for work?");
		console.log(safeForWork,);
		let SFWarray = minMaxMedian(safeForWork);
		console.log("nude man");
		console.log(yes_male_nudity);
	    let NMarray = minMaxMedian(yes_male_nudity);
		console.log("nude woman");
		console.log(yes_female_nudity);
	    let NWarray = minMaxMedian(yes_female_nudity);
		console.log("shirtless man");
		console.log(yes_male_shirtless);
	    let SMarray = minMaxMedian(yes_male_shirtless);
		console.log("female swimwear");
		console.log(yes_female_swimwear);
	    let FSarray = minMaxMedian(yes_female_swimwear);
		console.log("there be nazis?");
		console.log(yes_nazi);
	    let naziarray = minMaxMedian(yes_nazi);
		console.log("no guns??");
		console.log(no_guns);
	    let noguns = minMaxMedian((no_guns));
		console.log("no smoking?");
		console.log(no_smoking);
	    let nosmoking = minMaxMedian(no_smoking);
		
	
		//now for pass fail.
		//SFW.  if <90% of frames arn SFW (Threshold)
		//[min, max, avg, counter, bottomCounter];
		let moderation = []
		//if the median value is not 90% cinfindent to be safe - that means at least 50% of teh frames are not 90% confident to be safe...
		if(SFWarray[5] < threshold){
			moderation.push("NSFW");
		}else{
			//>90% are safe
			moderation.push("SFW");
		}
		//if one frame is 90% sure nudity - nudity
		if(NWarray[3] >0){
			moderation.push("female_nudity");
		}
		if(NMarray[3] >0){
			moderation.push("male_nudity");
		}
		//of one framce is 90% sure of Nazis - NAZI.
		if(naziarray[3] >0){
			moderation.push("nazism");
		}else{
			moderation.push("no_nazism");
		}
		//if we are 90% sure we see one shirltless man - shirtless
		if(SMarray[3]>0){
			moderation.push("Shirtless_male");
		}else{
			moderation.push("no_Shirtless_male");
		}
		if(FSarray[3]>0){
			moderation.push("female_swimwear");
		}else{
			moderation.push("no_female_swimwear");
		}
		
		//if one frame shows a gun - ther eare guns...
		if(noguns[4] >0){
			moderation.push("yes_guns");
		}else{
			moderation.push("no_guns");
		}
		
		//if one frame shows smoking - there is smoking...
		if(nosmoking[4] >0){
			moderation.push("yes_smoking");
		}else{
			moderation.push("no_smoking");
		}
		moderation.push("moderation_demo");
		console.log(moderation);
		//now update tags in api.video with the moderation tags
		let updateTags = client.videos.update(videoId, {tags: moderation});
		
		 updateTags.then(function(video) {
		  console.log(video.title, video.tags);
		}).catch(function(error) {
		  console.error(error);
		});
	
  
	}

	function minMaxMedian(array){
		let min = Math.min.apply(Math, array);
		let max = Math.max.apply(Math, array);
		const average = list => list.reduce((prev, curr) => prev + curr) / list.length;	
		array.sort();
		console.log("sorted array", array);
		let median ="";
		if(array.length%2 == 0){
			median = array[array.length/2];
		}else{
			median = (array[Math.floor(array.length/2)]+array[Math.ceil(array.length/2)])/2
		}
		
		let avg = average(array);
		let counter = 0;
		let bottomCounter=0;
		array.forEach(function(element) {
	        if (element > threshold) {
	            counter++;
	        }
	    });
		array.forEach(function(element) {
	        if (element < (1-threshold)) {
	            bottomCounter++;
	        }
	    });
	
		console.log(min, max, avg, counter, bottomCounter, median);
		results = [min, max, avg, counter, bottomCounter, median];
		return results;
		
		
	}

	