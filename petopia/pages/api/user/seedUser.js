import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

dbConnect();
export default async function handler(req, res) {
  const sampleUsers = [
    {
      name: "John Smith",
      email: "john.smith@example.com",
      password: "password123", // Will be hashed
      role: ["user", "pet_sitter"],
      profile_picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      location: {
        address: "123 Main St, New York, NY",
        coordinates: {
          lat: 40.7128,
          lng: -74.0060
        }
      }
    },
    {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      password: "password123",
      role: ["user", "pet_sitter"],
      profile_picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      location: {
        address: "456 Park Ave, Boston, MA",
        coordinates: {
          lat: 42.3601,
          lng: -71.0589
        }
      }
    },
    {
      name: "Michael Chen",
      email: "michael.c@example.com",
      password: "password123",
      role: ["user", "pet_sitter"],
      profile_picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      location: {
        address: "789 Beach Rd, Los Angeles, CA",
        coordinates: {
          lat: 34.0522,
          lng: -118.2437
        }
      }
    },
    {
      name: "Emma Wilson",
      email: "emma.w@example.com",
      password: "password123",
      role: ["user", "pet_sitter"],
      profile_picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      location: {
        address: "321 Oak St, Chicago, IL",
        coordinates: {
          lat: 41.8781,
          lng: -87.6298
        }
      }
    },
    {
      name: "David Brown",
      email: "david.b@example.com",
      password: "password123",
      role: ["user", "pet_sitter"],
      profile_picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      location: {
        address: "555 Pine St, Seattle, WA",
        coordinates: {
          lat: 47.6062,
          lng: -122.3321
        }
      }
    }
  ];

  for (const user of sampleUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    await User.create(user);
  }
    
      
  console.log('Data seeded successfully');
  res.status(200).json({ message: 'Data seeded successfully' });
}
