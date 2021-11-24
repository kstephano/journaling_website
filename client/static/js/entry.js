const uuid = require('uuid');

// initialise HTML elements as JS objects
const searchBtn = document.querySelector("#search-icon");
const gifCont = document.querySelector(".gif-scrolling-displayer");
const form = document.querySelector("form");

const apiId = "q7OQqQiFkKI87Cb4JZTdmON0sNbDV2hy";

// create placeholder img element to hold chosen gifs
const noGif = document.createElement("img");
noGif.setAttribute("src", "./assets/gifs/gif_placeholder.gif");
noGif.setAttribute("alt", "No GIF selection");
noGif.setAttribute("id", "no-gif");
noGif.style.width = "200px";

noGifOpt();
gifTrend(gifCont);
initListeners();

/**
 * Initialise listeners for the search button and submit button.
 */
function initListeners() {
    searchBtn.addEventListener("click", gifWindow);
    form.addEventListener("submit", upload)
}

/**
 * 
 */
async function gifWindow() {
    clearDiv(gifCont);
    noGifOpt();
    const value = document.querySelector("#search-input").value;
    console.log(value)
    if(value){
        await gifSearching(gifCont, value)
    } else {
        await gifTrend(gifCont);
    }
};

async function gifTrend(div) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiId}&rating=g&limit=10`);
    const data = await response.json();
    divBuilder(data, div);
}

async function gifSearching(div, str){
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiId}&rating=g&q=${str}&limit=10`);
    const data = await response.json();
    divBuilder(data, div);
}

function divBuilder(data, div){
    const gifs = data.data;

    for(let i = 0; i < gifs.length; i++){
        const gif = gifs[i].images.fixed_width;
        const img = document.createElement('img');
        img.setAttribute("src", gif.url);
        img.setAttribute("alt", gifs[i].title);
        img.setAttribute("value", gifs[i].images.original.url);
        img.setAttribute("id", gifs[i].images.original.url)
        div.appendChild(img);
        const listen = document.getElementById(gifs[i].images.original.url);
        listen.addEventListener("click", setGif);
    }
}

function clearDiv(div){
    div.textContent = "";
}

function setGif(e){
    const gif = e.target;
    const newGif = document.querySelector("#gif");
    newGif.setAttribute("src", gif.src);
    newGif.setAttribute("value", gif.id);
    // newGif.setAttribute("alt", gif.alt);
    // newGif.setAttribute("id", "selected")
    // div.appendChild(newGif);
}

async function upload(e) {
    e.preventDefault();
    const gifSelect = document.querySelector("#gif").getAttribute("value");
    console.log(gifSelect);

    const postData = {
        id: uuid.v4(), 
        timestamp: Date.now(), 
        title: document.querySelector("#title-input").value, 
        body: { text: document.querySelector("#entry-content").value, gifUrl: gifSelect }
    }
    
	const options = {
		method: "POST",
		body: JSON.stringify(postData),
		headers: {
			"Content-Type": "application/json"
		}
	};
    try{
	    await fetch("https://stormy-bastion-86346.herokuapp.com//update/create", options);
        // let resdata = await response.json();
        // console.log(resdata);

    } catch(err) {
        console.log(err)
    }

    location.href = "index.html"; // change page back to home
}

function noGifOpt(){
    gifCont.appendChild(noGif);
    document.getElementById("no-gif").addEventListener('click', e => {
        let newGif = document.querySelector("#gif");
        newGif.setAttribute("src", "./assets/gifs/gif_placeholder.gif");
        newGif.removeAttribute("value");
    })
}