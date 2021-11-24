const uuid = require('uuid');

const apiId = "q7OQqQiFkKI87Cb4JZTdmON0sNbDV2hy";

// initialise HTML elements as JS objects
const searchBtn = document.querySelector("#search-icon");
const gifCont = document.querySelector(".gif-scrolling-displayer");
const form = document.querySelector("form");
const newGif = document.querySelector("#gif");
// create placeholder img element to hold chosen gifs
const noGif = document.createElement("img");
noGif.setAttribute("src", "./assets/gifs/gif_placeholder.gif");
noGif.setAttribute("alt", "No GIF selection");
noGif.setAttribute("id", "no-gif");
noGif.style.width = "200px";

noGifOpt(); // init remove GIF button
gifTrend(gifCont); // add trending GIFs to the container
initListeners(); 

/**
 * Initialise listeners for the search button, submit button, and remove GIF button.
 */
function initListeners() {
    searchBtn.addEventListener("click", gifWindow);
    form.addEventListener("submit", upload);
    noGif.addEventListener('click', e => {
        newGif.setAttribute("src", "./assets/gifs/gif_placeholder.gif");
        newGif.removeAttribute("value");
    });
}

/**
 * Async function to reload gif container, gif placeholder img, and to fill
 * the container with gifs if a search value has been entered.
 */
async function gifWindow() {
    clearDiv(gifCont);
    gifCont.appendChild(noGif);
    const value = document.querySelector("#search-input").value;
    console.log(value)
    if(value){
        await gifSearching(gifCont, value)
    } else {
        await gifTrend(gifCont);
    }
};
/**
 * Async function used to fetch 10 trending GIFs from Giphy and
 * use them to populate the specified div.
 * 
 * @param {The div object to populate with GIFs} div 
 */
async function gifTrend(div) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiId}&rating=g&limit=10`);
    const data = await response.json();
    divBuilder(data, div);
}

/**
 * Async function used to fetch 10 GIFs from Giphy that match
 * the given search criteria given by the user.
 * 
 * @param {The div object to populate with GIFs} div 
 * @param {The search query sent to Giphy to find relevant GIFs} str 
 */
async function gifSearching(div, str){
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiId}&rating=g&q=${str}&limit=10`);
    const data = await response.json();
    divBuilder(data, div);
}

/**
 * Populates the specified div with the results fetched from the Giphy API.
 * 
 * @param {Data retrieved from Giphy containing an array of data about each GIF} data 
 * @param {The div that is populated with GIFs} div 
 */
function divBuilder(data, div){
    const gifs = data.data;

    for(let i = 0; i < gifs.length; i++){
        const gif = gifs[i].images.fixed_width;
        // creates each GIF and appends it as a child to the div
        const img = document.createElement('img');
        img.setAttribute("src", gif.url);
        img.setAttribute("alt", gifs[i].title);
        img.setAttribute("value", gifs[i].images.original.url);
        img.setAttribute("id", gifs[i].images.original.url)
        div.appendChild(img);
        // set an onClick listener for each appended gif
        const listen = document.getElementById(gifs[i].images.original.url);
        listen.addEventListener("click", setGif);
    }
}

/**
 * Clears the specified div, setting textContent to an empty string.
 * 
 * @param {The div to have its contents cleared} div 
 */
function clearDiv(div){
    div.textContent = "";
}

/**
 * Sets the GIF as the same as the GIF clicked on by the user.
 * 
 * @param {Click event on a selected GIF} e 
 */
function setGif(e){
    const selectedGif = e.target;
    newGif.setAttribute("src", selectedGif.src);
    newGif.setAttribute("value", selectedGif.id);
    // newGif.setAttribute("alt", gif.alt);
    // newGif.setAttribute("id", "selected")
    // div.appendChild(newGif);
}

/**
 * Uploads the post data to the server.
 * 
 * @param {Click event on the upload button} e 
 */
async function upload(e) {
    e.preventDefault();
    const chosenGifUrl = newGif.getAttribute("value");
    console.log(chosenGifUrl);

    const postData = {
        id: uuid.v4(), 
        timestamp: Date.now(), 
        title: document.querySelector("#title-input").value, 
        body: { text: document.querySelector("#entry-content").value, gifUrl: chosenGifUrl }
    }
    
	const options = {
		method: "POST",
		body: JSON.stringify(postData),
		headers: {
			"Content-Type": "application/json"
		}
	};
    // Attempt a POST request to the server API
    try{
	    await fetch("https://journaling-website.herokuapp.com/update/create", options);
        // let resdata = await response.json();
        // console.log(resdata);
    } catch(err) {
        console.log(err)
    }

    location.href = "index.html"; // change page back to home
}