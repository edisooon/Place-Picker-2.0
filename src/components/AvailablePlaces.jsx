import { useState, useEffect } from "react";

import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true);
      const resp = await fetch("http://localhost:3000/places");
      const jsonResp = await resp.json();
      setAvailablePlaces(jsonResp.places);
      setIsLoading(false);
    }
    fetchPlaces();
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Loading places data now..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
