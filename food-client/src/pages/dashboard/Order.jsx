import React from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { BaseURL } from "../../Config/config";
import { Link } from "react-router-dom";

const Order = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(`${BaseURL}/payments?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
  });

  //  format to appropriate date
  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      {/* banner */}
      <div>
        <div className="py-36 flex flex-col justify-center items-center gap-8">
          <div className="space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track All Your <span className="text-green">Orders</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table */}
      <div>
        {orders.length > 0 ? (
          <div>
            <div className="border shadow-md">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead className="bg-green text-white rounded-sm">
                    <tr>
                      <th>#</th>
                      <th>Order Data</th>
                      <th>Transaction Id</th>
                      <th>Bill Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* items */}
                    {orders.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{formatDate(item.createdAt)}</td>
                        <td className="font-medium">{item.transactionId}</td>
                        <td>${item.price}</td>
                        <td>{item.status}</td>
                        <th>
                          <Link
                            to="/contact"
                            className="btn btn-ghost text-red btn-xs"
                          >
                            Contact
                          </Link>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-20">
            <p>Orders are empty. Please Do Some Purchases.</p>
            <Link to="/cart-page">
              <button className="btn bg-green text-white mt-3">
                Back to Carts
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
