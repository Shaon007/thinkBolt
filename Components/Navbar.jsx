
const Navbar = () => {
  return (
    <div className="py-5 px-5 md:px-12 lg:px-28 text-black bg-white">
      <div className="flex justify-between items-center">
        <h2 className="font-mono md:text-xl">thinkBolt</h2>
        <button className="flex items-center gap-2 py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black rounded-md font-mono">Get Started</button>
      </div>
    </div>
  );
};

export default Navbar;