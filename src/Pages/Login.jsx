import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TextField, Button, Alert, CircularProgress } from "@mui/material";
import { axiosInstance } from "../Utils/config";
import { useDispatch } from "react-redux";
import { getUser } from "../GlobalState/userSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string("Enter your email")
      .min(3)
      .required("Email is required"),
    password: Yup.string("Enter your password")
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });

  const onSubmit = async (values) => {
    const user = { ...values };
    setIsLoading(true);
    const loadingToastId = toast.loading("Loading...");
    await axiosInstance
      .post("/login", user)
      .then(({ data }) => {
        navigate("/tweet/explore", { replace: true });
        localStorage.setItem("userToken", data.userToken);
        dispatch(getUser());
        setIsLoading(false);
        toast.dismiss(loadingToastId);
        toast.success("You are successfully logged in");
      })
      .catch((error) => {
        toast.dismiss(loadingToastId);
        toast.error(`Error: ${error.response.data.msg}`);
        setErr(error.response.data.msg);
        setIsLoading(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <div className="flex justify-between max-md:flex-col max-md:justify-around w-[85%] max:lg:max-w-[80%] h-screen items-center mx-auto max-lg:justify-center">
        <img
          src="https://thehandyx.com/static/media/otpverification.a9199085.svg"
          alt="Img-Login"
          className="w-[50%] max-md:w-80"
        />
        <div className="w-full md:w-[70%] ms-1 md:ms-[7%]">
          <div className="mb-4">
            <h1 className="text-center text-4xl">Sign In</h1>
          </div>
          {err && (
            <div className="my-3">
              <Alert severity="error" variant="filled">
                {err} — try again!
              </Alert>
            </div>
          )}
          <>
            <form onSubmit={formik.handleSubmit}>
              <div className="my-5">
                <TextField
                  fullWidth
                  name="username"
                  id="username"
                  label="Username"
                  autoComplete="off"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </div>
              <div className="my-3">
                <TextField
                  fullWidth
                  name="password"
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="off"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </div>
              <div className="text-center my-5">
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  {isLoading ? (
                    <CircularProgress color="secondary" size="28px" />
                  ) : (
                    "Login"
                  )}
                </Button>
                <p className="my-4">
                  Don`t have an account?
                  <Link to={"/register"} className="ms-2 text-sky-800">
                    Sign Up New!
                  </Link>
                </p>
              </div>
            </form>
          </>
        </div>
      </div>
    </>
  );
};

export default Login;
