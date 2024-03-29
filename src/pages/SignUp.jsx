import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import signUpAnimation from "../assets/animaiton/signUpAnimation.json";
import toast from "react-hot-toast";

const SignUp = () => {
  const { createUser, updateUser, setUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image_url = form.image_url.value;
    console.log(name, email, password, image_url);

    const toastId = toast.loading("Register....");

    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        // Update user name and profile url
        updateUser({ displayName: name, photoURL: image_url })
          .then(() => {
            setUser({
              ...loggedUser,
              displayName: name,
              profileURL: image_url,
            });
          })
          .catch((error) => console.log(error));
        e.target.reset();
        // Swal.fire({
        //   title: "Good job!",
        //   text: "Registration Successful!",
        //   icon: "success",
        // });
        toast.success("Registration Successful", { id: toastId });

        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage, { id: toastId });
        console.log(errorMessage);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const toastId = toast.loading("Logging....");
        toast.success("Logged In ..", { id: toastId });
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  return (
    <div className="w-11/12 mx-auto flex items-center flex-col md:flex-row mt-20">
      <div className="space-y-5 w-1/2">
        <h1 className="text-3xl md:text-5xl font-bold text-center mt-6 text-dark-gray">
          REGISTER NOW
        </h1>
        <Lottie animationData={signUpAnimation} loop={false}></Lottie>
      </div>

      <div className="card-body max-w-[720px] mx-auto">
        <form onSubmit={handleSignUp}>
          <div className="flex flex-wrap gap-x-5">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                required
                name="name"
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                required
                name="email"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="text"
              placeholder="Image URL"
              className="input input-bordered"
              required
              name="image_url"
            />
          </div>

          <div className="flex flex-wrap gap-x-5">
            <div className="form-control flex-1 relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword1 ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered"
                required
                name="password"
              />
              <span
                onClick={() => setShowPassword1(!showPassword1)}
                className="cursor-pointer absolute right-2 bottom-4"
              >
                {showPassword1 ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </span>
            </div>
          </div>

          <div className="form-control mt-3"></div>
          <div className="form-control mt-6">
            <button className="btn bg-[#F0A83D] hover:bg-dark-gray font-bold text-xl text-white ">
              Register
            </button>
          </div>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="btn mt-4 hover:text-dark-gray "
        >
          <FcGoogle className="text-2xl"></FcGoogle>
          Sign in with Google
        </button>
        <p className=" text-center ">
          Already have an account? Go To{" "}
          <Link className="text-dark-gray font-bold " to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
