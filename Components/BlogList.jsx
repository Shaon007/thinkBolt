import { blog_data } from "@/Assets/assets";
import BlogItem from "./BlogItem";
import { useEffect, useState } from "react";
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState('All');
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs);
    console.log(response.data.blogs);
  }
  useEffect(() => {
    fetchBlogs();
  },[])
  return (
    <div id="blog-section" className="text-black">
      <div className="flex justify-center gap-6 my-10">
        <button onClick={() => setMenu('All')} className={menu === 'All' ? "bg-black py-1 px-4 text-gray-200 rounded-sm" : "hover:border-b-2 cursor-pointer"}>All</button>
        <button onClick={() => setMenu('Technology')} className={menu === 'Technology' ? "bg-black py-1 px-4 text-gray-200 rounded-sm" : "hover:border-b-2 cursor-pointer"}>Technology</button>
        <button onClick={() => setMenu('Startup')} className={menu === 'Startup' ? "bg-black py-1 px-4 text-gray-200 rounded-sm" : "hover:border-b-2 cursor-pointer"}>Startup</button>
        <button onClick={() => setMenu('Lifestyle')} className={menu === 'Lifestyle' ? "bg-black py-1 px-4 text-gray-200 rounded-sm" : "hover:border-b-2 cursor-pointer"}>Lifestyle</button>
      </div>
      <div className="flex  flex-wrap justify-around gap-1 gap-y-10 mb-16 ">{blogs.filter((item) => menu === "All" ? true : item.category === menu).map((item, index) => {
        return <BlogItem key={index} id={item._id} image={item.image} title={item.title} category={item.category} description={item.description}></BlogItem>
      })}</div>

    </div>
  );
};

export default BlogList;