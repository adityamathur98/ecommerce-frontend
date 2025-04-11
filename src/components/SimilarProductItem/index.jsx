const SimilarProductItem = (props) => {
  const { productDetails } = props;
  const { title, brand, imageUrl, rating, price } = productDetails;

  return (
    <li className="flex flex-col list-none md:w-[200px] md:mr-[64px]">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="w-[200px] rounded-[8px]"
      />
      <p className="text-[#171f46] text-[16px] font-[500] mb-[6px]">{title}</p>
      <p className="text-[#594d6d] text-[16px] mt-[6px]">by {brand}</p>
      <div className="flex justify-between items-center w-[200px]">
        <p className="text-[#171f46] text-[18px] font-[700]">{price}</p>
        <div className="flex items-center bg-[#3b82f6] rounded-[6px] py-[6px] px-[16px]">
          <p className="text-[#ffffff] text-[14px] font-[500] mr-[4px] my-0">
            {rating}
          </p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="h-[14px] w-[14px] mb-[3px]"
          />
        </div>
      </div>
    </li>
  );
};

export default SimilarProductItem;
