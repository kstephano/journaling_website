const uuid = require('uuid');

let templatePost = {   
    id: "96584286-4b00-48da-bc1d-fa1eb82a5ced",
    time: 1637585802352,
    title: "Post Heading",
    body: {text: "Body text", gif: "https://c.tenor.com/58egLELFYTsAAAAM/vibing.gif"},
    comments: [{id: "96584286-4b00-48da-bc1d-fa1eb82a5cee", time: 1637585812352, body: "comment 1"}, 
    {id: "96584286-4b00-48da-bc1d-fa1eb82a5cea", time: 1637585813352, body: "comment 2"}],
    emojis: {emoji1: 0, emoji2: 5, emoji3: 11}
}

let form = document.querySelector('#comment-form')
form.addEventListener("submit", postComment)

let postArray = [templatePost, templatePost, templatePost, templatePost, templatePost, templatePost, templatePost]

let holdsPostID;

class Post {
    constructor(data) {
        this.id = data.id
        this.timestamp = data.timestamp
        this.title = data.title;
        this.body = data.body.text;
        this.gifUrl = data.body.gif;
        this.comments = data.comments;
        this.emoji1 = data.emojis.emoji1;
        this.emoji2 = data.emojis.emoji2;
        this.emoji3 = data.emojis.emoji3;
    }

    static get all() {
        const posts = postArray.map((data) => new Post(data));
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
        let emojiButton2 = document.createElement("div")
        emojiButton2.classList.add("emoji-button")
        let emojiButton3 = document.createElement("div")
        emojiButton3.classList.add("emoji-button")
        let commentsButton = document.createElement("div")
        commentsButton.classList.add("comments-button")
        
        let postCardList = [postTop, postBody, postBottom]
        let postBodyList = [postBodyGif, postBodyText]
        let postBottomList = [emojisContainer, commentsButton]
        let emojisContainerList = [emojiButton1, emojiButton2, emojiButton3]

        postHeading.textContent = this.title
        postBodyGif.src = this.gifUrl
        postBodyText.textContent = this.body
        emojiButton1.textContent = this.emoji1
        emojiButton2.textContent = this.emoji2
        emojiButton3.textContent = this.emoji3
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
        postBottomList.forEach(element => {
            postBottom.append(element)
        })
        commentsButton.addEventListener("click", (e) => {
            greyBox.style.zIndex = "99"
            commentBox.style.zIndex = "100"
            innerCommentBox.style.zIndex = "101"
            commentScrollSection.style.zIndex = "101"
            // console.log(e.target.id)
            appendComments(e.target.id)
            holdsPostID = e.target.id
 
        })
        emojisContainerList.forEach(element => {
            emojisContainer.append(element)
            element.addEventListener("click", () => {
            element.classList.toggle("emoji-clicked")}
        )})


    }

    static drawAll(postsArray) {
        let arr = Post.all
        arr.forEach(post => {
            post.draw
        })
    }


}



function appendComments(id) {
    let post = postArray.filter(post => post.id === id)[0]
    // console.log(post.comments)
    let comments = post.comments
    // console.log(comments)
    comments.forEach(comment => {
        drawComment(comment)
    })
}

function drawComment(comment) {
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

    commentArea.append(commentCard)
}

Post.drawAll(postArray)

// console.log(Date(1637585812352))

function dateFormat(timestamp){
    let date = new Date(timestamp)

    return date.getHours()+":"+date.getMinutes()+" "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
}

async function postComment(e){
    e.preventDefault()
    let input = e.target.commentInput.value
    if (input){
        // let commentID = uuid.v4()
        let commentData = {
            id: uuid.v4(),
            body: input,
            time: Date.now()
        }

        const options = {
            method: "POST",
            body: JSON.stringify(commentData),
            headers: {
                "Content-Type": "application/json"
            }
        }

        // let res = await fetch(`/`, options)
        // let data = await res.json()
        drawComment(commentData)
        e.target.commentInput.value = ""

    }
}
let homepage = "http//:localhost:3000"

async function getSpecificPost(id) {
    let res = await fetch(`${homepage}/search/${id}`)
    let data = await res.json()

    
}