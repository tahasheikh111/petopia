// components/PetSitterSearch.jsx
import { Search, MapPin } from 'lucide-react';

export const PetSitterSearch = ({ onSearch }) => {
  const petTypes = ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Reptile'];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSearch({
      petType: formData.get('petType'),
      location: formData.get('location'),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-0 md:flex md:gap-4 mb-8">
      <div className="flex-1">
        <select 
          name="petType"
          className="w-full p-2 border rounded-lg"
          defaultValue=""
        >
          <option value="">Any Pet Type</option>
          {petTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="flex-1 relative">
        <MapPin className="absolute left-2 top-2.5 text-gray-400" size={20} />
        <input
          type="text"
          name="location"
          placeholder="Search by location..."
          className="w-full p-2 pl-8 border rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="w-full md:w-auto px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center justify-center gap-2"
      >
        <Search size={20} />
        Search
      </button>
    </form>
  );
};