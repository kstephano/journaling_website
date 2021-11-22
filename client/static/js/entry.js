let searchBtn = document.querySelector("#search-icon");
let gifCont = document.querySelector("#gifs");

const apiId = "3QiTkeYYexhSYHU3M2hEaHXVgZ5ogLkN";

gifTrend(gifCont);

searchBtn.addEventListener("click", gifWindow);
document.querySelector("#submit-btn").addEventListener("submit", upload)


async function gifWindow(e) {
    clearDiv(gifCont);
    let value = document.querySelector("#search-input").value;
    console.log(value)
    if(value){
        await gifSearching(gifCont, value)
    } else {
        await gifTrend(gifCont);
    }
};

async function gifTrend(div) {
    let response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiId}&rating=g&limit=20`);
    let data = await response.json();
    divBuilder(data, div);
}

async function gifSearching(div, str){
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiId}&rating=g&q=${str}&limit=20`);
    let data = await response.json();
    divBuilder(data, div);
}

function divBuilder(data, div){
    let gifs = data.data;

    for(let i = 0; i < gifs.length; i++){
        let gif = gifs[i].images.fixed_width_small;
        let img = document.createElement('img');
        img.setAttribute("src", gif.url);
        img.setAttribute("alt", gifs[i].title);
        img.setAttribute("value", gifs[i].id);
        img.setAttribute("id", gifs[i].id)
        div.appendChild(img);
        let listen = document.getElementById(gifs[i].id);
        listen.addEventListener("click", setGif);
    }
}

function clearDiv(div){
    div.innerHTML = "";
}

function setGif(e){
    let gif = e.target;
    let newGif = document.querySelector("#gif");
    newGif.setAttribute("src", gif.src);
    newGif.setAttribute("value", gif.id);
    // newGif.setAttribute("alt", gif.alt);
    // newGif.setAttribute("id", "selected")
    // div.appendChild(newGif);
}

async function upload(e) {
    e.preventDefault();
    let gifSelect = document.querySelector("#selected").getAttribute("value");
    console.log(gifSelect);

    let postData = {
        id: "", 
        time: Date.now(), 
        title: document.querySelector("#title-input").value, 
        body: {text: document.querySelector("#entry-content").value, gif: gifSelect}, 
        comments: [], 
        emojis: {emoji1: 0, emoji2: 0, emoji3: 0}
    }
    
	const options = {
		method: "POST",
		body: JSON.stringify(postData),
		headers: {
			"Content-Type": "application/json"
		}
	};
    try{
	    let response = await fetch("#", options);
        let resdata = await response.json();
        console.log(resdata);

    } catch(err) {
        console.log(err)
    }

    location.href = "index.html";
}