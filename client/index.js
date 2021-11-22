const uuid = require('uuid');

if (!uuid.validate(localStorage.getItem("id"))) {
    localStorage.removeItem("id")
    localStorage.setItem("id", uuid.v4())
}

console.log(uuid.v4())
console.log(localStorage.getItem("id"))

let commentButtons = document.querySelectorAll(".comments-button")
let greyBox = document.querySelector("#greyed-out")
let commentBox = document.querySelector('#comment-section')
let emojiButtons = document.querySelectorAll(".emoji-button")
let uniqueID = document.querySelector('#unique-id')

uniqueID.textContent = `Your Unique ID is: ${localStorage.getItem("id")}`

commentButtons.forEach(commentBut => commentBut.addEventListener("click", () => {
    greyBox.style.zIndex = "99"
    commentBox.style.zIndex = "100"
}))

emojiButtons.forEach(emojiButton => {
    emojiButton.addEventListener("click", () => {
        // console.log("im being pressed")
        emojiButton.classList.toggle("emoji-clicked")
    })
})

document.querySelector("#greyed-out").addEventListener("click", () => {
    greyBox.style.zIndex = "-100"
    commentBox.style.zIndex = "-100"
})

// async function init() {
//     // let res = await fetch('http//:localhost:3000/getposts')
//     // let data = await res.json()
//     let listOfPosts = templatePosts

// }

// function createPost(postJSON) {
//     let postCard = document.createElement("div").classList.add("post-card")

// }

// let templatePosts = [
//     {   
//         id: "96584286-4b00-48da-bc1d-fa1eb82a5ced",
//         time: 1637585802352,
//         title: "Post Heading",
//         body: {text: "Body text", gif: "https://c.tenor.com/58egLELFYTsAAAAM/vibing.gif"},
//         comments: [{id: "96584286-4b00-48da-bc1d-fa1eb82a5cee", time: 1637585812352, body: "comment 1"}, 
//         {id: "96584286-4b00-48da-bc1d-fa1eb82a5cea", time: 1637585813352, body: "comment 2"}],
//         emojis: {"emoji1": 0, "emoji2": 5, "emoji3": 11}
//     }
// ]

// // let currentUTCTimestap = currentLocalTimestap.
// let date = Date.now();

// console.log(Date(date))
