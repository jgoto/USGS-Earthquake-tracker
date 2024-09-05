const USGS_EARTHQUAKE_MONTHLY_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
let earthquakeList;

const fetchEarthquakeList = async()=>{
    try {
        const response = await fetch(USGS_EARTHQUAKE_MONTHLY_URL);

        if(!response.ok)
        {
            throw new Error("Response not OK");
        }

        const data = await response.json();
        const earthquakes = [...data.features];
        console.log(earthquakes);
    } catch (error) {
        console.log(error);
    }
}


fetchEarthquakeList();