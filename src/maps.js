const MAP_SOURCE = 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{x}/{y}'

const createLocationMap = ((id, coordinates)=>{
    const locationMap = document.createElement("div");
    locationMap.id=id;
    locationMap.classList.add("map");
    const map = L.map(locationMap).setView([coordinates[1],coordinates[0]],5);
    L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',{
        maxZoom: 13,
        attribution: 'Tiles courtesy of the <a href="https://usgs.gov">U.S. Geological Survey</a>',
    }).addTo(map);
    const circle = L.circle([coordinates[1], coordinates[0]], {
        color: 'red',
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 90000
    }).addTo(map);
    setTimeout(function(){map.invalidateSize()},200);
    return locationMap;
})