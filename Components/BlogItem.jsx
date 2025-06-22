import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className="max-w-[330px] bg-white border border-gray-600 text-gray-800 hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg rounded-md flex flex-col h-[460px]">
      <Link href={`/blogs/${id}`}>
        <Image
          src={image}
          alt="Blog Image"
          width={400}
          height={180}
          className="w-full h-[180px] object-cover border-b border-gray-600 rounded-t-md"
        />
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <p className="mb-2 px-2 py-1 inline-block bg-black text-white text-sm rounded text-center">{category}</p>
        <h4 className="mb-2 text-lg tracking-tight text-gray-800">{title}</h4>
        <div className="flex-1 flex items-center ">
          <p className="text-md text-gray-600 mb-4 ">
            {description.slice(0, 100)}{description.length > 100 ? "..." : ""}
          </p>
        </div>
        <div className="mt-auto">
          <Link href={`/blogs/${id}`} className="inline-flex gap-2 items-center text-black font-semibold hover:border-b-gray-600 hover:border-b-2">
            Read More <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
