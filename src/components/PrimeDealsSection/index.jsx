import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BeatLoader } from "react-spinners";

import ProductCard from "../ProductCard";

const apiStatusContants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "INPROGRESS",
};

const PrimeDealsSection = () => {
  const [primeDeals, setPrimeDeals] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusContants.initial);

  useEffect(() => {
    getPrimeDeals();
  }, []);

  const getPrimeDeals = async () => {
    try {
      setApiStatus(apiStatusContants.inProgress);
      const token = Cookies.get("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/prime-deals`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      const updatedData = data.map((product) => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }));
      setPrimeDeals(updatedData);
      setApiStatus(apiStatusContants.success);
    } catch (error) {
      console.error("Error fetching products:", error);
      setApiStatus(apiStatusContants.failure);
    }
  };

  const renderProductsList = () => {
    return (
      <div>
        <h1 className="text-[#475569] text-[32px] font-[500] mt-[48px]">
          Exclusive Prime Deals
        </h1>
        <ul className="flex flex-wrap pl-0">
          {primeDeals.map((product) => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    );
  };

  const renderPrimeDealsFailureView = () => {
    return (
      <img
        src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
        alt="Register Prime"
        className="register-prime-image"
      />
    );
  };

  const renderLoader = () => {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <BeatLoader color="#3b82f6" size={15} />
      </div>
    );
  };

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusContants.success:
        return renderProductsList();
      case apiStatusContants.inProgress:
        return renderLoader();
      case apiStatusContants.failure:
        return renderPrimeDealsFailureView();
      default:
        return null;
    }
  };

  return renderContent();
};

export default PrimeDealsSection;
