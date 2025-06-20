'use client';

import { useEffect, useState } from "react";
import { assets, blog_data } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const Page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchBlogData =async () => {
    const response = await axios.get('/api/blog', {
      params: {
        id:params.id
      }
    })
    setData(response.data);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (data?<>
    <div className="bg-gray-200 py-5 px-5 font-mono ">
      <div className="flex justify-between items-center">
        <Link href={'/'} className="text-xl font-semibold text-black font-mono">thinkBolt</Link>
        <button className="flex items-center gap-2 font-medium py-1 px-3 border text-black border-black shadow-2xl">Get Started</button>
      </div>
      <div className="text-center my-24 text-black">
        <h2 className="text-4xl font-mono font-semibold max-w-[700px] mx-auto">{data.title}</h2>
        <Image src={data.authorImg} alt="author Image" width={60} height={60} className="mt-6 mx-auto border border-white rounded-full " />
        <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">{data.author}</p>
      </div>
    </div>
    <div className="mx-auto mt-[-100px] mb-10 max-w-[800px]">
      <Image src={data.image} width={1280} height={720} alt="Blog Image" className="border-4 border-white object-cover w-full h-[500px]" />

      <p className="mt-10">{data.description}</p>
    </div>
    <div className="my-24 text-center">
      <p className="my-4 ">Share this article on social media</p>
      <div className="flex gap-4 justify-center ">
        <Image src={assets.facebook_icon} width={50}></Image>
        <Image src={assets.twitter_icon} width={50}></Image>
        <Image src={assets.googleplus_icon } width={50}></Image>
      </div>
    </div>
  </>:<></>
  );
};

export default Page;
