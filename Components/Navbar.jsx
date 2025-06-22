'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { logout } from '@/lib/authUtils';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push('/login');
  };

  const generateBlog = () => {
    if (window.location.pathname === '/') {
      const section = document.getElementById('deepseek');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn('Element with ID "deepseek" not found');
      }
    } else {
      router.push('/#deepseek');
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28 text-black bg-white sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-mono font-semibold md:text-xl">thinkBolt</Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4 md:gap-6">
          <Link href="/admin/blogList" className="font-mono text-md">Admin</Link>
          <button className="font-mono text-md cursor-pointer" onClick={generateBlog}>AI</button>
          <Link href="/about" className="font-mono text-md">About</Link>

          {user ? (
            <>
              <span className="text-sm font-mono text-gray-700">{user.email.split('@')[0]}</span>
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
                className="py-2 px-4 bg-gray-700 text-white rounded-md font-mono hover:bg-gray-800 text-sm"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/register')}
                className="py-2 px-4 bg-gray-700 text-white rounded-md font-mono hover:bg-gray-800 text-sm"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div ref={menuRef} className="sm:hidden mt-4 bg-white rounded-md border p-4 space-y-3">
          <Link href="/admin/blogList" onClick={() => setIsMenuOpen(false)} className="block font-mono">Admin</Link>
          <button onClick={() => { generateBlog(); setIsMenuOpen(false); }} className="block font-mono">AI</button>
          <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block font-mono">About</Link>

          {user ? (
            <>
              <span className="block font-mono text-gray-700">{user.email.split('@')[0]}</span>
              <button
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="block py-2 px-4 bg-gray-500 text-white rounded-md font-mono hover:bg-red-400 text-sm mt-1"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { router.push('/login'); setIsMenuOpen(false); }}
                className="block py-2 px-4 bg-gray-700 text-white rounded-md font-mono hover:bg-gray-800 text-sm"
              >
                Login
              </button>
              <button
                onClick={() => { router.push('/register'); setIsMenuOpen(false); }}
                className="block py-2 px-4 bg-gray-700 text-white rounded-md font-mono hover:bg-gray-800 text-sm"
              >
                Register
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
