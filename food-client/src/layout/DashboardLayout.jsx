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
import useAdmin from "../Hooks/useAdmin";

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
  const [isAdmin, isAdminLoading] = useAdmin();

  return (
    <div>
      {isAdmin ? (
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
                <Link to="/dashboard/add-menu">
                  <FaPlusCircle /> Add Menu
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-items">
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
      ) : (
        <div>
          <div
            className="bg-rose-100 border border-rose-400 text-rose-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Can't Access!<br/></strong>
            <span className="block sm:inline">
              Only Admin's can access
            </span>
            <Link className="absolute top-0 bottom-0 right-0 px-4 py-3" to="/">
              <svg
                className="fill-current h-6 w-6 text-rose-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
