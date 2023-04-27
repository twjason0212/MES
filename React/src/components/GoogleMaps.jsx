
import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

export default function Home() {
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:"AIzaSyBujQXV6Ex3SPuRLYjks5ooajoupOMJ9DU",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => (
    { lat: 24.150770928681194, lng: 120.65105121318872 }
  ), []);
  const containerStyle = {
    width: "100%",
    height: "75%",
  };

  return (
    <GoogleMap zoom={10} center={center} mapContainerStyle={containerStyle} >
      <MarkerF position={center} />
    </GoogleMap>
  );
}