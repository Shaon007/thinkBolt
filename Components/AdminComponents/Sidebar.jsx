import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-slate-100">
      <div className="px-2  sm:pl-14 py-3 border border-black">
       <h2 className="text-gray-800 font-xl font-mono font-semibold">thinkBolt</h2>
      </div>
      <div className="w-28 sm:w-60 h-[100vh] relative py-12 border border-black">

        <Link href='/admin/addProduct' className="mx-2 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-md text-black">
          <Image src={assets.add_icon} width={28} alt=""/><p>Add Blogs</p>
        </Link>
        <Link href='/admin/blogList' className="mx-2 mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-md text-black">
          <Image src={assets.blog_icon} width={28} alt="ast"/><p> Blog Lists</p>
        </Link>
        <Link href='/admin/subscriptions' className="mx-2 mt-5  flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-md text-black">
          <Image src={assets.email_icon} width={28} alt=""/><p>Subscriptions</p>
        </Link>

      </div>

    </div>
  );
};

export default Sidebar;