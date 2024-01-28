import { Avatar } from "@mui/material";

const UserHero = ({ user }) => {
  const { profilePicture } = user;

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {user?.coverImage && (
          <img
            src={user.coverImage}
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar
            src={profilePicture}
            sx={{ width: "9rem", height: "9rem" }}
            className={` border-4 border-black rounded-full  hover:opacity-90  transition  cursor-pointer relative`}
          />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
