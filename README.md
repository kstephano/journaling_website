# Postify - Journaling website
Created by: Guy Margalith, Rahib Rahman, Raj Sharma, Kelvin Stephano
## Description
Postify is a community driven journaling website which allows users to anonymously post journal entries, or posts. These posts contain a title, text and an optional gif. The gifs selected in the entry page make use of the [gify API](https://developers.giphy.com/docs/api/) to return results related to the users search term. Users can view posts on the homepage and can scroll down to load more posts. Users can leave anonymous comments on posts using a comment button and can also react to the post with three different emojis - Like, Love, Funny. 
This website is deployed on [Netlify]() and has an Node Express server deployed on [Heroku](https://journaling-website.herokuapp.com/).

## Installation
Fork and clone the repo into your desired directory. Open a terminal in the cloned repo and navigate to the [server folder](./server). Use command `npm install`. Then navigate back to the main folder and into the [client folder](./client). Use command `npm install` again.
Inside the [client folder](./client), navigate to the [javascript folder](./client/static/js) and open the files in an IDE. Note: there are two urls in use - one for local one for Heroku. At default it is linked to the Heroku url. To change the url, change line `const urlUsed = fetchUrls[1]` to `const urlUsed = fetchUrls[0]` to be able to locally launch the client. 
To launch the server navigate to [server folder](./server) 

## Usage
- From the server folder, run `npm start` to launch the server
- From the client folder, open the index.html with what you want
### Add Entries page
![image](https://user-images.githubusercontent.com/92591642/143436695-1cb5cdea-22a3-4f8d-9d94-bb802ade4408.png)
### Homepage - scroll down for more posts, each post is scrollable if there is overflow
![image](https://user-images.githubusercontent.com/92591642/143438790-93538737-f169-4772-a234-102c738a76fa.png)
### Comments popup - appears when you click on comments button
![image](https://user-images.githubusercontent.com/92591642/143440201-bad16205-2764-4bb2-bd4c-d22a64eec683.png)
