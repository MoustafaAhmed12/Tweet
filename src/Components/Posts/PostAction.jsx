import { useState } from "react";

import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { TfiMoreAlt } from "react-icons/tfi";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#000",
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === "dark" ? "#ddd" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.dark,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const PostAction = ({ post, currentUser }) => {
  // To Open Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // To Open Form to Edit Post
  const [postEdit, setPostEdit] = useState({
    desc: post.desc,
    userId: "",
  });

  const [openE, setOpenE] = useState(false);

  const handleClickOpen = () => {
    setOpenE(true);
  };

  const handleCloseE = () => {
    setOpenE(false);
  };

  return (
    <>
      <Button
        sx={{ backgroundColor: "transparent" }}
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        onClick={handleClick}
      >
        <TfiMoreAlt size={18} />
      </Button>
      <StyledMenu
        className="bg-[#242d34bb]"
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Form method="delete" action="/tiwtter">
          <input
            type="text"
            className="hidden"
            name="postId"
            defaultValue={post._id}
          />
          <MenuItem
            component="button"
            className="w-full"
            type="submit"
            disableRipple
          >
            <MdDelete size={22} className="me-1" />
            <span>Delete Post</span>
          </MenuItem>
        </Form>
        <MenuItem onClick={handleClickOpen} disableRipple>
          <CiEdit size={18} className="me-2" />
          <span>Edit Post</span>
        </MenuItem>
        <Dialog open={openE} onClose={handleClose}>
          <DialogTitle className="bg-black">Edit Post</DialogTitle>
          <DialogContent className="bg-black">
            <Form
              // component={<Form />}
              method="patch"
              action="/tiwtter"
              noValidate
              className="w-[500px] max-w-full h-56 my-5"
            >
              <input
                type="text"
                className="hidden"
                name="userId"
                defaultValue={currentUser._id}
              />
              <input
                type="text"
                className="hidden"
                name="postId"
                defaultValue={post._id}
              />
              <TextField
                minRows={7}
                maxRows={14}
                fullWidth
                multiline
                autoFocus
                color="info"
                id="outlined-basic"
                label="Edit Post"
                variant="outlined"
                placeholder={`What do you think ${currentUser.username} ?`}
                value={postEdit.desc}
                name="desc"
                onChange={(e) => setPostEdit({ desc: e.target.value })}
              />
              <DialogActions className="bg-black mt-4">
                <Button onClick={handleCloseE}>X</Button>
                <Button
                  type="submit"
                  disabled={!postEdit.desc}
                  onClick={handleCloseE}
                >
                  Continue
                </Button>
              </DialogActions>
            </Form>
          </DialogContent>
        </Dialog>
      </StyledMenu>
    </>
  );
};
export default PostAction;
