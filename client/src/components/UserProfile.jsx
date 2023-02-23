import React from 'react'
import { useStateValue } from "../Context/StateProvider";
import { FaCrown } from "react-icons/fa";

const UserProfile = () => {
    const [{ user }, dispatch] = useStateValue();
  return (
    <div><img
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
      Premium Member,{" "}
      <FaCrown className="text-sm -ml-1 text-yellow-500" />
    </p>
  </div></div>
  )
}

export default UserProfile;
