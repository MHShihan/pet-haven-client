import Lottie from "lottie-react";
import errorAnimation from "../assets/animaiton/404Animation.json";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-[90vh] mt-6">
        <Lottie animationData={errorAnimation}></Lottie>
        <Link to={"/"}>
          <button className="btn text-white  font-bold bg-[#F0A83D] hover:bg-[#180202]">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
