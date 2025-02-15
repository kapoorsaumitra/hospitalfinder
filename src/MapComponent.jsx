import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 26.850000,
  lng: 80.949997,
};

const MapComponent = ({ hospitals, setHospitals }) => {
  const [selectedHospital, setSelectedHospital] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded) fetchNearbyHospitals();
  }, [isLoaded]);

  const fetchNearbyHospitals = () => {
    const service = new window.google.maps.places.PlacesService(
      new window.google.maps.Map(document.createElement("div"))
    );

    const request = {
      location: center,
      radius: 5000,
      type: "hospital",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setHospitals(results);
      } else {
        console.error("PlacesService failed:", status);
      }
    });
  };

  if (!isLoaded) return <div className="text-center text-2xl font-semibold text-gray-600">Loading...</div>;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={14}>
        {hospitals &&
          hospitals.map((hospital) => (
            <Marker
              key={hospital.place_id}
              position={hospital.geometry.location}
              onClick={() => setSelectedHospital(hospital)}
            />
          ))}

        {selectedHospital && (
          <InfoWindow
            position={selectedHospital.geometry.location}
            onCloseClick={() => setSelectedHospital(null)}
          >
            <div className="p-2">
              <h2 className="text-lg font-semibold text-gray-800">{selectedHospital.name}</h2>
              <p className="text-sm text-gray-600">{selectedHospital.vicinity}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
