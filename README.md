# Postify - Journaling website
Created by: Guy Margalith, Rahib Rahman, Raj Sharma, Kelvin Stephano
## Description
Postify is a community driven journaling website which allows users to anonymously post journal entries, or posts. These posts contain a title, text and an optional gif. The gifs selected in the entry page make use of the gify API to return results related to the users search term. Users can view posts on the homepage and can scroll down to load more posts. Users can leave anonymous comments on posts using a comment button and can also react to the post with three different emojis - Like, Love, Funny. 
This website is deployed on [Netlify]() and has an Node Express server deployed on [Heroku](https://journaling-website.herokuapp.com/).

## Installation
Fork and clone the repo into your desired directionory. Open a terminal in the cloned repo and navigate to the [server folder](./server). Use command `npm install`. Then navigate back to the main folder and into the [client folder](./client). Use command `npm install` again.
Inside the [client folder](./client), navigate to the [javascript folder](./client/static/js) and open the files in an IDE. Change the line `const urlUsed = fetchUrls[1]` to `const urlUsed = fetchUrls[0]` to be able to locally launch the client. 
To launch the server navigate to [server folder](./server) 

## Usage
