import {
  Marker,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

function Map(props) {
  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
  return (
    <ComposableMap
      projection="geoAlbersUsa"
      projectionConfig={{
        scale: 1000,
      }}
      style={{ height: "310px", width: "300px" }}
    >
      <Geographies geography={geoUrl} fill="#D6D6DA" stroke="#FFFFFF">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      {props.guesses.map((marker) => (
        <Marker coordinates={[marker["longitude"], marker["latitude"]]}>
          <circle r={8} fill="#F53" />
        </Marker>
      ))}
    </ComposableMap>
  );
}
export default Map;
