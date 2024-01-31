import { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { TextField, Button, Alert, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import { axiosInstance } from "../Utils/config";

const Register = () => {
  const [err, setErr] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is Required Field").min(3),
    name: Yup.string().required("First Name is Required Field").min(3),
    surname: Yup.string().required("Last Name is Required Field").min(3),
    email: Yup.string()
      .required("Email is Required Field")
      .email("Invalid email address"),
    password: Yup.string().required("Password is Required Field").min(6),
  });

  const onSubmit = async (values) => {
    const user = { ...values };
    setLoading(true);
    await axiosInstance
      .post("/register", user)
      .then(() => {
        setLoading(false);
        navigate("/");
        toast.success("Register Successfully");
      })
      .catch((err) => {
        setLoading(false);
        setErr(err.response.data);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <>
      <div className="flex justify-between w-[95%] md:max-w-[80%] h-screen items-center mx-auto max-lg:justify-center">
        <img
          src="https://thehandyx.com/static/media/otpverification.a9199085.svg"
          alt="Img-Register"
          className="hidden lg:block w-[50%]"
        />
        <div className="w-full ms-1 md:w-[70%]">
          <div className="mb-4">
            <h1 className="text-center text-4xl">Sign Up</h1>
          </div>
          {err && (
            <div className="my-3">
              <Alert severity="error" variant="filled">
                {err.msg} — try again!
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
              <div className="my-5">
                <TextField
                  fullWidth
                  name="name"
                  id="name"
                  label="Name"
                  autoComplete="off"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </div>
              <div className="my-5">
                <TextField
                  fullWidth
                  name="surname"
                  id="surname"
                  label="Surname"
                  autoComplete="off"
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.surname && Boolean(formik.errors.surname)
                  }
                  helperText={formik.touched.surname && formik.errors.surname}
                />
              </div>
              <div className="my-5">
                <TextField
                  fullWidth
                  name="email"
                  id="email"
                  label="Email"
                  autoComplete="off"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
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
                    "Register"
                  )}
                </Button>
                <p className="text-white my-4">
                  You have an account?
                  <Link to={"/"} className="ms-2 text-sky-800">
                    Sign In New!
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

export default Register;
