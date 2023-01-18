import {
  Marker,
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import "./Map.css";
import { getColor } from "../util/color";

function Map(props) {
  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

  return (
    <ComposableMap
      projection="geoAlbersUsa"
      projectionConfig={{
        scale: 1000,
      }}
      className="map"
    >
      <ZoomableGroup
        filterZoomEvent={(e) => false}
        minZoom={0.5}
        center={[0, 0]}
        zoom={1}
      >
        <Geographies geography={geoUrl} fill="#D6D6DA" stroke="#FFFFFF">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
                key={geo.rsmKey}
                geography={geo}
              />
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
                strokeWidth={2}
                stroke="#000000"
                fill={getColor(guess, props.collegedle)}
              />
            </g>
            <text className="label" textAnchor="middle" y={25}>
              {guess["name"]}
            </text>
          </Marker>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  );
}
export default Map;
