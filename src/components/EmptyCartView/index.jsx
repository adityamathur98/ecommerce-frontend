import { Link } from "react-router-dom";

const EmptyCartView = () => (
  <div className="flex flex-col items-center justify-center h-[80vh]">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      className="w-[180px] h-[190px] md:w-[360px] md:h-[380px]"
      alt="cart empty"
    />
    <h1 className="text-[#1e293b] font-roboto text-[24px] font-[500] md:text-[32px]">
      Your Cart Is Empty
    </h1>

    <Link to="/products">
      <button
        type="button"
        className="bg-[#0b69ff] text-[#ffffff] font-roboto text-[12px] rounded-[8px] border-none px-[16px] py-[8px] outline-none cursor-pointer">
        Shop Now
      </button>
    </Link>
  </div>
);

export default EmptyCartView;
