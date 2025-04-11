import { useContext } from "react";
import CartContext from "../../context/CartContext";

import Header from "../Header";
import CartListView from "../CartListView";
import CartSummary from "../CartSummary";
import EmptyCartView from "../EmptyCartView";

const Cart = () => {
  const { cartList, removeAllCartItem } = useContext(CartContext);
  const showEmptyView = cartList.length === 0;
  return (
    <>
      <Header />
      <div className="flex justify-center min-h-[75vh] md:min-h-[90vh]">
        <div className="flex flex-col w-[90%] max-w-[1110px] md:w-[80%]">
          {showEmptyView ? (
            <EmptyCartView />
          ) : (
            <>
              <div className="flex items-center justify-between w-[95%]">
                <h1 className="text-[#3e4c59] font-roboto text-[24px] font-[700] md:text-[48px]">
                  My Cart
                </h1>
                <button
                  type="button"
                  onClick={removeAllCartItem}
                  className="cursor-pointer text-[#0000FF] font-[400] text-[17px] font-roboto">
                  Remove All
                </button>
              </div>
              <CartListView />
              <CartSummary />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
