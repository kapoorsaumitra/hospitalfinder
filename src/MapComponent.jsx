import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const defaultCenter = {
  lat: 0,
  lng: 0,
};

const MapComponent = ({ hospitals, setHospitals }) => {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    // Get user's location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userPos);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError("Unable to get your location. Please enable location services.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  }, []);

  useEffect(() => {
    if (isLoaded && userLocation) {
      fetchNearbyHospitals();
    }
  }, [isLoaded, userLocation]);

  const fetchNearbyHospitals = () => {
    if (!userLocation) return;

    const service = new window.google.maps.places.PlacesService(
      new window.google.maps.Map(document.createElement("div"))
    );

    const request = {
      location: userLocation,
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

  if (!isLoaded) return <div className="text-center text-2xl font-semibold text-gray-600">Loading maps...</div>;
  
  if (locationError) return <div className="text-center text-2xl font-semibold text-red-600">{locationError}</div>;

  if (!userLocation) return <div className="text-center text-2xl font-semibold text-gray-600">Getting your location...</div>;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        center={userLocation} 
        zoom={14}
      >
        {/* User's location marker */}
        <Marker
          position={userLocation}
          icon={{
            url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIgZmlsbD0iIzQyODVmNCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+",
            scaledSize: new window.google.maps.Size(24, 24),
          }}
        />

        {/* Hospital markers */}
        {hospitals?.map((hospital) => (
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