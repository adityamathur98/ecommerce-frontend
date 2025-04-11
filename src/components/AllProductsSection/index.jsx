import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import ProductsHeader from "../ProductsHeader";

import { ClipLoader } from "react-spinners";
import Cookies from "js-cookie";
import axios from "axios";

import FiltersGroup from "../FiltersGroup";

const categoryOptions = [
  {
    name: "Clothing",
    categoryId: "1",
  },
  {
    name: "Electronics",
    categoryId: "2",
  },
  {
    name: "Appliances",
    categoryId: "3",
  },
  {
    name: "Grocery",
    categoryId: "4",
  },
  {
    name: "Toys",
    categoryId: "5",
  },
];

const sortbyOptions = [
  {
    optionId: "PRICE_HIGH",
    displayText: "Price (High-Low)",
  },
  {
    optionId: "PRICE_LOW",
    displayText: "Price (Low-High)",
  },
];

const ratingsList = [
  {
    ratingId: "4",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png",
  },
  {
    ratingId: "3",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png",
  },
  {
    ratingId: "2",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png",
  },
  {
    ratingId: "1",
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png",
  },
];

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const AllProductsSection = () => {
  const [productsList, setProductsList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [activeOptionId, setActiveOptionId] = useState(
    sortbyOptions[0].optionId
  );
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [activeRatingId, setActiveRatingId] = useState("");

  useEffect(() => {
    getProducts();
  }, [activeOptionId, activeRatingId, activeCategoryId]);

  const getProducts = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        `http://localhost:5001/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`,
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
      setProductsList(updatedData);
      setApiStatus(apiStatusConstants.success);
    } catch (error) {
      console.error("Error fetching products:", error);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const renderProductsList = () => {
    const showShowProductList = productsList.length > 0;

    return showShowProductList ? (
      <div>
        <ProductsHeader
          sortbyOptions={sortbyOptions}
          activeOptionId={activeOptionId}
          setActiveOptionId={setActiveOptionId}
        />
        <ul className="flex flex-wrap pl-0">
          {productsList.map((product) => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="md:ml-8 md:w-[70%]">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="w-[250px] h-[180px] md:w-[459px] md:h-[315px]"
          alt="no products"
        />
        <h1 className="text-[#171f46] text-[20px] font-[500] leading-[1.3px] md:mt-[32px] md:text-[24px]">
          No Product Found
        </h1>
        <p className="text-center text-[#64748b] text-[14px] w-[90%] max-w-[288px] leading-[1.3] md:mt-[12px] text-[18px] w-[60%] max-w-[466px]">
          We could not find any products. Try other filters.
        </p>
      </div>
    );
  };

  const renderFailureView = () => {
    return (
      <div className="flex flex-col justify-center items-center mt-[48px] pb-[64px] md:mt-0 md:ml-[30px] md:w-[70%] md:mb-0">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
          className="w-[250px] h-[200px] md:w-[400px] md:h-[350px]"
          alt="product failure"
        />
        <h1 className="text-[#171f46] text-[20px] font-[500] leading-[1.3] md:text-[24px]">
          Oops! Something Went Wrong
        </h1>
        <p className="text-center text-[#64748b] text-[14px] w-[90%] max-w-[288px] leading-[1.3]">
          We are having some trouble processing your request. Please try again.
        </p>
      </div>
    );
  };

  const renderLoader = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    );
  };

  const clearFilters = () => {
    setSearchInput("");
    setActiveCategoryId("");
    setActiveRatingId("");
    getProducts();
  };

  const renderAllProducts = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductsList();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoader();
      default:
        return null;
    }
  };

  const enterSearchInput = () => {
    getProducts();
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:pb-24">
      <FiltersGroup
        searchInput={searchInput}
        categoryOptions={categoryOptions}
        ratingsList={ratingsList}
        enterSearchInput={enterSearchInput}
        activeCategoryId={activeCategoryId}
        activeRatingId={activeRatingId}
        setSearchInput={setSearchInput}
        setActiveCategoryId={setActiveCategoryId}
        setActiveRatingId={setActiveRatingId}
        clearFilters={clearFilters}
      />
      {renderAllProducts()}
    </div>
  );
};

export default AllProductsSection;
