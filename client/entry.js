let form = document.querySelector("form");
let gifCont = document.querySelector("#gifs");

const apiId = "3QiTkeYYexhSYHU3M2hEaHXVgZ5ogLkN";

gifTrend(gifCont);

form.addEventListener("submit", gifWindow);
document.querySelector("#post").addEventListener("click", upload)


async function gifWindow(e) {
    e.preventDefault();
    clearDiv(gifCont);
    let value = e.target.gifSearch.value;
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
    let div = document.querySelector("#gif");
    clearDiv(div);
    let newGif = document.createElement("img");
    newGif.setAttribute("src", gif.src);
    newGif.setAttribute("value", gif.id);
    newGif.setAttribute("alt", gif.alt);
    newGif.setAttribute("id", "selected")
    div.appendChild(newGif);
}

async function upload(e) {
    let gifSelect = document.querySelector("#selected").getAttribute("value");
    console.log(gifSelect);
    
	const options = {
		method: "POST",
		body: JSON.stringify({ id: "", time: Date.now(), title: form.title.value, body: {text: form.textBody.value, gif: gifSelect}, comments: [], emojis: {emoji1: 0, emoji2: 0, emoji3: 0}}),
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