import React from "react";
import { useEffect, useState } from "react"

const HospitalList = ({ hospitals }) => {
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!hospitals || !Array.isArray(hospitals)) {
      setError("Invalid hospital data.")
    }
  }, [hospitals])

  if (error) return <p className="text-red-500 text-center">{error}</p>

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Nearby Hospitals 🏥</h2>
      {hospitals.length === 0 ? (
        <p className="text-gray-600">No hospitals found.</p>
      ) : (
        <ul className="space-y-4">
          {hospitals.map((hospital, index) => (
            <li
              key={index}
              className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-lg font-semibold text-gray-800">{hospital.name}</h3>
              <p className="text-sm text-gray-600">{hospital.vicinity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HospitalList

