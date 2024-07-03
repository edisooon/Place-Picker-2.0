import { useState, useEffect } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true);
      try {
        const resp = await fetch("http://localhost:3000/places");
        const jsonResp = await resp.json();
        if (!resp.ok) {
          throw Error("Oops! Something went wrong...");
        }
        setAvailablePlaces(jsonResp.places);
      } catch (error) {
        setError({
          message: error.message || "Oops! Something went wrong...",
        });
      }
      setIsLoading(false);
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }

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
