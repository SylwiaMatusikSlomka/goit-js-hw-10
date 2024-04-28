import * as catApi from "./cat-api";
import * as alarm from "./alarm";

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info.card");
const alertPlaceholder = document.querySelector('#liveAlertPlaceholder')

init();
catApi.downloadBreed(alertPlaceholder,"https://api.thecatapi.com/v1/breeds")
    .then(response => {
        generateBreedSelect(response);
    })
    .catch(error => {
        alarm.appendAlert(alertPlaceholder, "Oops! Something went wrong! Try reloading the page!", "danger");
        generateEmptyBreedCard("https://a.allegroimg.com/original/11e893/8f63b6f24c2986678b19f9e1b46d/Zakaz-WSTEPU-DLA-KOTA-oe100mm", "Oops!", "Something went wrong! Try reloading the page!");
    });


breedSelect.addEventListener('change', async function() {
    const selectedId = this.value;
    await catApi.fetchCatByBreed(alertPlaceholder, selectedId)
    .then(response => {
        generateBreedCard(response);
    })
    .catch(_error => {
        alarm.appendAlert(alertPlaceholder, "Oops! Something went wrong! Try reloading the page!", "danger");
        generateEmptyBreedCard("https://a.allegroimg.com/original/11e893/8f63b6f24c2986678b19f9e1b46d/Zakaz-WSTEPU-DLA-KOTA-oe100mm", "Oops!", "Something went wrong! Try reloading the page!", "");
    });
});

function init(){
    generateEmptyBreedCard("https://i.pinimg.com/originals/99/28/ab/9928ab74dfc89162c3b98582b58db0dc.jpg", "Welcome!", "Choose a cat", "");
}

function generateBreedCard(response){
    const url = response.data[0].url;
    const title = response.data[0].breeds[0].name;
    const description = response.data[0].breeds[0].description;
    const temperament = response.data[0].breeds[0].temperament;
    let cardBody = 
    `
    <img src="${url}" class="card-img-top cat-img" alt="...">
    <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${description}</p>
    <p class="card-text"><b>Temperament: </b>${temperament}</p>
    </div>
    `;
    catInfo.innerHTML = cardBody;
}

function generateEmptyBreedCard(url, title, description){
    let cardBody = 
    `
    <img src="${url}" class="card-img-top cat-img" alt="...">
    <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${description}</p>
    </div>
    `;
    catInfo.innerHTML = cardBody;
}

function generateBreedSelect(response){
    response.data.forEach(breed => {
        const option = generateBreedSelectEnement(breed.id, breed.name); 
        breedSelect.appendChild(option); 
    })
    // For connection test
    const option =  generateBreedSelectEnement("TEST", "TEST"); 
    breedSelect.appendChild(option);
}

function generateBreedSelectEnement(id, name){
    const option = document.createElement('option'); 
    option.value = id; 
    option.text = name; 
    return option;
}
