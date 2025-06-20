'use client';

import BlogList from "@/Components/BlogList";
import Header from "@/Components/Header";
import Image from "next/image";


export default function Home() {
  return (
    <main className="font-mono bg-white ">
      <Header/>
      <BlogList />
      {/* <Footer/> */}
    </main>
  );
}
