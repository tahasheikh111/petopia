// pages/petsitters/index.js
import { useState } from 'react';
import { PetSitterCard } from '@/components/PetSitterCard';
import { PetSitterSearch } from '@/components/PetSitterSearch';
import dbConnect from '@/lib/mongodb';
import PetSitter from '@/models/PetSitter';

export default function PetSitters({ initialPetsitters }) {
  const [petsitters, setPetsitters] = useState(initialPetsitters);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await fetch(`/api/petsitters/search?${queryString}`);
      const data = await response.json();
      setPetsitters(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Find a Pet Sitter</h1>
      
      <PetSitterSearch onSearch={handleSearch} />

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {petsitters.map((petsitter) => (
            <PetSitterCard key={petsitter._id} petsitter={petsitter} />
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  
  const result = await PetSitter.find({})
    .populate('user', 'name email')
    .lean();
  
  return {
    props: {
      initialPetsitters: JSON.parse(JSON.stringify(result)),
    },
  };
}