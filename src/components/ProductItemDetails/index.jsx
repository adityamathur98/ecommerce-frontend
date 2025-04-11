import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import SimilarProductItem from "../SimilarProductItem";

import Cookies from "js-cookie";
import Header from "../Header";
import { BsDashSquare, BsPlusSquare } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import CartContext from "../../context/CartContext";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const ProductItemDetails = () => {
  const { addCartItem } = useContext(CartContext);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [productData, setProductData] = useState({});
  const [similarProductsData, setSimilarProductsData] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    getProductData();
  }, []);

  const getFormattedData = (data) => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  });

  async function getProductData() {
    try {
      setApiStatus(apiStatusConstants.inProgress);
      const token = Cookies.get("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      );
      const data = response.data;
      const updatedData = getFormattedData(data);
      const updatedSimilarProductsData = data.similar_products.map(
        (eachSimilarProduct) => getFormattedData(eachSimilarProduct)
      );

      setProductData(updatedData);
      setSimilarProductsData(updatedSimilarProductsData);
      setApiStatus(apiStatusConstants.success);
    } catch (error) {
      setApiStatus(apiStatusConstants.failure);
    }
  }

  const onClickDecrement = () => {
    setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
  };

  const onClickIncrement = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  const renderProductDetailsView = () => {
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
    } = productData;
    return (
      <div className="w-[85%] max-w-[550px] md:w-[88%] md:max-w-[1110px]">
        <div className="flex flex-col md:flex-row md:justify-between md:mb-[48px]">
          <img
            src={imageUrl}
            alt="product"
            className="rounded-[16px] shrink-0 md:w-[48%] md:max-w-[540px] md:max-h-[576px]"
          />
          <div className="md:w-[48%]">
            <h1 className="text-[#3e4c59] text-[24px] font-[500] mt-[24px] mb-[16px] md:text-[48px] md:mt-0">
              {title}
            </h1>
            <p className="text-[#171f46] text-[24px] font-[700] mb-[16px]">
              {price}/-
            </p>
            <div className="flex items-center">
              <div className="flex items-center bg-[#3b82f6] rounded-[6px] py-[6px] px-[16px]">
                <p className="text-[#ffffff] text-[16px] font-[500] mr-[4px] my-0">
                  {rating}
                </p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="h-[20px] w-[20px] mb-[3px]"
                />
              </div>
              <p className="text-[#12022f] text-[14px] ml-[12px]">
                {totalReviews} Reviews
              </p>
            </div>
            <p className="text-[#616e7c] text-[14px] mt-[16px] mb-[16px] leading-[1.3] md:text-[18px] md:mb-[24px]">
              {description}
            </p>
            <div className="flex mb-[16px]">
              <p className="text-[#171f46] text-[16px] font-[500] mt-0 mb-0 md:text-[18px]">
                Available
              </p>
              <p className="text-[#616e7c] text-[16px] my-0 ml-[8px] md:text-[18px]">
                {availability}
              </p>
            </div>
            <div className="flex mb-[16px]">
              <p className="text-[#171f46] text-[16px] font-[500] mt-0 mb-0 md:text-[18px]">
                Brand
              </p>
              <p className="text-[#616e7c] text-[16px] my-0 ml-[8px] md:text-[18px]">
                {brand}
              </p>
            </div>
            <hr className="border-t border-[#cbced2] m-0" />
            <div className="flex items-center">
              <button
                type="button"
                className="bg-transparent border-none outline-none cursor-pointer"
                onClick={onClickDecrement}>
                <BsDashSquare className="text-[#616e7c] w-[16px] h-[16px]" />
              </button>
              <p className="text-[#616e7c] text-[20px] font-[500] mx-[24px]">
                {quantity}
              </p>
              <button
                type="button"
                className="bg-transparent border-none outline-none cursor-pointer"
                onClick={onClickIncrement}>
                <BsPlusSquare className="text-[#616e7c] w-[16px] h-[16px]" />
              </button>
            </div>
            <button
              type="button"
              className="bg-blue-500 text-white text-sm font-medium rounded-md py-3 px-5 outline-none cursor-pointer text-xs mb-8 md:text-sm mt-4"
              onClick={() => addCartItem({ ...productData, quantity })}>
              ADD TO CART
            </button>
          </div>
        </div>
        <h1 className="text-[#3e4c59] text-[28px] font-[500] m-0 md:text-[32px]">
          Similar Products
        </h1>
        <ul className="flex flex-col flex-wrap pl-0 md:mt-[24px] flex-row">
          {similarProductsData.map((eachSimilarProduct) => (
            <SimilarProductItem
              key={eachSimilarProduct.id}
              productDetails={eachSimilarProduct}
            />
          ))}
        </ul>
      </div>
    );
  };

  const renderFailureView = () => {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
          className="w-[300px] h-[165px] md:h-[290px] md:w-[540px]"
        />
        <h1 className="text-[#1e293b] text-[32px] font-[500] mt-[48px] md:text-[48px]">
          Product Not Found
        </h1>
        <Link to="/products">
          <button
            type="button"
            className="bg-blue-500 text-white text-sm font-medium rounded-md py-3 px-5 outline-none cursor-pointer">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  };

  const renderLoadingView = () => {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <ClipLoader color="#0b69ff" size={50} />
      </div>
    );
  };

  const renderProductetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center mt-[32px] md:mt-[64px]">
        {renderProductetails()}
      </div>
    </>
  );
};

export default ProductItemDetails;
