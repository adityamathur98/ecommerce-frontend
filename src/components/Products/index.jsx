import AllProductsSection from "../AllProductsSection";

import Header from "../Header";
import PrimeDealsSection from "../PrimeDealsSection";

const Products = () => (
  <>
    <Header />
    <div className="flex flex-col m-auto w-[90%] max-w-[1110px]">
      <PrimeDealsSection />
      <AllProductsSection />
    </div>
  </>
);

export default Products;
