import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import CreatePost from "./Posts/CreatePost";
export default function FormDialog({
  open,
  setOpen,
  currentUser,
  isCreatePost,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    name: currentUser?.name,
    surname: currentUser?.surname,
    bio: currentUser?.bio,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("First Name is Required Field").min(3),
    surname: Yup.string().required("Last Name is Required Field").min(3),
    bio: Yup.string().required("bio is Required Field").min(3),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        className="bg-[#242d34c3] overflow-hidden"
      >
        <DialogTitle className="bg-black text-white w-[inherit] flex justify-between">
          {isCreatePost ? "Create Post" : "  Edit Profile"}
          <button
            className=" disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-full
        font-bold
        hover:opacity-80
        transition
        bg-transparent
        text-white
        border-white
        text-md
        p-2
        w-10
        h-10
      flex
      justify-center items-center
        
    
        "
            onClick={handleClose}
          >
            X
          </button>
        </DialogTitle>
        <DialogContent className="bg-black text-white w-[550px] max-sm:w-[340px]">
          {!isCreatePost ? (
            <Form
              initialValues
              validationSchema
              method="patch"
              action={`/tweet/profile/${currentUser.username}`}
            >
              <input
                type="text"
                className="hidden"
                name="userId"
                defaultValue={currentUser._id}
              />
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
                  name="bio"
                  id="bio"
                  label="bio"
                  autoComplete="off"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />
              </div>
              <DialogActions className="bg-black text-white">
                <button
                  className=" disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-bold hover:opacity-80 transition border-[1px] w-fit bg-white text-black border-white text-md px-5 py-2"
                  type="submit"
                  onClick={
                    Object.keys(formik.errors).length === 0 && handleClose
                  }
                >
                  Save
                </button>
              </DialogActions>
            </Form>
          ) : (
            <CreatePost handleClose={handleClose} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
