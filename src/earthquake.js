const USGS_EARTHQUAKE_MONTHLY_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
const USGS_EARTHQUAKE_WEEKLY_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";
const USGS_EARTHQUAKE_DAILY_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson";
const interval = document.getElementById("earthquake-interval");
const dailyTab = document.getElementById("daily");
const weeklyTab = document.getElementById("weekly");
const monthlyTab = document.getElementById("monthly");
let earthquakeList;
const earthquakeContainer = document.getElementById("content-container");

function getTime(time)
{
    return new Date(time);
}

const dataNotFound = () =>{
    const notFoundText = document.createElement("p");
    notFoundText.classList.add("not-found");
    notFoundText.innerText = "No earthquakes have been found";
    earthquakeContainer.appendChild(notFoundText);
}

function updateFolderLinks(tab){
    dailyTab.classList.remove("active");
    weeklyTab.classList.remove("active");
    monthlyTab.classList.remove("active");
    switch(tab){
        case "daily":
            dailyTab.classList.add("active");
            break;
        case "weekly":
            weeklyTab.classList.add("active");
            break;
        case "monthly":
            monthlyTab.classList.add("active");
            break;
    }
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
    const locationMap = createLocationMap(earthquake.id, earthquake.geometry.coordinates)
    card.appendChild(cardText);
    card.appendChild(locationMap);
    earthquakeContainer.appendChild(card);
}

const drawEarthquakeCards = (earthquakes) =>{
    earthquakeContainer.innerText="";
    if(earthquakes.length===0)
        dataNotFound();
    else{
        earthquakes.forEach(element => {
            drawCard(element);
        });
    }
}

const fetchEarthquakeList = async(url)=>{
    try {
        const response = await fetch(url);

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

function changeTab(url, tab){
    fetchEarthquakeList(url);
    updateFolderLinks(tab);
    interval.innerText = `${tab.toUpperCase()}`;
}

dailyTab.addEventListener("click", function(event){
    changeTab(USGS_EARTHQUAKE_DAILY_URL, "daily");
});

weeklyTab.addEventListener("click", function(event){
    changeTab(USGS_EARTHQUAKE_WEEKLY_URL, "weekly");
});

monthlyTab.addEventListener("click", function(event){
    changeTab(USGS_EARTHQUAKE_MONTHLY_URL, "monthly");
});

changeTab(USGS_EARTHQUAKE_MONTHLY_URL, "monthly");