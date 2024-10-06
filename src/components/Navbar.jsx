import { MdHome } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { IoIosList } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="flex  justify-around max-sm:justify-between items-center bg-[#232f3e] text-white p-4 mx-auto">
      <div className="flex items-center gap-1">
        <span className="cursor-pointer text-lg hover:font-bold font-medium transition-all duration-200">
          Tasks
        </span>
        <span>
          <IoIosList />
        </span>
      </div>
      <ul className="flex gap-5 items-center ">
        <li className="cursor-pointer hover:font-bold font-medium transition-all duration-200">
          <SlCalender />
        </li>
        <li className="cursor-pointer hover:font-bold font-medium transition-all duration-200">
          <MdHome />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
