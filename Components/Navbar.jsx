'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { logout } from '@/lib/authUtils';


const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push('/login');
  };

  const generateBlog = () => {
    const section = document.getElementById('deepseek');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn('Element with ID "deep-seek" not found');
    }
  };



  return (
    <div className="py-5 px-5 md:px-12 lg:px-28 text-black bg-white sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-mono md:text-xl">thinkBolt</Link>

        <div className="flex items-center gap-4 md:gap-6">

          <Link href="/admin/blogList" className="font-mono text-sm hidden sm:block">Admin</Link>
          <button className='cursor-pointer' onClick={generateBlog}>AI</button>
          <Link href="/" className="font-mono text-sm hidden sm:block">About</Link>



          {/* Auth Logic */}
          {user ? (
            <>
              <span className="text-sm font-mono hidden sm:block text-gray-700">
                {user.email.split('@')[0]}

              </span>
              <button
                onClick={handleLogout}
                className="py-1 px-4 bg-gray-500 text-white rounded-md font-mono hover:bg-red-400 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push('/login')}
                className="py-1 px-4 bg-gray-700 text-white rounded-md font-mono hover:bg-gray-800 text-sm"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/register')}
                className="py-1 px-4 border border-gray-800 text-gray-900 rounded-md font-mono hover:bg-gray-200 text-sm"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
