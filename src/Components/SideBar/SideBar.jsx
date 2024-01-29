import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton ";
import { useSelector } from "react-redux";
import LogoutItem from "./LogoutItem";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { CiUser } from "react-icons/ci";
const SideBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const items = [
    {
      icon: IoHomeOutline,
      label: "Home",
      href: `/tweet/${currentUser._id}`,
    },
    {
      icon: MdOutlineExplore,
      label: "Explore",
      href: "/tweet/explore",
    },
    {
      icon: CiUser,
      label: "Profile",
      href: `/tweet/profile/${currentUser.username}`,
    },
  ];
  return (
    <aside className="col-span-1 h-full pr-4 md:pr-2 fixed ">
      <div className="flex flex-col items-end ps-2">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo currentUser={currentUser} />
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
