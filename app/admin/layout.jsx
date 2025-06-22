import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Layout({ children }) {
  return (
    <>
      <div className="flex bg-white text-black font-mono">
        <ToastContainer theme='dark'/>
        <Sidebar />
        <div className="flex flex-col w-[72%] md:w-full">
          <div className="flex items-center justify-between w-full px-12 py-3 max-h-[60px] border-b border-black">
            <h2 className="text-black">Admin Panel</h2>
            <Image src={assets.profile_icon} width={40} alt=""/>
          </div>
          {children}
        </div>
      </div>

    </>
  )

}