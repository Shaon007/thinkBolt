'use client';

import BlogList from "@/Components/BlogList";
import DeepSeekChat from "@/Components/DeepSeekChat";
import Header from "@/Components/Header";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  return (
    <main className="font-mono bg-white ">
      <ToastContainer theme="dark"/>
      <Header/>
      <BlogList />
      <DeepSeekChat/>
      {/* <Footer/> */}
    </main>
  );
}
