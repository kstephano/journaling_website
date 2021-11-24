const uuid = require('uuid');

// Example Post object used for testing purposes
let templatePost = {   
    id: "96584286-4b00-48da-bc1d-fa1eb82a5ced",
    time: 1637585802352,
    title: "Post Heading",
    body: {text: "Body text", gif: "https://c.tenor.com/58egLELFYTsAAAAM/vibing.gif"},
    comments: [{id: "96584286-4b00-48da-bc1d-fa1eb82a5cee", time: 1637585812352, body: "comment 1"}, 
    {id: "96584286-4b00-48da-bc1d-fa1eb82a5cea", time: 1637585813352, body: "comment 2"}],
    emojis: {likeCount: 0, loveCount: 5, laughCount: 11}
}
let pageNum = 1;



// Listens for when 
let form = document.querySelector('#comment-form')
form.addEventListener("submit", postComment)

let loadBtn = document.querySelector("#load-btn");
loadBtn.addEventListener("click", getPosts)

let newestArray = [];

let postArray = [];

let emojiArray = [];

let holdsPostID;

window.addEventListener("beforeunload", unload)

// Class used when handling Posts
class Post {
    // Post properties
    constructor(data) {
        this.id = data.id
        this.timestamp = data.timestamp
        this.title = data.title;
        this.body = data.body.text;
        this.gifUrl = data.body.gifUrl;
        this.comments = data.comments;
        this.likeCount = data.emojis.likeCount;
        this.loveCount = data.emojis.loveCount;
        this.laughCount = data.emojis.laughCount;
    }

    // returns an array of Post objects using postArray
    static get all() {
        const posts = newestArray.map((data) => new Post(data));
        return posts;
    }

    static findById(id) {
        try {
            const data = postArray.filter((entry) => entry.id === id)[0];
            const entry = new Post(data);
            return entry;
        } catch(e) {
            throw new Error('Entry does not exist in the data');
        }
    }

    // used on Post objects, to load posts on the website
    get draw() {
        let postCard = document.createElement("div")
        postCard.classList.add("post-card")
        let postTop = document.createElement("div")
        postTop.classList.add("post-top")
        let postBody = document.createElement("div")
        postBody.classList.add("post-body")
        let postBottom = document.createElement("div")
        postBottom.classList.add("post-bottom")
        let postHeading = document.createElement("h4")
        postHeading.classList.add("post-heading")
        let postBodyGif = document.createElement("img")
        postBodyGif.classList.add("post-body-gif")
        let postBodyText = document.createElement("p")
        postBodyText.classList.add("post-body-text")
        let emojisContainer = document.createElement("div")
        emojisContainer.classList.add("emojis-container")
        let emojiButton1 = document.createElement("div")
        emojiButton1.classList.add("emoji-button")
        emojiButton1.setAttribute("value", "likeCount")
        let emojiButton2 = document.createElement("div")
        emojiButton2.classList.add("emoji-button")
        emojiButton2.setAttribute("value", "loveCount")
        let emojiButton3 = document.createElement("div")
        emojiButton3.classList.add("emoji-button")
        emojiButton3.setAttribute("value", "laughCount")
        let commentsButton = document.createElement("div")
        commentsButton.classList.add("comments-button")
        
        let postCardList = [postTop, postBody, postBottom]
        let postBodyList = [postBodyGif, postBodyText]
        let postBottomList = [emojisContainer, commentsButton]
        let emojisContainerList = [emojiButton1, emojiButton2, emojiButton3]

        postHeading.textContent = this.title
        if (this.gifUrl) {
            postBodyGif.src = this.gifUrl
        }
        postBodyText.textContent = this.body
        emojiButton1.textContent = this.likeCount
        emojiButton2.textContent = this.loveCount
        emojiButton3.textContent = this.laughCount
        commentsButton.textContent = "comments"
        commentsButton.id = this.id

        let gallery = document.querySelector('#gallery')
        let greyBox = document.querySelector("#greyed-out")
        let commentBox = document.querySelector('#comment-section')
        let innerCommentBox = document.querySelector('.inner-comment-box')
        let commentScrollSection = document.querySelector('.comment-create')

        gallery.append(postCard)
        postCardList.forEach(element => {
            postCard.append(element)
        })
        postTop.append(postHeading)
        postBodyList.forEach(element => {
            postBody.append(element)
        })
        if (!this.gifUrl) {
            postBodyGif.remove()
        }
        postBottomList.forEach(element => {
            postBottom.append(element)
        })
        commentsButton.addEventListener("click", (e) => {
            holdsPostID = e.target.id
            greyBox.style.zIndex = "99"
            commentBox.style.zIndex = "100"
            innerCommentBox.style.zIndex = "101"
            commentScrollSection.style.zIndex = "101"
            appendComments(e.target.id)
        })
        emojisContainerList.forEach(element => {
            emojisContainer.append(element)
            element.addEventListener("click", () => {
            element.classList.toggle("emoji-clicked");
            if (element.classList.contains("emoji-clicked")) {
                const index = emojiArray.findIndex(element => element.id === commentsButton.id);
                emojiArray[index].emojis[element.getAttribute("value")] = true;
                element.textContent = Number(element.textContent)+1;
            } else {
                const index = emojiArray.findIndex(element => element.id === commentsButton.id);
                emojiArray[index].emojis[element.getAttribute("value")] = false;
                element.textContent = Number(element.textContent)-1;
            }
        }
        )})
    }
    // calls draw method on each Post in array returned from Post.all
    static drawAll() {
        let arr = Post.all
        arr.forEach(post => {
            post.draw
        })
        newestArray = [];
    }
}

getPosts();

// New appendComments function, will try to fetch new comments before loading them
async function appendComments(id) {
    try {
        let res = await fetch(`https://stormy-bastion-86346.herokuapp.com/search/${id}`)
        let data = await res.json()
        let newComments = data.entry.comments
        const index = postArray.findIndex(element => element.id == holdsPostID)
        postArray[index].comments = newComments
    } catch(e) {
        console.log(e)
    }
    let post = postArray.filter(post => post.id === id)[0]
    let comments = post.comments
    comments.forEach(comment => {
        drawComment(comment)
    })
}

// Appends on default a comment object to the comment Area
function drawComment(comment, append=true) {
    let commentCard = document.createElement("div")
    commentCard.classList.add("comment-card")
    let commentDate = document.createElement("p")
    commentDate.classList.add("comment-date")
    let commentBody = document.createElement("p")
    commentBody.classList.add("comment-body")

    commentCard.id = comment.id
    commentDate.textContent = dateFormat(comment.time)
    commentBody.textContent = comment.body
    let commentCardList = [commentDate, commentBody]
    let commentArea = document.querySelector('.inner-comment-box')
    commentCardList.forEach(element => {
        commentCard.append(element)
    })

    append ? commentArea.append(commentCard) : commentArea.prepend(commentCard)
}


// used to format the date from a timestamp
function dateFormat(timestamp){
    let date = new Date(timestamp)

    return date.getHours()+":"+date.getMinutes()+" "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
}

// Runs when user clicks on submit comment. posts commment to server and prepends comment on client
async function postComment(e){
    e.preventDefault()
    let input = e.target.commentInput.value
    if (input){
        let commentData = {
            id: uuid.v4(),
            body: input,
            time: Date.now()
        }
        const index = postArray.findIndex(element => element.id == holdsPostID)
        postArray[index].comments.unshift(commentData)

        const options = {
            method: "POST",
            body: JSON.stringify(commentData),
            headers: {
                "Content-Type": "application/json"
            }
        }
        let res = await fetch(`https://stormy-bastion-86346.herokuapp.com/update/comments/${holdsPostID}`, options)
        drawComment(commentData, false)
        e.target.commentInput.value = ""
    }
}

async function getPosts(e) {
    try{
        response = await fetch(`https://stormy-bastion-86346.herokuapp.com/search/page/${pageNum}`);
        data = await response.json();
        console.log(data)
        data.entries.forEach(post => {
            if(!postArray.includes(post)){
                newestArray.push(post);
                postArray.push(post);
                emojiArray.push({id: post.id, emojis: {loveCount: false, laughCount: false, likeCount: false}})
            };
        });
        console.log(emojiArray);
        Post.drawAll();
        pageNum++
    } catch(err) {
        console.log(err);
        e.target.style.display = "none";
        let noMore = document.createElement("p");
        noMore.textContent = "No more posts to load!";
        noMore.setAttribute("class", "no-more-msg")
        document.querySelector("main").append(noMore);
    }
}

async function unload(e) {    
    let options = {
        method: "POST",
        body: JSON.stringify({emojis: emojiArray}),
        headers: {
			"Content-Type": "application/json"
		}
    }
    
    try{
        await fetch("https://stormy-bastion-86346.herokuapp.com/update/emojis", options)
    } catch(err){
        console.log(err)
    }
    

    
    e.returnValue = "";
}
