let templatePost = {   
        id: "96584286-4b00-48da-bc1d-fa1eb82a5ced",
        time: 1637585802352,
        title: "Post Heading",
        body: {text: "Body text", gif: "https://c.tenor.com/58egLELFYTsAAAAM/vibing.gif"},
        comments: [{id: "96584286-4b00-48da-bc1d-fa1eb82a5cee", time: 1637585812352, body: "comment 1"}, 
        {id: "96584286-4b00-48da-bc1d-fa1eb82a5cea", time: 1637585813352, body: "comment 2"}],
        emojis: {"emoji1": 0, "emoji2": 5, "emoji3": 11}
}

let postArray = [templatePost]

class Post {
    constructor(data) {
        this.id = data.id
        this.timestamp = data.timestamp
        this.title = data.title;
        this.body = data.body;
        this.gifUrl = data.gifUrl;
        this.comments = data.comments;
        this.numOfLikeReacts = data.numOfLikeReacts;
        this.numOfLoveReacts = data.numOfLoveReacts;
        this.numOfLaughReacts = data.numOfLaughReacts;
    }

    static get all() {
        const entries = postArray.map((data) => new Post(data));
        return entries;
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

    draw() {
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
        
        let postBodyList = [postBodyGif, postBodyText]
        let postBottomList = [emojisContainer, commentsButton]

        postHeading.textContent = this.title
        postBodyGif.src = this.gifUrl
        postBodyText.textContent = this.body
        emojiButton1.textContent = this.numOfLikeReacts
        emojiButton2.textContent = this.numOfLoveReacts
        emojiButton3.textContent = this.numOfLaughReacts
        commentsButton.textContent = "comments"
        commentsButton.id = this.id

        let gallery = document.querySelector('gallery')
        gallery.append(postCard)
    }


}
