import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignUp() {
  const [name, setName] = useState(''); // Change from username to name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }), // Change from username to name
    });

    if (response.ok) {
      router.push('/auth/signin');
    } else {
      alert('Error creating account');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-black">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name" // Change label to Name
            value={name}
            onChange={(e) => setName(e.target.value)} // Change to setName
            className="w-full p-2 border rounded-md text-black"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md text-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md text-black"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-yellow-600 text-black rounded-md hover:bg-yellow-700"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <a href="/auth/signin" className="text-black">Sign In</a>
        </p>
      </div>
    </div>
  );
}
