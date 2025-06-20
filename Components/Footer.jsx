import { assets } from "@/Assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex justify-around flex-col gap-2 bg-black py-5 items-center font-mono">
      {/* <Image src={assets.logo_light} alt="Logo" /> */}
      <h2 className="text-white text-2xl">thinkBolt</h2>
      <p className="text-white text-xs">All right reserved. Copyright @thinkBolt</p>
      <div className="flex">
        <Image src={assets.facebook_icon} alt='fblogo' width={40} />
        <Image src={assets.twitter_icon} alt='fblogo' width={40} />
        <Image src={assets.googleplus_icon} alt='fblogo' width={40} />
      </div>
    </div>
  );
};

export default Footer;