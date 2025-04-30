import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface Child {
  name: string;
  age: number;
  disability: string;
  lat: number;
  lng: number;
}

interface MapProps {
  childrenData: Child[];
  selectedChild: Child | null;
}

const Map: React.FC<MapProps> = ({ childrenData, selectedChild }) => {
  const mapRef = useRef<any>(null);

  // Zoom and center map to the selected child's location
  useEffect(() => {
    if (selectedChild && mapRef.current) {
      mapRef.current.flyTo([selectedChild.lat, selectedChild.lng], 16); // Zoom more (level 16)
    }
  }, [selectedChild]);

  return (
    <MapContainer
      center={[10.6625344, 122.3212464]} // Default coordinates for Guimbal, Iloilo
      zoom={13}
      style={{ height: "700px", width: "100%" }}
      className='rounded-lg shadow-lg mt-4' // Tailwind styling
      ref={mapRef}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; OpenStreetMap contributors'
      />
      {childrenData.map((child, index) => (
        <Marker
          key={index}
          position={[child.lat, child.lng]}
          icon={L.icon({
            iconUrl: "/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        >
          <Popup>
            <strong>Name:</strong> {child.name}
            <br />
            <strong>Age:</strong> {child.age}
            <br />
            <strong>Disability:</strong> {child.disability}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
