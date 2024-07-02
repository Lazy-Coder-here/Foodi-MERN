import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import { BaseURL } from "../Config/config";
import useCart from "../Hooks/useCart";
import axios from "axios";

const Cards = ({ i, item }) => {
  const { _id, name, image, recipe, price } = item;

  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const { user } = useAuth();

  const [cart, refetch] = useCart();

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddtoCart = (item) => {
    // console.log("btn is clicked", item);
    const cartItem = {
      menuItemId: _id,
      name,
      quantity: 1,
      image,
      price,
      email: user.email,
    };
    // console.log(cartItem);
    axios
      .post(`${BaseURL}/carts`, cartItem)
      .then((res) => {
        // console.log(res);
        if (res) {
          Swal.fire({
            icon: "success",
            title: "Item added to your cart",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        const errorMessage = error.response.data.message;
        Swal.fire({
          position: "center",
          icon: "warning",
          title: `${errorMessage}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="card mr-5 md:my-5 shadow-xl relative">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
      >
        <FaHeart
          className="h-5 w-5 cursor-pointer"
          onClick={handleHeartClick}
        />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt=""
            className="hover:scale-105 transition-all duration-200 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span> {item.price}
          </h5>
          <button
            className="btn bg-green text-white"
            onClick={() => handleAddtoCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
