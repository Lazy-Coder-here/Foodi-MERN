import React, { useState } from "react";
import useCart from "../../Hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { BaseURL } from "../../Config/config";
import { useAuth } from "../../contexts/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(cart);

    // calculate total no of items
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  // handle increase function
  const handleIncrease = (item) => {
    // console.log(item._id);
    // console.log("+ clicked");
    fetch(`${BaseURL}/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        refetch();
        setCartItems(updatedCart);
      });
  };

  // handle decrease function
  const handleDecrease = (item) => {
    // console.log("- clicked");
    if (item.quantity > 1) {
      fetch(`${BaseURL}/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item._id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          refetch();
          setCartItems(updatedCart);
        });
    } else {
      alert("item can't be zero!");
    }
  };

  // calculate total price
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const orderTotal = cartSubTotal;

  // delete button
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BaseURL}/carts/${item._id}`)
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
      }
    });
  };

  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      {/* banner */}
      <div>
        <div className="py-36 flex flex-col justify-center items-center gap-8">
          <div className="space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items added to the <span className="text-green">Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table for the cart */}
      {cart.length > 0 ? (
        <div>
          <div className="border shadow-md">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="bg-green text-white rounded-sm">
                  <tr>
                    <th>#</th>
                    <th>Food</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* items */}
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img src={item.image} alt="" />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-medium">{item.name}</td>
                      <td>
                        <button
                          className="btn btn-xs"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          className="w-10 mx-2 text-center overflow-hidden appearance-none"
                          onChange={() => console.log(item.quantity)}
                        />
                        <button
                          className="btn btn-xs"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </td>
                      <td>${calculatePrice(item).toFixed(2)}</td>
                      <th>
                        <button
                          className="btn btn-ghost text-red btn-xs"
                          onClick={() => handleDelete(item)}
                        >
                          <FaTrash />
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* customer details */}
          <div className="my-12 flex flex-col md:flex-row justify-between items-start">
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium">Customer Details</h3>
              <p>Name: {user?.displayName}</p>
              <p>Email: {user?.email}</p>
            </div>
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium">Shopping Details</h3>
              <p>Total Items: {totalItems}</p>
              <p>Total Price: ${orderTotal.toFixed(2)}</p>
              <Link to="/process-checkout">
                <button className="btn btn-md px-8 py-1 mt-5 bg-green text-white">
                  Proceed Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20">
          <p>Cart is empty. Please add products.</p>
          <Link to="/menu">
            <button className="btn bg-green text-white mt-3">
              Back to Menu
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
