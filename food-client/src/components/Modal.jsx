import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa6";
import { useAuth } from "../contexts/AuthProvider";

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail, signUpWithFacebook, login } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

  // redirecting to homepage or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const { email, password } = data;
    // console.log(email, password);
    login(email, password)
      .then((result) => {
        setErrorMessage("");
        const { user } = result;
        alert("Login Successful");
        document.getElementById("my_modal_3").close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrorMessage("Please enter correct email/password");
      });
  };

  // google sign-in
  const handleLoginGmail = () => {
    signUpWithGmail()
      .then((result) => {
        const { user } = result;
        alert("Login Successful");
        document.getElementById("my_modal_3").close();
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  // facebook sign-in
  const handleLoginFacebook = () => {
    signUpWithFacebook()
      .then((result) => {
        const { user } = result;
        alert("Login Successful");
        document.getElementById("my_modal_3").close();
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="dialog"
          className="card-body"
        >
          <h3 className="font-bold text-lg pb-2">Please Login</h3>
          {/* if there is a button in form, it will close the modal */}
          <button
            htmlFor="my_modal_3"
            onClick={() => document.getElementById("my_modal_3").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
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
          {errorMessage && (
            <p className="text-red text-xs italic">{errorMessage}</p>
          )}

          {/* login button */}
          <div className="form-control mt-4">
            <input
              type="submit"
              value="Login"
              className="btn bg-green text-white"
            />
          </div>

          <h3 className="text-center my-2">
            Don't have an account?{" "}
            <Link to="/sign-up" className="underline text-green ml-1">
              Signup Now
            </Link>{" "}
          </h3>
        </form>

        {/* social media sign in buttons */}
        <div className="text-center space-x-3 mb-5">
          <button
            className="btn btn-circle hover:text-white hover:bg-green"
            onClick={handleLoginGmail}
          >
            <FaGoogle />
          </button>
          <button
            className="btn btn-circle hover:text-white hover:bg-green"
            onClick={handleLoginFacebook}
          >
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
