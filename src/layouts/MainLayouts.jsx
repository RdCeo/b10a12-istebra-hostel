import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Shared/Footer/Footer";
const MainLayouts = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-334px)]">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
      <Toaster />
    </div>
  );
};

export default MainLayouts;
