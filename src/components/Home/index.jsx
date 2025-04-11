import { useNavigate } from "react-router-dom";

import Header from "../Header";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/products");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center mx-auto pt-2 pb-12 w-11/12 max-w-[1110px] md:flex-row md:justify-between md:pt-12">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="font-roboto font-bold text-3xl text-gray-900 text-center md:text-5xl md:text-left">
            Clothes That Get YOU Noticed
          </h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
            alt="dresses to be noticed"
            className="w-[206px] md:hidden"
          />
          <p className="font-roboto mt-9 text-sm leading-7 text-gray-500 text-center md:text-lg md:mt-0 md:text-left">
            Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the season’s new and exciting
            fashion in your own way.
          </p>
          <button
            type="button"
            className="w-3/5 text-sm font-roboto font-medium text-white bg-blue-600 px-4 py-3 rounded mt-5 md:w-36 md:text-lg cursor-pointer"
            onClick={handleNavigate}>
            Shop Now
          </button>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="dresses to be noticed"
          className="hidden md:block w-1/2 max-w-[450px] ml-20"
        />
      </div>
    </>
  );
};

export default Home;
