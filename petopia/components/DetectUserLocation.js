// components/DetectUserLocation.js
import { useEffect } from 'react';
import { getSession } from 'next-auth/react';

const DetectUserLocation = () => {
  useEffect(() => {
    const fetchSessionAndLocation = async () => {
      const session = await getSession();
      if (session) {
        console.log("SESSION PRESENT: ", session);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const location = {
                userId: session.user.id,
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              console.log("Location: ", location);
              await saveLocation(location);
            },
            (error) => {
              console.error("Error detecting location:", error);
            }
          );
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      } else {
        console.log("No session found, not saving location.");
      }
    };

    fetchSessionAndLocation();
  }, []);

  const saveLocation = async (location) => {
    try {
      const res = await fetch('/api/saveUserLocation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location }),
      });

      const data = await res.json();
      if (data.success) {
        console.log('Location saved successfully');
      } else {
        console.error('Failed to save location:', data.message);
      }
    } catch (err) {
      console.error('Error saving location:', err);
    }
  };

  return null;
};

export default DetectUserLocation;
