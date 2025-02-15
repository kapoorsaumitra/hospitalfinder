import React from "react";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const HospitalList = ({ hospitals }) => {
  const [error, setError] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    if (!hospitals || !Array.isArray(hospitals)) {
      setError("Invalid hospital data.");
    }
  }, [hospitals]);

  const handleNavigation = (hospital) => {
    // Get the hospital's coordinates
    const lat = hospital.geometry.location.lat();
    const lng = hospital.geometry.location.lng();
    
    // Create Google Maps URL for navigation
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    
    // Open in a new tab
    window.open(mapsUrl, '_blank');
  };

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Nearby Hospitals 🏥</h2>
      {hospitals.length === 0 ? (
        <p className="text-gray-600">No hospitals found.</p>
      ) : (
        <ul className="space-y-4">
          {hospitals.map((hospital, index) => (
            <li
              key={hospital.place_id || index}
              className={`bg-gray-50 rounded-lg p-4 transform transition-all duration-100 ease-in-out border border-slate-300 cursor-pointer
                ${
                  hoveredId === hospital.place_id
                    ? "shadow-lg scale-102 hover:bg-blue-100"
                    : "shadow-sm hover:shadow-md"
                }`}
              onMouseEnter={() => setHoveredId(hospital.place_id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleNavigation(hospital)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {hospital.name}
                    </h3>
                    <MapPin className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-sm text-gray-600">{hospital.vicinity}</p>
                </div>
                {hospital.rating && (
                  <div className="flex items-center bg-white px-2 py-1 rounded-full shadow-sm">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-sm font-medium text-gray-700">
                      {hospital.rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
              
              <div className={`mt-3 grid grid-cols-2 gap-2 overflow-hidden transition-all duration-200
                ${hoveredId === hospital.place_id ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>
                {hospital.opening_hours && (
                  <div className="text-sm text-gray-600">
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      hospital.opening_hours.open_now ? "bg-green-500" : "bg-red-500"
                    }`}></span>
                    {hospital.opening_hours.open_now ? "Open Now" : "Closed"}
                  </div>
                )}
                {hospital.user_ratings_total && (
                  <div className="text-sm text-gray-600">
                    {hospital.user_ratings_total} reviews
                  </div>
                )}
                <div className="text-sm text-blue-600 col-span-2">
                  Get directions ➤
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HospitalList;