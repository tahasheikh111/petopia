import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs'; // You can switch to 'bcrypt' if necessary
import dbConnect from '@/lib/mongodb'; // Assuming you have a DB connection setup
import User from '@/models/User'; // Your User model to interact with the DB

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();
        console.log('Credentials:', credentials);

        // Find the user by username
        const user = await User.findOne({ name: credentials.username });

        // Log the user to check if the query is returning the correct user
        console.log('User found:', user);

        if (!user) {
          throw new Error('User not found');
        }

        // Compare the password with the hashed one
        const isPasswordValid = bcrypt.compareSync(credentials.password, user.password);
        console.log('Password valid:', isPasswordValid);

        if (!isPasswordValid) {
          throw new Error('Incorrect password');
        }

        // If user is valid, return the user object
        return { id: user._id, name: user.username, email: user.email };
      },
    }),
  ],
  session: {
    jwt: true, // Use JWT for sessions
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page path
  },
});
