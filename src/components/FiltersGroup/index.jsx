import { BsSearch } from "react-icons/bs";

const FiltersGroup = (props) => {
  const {
    searchInput,
    categoryOptions,
    ratingsList,
    enterSearchInput,
    activeCategoryId,
    activeRatingId,
    setSearchInput,
    setActiveCategoryId,
    setActiveRatingId,
    clearFilters,
  } = props;

  const onEnterSearchInput = (event) => {
    if (event.key === "Enter") {
      enterSearchInput();
    }
  };

  const renderSearchInput = () => {
    return (
      <div className="flex items-center bg-[#f1f5f9] rounded-[8px] px-[16px] py-[8px]">
        <input
          type="search"
          value={searchInput}
          placeholder="Search"
          className="bg-[#f1f5f9] text-[#0f172a] text-[14px] font-[500] border-none outline-none grow-1"
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="text-[#475569] w-[20px] h-[20px]" />
      </div>
    );
  };

  const renderProductCategories = () => {
    return (
      <>
        <h1 className="text-[#12022f] text-[18px] font-[700] mt-[24px] md:mt-[32px]">
          Category
        </h1>
        <ul className="pl-0">
          {categoryOptions.map((category) => {
            const isActive = category.categoryId === activeCategoryId;
            const categoryClassName = isActive
              ? "text-[#0967d2] text-[16px] md:text-[18px]"
              : "text-[#64748b] text-[16px] md:text-[18px]";
            return (
              <li
                key={category.categoryId}
                className="list-none mt-[16px] cursor-pointer md:mt-[24px]"
                onClick={() => setActiveCategoryId(category.categoryId)}>
                <p className={categoryClassName}>{category.name}</p>
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  const renderRatingFilters = () => {
    return (
      <div>
        <h1 className="text-[#12022f] text-[18px] font-[700] mt-[32px] mb-[18px]">
          Rating
        </h1>
        <ul className="pl-0">
          {ratingsList.map((rating) => {
            const ratingClassName =
              activeRatingId === rating.ratingId
                ? "text-[#0967d2] text-[16px] ml-[10px] mb-0 mt-0 md:text-[18px] md:ml-[14px]"
                : "text-[#64748b] text-[16px] ml-[10px] mb-0 mt-0 md:text-[18px] md:ml-[14px]";

            return (
              <li
                key={rating.ratingId}
                onClick={() => setActiveRatingId(rating.ratingId)}
                className="flex items-center mb-[12px] cursor-pointer">
                <img
                  src={rating.imageUrl}
                  alt={`rating ${rating.ratingId}`}
                  className="max-w-[152px] h-[20px] min-h-[24px]"
                />
                <p className={ratingClassName}>& up</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="mt-[16px] md:w-[25%] md:max-w-[280px] min-w-[240px] md:mt-[48px] md:shrink-0">
      {renderSearchInput()}
      {renderProductCategories()}
      {renderRatingFilters()}
      <button
        type="button"
        onClick={clearFilters}
        className="bg-white text-[#0967d2] font-roboto font-bold text-[10px] border border-[#0967d2] rounded-[4px] px-[12px] py-[8px] mt-[16px] outline-none cursor-pointer
  md:text-[14px] md:px-[20px] md:mt-[32px]">
        Clear Filters
      </button>
    </div>
  );
};

export default FiltersGroup;
