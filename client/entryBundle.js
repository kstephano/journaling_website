(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// let uuid = require('uuid');
let searchBtn = document.querySelector("#search-icon");
let gifCont = document.querySelector(".gif-scrolling-displayer");

const apiId = "q7OQqQiFkKI87Cb4JZTdmON0sNbDV2hy";

let noGif = document.createElement("img");
noGif.setAttribute("src", "./assets/gifs/gif_placeholder.gif");
noGif.setAttribute("alt", "No GIF selection");
noGif.setAttribute("id", "no-gif");
noGif.style.width = "200px";

noGifOpt();
gifTrend(gifCont);

searchBtn.addEventListener("click", gifWindow);
document.querySelector("form").addEventListener("submit", upload)




async function gifWindow(e) {
    clearDiv(gifCont);
    noGifOpt();
    let value = document.querySelector("#search-input").value;
    console.log(value)
    if(value){
        await gifSearching(gifCont, value)
    } else {
        await gifTrend(gifCont);
    }
};

async function gifTrend(div) {
    let response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiId}&rating=g&limit=10`);
    let data = await response.json();
    divBuilder(data, div);
}

async function gifSearching(div, str){
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiId}&rating=g&q=${str}&limit=10`);
    let data = await response.json();
    divBuilder(data, div);
}

function divBuilder(data, div){
    let gifs = data.data;

    for(let i = 0; i < gifs.length; i++){
        let gif = gifs[i].images.fixed_width;
        let img = document.createElement('img');
        img.setAttribute("src", gif.url);
        img.setAttribute("alt", gifs[i].title);
        img.setAttribute("value", gifs[i].images.original.url);
        img.setAttribute("id", gifs[i].images.original.url)
        div.appendChild(img);
        let listen = document.getElementById(gifs[i].images.original.url);
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
    let gifSelect = document.querySelector("#gif").getAttribute("value");
    console.log(gifSelect);

    let postData = {
        id: "", 
        timestamp: Date.now(), 
        title: document.querySelector("#title-input").value, 
        body: {text: document.querySelector("#entry-content").value, gifUrl: gifSelect}
    }
    
	const options = {
		method: "POST",
		body: JSON.stringify(postData),
		headers: {
			"Content-Type": "application/json"
		}
	};
    try{
	    await fetch("http://localhost:3000/update/create", options);
        // let resdata = await response.json();
        // console.log(resdata);

    } catch(err) {
        console.log(err)
    }

    location.href = "index.html"
}

function noGifOpt(){
    gifCont.appendChild(noGif);
    document.getElementById("no-gif").addEventListener('click', e => {
        let newGif = document.querySelector("#gif");
        newGif.setAttribute("src", "./assets/gifs/gif_placeholder.gif");
        newGif.removeAttribute("value");
    })
}
},{}]},{},[1]);
