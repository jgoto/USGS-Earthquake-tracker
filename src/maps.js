function createLocationMap(id, coordinates){
    const locationMap = document.createElement("div");
    locationMap.id=id;
    locationMap.classList.add("map");
    const map = L.map(locationMap).setView([coordinates[1],coordinates[0]],13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    return locationMap;
}