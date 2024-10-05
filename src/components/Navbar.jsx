const Navbar = () => {
  return (
    <nav className="flex  justify-around items-center bg-[#232f3e] text-white p-2 mx-auto">
      <div>
        <span className="cursor-pointer hover:font-bold font-medium transition-all duration-200">
          Tudo
        </span>
      </div>
      <ul className="flex gap-5 ">
        <li className="cursor-pointer hover:font-bold font-medium transition-all duration-200">
          Home
        </li>
        <li className="cursor-pointer hover:font-bold font-medium transition-all duration-200">
          Your Tasks
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
