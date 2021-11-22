let commentButtons = document.querySelectorAll(".comments-button")
let greyBox = document.querySelector("#greyed-out")
let commentBox = document.querySelector('#comment-section')
let emojiButtons = document.querySelectorAll(".emoji-button")

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