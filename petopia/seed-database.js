// sample-data.js
// You can run this script directly with Node.js to populate your database

const bcrypt = require('bcryptjs');
const User = require('./models/User');
const PetSitter = require('./models/PetSitter');
const connectToDatabase = require('./lib/mongodb'); // Import the MongoDB connection utility



const MONGODB_URI = process.env.MONGODB_URI;

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

const samplePetSitters = [
  {
    pet_type: ["Dog", "Cat"],
    hourly_rate: 25,
    experience: 5,
    location: {
      address: "123 Main St, New York, NY",
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    availability: "Weekdays 9 AM - 5 PM",
    rating: 4.8
  },
  {
    pet_type: ["Dog", "Bird", "Fish"],
    hourly_rate: 30,
    experience: 3,
    location: {
      address: "456 Park Ave, Boston, MA",
      coordinates: {
        lat: 42.3601,
        lng: -71.0589
      }
    },
    availability: "Weekends & Evenings",
    rating: 4.5
  },
  {
    pet_type: ["Cat", "Rabbit", "Bird"],
    hourly_rate: 28,
    experience: 4,
    location: {
      address: "789 Beach Rd, Los Angeles, CA",
      coordinates: {
        lat: 34.0522,
        lng: -118.2437
      }
    },
    availability: "Flexible Hours",
    rating: 4.9
  },
  {
    pet_type: ["Dog", "Cat", "Reptile"],
    hourly_rate: 35,
    experience: 7,
    location: {
      address: "321 Oak St, Chicago, IL",
      coordinates: {
        lat: 41.8781,
        lng: -87.6298
      }
    },
    availability: "Full Time Available",
    rating: 4.7
  },
  {
    pet_type: ["Dog", "Fish", "Rabbit"],
    hourly_rate: 32,
    experience: 2,
    location: {
      address: "555 Pine St, Seattle, WA",
      coordinates: {
        lat: 47.6062,
        lng: -122.3321
      }
    },
    availability: "Mornings & Weekends",
    rating: 4.4
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    //await User.deleteMany({});
    //await PetSitter.deleteMany({});
    //console.log('Cleared existing data');

    // Create users with hashed passwords
    const createdUsers = await Promise.all(
      sampleUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return User.create({
          ...user,
          password: hashedPassword
        });
      })
    );
    console.log('Created users');

    // Create pet sitters and link them to users
    const createdPetSitters = await Promise.all(
      samplePetSitters.map(async (petSitter, index) => {
        const createdPetSitter = await PetSitter.create({
          ...petSitter,
          user: createdUsers[index]._id
        });

        // Update user with pet_sitter reference
        await User.findByIdAndUpdate(createdUsers[index]._id, {
          pet_sitter: createdPetSitter._id
        });

        return createdPetSitter;
      })
    );
    console.log('Created pet sitters and linked to users');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();