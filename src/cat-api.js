import * as alarm from "./alarm";
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_9BXj8l8pfQAxC89qvtlD1Qp4neJNIfgS6rdkUhlqusBOxDRbezrmlqJMJK50AZvH";

export function downloadBreed(alertPlaceholder, url) {
    alarm.appendAlert(alertPlaceholder, "Loading data, please wait...", "primary");
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(res => {
                alarm.cleanAlert(alertPlaceholder);
                let breeds = Array.from(res.data);
                resolve({ data: breeds, error: null });
            })
            .catch(error => {
                alarm.appendAlert(alertPlaceholder, "Oops! Something went wrong! Try reloading the page!", "danger");
                reject({ data: null, error: error });
            });
    });
}
  
export function fetchCatByBreed(alertPlaceholder, breedId){
    alarm.appendAlert(alertPlaceholder, "Loading data, please wait...", "primary");
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    return axios.get(url)
    .then(res => {
        alarm.cleanAlert(alertPlaceholder);
        return { data: res.data, error: null };
    })
    .catch(error => {
        alarm.appendAlert(alertPlaceholder, "Oops! Something went wrong! Try reloading the page!", "danger");
        return { data: null, error: error };
    });
}