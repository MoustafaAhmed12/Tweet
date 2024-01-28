import { RouterProvider } from "react-router-dom";
import { router } from "./Utils/ConfigRoute";

// MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { getUser } from "./GlobalState/userSlice";
import { Toaster } from "react-hot-toast";
function App() {
  const dispatch = useDispatch();
  const getUserData = useCallback(async () => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserData();
    }
  }, [getUserData]);

  const theme = createTheme({
    palette: {
      mode: "dark",
      // primary: {
      //   main: "#000", // Change the primary color for dark mode
      // },
      // secondary: {
      //   main: "#FF4081", // Change the secondary color for dark mode
      // },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
        }}
      />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
