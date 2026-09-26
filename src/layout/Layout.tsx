import Footer from "./../conponants/Footer/Footer";
import Navbar from "./../conponants/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className=" text-2xl  ">
        <Outlet />
        </div>
   

      <Footer />
    </>
  );
}
