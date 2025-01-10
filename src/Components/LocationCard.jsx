import React from "react";

const LocationCard = ({ place }) => {
    if (!place) return <div>Loading...</div>;

    return (
        <div className=" LocationCard p-3">
            <div className="font-bold text-xl text-center">
                {place || 'Location not available'}
            </div>
        </div>
    );
}

export default LocationCard;
