'use client';

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
      router.push('/');
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-2xl mb-4 text-center font-bold text-gray-800">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded text-black"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded text-black"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700">Login</button>
      </form>
    </div>
  );
};

export default page;