const createLocationMap = ((id, coordinates)=>{
    const locationMap = document.createElement("div");
    locationMap.id=id;
    locationMap.classList.add("map");
    const map = L.map(locationMap).setView([coordinates[1],coordinates[0]],7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
        maxZoom: 11,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    const circle = L.circle([coordinates[1], coordinates[0]], {
        color: 'red',
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 30000
    }).addTo(map);
    setTimeout(function(){map.invalidateSize()},200);
    return locationMap;
})