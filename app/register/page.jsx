'use client';

import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Registration successful!');
      router.push('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-2xl mb-4 text-center font-bold text-gray-500">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="text-black w-full mb-3 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="text-black w-full mb-3 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-700">Register</button>
      </form>
    </div>
  );
};

export default page;