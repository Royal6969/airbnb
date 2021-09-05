import { useState } from "react";
/* --------------- ISSUE DISPLAYING THE MAPBOX ------------------- */
// the warning in the console is ...
// This page appears to be missing CSS declarations for Mapbox GL JS, 
// which may cause the map to display incorrectly. 
// Please ensure your page includes mapbox-gl.css, 
// as described in https://www.mapbox.com/mapbox-gl-js/api/.
// maybe could be this?? ... //import "mapbox-gl/dist/mapbox-gl.css";
// with the following import I can fix the warning ... but the issu persists ...
import "mapbox-gl/dist/mapbox-gl.css"; // some people said they fixed this issue overwitting in the .css the class .mapboxgl-canvas {position: absolute;top: 0;bottom: 0;left: 0;width: 100%;height: 100%;} 
//import "mapbox-gl/src/css/mapbox-gl.css"; // this is another mapbox .css that I found ... but all people comment about the other import above
// for last chance I found in StackOverflow was updating the file css to last version with this link <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />
// but where I have to paste it ??
// https://stackoverflow.com/questions/50909438/missing-mapbox-css-using-react
/* ---------------------------------------------------------------- */
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) { //we set here the props of SearchPage because getCenter is going to transform aor objects in json ... //npm install geolib

    const [selectedLocation, setSelectedLocation] = useState({});

    // npm install geolib
    // Transform the searchResults object into the 
    // {latitude: 52.516272, longitude: 13.377722} format/object
    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }));
    //console.log(coordinates); for test, inspect Array(7) Object

    // The latitude and longitude of the center of locations coordinates
    const center = getCenter(coordinates);
    //console.log(center); for test ... { longitude: -0.08452479386870405, latitude: 51.50996326851979 }

    const [viewport, setViewport] = useState({
        with: "100%",
        height: "100%",
        // latitude: 37.7577,
        // longitude: -122.4376, // for example first test
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
        //npm install --save react-map-gl
        <ReactMapGL
            mapStyle="mapbox://styles/royal6969/ckt73vmdg213317ofk11gozhi"
            mapboxApiAccessToken={process.env.mapbox_key} // making key secure
            {...viewport} //this is sortest pro way to spread the useState operators
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p 
                            role="img"
                            onClick={() => setSelectedLocation(result)} 
                            className="cursor-pointer text-2xl animate-bounce"
                            aria-label="push-pin"
                            >
                                📍
                        </p>
                    </Marker>

                    {/* The popup that should show if we click on a Marker */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    );
}

export default Map;
