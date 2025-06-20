import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {

  const [email, setEmail] = useState('');
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email)
    const response = await axios.post('/api/email', formData);
    if (response.data.success) {
      toast.success(response.data.msg)
      setEmail("");
    }
    else {
      toast.error("Error")
    }
  }
  return (
    <div className="py-5 px-5 md:px-12 lg:px-28 text-black">

      <div className="text-center my-8">
        <h2 className="text-5xl md:text-3xl font-mono">Latest Blogs</h2>
        <p className="mt-10 max-w-[740px] m-auto text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi aspernatur minima aliquam. Nesciunt dicta dolorem veritatis aliquam nulla cumque porro.</p>
        <form onSubmit={onSubmitHandler} className="flex justify-between text-black max-w-[500px] scale:100 mx-auto mt-10 border border-black" action="">
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter Email Address" className="pl-4 outline-none" />
          <button type="submit" className="border-l border-black py-4 px-4 active:bg-gray-400 active:text-white">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default Header;