"use client";

import React, { useEffect, useState } from "react";
import Map from "@/components/Map";

interface Child {
  name: string;
  age: number;
  disability: string;
  lat: number;
  lng: number;
  address: string;
}

export default function Home() {
  const [childrenData, setChildrenData] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  // Guimbal center coordinates
  const guimbalLat = 10.6625344;
  const guimbalLng = 122.3212464;

  // Define the maximum radius (in degrees) for random location generation around Guimbal
  const LATITUDE_RADIUS = 0.01; // 0.01 degrees ~ 1 km radius
  const LONGITUDE_RADIUS = 0.01; // 0.01 degrees ~ 1 km radius

  // Simulating children data with random coordinates within Guimbal's range
  useEffect(() => {
    const fetchedData: Child[] = [];
    for (let i = 0; i < 10; i++) {
      fetchedData.push({
        name: `Child ${i + 1}`,
        age: 10 + (i % 5),
        disability: i % 2 === 0 ? "Visual Impairment" : "Hearing Impairment",
        lat: guimbalLat + (Math.random() - 0.5) * LATITUDE_RADIUS * 2, // Random latitude within range
        lng: guimbalLng + (Math.random() - 0.5) * LONGITUDE_RADIUS * 2, // Random longitude within range
        address: `Random Address ${i + 1}`, // Randomized address
      });
    }
    // Place one child farther from the center (away from the main location)
    fetchedData[0].lat = guimbalLat + Math.random() * LATITUDE_RADIUS;
    fetchedData[0].lng = guimbalLng + Math.random() * LONGITUDE_RADIUS;

    setChildrenData(fetchedData);
  }, []);

  const handleChildSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    const child = childrenData.find((child) => child.name === selectedId);
    setSelectedChild(child || null);
  };

  return (
    <div className='container mx-auto px-4 py-8 font-sans'>
      <h1 className='text-4xl font-bold text-center mb-6 text-indigo-800'>
        Mapping Disabilities in Guimbal, Iloilo
      </h1>

      {/* Dropdown to select a child */}
      <div className='mb-6 text-center'>
        <label className='block text-xl font-medium text-gray-700 mb-2'>
          Select a Child
        </label>
        <select
          onChange={handleChildSelection}
          className='w-full max-w-xs mx-auto px-4 py-2 bg-indigo-600 text-white font-semibold border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
        >
          <option value=''>Select a Child</option>
          {childrenData.map((child, index) => (
            <option key={index} value={child.name}>
              {`Child ${index + 1}`} {/* Retain child number in dropdown */}
            </option>
          ))}
        </select>
      </div>

      {/* Map component to show the selected child's location */}
      <Map childrenData={childrenData} selectedChild={selectedChild} />

      {/* Display the selected child's details */}
      {selectedChild && (
        <div className='max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-8 space-y-4'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            Child Details
          </h2>
          <div className='space-y-2'>
            <p className='text-lg'>
              <strong>Name:</strong> {selectedChild.name}
            </p>
            <p className='text-lg'>
              <strong>Age:</strong> {selectedChild.age}
            </p>
            <p className='text-lg'>
              <strong>Disability:</strong> {selectedChild.disability}
            </p>
            <p className='text-lg'>
              <strong>Address:</strong> {selectedChild.address}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
