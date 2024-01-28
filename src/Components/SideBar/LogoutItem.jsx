import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOutFun } from "../../GlobalState/userSlice";
import { BiLogOut } from "react-icons/bi";
const LogoutItem = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOutFun());
    localStorage.removeItem("userToken");
  };
  return (
    <NavLink
      to={"/"}
      onClick={handleLogout}
      className={({ isActive }) => (isActive ? "font-bold" : "")}
    >
      <div className="flex flex-row items-center">
        <div
          className="
        relative
        rounded-full 
        h-14
        w-14
        flex
        items-center
        justify-center 
        p-4
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer 
        lg:hidden
      "
        >
          <BiLogOut size={28} color="white" />
        </div>
        <div
          className="
        relative
        hidden 
        lg:flex 
        items-row 
        gap-4 
        p-4 
        pe-16
        rounded-lg
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer
        items-center
        transition
      "
        >
          <BiLogOut size={24} color="white" />
          <p className="hidden lg:block text-white text-2xl">Logout</p>
        </div>
      </div>
    </NavLink>
  );
};

export default LogoutItem;
