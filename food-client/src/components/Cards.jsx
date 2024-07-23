import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../Hooks/useCart";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Cards = ({ item }) => {
  const { _id, name, image, recipe, price } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user, userLoggedIn } = useAuth();
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddtoCart = (item) => {
    if(!userLoggedIn) {
      return;
    }
    const cartItem = {
      menuItemId: _id,
      name,
      quantity: 1,
      image,
      price,
      email: user.email,
    };
    axiosSecure
      .post(`/carts`, cartItem)
      .then((res) => {
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
      <Link>
        <figure>
          <img
            src={item.image}
            alt=""
            className="hover:scale-105 transition-all duration-200 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link>
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>{item.recipe}</p>
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
