import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '@/lib/supabaseClient';

const BecomePetSitter = () => {
  const { data: session } = useSession();
  const [petType, setPetType] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [experience, setExperience] = useState(0);
  const [availability, setAvailability] = useState('');
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const petTypes = ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Reptile'];  // Predefined pet types

  // Handle location setting
  const handleSetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          alert('Location set successfully!');
        },
        (error) => {
          console.error('Error retrieving location:', error);
          alert('Unable to retrieve location. Please try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `petsitters/${fileName}`;

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload Error:", uploadError);
        alert("Image upload failed. Please try again.");
        return null;
      }

      const { data: publicData, error: urlError } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      if (urlError) {
        console.error("URL Fetch Error:", urlError);
        alert("Failed to retrieve image URL.");
        return null;
      }

      setImageUrl(publicData.publicUrl);
      alert("Image uploaded successfully!");
      return publicData.publicUrl;
    } catch (err) {
      console.error("Unexpected Error:", err.message);
      alert("An unexpected error occurred. Check the console for details.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = session.user.id;
    
    // Upload image first
    const uploadedImageUrl = await handleImageUpload(imageFile);

    if (!uploadedImageUrl) {
      alert('Image upload failed. Please try again.');
      return;
    }

    try {
      const response = await fetch('/api/becomePetSitter', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          petType,
          hourlyRate,
          experience,
          availability,
          address,
          coordinates,
          imageUrl: uploadedImageUrl,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      console.log('Pet Sitter details submitted:', data);
      alert('Successfully registered as a Pet Sitter!');
    } catch (err) {
      console.error('Error creating pet sitter:', err);
      alert('Failed to submit pet sitter details. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl overflow-hidden">
        <div 
          className="h-40 bg-cover bg-center relative"
          style={{
            backgroundImage: 'url(/petsitter-bg.jpg)',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <h1 className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white drop-shadow-lg">
            Become a Pet Sitter
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Pet Type */}
          <div>
            <label htmlFor="petType" className="block text-sm font-medium text-black">Type of Pets</label>
            <select 
              id="petType"
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              className="mt-1 p-2 w-full border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
              required
            >
              <option className="text-black" value="">Select Pet Type</option>
              {petTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Location Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleSetLocation}
              className="py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
            >
              Set Current Location
            </button>
          </div>

          {/* Hourly Rate */}
          <div>
            <label htmlFor="hourlyRate" className="block text-sm font-medium text-black">Hourly Rate ($)</label>
            <input 
              type="number" 
              id="hourlyRate"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="mt-1 p-2 text-black w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter hourly rate"
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-black">Experience Level</label>
            <input 
              type="range"
              id="experience"
              value={experience}
              min="0"
              max="10"
              onChange={(e) => setExperience(e.target.value)}
              className="mt-1 w-full h-2 bg-blue-200 rounded-md appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-800 mt-1">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
            <div className="mt-2 text-center text-sm text-gray-800">Experience Level: {experience}</div>
          </div>

          {/* Availability */}
          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-gray-900">Availability</label>
            <input 
              type="text" 
              id="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
              placeholder="e.g., Weekends, Evenings"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-800">Location (Address)</label>
            <input 
              type="text" 
              id="location"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your complete address"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-800">Upload Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md file:mr-4 file:rounded-md file:border-0 file:bg-yellow-500 file:text-white file:px-4 file:py-2"
              required
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={uploading}
              className={`w-full py-3 px-4 rounded-md text-white font-semibold transition-all ${
                uploading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-yellow-600 hover:bg-yellow-700 hover:shadow-md'
              }`}
            >
              {uploading ? 'Uploading...' : 'Become a Pet Sitter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomePetSitter;