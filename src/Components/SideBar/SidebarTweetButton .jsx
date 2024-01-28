import { useState } from "react";
import EditProfile from "./../EditProfile";
import { FaFeather } from "react-icons/fa";
const SidebarTweetButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <EditProfile open={open} setOpen={setOpen} isCreatePost />

      <div className="ms-[4px]" onClick={handleClickOpen}>
        <div
          className="
        mt-6
        lg:hidden 
        rounded-full 
        h-12
        w-12
        p-3
        flex
        items-center
        justify-center 
        bg-sky-500 
        hover:bg-opacity-80 
        transition 
        cursor-pointer
      "
        >
          <FaFeather size={24} color="white" />
        </div>
        <div
          className="
        mt-6
        hidden 
        lg:block 
        px-4
        py-2
        rounded-full
        bg-sky-500
        hover:bg-opacity-90 
        cursor-pointer
      "
        >
          <p
            className="
            hidden 
            lg:block 
            text-center
            font-semibold
            text-white 
            text-[20px]
        "
          >
            Tweet
          </p>
        </div>
      </div>
    </>
  );
};

export default SidebarTweetButton;
