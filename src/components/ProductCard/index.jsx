import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { productData } = props;
  const { title, brand, imageUrl, rating, price, id } = productData;

  return (
    <li className="flex flex-col mb-[48px] w-[350px] flex-grow-0 flex-shrink-1 mr-[20px] md:w-[300px] lg:w-[350px]">
      <Link to={`/product/${id}`} className="flex flex-col no-underline">
        <img
          src={imageUrl}
          alt="product"
          className="w-[100%] max-h-[350px] rounded-[6px]"
        />
        <h1 className="text-[#1714f6] text-[24px] font-[500] mt-[20px] mb-[8px]">
          {title}
        </h1>
        <p className="text-[#594d6d] text-[18px] mb-[6px]">by {brand}</p>
        <div className="flex justify-between items-end mt-[2px]">
          <p className="text-[#171f46] text-[18px] font-[700] m-0">
            Rs {price}/-
          </p>
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
        </div>
      </Link>
    </li>
  );
};
export default ProductCard;
