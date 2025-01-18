import {
  Marker,
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import "./Map.css";
import { getColor } from "../util/color";
import { useState } from "react";
import { Slider, IconButton } from "@mui/material";
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';

function Map(props) {
  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 4;

  const defaultZoomState = { zoom: 1, center: [-97, 37] };
  const [zoom, setZoom] = useState(defaultZoomState);

  const handleZoom = (event) => {
    if (!event.deltaY) return;
    setZoom((prev) => ({
      ...prev,
      zoom: Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev.zoom + (event.deltaY < 0 ? 0.2 : -0.2))),
    }));
  };

  const handleSliderChange = (event, newValue) => {
    setZoom(prev => ({
      ...prev,
      zoom: newValue
    }));
  };

  const resetZoom = () => {
    setZoom(defaultZoomState);
  };

  return (
    <div className="map-container">
      <div className="zoom-controls">
        <Slider
          value={zoom.zoom}
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step={0.1}
          onChange={handleSliderChange}
          sx={{ 
            width: 100,
            '& .MuiSlider-thumb': {
              backgroundColor: 'white',
              border: '2px solid #1976d2',
              width: 16,
              height: 16,
              '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: 'none',
              },
            },
            '& .MuiSlider-track': {
              backgroundColor: '#1976d2',
              height: 8,
              border: 'none',
            },
            '& .MuiSlider-rail': {
              backgroundColor: '#9e9e9e',
              height: 8,
              opacity: 1,
            }
          }}
          size="small"
          aria-label="Zoom"
          disableSwap
        />
        <IconButton 
          onClick={resetZoom} 
          size="small" 
          title="Reset zoom"
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
            '&:focus': {
              outline: 'none',
            }
          }}
        >
          <ZoomOutMapIcon fontSize="small" />
        </IconButton>
      </div>
      
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{
          scale: 1000,
        }}
        className="map"
      >
        <ZoomableGroup
          onWheel={handleZoom}
          center={zoom.center}
          zoom={zoom.zoom}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
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
    </div>
  );
}
export default Map;
