import { useState,useEffect } from "react";
import Link from 'next/link';
import { PawPrintIcon as Paw, Edit, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {supabase} from "@/lib/supabaseClient"; // Assuming you have configured supabase instance
import Image from "next/image";
import {motion} from 'framer-motion';
// Modal for editing pet sitter details
const EditModal = ({ petSitter, isOpen, onClose, onSave }) => {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    id: petSitter?._id || '',
    hourly_rate: petSitter?.hourly_rate || '',
    experience: petSitter?.experience || '',
    location: petSitter?.location || { address: '', coordinates: { lat: '', lng: '' } },
    availability: petSitter?.availability || '',
    rating: petSitter?.rating || '',
    imageUrl: petSitter?.imageUrl || '',
  });

  useEffect(() => {
    setFormData({
      id: petSitter?._id || '',
      hourly_rate: petSitter?.hourly_rate || '',
      experience: petSitter?.experience || '',
      location: petSitter?.location || { address: '', coordinates: { lat: '', lng: '' } },
      availability: petSitter?.availability || '',
      rating: petSitter?.rating || '',
      imageUrl: petSitter?.imageUrl || '',
    });
  }, [petSitter]);
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

        setFormData((prevData) => ({
            ...prevData,
            imageUrl: publicData.publicUrl,
        }));
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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'address') {
      setFormData((prevData) => ({
        ...prevData,
        location: { ...prevData.location, address: value },
      }));
    } else if (name === 'lat' || name === 'lng') {
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          coordinates: {
            ...prevData.location.coordinates,
            [name]: value,
          },
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await onSave(formData);  // Pass the updated data (including the id) to onSave
    onClose();  // Close the modal
  };

  if (!isOpen) return null;  // If modal isn't open, return nothing

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center pt-10 z-50 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-yellow-800">Edit Pet Sitter</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hourly_rate">Hourly Rate</Label>
                <Input
                  id="hourly_rate"
                  type="number"
                  name="hourly_rate"
                  value={formData.hourly_rate}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="profile_image">Profile Image</Label>
                <Input
                  id="profile_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                />
                {uploading && <p className="text-yellow-600 text-sm">Uploading...</p>}
                {formData.imageUrl && (
                  <div className="mt-2 relative w-full h-40">
                    <Image 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      fill 
                      className="rounded-md object-cover"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Experience (years)</Label>
                <Input
                  id="experience"
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location_address">Address</Label>
                <Input
                  id="location_address"
                  type="text"
                  name="address"
                  value={formData.location.address}
                  onChange={handleInputChange}
                />
              </div>
              
              {/* <div className="space-y-2">
                <Label htmlFor="lat">Latitude</Label>
                <Input
                  id="lat"
                  type="number"
                  name="lat"
                  value={formData.location.coordinates.lat}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lng">Longitude</Label>
                <Input
                  id="lng"
                  type="number"
                  name="lng"
                  value={formData.location.coordinates.lng}
                  onChange={handleInputChange}
                />
              </div> */}
              
              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Input
                  id="availability"
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                />
              </div>
              <CardFooter className="flex justify-between">
                <Button type="submit" className="bg-yellow-600 text-white hover:bg-yellow-700">
                  Save
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

  
  

const PetSitterAdminPage = ({ user, petSitters, error }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPetSitter, setSelectedPetSitter] = useState(null);

  if (error) {
    return <div className="text-center text-lg text-red-600">{error}</div>;
  }

  // Handle Edit - Show modal with pet sitter details
  const handleEdit = (petSitter) => {
    setSelectedPetSitter(petSitter);
    setIsModalOpen(true);
  };

  // Handle Delete - Call API to delete pet sitter
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this PetSitter?');
    if (!confirmDelete) return;
  
    try {
      const response = await fetch('/api/petsitters/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),  // Send the pet sitter ID in the body
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
        return;
      }
  
      // Refresh the page to show updated list of pet sitters
      window.location.reload();
    } catch (error) {
      alert('Failed to delete PetSitter');
      console.error(error);
    }
  };
  
  

  // Handle Save Edit - Save the updated pet sitter data
  const handleSave = async (updatedPetSitter) => {
    const changedFields = {};
    for (const key in updatedPetSitter) {
      if (updatedPetSitter[key] !== selectedPetSitter[key]) {
        changedFields[key] = updatedPetSitter[key];
      }
    }
  
    // Include the ID
    changedFields._id = selectedPetSitter._id;
  
    try {
      const response = await fetch(`/api/petsitters/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changedFields),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
        return;
      }
  
      window.location.reload();
    } catch (error) {
      alert('Failed to save changes');
      console.error(error);
    }
  };
  
  
  
  return (
    <div className="min-h-screen bg-yellow-50 p-6" style={{ backgroundImage: 'url(/paws.png)', backgroundSize: 'cover' }}>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8" style={{backgroundImage: 'url(/paws.png)', backgroundSize: 'cover'}}>
        {/* User Details */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black bg-white">Welcome, {user?.name}!</h1>
          <p className="text-black bg-white">Email: {user?.email}</p>
        </div>

        {/* PetSitter Cards */}
        <h2 className="text-2xl font-bold mb-6 text-black flex items-center justify-center">
          <Paw className="mr-2 text-black" />
          Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {petSitters.map((petSitter) => (
            <Card key={petSitter._id} className="border-2 border-yellow-300 overflow-hidden">
              <CardHeader className="bg-yellow-100">
              {petSitter.imageUrl && (
                <Image
                src={petSitter.imageUrl}
                alt={`${petSitter.pet_type.join(", ")} Specialist`}
                width={400}
                height={200}
                className="w-full h-40 object-cover rounded-t-lg"
                />
                )}
                <CardTitle className="text-xl font-semibold text-yellow-800">
                  {petSitter.pet_type.join(', ')} Specialist
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-yellow-700 font-medium">Hourly Rate: ${petSitter.hourly_rate}</p>
                <p className="text-gray-600">Experience: {petSitter.experience} years</p>
                <p className="text-gray-600">Location: {petSitter.location.address}</p>
                <p className="text-gray-600">Availability: {petSitter.availability}</p>
                <p className="text-yellow-600 font-medium">Rating: {petSitter.rating}/5</p>
              </CardContent>
              <CardFooter className="bg-yellow-50 flex justify-between">
                <Button variant="outline" className="flex items-center text-yellow-600 hover:text-yellow-800" onClick={() => handleEdit(petSitter)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button variant="outline" className="flex items-center text-red-600 hover:text-red-800" onClick={() => handleDelete(petSitter._id)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline" className="text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100">
              Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal 
        petSitter={selectedPetSitter} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
      />
    </div>
  );
};

export async function getServerSideProps(context) {
    const { id: userId } = context.params;

    try {
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/${userId}`);
      const user = await userResponse.json();
  
      const petSittersResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/petsitters/${userId}`);
      const petSitters = await petSittersResponse.json();
  
      if (!userResponse.ok || !petSittersResponse.ok) {
        throw new Error('Failed to fetch data');
      }
  
      return {
        props: {
          user,
          petSitters,
        },
      };
    } catch (error) {
      return {
        props: {
          error: 'Failed to load data. Please try again.',
        },
      };
    }
}

export default PetSitterAdminPage;
