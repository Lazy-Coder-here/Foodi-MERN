import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa6";

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data)

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="card-body">
          <h3 className="font-bold text-lg pb-2">Please Login</h3>
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>

          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
              required
            />
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password")}
              required
            />
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {/* error text */}

          {/* login button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Login"
              className="btn bg-green text-white"
            />
          </div>

          <p className="text-center my-2">
            Don't have an account?{" "}
            <Link to="/sign-up" className="underline text-green ml-1">
              Signup Now
            </Link>{" "}
          </p>
        </form>

        {/* social media sign in buttons */}
        <div className="text-center space-x-3 mb-5">
          <button className="btn btn-circle hover:text-white hover:bg-green">
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:text-white hover:bg-green">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:text-white hover:bg-green">
            <FaTwitter />
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
