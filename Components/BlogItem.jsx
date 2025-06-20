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
        <p className="mb-2 px-2 py-1 inline-block bg-black text-white text-sm rounded">{category}</p>
        <h4 className="mb-2 text-lg tracking-tight text-gray-800">{title}</h4>
        <p className="text-md text-gray-600 mb-4">
          {description.slice(0, 120)}{description.length > 120 ? "..." : ""}
        </p>
        <div className="mt-auto">
          <Link href={`/blogs/${id}`} className="inline-flex gap-2 items-center text-black font-semibold">
            Read More <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
