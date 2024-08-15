import { useLocation, Outlet } from "react-router-dom"; // useLocation Hook: This hook is used to get the current location object, which includes the current path.
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  const location = useLocation();

  // Define paths where Footer should not be displayed
  // const noFooterPaths = ["/login", "/signup"];

  // Check if the current path is in the exceptions list
  // const shouldShowFooter = !noFooterPaths.includes(location.pathname);

  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer />
      {/* {shouldShowFooter && <Footer />} */}
    </>
  );
};

export default MainLayout;
