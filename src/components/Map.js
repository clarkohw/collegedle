import {
  Marker,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

function Map(props) {
  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

  const markerColor = (guess) => {
    const distance = (lat1, lon1, lat2, lon2, unit) => {
      if (lat1 == lat2 && lon1 == lon2) {
        return 0;
      } else {
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var theta = lon1 - lon2;
        var radtheta = (Math.PI * theta) / 180;
        var dist =
          Math.sin(radlat1) * Math.sin(radlat2) +
          Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
          dist = dist * 1.609344;
        }
        if (unit == "N") {
          dist = dist * 0.8684;
        }
        return dist;
      }
    };

    const dist = distance(
      guess["latitude"],
      guess["longitude"],
      props.collegedle["latitude"],
      props.collegedle["longitude"]
    );
    const colors = ["#6CF", "#FC0", "#F90", "#F60", "#F00", "#390"];
    if (dist > 1000) {
      return colors[0];
    } else if (dist > 500) {
      return colors[1];
    } else if (dist > 250) {
      return colors[2];
    } else if (dist > 100) {
      return colors[3];
    } else if (dist > 50) {
      return colors[4];
    } else {
      return colors[5];
    }
  };

  return (
    <ComposableMap
      projection="geoAlbersUsa"
      projectionConfig={{
        scale: 1000,
      }}
      style={{ height: "510px", width: "500px" }}
    >
      <Geographies geography={geoUrl} fill="#D6D6DA" stroke="#FFFFFF">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      {props.guesses.map((guess) => (
        <Marker
          key={guess["longitude"]}
          coordinates={[guess["longitude"], guess["latitude"]]}
        >
          <circle r={8} fill={markerColor(guess)} />
        </Marker>
      ))}
    </ComposableMap>
  );
}
export default Map;
