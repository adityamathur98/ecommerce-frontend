import { BsFilterRight } from "react-icons/bs";

const ProductsHeader = (props) => {
  const { sortbyOptions, activeOptionId, setActiveOptionId } = props;

  const onChangeSortby = (event) => {
    setActiveOptionId(event.target.value);
  };

  return (
    <div className="flex justify-between items-center mt-[24px] flex-wrap md:mt-[32px]">
      <h1 className="text-[#475569] text-[20px] font-[500]">All Products</h1>
      <div className="flex items-center">
        <BsFilterRight size={24} color="#475569" className="mr-[6px]" />
        <h1 className="text-[#475569] text-[16px]">Sort by</h1>
        <select
          className="text-[#475569] bg-[#ffffff] text-[16px] font-[500] border-none p-[12px] outline-none cursor-pointer"
          value={activeOptionId}
          onChange={onChangeSortby}>
          {sortbyOptions.map((eachOption) => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="text-[#7e858e] text-[14px]">
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductsHeader;
