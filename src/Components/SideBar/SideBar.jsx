// import React from "react";
// import { BiLogOut } from "react-icons/bi";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton ";
import { useSelector } from "react-redux";
import LogoutItem from "./LogoutItem";
const SideBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const items = [
    {
      icon: BsHouseFill,
      label: "Home",
      href: "/tiwtter",
    },
    {
      icon: BsBellFill,
      label: "Explore",
      href: "/tiwtter/explore",
    },
    {
      icon: FaUser,
      label: "Profile",
      href: `/tiwtter/profile/${currentUser.username}`,
    },
  ];
  return (
    <aside className="col-span-1 h-full pr-4 md:pr-2 fixed ">
      <div className="flex flex-col items-end ps-2">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
          <LogoutItem />
          <SidebarTweetButton />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
