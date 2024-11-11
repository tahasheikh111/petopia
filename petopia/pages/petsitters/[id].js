// pages/petsitters/[id].js
import { useState } from 'react';
import Image from 'next/image';
import { Star, Clock, MapPin, DollarSign } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import PetSitter from '@/models/PetSitter';

export default function PetSitterDetail({ petsitter }) {
  if (!petsitter) {
    return <div>Pet sitter not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 w-full">
          <Image
            src={`/api/placeholder/800/400`}
            alt={`Pet Sitter ${petsitter.user.name}`}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{petsitter.user.name}</h1>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400 fill-current" />
                <span>{petsitter.rating || 'New'}</span>
              </div>
            </div>
            <div className="flex items-center text-2xl font-bold">
              <DollarSign className="text-green-600" />
              {petsitter.hourly_rate}/hr
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">Pet Types</h2>
              <div className="flex flex-wrap gap-2">
                {petsitter.pet_type.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Experience</h2>
              <p>{petsitter.experience} years</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="text-gray-600" />
              <span>Available: {petsitter.availability}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-gray-600" />
              <span>{petsitter.location.address}</span>
            </div>
          </div>

          <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Contact Pet Sitter
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect();
  
  try {
    const petsitter = await PetSitter.findById(params.id)
      .populate('user', 'name email')
      .lean();
    
    if (!petsitter) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        petsitter: JSON.parse(JSON.stringify(petsitter)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}