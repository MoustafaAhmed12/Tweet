import { Link, useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="h-screen text-center flex flex-col items-center justify-center">
      <h1 className="text-2xl">Oops!</h1>
      <p className="my-3">Sorry, an unexpected error has occurred.</p>
      <div className="">
        <h1 className="inline-block mr-4 text-xl font-medium ali">
          {!error.response.status ? 404 : ""} <span className="ms-3">|</span>
        </h1>

        <div className="inline-block">
          <h2 className="text-xl font-normal text-red-600">
            {error.response.data.error || error.message}
          </h2>
        </div>
      </div>
      <Link
        to={"/tiwtter"}
        className="border-[1px] py-2 px-4 mt-5 rounded-md hover:bg-white hover:text-black transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;

// <div>
//   <div>
//     <div style="display: inline-block;">
//       <h2 style="font-size: 14px; font-weight: 400; line-height: 49px; margin: 0px;">
//         This page could not be found.
//       </h2>
//     </div>
//   </div>
// </div>;
