import { useState } from 'react';
import { useSession } from 'next-auth/react';

const BecomePetSitter = () => {
  const { data: session } = useSession();
  const [petType, setPetType] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [experience, setExperience] = useState(0);
  const [availability, setAvailability] = useState('');
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
  

  const petTypes = ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Reptile'];  // Predefined pet types

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = session.user.id;
    console.log(userId);
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
          coordinates
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      console.log('Pet Sitter details submitted', data);
    } catch (err) {
      console.error('Error creating pet sitter', err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-center">Become a Pet Sitter</h1>
      <form onSubmit={handleSubmit}>
        {/* Pet Type */}
        <div className="mb-4">
          <label htmlFor="petType" className="block text-sm font-medium text-gray-700">Type of Pets</label>
          <select 
            id="petType"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Pet Type</option>
            {petTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Hourly Rate */}
        <div className="mb-4">
          <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
          <input 
            type="number" 
            id="hourlyRate"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter hourly rate"
            required
          />
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience Level</label>
          <input 
            type="range"
            id="experience"
            value={experience}
            min="0"
            max="10"
            onChange={(e) => setExperience(e.target.value)}
            className="mt-1 w-full"
          />
          <div className="flex justify-between text-sm">
            <span>0</span>
            <span>10</span>
          </div>
          <div className="mt-2 text-center text-sm text-gray-500">Experience Level: {experience}</div>
        </div>

        {/* Availability */}
        <div className="mb-4">
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
          <input 
            type="text" 
            id="availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter your availability"
            required
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location (Address)</label>
          <input 
            type="text" 
            id="location"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter your address"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="mb-4 text-center">
          <button 
            type="submit" 
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BecomePetSitter;
 