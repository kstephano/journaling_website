document.querySelector("#gif-search").addEventListener("focus", gifWindow)

const apiId = "3QiTkeYYexhSYHU3M2hEaHXVgZ5ogLkN";

async function gifWindow(e) {
    let gifCont = await gifTrend();
    document.querySelector("main").appendChild(gifCont);

}

async function gifTrend() {
    let response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiId}&rating=g`);
    let data = await response.json();
    let div = divBuilder(data); 
    return div;
}


function divBuilder(data){
    let gifs = data.data;
    let gifCont = document.createElement('div');
    for(let i = 0; i < gifs.length; i++){
        let gif = gifs[i].images.fixed_width_small;
        let img = document.createElement('img');
        img.setAttribute("src", gif.url);
        img.setAttribute("alt", gifs[i].title);
        img.setAttribute("value", gifs[i].id);
        gifCont.appendChild(img);
    }
    return gifCont;
}
