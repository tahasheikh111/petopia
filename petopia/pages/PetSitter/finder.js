import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

mapboxgl.accessToken = 'pk.eyJ1IjoidGFoYXNoZWlraCIsImEiOiJjbTNvb3c1cDkwNXBpMmpzY2M5bHU2dnZrIn0.ql7-i376UfB4rVROPmW0Tw'

export default function PetSitterMap() {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const markersRef = useRef([])
  const markerMap = useRef({})
  const [activeMarkerId, setActiveMarkerId] = useState(null)
  const [petSitters, setPetSitters] = useState([])

  // Fetch pet sitters data
  useEffect(() => {
    const fetchPetSitters = async () => {
      try {
        const res = await fetch('/api/petsitters/allsitters')
        const data = await res.json()
        setPetSitters(data)
      } catch (error) {
        console.error('Error fetching pet sitters:', error)
      }
    }

    fetchPetSitters()
  }, [])

  // Initialize map
  useEffect(() => {
    if (map.current) return // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [74.3587, 31.5204], // Lahore coordinates
      zoom: 10
    })

    // Clean up on unmount
    return () => {
      map.current?.remove()
    }
  }, [])

  // Handle markers
  useEffect(() => {
    if (!map.current || !petSitters.length) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []
    markerMap.current = {}

    petSitters.forEach((sitter) => {
      if (sitter.location?.coordinates) {
        const markerElement = document.createElement('div')
        markerElement.className = 'custom-marker'
        markerElement.style.position = 'absolute'
        markerElement.style.width = '20px'
        markerElement.style.height = '20px'
        markerElement.style.borderRadius = '50%'
        markerElement.style.backgroundColor = '#3FB1CE'
        markerElement.style.cursor = 'pointer'

        const marker = new mapboxgl.Marker({
          element: markerElement,
          anchor: 'center',
        })
          .setLngLat(sitter.location.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="popup-content">
                  <h3>${sitter.pet_type.join(', ')} Sitter</h3>
                  <p>Hourly Rate: $${sitter.hourly_rate}</p>
                  <p>Experience: ${sitter.experience} years</p>
                </div>
              `)
          )
          .addTo(map.current)

        markersRef.current.push(marker)
        markerMap.current[sitter._id] = marker

        // Highlight card when marker is clicked
        markerElement.addEventListener('click', () => {
          setActiveMarkerId(sitter._id)
        })
      }
    })
  }, [petSitters])

  const handleSitterClick = (sitter) => {
    if (map.current && sitter.location?.coordinates) {
      // Fly to the sitter's location
      map.current.flyTo({
        center: sitter.location.coordinates,
        zoom: 14,
        duration: 1500
      })
      setActiveMarkerId(sitter._id)

      // Open popup for the marker
      const marker = markerMap.current[sitter._id]
      if (marker) {
        marker.togglePopup()
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/3 p-4">
        <ScrollArea className="h-[calc(100vh-2rem)]">
          {petSitters.map((sitter) => (
            <Card 
              key={sitter._id} 
              className={`mb-4 transition-all duration-200 ${
                activeMarkerId === sitter._id ? 'border-primary ring-2 ring-primary' : ''
              }`}
            >
              <CardHeader>
                <CardTitle>{sitter.pet_type.join(', ')} Sitter</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Hourly Rate: ${sitter.hourly_rate}</p>
                <p>Experience: {sitter.experience} years</p>
                <p>Availability: {sitter.availability}</p>
                <p>Address: {sitter.location.address}</p>
                <Button 
                  onClick={() => handleSitterClick(sitter)}
                  className="mt-2 w-full"
                >
                  View on Map
                </Button>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </div>
      <div className="w-full md:w-2/3 h-[50vh] md:h-screen" ref={mapContainer} />
    </div>
  )
}
