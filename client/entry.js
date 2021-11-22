let form = document.querySelector("form");
let gifCont = document.querySelector("#gifs");

const apiId = "3QiTkeYYexhSYHU3M2hEaHXVgZ5ogLkN";

gifTrend(gifCont);

form.addEventListener("submit", gifWindow);





// let gifSearch = document.querySelector("#gif-search");
// gifSearch.addEventListener("focus", gifWindow)


async function gifWindow(e) {
    e.preventDefault();
    // let gifCont = document.createElement('div');
    // gifCont.setAttribute("id", "gif-cont");
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
    newGif.setAttribute("value", gif.value);
    newGif.setAttribute("alt", gif.alt);
    div.appendChild(newGif);
}