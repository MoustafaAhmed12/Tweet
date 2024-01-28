import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// Components
import Layout from "../Components/Layout";
import LayoutFeed from "./../Components/Posts/LayoutFeed";
// Pages
import Login from "../Pages/Login";
import ProtectRoute from "./ProtectRoute";
import Profile from "./../Pages/Profile";
import Register from "../Pages/Register";
import Explore from "../Pages/Explore";
import PostDetails from "../Pages/PostDetails";
import ErrorPage from "../Pages/ErrorPage";
// Loader
import { editUser, loaderUser } from "./loaderUser";
import { loaderPost, loaderPostById } from "./loaderPosts";
import { PostActions } from "./actionPost";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route index element={<Login />} />
      <Route
        path="tiwtter"
        element={
          <ProtectRoute>
            <Layout />
          </ProtectRoute>
        }
        action={PostActions}
      >
        <Route index element={<LayoutFeed />} loader={loaderPost} />
        <Route
          path="profile/:username"
          element={<Profile />}
          loader={loaderUser}
          action={editUser}
        />
        <Route path="explore" element={<Explore />} loader={loaderPost} />
        <Route
          path="post/:postId"
          element={<PostDetails />}
          loader={loaderPostById}
        />
      </Route>
      <Route path="register" element={<Register />} />
    </Route>
  )
);

/*

<Route
        path="home"
        element={
          <ProtectRoute>
            <Layout />
          </ProtectRoute>
        }
      >
        <Route index element={<LayoutFeed />} />
      </Route>

  <Route
        path="profile/:username"
        element={
          <ProtectRoute>
            <Layout />
          </ProtectRoute>
        }
      >
        <Route index element={<Profile />} loader={loaderUser} />
      </Route>
      <Route
        path="explore"
        element={
          <ProtectRoute>
            <Layout />
          </ProtectRoute>
        }
      >
        <Route index element={<Explore />} loader={loaderPost} />
      </Route>
      <Route
        path="post/:postId"
        element={
          <ProtectRoute>
            <Layout />
          </ProtectRoute>
        }
      >
        <Route index element={<PostDetails />} />
      </Route>

*/
