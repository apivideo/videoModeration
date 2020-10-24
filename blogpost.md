#Video Content Moderation

User generated content (UGC) is taking over the internet.  From video product reviews to vlogging to online education - video is being created at the fastest pace yet. Many sites are looking for ways to easily incorporate UGC video on their sites.  One concern is that - there will always be a few bad actors who post inappropriate content, and some moderation is required to prevent that from being associated with their brand.

But moderation takes people (and takes a toll on those people) and time.  Part of the immediacy of video is that it can be instantly available for consumption.  What if we could use machine learning to automate the moderation process?

In this post, I'll walk through an implementation of video moderation that allows any video to be uploaded to the website.  But before it can be viewed, it is scanned for content, tested against rules, and then either accepted or rejected based on those rules.


## User Generated Video

I recently bought some dishwasher tabs from Amazon. A few days after the tabs arrived (and one was in the machine dissolving and washing the dishes), I received an e-mail from Amazon asking for a review.  Clicking the link, I could leave a *video* review of dishwasher tabs.

My children have been creating videos for their classes. Instead of speaking in front of the class, videos of presentations are being created. No matter what is uploaded to your site - it is your site - and ensuring appropriateness is essential.

Let's walk through the steps I tool to build a user generated video site that uses moderation for each video uploaded.  The code is available on [Github](https://github.com/dougsillars/videoModeration).

## Video creation and upload

we begin with a simple landing page with a form to add videos.  There are also links that will display videos based on the moderation rules that have been put in place.

For the video upload, transcoding and delivery, we'll be using [api.video](https://api.video). The upload uses [delegated upload](https://docs.api.video/reference#videos-delegated-upload), which is essentially a public key.  Anyone uploading to this endpoint will upload into your account.  In order to ensure that there are no file size limitations, the landing page uses the HTML5 File and Blob apis to slice the video and upload in 50 MB segments.  Because this is a demo, not only do we display the % upload, but the number of segments created, and the status of the segments being uploaded.

Once the video is uploaded, the server returns the videoId of the uploaded video. A POST is made to the server, and the videoId is used to change the name of the video, and apply a "moderation" tag to the video.  api.video immediately begins creating video streams for playback. However, for moderation, HiveAI requires an mp4 version of the video.  The server waits until the mp4 is ready, and then sends the file for moderation.


The HIveAI checks 1 frame per second of the video (in our live demo, you are limited to videos of 25s or less).  For each frame, a JSON output of scoring is created, and the full JSON is returned to the server:

[
	{
		"class": "general_not_nsfw_not_suggestive",
		"score": 0.00460230773187999
	},
	{
		"class": "general_nsfw",
		"score": 5.180850871024288e-06
	},
	{
		"class": "general_suggestive",
		"score": 0.995392511417249
	},
	{
		"class": "no_female_underwear",
		"score": 0.9998768576722025
	},
	{
		"class": "yes_female_underwear",
		"score": 0.00012314232779748514
	},
	{
		"class": "no_male_underwear",
		"score": 0.9302616202675269
	},
	{
		"class": "yes_male_underwear",
		"score": 0.06973837973247315
	},
	{
		"class": "no_sex_toy",
		"score": 0.9999997229702459
	},
	{
		"class": "yes_sex_toy",
		"score": 2.7702975407256367e-07
	},
	{
		"class": "no_female_nudity",
		"score": 0.999910003690495
	},
	{
		"class": "yes_female_nudity",
		"score": 8.999630950496571e-05
	},
	{
		"class": "no_male_nudity",
		"score": 0.9999998132209087
	},
	{
		"class": "yes_male_nudity",
		"score": 1.867790912705672e-07
	},
	{
		"class": "no_female_swimwear",
		"score": 4.0848333050706e-05
	},
	{
		"class": "yes_female_swimwear",
		"score": 0.9999591516669492
	},
	{
		"class": "no_male_shirtless",
		"score": 2.629924008109094e-05
	},
	{
		"class": "yes_male_shirtless",
		"score": 0.9999737007599189
	},
	{
		"class": "no_text",
		"score": 6.026089952507653e-05
	},
	{
		"class": "text",
		"score": 0.999939739100475
	},
	{
		"class": "animated",
		"score": 0.00013881244108123687
	},
	{
		"class": "hybrid",
		"score": 8.14199932402881e-05
	},
	{
		"class": "natural",
		"score": 0.9997797675656784
	},
	{
		"class": "animated_gun",
		"score": 6.522094074128612e-10
	},
	{
		"class": "gun_in_hand",
		"score": 6.137096663040667e-06
	},
	{
		"class": "gun_not_in_hand",
		"score": 2.2004577099992295e-07
	},
	{
		"class": "no_gun",
		"score": 0.9999936422053565
	},
	{
		"class": "culinary_knife_in_hand",
		"score": 3.0789637177052934e-08
	},
	{
		"class": "knife_in_hand",
		"score": 1.8713957163195016e-07
	},
	{
		"class": "knife_not_in_hand",
		"score": 1.129600702858632e-06
	},
	{
		"class": "no_knife",
		"score": 0.9999986524700883
	},
	{
		"class": "a_little_bloody",
		"score": 2.186161859639984e-09
	},
	{
		"class": "no_blood",
		"score": 0.9999998341744278
	},
	{
		"class": "other_blood",
		"score": 1.5914745400126406e-07
	},
	{
		"class": "very_bloody",
		"score": 4.491956553041061e-09
	},
	{
		"class": "no_pills",
		"score": 0.9999981084914187
	},
	{
		"class": "yes_pills",
		"score": 1.8915085814227862e-06
	},
	{
		"class": "no_smoking",
		"score": 0.9999999517841532
	},
	{
		"class": "yes_smoking",
		"score": 4.82158468586942e-08
	},
	{
		"class": "illicit_injectables",
		"score": 0.0002999959823210737
	},
	{
		"class": "medical_injectables",
		"score": 2.395876558415286e-07
	},
	{
		"class": "no_injectables",
		"score": 0.9996997644300231
	},
	{
		"class": "no_nazi",
		"score": 0.999999980711224
	},
	{
		"class": "yes_nazi",
		"score": 1.92887759695214e-08
	},
	{
		"class": "no_kkk",
		"score": 0.9999981147441314
	},
	{
		"class": "yes_kkk",
		"score": 1.8852558684923883e-06
	},
	{
		"class": "no_middle_finger",
		"score": 0.9998526722965121
	},
	{
		"class": "yes_middle_finger",
		"score": 0.00014732770348785398
	},
	{
		"class": "no_terrorist",
		"score": 0.9999999999999949
	},
	{
		"class": "yes_terrorist",
		"score": 5.104216020173999e-15
	}
]


### Scoring

Now that we have tested 1 frame per second and have results, we can create criteria for pass/fail/categorisation of the video.  as the categories tested suggest, we can test for how clothed the people in the video are: nudity, underwear and swimwear; violence: guns, knives, blood; drug use: smoking and harder drugs, and finally hate groups and the use of the middle finger.

For the scoring in this sample app - to be considered SFW, the median frame score must be above 0.90 confident that it is SFW,  

For guns, nazism, smoking - the test is much stricter - if *ANY* frame hits 90% confidence of these being present - the video fails, and will be placed in the "yes" category for these items.

Finally, once the score is created, an array of tags are created, and uploaded to the api.video video. 

### Viewing the videos

The Baywatch intro video was graded as 'not safe for work', 'shirtless_male', "female_swimwear", "no_guns", "no_smoking" and "no_nazism".  Clicking in these categories, we are able to see Baywatch video.

## Caveats

Note that the HiveAI video moderation is only checking 1 frame every second.  The trailer for Indiana Jones and the Last Crusade has a very short clip of a Nazi parade.  However, since the display was so short, it was not picked up as a frame for analysis.

