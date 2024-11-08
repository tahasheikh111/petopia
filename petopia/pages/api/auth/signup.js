import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export default async function handler(req, res) {
  await dbConnect();

  const { name, email, password} = req.body;
  const role='user';

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  await newUser.save();
  res.status(201).json({ message: 'User created successfully!' });
}
