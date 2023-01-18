import {
  Marker,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { scaleSequentialSqrt } from "d3-scale";
import { interpolateYlOrRd } from "d3-scale-chromatic";
import "./Map.css";

function Map(props) {
  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

  const markerColor = (guess) => {
    const distance = (lat1, lon1, lat2, lon2, unit) => {
      if (lat1 === lat2 && lon1 === lon2) {
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
        if (unit === "K") {
          dist = dist * 1.609344;
        }
        if (unit === "N") {
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
    console.log("devlog", props.collegedle["name"], dist);
    const colorScale = scaleSequentialSqrt(interpolateYlOrRd).domain([1000, 0]);
    if (dist === 0) {
      return "#390";
    }
    return colorScale(dist);
  };

  return (
    <ComposableMap
      projection="geoAlbersUsa"
      projectionConfig={{
        scale: 1000,
      }}
      className="map"
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
          className="marker"
          key={guess["name"] + guess["longitude"]}
          coordinates={[guess["longitude"], guess["latitude"]]}
        >
          <g>
            <circle
              r={8}
              strokeWidth={0.5}
              stroke="#000000"
              fill={markerColor(guess)}
            />
          </g>
          <text className="label" textAnchor="middle" y={25}>
            {guess["name"]}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
}
export default Map;
