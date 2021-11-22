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
        console.log("im being pressed")
        emojiButton.classList.toggle("emoji-clicked")
    })
})

document.querySelector("#greyed-out").addEventListener("click", () => {
    greyBox.style.zIndex = "-100"
    commentBox.style.zIndex = "-100"
})