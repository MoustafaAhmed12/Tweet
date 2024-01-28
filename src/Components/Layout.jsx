import { Outlet } from "react-router-dom";
import SideBar from "./SideBar/SideBar";
import { useSelector } from "react-redux";
import WhoFollow from "./WhoFollow";
import { ClipLoader } from "react-spinners";
const Layout = () => {
  const { isLoading } = useSelector((state) => state.user);
  return (
    <div className="h-screen">
      <div className="container h-full mx-auto xl:px-30 max-w-[80rem]">
        <div className="grid grid-cols-7 h-full">
          <SideBar />
          <main className="col-span-7 lg:col-span-5 border-x-[1px] border-neutral-800 ms-[270px] max-lg:ms-[70px]">
            {isLoading ? (
              <div className="flex justify-center mt-56">
                <ClipLoader color="#1D9BF0" size={50} />
              </div>
            ) : (
              <Outlet />
            )}
          </main>
          <WhoFollow />
        </div>
      </div>
    </div>
  );
};

export default Layout;

/*
div className="h-screen col-span-4 flex justify-center items-center mt-12">
                <PacmanLoader color="#0D95D2" speedMultiplier={2} />
              </div>
*/
