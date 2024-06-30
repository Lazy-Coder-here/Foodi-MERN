import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  MdBusinessCenter,
  MdDashboard,
  MdOutlineDashboardCustomize,
  MdOutlineRestaurantMenu,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import {
  FaEdit,
  FaHome,
  FaLocationArrow,
  FaPlusCircle,
  FaRegUser,
} from "react-icons/fa";
import logo from "/logo.png";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <FaHome /> Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <MdOutlineRestaurantMenu /> Menu
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaLocationArrow /> Order Tracking
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <MdOutlineSupportAgent /> Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  return (
    <div>
      <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <MdOutlineDashboardCustomize />
            </label>
            <button className="btn rounded-full px-6 flex items-center gap-2 bg-green text-white sm:hidden">
              <FaRegUser />
              Logout
            </button>
          </div>

          <div className="mt-5 md:mt-2 mx-4">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link to="/" className="flex justify-start mb-3">
                <img src={logo} alt="" className="w-20" />
                <span className="badge badge-primary">admin</span>
              </Link>
            </li>
            <hr />
            <li className="mt-3">
              <Link to="/dashboard">
                <MdDashboard /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <MdBusinessCenter /> Manage Bookings
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FaPlusCircle /> Add Menu
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FaEdit /> Manage Items
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/dashboard/users">
                <FaUsers /> All Users
              </Link>
            </li>

            {/* shared nav links */}
            {sharedLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
