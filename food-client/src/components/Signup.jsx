import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa6";
import Modal from "./Modal";
import { useAuth } from "../contexts/AuthProvider";
import axios from "axios";
import { BaseURL } from "../Config/config";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    createUser,
    signUpWithGmail,
    signUpWithFacebook,
    userLoggedIn,
    updateUserProfile,
  } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

  // redirecting to homepage or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const { email, password, name, photoURL } = data;
    createUser(email, password)
      .then((result) => {
        const { user } = result;
        updateUserProfile(name, photoURL).then(() => {
          const userInfo = {
            name: name,
            email: email,
            photoURL: photoURL,
          };
          axios.post(`${BaseURL}/users`, userInfo).then((res) => {
            alert("Account created successfully!");
            navigate(from, { replace: true });
          });
        });
      })
      .catch((error) => {
        setErrorMessage("Please enter a valid email");
      });
  };

  // google sign-in
  const handleLoginGmail = () => {
    signUpWithGmail()
      .then(async (result) => {
        const currUser = result.user;
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          photoURL: result?.user?.photoURL,
        };
        const findUser = await axios.get(`${BaseURL}/users/${currUser.email}`);
        if (!findUser.data) {
          await axios.post(`${BaseURL}/users`, userInfo);
        }
        alert("Login Successful");
        document.getElementById("my_modal_3").close();
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  // facebook sign-in
  const handleLoginFacebook = () => {
    signUpWithFacebook()
      .then(async (result) => {
        const currUser = result.user;
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          photoURL: result?.user?.photoURL,
        };
        const findUser = await axios.get(`${BaseURL}/users/${currUser.email}`);
        if (!findUser.data) {
          await axios.post(`${BaseURL}/users`, userInfo);
        }
        alert("Login Successful");
        document.getElementById("my_modal_3").close();
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {userLoggedIn && <Navigate to={"/"} replace={true} />}
      <div className="max-w-md bg-gray-50 shadow w-full mx-auto flex items-center justify-center my-20">
        <Link to="/" className="absolute left-5 top-5 underline text-green">
          Go Back to Home
        </Link>
        <div className="flex flex-col justify-center mt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="dialog"
            className="card-body"
          >
            <h3 className="font-bold text-lg pb-2">Create an account</h3>
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                placeholder="Your name"
                className="input input-bordered"
                {...register("name")}
              />
            </div>
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
            </div>

            {/* error text */}
            {errorMessage && (
              <p className="text-red text-xs italic">{errorMessage}</p>
            )}

            {/* login button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Signup"
                className="btn bg-green text-white"
              />
            </div>
          </form>
          <span className="text-center mb-2 mt-0">
            Already have an account?{" "}
            <button
              to="/sign-up"
              className="underline text-green ml-1"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Login
            </button>{" "}
            <Modal />
          </span>

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
      </div>
    </div>
  );
};

export default Signup;
