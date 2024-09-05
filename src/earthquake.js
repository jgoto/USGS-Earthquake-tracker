const USGS_EARTHQUAKE_MONTHLY_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
let earthquakeList;
const earthquakeContainer = document.getElementById("content-container");

function getTime(time)
{
    return new Date(time);
}

const drawCard = (earthquake) =>{
    const card = document.createElement("div");
    card.classList.add("card");
    const cardText = document.createElement("p");
    cardText.innerText = `Location: ${earthquake.properties.place}
    Time: ${getTime(earthquake.properties.time)}
    Magnitude: ${earthquake.properties.mag}
    URL: `;
    const url = document.createElement("a")
    url.href=earthquake.properties.url;
    url.innerText="(usgs)";
    cardText.appendChild(url);
    card.appendChild(cardText);
    earthquakeContainer.appendChild(card);
}

const drawEarthquakeCards = (earthquakes) =>{
    earthquakes.forEach(element => {
        drawCard(element);
    });
}

const fetchEarthquakeList = async()=>{
    try {
        const response = await fetch(USGS_EARTHQUAKE_MONTHLY_URL);

        if(!response.ok)
        {
            throw new Error("Response not OK");
        }

        const data = await response.json();
        earthquakeList = [...data.features];
        drawEarthquakeCards(earthquakeList);
    } catch (error) {
        console.log(error);
    }
}


fetchEarthquakeList();