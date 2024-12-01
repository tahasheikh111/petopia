import { useState } from 'react';
import Link from 'next/link'; // Import Link from next/link
import { PetSitterCard } from '@/components/PetSitterCard';
import { PetSitterSearch } from '@/components/PetSitterSearch';
import { Search, Loader2, PawPrint, MapPin } from 'lucide-react'; // Added MapPin icon

export default function PetSitters({ initialPetsitters }) {
  const [petsitters, setPetsitters] = useState(initialPetsitters);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setNoResults(false);
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await fetch(`/api/petsitters/search?${queryString}`);
      const data = await response.json();
      setPetsitters(data);
      setNoResults(data.length === 0);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl flex items-center justify-center gap-4">
            <PawPrint className="w-12 h-12 text-yellow-600" />
            Find a Pet Sitter
            <PawPrint className="w-12 h-12 text-yellow-600" />
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover trusted and loving pet sitters who will care for your furry friends like family.
          </p>
          
          {/* New navigation button added */}
          <div className="mt-6">
            <a
              href="/PetSitter/finder" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-300"
            >
              <MapPin className="mr-2 w-5 h-5" />
              Find Pet Sitter Near Me
            </a>
          </div>
        </div>

        <div className="mb-8 max-w-xl mx-auto">
          <PetSitterSearch onSearch={handleSearch} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-yelllow-600 animate-spin" />
          </div>
        ) : noResults ? (
          <div className="text-center bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Pet Sitters Found</h2>
            <p className="text-gray-500">Try adjusting your search criteria to find more results.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {petsitters.map((petsitter) => (
              <PetSitterCard 
                key={petsitter._id} 
                petsitter={petsitter} 
                className="transition-all duration-300 hover:scale-105 hover:shadow-xl" 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/petsitters/petsittersname`);
    const data = await response.json();
    return {
      props: {
        initialPetsitters: data,
      },
    };
  } catch (error) {
    console.error('Error fetching pet sitters:', error);
    return {
      props: {
        initialPetsitters: [],
      },
    };
  }
}