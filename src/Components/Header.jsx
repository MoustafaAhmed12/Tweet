// import React from 'react'
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const Header = ({ showBackArrow, label, postsLength }) => {
  const navigate = useNavigate();
  return (
    <div className="border-b-[1px] border-neutral-800 py-2 ps-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={() => navigate(-1)}
            color="white"
            size={20}
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <div className="flex flex-col ms-8">
          <h1 className="text-white text-xl font-bold">{label}</h1>
          {showBackArrow && (
            <span className="text-sm text-neutral-500">
              {postsLength} posts
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
