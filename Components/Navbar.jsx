'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const handleScrollToBlogs = () => {
    if (typeof window !== 'undefined') {
      const blogSection = document.getElementById("blog-section");
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28 text-black bg-white sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center">
        <Link href='/' className="font-mono md:text-xl">thinkBolt</Link>

        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-mono text-sm">Admin</Link>
          <Link href="/about" className="font-mono text-sm">About</Link>

          <button
            onClick={handleScrollToBlogs}
            className="flex items-center gap-2 py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black rounded-md font-mono"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
