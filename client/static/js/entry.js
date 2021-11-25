const uuid = require('uuid');

const apiId = "q7OQqQiFkKI87Cb4JZTdmON0sNbDV2hy"; // ID to use to fetch data from Giphy
let isHighLighted = false;

// initialise HTML elements as JS objects
const searchBtn = document.querySelector("#search-icon");
const gifCont = document.querySelector(".gif-scrolling-displayer");
const form = document.querySelector("form");
let lastSelectedGif = null;
// create gif to hold data for the selected gif (not shown on page)
const newGif = document.createElement("img");

gifTrend(gifCont); // add trending GIFs to the container
initListeners(); 

/**
 * Initialise listeners for the search button, submit button, and remove GIF button.
 */
function initListeners() {
    searchBtn.addEventListener("click", gifWindow);
    form.addEventListener("submit", upload);
}

/**
 * Async function to reload gif container, gif placeholder img, and to fill
 * the container with gifs if a search value has been entered.
 */
async function gifWindow() {
    clearDiv(gifCont);
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
    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiId}&rating=g&limit=24`);
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
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiId}&rating=g&q=${str}&limit=24`);
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
        // creates each GIF inside a div and appends that to the main div
        const img = document.createElement("img");
        const gifDiv = document.createElement("div");
        gifDiv.classList.add("div-gif-wrap");
        img.setAttribute("src", gif.url);
        img.setAttribute("alt", gifs[i].title);
        img.setAttribute("value", gifs[i].images.original.url);
        img.setAttribute("id", gifs[i].images.original.url)
        gifDiv.appendChild(img);
        div.appendChild(gifDiv);
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
 * Sets the GIF attributes of the new gif to upload, whilst highlighting the selected GIF
 * and removing any existing highlight from a previously selected GIF.
 * 
 * @param {Click event on a selected GIF} e 
 */
function setGif(e){
    const selectedGif = e.target;
    newGif.setAttribute("src", selectedGif.src);
    newGif.setAttribute("value", selectedGif.id)
    // if there is a previously highlighted gif...
    if (lastSelectedGif) {
        // if the last gif is itself && currently highlighted, remove it
        if (lastSelectedGif === selectedGif && isHighLighted) {
            selectedGif.parentElement.style.outline = "none";
            isHighLighted = false;
            newGif.removeAttribute("value");
            newGif.setAttribute("src", "./assets/gifs/gif_placeholder.gif");
        // if the last gif is itself && not currently highlighted, select it    
        } else if (lastSelectedGif === selectedGif && !isHighLighted) {
            selectedGif.parentElement.style.outline = "5px solid red";
            lastSelectedGif = selectedGif;
            isHighLighted = true;
        // remove the previously selected GIF's highlight and highlight the new one    
        } else {
            selectedGif.parentElement.style.outline = "5px solid red";
            lastSelectedGif.parentElement.style.outline = "none";
            lastSelectedGif = selectedGif;
            isHighLighted = true;
        }
    // highlight the selected GIF    
    } else {
        selectedGif.parentElement.style.outline = "5px solid red";
        lastSelectedGif = selectedGif;
        isHighLighted = true;
    }
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