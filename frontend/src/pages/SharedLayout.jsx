import { Outlet } from "react-router-dom";
import Navbar from "../components/minor-components/Navbar";
import Footer from "../components/minor-components/Footer";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
