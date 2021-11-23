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

// async function test() {
//     let response = await fetch(`https://api.giphy.com/v1/gifs/07h85fP8YleCWGRSjV?api_key=q7OQqQiFkKI87Cb4JZTdmON0sNbDV2hy`);
//     let data = await response.json();
//     let image = document.createElement("img");
//     image.setAttribute("src", data.data.embed_url);
//     document.querySelector("#gallery").appendChild(image);
// }

// test();





