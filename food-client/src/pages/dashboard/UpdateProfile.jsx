import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { updateUserProfile, userLoggedIn, user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const name = data.name;
    let photoURL = data.photoURL;
    if(!photoURL) {
      photoURL = user.photoURL;
    }
    updateUserProfile({ name, photoURL })
      .then(() => {
        // Profile updated!
        navigate(from, { replace: true });
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  return (
    <div>
      {!userLoggedIn && <Navigate to={"/"} replace={true} />}
      <div className="flex items-center justify-center h-screen">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold">Update Your Profile</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="Your Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control space-y-2">
              <label className="label">
                <span className="label-text">Upload Photo</span>
              </label>
              <input
                {...register("photoURL")}
                type="text"
                placeholder="Photo URL"
                className="input input-bordered"
              />

              {/* TODO: uploading image will be done after backend integration */}
              {/* <input
              type="file"
              className="file-input file-input-bordered file-input-success w-full max-w-xs file-input-ghost file-input-sm"
            /> */}
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-green text-white">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
