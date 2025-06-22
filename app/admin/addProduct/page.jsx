'use client';

import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";


const page = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennett",
    authorImg: "/author_img.png",
  })
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({
      ...data,
      [name]: value
    }));
    console.log(data);
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);
    const response = await axios.post('/api/blog', formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setImage(false);
      setData({
        title: "",
        description: "",
        category: "Startup",
        author: "Alex Bennett",
        authorImg: "/author_img.png",
      });
    }
    else {
      toast.error('Error');
    }

  };

  return (
    <div className="pt-5 px-5 sm:pt-12 sm:pl-16">
      <form onSubmit={onSubmitHandler}>
        <p className="text-xl text-black">Upload Thumbnail</p>
        <label htmlFor="image" className="inline-block mt-4 cursor-pointer">
          <Image
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt="Upload thumbnail"
            className="rounded"
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />

        <p className="text-xl mt-4">Blog Title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full max-w-[500px] mt-4 px-4 py-3 border rounded"
          type="text"
          placeholder="Type Here"
          required
        />

        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full max-w-[500px] mt-4 px-4 py-3 border rounded"
          placeholder="Write Content Here"
          rows={6}
          required
        />

        <p className="text-xl mt-4">Blog Category</p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 max-w-[500px]">
          <select
            onChange={onChangeHandler}
            value={data.category}
            name="category"
            className="w-full sm:w-40 h-12 px-4 border text-gray-500 rounded"
          >
            <option value="Startup">Startup</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>

          <button
            type="submit"
            className="w-full sm:w-40 h-12 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Add Blog
          </button>
        </div>
      </form>
    </div>
  );

}
export default page;
