import { useEffect, useState } from 'react';
import { PetSitterCard } from './PetSitterCard';
import { Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const FeaturedPetSitters = () => {
  const [petsitters, setPetsitters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedPetSitters = async () => {
      try {
        const response = await fetch('/api/petsitters/featured');
        if (!response.ok) throw new Error('Failed to fetch featured pet sitters');
        const data = await response.json();
        setPetsitters(data);
      } catch (err) {
        setError('Unable to load featured pet sitters');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPetSitters();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Pet Sitters</h2>
          <Link 
            href="/petsitters" 
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            View All 
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {petsitters.map((petsitter) => (
            <PetSitterCard petsitter={petsitter} key={petsitter._id} />
          ))}
        </div>
      </div>
    </section>
  );
};
