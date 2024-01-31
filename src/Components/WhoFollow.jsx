import { useEffect, useState } from "react";
import { axiosInstance } from "../Utils/config";

import UserList from "./UserList";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { PropagateLoader } from "react-spinners";

const WhoFollow = () => {
  const { username } = useParams();
  const [users, setUsers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get(`/users/${currentUser._id}`);
      setUsers(() => data.slice(0, 6));
    }
    fetchData();
  }, [currentUser]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get(
        `/user/friends/${currentUser._id}`
      );

      setFollowings(data);
    }
    fetchData();
  }, [currentUser.followings, currentUser._id]);

  return (
    <div className="px-6 py-4 hidden xl:block h-[90vh] overflow-y-scroll w-[25rem] fixed ms-[58rem] rounded-md">
      <div className="rounded-xl bg-[#18191c] p-6 pb-10">
        {username ? (
          <h2 className="text-white text-2xl font-semibold">Your Followings</h2>
        ) : (
          <h2 className="text-white text-2xl font-semibold">Who To Follow </h2>
        )}
        {username ? (
          followings.length > 0 ? (
            followings.map((user) => {
              return <UserList key={user._id} user={user} username />;
            })
          ) : (
            <div className="mt-6">
              <Alert severity="error" variant="filled">
                No Followings Yet
              </Alert>
            </div>
          )
        ) : users.length > 1 ? (
          users.map((user) => {
            return <UserList key={user._id} user={user} />;
          })
        ) : (
          <div className="mt-6">
            <Alert severity="error" variant="filled">
              No Users
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhoFollow;

/*

const newData =
        currentUser.length > data.length
          ? currentUser.followings.forEach((element) => {
              data.filter((user) => {
                return user._id !== element;
              });
              setUsers(data);
            })
          : data.forEach((element) => {
              currentUser.followings.filter((user) => {
                return user._id !== element;
              });
              setUsers(data);
            });
      console.log(newData);

*/
