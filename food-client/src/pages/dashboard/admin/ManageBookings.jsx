import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/AuthProvider";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/all");
      return res.data;
    },
  });

  // confirm the order
  const handleConfirm = (order) => {
    axiosSecure.patch(`/payments/${order._id}`).then((res) => {
      Swal.fire({
        icon: "success",
        title: "Order Confirmed!",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    });
  };

  // delete the order
  const handleDelete = (order) => {
    axiosSecure
      .delete(`/payments/${order._id}`)
      .then((res) => {
        if (res) {
          Swal.fire({
            title: "Deleted!",
            text: "Your Item has been deleted.",
            icon: "success",
            confirmButtonColor: "#39DB4A",
          });
          refetch();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5>All Orders</h5>
        <h5>Total Orders: {orders.length}</h5>
      </div>

      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="bg-green text-white rounded-lg">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Transaction Id</th>
                <th>Bill Amount</th>
                <th>Status</th>
                <th>Confirm Order</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {orders.map((order, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{order.email}</td>
                  <td>{order.transactionId}</td>
                  <td>${order.price}</td>
                  <td className="font-semibold">{order.status}</td>
                  <td className="text-center">
                    {order.status === "Confirmed" ? (
                      "Done"
                    ) : (
                      <button
                        onClick={() => handleConfirm(order)}
                        className="btn btn-xs text-base text-green"
                      >
                        <GiConfirmed />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(order)}
                      className="btn btn-xs text-orange-500"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
