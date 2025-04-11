import { Link, useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext } from "react";
import CartContext from "../../context/CartContext";

const Header = () => {
  const { cartList } = useContext(CartContext);

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const renderCartItemCount = () => {
    const cartItemsCount = cartList.length;

    return (
      <>
        {cartItemsCount > 0 ? (
          <span className="bg-[#bfdbfe] md:bg-[#e6f6ff] text-[#0967d2] font-roboto text-[12px] font-medium rounded-full px-[5px] py-[2px] ml-[8px]">
            {cartList.length}
          </span>
        ) : null}
      </>
    );
  };

  return (
    <nav className="border-b border-b-[rgb(243,243,243)]">
      <div className="hidden md:flex justify-between items-center w-[90%] max-w-[1110px] mx-auto py-6">
        <Link to="/">
          <img
            className="w-[165px]"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
          />
        </Link>

        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className={`font-roboto text-lg ${
                isActive("/")
                  ? "text-blue-600 font-bold underline underline-offset-4 decoration-blue-500"
                  : "text-gray-600 no-underline"
              }`}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className={`font-roboto text-lg ${
                isActive("/products")
                  ? "text-blue-600 font-bold underline underline-offset-4 decoration-blue-500"
                  : "text-gray-600 no-underline"
              }`}>
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className={`font-roboto text-lg ${
                isActive("/cart")
                  ? "text-blue-600 font-bold underline underline-offset-4 decoration-blue-500"
                  : "text-gray-600 no-underline"
              }`}>
              Cart {renderCartItemCount()}
            </Link>
          </li>
        </ul>

        <button
          onClick={onClickLogout}
          className="font-roboto font-semibold text-xs px-4 py-2 text-white bg-blue-700 rounded cursor-pointer"
          type="button">
          Logout
        </button>
      </div>

      {/* Mobile View */}
      <div className="md:hidden w-[90%] mx-auto py-4 flex justify-between items-center">
        <Link to="/">
          <img
            className="w-[110px]"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
          />
        </Link>
        <button
          type="button"
          className="p-0 cursor-pointer"
          onClick={onClickLogout}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
            alt="nav logout"
            className="w-[24px]"
          />
        </button>
      </div>

      <div className="md:hidden w-full bg-[#e6f6ff]">
        <ul className="flex justify-around items-center h-[70px]">
          <li>
            <Link to="/" className="text-[#475569]">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className={`w-[24px] ${
                  location.pathname === "/" ? "brightness-0 invert" : ""
                }`}
              />
            </Link>
          </li>
          <li>
            <Link to="/products" className="text-[#475569]">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="nav products"
                className={`w-[24px] ${
                  location.pathname === "/products" ? "brightness-0 invert" : ""
                }`}
              />
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-[#475569] flex items-center">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className={`w-[24px] ${
                  location.pathname === "/cart" ? "brightness-0 invert" : ""
                }`}
              />
              {renderCartItemCount()}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
