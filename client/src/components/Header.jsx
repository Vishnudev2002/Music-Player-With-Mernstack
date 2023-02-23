import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import  Logo from "../assets/img/index.png";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { FaCrown } from "react-icons/fa";
import { useStateValue } from "../Context/StateProvider";
import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { actionType } from "../Context/reducer";
const Header = () => {
  const [{ user, isSongPlaying }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const navigate = useNavigate();

  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
        dispatch({
          type: actionType.SET_ISSONG_PLAYING,
          isSongPlaying: false,
        });
      })
      .catch((e) => {
        console.log(e);
      });
    navigate("/login", { replace: true });
  };
  return (
    <header  className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to={"/"}>
        <img src={Logo} alt="Logo" className="w-10" />
      </NavLink>
      <ul className="flex items-center justify-center ml-5">
        <li>
          <NavLink
            to={"/home"}
            style={{fontSize:"25px"}}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Musify
          </NavLink>
        </li>
      </ul>
      <div
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
      >
        <img
          src={user?.user.imageURL}
          className="w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg"
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor font-semibold">
            {user?.user.name}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
            {user?.user?.role.toUpperCase()}
            <FaCrown className="text-sm -ml-1 text-yellow-500" />
          </p>
        </div>
        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 flex flex-col top-12 p-3 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm"
          >
            <NavLink to={"/userProfile"}>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                Home
              </p>
            </NavLink>
            <hr />
            {user?.user?.role === "admin" && (
              <>
                <NavLink to={"/dashboard/home"}>
                  <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                    Dashboard
                  </p>
                </NavLink>
                <hr />
              </>
            )}
        
            <p
              className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
              onClick={logOut}
            >
              Sign Out
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
