import React, { useState } from "react"; // Import useState
import chatgpt from "./images/chatgpt.jpg";
import { NavLink } from "react-router-dom";
import { signout } from "../actions/index";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../Configure";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  const handleSignOut = () => {
    dispatch(signout());
    signOut(auth)
      .then(() => {
        navigate("/login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <nav className="border-gray-200 bg-black text-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={chatgpt} className="h-8 rounded-full" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">Proton</span>
        </a>
        <button
          onClick={handleMenuToggle} // Call handleMenuToggle on button click
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"} // Set aria-expanded based on menu visibility
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`w-full md:block md:w-auto ${isMenuOpen ? "" : "hidden"}`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#171717] md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <NavLink to="/history" className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0">History</NavLink>
            </li>
            <li>
              <button onClick={handleSignOut} className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0">Sign Out</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
