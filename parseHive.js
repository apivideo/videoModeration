'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('baywatch.json');
let results = JSON.parse(rawdata);
	let threshold = 0.9;
	
	
//console.log(results);
moderationSummary(results);
function moderationSummary(results){
  //so we need to parse the JSON list of each frame moderated
  //moderation is in results.status[0].response.output[i]\

	
	let frameResults = results.status[0].response;
	let yes_nazi = [];	
	let safeForWork=[];
	let yes_female_nudity=[];
	let yes_male_nudity=[];
	let yes_male_shirtless=[];
	let yes_female_swimwear=[];
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
	
	//now for pass fail.
	//SFW.  if <90% of frames arn SFW (Threshold)
	//[min, max, avg, counter, bottomCounter];
	let moderation = []
	if(SFWarray[3]/frameResults.output.length < threshold){
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
	if(naziarray[3] >0){
		moderation.push("nazism");
	}
	if(SMarray[3]/frameResults.output.length < threshold){
		moderation.push("Shirtless male");
	}
	if(FSarray[3]/frameResults.output.length < threshold){
		moderation.push("female swimwear");
	}
	console.log(moderation);
	
  
}

function minMaxMedian(array){
	let min = Math.min.apply(Math, array);
	let max = Math.max.apply(Math, array);
	const average = list => list.reduce((prev, curr) => prev + curr) / list.length;	
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
	
	console.log(min, max, avg, counter, bottomCounter);
	results = [min, max, avg, counter, bottomCounter];
	return results;
}