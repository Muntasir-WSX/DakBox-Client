import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { warehouseData } from '../../Data/WareHouse';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;


const MapFlyHandler = ({ targetLocation }) => {
    const map = useMap();
    useEffect(() => {
        if (targetLocation) {
            map.flyTo(targetLocation, 10, {
                animate: true,
                duration: 1.5
            });
        }
    }, [targetLocation, map]);
    return null;
};

const BangladeshMap = ({ searchQuery }) => {
    const centerPosition = [23.6850, 90.3563];
    const [targetLoc, setTargetLoc] = useState(null);

    useEffect(() => {
        if (searchQuery) {
            const found = warehouseData.find(w => 
                w.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
                w.covered_area.some(area => area.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            
            if (found) {
                setTargetLoc([found.latitude, found.longitude]);
            }
        }
    }, [searchQuery]);

    return (
        <div className="h-137.5 w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 relative z-10">
            <MapContainer 
                center={centerPosition} 
                zoom={7} 
                scrollWheelZoom={false} 
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapFlyHandler targetLocation={targetLoc} />

                {warehouseData.map((warehouse, index) => (
                    <Marker 
                        key={index} 
                        position={[warehouse.latitude, warehouse.longitude]}
                    >
                        <Popup>
                            <div className="p-2 min-w-37.5">
                                <h3 className="font-bold text-lg text-gray-800 border-b pb-1 mb-2">
                                    {warehouse.district}
                                </h3>
                                <p className="text-xs font-semibold text-gray-500 uppercase">Covered Areas:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {warehouse.covered_area.map((area, idx) => (
                                        <span key={idx} className="bg-[#D4E96D] text-[10px] px-2 py-0.5 rounded-full font-medium text-black">
                                            {area}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-3 flex items-center justify-between text-[11px]">
                                    <p className="text-green-600 font-bold">● {warehouse.status}</p>
                                    <a href={warehouse.flowchart} target="_blank" rel="noreferrer" className="text-blue-500 underline">Flowchart</a>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default BangladeshMap;