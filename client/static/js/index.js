const uuid = require('uuid');

if (!uuid.validate(localStorage.getItem("id"))) {
    localStorage.removeItem("id")
    localStorage.setItem("id", uuid.v4())
}

let greyBox = document.querySelector("#greyed-out")
let commentBox = document.querySelector('#comment-section')
let uniqueID = document.querySelector('#unique-id')
let commentArea = document.querySelector('.inner-comment-box')

uniqueID.textContent = `Your Unique ID is: ${localStorage.getItem("id")}`

let commentButtons = document.querySelectorAll(".comments-button")

let emojiButtons = document.querySelectorAll(".emoji-button")

document.querySelector("#greyed-out").addEventListener("click", () => {
    greyBox.style.zIndex = "-100"
    commentBox.style.zIndex = "-100"
    commentArea.textContent = ''

})



